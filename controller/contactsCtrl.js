const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../model/contacts");

const get = async (req, res, next) => {
  try {
    const contacts = await listContacts(req.user.id, req.query);
    console.log("contacts", contacts);
    res.json({
      status: "success",
      code: 200,
      data: {
        ...contacts,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (contact) {
      res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      res.status(404).json({
        status: "Error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  try {
    const requiredFields = ["name", "email", "phone"];
    if (!req.body.name || !req.body.email || !req.body.phone) {
      const errMessage = requiredFields
        .filter((item) => !Object.keys(req.body).includes(item))
        .reduce(
          (acc, string) => `${acc} missing required ${string} field; `,
          ""
        );
      res.status(400).json({
        message: errMessage,
      });
    } else {
      const data = await addContact({ ...req.body, owner: req.user.id });
      res.json({
        status: "success",
        code: 201,
        data,
      });
    }
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId);
    if (contact) {
      res.json({
        status: "success",
        code: 200,
        message: "contact deleted",
        data: contact,
      });
    } else {
      res.status(404).json({
        status: "Error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    if (!req.body) {
      res.status(400).json({
        message: "missing fields",
      });
    } else {
      const data = await updateContact(req.params.contactId, req.body);
      if (data) {
        res.json({
          status: "success",
          code: 200,
          data,
        });
      } else {
        res.status(404).json({
          status: "Error",
          code: 404,
          message: "Not found",
        });
      }
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  get,
  getById,
  add,
  remove,
  update,
};
