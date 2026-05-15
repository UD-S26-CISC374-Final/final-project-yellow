# Command The Dungeon!

## Elevator Pitch

You are stuck in a dungeon, and you don't know how you got there. You cannot move your legs; instead, you are presented with a text box and a paper that says "use the cd to escape". Your objective is to escape the dungeon using the cd command, picking up variations of it, and different commands along the way to help you with your escape.

## Influences (Brief)

- 3D Monster Maze:
    - Medium: PC Game
    - Explanation: Its visuals simulate a 3D environment; however, it is only 2D images. It is the type of aesthetic we tried to achieve with this game.
- Colossal Cave Adventure:
    - Medium: PC Game
    - Explanation: The game shows how actions written in a text section make the character perform actions. This was our reference for our mechanic of moving using terminal commands.

## Core Gameplay Mechanics (Brief)

- Move through the dungeon by writing the name of the passages in front of you, using the "cd" terminal command in a text box.
- The passage name written with the "cd" command must be written with appropriate casing and syntax.
- Return to the previous room you were in by using the "cd .." command properly.
- When entering any room/passage, the player can write the "ls" command to inspect their current location.
- The player can also write the "ls -a" command to unravel possible secrets hidden in the rooms/passages.
- Command "mv" is used to interact with objects, adding them to your inventory, or using them with other objects/identities.
- Entering a command with wrong syntax will result in a message indicating what has been written incorrectly.
- The player will need to find certain objects to open specific doors to escape the dungeon.
- When the player escapes the dungeon, the game changes into a new scene, indicating that the player has won.
- The player can write "help" to receive an image with the available commands to use.
- The player can write "objectives" to receive an image with the available objectives to complete.

# Learning Aspects

## Learning Domains

Correct use and implementation of terminal commands "cd", "ls", and "mv", including variations and different forms such as "cd .." and "ls -a".

## Target Audiences

- Novice programmers with little to no knowledge of navigating a terminal.
- Aimed for early university students and advanced high school students.

## Target Contexts

- The game would be assigned as a practice, which would then be tested to see if students were able to comprehend the use of both "cd" and "ls" commands.

## Learning Objectives

- By the end of the game, the player will be able to identify and apply basic console commands.
- By the end of the game, the player will be able to identify and apply commands to navigate to a directory in the current and parent directory
- By the end of the game, the player will be able to identify and apply commands to check the contents of a directory.
- By the end of the game, the player will be able to identify and compare hidden files from non-hidden files.

## Prerequisite Knowledge

- Write words on the keyboard
- Identify and explain what cd is meant to do
- Identify and explain what ls is meant to do
- Identify and explain what mv is meant to do

## Assessment Measures

_Clearly identify a set of viable assessment questions AND their grading logic. The questions should be specific examples of the kinds of questions that your game could conceivably improve student performance on. For the grading logic, it could be the correct answer, a rubric for evaluating the answer, or exact logic for deriving answers._

For the next six questions, assume you are looking at the console on a computer. In the current directory you see two folders named a and b. Write the console commands to do each of the following tasks.

- Switch the current directory to the folder named a. _Answer: cd a_
- Find file names in your folder. _Answer: ls_
- Return to the parent directory. _Answer: cd .._
- Move the file image.png from the folder a into the folder b. _Answer: mv ./a/image.png ./b_
- Switch the current directory to the folder named b. _Answer: cd b_
- Check for hidden files within the current directory. _Answer: ls -a_

# What sets this project apart?

_Give some reasons why this game is not like every other game out there. Whether the learning objective is unique, the gameplay mechanics are new, or what. You should persuade the reader that your game is novel and worthy of development. Consider arguments that would be persuasive to a Venture Capitalist, Teacher, or Researcher. These might be focused on learning needs, too._

- Most activities regarding terminal commands lack excitement and are felt to be monotone by many students.
- This game allows the navigation of directories to be fun by adding exploration to the equation.
- The dungeon atmosphere and interactable objects/entities allow the player's interest to be greater when using terminal commands.
    - The interest in the player encourages them to use the commands more often, resulting in unconsciously learning them and being able to apply them without effort.

# Player Interaction Patterns and Modes

## Player Interaction Pattern

Single player game. The player controls their movements and actions through writing terminal commands.

## Player Modes

- Single Player: Player moves around the dungeon, looking for items to open doors and, eventually, escape.
- Main Menu: The player will see a start menu which will allow them to start the game, quit it, and adjust the volume.

# Gameplay Objectives

- Gather key items:
    - Description: When key items are collected, the player will be able to open doors and advance to new areas.
    - Alignment: _Describe how this aligns with one or more learning objectives_
- Gather mask pieces:
    - Description: When the player gathers all the pieces of a mask, it will open the final door, which will allow the player to escape the dungeon.
    - Alignment: _Describe how this aligns with one or more learning objectives_
- Collect new commands:
    - Description: The player will gather small notes that will allow him to introduce new commands in the text box, doing new things.
    - Alignment: _Describe how this aligns with one or more learning objectives_

# Procedures/Actions

- A text box will be presented for the player to input terminal commands.
- 6 squares on the bottom represent the items the player possesses, and the ones he can interact with.
- Passage names represent accessible directories found in other directories in a terminal command.
- Item names represent non-directory files that the player can interact with.

# Rules

- If the player enters the right "cd" command with an existing passage/room name, it will change scenes to a new passage/room with new names.
- If the player enters the right "ls" command with an existing passage/room name, the player is shown what things they can interact with.
- If the player enters the right "mov" command with an existing Object name, the player will be able to put that object in their items or use it somewhere else.
- If the player enters either the "cd", "ls", or the "mov" command, or any of its variations, incorrectly, an error message appears that says "Command does not exist".
- If the player enters the "cd .." command, the player will be sent back to the previous passage/room they have previously been in.
- If the player enters the "ls -a" command, the player is shown what things they can interact with, plus secret things not shown with "ls".
- An incorrect passage/room name will result in a text saying "There is no place with that name".
- An incorrect object name will result in a text saying "There is no object with that name".
- If the player enters "help", a list of the available commands will appear.
- If the player enters "objectives", it will show the player all the current objectives.

# Objects/Entities

- An interactable live skeleton that makes a variable true for the player to use the "ls -a" command.
- An interactable mask that provides the player with the main goal of the game.
- A text box in the lower center of the screen where the player can write the commands.
- One square at the bottom left that shows what the player has in their hand.
- An inventory system consisting of a 3x3 grid where all the items will be stored.
- Doors that will require keys to be opened.
- Keys that are required to open locked doors.
- Masks that are meant to be used to open the final door.

## Core Gameplay Mechanics (Detailed)

- Write commands in the text box and press Enter to use them.
    - ls: The ls command will be used to inspect the current room/passage to search for items or the names of other accessible passages the player can move to. The command will also reveal objects that the player can interact with or entities that the player can talk to. There is a variation that appears after talking to the skeleton, which will be the command "ls -a", that will have the same effect as ls, but with the addition that it can reveal hidden objects not previously shown.
    - cd: The command will allow the player to move from place to place by typing it with the name of the desired location they want to move to. If the player wants to go to a passage called "Passage1", then the player will need to type "cd Passage1" in the text box, syntactically equal, to be able to move there. On the other hand, if the player wants to return to the room they were previously in, they will need to run the command "cd ..".
    - mov: The command will allow the player to interact with certain objects throughout the game. There are two ways in which the player will be able to do that: First, when the player sees an object and wants to grab it, the player must write "mv '<objectName>' Items" to store the item in its inventory. Second, when it wants to use that item with another object/entity, the command to be written must be "mv '<ObjectName>' '<objectToInteract>'" to use the item on that particular object.
    - help: The command will show an image with all the commands that are available for the player to input.
    - objectives: The command will show an image with all the current objectives that will be updated everytime one of them is completed.
- The doors the player encounters in the halls are always locked, and they will require a specific key to open them. This will be true with every door, except with the last one. The last door will have a hole where a mask must be inserted to open it. There will be 4 masks that must be collected by the player and placed on the door.
- When the player encounters an entity, such as the talking skeleton or the talking mask, a dialogue will appear automatically. However, the dialogue will not continue until the player presses Enter on their keyboard to ensure it has read what the entity had to say. The dialogue will close once the player reaches the last line.
- After the player collects 4 masks, they can be used with the final door of the dungeon, which will end the game, making the player a winner.

## Feedback

At certain points in the game, they will be shown commands to be introduced to them. After that, using something other than those commands would be beyond the scope of the game, but using commands incorrectly would give some feedback. For example, cding to a nonexistent folder would show an error that the folder doesn't exist and probably hint at using ls.

# Story and Gameplay

## Presentation of Rules

The core gameplay mechanics are simple, so rather than worrying about forgetting or ignoring what they are, the game will slowly give the player the chance to learn how to apply it hands on. Small hints and directions may be given to make it easier for players newer to the topic to deduce the correct command.

## Presentation of Content

They will be briefly introduced to one mechanic at a time and slowly spend time applying that mechanic. Repeatedly using a few major mechanics should be good for memory.

## Story (Brief)

You are trapped in an unknown dungeon, and you are incapacitated. You must use command terminals to get out.

## Storyboarding

Movement & Showing passages:

<p>
<img src="../SBImages/ls1.jpeg" width="300" height="400">
<img src="../SBImages/cd1.jpeg" width="300" height="400">
<img src="../SBImages/ChangeRoom.jpeg" width="300" height="400">
<img src="../SBImages/cdReturn.jpeg" width="300" height="400">
</p>

Interact with Entities & Showing Objects:

<p>
<img src="../SBImages/ls2.jpeg" width="300" height="400">
<img src="../SBImages/cdSkeleton.jpeg" width="300" height="400">
<img src="../SBImages/SkeletonTalk.jpeg" width="300" height="400">
</p>

Interact with Items:

<p>
<img src="../SBImages/mv1.jpeg" width="300" height="400">
<img src="../SBImages/ls3.jpeg" width="300" height="400">
<img src="../SBImages/mv2.jpeg" width="300" height="400">
</p>

Locked Door

<p>
<img src="../SBImages/cdLockedDoor.jpeg" width="300" height="400">
</p>

Reveal Hidden Objects:

<p>
<img src="../SBImages/lsHidden.jpeg" width="300" height="400">
</p>

# Assets Needed

## Aethestics

The game has different rooms with different images in each. Some rooms are small animations between two pictures to give out a sensation of a 90s dungeon crawler. The images used are scaled-down pictures taken in Garry's Mod to give that same vibe.

## Graphical

- Characters List
    - Skeleton in room: Should be in a sitting position. When interacted with, an image will appear, simulating a close-up of the skeleton. Every time the skeleton makes a sound, another image shows the skeleton with its mouth open. And every time it stops talking, it will show one with his mouth closed.
    - Mask in hallway: Sitting on a bench. When interacted with, an image will appear, simulating a close-up of the mask. Every time the mask makes a sound, another image shows the mask with its eyes glowing. And every time it stops talking, it will show one with its eyes dull.
    - Dark Cloak figure: Will appear after the main menu and after opening the final door. It will be a static image with a dialogue box that indicates what he is saying.
    - Dr Bart: Appears as a static image after talking with the Dark Cloak Figure as a final plot twist.
- Textures: N/A
- Environment Art/Textures:
    - Walls: Should replicate an old stone brick wall. Not many details, but enough to make it look rocky.
    - Floor: The floor should follow the same logic as the wall.
    - Doors: The doors are to represent that they are made out of wood, and simulate old wooden doors. They should have a door handle for more immersion.
    - Final door: The final door has a bigger style than the previous one, the normal doors, with an arch on the top, as well as with 4 holes in the center, where the masks would go and unlock it.

## Audio

- Music List (Ambient sound)
    - Main Menu: Created in [beepbox](https://www.beepbox.co/#9n31s0k0l00e03t2ma7g0fj07r1i0o432T1v1ud7f10qaq0331d35AcF8B7Q047bPf422E176T1v1u56f0qwx10p711d03A5F5B9Q0001PfaedE4b762663777T1v1u90f20o8134q8122d35A9F9B5Q5428P9975E263978T4v1uf0f0q011z6666ji8k8k3jSBKSJJAArriiiiii07JCABrzrrrrrrr00YrkqHrsrrrrjr005zrAqzrjzrrqr1jRjrqGGrrzsrsA099ijrABJJJIAzrrtirqrqjqixzsrAjrqjiqaqqysttAJqjikikrizrHtBJJAzArzrIsRCITKSS099ijrAJS____Qg99habbCAYrDzh00E0b4h400000000h4g000000014h000000004h400000000p16000000)
    - General Gameplay: Fire crackling sound that starts only in the rooms that have torches or a big source of fire. Taken from [12 HOURS of Relaxing Fireplace Sounds](https://www.youtube.com/watch?v=UgHKb_7884o)

- Sound List (SFX)
    - Skeleton sound/voice: Audio taken from [Sans speech from Undertale](https://www.youtube.com/watch?v=pWK8Qs67ucY).
    - Mask sound/voice: Sound recorded in [JSFXR](https://sfxr.me/).
    - Pick up item: Sound recorded in [JSFXR](https://sfxr.me/).
    - Final Cutscene transition: Audio taken from [Deltarune title jingle](https://www.youtube.com/watch?v=DoVCXglf68E)
    - Door Locked accessed with 'cd': Sound recorded in [JSFXR](https://sfxr.me/).

# Metadata

- Template created by Austin Cory Bart <acbart@udel.edu>, Mark Sheriff, Alec Markarian, and Benjamin Stanley.
- Version 0.0.3
