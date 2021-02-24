/* eslint-disable no-undef */
/* eslint-disable no-console */

var $topRatedImgs = document.querySelectorAll('.top-rated');
var $topRatedTitles = document.querySelectorAll('.anime-title-top');
var $randomTitle = document.querySelectorAll('.anime-title');
var $randomImgs = document.querySelectorAll('.four-rand-imgs');
var $topRatedGenre = document.querySelectorAll('.top-genre');
var $topRatedRank = document.querySelectorAll('.top-rank');
var $randomRank = document.querySelectorAll('.random-rank');
var $randomGenre = document.querySelectorAll('.random-genre');
var $homeButton = document.querySelector('.home-button');
var $randomButton = document.querySelector('.random-button');

function getTopRated(numOfTop, numOfRand) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.jikan.moe/v3/top/anime');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    setTopRated(xhr.response.top, numOfTop);
    var arrayOfRandomAnime = getRandomAnime(xhr.response.top, numOfRand);
    setRandomAnime(arrayOfRandomAnime, numOfRand);
  });
  xhr.send();
}

function getAnime(id, index, type) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.jikan.moe/v3/anime/' + id);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (type === 'topAnime') { setTopGenreRank(xhr.response, index); }
    if (type === 'ranAnime') { setRandomGenreRank(xhr.response, index); }
  });
  xhr.send();
}
if (info.page === 'home') {
  getTopRated(3, 4);
} else if (info.page === 'random') {
  console.log('hi');
}

function setRandomGenreRank(anime, index) {
  var genreList = 'Genre: ';
  for (var i = 0; i < anime.genres.length; i++) {
    if (i + 1 < anime.genres.length) {
      genreList += ' ' + anime.genres[i].name + ',';
    } else {
      genreList += ' ' + anime.genres[i].name;
    }
  }
  $randomRank[index].textContent = 'Rank: ' + anime.rank;
  $randomGenre[index].textContent = genreList;
}

function setTopGenreRank(anime, index) {
  var genreList = 'Genre: ';
  for (var i = 0; i < anime.genres.length; i++) {
    if (i + 1 < anime.genres.length) {
      genreList += ' ' + anime.genres[i].name + ',';
    } else {
      genreList += ' ' + anime.genres[i].name;
    }
  }
  $topRatedRank[index].textContent = 'Rank: ' + anime.rank;
  $topRatedGenre[index].textContent = genreList;
}

function setTopRated(animeList, amount) {
  for (var i = 0; i < amount; i++) {
    getAnime(animeList[i].mal_id, i, 'topAnime');
    $topRatedImgs[i].setAttribute('src', animeList[i].image_url);
    $topRatedTitles[i].textContent = animeList[i].title;
  }
}

function setRandomAnime(animeList, amount) {
  for (var i = 0; i < amount; i++) {
    getAnime(animeList[i].mal_id, i, 'ranAnime');
    $randomImgs[i].setAttribute('src', animeList[i].image_url);
    $randomTitle[i].textContent = animeList[i].title;
  }
}

function getRandomAnime(animeList, numOfAnime) {
  var arrayOfRandomAnime = [];
  for (var i = 0; i < numOfAnime; i++) {
    var a = Math.random() * numOfAnime;
    a = Math.floor(a);
    arrayOfRandomAnime.push(animeList[a]);
  }
  return arrayOfRandomAnime;
}

function handleHomeButton(event) {
  info.page = 'home';
}

$homeButton.addEventListener('click', handleHomeButton);

function handleRandomButton(event) {
  info.page = 'random';
}

$randomButton.addEventListener('click', handleRandomButton);
