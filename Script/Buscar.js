const apiUrl = 'https://localhost:7180/Cliente';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const id = document.getElementById('searchId').value;
        
        try {
            const response = await fetch(`${apiUrl}/${id}`);
            if (!response.ok) {
                throw new Error('Cliente não encontrado');
            }
            const client = await response.json();
            displaySearchResult(client);
        } catch (error) {
            displayMessage('Erro: Cliente não encontrado', true);
        }
    });
});

function displayMessage(message, isError = false) {
    const messageBox = document.getElementById('message');
    messageBox.textContent = message;
    if (isError) {
        messageBox.className = 'error-message';
    } else {
        messageBox.className = 'success-message';
    }
}

function displaySearchResult(client) {
    const searchResult = document.getElementById('searchResult');
    searchResult.innerHTML = `
        <p>ID: ${client.id}</p>
        <p>Nome: ${client.nome}</p>
        <p>CPF: ${client.cpf}</p>
        <p>Data de Nascimento: ${client.dataNascimento}</p>
        <p>Sexo: ${client.sexo}</p>
        <p>Status: ${client.situacaoClienteId}</p>
    `;
}
