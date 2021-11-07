import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

 const iframe = document.querySelector('iframe'); 
 const player = new Player(iframe);
 const STORAGE_KEY = "videoplayer-current-time";
//  player.on('play', function() {
//     console.log('played the video!');
// });

// player.getVideoTitle().then(function(title) {
//     console.log('title:', title);
// });

const lastSavedTime = localStorage.getItem(STORAGE_KEY);
// console.log(lastSavedTime);
player.on('timeupdate', throttle(function (timeObj) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(timeObj.seconds));
    console.log("timeUpdate:", timeObj.seconds);  
}, 1000));

player.setCurrentTime(lastSavedTime).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});

