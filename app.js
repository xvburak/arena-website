const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
app.use(bodyParser.json());
const path = require('path');
const Arena = require('are.na');
let arena = new Arena({ accessToken: "402ab5bb9bd011fe5dafbdf0d8acfb039007794df98e3d4d8f74cc9958c295f9" });

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/sites', function(req, res){
  arena.channel('xvburak').get({ page: req.query.page ? req.query.page : 1, per: 64,
    direction: 'desc',
    sort: 'position'
   })
  .then(chan => {
      res.send(chan);
      
  })
  .catch(err => console.log(err));
})

app.get('/api/:site', function(req, res){
  arena.channel(req.params.site).contents({ page: req.query.page ? req.query.page : 1, 
    per: req.query.per ? req.query.per : 24,
    direction: 'desc',
    sort: 'position'
   })
    .then(contents => {
      res.send(contents);
      // res.sendFile(__dirname + '/public/index.html');
    })
    .catch(err => console.log(err));
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

app.get('/:page', (req, res) => {
  res.sendFile(__dirname + '/public/page.html');
})

app.use(express.static(__dirname + '/public', {
    extensions: ['html', 'htm'],
}));

app.listen(process.env.PORT || 8000, process.env.IP || '0.0.0.0', ()=>{
  console.log('app listening on port 8000')
});