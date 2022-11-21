$(async function () {
    await getUsersTable();
});

async function getData(url) {
    const response = await fetch(url)
    return await response.json();
}

async function getUsersTable() {
    const allUsersResponse = getData(`/api/users`);
    $('#allUserTable').empty();
    allUsersResponse.then(data => {
        data.forEach(user => {
            let userRow = `$(
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.firstName}</td>
                            <td>${user.lastName}</td>
                            <td>${user.age}</td>                         
                            <td>${user.email}</td>
                            <td>${user.roles.map(role => " " + role.role.substring(5))}</td>
                            <td>
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" id="buttonEdit"
                                data-action="edit" data-id="${user.id}" data-bs-target="#editUserModal" onclick="getEditModalData(${user.id})">Edit</button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-danger" data-bs-toggle="modal" id="buttonDelete"
                                data-action="delete" data-id="${user.id}" data-bs-target="#deleteUserModal" onclick="getDeleteModalData(${user.id})">Delete</button>
                            </td>
                        </tr>)`;
            $('#allUserTable').append(userRow);
        })
    })

}

async function getDeleteModalData(id) {
    await getData(`/api/users/` + id).then(user => {

        let formDelete = document.forms["formDeleteUser"];

        formDelete.id.value = user.id;
        formDelete.firstName.value = user.firstName;
        formDelete.lastName.value = user.lastName;
        formDelete.age.value = user.age;
        formDelete.email.value = user.email;
        $('#rolesDelete').empty();
        let i = 0;
        user.roles.map(role => {
                formDelete.selectRoles.options[i++] = new Option(role.role.substring(5), `${role.id}`);
            }
        );
    })
}

async function deleteUser() {
    document.forms["formDeleteUser"].addEventListener("submit", ev => {
        ev.preventDefault();
        $('#deleteFormCloseButton').click();
    })
    await fetch("/api/users/" + document.forms["formDeleteUser"].id.value, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        $('#' + getUsersTable().id).remove(res);
    })
    //await getUsersTable();
}

async function getEditModalData(id) {
    await getData(`/api/users/` + id).then(async user => {

        let formEdit = document.forms["formEditUser"];

        formEdit.id.value = user.id;
        formEdit.firstName.value = user.firstName;
        formEdit.lastName.value = user.lastName;
        formEdit.age.value = user.age;
        formEdit.email.value = user.email;
        formEdit.password.value = user.password;
        $('#rolesEdit').empty();
        let i = 0;
        await getData("/api/roles").then((data) => {
            data.forEach(role => {
                formEdit.selectRoles.options[i] = new Option();
                formEdit.selectRoles.options[i].text = role.role.substring(5);
                formEdit.selectRoles.options[i].value = role.id;
                i++;
            })
        });
    })
}

async function editUser() {
    document.forms["formEditUser"].addEventListener("submit", ev => {
        ev.preventDefault();
    })

    let formEdit = document.forms["formEditUser"];
    let options = formEdit.selectRoles.options;
    let roles = [];
    for (let i in options) {
        if (options[i].selected) {
            roles.push({
                id: options[i].value,
                name: options[i].text
            })
        }
    }
    let user = {
        id: formEdit.id.value,
        firstName: formEdit.firstName.value,
        lastName: formEdit.lastName.value,
        age: formEdit.age.value,
        email: formEdit.email.value,
        password: formEdit.password.value,
        roles: roles
    }
    await fetch("/api/users/" + document.forms["formEditUser"].id.value, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(() => {
        $('#' + getUsersTable().id).appendChild(document);
    });
    //await getUsersTable();
}

async function getNewUserRolesField() {
    $('#rolesInput').empty();
    let i = 0;
    await getData("/api/roles").then((data) => {
        data.forEach(role => {
            document.forms["formNewUser"].selectRoles.options[i] = new Option();
            document.forms["formNewUser"].selectRoles.options[i].text = role.role.substring(5);
            document.forms["formNewUser"].selectRoles.options[i].value = role.id;
            i++;
        })
    });
}

document.forms["formNewUser"].addEventListener('submit', addNewUser);

async function addNewUser(event) {
    event.preventDefault();

    let formAddNew = document.forms["formNewUser"];
    let options = formAddNew.selectRoles.options;
    let roles = [];
    for (let i in options) {
        if (options[i].selected) {
            roles.push({
                id: options[i].value,
                name: options[i].text
            })
        }
    }
    let user = {
        id: formAddNew.id.value,
        firstName: formAddNew.firstNameInput.value,
        lastName: formAddNew.lastNameInput.value,
        age: formAddNew.ageInput.value,
        email: formAddNew.emailInput.value,
        password: formAddNew.passwordInput.value,
        roles: roles
    }
    console.log(user);
    await fetch("/api/users", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    await getUsersTable();
    $('#users-table-tab').click();
    formAddNew.reset();
}