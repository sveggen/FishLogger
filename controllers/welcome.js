'use strict';

// import all required modules
const logger = require('../utils/logger');
const fishlistStore = require('../models/fishlist-store.js');
const userStore = require('../models/user-store.js');
const accounts = require ('./accounts.js');

// create welcome object
const welcome = {

  // index method - responsible for creating and rendering the view
   index(request, response) {

    const loggedInUser = accounts.getCurrentUser(request);
    logger.info('welcome rendering');

    if(loggedInUser){
      
      //Retrieving different collections and assigning them to const's
      const userfishlists = fishlistStore.getUserFishlists(loggedInUser.id);
      const fishlists = fishlistStore.getAllFishlists();
      const users = userStore.getAllUsers();
  
      
      //Number of fishing trips user have
      let numFishlists = userfishlists.length;
      //Number of fish user have caught
      let numFishes = 0;
      for (let i in userfishlists) {
        numFishes = numFishes + userfishlists[i].fishes.length 
      }
      
      //Fishing trip with the most amount of catches
      let bestlistnum = 0;
      let bestlistname = null;
      //for all fishlists
      for (let i in userfishlists) {
        //assigns length of list (num of items) to let if 
        //length is greater than current value
        let blist = userfishlists[i].fishes.length;
        if(blist>bestlistnum){
          bestlistnum = blist;
          bestlistname = userfishlists[i].title;
        }
        else if (bestlistnum == 0){
          bestlistnum = blist;
          bestlistname = userfishlists[i].title;
        }
      }
      
      //Average fish per trip
      let averageFish = 0;
      averageFish = averageFish + Math.round(numFishes / numFishlists) || 0;  
      
      //Fishing trip with the least amount of catches
      let worstlistnum = 0;
      let worstlistname = null;
         for (let i in userfishlists) {
        //assign length of list (num of items) to let if 
        //length is greater than current value
        let wlist = userfishlists[i].fishes.length;
        if(wlist<worstlistnum){
          worstlistnum = wlist;
          worstlistname = userfishlists[i].title;
        }
           else if(worstlistnum <= 0){
            worstlistnum = wlist;
            worstlistname = userfishlists[i].title;
           } 
      }
      
      //global stats
      
      //Number of fish that have been caught globally
      let numFishesGlobally = 0;
      for (let i in fishlists) {
        numFishesGlobally = numFishesGlobally + fishlists[i].fishes.length;
      }
      //Number of users
      let numUsers = users.length;
      
      //Name of user with most fish
      let nameMostItemUser = null;
      let mostItemUser = 0;
      for (let i in users) {
        const userlist = fishlistStore.getUserFishlists(users[i].id);
        logger.info("User id: " + users[i].id);
        let userTotalFishes = 0;
        for (let j in userlist){
          const indexLength = userlist[j].fishes.length;
          logger.info("Fishlist " + j + "has this many fishes: " + indexLength);
          userTotalFishes = userTotalFishes + indexLength;
        }
        logger.info("User " + users[i].id + "has this many fishes in total: " + userTotalFishes);
        if (userTotalFishes >= mostItemUser){
          mostItemUser = userTotalFishes;
          nameMostItemUser = users[i].firstName + " " + users[i].lastName.slice(0,1)+ ".";
          logger.info("Name of new most fishes person is: "+ nameMostItemUser);
        }
      }
      
      //Name of user with the least fishes
      let nameMinItemUser = null;
      let minItemUser = null;
      for (let i in users) {
        const userlist = fishlistStore.getUserFishlists(users[i].id);
       logger.info("User id: " + users[i].id);
        let userTotalFishes = 0;
        for (let j in userlist){
          const indexLength = userlist[j].fishes.length;
           logger.info("Fishlist " + j + "has this many fishes: " + indexLength);
          userTotalFishes = userTotalFishes + indexLength;
        }
        if (userTotalFishes <= minItemUser){
          minItemUser = userTotalFishes;
          nameMinItemUser = users[i].firstName + " " + users[i].lastName.slice(0,1) + ".";
          logger.info(users[i].firstName.toString);
        }
            else if(minItemUser == null){
            minItemUser = userTotalFishes;
            nameMinItemUser = users[i].firstName + " " + users[i].lastName.slice(0,1)+ ".";
           }
        }
      const viewData = {
        title: 'Welcome to the FishLogger App!',
        totalFishlists: numFishlists,
        totalFishes: numFishes,
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        avgnumFishes: averageFish,
        besttrip: bestlistname,
        bestlistnum: bestlistnum,
        worsttrip: worstlistname,
        worstlistnum: worstlistnum,
        totalFishesGlobal: numFishesGlobally,
        averageuseritem: Math.round(numFishesGlobally / numUsers),
        mostItemsUser: nameMostItemUser,
        minItemsUser: nameMinItemUser,
        picture: loggedInUser.picture
      };

      response.render('welcome', viewData);
    }
    else response.redirect('/');
  },
};

// export the welcome module
module.exports = welcome;