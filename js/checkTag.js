const express = require("express");
const mongo = require("mongodb").MongoClient;
module.exports = {
  checkTag: function (tagName) {
    return new Promise((resolve, reject) => {
      mongo.connect("mongodb://localhost:27017", (err, client) => {
        if (err) {
          reject(err);
        } else {
          var db = client.db("task");
          db.collection("tag", (err, collection) => {
            if (err) {
              reject(err);
            } else {
              collection.findOne({ tagName: tagName }, (err, result) => {
                if (err) {
                  reject(err);
                  console.log("error or not found");
                } else if (result == null) {
                  collection.insertOne(
                    {
                      tagName: tagName,
                      timeCreated: Date.now(),
                      timeUpdated: Date.now(),
                    },
                    (err, result) => {
                      if (err) {
                        console.log(err);
                        reject(err);
                        console.log("error while inserting or database error");
                      } else {
                        console.log("tag created");
                        resolve("tag created");
                      }
                    }
                  );
                } else {
                  console.log(result);
                  resolve("tag found");
                }
              });
            }
          });
        }
      });
    });
  },
};
