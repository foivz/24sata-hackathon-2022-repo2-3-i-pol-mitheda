export const state = () => ({
    userObj: {
        accessToken: {
            payload: {
                username: "Loading..."
            }
        }
    },
    token: ""
  })
  
  export const mutations = {
    set(state, obj) {
        state.userObj = obj
    },
    setToken(state, token) {
        state.token = token
    }
  }