
var tracks = [
  'Roll Up',
  'Houses In The Hills',
];

var playerBoxDiv = document.getElementsByClassName('player__box')[0];
var albumCoverDiv = document.getElementsByClassName('player__cover')[0];
var nextButtonDiv = document.getElementsByClassName('player__controls__action--next')[0];
var prevButtonDiv = document.getElementsByClassName('player__controls__action--prev')[0];

var currentTrackIndex = 0;
var isPlayerExpanded = false;


var getTrackElement = function(index) {
  return document.getElementsByClassName('player__audio' + index)[0];;
};

var setSongMetadata = function(index) {
  var trackTitleDiv = document.getElementsByClassName('player__texts__title')[0];
  var trackIndexSpan = document.getElementsByClassName('player__texts__track__index')[0];
  trackTitleDiv.innerHTML = tracks[index];
  trackIndexSpan.innerHTML = (index + 1).toString() + ' of ' + tracks.length.toString();
};

var togglePlayerExpand = function() {
  isPlayerExpanded = !isPlayerExpanded;
  if (isPlayerExpanded) {
    setSongMetadata(currentTrackIndex);

    getTrackElement(currentTrackIndex).play();
    playerBoxDiv.classList.add('player__box--expanded');
  } else {
    playerBoxDiv.classList.remove('player__box--expanded');
    getTrackElement(currentTrackIndex).pause();
  }
};

var previousTrack = function() {
  if (getTrackElement(currentTrackIndex).currentTime > 2) {
    // If the song has advanced more than 2 seconds, we just want to start at the beginning of that song
    getTrackElement(currentTrackIndex).currentTime = 0;
  } else {
    // Actually go to the previous song
    getTrackElement(currentTrackIndex).pause();
    currentTrackIndex -= 1;
    if (currentTrackIndex < 0) {
      currentTrackIndex = tracks.length - 1;
    }

    setSongMetadata(currentTrackIndex);
    getTrackElement(currentTrackIndex).play();
  }

};

var nextTrack = function() {
  getTrackElement(currentTrackIndex).pause();
  getTrackElement(currentTrackIndex).currentTime = 0;

  currentTrackIndex += 1;
  if (currentTrackIndex === tracks.length) {
    currentTrackIndex = 0;
  }

  setSongMetadata(currentTrackIndex);
  getTrackElement(currentTrackIndex).play();
};


albumCoverDiv.onclick = togglePlayerExpand;
prevButtonDiv.onclick = previousTrack;
nextButtonDiv.onclick = nextTrack;
