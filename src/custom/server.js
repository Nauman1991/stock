const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");
var mysql = require('mysql');
const axios = require("axios");
const app = express()
const port = 5001
var os = require("os");
var hostname = os.hostname();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
console.log(hostname);
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

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get('/', (req, res) => {
    console.log("Hello World!");
    res.send('Hello World!')
})

app.get('/fetchAramxCity', (req, res) => {
    var runner = require("child_process");
    var phpScriptPath = "./php-script/index.php";
    runner.exec("php " + phpScriptPath, function(err, phpResponse, stderr) {
        if (err) console.log(err); /* log error */
        let arr = phpResponse.split(',');
        let resp = {
            code: 200,
            status: true,
            data: arr
        };
        res.json(resp);
    });
})

app.get('/fetchfastloCity', (req, res) => {
    let url = "https://fastlo.com/api/v1/pickup_cities";
    axios
        .post(url, {
            request: {
                "country": "SA"
            }
        }, {
            headers: {
                "Content-Type": "application/json",
                "fastlo-api-key": "09dbe91e06d3f93ad1fe0456d35acb7fs6p237lb47qlla4idovgu36srabfrlz9"
            }
        })
        .then((response) => {

            let resp = {
                code: 200,
                status: true,
                data: response.data.output.cities_en
            };
            res.json(resp);
        })
        .catch((error) => {
            console.log(error);
        });
})

app.get('/fetchxturboCity', (req, res) => {


    var axios = require('axios');
    var data = JSON.stringify({
        "email": "Liou@gmail.com",
        "password": "123456"
    });

    var config = {
        method: 'post',
        url: 'http://testing.xturbox.com/api/v1/client/login',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then(function(response) {
            let resp = response.data;
            let token = resp.token;
            return fetchXturboCityAPI(token, res);
        })
        .catch(function(error) {
            console.log(error);
        });


})

function fetchXturboCityAPI(token, res) {
    var axios = require('axios');
    var configCity = {
        method: 'get',
        url: 'http://testing.xturbox.com/api/v1/client/cities',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'en',
            'Authorization': `Bearer ${token}`
        }
    };

    axios(configCity)
        .then(function(r) {

            let arr = [];
            r.data.forEach(element => {
                arr.push(element.name_ar)
            });
            console.log(arr);
            let resp = {
                code: 200,
                status: true,
                data: arr
            };
            res.json(resp);
        })
        .catch(function(error) {
            console.log(error);
        });
}

app.post('/addManualOrder', (req, res) => {

    let postData = req.body.data;

    //**Enter Customer And Get Customer ID */
    //1 Insert Data into Uers Table and Get USERID

    let customerEmail = postData.firstName;
    let verified = 1;

    let insertUser = `INSERT INTO user (identifier, verified) VALUES ("${customerEmail}", ${verified})`;
    con.query(insertUser, function(err, result) {
        if (err) throw err;
        let userID = result.insertId;

        //2 Add role
        let userRoleQuery = `INSERT INTO user_roles_role (userId,roleId) VALUES ("${userID}" , 2)`
        con.query(userRoleQuery, function(err, userRoleResult) { if (err) throw err; });


        let customerTitle = postData.firstName + ' ' + postData.lastName;
        let customerAddress = postData.address;
        let customerCountry = postData.country;
        let customerCity = postData.city;
        let customFields = JSON.stringify([{
            'whatsapp_number': postData.whatsapp_number,
            'username_website': postData.username_website,
            'website': postData.website
        }]);

        //3 Insert Data into Customer
        let insertCustomer = `
        INSERT INTO customer (title,firstName,lastName,phoneNumber,emailAddress,userId,customField)
        VALUES
        ("${customerTitle}","${postData.firstName}","${postData.lastName}","${postData.phoneNumber}","${customerEmail}","${userID}",'${customFields}')
        `;

        con.query(insertCustomer, function(err, customerResult) {
            if (err) throw err;
            let customerID = customerResult.insertId;

            //4 Insert Data into customer_channels_channel
            let customerChannelQuery = `INSERT INTO customer_channels_channel (customerId,channelId) VALUES ("${customerID}" , 1)`
            con.query(customerChannelQuery, function(err, customerChannelResult) { if (err) throw err; });

            //4.1 Insert Data into customer_additional_info
            let customerAdditionalInfo = `INSERT INTO customer_additional_info (customerID,city,country,website,username_website,whatsapp_number) VALUES ("${customerID}" , "${customerCity}" ,"${customerCountry}","${postData.website}","${postData.username_website}","${postData.whatsapp_number}")`;
            con.query(customerAdditionalInfo, function(err, customerAdditionalInfoResult) { if (err) throw err; });

            //4.3 Insert Data into address
            let customerAddressQuery = `INSERT INTO address (fullName,company,streetLine1,streetLine2,city,province,postalCode,phoneNumber,defaultShippingAddress,defaultBillingAddress,customerId,countryId) VALUES ("${customerTitle}" , '',"${customerAddress}",'',"${customerCity}",'','',"${postData.phoneNumber}",1,1,${customerID},${customerCountry})`;
            con.query(customerAddressQuery, function(err, customerAddressResult) { if (err) throw err; });

            let customerData = {
                'title': customerTitle,
                'firstName': postData.firstName,
                'lastName': postData.lastName,
                'phoneNumber': postData.phoneNumber,
                'emailAddress': customerEmail,
                'userID': userID,
                'customerID': customerID,
                'address': customerAddress,
                'country': customerCountry,
                'city': customerCity,
                'customFields': customFields
            };


            //5 Insert Data into Order
            insertOrder(postData, customerID, res, customerData);
            return;
        });

    });

});



function insertOrder(data, customerID, res, customerData) {

    //5.1 Get Latest Product Varient Price
    let orderCode = require("crypto").randomBytes(7).toString('hex');
    let active = 1;
    let state = 'Shipped';
    let responseBack = [];
    let productData = [];

    //5.2 Get Order Total
    let orderTotalPrice = 0;
    data.product.forEach((element, key) => {
        let productSold = element.sold;
        let productPrice = element.price;
        orderTotalPrice += productPrice * productSold;
        productData.push({
            'product_id': element.product_id,
            'product_varient_id': element.product_vaient_id,
            'sold': element.sold,
            'price': element.price,
            'name': element.name
        });
    })

    //5.3 Create Order Item And Get Order ID
    let insertOrderQuery = "INSERT INTO `order` (code,state,active,currencyCode,subTotal,subTotalWithTax,taxZoneId,customerId,couponCodes,shippingAddress,billingAddress,customState) VALUES (" + "'" + orderCode + "'" + ", " + "'" + state + "'" + " , 1 , 'USD' ," + orderTotalPrice + " ," + orderTotalPrice + ",0," + customerID + " ,0,'{}','{}','Shipped')";

    con.query(insertOrderQuery, function(err, orderResult) {
        if (err) throw err;
        let orderID = orderResult.insertId;

        //5.4 Insert Data into customer_channels_channel
        let orderChannelQuery = `INSERT INTO order_channels_channel (orderId,channelId) VALUES ("${orderID}" , "${data.userChannel}")`
        con.query(orderChannelQuery, function(err, orderChannelResult) { if (err) throw err; });

        //Insert Data into shipping-custom table
        let shippingData = data.shippingData;
        let shippingCustomQuery = `INSERT INTO shipping_custom (order_id,company,city,street,description) VALUES ("${orderID}","${shippingData.shipping}","${shippingData.city}","${shippingData.street}","${shippingData.address_complement}")`;
        con.query(shippingCustomQuery, function(err, shippingCustomResult) { if (err) throw err; });

        //5.5 Add Item into Order Item Table
        data.product.forEach((element, key) => {
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


        responseBack.push({
            'customer': customerData,
            'orderID': orderID,
            'product': productData
        });

        let resp = {
            code: 200,
            status: true,
            data: {
                'createOrder': {
                    __typename: "ManualOrder",
                    result: responseBack[0]
                }
            }
        };
        res.json(resp);
        return true;
    });
}


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


app.use("/orders", require("./orders"));