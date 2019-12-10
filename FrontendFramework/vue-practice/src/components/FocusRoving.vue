<template>
    <div class="box" tabindex=-1>
        <ul class="container">
            <li class="data-item" v-for="item in DataList" :key="item.id" 
                :style="{background: item.color}" 
                tabindex=0>
                <button tabindex=-1>{{item.text1}}</button>
                <button tabindex=-1>{{item.text2}}</button>
            </li>
        </ul>
    </div>
</template>

<script>
import Mock from 'mockjs';

export default {
    name: 'FocusRoving',
    data() {
        return {
            DataList: []
        }
    },
    created() {
        for(let i = 0; i < 30; i++) {
            this.DataList.push({
                id: i,
                text1: Mock.Random.cword(),
                text2: Mock.Random.cword(),
                color: Mock.Random.rgb()
            })
        }
    }
}
</script>

<style lang="less">
    .box {
        width: 400px;
        height: 400px;
        background: pink;
        overflow: auto;
        margin: 40px auto;
    }
    .container {
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
    }
    .data-item {
        list-style: none;
        height: 25px;
        // &:nth-child(2n) {
        //     background: cyan;
        // }
        // &:nth-child(2n+1) {
        //     background: lime;
        // }
    }
</style>