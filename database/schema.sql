-- Create tables for portfolio
CREATE TABLE IF NOT EXISTS personal_info (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(20),
    email VARCHAR(255) UNIQUE NOT NULL,
    location TEXT,
    linkedin_url VARCHAR(255),
    github_url VARCHAR(255),
    telegram_username VARCHAR(100),
    personal_statement TEXT,
    profile_picture_url TEXT,
    resume_url TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS education (
    id SERIAL PRIMARY KEY,
    institution VARCHAR(255) NOT NULL,
    degree VARCHAR(255),
    field_of_study VARCHAR(255),
    start_date VARCHAR(50),
    end_date VARCHAR(50),
    location VARCHAR(255),
    description TEXT,
    certificate_type VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    skill_name VARCHAR(255) NOT NULL,
    proficiency_level INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS certificates (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    issuing_organization VARCHAR(255),
    issue_date VARCHAR(50),
    credential_url TEXT,
    certificate_image_url TEXT,
    sort_order INTEGER DEFAULT 100,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    technologies TEXT[],
    project_url TEXT,
    github_url TEXT,
    image_url TEXT,
    featured BOOLEAN DEFAULT FALSE,
    category VARCHAR(50) DEFAULT 'development',
    sort_order INTEGER DEFAULT 100,
    created_at TIMESTAMP DEFAULT NOW()
);

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