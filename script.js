/* =========================================================
   RETÍFICA COLINAS
   SCRIPT.JS
   Menu, navegação, animações e melhorias de experiência
========================================================= */


/* =========================================================
   ELEMENTOS PRINCIPAIS
========================================================= */

const header = document.querySelector(".header-principal");

const menuToggle = document.querySelector(".menu-toggle");

const menuPrincipal = document.querySelector(".menu-principal");

const linksMenu = document.querySelectorAll(
    '.menu-principal a[href^="#"]'
);

const linksInternos = document.querySelectorAll(
    'a[href^="#"]'
);

const secoes = document.querySelectorAll(
    "main section[id]"
);


/* =========================================================
   MENU MOBILE
========================================================= */

function abrirMenu() {

    if (!menuPrincipal || !menuToggle) {
        return;
    }

    menuPrincipal.classList.add("ativo");

    menuToggle.setAttribute(
        "aria-expanded",
        "true"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Fechar menu"
    );

    menuToggle.textContent = "✕";
}



function fecharMenu() {

    if (!menuPrincipal || !menuToggle) {
        return;
    }

    menuPrincipal.classList.remove("ativo");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Abrir menu"
    );

    menuToggle.textContent = "☰";
}



function alternarMenu() {

    if (!menuPrincipal) {
        return;
    }

    const menuAberto =
        menuPrincipal.classList.contains("ativo");

    if (menuAberto) {

        fecharMenu();

    } else {

        abrirMenu();

    }

}


/* =========================================================
   CLIQUE NO BOTÃO MOBILE
========================================================= */

if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            alternarMenu();

        }
    );

}


/* =========================================================
   FECHAR MENU AO CLICAR EM LINK
========================================================= */

linksMenu.forEach((link) => {

    link.addEventListener(
        "click",
        () => {

            fecharMenu();

        }
    );

});


/* =========================================================
   FECHAR MENU AO CLICAR FORA
========================================================= */

document.addEventListener(
    "click",
    (event) => {

        if (
            !menuPrincipal ||
            !menuToggle
        ) {
            return;
        }

        const menuAberto =
            menuPrincipal.classList.contains("ativo");

        if (!menuAberto) {
            return;
        }

        const clicouMenu =
            menuPrincipal.contains(event.target);

        const clicouBotao =
            menuToggle.contains(event.target);

        if (
            !clicouMenu &&
            !clicouBotao
        ) {

            fecharMenu();

        }

    }
);


/* =========================================================
   FECHAR MENU COM ESC
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key !== "Escape") {
            return;
        }

        if (
            menuPrincipal &&
            menuPrincipal.classList.contains("ativo")
        ) {

            fecharMenu();

            if (menuToggle) {
                menuToggle.focus();
            }

        }

    }
);


/* =========================================================
   REDIMENSIONAMENTO
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 768
        ) {

            fecharMenu();

        }

    }
);


/* =========================================================
   ROLAGEM SUAVE
   Compensação do header fixo
========================================================= */

linksInternos.forEach((link) => {

    link.addEventListener(
        "click",
        (event) => {

            const destinoId =
                link.getAttribute("href");

            if (
                !destinoId ||
                destinoId === "#"
            ) {
                return;
            }

            const destino =
                document.querySelector(destinoId);

            if (!destino) {
                return;
            }

            event.preventDefault();


            const alturaHeader =
                header?.offsetHeight || 0;


            const posicaoDestino =
                destino.getBoundingClientRect().top +
                window.scrollY -
                alturaHeader;


            window.scrollTo({

                top: posicaoDestino,

                behavior: "smooth"

            });

        }
    );

});


/* =========================================================
   HEADER AO ROLAR
========================================================= */

function atualizarHeader() {

    if (!header) {
        return;
    }

    if (
        window.scrollY > 30
    ) {

        header.classList.add("rolando");

    } else {

        header.classList.remove("rolando");

    }

}


/* =========================================================
   DESTACAR ITEM DO MENU
========================================================= */

function atualizarMenuAtivo() {

    if (!secoes.length) {
        return;
    }


    let secaoAtual = "";


    const alturaHeader =
        header?.offsetHeight || 0;


    const pontoLeitura =
        window.scrollY +
        alturaHeader +
        120;


    secoes.forEach((secao) => {

        const inicio =
            secao.offsetTop;

        const fim =
            inicio +
            secao.offsetHeight;


        if (
            pontoLeitura >= inicio &&
            pontoLeitura < fim
        ) {

            secaoAtual =
                secao.id;

        }

    });


    linksMenu.forEach((link) => {

        link.classList.remove("ativo");


        const href =
            link.getAttribute("href");


        if (
            href === `#${secaoAtual}`
        ) {

            link.classList.add("ativo");

        }

    });

}


/* =========================================================
   SCROLL OTIMIZADO
========================================================= */

let scrollPendente = false;


function atualizarScroll() {

    atualizarHeader();

    atualizarMenuAtivo();

    scrollPendente = false;

}


window.addEventListener(
    "scroll",
    () => {

        if (!scrollPendente) {

            scrollPendente = true;

            window.requestAnimationFrame(
                atualizarScroll
            );

        }

    }
);


/* =========================================================
   ANIMAÇÕES AO ENTRAR NA TELA
========================================================= */

const elementosAnimados =
    document.querySelectorAll(

        [
            ".secao-cabecalho",
            ".servico-card",
            ".servicos-cta",
            ".sobre-imagem",
            ".sobre-conteudo",
            ".cta-orcamento-container",
            ".contato-card",
            ".contato-destaque",
            ".footer-marca",
            ".footer-coluna"
        ].join(",")

    );


if (
    "IntersectionObserver" in window
) {

    const observador =
        new IntersectionObserver(

            (entradas, observer) => {

                entradas.forEach(
                    (entrada) => {

                        if (
                            entrada.isIntersecting
                        ) {

                            entrada.target
                                .classList
                                .add("visivel");


                            observer.unobserve(
                                entrada.target
                            );

                        }

                    }
                );

            },

            {

                threshold: 0.12,

                rootMargin:
                    "0px 0px -30px 0px"

            }

        );


    elementosAnimados.forEach(
        (elemento) => {

            elemento
                .classList
                .add("animar");

            observador.observe(
                elemento
            );

        }
    );

} else {

    /*
       Caso o navegador não suporte
       IntersectionObserver.
    */

    elementosAnimados.forEach(
        (elemento) => {

            elemento
                .classList
                .add("visivel");

        }
    );

}


/* =========================================================
   ANO AUTOMÁTICO
========================================================= */

const anoAtualElemento =
    document.querySelector("#ano-atual");


if (anoAtualElemento) {

    anoAtualElemento.textContent =
        new Date().getFullYear();

}


/* =========================================================
   SEGURANÇA DOS LINKS EXTERNOS
========================================================= */

const linksExternos =
    document.querySelectorAll(
        'a[target="_blank"]'
    );


linksExternos.forEach((link) => {

    const relAtual =
        link.getAttribute("rel") || "";


    const valoresRel =
        new Set(

            relAtual
                .split(" ")
                .filter(Boolean)

        );


    valoresRel.add("noopener");

    valoresRel.add("noreferrer");


    link.setAttribute(

        "rel",

        Array.from(valoresRel)
            .join(" ")

    );

});


/* =========================================================
   VOLTAR PARA O TOPO AO CLICAR NA LOGO
========================================================= */

const logo =
    document.querySelector(".logo");


if (logo) {

    logo.addEventListener(
        "click",
        () => {

            fecharMenu();

        }
    );

}


/* =========================================================
   GARANTIR QUE O MENU MOBILE NÃO FIQUE PRESO
   AO USAR VOLTAR/AVANÇAR DO NAVEGADOR
========================================================= */

window.addEventListener(
    "pageshow",
    () => {

        fecharMenu();

    }
);


/* =========================================================
   ESTADO INICIAL
========================================================= */

function iniciarSite() {

    atualizarHeader();

    atualizarMenuAtivo();

}


document.addEventListener(
    "DOMContentLoaded",
    iniciarSite
);


window.addEventListener(
    "load",
    () => {

        atualizarHeader();

        atualizarMenuAtivo();

    }
);