var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    profilePayment = new schema({
        type:String,
        owner:String
    });
    profileSchema = new schema({
        id: {type:Number, index:1, required:true, unique:true},
        name: String,
        password: {type:Number, required:true},
        city:String,
        age:Number,
        gender:String,
        payment: profilePayment
        }, {collection: 'profiles'});

console.log(`required paths: ${profileSchema.requiredPaths()}`);

console.log(`indexes: ${JSON.stringify(profileSchema.indexes())}`);

module.exports = profileSchema;