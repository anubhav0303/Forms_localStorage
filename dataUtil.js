const nameInput1=document.querySelector('#nameinput');
const mailInput1=document.querySelector('#emailinput');
const phoneInput1=document.querySelector('#phoneinput');
const form=document.querySelector('#myForm');
const tableDOM=document.querySelector('#table')
const submitDOM=document.querySelector('#submitbtn')
const saveDOM=document.querySelector('#savebtn')
const cancelDOM=document.querySelector('#cancelbtn')
const tableBody = document.querySelector('#tBody');

console.log(form)

let contacts_fromLocalStorage = localStorage.getItem('localstorage_contacts')
console.log(contacts_fromLocalStorage);
let contacts = contacts_fromLocalStorage  ? JSON.parse(contacts_fromLocalStorage ) : []
console.log(contacts)

let nextId = parseInt(localStorage.getItem('contactsNextId')) || 1

let addContact = (e) => {
    e.preventDefault();
    let contact = {
        id: nextId,
        mail: mailInput1.value,
        phone: phoneInput1.value
    }
    nextId++
    localStorage.setItem('contactsNextId', nextId)
    contact.name = form.elements.nameinput.value
    contacts.push(contact) 
    localStorage.setItem('localstorage_contacts', JSON.stringify(contacts))
    form.reset()

    // createTR(contact.id,contact.name)
    redrawTable()

    /* localStorage.setItem('name', nameInput1.value);
    localStorage.setItem('mail', mailInput1.value);
    localStorage.setItem('phone', phoneInput1.value); */
}
function createTR(index, id, name, mail, phone){
    const contactTR= document.createElement("tr");

    const idTD = document.createElement("td");
    idTD.innerHTML = id;
    
    const nameTD = document.createElement("td");
    nameTD.innerHTML = name;
    
    const mailTD = document.createElement("td");
    mailTD.innerHTML = mail;
    
    const phoneTD = document.createElement("td");
    phoneTD.innerHTML = phone;

    // const actiondTD=document.createElement('td')
    const editTD = document.createElement("td");
    editTD.innerHTML = "✏️";
    editTD.style.cursor = "pointer";
    const deleteTD=document.createElement('td')
    deleteTD.innerHTML='🗑️'
    deleteTD.style.cursor = "pointer";
    // deleteTD.style.hover.color = "blue";
    // deleteTD.style.display='block';

    contactTR.appendChild(idTD);
    contactTR.appendChild(nameTD);
    contactTR.appendChild(mailTD);
    contactTR.appendChild(phoneTD);
    contactTR.appendChild(editTD);
    contactTR.appendChild(deleteTD);
    tableBody.appendChild(contactTR);

    deleteTD.onclick = function () {
        
        contacts.splice(index,1)
        console.log(contacts);

        localStorage.setItem('localstorage_contacts', JSON.stringify(contacts));       
        redrawTable()
    };
    editTD.onclick=function(){
        nameInput1.value = contacts[index].name;
        mailInput1.value = contacts[index].mail;
        phoneInput1.value = contacts[index].phone;
        
        submitDOM.style.display = 'none';       
        saveDOM.style.display = 'inline-block';   
        cancelDOM.style.display = 'inline-block';
        // form.reset();
        redrawTable() 
    
            saveDOM.onclick = function () {
            contacts[index].name = nameInput1.value;
            contacts[index].mail = mailInput1.value;
            contacts[index].phone = phoneInput1.value;
            localStorage.setItem('localstorage_contacts', JSON.stringify(contacts));
            // form.reset();
            redrawTable()
            }

            cancelDOM.onclick = function () {
            // form.reset();
            submitDOM.style.display = 'inline-block';
            saveDOM.style.display = 'none';
            cancelDOM.style.display = 'none';
            redrawTable()
            }
    }
}
// createTR(1,'anu','asd@fasdk','2131231')
function drawContactTable () { 
    for (const index in contacts) {
        const contact = contacts[index];
        console.log(contact);
        createTR(index, contact.id, contact.name, contact.mail, contact.phone);
    }
}
drawContactTable()

function redrawTable(){
    tableBody.innerHTML=''
    drawContactTable()
}