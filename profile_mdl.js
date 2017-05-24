const data   = require('./data/profiles.json'),
      config = require('./config.js').events,
      consts = require('./consts'),
      express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect(consts.MLAB_KEY);
const conn = mongoose.connection;
var profileSchema = require('./profileSchema');
var profile = conn.model('profile',profileSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

conn.on('error',
  (err) => {
    console.log(`connection error: ${err}`);
});

exports.getUserProfileSetting = ((profile_id)=>{
       
        let query = new Promise((resolve,reject)=>{
          if(profile_id){
            resolve(profile.find({id:{$eq:profile_id}}));
          }else{
            reject('Error with profile_id Parmeter');
          }
        });
        return query.then((fromReslove)=>{
          return fromReslove;
        }).catch((fromReject)=>{
          return fromReject;
        });
        mongoose.disconnect();
});

exports.getUserProfileByParams = ((age,payment)=>{
     
        let query = new Promise((resolve,reject)=>{
          if(age&&payment)
          {
            resolve(profile.find({age:{$lt:age},'payment.type':{$eq:payment}}));
          }
          else{
            if(!age)
              reject('Error with age Parmeter');
           if(!payment)
              reject('Error with payment Parmeter');
          }
        });
        return query.then((fromReslove)=>{
          return fromReslove;
        }).catch((fromReject)=>{
          return fromReject;
        });  
        mongoose.disconnect();          
});