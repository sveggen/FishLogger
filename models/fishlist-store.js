'use strict';

const cloudinary = require('cloudinary');
const logger = require('../utils/logger');

try {
  const env = require('../.data/.env.json');
  cloudinary.config(env.cloudinary);
}
catch(e) {
  logger.info('You must provide a Cloudinary credentials file - see README.md');
  process.exit(1);
}

const _ = require('lodash');
const JsonStore = require('./json-store');

const fishlistStore = {

  store: new JsonStore('./models/fishlist-store.json', { fishlistCollection: [] }),
  collection: 'fishlistCollection',

  getAllFishlists() {
    return this.store.findAll(this.collection);
  },

  getFishlist(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  

  addFishlist(fishlist, response) {
    fishlist.picture.mv('tempimage', err => {
        if (!err) {
          cloudinary.uploader.upload('tempimage', result => {
            console.log(result);
            fishlist.picture = result.url;
            response();
          });
        }
      });
    this.store.add(this.collection, fishlist);
  },

  removeFishlist(id) {
    const fishlist = this.getFishlist(id);
    this.store.remove(this.collection, fishlist);
  },

  removeAllFishlists() {
    this.store.removeAll(this.collection);
  },

  addFish(id, fish, response) {
    const fishlist = this.getFishlist(id);
    fish.picture.mv('tempimage', err => {
        if (!err) {
          cloudinary.uploader.upload('tempimage', result=> {
            console.log(result);
            fish.picture = result.url;
            response();
          });
        }
      });
    fishlist.fishes.push(fish);
  },

  removeFish(id, fishId) {
    const fishlist = this.getFishlist(id);
    const fishes = fishlist.fishes;
    _.remove(fishes, { id: fishId});
  },
  editFish(id, fishId, updatedFish) {
    const fishlist = this.getFishlist(id);
    const fishes = fishlist.fishes;
    const index = fishes.findIndex(fish => fish.id === fishId);
    fishes[index].specie = updatedFish.specie;
    fishes[index].length = updatedFish.length;
    fishes[index].weight = updatedFish.weight;
    fishes[index].placecaught = updatedFish.placecaught;
  },
   getUserFishlists(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
};

module.exports = fishlistStore;