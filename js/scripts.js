Parse.initialize("AppKey", "KeyJS");
Parse.serverURL = "https://parseapi.back4app.com/";

const delay = ms => new Promise(res => setTimeout(res, ms));
const hashUser = "Parse/9DLVirQkTY8Gy5AnLJEyCTPFi41W5a3FkSoCVtfa/currentUser";

function onLoadIndex(){
    if (localStorage.getItem(hashUser) != null) {
        window.location.href = "main.html";    
    }
}

function onLoadMain(){
    if (localStorage.getItem(hashUser) == null) {
        window.location.href = "index.html";    
    }else {
        try {
            document.getElementById("email-user").innerHTML = JSON.parse(localStorage.getItem(hashUser)).email;
            if (localStorage.getItem("nameComunity") != null) {
                document.getElementById("name-comunity").innerText = localStorage.getItem("nameComunity");
            }else{
                var idComunity = JSON.parse(localStorage.getItem(hashUser)).IdComunidade;
                comunity = new Parse.Query(Parse.Object.extend("Comunity"));
                comunity.equalTo("objectId", idComunity);
                comunity.first().then(function(c){
                    if(c){
                        document.getElementById("name-comunity").innerText = c.get("name");
                        localStorage.setItem("nameComunity", c.get("name"));
                    } else {
                        console.log("Comunidade não encontrada!");
                    }
                });
            }
        } catch (error) {
            console.log("Error: " + error.code + " " + error.message);    
        }
    }
}

function onLoadRegisterPerson(){
    if (localStorage.getItem(hashUser) == null) {
        window.location.href = "index.html";    
    }else {
        try{
            query = new Parse.Query(Parse.Object.extend("DistribuitionPoint"));
            query.each(function(dp){
                if(dp){
                    var o = document.createElement("option");
                    o.value = dp.id;
                    o.text = dp.get("name");
                    document.getElementById("dropSelect").appendChild(o);

                    if (document.getElementById("dropSelect").disabled) {
                        document.getElementById("dropSelect").disabled = false; 
                    }
                } else {
                    console.log("Nenhum ponto de distruibuição encontrado!");
                }
            }).catch(function(error){
                console.log("Error: " + error.code + " " + error.message);       
            });

            if (localStorage.getItem("switchState") == null) {
                localStorage.setItem("switchState", "false");
            }

            document.getElementById("whatsCheck").checked = true;
            let dropSelect = document.getElementById("dropSelect");
            if (dropSelect.length <= 1) {
                dropSelect.disabled = true;
            }else{
                dropSelect.disabled = false;
            }
        }catch (error) {
            console.log("Error: " + error.code + " " + error.message);    
        }
    }
}

function registerPerson(){
    var Person = Parse.Object.extend("Person");
    var dp = document.getElementById("dropSelect");

    p = new Person();
    p.set("name", document.getElementById("firstName").value);
    p.set("phone", document.getElementById("phoneNumber").value);
    p.set("responsible", localStorage.getItem("switchState") == "true");
    p.set("sendWhatsapp", document.getElementById("whatsCheck").checked);
    p.set("idDistribuition", document.getElementById("dropSelect").value);
    if (dp.selectedIndex > 0) {
        p.set("nameDistribuition", dp[dp.selectedIndex].textContent);
    }

    if (p.save()){
        showAlert("#alertSucessPerson");
        document.getElementById("firstName").value = "";
        document.getElementById("phoneNumber").value = "";
        document.getElementById("dropSelect")[0].selected = 'selected';
    }else{
        showAlert("#alertErrorPerson");
        console.log('Error: ' + error.message);
    }
}

function switchResponsible(){
    var backgroundSwitch = document.getElementById("backgroundbtnSwitch");
    var btnSwitch = document.getElementById("btnSwitch");

    if (localStorage.getItem("switchState") == "true") {
        localStorage.setItem("switchState", "false");
    }else{
        localStorage.setItem("switchState", "true");
    }

    backgroundSwitch.classList.value = "switch switch-" + localStorage.getItem("switchState");
    btnSwitch.classList.value = "btn-switch btn-switch-" + localStorage.getItem("switchState"); 
}

async function showAlert(id){
    $(id).show("fade");
    await delay(2900);
    $(id).hide("fade");
}

function freeOnClose(){
    // if (localStorage.getItem("SalvouDados") == "false"){
    //     localStorage.clear();
    // }
    // localStorage.setItem("Finalizou", "true");
    // window.location.href = "index.html";
    // removeItem("nameComunity");
}

const handlePhone = (event) => {
    let input = event.target;
    input.value = phoneMask(input.value);
  }
  
  const phoneMask = (value) => {
    if (!value) return "";
    value = value.replace(/\D/g,"");
    value = value.replace(/(\d{2})(\d)/,"($1) $2");
    value = value.replace(/(\d)(\d{4})$/,"$1-$2");
    return value;
  }

 function logIn() {
    const userValue = document.getElementById("user").value;
    const passValue = document.getElementById("pass").value;
    
    if (userValue.length <= 0 || passValue.length <= 0) {
        showAlert("#alertError");
    } else {
        try{
            // const CryptoJS = require("crypto-js");

            // // Dados cifrados
            // let encryptedData = "U2FsdGVkX1+QcKVJhQEjLzLzz0j1GG9z1hWZlHvZPwg=";

            // // Chave de descriptografia
            // let decryptionKey = "Sua chave de descriptografia aqui";

            // // Decodifica a string base64 para bytes
            // let encryptedBytes = CryptoJS.AES.decrypt(encryptedData, decryptionKey);

            // // Converte os bytes de volta para uma string legível
            // let decryptedData = encryptedBytes.toString(CryptoJS.enc.Utf8);

            // console.log(decryptedData);

            Parse.User.logIn(userValue, passValue).then(async function(user) {
                while (localStorage.getItem(hashUser) == null) {
                    await delay(1); // Aguardar pra salvar o User no localStorage
                }
                window.location.href = "main.html";  
            }).catch(function(){
                document.getElementById("pass").value = "";
                showAlert("#alertError");
            });
        }catch (error) {
            console.log("Error: " + error.code + " " + error.message);    
        }
    }
}