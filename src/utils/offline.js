/*
 * @Author: liuxu
 * @Date: 2019-03-15 11:28:44
 * @Mark: service-worker异步操作
 */

/* eslint no-restricted-globals: 1 */
const CACHE_NAME = 'async-offline';
const CACHE_LIST = ['cnodejs.org'];

self.addEventListener('fetch', function (event) {
    console.log('request', event.request);
    event.respondWith(
        caches.match(event.request).then(function (response) {
            const { url } = event.request;
            let isAsync = false;

            for (let i = 0; i < CACHE_LIST.length; i++) {
                if (url.includes(CACHE_LIST[i])) {
                    isAsync = true;
                    break;
                }
            }

            // 如果是联网状态下 获取最新数据并缓存下来
            if (navigator.onLine) {
                if (isAsync) {
                    const fetchRequest = event.request.clone();

                    return fetch(fetchRequest).then(function (response) {
                        // Check if we received a valid response
                        if (!response || response.status !== 200) {
                            return response;
                        }

                        let responseToCache = response.clone();

                        caches.open(CACHE_NAME).then(function (cache) {
                            cache.put(event.request, responseToCache);
                        });

                        return response;
                    });
                }
            }

            if (response) {
                // 静态资源直接使用install cache
                return response;
            }
        }),
    );
});
