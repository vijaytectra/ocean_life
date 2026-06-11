const path = require("path");

const appRoot = "/home/oceanweb/htdocs/www.olipl.com";

module.exports = {
  apps: [
    {
      name: "olipl",
      cwd: appRoot,
      script: path.join(appRoot, "node_modules/next/dist/bin/next"),
      args: "start -p 3000",
      interpreter: "node",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        DATABASE_URL: `file:${path.join(appRoot, "prisma/dev.db")}`,
      },
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_restarts: 10,
      watch: false,
    },
  ],
};
