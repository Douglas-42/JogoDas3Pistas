const getHelpModal = ()=>{
    return(
        `
            <div class="content">
                <h2>Como jogar?</h2>
                <p>
                    Você tem três tentativas para acertar a palavra.
                    <br/>
                    Você tem três pistas para te ajudar a descobrir a resposta, mas inicialmente apenas a primeira pista será revelada.
                </p>
                <div class="hintPanel" style="margin-top: 1.5rem;margin-bottom: 0.5rem;">
                    <p class="label">Pistas</p>
                    <ol reversed>
                        <li>País</li>
                        <li>_ _ _ _ _ _ _ - _ _ - _ _ _</li>
                        <li>_ _ _ _ _ _</li>
                    </ol>
                </div>
                <p>Você começa com três pontos, a cada erro você perde um ponto e recebe uma nova pista. </p>
                <div class="hintPanel" style="margin-top: 1.5rem;margin-bottom: 0.5rem;">
                    <p class="label">Pistas</p>
                    <ol reversed>
                        <li>País</li>
                        <li>América do Sul</li>
                        <li>_ _ _ _ _ _</li>
                    </ol>
                </div>
                <button onclick="CloseModal()">Entendi</button>
            </div>
        `
    );
}
const getProgressModal = (data)=>{
    let stats = data.stats;
    let challengesProgress = "";
    currentChallengeOnStatsModal = currentChallengeOnStatsModal == null ? data.currentQuestion : currentChallengeOnStatsModal;
    if(stats.challengesProgress[currentChallengeOnStatsModal] == undefined){
        challengesProgress = "Não iniciado!";
    }else if(stats.challengesProgress[currentChallengeOnStatsModal] == 0){
        challengesProgress = "Você fracassou!"
    }else if(stats.challengesProgress[currentChallengeOnStatsModal] == 1){
        challengesProgress = "Desafio em andamento!"
    }else if(stats.challengesProgress[currentChallengeOnStatsModal] == 0){
        challengesProgress = "Desafio concluído!"
    }
    return(
        `
        <div class="content" style="justify-content:space-evenly;">
            <!--
            <div>
                <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;">
                    <button style="width: 2rem; height: 2rem; margin-right: 1rem;">
                        <i class="fa-solid fa-angle-left" style="color:#fff;"></i>
                    </button>
                    <h2 style="text-align: center;">Desafio ${currentChallengeOnStatsModal}</h2>
                    <button style="width: 2rem; height: 2rem; margin-left: 1rem;">
                        <i class="fa-solid fa-angle-right" style="color:#fff;"></i>
                    </button>
                </div>
                <h3 class="subtitle">${challengesProgress}</h3>
            </div>
            -->
            <div>
                <h3 class="subtitle" style="font-weight: 600;">Estatística Geral</h3>
                <div class="progressCell">
                    <div>
                        <span class="info">${stats.totalOfChallenges}</span>
                        <span class="label">desafios</span>
                    </div>
                    <div>
                        <span class="info">${stats.totalOfWins}</span>
                        <span class="label">vitórias</span>
                    </div>
                    <div>
                        <span class="info">${stats.totalOfLosses}</span>
                        <span class="label">derrotas</span>
                    </div>
                    <div>
                        <span class="info">${stats.winRate}</span>
                        <span class="label">de vitórias</span>
                    </div>
                </div>
            </div>
            <button onclick="CloseModal()">Entendi</button>
        </div>
        `
    );
}
