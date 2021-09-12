const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");
var mysql = require('mysql');
const app = express()
const port = 5001

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "vendure-app"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get('/', (req, res) => {
    console.log("Hello World!");
    res.send('Hello World!')
})

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


        //3 Insert Data into Customer
        let insertCustomer = `
        INSERT INTO customer (title,firstName,lastName,phoneNumber,emailAddress,userId)
        VALUES
        ("${postData.firstName}","${postData.lastName}","${postData.lastName}","${postData.phoneNumber}","${customerEmail}","${userID}")
        `;

        con.query(insertCustomer, function(err, customerResult) {
            if (err) throw err;
            let customerID = customerResult.insertId;

            //4 Insert Data into customer_channels_channel
            let customerChannelQuery = `INSERT INTO customer_channels_channel (customerId,channelId) VALUES ("${customerID}" , 1)`
            con.query(customerChannelQuery, function(err, customerChannelResult) { if (err) throw err; });

            //5 Insert Data into Order
            insertOrder(postData, customerID, res);
            return;
        });

    });

    // let query = "Select * from customer";
    // con.query(query, function(err, result, fields) {
    //     if (err) throw err;
    //     console.log(result);
    // });


});


function insertOrder(data, customerID, res) {

    //5.1 Get Latest Product Varient Price
    let orderCode = require("crypto").randomBytes(7).toString('hex');
    let active = 1;
    let state = 'Shipped';

    //5.2 Get Order Total
    let orderTotalPrice = 0;
    data.product.forEach((element, key) => {
        let productSold = element.sold;
        let productPrice = element.price;
        orderTotalPrice += productPrice * productSold
    })

    //5.3 Create Order Item And Get Order ID
    let insertOrderQuery = "INSERT INTO `order` (code,state,active,currencyCode,subTotal,subTotalWithTax,taxZoneId,customerId,couponCodes,shippingAddress,billingAddress) VALUES (" + "'" + orderCode + "'" + ", " + "'" + state + "'" + " , 1 , 'USD' ," + orderTotalPrice + " ," + orderTotalPrice + ",0," + customerID + " ,0,'{}','{}')";

    con.query(insertOrderQuery, function(err, orderResult) {
        if (err) throw err;
        let orderID = orderResult.insertId;

        //5.4 Insert Data into customer_channels_channel
        let orderChannelQuery = `INSERT INTO order_channels_channel (orderId,channelId) VALUES ("${orderID}" , 1)`
        con.query(orderChannelQuery, function(err, orderChannelResult) { if (err) throw err; });


        //5.6 Add Item into Order Item Table
        data.product.forEach((element, key) => {
            let product_vaient_id = element.product_vaient_id;
            let insertOrderLineQuery = "INSERT INTO `order_line` (productVariantId,taxCategoryId,featuredAssetId,orderId) VALUES (" + product_vaient_id + ", 1,1," + orderID + ")";
            con.query(insertOrderLineQuery, function(err, insertOrderLineResult) {
                if (err) throw err;
                let orderLineID = insertOrderLineResult.insertId;
                let productSold = element.sold;
                let productPrice = element.price;
                let perOrderTotalPrice = productPrice * productSold;

                //5.7 Insert Data into order_item
                // let taxLineDesc = '"[{"description":"Zero Tax","taxRate":0}]"';
                let taxLineDesc = [{
                    description: "Zero Tax",
                    taxRate: 0
                }];
                let taxLine = JSON.stringify(taxLineDesc);
                let orderItemQuery = `INSERT INTO order_item (initialListPrice,listPrice,listPriceIncludesTax,adjustments,taxLines,cancelled,lineId) VALUES ("${perOrderTotalPrice}" , "${perOrderTotalPrice}",0,'[]','${taxLine}',0,${orderLineID})`

                //5.7.1 Need to insert item as much as sold , custom loop
                for (let i = 0; i < productSold; i++) {
                    con.query(orderItemQuery, function(err, orderItemResult) { if (err) throw err; });
                }



            });
        })

        let resp = {
            code: 200,
            status: true,
            data: {
                'createOrder': {
                    __typename: "ManualOrder",
                    result: orderResult
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