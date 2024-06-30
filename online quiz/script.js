const quizData = [
    {  
      question: '1. Number of primitive data types in Java are?',
      options: ['6', '7', '8', '9'],
      answer: '8',
    },
    {
      question:"2. Select the valid statement",
      options: ['char[] ch = new char(5)', 'char[] ch = new char[5]', 'char[] ch = new char()', 'char[] ch = new char[]'],
      answer: 'char[] ch = new char[5]',
    },
    {
      question: '3. When an array is passed to a method, what does the method receive?',
      options: ['The reference of the array', 'The copy of the array', 'Length of the array', 'copy of the first element'],
      answer: 'The reference of the array',
    },
    {
      question: '4. Which of the following is not a java feature?',
      options: ['Dynamic', 'Architeural Neutral', 'Use of pointers', 'Object-oriented'],
      answer: 'Use of pointers',
    },
    {
      question: '5. Which is used to find and fix bugs in java program?',
      options: [
        'JVM',
        'JRE',
        'JDK',
        'JDB',
      ],
      answer: 'JDB',
    },
    {
      question: '6. Evaluate the following java expression, if x=3, y=5, and z=10    ++Z+Y-Y+Z+X++',
      options: ['24', '20', '23', '25'],
      answer: '25',
    },
    {
      question: '7. An interface with no fields or methods is known as a ',
      options: [
        'Runnable interface',
        'Marker interface',
        'Abstract interface',
        'CharSequence interface',
      ],
      answer: 'Marker interface',
    },
    {
      question: '8. Which of the following is a reserved keyword in java?',
      options: ['object', 'strictfp', 'main', 'system'],
      answer: 'strictfp',
    },
    {
      question: '9. In java, JAR stands for ?',
      options: [
        'Java Archive Runner',
        'Java Application Resource',
        'Java Application Runner',
        'Java ARchive',
      ],
      answer: 'Java ARchive',
    },
    {
      question: '10. What is meant by the classes and objects that dependents on each other?',
      options: ['Tight coupling', 'Cohesion', 'Loose Coupling', 'None of the above'],
      answer: 'Tight coupling',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();