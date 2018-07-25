$(document).ready(function () {

    var hero = "";
    var enemy = "";
    var myEnemy = "";
    var currentAttack = 0;
    var wins = 0;
    var restartBtn = $("<button>Restart</button>");
    var attackBtn = $("<button>ATTACK!</button>");
    attackBtn.addClass("btn btn-primary btn-lg attack-button");

    var scarletWitchImg = $("#scarletWitch");
    var spiderManImg = $("#spiderMan");
    var antManImg = $("#antMan");
    var blackWidowImg = $("#blackWidow");

    // Background game sounds
    var backgroundSound = new Audio('assets/music/avengers-theme.mp3');
    var winSound = new Audio('assets/music/you-win.mp3');
    var loseSound = new Audio('assets/music/you-lose.mp3');

    // Play background music when web page loads
    window.onload = function () {
        backgroundSound.play();
    };

    // Game Character objects
    var gameCharacters = {
        scarletWitch: {
            name: 'Scarlet Witch',
            health: 150,
            attack: 8,
            image: 'assets/images/scarlet-witch.png',
            counter: 20,
            loserImage: 'assets/images/scarlet-witch-bw.png'
        },
        antMan: {
            name: 'Ant-Man',
            health: 100,
            attack: 14,
            image: 'assets/images/ant-man.png',
            counter: 10,
            loserImage: 'assets/images/ant-man-bw.png'
        },
        spiderMan: {
            name: 'Spider-Man',
            health: 120,
            attack: 8,
            image: 'assets/images/spider-man.png',
            counter: 15,
            loserImage: 'assets/images/spider-man-bw.png'
        },
        blackWidow: {
            name: 'Black Widow',
            health: 180,
            attack: 7,
            image: 'assets/images/black-widow.png',
            counter: 25,
            loserImage: 'assets/images/black-widow-bw.png'
        }
    };

    $(".hero").on("click", function () {
        // If a hero hasn't been selected yet
        if (hero == "") {
            hero = gameCharacters[$(this).val()];
            $("#hero-body").append('<img src=' + hero.image + ' />');
            $("#hero-name").append(hero.name);
            $("#hero-health").append(hero.health);
            $(this).attr("class", "hero-class");
            $(".hero-selection").attr("class", "hidden");
            heroIsSelected();
        }
    });

    function heroIsSelected() {
        $("#enemies-box").removeClass("hidden");
        $("#enemies-body").append(scarletWitchImg, spiderManImg, antManImg, blackWidowImg);
        $("#hero-box").removeClass("hidden");

    };

    $("#enemies-box").on("click", ".hero", function chooseEnemy() {
        if (myEnemy == "") {
            $("#enemy-box").removeClass("hidden");
            $("#attack-button").removeClass("hidden");
            $("#message-box, #attack-msg").empty();
            myEnemy = this;
            enemy = gameCharacters[$(this).val()];
            //challengers lose the hero class--losing the click function and the hover
            $(this).removeClass("hero");
            $("#enemy-body").append('<img src=' + enemy.image + ' />');
            $("#enemy-name").append(enemy.name);
            $("#enemy-health").append(enemy.health);
            $("#attack-button").append(attackBtn);
        }
    });

    $("#attack-button").on("click", function () {
        heroAttack();
        counterAttack();
        if (wins === 3) {
            youWin();
        }
    });

    function heroAttack() {
        currentAttack += hero.attack;
        enemy.health -= currentAttack;
        $("#attack-msg").text("You attacked for " + currentAttack + " damage!")
        $("#enemy-health").text(enemy.health);
        if (enemy.health <= 0 && hero.health > 0) {
            enemyDied();
        };
    }

    function counterAttack() {
        if (enemy.health > 0) {
            hero.health -= enemy.counter;
            //if hero dies, the attack button disappears, restart button appears, hero image changes
            if (hero.health <= 0) {
                backgroundSound.pause();
                loseSound.play();
                setTimeout(makeRestartBtn, 4000);
                $("#message-box").append("You lost!");
                $("#hero-body").html("<img src='" + hero.loserImage + "' class='img-fluid'>");
                $("#attack-button").empty();
            };
            $("#attack-msg").append("<div>Your opponent attacked and you took " + enemy.counter + " damage!</div>");
            $("#hero-health").text(hero.health);
        }
    };

    function enemyDied() {
        backgroundSound.pause();
        // play voice clip of hero here
        wins++;
        $("#attack-button").addClass("hidden");
        $(myEnemy).html("<img src='" + enemy.loserImage + "' class='img-fluid'>");
        $(myEnemy).addClass("defeated");
        $("#enemies-body").append(myEnemy);
        $("#enemy-body, #enemy-health, #enemy-name, #enemy-button").empty();
        $("#message-box").append("You defeated your opponent! Choose another enemy!");
        enemy = "";
        myEnemy = "";
    }

    function youWin() {
        $("#enemy-box").addClass("hidden");
        $("#attack-msg").empty();
        $("#attack-button").addClass("hidden");
        $("#message-box").text("You have defeated all 3 enemies! You win!");
        makeRestartBtn();
    };

    function makeRestartBtn() {
        restartBtn.addClass("btn btn-primary btn-lg reset-button");
        $("#restart").append(restartBtn);
    }

    $("#restart").on("click", function () {
        document.location.reload(true);
        backgroundSound.play();
    });


});