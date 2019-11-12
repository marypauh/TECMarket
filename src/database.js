const mongoose = require('mongoose');
const dbURL = "mongodb+srv://mariaRodriguez:sa123@proyecto2-w4im1.mongodb.net/TECMarket?retryWrites=true&w=majority";

module.exports = ()=>{
    mongoose.connect(dbURL, {useNewUrlParser: true})
    .then(()=> console.log(`Mongo connected on ${dbURL}`))
    .catch(err => console.log(`Mongo connected on ${err}`))

    process.on('SINGIT', ()=>{
        mongoose.connection.close(()=>{
            console.log('Mongo is disconnected');
            process.exit(0);
        });
    });
    mongoose.set('useFindAndModify',false);
    mongoose.set('findByIdAndUpdate',true);
    mongoose.set('findOneAndUpdate',true);
}