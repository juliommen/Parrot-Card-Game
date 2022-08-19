const baralho = document.querySelector(".cartas");
let qtdCartas = "";
let cartas = [1,2,3,4,5,6,7];
let cartasViradas = 0;
let contagemTotal = 0;
let primeiraSelecionada = -1;
let posicaoPrimeiraSelecionada = -1;
let acertos = 0;
let tempo = 0;
let idInterval = "";
let cartasViradasAoMesmoTempo = 0;
const maxCartasViradas = 2;
const max = 14;
const min = 4;
const resto = 1;
const nulo = 0;
const tempoVirada=1000;
const tempoResultado=200;
const tempoSegundo=1000;

function inicio(){
    qtdCartas = Number(prompt("Com quantas cartas quer jogar?"));
    if (isNaN(qtdCartas)) {
        alert("Por favor, insira um número. Letras não são permitidas.");
        inicio();
        return;
    } else if (qtdCartas == nulo){
        alert("Por favor, insira um número maior que zero.");
        inicio();
        return;
    } else if (qtdCartas % 2 == resto) {
        alert("Por favor, insira um número par.");
        inicio();
        return;
    } else if (qtdCartas < min || qtdCartas > max) {
        alert("Por favor, insira um número entre 4 e 14.");
        inicio();
        return;
    }
    inserirCartas();
    runClock();
}

function inserirCartas() {
    cartas.sort(()=> Math.random() - 0.5);
    
    if (qtdCartas < max) {
        cartas.splice(qtdCartas/2 - 1, (14 - qtdCartas)/2);
    }
    cartas.push(...cartas);
    cartas.sort(()=> Math.random() - 0.5);

    let divCartas="";
    for (let i = 0; i < cartas.length; i++) {
        divCartas +=`
                <div class='carta' id='${i}' onclick='virar(this.id)'>
                    <img alt='carta fechada' class='front' id='${i}-front' src='./assets/front.png'>
                    <img alt='carta aberta' class='back no-display' id='${i}-back' src='./assets/${cartas[i]}.gif'>
                </div>
            `;
    }
    baralho.innerHTML = divCartas;
}

function virar(i){
    /*não se pode virar mais de duas por vez*/
    if (cartasViradasAoMesmoTempo < maxCartasViradas) {
        cartasViradasAoMesmoTempo++;
        
        const imgFront = document.getElementById(i+"-front");
        if ( imgFront.classList.contains("no-display")) {
            alert(`Não é possível desvirar esta carta. Selecione uma carta fechada para continuar.`);
            return;
        }

        contagemTotal++;
        imgFront.classList.add("no-display");
        
        const imgBack = document.getElementById(i+"-back");
        imgBack.classList.remove("no-display");

        document.getElementById(i).classList.add("rotate");

        cartasViradas++;
        if (cartasViradas == maxCartasViradas) {
            cartasViradas = 0;
            if (cartas[i] != primeiraSelecionada) {
                setTimeout( () => {
                    imgFront.classList.remove("no-display");
                    imgBack.classList.add("no-display");

                    document.getElementById(posicaoPrimeiraSelecionada+"-back")
                            .classList
                            .add("no-display");
                    document.getElementById(posicaoPrimeiraSelecionada+"-front")
                            .classList
                            .remove("no-display");
                    cartasViradasAoMesmoTempo=0;
                },tempoVirada);
            } else {
                acertos++;
                cartasViradasAoMesmoTempo=0;
            }
        } else  {
            primeiraSelecionada=cartas[i];
            posicaoPrimeiraSelecionada = i;
        }

        if (acertos == cartas.length/2){
            clearInterval(idInterval);
            setTimeout(() => {
                alert(`Você ganhou em ${contagemTotal} jogadas, levando ${tempo} segundos!`);
                recomecar();
            }, tempoResultado);
        }
    }
}

function runClock(){
    idInterval = setInterval(() => {
        tempo++;
        document.querySelector(".tempo")
                .innerText = "Temporizador: " + tempo + " segundos";
    },tempoSegundo);
}

function recomecar (){
    const afirmativa = "sim";
    const negativa = "não";
    const resposta = prompt("Deseja jogar novamente? Responda com 'sim' ou 'não'.");
    if (resposta == afirmativa) {
        qtdCartas = "";
        cartas = [1,2,3,4,5,6,7];
        cartasViradas = 0;
        contagemTotal = 0;
        primeiraSelecionada = -1;
        posicaoPrimeiraSelecionada = -1;
        acertos = 0;
        tempo = 0;
        idInterval = "";
        cartasViradasAoMesmoTempo = 0;
        document.querySelector(".tempo")
                .innerText = "Temporizador: " + tempo + " segundos";
        inicio();
    } else if (resposta == negativa) {
        return;
    } else {
        recomecar();
    }
}

inicio();