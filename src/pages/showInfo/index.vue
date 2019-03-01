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
    <divider></divider>
    <div class="body-item"
         @click.stop="goToDetailInfo(index)"
         v-for="(item,index) in infoBodyItems"
         :key="index">
      <div class="item-content">
        <div class="lt-content">
          <image :src="item.avatarUrl"></image>
          <div class="nick-name">{{item.nickName}}</div>
        </div>
        <div class="lb-content">
          <div class="custom-tag"
               v-for="(tag,index2) in item.customTag"
               :key="index2">
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
      <divider></divider>
    </div>
    <div class="add-wrapper" @click.stop="goToReleaseInfo">
      <image src="/static/img/add_white.png"></image>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Divider from '../../components/divider.vue'
  import {formatTime} from '../../utils/index'
  import {mapMutations} from 'vuex'

  const db = wx.cloud.database()
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
          }
        ],
        curPage: 1, //当前页数
        curType: '全部'
      }
    },
    mounted(){
      this.getAllInfo()
    },
    onReachBottom(){
      console.log('onReachBottom', '上拉')
      this.curType === '全部' ? this.getAllInfo() : this.getInfo()
    },
    methods: {
      clickHeaderItem(index){
        this.infoHeaderItems.forEach((item, i) => {
          item.active = (index === i )
        })
        if (this.curType !== this.infoHeaderItems[index].name) {
          this.curType = this.infoHeaderItems[index].name
          this.curPage = 1
          this.curType === '全部' ? this.getAllInfo() : this.getInfo()
        }
      },
      getAllInfo(){
        db.collection('info')
          .skip(10 * (this.curPage - 1))
          .limit(10)
          .get()
          .then(res => {
            this.curPage++
            this.showInfo(res.data)
          })
      },
      getInfo(){
        db.collection('info')
          .where({type: this.curType})
          .skip(10 * (this.curPage - 1))
          .limit(10)
          .get()
          .then(res => {
            this.curPage++
            this.showInfo(res.data)
          })
      },
      showInfo(data){
        console.log(data)
        this.infoBodyItems = this.infoBodyItems.concat(data.map(item => ({
          avatarUrl: item.avatarUrl,
          nickName: item.nickName,
          tag: item.type,
          customTag: item.customTag,
          title: item.title,
          description: item.description,
          weChat: item.weChat,
          imgUrls: item.imgUrls,
          time: formatTime(item.time)
        })))
      },
      goToReleaseInfo(){
        wx.navigateTo({
          url: '/pages/releaseInfo/main'
        })
      },
      goToDetailInfo(index){
        this.setInfo(this.infoBodyItems[index])
        wx.navigateTo({
          url: '/pages/infodetail/main'
        })
      },
      ...mapMutations({
        setInfo: 'SET_INFO'
      })
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
      position: fixed;
      right: 20px;
      bottom: 80px;
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
