document.getElementById('toggle-sidebar').addEventListener('click', function() {
    var sidebar = document.getElementById('sidebar');
    var container = document.getElementById('main-content');
    
    sidebar.classList.toggle('hidden');
    container.classList.toggle('full-width');

    // Mostrar o botão de toggle "Menu" apenas quando a sidebar estiver escondida
    if (sidebar.classList.contains('hidden')) {
        this.style.display = 'block';
    } else {
        this.style.display = 'none';
    }
});

document.getElementById('hide-sidebar').addEventListener('click', function() {
    var sidebar = document.getElementById('sidebar');
    var container = document.getElementById('main-content');
    var toggleBtn = document.getElementById('toggle-sidebar');
    
    sidebar.classList.toggle('hidden');
    container.classList.toggle('full-width');
    
    // Alternar visibilidade dos botões
    if (sidebar.classList.contains('hidden')) {
        toggleBtn.style.display = 'block';
    } else {
        toggleBtn.style.display = 'none';
    }
});
