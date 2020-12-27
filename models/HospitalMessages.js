const mongoose = require('mongoose');

const { Schema } = mongoose;

const HospitalSchema = new Schema(
  {
    _id: { type: String, required: true },
    content: {
      type: String,
      required: true
    },
    file: {
      type: String,
      data: Buffer
    },
    sender: {
      type: String,
      required: true
    },
    recepient: {
      type: String,
      required: true
    }
  },{timestamps: true}
);

HospitalSchema.methods.toJSON = function() {
  return {
    file: this.file,
    _id: this._id,
    content: this.content,
    sender: this.sender,
    recepient: this.recepient
  };
};

mongoose.model('HospMessages', HospitalSchema);