const db = require('../config/database');

// Fallback data in case database is unavailable
const fallbackData = {
  personalInfo: {
    id: 1,
    phone: '+251961109553',
    email: 'hailemariamzeleke21@gmail.com',
    location: 'Arada, Addis Ababa, Ethiopia',
    linkedin_url: 'https://www.linkedin.com/in/hailemariam-zeleke-38178329a',
    github_url: 'https://github.com/HailshZ',
    telegram_username: '@Fortofiglio',
    personal_statement: 'As a recent graduate with a Bachelor\'s degree in Computer Science, I am passionate about becoming a web-based application developer. Throughout my academic journey, I have developed a strong foundation in programming languages such as Python, JavaScript, and Java, alongside hands-on experience in creating user-friendly web applications. My final project involved designing an AI-powered Amharic language spelling checker, which honed my skills in research, design, and implementation.\n\nAnd also In the cyber realm I obtained a great knowledge and I have done my final project on blue teaming i.e. pen testing. My project title is "web vulnerability scanner" and It is deployed/hosted on vercel via github and available online.\n\nI thrive in collaborative environments and am eager to contribute to a team that values innovation and user-centered design. I am seeking an entry-level position where I can apply my programming skills, continue to learn, and grow within the field, with a long-term goal of advancing into a leadership role.',
    profile_picture_url: null,
    resume_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  education: [
    {
      id: 1,
      institution: 'CPU Business and Information Technology College',
      degree: 'Bachelor of Science',
      field_of_study: 'Computer Science',
      start_date: '2021',
      end_date: '2025',
      location: 'Addis Ababa, Ethiopia',
      description: 'Degree program focused on computer science fundamentals and practical applications',
      certificate_type: 'Degree',
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      institution: 'Berhanena Selam Printing Technology College',
      degree: 'Graphic Design Coursework',
      field_of_study: 'Graphic Design',
      start_date: 'Nov 2021',
      end_date: 'April 2022',
      location: 'Addis Ababa, Ethiopia',
      description: 'Completed coursework in graphic design principles and tools',
      certificate_type: 'Certificate',
      created_at: new Date().toISOString()
    }
  ],
  skills: [
    { category: 'Programming Languages', skill_name: 'JavaScript', proficiency_level: 4 },
    { category: 'Programming Languages', skill_name: 'Python', proficiency_level: 4 },
    { category: 'Programming Languages', skill_name: 'Java', proficiency_level: 4 },
    { category: 'Web Development', skill_name: 'React', proficiency_level: 4 },
    { category: 'Web Development', skill_name: 'Node.js', proficiency_level: 4 },
    { category: 'Web Development', skill_name: 'Express.js', proficiency_level: 4 }
  ],
  projects: [
    {
      id: 1,
      title: 'Web Vulnerability Scanner',
      description: 'A comprehensive web vulnerability scanner for penetration testing and security assessment',
      technologies: ['JavaScript', 'React', 'Node.js', 'Express'],
      project_url: 'https://web-vulnerability-scanner0.vercel.app',
      github_url: 'https://github.com/HailshZ/web-vulnerability-scanner',
      image_url: null,
      featured: true,
      created_at: new Date().toISOString()
    }
  ],
  certificates: []
};

class PortfolioModel {
  // Get personal information
  static async getPersonalInfo() {
    try {
      const result = await db.query('SELECT * FROM personal_info LIMIT 1');
      return result.rows[0] || fallbackData.personalInfo;
    } catch (error) {
      console.log('⚠️ Using fallback personal info data');
      return fallbackData.personalInfo;
    }
  }

  // Get education history
  static async getEducation() {
    try {
      const result = await db.query('SELECT * FROM education ORDER BY end_date DESC');
      return result.rows.length > 0 ? result.rows : fallbackData.education;
    } catch (error) {
      console.log('⚠️ Using fallback education data');
      return fallbackData.education;
    }
  }

  // Get skills by category
  static async getSkills() {
    try {
      const result = await db.query(
        'SELECT category, skill_name, proficiency_level FROM skills ORDER BY category, proficiency_level DESC'
      );
      return result.rows.length > 0 ? result.rows : fallbackData.skills;
    } catch (error) {
      console.log('⚠️ Using fallback skills data');
      return fallbackData.skills;
    }
  }

  // Get all projects
  static async getProjects() {
    try {
      const result = await db.query(
        'SELECT * FROM projects ORDER BY featured DESC, created_at DESC'
      );
      return result.rows.length > 0 ? result.rows : fallbackData.projects;
    } catch (error) {
      console.log('⚠️ Using fallback projects data');
      return fallbackData.projects;
    }
  }

  // Get certificates
  static async getCertificates() {
    try {
      const result = await db.query(
        'SELECT * FROM certificates ORDER BY issue_date DESC'
      );
      return result.rows;
    } catch (error) {
      console.log('⚠️ Using fallback certificates data');
      return fallbackData.certificates;
    }
  }

  // Update profile picture
  static async updateProfilePicture(profilePictureUrl) {
    try {
      const result = await db.query(
        'UPDATE personal_info SET profile_picture_url = $1, updated_at = NOW() WHERE id = 1 RETURNING *',
        [profilePictureUrl]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error updating profile picture:', error);
      throw error;
    }
  }

  // Update resume URL
  static async updateResumeUrl(resumeUrl) {
    try {
      const result = await db.query(
        'UPDATE personal_info SET resume_url = $1, updated_at = NOW() WHERE id = 1 RETURNING *',
        [resumeUrl]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error updating resume:', error);
      throw error;
    }
  }

  // Add certificate
  static async addCertificate(certificateData) {
    try {
      const { title, issuing_organization, issue_date, credential_url, certificate_image_url } = certificateData;
      const result = await db.query(
        `INSERT INTO certificates (title, issuing_organization, issue_date, credential_url, certificate_image_url) 
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [title, issuing_organization, issue_date, credential_url, certificate_image_url]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error adding certificate:', error);
      throw error;
    }
  }

  // Update certificate
  static async updateCertificate(id, certificateData) {
    try {
      const { title, issuing_organization, issue_date, credential_url, certificate_image_url } = certificateData;
      const result = await db.query(
        `UPDATE certificates SET 
          title = $1, 
          issuing_organization = $2, 
          issue_date = $3, 
          credential_url = $4, 
          certificate_image_url = $5,
          created_at = NOW()
         WHERE id = $6 RETURNING *`,
        [title, issuing_organization, issue_date, credential_url, certificate_image_url, id]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error updating certificate:', error);
      throw error;
    }
  }

  // Delete certificate
  static async deleteCertificate(id) {
    try {
      const result = await db.query('DELETE FROM certificates WHERE id = $1', [id]);
      return result.rowCount > 0;
    } catch (error) {
      console.error('Error deleting certificate:', error);
      throw error;
    }
  }
}

module.exports = PortfolioModel;