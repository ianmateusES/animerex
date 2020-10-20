const token = localStorage.getItem('@Anime-token');
const user = localStorage.getItem('@Anime-user');

if(!(token && user)) {
  alert('Sign in');
  window.location.href = '../entrar';
}
