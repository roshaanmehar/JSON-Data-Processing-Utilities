import fs from "fs";

// Function to normalize phone numbers
function normalizePhoneNumber(phone) {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, "");

  // Ensure the number starts with +1 for US numbers
  if (digits.length === 10) {
    return `+1${digits}`;
  } else if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`;
  } else {
    return phone; // Return original if unable to normalize
  }
}

// Function to process and deduplicate records in a single file
async function processSingleJsonFile(inputFile, outputFile) {
  try {
    // Read and parse the input file
    const data = JSON.parse(await fs.promises.readFile(inputFile, "utf8"));

    if (!Array.isArray(data)) {
      console.error("Input file must contain an array of records.");
      return;
    }

    // Normalize and deduplicate records
    const normalizedRecords = new Map();

    for (const record of data) {
      if (record["Phone Number"]) {
        record["Phone Number"] = normalizePhoneNumber(record["Phone Number"]);
      }

      // Create a unique identifier using business name and normalized phone number
      const uniqueId = `${record["Business Name"] || ""}_${record["Phone Number"] || ""}`;

      // Keep the record with more emails in case of duplicates
      if (
        !normalizedRecords.has(uniqueId) ||
        (record["Emails"] && record["Emails"].length > (normalizedRecords.get(uniqueId)["Emails"] || []).length)
      ) {
        normalizedRecords.set(uniqueId, record);
      }
    }

    // Convert the deduplicated map to an array
    const uniqueRecords = Array.from(normalizedRecords.values());

    // Write the output file
    await fs.promises.writeFile(outputFile, JSON.stringify(uniqueRecords, null, 2));

    // Print statistics
    console.log(`Input records: ${data.length}`);
    console.log(`Unique records: ${uniqueRecords.length}`);
    console.log(`Output written to: ${outputFile}`);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Usage
const inputFile = "C:\\Users\\Roshaan Ali Mehar\\Desktop\\test-scraper\\GoogleMaps\\v2\\data-filtering\\data-combining\\combined_postal_codes_from_13251_to_14250_raw.json"; // Replace with your input file name
const outputFile = "combined_postal_codes_from_13251_to_14250_raw.json"; // Replace with your desired output file name

processSingleJsonFile(inputFile, outputFile);
