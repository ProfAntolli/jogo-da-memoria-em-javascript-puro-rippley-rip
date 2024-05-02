const grid = document.querySelector('.grid');
const timer = document.querySelector('.timer');

//personagens nas cartas
const characters = [
    'card_asgore',
    'card_asriel',
    'card_frisk',
    'card_mettaton', 
    'card_muffet',
    'card_papyrus',
    'card_sans',
    'card_temmie',
    'card_toriel',
    'card_undyne',
]

//Função para criar o elemento
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element
}

//tocar audio
const playAudio = (audioFile) => {
    // Crie um novo objeto Audio
    var audio = new Audio(`../UndertaleMemory/audios/${audioFile}.wav`);
    
    // Inicie a reprodução do áudio
    audio.play();
}

//Variaveis do jogo
let firstCard = '';
let secondCard = '';

//checando se o jogo chegou ao fim
const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disable-card')

    if (disabledCards.length == 20) {
        //parando o tempo
        clearInterval(this.loop);
        playAudio('snd_vitoria');
    }
}

//checando se as cartas são iguais
const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    //acertou, caso não, errou
    if (firstCharacter == secondCharacter) {
        setTimeout(() => {
            //disabilitanbdo as cartas
            firstCard.firstChild.classList.add('disable-card');
            secondCard.firstChild.classList.add('disable-card');

            firstCard = '';
            secondCard = '';

            playAudio('snd_acerto');

            checkEndGame();
        }, 500)

    } else {

        //dando delay na revelção
        setTimeout(() => {
            //removendo o atributo de revelar
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

            playAudio('snd_erro');

        }, 500)

    }
}

//Ao clicar, revela a carta, lógica do jogo
const revealCard = ({target}) => {

    //Vereficando se a carta está virada, caso não, volta
    if(target.parentNode.className.includes('reveal-card')) {
        return;
    }

    //Revelando e definindo a lógica
    if (firstCard == '') {
        //Revela a carta
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
        playAudio('snd_virar');

    } else if (secondCard == '') {
        //Revela a carta
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
        playAudio('snd_virar');

        //chama a função que verefica se são iguais
        checkCards();
    }

}

//Criar carta
const createCard = (character) => {

    //elementos da carta
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    //imagem com base no personagem que é
    front.style.backgroundImage = `url('../UndertaleMemory/images/${character}.png')`;

    //colocando elementos
    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);//ao clicar
    card.setAttribute('data-character', character);//colocando atributo do nome


    return card;

}   

//Adicionando as cartas
const loadGame = () => {
    
    //duplicando as cartas e embaralhando
    const duplicateCards = [...characters, ...characters]
    const shuffle = duplicateCards.sort( () => Math.random() - 0.5 )

    //criando cartas na grid
    shuffle.forEach((character)=>{
        const card = createCard(character);
        grid.appendChild(card);

    })
}

//tempo
const startTimer = () => {
    this.loop = setInterval(()=>{
        //usa o + pra convertqar pra numero
        const  currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
 
    }, 1000)
}

loadGame();
startTimer();
