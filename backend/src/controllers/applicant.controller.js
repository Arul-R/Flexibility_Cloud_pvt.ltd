const Applicant = require('../../models/applicant.model');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

// Configure where to store resumes
const RESUME_UPLOAD_DIR = path.join(__dirname, '../uploads/resumes');

// Ensure upload directory exists
if (!fs.existsSync(RESUME_UPLOAD_DIR)) {
    fs.mkdirSync(RESUME_UPLOAD_DIR, { recursive: true });
}

// Helper function to handle file upload
const handleFileUpload = (file) => {
    if (!file) return null;
    
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const filename = `resume-${uniqueSuffix}${ext}`;
    const filepath = path.join(RESUME_UPLOAD_DIR, filename);
    
    fs.writeFileSync(filepath, file.buffer);
    
    return {
        path: filepath,
        originalName: file.originalname
    };
};

exports.createApplicant = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, techStack, yearsOfExperience, address, city } = req.body;
        
        // Parse techStack if it's a JSON string (from FormData)
        let parsedTechStack = techStack;
        if (typeof techStack === 'string') {
            try {
                parsedTechStack = JSON.parse(techStack);
            } catch (err) {
                parsedTechStack = [techStack];
            }
        }

        // Handle file upload
        let resumeInfo = null;
        if (req.file) {
            resumeInfo = handleFileUpload(req.file);
        }

        const applicant = new Applicant({
            firstName,
            lastName,
            email,
            phone,
            techStack: parsedTechStack,
            yearsOfExperience,
            address,
            city,
            status: 'submitted',
            ...(resumeInfo && { 
                resumePath: resumeInfo.path,
                resumeOriginalName: resumeInfo.originalName
            })
        });

        await applicant.save();
        
        res.status(201).json({
            success: true,
            data: applicant,
            message: 'Applicant created successfully'
        });
    } catch (err) {
        console.error('Error creating applicant:', err);
        res.status(400).json({
            success: false,
            message: err.message || 'Error creating applicant'
        });
    }
};

exports.getApplicants = async (req, res) => {
    try {
        const applicants = await Applicant.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: applicants
        });
    } catch (err) {
        console.error('Error fetching applicants:', err);
        res.status(500).json({
            success: false,
            message: 'Error fetching applicants'
        });
    }
};

exports.getApplicantById = async (req, res) => {
    try {
        const applicant = await Applicant.findById(req.params.id);
        if (!applicant) {
            return res.status(404).json({
                success: false,
                message: 'Applicant not found'
            });
        }
        res.status(200).json({
            success: true,
            data: applicant
        });
    } catch (err) {
        console.error('Error fetching applicant:', err);
        res.status(500).json({
            success: false,
            message: 'Error fetching applicant'
        });
    }
};

exports.updateApplicant = async (req, res) => {
    try {
        const updates = req.body;
        
        // Parse techStack if it exists in updates
        if (updates.techStack && typeof updates.techStack === 'string') {
            try {
                updates.techStack = JSON.parse(updates.techStack);
            } catch (err) {
                updates.techStack = [updates.techStack];
            }
        }

        const applicant = await Applicant.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        );

        if (!applicant) {
            return res.status(404).json({
                success: false,
                message: 'Applicant not found'
            });
        }

        res.status(200).json({
            success: true,
            data: applicant,
            message: 'Applicant updated successfully'
        });
    } catch (err) {
        console.error('Error updating applicant:', err);
        res.status(400).json({
            success: false,
            message: err.message || 'Error updating applicant'
        });
    }
};

exports.deleteApplicant = async (req, res) => {
    try {
        const applicant = await Applicant.findByIdAndDelete(req.params.id);
        
        if (!applicant) {
            return res.status(404).json({
                success: false,
                message: 'Applicant not found'
            });
        }

        // Delete the associated resume file if it exists
        if (applicant.resumePath) {
            try {
                await unlinkAsync(applicant.resumePath);
            } catch (err) {
                console.error('Error deleting resume file:', err);
            }
        }

        res.status(200).json({
            success: true,
            message: 'Applicant deleted successfully'
        });
    } catch (err) {
        console.error('Error deleting applicant:', err);
        res.status(500).json({
            success: false,
            message: 'Error deleting applicant'
        });
    }
};

exports.downloadResume = async (req, res) => {
    try {
        const applicant = await Applicant.findById(req.params.id);
        
        if (!applicant || !applicant.resumePath) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            });
        }

        if (!fs.existsSync(applicant.resumePath)) {
            return res.status(404).json({
                success: false,
                message: 'Resume file not found'
            });
        }

        res.download(applicant.resumePath, applicant.resumeOriginalName || 'resume.pdf');
    } catch (err) {
        console.error('Error downloading resume:', err);
        res.status(500).json({
            success: false,
            message: 'Error downloading resume'
        });
    }
};