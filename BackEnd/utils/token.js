const jwt = require("jsonwebtoken");

class TokenUtils {
  extractToken = (req, res) => {
    let token = req.headers["authorization"];
    console.log(token);
    if (token == null) {
      return {
        status: false,
        token: null,
      };
    }

    try {
      let decoded = jwt.verify(token, "ac7a3244067309195c1d3e862e3b1bc6");
      return {
        status: true,
        token: decoded,
      };
    } catch (e) {
      console.log(e);
      return {
        status: false,
        token: null,
      };
    }
  };
}

module.exports = TokenUtils;