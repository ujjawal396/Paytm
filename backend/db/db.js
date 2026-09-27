const mongoose=require("mongoose");

async function connectDb(){
    await mongoose.connect("mongodb+srv://ujha64805_db_user:W7Wc8RQoT7lTJqzc@cluster0.yo4dh5f.mongodb.net/?appName=Cluster0");

}

try{
    connectDb();

}catch(err){
 console.log(err);
}
const userSchema = mongoose.Schema({
   username:String,
   password:String,
   firstName:String,
   lastName:String,


})

const User=userSchema.model("User",userSchema);

module.exports={
    User,
}