const base_url = "http://localhost:3333";

if (user) {
  renderUser(user);
} else {
  title.innerHTML = 'Error info User';
}

function renderUser(user) {
  const nameUser = document.querySelector('#name');
  nameUser.value = user.name;

  const emailUser = document.querySelector('#email');
  emailUser.value = user.email;
}

document.querySelector('#myForm').addEventListener('submit', (event) => {
  event.preventDefault();
  submitUpdate();
  axios.put(base_url+'/users', user, {
    headers: {
      'authorization': 'Bearer ' + token,
    }
  })
  .then(function(res) {
    alert("User update completed successfully");
    localStorage.setItem('@Anime-user', JSON.stringify(res.data));
    window.location.href = '../userLogin';
  })
  .catch(function(error) {
    const { error:erro } = error.response.data;
    alert(erro);
  });
});

function submitUpdate() {
  const nameUser = document.querySelector('#name');
  user.name = nameUser.value;

  const emailUser = document.querySelector('#email');
  user.email = emailUser.value;

  const oldPasswordUser = document.querySelector('#oldPassword');
  const passwordUser = document.querySelector('#password');
  if (oldPasswordUser.value) {
    user.oldPassword = oldPasswordUser.value;
    user.password = passwordUser.value;
  }
}

function cancelUpdate() {
  window.history.back();
}
