// 結果資料庫 (已移除 multicolor，新增書籍資訊)
const results = {
    midnightBlue: {
        title: '午夜藍｜思辨者',
        // 為了符合版型，將原本的長描述改為書籍推薦語
        bookTitle: '《海邊的卡夫卡》',
        bookIntro: '村上春樹經典之作。對熱愛深層邏輯與人性複雜的你，這本書是一場心智的冒險，帶你沉浸在嚴謹結構與宏大世界觀中。',
        themeColor: '#1a2a3a' // 可用來改變上方卡片顏色
    },
    orangeSunlight: {
        title: '橘日光｜生活玩家',
        bookTitle: '《日日是好日》',
        bookIntro: '森下典子茶道修行紀錄。你善於發現日常美好，這本書帶你品味季節流轉與生活溫度，讓片刻時光變得溫暖而充實。',
        themeColor: '#e67e22'
    },
    forestGreen: {
        title: '森林深呼吸｜探索者',
        bookTitle: '《阿拉斯加之死》',
        bookIntro: '強·克拉庫爾的紀實文學。你的靈魂嚮往遠方，這本書將帶你穿越荒野，體驗生命的廣闊與極限，是探索者的心靈歸屬。',
        themeColor: '#27ae60'
    },
    roseMilkTea: {
        title: '玫瑰奶茶｜浪漫派',
        bookTitle: '《小王子》',
        bookIntro: '聖修伯里的永恆經典。情感細膩的你，能讀懂書中隱藏的詩意。這是一場心靈共振，讓你與狐狸和玫瑰一同感受愛與羈絆。',
        themeColor: '#e84393'
    }
};

// 題目與選項
const questions = [
    {
        question: '推開街角書店的門，第一個吸引你的地方是…',
        answers: [
            { text: '世界文學經典', scores: { midnightBlue: 1 } },
            { text: '料理書與手作書', scores: { orangeSunlight: 1 } },
            { text: '旅行與自然書架', scores: { forestGreen: 1 } },
            { text: '詩集與愛情小說', scores: { roseMilkTea: 1 } }
        ]
    },
    {
        question: '你會選哪杯飲品坐下來閱讀？',
        answers: [
            { text: '熱美式', scores: { midnightBlue: 1 } },
            { text: '錫蘭紅茶', scores: { orangeSunlight: 1 } },
            { text: '檸檬氣泡水', scores: { forestGreen: 1 } },
            { text: '玫瑰熱可可', scores: { roseMilkTea: 1 } }
        ]
    },
    {
        question: '你最容易沉迷的書頁是…',
        answers: [
            { text: '世界觀豐富的長篇小說', scores: { midnightBlue: 1 } },
            { text: '有照片、有故事的生活紀錄書', scores: { orangeSunlight: 1 } },
            { text: '遠方旅行散文', scores: { forestGreen: 1 } },
            { text: '詩集或愛情故事', scores: { roseMilkTea: 1 } }
        ]
    },
    {
        question: '午後時分，窗外下起細雨，你會…',
        answers: [
            { text: '一口氣讀完推理小說', scores: { midnightBlue: 1 } },
            { text: '抄寫生活散文的句子', scores: { orangeSunlight: 1 } },
            { text: '計畫下一次長途旅行', scores: { forestGreen: 1 } },
            { text: '寫下心情想寄給某人', scores: { roseMilkTea: 1 } }
        ]
    },
    {
        question: '你決定帶一本書回家，那會是…',
        answers: [
            { text: '哲思小說', scores: { midnightBlue: 1 } },
            { text: '料理書', scores: { orangeSunlight: 1 } },
            { text: '攝影集／人文地理書', scores: { forestGreen: 1 } },
            { text: '詩集', scores: { roseMilkTea: 1 } }
        ]
    }
];

// ----- DOM 元素 -----
const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');
const questionTitleElement = document.getElementById('question-title');
const answerButtonsElement = document.getElementById('answer-buttons');

// 結果頁元素
const resultTitleElement = document.getElementById('result-title');
const resultBgColor = document.getElementById('result-bg-color');
const bookNameElement = document.getElementById('book-name');
const bookIntroElement = document.getElementById('book-intro');

const restartBtn = document.getElementById('restart-btn');
const progressBar = document.getElementById('progress-bar');
const stepCount = document.getElementById('step-count');

let currentQuestionIndex = 0;
let scores = {};

function getInitialScores() {
    return { midnightBlue: 0, orangeSunlight: 0, forestGreen: 0, roseMilkTea: 0 };
}

function startQuiz() {
    currentQuestionIndex = 0;
    scores = getInitialScores();
    resultContainer.classList.add('hide');
    questionContainer.classList.remove('hide');
    
    // 重置 Header 狀態
    document.querySelector('.app-header').style.opacity = '1';
    
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    
    // 更新 UI
    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
    stepCount.innerText = `${currentQuestionIndex + 1}/${questions.length}`;
    questionTitleElement.innerText = `Q${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    const labels = ['A.', 'B.', 'C.', 'D.'];
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.innerHTML = `<span style="opacity: 0.7; font-size: 0.8em; display:block; margin-bottom:5px;">${labels[index]}</span>${answer.text}`;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer.scores));
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(answerScores) {
    for (const resultKey in answerScores) {
        if (scores.hasOwnProperty(resultKey)) {
            scores[resultKey] += answerScores[resultKey];
        }
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionContainer.classList.add('hide');
    resultContainer.classList.remove('hide');
    
    // 隱藏進度條，讓畫面更乾淨
    document.querySelector('.app-header').style.opacity = '0';

    const finalResultKey = calculateResult();
    const finalResult = results[finalResultKey];
    
    // 填入資料
    resultTitleElement.innerText = finalResult.title;
    bookNameElement.innerText = finalResult.bookTitle;
    bookIntroElement.innerText = finalResult.bookIntro;
    
    // 動態改變上方卡片顏色 (可選)
    if(finalResult.themeColor) {
        resultBgColor.style.backgroundColor = finalResult.themeColor;
        // 調整邊框顏色以匹配背景
        resultBgColor.style.boxShadow = `inset 0 0 0 5px ${finalResult.themeColor}, inset 0 0 0 6px #e0c097`;
    }
}

function calculateResult() {
    const scoreValues = Object.values(scores);
    const maxScore = Math.max(...scoreValues);
    const winners = Object.keys(scores).filter(key => scores[key] === maxScore);
    const winnerIndex = Math.floor(Math.random() * winners.length);
    return winners[winnerIndex];
}

restartBtn.addEventListener('click', startQuiz);

startQuiz();
