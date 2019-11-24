var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', '12345'));
var session = driver.session();

const Markets = require('../models/markets');
const Users = require('../models/users');
const Products = require('../models/products');
const Orders = require('../models/orders');

module.exports = async()=>{
    session
        .run('MATCH (n)DETACH  DELETE n')
        .then(function(result){
            session.close();                
        })
        .catch(function(err){
            console.log(err);
        })

    const adminMongoClients = await Users.find({type: 2});
    for(var i = 0; i < adminMongoClients.length; i++){
        const client = adminMongoClients[i];
        console.log(client);
        //const idUser = client.idUser;
        const nameParam = client.name;
        const emailParam = client.email;
        const telephoneParam = client.telephone;
        const dateUParam = client.dateU;
        const typeParam = client.type;
        const usernameParam = client.username;
        const passwordParam = client.password;
        console.log(nameParam);
 

        session
        .run('CREATE (n:Clients {name: {nameP},email:{emailP},telephone:{telephoneP},type:{typeP},username:{usernameP}}) Return n',
        {nameP:nameParam,emailP:emailParam,telephoneP:telephoneParam,typeP:typeParam,usernameP:usernameParam})
        .then(function(result){
            session.close();
            console.log("eerr");                
        })
        .catch(function(err){
            console.log("error");
            console.log(err);
        })
    };

    const adminMongoEmployees = await Users.find({type: 1});
    for(var i = 0; i < adminMongoEmployees.length; i++){
        const employee = adminMongoEmployees[i];
        console.log(employee);
        //const idUser = client.idUser;
        const nameParam = employee.name;
        const emailParam = employee.email;
        const telephoneParam = employee.telephone;
        const dateUParam = employee.dateU;
        const typeParam = employee.type;
        const usernameParam = employee.username;
        const passwordParam = employee.password;
        console.log(nameParam);
 

        session
        .run('CREATE (n:Employees {name: {nameP},email:{emailP},telephone:{telephoneP},type:{typeP},username:{usernameP}}) Return n',
        {nameP:nameParam,emailP:emailParam,telephoneP:telephoneParam,typeP:typeParam,usernameP:usernameParam})
        .then(function(result){
            session.close();
            console.log("eerr");                
        })
        .catch(function(err){
            console.log("error");
            console.log(err);
        })
    };

    const productsMongo = await Products.find();
    for(var i = 0; i < productsMongo.length; i++){
        const product = productsMongo[i];
        console.log(product);
        const idPr = product.idProduct;
        const nameP = product.name;
        const descriptionP = product.description;
        const quantityP = product.quantity;

        session
        .run('CREATE (n:Products {idProduct: {idP}, name: {namePr},description:{desP},quantity:{quantP}}) Return n',
        {idP :idPr, namePr :nameP,desP:descriptionP,quantP:quantityP})
        .then(function(result){
            session.close();
            console.log("eerr");                
        })
        .catch(function(err){
            console.log("error");
            console.log(err);
        })
    };
    const marketsMongo = await Markets.find();
    for(var i = 0; i < marketsMongo.length; i++){
        const market = marketsMongo[i];
        console.log(market);
        const nameM = market.name;
        const descriptionM = market.description;
        const latM = market.latitude;
        const lonM = market.length;
        const directionM = market.direction;

        session
        .run('CREATE (n:Markets {name: {namePr}, description:{desP}, latitude:{lat}, lenght:{len},dirrection:{dir}}) Return n',
        {namePr :nameM,desP:descriptionM,lat:latM, len: lonM, dir: directionM})
        .then(function(result){
            session.close();
            console.log("eerr");                
        })
        .catch(function(err){
            console.log("error");
            console.log(err);
        })

    };


 };