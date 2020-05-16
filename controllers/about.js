'use strict';

// import all required modules
const logger = require('../utils/logger');
const developerStore = require('../models/developer-store.js');
const accounts = require ('./accounts.js');
const uuid = require('uuid');
const commentStore = require ('../models/comment-store.js');

// create about object
const about = {

  // index method - responsible for creating and rendering the view
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request); 
    logger.info('about rendering');
    if (loggedInUser) {
      const viewData = {
        title: 'About FishLogger ',
        developers: developerStore.getAllDevelopers(),
        firstname: loggedInUser.firstName,
        userid: loggedInUser.id,
        comments: commentStore.getAllComments(),
        loggedinuserid: loggedInUser.id,
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        picture: loggedInUser.picture,
      };
      logger.info('about to render' + viewData.loggedinuserid);
      response.render('about', viewData);
    }
    else response.redirect('/');    
  },
  
  deleteComment(request, response) {
    const commentId = request.params.id;
    logger.debug(`Deleting comment ${commentId}`);
    commentStore.removeComment(commentId);
    response.redirect('/about/');
  },
    addComment(request, response) {
    const date = new Date();
    const commentId = request.params.id;
    const loggedInUser = accounts.getCurrentUser(request);
    const newComment = {
      id: uuid(),
      userid: loggedInUser.id,
      commenter: loggedInUser.firstName,
      date: date,
      comment: request.body.comment,
      profilepic: loggedInUser.picture,
    };
    commentStore.addComment(commentId, newComment);
    response.redirect('/about/');
  },
  
  editComment(request, response){
    const commentId = request.params.commentid;
    const updatedComment = {
      comment:request.body.comment,
    };
    commentStore.editComment(commentId, updatedComment);
    response.redirect('/about/');
  }
  
};

// export the about module
module.exports = about;