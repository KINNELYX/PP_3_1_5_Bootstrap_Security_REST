/*
const userList = document.querySelector('#userTable tbody');
let out = '';

$(async function () {
    await loadUser();
});

async function loadUser() {
    fetch("/api/admin/users")
        .then(r => r.json())
        .then(data => {

            out += `
            <tr>
                <td>${data.id}</td>
                <td>${data.firstName}</td>
                <td>${data.lastName}</td>
                <td>${data.age}</td>
                <td>${data.email}</td>
                <td>${data.roles.map(role => role.role.substring(5) + " ")}</td>`;


        });
    userList.innerHTML = out;
}
*/
