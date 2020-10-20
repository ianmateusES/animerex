const base_url = "http://localhost:3333";

const anime = JSON.parse(sessionStorage.getItem('info_anime_owner'));
console.log(anime);
var title = document.querySelector('h1');

if (anime) {
  title.innerHTML = anime.name;
  renderAnime(anime);
} else {
  title.innerHTML = 'Error info anime';
}

function renderAnime(anime) {
  var divAnime = document.querySelector('#anime');

  var divImg = document.createElement('div');
  divImg.setAttribute('class', 'div-img-anime');

  var imgAnime = document.createElement('img');
  imgAnime.setAttribute('class', 'img-anime');
  imgAnime.setAttribute('src', anime.img_link);

  var divDescription = document.createElement('div');
  divDescription.setAttribute('class', 'div-description-anime');

  const descriptionName = document.createElement('h3');
  descriptionName.setAttribute('class', 'h3-description-anime');
  descriptionName.innerHTML = 'Descrição:';

  var descriptionAnime = document.createElement('p');
  descriptionAnime.setAttribute('class', 'p-description-anime');
  descriptionAnime.innerHTML = anime.description;

  const duration = document.createElement('div');
  duration.setAttribute('class', 'div-duration-anime');

  const seasonContainer = document.createElement('div');
  seasonContainer.setAttribute('class', 'div-season-anime');

  const seasonName = document.createElement('h3');
  seasonName.setAttribute('class', 'h3-seaso-anime');
  seasonName.innerHTML = 'Temporada:';

  var seasonAnime = document.createElement('p');
  seasonAnime.setAttribute('class', 'p-seaso-anime');
  seasonAnime.innerHTML = anime.season;

  const episodeContainer = document.createElement('div');
  episodeContainer.setAttribute('class', 'div-episode-anime');

  const episodeName = document.createElement('h3');
  episodeName.setAttribute('class', 'h3-episode-anime');
  episodeName.innerHTML = 'Episódio:';

  var episodeAnime = document.createElement('p');
  episodeAnime.setAttribute('class', 'p-episode-anime');
  episodeAnime.innerHTML = anime.episode;

  var divWatch = document.createElement('div');
  divWatch.setAttribute('class', 'div-watch-anime');

  var linkWatch = document.createElement('a');
  linkWatch.setAttribute('class', 'link-watch-anime');
  linkWatch.setAttribute('href', anime.link_watch);
  linkWatch.setAttribute('target', '_blank');
  linkWatch.innerHTML = 'Assistir'


  divImg.appendChild(imgAnime);

  seasonContainer.appendChild(seasonName);
  seasonContainer.appendChild(seasonAnime);

  episodeContainer.appendChild(episodeName);
  episodeContainer.appendChild(episodeAnime);

  duration.appendChild(seasonContainer);
  duration.appendChild(episodeContainer);

  divWatch.appendChild(linkWatch);

  divDescription.appendChild(descriptionName);
  divDescription.appendChild(descriptionAnime);
  divDescription.appendChild(duration);
  divDescription.appendChild(divWatch);

  divAnime.appendChild(divImg);
  divAnime.appendChild(divDescription);
}


function editAnime() {
  window.location.href = '../editAnime';
}

function deleteAnime() {
  axios.delete(base_url+'/animes/'+anime._id, {
    headers: {
      'authorization': 'Bearer ' + token,
    },
  }).then(function() {
    alert("Delete sucess");
    window.location.href = "../meusAnimes";
  })
  .catch(function(error) {
    const { error:erro } = error.response.data;
    alert(erro);
  });
}
