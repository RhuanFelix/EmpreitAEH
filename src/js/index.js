import { clientesDataset } from './dataset.js';

function loadLocalStorage() {
  let clientesLocalStorage = localStorage.getItem('clientes');
  if (clientesLocalStorage == null) {
    localStorage.setItem('clientes', JSON.stringify(clientesDataset));
    clientesLocalStorage = localStorage.getItem('clientes');
  }
  return JSON.parse(clientesLocalStorage);
}

const loadClienteTable = () => {
  let clientesTable = document.getElementById('clientes');

  let clientes = loadLocalStorage();
  for (const cliente of clientes) {
    clientesTable.insertAdjacentHTML('beforeend', getRowClienteTable(cliente));
  }
};

const getRowClienteTable = (cliente) => {
  return `<tr>
    <td>${cliente.id}</td>
    <td>${cliente.nome}</td>
    <td>${cliente.email}</td>
    <td>${cliente.cpf}</td>
  </tr>`;
};

function clearForm(form) {
  $(':input', form).each(function () {
    var type = this.type;
    var tag = this.tagName.toLowerCase();
    if (type == 'text' || type == 'password' || type == 'email' || tag == 'textarea') this.value = '';
    else if (type == 'checkbox' || type == 'radio') this.checked = false;
    else if (tag == 'select') this.selectedIndex = -1;
  });
}

let clienteForm = document.getElementById('clienteForm');

$('#clienteModal').on('hidden.bs.modal', () => {
  clearForm(clienteForm);
});

clienteForm.onsubmit = (event) => {
  event.preventDefault();

  let clienteFormData = new FormData(clienteForm);

  let cliente = Object.fromEntries(clienteFormData);

  let clientes = loadLocalStorage();
  cliente.id = clientes.length + 1;
  clientes.push(cliente);
  localStorage.setItem('clientes', JSON.stringify(clientes));

  let clientesTable = document.getElementById('clientes');
  clientesTable.insertAdjacentHTML('beforeend', getRowClienteTable(cliente));

  Toastify({
    text: 'Cliente cadastrado com sucesso!',
    className: 'success',
  }).showToast();

  $('#clienteModal').modal('hide');
};

loadClienteTable();