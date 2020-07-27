const webPush = require("web-push");

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
const pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/cneaEan56bA:APA91bFdcXmQxB4GRBZPwkP4R21gFwXabIB-lhN28Bi_FPZwK8zSg1R3NhNmUMEZOpN76xk-3Zdo-mGIFRNDf1jGSM1VIwd7V1k_vlhe0HY2BLFLEHlGJucSdIpCImo1THOBEnsa8dTj",
  keys: {
    p256dh:
      "BLxzUsHFKyifDG28e0DO4q2g58EgooseykNpM2YzwPCnzG62fgECvWYJ2iIJs/+BcJI9xBOJBIUCg4EBB6ue0ec=",
    auth: "mNt1mxzq2890/wgyggY3mQ==",
  },
};
const payload = "Update! Final Score of Premier League";

const options = {
  gcmAPIKey: "503098371122",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
