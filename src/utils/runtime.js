/*
 * @Author: liuxu
 * @Date: 2019-03-05 9:05:37
 * @Mark: service-worker更新与卸载
 * @Mark: devServer不会生成文件，存于内存中。service worker执行需要实际的文件
 */

export default function () {
    if (NODE_ENV === 'production') {
        import(/* webpackChunkName: "offline-runtime" */ 'offline-plugin/runtime').then((OfflinePluginRuntime) => {
            OfflinePluginRuntime.install({
                onUpdating: () => {
                    console.log('SW Event:', 'onUpdating');
                },
                onUpdateReady: () => {
                    console.log('SW Event:', 'onUpdateReady');
                    // Tells to new SW to take control immediately
                    OfflinePluginRuntime.applyUpdate();
                },
                onUpdated: () => {
                    console.log('SW Event:', 'onUpdated');
                    // Reload the webpage to load into the new version
                    window.location.reload();
                },
                onUpdateFailed: () => {
                    console.log('SW Event:', 'onUpdateFailed');
                },
            });
        });
    }

    window.addEventListener(
        'message',
        (event) => {
            let { origin } = event;
            if (origin === 'http://localhost:8888') {
                'serviceWorker' in navigator
                    && navigator.serviceWorker.getRegistration().then((registration) => {
                        registration
                            && registration.unregister().then((boolean) => {
                                boolean ? alert('註銷成功') : alert('註銷失敗');
                            });
                    });
            }
        },
        false,
    );
}
