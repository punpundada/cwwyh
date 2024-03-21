import mongoose from 'mongoose';

const CuisineSchema =new mongoose.Schema({
    cuisineName:{
        type:String,
        required:[true,'Cuisine Name is a Required Field']
    },
},
{
    timestamps:true,
});
const Cuisine= mongoose.model('Cuisine' , CuisineSchema);
export default Cuisine;
