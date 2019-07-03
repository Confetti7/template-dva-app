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
    const { url } = request;
    const inCache = CACHE_LIST.some(item => url.includes(item));
    console.log('request', request);

    // 不区分cors
    if (inCache && request.method === 'GET') {
        event.respondWith(
            caches.match(event.request).then((response) => {
                // 如果是联网状态 获取最新数据并缓存下来
                if (navigator.onLine) {
                    const fetchRequest = event.request.clone();

                    return fetch(fetchRequest).then((response) => {
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

                // 如果是离线状态 直接使用install cache
                if (response) {
                    return response;
                }
            }),
        );
    }
});
