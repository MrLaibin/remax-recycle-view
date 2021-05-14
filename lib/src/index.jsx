import React from 'react';
import { View } from 'remax/one';
import { ScrollView } from './remax';
import { useVisibleRange, useSizeData, useScrollTop } from './hooks';
import { throttle } from './utils';
const DEFAULT_OVERSCAN_COUNT = 5;
const isVisible = (start, end) => (_, index) => index >= start && index <= end;
const RecycleView = props => {
    const { data = [], overscanCount = DEFAULT_OVERSCAN_COUNT, placeholderImage, renderHeader, renderBottom, headerHeight = 0, headerHeightUnit = 'px', bottomHeight = 0, renderItem, onScroll, scrollTop, scrollTopByIndex, ...scrollViewProps } = props;
    const [start, end, setRange] = useVisibleRange(overscanCount);
    const LIST_HEIGHT = React.useMemo(() => data.reduce((totalHeight, ele) => {
        return totalHeight + ele.height;
    }, 0), [data]);
    const sizeData = useSizeData(data);
    const currentScrollTop = useScrollTop({ scrollTopByIndex, scrollTop, sizeData, headerHeight });
    const visibleData = React.useMemo(() => data.filter(isVisible(start, end)), [data, start, end]);
    const handleScroll = React.useMemo(() => throttle(function (event) {
        const { scrollTop, scrollHeight } = event.detail;
        const ratio = scrollTop / scrollHeight;
        const initialOffsetTop = headerHeight;
        const totalHeight = LIST_HEIGHT + bottomHeight;
        let offset = 0;
        for (let i = 0; i < sizeData.length; i++) {
            const { offsetTop } = sizeData[i];
            const totalOffsetTop = initialOffsetTop + offsetTop;
            if (totalOffsetTop / totalHeight >= ratio) {
                offset = i;
                break;
            }
        }
        setRange(offset);
    }, 100), [headerHeight, LIST_HEIGHT, bottomHeight, sizeData]);
    React.useEffect(() => {
        return handleScroll.cancel;
    }, [handleScroll]);
    const innerBeforeHeight = (sizeData[start] && sizeData[start].offsetTop) || 0;
    return (<ScrollView {...scrollViewProps} scrollY onScroll={(e) => {
        handleScroll(e);
        onScroll && onScroll(e);
    }} scrollTop={currentScrollTop}>
      {renderHeader && (<View className="recycle-view-header" style={{ height: headerHeight + headerHeightUnit }}>
          {renderHeader()}
        </View>)}
      <View style={{
        position: 'relative',
        height: LIST_HEIGHT,
        background: placeholderImage && `url("${placeholderImage}") repeat-y`,
        backgroundSize: placeholderImage && 'contain',
    }}>
        <View style={{ position: 'absolute', left: 0, width: '100%', top: innerBeforeHeight }}>
          {visibleData.map((item, index) => (<View key={item.__index__} style={{ height: item.height }} className="recycle-view-item">
              {renderItem(item, index)}
            </View>))}
        </View>
      </View>
      {renderBottom && (<View className="recycle-view-bottom" style={{ height: bottomHeight }}>
          {renderBottom()}
        </View>)}
    </ScrollView>);
};
export default RecycleView;
