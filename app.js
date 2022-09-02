//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
var posts1=[];
// Load the full build.
var ele= require('lodash');
// Load the core build.
var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');

// Load method categories.
var array = require('lodash/array');
var object = require('lodash/fp/object');

// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var at = require('lodash/at');
var curryN = require('lodash/fp/curryN');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){

  res.render(__dirname + '/views/home.ejs', {data:homeStartingContent, postData:posts1});
  console.log(posts1);
})

app.get("/about",function(req,res){

  res.render(__dirname + '/views/about.ejs', {aboutContents:aboutContent});
})


app.get("/contact",function(req,res){

  res.render(__dirname + '/views/contact.ejs', {aboutContacts:contactContent});
})

app.get("/compose",function(req,res){

  res.render(__dirname + '/views/compose.ejs');

})

app.post("/compose", function(req,res){


  const posts= {
              postTitle:req.body.postTitle,
              postBody:req.body.postBody
  };
  posts1.push(posts);
  res.redirect("/");

})

app.get("/posts/:postId", function(req,res) {

  for(var i=0;i<posts1.length;i++){
    var lowercase= ele.lowerCase(posts1[i].postTitle);
    var idLowerCase=ele.lowerCase(req.params.postId);
    if(lowercase==idLowerCase){
        res.render(__dirname + '/views/post.ejs', {postTitles:posts1[i].postTitle, postBodys:posts1[i].postBody});
    } else {
      console.log("Match was not found");
    }

  }
})

JSON.stringify(posts1)












app.listen(3000, function() {
  console.log("Server started on port 3000");
});
