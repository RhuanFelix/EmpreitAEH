import { obrasDataset } from './dataset.js';

function loadLocalStorage() {
  let obrasLocalStorage = localStorage.getItem('obras');
  if (obrasLocalStorage == null) {
    localStorage.setItem('obras', JSON.stringify(obrasDataset));
    obrasLocalStorage = localStorage.getItem('obras');
  }
  return JSON.parse(obrasLocalStorage);
}

const loadObraTable = () => {
  let obrasTable = document.getElementById('obras');

  let obras = loadLocalStorage();
  for (const obra of obras) {
    obrasTable.insertAdjacentHTML('beforeend', getRowObraTable(obra));
  }
};

const getRowObraTable = (obra) => {
  return `<tr>
    <td>${obra.id}</td>
    <td>${obra.tipoDeConstrucao}</td>
    <td>${obra.cliente}</td>
    <td>${obra.logradouro}</td>
    <td>${obra.bairro}</td>
    <td>${obra.cidade}</td>
    <td>${obra.estado}</td>
  </tr>`;
};

function clearForm(form) {
  $(':input', form).each(function () {
    var type = this.type;
    var tag = this.tagName.toLowerCase(); 
    if (type == 'text' || type == 'password' || tag == 'textarea') this.value = '';
    else if (type == 'checkbox' || type == 'radio') this.checked = false;
    else if (tag == 'select') this.selectedIndex = -1;
  });
}

let obraForm = document.getElementById('obraForm'); 

$('#clienteModal').on('hidden.bs.modal', () => {
  clearForm(obraForm);
});

obraForm.onsubmit = (event) => {
  event.preventDefault();

  let obraFormData = new FormData(obraForm);

  let obra = Object.fromEntries(obraFormData);

  let obras = loadLocalStorage();
  obra.id = obras.length + 1;
  obras.push(obra);
  localStorage.setItem('obras', JSON.stringify(obras));

  let obrasTable = document.getElementById('obras');
  obrasTable.insertAdjacentHTML('beforeend', getRowObraTable(obra));

  Toastify({
    text: 'Obra cadastrada com sucesso!',
    className: 'success',
  }).showToast();

  clearForm(obraForm);

  $('#clienteModal').modal('hide');
};

loadObraTable();