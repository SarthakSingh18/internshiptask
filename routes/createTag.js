const express=require("express");
const router=express.Router();
const checkRequest=require("../js/checkRequests");
const tags=require("../js/tags");
router.post("/",checkRequest.checkRequestTag,(req,res)=>{
    tags.createTag(res.locals.obj).then((result)=>{
        res.status(200).send({success:result});
    }).catch((error)=>{
        res.status(500).send({error:error});
    })
})
module.exports=router;