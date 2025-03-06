import { obrasDataset } from './dataset.js';

function loadLocalStorage() {
    let obrasLocalStorage = localStorage.getItem("obras");
    if (obrasLocalStorage == null) {
        console.log("Carregando localStorage");
        localStorage.setItem("obras", JSON.stringify(obrasDataset));
        obrasLocalStorage = localStorage.getItem("obras");
    }
    return JSON.parse(obrasLocalStorage);
}

let obrasTable = document.getElementById("obras");
function renderTable() {
    obrasTable.innerHTML = `
        <tr>
            <th scope="col">#</th>
            <th scope="col">Tipo de Construção</th>
            <th scope="col">Cliente</th>
            <th scope="col">Logradouro</th>
            <th scope="col">Bairro</th>
            <th scope="col">Cidade</th>
            <th scope="col">Estado</th>
        </tr>
    `;
    for (let element of loadLocalStorage()) {
        obrasTable.insertAdjacentHTML('beforeend', `
            <tr>
                <td>${element.id}</td>
                <td>${element.tipoDeConstrucao}</td>
                <td>${element.cliente}</td>
                <td>${element.logradouro}</td>
                <td>${element.bairro}</td>
                <td>${element.cidade}</td>
                <td>${element.estado}</td>
            </tr>
        `);
    }
}

renderTable();

let obraForm = document.getElementById("obraForm");
obraForm.onsubmit = (event) => {
    event.preventDefault();
    console.log("Submeteu o formulário");
    
    let tipoDeConstrucao = document.getElementById("TipoDeConstrucao").value;
    let cliente = document.getElementById("cliente").value;
    let logradouro = document.getElementById("logradouro").value;
    let bairro = document.getElementById("bairro").value;
    let cidade = document.getElementById("cidade").value;
    let estado = document.getElementById("estado").value;
    
    let obras = loadLocalStorage();
    let id = obras.length + 1;
    let novaObra = { id, tipoDeConstrucao, cliente, logradouro, bairro, cidade, estado };
    obras.push(novaObra);
    
    localStorage.setItem("obras", JSON.stringify(obras));
    renderTable();
};
