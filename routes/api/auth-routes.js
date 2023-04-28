const express = require("express");

const { validateBody } = require("../../utils");
const { schemasAuth } = require("../../models");
const { authenticate, upload } = require("../../middlewares");

const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
  verify,
  resendVerifyEmail,
} = require("../../controllers");
// const { verify } = require("jsonwebtoken");

const router = express.Router();

router.post("/register", validateBody(schemasAuth.registerSchema), register);

router.get("/verify/:verificationCode", verify);

router.post(
  "/resend-verify-email",
  validateBody(schemasAuth.emailSchema),
  resendVerifyEmail
);

router.post("/login", validateBody(schemasAuth.loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

router.patch(
  "/:id",
  authenticate,
  validateBody(schemasAuth.updateSubscriptionSchema),
  updateSubscription
);

module.exports = router;
