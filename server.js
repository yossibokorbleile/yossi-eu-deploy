const express = require("express");
const serveIndex = require("serve-index");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const SITES = path.join(__dirname, "sites");

// Route subdomains to their site directories
app.use((req, res, next) => {
  const host = req.hostname;
  const siteDir = path.join(SITES, host);
  if (host !== "yossi.eu" && host.endsWith(".yossi.eu")) {
    req.siteDir = siteDir;
  }
  next();
});

// File server with directory listing
app.use((req, res, next) => {
  if (req.hostname === "files.yossi.eu") {
    express.static(path.join(SITES, "files.yossi.eu"))(req, res, () => {
      serveIndex(path.join(SITES, "files.yossi.eu"), { icons: true })(req, res, next);
    });
  } else if (req.siteDir) {
    express.static(req.siteDir)(req, res, next);
  } else {
    next();
  }
});

// Main site at root (yossi.eu and preview URL fallback)
app.use(express.static(path.join(SITES, "yossi.eu")));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
