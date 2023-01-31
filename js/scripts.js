Parse.initialize("AppKey", "KeyJS");
Parse.serverURL = "https://parseapi.back4app.com/";
const delay = ms => new Promise(res => setTimeout(res, ms));

function onLoadIndex(){
    if (localStorage.getItem('Parse/9DLVirQkTY8Gy5AnLJEyCTPFi41W5a3FkSoCVtfa/currentUser') != null && localStorage.getItem("Finalizou") == "false") {
        window.location.href = "main.html";    
    }
}

function onLoadMain(){
    if (localStorage.getItem('Parse/9DLVirQkTY8Gy5AnLJEyCTPFi41W5a3FkSoCVtfa/currentUser') == null) {
        window.location.href = "index.html";    
    }else {
        try {
            localStorage.setItem("Finalizou", "false");
            var idComunidade = JSON.parse(localStorage.getItem('Parse/9DLVirQkTY8Gy5AnLJEyCTPFi41W5a3FkSoCVtfa/currentUser')).IdComunidade;
            comunidade = new Parse.Query(Parse.Object.extend("comunidade"));
            comunidade.equalTo("objectId", idComunidade);
            comunidade.first().then(function(c){
                if(c){
                    // Encontrou, basta usar c
                } else {
                   console.log("Comunidade não encontrada!");
                }
            });
        } catch (error) {
            console.log("Error: " + error.code + " " + error.message);    
        }
    }
}

function freeOnClose(){
    if (localStorage.getItem("SalvouDados") == "false"){
        localStorage.clear();
    }
    localStorage.setItem("Finalizou", "true");
    window.location.href = "index.html";
}

async function logIn() {
    const userValue = document.getElementById("user").value;
    const passValue = document.getElementById("pass").value;
    localStorage.setItem("SalvouDados", document.getElementById("check-remember").checked);
    //Fazer mais validações no login
    
    if (userValue.length <= 0 || passValue.length <= 0) {
        alert("Usuário ou senha inválidos!");
    } else {
        try{
            if (Parse.User.logIn(userValue, passValue)) {
                await delay(700); // Aguardar pra garantir que salvou o User no localStorage
                window.location.href = "main.html";    
            }else{
                alert("Usuário ou senha incorretos!");   
                document.getElementById("pass").value = "";
            }
        }catch (error) {
            console.log("Error: " + error.code + " " + error.message);    
        }
    }
}