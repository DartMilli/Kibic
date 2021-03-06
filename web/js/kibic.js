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
var clickZones = [];
var defaultColor = "#e3e3e3";

var cardNames;
function initCardNames() {
    cardNames = $.ajax({
        url: "js/cards.json",
        async: false,
        dataType: 'json'
    }).responseJSON;
}

function getCardNameById(id) {
    for (var i = 0; i < cardNames.length; i++) {
        if (id == cardNames[i]["id"]) {
            return cardNames[i]["name"];
        }
    }
    return "";
}

function getCardPathById(id) {
    for (var i = 0; i < cardNames.length; i++) {
        if (id == cardNames[i]["id"]) {
            return cardNames[i]["path"];
        }
    }
    return "";
}

function getCardColorById(id) {
    for (var i = 0; i < cardNames.length; i++) {
        if (id == cardNames[i]["id"]) {
            return cardNames[i]["color"];
        }
    }
    return "";
}

function getCardIdByName(name) {
    for (var i = 0; i < cardNames.length; i++) {
        if (name == cardNames[i]["name"]) {
            return cardNames[i]["id"];
        }
    }
    return "";
}

function getCardIdByPath(path) {
    if (path != undefined || path != null) {
        for (var i = 0; i < cardNames.length; i++) {
            if (path.endsWith(cardNames[i]["path"])) {
                return cardNames[i]["id"];
            }
        }
    }
    return "";
}

var status;
function initEmptyStatus() {
    status += '{                         ';
    status += '    "game": "",           ';
    status += '	   "player": "gamer",    ';
    status += '	   "caller": "",    ';
    status += '	   "round": -1,          ';
    status += '	   "talon": [],          ';
    status += '	   "cardsingame": [      ';
    status += '        "pas",            ';
    status += '        "p10",            ';
    status += '        "pk",             ';
    status += '        "pf",             ';
    status += '        "pal",            ';
    status += '        "p9",             ';
    status += '        "p8",             ';
    status += '        "p7",             ';
    status += '        "tas",            ';
    status += '        "t10",             ';
    status += '        "tk",             ';
    status += '        "tf",             ';
    status += '        "tal",            ';
    status += '        "t9",             ';
    status += '        "t8",             ';
    status += '        "t7",             ';
    status += '        "zas",            ';
    status += '        "z10",            ';
    status += '        "zk",             ';
    status += '        "zf",             ';
    status += '        "zal",            ';
    status += '        "z9",             ';
    status += '        "z8",             ';
    status += '        "z7",             ';
    status += '        "mas",            ';
    status += '        "m10",            ';
    status += '        "mk",             ';
    status += '        "mf",             ';
    status += '        "mal",            ';
    status += '        "m9",             ';
    status += '        "m8",             ';
    status += '        "m7"              ';
    status += '    ],                    ';
    status += '	   "gamer": {            ';
    status += '        "unknowncards": 12,';
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
    status += '        "unknowncards": 10,';
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
    status += '        "unknowncards": 10,';
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

var gameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = window.innerWidth - 25;
        this.canvas.height = window.innerHeight - 50;
        this.canvas.onmousemove = function (event) {
            mousemove(event);
        };
        this.canvas.onclick = function (event) {
            mouseclick(event);
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
            alert("Updated!");
        }
    });
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.opaque = false;
    this.setOpaque = function (boolean) {
        this.opaque = boolean;
    }
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
        this.path = this.image.src;
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
            if (this.opaque) {
                ctx.globalAlpha = 0.8;
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(this.x, this.y, this.width, this.height);
                ctx.globalAlpha = 1.0;
            }
        } else if (!type.startsWith("clickZone")) {
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

function mouseclick(e) {
    var x = e.clientX;
    var y = e.clientY;
    updateGameArea();
    for (var i = 0; i < clickZones.length; i++) {
        if (clickZones[i].contains(x, y)) {
            if (gameStatus["round"] > 0 && gameStatus["caller"] != clickZones[i].type.slice(10)) {
                alert("It is not " + clickZones[i].type.slice(10) + "'s turn!")
            } else {
                document.getElementById('id01').style.display = 'block';
                document.getElementById('id01').setAttribute("name", clickZones[i].type);
                setDesabledCardsInCardPicker(clickZones[i].type);
            }
        }
    }
}

function initClickZones() {
    clickZones.push(new component(nominalCardHeight, nominalCardWidth, defaultColor, 0, 0, "clickZone-gamer"));
    clickZones.push(new component(nominalCardHeight, nominalCardWidth, defaultColor, 0, 0, "clickZone-leftgamer"));
    clickZones.push(new component(nominalCardHeight, nominalCardWidth, defaultColor, 0, 0, "clickZone-rightgamer"));
    clickZones.push(new component(nominalCardHeight, nominalCardWidth, defaultColor, 0, 0, "clickZone-talon"));
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
        cards.length = 0;
        for (var j = 0; j < player.hand.length; j++) {
            cards.push(new component(nominalCardWidth, nominalCardHeight, getCardPathById(player.hand[index]), 0, 0, "image"));
            allCards.push(cards[index]);
            index++;
        }
        for (var j = 0; j < player.unknowncards; j++) {
            cards.push(new component(nominalCardWidth, nominalCardHeight, getCardPathById("h"), 0, 0, "image"));
            allCards.push(cards[index]);
            index++;
        }
        for (var j = 1; j < 11; j++) {
            var key = "round " + j;
            beatedCards[j - 1] = [];
            for (var k = 0; k < 3; k++) {
                if (player.beated[key].length < 3) {
                    beatedCards[j - 1][k] = new component(nominalCardWidth, nominalCardHeight, defaultColor, 0, 0, "none");
                } else {
                    beatedCards[j - 1][k] = new component(nominalCardWidth, nominalCardHeight, getCardPathById(player.beated[key][k]), 0, 0, "image");
                    allCards.push(beatedCards[j - 1][k]);
                }
            }
        }
        if (player.thrown.length != 0) {
            thrownCard[0] = new component(nominalCardWidth, nominalCardHeight, getCardPathById(player.thrown[0]), 0, 0, "image");
            allCards.push(thrownCard[0]);
        } else {
            thrownCard[0] = new component(nominalCardWidth, nominalCardHeight, defaultColor, 0, 0, "none");
        }
    }
    //init opponent cards in game
    for (var i = 0; i < gameStatus.cardsingame.length; i++) {
        cardsInGame[i] = new component(nominalCardWidth, nominalCardHeight, getCardPathById(gameStatus.cardsingame[i]), 0, 0, "image");
        allCards.push(cardsInGame[i]);
    }
    // init talon
    if (gameStatus.talon.length == 0) {
        if (gameStatus.gamer.unknowncards + gameStatus.gamer.hand.length == 12
                || gameStatus.rightgamer.unknowncards + gameStatus.rightgamer.hand.length == 12
                || gameStatus.leftgamer.unknowncards + gameStatus.leftgamer.hand.length == 12) {
            cardsInTalon[0] = new component(nominalCardWidth, nominalCardHeight, defaultColor, 0, 0, "none");
            cardsInTalon[1] = new component(nominalCardWidth, nominalCardHeight, defaultColor, 0, 0, "none");
        } else {
            cardsInTalon[0] = new component(nominalCardWidth, nominalCardHeight, getCardPathById("h"), 0, 0, "image");
            cardsInTalon[1] = new component(nominalCardWidth, nominalCardHeight, getCardPathById("h"), 0, 0, "image");
        }
    } else if (gameStatus.talon.length == 1) {
        cardsInTalon[0] = new component(nominalCardWidth, nominalCardHeight, getCardPathById(gameStatus.talon[0]), 0, 0, "image");
        allCards.push(cardsInTalon[0]);
        cardsInTalon[1] = new component(nominalCardWidth, nominalCardHeight, getCardPathById("h"), 0, 0, "image");
    } else {
        cardsInTalon[0] = new component(nominalCardWidth, nominalCardHeight, getCardPathById(gameStatus.talon[0]), 0, 0, "image");
        cardsInTalon[1] = new component(nominalCardWidth, nominalCardHeight, getCardPathById(gameStatus.talon[1]), 0, 0, "image");
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
        for (var j = 0; j < middleGamerCards.length; j++) {
            if (cardsInGame[i].path == middleGamerCards[j].path) {
                cardsInGame[i].setOpaque(true);
                break;
            }
        }
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

function drawClickZones(normalCardWidth, normalCardHeight, smallCardWidth, smallCardHeight) {
    for (var i = 0; i < clickZones.length; i++) {
        var type = clickZones[i].type;
        var x, y, w, h;
        switch (type) {
            case "clickZone-gamer":
                x = 0;
                y = gameArea.canvas.height - normalCardHeight - smallCardHeight;
                w = gameArea.canvas.width;
                h = normalCardHeight;
                break;
            case "clickZone-leftgamer":
                x = 2 * smallCardWidth;
                y = smallCardHeight;
                w = 1.5 * normalCardWidth;
                h = gameArea.canvas.height - (2 * smallCardHeight + normalCardHeight);
                break;
            case "clickZone-rightgamer":
                x = gameArea.canvas.width - 2 * smallCardWidth - 1.5 * normalCardWidth;
                y = smallCardHeight;
                w = 1.5 * normalCardWidth;
                h = gameArea.canvas.height - (2 * smallCardHeight + normalCardHeight);
                break;
            case "clickZone-talon":
                x = gameArea.canvas.width / 2 - normalCardWidth;
                y = smallCardHeight;
                w = 2 * normalCardWidth;
                h = normalCardHeight;
                break;
        }
        clickZones[i].x = x;
        clickZones[i].y = y;
        clickZones[i].width = w;
        clickZones[i].height = h;
        clickZones[i].update();
    }
}

function updateCards() {
    var normalCardHeight = nominalCardHeight * 1.1;
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
    drawClickZones(normalCardWidth, normalCardHeight, smallCardWidth, smallCardHeight);

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
    initCardNames();
    gameArea.start();
    readJson();
    initCardsFromJson();
    initClickZones();
    updateGameArea();
}

function updateGameArea() {
    gameArea.clear();
    gameArea.canvas.width = window.innerWidth - 25;
    gameArea.canvas.height = window.innerHeight - 50;
    updateCards();
}

function fillGameStatusFromCardPicker() {
    var name = document.getElementById('id01').getAttribute("name");
    var chkboxes = document.getElementsByTagName("input");
    var cardList = [];

    var round = gameStatus["round"];
    var clickedName = name.slice(10);

    for (var i = 0; i < chkboxes.length; i++) {
        if (chkboxes[i].checked) {
            cardList.push(chkboxes[i].name);
        }
    }

    if (clickedName == "gamer") {
        if (round < 0) {
            if (cardList.length == 10 || cardList.length == 12) {
                gameStatus.gamer.hand = cardList;
                clickAndPostGameStatus();
                closeCardPicker();
            } else {
                alert("10 or 12 card must be choosen!");
            }
        } else if (round == 0) {
            // bemod valamit ha ő jön és leteszi a talont ha 12 lapja van
        } else if (round > 0) {
            if (cardList.length != 1) {
                alert("1 card must be choosen!");
            } else {
                gameStatus.gamer.thrown = cardList;
                clickAndPostGameStatus();
                closeCardPicker();
            }
        }
    } else if (clickedName == "rightgamer") {
        if (round < 0) {
            if (!cardList.length > 0) {
                clickAndPostGameStatus();
                closeCardPicker();
            } else {
                alert("No card must be choosen!");
            }
            clickAndPostGameStatus();
            closeCardPicker();
        } else if (round == 0) {
            // bemond valamit ha ő jön, de nem tehet le semmit
        } else if (round > 0) {
            if (cardList.length != 1) {
                alert("1 card must be choosen!");
            } else {
                gameStatus.rightgamer.thrown = cardList;
                clickAndPostGameStatus();
                closeCardPicker();
            }
        }
    } else if (clickedName == "leftgamer") {
        if (round < 0) {
            if (!cardList.length > 0) {
                clickAndPostGameStatus();
                closeCardPicker();
            } else {
                alert("No card must be choosen!");
            }
        } else if (round == 0) {
            // bemond valamit ha ő jön, de nem tehet le semmit
        } else if (round > 0) {
            if (cardList.length != 1) {
                alert("1 card must be choosen!");
            } else {
                gameStatus.leftgamer.thrown = cardList;
                clickAndPostGameStatus();
                closeCardPicker();
            }
        }
    } else if (clickedName == "talon") {
        if (round < 0) {
            if (!cardList.length > 0) {
                clickAndPostGameStatus();
                closeCardPicker();
            } else {
                alert("No card must be choosen!");
            }
        } else if (round == 0) {
            //talon bekerül gamer kártyái közé
        } else {
            if (!cardList.length > 0) {
                clickAndPostGameStatus();
                closeCardPicker();
            } else {
                alert("No card must be choosen!");
            }
        }
    }
}

function setDesabledCardsInCardPicker(clickedZoneName) {
    var clickedName = clickedZoneName.slice(10);
    var allowedCardsId = [];
    var round = gameStatus["round"];
    var chkboxes = document.getElementsByTagName("input");

    var cardsInGameId = [];
    for (var i = 0; i < cardsInGame.length; i++) {
        cardsInGameId.push(getCardIdByPath(cardsInGame[i].path));
    }
    var middleGamerCardsId = [];
    for (var i = 0; i < middleGamerCards.length; i++) {
        middleGamerCardsId.push(getCardIdByPath(middleGamerCards[i].path));
    }
    var leftGamerCardsId = [];
    for (var i = 0; i < leftGamerCards.length; i++) {
        leftGamerCardsId.push(getCardIdByPath(leftGamerCards[i].path));
    }
    var rightGamerCardsId = [];
    for (var i = 0; i < rightGamerCards.length; i++) {
        rightGamerCardsId.push(getCardIdByPath(rightGamerCards[i].path));
    }
    var talonCardsId = [];
    for (var i = 0; i < cardsInTalon.length; i++) {
        talonCardsId.push(getCardIdByPath(cardsInTalon[i].path));
    }

    for (var i = 0; i < chkboxes.length; i++) {
        chkboxes[i].disabled = true;
    }

    if (round < 0) {
        if (clickedName == "gamer") {
            allowedCardsId = cardsInGameId;
        } else {
            allowedCardsId = [];
        }
    } else if (round == 0) {
        if (clickedName == "gamer") {
            allowedCardsId = cardsInGameId;
        } else if (clickedName == "talon") {
            allowedCardsId = substractListBFromA(cardsInGameId, middleGamerCardsId);
        } else {
            allowedCardsId = [];
        }
    } else if (round > 0) {
        if (clickedName == "gamer") {
            allowedCardsId = middleGamerCardsId
        } else if (clickedName == leftgamer) {
            allowedCardsId = substractListBFromA(cardsInGameId, union(middleGamerCardsId, union(talonCardsId, rightGamerCardsId)));
        } else if (clickedName == rightgamer) {
            allowedCardsId = substractListBFromA(cardsInGameId, union(middleGamerCardsId, union(talonCardsId, leftGamerCardsId)));
        }
    }

    for (var i = 0; i < allowedCardsId.length; i++) {
        for (var j = 0; j < chkboxes.length; j++) {
            if (chkboxes[j].name == allowedCardsId[i]) {
                chkboxes[j].disabled = false;
            }
        }
    }
}

function closeCardPicker() {
    var chkboxes = document.getElementsByTagName("input");
    for (var i = 0; i < chkboxes.length; i++) {
        chkboxes[i].checked = false;
    }
    document.getElementById('id01').style.display = 'none';
}
