fetch("/api/admin/users")
    .then(function (response) {
        return response.json();
    })
    .then(function (users) {
        let placeholder = document.querySelector("#userTable");
        let out = "";
        for (let user of users) {
            out += `
    <tr>
        <td>${user.id}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
        <td>${user.age}</td>
        <td>${user.role}</td>
        <td>Edit</td>
        <td>Delete</td>
    </tr>

        `;
        }
        placeholder.innerHTML = out;
    })