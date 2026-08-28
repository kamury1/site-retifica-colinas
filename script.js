/* =========================================================
   RETÍFICA COLINAS
   SCRIPT.JS FINAL
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTOS PRINCIPAIS
    ====================================================== */

    const header = document.querySelector(".header-principal");

    const botaoMenu = document.querySelector(".menu-toggle");

    const menu = document.querySelector(".menu-principal");

    const linksMenu = document.querySelectorAll(
        '.menu-principal a[href^="#"]'
    );

    const secoes = document.querySelectorAll(
        "main section[id]"
    );

    const anoAtual = document.getElementById("ano-atual");


    /* =====================================================
       ANO AUTOMÁTICO
    ====================================================== */

    if (anoAtual) {

        anoAtual.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       HEADER AO ROLAR
    ====================================================== */

    function atualizarHeader() {

        if (!header) return;

        if (window.scrollY > 30) {

            header.classList.add("rolando");

        } else {

            header.classList.remove("rolando");

        }

    }


    atualizarHeader();

    window.addEventListener(
        "scroll",
        atualizarHeader,
        { passive: true }
    );


    /* =====================================================
       MENU MOBILE
    ====================================================== */

    function fecharMenu() {

        if (!menu || !botaoMenu) return;

        menu.classList.remove("ativo");

        botaoMenu.setAttribute(
            "aria-expanded",
            "false"
        );

        botaoMenu.setAttribute(
            "aria-label",
            "Abrir menu"
        );

        botaoMenu.textContent = "☰";

    }


    function abrirMenu() {

        if (!menu || !botaoMenu) return;

        menu.classList.add("ativo");

        botaoMenu.setAttribute(
            "aria-expanded",
            "true"
        );

        botaoMenu.setAttribute(
            "aria-label",
            "Fechar menu"
        );

        botaoMenu.textContent = "×";

    }


    if (botaoMenu && menu) {

        botaoMenu.addEventListener(
            "click",
            () => {

                const estaAberto =
                    menu.classList.contains("ativo");

                if (estaAberto) {

                    fecharMenu();

                } else {

                    abrirMenu();

                }

            }
        );

    }


    /* =====================================================
       FECHAR MENU AO CLICAR EM LINK
    ====================================================== */

    linksMenu.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                fecharMenu();

            }
        );

    });


    /* =====================================================
       FECHAR MENU AO AUMENTAR A TELA
    ====================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 768) {

                fecharMenu();

            }

        }
    );


    /* =====================================================
       LINK ATIVO CONFORME A SEÇÃO
    ====================================================== */

    function atualizarLinkAtivo() {

        let secaoAtual = "";

        const posicaoRolagem =
            window.scrollY + 180;


        secoes.forEach((secao) => {

            const topo =
                secao.offsetTop;

            const altura =
                secao.offsetHeight;


            if (
                posicaoRolagem >= topo &&
                posicaoRolagem <
                topo + altura
            ) {

                secaoAtual =
                    secao.getAttribute("id");

            }

        });


        linksMenu.forEach((link) => {

            link.classList.remove("ativo");

            const destino =
                link.getAttribute("href");


            if (
                destino ===
                `#${secaoAtual}`
            ) {

                link.classList.add("ativo");

            }

        });

    }


    atualizarLinkAtivo();

    window.addEventListener(
        "scroll",
        atualizarLinkAtivo,
        { passive: true }
    );


    /* =====================================================
       ANIMAÇÕES AO ROLAR
    ====================================================== */

    const elementosAnimados =
        document.querySelectorAll(
            ".servico-card, " +
            ".sobre-imagem, " +
            ".sobre-conteudo, " +
            ".contato-card, " +
            ".contato-destaque, " +
            ".cta-orcamento-texto"
        );


    elementosAnimados.forEach(
        (elemento) => {

            elemento.classList.add("animar");

        }
    );


    if ("IntersectionObserver" in window) {

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
                    threshold: 0.12
                }

            );


        elementosAnimados.forEach(
            (elemento) => {

                observador.observe(elemento);

            }
        );

    } else {

        elementosAnimados.forEach(
            (elemento) => {

                elemento.classList.add(
                    "visivel"
                );

            }
        );

    }


    /* =====================================================
       FOTO DA EQUIPE - MODAL
    ====================================================== */

    const botaoAbrirFoto =
        document.getElementById(
            "abrir-foto-oficina"
        );

    const modalFoto =
        document.getElementById(
            "foto-modal"
        );

    const botaoFecharFoto =
        document.getElementById(
            "fechar-foto-modal"
        );


    let elementoFocadoAntes =
        null;


    function abrirFoto() {

        if (!modalFoto) return;


        elementoFocadoAntes =
            document.activeElement;


        modalFoto.classList.add(
            "ativo"
        );

        modalFoto.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "modal-aberto"
        );


        if (botaoFecharFoto) {

            botaoFecharFoto.focus();

        }

    }


    function fecharFoto() {

        if (!modalFoto) return;


        modalFoto.classList.remove(
            "ativo"
        );

        modalFoto.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "modal-aberto"
        );


        if (elementoFocadoAntes) {

            elementoFocadoAntes.focus();

        }

    }


    if (botaoAbrirFoto) {

        botaoAbrirFoto.addEventListener(
            "click",
            abrirFoto
        );

    }


    if (botaoFecharFoto) {

        botaoFecharFoto.addEventListener(
            "click",
            fecharFoto
        );

    }


    /* =====================================================
       FECHAR CLICANDO FORA DA FOTO
    ====================================================== */

    if (modalFoto) {

        modalFoto.addEventListener(
            "click",
            (evento) => {

                if (
                    evento.target === modalFoto
                ) {

                    fecharFoto();

                }

            }
        );

    }


    /* =====================================================
       FECHAR COM ESC
    ====================================================== */

    document.addEventListener(
        "keydown",
        (evento) => {

            if (
                evento.key === "Escape" &&
                modalFoto &&
                modalFoto.classList
                    .contains("ativo")
            ) {

                fecharFoto();

            }

        }
    );


});