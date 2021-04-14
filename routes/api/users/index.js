const express = require("express");
const router = express.Router();

const validate = require("./validation");
const userController = require("../../../controllers/userController");
const guard = require("../../../helpers/guard");

router.post("/auth/register", validate.register, userController.register);
router.post("/auth/login", validate.login, userController.login);
router.post("/auth/logout", guard, userController.logout);
router.patch("/", guard, validate.updateUser, userController.updateUser);
router.get("/current", guard, userController.current);

module.exports = router;
