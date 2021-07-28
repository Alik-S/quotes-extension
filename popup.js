var map = new Map();
var intervalOpacity;
var quotesNum = 0;
var subjects = new Array();
window.onload = function onload() {
	readTxtFile("quotes.txt");
 document.getElementById("quoteContainer").addEventListener('click', function() {
	var tooltip = document.getElementById("tooltip");
	if(document.getElementById("tooltip").style.display === 'inline-block') return;
	tooltip.style.display = 'inline-block';
	tooltip.style.opacity = 1.0;
	intervalOpacity = setInterval(function() {
	tooltip.style.opacity = tooltip.style.opacity - 0.1;
	if(tooltip.style.opacity === '0.2') {
		tooltip.style.display = 'none';
		clearInterval(intervalOpacity); 
	}
	}, 100);
	var tmpForCopyTxtArea = document.getElementById("tmpForCopyTxtArea");
	tmpForCopyTxtArea.style.display = 'block';
	tmpForCopyTxtArea.value = document.getElementById("quoteContainer").innerHTML + " " + document.getElementById("quoteSubject").innerHTML;
	tmpForCopyTxtArea.select();
	document.execCommand("copy");
		tmpForCopyTxtArea.style.display = 'none';
});
}

function readTxtFile(fileName) {
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", fileName, true);
	rawFile.onreadystatechange = function() {
		if(rawFile.readyState === 4) {
			if(rawFile.status === 200 || rawFile.status == 0) {
				var creator = "";
				var quotesTmp = rawFile.responseText.split("^");
				quotesTmp.forEach(function(item, index) {
						if(!item.trim().startsWith("..")) {
							subjects.push(quotesTmp[index - 1]);
							var tmpArr = item.split("!!");
							tmpArr.forEach(function(quoteItem, ind) {
								map.set(ind + quotesNum, {id: ind + quotesNum, creator: quotesTmp[index - 1].trim().substring(2), quote: quoteItem.trim()});
							});				


							quotesNum += tmpArr.length;
							}
						});
	chooseAndSetQuote();
	}

			}
		}
	rawFile.send(null);
}

function chooseAndSetQuote() {
	let random = Math.floor(Math.random() * (quotesNum)) + 0;
	let selected =  map.get(random);
	console.log(selected);
	document.getElementById("quoteContainer").innerHTML = selected.quote;
	document.getElementById("quoteSubject").innerHTML = selected.creator;

}


