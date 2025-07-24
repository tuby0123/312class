const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startButton = document.getElementById('start-btn');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
const retryButton = document.getElementById('retry-btn');
const scoreElement = document.getElementById('score');
const resultDetailsElement = document.getElementById('result-details');
const progressBar = document.querySelector('.progress-bar');

// C++과 Python 문제를 하나의 배열로 통합
const allQuestions = [
    // C++
    { question: "C++ 프로그램의 실행이 시작되는 함수의 이름은 무엇인가요?", options: ["start()", "main()", "begin()", "run()"], answer: "main()" },
    { question: "화면에 글자를 출력하기 위해 사용하는 C++ 표준 라이브러리 객체는?", options: ["cin", "cout", "print", "display"], answer: "cout" },
    { question: "C++에서 문장의 끝을 알리는 기호는 무엇인가요?", options: [".", ",", ":", ";"], answer: ";" },
    { question: "C++에서 한 줄 주석을 작성할 때 사용하는 기호는?", options: ["#", "//", "/* */", "---"], answer: "//" },
    { question: "정수(예: 10)를 저장하는 C++ 변수 타입은?", options: ["float", "char", "int", "string"], answer: "int" },
    { question: "C++에서 'Hello World'를 저장하는 표준 라이브러리 타입은?", options: ["char[]", "String", "string", "Text"], answer: "string" },
    { question: "두 값이 같은지 비교하는 C++ 연산자는?", options: ["=", "==", "!=", "=>"], answer: "==" },
    { question: "C++에서 변수 x에 5를 할당하는 코드는?", options: ["x == 5;", "x = 5;", "5 = x;", "int x == 5;"], answer: "x = 5;" },
    { question: "'cout'을 사용하기 위해 포함해야 하는 헤더 파일은?", options: ["#include <string>", "#include <iostream>", "#include <vector>", "#include <math>"], answer: "#include <iostream>" },
    { question: "참(true)/거짓(false) 값을 저장하는 C++ 변수 타입은?", options: ["bool", "boolean", "condition", "check"], answer: "bool" },
    { question: "조건이 참일 때 코드를 실행하는 C++ 제어문은?", options: ["for", "while", "if", "switch"], answer: "if" },
    { question: "사용자 키보드 입력을 받기 위한 C++ 객체는?", options: ["cout", "cin", "input", "get"], answer: "cin" },
    { question: "C++ 언어의 기반이 된 언어는?", options: ["Java", "Python", "C", "Basic"], answer: "C" },
    { question: "실수(예: 3.14)를 저장하는 C++ 변수 타입은?", options: ["int", "char", "double", "boolean"], answer: "double" },
    { question: "C++ 변수 이름으로 사용할 수 없는 것은?", options: ["myVariable", "_myVar", "1stVariable", "my_variable"], answer: "1stVariable" },
    // Python
    { question: "Python에서 화면에 글자를 출력하는 내장 함수는?", options: ["console.log()", "printf()", "print()", "echo()"], answer: "print()" },
    { question: "Python에서 한 줄 주석을 작성할 때 사용하는 기호는?", options: ["//", "/* */", "#", "---"], answer: "#" },
    { question: "코드 블록을 구분하기 위해 Python이 사용하는 것은?", options: ["중괄호 {}", "세미콜론 ;", "들여쓰기", "괄호 ()"], answer: "들여쓰기" },
    { question: "Python에서 변수 x에 10을 할당하는 방법은?", options: ["int x = 10", "var x = 10", "x = 10", "let x = 10"], answer: "x = 10" },
    { question: "수정 가능한 순서가 있는 목록을 위한 Python 자료구조는?", options: ["튜플(Tuple)", "세트(Set)", "리스트(List)", "딕셔너리(Dictionary)"], answer: "리스트(List)" },
    { question: "사용자 입력을 받기 위한 Python 함수는?", options: ["get_input()", "input()", "read()", "scan()"], answer: "input()" },
    { question: "Python에서 함수를 정의할 때 사용하는 키워드는?", options: ["function", "def", "fun", "define"], answer: "def" },
    { question: "Python 스크립트 파일의 일반적인 확장자는?", options: [".java", ".py", ".js", ".html"], answer: ".py" },
    { question: "두 값이 다른지 비교하는 Python 연산자는?", options: ["<>", "==", "!=", "is not"], answer: "!=" },
    { question: "문자열 'hello'와 'world'를 합치는 Python 연산자는?", options: ["&", "+", "*", "."], answer: "+" },
    { question: "Python 조건문에서 '그렇지 않으면 만약'을 의미하는 키워드는?", options: ["else if", "elseif", "elif", "or"], answer: "elif" },
    { question: "반복 실행에 사용되지 않는 Python 제어문은?", options: ["for", "while", "if", "loop"], answer: "if" },
    { question: "리스트의 길이를 확인하는 Python 함수는?", options: ["size()", "length()", "count()", "len()"], answer: "len()" },
    { question: "참/거짓을 나타내는 Python 데이터 타입은?", options: ["Boolean", "bool", "logical", "int"], answer: "bool" },
    { question: "문자열을 숫자로 변환할 수 없을 때 발생하는 Python 에러는?", options: ["SyntaxError", "TypeError", "ValueError", "NameError"], answer: "ValueError" }
];

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

// 배열을 무작위로 섞는 함수 (피셔-예이츠 셔플)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

startButton.addEventListener('click', startQuiz);

nextButton.addEventListener('click', () => {
    const selectedOption = document.querySelector('.option.selected');
    if (!selectedOption) return;

    const answer = selectedOption.textContent;
    userAnswers.push(answer);

    if (answer === currentQuestions[currentQuestionIndex].answer) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

retryButton.addEventListener('click', () => {
    resultScreen.classList.remove('active');
    startScreen.classList.add('active');
});

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    
    // 전체 문제 중 15개를 랜덤하게 선택
    const shuffled = shuffleArray([...allQuestions]);
    currentQuestions = shuffled.slice(0, 15);

    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    showQuestion();
}

function showQuestion() {
    updateProgressBar();
    const questionData = currentQuestions[currentQuestionIndex];
    questionElement.textContent = questionData.question;
    optionsElement.innerHTML = '';
    questionData.options.forEach(option => {
        const button = document.createElement('div');
        button.textContent = option;
        button.classList.add('option');
        button.addEventListener('click', () => {
            document.querySelectorAll('.option').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
        optionsElement.appendChild(button);
    });
}

function updateProgressBar() {
    const progress = (currentQuestionIndex / currentQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function showResult() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    progressBar.style.width = '100%';

    scoreElement.textContent = `총 ${currentQuestions.length}문제 중 ${score}문제를 맞혔습니다!`;

    resultDetailsElement.innerHTML = '';
    currentQuestions.forEach((questionData, index) => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');

        const isCorrect = userAnswers[index] === questionData.answer;
        resultItem.classList.add(isCorrect ? 'correct' : 'incorrect');

        const questionText = document.createElement('div');
        questionText.classList.add('result-question');
        questionText.textContent = `${index + 1}. ${questionData.question}`;

        const userAnswerText = document.createElement('div');
        userAnswerText.classList.add('user-answer');
        userAnswerText.textContent = `선택한 답: ${userAnswers[index] || '선택 안 함'}`;

        resultItem.appendChild(questionText);
        resultItem.appendChild(userAnswerText);

        if (!isCorrect) {
            const correctAnswerText = document.createElement('div');
            correctAnswerText.classList.add('correct-answer');
            correctAnswerText.textContent = `정답: ${questionData.answer}`;
            resultItem.appendChild(correctAnswerText);
        }

        resultDetailsElement.appendChild(resultItem);
    });
}