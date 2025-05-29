const fs = require('fs');
const path = require('path');
const { faker } = require('@faker-js/faker');

function generateTestFile() {
  const baseName = faker.string.alphanumeric(8); 
  const randomName = `${baseName}.txt`;
  const content = `Fake message from ${faker.person.fullName()} at ${faker.internet.email()}`;
  const fileDir = path.resolve(__dirname);
  const filePath = path.join(fileDir, randomName);

  fs.writeFileSync(filePath, content);
  console.log(`📄 File created: ${filePath}`);

  return { filename: randomName, filePath };
}


function deleteFile(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`🗑️ Deleted file: ${filePath}`);
  }
}

module.exports = { generateTestFile, deleteFile };