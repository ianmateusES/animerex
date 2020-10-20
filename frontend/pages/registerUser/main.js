const base_url = "http://localhost:3333";

let user = {};

document.querySelector('#myForm').addEventListener('submit', (event) => {
  event.preventDefault();
  submitRegister();
  axios.post(base_url+'/users', user)
  .then(function(res) {
    console.log(res.data)
    alert("User registration completed successfully");
    window.location.href = '../userLogin';
  })
  .catch(function(error) {
    
  });
});

function submitRegister() {
  const nameUser = document.querySelector('#name');
  user.name = nameUser.value;

  const emailUser = document.querySelector('#email');
  user.email = emailUser.value;

  const passwordUser = document.querySelector('#password');
  user.password = passwordUser.value;
}
