const express = require("express");
const router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "vendure-app"
});

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "@stock!@#$%",
//     database: "stock"
// });

router.get('/fetchOrders', (req, res) => {
    let orderQuery = "Select c.title as fullName ,c.firstName,c.lastName,c.phoneNumber as phoneNumber,cai.`city`,cai.`website`,cai.`username_website`,cai.`whatsapp_number`,ct.`name` as countryName,o.* from `order` as o join customer as c on c.id = o.customerId join customer_additional_info as cai on cai.`customerID` = c.id join country_translation as ct on ct.id = cai.`country`order by o.id DESC";
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
        'paymentType': postData.paymentType
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

router.post('/editOrder', (req, res) => {
    let postData = req.body.data;
    let customerID = postData.customerId;
    let title = postData.firstName + ' ' + postData.lastName;

    let updateCustomerQuery = `UPDATE customer SET title = '${title}', firstName = '${postData.firstName}', lastName = '${postData.lastName}' , phoneNumber = '${postData.phoneNumber}' where id = ${customerID}`;

    let updateCustomerAddQuery = `UPDATE customer_additional_info SET whatsapp_number = '${postData.whatsapp_number}', username_website = '${postData.username_website}', website = '${postData.website}' , city = '${postData.city}' where customerID = ${customerID}`

    con.query(updateCustomerQuery, function(err, updateCustomerResult) {
        if (err) throw err;
    });

    con.query(updateCustomerAddQuery, function(err, updateCustomerAddResult) {
        if (err) throw err;
    });

    let resp = {
        code: 200,
        status: true,
        data: {}
    };
    res.json(resp);

})

module.exports = router;