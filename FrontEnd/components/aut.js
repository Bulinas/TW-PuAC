function isLoggedIn() {
    let token = localStorage.getItem("token");
    return token !== null && token !== undefined;
  }
  
  function logout() {
    localStorage.clear("token");
    location.href = "";
  }