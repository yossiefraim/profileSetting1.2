# VOD profile setting WS API
The profile setting WS help you to manage the VOD profile settings.
view the settings keys, view one profile setting and sort profiles by age and gender.
WS based on Heroku https://profile-setting-v2.herokuapp.com
<hr>
<h3>Get Setting Options - Get method</h3>
This function returns all the keys of the profile setting.
after using this function you will know what is the structre of the the profile setting in the json data file.
exemple:
 {
  keys: [
  "id",
  "name",
  "password",
  "city",
  "age",
  "gender",
  "payment"{
    type,
    owner
    }
  ]
}   

this function not require any parameters, just use the below URL:https://profile-setting-v2.herokuapp.com<mark>/getAllSettingOptions</mark>
<hr>

<h3>Get User setting by Id - Post method </h3>
This function returns sepcific profile setting by sending an profile_id parameter <b>Int </b>number.
after using this function you will receive a json file with all the user profile details.
the profile_id parameter is integer number and you must sent a known profile_id number esle you will receive an error massge:"can not exceute index/getUserProfileSetting , profile_id must be int number".
if there is no match you will receive the massage : "error:profile_id no match".
https://profile-setting-v2.herokuapp.com/getUserProfileSetting<mark>/profile_id</mark>
<hr>

<h3>Get User profile by age and payment method - Post method</h3>
This function returns all profile that Below a certain age and pay with specific payment method.
This function require 2 parameters, the first to send is <b>age</b> - an integer number.
The second parameter is <b>payment</b> - credit card or direct debit.
if one of the parameters wrong you will receive an error massge:"Error with payment Parmeter" or ""Error with age Parmeter.
https://profile-setting-v2.herokuapp.com/getUserProfileByParams<mark>/age/payment</mark></a>                
<hr>
<small>&copy; Shenkar College, Yossi Efraim</small>
