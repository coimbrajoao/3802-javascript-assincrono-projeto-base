const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
});

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve({ url: reader.result, nome: arquivo.name });
        }
        reader.onerror = () => {
            reject(new Error('Não foi possível ler o arquivo${arquivo.name}'));
        }

        reader.readAsDataURL(arquivo);
    })
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeImagem = document.querySelector(".container-imagem-nome");

inputUpload.addEventListener("change", async (event) => {
    const arquivo = event.target.files[0];

    if (arquivo) {
        try {
            const ConteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = ConteudoDoArquivo.url;
            nomeImagem.textContent = ConteudoDoArquivo.nome;
        } catch (error) {
            console.error("Erro na leitura do aquivo.");
            alert(error.message);
        }
    }
})

const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

listaTags.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-tag")) {
        const tag = event.target.parentElement;
        listaTags.removeChild(tag);
    }
});

const tagsDisponiveis = ["Frontend", "Backend", "Mobile", "Data Science"];

async function verificaTagsDisponiveis(tagTexto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000);
    })
}

inputTags.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const tagTexto = inputTags.value.trim();
        if (tagTexto !== "") {
            try {
                const tagExiste = await verificaTagsDisponiveis(tagTexto);
                if (tagExiste) {
                    const tagNova = document.createElement("li");
                    tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`
                    listaTags.appendChild(tagNova);
                    inputTags.value = "";
                } else {
                    throw new Error("Tag não disponível");
                }
            } catch (error) {
                alert("Tag não existe. Tente novamente.");
            }
        }
    }
});

const botaoPublicar = document.querySelector("botao-publicar");

async function publicarProjeto(nomeDoProjeto, descricaoProjeto, tagsProjeto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const deuCerto = Math.random() > 0.5;
            if (deuCerto) {
                resolve("Projeto publicado com sucesso.")
            } else {
                reject("Erro ao publicar o projeto.")
            }
        }, 2000)
    })
}

botaoPublicar.addEventListener("click", async (evento) => {
    evento.preventDefault();

    const nomeDoProjeto = document.getElementById("nome").value;
    const descricaoDoProjeto = document.getElementById("descricao").value;
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);

    try {
        const resultado = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto);
        console.log(resultado);
        alert("Deu tudo certo!")
    } catch (error) {
        console.log("Deu errado: ", error)
        alert("Deu tudo errado!");
    }

})
const botaoDescartar = document.querySelector(".botao-descartar");

botaoDescartar.addEventListener("click", (evento) => {
    evento.preventDefault();
    const formulario = document.querySelector("form");
    formulario.reset();

    imagemPrincipal.src = "./img/imagem1.png";
    nomeImagem.textContent = "image_projeto.png";

    listaTags.innerHTML = "";

})