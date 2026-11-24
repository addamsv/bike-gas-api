const { authenticate } = require("@google-cloud/local-auth");
const fs = require("fs");
const path = require("path");
const os = require("os");

async function run() {
  const manifest = JSON.parse(fs.readFileSync("appsscript.json", "utf8"));
  const creds = JSON.parse(fs.readFileSync("creds.json", "utf8"));
  const info = creds.installed || creds.web;

  const base = "https://www.googleapis.com" + "/auth/";
  const names = [
    "script.deployments",
    "script.projects",
    "script.webapp.deploy",
    "drive.metadata.readonly",
    "drive.file",
    "service.management",
    "logging.read",
    "userinfo.email",
    "userinfo.profile",
    "cloud-platform"
  ];

  const claspScopes = names.map(name => base + name);
  const allScopes = Array.from(new Set([...manifest.oauthScopes, ...claspScopes]));
  console.log("REQ RIGHTS:", allScopes);

  const auth = await authenticate({
    keyfilePath: path.resolve("creds.json"),
    scopes: allScopes,
  });

  const p = path.join(os.homedir(), ".clasprc.json");
  const d = fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : {};
  d.tokens = d.tokens || {};
  d.tokens.default = {
    client_id: info.client_id,
    client_secret: info.client_secret,
    clientId: info.client_id,
    clientSecret: info.client_secret,
    type: "authorized_user",
    refresh_token: auth.credentials.refresh_token,
    access_token: auth.credentials.access_token,
  };

  fs.writeFileSync(p, JSON.stringify(d, null, 2));
  console.log("DONE");
}

run().catch(console.error);