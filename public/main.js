const openModal = () => {
    const modal = document.getElementById('modal');
    modal.classList.add('active');
};

const closedModal = () => {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
    document.getElementById('clientId').value = '';
};

const createClient = async (client) => {
    const response = await fetch('/clients/createClient/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(client)
    });
    return response.json();
};

const readAllClients = async () => {
    const response = await fetch('/clients/');
    return response.json();
};

const readClient = async (id) => {
    const response = await fetch(`/clients/client/${id}`);
    return response.json();
}

const edit = async (client, id) => {
    const response = await fetch(`/clients/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(client)
    });
    return response.json();
};

const deleteClient = async (id) => {
    try{
        await fetch(`/clients/${id}`, {
            method : 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
    }catch(e) {
        console.log(e);
    }
};

const saveClient = async () => {
    const client = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        celular: document.getElementById('celular').value,
        cidade: document.getElementById('cidade').value
    };

    const clientId = document.getElementById('clientId').value;

    try {
        if (clientId) {
            // Atualizar cliente existente
            const updatedClient = await edit(client, clientId);
            updateRow(updatedClient, clientId);
        } else {
            // Criar novo cliente
            const createdClient = await createClient(client);
            createRow(createdClient, createdClient._id);
        }
        closedModal();
    } catch (e) {
        console.log(e);
    };
};

const createRow = (client, id) => {
    const tbody = document.getElementById('tbody');
    const tr = document.createElement('tr');
    tr.setAttribute('id', `row-${id}`);
    tr.innerHTML = ` 
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" onclick="editar('${id}')" id='edit-${id}'>editar</button>
            <button type="button" class="button red" onclick="excluir(${id})" id='delete-${id}'>excluir</button>
        </td>`;
    tbody.appendChild(tr);
};

const updateRow = (client, id) => {
    const row = document.getElementById(`row-${id}`);
    row.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" onclick="editar('${id}')" id='edit-${id}'>editar</button>
            <button type="button" class="button red" onclick="excluir('${id}')" id='delete-${id}'>excluir</button>
        </td>`;
};

const updateTable = async () => {
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = '';
    const clients = await readAllClients();
    clients.forEach(client => {
        createRow(client, client._id);
    });
};

const editar = async (id) => {
    openModal();
    const client = await readClient(id);
    document.getElementById('nome').value = client.nome;
    document.getElementById('email').value = client.email;
    document.getElementById('celular').value = client.celular;
    document.getElementById('cidade').value = client.cidade;
    document.getElementById('clientId').value = client._id;
};

const excluir = async (id) => {
    
    await deleteClient(id);
    updateTable();
};

updateTable();

document.getElementById('cadastrarCliente').addEventListener('click', openModal);
document.getElementById('modalClose').addEventListener('click', closedModal);
document.getElementById('cancelar').addEventListener('click', closedModal);
document.getElementById('salvar').addEventListener('click', saveClient);
