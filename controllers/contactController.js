const Contacts = require("../services/contactService");
const { HTTP_CODE } = require("../helpers/constants");

const listContacts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contacts = await Contacts.listContacts(userId);
    return res.json({
      status: "success",
      code: HTTP_CODE.OK,
      data: {
        contacts,
      },
    });
  } catch (e) {
    next(e);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const {
      params: { contactId },
    } = req;
    const userId = req.user.id;
    const contact = await Contacts.getContactById(contactId, userId);
    if (contact) {
      return res.json({
        status: "success",
        code: HTTP_CODE.OK,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: HTTP_CODE.NOT_FOUND,
      });
    }
  } catch (e) {
    next(e);
  }
};

const addContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.addContact({ ...req.body, owner: userId });
    return res.status(201).json({
      status: "success",
      code: HTTP_CODE.CREATED,
      data: {
        contact,
      },
    });
  } catch (e) {
    next(e);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const {
      body,
      params: { contactId },
    } = req;
    const userId = req.user.id;
    const contact = await Contacts.updateContact(contactId, body, userId);
    if (contact) {
      return res.json({
        status: "success",
        code: HTTP_CODE.OK,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: HTTP_CODE.NOT_FOUND,
        message: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const {
      params: { contactId },
    } = req;
    const userId = req.user.id;
    const contact = await Contacts.removeContact(contactId, userId);
    if (contact) {
      return res.json({
        status: "success",
        code: HTTP_CODE.OK,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: HTTP_CODE.NOT_FOUND,
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
