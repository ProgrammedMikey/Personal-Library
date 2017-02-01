/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

var Book = require( '../book' );
var Comment = require( '../comment' );

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const MONGODB_CONNECTION_STRING = process.env.DB;
//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    Book.find({})
    .exec(function(err, book) {
      if (err) {
        // console.log(err);
        res.send("error")
      } else {
        // var commentcount = book.comment.length
        // console.log(commentcount);
        res.send(book)
      }
    })
    })
    
    .post(function (req, res){
      var title = req.body.title;
    
    var newBook = new Book();
    
    newBook.title = req.body.title;  
   
    newBook.save(function(err, book) {
      if (err) {
        // console.log(err);
        res.send("missing title")
      } else {
        // console.log(ticket);
        res.send(book)
      }
    });
      //response will contain new book object including atleast _id and title
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
     Book.remove({}, function(err){
             if (err) {
        // console.log(err);
        res.send("error deleting")
      } 
      else {
        // console.log(book);
        res.send('complete delete successful')
      }
         });
  
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      var bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    
    
    Book
  .find({_id: bookid}) // all
  // .populate('comments', 'comment')
  .exec(function (err, book) {
     if (err) {
        console.log(err);
        res.send('no book exists')
      } else if (book.length == 0){
        console.log(book);
        res.send('no book exists');
      }else {
         res.json(book[0]);
      }
     
});
    })
    
    
    .post(function(req, res){
      var bookid = req.params.id;
      var comment = req.body.comment;
      //json res format same as .get
    // console.log(comment);     

//     Book.findById(bookid, function(err, doc){
      
//       var newcomment = new Comment();
    
//      newcomment.comment = comment;  
//     newcomment.book = bookid
    
//     newcomment.save(function(err) {
//       console.log(err);
//       // res.send("missing inputs")
//   });

//     doc.comments.push(newcomment);
//     doc.commentcount += 1;
//       console.log(doc);    
//     doc.save(function(err, book) {
//       if (err) {
//         // console.log(err);
//         res.send("missing inputs")
//       } 
//       else {
//         // console.log(book);
//         res.send(book)
//       }
//     });
     
//       });
//     Book.findByIdAndUpdate(bookid, function(err, doc){
    
//     doc.comments.push(req.body.comment);
//     doc.commentcount += 1;
//       console.log(doc);    
//     doc.save(function(err, book) {
//       if (err) {
//         console.log(err);
//         res.send("missing inputs")
//       } 
//       else {
//         console.log(book);
//         res.send(book)
//       }
//     });
//       });
      Book.findOneAndUpdate({_id: bookid}, 
       { 
                "$push": { "comments": comment },
                "$inc": { "commentcount": 1 }
            },
            { "new": true, "upsert": true },
                           function(err, book) {
      if (err) {
        console.log(err);
        res.send('could not update ')
      } else {
        console.log(book);
        res.send(book);
      }
    })
      

    })
    
  
    .delete(function(req, res){
      var bookid = req.params.id;
      //if successful response will be 'delete successful'
    
    
    Book.remove({_id: bookid}, function(err){
             if (err) {
        // console.log(err);
        res.send("no book exists")
      } 
      else {
        // console.log(book);
        res.send('delete successful')
      }
         });
    });
  
};
