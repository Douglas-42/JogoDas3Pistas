async function StartGame(){
    if(words.data.length == 0)
        words.data = await GetWords();
    player.data = GetData();
    game.word = words.data[player.data.currentQuestion].answer.split("");
    game.hints = words.data[player.data.currentQuestion].hints;
    game.totalAttempts = 0;
    timeToNextChallenge = GetChallengeTime();
    if(timeToNextChallenge > 0){
        nextChallengeTimerPanel.classList.remove("hidden");
        UpdateTime();
    }
    ResetUi();
    GenerateLettersCells();
    UpdateStatus();
}
function UpdateTime(){
    timeToNextChallenge -= 1000;
    timer.textContent = formatTimer(timeToNextChallenge);
    if(timeToNextChallenge <= 0){
        nextChallengeTimerPanel.classList.add("hidden");
    }else{
        setTimeout(UpdateTime,1000);
    }
}
function formatTimer(ms){
    // 1- Convert to seconds:
     var seconds = ms / 1000;
     // 2- Extract hours:
     var hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
     seconds = seconds % 3600; // seconds remaining after extracting hours
     // 3- Extract minutes:
     var minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
     // 4- Keep only seconds not extracted to minutes:
     seconds = Math.floor(seconds % 60);
     return( hours.toString().padStart(2, "0")+":"+minutes.toString().padStart(2, "0")+":"+seconds.toString().padStart(2, "0"));
 }
function GetChallengeTime(){
    let day = 1000*60*60*24*player.data.currentQuestion;
    return (startTimeStamp+day) - Date.now();
}
function GenerateLettersCells(){
    for (let i = 0; i < game.word.length; i++) {
        const div = document.createElement("div");
        div.classList.add("wordCell");
        wordPanel.appendChild(div);
        wordStatus.push("");
        wordCells.push(div);
    }
}

function AddLetter(letter){
    for(let i = 0;i<wordStatus.length;i++){
        if(wordStatus[i] == ""){
            wordStatus[i] = letter;
            break;
        }
    }
    UpdateStatus();
}

function RemoveLetter(){
    for(let i = wordStatus.length-1;i>=0;i--){
        if(wordStatus[i] != ""){
            wordStatus[i] = "";
            break;
        }
    }
    UpdateStatus();
}

function Guess(){
    if(game.word.toString() == wordStatus.toString()){
        PlayAudio(rightAnswerAudioClip);
        wordCells.forEach(wc => {
            wc.classList.add("solved");
        });
        setTimeout(()=>{
            let _gamePoints = 3 - (game.totalAttempts);
            player.data.stats.challengesProgress.push(_gamePoints);
            player.data.stats.challengesPoints.push(_gamePoints);
            player.data.stats.totalOfChallenges++;
            player.data.stats.totalOfWins++;
            player.data.stats.winRate = `${((player.data.stats.totalOfWins/player.data.stats.totalOfChallenges)*100).toFixed()}%`;
            player.data.currentQuestion++;
            SaveData(player.data);
            StartGame();
        },850
        )
    }else{
        wordCells.forEach(wc => {
            wc.classList.add("wrongAnswer");
        });
        PlayAudio(wrongAnswerAudioClip);
        setTimeout(()=>{
            if(game.totalAttempts >= 2){
                player.data.stats.challengesProgress.push(0);
                player.data.stats.challengesPoints.push(0);
                player.data.stats.totalOfChallenges++;
                player.data.stats.totalOfLosses++;
                player.data.stats.winRate = `${((player.data.stats.totalOfWins/player.data.stats.totalOfChallenges)*100).toFixed()}%`;
                player.data.currentQuestion++;
                alert("Você fracassou!");
                SaveData(player.data);
                StartGame();
                return;
            }
            wordCells.forEach(wc => {
                wc.classList.remove("wrongAnswer");
            });
            game.totalAttempts++;
            ClearWordStatus();
            UpdateStatus();
        },250
        )
    }
}

function ClearWordStatus(){
    for (let i = 0; i < wordStatus.length; i++) {
        wordStatus[i] = "";
    }
}

function GetHiddenHint(content){
    let hiddenContent = "";
    for (let i = 0; i < content.length; i++) {
        if(content[i] == " "){
            hiddenContent += "- ";
        }else{
            hiddenContent += "_ ";
        }
    }
    return hiddenContent;
}

function PlayAudio(clip){
    clip.play();
}

StartGame();