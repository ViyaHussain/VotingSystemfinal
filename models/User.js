const mongoose = require('mongoose');

//database connection
mongoose.connect("mongodb+srv://viyahussain:haviya@cluster0.rckrc1i.mongodb.net/votingsystem?retryWrites=true&w=majority")
.then(()=>{
    console.log("connected to the db")
})
.catch((err)=>console.log(err))

var Schema=mongoose.Schema;
var userSchema=new Schema({
    username:{type: String, required:true},
    password:{type: String, required:true},
    rollNo:{type: String, required:true},
    Dept:{type: String, required:true},
    email:{type: String, required:true},
})

let userModel=mongoose.model('tbl_User',userSchema);

module.exports=userModel;