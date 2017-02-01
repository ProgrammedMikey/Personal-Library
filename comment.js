var mongoose = require( 'mongoose' );
var Book = require('./book')
var Schema   = mongoose.Schema;
 
var CommentSchema = new Schema({
    book   : { type: Schema.Types.ObjectId, ref: 'Book' },
    comments    : { type: String, required: true },
    // status_text    : [Comment]

});
 
mongoose.Promise = global.Promise;
// mongoose.connect( process.env.DB );
module.exports = mongoose.model( 'Comment', CommentSchema );