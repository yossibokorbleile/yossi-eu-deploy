const express = require("express");
const serveIndex = require("serve-index");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const SITES = path.join(__dirname, "sites");

// Subsites served under /toma, /correa, /files
app.use("/toma", express.static(path.join(SITES, "toma.yossi.eu")));
app.use("/correa", express.static(path.join(SITES, "correa.yossi.eu")));
app.use("/files", express.static(path.join(SITES, "files.yossi.eu")));
app.use("/files", serveIndex(path.join(SITES, "files.yossi.eu"), { icons: true }));

// Main site at root
app.use(express.static(path.join(SITES, "yossi.eu")));

// Debug: show all headers
app.use((req, res) => {
  res.type("json").send(JSON.stringify(req.headers, null, 2));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
