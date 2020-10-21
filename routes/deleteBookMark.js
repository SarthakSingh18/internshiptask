const express = require("express");
const router = express.Router();
const bookMark = require("../js/bookMarks");
router.delete("/", (req, res) => {
  if (req.body.id) {
    bookMark
      .deleteBookMark(req.body.id)
      .then((result) => {
        res.status(200).send({ success: "Deleted" });
      })
      .catch((error) => {
        res.status(500).send({ error: error });
      });
  } else {
      res.status(400).send({error:"Please Provide Id "});
  }
});
module.exports=router;
