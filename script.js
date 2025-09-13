// 結果類型定義
const results = {
    midnightBlue: {
        title: '午夜藍｜思辨者',
        description: '你熱愛探索世界的深層邏輯與人性的複雜。對你而言，閱讀是一場心智的冒險，讓你沉浸在嚴謹的結構與宏大的世界觀中。\n\n推薦書單：科幻、推理、哲學、深度小說。'
    },
    orangeSunlight: {
        title: '橘日光｜生活玩家',
        description: '你善於從平凡的日常中發現美好。閱讀對你來說，是感受生活的溫度，品味文字間的香氣與質地，讓片刻時光變得溫暖而充實。\n\n推薦書單：飲食文化、散文、生活美學。'
    },
    forestGreen: {
        title: '森林深呼吸｜探索者',
        description: '你的靈魂嚮往遠方，渴望透過文字去到未曾踏足的土地。閱讀是你的任意門，帶你穿越山川與人海，體驗世界的廣闊與多樣性。\n\n推薦書單：旅行文學、人文地理、生態書寫。'
    },
    roseMilkTea: {
        title: '玫瑰奶茶｜浪漫派',
        description: '你的情感細膩豐富，能敏銳地捕捉文字中的情緒與詩意。對你來說，閱讀是一場心靈的共振，讓你與故事中的角色一同歡笑與流淚。\n\n推薦書單：詩集、愛情小說、抒情散文。'
    },
    multicolor: {
        title: '多色拼貼｜雜食型閱讀靈魂',
        description: '你擁有不被定義的閱讀光譜！你的好奇心旺盛，對各種類型的書籍都抱持開放的態度。你的書架就像一座驚奇的百寶箱，反映出你豐富而多元的內心世界。'
    }
};

// 題目與選項對應
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

// ----- 下方是測驗的核心運作邏輯，你不需要修改它們 -----

const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultTitleElement = document.getElementById('result-title');
const resultDescriptionElement = document.getElementById('result-description');
const restartBtn = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let scores = {};

function getInitialScores() {
    const initialScores = {};
    // 只初始化四種主要顏色的分數
    const mainColors = ['midnightBlue', 'orangeSunlight', 'forestGreen', 'roseMilkTea'];
    mainColors.forEach(color => {
        initialScores[color] = 0;
    });
    return initialScores;
}

function startQuiz() {
    currentQuestionIndex = 0;
    scores = getInitialScores();
    resultContainer.classList.add('hide');
    questionContainer.classList.remove('hide');
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
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

    const finalResultKey = calculateResult();
    const finalResult = results[finalResultKey];
    
    resultTitleElement.innerText = finalResult.title;
    resultDescriptionElement.innerText = finalResult.description;
}

function calculateResult() {
    const scoreValues = Object.values(scores);
    const maxScore = Math.max(...scoreValues);
    
    const winners = Object.keys(scores).filter(key => scores[key] === maxScore);
    
    // 如果最高分不只一個 (平手)，就回傳隱藏結果
    if (winners.length > 1) {
        return 'multicolor';
    } else {
        return winners[0];
    }
}

restartBtn.addEventListener('click', startQuiz);

startQuiz();