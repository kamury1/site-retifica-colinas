/* =========================================================
   RETÍFICA COLINAS
   SCRIPT.JS
========================================================= */


/* =========================================================
   ELEMENTOS PRINCIPAIS
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");
const navLinks = document.querySelectorAll("nav a");
const header = document.querySelector("header");
const sections = document.querySelectorAll("main section");


/* =========================================================
   MENU MOBILE
========================================================= */

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        const menuAberto = nav.classList.toggle("ativo");

        menuToggle.setAttribute(
            "aria-expanded",
            menuAberto ? "true" : "false"
        );

        menuToggle.textContent = menuAberto ? "✕" : "☰";
    });
}


/* =========================================================
   FECHAR MENU AO CLICAR EM UM LINK
========================================================= */

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (!nav || !menuToggle) return;

        nav.classList.remove("ativo");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.textContent = "☰";
    });
});


/* =========================================================
   FECHAR MENU AO CLICAR FORA
========================================================= */

document.addEventListener("click", (event) => {
    if (!nav || !menuToggle) return;

    const menuAberto = nav.classList.contains("ativo");

    if (!menuAberto) return;

    const clicouNoMenu = nav.contains(event.target);
    const clicouNoBotao = menuToggle.contains(event.target);

    if (!clicouNoMenu && !clicouNoBotao) {
        nav.classList.remove("ativo");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.textContent = "☰";
    }
});


/* =========================================================
   FECHAR MENU AO REDIMENSIONAR
========================================================= */

window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        if (nav) {
            nav.classList.remove("ativo");
        }

        if (menuToggle) {
            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.textContent = "☰";
        }
    }
});


/* =========================================================
   ROLAGEM SUAVE COM COMPENSAÇÃO DO HEADER
========================================================= */

const linksInternos = document.querySelectorAll(
    'a[href^="#"]'
);

linksInternos.forEach((link) => {
    link.addEventListener("click", (event) => {
        const destinoId = link.getAttribute("href");

        if (
            !destinoId ||
            destinoId === "#"
        ) {
            return;
        }

        const destino = document.querySelector(destinoId);

        if (!destino) {
            return;
        }

        event.preventDefault();

        const alturaHeader =
            header?.offsetHeight || 0;

        const posicao =
            destino.getBoundingClientRect().top +
            window.scrollY -
            alturaHeader;

        window.scrollTo({
            top: posicao,
            behavior: "smooth"
        });
    });
});


/* =========================================================
   DESTACAR ITEM ATIVO DO MENU
========================================================= */

function atualizarMenuAtivo() {
    if (!sections.length) return;

    let secaoAtual = "";

    const alturaHeader =
        header?.offsetHeight || 0;

    const posicaoScroll =
        window.scrollY +
        alturaHeader +
        120;

    sections.forEach((section) => {
        const topo = section.offsetTop;
        const altura = section.offsetHeight;

        if (
            posicaoScroll >= topo &&
            posicaoScroll < topo + altura
        ) {
            secaoAtual = section.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("ativo");

        const destino = link.getAttribute("href");

        if (destino === `#${secaoAtual}`) {
            link.classList.add("ativo");
        }
    });
}


/* =========================================================
   EFEITO NO CABEÇALHO AO ROLAR
========================================================= */

function atualizarCabecalho() {
    if (!header) return;

    if (window.scrollY > 40) {
        header.classList.add("rolando");
    } else {
        header.classList.remove("rolando");
    }
}


/* =========================================================
   EVENTO DE SCROLL
========================================================= */

let scrollEmExecucao = false;

window.addEventListener("scroll", () => {
    if (scrollEmExecucao) return;

    scrollEmExecucao = true;

    window.requestAnimationFrame(() => {
        atualizarMenuAtivo();
        atualizarCabecalho();

        scrollEmExecucao = false;
    });
});


/* =========================================================
   ANIMAÇÕES AO APARECER NA TELA
========================================================= */

const elementosAnimados = document.querySelectorAll(
    ".servico-card, .sobre-texto, .sobre-imagem, .contato-texto, .contato-info"
);

if ("IntersectionObserver" in window) {

    const observador = new IntersectionObserver(
        (entradas, observer) => {

            entradas.forEach((entrada) => {

                if (entrada.isIntersecting) {

                    entrada.target.classList.add(
                        "visivel"
                    );

                    observer.unobserve(
                        entrada.target
                    );
                }

            });

        },
        {
            threshold: 0.12
        }
    );


    elementosAnimados.forEach((elemento) => {

        elemento.classList.add("animar");

        observador.observe(elemento);

    });

} else {

    /*
       Navegadores antigos:
       mostra tudo normalmente.
    */

    elementosAnimados.forEach((elemento) => {

        elemento.classList.add("visivel");

    });

}


/* =========================================================
   ANO AUTOMÁTICO NO RODAPÉ
========================================================= */

const footerCopy = document.querySelector(
    ".footer-copy p"
);

if (footerCopy) {

    const anoAtual =
        new Date().getFullYear();

    footerCopy.textContent =
        `© ${anoAtual} Retífica Colinas. Todos os direitos reservados.`;

}


/* =========================================================
   LINKS EXTERNOS
========================================================= */

const linksExternos = document.querySelectorAll(
    'a[target="_blank"]'
);

linksExternos.forEach((link) => {

    /*
       Garantia extra de segurança.
    */

    const relAtual =
        link.getAttribute("rel") || "";

    const valoresRel =
        new Set(relAtual.split(" ").filter(Boolean));

    valoresRel.add("noopener");
    valoresRel.add("noreferrer");

    link.setAttribute(
        "rel",
        Array.from(valoresRel).join(" ")
    );

});


/* =========================================================
   ACESSIBILIDADE DO MENU COM ESC
========================================================= */

document.addEventListener("keydown", (event) => {

    if (event.key !== "Escape") {
        return;
    }

    if (!nav || !menuToggle) {
        return;
    }

    if (nav.classList.contains("ativo")) {

        nav.classList.remove("ativo");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.textContent = "☰";

        menuToggle.focus();
    }

});


/* =========================================================
   ESTADO INICIAL DA PÁGINA
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        atualizarCabecalho();

        /*
           Pequeno atraso ajuda o navegador a calcular
           corretamente as alturas das seções.
        */

        setTimeout(() => {

            atualizarMenuAtivo();

        }, 100);

    }
);


/* =========================================================
   CARREGAMENTO COMPLETO
========================================================= */

window.addEventListener("load", () => {

    atualizarCabecalho();

    atualizarMenuAtivo();

});