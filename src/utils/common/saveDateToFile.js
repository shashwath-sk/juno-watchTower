const fs = require('fs');
const path = require('path');

const relativePath = '../../data/'
const saveDataToFile = (fileName, data) => {
  const absolutePath = path.resolve(relativePath+fileName);
  try {
    fs.writeFileSync(absolutePath, data);
    console.log(`Data saved to ${absolutePath} successfully.`);
  } catch (error) {
    console.error(`Error saving data to ${absolutePath}:`, error);
  }
};

export default saveDataToFile;
