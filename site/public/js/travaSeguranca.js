if(sessionStorage.ID_USUARIO == undefined) {
    window.location = '../index.html';
} 

link_perfil.href = `./perfil.html?id=${sessionStorage.ID_USUARIO}`;