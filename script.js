const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
// VoiceRSS Javascript SDK

//Disable/Enable Button
function toggleButton(){
	button.disabled = !button.disabled;
}
function tellMe(joke){
	   VoiceRSS.speech({
            key: 'ec2e1b66753b4fda86f65fcee08c51a2',
            src: joke,
            hl: 'en-us',
            r: 0, 
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false
        });
}

//Passing Joke to VoiceRSS API
// Get Jokes from Joke API
async function getJokes(){
	let joke = '';
	const apiUrl ='https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist'
	try{
		//Diable Button
        toggleButton();
		const response = await fetch(apiUrl);
		const data = await response.json();
		if (data.setup){
			joke = `${data.setup} ... ${data.delivery}`;
		} else{
			joke = data.joke;
		}
		// Text-to-Speech
      tellMe(joke);
    	}catch(error){
		//Catch Errors Here
		console.log('whooops', error);
	}
}

// Event Listeners

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);