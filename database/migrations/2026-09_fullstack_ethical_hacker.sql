-- Portfolio update, September 2026: Full Stack Developer + Ethical Hacker.
-- Safe to re-run. Content tables (education, skills, projects, experience) are replaced;
-- existing certificate rows are updated in place so their uploaded images are kept.
-- Run in the Supabase SQL editor, or: psql "$SUPABASE_DB_URL" -f this_file.sql

BEGIN;

ALTER TABLE projects ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT 'development';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 100;
ALTER TABLE certificates ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 100;

CREATE TABLE IF NOT EXISTS experience (
    id SERIAL PRIMARY KEY,
    organization VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    track VARCHAR(50),
    period VARCHAR(100),
    location VARCHAR(255),
    description TEXT,
    highlights TEXT[],
    sort_order INTEGER DEFAULT 100,
    created_at TIMESTAMP DEFAULT NOW()
);

UPDATE personal_info SET
    personal_statement = 'I''m a Computer Science graduate (CGPA 3.99) who works on both sides of the web: I build full-stack applications with React, Node.js, Express and PostgreSQL, and I test and secure them as an ethical hacker.

I''m currently a Cybersecurity and Digital Risk Management trainee at the AAU Qiyas Project, getting hands-on with Blue Team and Red Team operations: SIEM, threat intelligence, incident response, penetration testing, Linux and server administration, and secure SDLC / DevSecOps monitoring. Before that, I took part in INSA''s 4th Cyber Talent Summer Camp, where I built a Python/Flask web vulnerability scanner, and completed a project-based cybersecurity internship with CodeAlpha.

Knowing how applications are built makes me better at finding where they break, and knowing how they break makes me write safer code. I''m looking for an entry-level role in cybersecurity or secure web development where I can contribute from day one and keep growing.',
    location = 'Addis Ababa, Ethiopia',
    linkedin_url = 'https://www.linkedin.com/in/hailemariam-zeleke-38178329a',
    profile_picture_url = '/images/profile.jpg',
    updated_at = NOW()
WHERE id = 1;

DELETE FROM education;
INSERT INTO education (institution, degree, field_of_study, start_date, end_date, location, description, certificate_type) VALUES
('CPU Business and Information Technology College', 'Bachelor of Science', 'Computer Science', '2021', '2025', 'Addis Ababa, Ethiopia', 'Graduated with a CGPA of 3.99 and scored 81/100 on the national Computer Science Exit Exam. Final-year project: an AI-powered Amharic spelling checker.', 'Degree'),
('Satcom Institute of Technology', 'Computer Maintenance & Networking', NULL, NULL, 'Sep 2025', 'Addis Ababa, Ethiopia', 'Six-month training in hardware and software maintenance and server-based networking.', 'Certificate'),
('Berhanena Selam Printing Technology College', 'Graphic Design Coursework', NULL, 'Nov 2021', 'April 2022', 'Addis Ababa, Ethiopia', 'Completed coursework in graphic design principles and tools', 'Certificate');

DELETE FROM skills;
INSERT INTO skills (category, skill_name, proficiency_level) VALUES
('Programming Languages', 'JavaScript', 4),
('Programming Languages', 'Python', 4),
('Programming Languages', 'Java', 4),
('Programming Languages', 'C#', 4),
('Programming Languages', 'C++', 4),
('Web Development', 'React', 4),
('Web Development', 'Node.js', 4),
('Web Development', 'Express.js', 4),
('Web Development', 'REST APIs', 4),
('Web Development', 'HTML & CSS', 4),
('Database Management', 'PostgreSQL', 4),
('Database Management', 'MySQL', 4),
('Offensive Security', 'Web Vulnerability Assessment', 4),
('Offensive Security', 'Penetration Testing', 3),
('Offensive Security', 'Web Security Testing', 3),
('Offensive Security', 'Ethical Hacking Fundamentals', 4),
('Defensive Security', 'SIEM', 3),
('Defensive Security', 'Threat Intelligence', 3),
('Defensive Security', 'Incident Response', 3),
('Defensive Security', 'Log Analysis', 3),
('Defensive Security', 'Network Security', 3),
('Systems & Networking', 'Linux / Server Administration', 4),
('Systems & Networking', 'TCP/IP', 4),
('Systems & Networking', 'VLAN, VPN & Routing', 3),
('Systems & Networking', 'Nmap', 4),
('Systems & Networking', 'Wireshark', 4),
('Systems & Networking', 'Scapy', 4),
('Secure Development', 'Secure Code Review', 4),
('Secure Development', 'SAST / DevSecOps', 3),
('Secure Development', 'Git & GitHub', 4),
('Design', 'User Interface Design', 4),
('Design', 'User Experience Design', 4),
('Design', 'Graphic Design Principles', 4),
('Soft Skills', 'Problem-Solving', 5),
('Soft Skills', 'Teamwork', 5),
('Soft Skills', 'Organization', 5),
('Soft Skills', 'Communication', 4);

DELETE FROM experience;
INSERT INTO experience (organization, role, type, track, period, location, description, highlights, sort_order) VALUES
('AAU Qiyas Project', 'Cybersecurity & Digital Risk Management Trainee', 'Training', 'security', 'Jul 2026 - Present', 'Addis Ababa, Ethiopia', 'Intensive hands-on training across Blue Team and Red Team security operations.', ARRAY['Blue Team and SIEM operations, threat intelligence and incident response', 'Red Team operations and penetration testing of web and network targets', 'Linux and server administration; VLAN, VPN and routing', 'Digital risk management, GRC, and secure SDLC / DevSecOps monitoring']::TEXT[], 1),
('CodeAlpha', 'Cybersecurity Intern', 'Internship', 'security', '2026 (project-based)', 'Remote', 'Project-based cybersecurity internship with practical, documented tasks.', ARRAY['Built a Python network packet sniffer with Scapy to capture and inspect live traffic', 'Performed a secure code review of a Flask app, finding SQL injection, XSS, hardcoded credentials and insecure deserialization with manual review and Bandit (SAST)', 'Documented findings and secure-coding fixes on GitHub']::TEXT[], 2),
('Information Network Security Administration (INSA)', '4th Cyber Talent Summer Camp - Challenge Participant', 'Program', 'security', 'Summer 2025', 'Addis Ababa, Ethiopia', 'National cybersecurity talent program run by INSA in collaboration with AASTU.', ARRAY['Worked through offensive and defensive security challenges in lab environments', 'Final project: a Python/Flask web vulnerability scanner for automated testing and reporting']::TEXT[], 3);

DELETE FROM projects;
INSERT INTO projects (title, description, technologies, project_url, github_url, featured, category, sort_order) VALUES
('Web Vulnerability Scanner', 'INSA Cyber Talent Summer Camp final project: a Python/Flask web security assessment tool for automated vulnerability testing and reporting.', ARRAY['Python', 'Flask', 'Web Security', 'Vulnerability Assessment']::TEXT[], 'https://web-vulnerability-scanner0.vercel.app', NULL, true, 'security', 1),
('Ethiopian Food Delivery', 'Bilingual food delivery web app with menu browsing, cart, online payments and session-based accounts.', ARRAY['Node.js', 'Express', 'EJS', 'PostgreSQL', 'Sequelize']::TEXT[], NULL, 'https://github.com/HailshZ/ethiopian-food-delivery', true, 'development', 2),
('Secure Code Review', 'CodeAlpha Task 3: reviewed a deliberately vulnerable Flask app, documented SQL injection, XSS, hardcoded secrets and insecure deserialization, and shipped a fixed version.', ARRAY['Python', 'Flask', 'Bandit (SAST)', 'OWASP']::TEXT[], NULL, 'https://github.com/HailshZ/CodeAlpha_Task3_Secure_Code_Review', false, 'security', 3),
('Personal Portfolio', 'This site: a React frontend backed by an Express API and PostgreSQL (Supabase), with rate limiting, Helmet security headers and a contact form.', ARRAY['React', 'Node.js', 'Express', 'PostgreSQL']::TEXT[], 'https://hailemariamzelekeportfolio.netlify.app', 'https://github.com/HailshZ/My-portfolio-client', false, 'development', 4),
('Network Packet Sniffer', 'CodeAlpha Task 1: a Python network packet sniffer built with Scapy for capturing and inspecting live network traffic.', ARRAY['Python', 'Scapy', 'TCP/IP']::TEXT[], NULL, 'https://github.com/HailshZ/CodeAlpha_Task1_Network_Sniffer', false, 'security', 5),
('Secure SDLC & DevSecOps Lab', 'AAU Qiyas lab: security monitoring across the development lifecycle of OWASP Juice Shop, an intentionally vulnerable web application.', ARRAY['DevSecOps', 'Secure SDLC', 'OWASP Juice Shop']::TEXT[], NULL, 'https://github.com/HailshZ/Devsecops', false, 'security', 6),
('AI-powered Amharic Spelling Checker', 'Final-year B.Sc. project: an AI-powered spelling checker for the Amharic language.', ARRAY['Python', 'Machine Learning', 'NLP']::TEXT[], NULL, NULL, false, 'development', 7);

UPDATE certificates SET title = '4th Cyber Talent Summer Camp Program', issuing_organization = 'Information Network Security Administration (INSA) & AASTU', issue_date = 'October 2025', sort_order = 1
  WHERE certificate_image_url LIKE '%/cybersecurity.jpg';
UPDATE certificates SET title = 'Computer Maintenance & Networking', issuing_organization = 'Satcom Institute of Technology', issue_date = 'September 2025', sort_order = 3
  WHERE certificate_image_url LIKE '%/computer-networking.jpg';
UPDATE certificates SET title = 'Graphic Design', issuing_organization = 'Berhanena Selam Printing Technology College', issue_date = 'April 2022', sort_order = 4
  WHERE certificate_image_url LIKE '%/berhanena-selam.jpg';

INSERT INTO certificates (title, issuing_organization, issue_date, credential_url, certificate_image_url, sort_order)
SELECT 'Ethiopia Cyber Shield 2026 - Intensive CTF', 'Ethiopia Cyber Shield 2026', 'Certificate pending', NULL, NULL, 2
WHERE NOT EXISTS (SELECT 1 FROM certificates WHERE title = 'Ethiopia Cyber Shield 2026 - Intensive CTF');

COMMIT;
