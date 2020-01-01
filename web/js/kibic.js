var gameStatus;
var leftGamerCards = [];
var rightGamerCards = [];
var middleGamerCards = [];
var middleGamerBeatedCards = [];
var leftGamerBeatedCards = [];
var rightGamerBeatedCards = [];
var cardsInGame = [];
var cardsInTalon = [];
var middleGamerThrownCard = [];
var leftGamerThrownCard = [];
var rightGamerThrownCard = [];
var highlightedCards = [];
var allCards = [];
var nominalCardWidth = 128;
var nominalCardHeight = 200;

var cardNames = {
    "makk 10": "img/m_10.png",
    "makk 7": "img/m_7.png",
    "makk 8": "img/m_8.png",
    "makk 9": "img/m_9.png",
    "makk also": "img/m_al.png",
    "makk asz": "img/m_as.png",
    "makk felso": "img/m_f.png",
    "makk kiraly": "img/m_k.png",
    "piros 10": "img/p_10.png",
    "piros 7": "img/p_7.png",
    "piros 8": "img/p_8.png",
    "piros 9": "img/p_9.png",
    "piros also": "img/p_al.png",
    "piros asz": "img/p_as.png",
    "piros felso": "img/p_f.png",
    "piros kiraly": "img/p_k.png",
    "tok 10": "img/t_10.png",
    "tok 7": "img/t_7.png",
    "tok 8": "img/t_8.png",
    "tok 9": "img/t_9.png",
    "tok also": "img/t_al.png",
    "tok asz": "img/t_as.png",
    "tok felso": "img/t_f.png",
    "tok kiraly": "img/t_k.png",
    "zold 10": "img/z_10.png",
    "zold 7": "img/z_7.png",
    "zold 8": "img/z_8.png",
    "zold 9": "img/z_9.png",
    "zold also": "img/z_al.png",
    "zold asz": "img/z_as.png",
    "zold felso": "img/z_f.png",
    "zold kiraly": "img/z_k.png",
    "hatlap": "img/hat.png"
};

var status;
function initEmptyStatus() {
    status += '{                         ';
    status += '    "game": "",           ';
    status += '	   "player": "gamer",    ';
    status += '	   "round": 0,           ';
    status += '	   "talon": [],          ';
    status += '	   "cardsingame": [      ';
    status += '        "piros asz",      ';
    status += '        "piros 10",       ';
    status += '        "piros kiraly",   ';
    status += '        "piros felso",    ';
    status += '        "piros also",     ';
    status += '        "piros 9",        ';
    status += '        "piros 8",        ';
    status += '        "piros 7",        ';
    status += '        "tok asz",        ';
    status += '        "tok 10",         ';
    status += '        "tok kiraly",     ';
    status += '        "tok felso",      ';
    status += '        "tok also",       ';
    status += '        "tok 9",          ';
    status += '        "tok 8",          ';
    status += '        "tok 7",          ';
    status += '        "zold asz",       ';
    status += '        "zold 10",        ';
    status += '        "zold kiraly",    ';
    status += '        "zold felso",     ';
    status += '        "zold also",      ';
    status += '        "zold 9",         ';
    status += '        "zold 8",         ';
    status += '        "zold 7",         ';
    status += '        "makk asz",       ';
    status += '        "makk 10",        ';
    status += '        "makk kiraly",    ';
    status += '        "makk felso",     ';
    status += '        "makk also",      ';
    status += '        "makk 9",         ';
    status += '        "makk 8",         ';
    status += '        "makk 7"          ';
    status += '    ],                    ';
    status += '	   "gamer": {            ';
    status += '        "uknowncards": 12,';
    status += '        "calls": [],      ';
    status += '        "thrown": [],     ';
    status += '        "hand": [],       ';
    status += '        "beated": {       ';
    status += '            "round 1": [],';
    status += '            "round 2": [],';
    status += '            "round 3": [],';
    status += '            "round 4": [],';
    status += '	           "round 5": [],';
    status += '            "round 6": [],';
    status += '            "round 7": [],';
    status += '            "round 8": [],';
    status += '            "round 9": [],';
    status += '            "round 10": []';
    status += '        }                 ';
    status += '    },                    ';
    status += '    "rightgamer": {       ';
    status += '        "uknowncards": 12,';
    status += '        "calls": [],      ';
    status += '        "thrown": [],     ';
    status += '        "hand": [],       ';
    status += '        "beated": {       ';
    status += '            "round 1": [],';
    status += '            "round 2": [],';
    status += '            "round 3": [],';
    status += '            "round 4": [],';
    status += '	           "round 5": [],';
    status += '            "round 6": [],';
    status += '            "round 7": [],';
    status += '            "round 8": [],';
    status += '            "round 9": [],';
    status += '            "round 10": []';
    status += '        }                 ';
    status += '    },                    ';
    status += '    "leftgamer": {        ';
    status += '        "uknowncards": 12,';
    status += '        "calls": [],      ';
    status += '        "thrown": [],     ';
    status += '        "hand": [],       ';
    status += '        "beated": {       ';
    status += '            "round 1": [],';
    status += '            "round 2": [],';
    status += '            "round 3": [],';
    status += '            "round 4": [],';
    status += '	           "round 5": [],';
    status += '            "round 6": [],';
    status += '            "round 7": [],';
    status += '            "round 8": [],';
    status += '            "round 9": [],';
    status += '            "round 10": []';
    status += '        }                 ';
    status += '    }                     ';
    status += '}                         ';
}

var btnDiv = {
    div: document.createElement("DIV"),
    button: document.createElement("BUTTON"),
    start: function () {
        this.button.innerHTML = "Click Me!";
        this.button.onclick = clickAndPostGameStatus;
        this.div.appendChild(this.button);
        this.div.width = window.innerWidth - 25;
        this.div.height = 25;
        document.body.insertBefore(this.div, document.body.childNodes[1]);
    }
};

var gameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = window.innerWidth - 25;
        this.canvas.height = window.innerHeight - 50;
        this.canvas.onmousemove = function (event) {
            mousemove(event);
        };
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

function clickAndPostGameStatus() {
    $.ajax({
        type: "POST",
        url: "gamestatus",
        data: JSON.stringify(gameStatus),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (responseJson) {
            status = JSON.stringify(responseJson);
            readJson();
            initCardsFromJson();
            updateGameArea();
        }
    });
};

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = gameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image,
                    this.x,
                    this.y,
                    this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "#b2b2b2";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    };
    this.contains = function (x, y) {
        return this.x <= x && x <= this.x + this.width &&
                this.y <= y && y <= this.y + this.height;
    };
}

function mousemove(e) {
    var x = e.clientX;
    var y = e.clientY;
    updateGameArea();
    for (var i = 0; i < allCards.length; i++) {
        if (allCards[i].contains(x, y)) {
            allCards[i].update();
        }
    }
}

function initCardsFromJson() {
    allCards.length = 0;
    //init gamers cards
    for (var i = 0; i < 3; i++) {
        var player;
        var cards;
        var beatedCards;
        var thrownCard;
        switch (i) {
            case 0:
                player = gameStatus.gamer;
                cards = middleGamerCards;
                beatedCards = middleGamerBeatedCards;
                thrownCard = middleGamerThrownCard;
                break;
            case 1:
                player = gameStatus.leftgamer;
                cards = leftGamerCards;
                beatedCards = leftGamerBeatedCards;
                thrownCard = leftGamerThrownCard;
                break;
            case 2:
                player = gameStatus.rightgamer;
                cards = rightGamerCards;
                beatedCards = rightGamerBeatedCards;
                thrownCard = rightGamerThrownCard;
                break;
        }
        var index = 0;
        for (var j = 0; j < player.hand.length; j++) {
            cards[index] = new component(nominalCardWidth, nominalCardHeight, cardNames[player.hand[index]], 0, 0, "image");
            allCards.push(cards[index]);
            index++;
        }
        for (var j = 0; j < player.uknowncards; j++) {
            cards[index] = new component(nominalCardWidth, nominalCardHeight, cardNames["hatlap"], 0, 0, "image");
            allCards.push(cards[index]);
            index++;
        }
        for (var j = 1; j < 11; j++) {
            var key = "round " + j;
            beatedCards[j - 1] = [];
            for (var k = 0; k < 3; k++) {
                if (player.beated[key].length < 3) {
                    beatedCards[j - 1][k] = new component(nominalCardWidth, nominalCardHeight, "#e3e3e3", 0, 0);
                } else {
                    beatedCards[j - 1][k] = new component(nominalCardWidth, nominalCardHeight, cardNames[player.beated[key][k]], 0, 0, "image");
                    allCards.push(beatedCards[j - 1][k]);
                }
            }
        }
        if (player.thrown.length != 0) {
            thrownCard[0] = new component(nominalCardWidth, nominalCardHeight, cardNames[player.thrown[0]], 0, 0, "image");
            allCards.push(thrownCard[0]);
        } else {
            thrownCard[0] = new component(nominalCardWidth, nominalCardHeight, "#e3e3e3", 0, 0, );
        }
    }
    //init opponent cards in game
    for (var i = 0; i < gameStatus.cardsingame.length; i++) {
        cardsInGame[i] = new component(nominalCardWidth, nominalCardHeight, cardNames[gameStatus.cardsingame[i]], 0, 0, "image");
        allCards.push(cardsInGame[i]);
    }
    // init talon
    if (gameStatus.talon.length == 0) {
        if (gameStatus.gamer.uknowncards + gameStatus.gamer.hand.length == 12
                || gameStatus.rightgamer.uknowncards + gameStatus.rightgamer.hand.length == 12
                || gameStatus.leftgamer.uknowncards + gameStatus.leftgamer.hand.length == 12) {
            cardsInTalon[0] = new component(nominalCardWidth, nominalCardHeight, "#e3e3e3", 0, 0);
            cardsInTalon[1] = new component(nominalCardWidth, nominalCardHeight, "#e3e3e3", 0, 0);
        } else {
            cardsInTalon[0] = new component(nominalCardWidth, nominalCardHeight, cardNames["hatlap"], 0, 0, "image");
            cardsInTalon[1] = new component(nominalCardWidth, nominalCardHeight, cardNames["hatlap"], 0, 0, "image");
        }
    } else if (gameStatus.talon.length == 1) {
        cardsInTalon[0] = new component(nominalCardWidth, nominalCardHeight, cardNames[gameStatus.talon[0]], 0, 0, "image");
        allCards.push(cardsInTalon[0]);
        cardsInTalon[1] = new component(nominalCardWidth, nominalCardHeight, cardNames["hatlap"], 0, 0, "image");
    } else {
        cardsInTalon[0] = new component(nominalCardWidth, nominalCardHeight, cardNames[gameStatus.talon[0]], 0, 0, "image");
        cardsInTalon[1] = new component(nominalCardWidth, nominalCardHeight, cardNames[gameStatus.talon[1]], 0, 0, "image");
        allCards.push(cardsInTalon[0]);
        allCards.push(cardsInTalon[1]);
    }
}

function drawMiddleGamerCards(normalCardWidth, normalCardHeight, smallCardWidth, smallCardHeight) {
    for (var i = 0; i < middleGamerCards.length; i++) {
        middleGamerCards[i].x = /*2 * smallCardWidth + */i * (gameArea.canvas.width - normalCardWidth/* - 4 * smallCardWidth*/) / (middleGamerCards.length - 1);
        middleGamerCards[i].y = gameArea.canvas.height - normalCardHeight - smallCardHeight;
        middleGamerCards[i].width = normalCardWidth;
        middleGamerCards[i].height = normalCardHeight;
        middleGamerCards[i].update();
    }
    for (var i = 0; i < middleGamerBeatedCards.length; i++) {
        for (var j = 0; j < middleGamerBeatedCards[i].length; j++) {
            var dx = (gameArea.canvas.width) / (middleGamerBeatedCards.length);
            middleGamerBeatedCards[i][j].x = i * dx + j * (dx - smallCardWidth) / 2;
            middleGamerBeatedCards[i][j].y = gameArea.canvas.height - smallCardHeight;
            middleGamerBeatedCards[i][j].width = smallCardWidth;
            middleGamerBeatedCards[i][j].height = smallCardHeight;
            middleGamerBeatedCards[i][j].update();
        }
    }
}

function drawLeftGamerCards(normalCardWidth, normalCardHeight, smallCardWidth, smallCardHeight) {
    var shift;
    for (var i = 0; i < leftGamerCards.length; i++) {
        if (i % 2 != 0) {
            shift = normalCardWidth / 2;
        } else {
            shift = 0;
        }
        leftGamerCards[i].x = 2 * smallCardWidth + 0 + shift;
        leftGamerCards[i].y = smallCardHeight + i * (gameArea.canvas.height - 2 * normalCardHeight - 2 * smallCardHeight) / (leftGamerCards.length - 1);
        leftGamerCards[i].width = normalCardWidth;
        leftGamerCards[i].height = normalCardHeight;
        leftGamerCards[i].update();
    }
    for (var i = 0; i < leftGamerBeatedCards.length; i++) {
        for (var j = 0; j < middleGamerBeatedCards[i].length; j++) {
            var dy = (gameArea.canvas.height - normalCardHeight - 3 * smallCardHeight) / (leftGamerBeatedCards.length - 1);
            leftGamerBeatedCards[i][j].x = 0 + j * 0.5 * smallCardWidth;
            leftGamerBeatedCards[i][j].y = smallCardHeight + i * dy;
            leftGamerBeatedCards[i][j].width = smallCardWidth;
            leftGamerBeatedCards[i][j].height = smallCardHeight;
            leftGamerBeatedCards[i][j].update();
        }
    }
}

function drawRightGamerCards(normalCardWidth, normalCardHeight, smallCardWidth, smallCardHeight) {
    var shift;
    for (var i = 0; i < rightGamerCards.length; i++) {
        if (i % 2 != 0) {
            shift = normalCardWidth / 2;
        } else {
            shift = 0;
        }
        rightGamerCards[i].x = gameArea.canvas.width - normalCardWidth - 2 * smallCardWidth - shift;
        rightGamerCards[i].y = smallCardHeight + i * (gameArea.canvas.height - 2 * normalCardHeight - 2 * smallCardHeight) / (rightGamerCards.length - 1);
        rightGamerCards[i].width = normalCardWidth;
        rightGamerCards[i].height = normalCardHeight;
        rightGamerCards[i].update();
    }
    for (var i = 0; i < rightGamerBeatedCards.length; i++) {
        for (var j = 0; j < middleGamerBeatedCards[i].length; j++) {
            var dy = (gameArea.canvas.height - normalCardHeight - 3 * smallCardHeight) / (leftGamerBeatedCards.length - 1);
            rightGamerBeatedCards[i][j].x = gameArea.canvas.width - 2 * smallCardWidth + j * 0.5 * smallCardWidth;
            rightGamerBeatedCards[i][j].y = smallCardHeight + i * dy;
            rightGamerBeatedCards[i][j].width = smallCardWidth;
            rightGamerBeatedCards[i][j].height = smallCardHeight;
            rightGamerBeatedCards[i][j].update();
        }
    }
}

function drawCardsInGame(normalCardWidth, normalCardHeight, smallCardWidth, smallCardHeight) {
    for (var i = 0; i < cardsInGame.length; i++) {
        cardsInGame[i].x = /*2 * smallCardWidth + */i * (gameArea.canvas.width - smallCardWidth/* - 4 * smallCardWidth*/) / (cardsInGame.length - 1);
        cardsInGame[i].y = 0;
        cardsInGame[i].width = smallCardWidth;
        cardsInGame[i].height = smallCardHeight;
        cardsInGame[i].update();
    }
}

function drawTalon(normalCardWidth, normalCardHeight, smallCardWidth, smallCardHeight) {
    for (var i = 0; i < cardsInTalon.length; i++) {
        var shift;
        if (i % 2 != 0) {
            shift = -1;
        } else {
            shift = 0;
        }
        cardsInTalon[i].x = gameArea.canvas.width / 2 + shift * normalCardWidth;
        cardsInTalon[i].y = smallCardHeight;
        cardsInTalon[i].width = normalCardWidth;
        cardsInTalon[i].height = normalCardHeight;
        cardsInTalon[i].update();
    }
}

function drawThrownCards(normalCardWidth, normalCardHeight, smallCardWidth, smallCardHeight) {
    middleGamerThrownCard[0].x = gameArea.canvas.width / 2 - normalCardWidth / 2;
    middleGamerThrownCard[0].y = gameArea.canvas.height / 2 + 1.5 * normalCardHeight / 2 - normalCardHeight;
    middleGamerThrownCard[0].width = normalCardWidth;
    middleGamerThrownCard[0].height = normalCardHeight;
    middleGamerThrownCard[0].update();

    leftGamerThrownCard[0].x = gameArea.canvas.width / 2 - 1.5 * normalCardWidth / 2;
    leftGamerThrownCard[0].y = gameArea.canvas.height / 2 - 1.5 * normalCardHeight / 2;
    leftGamerThrownCard[0].width = normalCardWidth;
    leftGamerThrownCard[0].height = normalCardHeight;
    leftGamerThrownCard[0].update();

    rightGamerThrownCard[0].x = gameArea.canvas.width / 2 + 1.5 * normalCardWidth / 2 - normalCardWidth;
    rightGamerThrownCard[0].y = gameArea.canvas.height / 2 - 1.5 * normalCardHeight / 2;
    rightGamerThrownCard[0].width = normalCardWidth;
    rightGamerThrownCard[0].height = normalCardHeight;
    rightGamerThrownCard[0].update();
}

function updateCards() {
    var normalCardHeight = 220;
    var normalCardWidth;
    do {
        normalCardHeight /= 1.01;
        normalCardWidth = normalCardHeight * nominalCardWidth / nominalCardHeight;
    } while (!(gameArea.canvas.width > 7 * normalCardWidth && gameArea.canvas.height > 4.5 * normalCardHeight));

    var smallCardHeight = normalCardHeight / 2;
    var smallCardWidth = normalCardWidth / 2;

    drawMiddleGamerCards(normalCardWidth, normalCardHeight, smallCardWidth, smallCardHeight);
    drawLeftGamerCards(normalCardWidth, normalCardHeight, smallCardWidth, smallCardHeight);
    drawRightGamerCards(normalCardWidth, normalCardHeight, smallCardWidth, smallCardHeight);
    drawCardsInGame(normalCardWidth, normalCardHeight, smallCardWidth, smallCardHeight);
    drawTalon(normalCardWidth, normalCardHeight, smallCardWidth, smallCardHeight);
    drawThrownCards(normalCardWidth, normalCardHeight, smallCardWidth, smallCardHeight);

    for (var i = 0; i < highlightedCards.length; i++) {
        highlightedCards[i].update();
    }
}

function readJson() {
    gameStatus = JSON.parse(status);
    console.log("Statusz: ", gameStatus);
}

function startGame() {
    window.addEventListener("resize", function () {
        updateGameArea();
    }, true);
    initEmptyStatus();
    gameArea.start();
    btnDiv.start();
    readJson();
    initCardsFromJson();
    updateGameArea();
}

function updateGameArea() {
    gameArea.clear();
    gameArea.canvas.width = window.innerWidth - 25;
    gameArea.canvas.height = window.innerHeight - 50;
    updateCards();
}