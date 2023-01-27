Parse.initialize("AppKey", "KeyJS");
Parse.serverURL = "https://parseapi.back4app.com/";

function logIn() {
    const userValue = document.getElementById("user").value;
    const passValue = document.getElementById("pass").value;
    
    if (userValue.length <= 0 || passValue.length <= 0) {
        alert("Usuário ou senha inválidos!");
    } else {
        var user = Parse.User.logIn(userValue, passValue).then(function(user) {
            console.log(user.IdComunidade);
            window.location.href = "main.html";    
        }).catch(function(error){
            alert("Usuário ou senha incorretos!");
            console.log("Error: " + error.code + " " + error.message);
        });
    }
}