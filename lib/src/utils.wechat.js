export function throttle(func, wait) {
    let previous = 0;
    let time;
    let remaining;
    const throttled = function (...args) {
        const now = +new Date();
        const context = this;
        remaining = wait - (now - previous);
        if (remaining <= 0) {
            func.apply(context, args);
            previous = now;
        }
        else {
            if (time) {
                clearTimeout(time);
            }
            time = setTimeout(() => {
                func.apply(context, args);
                time = undefined;
                previous = +new Date();
            }, remaining);
        }
    };
    throttled.cancel = () => {
        if (time) {
            clearTimeout(time);
        }
    };
    return throttled;
}
const systemInfo = wx.getSystemInfoSync();
export function transformRpxToPx(rpx) {
    return (rpx / 750) * systemInfo.windowWidth;
}
