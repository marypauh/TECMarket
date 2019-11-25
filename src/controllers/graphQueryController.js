//Connet to Neo4j
var logger = require('morgan');
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', '12345'));
var session = driver.session();
//const Migration = require('../config/migration');

//General variables
const Market = require('../models/markets');
const Order = require('../models/orders');
const Product = require('../models/products');

//Controller for Clients Migration View
exports.adminClientsMigration = (req, res) =>{
    //Migration();
    res.render('/migrationClientsView')
}


//Controller for grahp query 1: Search for a particular client and show all their order history.

//exports.clientGraphQuery1 = (req.res) => {
   // session
    //.run('MATCH (n:)')

//}