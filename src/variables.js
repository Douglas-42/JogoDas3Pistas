const game = {
    word : [],
    hints: [],
    totalAttempts: 0
}

let wordStatus = []
let wordCells = []
let timeToNextChallenge = 0;
let currentChallengeOnStatsModal = null;

const wordPanel = document.getElementsByClassName("wordPanel")[0];
const modal = document.getElementsByClassName("modal")[0];
const nextChallengeTimerPanel = document.getElementsByClassName("nextChallengeTimer")[0];
const timer = document.getElementsByClassName("timer")[0];
const menu = document.getElementsByClassName("menu")[0];
const hintsLI = document.getElementsByClassName("hintLI");
const rightAnswerAudioClip = document.getElementById("rightAnswerAudioClip"); 
const wrongAnswerAudioClip = document.getElementById("wrongAnswerAudioClip"); 
const currentChallengeLabel = document.getElementById("currentChallenge"); 
const cssROOT = document.querySelector(':root');

const words = {
    data:[]
};

const player = {
    data : {}
}

const startTimeStamp = 1658175813645;