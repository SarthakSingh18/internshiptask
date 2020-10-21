const express=require("express");
const router=express.Router();
const bookmark=require("../js/bookMarks");
router.delete("/",(req,res)=>{
    if(req.body.bookmarkId!==undefined&&req.body.tagName!==undefined){
        console.log(req.body.bookmarkId,req.body.tagName);
        bookmark.removeTagFromBookMark(req.body.tagName,req.body.bookmarkId).then((result)=>{
            res.status(200).send({success:result});
        }).catch((error)=>{
            res.status(400).send({error:error});
        })
    }
    else{
        res.status(400).send({error:"Please Provide tagname and bookmark id"});
    }
})
module.exports=router;