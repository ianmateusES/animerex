const base_url = "http://localhost:3333";

const title = document.querySelector('h1');

axios.get(base_url+'/animes', {
  headers: {
    'authorization': 'Bearer ' + token,
  }
})
.then(function(res) {
  console.log(res.data.docs);
  renderAnimes(res.data.docs);
})
.catch(function(error) {
  const { error:erro } = error.response.data;
  if (erro ==='Invalid JWT token') {
    localStorage.removeItem('@Anime-token');
    localStorage.removeItem('@Anime-user');
    alert(erro)
    window.location.href = '../entrar';
  }
  title.innerHTML = 'Error na busca por animes'
});

function renderAnimes(listAnime) {
  var divListAnime = document.querySelector('#list-anime');
  for(anime of listAnime) {

    var divCard = document.createElement('div');
    divCard.setAttribute('class', 'div-card-anime');

    var divInfo = document.createElement('div');
    divInfo.setAttribute('class', 'div-info-anime');

    var divImg = document.createElement('div');
    divImg.setAttribute('class', 'div-img-anime-card');

    var imgAnime = document.createElement('img');
    imgAnime.setAttribute('class', 'img-anime');

    var divDescription = document.createElement('div');
    divDescription.setAttribute('class', 'div-description-anime-card');

    var nameAnime = document.createElement('p');
    nameAnime.setAttribute('class', 'p-name-anime-card');

    var tempEpsAnime = document.createElement('p');
    tempEpsAnime.setAttribute('class', 'p-temp-ep-anime-card');

    var divWatch = document.createElement('div');
    divWatch.setAttribute('class', 'div-watch-anime');

    var linkWatch = document.createElement('a');
    linkWatch.setAttribute('class', 'link-watch-anime');


    imgAnime.setAttribute('src', anime.img_link);
    divImg.appendChild(imgAnime);


    nameAnime.innerHTML = anime.name;
    divDescription.appendChild(nameAnime);
    tempEpsAnime.innerHTML = `${anime.season} Temp. ${anime.episode} Ep.`;
    divDescription.appendChild(tempEpsAnime);

    linkWatch.setAttribute('href', anime.link_watch);
    linkWatch.innerHTML = 'Assistir';
    linkWatch.setAttribute('target', '_blank');
    divWatch.appendChild(linkWatch);

    divInfo.appendChild(divImg);
    divInfo.appendChild(divDescription);
    divInfo.setAttribute('onclick', `animeInfo('${anime._id}')`);

    divCard.appendChild(divInfo);
    divCard.appendChild(divWatch);

    divListAnime.appendChild(divCard);
  }
}

function animeInfo(anime_id) {
  axios.get(base_url+'/animes/'+anime_id)
  .then(function(res) {
    sessionStorage.setItem('info_anime_owner', JSON.stringify(res.data));
    window.location.href = '../infoAnimeOwner';
  })
  .catch(function(error) {
    const { error:erro } = error.response.data;
    alert(erro);
  });
}

function registerAnime() {
  window.location.href = '../registerAnime';
}


