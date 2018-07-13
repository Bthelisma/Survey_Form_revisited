var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
// create the express app
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');



// use it!
app.use(session({ secret: 'codingdojorocks' }));
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// root route to render the index.ejs view
app.get('/', function(request, response) {
    response.render("index");
})

app.get('/result', function(request, response) {
        var name = request.session.name;
        var location = request.session.location;
        var language = request.session.language;
        var comment = request.session.comment;
        response.render('result', { name: name, location: location, language: language, comment: comment });
    })
    // post route for adding a user
app.post('/users', function(request, response) {
    console.log("POST DATA", request.body);
    request.session.name = request.body.name;
    request.session.location = request.body.location;
    request.session.language = request.body.language;
    request.session.comment = request.body.comment;
    console.log(request.session.name);
    // This is where we would add the user to the database
    // Then redirect to the root route
    response.redirect('/result');
})

app.post('/back', function(request, response) {
    response.redirect("/");
})

// tell the express app to listen on port 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});