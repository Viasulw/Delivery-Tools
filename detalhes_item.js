document.addEventListener('DOMContentLoaded', function() {
    const miniaturas = document.querySelectorAll('.miniatura');
    const imagemPrincipal = document.getElementById('imagem');

    miniaturas.forEach(miniatura => {
        miniatura.addEventListener('mouseenter', function() {
            const novaImagem = this.dataset.imagem;
            imagemPrincipal.style.opacity = '0'; // Reduz a opacidade para iniciar a transição
            setTimeout(() => {
                imagemPrincipal.src = novaImagem; // Altera a imagem após um pequeno atraso para a transição
                imagemPrincipal.style.opacity = '1'; // Restaura a opacidade para mostrar a nova imagem
            }, 90); // Tempo de espera para a transição (300ms neste exemplo)
        });
    });
});

// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Recupera os dados do carrinho do sessionStorage
    let carrinhoData = JSON.parse(sessionStorage.getItem('carrinho'));

    // Verifica se há dados de carrinho no sessionStorage
    let carrinho = carrinhoData !== null ? carrinhoData : [];

    console.log("Carrinho atualizado:", carrinho);

    const carrinhoIcon = document.querySelector('.carrinho-icon');
    const carrinhoTooltip = document.querySelector('.carrinho-tooltip');
    const carrinhoItems = document.getElementById('carrinho-items');
    const finalizarCompraBtn = document.getElementById('finalizar-compra-btn');
    const precoTotal = document.getElementById('preco-total');

    // Função para atualizar o preço total da compra
    function atualizarPrecoTotal() {
        let total = 0;
        carrinho.forEach(item => {
            total += item.preco * item.quantidade;
        });
        precoTotal.textContent = `R$ ${total.toFixed(2)}`;
    }

    // Evento de clique no ícone do carrinho para exibir/ocultar o tooltip
    carrinhoIcon.addEventListener('click', function() {
        if (carrinhoTooltip.style.display === 'block') {
            carrinhoTooltip.style.display = 'none';
        } else {
            carrinhoTooltip.style.display = 'block';
        }
    });

    // Adicionar evento de clique para o botão "Finalizar Compra"
    finalizarCompraBtn.addEventListener('click', function() {
        // Lógica para finalizar a compra (ainda não implementada)
    });

    // Função para adicionar um item ao carrinho
    function adicionarItemCarrinho(nome, imagem, preco) {
        console.log("Adicionando item ao carrinho:", nome);
        const index = carrinho.findIndex(item => item.nome === nome);
        if (index !== -1) {
            carrinho[index].quantidade++;
        } else {
            carrinho.push({ nome, imagem, preco, quantidade: 1 });
        }
        console.log("Carrinho atualizado:", carrinho);
        sessionStorage.setItem('carrinho', JSON.stringify(carrinho));
        renderizarCarrinho();
        atualizarPrecoTotal();
    }

    // Função para remover um item do carrinho
    function removerItem(nome) {
        console.log("Removendo item do carrinho:", nome);
        const index = carrinho.findIndex(item => item.nome === nome);
        if (index !== -1) {
            if (carrinho[index].quantidade > 1) {
                carrinho[index].quantidade--;
            } else {
                carrinho.splice(index, 1);
            }
            console.log("Carrinho atualizado:", carrinho);
            sessionStorage.setItem('carrinho', JSON.stringify(carrinho));
            renderizarCarrinho();
            atualizarPrecoTotal();
        }
    }

    // Função para renderizar os itens do carrinho
    function renderizarCarrinho() {
        carrinhoItems.innerHTML = ''; // Limpa o conteúdo anterior
        carrinho.forEach(item => {
            const carrinhoItem = document.createElement('div');
            carrinhoItem.classList.add('carrinho-item');
            carrinhoItem.innerHTML = `
                <img src="${item.imagem}" alt="${item.nome}">
                <div class="carrinho-item-text">
                    <p>${item.nome}</p>
                    <p>R$ ${item.preco.toFixed(2)}</p>
                </div>
                <div class="carrinho-item-actions">
                    <button class="remover-item">-</button>
                    <span>${item.quantidade}</span>
                    <button class="adicionar-item">+</button>
                </div>
            `;
            carrinhoItems.appendChild(carrinhoItem);

            // Adiciona eventos de clique para os botões de adicionar e remover itens
            const btnRemover = carrinhoItem.querySelector('.remover-item');
            btnRemover.addEventListener('click', () => removerItem(item.nome));

            const btnAdicionar = carrinhoItem.querySelector('.adicionar-item');
            btnAdicionar.addEventListener('click', () => adicionarItemCarrinho(item.nome, item.imagem, item.preco));
        });
    }
    // Evento de clique nos elementos .adicionar-carrinho para adicionar itens ao carrinho
const botoesAdicionar = document.querySelectorAll('.adicionar-carrinho');
botoesAdicionar.forEach(botao => {
    botao.addEventListener('click', function() {
        const produtoSelecionado = JSON.parse(sessionStorage.getItem('produtoSelecionado'));
        adicionarItemCarrinho(produtoSelecionado.nome, produtoSelecionado.imagem, produtoSelecionado.preco);
    });
});

// Função para recuperar o carrinho do sessionStorage e renderizar na página
function inicializarCarrinho() {
    carrinho = JSON.parse(sessionStorage.getItem('carrinho')) || [];
    renderizarCarrinho();
    atualizarPrecoTotal();
}

    // Renderiza o carrinho quando a página é carregada
    renderizarCarrinho();
    atualizarPrecoTotal();
     // Inicializa o carrinho ao carregar a página
     inicializarCarrinho();
});
