import { Item } from './index';
/**
 * set visible range for recycle-view
 * @param overscanCount the overscan count above or below offset
 */
export declare function useVisibleRange(overscanCount: number): [number, number, (offset: number) => void];
/**
 * get size map array include height and offsetTop, in addition it will add __index__ to data
 * @param data raw data to get size map array
 */
export declare function useSizeData(data: Item[]): {
    height: number;
    offsetTop: number;
}[];
/**
 * set scroll top according to scrollTopByIndex prop (prior to scrollTop prop)
 */
export declare function useScrollTop({ scrollTopByIndex, sizeData, scrollTop, headerHeight, }: {
    scrollTopByIndex?: number;
    sizeData: ReturnType<typeof useSizeData>;
    headerHeight: number;
    scrollTop?: number;
}): number | undefined;
