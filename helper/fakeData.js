const { faker } = require('@faker-js/faker');

function generateFakeName() {
  return faker.person.fullName();
}

function generateFakeEmail() {
  return faker.internet.email();
}

function generateFakeFileName() {
  const baseName = faker.string.alphanumeric(8);
  return `${baseName}.txt`;
}

module.exports = {
  generateFakeName,
  generateFakeEmail,
  generateFakeFileName,
};
