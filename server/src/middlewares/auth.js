const { verifyToken } = require('../utils/Token');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization['x-access-token'];

        const decoded = await verifyToken(token);

        if (!decoded) {
            return res.status(401).json({
                message: 'Authentication failed',
            });
        }

        req.user_id = decoded.user_id;
        req.user_email = decoded.email

        next();

    } catch (error) {
        return res.status(401).json({
            message: 'Authentication failed',
        });
    }
}

module.exports = auth;