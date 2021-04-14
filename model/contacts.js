const Contact = require("./schemas/contactSchema");

const listContacts = async (
  userId,
  { limit = 5, page = "1", sortBy, sortByDesc, filter, sub }
) => {
  const { docs: contacts, totalDocs: total } = await Contact.paginate(
    sub ? { owner: userId, subscription: sub } : { owner: userId },
    {
      limit,
      page,
      sort: {
        ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
        ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
      },
      select: filter ? filter.split("|").join(" ") : "",
      populate: {
        path: "owner",
        select: "name email -_id",
      },
    }
  );
  return { contacts, total, limit: Number(limit), page: Number(page) };
};

const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId).populate({
    path: "owner",
    select: "name email -_id",
  });
  return contact;
};

const removeContact = async (contactId) => {
  const removedContact = await Contact.findByIdAndDelete(contactId);
  return removedContact;
};

const addContact = async (body) => {
  const newContact = await Contact.create(body);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
