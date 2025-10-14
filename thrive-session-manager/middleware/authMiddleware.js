const jwt = require("jsonwebtoken");

exports.protect = (role) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized access! you are not special bro get a token like everybody else" });

    try {const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (role && decoded.role !== role) {return res.status(403).json({ message: "Access denied! Nice try though :)" });
      }

      next();
    } catch { res.status(401).json({ message: "Invalid token! either it’s expired, forged, or your cat just walked on the keyboard again." });
    }
  };
};
