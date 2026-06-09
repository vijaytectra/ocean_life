module.exports = {
  apps: [
    {
      name: "olipl",
      cwd: "/home/oceanweb/htdocs/www.olipl.com",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        DATABASE_URL:
          "file:/home/oceanweb/htdocs/www.olipl.com/prisma/dev.db",
      },
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_restarts: 10,
      watch: false,
    },
  ],
};
