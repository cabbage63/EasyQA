//backgroundからのメッセージを受信
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	console.log(sender.tab ?
		"from a content script:" + sender.tab.url :
		"from the extension");
	switch(message.command){
		case "highlightId":
		turnOn(message.status);
		break;
	}

	//レスポンスを返す場合（json形式)
	//sendResponse({farewell: "goodbye"});
});




//ドキュメント読み込み時に実行
$(document).ready(function(){
	console.log("hoge");
	$("*[id]").addClass("clickTarget");

	//クリックイベントを設置
	/*
	var clickElements = document.getElementsByClassName("clickTarget");
	for(var i=0; i<clickElements.length; i++){
		clickElements[i].addEventListener("click", function(event) {
			console.log(event.target);
		},false);
	}*/

	$('.clickTarget').on('click',function(e){
		if($(e.target).hasClass("clickTarget")){
			console.log(e.target);
			$(e.target).toggleClass("hlOn");
		}else{
			console.log("no");
		}
		e.stopPropagation();
	}); 

});

function turnOn(status){
	if(status === "on"){
		$("*[id]").addClass("highlight");
		var style = document.createElement('link');
		style.rel = 'stylesheet';
		style.type = 'text/css';
		style.href = chrome.extension.getURL('css/mystyles.css');
		(document.head||document.documentElement).appendChild(style);
	}else{
		$("*[id]").removeClass("highlight");
	}

	$("a").attr("href", "#").attr("target", "_self");

}

