const mongoose = require('mongoose');

const { Schema } = mongoose;

const HospitalSchema = new Schema(
  {
    
    file: {
      data: Buffer
    },
    username: {
      type: String, 
      required: true
    },
    recepient:  {
      type: String, 
      required: true
    },
    content:  {
      type: String,
      required: true
    },
    login: [{ type: Schema.Types.ObjectId, ref: 'Login' }]
  },{timestamps: true}
);

HospitalSchema.methods.toJSON = function() {
  return {
    file: this.file,
    content: this.content,
    username: this.username,
    recepient: this.recepient
  };
};

const HospMessages = mongoose.model('HospMessages', HospitalSchema);
module.exports = HospMessages

HospMessages.
  findOne({}).
  populate('login').
  exec((err, hospmessages) => {
    if (err) return  (err);
    console.log('The user is %s %s', hospmessages.login.username, hospmessages.login.email);
      
  });


