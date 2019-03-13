const state = {
  curNavIndex: 0, //当前头部导航索引
  //用户信息
  userInfo: {
    avatarUrl: '/static/img/avatar.png',  //头像地址
    nickName: '' //昵称
  },
  info: {}, //发布的信息
  shopList: []
}


export default state


// shopList里的对象
// {
//   title: "斯展叫家",
//   price: 258,
//   num: 1,
// }
