const base_url = "http://localhost:3333";

let anime = {};

document.querySelector('#myForm').addEventListener('submit', (event) => {
  event.preventDefault();
  submitEdit();
  axios.post(base_url+'/animes', anime, {
    headers: {
      'authorization': 'Bearer ' + token,
    },
  })
  .then(function(res) {
    console.log(res.data)
    alert("Anime registration completed successfully");
    window.location.href = "../meusAnimes"
  })
  .catch(function(error) {
    const { error:erro } = error.response.data;
    alert(erro);
  });
});

function submitEdit() {
  const nameAnime = document.querySelector('#name');
  anime.name = nameAnime.value;

  const imgLink = document.querySelector('#img-link');
  anime.img_link = imgLink.value;

  const watchLink = document.querySelector('#watch-link');
  anime.link_watch = watchLink.value;

  const description = document.querySelector('#description');
  anime.description = description.value;

  const seasonAnime = document.querySelector('#season');
  anime.season = seasonAnime.value;

  const episode = document.querySelector('#episode');
  anime.episode = episode.value;
}

function cancelAnime() {
  window.history.back();
}
