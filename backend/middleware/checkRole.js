// middleware/checkRole.js
const checkRole = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Unauthorized access' });
    }
    next();
};

module.exports = checkRole;