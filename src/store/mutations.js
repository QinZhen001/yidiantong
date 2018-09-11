import * as types from './mutation-types'

const mutations = {
  [types.SET_CUR_NAV_INDEX](state, index){
    state.curNavIndex = index
  }
}

export default mutations
