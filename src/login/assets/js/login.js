function login()
{
      // Initialize the agent at application startup.
      var uuid = new DeviceUUID().get();

        const visitorId = uuid
        const emailz = document.getElementById("email_login").value;

        axios({
          method: "get",
            url: "/key.php",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then(function (response) {
          var res_data = response.data;
          res_data = JSON.parse(res_data);
          let valueToEncrypt = visitorId // this could also be object/array/whatever
          let password = res_data.key
          let encrypted = CryptoJSAesJson.encrypt(valueToEncrypt, password)
          var bodyFormData = new FormData();
          bodyFormData.append('email', emailz);
          bodyFormData.append('id', encrypted);
          bodyFormData.append('key_id', res_data.id);
          axios({
              method: "post",
              url: "/login.php",
              data: bodyFormData,
              headers: { "Content-Type": "multipart/form-data" }
            })
            .then(function (response) {
              console.log(response);
              if(response.data == "logged")
              {
                  document.getElementById("status_login").innerHTML = `<span style="color:lime">Success !</span>`
                  document.getElementById("status_login").innerHTML += `<br><span style="color:aqua">Redirect...</span>`
                  setTimeout(function()
                  {
                      location.href = "/menu"
                  },2000)
              }
              if(response.data == "max_session")
              {
                  document.getElementById("status_login").innerHTML = `<span style="color:yellow">your account has crossed the browser user limit, please delete one of your browser sessions or contact admin !</span>`
              }
              if(response.data == "not_found")
              {
                  document.getElementById("status_login").innerHTML = `<span style="color:red">Email not found !, Please check and try again...</span>`
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });

        
 
}