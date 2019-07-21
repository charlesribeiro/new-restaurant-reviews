var staticCacheName = 'restaurants-v1';

// https://github.com/GoogleChrome/samples/tree/gh-pages/service-worker

console.log("sw");

self.addEventListener('install', function(event) {

    // debugger;

    event.waitUntil(
      caches.open(staticCacheName).then(function(cache) {
        return cache.addAll([
        'js/main.js',
        'js/dbhelper.js',
        'js/restaurant_info.js',
        'img/*',
        'index.html',
        'restaurant.html',
        'css/styles.css'


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
    
    console.log('Gerenciando fetch event de ', event.request.url);
    var requestUrl = new URL(event.request.url);
  
    if (requestUrl.origin === location.origin) {
      if (requestUrl.pathname === '/') {
        console.log("/");
        //event.respondWith(caches.match('/skeleton'));
        return;
      }
    }
  
    event.respondWith(
      caches.match(event.request).then(function(response) {
        console.log("match no cache" , event.request, response);
        return response || fetch(event.request);
      }).catch(function(error) {
        
        console.log('Error in fetch handler:', error);
        throw error;
      })
    );
  });