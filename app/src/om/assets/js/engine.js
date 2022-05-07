window.onload = function()
{
    list();
}

function list()
{
    var bodyFormData = new FormData();
    bodyFormData.append('submit', "list");
    axios({
        method: "post",
        url: "session.php",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(function (response) {
          
          response.data.forEach(function(v,i)
          {
              var id = response.data[i].data.id.substr(0, 4);
              var time = response.data[i].data.time;
              if(new DeviceUUID().get() == response.data[i].data.id)
              {
                time = moment.unix(time).local().format('YYYY-MM-DD, H:mm:ss')
                document.getElementById("session_list").innerHTML += `<div style="margin-top: 5px;margin-bottom: 5px;" bis_skin_checked="1"><span style="color: rgb(116,221,252);">${i+1}. ${id} | first login at ${time} (this device)</span><button onclick="deleted(${i});" class="btn btn-primary" type="button" style="margin-right: 10px;margin-left: 10px;background: rgb(117,217,247);border-top-left-radius: 27px;border-bottom-right-radius: 22px;font-family: Roboto, sans-serif;font-weight: bold;">Delete Session</button></div>`
              }
              else
              {
                time = moment.unix(time).local().format('YYYY-MM-DD, H:mm:ss')
                document.getElementById("session_list").innerHTML += `<div style="margin-top: 5px;margin-bottom: 5px;" bis_skin_checked="1"><span style="color: rgb(116,221,252);">${i+1}. ${id} | first login at ${time}</span><button onclick="deleted(${i});" class="btn btn-primary" type="button" style="margin-right: 10px;margin-left: 10px;background: rgb(117,217,247);border-top-left-radius: 27px;border-bottom-right-radius: 22px;font-family: Roboto, sans-serif;font-weight: bold;">Delete Session</button></div>`
              }
          })
      })
      .catch(function (error) {
        console.log(error);
      });
}
function deleted(v)
{
    if (confirm(`Delete Session ${v+1}?`))
    {
        var bodyFormData = new FormData();
    bodyFormData.append('submit', "delete");
    bodyFormData.append('index', v);
    axios({
        method: "post",
        url: "session.php",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(function (response) {
          console.log(response.data)
          if(response.data == "success")
          {
              alert("success !");
              location.reload();
          }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    
}
