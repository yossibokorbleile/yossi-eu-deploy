const express = require("express");
const vhost = require("vhost");
const serveIndex = require("serve-index");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const SITES = path.join(__dirname, "sites");

// Static sites
app.use(vhost("yossi.eu", express.static(path.join(SITES, "yossi.eu"))));
app.use(vhost("toma.yossi.eu", express.static(path.join(SITES, "toma.yossi.eu"))));
app.use(vhost("correa.yossi.eu", express.static(path.join(SITES, "correa.yossi.eu"))));

// File server with directory listing
const filesApp = express();
filesApp.use(express.static(path.join(SITES, "files.yossi.eu")));
filesApp.use(serveIndex(path.join(SITES, "files.yossi.eu"), { icons: true }));
app.use(vhost("files.yossi.eu", filesApp));

// Redirects
app.use(vhost("www.yossi.eu", (req, res) => {
  res.redirect(301, `https://yossi.eu${req.url}`);
}));
app.use(vhost("github.yossi.eu", (req, res) => {
  res.redirect(301, "https://github.com/yossibokorbleile");
}));
app.use(vhost("linkedin.yossi.eu", (req, res) => {
  res.redirect(301, "https://linkedin.com/in/yossi-bokor-bleile");
}));
app.use(vhost("zoom.yossi.eu", (req, res) => {
  res.redirect(301, "https://uni-sydney.zoom.us/j/6465140162?pwd=SPgSrZcRMLCdaZ4sQTokqbectxtVQ7.1");
}));

// Debug: log incoming host headers
app.use((req, res) => {
  console.log(`Unmatched request: Host=${req.headers.host} URL=${req.url}`);
  res.status(404).send("Not found");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
