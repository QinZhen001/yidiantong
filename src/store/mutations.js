import * as types from './mutation-types'

const mutations = {
  [types.SET_CUR_NAV_INDEX](state, index){
    state.curNavIndex = index
  },
  [types.SET_USER_INFO](state, userInfo){
    state.userInfo = userInfo
  }
}

export default mutations
