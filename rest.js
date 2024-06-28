const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

document.getElementById('getAllPosts').addEventListener('click', getAllPosts);
document.getElementById('getPost10').addEventListener('click', getPost10);
document.getElementById('createPost').addEventListener('click', createPost);
document.getElementById('replacePost12').addEventListener('click', replacePost12);
document.getElementById('updatePost12').addEventListener('click', updatePost12);
document.getElementById('deletePost12').addEventListener('click', deletePost12);

function clearOutput() {
    document.getElementById('output').innerHTML = '';
}

function renderResult(result) {
    const output = document.getElementById('output');
    const pre = document.createElement('pre');
    pre.textContent = JSON.stringify(result, null, 2);
    output.appendChild(pre);
}

function getAllPosts() {
    clearOutput();
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => renderResult(data))
        .catch(error => console.error('Error:', error));
}

function getPost10() {
    clearOutput();
    fetch(`${apiUrl}/10`)
        .then(response => response.json())
        .then(data => renderResult(data))
        .catch(error => console.error('Error:', error));
}

function createPost() {
    clearOutput();
    const newPost = {
        title: 'foo',
        body: 'bar',
        userId: 1
    };
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Created Post ID:', data.id);
        renderResult(data);
    })
    .catch(error => console.error('Error:', error));
}

function replacePost12() {
    clearOutput();
    const updatedPost = {
        id: 12,
        title: 'Updated Title',
        body: 'Updated body content',
        userId: 1
    };
    fetch(`${apiUrl}/12`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPost)
    })
    .then(response => response.json())
    .then(data => renderResult(data))
    .catch(error => console.error('Error:', error));
}

function updatePost12() {
    clearOutput();
    const partialUpdate = {
        title: 'Partially Updated Title'
    };
    fetch(`${apiUrl}/12`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(partialUpdate)
    })
    .then(response => response.json())
    .then(data => renderResult(data))
    .catch(error => console.error('Error:', error));
}

function deletePost12() {
    clearOutput();
    fetch(`${apiUrl}/12`, {
        method: 'DELETE'
    })
    .then(() => {
        renderResult({ message: 'Post with ID 12 has been deleted successfully.' });
    })
    .catch(error => console.error('Error:', error));
};