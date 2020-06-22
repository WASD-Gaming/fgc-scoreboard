window.onload = init;

function init(){

	var xhr = new XMLHttpRequest(); //AJAX data request sent to server(in this case server being local json file)
	var streamJSON = '../sc/streamcontrol.json'; //specifies path for streamcontrol output json
	var scObj; //variable to hold data extracted from parsed json
	var startup = true; //flag for if looping functions are on their first pass or not
	var animated = false; //flag for if scoreboard animation has run or not
	var cBust = 0; //variable to hold cache busting value
	var game; //variable to hold game value from streamcontrol dropdown
	var p1Wrap = $('#p1Wrapper'); //variables to shortcut copypasting text resize functions
	var p2Wrap = $('#p2Wrapper');
	var rdResize = $('#round');

	xhr.overrideMimeType('application/json'); //explicitly declares that json should always be processed as a json filetype

	function pollJSON() {
		xhr.open('GET',streamJSON+'?v='+cBust,true); //string query-style cache busting, forces non-cached new version of json to be opened each time
		xhr.send();
		cBust++;
	}

	pollJSON();
	setInterval(function(){pollJSON();},500); //runs polling function twice per second

	xhr.onreadystatechange = parseJSON; //runs parseJSON function every time XMLHttpRequest ready state changes

	function parseJSON() {
		if(xhr.readyState === 4){ //loads data from json into scObj variable each time that XMLHttpRequest ready state reports back as '4'(successful)
			scObj = JSON.parse(xhr.responseText);
			if(animated == true){
				scoreboard(); //runs scoreboard function each time readyState reports back as 4 as long as it has already run once and changed animated value to false
			}
		}
	}

	function scoreboard(){

		if(startup == true){
			game = scObj['game'];
			$('#gameHold').html(game); //sets 'game' value into placeholder div

			if(game == 'BBTAG' || game == 'SFVAE' || game == 'TEKKEN7' || game == 'UNIST'){
				// Shifts the scoreboard BG wrappers down to match HP bars
				offset = document.getElementById("leftBGWrapper").offsetTop;
				TweenMax.fromTo('#leftBGWrapper', 0.5, {css:{y: offset}}, {css:{y: adjust1}})
				TweenMax.fromTo('#rightBGWrapper', 0.5, {css:{y: offset}}, {css:{y: adjust1}})
				TweenMax.set('#leftWrapper',{css:{y: '4px'}});
				TweenMax.set('#rightWrapper',{css:{y: '4px'}});
			}
			else if(game == 'BBCF' || game == 'DBFZ' || game == 'GGXRD' || game == 'KOFXIV' || game == 'MVCI' || game == 'UMVC3'){
				// Shifts the scoreboard text wrappers up to match HP bars
				TweenMax.set('#leftWrapper',{css:{y: adjust2}});
				TweenMax.set('#rightWrapper',{css:{y: adjust2}});
			}
			else if(game == 'USF4'){
				offset = document.getElementById("leftBGWrapper").offsetTop;
				TweenMax.fromTo('#leftBGWrapper', 0.5, {css:{y: offset}}, {css:{y: adjust3}})
				TweenMax.fromTo('#rightBGWrapper', 0.5, {css:{y: offset}}, {css:{y: adjust3}})
				TweenMax.set('#leftWrapper',{css:{y: adjust3}});
				TweenMax.set('#rightWrapper',{css:{y: adjust3}});
			}
			else{
				TweenMax.set('#leftWrapper',{css:{y: adjust2}}); //if 'game' value is anything other than specified above it defaults to 2nd webm/placement
				TweenMax.set('#rightWrapper',{css:{y: adjust2}});
			}
			if(game == 'BBTAG' || game == 'UNIST'){
				var adjustLgW = parseFloat($('.logos').css('width')) * adjustLg[2]; //shrinks logo sizes based on scaling variable set in scoreboard.html
				var adjustLgH = parseFloat($('.logos').css('height')) * adjustLg[2];
				TweenMax.set('.logos',{css:{x: adjustLg[0], y: adjustLg[1], width: adjustLgW, height: adjustLgH}});
			}

			getData(); //runs function that sets data polled from json into html objects
			setTimeout(logoLoop,logoTime); //sets logoLoop function out in time specified in logoTime variable in scoreboard.html
			startup = false; //flags that the scoreboard/getData functions have run their first pass
			animated = true; //flags that the scoreboard animation has run
		}
		else{
			getData(); //if startup is not set to true, only the getData function is run each time scoreboard function runs
		}
	}

	setTimeout(scoreboard,300);

	function getData(){

		var p1Name = scObj['p1Name']; //creates local variables to store data parsed from json
		var p2Name = scObj['p2Name'];
		var p1Team = scObj['p1Team'];
		var p2Team = scObj['p2Team'];
		var p1Score = scObj['p1Score'];
		var p2Score = scObj['p2Score'];
		var round = scObj['round'];

		if(startup == true){

			TweenMax.set('#p1Wrapper',{css:{x: p1Move}}); //sets name/round wrappers to starting positions for them to animate from
			TweenMax.set('#p2Wrapper',{css:{x: p2Move}});
			TweenMax.set('#round',{css:{y: rdMove}});

			$('#p1Name').html(p1Name); //changes html object values to values stored in local variables
			$('#p2Name').html(p2Name);
			$('#p1Team').html(p1Team);
			$('#p2Team').html(p2Team);
			$('#p1Score').html(p1Score);
			$('#p2Score').html(p2Score);
			$('#round').html(round);

			p1Wrap.each(function(i, p1Wrap){ //function to resize font if text string is too long and causes div to overflow its width/height boundaries
				while(p1Wrap.scrollWidth > p1Wrap.offsetWidth || p1Wrap.scrollHeight > p1Wrap.offsetHeight){
					var newFontSize = (parseFloat($(p1Wrap).css('font-size').slice(0,-2)) * .95) + 'px';
					$(p1Wrap).css('font-size', newFontSize);
				}
			});

			p2Wrap.each(function(i, p2Wrap){
				while(p2Wrap.scrollWidth > p2Wrap.offsetWidth || p2Wrap.scrollHeight > p2Wrap.offsetHeight){
					var newFontSize = (parseFloat($(p2Wrap).css('font-size').slice(0,-2)) * .95) + 'px';
					$(p2Wrap).css('font-size', newFontSize);
				}
			});

			rdResize.each(function(i, rdResize){
				while(rdResize.scrollWidth > rdResize.offsetWidth || rdResize.scrollHeight > rdResize.offsetHeight){
					var newFontSize = (parseFloat($(rdResize).css('font-size').slice(0,-2)) * .95) + 'px';
					$(rdResize).css('font-size', newFontSize);
				}
			});

			TweenMax.to('#p1Wrapper',nameTime,{css:{x: '+0px', opacity: 1},ease:Quad.easeOut,delay:nameDelay}); //animates wrappers traveling back to default css positions while
			TweenMax.to('#p2Wrapper',nameTime,{css:{x: '+0px', opacity: 1},ease:Quad.easeOut,delay:nameDelay}); //fading them in, timing/delay based on variables set in scoreboard.html
			TweenMax.to('#round',rdTime,{css:{y: '+0px', opacity: 1},ease:Quad.easeOut,delay:rdDelay});
			TweenMax.to('.scores',scTime,{css:{opacity: 1},ease:Quad.easeOut,delay:scDelay});
		}
		else{
			game = scObj['game']; //if this is after the first time that getData function has run, changes the value of the local game variable to current json output

			if($('#p1Name').text() != p1Name || $('#p1Team').text() != p1Team){ //if either name or team do not match, fades out wrapper and updates them both
				TweenMax.to('#p1Wrapper',.3,{css:{x: p1Move, opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){ //uses onComplete parameter to execute function after TweenMax
					$('#p1Wrapper').css('font-size',nameSize); //restores default font size based on variable set in scoreboard.html
					$('#p1Name').html(p1Name); //updates name and team html objects with current json values
					$('#p1Team').html(p1Team);

					p1Wrap.each(function(i, p1Wrap){//same resize functions from above
						while(p1Wrap.scrollWidth > p1Wrap.offsetWidth || p1Wrap.scrollHeight > p1Wrap.offsetHeight){
							var newFontSize = (parseFloat($(p1Wrap).css('font-size').slice(0,-2)) * .95) + 'px';
							$(p1Wrap).css('font-size', newFontSize);
						}
					});

					TweenMax.to('#p1Wrapper',.3,{css:{x: '+0px', opacity: 1},ease:Quad.easeOut,delay:.2}); //fades name wrapper back in while moving to original position
				}});
			}

			if($('#p2Name').text() != p2Name || $('#p2Team').text() != p2Team){
				TweenMax.to('#p2Wrapper',.3,{css:{x: p2Move, opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
					$('#p2Wrapper').css('font-size',nameSize);
					$('#p2Name').html(p2Name);
					$('#p2Team').html(p2Team);

					p2Wrap.each(function(i, p2Wrap){
						while(p2Wrap.scrollWidth > p2Wrap.offsetWidth || p2Wrap.scrollHeight > p2Wrap.offsetHeight){
							var newFontSize = (parseFloat($(p2Wrap).css('font-size').slice(0,-2)) * .95) + 'px';
							$(p2Wrap).css('font-size', newFontSize);
						}
					});

					TweenMax.to('#p2Wrapper',.3,{css:{x: '+0px', opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}

			if($('#round').text() != round){
				TweenMax.to('#round',.3,{css:{opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){ //same format as changing names just no change in positioning, only fade in/out
					$('#round').css('font-size',rdSize);
					$('#round').html(round);

					rdResize.each(function(i, rdResize){
						while(rdResize.scrollWidth > rdResize.offsetWidth || rdResize.scrollHeight > rdResize.offsetHeight){
							var newFontSize = (parseFloat($(rdResize).css('font-size').slice(0,-2)) * .95) + 'px';
							$(rdResize).css('font-size', newFontSize);
						}
					});

					TweenMax.to('#round',.3,{css:{opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}

			if($('#p1Score').text() != p1Score){ //same as round, no postioning changes just fade out, update text, fade back in
				TweenMax.to('#p1Score',.3,{css:{opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
					$('#p1Score').html(p1Score);

					TweenMax.to('#p1Score',.3,{css:{opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}

			if($('#p2Score').text() != p2Score){
				TweenMax.to('#p2Score',.3,{css:{opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
					$('#p2Score').html(p2Score);

					TweenMax.to('#p2Score',.3,{css:{opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}

			if($('#gameHold').text() != game){ //checks to see if current json value for 'game' has changed from what is stored in gameHold html object
				TweenMax.to('#scoreboardBG',.3,{css:{opacity: 0},delay:0});
				TweenMax.to('#scoreboard',.3,{css:{opacity: 0},delay:0}); //hide scoreboard background, scoreboard text, and logos
				TweenMax.to('.logos',.3,{css:{opacity: 0},delay:0,onComplete:function(){ //then execute function
					$('#gameHold').html(game); //updates gameHold html object with new game dropdown value

					if(game == 'BBTAG' || game == 'SFVAE' || game == 'TEKKEN7' || game == 'UNIST'){
						offset = document.getElementById("leftBGWrapper").offsetTop;
						TweenMax.fromTo('#leftBGWrapper', 0.5, {css:{y: offset}}, {css:{y: adjust1}})
						TweenMax.fromTo('#rightBGWrapper', 0.5, {css:{y: offset}}, {css:{y: adjust1}})
						TweenMax.set('#leftWrapper',{css:{y: '4px'}});
						TweenMax.set('#rightWrapper',{css:{y: '4px'}});
					}
					else if(game == 'BBCF' || game == 'DBFZ' || game == 'GGXRD' || game == 'KOFXIV' || game == 'MVCI' || game == 'UMVC3'){
						TweenMax.set('#leftBGWrapper',{css:{y: '+0px'}});
						TweenMax.set('#rightBGWrapper',{css:{y: '+0px'}});
						TweenMax.set('#leftWrapper',{css:{y: adjust2}});
						TweenMax.set('#rightWrapper',{css:{y: adjust2}});
					}
					else if(game == 'USF4'){
						TweenMax.set('#leftWrapper',{css:{y: adjust3}});
						TweenMax.set('#rightWrapper',{css:{y: adjust3}});
					}
					else{
						TweenMax.set('#leftWrapper',{css:{y: adjust2}});
						TweenMax.set('#rightWrapper',{css:{y: adjust2}});
					}
					if(game == 'BBTAG' || game == 'UNIST'){
						var adjustLgW = parseFloat(adjustLg[3]) * adjustLg[2]; //var changed so that it bases resized on original logo size rather than current value
						var adjustLgH = parseFloat(adjustLg[4]) * adjustLg[2]; //uses variables stored in the 'adjustLg' array in scoreboard.html
						TweenMax.set('.logos',{css:{x: adjustLg[0], y: adjustLg[1], width: adjustLgW, height: adjustLgH}});
					}
					else{
						TweenMax.set('.logos',{css:{x: '+0px', y: '+0px', width: adjustLg[3], height: adjustLg[4]}}); //also return logos to original positioning and size
					}

					playCSSAnimations();

					TweenMax.to('#scoreboardBG',.3,{css:{opacity: 1},delay:.3}); //fade background/text objects back in with enough delay for scoreboard to finish playing first
					TweenMax.to('#scoreboard',.3,{css:{opacity: 1},delay:.3});
					TweenMax.to('.logos',.3,{css:{opacity: .7},delay:.3}); //TweenMax to fade logos back in, note to fade them to same opacity as default in CSS
				}});
			}
		}
	}

	function playCSSAnimations(){
		roundBG = document.getElementById("roundBG");
		roundBG.classList.remove("round-animation");
		void roundBG.offsetWidth;
		roundBG.classList.add("round-animation");

		player1BG = document.getElementById("p1PlayerBG");
		player1BG.classList.remove("player1-animation");
		void player1BG.offsetWidth;
		player1BG.classList.add("player1-animation");

		score1BG = document.getElementById("p1ScoreBG");
		score1BG.classList.remove("p1s-animation");
		void score1BG.offsetWidth;
		score1BG.classList.add("p1s-animation");

		player2BG = document.getElementById("p2PlayerBG");
		player2BG.classList.remove("player2-animation");
		void player2BG.offsetWidth;
		player2BG.classList.add("player2-animation");

		score2BG = document.getElementById("p2ScoreBG");
		score2BG.classList.remove("p2s-animation");
		void score2BG.offsetWidth;
		score2BG.classList.add("p2s-animation");
	}

	function logoLoop(){
		var initialTime = 700; //initial fade-in time for first logo
		var intervalTime = 15000; //amount of time between changing of logos
		var fadeTime = 2000; //duration of crossfade between logos
		var currentItem = 0; //placement value within logoWrapper container of current logo being operated on in function
		var itemCount = $('#logoWrapper').children().length; //number of logo <img> objects located within logoWrapper container

		if(itemCount > 1){
			$('#logoWrapper').find('img').eq(currentItem).fadeIn(initialTime);

			setInterval(function(){

				$('#logoWrapper').find('img').eq(currentItem).fadeOut(fadeTime);

				if(currentItem == itemCount - 1){
					currentItem = 0;
				}
				else{
					currentItem++;
				}

				$('#logoWrapper').find('img').eq(currentItem).fadeIn(fadeTime);

			},intervalTime);
		}
		else{
			$('.logos').fadeIn(initialTime);
		}
	}
}
