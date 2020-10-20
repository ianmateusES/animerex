
const title = document.querySelector('#name-user');
title.innerHTML = user.name;

function updateUser() {
  window.location.href = '../updateUser';
}

function registerAnime() {
  window.location.href = '../registerAnime';
}

function exitUser() {
  localStorage.removeItem('@Anime-token');
  localStorage.removeItem('@Anime-user');
  window.location.href = '../entrar';
}
