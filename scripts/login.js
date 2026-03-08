document.getElementById("login-btn").addEventListener("click",(e) => {
  const userName = document.getElementById("username").value;
  const userPassword = document.getElementById("password").value;
  if (userName === "admin" && userPassword === "admin123") {
    alert("Login Successful!");
    document.getElementById("login-page").style.display = "none";
    document.getElementById("main-page").style.display = "block";
  } else {
    alert("Username or Password Invalid!");
  }
  return;
});