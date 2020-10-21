const mongo = require("mongodb").MongoClient;
module.exports = {
  createTag: function (obj) {
    return new Promise((resolve, reject) => {
      mongo.connect("mongodb://localhost:27017/",{useNewUrlParser:true,useUnifiedTopology:true},  (err, client) => {
        if (err) {
          reject(err);
        } else {
          const db = client.db("task");
          db.collection("tag", (err, collection) => {
            if (err) {
              reject(err);
            } else {
              console.log(obj.title);
              collection.findOne({ title: obj.title }, (err, result) => {
                if (err) {
                  reject(err);
                } else {
                  if (result == null) {
                    collection.insertOne(obj, (err, result) => {
                      if (err) {
                        reject(err);
                      } else {
                        resolve(`Tag Created with id ${result.ops[0]._id}`);
                      }
                    });
                  } else {
                    reject("Tag already existed");
                  }
                }
              });
            }
          });
        }
      });
    });
  },
  deleteTag: function (id) {
    return new Promise((resolve, reject) => {
      mongo.connect("mongodb://localhost:27017/", {useNewUrlParser:true,useUnifiedTopology:true}, (err, client) => {
        if (err) {
          reject("Connection Error");
        } else {
          const db = client.db("task");
          db.collection("tag", (err, collection) => {
            if (err) {
              reject("Collection error");
            } else {
              collection.deleteOne({ _id: id }, (err, result) => {
                if (err) {
                  reject(err);
                } else {
                  if (result.deletedCount == 0) {
                    reject("Tag does not exist with this id");
                  } else {
                    resolve("Deleted");
                  }
                }
              });
            }
          });
        }
      });
    });
  },
  getAllTag: function () {
    return new Promise((resolve, reject) => {
      mongo.connect("mongodb://localhost:27017/",{useNewUrlParser:true,useUnifiedTopology:true},  (err, client) => {
        if (err) {
          reject("Connection Error");
        } else {
          const db = client.db("task");
          db.collection("tag", (err, collection) => {
            if (err) {
              reject("Collection error");
            } else {
              collection.find({}).toArray((err,result)=>{
                if(err){
                  reject(err);
                }
                else{
                  if(Object.keys(result).length==0){
                    reject("No tags found")
                  }
                  resolve(result);
                }
              })
            }
          });
        }
      });
    });
  },

};
