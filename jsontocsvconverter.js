import fs from 'fs/promises';
import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';

function flattenObject(obj, prefix = '') {
  return Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? prefix + '.' : '';
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      Object.assign(acc, flattenObject(obj[k], pre + k));
    } else if (Array.isArray(obj[k])) {
      acc[pre + k] = JSON.stringify(obj[k]);
    } else {
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {});
}

async function convertJsonToCsv(inputFile, outputFile) {
  try {
    // Read the JSON file
    const jsonData = await fs.readFile(inputFile, 'utf8');
    const data = JSON.parse(jsonData);

    // Ensure data is an array
    const dataArray = Array.isArray(data) ? data : [data];

    // Flatten and collect all unique keys
    const flattenedData = dataArray.map(item => flattenObject(item));
    const allKeys = new Set(flattenedData.flatMap(Object.keys));

    // Create headers
    const headers = Array.from(allKeys).map(key => ({ id: key, title: key }));

    // Create CSV writer
    const csvWriter = createObjectCsvWriter({
      path: outputFile,
      header: headers
    });

    // Write data to CSV
    await csvWriter.writeRecords(flattenedData);

    console.log(`CSV file has been created successfully: ${outputFile}`);
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

// Usage
const inputFile = 'C:\\Users\\Roshaan Ali Mehar\\Desktop\\test-scraper\\all_unique_records_from_data_folder.json';
const outputFile = 'C:\\Users\\Roshaan Ali Mehar\\Desktop\\test-scraper\\all_unique_records_from_data_folder.csv';

convertJsonToCsv(inputFile, outputFile);