class Adapter {

  static isLoggedIn() {
    return !!localStorage.getItem('token')
  }

  static logout() {
    localStorage.removeItem('token');
  }

  static postToPhotos(formPayload) {
    return fetch("http://localhost:3000/photos", {
      headers: {Authorization: localStorage.getItem('token')},
      method: "POST",
      body: formPayload
    })
  }

  static getAllMyStories(token) {
    const id = 1
    return fetch(`http://localhost:3000/users/${id}/photostories`, {
      headers: {Authorization: token}
    })
  }

  static getAllPhotoStories(){
    return fetch("http://localhost:3000/photostories", {
      headers: {Authorization: localStorage.getItem('token')}
    })
  }

  static getAllPhotosForStory(id){
    return fetch(`http://localhost:3000/photostories/${id}/photos`, {
      headers: {Authorization: localStorage.getItem('token')}
    })
  }

}

export default Adapter;
