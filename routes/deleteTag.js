const express=require("express");
const tags = require("../js/tags");
const router=express.Router();
router.delete("/",(req,res)=>{
    if(req.body.id){
        tags.deleteTag(req.body.id).then((result)=>{
            res.status(200).send({success:result})
        }).catch((error)=>{
            res.status(400).send({error:error});
        })
    }
    else{
        res.status(400).send({error:"please provide id in body"})
    }
})
module.exports=router;