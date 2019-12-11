<template>
    <section class="section">
        <header>
            <button>header_A</button>
            <button>header_B</button>
        </header>
        <div @keydown="onKeyDownContainer($event)"
             @mouseleave="onMouseLeaveContainer"
             @blur="onBlurContainer"
             ref="box"
             class="box"
             tabindex="0">
            <ul class="container">
                <li v-for="item in DataList" :key="item.id"
                    @click="onClickItem(item)"
                    @mouseenter="onMouseEnterItem(item)"
                    @mouseleave="onMouseLeaveItem"
                    :class="[currentItem && currentItem.id == item.id ? 'selected' : '']"
                    class="data-item" 
                    :data-userid="item.id"
                    tabindex="-1">
                    <div class="avatar" :style="{background: item.color}" >{{item.name}}</div>
                    <div v-if="currentItem && currentItem.id == item.id" 
                         class="btns">
                        <button >{{item.text1}}</button>
                        <button >{{item.text2}}</button>
                    </div>
                </li>
            </ul>
        </div>
        <footer>
            <button>footer_A</button>
            <button>footer_B</button>
        </footer>
    </section>
</template>

<script>
import Mock from 'mockjs';

export default {
    name: 'FocusRoving',
    data() {
        return {
            DataList: [],
            currentItem: {},
        }
    },
    created() {
        for(let i = 0; i < 30; i++) {
            this.DataList.push({
                id: Mock.Random.id(),
                name: Mock.Random.cword(),
                text1: Mock.Random.cword(),
                text2: Mock.Random.cword(),
                color: Mock.Random.rgb()
            })
        }
    },
    methods: {
        // for single item
        onClickItem(item) {
            this.currentItem = item;
        },
        onMouseEnterItem(item) {
            this.currentItem = item;
        },
        onMouseLeaveItem() {
            this.currentItem = null;
        },

        // for container
        onFocusContainer(e) {

        },
        onBlurContainer(e) {
            // item, 不能够接受focus
            // container需要focus的状态
            // foucs 从 container -> item.button 时， container失去焦点，不再需要状态。
            // 当使用 Up/Down方向键，在item之间切换时，container没有focus，item.button也没有focus，
            this.currentItem = null;
            console.log(document.activeElement); // it is body
        },
        onMouseLeaveContainer() {
            this.currentItem = null;
        },
        onKeyDownContainer(e) {
            /* 如果container能够接受keydown事件，那么
            ** keydown事件是bubble的
            ** 1. 他一定是被foucs的，
            ** 2. 他的child具有focus
            */
           
           if(e.key == 'ArrowUp' || e.key == "ArrowLeft") {
               // previous item
               // 如果是第一个，要不要回滚到最后一个？？
           } else if(e.key == "ArrowDown" || e.key == 'ArrowRight') {
               // next item
               // 如果是最后一个
               if(!this.currentItem) {
                   e.preventDefault(); // 浏览器会自动滚动
                   let firstItem = this.$refs.box.querySelector(".data-item"); // querySelector 只会返回第一个
                   if(firstItem) {
                       firstItem.focus();
                   }
               }
           }
        }
    }
}
</script>

<style lang="less">
    .section {
        margin: 20px;
        background: rgb(197, 130, 194);
        header,
        footer {
            padding: 6px 0;
            button {
                margin-left: 10px;
            }
        }
    }
    .box {
        width: 400px;
        height: 400px;
        overflow: auto;
        margin: 10px auto;
        background: #fff;
    }
    .container {
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
    }
    .data-item {
        list-style: none;
        height: 40px;
        padding: 0 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        &:nth-child(2n) {
            background: lightgray;
        }
        &.selected {
            background: lightblue;
        }
        .avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: auto;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .btns {
            button {
               margin-left: 10px; 
            }
        }
    }
</style>