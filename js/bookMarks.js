const mongo = require("mongodb").MongoClient;
module.exports = {
  createBookMark: function (obj) {
    return new Promise((resolve, reject) => {
      mongo.connect("mongodb://localhost:27017/",{useNewUrlParser:true,useUnifiedTopology:true}, (err, client) => {
        if (err) {
          reject("Connection Error");
        } else {
          const db = client.db("task");
          db.collection("bookmarks", (err, collection) => {
            if (err) {
              reject("Collection error");
            } else {
              collection.findOne({ link: obj.link }, (err, result) => {
                if (err) {
                  reject(err);
                } else {
                  if (result == null) {
                    collection.insertOne(obj, (err, result) => {
                      if (err) {
                        reject(err);
                      } else {
                        console.log(result.ops);
                        resolve(`BookMark Created with id ${result.ops[0]._id}`);
                      }
                    });
                  } else {
                    reject("link already exists in database");
                  }
                }
              });
            }
          });
        }
      });
    });
  },
  deleteBookMark: function (id) {
    return new Promise((resolve, reject) => {
      mongo.connect("mongodb://localhost:27017/",{useNewUrlParser:true,useUnifiedTopology:true}, (err, client) => {
        if (err) {
          reject("Connection Error");
        } else {
          const db = client.db("task");
          db.collection("bookmarks", (err, collection) => {
            if (err) {
              reject("Collection error");
            } else {
              console.log(id);
              collection.deleteOne({ _id: id }, (err, result) => {
                if (err) {
                  reject(err);
                } else {
                  console.log(result);
                  resolve("Deleted");
                }
              });
            }
          });
        }
      });
    });
  },
  updateTagInBookMark: function (tagTitle, bookmarkid) {
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
              collection.findOne({ title: tagTitle }, (err, result) => {
                if (err) {
                  reject(err);
                } else {
                  if (result == null) {
                    reject("tag does not exist first create this tag");
                  } else {
                    db.collection("bookmarks", (err, collectio) => {
                      if (err) {
                        reject(err);
                      } else {
                        collectio.updateOne(
                          { _id: bookmarkid },
                          {
                            $addToSet: { tags: tagTitle },
                            $set: { timeUpdated: Date.now() },
                          },
                          (err, result) => {
                            if (err) {
                              console.log(err);
                              reject(err);
                            } else {
                              if (result.matchedCount == 0) {
                                reject("No bookmark found with this id");
                              }
                              resolve("bookmark updated");
                            }
                          }
                        );
                      }
                    });
                  }
                }
              });
            }
          });
        }
      });
    });
  },
  removeTagFromBookMark: function (tagTitle, bookmarkid) {
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
              collection.findOne({ title: tagTitle }, (err, result) => {
                if (err) {
                  reject(err);
                } else {
                  if (result == null) {
                    reject("tag does not exist first create this tag");
                  } else {
                    db.collection("bookmarks", (err, collectio) => {
                      if (err) {
                        reject(err);
                      } else {
                        console.log(bookmarkid);
                        collectio.updateOne(
                          { _id: bookmarkid },
                          {
                            $pull: { tags: tagTitle },
                            $set: { timeUpdated: Date.now() },
                          },
                          (err, result) => {
                            if (err) {
                              console.log(err);
                              reject(err);
                            } else {
                              if (result.matchedCount == 0) {
                                reject("No bookmark found with this id");
                              }
                              resolve("bookmark updated");
                            }
                          }
                        );
                      }
                    });
                  }
                }
              });
            }
          });
        }
      });
    });
  },
  retreiveAllBookMark: function () {
    return new Promise((resolve, reject) => {
      mongo.connect("mongodb://localhost:27017/",{useNewUrlParser:true,useUnifiedTopology:true},  (err, client) => {
        if (err) {
          reject("Connection Error");
        } else {
          const db = client.db("task");
          db.collection("bookmarks", (err, collection) => {
            if (err) {
              reject("Collection error");
            } else {
              collection.find({}).toArray((err,result)=>{
                if(err){
                  reject(err);
                }
                else{
                  if(Object.keys(result).length==0){
                    reject("No bookmarks found");
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
