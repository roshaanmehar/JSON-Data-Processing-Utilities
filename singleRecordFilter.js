import fs from "fs";

// Function to read JSON file and check for duplicates
function checkDuplicates(filePath) {
  // Read the JSON file (assuming it's an array of records)
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log("Error reading file:", err);
      return;
    }

    try {
      // Parse the JSON data
      const records = JSON.parse(data);

      // To store unique records and duplicate records
      const seen = new Map(); // Track seen values (e.g., Phone Number or Business Name)
      const duplicates = []; // To hold duplicate record numbers

      // Iterate over each record in the JSON data
      records.forEach((record, index) => {
        // Use "Phone Number" as the unique identifier (or Business Name)
        const uniqueKey = record["Phone Number"]; // You can change this if needed (e.g., Business Name)

        // Check if the unique key already exists in the map
        if (seen.has(uniqueKey)) {
          // If yes, it's a duplicate, add the record number to duplicates array
          duplicates.push({ original: seen.get(uniqueKey), duplicate: index + 1 });
        } else {
          // Otherwise, add to the map with the record number
          seen.set(uniqueKey, index + 1); // Store the record number (1-based index)
        }
      });

      // Output the results
      if (duplicates.length > 0) {
        const duplicateCount = duplicates.length;
        const duplicateText = duplicateCount === 1 ? 'duplicate' : 'duplicates'; // Singular/plural check
        console.log(`${duplicateCount} ${duplicateText} found:`);

        // List the duplicate records with their numbers
        duplicates.forEach(duplicate => {
          console.log(`Duplicate found between Record ${duplicate.original} and Record ${duplicate.duplicate}`);
        });
      } else {
        console.log("0 duplicates found.");
      }
    } catch (parseError) {
      console.log("Error parsing JSON:", parseError);
    }
  });
}

// Example usage - pass the path to your JSON file
checkDuplicates("C:/Users/Roshaan Ali Mehar/Desktop/scraper/GoogleMaps/google-maps-scraper/data/10001_plumbing.json");
