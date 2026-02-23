// 結果資料庫 
// 請確保 images 資料夾在您的 GitHub 專案中，並且檔名正確 (大小寫需一致)
const results = {
    midnightBlue: {
        title: '深夜旅人',
        bookTitle: '《海邊的卡夫卡》',
        bookIntro: '村上春樹經典之作。對熱愛深層邏輯與人性複雜的你，這本書是一場心智的冒險，帶你沉浸在嚴謹結構與宏大世界觀中。',
        bgImage: './images/result-midnight.jpg',   // 建議使用深色背景圖
        bookCover: './images/book-kafka.jpg'       // 書封圖片
    },
    orangeSunlight: {
        title: '生活玩家',
        bookTitle: '《日日是好日》',
        bookIntro: '森下典子茶道修行紀錄。你善於發現日常美好，這本書帶你品味季節流轉與生活溫度，讓片刻時光變得溫暖而充實。',
        bgImage: './images/result-sunlight.jpg',
        bookCover: './images/book-daily.jpg'
    },
    forestGreen: {
        title: '森林探索者',
        bookTitle: '《阿拉斯加之死》',
        bookIntro: '強·克拉庫爾的紀實文學。你的靈魂嚮往遠方，這本書將帶你穿越荒野，體驗生命的廣闊與極限，是探索者的心靈歸屬。',
        bgImage: './images/result-forest.jpg',
        bookCover: './images/book-alaska.jpg'
    },
    roseMilkTea: {
        title: '浪漫詩人',
        bookTitle: '《小王子》',
        bookIntro: '聖修伯里的永恆經典。情感細膩的你，能讀懂書中隱藏的詩意。這是一場心靈共振，讓你與狐狸和玫瑰一同感受愛與羈絆。',
        bgImage: './images/result-rose.jpg',
        bookCover: './images/book-prince.jpg'
    }
};

// 題目資料庫
const questions = [
    {
        question: '推開街角書店的門，第一個吸引你的地方是…',
        image: './images/q1.jpg', // 請確保檔名與 GitHub 上的一致
        answers: [
            { text: '世界文學經典', scores: { midnightBlue: 1 } },
            { text: '料理書與手作書', scores: { orangeSunlight: 1 } },
            { text: '旅行與自然書架', scores: { forestGreen: 1 } },
            { text: '詩集與愛情小說', scores: { roseMilkTea: 1 } }
        ]
    },
    {
        question: '你會選哪杯飲品坐下來閱讀？',
        image: './images/q2.jpg',
        answers: [
            { text: '熱美式', scores: { midnightBlue: 1 } },
            { text: '錫蘭紅茶', scores: { orangeSunlight: 1 } },
            { text: '檸檬氣泡水', scores: { forestGreen: 1 } },
            { text: '玫瑰熱可可', scores: { roseMilkTea: 1 } }
        ]
    },
    {
        question: '你最容易沉迷的書頁是…',
        image: './images/q3.jpg',
        answers: [
            { text: '世界觀豐富的長篇小說', scores: { midnightBlue: 1 } },
            { text: '有照片、有故事的生活紀錄書', scores: { orangeSunlight: 1 } },
            { text: '遠方旅行散文', scores: { forestGreen: 1 } },
            { text: '詩集或愛情故事', scores: { roseMilkTea: 1 } }
        ]
    },
    {
        question: '午後時分，窗外下起細雨，你會…',
        image: './images/q4.jpg',
        answers: [
            { text: '一口氣讀完推理小說', scores: { midnightBlue: 1 } },
            { text: '抄寫生活散文的句子', scores: { orangeSunlight: 1 } },
            { text: '計畫下一次長途旅行', scores: { forestGreen: 1 } },
            { text: '寫下心情想寄給某人', scores: { roseMilkTea: 1 } }
        ]
    },
    {
        question: '你決定帶一本書回家，那會是…',
        image: './images/q5.jpg',
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
const questionImageElement = document.getElementById('question-image');

const resultTopVisual = document.getElementById('result-top-visual');
const resultTitleElement = document.getElementById('result-title');
const bookCoverImage = document.getElementById('book-cover-image');
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
    // 顯示 Header
    document.querySelector('.app-header').style.visibility = 'visible';
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    
    // 更新進度條
    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
    stepCount.innerText = `${currentQuestionIndex + 1}/${questions.length}`;
    questionTitleElement.innerText = `Q${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    
    // 更新題目圖片
    // 防呆機制：如果 currentQuestion.image 是空的，就顯示預設圖
    questionImageElement.src = currentQuestion.image || 'https://via.placeholder.com/600x400?text=No+Image';

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
    
    // 隱藏 Header 讓結果頁更乾淨 (可選)
    document.querySelector('.app-header').style.visibility = 'hidden';

    const finalResultKey = calculateResult();
    const finalResult = results[finalResultKey];
    
    // 填入文字資料
    resultTitleElement.innerText = finalResult.title;
    bookNameElement.innerText = finalResult.bookTitle;
    bookIntroElement.innerText = finalResult.bookIntro;
    
    // 更新推薦書封圖片
    bookCoverImage.src = finalResult.bookCover || 'https://via.placeholder.com/150x200?text=Book';
    
    // 更新結果頁背景圖 (如果有設定的話)
    if (finalResult.bgImage) {
        resultTopVisual.style.backgroundImage = `url('${finalResult.bgImage}')`;
    } else {
        resultTopVisual.style.backgroundColor = '#1a2a3a';
    }
}

function calculateResult() {
    const scoreValues = Object.values(scores);
    const maxScore = Math.max(...scoreValues);
    const winners = Object.keys(scores).filter(key => scores[key] === maxScore);
    const winnerIndex = Math.floor(Math.random() * winners.length);
    return winners[winnerIndex];
}

// 修改後的寫法
restartBtn.addEventListener('click', () => {
    window.location.href = "https://nnr01206.github.io/Boutique-/";
});

startQuiz();

