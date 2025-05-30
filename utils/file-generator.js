const fs = require('fs');
const path = require('path');
const { generateFakeName, generateFakeFileName } = require('../helper/fake-data');

function generateTestFile() {
  const name = generateFakeName();
  const fileName = generateFakeFileName();
  const content = `Fake message from ${name} at ${fileName}`;
  const fileDir = path.resolve(__dirname);
  const filePath = path.join(fileDir, fileName);

  fs.writeFileSync(filePath, content);
  console.log(`📄 File created: ${filePath}`);

  return { filename: fileName, filePath };
}

function deleteFile(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`🗑️ Deleted file: ${filePath}`);
  }
}

module.exports = { generateTestFile, deleteFile };