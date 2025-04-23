const Enquiry = require('../../models/enquiry.model');

// Create and Save a new Enquiry
exports.create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.orgName || !req.body.email || !req.body.phone || !req.body.reqTechStack || !req.body.address || !req.body.city || !req.body.description) {
      return res.status(400).send({
        message: "Required fields cannot be empty!"
      });
    }

    // Create an Enquiry
    const enquiry = new Enquiry({
      service: req.body.service || 'Training',
      orgName: req.body.orgName,
      email: req.body.email,
      phone: req.body.phone,
      reqTechStack: Array.isArray(req.body.reqTechStack) 
        ? req.body.reqTechStack 
        : req.body.reqTechStack.split(',').map(t => t.trim()).filter(t => t),
      address: req.body.address,
      city: req.body.city,
      description: req.body.description
    });

    // Save Enquiry in the database
    const savedEnquiry = await enquiry.save();
    res.status(201).send(savedEnquiry);
  } catch (error) {
    // Check for duplicate key error (MongoDB error code 11000)
    if (error.code === 11000) {
      return res.status(400).send({
        message: "Duplicate entry detected!"
      });
    }
    res.status(500).send({
      message: error.message || "Some error occurred while creating the Enquiry."
    });
  }
};

// Retrieve all Enquiries from the database
exports.findAll = async (req, res) => {
  try {
    const enquiries = await Enquiry.find();
    res.send(enquiries);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving enquiries."
    });
  }
};

// Find a single Enquiry with an id
exports.findOne = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).send({
        message: "Enquiry not found with id " + req.params.id
      });
    }
    res.send(enquiry);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).send({
        message: "Enquiry not found with id " + req.params.id
      });
    }
    return res.status(500).send({
      message: "Error retrieving enquiry with id " + req.params.id
    });
  }
};
