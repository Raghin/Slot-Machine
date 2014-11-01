// Author: Peter Smith
// Last Modified 31/10/2014
// Description: a slot machine that allows the user to bet money and spin the reels to try and win
// Credit: Tom Tsiliopoulos with preloader code and js music script as well as the base math code 

// Global Variables
var stage= createjs.Stage;
var queue;
var game= createjs.Container;
var slotMachine= createjs.Bitmap;
var Reel1Image= createjs.Bitmap;
var Reel2Image= createjs.Bitmap;
var Reel3Image= createjs.Bitmap;
var jackpotLabel= createjs.Text;
var creditsLabel= createjs.Text;
var winningsLabel= createjs.Text;
var betLabel = createjs.Text;

// Class Variables
var Jackpot= number = 5000;
var credits= number = 1000;
var bet= number = 0;
var WinnerPaid= number = 0;
var HitTheJackPot= boolean = false;

// play button 
var playbutton= createjs.Bitmap;

// Game Variables
var turn= number = 0;
var winnings=number = 0;
var winNumber= number = 0;
var lossNumber= number = 0;
var spinResult;
var fruits=string = "";
var winRatio=number = 0;

/* Tally Variables */
var grapes=number = 0;
var bananas= number  = 0;
var oranges= number  = 0;
var cherries= number  = 0;
var bars= number  = 0;
var watermelons= number  = 0;
var lemons= number  = 0;
var apples= number = 0;
var blanks= number  = 0;

// Preload assets
function preload() {
    queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    queue.addEventListener("complete", init);
    queue.loadManifest([
        { id: "slotmachine", src: "images/slotMachine.png" },
        { id: "blank", src: "images/blank.gif" },
        { id: "resetbutton", src: "images/reset button.jpg" },
        { id: "powerbutton", src: "images/power button.jpg" },
        { id: "playbutton", src: "images/play button.jpg" },
		
        { id: "winningsLogo", src: "images/winningsLogo.png" },
		{ id: "creditsLogo", src: "images/creditsLogo.png" },
		{ id: "jackpotLogo", src: "images/Jackpot.png" },
		{ id: "betLogo", src: "images/betLogo.png" },

        { id: "bet1", src: "images/bet1.gif" },
        { id: "bet2", src: "images/bet2.gif" },
        { id: "bet5", src: "images/bet5.gif" },
        { id: "bet10", src: "images/bet10.gif" },
        { id: "bet25", src: "images/bet25.gif" },
        { id: "bet50", src: "images/bet50.gif" },
        { id: "bet100", src: "images/bet100.gif" },
        { id: "bet500", src: "images/bet500.gif" },
        { id: "grapes", src: "images/grape.png" },
        { id: "banana", src: "images/banana.png" },
        { id: "orange", src: "images/orange.png" },
        { id: "cherry", src: "images/cherry.png" },
        { id: "bar", src: "images/bar.png" },
        { id: "lemon", src: "images/lemon.png" },
        { id: "watermelon", src: "images/watermelon.png" },
		{ id: "apple", src: "images/apple.png" },
        { id: "buzzer", src: "sounds/buzzer.wav" },
        { id: "casino", src: "sounds/background.mp3" },
        { id: "coin", src: "sounds/coin_drop.wav" },
        { id: "jackpot", src: "sounds/jackpot.mp3" },
        { id: "loser", src: "sounds/lost.wav" },
        { id: "win", src: "sounds/small_win.wav" },
        { id: "spin", src: "sounds/spin.wav" }
    ]);
}

// init function kicks off the stage object
function init() {
    stage = new createjs.Stage(document.getElementById('canvas'));
    stage.enableMouseOver(20);
    createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Ticker.setFPS(60);
    begin();
}

// event handler for game loop
function handleTick(e){
    stage.update();
}


function begin(){
    drawSlotMachine();
    createjs.Sound.play('casino', createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 1, 0);

}

function drawReels(Reel1, Reel2, Reel3){
    // Draw Blank Reels
    Reel1Image = new createjs.Bitmap(queue.getResult(Reel1));
    Reel1Image.x = 80;
    Reel1Image.y = 130;
    game.addChild(Reel1Image);

    Reel2Image = new createjs.Bitmap(queue.getResult(Reel2));
    Reel2Image.x = 257;
    Reel2Image.y = 130;
    game.addChild(Reel2Image);

    Reel3Image = new createjs.Bitmap(queue.getResult(Reel3));
    Reel3Image.x = 437;
    Reel3Image.y = 130;
    game.addChild(Reel3Image);
}


function drawSlotMachine(){
    // create game container
    game = new createjs.Container();


    // make the slot machine
    slotMachine = new createjs.Bitmap(queue.getResult('slotmachine'));
    game.addChild(slotMachine);

    // create blank reels
    drawReels('blank', 'blank', 'blank');

    // Display jackpot, credits, winnings, bet Logos
    var jackpotLogo = new createjs.Bitmap(queue.getResult('jackpotLogo'));
    jackpotLogo.x += 185;
    jackpotLogo.y += 20;
    var winningsLogo = new createjs.Bitmap(queue.getResult('winningsLogo'));
    winningsLogo.x += 175;
    winningsLogo.y += 51;
    var betLogo = new createjs.Bitmap(queue.getResult('betLogo'));
    betLogo.x += 395;
    betLogo.y += 340;
    var creditsLogo = new createjs.Bitmap(queue.getResult('creditsLogo'));
    creditsLogo.x += 395;
    creditsLogo.y += 371;
    game.addChild(jackpotLogo, winningsLogo, betLogo, creditsLogo);

    // Display jackpot,  credits, winnings and bet Labels
    jackpotLabel = new createjs.Text(Jackpot.toString(), "30px Consolas", "#FFFF00");
    jackpotLabel.x += 455;
    jackpotLabel.y += 17;
    jackpotLabel.textAlign = "right";
    game.addChild(jackpotLabel);

    creditsLabel = new createjs.Text(credits.toString(), "30px Consolas", "#FFFF00");
    creditsLabel.x += 378;
    creditsLabel.y += 367;
    creditsLabel.textAlign = "right";
    game.addChild(creditsLabel);

    betLabel = new createjs.Text(bet.toString(), "30px Consolas", "#FFFF00");
    betLabel.x += 378;
    betLabel.y += 337;
    betLabel.textAlign = "right";
    game.addChild(betLabel);

    winningsLabel = new createjs.Text(WinnerPaid.toString(), "30px Consolas", "#FFFF00");
    winningsLabel.x = 455;
    winningsLabel.y = 46;
    winningsLabel.textAlign = "right";
    game.addChild(winningsLabel);

    // add the Reset button
    var ResetButton = new createjs.Bitmap(queue.getResult('resetbutton'));
    ResetButton.x += 20;
    ResetButton.y += 20;
    ResetButton.cursor = "pointer";
    game.addChild(ResetButton);
    ResetButton.addEventListener("click", ResetButtonClick);
    ResetButton.addEventListener("mouseover", function () {
        ResetButton.alpha = 0.5;
    });
    ResetButton.addEventListener("mouseout", function () {
        ResetButton.alpha = 1.0;
    });

    // Display the Power button
    var PowerButton = new createjs.Bitmap(queue.getResult('powerbutton'));
    PowerButton.x += 562;
    PowerButton.y += 22;
    PowerButton.cursor = "pointer";
    game.addChild(PowerButton);
    PowerButton.addEventListener("click", PowerButtonClick);
    PowerButton.addEventListener("mouseover", function () {
        PowerButton.alpha = 0.5;
    });
    PowerButton.addEventListener("mouseout", function () {
        PowerButton.alpha = 1.0;
    });

    // Display the Spin button
    playbutton = new createjs.Bitmap(queue.getResult('playbutton'));
    playbutton.x += 510;
    playbutton.y += 315;
    playbutton.cursor = "pointer";

    game.addChild(playbutton);
    playbutton.addEventListener("click", playbuttonclick);
    playbutton.addEventListener("mouseover", function () {
        playbutton.alpha = 0.5;
    });
    playbutton.addEventListener("mouseout", function () {
        playbutton.alpha = 1;
    });

    // Display bet Buttons
    var bet1Button = new createjs.Bitmap(queue.getResult('bet1'));
    bet1Button.x += 30;
    bet1Button.y += 325;
    bet1Button.cursor = "pointer";
    game.addChild(bet1Button);
    bet1Button.addEventListener("click", function () {
        if (bet < credits)
        {
            bet += 1;
            betLabel.text = bet.toString();
            createjs.Sound.play('coin');
        }
        else
        {
            createjs.Sound.play('buzzer');
            alert("You don't got the dough to make that bet!");
        }
    });
    bet1Button.addEventListener("mouseover", function () {
        bet1Button.alpha = 0.5;
    });
    bet1Button.addEventListener("mouseout", function () {
        bet1Button.alpha = 1.0;
    });

    var bet2Button = new createjs.Bitmap(queue.getResult('bet2'));
    bet2Button.x += 85;
    bet2Button.y += 325;
    bet2Button.cursor = "pointer";
    game.addChild(bet2Button);
    bet2Button.addEventListener("click", function () {
        if ((bet + 2) <= credits) {
            bet += 2;
            betLabel.text = bet.toString();
            createjs.Sound.play('coin');
        }
        else {
            createjs.Sound.play('buzzer');
            alert("You don't got the dough to make that bet!");
        }
    });
    bet2Button.addEventListener("mouseover", function () {
        bet2Button.alpha = 0.5;
    });
    bet2Button.addEventListener("mouseout", function () {
        bet2Button.alpha = 1.0;
    });


    var bet5Button = new createjs.Bitmap(queue.getResult('bet5'));
    bet5Button.x += 140;
    bet5Button.y += 325;
    bet5Button.cursor = "pointer";
    game.addChild(bet5Button);
    bet5Button.addEventListener("click", function () {
        if ((bet + 5) <= credits) {
            bet += 5;
            betLabel.text = bet.toString();
            createjs.Sound.play('coin');
        }
        else {
            createjs.Sound.play('buzzer');
            alert("You don't got the dough to make that bet!");
        }
    });
    bet5Button.addEventListener("mouseover", function () {
        bet5Button.alpha = 0.5;
    });
    bet5Button.addEventListener("mouseout", function () {
        bet5Button.alpha = 1.0;
    });

    var bet10Button = new createjs.Bitmap(queue.getResult('bet10'));
    bet10Button.x += 195;
    bet10Button.y += 325;
    bet10Button.cursor = "pointer";
    game.addChild(bet10Button);
    bet10Button.addEventListener("click", function () {
        if ((bet + 10) <= credits) {
            bet += 10;
            betLabel.text = bet.toString();
            createjs.Sound.play('coin');
        }
        else {
            createjs.Sound.play('buzzer');
            alert("You don't got the dough to make that bet!");
        }
    });
    bet10Button.addEventListener("mouseover", function () {
        bet10Button.alpha = 0.5;
    });
    bet10Button.addEventListener("mouseout", function () {
        bet10Button.alpha = 1.0;
    });

    var bet25Button = new createjs.Bitmap(queue.getResult('bet25'));
    bet25Button.x += 30;
    bet25Button.y += 380;
    bet25Button.cursor = "pointer";
    game.addChild(bet25Button);
    bet25Button.addEventListener("click", function () {
        if ((bet + 25) <= credits) {
            bet += 25;
            betLabel.text = bet.toString();
            createjs.Sound.play('coin');
        }
        else {
            createjs.Sound.play('buzzer');
            alert("You don't got the dough to make that bet!");
        }
    });
    bet25Button.addEventListener("mouseover", function () {
        bet25Button.alpha = 0.5;
    });
    bet25Button.addEventListener("mouseout", function () {
        bet25Button.alpha = 1.0;
    });

    var bet50Button = new createjs.Bitmap(queue.getResult('bet50'));
    bet50Button.x += 85;
    bet50Button.y += 380;
    bet50Button.cursor = "pointer";
    game.addChild(bet50Button);
    bet50Button.addEventListener("click", function () {
        if ((bet + 50) <= credits) {
            bet += 50;
            betLabel.text = bet.toString();
            createjs.Sound.play('coin');
        }
        else {
            createjs.Sound.play('buzzer');
            alert("You don't got the dough to make that bet!");
        }
    });
    bet50Button.addEventListener("mouseover", function () {
        bet50Button.alpha = 0.5;
    });
    bet50Button.addEventListener("mouseout", function () {
        bet50Button.alpha = 1.0;
    });

    var bet100Button = new createjs.Bitmap(queue.getResult('bet100'));
    bet100Button.x += 140;
    bet100Button.y += 380;
    bet100Button.cursor = "pointer";
    game.addChild(bet100Button);
    bet100Button.addEventListener("click", function () {
        if ((bet + 100) <= credits) {
            bet += 100;
            betLabel.text = bet.toString();
            createjs.Sound.play('coin');
        }
        else {
            createjs.Sound.play('buzzer');
            alert("You don't got the dough to make that bet!");
        }
    });
    bet100Button.addEventListener("mouseover", function () {
        bet100Button.alpha = 0.5;
    });
    bet100Button.addEventListener("mouseout", function () {
        bet100Button.alpha = 1.0;
    });

    var bet500Button = new createjs.Bitmap(queue.getResult('bet500'));
    bet500Button.x += 195;
    bet500Button.y += 380;
    bet500Button.cursor = "pointer";
    game.addChild(bet500Button);
    bet500Button.addEventListener("click", function () {
        if ((bet + 500) <= credits) {
            bet += 500;
            betLabel.text = bet.toString();
            createjs.Sound.play('coin');
        }
        else {
            createjs.Sound.play('buzzer');
            alert("You don't got the dough to make that bet!");
        }
    });
    bet500Button.addEventListener("mouseover", function () {
        bet500Button.alpha = 0.5;
    });
    bet500Button.addEventListener("mouseout", function () {
        bet500Button.alpha = 1.0;
    });

    stage.addChild(game);
}

// Utility Function to Reset All Stats and Game Variables
function ResetAll() {
    // reset game variables
    Jackpot = 5000;
    jackpotLabel.text = "5000";
    credits = 1000;
    creditsLabel.text = "1000";
    bet = 0;
    betLabel.text = "0";
    WinnerPaid = 0;
    winningsLabel.text = "0";

    // reset player stats
    turn = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;
    winnings = 0;

    drawReels("blank","blank","blank");
}

// Event Handler Functions
function ResetButtonClick() {
    
    if (confirm("Giving up? \n \nWanna chicken out?")) {
        ResetAll();
    }
}

function PowerButtonClick() {
    if (confirm("Quiting eh? \n \nAre yah sure?")) {
        window.close();
    }
}


/* Utility function to show Player Stats */
function showPlayerStats() {
    winRatio = winNumber / turn;
}

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    oranges = 0;
    cherries = 0;
    bars = 0;
    watermelons = 0;
    lemons = 0;
    blanks = 0;
    apples = 0;
}

// roll to see if jackpot is won
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 100 + 1);
    var jackPotWin = Math.floor(Math.random() * 100 + 1);
    if (jackPotTry == jackPotWin) {
        alert("Congratulation Chap, \nyah got lucky with that spin \n$" + Jackpot + " Jackpot!!");
        credits += Jackpot;
        creditsLabel.text = credits.toString();
        Jackpot = 1000;
        jackpotLabel.text = Jackpot.toString();
        createjs.Sound.play('jackpot');
    }
}

// show them what they won
function showWinMessage() {
    credits += winnings;
    creditsLabel.text = credits.toString();
    WinnerPaid = winnings;
    winningsLabel.text = WinnerPaid.toString();
    resetFruitTally();
    createjs.Sound.play('win');
    checkJackPot();
}

// show them they lost and take their cash
function showLossMessage() {
    credits -= bet;
    creditsLabel.text = credits.toString();
    resetFruitTally();
    Jackpot += bet;
    jackpotLabel.text = Jackpot.toString();
    winningsLabel.text = "0";
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    }
    else {
        return false;
    }
}

    // determines what the reels will be
    function Reels() {
        var betLine = [" ", " ", " "];
        var outCome = [0, 0, 0];

        for (var spin = 0; spin < 3; spin++) {
            outCome[spin] = Math.floor((Math.random() * 65) + 1);
            switch (outCome[spin]) {
                case checkRange(outCome[spin], 1, 23):  // 41.5% probability
                    betLine[spin] = "blank";
                    blanks++;
                    break;
                case checkRange(outCome[spin], 24, 27):  // 6.2% probability
                    betLine[spin] = "apple";
                    apples++;
                    break;
                case checkRange(outCome[spin], 28, 37): // 15.4% probability
                    betLine[spin] = "grapes";
                    grapes++;
                    break;
                case checkRange(outCome[spin], 38, 46): // 13.8% probability
                    betLine[spin] = "banana";
                    bananas++;
                    break;
                case checkRange(outCome[spin], 47, 54): // 12.3% probability
                    betLine[spin] = "orange";
                    oranges++;
                    break;
                case checkRange(outCome[spin], 55, 59): //  7.7% probability
                    betLine[spin] = "cherry";
                    cherries++;
                    break;
                case checkRange(outCome[spin], 60, 62): //  4.6% probability
                    betLine[spin] = "bar";
                    bars++;
                    break;
                case checkRange(outCome[spin], 63, 64): //  3.1% probability
                    betLine[spin] = "watermelon";
                    watermelons++;
                    break;
                case checkRange(outCome[spin], 65, 65): //  1.5% probability
                    betLine[spin] = "lemon";
                    lemons++;
                    break;
            }
        }
        return betLine;
    }

    // check if they won
    function determineWinnings() {
        if (blanks == 0) {
            if (grapes == 3) {
                winnings = bet * 10;
            }
            else if (bananas == 3) {
                winnings = bet * 20;
            }
            else if (oranges == 3) {
                winnings = bet * 30;
            }
            else if (cherries == 3) {
                winnings = bet * 40;
            }
            else if (bars == 3) {
                winnings = bet * 50;
            }
            else if (apples == 3){
                winnings = bet * 60;
            }
            else if (watermelons == 3) {
                winnings = bet * 75;
            }
            else if (lemons == 3) {
                winnings = bet * 100;
            }
            else if (grapes == 2) {
                winnings = bet * 2;
            }
            else if (bananas == 2) {
                winnings = bet * 2;
            }
            else if (oranges == 2) {
                winnings = bet * 3;
            }
            else if (cherries == 2) {
                winnings = bet * 4;
            }
            else if (bars == 2) {
                winnings = bet * 5;
            }
            else if (apples == 2) {
                winnings = bet * 6;
            }
            else if (watermelons == 2) {
                winnings = bet * 10;
            }
            else if (lemons == 2) {
                winnings = bet * 20;
            }
            else {
                winnings = bet * 1;
            }
            if (lemons == 1) {
                winnings = bet * 5;
            }
            winNumber++;
            showWinMessage();
        }
        else {
            lossNumber++;
            showLossMessage();
        }

    }

    // let em try their luck
    function playbuttonclick() {
        if (credits == 0) {
            createjs.Sound.play('loser');
            if (confirm("Your broke chump! \nCare to take out a loan?")) {
                ResetAll();
                showPlayerStats();
            }
        }
        else if (bet == 0) {
            createjs.Sound.play('buzzer');
            alert("You gotta bet somethin chap!");
        }
        else if (bet > credits) {
            createjs.Sound.play('buzzer');
            alert("You don't got the dough to make that bet!");
        }
        else if (bet <= credits) {
            createjs.Sound.play('spin');
            setTimeout(function () {
                spinResult = Reels();
                drawReels(spinResult[0], spinResult[1], spinResult[2]);
                determineWinnings();
                turn++;
                showPlayerStats();
                bet = 0;
                betLabel.text = bet.toString();
            }, 1000);
        }
    }

    // Resize Stage on Window Resize
    function onResize() {
        // browser viewport size
        var currentWidth = window.innerWidth;
        var currentHeight = window.innerHeight;

        // stage dimensions
        var originalWidth = 677; // your stage width
        var originalHeight = 486; // your stage height

        // keep aspect ratio
        var scale = Math.min(currentWidth / originalWidth, currentHeight / originalHeight);
        stage.scaleX = scale;
        stage.scaleY = scale;

        // adjust canvas size
        stage.canvas.width = originalWidth * scale;
        stage.canvas.height = originalHeight * scale;

        // update the stage
        stage.update()
    }

    window.onresize = function () {
        onResize();
    }
