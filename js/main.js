document.addEventListener('DOMContentLoaded', function() {
    // Variáveis
    const header = document.querySelector('header');
    const menuMobile = document.querySelector('.menu-mobile');
    const nav = document.querySelector('nav');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const contactForm = document.getElementById('contactForm');
    const faqItems = document.querySelectorAll('.faq-item');
    const phoneInput = document.getElementById('phone');

    // Efeito de scroll no cabeçalho
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Menu mobile
    menuMobile.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Links de navegação suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Fechar menu mobile se estiver aberto
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuMobile.classList.remove('active');
            }

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Filtro de portfólio
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover classe active de todos os botões
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Slider de depoimentos
    let currentSlide = 0;

    function showSlide(index) {
        // Esconder todos os slides
        testimonialItems.forEach(item => {
            item.style.display = 'none';
        });
        
        // Remover classe active de todos os dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Mostrar o slide atual
        testimonialItems[index].style.display = 'block';
        
        // Adicionar classe active ao dot atual
        dots[index].classList.add('active');
        
        // Atualizar o índice atual
        currentSlide = index;
    }

    // Inicializar o slider
    showSlide(currentSlide);

    // Event listeners para os dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });

    // Event listeners para os botões prev/next
    prevBtn.addEventListener('click', function() {
        let newIndex = currentSlide - 1;
        if (newIndex < 0) {
            newIndex = testimonialItems.length - 1;
        }
        showSlide(newIndex);
    });

    nextBtn.addEventListener('click', function() {
        let newIndex = currentSlide + 1;
        if (newIndex >= testimonialItems.length) {
            newIndex = 0;
        }
        showSlide(newIndex);
    });

    // Auto-slider para os depoimentos
    setInterval(function() {
        let newIndex = currentSlide + 1;
        if (newIndex >= testimonialItems.length) {
            newIndex = 0;
        }
        showSlide(newIndex);
    }, 5000);

    // FAQ Toggle
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Fechar todos os outros itens abertos
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Alternar o estado do item atual
            item.classList.toggle('active');
        });
    });

    // Máscara para o campo de telefone
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value;
            
            // Remove todos os caracteres não numéricos
            value = value.replace(/\D/g, '');
            
            // Aplica a máscara de telefone celular brasileiro
            if (value.length <= 11) {
                if (value.length > 2) {
                    value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
                }
                if (value.length > 10) {
                    value = value.substring(0, 10) + '-' + value.substring(10);
                }
            }
            
            // Atualiza o valor do campo
            e.target.value = value;
        });
    }

    // Validação e envio do formulário de contato
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !subject || !message) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Validação de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um endereço de e-mail válido.');
                return;
            }
            
            // Aqui você adicionaria o código para enviar o formulário
            // Por exemplo, usando fetch para uma API ou backend
            
            // Simulação de envio bem-sucedido
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contactForm.reset();
        });
    }

    // Animação de elementos ao scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-item, .about-stats, .contact-item, .faq-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if (elementPosition < screenPosition - 100) {
                element.classList.add('animate');
            }
        });
    };

    // Adicionar classe para animação CSS
    window.addEventListener('scroll', animateOnScroll);
    
    // Executar uma vez no carregamento da página
    animateOnScroll();
});
