import mongoose from "mongoose";
const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        default:"user.png"
    },
    profilePic: {
        type: String,
    },

})

const UserModel = mongoose.model("userInfos",UserSchema);
export default UserModel