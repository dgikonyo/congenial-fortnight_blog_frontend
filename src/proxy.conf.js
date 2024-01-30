const PROXY_CONFIG = [
  {
    context: ["/api"],
    target: process.env.TARGET_BACKEND_API,
    secure: true,
    logLevel: "debug",
  },
];

module.exports = PROXY_CONFIG;
