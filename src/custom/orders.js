const express = require("express");
const router = express.Router();
var mysql = require('mysql');
var os = require("os");
var hostname = os.hostname();


if (hostname == '192.168.0.107' || hostname == 'naumans-air' || hostname == '192.168.0.105') {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "stock"
    });
} else {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "@stock!@#$%",
        database: "stock"
    });
}

router.get('/fetchOrders/:userChannel', (req, res) => {
    let userChannel = req.params.userChannel;

    let orderQuery = "Select c.title as fullName ,c.firstName,c.lastName,c.phoneNumber as phoneNumber,cai.`city`,cai.`website`,cai.`username_website`,cai.`whatsapp_number`,ct.`name` as countryName,o.*,occ.channelId from `order` as o join order_channels_channel as occ on occ.orderId = o.id join customer as c on c.id = o.customerId join customer_additional_info as cai on cai.`customerID` = c.id join country_translation as ct on ct.id = cai.`country` where occ.channelId = " + userChannel + " order by o.id DESC";
    con.query(orderQuery, function(err, result) {
        if (err) throw err;

        var rows = JSON.parse(JSON.stringify(result));
        let resp = {
            code: 200,
            status: true,
            data: { rows }
        };
        res.json(resp);
    })
})

router.get('/fetchOrderDetail/:order_id', (req, res) => {
    let orderID = req.params.order_id;
    let productQuery = "SELECT * from `order_line` as ol join`product_variant` as pv on pv.id = ol.`productVariantId` join`product_variant_translation` as pvt on pvt.`baseId` = pv.id where `orderId` = " + orderID;

    con.query(productQuery, function(err, result) {
        var rows = JSON.parse(JSON.stringify(result));
        let resp = {
            code: 200,
            status: true,
            data: { rows }
        };
        res.json(resp);
    })
})

router.post('/updateOrder', (req, res) => {
    let postData = req.body.data;

    let customFields = JSON.stringify([{
        'pageName': postData.pageName,
        'sellerName': postData.sellerName,
        'paymentType': postData.paymentType,
        'conversationLink': postData.conversationLink,
        'notes': postData.notes
    }]);

    let updateOrder = "UPDATE `order` SET customFields=" + "'" + customFields + "'" + " WHERE id=" + postData.orderID;
    con.query(updateOrder, function(err, updateOrderResult) {
        if (err) throw err;
        let resp = {
            code: 200,
            status: true,
            data: {}
        };
        res.json(resp);
    });

})

router.post('/updateOrderProduct', (req, res) => {
    let postData = req.body;
    let orderID = postData.data.orderID;

    postData.data.product.forEach((element, key) => {
        let product_vaient_id = element.product_vaient_id;
        let insertOrderLineQuery = "INSERT INTO `order_line` (productVariantId,taxCategoryId,featuredAssetId,orderId) VALUES (" + product_vaient_id + ", 1,1," + orderID + ")";
        con.query(insertOrderLineQuery, function(err, insertOrderLineResult) {
            if (err) throw err;
            let orderLineID = insertOrderLineResult.insertId;
            let productVarientID = element.product_vaient_id;
            let productSold = element.sold;
            let productPrice = element.price;
            let perOrderTotalPrice = productPrice * productSold;

            //5.6 Insert Data into order_item
            let taxLineDesc = [{
                description: "Zero Tax",
                taxRate: 0
            }];
            let taxLine = JSON.stringify(taxLineDesc);
            let orderItemQuery = `INSERT INTO order_item (initialListPrice,listPrice,listPriceIncludesTax,adjustments,taxLines,cancelled,lineId) VALUES ("${perOrderTotalPrice}" , "${perOrderTotalPrice}",0,'[]','${taxLine}',0,${orderLineID})`

            //5.7 Need to insert item as much as sold , custom loop
            for (let i = 0; i < productSold; i++) {
                con.query(orderItemQuery, function(err, orderItemResult) { if (err) throw err; });
            }

        });

        //5.8 Get Stock and Update Stock
        let stockQuery = `SELECT stockAllocated,stockOnHand from product_variant where id = ${product_vaient_id}`;
        con.query(stockQuery, function(err, stockResult) {
            let r = JSON.parse(JSON.stringify(stockResult[0]));

            let previousStockAllocation = r.stockAllocated;
            let previousStockOnHand = r.stockOnHand;
            let stockAllocation = element.sold;
            let newStockAllocation = parseInt(previousStockAllocation) + parseInt(stockAllocation);
            let newStockOnHand = parseInt(previousStockOnHand) - parseInt(stockAllocation);
            let updateStockQuery = `UPDATE product_variant set stockAllocated = ${newStockAllocation} , stockOnHand = ${newStockOnHand} where id = ${product_vaient_id}`;

            con.query(updateStockQuery, function(err, updateStockResult) {
                if (err) throw err;
            })
        })
    })

    let resp = {
        code: 200,
        status: true,
        data: {}
    };
    res.json(resp);
    return true;
})

router.post('/editCustomOrder', (req, res) => {
    let postData = req.body.data;

    let customerData = postData.customer;

    let orderStatus = customerData.status;
    if (orderStatus == 'cancelled' || orderStatus == 'returned') {

        //if Order is cancel or returned 
        //Need to update stock accordingly
        let orderID = customerData.id;
        //Get order line query
        // let orderLineQuery = `SELECT * from order_line where orderId = ${orderID}`;
        let orderLineQuery = "SELECT `productVariantId`,COUNT(oi.id) as orderItemCount from `order_line` as ol join `order_item` as oi on oi.`lineId` = ol.id  where orderId = " + orderID + " group by oi.`lineId`";
        con.query(orderLineQuery, function(err, orderLineResult) {
            if (err) throw err;
            var rows = JSON.parse(JSON.stringify(orderLineResult));
            //Update Product Varient Stock on hand
            rows.forEach(element => {

                let productVarientID = element.productVariantId;
                let stockReturn = element.orderItemCount;

                //Fetch Previos Stock Count from product_varient_table
                let productVaientQuery = "SELECT * from product_variant where id = " + productVarientID;
                con.query(productVaientQuery, function(err, productVaientResult) {
                    if (err) throw err;
                    let resultPV = JSON.parse(JSON.stringify(productVaientResult));
                    let previousStockOnHand = parseInt(resultPV[0].stockOnHand);
                    let newStock = previousStockOnHand + stockReturn;

                    let updateStock = `UPDATE product_variant SET stockOnHand = '${newStock}' where id = ${productVarientID}`;
                    con.query(updateStock, function(err, updateStockResult) {
                        if (err) throw err;
                    });
                });
            });
        });
    }

    if (orderStatus && orderStatus.length != 0) {
        let orderID = customerData.id;
        let queryStatus = '';
        let customOrderStatus = '';

        if (orderStatus != 'cancelled' && orderStatus != 'completed') {
            queryStatus = 'Modifying';
            customOrderStatus = orderStatus;
        } else {
            queryStatus = orderStatus;
            customOrderStatus = orderStatus;
        }

        let orderStatusSTR = queryStatus.charAt(0).toUpperCase() + queryStatus.slice(1);
        let customOrderStatusSTR = customOrderStatus.charAt(0).toUpperCase() + customOrderStatus.slice(1);

        let updateOrderStatusQuery = "UPDATE `order` SET state = '" + orderStatusSTR + "',customState = '" + customOrderStatusSTR + "' where id = " + orderID;

        con.query(updateOrderStatusQuery, function(err, updateOrderStatusResult) {
            if (err) throw err;
        });
    }

    let customerID = customerData.customerId;
    let title = customerData.firstName + ' ' + customerData.lastName;

    let updateCustomerQuery = `UPDATE customer SET title = '${title}', firstName = '${customerData.firstName}', lastName = '${customerData.lastName}' , phoneNumber = '${customerData.phoneNumber}' where id = ${customerID}`;

    let updateCustomerAddQuery = `UPDATE customer_additional_info SET whatsapp_number = '${customerData.whatsapp_number}', username_website = '${customerData.username_website}', website = '${customerData.website}' , city = '${customerData.city}' where customerID = ${customerID}`

    let customFields = JSON.stringify([{
        'pageName': customerData.pageName,
        'sellerName': customerData.sellerName,
        'paymentType': customerData.paymentType,
        'conversationLink': customerData.conversationLink,
        'notes': customerData.notes
    }]);
    let updateOrderCustomFieldsQuery = "UPDATE `order` SET customFields=" + "'" + customFields + "'" + " where id = " + customerData.id;
    con.query(updateOrderCustomFieldsQuery, function(err, updateOrderCustomFieldsQuery) {
        if (err) throw err;
    });

    con.query(updateCustomerQuery, function(err, updateCustomerResult) {
        if (err) throw err;
    });

    con.query(updateCustomerAddQuery, function(err, updateCustomerAddResult) {
        if (err) throw err;
    });

    //Update Products
    let orderProduct = postData.orderProduct;
    let orderTotalPrice = 0;
    if (orderProduct) {
        let totalOrderUpdate = 0;
        orderProduct.forEach(element => {
                let newQuantity = parseInt(element.quantity);
                let Updateprice = element.price;
                totalOrderUpdate += newQuantity * Updateprice;
            })
            //Update Order Price
        let updateOrderTotalQuery = "UPDATE `order` SET subTotal = '" + totalOrderUpdate + "',subTotalWithTax = '" + totalOrderUpdate + "' where id = " + customerData.id;
        con.query(updateOrderTotalQuery, function(err, updateOrderTotalQueryResult) { if (err) throw err; });

        orderProduct.forEach(element => {
            let productPreviousQTY = parseInt(element.previousQuantity);
            let newQuantity = parseInt(element.quantity);
            let lineID = element.lineID;
            let price = element.price;
            let productVarientID = element.productVarientID;
            orderTotalPrice += newQuantity * price;

            if (productPreviousQTY != newQuantity) {
                //Delete data from previous from order line with product variant ID and order id;
                let orderID = customerData.id;

                let deleteFromOrderLineQuery = `DELETE from order_line where orderId = ${orderID} and productVariantId = ${productVarientID}`;
                con.query(deleteFromOrderLineQuery, function(err, deleteFromOrderLineResult) { if (err) throw err; });

                //Add data into order_line and order_item;
                let insertOrderLineQuery = "INSERT INTO `order_line` (productVariantId,taxCategoryId,featuredAssetId,orderId) VALUES (" + productVarientID + ", 1,1," + orderID + ")";
                con.query(insertOrderLineQuery, function(err, insertOrderLineResult) {
                    if (err) throw err;
                    let orderLineID = insertOrderLineResult.insertId;
                    // let productVarientID = productVarientID;
                    let productSold = newQuantity;
                    let productPrice = price;
                    let perOrderTotalPrice = productPrice * productSold;

                    //5.6 Insert Data into order_item
                    let taxLineDesc = [{
                        description: "Zero Tax",
                        taxRate: 0
                    }];
                    let taxLine = JSON.stringify(taxLineDesc);
                    let orderItemQuery = `INSERT INTO order_item (initialListPrice,listPrice,listPriceIncludesTax,adjustments,taxLines,cancelled,lineId) VALUES ("${perOrderTotalPrice}" , "${perOrderTotalPrice}",0,'[]','${taxLine}',0,${orderLineID})`

                    //5.7 Need to insert item as much as sold , custom loop
                    for (let i = 0; i < productSold; i++) {
                        con.query(orderItemQuery, function(err, orderItemResult) { if (err) throw err; });
                    }
                });

                let stockQueryUpdate = `SELECT stockAllocated,stockOnHand from product_variant where id = ${productVarientID}`;
                con.query(stockQueryUpdate, function(err, stockResultUpdate) {
                    let r = JSON.parse(JSON.stringify(stockResultUpdate[0]));
                    let s = newQuantity - productPreviousQTY;
                    let previousStockAllocation = r.stockAllocated;
                    let previousStockOnHand = r.stockOnHand;
                    let updateStockAllocation = "";
                    let updateStockOnHand = "";

                    console.log(`Minus Quantity : ${s}`);
                    console.log(`ABS Minus Quantity : ${s}`);
                    console.log(`Previous Stock On Hand : ${previousStockOnHand}`);
                    console.log(`Previous Stock Allocation : ${previousStockAllocation}`);
                    console.log(`New Quantity Allocation : ${parseInt(newQuantity)}`);

                    if (s < 0) {

                        updateStockAllocation = parseInt(previousStockAllocation) + parseInt(s);
                        updateStockOnHand = parseInt(previousStockOnHand) - parseInt(s);
                    } else {
                        // updateStockAllocation = newQuantity;
                        // updateStockOnHand = parseInt(previousStockAllocation) - parseInt(s);
                        let q = Math.abs(s);
                        updateStockAllocation = parseInt(previousStockAllocation) + parseInt(q);
                        updateStockOnHand = parseInt(previousStockOnHand) - parseInt(q);
                    }
                    // updateStockAllocation = newQuantity;
                    // updateStockOnHand = parseInt(previousStockAllocation) - parseInt(s);

                    console.log(`Update Stock On Hand : ${updateStockAllocation}`);
                    console.log(`Update Stock Allocation : ${updateStockOnHand}`);

                    let updateStockOrderQuery = `UPDATE product_variant set stockAllocated = ${updateStockAllocation} , stockOnHand = ${updateStockOnHand} where id = ${productVarientID}`;
                    console.log(updateStockOrderQuery);
                    // return;
                    con.query(updateStockOrderQuery, function(err, updateStockOrderResult) {
                        if (err) throw err;
                    })

                })



            }


        });
    }

    let resp = {
        code: 200,
        status: true,
        data: {}
    };
    res.json(resp);

})

router.post('/getSearchOrder', (req, res) => {
    let postData = req.body.data;
    let fullname = postData;
    let userChannel = parseInt(postData.userChannel);
    let pageNameJSON = `"pageName":"${postData.pageName}"`;
    let sellerNameJSON = `"sellerName":"${postData.sellerName}"`

    // AND cai.`username_website` like '%" + postData.website + "%'
    let orderQuery = "";
    if (postData.pageName != '') {
        if (postData.trackingNumber || postData.username || postData.phoneNumber) {
            condition = "AND";
        } else {
            condition = "OR";
        }

        orderQuery = "Select c.title as fullName ,c.firstName,c.lastName,c.phoneNumber as phoneNumber,cai.`city`,cai.`website`,cai.`username_website`,cai.`whatsapp_number`,ct.`name` as countryName,o.*,occ.channelId as channelID from `order` as o join order_channels_channel as occ on occ.orderId = o.id join customer as c on c.id = o.customerId join customer_additional_info as cai on cai.`customerID` = c.id join country_translation as ct on ct.id = cai.`country` left join shipping_custom as sc on sc.`order_id` = o.`id` where (`code` = '" + postData.trackingNumber + "' AND `title` = '" + postData.username + "' AND c.`phoneNumber` = '" + postData.phoneNumber + "' AND sc.`company` = '" + postData.shippingCarrier + "' " + condition + " cai.`website` like '%" + postData.website + "%' AND occ.channelId = " + userChannel + ") AND `customFields` REGEXP '" + pageNameJSON + "' group by o.code order by o.id DESC ";
    } else if (postData.sellerName != '') {
        if (postData.trackingNumber || postData.username || postData.phoneNumber) {
            condition = "AND";
        } else {
            condition = "OR";
        }

        orderQuery = "Select c.title as fullName ,c.firstName,c.lastName,c.phoneNumber as phoneNumber,cai.`city`,cai.`website`,cai.`username_website`,cai.`whatsapp_number`,ct.`name` as countryName,o.*,occ.channelId as channelID from `order` as o join order_channels_channel as occ on occ.orderId = o.id join customer as c on c.id = o.customerId join customer_additional_info as cai on cai.`customerID` = c.id join country_translation as ct on ct.id = cai.`country` left join shipping_custom as sc on sc.`order_id` = o.`id` where (`code` = '" + postData.trackingNumber + "' AND `title` = '" + postData.username + "' AND c.`phoneNumber` = '" + postData.phoneNumber + "' AND sc.`company` = '" + postData.shippingCarrier + "' " + condition + " cai.`website` like '%" + postData.website + "%' AND occ.channelId = " + userChannel + ")  AND `customFields` RLIKE '" + sellerNameJSON + "' group by o.code order by o.id DESC ";
    } else if (postData.pageName != '' && postData.sellerName != '') {
        if (postData.trackingNumber || postData.username || postData.phoneNumber) {
            condition = "AND";
        } else {
            condition = "OR";
        }

        orderQuery = "Select c.title as fullName ,c.firstName,c.lastName,c.phoneNumber as phoneNumber,cai.`city`,cai.`website`,cai.`username_website`,cai.`whatsapp_number`,ct.`name` as countryName,o.*,occ.channelId as channelID from `order` as o join order_channels_channel as occ on occ.orderId = o.id join customer as c on c.id = o.customerId join customer_additional_info as cai on cai.`customerID` = c.id join country_translation as ct on ct.id = cai.`country` left join shipping_custom as sc on sc.`order_id` = o.`id` where (`code` = '" + postData.trackingNumber + "' AND `title` = '" + postData.username + "' AND c.`phoneNumber` = '" + postData.phoneNumber + "' AND sc.`company` = '" + postData.shippingCarrier + "' " + condition + " cai.`website` like '%" + postData.website + "%' AND occ.channelId = " + userChannel + ") AND `customFields` REGEXP '" + pageNameJSON + "' AND `customFields` RLIKE '" + sellerNameJSON + "' group by o.code order by o.id DESC ";
    } else {

        let condition = ""

        if (postData.trackingNumber || postData.username || postData.phoneNumber) {
            condition = "AND";
        } else {
            condition = "OR";
        }

        orderQuery = "Select c.title as fullName ,c.firstName,c.lastName,c.phoneNumber as phoneNumber,cai.`city`,cai.`website`,cai.`username_website`,cai.`whatsapp_number`,ct.`name` as countryName,o.*,occ.channelId as channelID from `order` as o join order_channels_channel as occ on occ.orderId = o.id join customer as c on c.id = o.customerId join customer_additional_info as cai on cai.`customerID` = c.id join country_translation as ct on ct.id = cai.`country` left join shipping_custom as sc on sc.`order_id` = o.`id` where `code` = '" + postData.trackingNumber + "' AND `title` = '" + postData.username + "' AND c.`phoneNumber` = '" + postData.phoneNumber + "' AND sc.`company` = '" + postData.shippingCarrier + "' " + condition + " cai.`website` like '%" + postData.website + "%' AND occ.channelId = " + userChannel + "  group by o.id order by o.id DESC ";
    }







    console.log(orderQuery);

    con.query(orderQuery, function(err, result) {
        if (err) throw err;

        var rows = JSON.parse(JSON.stringify(result));
        let resp = {
            code: 200,
            status: true,
            data: { rows }
        };
        res.json(resp);
    })

})

router.post('/getOrderByStatus', (req, res) => {
    let postData = req.body.data;

    let status = postData;
    let userChannel = req.body.userChannel;

    let orderQuery = "";
    if (status) {
        orderQuery = "Select c.title as fullName ,c.firstName,c.lastName,c.phoneNumber as phoneNumber,cai.`city`,cai.`website`,cai.`username_website`,cai.`whatsapp_number`,ct.`name` as countryName,o.* from `order` as o join order_channels_channel as occ on occ.orderId = o.id join customer as c on c.id = o.customerId join customer_additional_info as cai on cai.`customerID` = c.id join country_translation as ct on ct.id = cai.`country` left join shipping_custom as sc on sc.`order_id` = o.`id` where o.customState = '" + status + "' AND occ.channelId = " + userChannel + "  order by o.id DESC";
    } else {
        orderQuery = "Select c.title as fullName ,c.firstName,c.lastName,c.phoneNumber as phoneNumber,cai.`city`,cai.`website`,cai.`username_website`,cai.`whatsapp_number`,ct.`name` as countryName,o.* from `order` as o join order_channels_channel as occ on occ.orderId = o.id join customer as c on c.id = o.customerId join customer_additional_info as cai on cai.`customerID` = c.id join country_translation as ct on ct.id = cai.`country` left join shipping_custom as sc on sc.`order_id` = o.`id`  AND occ.channelId = " + userChannel + "  order by o.id DESC";
    }



    con.query(orderQuery, function(err, result) {
        if (err) throw err;

        var rows = JSON.parse(JSON.stringify(result));
        let resp = {
            code: 200,
            status: true,
            data: { rows }
        };
        res.json(resp);
    })
    console.log(postData);
})

router.get('/fetchStock/:userID/:userChannelID', (req, res) => {

    let userID = req.params.userID;
    let userChannelID = req.params.userChannelID;

    // let productVarientQuery = "SELECT pv.`sku`,pv.`stockOnHand`,pv.`stockAllocated`,pvt.`name` as productVarientName,pt.`name` as productName,pvp.`price` as productVarientPrice from product_variant as pv join product as p on p.id = pv.`productId` join product_variant_translation as pvt	on pvt.`baseId` = pv.id join `product_translation` as pt on pt.`baseId` = p.id join `product_variant_price` as pvp on pvp.`variantId` = pv.id join `product_variant_channels_channel` as pvcc on pvcc.`productVariantId` = pv.id where pvcc.`channelId` = '" + userChannelID + "' group by pv.id";
    let productVarientQuery = "SELECT pv.`sku`,pv.`stockOnHand`,pv.`stockAllocated`,pvt.`name` as productVarientName,pt.`name` as productName,pvp.`price` as productVarientPrice,pva.`assetId` as assetID , a.`source` as imageSource , a.preview as imagePreview, pv.createdAt,pv.updatedAt,count(ol.id) as totalOrderCount from product_variant as pv join product as p on p.id = pv.`productId` join product_variant_translation as pvt on pvt.`baseId` = pv.id join `product_translation` as pt on pt.`baseId` = p.id join `product_variant_price` as pvp on pvp.`variantId` = pv.id join `product_variant_channels_channel` as pvcc on pvcc.`productVariantId` = pv.id left join `product_variant_asset` as pva on pva.`productVariantId` = pv.id left join asset as a on a.id = assetID left join order_line as ol on ol.`productVariantId` = pv.id where pvcc.`channelId` = '" + userChannelID + "' group by pv.id";

    console.log(productVarientQuery);

    con.query(productVarientQuery, function(err, result) {
        if (err) throw err;

        var rows = JSON.parse(JSON.stringify(result));

        let resp = {
            code: 200,
            status: true,
            data: { rows }
        };
        res.json(resp);
    })


})

router.get('/getOrderCountVariant/:productVariantID/:userChannelID', (req, res, next) => {
    let userChannel = req.params.userChannelID;
    let productVariantID = req.params.productVariantID


    let productVarientQuery = "SELECT pv.`sku`,pv.`stockOnHand`,pv.`stockAllocated`,pvt.`name` as productVarientName,pt.`name` as productName,pvp.`price` as productVarientPrice,pva.`assetId` as assetID , a.`source` as imageSource , a.preview as imagePreview, pv.createdAt,pv.updatedAt,count(ol.id) as totalOrderCount from product_variant as pv join product as p on p.id = pv.`productId` join product_variant_translation as pvt on pvt.`baseId` = pv.id join `product_translation` as pt on pt.`baseId` = p.id join `product_variant_price` as pvp on pvp.`variantId` = pv.id join `product_variant_channels_channel` as pvcc on pvcc.`productVariantId` = pv.id left join `product_variant_asset` as pva on pva.`productVariantId` = pv.id left join asset as a on a.id = assetID left join order_line as ol on ol.`productVariantId` = pv.id where pvcc.`channelId` = '" + userChannel + "' AND pv.id = " + productVariantID + " group by pv.id";

    console.log(productVarientQuery);

    con.query(productVarientQuery, function(err, result) {
        if (err) throw err;
        var rows = JSON.parse(JSON.stringify(result));
        let orderCount = rows[0].totalOrderCount;

        let resp = {
            code: 200,
            status: true,
            data: { orderCount }
        };
        res.json(resp);
    })
})

module.exports = router;