const Contact = require("../model/contacts");

const listContacts = async (userId) => {
  const data = await Contact.find({ owner: userId }).populate({
    path: "owner",
    select: "email subscription -_id",
  });
  return data;
};

const getContactById = async (contactId, userId) => {
  const data = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: "owner",
    select: "email subscription -_id",
  });
  return data;
};

const addContact = async (body) => {
  const data = await Contact.create(body);
  return data;
};

const updateContact = async (contactId, body, userId) => {
  const data = await Contact.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true }
  );
  return data;
};

const removeContact = async (contactId, userId) => {
  const data = await Contact.findByIdAndRemove({
    _id: contactId,
    owner: userId,
  });
  return data;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
