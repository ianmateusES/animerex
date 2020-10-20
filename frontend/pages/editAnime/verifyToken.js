const token = localStorage.getItem('@Anime-token');
const user = localStorage.getItem('@Anime-user');

if(!(token && user)) {
  window.location.href = '../entrar';
}
