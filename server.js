const express = require("express");
const serveIndex = require("serve-index");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, "sites", "yossi.eu");

// Subdomain redirects
const REDIRECTS = {
  "toma.yossi.eu": "/toma",
  "correa.yossi.eu": "/correa",
  "files.yossi.eu": "/files",
  "www.yossi.eu": "/",
  "zoom.yossi.eu": "https://uni-sydney.zoom.us/j/6465140162?pwd=SPgSrZcRMLCdaZ4sQTokqbectxtVQ7.1",
  "linkedin.yossi.eu": "https://www.linkedin.com/in/yossi-bokor-bleile",
};

app.use((req, res, next) => {
  const target = REDIRECTS[req.hostname];
  if (target) {
    const url = target.startsWith("https://") ? target : `https://yossi.eu${target}`;
    return res.redirect(301, url);
  }
  next();
});

// Directory listing for /files
app.use("/files", express.static(path.join(ROOT, "files")));
app.use("/files", serveIndex(path.join(ROOT, "files"), { icons: true }));

// Main site
app.use(express.static(ROOT));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
