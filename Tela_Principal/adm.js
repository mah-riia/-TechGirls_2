// chave de identificação no local storage
const STORAGE_KEY = 'techgirls_usuarios';

// funcao para carregar e renderizar os dados na lista nao ordenada
function renderizar_lista(filtro = '') {
    const listaEL = document.getElementById('listaUsuarios');
    listaEL.innerHTML = ''; // limpa a lista atual no DOM

    const usuarios = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const usuariosFiltrados = usuarios.filter(user => {
        const termo = filtro.toLowerCase();
        return user.nome.toLowerCase().includes(termo) || 
               user.email.toLowerCase().includes(termo);
    });

    if (usuariosFiltrados.length === 0) {
        listaEL.innerHTML = '<li style="text-align:center; color:#888; padding: 20px;">Nenhum usuário encontrado.</li>';
        return;
    }

    // criacao das listas dinamicas
    usuariosFiltrados.forEach((user, index) => {
        const li = document.createElement('li');
        li.className = 'adm-item';

        li.innerHTML = `
            <div class="adm-item-info">
                <div class="adm-item-data">Enviado em: ${user.data}</div>
                <span><strong>Nome:</strong> ${user.nome}</span>
                <span><strong>E-mail:</strong> ${user.email}</span>
            </div>
            <button class="btn-danger" style="padding: 0.5rem 1rem; font-size:0.85rem;" onclick="excluir_item(${index})">
                Excluir
            </button>
        `;

        listaEL.appendChild(li);
    });
}

// funcao criada pos botao de cadastro
function cadastrar_usuario(event) {
    event.preventDefault(); // evita o reload da pagina

    const nome = document.getElementById('nomeInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();

    if (!nome || !email) return;
    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString('pt-BR') + ' às ' + agora.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});

    const novoUsuario = {
        nome: nome,
        email: email,
        data: dataFormatada
    };

    // resgata o array antigo adiciona o novo item e salva no lcoal storage
    const usuarios = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    usuarios.push(novoUsuario);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));

    limpar_campos();
    renderizar_lista();
}

// opcao para limpar os campos de cadastro
function limpar_campos() {
    document.getElementById('nomeInput').value = '';
    document.getElementById('emailInput').value = '';
}

//  opcao pra excluir um determinado item
function excluir_item(index) {
    const confirmacao = confirm("Tem certeza que deseja excluir este usuário?");
    
    if (confirmacao) {
        const usuarios = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        usuarios.splice(index, 1); // Remove o item pelo índice
        localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios)); // atualiza o storage
        renderizar_lista(); 
    }
}

// opcao pra ecluir todos os itens
function excluir_tudo() {
    const usuarios = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    
    if (usuarios.length === 0) {
        alert("A lista já está vazia!");
        return;
    }

    
    const confirmacao = confirm("Atenção: Tem certeza que deseja excluir TODOS os itens da lista e do Local Storage?");
    
    if (confirmacao) {
        localStorage.removeItem(STORAGE_KEY); // limpa o local storage
        renderizar_lista(); 
    }
}

// 4. Opção de pesquisa dos itens da lista (Nome solicitado)
function pesquisar_item() {
    const termoPesquisa = document.getElementById('pesquisaInput').value;
    renderizar_lista(termoPesquisa);
}

// Renderiza a lista automaticamente assim que a página é carregada
document.addEventListener('DOMContentLoaded', () => {
    renderizar_lista();
});