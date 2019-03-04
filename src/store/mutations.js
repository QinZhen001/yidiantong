import * as types from './mutation-types'

const mutations = {
  [types.SET_CUR_NAV_INDEX](state, index){
    state.curNavIndex = index
  },
  [types.SET_USER_INFO](state, userInfo){
    state.userInfo = userInfo
  },
  [types.SET_INFO](state, info){
    state.info = info
  },
  [types.SET_SHOP_LIST](state, shopList){
    state.shopList = shopList
  }
}

export default mutations
