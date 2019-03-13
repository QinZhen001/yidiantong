//首页导航相关
export const navItems = [
  {
    text: "快递", //item上的文字
    imgUrl: '/static/img/express.png', //item上图片的url
    pageUrl: "/pages/express/main" //跳转页面的url
  },
  {
    text: "宽带",
    imgUrl: '/static/img/broadband.png'
  },
  {
    text: "学车",
    imgUrl: '/static/img/car.png',
    pageUrl: "/pages/car/main"
  },
  {
    text: "订水",
    imgUrl: '/static/img/water.png',
    pageUrl: "/pages/water/main"
  },
  {
    text: "信息",
    imgUrl: '/static/img/download.png',
    pageUrl: "/pages/showInfo/main"
  },
  {
    text: "商品",
    imgUrl: '/static/img/show.png',
    pageUrl: "/pages/dress/main"
  },
]

//客服的电话
export const phoneNum = "18026160168"

//要显示店铺位置的经纬度
export const shopPosition = [22.595355, 113.085880]

//卡片分享的信息
export const shareInfo = {
  title: '全邑大最好用的小程序，赶快戳进来看看吧',
  path: 'pages/home/main'
}

export const appName = "邑大圈子"


export const productList = [{
  "imgUrl": "/static/img/product/product_1.jpg",
  "title": "马克华菲卫衣",
  "price": 318,
  "stock": 200
}, {
  "imgUrl": "/static/img/product/product_2.jpg",
  "title": "男时尚潮流韩版双肩包",
  "price": 159,
  "stock": 17
}, {
  "imgUrl": "/static/img/product/product_3.jpg",
  "title": "回力帆布鞋",
  "price": 69,
  "stock": 33
}, {
  "imgUrl": "/static/img/product/product_4.jpg",
  "title": "静音创意简约学生电子闹钟",
  "price": 37,
  "stock": 22
}, {
  "imgUrl": "/static/img/product/product_5.jpg",
  "title": "pilot日本百乐可擦笔",
  "price": 36,
  "stock": 79
}, {
  "imgUrl": "/static/img/product/product_6.jpg",
  "title": "简约现代防水自贴壁纸",
  "price": 14,
  "stock": 91
}, {
  "imgUrl": "/static/img/product/product_7.jpg",
  "title": "台式家用电脑桌",
  "price": 197,
  "stock": 22
}, {
  "imgUrl": "/static/img/product/product_8.jpg",
  "title": "美的可充电式LED台灯",
  "price": 109,
  "stock": 84
},
  {
    "imgUrl": "/static/img/product/product_9.jpg",
    "title": "我与世界只差一个你",
    "price": 18,
    "stock": 97
  }
]


export const discountList = [
  {
    "imgUrl": "/static/img/product/product_5.jpg",
    "title": "pilot日本百乐可擦笔",
    "discount": 39,
    "price": 36,
    "stock": 79
  }, {
    "imgUrl": "/static/img/product/product_6.jpg",
    "title": "简约现代防水自贴壁纸",
    "discount": 16,
    "price": 14,
    "stock": 91
  }, {
    "imgUrl": "/static/img/product/product_7.jpg",
    "title": "台式家用电脑桌",
    "discount": 202,
    "price": 197,
    "stock": 22
  }, {
    "imgUrl": "/static/img/product/product_8.jpg",
    "title": "美的可充电式LED台灯",
    "discount": 199,
    "price": 109,
    "stock": 84
  },
  {
    "imgUrl": "/static/img/product/product_9.jpg",
    "title": "我与世界只差一个你",
    "discount": 29,
    "price": 18,
    "stock": 97
  }
]


export const waterList = [
  {
    "title": "A套餐",
    "chose": false,
    "description": " 20送18",
    "averagePrice": 10,
    "totalPrice": 616
  }, {
    "title": "B套餐",
    "chose": false,
    "description": " 21送11",
    "averagePrice": 11,
    "totalPrice": 373
  }, {
    "title": "C套餐",
    "chose": false,
    "description": " 25送16",
    "averagePrice": 14,
    "totalPrice": 528
  }, {
    "title": "D套餐",
    "chose": false,
    "description": " 23送13",
    "averagePrice": 16,
    "totalPrice": 367
  }
]

export const protocolDec = `特别声明：本公司依据快件的重量（而非价值）收取基本运费，赔偿标准是按照是否保价原则为基础。依公平原则，本公司对单票快件的保价价值限定为3万元人民币。否则，寄件人需拆分至单票3万元以下分别寄件，并进行保价；如因所寄递的快件性质无法拆分，请寄件人采取其他运输方式以保障安全。`

export const protocolText =
  `1、快递详单是本协议的组成部分。本协议自寄件人将快件交付给快递服务组织揽件人员并签字或盖章后成立。
2、本协议项下快递服务组织是指取得“圆通”商标使用权，并具备圆通网络经营权的快递营业机构。
3、快递服务组织依法收寄快件，对信件以外的快件按照国家有关规定应当场验视，对禁寄物品和拒绝验视的物品不予收寄。向寄件人提供自寄件之日起，一年的查询服务。
4、寄件人要准确填写寄件信息，不得交寄有爆炸性、易燃性、腐蚀性、放射性、毒性的危险品、麻醉药品、生化制品、现金以及国家法律、法规禁止寄递的物品。不得隐瞒交寄快件的内件状况，配合快递服务组织验视快件。需要的情况下寄件人应当依照国家规定出示相关部门的安全证明和有效证件。如快件内物品属于禁寄物品，快递服务组织有权根据相关法律法规规定处理。寄件人匿报、隐蔽交寄禁寄和航空限寄物品导致快件服务组织或第三人人身或财产伤害的，寄件人应当向快件服务组织或第三人承担赔偿责任。
5、快件服务组织在服务过程中造成快件短少、毁损、灭失的，应当承担赔偿责任。寄件人违规交寄或填单有误，造成快件延误、无法送达、无法退还，或因封装不善造成快件延误、毁损、灭失的，由寄件人承担责任。快件服务组织有偿代为封装的，承担因封装不善造成的延误、毁损、灭失的责任。
6、如地址不正确、联系方式错误、收件人拒收等原因而造成无法派送的快件，若寄件人要求退回的，双程费用均由寄件人承担。
7、为保证快件安全送达，寄件人办理寄件时须如实申报快件内容和价值，并准确、清楚的填写寄件人、收件人的名称、地址和联系电话等资料。
8、寄件人可以与快递服务组织约定送达时间，没有约定的按照《快递服务》国家标准GB/T27917的规定。快递服务组织将快件送达收件人地址，经收件人或收件人（寄件人）允许的代收人签字，视为送达。若无收件人姓名，仅有收货单位地址，，则由单位收件人员签字，或盖单位收发章，视为送达。
9、赔偿标准：是否保价由寄件人自愿选择，贵重物品建议选择保价，保价费最低为1元。
(1)、未保价的快件，丢失、毁坏、损少，物品最高赔偿不超过300元/票，文最高不超过100元/票，另有约定的按照约定办理；
(2)、文件按100元/票赔偿，如核销单、提单等重要文件按（3）、（4）规定保价和付费赔偿；
(3)、单票价值在2000元（含）以内的，保价费为保价金额的0.1%，如快件丢失、损毁、减少的，按保价赔偿，最高不超过2000元；
(4)、寄件人确认交寄的快件单价不超过叁万元人民币。价值在2000元以上的，保价费为保价金额的1%，如快件丢失、损坏、短少的，按照实际价值赔偿，最高不超过快件的保价金额；
10、本协议所称快件的“价值”，是指快件本身物理性质所具备的的价；所谓“损失”，不包括其可能获得的收益、利润、实际用途、商业机会、商业价值等任何直接或间接损失。`
