import fs from "fs";

// Load data from JSON file
const filePath =
  "C:\\Users\\Roshaan Ali Mehar\\Desktop\\test-scraper\\GoogleMaps\\v2\\data-filtering\\data-combining\\combined_postal_codes_from_13251_to_14250_raw.json"; // Change this to your JSON file path
const outputPath = "combined_postal_codes_from_13251_to_14250_raw.json";

// Function to filter duplicates and log occurrences
function filterDuplicates(filePath, outputPath) {
  const startTime = Date.now(); // Start the timer

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    try {
      const records = JSON.parse(data); // Parse the JSON data
      const totalRecordsBefore = records.length; // Total records before filtering
      console.log(`Total records before filtering: ${totalRecordsBefore}`);

      const occurrenceMap = new Map(); // Map to track occurrences of each unique key
      const duplicateSummary = {}; // Object to count duplicates

      // Count occurrences of each unique key and log them
      records.forEach((record) => {
        const uniqueKey = record["Phone Number"]; // Change key if needed
        if (occurrenceMap.has(uniqueKey)) {
          occurrenceMap.set(uniqueKey, {
            count: occurrenceMap.get(uniqueKey).count + 1,
            records: [...occurrenceMap.get(uniqueKey).records, record],
          });
        } else {
          occurrenceMap.set(uniqueKey, { count: 1, records: [record] });
        }
      });

      // Count duplicate frequencies
      occurrenceMap.forEach((value) => {
        const count = value.count;
        if (count > 1) {
          const duplicates = count - 1; // Duplicates are total count minus 1
          duplicateSummary[duplicates] =
            (duplicateSummary[duplicates] || 0) + 1;
        }
      });

      // Filter records to keep only the first occurrence of each unique key
      const filteredRecords = [];
      occurrenceMap.forEach((value, uniqueKey) => {
        const { records } = value;
        filteredRecords.push(records[0]); // Keep only the first record
      });

      const totalRecordsAfter = filteredRecords.length; // Total records after filtering
      const recordsRemoved = totalRecordsBefore - totalRecordsAfter; // Calculate total records removed

      // Log duplicate details
      console.log(`Total records after filtering: ${totalRecordsAfter}`);
      console.log(`Total duplicates removed: ${recordsRemoved}`);

      // Write the filtered records back to a new JSON file
      fs.writeFile(
        outputPath,
        JSON.stringify(filteredRecords, null, 4),
        (err) => {
          if (err) {
            console.error("Error writing to file:", err);
          } else {
            console.log(`Filtered data saved to ${outputPath}`);
          }
        }
      );

      // Log time taken
      const endTime = Date.now();
      console.log(
        `Time taken for processing: ${(endTime - startTime) / 1000} seconds.`
      );

      // Log duplicate summary
      console.log("Summary of duplicates:");
      Object.keys(duplicateSummary)
        .sort((a, b) => b - a) // Sort by number of duplicates (descending)
        .forEach((duplicates) => {
          console.log(
            `Number of records with ${duplicates} duplicates: ${duplicateSummary[duplicates]}`
          );
        });
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
    }
  });
}

// Call the function
filterDuplicates(filePath, outputPath);
