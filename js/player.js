
var tracks = [
  'Roll Up',
  'Houses In The Hills',
  'Lotta Girls',
  'Pills',
  'Stay High Interlude',
  'Good Good',
  'Over Here',
  'Feel Your Heart',
  'FourFortyFive',
  'San Francisco',
  'Kiernan Outro',
];

var currentTrackIndex = 0;
var isPlayerExpanded = false;


var getTrackElement = function(index) {
  return document.getElementsByClassName('player__audio' + index)[0];;
};

var setTrackMetadata = function(index) {
  var trackTitleDiv = document.getElementsByClassName('player__texts__title')[0];
  var trackIndexSpan = document.getElementsByClassName('player__texts__track__index')[0];
  trackTitleDiv.innerHTML = tracks[index];
  trackIndexSpan.innerHTML = (index + 1).toString() + ' of ' + tracks.length.toString();
};

var togglePlayerExpand = function() {
  var playerBoxDiv = document.getElementsByClassName('player__box')[0];
  isPlayerExpanded = !isPlayerExpanded;
  if (isPlayerExpanded) {
    setTrackMetadata(currentTrackIndex);

    playTrack(currentTrackIndex);
    playerBoxDiv.classList.add('player__box--expanded');
  } else {
    playerBoxDiv.classList.remove('player__box--expanded');
    pauseTrack(currentTrackIndex);
  }
};

var playTrack = function(index) {
  getTrackElement(index).play();
  getTrackElement(index).addEventListener('ended', nextTrack);
};

var pauseTrack = function(index) {
  getTrackElement(index).pause();
  getTrackElement(index).removeEventListener('ended', nextTrack);
};

var previousTrack = function() {
  if (getTrackElement(currentTrackIndex).currentTime > 2) {
    // If the track has advanced more than 2 seconds, we just want to start at the beginning of that track
    getTrackElement(currentTrackIndex).currentTime = 0;
  } else {
    // Actually go to the previous track
    getTrackElement(currentTrackIndex).pause();
    currentTrackIndex -= 1;
    if (currentTrackIndex < 0) {
      currentTrackIndex = tracks.length - 1;
    }

    setTrackMetadata(currentTrackIndex);
    playTrack(currentTrackIndex);
  }

};

var nextTrack = function() {
  pauseTrack(currentTrackIndex);
  getTrackElement(currentTrackIndex).currentTime = 0;

  currentTrackIndex += 1;
  if (currentTrackIndex === tracks.length) {
    currentTrackIndex = 0;
  }

  setTrackMetadata(currentTrackIndex);
  playTrack(currentTrackIndex);
};


var albumCoverDiv = document.getElementsByClassName('player__cover')[0];
var prevButtonDiv = document.getElementsByClassName('player__controls__action--prev')[0];
var nextButtonDiv = document.getElementsByClassName('player__controls__action--next')[0];

albumCoverDiv.onclick = togglePlayerExpand;
prevButtonDiv.onclick = previousTrack;
nextButtonDiv.onclick = nextTrack;
