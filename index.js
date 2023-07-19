document.addEventListener("DOMContentLoaded", function () {
  let firstNameInput = document.querySelector("#firstNameInput");
  let lastNameInput = document.querySelector("#lastNameInput");
  let phoneInput = document.querySelector("#phoneInput");
  let photoInput = document.querySelector("#photoInput");
  let addButton = document.querySelector("#addButton");
  let contactList = document.querySelector("#contactList");

  addButton.addEventListener("click", function () {
    let firstName = firstNameInput.value;
    let lastName = lastNameInput.value;
    let phone = phoneInput.value;
    let photo = photoInput.value;

    let contact = {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      photo: photo,
    };
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    contacts.push(contact);

    localStorage.setItem("contacts", JSON.stringify(contacts));

    firstNameInput.value = "";
    lastNameInput.value = "";
    phoneInput.value = "";
    photoInput.value = "";

    renderContacts();
  });

  function renderContacts() {
    contactList.innerHTML = "";

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    contacts.forEach(function (contact, index) {
      const contactItem = document.createElement("div");
      contactItem.innerHTML = `
          <div>
            <img src="${contact.photo}" alt="${contact.firstName} ${contact.lastName}" width="100">
            <h3>${contact.firstName} ${contact.lastName}</h3>
            <p>${contact.phone}</p>
            <button class="editButton" data-index="${index}">Edit</button>
            <button class="deleteButton" data-index="${index}">Delete</button>
          </div>
        `;
      contactList.appendChild(contactItem);
    });

    const editButtons = document.getElementsByClassName("editButton");
    const deleteButtons = document.getElementsByClassName("deleteButton");

    Array.from(editButtons).forEach(function (button) {
      button.addEventListener("click", function () {
        const index = button.getAttribute("data-index");
        editContact(index);
      });
    });

    Array.from(deleteButtons).forEach(function (button) {
      button.addEventListener("click", function () {
        const index = button.getAttribute("data-index");
        deleteContact(index);
      });
    });
  }

  function editContact(index) {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    const contact = contacts[index];

    firstNameInput.value = contact.firstName;
    lastNameInput.value = contact.lastName;
    phoneInput.value = contact.phone;
    photoInput.value = contact.photo;

    contacts.splice(index, 1);

    localStorage.setItem("contacts", JSON.stringify(contacts));

    renderContacts();
  }

  function deleteContact(index) {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    contacts.splice(index, 1);

    localStorage.setItem("contacts", JSON.stringify(contacts));

    renderContacts();
  }

  renderContacts();
});
