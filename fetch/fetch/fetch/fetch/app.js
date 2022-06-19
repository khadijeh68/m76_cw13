const API_URL = 'https://62ac4c1a9fa81d00a7ae52be.mockapi.io/api/list/infos';
const infoTable = document.querySelector('#infos tbody');

//GET
function getData() {
   fetch(API_URL).then(response => response.json())
    .then(data => {data.forEach(addToDom)});
}

//EVENT Listener
document.addEventListener('DOMContentLoaded', function() {
    getData();
});

//ADD TO DOM
function addToDom(info){
    const tr = document.createElement('tr');
    tr.dataset.id = info.id;
    const {statusCell , descriptionCell, deleteCell } = generateTableCells(info);
    tr.appendChild(statusCell);
    tr.appendChild(descriptionCell);
    tr.appendChild(deleteCell);
    infoTable.appendChild(tr);
}

function generateTableCells(info){
    const statusCell = document.createElement('td');
    let input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.checked = info.status;
    input.style = 'width: 15px; height: 15px; background-color: #000; display: block; content: ""; float: left; margin-right: 5px;';
    input.onchange = (e) => updateStatus(e.target.checked , info.id);
    statusCell.appendChild(input);

    const descriptionCell = document.createElement('td');
    descriptionCell.innerHTML = info.description;

    const deleteCell = document.createElement('td');
    const btn = document.createElement('button');
    btn.innerHTML = 'Delete';
    btn.style = "background-color:red; color: #fff; border:none; border-radius:4px;padding: 4px, 5px;"
    btn.onclick = () =>{
        deleteRow(info.id);
    }
    deleteCell.appendChild(btn);
    return {statusCell , descriptionCell, deleteCell}; 
}

//CREATE
function createInfo(){
    const desInput = document.querySelector('#description').value;
    let body = {status: false , description: desInput};
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(body),
    })  
        .then(response => response.json())
        .then (data => addToDom(data))
        .catch(error => console.log(error.response));      
}  

//deleteRow function
function deleteRow(id){
   return fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },

})  
    .then(response => response.json())
    .then (data => {
        const productRow = infoTable.querySelector(`tr[data-id="${id}"]`)
        productRow.innerHTML = " " })
    .catch(error => console.log(error.response));   
}

//UPDATE
function updateStatus(status , id){
    let body = {status: status};
    return fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json', 
        },
        body: JSON.stringify(body),
    })  
        .then(response => response.json())
        .then (data => console.log("update success"))
        .catch(error => console.log(error.response));    
}