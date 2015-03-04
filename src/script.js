/*global chrome*/

var getFullScreenState = function() {
    if(typeof document.fullscreenElement !== 'undefined') {
        return document.fullscreenElement;
    } else if(typeof document.msFullscreenElement !== 'undefined') {
        return document.msFullscreenElement;
    } else if(typeof document.mozFullScreen !== 'undefined') {
        return document.mozFullScreen;
    } else if(typeof document.webkitIsFullScreen !== 'undefined') {
        return document.webkitIsFullScreen;
    }
};

var enterFullScreen = function() {
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

var exitFullScreen = function() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    }
};

var toggleFullScreen = function() {
    if(getFullScreenState()) {
        exitFullScreen();
    } else {
        enterFullScreen();
    }
};

if(typeof chrome !== 'undefined' && typeof chrome.browserAction !== 'undefined') {
    chrome.browserAction.onClicked.addListener(function() {
        enterFullScreen();
    });
}

if(typeof document !== 'undefined' && typeof document.body !== 'undefined') {
    var KEYS = { SHIFT: 16, CTRL: 17, F: 70 };
    var keydowns = {16: false, 17: false};
    document.body.addEventListener('keydown', function(e) {
        if(e.keyCode === KEYS.SHIFT || e.keyCode === KEYS.CTRL) {
            keydowns[e.keyCode] = true;
        }
    });
    document.body.addEventListener('keyup', function(e) {
        if(e.keyCode === KEYS.SHIFT || e.keyCode === KEYS.CTRL) {
            keydowns[e.keyCode] = false;
        }
        if(e.keyCode === KEYS.F && keydowns[KEYS.SHIFT] && keydowns[KEYS.CTRL]) {
            toggleFullScreen();
        }
    });
}
