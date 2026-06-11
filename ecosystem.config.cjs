const path = require("path");

const appRoot = "/home/oceanweb/htdocs/www.olipl.com";

module.exports = {
  apps: [
    {
      name: "olipl",
      cwd: appRoot,
      script: "npm",
      args: "run start",
      interpreter: "none",
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
