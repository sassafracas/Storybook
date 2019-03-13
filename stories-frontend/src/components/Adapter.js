let local = "https://stories-backend.herokuapp.com"

class Adapter {
  
  static isLoggedIn() {
    return !!localStorage.getItem('token')
  }

  static logout() {
    localStorage.removeItem('token');
  }

  static postToPhotos(formPayload) {
    return fetch(`${local}/photos`, {
      headers: {Authorization: localStorage.getItem('token')},
      method: "POST",
      body: formPayload
    })
  }

  static getAllMyStories(token, id) {
    return fetch(`${local}/users/${id}/photostories`, {
      headers: {Authorization: token}
    })
  }

  static getAllPublicPhotoStories(){
    return fetch(`${local}/photostories/public`, {
      headers: {Authorization: localStorage.getItem('token')}
    })
  }

  static getAllPhotosForStory(id){
    return fetch(`${local}/photostories/${id}/photos`, {
      headers: {Authorization: localStorage.getItem('token')}
    })
  }

  static deleteOnePhotostory(id) {
    return fetch(`${local}/photostories/${id}`, {
      headers: {Authorization: localStorage.getItem('token')},
      method: "DELETE"
    })
  }

  static deletePreviewPhoto(id) {
    return fetch(`${local}/photos/${id}`, {
      headers: {Authorization: localStorage.getItem('token')},
      method: "DELETE"
    })
  }

  static getCurrentUser(token) {
    return fetch(`${local}/users/token`, {
      headers: {Authorization: token},
      method: "POST"
    })
  }

  static updatePhotoCaption(id, caption) {
    return fetch(`${local}/photos/${id}`, {
      headers: {Authorization: localStorage.getItem('token'), "Content-Type": "application/json"},
      method: "PATCH",
      body: JSON.stringify({ caption })
    })
  }
  
}

export default Adapter;
