'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const fishspecie = {

species: require ('./fishspecie.json').species,
families: require ('./fishspecie.json').families,

  
getAllSpecies() {
  return this.species;
  },

  getAllFamilies() {
    return this.store.findAll(this.collection);
  },
};


module.exports = fishspecie;