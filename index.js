//Initialize the readLine interface
const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');
function createInterface() {
    return readline.createInterface({ input, output });
};

//Array to store our study session's in
const studySessions = [];

//Creatomg a menu to input study data
async function addStudyMenu() {
    const rl = createInterface();
    console.log('\n----- Add New Study Session -----');
    //Topic input loop
    try { 
        const topic = await rl.question('Enter Study Topic: '); //Topic prompt
        if (!topic.trim()) { //Checks if input was empty or not
            console.log('Error: Topic cannot be empty.'); //Throws an error message if input was empty
            rl.close(); //Clsoes current loop
            return await addStudyMenu(); //Sends user to start of loop after error
        }
        rl.close();
        await console.log(topic); //Prints the topic we chose to the console for testing
        return topic;
    } finally {
        
    } 
};
addStudyMenu();


