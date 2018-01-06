var CACHE_NAME = 'pig-game-v1';
var assets = [
  '/pig-game/',
  '/pig-game/index.html',
  '/pig-game/css/style.css',
  '/pig-game/css/ionicons.min.css',
  '/pig-game/js/app.js',
  '/pig-game/images/dice-1.png',
  '/pig-game/images/dice-2.png',
  '/pig-game/images/dice-3.png',
  '/pig-game/images/dice-4.png',
  '/pig-game/images/dice-5.png',
  '/pig-game/images/dice-6.png',
  '/pig-game/fonts/ionicons.eot',
  '/pig-game/fonts/ionicons.svg',
  '/pig-game/fonts/ionicons.ttf',
  '/pig-game/fonts/ionicons.woff',
];

//Check if browser support SW and register one

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/pig-game/sw.js')
    .then(response => {
      console.log(`SW registered whith scope:${response.scope}`);
    }).catch(e => {
      console.log('Failed to register SW:', e);
    });
}

//Install SW

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
      return cache.addAll(assets);
    })
  );
});

//Activate SW

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
    .then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== CACHE_NAME && key !== 'dynamic') {
          return caches.delete(key);
        }
      }));
    })
  );
});

//Handle SW
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        return response;
      } else {
        return fetch(event.request).then(res => {
          return caches.open('dynamic')
            .then(cache => {
              cache.put(event.request.url, res.clone());
              return res;
            })
        }).catch(e => {
          console.log('Error', e);
        })
      }
    })
  );
});