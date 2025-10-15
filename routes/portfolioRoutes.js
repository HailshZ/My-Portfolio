const express = require('express');
const PortfolioController = require('../controllers/portfolioController');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Public routes (read-only)
router.get('/personal-info', PortfolioController.getPersonalInfo);
router.get('/education', PortfolioController.getEducation);
router.get('/skills', PortfolioController.getSkills);
router.get('/projects', PortfolioController.getProjects);
router.get('/certificates', PortfolioController.getCertificates);

// Admin-only routes (protected)
router.put('/profile-picture', adminAuth, PortfolioController.updateProfilePicture);
router.put('/resume', adminAuth, PortfolioController.updateResumeUrl);
router.post('/certificates', adminAuth, PortfolioController.addCertificate);
router.put('/certificates/:id', adminAuth, PortfolioController.updateCertificate);
router.delete('/certificates/:id', adminAuth, PortfolioController.deleteCertificate);

module.exports = router;