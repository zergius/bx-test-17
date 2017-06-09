(function(){
	"use strict";
	document.addEventListener("DOMContentLoaded", function(e) {
		var screens = document.getElementsByClassName("screen");
		var currentStep = 0;
		var answers = [];
		var result = '';

		var changeStep = function(step) {
			//console.log('change step ' + step);
			for(var i = 0; i < screens.length; i++) {
				screens[i].className = "screen";
			}
			var stepId = "step-" + step;
			document.getElementById(stepId).className += " visible";
			window.scrollTo(0, 134);
			currentStep = step;
		}

		var calculateResult = function() {
			//todo - check that only five elements in answers
			var resultVariant = '';
			//console.log(answers);
			for(var i = 0; i < screens.length; i++) {
				screens[i].className = "screen";
			}
			var numberAnswers = {};
			for(var i = 0; i < answers.length; i++) {
				numberAnswers[answers[i]] = (numberAnswers[answers[i]] || 0) + 1;
			}
			var answersByFrequency = [];
			for(var variant in numberAnswers) {
				answersByFrequency.push([variant, numberAnswers[variant]]);
			}
			answersByFrequency.sort(function(a, b) {return b[1] - a[1]});
			if(answersByFrequency[0][1] > 2 || answersByFrequency[0][1] == 2 && answersByFrequency[1][1] < 2) {
				resultVariant = answersByFrequency[0][0];
			}
			else {
				resultVariant = answersByFrequency[0][0];
			}
			result = resultVariant;
		}

		var showResult = function() {
			if(result.length > 0) {
				window.scrollTo(0, 0);
				location = 'bitrix-test-result-' + result + '.html';
			}
		}

		/*var connectFacebook = function() {
			for(var i = 0; i < screens.length; i++) {
				screens[i].className = "screen";
			}
			document.getElementById("facebook-connect").className += " visible";
		}*/

		var processStep = function(option) {
			answers.push(option);
			if(currentStep < 5) {
				var nextStep = currentStep + 1;
				changeStep(nextStep);
			}
			else {
				//currentStep = 6;
				//connectFacebook();
				calculateResult();
				showResult();
			}
		}

		document.getElementById("start-btn").addEventListener("click", function(){
			changeStep(1);
		}, false);

		var stepOptions = document.getElementsByClassName("step-option");
		for (var i = 0; i < stepOptions.length; i++) {
			stepOptions[i].addEventListener("click", function(){
				processStep(this.getAttribute("data-option"));
			}, false);
		}

		//stub function for facebook connections processing, perhaps will load something via ajax call or in a popup window and save somewhere with ajax call or similar.
		/*document.getElementById("btn-connect-facebook").addEventListener("click", function(){
			window.scrollTo(0, 0);
			calculateResult();
			location.hash = result;
			var connectFacebookResult = confirm("Connect a facebook profile and get a chance to ...");
			if (connectFacebookResult == true) {
				//console.log('facebook connected, display result.');
				showResult();
			} else {
				//console.log('declined to connect facebook, display result anyway.');
				showResult();
			}
		}, false);*/

		/*document.getElementById("gotoStart-btn").addEventListener("click", function(){
			location.hash = "";
			window.location.reload();
		}, false);*/
		document.getElementById("step-0").className += " visible";
	});

	window.onbeforeunload = function(){
		window.scrollTo(0,0);
	}
})(window, document);