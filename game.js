//Have user choose a difficulty
var difficultyChosen = false;
var pDifficulty = prompt("Choose your difficulty: Easy, Normal, Hard\n\nPress cancel to exit game.").toLowerCase();
pDifficulty = pDifficulty.toLowerCase();

//Function that runs when you die!
function gameOver () {
  alert("You have died. Please refresh your browser to play again.");
  throw new Error("You have died. Refresh your browser to try again.")
}
function retryGame () {
  alert("You have not died, but you certainly didn't beat the game. Try again and maybe side with the Elves this time...");
  throw new Error("Game Over. Refresh your browser window to play again.")
}
function beatGame () {
  alert("You have beaten the game! Congrats!!!")
  throw new Error("You win!")
}

//Ask for the user's name
var charName = prompt("What is your name?");

//Ask for what class they choose, make them choose one of the three classes.
var charClassChosen = false;

while(!charClassChosen) {
  var charClass = prompt("Choose your class: Fighter, Mage, Druid");
  if(charClass.toLowerCase() === "fighter") {
    alert("You have chosen the Fighter. \n\nYour adventure(ZONE) awaits ferocious feller!");

    health = Math.floor((Math.random()*20)+12);
    str = Math.floor((Math.random()*8)+4);
    dex = Math.floor((Math.random()*10)+2);     //Fighters got no manas
    int = Math.floor((Math.random()*4)+1); //Fighters suck at magic

    charClassChosen = true;
  }
  else if(charClass.toLowerCase() === "mage") {
    alert("You have chosen the Mage.  \n\nYour adventure(ZONE) awaits magic man!");

    health = Math.floor((Math.random()*20)+5);
    str = Math.floor((Math.random()*6)+2);
    dex = Math.floor((Math.random()*10)+2);
    int = Math.floor((Math.random()*12)+4);

    charClassChosen = true;
  }
  else if(charClass.toLowerCase() === "druid") {
    alert("You have chosen the Druid. \n\nYour adventure(ZONE) awaits nature boy!");

    health = Math.floor((Math.random()*20)+8);
    str = Math.floor((Math.random()*8)+2);
    dex = Math.floor((Math.random()*10)+5);
    int = Math.floor((Math.random()*8)+4);

    charClassChosen = true;
  }
  else {
    alert("You did not pick one of the premade classes. \n\nPlease choose again, " + name);
  }
}

//Create new character object based on player choices.
var pc = {
  gameDifficulty : pDifficulty,
  name : charName,
  class: charClass,
  cHealth: health,
  cStr: str,
  cDex: dex,
  cInt: int,
}



var pcDead = false;
console.log(pc); //Testing for character values.
alert("Your " + charClass + " has the following stats- \n\nHealth: " + pc.cHealth + "\n\nStrength: " + pc.cStr + "\n\nDexterity: " + pc.cDex + "\n\nIntelligence: " + pc.cInt);

alert("Your adventure begins in the local pub'n'grub just like any good adventure does. At your table are a group of ellustrious Elves and a gaggle of downtrodden Dwarves. You have been striking up conversation with both parties but there is obvious racial tension and as the mead begins to flow more freely you see the light hearted jests turn to full force jabs... As the only human at the table each group is looking to you to pick a side...");

/////  Tavern Fight  ////////////
var tavChoiceChosen = false;

while (!tavChoiceChosen) {
  var tavernChoice = prompt("So, what'll it be... Do you vibe with these Elves or the Dwarves on the opposite side of the table?");

//////////    TAKING SIDES WITH THE ELVES    ////////////
  if (tavernChoice.toLowerCase() === "elves") {
    alert("You take the side of the Elves and mutter under your breath,  \n'Damn Dwarves never did nothin for nobody 'cept Frodo...'");
    alert("Dwarves have big ears though and one of them hears your remark...");
    alert("A Dwarf exclaims\n'Did ya hear that fellers?! He's talking shit about FRODO!!!'\n\nAs the echo of the final -O- in Frodo rings out through the tavern, every Dwarf in the place gets to their feet, weapons drawn.");
    if((pc.gameDifficulty === "easy")) {
      var dwarf = {
        health: 10,
        damageMod: 2
      }
    }
    else if((pc.gameDifficulty === "normal")) {
      var dwarf = {
        health: 14,
        damageMod: 3
      }
    }
    else if((pc.gameDifficulty === "hard")) {
      var dwarf = {
        health: 16,
        damageMod: 6
      }
    }
      alert("The angry mob moves toward you but there is a single Dwarf leading the rest -- the one with the most facial hair.\n\nHe has blood in his eyes and begins charging at you brandishing his war axe in one hand and a full flagon of mead in the other.\n\n PREPARE TO FIGHT!");
      alert("The dwarf suprises you and gets an attack off before you can do anything about it...");
      pc.cHealth = pc.cHealth - Math.floor((Math.random()*5)+dwarf.damageMod);

      //Dwarf fight loop//
      var dwarfDead = false;
      while(!dwarfDead || !pcDead) {
        alert("You have " + pc.cHealth + " health left \n\nWhew! Still alive. Time to attack!");
        var pcDamage = Math.floor((Math.random()*6)+pc.cStr);
        dwarf.health = dwarf.health - pcDamage;
        console.log(dwarf.health);
        alert("You smacked the Dwarf for " + pcDamage + " points of damage!");
        if(dwarf.health <= 0) {
          dwarfDead = true;
          break;
        }
        var dwarfDamage = Math.floor((Math.random()*3)+dwarf.damageMod);
        pc.cHealth = pc.cHealth - dwarfDamage;
        alert("The Dwarf smacks you for " + dwarfDamage + " points of damage. OUCH!");
        if(pc.cHealth <= 0) {
          gameOver()
        }
      }
      pc.cHealth = pc.cHealth + Math.floor((Math.random()*10+5));
      alert("You have defeated the Dwarf! \n\nHe lays there on the ground bruised and bloodied but with still a full flagon of mead.\n\nYou stoop down and snatch the mead from his cold dead fingers and take a triumphant swig\n\nAnd feel rejuvenated! Your health has been restored to a total of " + pc.cHealth + " hit points. \n\n GRATS!");
      tavChoiceChosen = true; //tavern breaks loop
  }

//////////    TAKING SIDES WITH THE DWARVES    ////////////
  else if (tavernChoice.toLowerCase() === "dwarves") {
    alert("You take the side of the Dwarves and proudly exclaim, \n'Atleast these little fellers know how to put back some mead!!!'");
    var numElves = 0;

    //EASY DIFFICULTY:
    if((pc.gameDifficulty === "easy")) {
        var elf = {
          health: 8,
          damageMod: 2
        }
      }
    if((pc.gameDifficulty === "normal")) {
        var elf = {
          health: 12,
          damageMod: 4
        }
      }
    if((pc.gameDifficulty === "hard")) {
        var elf = {
          health: 16,
          damageMod: 6
        }
      }
      var elfDamage = Math.floor((Math.random()*3)+elf.damageMod);
      pc.cHealth = pc.cHealth - elfDamage;
      alert("A single, solitary, pointy eared feller steps up and draws his bow. \n\n You have no time to react and take " + elfDamage + " points of damage as an lodges itself in your arm\n\nYou have " + pc.cHealth + " health left\n\nPrepare for battle!");

      //Elf fight loop//
      var elfDead = false;
      while(!elfDead) {
        alert("You have " + pc.cHealth + " health left \n\n Whew! Still alive. Time to attack!");
        var pcDamage = Math.floor((Math.random()*6)+pc.cStr);
        elf.health = elf.health - pcDamage;
        console.log(elf.health);
        alert("You smacked the Elf for " + pcDamage + " points of damage!");
        if(elf.health <= 0) {
          elfDead = true;
          break;
        }
        var elfDamage = Math.floor((Math.random()*3)+elf.damageMod);
        pc.cHealth = pc.cHealth - elfDamage;
        alert("The Elf smacks you for " + elfDamage + "points of damage. OUCH!");
        if(pc.cHealth <= 0) {
          throw new Error("Oh no! You died...Reload the page to try again.");
        }
        //Check to see if here is alive

      }
      pc.cHealth = pc.cHealth + Math.floor((Math.random()*6+6));
      alert("You have defeated the Elf! \n\n He lays there on the ground bruised and bloodied but with still a full flagon of white wine. \n\n You stoop down and snatch the mead from his cold dead fingers and take a triumphant swig\n\n And feel you feel rejuvenated! Your health has been restored to a total of " + pc.cHealth + " hit points. \n\n GRATS!");
      tavChoiceChosen = true; //tavern breaks loop
    }
  else {
    alert("You have not picked a side. Please enter either elves or dwarves as your answer");
  }
}

console.log(tavernChoice);
/////  Tavern Fight  ////////////


if(tavernChoice.toLowerCase() ==='dwarves') {
  alert("The Dwarf leader starts to approach you to congratulate you...\n\nUpon his advance, another Elven creature appears from the shadows and fires an arrow directly at your face.");
  alert("You have just seconds to dodge the arrow...Only your dexterity can save you now!");
  var randomArrow = (Math.floor(Math.random()*5)+2);
  console.log("randomArrow " + randomArrow);
  if(pc.cDex > randomArrow) {
    alert("You have lived to see another day!");
    alert("However, with that recent outburst you immediately pledge your allegiance to the elves and decide its not worth risking your life just to have some cool drinking buddies...Maybe you should talk to the elves...");
    retryGame();
  }
  else {
    alert("You take an arrow directly to the head....Needless to say, you're Dead.");
    gameOver();
  }
}


else if(tavernChoice.toLowerCase() === "elves") {
  alert("After defeating that hairy little bugger, the leader of the Elves approaches you. He looks at you with a tinge of contempt and says, \n\n 'Well done human, but you still haven't proven your merit. To truly gain our respect you most prove your intellect!'");
  alert("Though you are a little confused you nod your head and agree to do so...");
  alert("The elf explains that you must beat his number game or he will immolate you right where you stand\n\nDire Consequences for a little game, eh?");
  var randomNumber = Math.floor(Math.random()*20+1);
  var guesses = Math.floor(pc.cInt / 2) + 1;
  var gameOn = true;

  console.log("random number " + randomNumber);
  console.log("guesses "+ guesses);

  alert("I am guessing a number between 1 and 20. Use your infinite wisdom to guess my number!\n\nYou have " + guesses + " chances to guess...");
  while (gameOn) {
    playerGuess =  prompt("You have " + guesses + " chances left to guess my number.\n\nWhat is your guess? Pick a number 1-20");
    guesses--;
    if (playerGuess == randomNumber) {
      alert("You guessed correctly! Looks like you'll live to fight another day!");
      gameOn = false;
      break;
    }
    alert("WRONG! Try Again");
    if(guesses <= 0 ) {
      alert("Soo....looks like your intellect has failed you...");
      alert("The Head Elf looks at you and starts laughing...and laughing...and laughing...");
      alert("POOOOOOOOOOOF!\n\n\n\n\n\n!!!!!!!!!!!!!!!!!!");
      gameOver();
    }
    //Give player a hint...
    if(playerGuess > randomNumber) {
      alert("Looks like you need to guess on the lower end...");
    }
    else if(playerGuess < randomNumber) {
      alert("Try and guess a larger number...");
    }
  }

  alert("'So you beat my game...Good for you Human,' says the head Elf man\n\nCongratulations!\n\nThe last test to earn our trust is to show that you trust us...");
  var trust = confirm("The head elf turns head back to the rest of his Elven crew with a sly smile then focuses his eyes back on you and says,\n\n'So will you go to the cave of death and destruction and retrieve my long lost pixie pal?");
  if(trust) {
    alert("You sheepishly nod your head in a agreement. Frankly you're worried that if you say no you're going to get immotated, immolated, err whatever.\n\nYou leave the warm tavern and follow the directions given to you by your new found pointy eared comrades...");
    alert("You arrive at a dark, dank looking cave and wonder if its really worth their 'trust'");
    var trust2 = confirm("Is it worth it? Would you like to head in to the cave?\n\nClick OK to venture in to the cave and cancel to turn around...");
    if(trust2) {
      alert("You head in to the depths of the cave. It takes a little while but slowly your eyes adjust to the lack of light and its almost like you have nightvision, or something like that...");
      alert("Your ears are graced with the sound of dripping water and sounds of squishing as you walk...");
      var caveChoiceChosen = false;
      while(!caveChoiceChosen) {
        var caveChoice = prompt("You reach a fork in the cave-road...which way will you go? Left or Right?");
        caveChoice = caveChoice.toLowerCase();
        console.log(caveChoice);
        if (caveChoice === "left") {
          alert("You head to the left and wander down a dimly lit passage that begins to get brighter the further you get down the path...All of a sudden you see a shining bright light zipping left and right in front of you\n\nYou think to youself this must be the pixie!");
          alert("After a brief introduction and endless expressions of gratitude for her rescue, you begin to lead the pixie out of the cave");
          alert("As you two are traversing the cave passages, now dimly lit thanks to the pixie's radiance, the pixie begins to tell you about a the wicked ways of Mr. Head Elf Man...After listening to her story she asks if you really want to bring her back there and suggests that maybe he isn't to be trusted...")
          var pixieChoice = confirm("Do you wish to return to the tavern or release the pixie and never return to the tavern again?\n\nClick OK to runaway with the Pixie and Cancel to return to the tavern...");
          if(pixieChoice) {
            alert("You and the pixie decide unanimously to never return to the tavern again and stay as far way from the Elves as possible!\n\nThe Pixie is overjoyed that you have agree to avoid the place and grants an enchanment that makes you stronger. \n\nShe exclaims,'With this enchantment, you will become one of the most accomplished adventurers in the land!'");
            alert("You feel your body start to tingle and all of a sudden ---- \n\n\nPOOOOF!");
            pc.cHealth += 5;
            pc.cStr += 3;
            pc.cDex += 3;
            pc.cInt += 3;
            alert("Your character now has the following stats- \n\nHealth: " + pc.cHealth + "\n\nStrength: " + pc.cStr + "\n\nDexterity: " + pc.cDex + "\n\nIntelligence: " + pc.cInt);
            alert("CONGRATS YOU HAVE FINISHED THE GAME!\n\n\nWhat an adventure(ZONE)!~");
            console.log(pc);
            caveChoiceChosen = true;
          }
          else {
            alert("You take one look at the pixie and say,\n\n'Ya, riiiiiiight. We're goin back to the tavern. An adventure requires mead, dontchya know?!'");
            alert("You arrive at the tavern with pixie in tow. The whole place looks astonished and you walk through there like you own the place. You approach the head Elf with a shit eating grin...");
            alert("He looks at you and laughs. \n\n He says,'Why thank you, peasant. You humans are soooo foolish. Trusting everyone you meet, eh?'");
            alert("He waves his hands and all of a sudden..........\n\n\n\nPOOOOOOOOFFFF!");
            gameOver();
          }
        }
        else if (caveChoice === "right") {
          alert("You choose to venture down the right path of the cave...");
          alert("As you get further and further down the path it starts to get colder and colder....Something tells you things are getting a little hairy...");
          var rightCaveChoice = confirm("Are you sure you want to continue?");
          if (rightCaveChoice) {
            alert("So you continue down a little path and reach a dead end...You hear squishing noises as you tip toe in to the center of the room...");
            alert("You reach the center of the room and all of a sudden something cries out\n\n\nI DON'T THINK YOU'RE READY FOR THIS JELLY!");
            alert("All of a sudden a giant cube of translucent jelly drops from the ceiling and you have just seconds to get away!")
            var directionChosen=false;
            while(!directionChosen) {
              var direction = prompt("Which way will you jump?\n\nLeft, Right, Backward or Forward?");
              if(direction.toLowerCase() === "left") {
                alert("Oh NO! The jelly guessed your move...and it will be your last! Looks like you're toooooast.");
                gameOver();
                directionChosen=true;
              }
              if(direction.toLowerCase() === "right") {
                alert("Oh NO! The jelly guessed your move...and it will be your last! Looks like you're toooooast.");
                gameOver();
                directionChosen=true;
              }
              if(direction.toLowerCase() === "backward") {
                alert("Oh NO! The jelly guessed your move...and it will be your last! Looks like you're toooooast.");
                gameOver();
                directionChosen=true;
              }
              if(direction.toLowerCase() === "forward") {
                alert("PHEEEWWW! You managed to barely escape that giant cube of jelly landing square on your dome...");
                alert("With that interaction you behind you, you take a moment to recount today's adventures and say...\n\nFUGGG IT! I'm done with this business! From here on out there's nothing but knitting and kittens in my future!");
                alert("You dash out the cave and on to the main road, sprinting home to your Mother.\n\n While you have reached the end of the game and not died, I'm not sure this would be considered beating the game...");
                retryGame();
                directionChosen=true;
              }
              else {
                alert("Please choose a valid direction: backward, forward, left, or right.");
              }
            }
          }
        }
        else {
          alert("Please choose left or right");
        }
      }
    }
    else {
      alert("You take another look at the cave and say forget that! \n\nYou head back to the tavern with your head hung low, afraid of what will happen next");
      alert("Upon arrival the head Elf asks if you have found his long last pal and which point you explain your lack of interest in caves and overwhelming claustrophobia.");
      alert("Mr. Elf man is furious. He waves his and.......");
      alert("POOOOOOOOOOOF!\n\n\n\n\n\n!!!!!!!!!!!!!!!!!!");
      gameOver();
    }
  }
  else {
    alert("The Head Elf looks at you and starts laughing...and laughing...and laughing...");
    alert("Mr. Elf man is furious. He waves his and.......");
    alert("POOOOOOOOOOOF!\n\n\n\n\n\n!!!!!!!!!!!!!!!!!!");
    gameOver();
  }
}
