const mongoose = require('mongoose');

//database connection
mongoose.connect("mongodb+srv://viyahussain:haviya@cluster0.rckrc1i.mongodb.net/votingsystem?retryWrites=true&w=majority")
.then(()=>{
    console.log("connected to the db")
})
.catch((err)=>console.log(err))

var Schema=mongoose.Schema;
var candidateSchema=new Schema({
    name:{type: String, required:true},
    email:{type: String, required:true},
    rollNo:{type: String, required:true},
    Dept:{type: String, required:true},
    position:{type:String,required:true},
    applicationDate:{type:String,require:true},
    status:{type:String,require:true}

})

let candidateModel=mongoose.model('tbl_candidates',candidateSchema);

module.exports=candidateModel;