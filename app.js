// URL for the json-server API
const apiUrl = 'http://localhost:3000/users';

// Function to fetch and display users when the page loads
document.addEventListener('DOMContentLoaded', () => {
  fetchUsers();
});

// Function to fetch users from the API
async function fetchUsers() {
  try {
    const response = await fetch(apiUrl); // Fetch the list of users
    const users = await response.json(); // Parse the response as JSON
    displayUsers(users); // Display the users in the list
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

// Function to display users in the list
function displayUsers(users) {
  const userList = document.getElementById('userList');
  userList.innerHTML = ''; // Clear the user list

  users.forEach(user => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    li.innerHTML = `
        ${user.name} (${user.email})
    `;
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteUser(user.id)); // Bind the function here
    li.appendChild(deleteButton); // Append the button to the list item
    userList.appendChild(li); // Append the user to the list
});

}

// Function to handle form submission to create a new user
document.getElementById('userForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent the form from submitting normally

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  // Create a new user object
  const newUser = { name, email };

  try {
    // Send a POST request to create the new user
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });

    // If the request is successful, fetch and display the updated user list
    if (response.ok) {
      fetchUsers(); // Refresh user list
    } else {
      console.error('Error adding user:', response.statusText);
    }

  } catch (error) {
    console.error('Error adding user:', error);
  }

  // Clear the form fields after submission
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
});

// Function to delete a user
async function deleteUser(id) {
  console.log('Deleting user with ID:', id); // Check the id being deleted
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchUsers(); // Refresh user list
    } else {
      console.error("Error deleting user:", response.statusText);
    }
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}
