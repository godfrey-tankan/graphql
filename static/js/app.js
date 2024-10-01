document.getElementById('fetchBtn').addEventListener('click', () => {
    const userType = document.getElementById('userType').value;
    const userInput = document.getElementById('userInput').value.trim();

    if (userInput === "") {
        alert("Please enter a User ID or Username");
        return;
    }

    let query = '';

    if (userType === 'id') {
        query = `
        query {
          userById(id: ${parseInt(userInput)}) {
            id
            username
            email
            profile {
              bio
              location
            }
          }
        }`;
    } else {
        query = `
        query {
          userByUsername(username: "${userInput}") {
            id
            username
            email
            profile {
              bio
              location
            }
          }
        }`;
    }

    // Log the query to ensure it's properly formatted
    console.log("GraphQL Query:", query);

    fetch('/graphql/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),  // Ensure this is valid JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log("GraphQL Response:", data);  // Log the full response
        const user = data.data.userById || data.data.userByUsername;
    
        if (user) {
            document.getElementById('userInfo').classList.remove('hidden');
            document.getElementById('errorMessage').classList.add('hidden');
            document.getElementById('userId').textContent = user.id;
            document.getElementById('username').textContent = user.username;
            document.getElementById('email').textContent = user.email;
        } else {
            document.getElementById('userInfo').classList.add('hidden');
            document.getElementById('errorMessage').classList.remove('hidden');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('errorMessage').classList.remove('hidden');
    });
});
