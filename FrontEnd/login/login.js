let forms = document.getElementsByClassName("widget");
let current = 1;

function switchForm() {
  let newForm = forms[1 - current];
  let oldForm = forms[current];
  current = 1 - current;
  newForm.classList = "widget";
  oldForm.classList = "widget hidden-form";
}

function handleSuccessfulTokenRetrieval(token) {
  localStorage.setItem("token", token);
  location.href = "/";
}

function login() {
  let usernameInput = document.getElementsByClassName("login-username")[0];
  let passwordInput = document.getElementsByClassName("login-password")[0];

  let loginObject = {
    username: usernameInput.value,
    password: passwordInput.value,
  };

  post("http://localhost:5000/users/login", loginObject, (status, response) => {
    if (status == 200) {
      let tokenObj = JSON.parse(response);
      let token = tokenObj.token;
      handleSuccessfulTokenRetrieval(token);
    } else {
      console.log("ERROR WHILE LOGGING IN");
      console.log(response);
    }
  });
}

function register() {
  let usernameInput = document.getElementsByClassName("register-username")[0];
  let passwordInput = document.getElementsByClassName("register-password")[0];
  let emailInput = document.getElementsByClassName("register-email")[0];

  let registerObject = {
    username: usernameInput.value,
    password: passwordInput.value,
    email: emailInput.value,
  };

  post(
    "http://localhost:5000/users/register",
    registerObject,
    (status, response) => {
      if (status == 201) {
        let tokenObj = JSON.parse(response);
        let token = tokenObj.token;
        handleSuccessfulTokenRetrieval(token);
      } else {
        console.log("ERROR WHILE REGISTERING");
        console.log(response);
      }
    }
  );
}