const base_url = "http://localhost:3333";
console.log(JSON.parse(sessionStorage.getItem('list_anime_user')))

const { docs: listAnime, page, pages, name } = JSON.parse(sessionStorage.getItem('list_anime_user'));
var titleOwner = document.querySelector('#title-user');

if (listAnime) {
  titleOwner.innerHTML = name;
  renderAnimes(listAnime);
} else {
  titlePesquisa.innerHTML = 'Error search';
}

function renderAnimes(Animes) {
  var divListAnime = document.querySelector('#list-anime');

  for(anime of Animes) {
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

    divInfo.setAttribute('onclick', `animeInfo('${anime._id}')`);
    divInfo.appendChild(divImg);
    divInfo.appendChild(divDescription);

    divCard.appendChild(divInfo);
    divCard.appendChild(divWatch);

    divListAnime.appendChild(divCard);
  }
}

function animeInfo(anime_id) {
  axios.get(base_url+'/animes/'+anime_id)
  .then(function(res) {
    sessionStorage.setItem('info_anime', JSON.stringify(res.data));
    window.location.href = '../infoAnime';
  })
  .catch(function(error) {
    const { error:erro } = error.response.data;
    alert(erro);
  });
}

function back() {
  window.history.back()
}
