var mongoose = require( 'mongoose' );
var Comment = require( './comment' );
var Schema   = mongoose.Schema;
 
var BookSchema = new Schema({
    title    : { type: String, required: true },
  commentcount    : { type: Number, default: 0 },
    comments    : [{
      type: String, default: ""
    }],
  // comments : [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
  


});
 
mongoose.Promise = global.Promise;
mongoose.connect( process.env.DB );
module.exports = mongoose.model( 'Book', BookSchema );