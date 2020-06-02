const publicVapidKey =
  'BJbWN-1btP8ICaVYtNdF6u3ajTkIVpIsKGraN96exSxGQIJ8z4LU0Y4w8KhH-2f-WCMIHIxMk5t-el0ySA4nQQI';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const subscription = async () => {
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/'
  });

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });

  await fetch('/subscription', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: { 'Content-Type': 'application/json' }
  });

  console.log('subscribed!');
};

const form = document.querySelector('form');

form.addEventListener('submit', async event => {
  event.preventDefault();

  const message = document.querySelector('input').value;
  await fetch('/new-message', {
    method: 'POST',
    body: JSON.stringify({ message }),
    headers: { 'Content-Type': 'application/json' }
  });
});

subscription();
