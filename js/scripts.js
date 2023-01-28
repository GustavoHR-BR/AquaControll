Parse.initialize("AppKey", "KeyJS");
Parse.serverURL = "https://parseapi.back4app.com/";

async function onLoadIndex(){
    if (localStorage.getItem('UserId') != null) {
        window.location.href = "main.html";    
    }
}

async function onLoadMain(){
    if (localStorage.getItem('UserId') == null) {
        window.location.href = "index.html";    
    }else {
        try {
            const Comunidade = Parse.Object.extend("comunidade");
            const comunidade = new Parse.Query(Comunidade);
            comunidade.get(localStorage.getItem("ComunidadeId"))
            .then((c) => {
               console.log("Sucess");
            }, (error) => {
               console.log("Error: " + error.code + " " + error.message);    
            });

            document.getElementById("comunidade").value = comunidade.get("nome");
        } catch (error) {
            console.log("Error: " + error.code + " " + error.message);    
        }
    }
}

async function logIn() {
    const userValue = document.getElementById("user").value;
    const passValue = document.getElementById("pass").value;
    //Fazer mais validações no login
    
    if (userValue.length <= 0 || passValue.length <= 0) {
        alert("Usuário ou senha inválidos!");
    } else {
        try{
            if (Parse.User.logIn(userValue, passValue)) {
                const currentUser = Parse.User.current();
                localStorage.setItem('UserId', currentUser.id);
                localStorage.setItem('ComunidadeId', currentUser.get("IdComunidade"));
                window.location.href = "main.html";    
            }else{
                alert("Usuário ou senha incorretos!");   
            }
        }catch{
            console.log("Error: " + error.code + " " + error.message);    
        }
    }
}