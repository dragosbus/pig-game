var CACHE_NAME = 'pig-game-v1';
var assets = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
  '/images/dice-1.png',
  '/images/dice-2.png',
  '/images/dice-3.png',
  '/images/dice-4.png',
  '/images/dice-5.png',
  '/images/dice-6.png',
  'https://fonts.googleapis.com/css?family=Lato:100,300,600',
  'http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css'
];

//Check if browser support SW and register one

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
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