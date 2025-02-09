const fs = require('fs');

// Function to read a JSON file
function readJSONFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        process.exit(1);
    }
}

// Function to merge two records
function mergeRecords(record1, record2) {
    if (record1["Phone Number"] === record2["Phone Number"]) {
        return {
            ...record1,
            ...record2,
            Emails: [
                ...(record1.Emails || []),
                ...(record2.Emails || []),
            ].filter((value, index, self) => self.indexOf(value) === index), // Remove duplicates
        };
    }
    return null; // Return null if phone numbers don't match
}

// Function to process and merge two JSON files
function mergeJSONFiles(file1, file2, outputFile) {
    const data1 = readJSONFile(file1);
    const data2 = readJSONFile(file2);

    const mergedRecords = [];
    const matchedPhoneNumbers = new Set();

    // Merge matching records
    data1.forEach(record1 => {
        const matchingRecord = data2.find(record2 => record1["Phone Number"] === record2["Phone Number"]);
        if (matchingRecord) {
            mergedRecords.push(mergeRecords(record1, matchingRecord));
            matchedPhoneNumbers.add(record1["Phone Number"]);
        } else {
            mergedRecords.push(record1); // Add unmatched record1
        }
    });

    // Add unmatched records from data2
    data2.forEach(record2 => {
        if (!matchedPhoneNumbers.has(record2["Phone Number"])) {
            mergedRecords.push(record2);
        }
    });

    // Write merged records to the output file
    fs.writeFileSync(outputFile, JSON.stringify(mergedRecords, null, 2), 'utf8');
    console.log(`Merged records have been written to ${outputFile}`);
}


// Provide file paths and call the merge function
const file1 = 'C:\\Users\\Roshaan Ali Mehar\\Desktop\\test-scraper\\all_unique_records_from_data_folder.json'; // Replace with your first JSON file path
const file2 = 'C:\\Users\\Roshaan Ali Mehar\\Desktop\\test-scraper\\combinedOutputForAllEmailRecords.json'; // Replace with your second JSON file path
const outputFile = 'WithAndWithoutEmailCombinedRecords.json'; // Output file for merged records

mergeJSONFiles(file1, file2, outputFile);
