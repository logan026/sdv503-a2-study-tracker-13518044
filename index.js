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
        rl.close();
        await console.log(topic);
        return topic;
    } finally {
        
    } 
};
addStudyMenu();


