
<template>
    <div :class="$style['flat-scroll-list']" @scroll="onScroll" ref="viewport" :style="{height: listHeight + 'px'}">
        <div :class="$style['sentinel']" :style="sentinelStyle"></div>
        <div 
            v-for="(item, index) in renderList" 
            :key="item && item[item.itemKeyName] || index" 
            :style="itemStyle(item, index)" 
            :class="$style.scrollItem"
        >
            <slot :item="item"></slot>
        </div>
    </div>
</template>

<script>
/**
 * 1. 当滑动到底部的时候， 组件会像父组件发送消息，让父组件获取更多的数据 $emit('fectchMoreData')
 *    当父组件获取到数据之后，需要告诉组件，数据已经到达了 moreDataArrived()
 * 2. 如果父组件的需要更新某一个元素，他必须自己更新scrollList的内容
        scrollList.splice(index, 1, newObject)
 */
export default {
    name: "FlatScorllList",
    created() {
        // created的时候，组件的props已经初始化好了吗： 好了
    },
    props: {
        unitHeight: Number,
        listHeight: Number,
        scrollList: {
            type: Array,
            default: []
        },
        extraCounts: {
            type: Number,
            default: 10
        },
        fetchMoreData: {
            type: Function,
            default: () => {}
        },
        itemKeyName: "",
    },
    data() {
        return {
            firstIndex: 0, // 在scrollList中的下标
            lastIndex: 0, // 在scrollList中的下标 lastIndex -> [0, this.scrollList.length]
            actualLastIndex: 0, // 如过计算的lastIndex超过了当前的scrollList的长度，我们是不能显示还不存在的元素，但是我们根据这个标志去判断是是否需要请求数据
            anchorIndex: 0, // 在scrollList中的下标
            anchorOffset: 0, 
            lastScrollTop: 0,
            renderList: [], // 当前渲染的元素列表
            isRequesting: false,
        }
    },
    computed : {
        sentinelStyle() {
            // 每当renderList的长度变化的时候，就重新设置他的位置
            // 1px sentinel的高度，否则当所有的元素的高度刚好等于 父元素的高度的时候，就出现了滚动条，以为sentinel使得子元素的总高度比父元素的高度多了1px
            return { transform: `translate(0, ${this.scrollList.length * this.unitHeight - 1}px)` };
        }
    },
    watch: {
        scrollList: {
            handler: function(newV){
                // 1. length change
                // 2. reassigned a new list
                // go here
                console.log("participants: flatscroll list: watch scrollList", newV);
                this.updateRenderListRange(this.anchorIndex); // 每次长度变化的时候，lastIndex有可能需要变化 否则最开始 [], lastIndex == firstIndex == 0 =>  renderLit == [] 
                this.updateRenderList();
            },
            immediate: true
        },
        listHeight(newV) {
            this.updateRenderListRange(this.anchorIndex);
            this.updateRenderList();
        },
        anchorIndex(newV) {
            this.updateRenderListRange(newV);
            this.updateRenderList();
        }
    },
    methods: {
        onScroll(e) {
            // 重新计算显示区域的元素
            // 是否需要请求新的元素
            // 仅仅计算anchorIndex就可以了
            this.$emit('onScroll');
            let delta = this.$refs.viewport.scrollTop - this.lastScrollTop;
            let deltaCount = Math.abs(delta) / this.unitHeight;
            let threshold = this.extraCounts / 2; // 当滚动超过一定距离的时候，才去更新renderList
            if(deltaCount < threshold) return;
            this.updateAnchorIndex(delta);
            this.lastScrollTop = this.$refs.viewport.scrollTop;
        },
        itemStyle(item, index) {
            // 必须计算firstIndex然后才能计算，每个元素的位置
            let ty = (this.firstIndex + index) * this.unitHeight;
            return {
                transform: `translate(0, ${ty}px)`
            }
        },
        updateAnchorIndex(delta) {
            if(delta == 0) return;
            let index = this.anchorIndex;
            delta = delta + this.anchorOffset;
            if(delta < 0) {
                // 下滚动
                while(delta < 0) {
                    delta += this.unitHeight;
                    index--;
                }
            } else if(delta > 0) {
                // 上滚动
                while(delta > 0 && delta >= this.unitHeight) {
                    delta -= this.unitHeight;
                    index++;
                }
            }
            this.anchorIndex = index;
            this.anchorOffset = delta;
        },
        updateRenderListRange(anchorIndex) {
            // anchorIndex -> viewportHeigt -> (firstIndex, endIndex)
            console.log("participants: flatscrollList: update render list range:", this.scrollList);
            let viewCount = Math.ceil(this.listHeight / this.unitHeight);
            let first = this.anchorIndex - this.extraCounts;
            let last = this.anchorIndex + viewCount + this.extraCounts;
            this.firstIndex = Math.max(first, 0);
            this.lastIndex = Math.min(last, this.scrollList.length);
            this.actualLastIndex = last;
        },
        updateRenderList() {
            // (firstIndex, endIndex) -> renderList
            let result = [];
            for(let i = this.firstIndex; i < this.lastIndex; i++) {
                result.push(this.scrollList[i]);
            }
            this.renderList = result;
            this.maybeNeedRequest();
        },
        maybeNeedRequest() {
            if(this.isRequesting) return;
            this.isRequesting = true;
            let count = this.actualLastIndex - this.scrollList.length;
            if(count > 0) {
                this.$emit('fetchMoreData', count); // 由父组件提供的函数
            }
        },
        moreDataArrived() {
            this.isRequesting = false;
        },
    }
}
</script>

<style lang="less" module>
    .flat-scroll-list {
        position: relative;
        height: 100%;
        width: 100%;
        overflow: auto;
    }
    .scrollItem {
        position: absolute;
        width: 100%;
        transform: translate(0, 0);
    }
    .sentinel {
        position: absolute;
        width: 1px;
        height: 1px;
        transform: translate(0, 0);
        opacity: 0;
    }
</style>