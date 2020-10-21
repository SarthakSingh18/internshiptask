const express=require("express");
const router=express.Router();
const bookMark=require("../js/bookMarks");
router.get("/",(req,res)=>{
    bookMark.retreiveAllBookMark().then((result)=>{
        res.status(200).send({sucess:result});
    }).catch((error)=>{
        res.status(400).send({error:error});
        console.log(error);
    })
})
module.exports=router;