// Global Variables
var stage: createjs.Stage;
var queue;
var game: createjs.Container;
var slotMachineImage: createjs.Bitmap;
var Reel1Image: createjs.Bitmap;
var Reel2Image: createjs.Bitmap;
var Reel3Image: createjs.Bitmap;
var JackPotLabel: createjs.Text;
var TotalCreditsLabel: createjs.Text;
var WinnerPaidLabel: createjs.Text;
var BetLabel: createjs.Text;

// Class Variables
var Jackpot: number = 50000;
var TotalCredits: number = 1000;
var Bet: number = 0;
var WinnerPaid: number = 0;
var HitTheJackPot: boolean = false;

// Button Variables
var SpinButton: createjs.Bitmap;

// Game Variables
var turn: number = 0;
var winnings:number = 0;
var winNumber: number = 0;
var lossNumber: number = 0;
var spinResult;
var fruits:string = "";
var winRatio:number = 0;

/* Tally Variables */
var grapes:number = 0;
var bananas: number  = 0;
var oranges: number  = 0;
var cherries: number  = 0;
var bars: number  = 0;
var watermelons: number  = 0;
var lemons: number  = 0;
var apples: number = 0;
var blanks: number  = 0;

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
        { id: "spinbutton", src: "images/play button.jpg" },
		
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
        { id: "buzzer", src: "sounds/Buzzer.mp3" },
        { id: "casino", src: "sounds/casino_ambiance.mp3" },
        { id: "coin", src: "sounds/coin_drop.mp3" },
        { id: "jackpot", src: "sounds/jackpot.mp3" },
        { id: "loser", src: "sounds/loser.wav" },
        { id: "win", src: "sounds/small_win.mp3" },
        { id: "spin", src: "sounds/spin_sound.mp3" }
    ]);
}

// init function kicks off the stage object
function init(): void {
    stage = new createjs.Stage(document.getElementById('canvas'));
    stage.enableMouseOver(20);
    createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Ticker.setFPS(60);
    start();
}

// event handler for game loop
function handleTick(e): void {
    //if (Bet > 0) {
    //    SpinButton.visible = true;
    //    SpinDisable.visible = false;
    //}
    stage.update();
}


function start():void {
    drawSlotMachine();
    createjs.Sound.play('casino', createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 1, 0);

}

function drawReels(Reel1:string, Reel2:string, Reel3:string): void {
    // Draw Blank Reels
    Reel1Image = new createjs.Bitmap(queue.getResult(Reel1));
    Reel1Image.x = 85;
    Reel1Image.y = 135;
    game.addChild(Reel1Image);

    Reel2Image = new createjs.Bitmap(queue.getResult(Reel2));
    Reel2Image.x = 262;
    Reel2Image.y = 135;
    game.addChild(Reel2Image);

    Reel3Image = new createjs.Bitmap(queue.getResult(Reel3));
    Reel3Image.x = 442;
    Reel3Image.y = 135;
    game.addChild(Reel3Image);
}


function drawSlotMachine(): void {
    // Declare new Game Container
    game = new createjs.Container();


    // Draw Slot Machine background image
    slotMachineImage = new createjs.Bitmap(queue.getResult('slotmachine'));
    game.addChild(slotMachineImage);

    // define blank image path and call drawReels function
    drawReels('blank', 'blank', 'blank');

	// Display jackpot, credits, winnings, bet Logos
	var jackpotLogo = new createjs.Bitmap(queue.getResult('jackpotLogo'));
    jackpotLogo.x += 195;
    jackpotLogo.y += 27;
    var winningsLogo = new createjs.Bitmap(queue.getResult('winningsLogo'));
    winningsLogo.x += 185;
    winningsLogo.y += 59;
    var betLogo = new createjs.Bitmap(queue.getResult('betLogo'));
    betLogo.x += 395;
    betLogo.y += 350;
    var creditsLogo = new createjs.Bitmap(queue.getResult('creditsLogo'));
    creditsLogo.x += 395;
    creditsLogo.y += 381;

    // Display Jackpot, Total Credits, Winner Paid and Bet Labels
    JackPotLabel = new createjs.Text(Jackpot.toString(), "30px Consolas", "#FFFF00");
    JackPotLabel.x += 465;
    JackPotLabel.y += 27;
    JackPotLabel.textAlign = "right";
    game.addChild(JackPotLabel);

    TotalCreditsLabel = new createjs.Text(TotalCredits.toString(), "30px Consolas", "#FFFF00");
    TotalCreditsLabel.x += 388;
    TotalCreditsLabel.y += 376;
    TotalCreditsLabel.textAlign = "right";
    game.addChild(TotalCreditsLabel);

    BetLabel = new createjs.Text(Bet.toString(), "30px Consolas", "#FFFF00");
    BetLabel.x += 388;
    BetLabel.y += 346;
    BetLabel.textAlign = "right";
    game.addChild(BetLabel);

    WinnerPaidLabel = new createjs.Text(WinnerPaid.toString(), "30px Consolas", "#FFFF00");
    WinnerPaidLabel.x = 465;
    WinnerPaidLabel.y = 56;
    WinnerPaidLabel.textAlign = "right";
    game.addChild(WinnerPaidLabel);

    // Display the Reset button
    var ResetButton = new createjs.Bitmap(queue.getResult('resetbutton'));
    ResetButton.x += 25;
    ResetButton.y += 25;
    ResetButton.cursor = "pointer";
    game.addChild(ResetButton);
    ResetButton.addEventListener("click", ResetButtonClick);
    ResetButton.addEventListener("mouseover", function (event: MouseEvent) {
        ResetButton.alpha = 0.5;
    });
    ResetButton.addEventListener("mouseout", function (event: MouseEvent) {
        ResetButton.alpha = 1.0;
    });

    // Display the Power button
    var PowerButton = new createjs.Bitmap(queue.getResult('powerbutton'));
    PowerButton.x += 565;
    PowerButton.y += 25;
    PowerButton.cursor = "pointer";
    game.addChild(PowerButton);
    PowerButton.addEventListener("click", PowerButtonClick);
    PowerButton.addEventListener("mouseover", function (event: MouseEvent) {
        PowerButton.alpha = 0.5;
    });
    PowerButton.addEventListener("mouseout", function (event: MouseEvent) {
        PowerButton.alpha = 1.0;
    });

    // Display the Spin button
    SpinButton = new createjs.Bitmap(queue.getResult('spinbutton'));
    //SpinDisable = new createjs.Bitmap(queue.getResult('spindisabled'));
    SpinButton.x += 510;
    SpinButton.y += 330;
    SpinButton.cursor = "pointer";
    SpinButton.visible = false;
    //SpinDisable.x = 545;
    //SpinDisable.y = 845;
    //SpinDisable.visible = true;
    //SpinDisable.cursor = "not-allowed";

    //game.addChild(SpinDisable);
    game.addChild(SpinButton);
    SpinButton.addEventListener("click", SpinButtonClick);
    SpinButton.addEventListener("mouseover", function (event: MouseEvent) {
        SpinButton.alpha = 0.5;
    });
    SpinButton.addEventListener("mouseout", function (event: MouseEvent) {
        SpinButton.alpha = 1;
    });

    // Display Bet Buttons
    var Bet1Button = new createjs.Bitmap(queue.getResult('bet1'));
    Bet1Button.x += 35;
    Bet1Button.y += 325;
    Bet1Button.cursor = "pointer";
    game.addChild(Bet1Button);
    Bet1Button.addEventListener("click", function () {
        Bet = 1;
        BetLabel.text = "1";
        createjs.Sound.play('coin');
    });
    Bet1Button.addEventListener("mouseover", function (event: MouseEvent) {
        Bet1Button.alpha = 0.5;
    });
    Bet1Button.addEventListener("mouseout", function (event: MouseEvent) {
        Bet1Button.alpha = 1.0;
    });

    var Bet2Button = new createjs.Bitmap(queue.getResult('bet2'));
    Bet2Button.x += 90;
    Bet2Button.y += 325;
    Bet2Button.cursor = "pointer";
    game.addChild(Bet2Button);
    Bet2Button.addEventListener("click", function () {
        Bet = 2;
        BetLabel.text = "2";
        createjs.Sound.play('coin');
    });
    Bet2Button.addEventListener("mouseover", function (event: MouseEvent) {
        Bet2Button.alpha = 0.5;
    });
    Bet2Button.addEventListener("mouseout", function (event: MouseEvent) {
        Bet2Button.alpha = 1.0;
    });


    var Bet5Button = new createjs.Bitmap(queue.getResult('bet5'));
    Bet5Button.x += 145;
    Bet5Button.y += 325;
    Bet5Button.cursor = "pointer";
    game.addChild(Bet5Button);
    Bet5Button.addEventListener("click", function () {
        Bet = 5;
        BetLabel.text = "5";
        createjs.Sound.play('coin');
    });
    Bet5Button.addEventListener("mouseover", function (event: MouseEvent) {
        Bet5Button.alpha = 0.5;
    });
    Bet5Button.addEventListener("mouseout", function (event: MouseEvent) {
        Bet5Button.alpha = 1.0;
    });

    var Bet10Button = new createjs.Bitmap(queue.getResult('bet10'));
    Bet10Button.x += 200;
    Bet10Button.y += 325;
    Bet10Button.cursor = "pointer";
    game.addChild(Bet10Button);
    Bet10Button.addEventListener("click", function () {
        Bet = 10;
        BetLabel.text = "10";
        createjs.Sound.play('coin');
    });
    Bet10Button.addEventListener("mouseover", function (event: MouseEvent) {
        Bet10Button.alpha = 0.5;
    });
    Bet10Button.addEventListener("mouseout", function (event: MouseEvent) {
        Bet10Button.alpha = 1.0;
    });

    var Bet25Button = new createjs.Bitmap(queue.getResult('bet25'));
    Bet25Button.x += 35;
    Bet25Button.y += 380;
    Bet25Button.cursor = "pointer";
    game.addChild(Bet25Button);
    Bet25Button.addEventListener("click", function () {
        Bet = 25;
        BetLabel.text = "25";
        createjs.Sound.play('coin');
    });
    Bet25Button.addEventListener("mouseover", function (event: MouseEvent) {
        Bet25Button.alpha = 0.5;
    });
    Bet25Button.addEventListener("mouseout", function (event: MouseEvent) {
        Bet25Button.alpha = 1.0;
    });

    var Bet50Button = new createjs.Bitmap(queue.getResult('bet50'));
    Bet50Button.x += 90;
    Bet50Button.y += 380;
    Bet50Button.cursor = "pointer";
    game.addChild(Bet50Button);
    Bet50Button.addEventListener("click", function () {
        Bet = 50;
        BetLabel.text = "50";
        createjs.Sound.play('coin');
    });
    Bet50Button.addEventListener("mouseover", function (event: MouseEvent) {
        Bet50Button.alpha = 0.5;
    });
    Bet50Button.addEventListener("mouseout", function (event: MouseEvent) {
        Bet50Button.alpha = 1.0;
    });

    var Bet100Button = new createjs.Bitmap(queue.getResult('bet100'));
    Bet100Button.x += 145;
    Bet100Button.y += 380;
    Bet100Button.cursor = "pointer";
    game.addChild(Bet100Button);
    Bet100Button.addEventListener("click", function () {
        Bet = 100;
        BetLabel.text = "100";
        createjs.Sound.play('coin');
    });
    Bet100Button.addEventListener("mouseover", function (event: MouseEvent) {
        Bet100Button.alpha = 0.5;
    });
    Bet100Button.addEventListener("mouseout", function (event: MouseEvent) {
        Bet100Button.alpha = 1.0;
    });

    var Bet500Button = new createjs.Bitmap(queue.getResult('bet500'));
    Bet500Button.x += 200;
    Bet500Button.y += 380;
    Bet500Button.cursor = "pointer";
    game.addChild(Bet500Button);
    Bet500Button.addEventListener("click", function () {
        Bet = 500
        BetLabel.text = "500";
        createjs.Sound.play('coin');
    });
    Bet500Button.addEventListener("mouseover", function (event: MouseEvent) {
        Bet500Button.alpha = 0.5;
    });
    Bet500Button.addEventListener("mouseout", function (event: MouseEvent) {
        Bet500Button.alpha = 1.0;
    });

    stage.addChild(game);
}

// Utility Function to Reset All Stats and Game Variables
function ResetAll(): void {
    // reset game variables
    Jackpot = 50000;
    JackPotLabel.text = "50000";
    TotalCredits = 1000;
    TotalCreditsLabel.text = "1000";
    Bet = 0;
    BetLabel.text = "0";
    WinnerPaid = 0;
    WinnerPaidLabel.text = "0";

    // reset player stats
    turn = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;
    winnings = 0;

}

// Event Handler Functions
function ResetButtonClick(event: MouseEvent): void {
    
    if (confirm("Reset Button Pressed \n \nAre you Sure?")) {
        ResetAll();
    }
}

function PowerButtonClick(event: MouseEvent): void {
    if (confirm("Power Off App? \n \nAre you Sure?")) {
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

/* Check to see if the player won the jackpot */
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 100 + 1);
    var jackPotWin = Math.floor(Math.random() * 100 + 1);
    if (jackPotTry == jackPotWin) {
        alert("You Won the $" + Jackpot + " Jackpot!!");
        TotalCredits += Jackpot;
        TotalCreditsLabel.text = TotalCredits.toString();
        Jackpot = 1000;
        JackPotLabel.text = Jackpot.toString();
        createjs.Sound.play('jackpot');
    }
}

/* Utility function to show a win message and increase player money */
function showWinMessage():void {
    TotalCredits += winnings;
    TotalCreditsLabel.text = TotalCredits.toString();
    WinnerPaid = winnings;
    WinnerPaidLabel.text = WinnerPaid.toString();
    resetFruitTally();
    createjs.Sound.play('win');
    checkJackPot();
}

/* Utility function to show a loss message and reduce player money */
function showLossMessage():void {
    TotalCredits -= Bet;
    TotalCreditsLabel.text = TotalCredits.toString();
    resetFruitTally();
    Jackpot += Bet;
    JackPotLabel.text = Jackpot.toString();
    WinnerPaidLabel.text = "0";
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value:number, lowerBounds:number, upperBounds:number):any {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    }
    else {
        return false;
    }
}

/* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
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
			case checkRange(outCome[spin], 24, 27):  // % probability
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

/* This function calculates the player's winnings, if any */
function determineWinnings() {
    if (blanks == 0) {
        if (grapes == 3) {
            winnings = Bet * 10;
        }
        else if (bananas == 3) {
            winnings = Bet * 20;
        }
        else if (oranges == 3) {
            winnings = Bet * 30;
        }
        else if (cherries == 3) {
            winnings = Bet * 40;
        }
        else if (bars == 3) {
            winnings = Bet * 50;
        }
		else if (apples == 3){
			winnings = Bet * 60;
		}
        else if (watermelons == 3) {
            winnings = Bet * 75;
        }
        else if (lemons == 3) {
            winnings = Bet * 100;
        }
        else if (grapes == 2) {
            winnings = Bet * 2;
        }
        else if (bananas == 2) {
            winnings = Bet * 2;
        }
        else if (oranges == 2) {
            winnings = Bet * 3;
        }
        else if (cherries == 2) {
            winnings = Bet * 4;
        }
        else if (bars == 2) {
            winnings = Bet * 5;
        }
		else if (apples == 2) {
            winnings = Bet * 6;
        }
        else if (watermelons == 2) {
            winnings = Bet * 10;
        }
        else if (lemons == 2) {
            winnings = Bet * 20;
        }
        else {
            winnings = Bet * 1;
        }
        if (lemons == 1) {
            winnings = Bet * 5;
        }
        winNumber++;
        showWinMessage();
    }
    else {
        lossNumber++;
        showLossMessage();
    }

}

// main function that kicks the game off
function SpinButtonClick(event: MouseEvent): void {
    if (TotalCredits == 0) {
        createjs.Sound.play('loser');
        if (confirm("You ran out of Money! \nDo you want to play again?")) {
            ResetAll();
            showPlayerStats();
        }
    }
    else if (Bet > TotalCredits) {
        createjs.Sound.play('buzzer');
        alert("You don't have enough Money to place that bet.");
    }
    else if (Bet <= TotalCredits) {
        createjs.Sound.play('spin');
        setTimeout(function () {
            spinResult = Reels();
            drawReels(spinResult[0], spinResult[1], spinResult[2]);
            determineWinnings();
            turn++;
            showPlayerStats();
        }, 2000);
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
