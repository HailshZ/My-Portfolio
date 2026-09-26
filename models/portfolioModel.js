const db = require('../config/database');

// Fallback data in case database is unavailable
const personalStatement = [
  "I'm a Computer Science graduate (CGPA 3.99) who works on both sides of the web: I build full-stack applications with React, Node.js, Express and PostgreSQL, and I test and secure them as an ethical hacker.",
  "I'm currently a Cybersecurity and Digital Risk Management trainee at the AAU Qiyas Project, getting hands-on with Blue Team and Red Team operations: SIEM, threat intelligence, incident response, penetration testing, Linux and server administration, and secure SDLC / DevSecOps monitoring. Before that, I took part in INSA's 4th Cyber Talent Summer Camp, where I built a Python/Flask web vulnerability scanner, and completed a project-based cybersecurity internship with CodeAlpha.",
  "Knowing how applications are built makes me better at finding where they break, and knowing how they break makes me write safer code. I'm looking for an entry-level role in cybersecurity or secure web development where I can contribute from day one and keep growing."
].join('\n\n');

// Fallback data in case database is unavailable
const fallbackData = {
  personalInfo: {
    id: 1,
    phone: '+251961109553',
    email: 'hailemariamzeleke21@gmail.com',
    location: 'Addis Ababa, Ethiopia',
    linkedin_url: 'https://www.linkedin.com/in/hailemariam-zeleke-38178329a',
    github_url: 'https://github.com/HailshZ',
    telegram_username: '@Fortofiglio',
    personal_statement: personalStatement,
    profile_picture_url: '/images/profile.jpg',
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
      description: 'Graduated with a CGPA of 3.99 and scored 81/100 on the national Computer Science Exit Exam. Final-year project: an AI-powered Amharic spelling checker.',
      certificate_type: 'Degree',
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      institution: 'Satcom Institute of Technology',
      degree: 'Computer Maintenance & Networking',
      field_of_study: null,
      start_date: null,
      end_date: 'Sep 2025',
      location: 'Addis Ababa, Ethiopia',
      description: 'Six-month training in hardware and software maintenance and server-based networking.',
      certificate_type: 'Certificate',
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      institution: 'Berhanena Selam Printing Technology College',
      degree: 'Graphic Design Coursework',
      field_of_study: null,
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
    { category: 'Programming Languages', skill_name: 'C#', proficiency_level: 4 },
    { category: 'Programming Languages', skill_name: 'C++', proficiency_level: 4 },
    { category: 'Web Development', skill_name: 'React', proficiency_level: 4 },
    { category: 'Web Development', skill_name: 'Node.js', proficiency_level: 4 },
    { category: 'Web Development', skill_name: 'Express.js', proficiency_level: 4 },
    { category: 'Web Development', skill_name: 'REST APIs', proficiency_level: 4 },
    { category: 'Web Development', skill_name: 'HTML & CSS', proficiency_level: 4 },
    { category: 'Database Management', skill_name: 'PostgreSQL', proficiency_level: 4 },
    { category: 'Database Management', skill_name: 'MySQL', proficiency_level: 4 },
    { category: 'Offensive Security', skill_name: 'Web Vulnerability Assessment', proficiency_level: 4 },
    { category: 'Offensive Security', skill_name: 'Penetration Testing', proficiency_level: 3 },
    { category: 'Offensive Security', skill_name: 'Web Security Testing', proficiency_level: 3 },
    { category: 'Offensive Security', skill_name: 'Ethical Hacking Fundamentals', proficiency_level: 4 },
    { category: 'Defensive Security', skill_name: 'SIEM', proficiency_level: 3 },
    { category: 'Defensive Security', skill_name: 'Threat Intelligence', proficiency_level: 3 },
    { category: 'Defensive Security', skill_name: 'Incident Response', proficiency_level: 3 },
    { category: 'Defensive Security', skill_name: 'Log Analysis', proficiency_level: 3 },
    { category: 'Defensive Security', skill_name: 'Network Security', proficiency_level: 3 },
    { category: 'Systems & Networking', skill_name: 'Linux / Server Administration', proficiency_level: 4 },
    { category: 'Systems & Networking', skill_name: 'TCP/IP', proficiency_level: 4 },
    { category: 'Systems & Networking', skill_name: 'VLAN, VPN & Routing', proficiency_level: 3 },
    { category: 'Systems & Networking', skill_name: 'Nmap', proficiency_level: 4 },
    { category: 'Systems & Networking', skill_name: 'Wireshark', proficiency_level: 4 },
    { category: 'Systems & Networking', skill_name: 'Scapy', proficiency_level: 4 },
    { category: 'Secure Development', skill_name: 'Secure Code Review', proficiency_level: 4 },
    { category: 'Secure Development', skill_name: 'SAST / DevSecOps', proficiency_level: 3 },
    { category: 'Secure Development', skill_name: 'Git & GitHub', proficiency_level: 4 },
    { category: 'Design', skill_name: 'User Interface Design', proficiency_level: 4 },
    { category: 'Design', skill_name: 'User Experience Design', proficiency_level: 4 },
    { category: 'Design', skill_name: 'Graphic Design Principles', proficiency_level: 4 },
    { category: 'Soft Skills', skill_name: 'Problem-Solving', proficiency_level: 5 },
    { category: 'Soft Skills', skill_name: 'Teamwork', proficiency_level: 5 },
    { category: 'Soft Skills', skill_name: 'Organization', proficiency_level: 5 },
    { category: 'Soft Skills', skill_name: 'Communication', proficiency_level: 4 }
  ],
  experience: [
    {
      id: 1,
      organization: 'AAU Qiyas Project',
      role: 'Cybersecurity & Digital Risk Management Trainee',
      type: 'Training',
      track: 'security',
      period: 'Jul 2026 - Present',
      location: 'Addis Ababa, Ethiopia',
      description: 'Intensive hands-on training across Blue Team and Red Team security operations.',
      highlights: [
        'Blue Team and SIEM operations, threat intelligence and incident response',
        'Red Team operations and penetration testing of web and network targets',
        'Linux and server administration; VLAN, VPN and routing',
        'Digital risk management, GRC, and secure SDLC / DevSecOps monitoring'
      ]
    },
    {
      id: 2,
      organization: 'CodeAlpha',
      role: 'Cybersecurity Intern',
      type: 'Internship',
      track: 'security',
      period: '2026 (project-based)',
      location: 'Remote',
      description: 'Project-based cybersecurity internship with practical, documented tasks.',
      highlights: [
        'Built a Python network packet sniffer with Scapy to capture and inspect live traffic',
        'Performed a secure code review of a Flask app, finding SQL injection, XSS, hardcoded credentials and insecure deserialization with manual review and Bandit (SAST)',
        'Documented findings and secure-coding fixes on GitHub'
      ]
    },
    {
      id: 3,
      organization: 'Information Network Security Administration (INSA)',
      role: '4th Cyber Talent Summer Camp - Challenge Participant',
      type: 'Program',
      track: 'security',
      period: 'Summer 2025',
      location: 'Addis Ababa, Ethiopia',
      description: 'National cybersecurity talent program run by INSA in collaboration with AASTU.',
      highlights: [
        'Worked through offensive and defensive security challenges in lab environments',
        'Final project: a Python/Flask web vulnerability scanner for automated testing and reporting'
      ]
    }
  ],
  projects: [
    {
      id: 1,
      title: 'Web Vulnerability Scanner',
      description: 'INSA Cyber Talent Summer Camp final project: a Python/Flask web security assessment tool for automated vulnerability testing and reporting.',
      technologies: ['Python', 'Flask', 'Web Security', 'Vulnerability Assessment'],
      project_url: 'https://web-vulnerability-scanner0.vercel.app',
      github_url: null,
      image_url: null,
      featured: true,
      category: 'security',
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Ethiopian Food Delivery',
      description: 'Bilingual food delivery web app with menu browsing, cart, online payments and session-based accounts.',
      technologies: ['Node.js', 'Express', 'EJS', 'PostgreSQL', 'Sequelize'],
      project_url: null,
      github_url: 'https://github.com/HailshZ/ethiopian-food-delivery',
      image_url: null,
      featured: true,
      category: 'development',
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      title: 'Secure Code Review',
      description: 'CodeAlpha Task 3: reviewed a deliberately vulnerable Flask app, documented SQL injection, XSS, hardcoded secrets and insecure deserialization, and shipped a fixed version.',
      technologies: ['Python', 'Flask', 'Bandit (SAST)', 'OWASP'],
      project_url: null,
      github_url: 'https://github.com/HailshZ/CodeAlpha_Task3_Secure_Code_Review',
      image_url: null,
      featured: false,
      category: 'security',
      created_at: new Date().toISOString()
    },
    {
      id: 4,
      title: 'Personal Portfolio',
      description: 'This site: a React frontend backed by an Express API and PostgreSQL (Supabase), with rate limiting, Helmet security headers and a contact form.',
      technologies: ['React', 'Node.js', 'Express', 'PostgreSQL'],
      project_url: 'https://hailemariamzelekeportfolio.netlify.app',
      github_url: 'https://github.com/HailshZ/My-portfolio-client',
      image_url: null,
      featured: false,
      category: 'development',
      created_at: new Date().toISOString()
    },
    {
      id: 5,
      title: 'Network Packet Sniffer',
      description: 'CodeAlpha Task 1: a Python network packet sniffer built with Scapy for capturing and inspecting live network traffic.',
      technologies: ['Python', 'Scapy', 'TCP/IP'],
      project_url: null,
      github_url: 'https://github.com/HailshZ/CodeAlpha_Task1_Network_Sniffer',
      image_url: null,
      featured: false,
      category: 'security',
      created_at: new Date().toISOString()
    },
    {
      id: 6,
      title: 'Secure SDLC & DevSecOps Lab',
      description: 'AAU Qiyas lab: security monitoring across the development lifecycle of OWASP Juice Shop, an intentionally vulnerable web application.',
      technologies: ['DevSecOps', 'Secure SDLC', 'OWASP Juice Shop'],
      project_url: null,
      github_url: 'https://github.com/HailshZ/Devsecops',
      image_url: null,
      featured: false,
      category: 'security',
      created_at: new Date().toISOString()
    },
    {
      id: 7,
      title: 'AI-powered Amharic Spelling Checker',
      description: 'Final-year B.Sc. project: an AI-powered spelling checker for the Amharic language.',
      technologies: ['Python', 'Machine Learning', 'NLP'],
      project_url: null,
      github_url: null,
      image_url: null,
      featured: false,
      category: 'development',
      created_at: new Date().toISOString()
    }
  ],
  certificates: [
    {
      id: 1,
      title: '4th Cyber Talent Summer Camp Program',
      issuing_organization: 'Information Network Security Administration (INSA) & AASTU',
      issue_date: 'October 2025',
      credential_url: null,
      certificate_image_url: 'https://plkrxfbsszdaqwxssicx.supabase.co/storage/v1/object/public/certificates/cybersecurity.jpg'
    },
    {
      id: 2,
      title: 'Ethiopia Cyber Shield 2026 - Intensive CTF',
      issuing_organization: 'Ethiopia Cyber Shield 2026',
      issue_date: 'Certificate pending',
      credential_url: null,
      certificate_image_url: null
    },
    {
      id: 3,
      title: 'Computer Maintenance & Networking',
      issuing_organization: 'Satcom Institute of Technology',
      issue_date: 'September 2025',
      credential_url: null,
      certificate_image_url: 'https://plkrxfbsszdaqwxssicx.supabase.co/storage/v1/object/public/certificates/computer-networking.jpg'
    },
    {
      id: 4,
      title: 'Graphic Design',
      issuing_organization: 'Berhanena Selam Printing Technology College',
      issue_date: 'April 2022',
      credential_url: null,
      certificate_image_url: 'https://plkrxfbsszdaqwxssicx.supabase.co/storage/v1/object/public/certificates/berhanena-selam.jpg'
    }
  ]
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
        'SELECT * FROM projects ORDER BY sort_order ASC, featured DESC, created_at DESC'
      );
      return result.rows.length > 0 ? result.rows : fallbackData.projects;
    } catch (error) {
      console.log('⚠️ Using fallback projects data');
      return fallbackData.projects;
    }
  }

  // Get work experience and training
  static async getExperience() {
    try {
      const result = await db.query('SELECT * FROM experience ORDER BY sort_order ASC, id ASC');
      return result.rows.length > 0 ? result.rows : fallbackData.experience;
    } catch (error) {
      console.log('⚠️ Using fallback experience data');
      return fallbackData.experience;
    }
  }

  // Get certificates
  static async getCertificates() {
    try {
      const result = await db.query(
        'SELECT * FROM certificates ORDER BY sort_order ASC, created_at DESC'
      );
      return result.rows.length > 0 ? result.rows : fallbackData.certificates;
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