function validateForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    var errorMessages = "";

    if (name == "") {
        errorMessages += "Name is required.<br>";
    }

    if (email == "") {
        errorMessages += "Email is required.<br>";
    } else {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            errorMessages += "Invalid email address.<br>";
        }
    }

    if (message == "") {
        errorMessages += "Message is required.<br>";
    }

    if (errorMessages !== "") {
        document.getElementById("errorMessages").innerHTML = errorMessages;
        return false;
    }

    return true;
}

document.addEventListener('DOMContentLoaded', function () {
    // Load existing data from localStorage on page load
    loadTableData();

    // Submit form function
    window.submitForm = function () {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const contact = document.getElementById('contact').value;

        if (name.trim() === '' || email.trim() === '' || contact.trim() === '') {
            alert('Please fill in all fields');
            return;
        }

        const user = { name, email, contact };

        // Save user data to localStorage
        saveUserData(user);

        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('contact').value = '';

        // Reload table data
        loadTableData();
    };

    // Function to save user data to localStorage
    function saveUserData(user) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Function to load and display table data from localStorage
    function loadTableData() {
        const table = document.getElementById('userTable');
        table.innerHTML = '<tr><th>Name</th><th>Email</th><th>Contact</th><th>Action</th></tr>';
    
        const users = JSON.parse(localStorage.getItem('users')) || [];
    
        users.forEach((user, index) => {
            const row = table.insertRow(-1);
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3); // Action cell
    
            cell1.textContent = user.name;
            cell2.textContent = user.email;
            cell3.textContent = user.contact;
    
            // Add Edit and Delete buttons for every row
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit ';
            editButton.onclick = function () {
                editUser(index);
            };
    
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function () {
                deleteUser(index);
            };
    
            cell4.appendChild(editButton);
            cell4.appendChild(deleteButton);
        });
    }

    // Function to edit user data
    function editUser(index) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userToEdit = users[index];

        // Populate form with user data for editing
        document.getElementById('name').value = userToEdit.name;
        document.getElementById('email').value = userToEdit.email;
        document.getElementById('contact').value = userToEdit.contact;

        // Remove the user from the array
        users.splice(index, 1);

        // Update localStorage with the modified user list
        localStorage.setItem('users', JSON.stringify(users));

        // Reload table data
        loadTableData();
    }

    // Function to delete user data
    function deleteUser(index) {
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Remove the user from the array
        users.splice(index, 1);

        // Update localStorage with the modified user list
        localStorage.setItem('users', JSON.stringify(users));

        // Reload table data
        loadTableData();
    }
});
