const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

// Import security middleware
const { securityMiddleware, limiter } = require('./middleware/security');
const portfolioRoutes = require('./routes/portfolioRoutes');
const contactRoutes = require('./routes/contactRoutes'); // Added contact routes

const app = express();
const PORT = process.env.PORT || 5000;

// IMPORTANT: Updated CORS configuration to include the live Netlify frontend domain.
const corsOptions = {
    origin: [
        'http://localhost:3000', 
        'http://127.0.0.1:3000',
        // --- ADDED LIVE DOMAIN ---
        'https://hailemariamzelekeportfolio.netlify.app',
        // Allow Netlify branch deploys/previews for safety
        'https://*.netlify.app' 
        // --- END ADDED LIVE DOMAIN ---
    ],
    credentials: true,
    optionsSuccessStatus: 200
};

// Middleware
app.use(limiter);
app.use(securityMiddleware);

// Apply the updated CORS options
app.use(cors(corsOptions));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/contact', contactRoutes); // Added contact routes

// Health check route with database status
app.get('/health', async (req, res) => {
    // Note: requiring the database module inside the function ensures it's only 
    // attempted when the health check runs, but for robustness, ensure 
    // it's initialized correctly outside this function if used heavily elsewhere.
    const db = require('./config/database'); 
    let dbStatus = 'unknown';
    
    try {
        const result = await db.query('SELECT NOW()');
        dbStatus = 'connected';
    } catch (error) {
        dbStatus = 'disconnected';
    }
    
    res.status(200).json({
        success: true,
        message: 'Server is running successfully',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        database: dbStatus
    });
});

// Root route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Hailemariam Zeleke Portfolio API',
        version: '1.0.0',
        status: 'Server is running',
        endpoints: {
            health: '/health',
            personalInfo: '/api/portfolio/personal-info',
            education: '/api/portfolio/education',
            skills: '/api/portfolio/skills',
            projects: '/api/portfolio/projects',
            certificates: '/api/portfolio/certificates',
            contact: '/api/contact' // Added contact endpoint
        }
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        requestedUrl: req.originalUrl
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV}`);
    console.log(`🌐 Access the API at: http://localhost:${PORT}`);
    console.log(`🔍 Health check: http://localhost:${PORT}/health`);
    console.log(`📊 API status: http://localhost:${PORT}/api/portfolio/personal-info`);
    console.log(`📧 Contact endpoint: http://localhost:${PORT}/api/contact`); // Added contact endpoint log
});