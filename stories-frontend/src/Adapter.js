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

}

export default Adapter;
