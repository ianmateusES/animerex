const base_url = "http://localhost:3333";
console.log(JSON.parse(sessionStorage.getItem('list_anime')));

const { docs: listAnime, page, pages } = JSON.parse(sessionStorage.getItem('list_anime'));
var titlePesquisa = document.querySelector('#name-user');

if (listAnime) {
  const { name } = listAnime[0];
  titlePesquisa.innerHTML = name;
  renderAnimes(listAnime);
} else {
  titlePesquisa.innerHTML = 'Error search';
}

function renderAnimes(Animes) {
  var divListAnime = document.querySelector('#list-anime');

  for(anime of Animes) {
    const ownerUser = anime.user_id;

    var divCard = document.createElement('div');
    divCard.setAttribute('class', 'div-card-anime');

    var divInfo = document.createElement('div');
    divInfo.setAttribute('class', 'div-info-anime');
    divInfo.setAttribute('onclick', `animeInfo('${anime._id}')`);

    var divImg = document.createElement('div');
    divImg.setAttribute('class', 'div-img-anime-card');

    var imgAnime = document.createElement('img');
    imgAnime.setAttribute('class', 'img-anime');
    imgAnime.setAttribute('src', anime.img_link);

    var divDescription = document.createElement('div');
    divDescription.setAttribute('class', 'div-description-anime-card');

    var nameAnime = document.createElement('p');
    nameAnime.setAttribute('class', 'p-name-anime-card');
    nameAnime.innerHTML = anime.name;

    var tempEpsAnime = document.createElement('p');
    tempEpsAnime.setAttribute('class', 'p-temp-ep-anime-card');
    tempEpsAnime.innerHTML = `${anime.season} Temp. ${anime.episode} Ep.`;

    var divNameUser = document.createElement('div');
    divNameUser.setAttribute('class', 'div-name-user');
    divNameUser.setAttribute('onclick', `listAnimesOwnerUser('${ownerUser._id}', '${ownerUser.name}')`);

    var pNameUser = document.createElement('p');
    pNameUser.setAttribute('class', 'p-name-user');
    pNameUser.innerHTML = ownerUser.name;

    var divWatch = document.createElement('div');
    divWatch.setAttribute('class', 'div-watch-anime');

    var linkWatch = document.createElement('a');
    linkWatch.setAttribute('class', 'link-watch-anime');
    linkWatch.setAttribute('href', anime.link_watch);
    linkWatch.innerHTML = 'Assistir';
    linkWatch.setAttribute('target', '_blank');


    divImg.appendChild(imgAnime);

    divDescription.appendChild(nameAnime);
    divDescription.appendChild(tempEpsAnime);

    divInfo.appendChild(divImg);
    divInfo.appendChild(divDescription);

    divNameUser.appendChild(pNameUser)

    divWatch.appendChild(linkWatch);

    divCard.appendChild(divInfo);
    divCard.appendChild(divNameUser);
    divCard.appendChild(divWatch);

    divListAnime.appendChild(divCard);
  }
}

function listAnimesOwnerUser(user_id, name) {
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

function clearSearch() {
  window.location.href = '../animes';
}
