function addToken(xmlhttp) {
  let token = localStorage.getItem("token");
  if (token) {
    xmlhttp.setRequestHeader("Authorization", token);
  }
}

function post(url, body, callback) {
  let bodyStr = JSON.stringify(body);
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", url);
  addToken(xmlhttp);
  xmlhttp.send(bodyStr);

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      callback(this.status, xmlhttp.responseText);
    }
  };
}

function get(url, callback) {
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url);
  addToken(xmlhttp);
  xmlhttp.send();

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      callback(this.status, xmlhttp.responseText);
    }
  };
}

function deleteObj(url, callback) {
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.open("DELETE", url);
  addToken(xmlhttp);
  xmlhttp.send();

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      callback(this.status, xmlhttp.responseText);
    }
  };
}
