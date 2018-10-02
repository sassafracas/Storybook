const defaultState = {
  username: "",
  password: "",
  currentUserId: "",
  photostories: [],
  errors: "",
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
  formValid: false
}

function reducer(state=defaultState, action) {
  switch(action.type) {
    default:
      return state
  }
}

export default reducer
