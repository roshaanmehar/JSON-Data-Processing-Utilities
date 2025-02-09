# JSON Data Processing Utilities

## Introduction
This repository contains a collection of JavaScript/Node.js scripts designed for processing, filtering, and managing JSON data. These utilities help in transforming, deduplicating, normalizing, merging, and combining JSON records efficiently. The scripts cater to specific use cases such as cleaning up datasets, identifying missing files, and merging records based on business logic.

## Features
- **Data Transformation**: Convert JSON records into a structured format.
- **Duplicate Filtering**: Identify and remove duplicate records based on unique identifiers.
- **Missing File Detection**: Locate missing numbered JSON files within a range.
- **Data Normalization**: Standardize phone numbers for consistency.
- **File Combination**: Merge multiple JSON files into a single dataset.
- **Email Merging**: Merge email and non-email records while preserving unique data.

## Scripts Overview

### 1. `convert.js`
- **Purpose**: Transforms raw JSON data into a standardized format.
- **Key Features**:
  - Parses and restructures records.
  - Adds additional metadata fields.
  - Ensures consistent formatting.
- **Input Format (Example)**:
  ```json
  [{ "Zip Code": "10001", "Common Cities": "New York", "County": "New York", "Area Codes": "212" }]
  ```
- **Output Format (Example)**:
  ```json
  [{ "postcode": 10001, "state": "florida", "processing": false, "commoncities": "New York", "county": "New York", "areacode": 212 }]
  ```

### 2. `singleRecordFilter.js`
- **Purpose**: Checks for duplicate records in a JSON file.
- **Key Features**:
  - Detects duplicates based on "Phone Number".
  - Outputs duplicate records and their occurrences.
- **Example Output**:
  ```
  3 duplicates found:
  Duplicate found between Record 2 and Record 5
  Duplicate found between Record 8 and Record 12
  ```

### 3. `missingfileslocator.js`
- **Purpose**: Identifies missing JSON files within a specified range.
- **Key Features**:
  - Scans a directory for files with a specific naming pattern.
  - Lists missing file numbers.
  - Outputs a `missingFiles.json` log.
- **Example Output**:
  ```json
  { "missingFiles": [10005, 10007, 10012] }
  ```

### 4. `fileFilteringAndNumbering.js`
- **Purpose**: Removes duplicate records while logging their occurrences.
- **Key Features**:
  - Counts and removes duplicates.
  - Generates a summary of duplicate frequencies.
  - Outputs cleaned JSON data.
- **Example Statistics**:
  ```
  Total records before filtering: 5000
  Total records after filtering: 4200
  Total duplicates removed: 800
  ```

### 5. `fileFilteringAndNumberingNormalizationScript.js`
- **Purpose**: Normalizes phone numbers and removes duplicate records.
- **Key Features**:
  - Standardizes phone numbers to `+1XXXXXXXXXX` format.
  - Deduplicates records while retaining the one with more emails.
- **Example Transformation**:
  ```json
  { "Business Name": "ABC Plumbing", "Phone Number": "(212) 555-1234" }
  ```
  **After Normalization:**
  ```json
  { "Business Name": "ABC Plumbing", "Phone Number": "+12125551234" }
  ```

### 6. `jsonfilecombiner.js`
- **Purpose**: Merges multiple JSON files into one.
- **Key Features**:
  - Iterates through a range of numbered JSON files.
  - Removes specific fields (e.g., "Stars", "Number of Reviews").
  - Outputs a single combined file.

### 7. `filecombinerbyname.js`
- **Purpose**: Combines specific JSON files into a single dataset.
- **Key Features**:
  - Reads a list of provided JSON files.
  - Appends data into a unified structure.
  - Logs processed file count.

### 8. `emailAndWithoutEmailRecordsMerger.js`
- **Purpose**: Merges JSON files containing records with and without email addresses.
- **Key Features**:
  - Matches records by "Phone Number".
  - Merges email addresses while avoiding duplicates.
  - Preserves unique business data.

## Usage
To run any script, use the following command:
```sh
node scriptName.js
```
For ES6 modules, use:
```sh
node --experimental-modules scriptName.mjs
```

## File Formats
Each script reads and writes JSON files in a structured format, ensuring compatibility across data processing workflows.

## License
This project is open-source and available under the MIT License.

---

This README provides an in-depth explanation of the scripts and their functionalities. Let me know if you need any modifications or additional sections!

