console.log('Service Worker!');

self.addEventListener('push', event => {
  const notificationData = event.data.json();
  const { title, message } = notificationData;

  self.registration.showNotification(title, {
    body: message,
    icon:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Archlinux-icon-crystal-64.svg/1024px-Archlinux-icon-crystal-64.svg.png'
  });
});
