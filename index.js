const express    = require('express'),
      bodyParser = require('body-parser'),
      data       = require('./data/profiles.json'),
      app        = express(),
      config = require('./config.js').events,
      port       = process.env.PORT || 3000,
      operator   = require('./profile_mdl.js'),
      mongoose = require('mongoose'),
      consts = require('./consts');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
mongoose.Promise = global.Promise;
var profileSchema = require('./profileSchema');

app.get('/getAllSettingOptions/',
    (req,res) =>{
      res.status(200).json(Object.keys(profileSchema.obj));
    });

app.post('/getUserProfileSetting',
  (req,res) => {
    let succ = new Promise((resolve,reject)=>{ 
      console.log(parseInt(req.body.profile_id));
      if(parseInt(req.body.profile_id))
      {
        resolve(operator.getUserProfileSetting(parseInt(req.body.profile_id)));
      }else{
        reject('can not exceute index/getUserProfileSetting , profile_id must be int number');
      }
    });

    succ.then((fromResolve)=>{
      res.status(200).json(fromResolve);
    }).catch((fromReject)=>{
      res.status(200).json(fromReject);
    });
});

app.post('/getUserProfileByParams',
  (req,res) => {
    let succ = new Promise ((resolve,reject)=>{
      if(parseInt(req.body.age)){
        resolve(operator.getUserProfileByParams(parseInt(req.body.age),req.body.payment));
      }else{
        reject('can not exceute index/getUserProfileByParams age must be int number');
      }
    });

    succ.then((fromResolve)=>{
      res.status(200).json(fromResolve);
    }).catch((fromReject)=>{
      res.status(400).send(fromReject);
    });
});

app.all('*',
    (req,res) => {
        res.sendFile(`${__dirname}/index.html`);
    });
app.listen(port,
    ()=>{
        console.log(`listen to port ${port}`);
});