const token = localStorage.getItem('@Anime-token');
let user = localStorage.getItem('@Anime-user');

if(!(token && user)) {
  window.location.href = '../entrar';
}

user = JSON.parse(user);
