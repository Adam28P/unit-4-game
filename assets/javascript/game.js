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

    // Game Character objects
    var gameCharacters = {
        scarletWitch: {
            name: 'Scarlet Witch',
            health: 120,
            attack: 15,
            image: 'assets/images/scarlet-witch.png',
            enemyAttackBack: 20,
            loserImage: 'assets/images/scarlet-witch-bw.png'
        },
        antMan: {
            name: 'Ant-Man',
            health: 100,
            attack: 14,
            image: 'assets/images/ant-man.png',
            enemyAttackBack: 10,
            loserImage: 'assets/images/ant-man-bw.png'
        },
        spiderMan: {
            name: 'Spider-Man',
            health: 150,
            attack: 8,
            image: 'assets/images/spider-man.png',
            enemyAttackBack: 20,
            loserImage: 'assets/images/spider-man-bw.png'
        },
        blackWidow: {
            name: 'Black Widow',
            health: 180,
            attack: 7,
            image: 'assets/images/black-widow.png',
            enemyAttackBack: 15,
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
            hero.health -= enemy.enemyAttackBack;
            //if hero dies, the attack button disappears, restart button appears, hero image changes
            if (hero.health <= 0) {
                $("#message-box").append("You lost!");
                $(".hero-class").html("<img src='" + hero.loserImage + "' class='img-fluid'>");
                makeRestartBtn();
                $("#attack-button").empty();
            };
            $("#attack-msg").append("<div>Your opponent attacked and you took " + enemy.enemyAttackBack + " damage!</div>");
            $("#hero-health").text(hero.health);
        }
    };

    function enemyDied() {
        wins++;
        $(myEnemy).html("<img src='" + enemy.loserImage + "' class='img-fluid'>");
        $(myEnemy).addClass("defeated");
        $("#enemies-body").append(myEnemy);
        $("#enemy-body, #enemy-health, #enemy-name, #enemy-button").empty();
        $("#message-box").append("You defeated your opponent! Choose another enemy!");
        enemy = "";
        myEnemy = "";
    }



});