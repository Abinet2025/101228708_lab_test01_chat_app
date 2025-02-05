document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const password = document.getElementById("password").value;
  
    const response = await fetch("/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, firstname, lastname, password }),
    });
  
    if (response.status === 201) {
      alert("User created successfully");
      window.location.href = "login.html";
    } else {
      alert("Error creating user");
    }
  });
  
  document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
  
    if (response.status === 200) {
      localStorage.setItem("username", username);
      window.location.href = "index.html";
    } else {
      alert("Invalid credentials");
    }
  });