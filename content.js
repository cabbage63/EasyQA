//backgroundからのメッセージを受信
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	console.log(sender.tab ?
		"from a content script:" + sender.tab.url :
		"from the extension");
	switch(message.command){
		case "highlightId":
		turnOn(message.status);
		break;

		case "analyse":
		analyse();
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
	//クリックした時にハイライトの色を変える
	$('.clickTarget').on('click',function(e){
		if($(e.target).hasClass("clickTarget")){
			$(e.target).toggleClass("hlOn");
		}else{
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

	//リンクを消す
	$("a").attr("href", "#").attr("target", "_self");

}


function analyse(){
	var spt = "";
	$(".hlOn").each(function(i, elem) {
		switch($(elem)[0].nodeName){
			case "INPUT":
				spt += genScriptForInput($(elem).attr("type").toString(), $(elem).attr("id").toString());
				break;
			case "SELECT":
				spt += genScriptForSelect($(elem).attr("id").toString());
		}
	});
	console.log(spt)
}

function genScriptForInput(type, id){

	//IDをキャメルケースに変更
	var camelId = snakeToCamel(id);
	camelId = camelId.charAt(0).toUpperCase() + camelId.slice(1);

	switch(type){
		case "text":
			return 'public static void set' + camelId + '(String value){ Selenide.$("#' + id + '").setValue(value); }\n';
			break;
		case "radio":

			break;
	}
}

function genScriptForSelect(id){

	//IDをキャメルケースに変更
	var camelId = snakeToCamel(id);
	camelId = camelId.charAt(0).toUpperCase() + camelId.slice(1);

	return 'public static void set' + camelId + '(String value){ Selenide.$("#' + id + '").selectOption(value); }\n';
}

function snakeToCamel(text){
        return text.replace(/_./g,
                function(s) {
                    return s.charAt(1).toUpperCase();
                }
        		);
}