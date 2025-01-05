const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listingSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String 
    },
    image: {
        filename:String,
        url:{
            type: String,
            default: "https://c4.wallpaperflare.com/wallpaper/464/268/977/motel-airbnb-hot-tub-planes-comic-art-hd-wallpaper-preview.jpg",
            set: (v) =>
                v === ""? "https://c4.wallpaperflare.com/wallpaper/464/268/977/motel-airbnb-hot-tub-planes-comic-art-hd-wallpaper-preview.jpg":v,
           },
    },
    price:Number,
    location:String,
    country:String
})
const Listing= mongoose.model("Listing",listingSchema);
module.exports=Listing;