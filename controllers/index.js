const Contacts = require("../services/contactService");

const listContacts = async (_req, res, next) => {
    try {
        const contacts = await Contacts.listContacts();
        return res.json({
            status: "success",
            code: 200,
            data: {
                contacts,
            },
        });
    } catch (error) {
        next(error);
    }
};

const getContactById = async (req, res, next) => {
    const {
        params: { contactId },
    } = req;

    try {
        const contact = await Contacts.getContactById(contactId);
        if (contact) {
            return res.json({
                status: "success",
                code: 200,
                data: {
                    contact,
                },
            });
        } else {
            return res.status(404).json({
                status: "error",
                code: 404,
            });
        }
    } catch (error) {
        next(error);
    }
};

//  try {
//    const contact = await Contacts.addContact(req.body);
//    return res.status(201).json({
//      status: "success",
//      code: 201,
//      data: {
//        contact,
//      },
//    });
//  } catch (error) {
//    next(error);
//  }

const addContact = async (req, res, next) => {
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
            const data = await Contacts.addContact(req.body);
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

const updateContact = async (req, res, next) => {
    const {
        body,
        params: { contactId },
    } = req;

    try {
        const contact = await Contacts.updateContact(contactId, body);
        if (contact) {
            return res.json({
                status: "success",
                code: 200,
                data: {
                    contact,
                },
            });
        } else {
            return res.status(404).json({
                status: "error",
                code: 404,
                message: "Not Found",
            });
        }
    } catch (error) {
        next(error);
    }
};

const removeContact = async (req, res, next) => {
    const {
        params: { contactId },
    } = req;

    try {
        const contact = await Contacts.removeContact(contactId);
        if (contact) {
            return res.json({
                status: "success",
                code: 200,
                data: {
                    contact,
                },
            });
        } else {
            return res.status(404).json({
                status: "error",
                code: 404,
                message: "Not Found",
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    listContacts,
    getContactById,
    addContact,
    updateContact,
    removeContact,
};