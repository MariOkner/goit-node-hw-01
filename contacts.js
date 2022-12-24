const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "db", "contacts.json");

async function readContacts() {
  return JSON.parse(await fs.readFile(contactsPath));
}

async function writeContact(contact) {
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
}

async function listContacts() {
  return await readContacts();
}

async function getContactById(contactId) {
  const contacts = await readContacts();
  return contacts.find((contact) => contact.id === contactId);
}

async function removeContact(contactId) {
  const contacts = await readContacts();
  const updateContact = contacts.filter((contact) => contact.id !== contactId);
  await writeContact(updateContact);
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const contacts = { id, name, email, phone };

  const contact = await readContacts();
  contact.push(contacts);

  await writeContact(contact);
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
