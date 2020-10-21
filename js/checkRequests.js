const {v4:uuidv4}=require("uuid");
module.exports = {
  checkRequestBookMark: function (req, res, next) {
    try {
      if (
        req.body.link !== undefined &&
        req.body.title !== undefined &&
        req.body.publisher !== undefined
      ) {
        var object = {};
        object = {
          _id:uuidv4(),
          link: req.body.link,
          title: req.body.title,
          timeCreated: Date.now(),
          timeUpdated: Date.now(),
          publisher: req.body.publisher,
          tags:[]
        };
        console.log(object + "from checkRequest");
        res.locals.object = object;
        next();
      } else {
        res
          .status(300)
          .send({
            error:
              "Error in request please provide these fields link,title,publisher,tags properly in body",
          });
      }
    } catch (e) {
      console.log(e);
      res
        .status(400)
        .send({
          error:
            "Error in request please provide these fields link,title,publisher,tags properly in body",
        });
      return;
    }
  },
checkRequestTag:function(req,res,next){
  try{
    console.log(req.header("title"));
    if(req.body.title!==undefined){
      const obj={
        _id:uuidv4(),
        title:req.body.title,
        timeCreated:Date.now(),
        timeUpdated:Date.now()
      }
      res.locals.obj=obj;
      next();
    }
    else{
      res.status(400).send({error:"Error in request please provide tag title in body"});
    }
  }
  catch(e){
    console.log(e);
    res.status(400).send({error:"Error in request please provide tag title in body"});

  }
}
};
