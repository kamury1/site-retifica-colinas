/* =========================================================
   RETÍFICA COLINAS - SCRIPT.JS
   Versão 2026 Comercial & Profissional
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =====================================================
       1. ANO AUTOMÁTICO NO RODAPÉ
    ====================================================== */
    const elAnoAtual = document.getElementById("ano-atual");
    if (elAnoAtual) {
        elAnoAtual.textContent = new Date().getFullYear();
    }

    /* =====================================================
       2. HEADER COMPACTO AO ROLAR
    ====================================================== */
    const header = document.getElementById("header-principal");

    function atualizarHeader() {
        if (!header) return;
        if (window.scrollY > 24) {
            header.classList.add("rolando");
        } else {
            header.classList.remove("rolando");
        }
    }

    window.addEventListener("scroll", atualizarHeader, { passive: true });
    atualizarHeader();

    /* =====================================================
       3. MENU MOBILE & NAVEGAÇÃO
    ====================================================== */
    const botaoMenu = document.getElementById("menu-toggle");
    const menuPrincipal = document.getElementById("menu-principal");
    const backdropMenu = document.getElementById("menu-backdrop");
    const linksNavegacao = document.querySelectorAll(".menu-principal a");

    function abrirMenuMobile() {
        if (!botaoMenu || !menuPrincipal) return;
        botaoMenu.classList.add("aberto");
        botaoMenu.setAttribute("aria-expanded", "true");
        botaoMenu.setAttribute("aria-label", "Fechar menu de navegação");
        menuPrincipal.classList.add("ativo");
        if (backdropMenu) backdropMenu.classList.add("ativo");
    }

    function fecharMenuMobile() {
        if (!botaoMenu || !menuPrincipal) return;
        botaoMenu.classList.remove("aberto");
        botaoMenu.setAttribute("aria-expanded", "false");
        botaoMenu.setAttribute("aria-label", "Abrir menu de navegação");
        menuPrincipal.classList.remove("ativo");
        if (backdropMenu) backdropMenu.classList.remove("ativo");
    }

    if (botaoMenu) {
        botaoMenu.addEventListener("click", () => {
            const estaAberto = botaoMenu.classList.contains("aberto");
            if (estaAberto) {
                fecharMenuMobile();
            } else {
                abrirMenuMobile();
            }
        });
    }

    // Fechar ao clicar no backdrop escuro
    if (backdropMenu) {
        backdropMenu.addEventListener("click", fecharMenuMobile);
    }

    // Fechar ao clicar em qualquer link do menu
    linksNavegacao.forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                fecharMenuMobile();
            }
        });
    });

    // Fechar se a tela for redimensionada para desktop
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            fecharMenuMobile();
        }
    }, { passive: true });

    /* =====================================================
       4. LINK ATIVO CONFORME A ROLAGEM (SCROLL SPY)
    ====================================================== */
    const secoes = document.querySelectorAll("main section[id]");
    const linksMenuSpy = document.querySelectorAll('.menu-principal a.menu-link[href^="#"]');

    function atualizarLinkAtivo() {
        if (!secoes.length || !linksMenuSpy.length) return;

        const scrollPosition = window.scrollY + 140;
        let secaoAtualId = "";

        secoes.forEach((secao) => {
            const topo = secao.offsetTop;
            const altura = secao.offsetHeight;
            if (scrollPosition >= topo && scrollPosition < topo + altura) {
                secaoAtualId = secao.getAttribute("id");
            }
        });

        linksMenuSpy.forEach((link) => {
            link.classList.remove("ativo");
            const href = link.getAttribute("href");
            if (href === `#${secaoAtualId}`) {
                link.classList.add("ativo");
            }
        });
    }

    window.addEventListener("scroll", atualizarLinkAtivo, { passive: true });
    atualizarLinkAtivo();

    /* =====================================================
       5. ANIMAÇÃO SUAVE DE ENTRADA AO ROLAR
    ====================================================== */
    const seletoresAnimacao = [
        ".servico-card",
        ".diferencial-card",
        ".sobre-imagem-wrapper",
        ".sobre-conteudo",
        ".contato-card",
        ".contato-card-horario",
        ".mapa-container",
        ".contato-destaque",
        ".cta-orcamento-container",
        ".servicos-cta-box"
    ];

    const elementosAnimar = document.querySelectorAll(seletoresAnimacao.join(", "));

    elementosAnimar.forEach((el) => {
        el.classList.add("animar");
    });

    if ("IntersectionObserver" in window) {
        const observador = new IntersectionObserver((entradas, observer) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visivel");
                    observer.unobserve(entrada.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -40px 0px"
        });

        elementosAnimar.forEach((el) => observador.observe(el));
    } else {
        // Fallback imediato se não suportar IntersectionObserver
        elementosAnimar.forEach((el) => el.classList.add("visivel"));
    }

    /* =====================================================
       6. MODAL DE FOTO AMPLIADA (LIGHTBOX)
    ====================================================== */
    const botaoAbrirFoto = document.getElementById("abrir-foto-oficina");
    const modalFoto = document.getElementById("foto-modal");
    const botaoFecharFoto = document.getElementById("fechar-foto-modal");
    const overlayModal = document.getElementById("foto-modal-overlay");

    let elementoFocadoAnteriormente = null;

    function abrirModalFoto() {
        if (!modalFoto) return;
        elementoFocadoAnteriormente = document.activeElement;
        modalFoto.classList.add("ativo");
        modalFoto.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-aberto");

        if (botaoFecharFoto) {
            botaoFecharFoto.focus();
        }
    }

    function fecharModalFoto() {
        if (!modalFoto) return;
        modalFoto.classList.remove("ativo");
        modalFoto.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-aberto");

        if (elementoFocadoAnteriormente && typeof elementoFocadoAnteriormente.focus === "function") {
            elementoFocadoAnteriormente.focus();
        }
    }

    if (botaoAbrirFoto) {
        botaoAbrirFoto.addEventListener("click", abrirModalFoto);
    }

    if (botaoFecharFoto) {
        botaoFecharFoto.addEventListener("click", fecharModalFoto);
    }

    if (overlayModal) {
        overlayModal.addEventListener("click", fecharModalFoto);
    }

    /* =====================================================
       7. ACESSIBILIDADE VIA TECLADO (ESC PARA FECHAR MENUS E MODAL)
    ====================================================== */
    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") {
            // Fechar modal de foto se aberto
            if (modalFoto && modalFoto.classList.contains("ativo")) {
                fecharModalFoto();
                return;
            }
            // Fechar menu mobile se aberto
            if (botaoMenu && botaoMenu.classList.contains("aberto")) {
                fecharMenuMobile();
            }
        }
    });
});