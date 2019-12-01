<template>
<div class="home">
    <FlatScrollList
        :unit-height="itemHeight"
        :list-height="itemListHeight"
        :extra-counts="1"
        :scrollList="itemList"
        :itemKeyName="'id'"
        @fetchMoreData="fetchMoreData"
        @onScroll="onScroll"
        ref="flatScrollList"
        :class="$style['waiting-list-list']"
    >
        <template v-slot:default="{item}">
            <div :class="$style.item">
                {{item.name}}
            </div>
        </template>
    </FlatScrollList>
</div>
</template>

<script>
// @ is an alias to /src
import FlatScrollList from '@/components/FlatScrollList.vue'

export default {
  name: 'home',
  components: {
    FlatScrollList,
  },
  created() {

  },
  mounted() {
      let tempList = [];
      let count = 0;
      let threshold = 30;
      while(count < threshold) {
          tempList.push({
              name: `_-${count}-_`,
              id: count,
          }); 
          count += 1;
      };
      this.itemList = tempList;
  },
  props: {

  },
  data() {
      return {
          itemHeight: 40,
          itemListHeight: 120,
          extraCount: 5,
          itemList: [],
          itemKeyName: 'id',
      };
  },
  methods: {
      onScroll() {

      },
      fetchMoreData() {
          console.log("request more items data");
      }
  }
}
</script>

<style lang="less" module>
    .waiting-list-list {
        height: 500px;
        width: 100%;
        background: pink;
    }
    .item {
        height: 40px;
        width: 100%;
        box-sizing: border-box;
        border: solid 1px blue;
    }
</style>
