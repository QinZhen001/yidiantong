<template>
  <div class="info-page">
    <div class="info-header">
      <div
        class="header-item"
        v-for="(item,index) in infoHeaderItems"
        :key="index"
        @click="clickHeaderItem(index)">
        <div class="item-bg" :class="{active:item.active}" :style="{backgroundColor:item.color}">
        </div>
        <span class="item-name" :class="{active:item.active}">{{item.name}}</span>
      </div>
    </div>
    <div class="body-item"
         v-for="(item,index) in infoBodyItems"
         :key="index">
      <divider></divider>
      <div class="item-content">
        <div class="lt-content">
          <image :src="item.avatarUrl"></image>
          <div class="nick-name">{{item.nickName}}</div>
        </div>
        <div class="lb-content">
          <div class="custom-tag" v-for="(tag,index2) in item.customTag">
            {{tag}}
          </div>
        </div>
        <div class="center-content">
          {{item.title}}
        </div>
        <div class="rt-content">
          {{item.time}}
        </div>
        <div class="rb-content">
          {{item.tag}}
        </div>
      </div>
    </div>
    <div class="add-wrapper">
      <image src="/static/img/add_white.png"></image>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Divider from '../../components/divider.vue'

  export default{
    data(){
      return {
        infoHeaderItems: [
          {name: '全部', color: '#689F38', active: true},
          {name: '家教', color: '#F57C00', active: false},
          {name: '实习', color: '#2196F3', active: false},
          {name: '兼职', color: '#F44336', active: false},
          {name: '交易', color: '#673AB7', active: false},
          {name: '其他', color: '#3F51B5', active: false},
        ],
        infoBodyItems: [
          {
            avatarUrl: '/static/img/avatar.png',
            nickName: 'aaa',
            tag: '全部',
            customTag: ['受到', '是的'],
            title: '按时发了士大夫v',
            time: '2019/02/25 21:15:01'
          },
          {
            avatarUrl: '/static/img/avatar.png',
            nickName: 'aa啊大大a',
            tag: '全部',
            customTag: ['受到', '是的'],
            title: '阿三地方了速度更快速度来个是的风口浪尖士大夫金龙卡',
            time: '2019/02/25 21:15:01'
          },
          {
            avatarUrl: '/static/img/avatar.png',
            nickName: 'aaa',
            tag: '全部',
            customTag: ['受到', '是的'],
            title: '按时发了士大夫v',
            time: '2019/02/25 21:15:01'
          },
          {
            avatarUrl: '/static/img/avatar.png',
            nickName: 'aaa',
            tag: '全部',
            customTag: ['受到', '是的'],
            title: '按时发了士大夫v',
            time: '2019/02/25 21:15:01'
          }
        ]
      }
    },
    methods: {
      clickHeaderItem(index){
        this.infoHeaderItems.forEach((item, i) => {
          item.active = (index === i )
        })
      }
    },
    components: {
      Divider
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import "../../common/less/variable";

  .info-page {
    width: 100%;
    height: 100vh;
    background-color: @color-bg;
    .info-header {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 60px;
      background-color: white;
      .header-item {
        position: relative;
        flex: 1 1 auto;
        height: 100%;
        display: inline-block;
        .item-bg, .item-name {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .item-bg {
          &.active {
            width: 48px;
            height: 48px;
          }
          width: 44px;
          height: 44px;
          border-radius: 50%;
        }
        .item-name {
          &.active {
            font-size: @font-size-medium;
          }
          font-size: @font-size-small;
          color: white;
        }
      }
    }
    .body-item {
      .item-content {
        position: relative;
        width: 100%;
        height: 90px;
        .lt-content {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          left: 6px;
          top: 2px;
          height: 30px;
          image {
            flex: 0 0 26px;
            width: 26px;
            height: 26px;
            border-radius: 50%;
          }
          .nick-name {
            margin-left: 4px;
            flex: 1 1 auto;
            display: inline-block;
            height: 30px;
            line-height: 30px;
            font-size: @font-size-medium;
          }
        }
        .lb-content {
          position: absolute;
          left: 6px;
          bottom: 6px;
          .custom-tag {
            &:not(:first-child) {
              margin-left: 8px;
            }
            padding: 0 4px;
            display: inline-block;
            font-size: @font-size-small;
            background-color: #CDDC39;
            color: #8BC34A;
            border-radius: 8px 8px;
          }
        }
        .center-content {
          position: absolute;
          left: 50%;
          top: 50%;
          display: inline-block;
          transform: translate(-50%, -50%);
          font-size: @font-size-medium;
        }
        .rt-content {
          position: absolute;
          right: 8px;
          top: 2px;
          font-size: @font-size-small;
          color: @color-bg-red;
        }
        .rb-content {
          padding: 0 4px;
          position: absolute;
          right: 8px;
          bottom: 6px;
          font-size: @font-size-medium;
          background-color: #FFEB3B;
          color: @color-bg-red;
          border-radius: 8px 8px;
        }
      }
    }
    .add-wrapper {
      position: absolute;
      right: 20px;
      bottom: 100px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: @color-bg-red;
      box-shadow: 4px 4px 3px #ddd;
      image {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        height: 80%;
        border-radius: 50%;
      }
    }
  }
</style>
