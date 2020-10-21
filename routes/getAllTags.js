const express=require("express");
const router=express.Router();
const tags=require("../js/tags");
router.get("/",(req,res)=>{
    tags.getAllTag().then((result)=>{
        res.status(200).send({success:result});
    }).catch((error)=>{
        res.status(400).send({error:error});
    })
})
module.exports=router;