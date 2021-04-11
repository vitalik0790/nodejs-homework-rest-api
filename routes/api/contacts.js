const express = require("express");
const router = express.Router();
const contactController = require("../../controllers/index");

router.get("/", contactController.listContacts);

router.post("/", contactController.addContact);

router.get("/:contactId", contactController.getContactById);

router.delete("/:contactId", contactController.removeContact);

router.patch("/:contactId", contactController.updateContact);

module.exports = router;