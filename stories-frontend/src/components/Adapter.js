let host = "https://localhost:3000"

class Adapter {
  
  static isLoggedIn() {
    return !!localStorage.getItem('token')
  }

  static logout() {
    localStorage.removeItem('token');
  }

  static postToPhotos(formPayload) {
    return fetch(`${host}/photos`, {
      headers: {Authorization: localStorage.getItem('token')},
      method: "POST",
      body: formPayload
    })
  }

  static getAllMyStories(token, id) {
    return fetch(`${host}/users/${id}/photostories`, {
      headers: {Authorization: token}
    })
  }

  static getAllPublicPhotoStories(){
    return fetch(`${host}/photostories/public`, {
      headers: {Authorization: localStorage.getItem('token')}
    })
  }

  static getAllPhotosForStory(id){
    return fetch(`${host}/photostories/${id}/photos`, {
      headers: {Authorization: localStorage.getItem('token')}
    })
  }

  static deleteOnePhotostory(id) {
    return fetch(`${host}/photostories/${id}`, {
      headers: {Authorization: localStorage.getItem('token')},
      method: "DELETE"
    })
  }

  static deletePreviewPhoto(id) {
    return fetch(`${host}/photos/${id}`, {
      headers: {Authorization: localStorage.getItem('token')},
      method: "DELETE"
    })
  }

  static getCurrentUser(token) {
    return fetch(`${host}/users/token`, {
      headers: {Authorization: token},
      method: "POST"
    })
  }

  static updatePhotoCaption(id, caption) {
    return fetch(`${host}/photos/${id}`, {
      headers: {Authorization: localStorage.getItem('token'), "Content-Type": "application/json"},
      method: "PATCH",
      body: JSON.stringify({ caption })
    })
  }
  
}

export default Adapter;
