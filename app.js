const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path =require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate"); //helps creating different layouts



const MONGO_URL = "mongodb://127.0.0.1:27017/journeyJunction";

main().then(() =>{
    console.log("conn to db");
})
.catch((err)=>{
console.log(err);
});


async function main() {
    await mongoose.connect(MONGO_URL)
}


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));



app.get("/" , (req, res)=>{
    res.send("get");
});


//index route
app.get("/listings", async (req,res)=>{
 const allListings =  await Listing.find({});
  res.render("listings/index.ejs", {allListings});
});


//new router
app.get("/listings/new", (req, res)=>{
    res.render("listings/new.ejs");
});

//show route a specific
app.get("/listings/:id", async(req, res)=>{
let {id} = req.params;
const listing = await Listing.findById(id);
res.render("listings/show.ejs",{listing});
});


//create route
app.post("/listings" , async (req,res)=>{
// let {title, description, image, price, country, location} = req.body;  //(we can use this way to extract details from the fomr but using the next line instead)
let listing = req.body.listing;
console.log(listing);
const newListing = new Listing(listing);
await newListing.save();
res.redirect("/listings");
});

//edit route
app.get("/listings/:id/edit", async (req,res)=>{
    let {id} =req.params;
    const listing = await Listing.findById(id);
    
    res.render("listings/edit.ejs",{listing});
});

//update route
app.put("/listings/:id", async (req, res)=>{
    let {id} = req.params;
    const see = await Listing.findByIdAndUpdate(id, {...req.body.listing},{ new: true }); //add filter, then destructered, then option to print updated data in console
    console.log(see); // this step is optional,did only for testing
    res.redirect(`/listings/${id}`);
});


//delete route
app.delete("/listings/:id" , async (req,res)=>{
let {id} = req.params;
let deleteListing = await Listing.findByIdAndDelete(id);
console.log(deleteListing);
res.redirect("/listings");
});



app.listen(8080, ()=>{
    console.log("listening at port 8080");
});
