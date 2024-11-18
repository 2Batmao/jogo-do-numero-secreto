//Funções do código
function criarTexto(tag, texto){
    let paragrafo = document.querySelector(tag);
    paragrafo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemPadrao(){
    criarTexto('h1', 'Jogo do número secreto');
    criarTexto('.texto__paragrafo', `Escolha um número entre 1 e ${limiteNumerosSorteados}`);
}

function verificarChute(){
    numeroTentativas ++;
    let inputChute = document.querySelector('.container__input').value
    if(inputChute == numeroSecreto){
        criarTexto('h1', 'Acertou!');
        let palavraTentativa = numeroTentativas > 1 ? 'tentativas' : 'tentativa';
        criarTexto('.texto__paragrafo', `Você acertou o número secreto em ${numeroTentativas} ${palavraTentativa}!`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chute').setAttribute('disabled', true);
        document.querySelector('.container__input').setAttribute('disabled', true);
    } else{
        if(inputChute>numeroSecreto){
            criarTexto('.texto__paragrafo', 'Escolha um número menor!');
        } else{
            criarTexto('.texto__paragrafo', 'Escolha um número maior!');
        }
    }
    limparInput();
}

function reininciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparInput();
    numeroTentativas = 0;
    exibirMensagemPadrao();
    document.getElementById('chute').removeAttribute('disabled');
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.querySelector('.container__input').removeAttribute('disabled');
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * limiteNumerosSorteados + 1);
    let lengthLista = numerosSorteados.length

    if(lengthLista == limiteNumerosSorteados){
        numerosSorteados = []
    }

    if(numerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else{
        numerosSorteados.push(numeroEscolhido)
        return numeroEscolhido;
    }
}

function limparInput() {
    input = document.querySelector('.container__input');
    input.value = '';
}

//Codigo principal
let numerosSorteados = []
let limiteNumerosSorteados = 10

let numeroSecreto = gerarNumeroAleatorio();
let numeroTentativas = 0;

exibirMensagemPadrao();