const delay = ms => new Promise(res => setTimeout(res, ms));
const AppKey = "«ÖÞÄûàÃùÆËªÕë§ÓüÞØ×ëÑÆÂÔû¦£Å§ó¡ÔùÁýÑÄæôó";
const JSKey = "ó×ØððÜ ËÆÁÕÃÛóª××¢æ¢ÇßãûöÛ¥üÿóäÊËýáÜëõÄÚ";
const Host = "áÿæâ¼÷þóáæûñ÷ÿóûþ¼ñýÿ";
const User = "õçáæóäýúûãç÷£ Òõÿóûþ¼ñýÿ";
const Pass = "Ñ£×Ð¤ÓÑ¦¦¢Ñ×Ó¢ª¤Ô¦Ð¤ÑªÖ ¦ÓÖÖ¦£Ö ¢Ö¥ª";
const hashUser = "Parse/"+ Decrypt(AppKey) + "/currentUser";

Parse.initialize(Decrypt(AppKey), Decrypt(JSKey));
Parse.serverURL = "https://parseapi.back4app.com/";

$('body').on('keydown', 'input, select', function(e) {
    if (e.key === "Enter" && e.target && ['BUTTON','SUBMIT'].indexOf(e.target.tagName) === -1) {
        var self = $(this), form = self.parents('form:eq(0)'), focusable, next;
        focusable = form.find('input,a,select,button,textarea').filter(':visible');
        next = focusable.eq(focusable.index(this)+1);
        if (next.length) {
            next.focus();
        } else {
            form.submit();
        }
        return false;
    }
});

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

    document.getElementById('user').focus();
}

function addPersonRow(id, name, phone, email, nameDistribuition, isResponsible, sendingWhatsapp){
    var responsible = isResponsible ? "Sim" : "Não";
    var sendWhatsapp = sendingWhatsapp ? "Sim" : "Não";

    $("#personBody").append(
        "<tr class='odd' id=" + id + "> "                                                                  +
        "   <td class='sorting_1' style='width: 20%'>" + name + "</td>"                                    +
        "   <td style='width: 14%'>" + phone + "</td>"                                                     +
        "   <td style='width: 18%'>" + email + "</td>"                                                     +
        "   <td style='width: 18%'>" + nameDistribuition + "</td>"                                         +
        "   <td style='width: 10%'>" + responsible + "</td>"                                               +
        "   <td style='width: 11%'>" + sendWhatsapp + "</td>"                                              +
        "   <td style='width: 10%'>"                                                                       +
        "       <div style='padding-top:5px'>"                                                             +
        "           <button onClick=editPerson($(this).closest('tr').attr('id')) "                         +
        "           style='margin-right: 5px; border: none;'>"                                             +
        "               <i class='bi bi-pencil-square'></i>"                                               +
        "           </button>"                                                                             +
        "           <button type='button' data-bs-toggle='modal' data-bs-target='#modalDelete' "           +
        "           onClick=changeModalId($(this).closest('tr').attr('id')) style='border: none;' "        +
        "           <span title='Deletar pessoa'></span> "                                                 +
        "               <i class='bi bi-trash'></i>"                                                       +
        "           </button>"                                                                             +
        "       </div>"                                                                                    +
        "   </td>"                                                                                         +
        "</tr>"
    );
}

function addExpenseRow(id, title, description, amount, date){
    $("#expenseBody").append(
        "<tr class='odd' id=" + id + "> "                                                                  +
        "   <td class='sorting_1' style='width: 14%'>" + title + "</td>"                                   +
        "   <td style='width: 20%'>" + description + "</td>"                                               +
        "   <td style='width: 8%'>" + amount + "</td>"                                                     +
        "   <td style='width: 8%'>" + date + "</td>"                                                       +
        "   <td style='width: 3%'>"                                                                        +
        "       <div style='padding-top:5px'>"                                                             +
        "           <button onClick=editExpense($(this).closest('tr').attr('id')) "                        +
        "           style='margin-right: 5px; border: none;'>"                                             +
        "               <i class='bi bi-pencil-square'></i>"                                               +
        "           </button>"                                                                             +
        "           <button type='button' data-bs-toggle='modal' data-bs-target='#modalDelete' "           +
        "           onClick=changeModalId($(this).closest('tr').attr('id')) style='border: none;' "        +
        "           <span title='Deletar despesa'></span> "                                                +
        "               <i class='bi bi-trash'></i>"                                                       +
        "           </button>"                                                                             +
        "       </div>"                                                                                    +
        "   </td>"                                                                                         +
        "</tr>"
    );
}

function addDistribuitionPointRow(id, name, nameMainPoint){
    $("#distrPointBody").append(
        "<tr class='odd' id=" + id + "> "                                                                  +
        "   <td class='sorting_1' style='width: 14%'>" + name + "</td>"                                    +
        "   <td style='width: 20%'>" + nameMainPoint + "</td>"                                             +
        "   <td style='width: 3%'>"                                                                        +
        "       <div style='padding-top:5px'>"                                                             + 
        "           <button onClick=editDistrPoint($(this).closest('tr').attr('id')) "                     + 
        "           style='margin-right: 5px; border: none;'>"                                             +
        "               <i class='bi bi-pencil-square'></i>"                                               +
        "           </button>"                                                                             +
        "           <button type='button' data-bs-toggle='modal' data-bs-target='#modalDelete' "           +
        "           onClick=changeModalId($(this).closest('tr').attr('id')) style='border: none;' "        +
        "           <span title='Deletar ponto de distribuição'></span> "                                  +
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

            atributesEditionInLocal(true, atributes, values);
            window.location.href = "registerPerson.html";   
        }
    }).catch(function(error){
        console.log("Error: " + error.code + " " + error.message); 
    });
}

function editExpense(id){
    Expense = new Parse.Query(Parse.Object.extend("Expense"));
    Expense.equalTo("objectId", id);
    Expense.first().then(async function (e) {
        if (e) {
            var atributes = [];
            atributes[0] = "formExpenseAction";
            atributes[1] = "eId";
            atributes[2] = "eTitle";
            atributes[3] = "eDescription";
            atributes[4] = "eAmount";
            atributes[5] = "ePaymentDate";

            var values = [];
            values[0] = "edit";
            values[1] = e.id;
            values[2] = e.get("title");
            values[3] = e.get("description");
            values[4] = e.get("amount");
            values[5] = e.get("paymentDate");

            atributesEditionInLocal(true, atributes, values);
            window.location.href = "registerExpense.html";   
        }
    }).catch(function(error){
        console.log("Error: " + error.code + " " + error.message); 
    });
}

function editDistrPoint(id){
    DistribuitionPoint = new Parse.Query(Parse.Object.extend("DistribuitionPoint"));
    DistribuitionPoint.equalTo("objectId", id);
    DistribuitionPoint.first().then(async function (dp) {
        if (dp) {
            var atributes = [];
            atributes[0] = "formDistrPointAction";
            atributes[1] = "dpId";
            atributes[2] = "dpIdMainPoint";
            atributes[3] = "dpName";
            atributes[4] = "dpNameMainPoint";

            var values = [];
            values[0] = "edit";
            values[1] = dp.id;
            values[2] = dp.get("idMainPoint");
            values[3] = dp.get("name");
            values[4] = dp.get("nameMainPoint");

            atributesEditionInLocal(true, atributes, values);
            window.location.href = "registerDistrPoint.html";   
        }
    }).catch(function(error){
        console.log("Error: " + error.code + " " + error.message); 
    });
}

async function atributesEditionInLocal(insert, atributes, values){
    if (insert) {
        for (var i = 0; i < atributes.length; i++) {
            sessionStorage.setItem(atributes[i], values[i]);
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

function deleteRow(id){
    switch (sessionStorage.getItem("indexTypeActive")) {
        case "0":
            Obj = new Parse.Query(Parse.Object.extend("Person"));   
            break;

        case "1":
            Obj = new Parse.Query(Parse.Object.extend("Expense"));
            break;

        case "2":
            Obj = new Parse.Query(Parse.Object.extend("DistribuitionPoint"));
            break;
    }

    Obj.equalTo("objectId", id);
    Obj.first().then(async function (o) {
    if (o) {
        document.getElementById(id).disabled = true;
        o.destroy(); 
        await delay(450);
        window.location.reload(true);
    }
    }).catch(function(){
        console.log("Error: " + error.code + " " + error.message); 
    });    
}

async function Refresh(){
    while (document.getElementById("numberPeople").innerHTML == "") {
        await delay(850);
        window.location.reload(true);
    }
    await delay(60000);
    window.location.reload(true);
}

function onLoadMain(){
    if (sessionStorage.getItem("hashUser") == null) {
        window.location.href = "index.html";    
    }else {
        try {
            hiddeMenu(); hiddeMenu();
            // Busca nome da comunidade 
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

            // Remove dados edição da pessoa
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

                atributesEditionInLocal(false, atributes, null);
            }

            // Remove dados edição da despesa
            if (sessionStorage.getItem("formExpenseAction") == "edit") {
                var atributes = [];
                atributes[0] = "formExpenseAction";
                atributes[1] = "eId";
                atributes[2] = "eTitle";
                atributes[3] = "eDescription";
                atributes[4] = "eAmount";
                atributes[5] = "ePaymentDate";

                atributesEditionInLocal(false, atributes, null);
            }

            // Remove dados edição dos pontos de distribuição
            if (sessionStorage.getItem("formDistrPointAction") == "edit") {
                var atributes = [];
                atributes[0] = "formDistrPointAction";
                atributes[1] = "dpId";
                atributes[2] = "dpIdMainPoint";
                atributes[3] = "dpName";
                atributes[4] = "dpNameMainPoint";

                atributesEditionInLocal(false, atributes, null);
            }

            // Lista as pessoas ativas
            let countPeople = 0;
            sessionStorage.setItem("activePeopleEmails", "");
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
                        p.get("sendWhatsapp")
                    );
                    sessionStorage.setItem("activePeopleEmails", sessionStorage.getItem("activePeopleEmails").length > 1 ? sessionStorage.getItem("activePeopleEmails") + "," + p.get("email") : p.get("email"));
                    countPeople = countPeople + 1;
                    sessionStorage.setItem("numberActivePeople", countPeople);
                } else {
                    console.log("Nenhuma pessoa encontrada!");
                }
            });
            if (sessionStorage.getItem("numberActivePeople") == 0) {
                sessionStorage.setItem("numberActivePeople", countPeople);
            }
            document.getElementById("numberPeople").innerHTML = sessionStorage.getItem("numberActivePeople");

            // Lista as depsesas
            let totalExpenses = 0.0; let amount = 0.0;
            Expense = new Parse.Query(Parse.Object.extend("Expense"));
            Expense.each(function(e){
                if(e){
                    addExpenseRow(
                        e.id,
                        e.get("title"), 
                        e.get("description"),
                        e.get("amount"),
                        e.get("paymentDate")
                    );

                    amount = e.get("amount");
                    amount = amount.replace("R$ ", "");
                    amount = amount.replace(",", ".");
                    totalExpenses += Number(amount);
                    sessionStorage.setItem("totalExpenses", String(totalExpenses.toFixed(2)).replace(".", ","));
                } else {
                    console.log("Nenhuma despesa encontrada!");
                }
            });
            if (sessionStorage.getItem("totalExpenses") != null) {
                document.getElementById("totalExpenses").innerHTML = "R$ " + sessionStorage.getItem("totalExpenses");
            }
            let defaultValue = 0.0;
            sessionStorage.setItem("totalExpenses", String(defaultValue.toFixed(2)).replace(".", ","));

            // Lista os pontos de distribuição
            let countDistrPoint = 0;
            DistribuitionPoint = new Parse.Query(Parse.Object.extend("DistribuitionPoint"));
            DistribuitionPoint.each(function(dp){
                if(dp){
                    addDistribuitionPointRow(
                        dp.id,
                        dp.get("name"), 
                        dp.get("nameMainPoint")
                    );
                    countDistrPoint = countDistrPoint + 1;
                    sessionStorage.setItem("numberDistrPoint", countDistrPoint);
                } else {
                    console.log("Nenhum ponto de distribuição encontrado!");
                }
            });
            if (sessionStorage.getItem("numberDistrPoint") == 0) {
                sessionStorage.setItem("numberDistrPoint", countDistrPoint);
            }
            document.getElementById("numberDistrPoint").innerHTML = sessionStorage.getItem("numberDistrPoint");

            // Atualiza a tabela
            if (sessionStorage.getItem("indexTypeActive") == null) {
                sessionStorage.setItem("indexTypeActive", 0);
            }else{
                changeActiveTable(sessionStorage.getItem("indexTypeActive"));
            }
            sessionStorage.removeItem('firstLoad');
        } catch (error) {
            console.log("Error: " + error.code + " " + error.message);    
        }
        Refresh();
    }
}

function changeActiveTable(index){
    switch (index) {
        case "0": // Person
            document.getElementById("sectionExpense").style.display     = "none";
            document.getElementById("sectionPerson").style.display      = "block";
            document.getElementById("sectionDistrPoint").style.display  = "none";
            sessionStorage.setItem("indexTypeActive", 0);
            break;
        case "1": // Expense
            document.getElementById("sectionExpense").style.display     = "block";
            document.getElementById("sectionPerson").style.display      = "none";
            document.getElementById("sectionDistrPoint").style.display  = "none";
            sessionStorage.setItem("indexTypeActive", 1);
            break;
        case "2":
            document.getElementById("sectionExpense").style.display     = "none";
            document.getElementById("sectionPerson").style.display      = "none";
            document.getElementById("sectionDistrPoint").style.display  = "block";
            sessionStorage.setItem("indexTypeActive", 2);
            break;
    }
}

async function onLoadRegisterExpense(){
    if (sessionStorage.getItem("hashUser") == null) {
        window.location.href = "index.html";    
    }else {
        if (sessionStorage.getItem("formExpenseAction") == "edit") {
            document.getElementById('title').value = sessionStorage.getItem("eTitle");
            document.getElementById('description').value = sessionStorage.getItem("eDescription");
            document.getElementById('amount').value = sessionStorage.getItem("eAmount");
            document.getElementById('paymentDate').value = sessionStorage.getItem("ePaymentDate");
        }else{
            document.getElementById('title').value = "";
            document.getElementById('description').value = "";
            document.getElementById('amount').value = "";
            document.getElementById('paymentDate').value = "";

            if (sessionStorage.getItem("firstLoad") == null){
                sessionStorage.setItem("firstLoad", "False");
                window.location.reload(true);
            }
        }
        document.getElementById('title').focus();
    }
}

function hiddeMenu(){
    if (document.getElementById("accordionSidebar").style.display == "none") {
        document.getElementById("accordionSidebar").style.display = "block";
        document.getElementById("accordionSidebarHidden").style.display = "none";
    }else{
        document.getElementById("accordionSidebar").style.display = "none";
        document.getElementById("accordionSidebarHidden").style.display = "block";
    }
}

async function onLoadRegisterDistrPoint(){
    if (sessionStorage.getItem("hashUser") == null) {
        window.location.href = "index.html";    
    }else {
        let dropSelect = document.getElementById("dropSelectDistrPoint");
        dropSelect.disabled = dropSelect.length <= 1;

        MainPoint = new Parse.Query(Parse.Object.extend("MainPoint"));
        MainPoint.each(function(mp){
            if(mp){
                var o = document.createElement("option");
                o.value = mp.id;
                o.text = mp.get("name");
                document.getElementById("dropSelectDistrPoint").appendChild(o);

                if (document.getElementById("dropSelectDistrPoint").disabled) {
                    document.getElementById("dropSelectDistrPoint").disabled = false; 
                }
            } else {
                console.log("Nenhum ponto principal encontrado!");
            }
        }).catch(function(error){
            console.log("Error: " + error.code + " " + error.message);       
        });

        if (sessionStorage.getItem("formDistrPointAction") == "edit") {
            document.getElementById('nameDistrPoint').value = sessionStorage.getItem("dpName");
            while (dropSelect.length <= 1) {
                await delay(1);
                document.getElementById("dropSelectDistrPoint").value = sessionStorage.getItem("dpIdMainPoint");
            }
        }else{
            document.getElementById('nameDistrPoint').value = "";
            document.getElementById('dropSelectDistrPoint')[0].selected = 'selected';

            if (sessionStorage.getItem("firstLoad") == null){
                sessionStorage.setItem("firstLoad", "False");
                window.location.reload(true);
            }
        }

        document.getElementById('nameDistrPoint').focus();
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
    document.getElementById('firstName').focus();
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

async function submitDistrPoint(){
    if (document.getElementById("nameDistrPoint").value.trim().length <= 0) {
        showAlert("#alertErrorDistrPoint");
    }else if (document.getElementById("dropSelectDistrPoint")[0].selected == 'selected') {
        showAlert("#alertErrorDistrPoint");
    }else{
        var drop = document.getElementById("dropSelectDistrPoint");
        if (sessionStorage.getItem("formDistrPointAction") == "edit") {
            var DistribuitionPoint = new Parse.Query(Parse.Object.extend("DistribuitionPoint"));
            DistribuitionPoint.equalTo("objectId", sessionStorage.getItem("dpId"));
            DistribuitionPoint.first().then(async function (dp) {
                if (dp) {
                    dp.set("name", document.getElementById("nameDistrPoint").value.trim());
                    dp.set("idMainPoint", document.getElementById("dropSelectDistrPoint").value.trim());
                    if (drop.selectedIndex > 0) {
                        dp.set("nameMainPoint", drop[drop.selectedIndex].textContent);
                    }
                    if (dp.save()) {
                        showAlert("#alertEditSucessDistrPoint");
                        document.getElementById("regDistrPoint").disabled = true;
                        await delay(1500); 
                        window.location.href = "main.html"; 
                    }else{
                        showAlert("#alertErrorDistrPoint");
                    }
                } else {
                    console.log("Não encontrou o ponto de distribuição ao editar.");
                }
            });
        }else {
            var DistribuitionPoint = Parse.Object.extend("DistribuitionPoint");

            dp = new DistribuitionPoint();
            dp.set("name", document.getElementById("nameDistrPoint").value.trim());
            dp.set("idMainPoint", document.getElementById("dropSelectDistrPoint").value.trim());
            if (drop.selectedIndex > 0) {
                dp.set("nameMainPoint", drop[drop.selectedIndex].textContent);
            }

            if (dp.save()){
                showAlert("#alertRegSucessDistrPoint");
                document.getElementById("nameDistrPoint").value = "";
                document.getElementById("dropSelectDistrPoint")[0].selected = 'selected';
                await delay(1500); 
                window.location.href = "main.html"; 
            }else{
                showAlert("#alertErrorDistrPoint");
                console.log('Error: ' + error.message);
            }
        }
    }
}

function submitExpense(){
    if (document.getElementById("title").value.trim().length <= 0) {
        showAlert("#alertErrorExpense");
    }else if (document.getElementById("amount").value.trim().length <= 0) {
        showAlert("#alertErrorExpense");
    }else if (!dataValidate(document.getElementById("paymentDate").value.trim())) {
        showAlert("#alertErrorExpense");
    }else{
        try {
            if (sessionStorage.getItem("formExpenseAction") == "edit") {
                var Expense = new Parse.Query(Parse.Object.extend("Expense"));
                Expense.equalTo("objectId", sessionStorage.getItem("eId"));
                Expense.first().then(async function (e) {
                    if (e) {
                        e.set("title", document.getElementById("title").value.trim());
                        e.set("description", document.getElementById("description").value.trim());
                        e.set("amount", document.getElementById("amount").value.trim());
                        e.set("paymentDate", document.getElementById("paymentDate").value.trim());
                        if (e.save()) {
                            showAlert("#alertEditSucessExpense");
                            document.getElementById("regExpense").disabled = true;
                            await delay(1500); 
                            window.location.href = "main.html"; 
                        }else{
                            showAlert("#alertErrorExpense");
                        }
                    } else {
                        console.log("Não encontrou a despesa ao editar.");
                    }
                });
            }else {
                var Expense = Parse.Object.extend("Expense");
                e = new Expense();
                e.set("title", document.getElementById("title").value.trim());
                e.set("description", document.getElementById("description").value.trim());
                e.set("amount", document.getElementById("amount").value.trim());
                e.set("paymentDate", document.getElementById("paymentDate").value.trim());

                if (e.save()){
                    showAlert("#alertRegSucessExpense");
                    // sendExpenseEmail(
                    //     "[" + sessionStorage.getItem("activePeopleEmails") + "]", 
                    //     document.getElementById("title").value, 
                    //     document.getElementById("amount").value, 
                    //     document.getElementById("paymentDate").value
                    // );
                    document.getElementById("title").value = "";
                    document.getElementById("description").value = "";
                    document.getElementById("amount").value = "";
                    document.getElementById("paymentDate").value = "";
                }else{
                    showAlert("#alertErrorExpense");
                    console.log('Error: ' + error.message);
                }
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
    }else if (document.getElementById("dropSelect")[0].selected == 'selected') {
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

function dataValidate(dtValue){
    const dt = new Date(dtValue);
    return dt instanceof Date && !isNaN(dt);
}

function sendExpenseEmail(recipients, title, amount, date) {
    try {
        const arrayRecipients = recipients.split(',');

        for (let i = 0; i < arrayRecipients.length; i++) {
            Email.send({
                Host: Decrypt(Host),
                Username: Decrypt(User),
                Password: Decrypt(Pass),
                To: arrayRecipients[i],
                From: Decrypt(User),
                Subject: "Nova despesa adicionada!",
                Body: "A despesa " + title + " foi cadastrada com o valor de " + amount + " e vencimento em " + date, 
                })
                .then(function (message) {
                    console.log("mail sent successfully - " + message)
                });   
        }
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