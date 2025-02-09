import fs from "fs";
import path from "path";

// Function to combine JSON files
async function combineJsonFiles(inputFiles, outputFile) {
  let combinedData = [];
  let filesProcessed = 0;

  try {
    for (const file of inputFiles) {
      if (path.extname(file).toLowerCase() === ".json") {
        const data = JSON.parse(await fs.promises.readFile(file, "utf8"));

        // Combine data into a single array
        if (Array.isArray(data)) {
          combinedData.push(...data);
        } else if (typeof data === "object" && data !== null) {
          combinedData.push(data);
        }

        filesProcessed++;
      } else {
        console.warn(`Skipped non-JSON file: ${file}`);
      }
    }

    // Write the combined data to the output file
    await fs.promises.writeFile(
      outputFile,
      JSON.stringify(combinedData, null, 2)
    );

    console.log(`Combined ${filesProcessed} JSON files.`);
    console.log(`Output written to ${outputFile}`);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Usage
const inputFiles = [
  "C:\\Users\\Roshaan Ali Mehar\\Desktop\\test-scraper\\GoogleMaps\\v2\\finalized-data\\done\\G32003_to_32399_filtered_email_postal_codes_from.json",
  "C:\\Users\\Roshaan Ali Mehar\\Desktop\\test-scraper\\GoogleMaps\\v2\\finalized-data\\done\\G32399_to_33140_filtered_combined_postal_codes_with_emails_from_raw.json",
  "C:\\Users\\Roshaan Ali Mehar\\Desktop\\test-scraper\\GoogleMaps\\v2\\finalized-data\\done\\G32400_to_32599_emails_for_filtered_postal_codes.json",
  "C:\\Users\\Roshaan Ali Mehar\\Desktop\\test-scraper\\GoogleMaps\\v2\\finalized-data\\done\\G33140_to_34997_filtered_combined_postal_codes_from_raw.json" // Add filenames as needed
];
const outputFile = "combined_output.json";

combineJsonFiles(inputFiles, outputFile);
