const express = require("express");
const router = express.Router();
const ctrlUsers = require("../../controller/usersCtrl");
const { userValidate } = require("../../validation/index");
const guard = require("../../helpers/guard");
const uploadMiddleware = require("../../helpers/upload");

router.post("/register", userValidate, ctrlUsers.reg);
router.post("/login", userValidate, ctrlUsers.login);
router.post("/logout", guard, ctrlUsers.logout);
router.get("/current", guard, ctrlUsers.current);
router.patch("/patch", guard, ctrlUsers.patch);
router.patch(
  "/avatars",
  [guard, uploadMiddleware.single("avatar")],
  ctrlUsers.avatar
);
router.get("/verify/:verificationToken", ctrlUsers.verify);
router.post("/verify", ctrlUsers.resend);

module.exports = router;
