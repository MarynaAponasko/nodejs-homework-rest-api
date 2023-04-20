const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { HttpError } = require("../helpers");
const { User } = require("../models");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    next(HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      next(HttpError(401));
    }
    req.user = user;

    next();
  } catch (error) {
    next(HttpError(401));
  }
};

module.exports = { authenticate };
