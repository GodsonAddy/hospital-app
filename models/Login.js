const mongoose = require('mongoose');

const { Schema } = mongoose;

const LoginSchema = new Schema(
  {
    
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    hospmessages: [Schema.Types.ObjectId]
    
  },{timestamps: true}
);

LoginSchema.methods.toJSON = function() {
  return {
    
    username: this.username,
    password: this.password,
    email: this.email

  };
};

const Login = mongoose.model("Login", LoginSchema);
module.exports = Login