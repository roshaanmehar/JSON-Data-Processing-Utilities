// convert.js (CommonJS version)
const fs = require('fs');
const path = require('path');

// __dirname is available in CommonJS
const inputFilePath = path.join(__dirname, 'New_York_zipcodes.json');
const outputFilePath = path.join(__dirname, 'New_York_zipcodes_output.json');

function transformRecord(oldRecord) {
  const postcode = parseInt(oldRecord["Zip Code"], 10) || 0;
  const commoncities = oldRecord["Common Cities"] || "";
  const county = oldRecord["County"] || "";
  const areacode = parseInt((oldRecord["Area Codes"] || "").trim(), 10) || 0;


  
  return {
    postcode,
    state: "florida",
    processing: false,
    totalrecordsfound: 0,
    totaluniquerecordsfound:0,
    recordsfoundwithemail: 0,
    scrapedsuccessfully: false,
    didresultsloadcompletely: false,
    commoncities,
    county,
    areacode
  };
}

function transformFile(inputPath, outputPath) {
  try {
    const rawData = fs.readFileSync(inputPath, 'utf8');
    const oldRecords = JSON.parse(rawData);
    const transformed = oldRecords.map(transformRecord);

    fs.writeFileSync(outputPath, JSON.stringify(transformed, null, 2));
    console.log(`Transformation complete! Output written to ${outputPath}`);
  } catch (err) {
    console.error("Error during transformation:", err);
  }
}

transformFile(inputFilePath, outputFilePath);
