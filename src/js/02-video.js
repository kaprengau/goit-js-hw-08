import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');

const player = new Player(iframe);
const currentTime = 'videoplayer-current-time';

const onPlay = function (data) {
  localStorage.setItem(currentTime, JSON.stringify(data));
};

player.on('timeupdate', throttle(onPlay, 1000));

const timeString = localStorage.getItem(currentTime);

if (timeString) {
  const timeParse = JSON.parse(timeString);
  player.setCurrentTime(timeParse.seconds);
} else {
  console.log('Play time not found in localStorage');
}
