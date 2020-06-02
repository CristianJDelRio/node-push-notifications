const webPush = require('web-push');

const {
  PUBLIC_VAPID_KEY: pulicVapidKey,
  PRIVATE_VAPID_KEY: privateVapidKey
} = process.env;

webPush.setVapidDetails(
  'mailto:test@cristianjdelrio.com',
  pulicVapidKey,
  privateVapidKey
);

module.exports = webPush;
