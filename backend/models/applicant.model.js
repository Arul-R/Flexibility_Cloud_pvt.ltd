const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicantSchema = new Schema({
    appliedJobId: {
        type: String,
        required: false
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    techStack: {
        type: [String],
        required: true
    },
    yearsOfExperience: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['submitted', 'rejected', 'accepted'],
        default: 'submitted'
    },
    resumePath: {
        type: String,
        required: false
    },
    resumeOriginalName: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Applicant', applicantSchema);