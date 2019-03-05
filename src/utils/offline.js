NODE_ENV === 'production'
    && import('offline-plugin/runtime').then((OfflinePluginRuntime) => {
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

// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.getRegistration().then((registration) => {
//         registration
//             && registration.unregister().then((boolean) => {
//                 boolean ? alert('註銷成功') : alert('註銷失敗');
//             });
//     });
// }
