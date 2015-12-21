function foo() { alert("bar"); }

function coloringId() {
	$("div[id]").css("background-color", "yellow");
}

function sendMessageToContent(message,state){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {command: message,status: state}, function(response) {
  	//responseに対するコールバック関数
  });
});
}