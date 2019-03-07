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
            return {...state, ...action.payload}
        case 'PHOTO_DISPLAY':
        console.log("photo dis", action.payload)
            return {...state, ...action.payload}
        case 'RADIO_CHANGE':
            return {...state, ...action.payload}
        case 'PHOTO_DELETE':
            return {...state, ...action.payload}
        case 'VALIDATE_FIELD':
        console.log(action.payload)
            return {...state, ...action.payload.errorsObj}
        case 'VALIDATE_FORM':
        console.log(action.payload.formValidObj)
            return {...state, ...action.payload.formValidObj}
        default:
            return state
    }
}

export default appReducer;