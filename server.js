// use javascript in strict mode
'use strict';

// import all required modules

const express = require("express");
const logger = require('./utils/logger');
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const bcrypt = require('bcrypt');

// initialise project
const app = express();

// static files output to public folder
app.use(express.static("public"));

//use bodyparser
app.use(bodyParser.urlencoded({extended: false,}));
app.use(cookieParser());
app.use(fileUpload());


// use handlebars as view engine
app.engine(
  ".hbs",
  exphbs({
    extname: ".hbs",
    defaultLayout: "main",

    helpers: {
      uppercase: function(word) {
        let uppercaseWord = word.toUpperCase();
        return uppercaseWord;
      },
      formatDate: function(date) {
        let d = new Date(date);
        let dayNum = d.getDay();
        let dateNum = d.getDate();
        let month = d.getMonth();
        let year = d.getFullYear();

        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        
        let monthname = months[month];
        let dayname = days[dayNum];
        
        return dayname + " " + monthname + " " + dateNum + ", " + year;
      },
       formatDateTime: function(date) {
        let d = new Date(date);
        let minutes = d.getMinutes();
        let hour = d.getHours();
         
        let twodigminutes = 0;
         if (minutes<10){
          twodigminutes = "0" + minutes
         }else{
           twodigminutes = "" + minutes
         }
         
         let twodighour = 0;
         if (hour<10){
          twodighour = "0" + hour
         }else{
           twodighour = "" + hour
         }
        
        return twodighour + ":" + twodigminutes;
      },
      capitalise: function(word) {
        let capitalisedWord = word[0].toUpperCase() + word.slice(1);
        return capitalisedWord;
      },
      
      select: function(value, options){
        var $el = $('<select />').html( options.fn(this) );
        $el.find('[value="' + value + '"]').attr({'selected':'selected'});
        return $el.html();
      },
      
    ifCond: function(v1, v2, options){
       if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
    },
        ifCondNotEquals: function(v1, v2, options){
       if(v1 != v2) {
    return options.fn(this);
  }
  return options.inverse(this);
    },
     }
    })
);
app.set("view engine", ".hbs");

// import routes file and use this for routing
const routes = require("./routes");
app.use("/", routes);

// listen for requests :)
const listener = app.listen(process.env.PORT || 4000, function() {
  logger.info("Your app is listening on port " + listener.address().port);
});
