const textToTypeElement = document.getElementById('text-to-type');
const typingArea = document.getElementById('typing-area');
const timeElement = document.getElementById('time');
const wpmElement = document.getElementById('wpm');
const accuracyElement = document.getElementById('accuracy');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');

const sampleTexts = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing is a skill that improves with practice.",
  "Speed and accuracy are the goals of typing tests.",
  "Coding is both an art and a science.",
  "JavaScript is versatile and fun to learn."
];

let timer;
let timeElapsed = 0;
let currentText = '';
let started = false;

// Start Test
startButton.addEventListener('click', () => {
  resetTest();
  startButton.disabled = true;
  resetButton.disabled = false;
  typingArea.disabled = false;
  typingArea.focus();
  currentText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
  textToTypeElement.textContent = currentText;
  started = true;
  timer = setInterval(() => {
    timeElapsed++;
    timeElement.textContent = timeElapsed;
  }, 1000);
});

// Typing Event
typingArea.addEventListener('input', () => {
  const typedText = typingArea.value;
  const typedLength = typedText.length;

  // Check if typing matches the text
  if (typedLength >= currentText.length) {
    clearInterval(timer);
    calculateResults(typedText);
    typingArea.disabled = true;
    startButton.disabled = false;
    resetButton.disabled = true;
    started = false;
  }
});

// Reset Test
resetButton.addEventListener('click', resetTest);

function resetTest() {
  clearInterval(timer);
  timeElapsed = 0;
  timeElement.textContent = 0;
  wpmElement.textContent = 0;
  accuracyElement.textContent = 0;
  typingArea.value = '';
  textToTypeElement.textContent = 'Click "Start Test" to begin typing.';
  startButton.disabled = false;
  typingArea.disabled = true;
  started = false;
}

// Calculate WPM and Accuracy
function calculateResults(typedText) {
  const correctChars = typedText.split('').filter((char, i) => char === currentText[i]).length;
  const accuracy = (correctChars / currentText.length) * 100;
  const wpm = (typedText.split(' ').length / (timeElapsed / 60)).toFixed(2);

  accuracyElement.textContent = accuracy.toFixed(2);
  wpmElement.textContent = wpm;
}
