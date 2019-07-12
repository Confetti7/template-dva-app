/* 前置通知 */
export function before(beforeFn) {
    return function (target, name, descriptor) {
        const fn = descriptor.value;

        descriptor.value = function (...rest) {
            beforeFn(...rest);
            const result = fn.apply(this, rest);

            return result;
        };

        return descriptor;
    };
}

/* 后置通知 */
export function after(afterFn) {
    return function (target, name, descriptor) {
        const fn = descriptor.value;

        descriptor.value = function (...rest) {
            const result = fn.apply(this, rest);
            afterFn(...rest);

            return result;
        };

        return descriptor;
    };
}

/* 执行耗时 */
export function time(target, name, descriptor) {
    const fn = descriptor.value;

    if (typeof fn === 'function') {
        descriptor.value = function (...rest) {
            const beginTime = +new Date();
            const result = fn.apply(this, rest);
            const endTime = +new Date();
            console.log(`Time consuming: ${endTime - beginTime}ms`);

            return result;
        };
    }

    return descriptor;
}
