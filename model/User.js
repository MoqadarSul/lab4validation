const mongoose = require('mongoose');
const validator = require('node-mongoose-validator');

//make a address schema
//make a geo schema
//company schema
const companySchema = mongoose.Schema({
  name : {
    type : String,
  },
  catchPhrase : {
    type: String,
  },
  bs : {
    type: String,
  }
})

const geoSchema = mongoose.Schema({
  lat : {
    type : String,
  },
  lng: {
    type: String,
  }
})

const AddressSchema = mongoose.Schema({
  street : {
      type : String,
  },
  suite : {
      type : String,
      
  },
  city : {
    type : String,
    trim:true,
    validate: {
        validator: function(city) {
            var re = /^[a-zA-Z\s]*$/;
            return re.test(city)
          },
          message: props => `${props.value} is not a valid city!`
      },
    required : true,
  },
  zipcode: {
    type: String,
    validate: {
        validator: function(v) {
          return /\d{5}-\d{4}/.test(v);
        },
        message: props => `${props.value} is not a valid zipCode number!`
      },
},
geo: {
  type : geoSchema,
}
})


const UserSchema = mongoose.Schema({
    username : {
        type : String,
        required: true,
        minlength: 4,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,  
        unique: true,
        validate: {
            validator: function(email) {
                var re = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return re.test(email)
            },
            message: props => `${props.value} is not a valid Email!`
        },
        required: true,
    },
    address:{
      type : AddressSchema,
    },
    phone : {
        type : String,
        validate: {
            validator: function(v) {
              return /\d{1}-\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
          },
        },
        website:  {
          type: String,
          validate: validator.isURL({message: 'Must be a Valid URL', protocols: ['http','https'], require_tld: true, require_protocol: true })
      },
    company : {
      type: companySchema,
    }
})





const User = mongoose.model("User", UserSchema);
module.exports = User;
