function calcolaLordoIndividuale({
  importoNetto,
  importoSpese = 0,
  percentualeIRAP = 3.9 / 100,
  percentualeINPS = 27.1030763 / 100,
  numeroMusicisti = 1,
  èResidente = false,
}) {
  const ritenutaIRAP = importoNetto * percentualeIRAP;
  
  const ritenutePrevidenziali =
    (((importoNetto - ritenutaIRAP) / numeroMusicisti - (èResidente ? 0 : 46)) * percentualeINPS).toFixed(2);
  
  return importoNetto + ritenutaIRAP + parseFloat(ritenutePrevidenziali) + importoSpese;
}

function calcolaLordoCollettivo(compenso, componenti, residenti) { 
    
    let risultato = 0;

    if (residenti > 0) {
        for (let i = 0; i <= residenti; i++) {
            risultato += calcolaLordoIndividuale({importoNetto: compenso, èResidente: true})
        }
    }

    const nonResidenti = componenti - residenti;

    if (nonResidenti > 0) {
        for (let j = 0; j <= nonResidenti; j++) {
            risultato += calcolaLordoIndividuale({importoNetto: compenso})
        }
    }

    return risultato
}

function alClick() {
    document.querySelector(".pRisultatoLordo").textContent = calcolaLordoCollettivo(
        parseFloat(document.querySelector(".inputCompenso").value),
        parseFloat(document.querySelector(".inputComponenti").value),
        parseFloat(document.querySelector(".inputResidenti").value),
    ) + " + IVA"
}

(function caricaEventListeners(){
    document.querySelector(".areaInput").onsubmit = (e) => {
        e.preventDefault()
        alClick();
    }

    document.ondouble
})();


