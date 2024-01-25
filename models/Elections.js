const mongoose = require('mongoose');

//database connection
mongoose.connect("mongodb+srv://viyahussain:haviya@cluster0.rckrc1i.mongodb.net/votingsystem?retryWrites=true&w=majority")
.then(()=>{
    console.log("connected to the db")
})
.catch((err)=>console.log(err))

var Schema=mongoose.Schema;
var electionSchema=new Schema({
    electionName:{type: String, required:true},
    candidatesNo:{type: Number, integer:true},
    startingDate:{type: Date, required:true},
    endingDate:{type: Date, required:true},
    status:{type: String, required:true},
})

let electionModel=mongoose.model('tbl_election',electionSchema);

module.exports=electionModel;