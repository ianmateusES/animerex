const base_url = "http://localhost:3333";

const anime = JSON.parse(sessionStorage.getItem('info_anime_owner'));
console.log(anime);

if (anime) {
  renderAnime(anime);
} else {
  title.innerHTML = 'Error info anime';
}

function renderAnime(anime) {
  const nameAnime = document.querySelector('#name');
  nameAnime.value = anime.name;

  const seasonAnime = document.querySelector('#season');
  seasonAnime.value = anime.season;

  const imgLink = document.querySelector('#img-link');
  imgLink.value = anime.img_link;

  const episode = document.querySelector('#episode');
  episode.value = anime.episode;

  const watchLink = document.querySelector('#watch-link');
  watchLink.value = anime.link_watch;

  const description = document.querySelector('#description');
  description.value = anime.description;
}

function cancelAnime() {
  window.history.back();
}

document.querySelector('#myForm').addEventListener('submit', (event) => {
  event.preventDefault();
  submitEdit();
  axios.put(base_url+'/animes/'+anime._id, anime, {
    headers: {
      'authorization': 'Bearer ' + token,
    },
  })
  .then(function(res) {
    console.log(res.data)
    sessionStorage.setItem('info_anime_owner', JSON.stringify(res.data));
    window.location.href = "../infoAnimeOwner"
  })
  .catch(function() {
    alert("Sign in to your account");
  });
});

function submitEdit() {
  const nameAnime = document.querySelector('#name');
  anime.name = nameAnime.value;

  const seasonAnime = document.querySelector('#season');
  anime.season = seasonAnime.value;

  const imgLink = document.querySelector('#img-link');
  anime.img_link = imgLink.value;

  const episode = document.querySelector('#episode');
  anime.episode = episode.value;

  const watchLink = document.querySelector('#watch-link');
  anime.link_watch = watchLink.value;

  const description = document.querySelector('#description');
  anime.description = description.value;
}
