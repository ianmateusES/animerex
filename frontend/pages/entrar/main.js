const base_url = "http://localhost:3333";

const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

document.querySelector('#myForm').addEventListener('submit', (event) => {
  event.preventDefault();
  login();
});

function login() {
  const email = emailInput.value;
  const password = passwordInput.value;

  axios.post(base_url+'/sessions', {
    email,
    password
  })
  .then(function(res) {
    console.log(res.data);
    localStorage.setItem('@Anime-token', res.data.token);
    localStorage.setItem('@Anime-user', JSON.stringify(res.data.user));
    window.location.href = '../userLogin';
  })
  .catch(function(error) {
    const { error:erro } = error.response.data;
    alert(erro);
  });
}
