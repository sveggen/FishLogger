'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const commentStore = {

store: new JsonStore('./models/comment-store.json', {comments: []}),
collection: 'comments',

  getAllComments() {
    return this.store.findAll(this.collection);
  },
    
  editComment(commentId, updatedComment) {
   const comment = this.getComment(commentId)
   comment.comment = updatedComment.comment;
  },
  
  getComment(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  
   addComment(id, comment) {
    this.store.add(this.collection, comment);
  },

  removeComment(id) {
    const comment = this.getComment(id);
    this.store.remove(this.collection, comment);
  },
};


module.exports = commentStore;