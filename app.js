const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/static',express.static('public'));
app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

//const mainRoutes = require('./routes');

//app.use(mainRoutes);
// routes
app.get('/', (req, res) => {
  res.render('index.html' );
});

app.get('/:pageName', (req, res) => {
  res.render(req.params.pageName);
});

app.use('/err', (req, res, next) => {
    const err = new Error('That server blowed up real good!! We got problems boss.');
    err.status = 500;
    next(err);
  })

app.use('*',(req, res, next) => {
    const err = new Error(`Bummer, the page: "${req.baseUrl}" is gone. Just up and left!!`);
    err.status = 404;
    next(err);
  })
  
  app.use((err, req, res, next) => {
      res.locals.error = err;
      res.status(err.status);
      console.dir(err);
      if (err.status == 404) {
        res.render('page-not-found');
      } else {
        res.render('error');
      }
  })

  app.listen(3000, () => {
    console.log('The application is running on port: 30000');
})



