document.addEventListener("DOMContentLoaded", function() {
    const toggleBtn = document.getElementById('toggle-sidebar');
    const sidebar = document.getElementById('sidebar');
    const container = document.getElementById('main-content');
    const hideSidebarBtn = document.getElementById('hide-sidebar');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    toggleBtn.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        sidebar.classList.toggle('hidden');
        container.classList.toggle('full-width');
        
        // Alternar a visibilidade do botão de toggle "Menu"
        if (sidebar.classList.contains('active')) {
            toggleBtn.style.display = 'none'; // Esconde o botão "Menu" quando a sidebar está visível
        } else {
            toggleBtn.style.display = 'block'; // Mostra o botão "Menu" quando a sidebar está escondida
        }
    });

    hideSidebarBtn.addEventListener('click', function() {
        sidebar.classList.remove('active');
        sidebar.classList.add('hidden');
        container.classList.toggle('full-width');
        
        // Mostrar o botão "Menu" quando a sidebar está escondida
        toggleBtn.style.display = 'block';
    });
    
    // Adicionar evento de clique em links da sidebar para esconder a sidebar ao clicar
    const sidebarLinks = sidebar.querySelectorAll('a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 1000) { // Apenas para dispositivos móveis
                sidebar.classList.remove('active');
                sidebar.classList.add('hidden');
                toggleBtn.style.display = 'block';
                container.classList.add('full-width');
            }
        });
    });

    const sections = document.querySelectorAll('.container h2, .container h3'); // Seções que serão monitoradas
    const navLinks = document.querySelectorAll('.sidebar a'); // Links na sidebar

    // Função para atualizar o estado dos links da sidebar
    function updateSidebarLinks() {
        let currentSection = '1';

        // Encontrar a seção atualmente visível
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 60; // Ajuste de offset para considerar o topo da tela
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        // Remover a classe 'active' de todos os links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    }

    // Atualizar links da sidebar ao carregar a página
    updateSidebarLinks();

    // Atualizar links da sidebar ao rolar a página
    window.addEventListener('scroll', updateSidebarLinks);

    // Alternar entre modos claro e escuro
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');

        // Salvar a preferência do usuário no localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            localStorage.removeItem('dark-mode');
        }
    });

    // Verificar a preferência do usuário ao carregar a página
    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
});
