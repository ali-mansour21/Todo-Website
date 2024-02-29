let loginForm = document.getElementById("submitForm");
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const userName = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  if (userName === "AdminSEF123" && password === "SeF@ctORy$$456") {
    window.location.href = "http://127.0.0.1:5500/pages/home.html";
  } else {
    alert("Oops wrong credentials");
  }
});
