const express=require("express");
const router=express.Router();
const bookmark=require("../js/bookMarks");
router.post("/",(req,res)=>{
    if(req.body.titleOfTag!=undefined&&req.body.bookmarkId!==undefined){
        bookmark.updateTagInBookMark(req.body.titleOfTag,req.body.bookmarkId).then((result)=>{
            res.status(200).send({sucess:result});
        }).catch((error)=>{
            res.status(400).send({error:error})
        })
    }
})
module.exports=router;