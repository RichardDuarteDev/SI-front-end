const apiUrl = 'https://localhost:7180/Cliente';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('form').addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const id = document.getElementById('clientId').value;
        const nome = document.getElementById('name').value;
        const cpf = document.getElementById('cpf').value;
        const dataNascimento = document.getElementById('dob').value;
        const sexo = document.getElementById('gender').value;
        const situacaoClienteId = document.getElementById('status').value;
        
        const clientData = {
            Nome: nome,
            Cpf: cpf,
            DataNascimento: dataNascimento,
            Sexo: sexo,
            SituacaoClienteId: parseInt(situacaoClienteId)
        };

        try {
            // Realiza o POST para criar um novo cliente
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(clientData)
            });
        
            // Verifica se a resposta foi bem-sucedida
            if (response.ok) {
                displayMessage('Salvo com sucesso', false);
            } else {
                // Lê a resposta do servidor e exibe uma mensagem de erro
                const errorData = await response.json();
                displayMessage(`Erro: ${errorData.message || 'Algo deu errado'}`, true);
            }
        } catch (error) {
            displayMessage('Erro: CPF JÁ CADASTRADO', true);
        }
    });
});

async function deleteClient(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Erro ao deletar cliente');
        }
        displayMessage('Cliente deletado com sucesso', false);
    } catch (error) {
        displayMessage('Algo deu errado ao deletar o cliente', true);
    }
}

function displayMessage(message, isError = false) {
    const messageBox = document.getElementById('message');
    messageBox.textContent = message;
    if (isError) {
        messageBox.className = 'error-message';
    } else {
        messageBox.className = 'success-message';
    }
}
