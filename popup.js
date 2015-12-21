function highlightOn(){
	var background = chrome.extension.getBackgroundPage();
    background.sendMessageToContent("highlightId", "on");
}

function highLightOff(){
	var background = chrome.extension.getBackgroundPage();
    background.sendMessageToContent("highlightId", "off");
}

function domAnalyse(){
	var background = chrome.extension.getBackgroundPage();
    background.sendMessageToContent("analyse", "");
}

document.getElementById('hl_on').addEventListener('click', highlightOn);
document.getElementById('hl_off').addEventListener('click', highLightOff);
document.getElementById('analyse').addEventListener('click', domAnalyse);