const apiUrl = 'https://localhost:7180/Cliente';

document.addEventListener('DOMContentLoaded', () => {
    // Ajusta o estilo do cabeçalho
    const header = document.querySelector('header');
    if (header) {
        header.style.backgroundColor = 'black';
        header.style.color = 'white'; // Cor do texto no cabeçalho
        header.style.margin = '0'; // Remove a margem
        header.style.padding = '5px 10px'; // Ajusta o preenchimento
        header.style.width = '100%'; // Garante que o cabeçalho ocupe toda a largura
        header.style.boxSizing = 'border-box'; // Inclui a borda e o preenchimento na largura total
        header.style.textAlign = 'left'; // Alinha o texto à esquerda
    }

    
    const menu = document.querySelector('.menu');
    if (menu) {
        menu.style.display = 'flex';
        menu.style.justifyContent = 'flex-start'; // Alinha os itens do menu à esquerda
        menu.style.padding = '0'; // Remove o preenchimento do menu, se necessário
        menu.style.margin = '0'; // Remove a margem do menu, se necessário
    }

    document.getElementById('searchForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const id = document.getElementById('searchId').value;

        try {
            const response = await fetch(`${apiUrl}/${id}`);
            if (!response.ok) {
                throw new Error('Cliente não encontrado');
            }
            const client = await response.json();
            displayClient(client);
        } catch (error) {
            displayMessage(error.message, true);
        }
    });

    document.getElementById('updateForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const id = document.getElementById('clientId').value;
        const nome = document.getElementById('name').value;
        const cpf = document.getElementById('cpf').value;
        const dataNascimento = document.getElementById('dob').value;
        const sexo = document.getElementById('gender').value;
        const situacaoClienteId = document.getElementById('status').value;
        
        const clientData = {
            Id: parseInt(id),
            Nome: nome,
            Cpf: cpf,
            DataNascimento: dataNascimento,
            Sexo: sexo,
            SituacaoClienteId: parseInt(situacaoClienteId)
        };

        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(clientData)
            });

            if (response.ok) {
                displayMessage('Atualizado com sucesso', false);
            } else {
                const errorData = await response.json();
                displayMessage(`Erro: ${errorData.message || 'Algo deu errado'}`, true);
            }
        } catch (error) {
            displayMessage('Erro ao atualizar cliente', true);
        }
    });
});

function displayClient(client) {
    document.getElementById('clientId').value = client.id;
    document.getElementById('name').value = client.nome;
    document.getElementById('cpf').value = client.cpf;
    document.getElementById('dob').value = client.dataNascimento.split('T')[0];
    document.getElementById('gender').value = client.sexo;
    document.getElementById('status').value = client.situacaoClienteId;

    document.getElementById('updateForm').style.display = 'block';
    displayMessage('Cliente encontrado', false);
}

function displayMessage(message, isError = false) {
    const messageBox = document.getElementById('message');
    messageBox.textContent = message;
    messageBox.className = isError ? 'error-message' : 'success-message';
}
