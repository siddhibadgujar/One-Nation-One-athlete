export const registerSW = () => {
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('/src/pwa/sw.js');
};
