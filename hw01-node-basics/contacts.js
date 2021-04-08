const fs = require("fs");
const fsp = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  const data = await fsp.readFile(contactsPath, "utf8");
  console.table(JSON.parse(data));
}

async function getContactById(contactId) {
  const data = await fsp.readFile(contactsPath, "utf8");
  const findedData = JSON.parse(data).find((user) => user.id === contactId);
  console.table(findedData);
}

async function removeContact(contactId) {
  const data = await fsp.readFile(contactsPath, "utf8");
  const arr = JSON.parse(data);
  if (arr.find((user) => user.id === contactId)) {
    const filtredData = arr.filter((user) => user.id !== contactId);
    await fsp.writeFile(contactsPath, JSON.stringify(filtredData), (err) => {
      if (err) {
        console.warn(err);
      }
    });
    const newData = await fsp.readFile(contactsPath, "utf8");
    console.table(JSON.parse(newData));
  } else {
    console.log(`Contact with id=${contactId} does not exist`);
  }
}

async function addContact(name, email, phone) {
  const data = await fsp.readFile(contactsPath, "utf8");
  const arrContacts = JSON.parse(data);
  const id = shortid.generate();
  const newContact = { id, name, email, phone };
  const contactsWithNew = JSON.stringify([...arrContacts, newContact]);
  await fsp.writeFile(contactsPath, contactsWithNew, (err) => {
    if (err) {
      console.warn(err);
    }
  });
  const newData = await fsp.readFile(contactsPath, "utf8");
  console.table(JSON.parse(newData));
}

module.exports = { listContacts, getContactById, removeContact, addContact };
