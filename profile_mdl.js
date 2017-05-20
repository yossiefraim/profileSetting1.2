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

exports.getUserProfileSetting = function(profile_id){
       
        let query = new Promise(function(resolve,reject){
          if(profile.find({id:{$eq:profile_id}})){
            resolve(profile.find({id:{$eq:profile_id}}));
          }else{
            reject('query error');
          }
        });
        return query.then(function(fromReslove){
          console.log('from resolve'+fromReslove);
          return fromReslove;
        }).catch(function(fromReject){
          console.log('from reject'+fromReject);
          return fromReject;
        });
        mongoose.disconnect();
}

exports.getUserProfileByParams = function(age,payment){
     
        let query = new Promise(function(resolve,reject){
          if(profile.find({age:{$lt:age},'payment.type':{$eq:payment}}))
          {
            resolve(profile.find({age:{$lt:age},'payment.type':{$eq:payment}}));
          }
          else{
            reject('query error');
          }
        });
        return query.then(function(fromReslove){
          console.log('from resolve'+fromReslove);
          return fromReslove;
        }).catch(function(fromReject){
          console.log('from reject'+fromReject);
          return fromReject;
        });  
        mongoose.disconnect();          
}