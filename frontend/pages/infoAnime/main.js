const base_url = "http://localhost:3333";
console.log(JSON.parse(sessionStorage.getItem('info_anime')));

const anime = JSON.parse(sessionStorage.getItem('info_anime'));
var titleAnime = document.querySelector('#title-anime');
var titleUser = document.querySelector('#title-user');

if (anime) {
  const user = anime.user_id;
  titleAnime.innerHTML = anime.name + ' -';
  titleUser.innerHTML = user.name;
  titleUser.setAttribute('onclick', `goOwnerUser('${user._id}', '${user.name}')`);
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

  const descriptionName = document.createElement('h4');
  descriptionName.setAttribute('class', 'h4-description-anime');
  descriptionName.innerHTML = 'Descrição:';

  var descriptionAnime = document.createElement('p');
  descriptionAnime.setAttribute('class', 'p-description-anime');
  descriptionAnime.innerHTML = anime.description;

  const duration = document.createElement('div');
  duration.setAttribute('class', 'div-duration-anime');

  const seasonContainer = document.createElement('div');
  seasonContainer.setAttribute('class', 'div-season-anime');

  const seasonName = document.createElement('h4');
  seasonName.setAttribute('class', 'h4-seaso-anime');
  seasonName.innerHTML = 'Temporada:';

  var seasonAnime = document.createElement('p');
  seasonAnime.setAttribute('class', 'p-seaso-anime');
  seasonAnime.innerHTML = anime.season;

  const episodeContainer = document.createElement('div');
  episodeContainer.setAttribute('class', 'div-episode-anime');

  const episodeName = document.createElement('h4');
  episodeName.setAttribute('class', 'h4-episode-anime');
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

function goOwnerUser(user_id, name) {
  axios.get(base_url+'/searchs/'+user_id)
  .then(function(res) {
    Object.assign(res.data, { name });
    sessionStorage.setItem('list_anime_user', JSON.stringify(res.data));
    window.location.href = '../ownerUserAnimes';
  })
  .catch(function(error) {
    const { error:erro } = error.response.data;
    alert(erro);
  });
}

function back() {
  window.history.back()
}
