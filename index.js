//Initialize the readLine interface
const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');
function createInterface() {
    return readline.createInterface({ input, output }); //Tells programm to wait for input before outputting to the terminal
};

//Array to store our study session's in
const studySessions = [];

//Creating a menu to input study data
async function addStudyMenu() {
    const rl = createInterface(); //Creates function to handle user input and ouput
    console.log('\n----- Add New Study Session -----'); //\n creates a new line for the text to be put on ensuring our CLI stays clean
    //Topic input loop
    try { 
        const topic = await rl.question('Enter Study Topic: '); //Topic prompt
        if (!topic.trim()) { //Checks if input was empty or not
            console.log('Error: Topic cannot be empty.'); //Throws an error message if input was empty
            rl.close(); //Closes channel for user input
            await addStudyMenu(); //Sends user to start of loop after error
            return;
        }
        console.log('Topic Added: ' + topic); //Shows the user the topic they added after succesful input
    } finally {
        rl.close(); //Closes the loop
    }
};

addStudyMenu(); //Using function for testing
