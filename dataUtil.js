const nameInput1=document.querySelector('#nameinput');
const mailInput1=document.querySelector('#emailinput');
const phoneInput1=document.querySelector('#phoneinput');
const form=document.querySelector('#myForm');
const tableDOM=document.querySelector('#table')
console.log(form)

/* if(localStorage.getItem('name')){
    nameInput1.value=localStorage.getItem('name');
    nameDom.style.top = '-20px'; 
}
if(localStorage.getItem('mail')){
    mailInput1.value=localStorage.getItem('mail');
    mailDom.style.top = '-20px';
}
if(localStorage.getItem('phone')){
    phoneInput1.value=localStorage.getItem('phone');
    phoneDom.style.top = '-20px'; 
} */

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
    tableDOM.innerHTML=''
    drawContactTable()

    /* localStorage.setItem('name', nameInput1.value);
    localStorage.setItem('mail', mailInput1.value);
    localStorage.setItem('phone', phoneInput1.value); */
}
function createTR(id,name,mail,phone){
    const contactTR= document.createElement("tr");
    
    const idTR=document.createElement("td");
    idTR.innerHTML=id;

    const nameTR=document.createElement("td");
    nameTR.innerHTML=name

    const mailTR=document.createElement("td");
    mailTR.innerHTML=mail
    const phoneTR=document.createElement("td");
    phoneTR.innerHTML=phone

    // contactTR.appendChild(idTD);
    contactTR.appendChild(nameTR);
    contactTR.appendChild(mailTR);
    contactTR.appendChild(phoneTR);
    
    tableDOM.appendChild(contactTR);

}
// createTR(1,'anu','asd@fasdk','2131231')
function drawContactTable () { 
        for (const contact of contacts) {
        console.log(contact);
            createTR(contact.id, contact.name, contact.mail, contact.phone)
    }
}
drawContactTable()

