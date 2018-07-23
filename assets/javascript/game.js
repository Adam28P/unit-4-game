var characters, gameState

/* RESET FUNCTIONS */

// startGame acts as primary reset function.
// it is called at the bottom of the file to start the game.
function startGame () {
  // resets the game to original state;
  characters = resetCharacters()
  gameState = resetGameState()

  // renders characters
  renderCharacters()
}

function resetCharacters () {
    // resets the character stats to originals.
    return {
      'scarlettWitch': {
        name: 'Scarlett Witch',
        health: 120,
        attack: 8,
        imageUrl: 'assets/images/scarlett-witch.jpg',
        enemyAttackBack: 15
      },
      'antMan': {
        name: 'Ant-Man',
        health: 100,
        attack: 14,
        imageUrl: 'assets/images/ant-man.jpg',
        enemyAttackBack: 5
      },
      'spiderMan': {
        name: 'Spider-Man',
        health: 150,
        attack: 8,
        imageUrl: 'assets/images/spider-man.png',
        enemyAttackBack: 20
      },
      'theWasp': {
        name: 'The Wasp',
        health: 180,
        attack: 7,
        imageUrl: 'assets/images/the-wasp.jpg',
        enemyAttackBack: 25
      }
    }
  }