const delay = ms => new Promise(res => setTimeout(res, ms));
const AppKey = "«ÖÞÄûàÃùÆËªÕë§ÓüÞØ×ëÑÆÂÔû¦£Å§ó¡ÔùÁýÑÄæôó";
const JSKey = "ó×ØððÜ ËÆÁÕÃÛóª××¢æ¢ÇßãûöÛ¥üÿóäÊËýáÜëõÄÚ";
const Host = "áÿæâ¼÷þóáæûñ÷ÿóûþ¼ñýÿ";
const User = "õçáæóäýúûãç÷£ Òõÿóûþ¼ñýÿ";
const Pass = "Ñ£×Ð¤ÓÑ¦¦¢Ñ×Ó¢ª¤Ô¦Ð¤ÑªÖ ¦ÓÖÖ¦£Ö ¢Ö¥ª";
const hashUser = "Parse/"+ Decrypt(AppKey) + "/currentUser";

Parse.initialize(Decrypt(AppKey), Decrypt(JSKey));
Parse.serverURL = "https://parseapi.back4app.com/";

function onLoadIndex(){
    if (localStorage.getItem("SalvouDados") == "true"){
        sessionStorage.setItem("nameComunity", localStorage.getItem("nameComunity"));
        sessionStorage.setItem("SalvouDados", localStorage.getItem("SalvouDados"));
        sessionStorage.setItem("hashUser", localStorage.getItem("hashUser"));
        localStorage.clear();
    }

    if (sessionStorage.getItem("hashUser") != null) {
        window.location.href = "main.html";    
    }
}

function addPersonRow(id, name, phone, email, nameDistribuition, isResponsible, sendingWhatsapp){
    var responsible = isResponsible ? "Sim" : "Não";
    var sendWhatsapp = sendingWhatsapp ? "Sim" : "Não";

    $("#personBody").append(
        "<tr class='odd' id=" + id + "> "                                                                  +
        "   <td class='sorting_1' style='width: 20%'>" + name + "</td>"                                    +
        "   <td style='width: 14%'>" + phone + "</td>"                                                                        +
        "   <td style='width: 18%'>" + email + "</td>"                                                                        +
        "   <td style='width: 18%'>" + nameDistribuition + "</td>"                                         +
        "   <td style='width: 10%'>" + responsible + "</td>"                                               +
        "   <td style='width: 11%'>" + sendWhatsapp + "</td>"                                              +
        "   <td style='width: 10%'>"                                                                       +
        "       <div style='padding-top:5px'>"                                                             +
        "           <button onClick=editPerson($(this).closest('tr').attr('id')) "                       +
        "           style='margin-right: 5px; border: none;'>"                                            +
        "               <i class='bi bi-pencil-square'></i>"                                               +
        "           </button>"                                                                             +
        "           <button type='button' data-bs-toggle='modal' data-bs-target='#exampleModal' "          +
        "           onClick=changeModalId($(this).closest('tr').attr('id')) style='border: none;' "        +
        "           <span title='Deletar pessoa'></span> "                                                 +
        "               <i class='bi bi-trash'></i>"                                                       +
        "           </button>"                                                                             +
        "       </div>"                                                                                    +
        "   </td>"                                                                                         +
        "</tr>"
    );
}

function editPerson(id){
    person = new Parse.Query(Parse.Object.extend("Person"));
    person.equalTo("objectId", id);
    person.first().then(async function (p) {
        if (p) {
            var atributes = [];
            atributes[0] = "formPersonAction";
            atributes[1] = "pId";
            atributes[2] = "pName";
            atributes[3] = "pPhone";
            atributes[4] = "pEmail";
            atributes[5] = "pIsResponsible";
            atributes[6] = "pSendWhatsapp";
            atributes[7] = "pidDistribuition";

            var values = [];
            values[0] = "edit";
            values[1] = p.id;
            values[2] = p.get("name");
            values[3] = p.get("phone");
            values[4] = p.get("email");
            values[5] = p.get("responsible");
            values[6] = p.get("sendWhatsapp");
            values[7] = p.get("idDistribuition");

            personAtributesInLocal(true, atributes, values);
            window.location.href = "registerPerson.html";   
        }
    }).catch(function(error){
        console.log("Error: " + error.code + " " + error.message); 
    });
}

async function personAtributesInLocal(insert, atributes, values){
    if (insert) {
        for (var i = 0; i < atributes.length; i++) {
            sessionStorage.setItem(atributes[i], values[i]);
            console.log("campo: " + atributes + " com o valor: " + values);
        }
        
    }else{
        for (var i = 0; i < atributes.length; i++) {
            sessionStorage.removeItem(atributes[i]);
        }
    }
    await delay(5000);
}

function changeModalId(id){
    $('#modalConfirmation').attr('id', id);
}

function deletePerson(id){
    person = new Parse.Query(Parse.Object.extend("Person"));
    person.equalTo("objectId", id);
    person.first().then(async function (p) {
        if (p) {
            document.getElementById(id).disabled = true;
            p.destroy(); 
            await delay(300);
            window.location.reload(true);
        }
    }).catch(function(){
        console.log("Error: " + error.code + " " + error.message); 
    });
}

function onLoadMain(){
    Encrypt();
    if (sessionStorage.getItem("hashUser") == null) {
        window.location.href = "index.html";    
    }else {
        try {
            if (sessionStorage.getItem("nameComunity") != null) {
                document.getElementById("name-comunity").innerText = sessionStorage.getItem("nameComunity");
            }else{
                var idComunity = JSON.parse(sessionStorage.getItem("hashUser")).IdComunidade;
                comunity = new Parse.Query(Parse.Object.extend("Comunity"));
                comunity.equalTo("objectId", idComunity);
                comunity.first().then(function(c){
                    if(c){
                        document.getElementById("name-comunity").innerText = c.get("name");
                        sessionStorage.setItem("nameComunity", c.get("name"));
                    } else {
                        console.log("Comunidade não encontrada!");
                    }
                });
            }

            if (sessionStorage.getItem("formPersonAction") == "edit") {
                var atributes = [];
                atributes[0] = "formPersonAction";
                atributes[1] = "pId";
                atributes[2] = "pName";
                atributes[3] = "pPhone";
                atributes[4] = "pEmail";
                atributes[5] = "pIsResponsible";
                atributes[6] = "pSendWhatsapp";
                atributes[7] = "pidDistribuition";

                personAtributesInLocal(false, atributes, null);
                sessionStorage.removeItem('firstLoad')
            }

            document.getElementById("email-user").innerHTML = JSON.parse(sessionStorage.getItem("hashUser")).email;
            person = new Parse.Query(Parse.Object.extend("Person"));
            person.each(function(p){
                if(p){
                    addPersonRow(
                        p.id,
                        p.get("name"), 
                        p.get("phone"),
                        p.get("email"),
                        p.get("nameDistribuition"),
                        p.get("responsible"),
                        p.get("sendWhatsapp"),
                    );
                    sessionStorage.setItem("activePeopleEmails", sessionStorage.getItem("activePeopleEmails") > 0 ? sessionStorage.getItem("activePeopleEmails") + ";" + p.get("email") : p.get("email"));
                } else {
                    console.log("Nenhuma pessoa encontrada!");
                }
            });
        } catch (error) {
            console.log("Error: " + error.code + " " + error.message);    
        }
    }
}

async function onLoadRegisterPerson(){
    if (sessionStorage.getItem("hashUser") == null) {
        window.location.href = "index.html";    
    }else {
        try{
            distribuitionPoint = new Parse.Query(Parse.Object.extend("DistribuitionPoint"));
            distribuitionPoint.each(function(dp){
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

            document.getElementById("whatsCheck").checked = true;
            let dropSelect = document.getElementById("dropSelect");
            dropSelect.disabled = dropSelect.length <= 1;

            if (sessionStorage.getItem("formPersonAction") == "edit") {
                document.getElementById('firstName').value = sessionStorage.getItem("pName");
                document.getElementById('phoneNumber').value = sessionStorage.getItem("pPhone");
                switchResponsible(true, sessionStorage.getItem("pIsResponsible"));
                document.getElementById('whatsCheck').checked = sessionStorage.getItem("pSendWhatsapp") == "true";
                document.getElementById('email').value = sessionStorage.getItem("pEmail");
                while (dropSelect.length <= 1) {
                    await delay(1);
                    document.getElementById("dropSelect").value = sessionStorage.getItem("pidDistribuition");
                }
            }else{
                document.getElementById("firstName").value = "";
                document.getElementById("phoneNumber").value = "";
                document.getElementById("dropSelect")[0].selected = 'selected';
                document.getElementById("email").value = "";

                if (sessionStorage.getItem("firstLoad") == null){
                    sessionStorage.setItem("firstLoad", "False");
                    window.location.reload(true);
                }
            }
        }catch (error) {
            console.log("Error: " + error.code + " " + error.message);    
        }
    }
}

function validateEmail(email){
    if (email.length <= 0){
        return false;
    }else if (!email.includes('@')) {
        return false;
    }else if (!email.includes('.com')) {
        return false;
    }else{
        return true;
    }
}

function Encrypt() {
    str = "Valor a ser encriptado";
    if (!str) str = "";
    str = (str == "undefined" || str == "null") ? "" : str;
    try {
        var key = 146;
        var pos = 0;
        ostr = '';
        while (pos < str.length) {
            ostr = ostr + String.fromCharCode(str.charCodeAt(pos) ^ key);
            pos += 1;
        }

        console.log(ostr);
        return ostr;
    } catch (ex) {
        return '';
    }
}

function Decrypt(str) {
    if (!str) str = "";
    str = (str == "undefined" || str == "null") ? "" : str;
    try {
        var key = 146;
        var pos = 0;
        ostr = '';
        while (pos < str.length) {
            ostr = ostr + String.fromCharCode(key ^ str.charCodeAt(pos));
            pos += 1;
        }

        return ostr;
    } catch (ex) {
        return '';
    }
}

function submitExpense(){
    if (document.getElementById("title").value.trim().length <= 0) {
        showAlert("#alertErrorExpense");
    }else if (document.getElementById("amount").value.trim().length <= 0) {
        showAlert("#alertErrorExpense");
    }else if (document.getElementById("paymentDate").value.trim().length <= 0) {
        showAlert("#alertErrorExpense");
    }else{
        try {
            var Expense = Parse.Object.extend("Expense");

            e = new Expense();
            e.set("title", document.getElementById("title").value.trim());
            e.set("description", document.getElementById("description").value.trim());
            e.set("amount", document.getElementById("amount").value.trim());
            e.set("paymentDate", document.getElementById("paymentDate").value.trim());

            if (e.save()){
                showAlert("#alertRegSucessExpense");
                sendExpenseEmail(
                    sessionStorage.getItem("activePeopleEmails"), 
                    document.getElementById("title").value, 
                    document.getElementById("amount").value, 
                    document.getElementById("paymentDate").value
                );
                document.getElementById("title").value = "";
                document.getElementById("description").value = "";
                document.getElementById("amount").value = "";
                document.getElementById("paymentDate").value = "";
            }else{
                showAlert("#alertErrorExpense");
                console.log('Error: ' + error.message);
            }
        } catch (error) {
            console.log("Error: " + error.code + " " + error.message);
        }
    }
}

function submitPerson(){
    if (document.getElementById("firstName").value.trim().length <= 0) {
        showAlert("#alertErrorPerson");
    }else if (document.getElementById("phoneNumber").value.trim().length < 14) {
        showAlert("#alertErrorPerson");
    }else if (document.getElementById("dropSelect").value.trim().length <= 0) {
        showAlert("#alertErrorPerson");
    }else if (!validateEmail(document.getElementById("email").value.trim())) {
        showAlert("#alertEmailPerson");
    }else{
        try {
            var dp = document.getElementById("dropSelect");

            if (sessionStorage.getItem("formPersonAction") == "edit") {
                var Person = new Parse.Query(Parse.Object.extend("Person"));

                Person.equalTo("objectId", sessionStorage.getItem("pId"));
                Person.first().then(async function (p) {
                    if (p) {
                        p.set("name", document.getElementById("firstName").value.trim());
                        p.set("phone", document.getElementById("phoneNumber").value.trim());
                        p.set("responsible", sessionStorage.getItem("switchState") == "true");
                        p.set("sendWhatsapp", document.getElementById("whatsCheck").checked);
                        p.set("idDistribuition", document.getElementById("dropSelect").value);
                        p.set("email", document.getElementById("email").value.trim());
                        if (dp.selectedIndex > 0) {
                            p.set("nameDistribuition", dp[dp.selectedIndex].textContent);
                        }
                        if (p.save()) {
                            showAlert("#alertEditSucessPerson");
                            document.getElementById("regPerson").disabled = true;
                            await delay(1500); 
                            window.location.href = "main.html"; 
                        }else{
                            showAlert("#alertErrorPerson");
                        }
                    } else {
                        console.log("Não encontrou a pessoa ao editar.");
                    }
                });
            }else {
                var Person = Parse.Object.extend("Person");

                p = new Person();
                p.set("name", document.getElementById("firstName").value.trim());
                p.set("phone", document.getElementById("phoneNumber").value.trim());
                p.set("responsible", sessionStorage.getItem("switchState") == "true");
                p.set("sendWhatsapp", document.getElementById("whatsCheck").checked);
                p.set("idDistribuition", document.getElementById("dropSelect").value.trim());
                p.set("email", document.getElementById("email").value.trim());
                if (dp.selectedIndex > 0) {
                    p.set("nameDistribuition", dp[dp.selectedIndex].textContent);
                }

                if (p.save()){
                    showAlert("#alertRegSucessPerson");
                    document.getElementById("firstName").value = "";
                    document.getElementById("phoneNumber").value = "";
                    document.getElementById("dropSelect")[0].selected = 'selected';
                    document.getElementById("email").value = "";
                }else{
                    showAlert("#alertErrorPerson");
                    console.log('Error: ' + error.message);
                }
            }    
        } catch (error) {
            console.log("Error: " + error.code + " " + error.message);
        }
    }
}

function switchResponsible(changeOption, valueCheck){
    var backgroundSwitch = document.getElementById("backgroundbtnSwitch");
    var btnSwitch = document.getElementById("btnSwitch");

    if (valueCheck) {
        backgroundSwitch.classList.value = "switch switch-" + valueCheck;
        btnSwitch.classList.value = "btn-switch btn-switch-" + valueCheck; 
    }else {
        if (changeOption){
            if (sessionStorage.getItem("switchState") == "true") {
                sessionStorage.setItem("switchState", "false");
            }else{
                sessionStorage.setItem("switchState", "true");
            }

            backgroundSwitch.classList.value = "switch switch-" + sessionStorage.getItem("switchState");
            btnSwitch.classList.value = "btn-switch btn-switch-" + sessionStorage.getItem("switchState"); 
        }else{
            sessionStorage.setItem("switchState", "false");
        }
    }
}

async function showAlert(id){
    $(id).show("fade");
    await delay(2900);
    $(id).hide("fade");
}

function freeOnClose(){
    if (sessionStorage.getItem("SalvouDados") == "true"){
        localStorage.setItem("nameComunity", sessionStorage.getItem("nameComunity"));
        localStorage.setItem("SalvouDados", sessionStorage.getItem("SalvouDados"));
        localStorage.setItem("hashUser", sessionStorage.getItem("hashUser"));
    }
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

function dataMask(field, e)
{
	var kC = (document.all) ? event.keyCode : e.keyCode;
	var data = field.value;
	
	if( kC!=8 && kC!=46 ){
		if( data.length==2 ){
		    field.value = data += '/';
		}else if( data.length==5 ){
			field.value = data += '/';
		}else
            field.value = data;
	}
}

function sendExpenseEmail(recipients, title, amount, date) {
    try {
        Email.send({
            Host: Decrypt(Host),
            Username: Decrypt(User),
            Password: Decrypt(Pass),
            To: recipients,
            From: Decrypt(User),
            Subject: "Nova despesa adicionada!",
            Body: "A despesa " + title + " foi cadastrada com o valor de " + amount + " e vencimento em " + date, 
            })
            .then(function (message) {
                console.log("mail sent successfully - " + message)
            });
    } catch (error) {
        console.log("Error: " + error.code + " " + error.message);    
    }
}

jQuery(function() {
    jQuery("#amount").maskMoney({
        prefix:'R$ ', 
        thousands:'.', 
        decimal:','
    })
});

function logOut(){
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "index.html";
}

function logIn() {
    const userValue = document.getElementById("user").value;
    const passValue = document.getElementById("pass").value;
    
    if (userValue.length <= 0 || passValue.length <= 0) {
        showAlert("#alertError");
    } else {
        try{
            Parse.User.logIn(userValue, passValue).then(async function(user) {
                while (localStorage.getItem(hashUser) == null) {
                    await delay(1); // Aguardar pra salvar o User no localStorage
                }

                query = new Parse.Query(Parse.Object.extend("Session"));
                query.equalTo("user", JSON.parse(localStorage.getItem(hashUser)).objectId);
                query.first().then(function (s) {
                    if (s) {
                        s.destroy(); //not working
                    } else {
                        console.log("Sem sessões para o usuário...");
                        return null;
                    }
                }).catch(function(error){
                    console.log("Error: " + error.code + " " + error.message);    
                });

                if (sessionStorage.getItem("nameComunity") == null) {
                    var idComunity = JSON.parse(localStorage.getItem(hashUser)).IdComunidade;
                    comunity = new Parse.Query(Parse.Object.extend("Comunity"));
                    comunity.equalTo("objectId", idComunity);
                    comunity.first().then(function(c){
                        if(c){
                            sessionStorage.setItem("nameComunity", c.get("name"));
                        } else {
                            console.log("Comunidade não encontrada!");
                        }
                    });
                }

                sessionStorage.setItem("hashUser", localStorage.getItem(hashUser));
                sessionStorage.setItem("SalvouDados", document.getElementById('rememberCheck').checked);
                localStorage.clear();
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