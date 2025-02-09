const fs = require("fs");

const folderPath =
  "C:\\Users\\Roshaan Ali Mehar\\Desktop\\test-scraper\\GoogleMaps\\v2\\data";

const filesFinder = (folderPath, prefix = "business_data_") => {
  const files = fs.readdirSync(folderPath);

  const fileNumbers = files
    .filter((file) => file.startsWith(prefix) && file.endsWith(".json"))
    .map((file) => parseInt(file.replace(prefix, "").replace(".json", ""), 10))
    .sort((a, b) => a - b);

  if (fileNumbers.length === 0) {
    console.log("No files were found to be missing.");
    return;
  }

  const start = 10001;
  const end = 14925;

  const missingFiles = [];
  for (let i = start; i <= end; i++) {
    if (!fileNumbers.includes(i)) {
      missingFiles.push(i);
    }
  }

  const outputData = {
    missingFiles
  }

  const outputFilePath = "missingFiles.json"
  fs.writeFileSync(outputFilePath, JSON.stringify(outputData, null, 2), "utf8")
  console.log(`Missing Files logges to ${outputFilePath}`)

  console.log("Starting from:", fileNumbers[0]);
  console.log("Missing file numbers:", missingFiles);
};

filesFinder(folderPath);
