const prepare = {
    selectedCars_1: null,
    selectedCars_2: null,
};
prepare.cards = [];
prepare.progress = 0;
prepare.fullTrack = new Audio('./assets/audio/fulltrack.mp3');
prepare.flipAudia = new Audio('./assets/audio/flip.mp3');
prepare.goodAudio = new Audio('./assets/audio/good.mp3');
prepare.failAudio = new Audio('./assets/audio/fail.mp3');
prepare.gameOverAudio = new Audio('./assets/audio/game-over.mp3');
prepare.fullTrack.loop = true;
const numberOfCards = 20;
const tempNumbers = [];
let cardsHtmlContent = '';
const getRandomInt = (min, max) => {
    let result;
    let exists = true;
    min = Math.ceil(min);
    max = Math.floor(max);
    while (exists) {
        result = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!tempNumbers.find(no => no === result.toString())) {
            exists = false;
            tempNumbers.push(result.toString());
        }
    }
    return result;
};
const toggleFlip = (index) => {
    var _a;
    (_a = prepare.fullTrack) === null || _a === void 0 ? void 0 : _a.play();
    const card = prepare.cards[index];
    if (card.flip === '' && card.clickable) {
        flip(card, index);
        selectedCard(card, index); 
    }
};
const flip = (card, index) => {
    var _a;
    (_a = prepare.flipAudia) === null || _a === void 0 ? void 0 : _a.play(); 
    if (card) {
        card.flip = card.flip === '' ? 'flipped' : '';
        const el = document.getElementById(`card-flip-${index}`);
        if (el)
            el.className = card.flip; 
    }
};
const selectedCard = (card, index) => {
    var _a;
    if (!prepare.selectedCars_1) {
        prepare.selectedCars_1 = card;
        prepare.selectedIndex_1 = index;
    }
    else if (!prepare.selectedCars_2) {
        prepare.selectedCars_2 = card;
        prepare.selectedIndex_2 = index;
    }
    if (prepare.selectedCars_1 && prepare.selectedCars_2) {
        if (prepare.selectedCars_1.src === prepare.selectedCars_2.src) {
            prepare.selectedCars_1.clickable = false;
            prepare.selectedCars_2.clickable = false;
            prepare.selectedCars_1 = null;
            prepare.selectedCars_2 = null;
            stopAudio(prepare.failAudio);
            stopAudio(prepare.goodAudio);
            (_a = prepare.goodAudio) === null || _a === void 0 ? void 0 : _a.play();
            changeProgress(); 
            checkFinish(); 
        }
        else {
            setTimeout(() => {
                var _a;
                stopAudio(prepare.failAudio);
                stopAudio(prepare.goodAudio);
                (_a = prepare.failAudio) === null || _a === void 0 ? void 0 : _a.play();
                flip(prepare.selectedCars_1, prepare.selectedIndex_1);
                flip(prepare.selectedCars_2, prepare.selectedIndex_2);
                prepare.selectedCars_1 = null;
                prepare.selectedCars_2 = null;
            }, 1000);
        }
    }
};
const changeProgress = () => {
    const progress = prepare.cards.filter(card => !card.clickable).length / numberOfCards * 100;
    const progressElement = document.getElementById('progress');
    progressElement.style.width = `${progress}%`;
    progressElement.innerText = `${progress}%`;
};
const checkFinish = () => {
    var _a;
    if (prepare.cards.filter(card => !card.clickable).length === numberOfCards) {
        stopAudio(prepare.fullTrack);
        stopAudio(prepare.failAudio);
        stopAudio(prepare.goodAudio);
        (_a = prepare.gameOverAudio) === null || _a === void 0 ? void 0 : _a.play();
    }
};
const stopAudio = (audio) => {
    if (audio && audio.played.length > 0) { 
        audio.pause();
        audio.currentTime = 0;
    }
};
for (let index = 0; index < numberOfCards / 2; index++) {
    prepare.cards.push({
        id: getRandomInt(0, numberOfCards),
        src: `./assets/images/${index}.jpg`,
        flip: '',
        clickable: true,
        index
    });
    prepare.cards.push({
        id: getRandomInt(0, numberOfCards),
        src: `./assets/images/${index}.jpg`,
        flip: '',
        clickable: true,
        index
    });
}
prepare.cards.sort((a, b) => a.id > b.id ? 1 : -1);
prepare.cards.forEach((item, index) => {
    cardsHtmlContent += `
        <span class="col-sm-3 col-lg-2">
            <div onclick="toggleFlip(${index})" class="card-flip">
                <div id="card-flip-${index}">
                    <div class="front">
                        <div class="card">
                            <img src="./assets/back.jpg" alt="back" class="card-image">
                            <span class="card-content">${index + 1}</span>
                        </div>
                    </div>
                    <div class="back">
                        <div class="card">
                            <img src="./assets/images/${item.index}.jpg" alt="loading..." style="height:120px;width:100%;display:block;">
                        </div>
                    </div>
                </div>
            </div>
        </span>
    `;
});
document.getElementById('cards').innerHTML = cardsHtmlContent; // FIX: added non-null assertion
