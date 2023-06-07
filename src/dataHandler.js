async function GetWords() {
    const response = await fetch("/res/words.json");
    const json = await response.json();
    return json;
}
function SaveData(JSONData){
    localStorage.setItem("GAME_DATA", JSON.stringify(JSONData));
}
function GetData(){
    if(localStorage.getItem("GAME_DATA") === null){
        let NEW_GAME_DATA = {
            currentQuestion : 0,
            currentScore : 0,
            stats : {
                challengesProgress:[],
                challengesPoints:[],
                totalOfChallenges:0,
                totalOfWins:0,
                totalOfLosses:0,
                winRate:"0%"
            }
        }
        SaveData(NEW_GAME_DATA);
    }
    return JSON.parse(localStorage.getItem("GAME_DATA"));
}
