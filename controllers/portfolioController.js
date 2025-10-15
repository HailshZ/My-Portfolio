const PortfolioModel = require('../models/portfolioModel');

class PortfolioController {
  static async getPersonalInfo(req, res) {
    try {
      const personalInfo = await PortfolioModel.getPersonalInfo();
      res.json({
        success: true,
        data: personalInfo,
        usingFallback: !personalInfo.id // If no ID, we're using fallback data
      });
    } catch (error) {
      console.error('Error fetching personal info:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching personal information'
      });
    }
  }

  static async getEducation(req, res) {
    try {
      const education = await PortfolioModel.getEducation();
      res.json({
        success: true,
        data: education,
        usingFallback: education.length > 0 && !education[0].id // If no ID, using fallback
      });
    } catch (error) {
      console.error('Error fetching education:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching education history'
      });
    }
  }

  static async getSkills(req, res) {
    try {
      const skills = await PortfolioModel.getSkills();
      
      const skillsByCategory = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
          acc[skill.category] = [];
        }
        acc[skill.category].push({
          name: skill.skill_name,
          proficiency: skill.proficiency_level
        });
        return acc;
      }, {});

      res.json({
        success: true,
        data: skillsByCategory,
        usingFallback: skills.length > 0 && !skills[0].id // If no ID, using fallback
      });
    } catch (error) {
      console.error('Error fetching skills:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching skills'
      });
    }
  }

  static async getProjects(req, res) {
    try {
      const projects = await PortfolioModel.getProjects();
      res.json({
        success: true,
        data: projects,
        usingFallback: projects.length > 0 && !projects[0].id // If no ID, using fallback
      });
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching projects'
      });
    }
  }

  static async getCertificates(req, res) {
    try {
      const certificates = await PortfolioModel.getCertificates();
      res.json({
        success: true,
        data: certificates,
        usingFallback: false
      });
    } catch (error) {
      console.error('Error fetching certificates:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching certificates'
      });
    }
  }

  // ... (rest of the controller methods remain the same)
  static async updateProfilePicture(req, res) {
    try {
      const { profilePictureUrl } = req.body;
      const updatedInfo = await PortfolioModel.updateProfilePicture(profilePictureUrl);
      res.json({
        success: true,
        data: updatedInfo,
        message: 'Profile picture updated successfully'
      });
    } catch (error) {
      console.error('Error updating profile picture:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating profile picture'
      });
    }
  }

  static async updateResumeUrl(req, res) {
    try {
      const { resumeUrl } = req.body;
      const updatedInfo = await PortfolioModel.updateResumeUrl(resumeUrl);
      res.json({
        success: true,
        data: updatedInfo,
        message: 'Resume updated successfully'
      });
    } catch (error) {
      console.error('Error updating resume:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating resume'
      });
    }
  }

  static async addCertificate(req, res) {
    try {
      const { title, issuing_organization, issue_date, credential_url, certificate_image_url } = req.body;
      const certificate = await PortfolioModel.addCertificate({
        title,
        issuing_organization,
        issue_date,
        credential_url,
        certificate_image_url
      });
      res.json({
        success: true,
        data: certificate,
        message: 'Certificate added successfully'
      });
    } catch (error) {
      console.error('Error adding certificate:', error);
      res.status(500).json({
        success: false,
        message: 'Error adding certificate'
      });
    }
  }

  static async updateCertificate(req, res) {
    try {
      const { id } = req.params;
      const { title, issuing_organization, issue_date, credential_url, certificate_image_url } = req.body;
      const certificate = await PortfolioModel.updateCertificate(id, {
        title,
        issuing_organization,
        issue_date,
        credential_url,
        certificate_image_url
      });
      res.json({
        success: true,
        data: certificate,
        message: 'Certificate updated successfully'
      });
    } catch (error) {
      console.error('Error updating certificate:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating certificate'
      });
    }
  }

  static async deleteCertificate(req, res) {
    try {
      const { id } = req.params;
      await PortfolioModel.deleteCertificate(id);
      res.json({
        success: true,
        message: 'Certificate deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting certificate:', error);
      res.status(500).json({
        success: false,
        message: 'Error deleting certificate'
      });
    }
  }
}

module.exports = PortfolioController;