function UpdateStatus(){
    for (let i = 0; i < wordStatus.length; i++) {
        wordCells[i].innerText = wordStatus[i];
    }
    for(let i = 0; i < hintsLI.length;i++){
        if(game.totalAttempts >= i){
            hintsLI[i].innerText = game.hints[i];
        }else{
            hintsLI[i].innerText = GetHiddenHint(game.hints[i]);
        }
    }
}
function ResetUi(){
    while (wordPanel.children[0] != undefined) {
        wordPanel.removeChild(wordPanel.children[0]);
    }
    currentChallengeLabel.textContent = `Desafio #${(player.data.currentQuestion+1).toString().padStart(2,"0")}`;
    wordStatus = [];
    wordCells = [];
}

function CloseModal(){
    modal.classList.add("hidden");
}

function ShowModal(content){
    if (modal.hasChildNodes()) {
        modal.removeChild(modal.children[0]);
    }
    modal.innerHTML = content;
    modal.classList.remove("hidden");
}
function SwitchTheme(){
    let rs = getComputedStyle(cssROOT);
    let c1 = rs.getPropertyValue('--color1');
    let c2 = rs.getPropertyValue('--color2');
    cssROOT.style.setProperty('--color1', c2);
    cssROOT.style.setProperty('--color2', c1);
}
function ToogleMenuVisibility(){
    if(menu.classList.contains("outOfScreen")) menu.classList.remove("outOfScreen");
    else menu.classList.add("outOfScreen");

}