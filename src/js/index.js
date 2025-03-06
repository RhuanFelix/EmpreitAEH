import {clientesDataset} from './dataset.js'

function loadLocalStorage() {
    let clientesLocalStorage = localStorage.getItem("clientes");
    if (clientesLocalStorage == null) {
        console.log("Carregando localStorage");
        localStorage.setItem("clientes", JSON.stringify(clientesDataset));
        clientesLocalStorage = JSON.parse(localStorage.getItem("clientes"));
    }
    return JSON.parse(clientesLocalStorage);
}

let clientesTable = document.getElementById("clientes");
function renderTable() {
    clientesTable.innerHTML = `
        <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">E-mail</th>
            <th scope="col">CPF</th>
        </tr>
    `;
    for (let element of loadLocalStorage()) {
        clientesTable.insertAdjacentHTML('beforeend', `
            <tr>
                <td>${element.id}</td>
                <td>${element.nome}</td>
                <td>${element.email}</td>
                <td>${element.cpf}</td>
            </tr>
        `);
    }
}

renderTable();

let clienteForm = document.getElementById("clienteForm");
clienteForm.onsubmit = (event) => {
    event.preventDefault();
    console.log("Submeteu o formulário");
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let cpf = document.getElementById("cpf").value;
    
    let clientes = loadLocalStorage();
    let id = clientes.length + 1;
    let novoCliente = { id, nome, email, cpf };
    clientes.push(novoCliente);
    
    localStorage.setItem("clientes", JSON.stringify(clientes));
    renderTable();
};
