const jwt = require('jsonwebtoken');
const db = require('../database/db'); // Adjust based on your project structure

const checkPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      // Extract JWT token and decode it
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // Extract userId from the decoded token
      const userId = decodedToken.id;

      // Get user roles and permissions from the database
      const user = await db.User.findOne({
        where: { id: userId },
        include: [
          {
            model: db.UserRole,
            include: [
              {
                model: db.Role,
                include: [
                  {
                    model: db.Permission,
                  },
                ],
              },
            ],
          },
        ],
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Extract all permissions associated with the user's roles
      const userPermissions = user.UserRoles.reduce((acc, userRole) => {
        const rolePermissions = userRole.Role.Permissions.map((permission) => permission.name);
        return acc.concat(rolePermissions);
      }, []);

      // Check if the user has the required permission
      if (!userPermissions.includes(requiredPermission)) {
        return res.status(403).json({status:false, message: 'Permission denied' });
      }

      next(); // Proceed to the next middleware if permission check passes
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token or unauthorized access' });
    }
  };
};

module.exports = checkPermission;
