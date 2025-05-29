/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = `audio-cache-v${Date.now()}`;
const AUDIO_EXTENSIONS = [".mp3", ".wav", ".ogg"];

self.addEventListener("install", (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(() => {
      console.log(`Opened cache ${CACHE_NAME}`);
    })
  );
});

self.addEventListener("fetch", (event: FetchEvent) => {
  const isAudioRequest = AUDIO_EXTENSIONS.some((ext) =>
    event.request.url.includes(ext)
  );

  if (isAudioRequest) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        // Возвращаем кэшированный ответ или загружаем новый
        return (
          cachedResponse ||
          fetch(event.request)
            .then((fetchResponse) => {
              // Клонируем ответ для кэширования
              return caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, fetchResponse.clone());
                return fetchResponse;
              });
            })
            .catch((error) => {
              console.error("Fetch error:", error);
              // Обработка ошибок загрузки
              return new Response(null, { status: 404 });
            })
        );
      })
    );
  }
});

// Очистка старых кэшей
self.addEventListener("activate", (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
