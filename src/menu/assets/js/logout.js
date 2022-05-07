axios({
    method: "post",
    url: "logout.php"
  })
  .then(function (response) {
    if(response.data == "0")
    {
        alert("Logout Success!")
        setTimeout(function()
        {
            location.href = "/"
        },2000)
    }
  })
  .catch(function (error) {
    console.log(error);
  });