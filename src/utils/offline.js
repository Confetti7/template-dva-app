/*
 * @Author: liuxu
 * @Date: 2019-03-15 11:28:44
 * @Mark: service-worker异步操作
 */

/* eslint no-restricted-globals: 1 */
const CACHE_NAME = 'async-offline';
const CACHE_LIST = ['https://cnodejs.org'];

self.addEventListener('fetch', (event) => {
    const { request } = event;
    console.log('request', request);

    // 不区分cors
    if (request.method === 'GET') {
        const { url } = request;
        const inCache = CACHE_LIST.some(item => url.includes(item));

        if (inCache) {
            event.respondWith(
                caches.match(event.request).then((response) => {
                    // 如果是联网状态下 获取最新数据并缓存下来
                    if (navigator.onLine) {
                        const fetchRequest = event.request.clone();

                        return fetch(fetchRequest).then((response) => {
                            console.log('response', response);
                            // 检查是否为合法请求
                            if (!response || response.status !== 200) {
                                return response;
                            }

                            let responseToCache = response.clone();

                            return caches.keys().then((cacheList) => {
                                const lastCache = cacheList[0];
                                caches.open(lastCache || CACHE_NAME).then((cache) => {
                                    cache.put(event.request, responseToCache);
                                });
                                return response;
                            });
                        });
                    }

                    if (response) {
                        // 静态资源直接使用install cache
                        return response;
                    }
                }),
            );
        }
    }
});
