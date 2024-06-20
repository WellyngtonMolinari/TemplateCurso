document.addEventListener("DOMContentLoaded", function() {
    const toggleBtn = document.getElementById('toggle-sidebar');
    const sidebar = document.getElementById('sidebar');
    const container = document.getElementById('main-content');
    const hideSidebarBtn = document.getElementById('hide-sidebar');

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
});
