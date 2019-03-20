const initialState = {
        username: "",
        password: "",
        currentUserId: "",
        photostories: [],
        title: "",
        description: "",
        caption: "",
        private: false,
        picture: [],
        formErrors: {title: "", caption: "", picture: []},
        inputPicture: [],
        titleValid: false,
        captionValid: false,
        pictureValid: false,
        formValid: false,
        errors: "",
        uploadedPhotostory: {}
  }

function appReducer (state = initialState, action) {
    switch (action.type) {
        case 'ADD_TOKEN':
            return {...state, ...action.payload}
        case 'ADD_PHOTOS':
            return {...state, photostories: [...state.photostories, action.payload.photostory]}
        case 'INPUT_CHANGE':
            return {...state, ...action.payload}
        case 'PHOTO_CHANGE':
            return {...state, inputPicture: [...state.inputPicture, action.payload.inputPicture]}
        case 'PHOTO_DISPLAY':
            return {...state, ...action.payload.newPhotoObj}
        case 'RADIO_CHANGE':
            return {...state, ...action.payload}
        case 'DELETE_PHOTO':
            return {...state, ...action.payload}
        case 'VALIDATE_FIELD':
            return {...state, ...action.payload}
        case 'UPDATE_PHOTOSTORIES':
            return {...state, uploadedPhotostory: action.payload}
        case 'ADD_PHOTOSTORY':
            return {...state, photostories: [...state.photostories, state.uploadedPhotostory]}
        case 'CLEAR_FORM':
            return {...state, ...action.payload}
        case 'DELETE_STORY':
            return {...state, ...action.payload}
        case 'ADD_ERRORS':
            return {...state, ...action.payload}
        case 'EDIT_CAPTION':
            return {...state, ...action.payload}
        case 'CLEAR_STORE':
            return {...state, ...action.payload.clearObj}
        case 'DELETE_UPLOADED':
            return {...state, uploadedPhotostory: {...state.uploadedPhotostory, ...action.payload}}
        default:
            return state
    }
}

export default appReducer;