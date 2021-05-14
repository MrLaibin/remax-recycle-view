import React from 'react';
import { ScrollViewProps } from './remax';
export declare type Item = {
    height: number;
    [key: string]: any;
};
interface IRecycleProps {
    data?: Item[];
    scrollTopByIndex?: number;
    overscanCount?: number;
    placeholderImage?: string;
    headerHeight?: number;
    headerHeightUnit?: string;
    bottomHeight?: number;
    renderHeader?: () => React.ReactElement;
    renderBottom?: () => React.ReactElement;
    renderItem: (item: Item, index: number) => React.ReactElement;
}
declare const RecycleView: React.ComponentType<IRecycleProps & ScrollViewProps>;
export default RecycleView;
