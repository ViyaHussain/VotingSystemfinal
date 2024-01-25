const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://viyahussain:haviya@cluster0.rckrc1i.mongodb.net/votingsystem?retryWrites=true&w=majority")
.then(()=>{
    console.log("connected to the db")
})
.catch((err)=>console.log(err))

var Schema=mongoose.Schema;
var adminSchema=new Schema({
    username:String,
    password:String
});

let adminModel=mongoose.model('tbl_Admin',adminSchema);

module.exports=adminModel;