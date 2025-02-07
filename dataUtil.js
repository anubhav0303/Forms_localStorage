const nameInput1=document.querySelector('#nameinput');
const mailInput1=document.querySelector('#emailinput');
const phoneInput1=document.querySelector('#phoneinput');
const form=document.querySelector('#myForm');
const tableDOM=document.querySelector('#table')
const tableBody = document.querySelector('#tBody');

console.log(form)

let contacts = localStorage.getItem('contacts')
contacts = contacts ? JSON.parse(contacts) : []
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
    localStorage.setItem('contacts', JSON.stringify(contacts))
    form.reset()

    // createTR(contact.id,contact.name)
    tableBody.innerHTML=''
    drawContactTable()

    /* localStorage.setItem('name', nameInput1.value);
    localStorage.setItem('mail', mailInput1.value);
    localStorage.setItem('phone', phoneInput1.value); */
}
function createTR(id,name,mail,phone){
    const contactTR= document.createElement("tr");

    const idTD = document.createElement("td");
    idTD.innerHTML = id;
    
    const nameTD = document.createElement("td");
    nameTD.innerHTML = name;
    
    const mailTD = document.createElement("td");
    mailTD.innerHTML = mail;
    
    const phoneTD = document.createElement("td");
    phoneTD.innerHTML = phone;

    const actiondTD=document.createElement('td')
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

        contactTR.remove();
        if (contacts.length === 0) {
            nextId = 1;
            localStorage.setItem("contactsNextId", nextId);
        }
    };
    
}
// createTR(1,'anu','asd@fasdk','2131231')
function drawContactTable () { 
        for (const contact of contacts) {
        console.log(contact);
            createTR(contact.id, contact.name, contact.mail, contact.phone)
    }
}
drawContactTable()

