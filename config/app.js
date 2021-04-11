const env = process.env;
const config = {
  app: {
    "frontend-port": "3001",
    port: process.env.CMS_APP_PORT,
    name: "CanteenMS",
    domain: "canteenms.net",
  },
  database: {
    mongo: {
      host: env.MONGO_HOST,
    },
  },
  email: {
    host: env.MAIL_HOST, // smtp.gmail.com
    port: env.MAIL_PORT || 1025,
  },
  auth: {
    jwt: {
      secret: env.JWT_SECRET,
      session: {
        session: false,
        expiresIn: 1,
      },
    },
  },
};

if (env.NODE_ENV === "production") {
  config.email.user = env.MAIL_USER_NAME;
  config.email.password = env.MAIL_PASSWORD;
}
module.exports = config;
