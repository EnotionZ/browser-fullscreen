/*global chrome*/

var makeFullScreen = function() {
    var docElm = document.documentElement;
    if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
    } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
    } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
    } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
    }
};

if(typeof chrome !== 'undefined' && typeof chrome.browserAction !== 'undefined') {
    chrome.browserAction.onClicked.addListener(function() {
        makeFullScreen();
    });
}

if(typeof document !== 'undefined' && typeof document.body !== 'undefined') {
    var b = document.createElement('button');
    document.body.appendChild(b);
    b.setAttribute('style', 'position: fixed; right: 0; bottom: 0;');
    b.innerHTML = 'FullScreen';
    b.addEventListener('click', function() {
        makeFullScreen();
    });
}
