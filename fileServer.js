const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const directoryPath = __dirname;
console.log(__dirname);

app.use("/files", express.static(directoryPath));

//Route to handle GET request to get list of files
app.get("/files", (req, res) => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Error reading files:", err);
      res.status(500).send("Internal server error");
    } else {
      res.status(200).json(files);
    }
  });
});
//Route handle display file
app.get("/files/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, fileName);

  if (fs.existsSync(filePath)) {
    res.status(200).sendFile(filePath);
  } else {
    res.status(404).send("File not found");
  }
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
