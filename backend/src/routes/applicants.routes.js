const express = require('express');
const router = express.Router();
const applicantController = require('../controllers/applicant.controller');
const multer = require('multer');

// Configure multer for file uploads
const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed'), false);
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

router.post('/', upload.single('resume'), applicantController.createApplicant);
router.get('/', applicantController.getApplicants);
router.get('/:id', applicantController.getApplicantById);
router.patch('/:id', applicantController.updateApplicant);
// router.put('/:id', applicantController.updateApplicant); //sfsffsdfwefewfwef
router.delete('/:id', applicantController.deleteApplicant);
router.get('/:id/resume', applicantController.downloadResume);

module.exports = router;
