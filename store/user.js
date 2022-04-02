export const state = () => ({
    userObj: {
        accessToken: {
            payload: {
                username: "Loading..."
            }
        }
    }
  })
  
  export const mutations = {
    set(state, obj) {
      state.userObj = obj
    }
  }