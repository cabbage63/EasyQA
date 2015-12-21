function highlightOn(){
	var background = chrome.extension.getBackgroundPage();
    background.sendMessageToContent("highlightId", "on");
}

function highLightOff(){
	var background = chrome.extension.getBackgroundPage();
    background.sendMessageToContent("highlightId", "off");
}

document.getElementById('hl_on').addEventListener('click', highlightOn);
document.getElementById('hl_off').addEventListener('click', highLightOff);