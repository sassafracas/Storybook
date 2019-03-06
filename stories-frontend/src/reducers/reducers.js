const initialState = {
    username: "",
    password: "",
    currentUserId: "",
    photostories: [],
    errors: "",
    forceRefresh: false,
  }

function appReducer (state = initialState, action) {
    switch (action.type) {
        case 'ADD_TOKEN':
            return {...state, currentUserId: action.payload.currentUserId, username: action.payload.username}
        case 'ADD_PHOTOS':
            return {...state, photostories: [...state.photostories, action.payload.photostory]}
        default:
            return state
    }
}

export default appReducer;