const mongoose=require("mongoose")

require("dotenv").config();

exports.connect =() =>{
  console.log(process.env.MONGODB_URL)
  mongoose.connect(process.env.MONGODB_URL,{
    // useNewUrlParser:true,
    // useUnifiedTopology:true

  })
  .then(()=>console.log("DB Connction done"))
  .catch((err)=>
  {
    console.log("DB Connection not possible.")
    console.log(err)
    process.exit(1);
  })
}