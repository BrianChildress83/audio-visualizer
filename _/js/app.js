//Create a new instance of an audio object and adjust properties

	var audio = new Audio();
	audio.src = '_/audio/BetterTogether.mp3';
	audio.controls = true;
	audio.loop = true;
	audio.autoplay = false;

//Establish all variable names
	var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;

// Itiialize mp3 player after page load
	window.addEventListener("load", initMp3Player, false);

	function initMp3Player() {
		document.getElementById('audio_box').appendChild(audio);
		context = new webkitAudioContext();  //AudioContext object instance CHROME ONLY
		analyser = context.createAnalyser();
		canvas = document.getElementById('analyser_render');
		ctx = canvas.getContext('2d');
		//Re-route audio playback into the processing graph
		source = context.createMediaElementSource(audio);
		source.connect(analyser);
		analyser.connect(context.destination);
		frameLooper();
	}
	// FrameLooper animates any style of graphics you wish to the audio freaquency
	function frameLooper() {
		window.webkitRequestAnimationFrame(frameLooper);
		fbc_array = new Uint8Array(analyser.frequencyBinCount);
		analyser.getByteFrequencyData(fbc_array);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = '#00CCFF'; // color of bars
		bars = 100;
		for (var i = 0; i < bars; i++) {
			bar_x = i * 3;
			bar_width = 2;
			bar_height = - (fbc_array[i] / 2);
			// Draw bars
			ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
		}
	}