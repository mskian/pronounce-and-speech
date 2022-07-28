import nlp from 'compromise';
import speechPlugin from 'compromise-speech';
import sanitizeHtml from 'sanitize-html';
nlp.plugin(speechPlugin);

function pronounce(pronounceWord) {
    let word = nlp(pronounceWord);
    let speechWord = decodeURI(word.clauses().soundsLike());
    return speechWord;
}

let formData = document.querySelector('#postData');
if (formData) {
    formData.addEventListener('submit', postData);
}
function postData(user_event) {
    user_event.preventDefault();
    let userInput = document.querySelector('#userinput').value;
    const cleanWords = sanitizeHtml(userInput);
    if ('speechSynthesis' in window) {
        const word = pronounce(cleanWords).replaceAll(',', ' ');
        if (word == 0) {
            const to_speak = new SpeechSynthesisUtterance('Empty Data');
            speechSynthesis.speak(to_speak);
            document.getElementById('notice').innerHTML =
                ' <div class="px-4 py-4 text-red-800 bg-red-300 rounded ring-2 ring-red-800" role="alert"><p class="text-center font-medium">Empty Data</p></div>';
        } else {
            const to_speak = new SpeechSynthesisUtterance(
                word || 'Hello world'
            );
            speechSynthesis.speak(to_speak);
            document.getElementById('notice').innerHTML =
                ' <div class="px-4 py-4 text-purple-800 bg-purple-300 rounded ring-2 ring-purple-800" role="alert"><p class="text-center font-medium">🗣 Pronunciation: ' +
                word +
                '</p></div>';
        }
    } else {
        alert('not supported');
    }
}
