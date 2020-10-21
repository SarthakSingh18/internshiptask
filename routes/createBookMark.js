const express = require("express");
const router = express.Router();
const checkRequest = require("../js/checkRequests");
const checkTag = require("../js/checkTag");
const bookMark = require("../js/bookMarks");
router.post("/", checkRequest.checkRequestBookMark, (req, res) => {
  checkTag
    .checkTag(req.body.tags)
    .then((result) => {
      console.log(result);
      res.locals.object["tags"].push(req.body.tags);
      return bookMark.createBookMark(res.locals.object);
    })
    .catch((error) => {
      return Promise.reject(error);
    })
    .then((result) => {
      res.status(200).send({sucess:result});
    })
    .catch((error) => {
      return Promise.reject(error);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send({ error: error });
    });
});
module.exports = router;
