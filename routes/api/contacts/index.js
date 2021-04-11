const express = require("express");
const router = express.Router();

const validate = require("./validation");
const validateId = require("./validationId");
const contactController = require("../../../controllers/contactController");
const guard = require("../../../helpers/guard");

router.get("/", guard, contactController.listContacts);
router.post("/", guard, validate.createContact, contactController.addContact);
router.get("/:contactId", guard, validateId, contactController.getContactById);
router.delete(
  "/:contactId",
  guard,
  validateId,
  contactController.removeContact
);
router.patch(
  "/:contactId",
  guard,
  validateId,
  validate.updateContact,
  contactController.updateContact
);

module.exports = router;
