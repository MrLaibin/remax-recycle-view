import React from 'react';
import { transformRpxToPx } from './utils';
/**
 * set visible range for recycle-view
 * @param overscanCount the overscan count above or below offset
 */
export function useVisibleRange(overscanCount) {
    const [start, setStart] = React.useState(0 - overscanCount);
    const [end, setEnd] = React.useState(0 + 2 * overscanCount);
    const setRange = React.useCallback((offset) => {
        setStart(offset - overscanCount);
        setEnd(offset + 2 * overscanCount);
    }, [setStart, setEnd]);
    return [start, end, setRange];
}
/**
 * get size map array include height and offsetTop, in addition it will add __index__ to data
 * @param data raw data to get size map array
 */
export function useSizeData(data) {
    return React.useMemo(() => {
        let offsetTop = 0;
        return data.map(({ height }, index) => {
            offsetTop += height;
            data[index].__index__ = index;
            return {
                height,
                offsetTop: offsetTop - height,
            };
        });
    }, [data]);
}
/**
 * set scroll top according to scrollTopByIndex prop (prior to scrollTop prop)
 */
export function useScrollTop({ scrollTopByIndex, sizeData, scrollTop, headerHeight, }) {
    return React.useMemo(() => {
        if (scrollTopByIndex !== undefined) {
            scrollTop = transformRpxToPx(sizeData[scrollTopByIndex].offsetTop + headerHeight);
        }
        return scrollTop;
    }, [scrollTopByIndex, sizeData, scrollTop, headerHeight]);
}
