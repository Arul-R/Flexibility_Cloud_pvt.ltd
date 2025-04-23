



const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  service: {
    type: String,
    enum: ['Training', 'Project'],
    default: 'Training'
  },
  orgName: {
    type: String,
    required: [true, 'Organization name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid 10-digit phone number!`
    }
  },
  reqTechStack: {
    type: [String],
    required: [true, 'Tech stack is required'],
    validate: {
      validator: function(arr) {
        return arr.length > 0;
      },
      message: 'At least one technology must be specified'
    }
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  city: {
    type: String,
    required: [true, 'City is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;
