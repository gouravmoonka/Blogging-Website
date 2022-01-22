const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongodb & listen for requests
// const dbURI = "mongodb+srv://gourav:12345@cluster0.peuo9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const dbURI="mongodb://localhost:27017/BlogingWebsiteDB"

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true 
}).then(result => app.listen(3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page

//method-I define function then call..
const fun_404=function(req,res){
  res.status(404).render('404', { title: '404' });
}
app.use(fun_404);

//method-II define function using arrow function inside .use()....this looks good
/*app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});*/

