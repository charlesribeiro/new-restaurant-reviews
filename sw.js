var staticCacheName = 'restaurants-v1';

// https://github.com/GoogleChrome/samples/tree/gh-pages/service-worker

console.log("sw");

self.addEventListener('install', function(event) {

    // debugger;

    event.waitUntil(
      caches.open(staticCacheName).then(function(cache) {
        return cache.addAll([
        './js/main.js',
        './js/dbhelper.js',
        './js/restaurant_info.js',
        './img/1.jpg',
        './img/2.jpg',
        './img/3.jpg',
        './img/4.jpg',
        './img/5.jpg',
        './img/6.jpg',
        './img/7.jpg',
        './img/8.jpg',
        './img/9.jpg',
        './img/10.jpg',
        './index.html',
        './restaurant.html',
        './css/styles.css'
        ]);
      })
    );
  });

  self.addEventListener('activate', function(event) {

    // debugger;
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName) {
            return cacheName.startsWith('restaurants-') &&
                   cacheName != staticCacheName;
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      })
    );
  });


  
self.addEventListener('fetch', function(event) {

  // Fonte: https://developers.google.com/web/fundamentals/primers/service-workers/?hl=pt-br

    console.log('Gerenciando fetch event de ', event.request.url);
  
    event.respondWith(
      caches.match(event.request).then(function(response) {

        console.log("match no cache" , event.request, response);

        if (response) {
          return response;
        }
        return fetch(event.request);

      
      }).catch(function(error) {
        
        console.log('Error in fetch handler:', error);
        throw error;
      })
    );
  });