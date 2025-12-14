module.exports = {
  apps: [
    {
      name: "villas-backend",
      script: "server.js",
      cwd: "./backend",
      env: {
        NODE_ENV: "production",
        PORT: 3001
      }
    },
    {
      name: "villas-frontend",
      script: "npm",
      args: "start",
      cwd: "./frontend",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
};
