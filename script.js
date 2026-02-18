// 結果類型定義 (已移除 multicolor)
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
const resultTitleElement = document.getElementById('result-title');
const resultDescriptionElement = document.getElementById('result-description');
const restartBtn = document.getElementById('restart-btn');
const progressBar = document.getElementById('progress-bar');
const stepCount = document.getElementById('step-count');

let currentQuestionIndex = 0;
let scores = {};

function getInitialScores() {
    return {
        midnightBlue: 0,
        orangeSunlight: 0,
        forestGreen: 0,
        roseMilkTea: 0
    };
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
    
    // 1. 更新進度條
    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
    
    // 2. 更新題號文字 (例如 3/5)
    stepCount.innerText = `${currentQuestionIndex + 1}/${questions.length}`;

    // 3. 顯示題目 (Q3. 題目內容)
    questionTitleElement.innerText = `Q${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    // 4. 生成選項按鈕 (加上 A. B. C. D.)
    const labels = ['A.', 'B.', 'C.', 'D.'];
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        // 加入標籤與文字
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

    // 進度條全滿
    progressBar.style.width = '100%';
    stepCount.innerText = '完成';

    const finalResultKey = calculateResult();
    const finalResult = results[finalResultKey];
    
    resultTitleElement.innerText = finalResult.title;
    resultDescriptionElement.innerText = finalResult.description;
}

function calculateResult() {
    const scoreValues = Object.values(scores);
    const maxScore = Math.max(...scoreValues);
    
    // 找出所有拿到最高分的 Key
    const winners = Object.keys(scores).filter(key => scores[key] === maxScore);
    
    // 如果有多個最高分，隨機選一個 (確保不會有雜食型)
    // 如果只有一個，也會正常回傳該結果
    const winnerIndex = Math.floor(Math.random() * winners.length);
    return winners[winnerIndex];
}

restartBtn.addEventListener('click', startQuiz);

// 初始化
startQuiz();
