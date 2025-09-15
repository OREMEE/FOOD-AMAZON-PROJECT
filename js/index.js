function showProduct() {
  location.href = "Product.html";
}

function checkOut() {
  location.href = "Check-out.html";
}

function signUp(event) {
  // prevents page refresh
  event.preventDefault();



  // triggers the spining animation
  const spinItem = document.querySelector(".spin");
  spinItem.style.display = "inline-block";

  const getName = document.querySelector(".name").value;
   const getEmail = document.querySelector(".email").value;
    const getPhone = document.querySelector(".phone").value;
     const getPassword = document.querySelector(".password").value;
  // const getName = document.getElementById("name").value;
  // const getEmail = document.getElementById("email").value;
  // const getPhone = document.getElementById("phone").value;
  // const getPassword = document.getElementById("password").value;

  // validation
  if ( getName === ""  || getEmail === ""  || getPhone === "" || getPassword === "") {
     Swal.fire({
      icon: "info",
      text: "All fields are required!",
      confirmButtonColor: "#f58634",
    });
    
    spinItem.style.display = "none";
    return;
  }
  // if (getConfirm !== getPassword) {
  //   Swal.fire({
  //     icon: "warning",
  //     text: "Passwords don't match",
  //     confirmButtonColor: "#2D85DE",
  //   });
  //   spinItem.style.display = "none";
  //   return;
  // } 

  if (getPassword.length <= 8){
    Swal.fire({
      icon: "warning",
      text: "Password must be more 8 characters!",
      confirmButtonColor: "#f58634",
    });

    spinItem.style.display = "none";
    return;
  }

  else {

    // console.log(getEmail, getName, getPhone, getPassword)
    // convert to form data
    const signData = {
      name: getName,
      email: getEmail,
      phone:getPhone,
      password: getPassword
    }
   

    // request method
    const signMethod = {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signData)
    };

    // endpoint
    const url =
      "http://localhost:3000/amazon/document/api/signup";

    // callimg the api
    fetch(url, signMethod)
      .then(response => response.json())
      .then(result => {
        console.log("Success", result);

        if (result.message === "success") {

          Swal.fire({
            icon: "info",
            title: "Error",
            confirmButtonColor: "#f58634",
          });
        } else {
          
             Swal.fire({
            icon: "success",
            title:"Account successfully created",
            confirmButtonColor: "#f58634",
          });

          setTimeout(() => {
            location.href = "Sign-in.html";
          }, 4000);
        }
      })
      .catch((error) => {
        console.log("error", error);
        Swal.fire({
          icon: "info",
          title: "Error, Try again later",
          confirmButtonColor: "#f58634",
        });
        spinItem.style.display = "none";
      });
  }
}


function signIn(event) {
  event.preventDefault();


  const spinItem = document.querySelector(".spin");
  spinItem.style.display = "inline-block";

  const getEmail = document.querySelector(".email").value;
  const getPassword = document.querySelector(".password").value;
  if (getEmail === "" || getPassword === "") {
    Swal.fire({
      icon: "info",
      text: "All fields are required!",
      confirmButtonColor: "#f58634",
    });

    spinItem.style.display = "none";
    return;
  }else {
    const signData = {
      email: getEmail,
      password: getPassword
    }
    // this is for raw data
    // const signData = JSON.stringify({
    //     "email": getEmail,
    //     "password": getPassword
    // })


  const signMethod = {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signData)
    }


   const url =
      "http://localhost:3000/amazon/document/api/login";
    fetch(url, signMethod)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.hasOwnProperty("email")) {
          localStorage.setItem("key", result.token);

          location.href = "./index.html";

        } else {
          Swal.fire({
            icon: "success",
            title:"Successfully logged In",
            confirmButtonColor: "#f58634",
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
        Swal.fire({
          icon: "info",
          title: "Error, Try again later",
          confirmButtonColor: "#f58634",
        });
      });
  }
}