## Vuex配合localStorage数据持久化

mutation的方法更新state里面的数据，顺便更新localStorage。

这样在强制刷新页面后，先从localStorage中读取数据，存到Vuex。

localStorage的读取性能没Vuex好，因为localStorage是读磁盘，Vuex是读内存。







```js
const state = {
  userinfo: {
    addressArray: JSON.parse(localStorage.getItem('userinfo'))?.addressArray || [],
    chinaAreaData: JSON.parse(localStorage.getItem('userinfo'))?.chinaAreaData || []
  }
}

const getters = {
  userinfo: (state) => (state.userinfo)
}

const mutations = {
  GET_USERINFO: (state) => (state.userinfo),

  SET_USERINFO: (state, payload) => {
    state.userinfo =
      payload && localStorage.setItem('userinfo', JSON.stringify(payload))
  }
}

const actions = {
  getUserInfo({ commit }) {
    const userinfo = commit('GET_USERINFO')
    return userinfo
  },
  setUserInfo({ commit }, payload) {
    commit('SET_USERINFO', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
```

