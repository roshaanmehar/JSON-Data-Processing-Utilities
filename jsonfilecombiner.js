const fs = require("fs");
const path = require("path");

// Define the folder containing your JSON files and the output file name
const inputFolder = "C:\\Users\\Roshaan Ali Mehar\\Desktop\\test-scraper\\GoogleMaps\\v2\\data"; // Replace with your folder path
const outputFile = "combined_postal_codes_from_14251_to_14925_raw.json";

// Initialize an array to hold all the records
let allRecords = [];

// Iterate through the file names in succession
for (let i = 10001; i <= 14925; i++) {
  const fileName = `business_data_${i}.json`;
  const filePath = path.join(inputFolder, fileName);

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Remove "Stars" and "Number of Reviews" from each record
    const filteredData = data.map(record => {
      const { Stars, "Number of Reviews": _, ...filteredRecord } = record;
      return filteredRecord;
    });

    // Add filtered data to the combined array
    allRecords = allRecords.concat(filteredData);
  } else {
    console.warn(`File not found: ${fileName}`);
  }
}

// Write the combined records to a single JSON file
fs.writeFileSync(outputFile, JSON.stringify(allRecords, null, 2), "utf8");
console.log(`Combined JSON file created: ${outputFile}`);
