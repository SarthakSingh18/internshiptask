const bodyParser = require("body-parser");
const express=require("express");
const app=express();
app.use(express.json());
const port=3000||process.env.port;
const createBookMark=require("./routes/createBookMark");
const deletebookmark=require("./routes/deleteBookMark");
const createTag=require("./routes/createTag");
const deleteTag=require("./routes/deleteTag");
const updateBookMark=require("./routes/addTagToBookmark");
const removeTagFromBookMark=require("./routes/removeTagFromBookmark");
const getAllBookmark=require("./routes/retreiveAllBookMark");
const getAllTags=require("./routes/getAllTags");
app.use("/createbookmark",createBookMark);
app.use("/deletebookmark",deletebookmark);
app.use("/createtag",createTag);
app.use("/deletetag",deleteTag);
app.use("/addtagtobookmark",updateBookMark);
app.use("/removetagfrombookmark",removeTagFromBookMark);
app.use("/getallbookmark",getAllBookmark);
app.use("/getalltags",getAllTags);
app.listen(port,(()=>{
    console.log("Listening at 3000")
}))