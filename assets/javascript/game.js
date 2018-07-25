$(document).ready(function () {
    
    var hero = "";
    var challenger = "";
    var myChallenger = "";
    var currentAttack = 0;
    var wins = 0;
    var restartBtn = $("<button>Restart</button>");
    var attackBtn = $("<button>ATTACK!</button>");
    attackBtn.addClass("btn btn-dark");

    // Game Character objects
    var gameCharacters = {
        scarlettWitch: {
            name: 'Scarlet Witch',
            health: 120,
            attack: 8,
            image: '',
            enemyAttackBack: 15,
            loserImage: ''
        },
        antMan: {
            name: 'Ant-Man',
            health: 100,
            attack: 14,
            image: '',
            enemyAttackBack: 5,
            loserImage: ''
        },
        spiderMan: {
            name: 'Spider-Man',
            health: 150,
            attack: 8,
            image: '',
            enemyAttackBack: 20,
            loserImage: ''
        },
        theWasp: {
            name: 'The Wasp',
            health: 180,
            attack: 7,
            image: '',
            enemyAttackBack: 25,
            loserImage: ''
        }
    };

});