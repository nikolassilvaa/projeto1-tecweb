let listaDeCompras = JSON.parse(localStorage.getItem("lista")) || [];

const mensagemVazia = document.getElementById("mensagemListaVazia");

function salvarLista() {
  localStorage.setItem("lista", JSON.stringify(listaDeCompras));
}

const form = document.getElementById("formCadastro");
if (form) {
  const categoriaSelect = document.getElementById("categoriaItem");
  const outraCategoriaInput = document.getElementById("outraCategoria");

  categoriaSelect.addEventListener("change", () => {
    if (categoriaSelect.value === "Outra") {
      outraCategoriaInput.style.display = "block";
    } else {
      outraCategoriaInput.style.display = "none";
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const nome = document.getElementById("nomeItem").value.trim();
    const quantidade = document.getElementById("quantidadeItem").value;
    let categoria = categoriaSelect.value;

    if (categoria === "Outra") {
      const outraCategoria = outraCategoriaInput.value.trim();
      if (outraCategoria) {
        categoria = outraCategoria;
      } else {
        alert("Digite a categoria personalizada.");
        return;
      }
    }
        if (!nome) {
      alert("O nome do item é obrigatório.");
      return;
    }

    if (!quantidade) {
      alert("A quantidade é obrigatória.");
      return;
    }

    if (!categoria) {
      alert("A categoria é obrigatória.");
      return;
    }

    listaDeCompras.push({ nome, categoria, quantidade });
    salvarLista();
    alert("Item adicionado!");
    form.reset();
    outraCategoriaInput.style.display = "none";
  });
}

function verificarListaVazia() {
  const mensagemVazia = document.getElementById("mensagemListaVazia");
  const conteudoLista = document.getElementById("conteudoLista");
  const botoesAdicionais = document.getElementById("botoesAdicionais");
  const imagemCarrinho = document.getElementById("imagemCarrinho");

  if (listaDeCompras.length === 0) {
    mensagemVazia.style.display = "block";
    conteudoLista.style.display = "none";
    botoesAdicionais.style.display = "none";
    if (imagemCarrinho) {
      imagemCarrinho.style.display = "block";
    }
  } else {
    mensagemVazia.style.display = "none";
    conteudoLista.style.display = "block";
    botoesAdicionais.style.display = "block";
    if (imagemCarrinho) {
      imagemCarrinho.style.display = "none"; 
    }
  }
}

verificarListaVazia();

const ul = document.getElementById("listaItens");
const filtro = document.getElementById("filtroCategoria");

function renderizarLista(categoriaSelecionada = "Todas") {
  if (!ul) return;
  ul.innerHTML = "";

  listaDeCompras.forEach((item, index) => {
    const cat = item.categoria.toLowerCase();
    const filtroAtual = categoriaSelecionada.toLowerCase();

    const isCategoriaOutra = !["alimentos", "bebidas", "utilidades"].includes(cat);
    const mostrarItem =
      filtroAtual === "todas" ||
      cat === filtroAtual ||
      (filtroAtual === "outra" && isCategoriaOutra);

    if (!mostrarItem) return;

    const li = document.createElement("li");
    li.textContent = `${item.nome} (${item.categoria}) - Quantidade: ${item.quantidade}`;

    const btn = document.createElement("button");
    btn.textContent = "Remover";
    btn.onclick = () => {
      listaDeCompras.splice(index, 1);
      salvarLista();
      renderizarLista(filtro.value);
    };

    li.appendChild(btn);
    ul.appendChild(li);
  });
}

if (filtro) {
  filtro.addEventListener("change", () => {
    renderizarLista(filtro.value);
  });

  renderizarLista();
}
