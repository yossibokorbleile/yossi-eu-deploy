const express = require("express");
const serveIndex = require("serve-index");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, "sites", "yossi.eu");

// Directory listing for /files
app.use("/files", express.static(path.join(ROOT, "files")));
app.use("/files", serveIndex(path.join(ROOT, "files"), { icons: true }));

// Main site
app.use(express.static(ROOT));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
