$(async function () {
    await getUser();
});

async function getUser() {
    $('#userTable').empty()
    await fetch("api/user")
        .then(res => res.json())
        .then(user => {
            let roles = user.roles.map(role => " " + role.role.substring(5));
            $('#navbarEmail').append(user.email);
            $('#navbarRoles').append(roles);

            let out = `$(
            <tr>
                <td>${user.id}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.age}</td>
                <td>${user.email}</td>
                <td>${roles}</td>)`;
            $('#userTable').append(out);
        })
}

