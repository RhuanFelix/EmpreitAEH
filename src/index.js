let dataset = [
    {
        nome:"José da Silva",
        email:"js@mail.com",
        cpf:"242.914.460-39"
    },
    {
        nome:"Maria Alencar",
        email:"ma@mail.com",
        cpf:"656.753.760-46"
    }
]

let clientesTable = document.getElementById("clientes");
for (let element of dataset) {
    clientesTable.insertAdjacentHTML('beforeend', `
        <td></td>
        <td>${element.nome}</td>
        <td>${element.email}</td>
        <td>${element.cpf}</td>
        `);
}