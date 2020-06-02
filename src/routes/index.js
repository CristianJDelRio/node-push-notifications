const { Router } = require('express');
const webPush = require('../webpush');
const router = Router();

let pushSubscription;

router.post('/subscription', async (req, res) => {
  pushSubscription = req.body;
  res.status(200).json();
});

router.post('/new-message', async (req, res) => {
  const { message } = req.body;

  const payload = JSON.stringify({
    title: "Cristian'n Notification",
    message: message
  });

  try {
    await webPush.sendNotification(pushSubscription, payload);
    return res.status(200).json();
  } catch (e) {
    console.log('Notification Errorr:', e);
    return res.status(500).json();
  }
});

module.exports = router;
