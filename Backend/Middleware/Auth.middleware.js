const jwt = require("jsonwebtoken");

const AuthenticationMW = (role) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ message: "Authorization header not found." });
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Token not found." });
      }

      jwt.verify(token, process.env.SECURED_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Invalid token." });
        }

        req.userID = decoded.userID;
        req.role = decoded.role;
        // console.log(decoded)
        // console.log(decoded.role)
        // console.log(role)
        // // Check for role match if required
        // if (role && decoded.role !== role) {
        //   return res.status(403).json({ message: "Access denied. Unauthorized role." });
        // }

        next();
      });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong.", error: error.message });
    }
  };
};

module.exports = { AuthenticationMW };
