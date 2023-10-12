const mongoose = require('mongoose');
const express = require('express');
const app = express();
const mongoURI = 'mongoURL';

// const mongoDB = async() => {
//       await mongoose.connect(mongoURI, {useNewUrlParser: true}, async(err,res)=>{
//         if(err) console.log("---",err);
//         else{
//             console.log("Connected");
//         }        
//       });
// }

const mongoDB = async() => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(mongoURI)
        console.log('Mongo connected');
        const fetched_data = await mongoose.connection.db.collection("food_items")
        // await fetched_data.find({}, {projection: {}}).toArray(function( err, data){
        //     if(err) console.log(err);
        //     else console.log(data);
        // })
        const data = await fetched_data.find({}, {projection: {}}).toArray();
        const foodCategory = await mongoose.connection.db.collection("food_category");
        const catData = await foodCategory.find({}, {projection: {}}).toArray();

        global.food_items = data;
        global.foodCategory = catData;
        //console.log(global.food_items);
        //console.log(global.foodCategory);
    }
    catch (error) {
        console.log(error)
        process.exit()
    }
}

module.exports = mongoDB;
