document.addEventListener("DOMContentLoaded", function() {
    const toggleBtn = document.getElementById('toggle-sidebar');
    const sidebar = document.getElementById('sidebar');
    const container = document.getElementById('main-content');
    const hideSidebarBtn = document.getElementById('hide-sidebar');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    // Função para alternar a visibilidade da sidebar (mobile) e colapsar/expandir (desktop)
    toggleBtn.addEventListener('click', function() {
        if (window.innerWidth <= 1000) {
            // Comportamento em dispositivos móveis
            sidebar.classList.toggle('visible');
            container.classList.toggle('full-width');
    
            // Alternar a visibilidade do botão "Menu"
            toggleBtn.style.display = sidebar.classList.contains('visible') ? 'none' : 'block';
        } else {
            // Comportamento na versão desktop
            sidebar.classList.toggle('hidden');
            container.classList.toggle('full-width');
            
            // Sempre mostrar o botão "Menu" quando a sidebar estiver escondida
            toggleBtn.style.display = sidebar.classList.contains('hidden') ? 'block' : 'none';
        }
    });
    
    // Função para esconder a sidebar no desktop ou mobile
    hideSidebarBtn.addEventListener('click', function() {
        if (window.innerWidth <= 1000) {
            // Comportamento em dispositivos móveis
            if (sidebar.classList.contains('visible')) {
                sidebar.classList.remove('visible');
                container.classList.add('full-width');
                toggleBtn.style.display = 'block'; // Mostrar o botão "Menu" quando a sidebar está escondida
            }
        } else {
            // Comportamento na versão desktop
            sidebar.classList.add('hidden');
            container.classList.add('full-width');
            toggleBtn.style.display = 'block'; // Mostrar o botão "Menu" quando a sidebar está escondida
        }
    });
    
    // Garantir que o comportamento seja atualizado ao redimensionar a janela
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1000) {
            // Remover classes de mobile ao voltar para desktop
            sidebar.classList.remove('visible');
            container.classList.remove('full-width');
            toggleBtn.style.display = 'none'; // Esconder o botão "Menu" em desktop
        } else {
            // Resetar para mobile se necessário
            sidebar.classList.remove('hidden');
            container.classList.remove('full-width');
            toggleBtn.style.display = 'block'; // Mostrar o botão "Menu" em mobile
        }
    });
    
    const links = document.querySelectorAll('.container a');
    // if you want to work the opacity of sidebar when clicked remove the comment
    // const links = document.querySelectorAll('.sidebar a, .container a');

    links.forEach(link => {
        link.addEventListener('click', function() {
            link.classList.add('visited');
            localStorage.setItem(link.href, 'visited');

            // Encontrar e marcar o <ul> correspondente como visitado
            const listItem = link.closest('li');
            if (listItem) {
                const nestedList = listItem.querySelector('ul');
                if (nestedList) {
                    nestedList.classList.add('visited');
                    localStorage.setItem(nestedList.dataset.id, 'visited');
                }
            }
        });

        if (localStorage.getItem(link.href) === 'visited') {
            link.classList.add('visited');

            // Encontrar e marcar o <ul> correspondente como visitado
            const listItem = link.closest('li');
            if (listItem) {
                const nestedList = listItem.querySelector('ul');
                if (nestedList) {
                    nestedList.classList.add('visited');
                }
            }
        }
    });

    const sections = document.querySelectorAll('.container h2, .container h3'); // Seções que serão monitoradas
    const navLinks = document.querySelectorAll('.sidebar a'); // Links na sidebar

    // Função para atualizar o estado dos links da sidebar
    function updateSidebarLinks() {
        let currentSection = ' ';

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

// Confetti animation
const duration = 2000,
  animationEnd = Date.now() + duration,
  defaults = { startVelocity: 20, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const interval = setInterval(function() {
  const timeLeft = animationEnd - Date.now();

  if (timeLeft <= 0) {
    return clearInterval(interval);
  }

  const particleCount = 10 * (timeLeft / duration);

  // since particles fall down, start a bit higher than random
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    })
  );
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    })
  );
}, 250);
