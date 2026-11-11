
import "dotenv/config";
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [Sentry.expressIntegration()],
  environment: process.env.NODE_ENV || "development",
});
