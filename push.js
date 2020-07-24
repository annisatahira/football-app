var webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BCxfXu36HUBrYnAINtyNOeqFWHF_F1-bW327bPNzQDdVyI8p_EdxJjy7dRVsH-ucA9hPyrQpaKbxiRpg0OrsLwo",
  privateKey: "-dV7nNAj4Fb1gujTlGtF3gHmizUaukbYm9bhHYC_fOk",
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
var pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/cWX7foBWYDc:APA91bEedRIqfh8f4cMu9FAUWs-J0YKgkYXXqV9gKID0X1UexYnmJtb4Kr8JZiPH9I9KrmFb3e0wnRru_eUIHzQhctRQhM6dCF88_MJE15aPME5oqDvtgqiv_jhTWIlHWvGeqNR_dvoO",
  keys: {
    p256dh:
      "BK1XdnIT5S5mwH+W6R8PnSh8/sSCO905nYjF0CYo9Fo6cH+WROlAg1Jn/G/S8bclpqMwSbDCLdhDTmsM3X83ucQ=",
    auth: "JSQQ6IOM4at8kT8wUG7efg==",
  },
};
var payload = "Update! Final Score of Premier League";

var options = {
  gcmAPIKey: "503098371122",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
