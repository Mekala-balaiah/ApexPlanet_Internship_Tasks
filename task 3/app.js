const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const resultEl = document.getElementById('result');

async function loadQuestion() {
  resultEl.textContent = '';
  answersEl.innerHTML = '';
  questionEl.textContent = 'Loading...';

  try {
    const response = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
    const data = await response.json();
    const questionData = data.results[0];

    const question = decodeHTML(questionData.question);
    const correctAnswer = decodeHTML(questionData.correct_answer);
    const answers = [...questionData.incorrect_answers.map(decodeHTML), correctAnswer];

    // Shuffle answers
    answers.sort(() => Math.random() - 0.5);

    questionEl.textContent = question;
    answers.forEach(answer => {
      const btn = document.createElement('button');
      btn.textContent = answer;
      btn.onclick = () => {
        if (answer === correctAnswer) {
          resultEl.textContent = '✅ Correct!';
        } else {
          resultEl.textContent = `❌ Incorrect! Correct Answer: ${correctAnswer}`;
        }
      };
      answersEl.appendChild(btn);
    });
  } catch (error) {
    questionEl.textContent = 'Failed to load question.';
  }
}

function decodeHTML(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

loadQuestion();
