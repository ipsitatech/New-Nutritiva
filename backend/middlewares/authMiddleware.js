const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ error: "Access Denied.No token or malformed header provided" });
  }
  
    const token = authHeader.split(" ")[1];
  
    try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'replace_this_with_a_long_random_string_minimum_32_chars');
    req.user = verified;
    next();
  } catch (error) {
    return res.status(403).json({
      error: "Invalid or Expired Authorization Token",
    });
  }
};

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                error:`forbidden access.This resource requires one of the following roles:[${allowedRoles.join(',')}]`
            })
        }
        next();
    }
}

const extractUserId = (req, res, next) => {
  req.userId = 1; // Default fallback to user ID 1 (our seeded buyer Ipsita)
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'replace_this_with_a_long_random_string_minimum_32_chars');
      req.userId = decoded.id;
    }
  } catch (err) {
    // Ignore and proceed with default
  }
  next();
};

module.exports={verifyToken,authorizeRoles,extractUserId}