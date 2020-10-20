const base_url = "http://localhost:3333";

const input = document.querySelector('#search');

// enter
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    document.querySelector('#button-search').click();
  }
});

renderPhotos();

function formatParams( params ){
  return "?" + Object
        .keys(params)
        .map(function(key){
          return key+"="+encodeURIComponent(params[key])
        })
        .join("&")
}

function seachAnime() {
  const inputSearch = document.querySelector('#search')
  const inputAnimeValue = inputSearch.value.trim();

  if(!inputAnimeValue) {
    return;
  }

  axios.get(base_url+"/searchs"+formatParams({ name: inputAnimeValue }))
    .then(function(res) {
      if (res.data.docs.length === 0) {
        alert("Not exist anime");
      } else {
        sessionStorage.setItem('list_anime', JSON.stringify(res.data));
        window.location.href = '../searchAnimes';
      }
    })
    .catch(function(error) {
      const { error:erro } = error.response.data;
      alert(erro);
    });
}

function renderPhotos() {
  const divDev = document.querySelector('#field-dev');

  for(name of ['ianmateusES', 'JavelFreitas', 'fabianysousa', 'lincolneng', 'adanbueno']) {
    axios.get('https://api.github.com/users/'+name)
    .then(function(res) {
      const container = document.createElement('div');
      container.setAttribute('class', 'develop');

      const img = document.createElement('img');
      img.setAttribute('class', 'photo-dev');
      img.setAttribute('src', res.data.avatar_url);
      img.setAttribute('alt', res.data.name);

      const nameDev = document.createElement('span');
      nameDev.setAttribute('class', 'name-dev');
      nameDev.innerHTML = res.data.name || res.data.login;

      container.appendChild(img)
      container.appendChild(nameDev)

      divDev.appendChild(container)
    })
    .catch(function(error) {
      const { error:erro } = error.response.data;
      alert(erro);
    });
  }
}
