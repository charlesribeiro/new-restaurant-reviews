var staticCacheName = 'restaurants-v1';


console.log("sw");

self.addEventListener('install', function(event) {

    debugger;

    event.waitUntil(
      caches.open(staticCacheName).then(function(cache) {
        return cache.addAll([
        'js/main.js',
        'js/dbhelper.js',
        'js/restaurant_info.js',
        'img/1.jpg',
        'img/2.jpg',
        'img/3.jpg',
        'img/4.jpg',
        'img/5.jpg',
        'img/6.jpg',
        'img/7.jpg',
        'img/8.jpg',
        'img/9.jpg',
        'img/10.jpg',

        ]);
      })
    );
  });

  self.addEventListener('activate', function(event) {

    debugger;
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
    var requestUrl = new URL(event.request.url);
  
    if (requestUrl.origin === location.origin) {
      if (requestUrl.pathname === '/') {
        //event.respondWith(caches.match('/skeleton'));
        return;
      }
    }
  
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });