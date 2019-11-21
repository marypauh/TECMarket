//Connet to Neo4j
var logger = require('morgan');
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', '12345'));
var session = driver.session();
//const Migration = require('../config/migration');

//General variables
const Users = require('../models/users');
const Place = require('../models/Places');
const Delivery = require('../models/Delivery');
const Product = require('../models/Products');

//Controller for Clients Migration View
exports.adminClientsMigration = (req, res) =>{
    //Migration();
    res.render('/migrationClientsView')
}