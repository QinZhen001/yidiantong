import {getUserInfo} from '../../utils/index'
import {mapState} from 'vuex'


export const userInfoMixin = {
  mounted(){
    if (!this.userInfo.nickName) {
      this.$nextTick(()=>{
        getUserInfo()
      })
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  }
}

