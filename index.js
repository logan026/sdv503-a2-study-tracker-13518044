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
        // ------ TOPIC PROMPT -----
        const topic = await rl.question('Enter Study Topic: '); //Asks and waits for user to answe study topic question
        if (!topic.trim()) { //Checks if input was empty or not
            console.log('Error: Your Study Topic Cannot Be Empty.'); //Throws an error message if input was empty
            rl.close(); //Closes channel for user input
            return await addStudyMenu(); //Sends user to start of loop after error
        };
        console.log('Topic Added: ' + topic); //Shows the user the topic they added after succesful input
        
        // ----- MINUTES PROMPT -----
        let minutes; //Declaring the minutes variable outside of the loop so we can use it later
        while (true) { //We wrap the minutes question in a while loop so we only have to retry this input instead of going back to the start if invalid
            const minutesInput = await rl.question('Enter Duration (minutes): '); //Asking question and waiting for response
            minutes = parseInt(minutesInput, 10); //Converting the input from "12" as a string to 12 as a integer so we can use its value for math later on
            //', 10' - Tells the programm to use the base-10 decimal system(0-9).
            if (isNaN(minutes) || minutes <= 0) { //Checking if the input IS a number and if the number IS positive and more than zero
                console.log('Error: Please Enter A Whole Number Greater Than Zero. '); //Error message
                //After invalid input the loop will hit this point and automatically go back to asking the question again
            } else { //If the input was valid
                break; //Breaks us out of the while loop
            }
        };
        console.log('You studied ' + minutes + ' minutes.'); //Show us the minutes input entered
        
        // ----- Save Valid Session To Array -----
        studySessions.push({topic: topic.trim(), minutes: minutes}); //Pushes the users succesful input into our array
        console.log('Study Session Succesfully Recorded');
    } catch(error) { //Catches any bugs or crashes that happen in the try block above
        console.log('An error occurred:', error.message); //Prints the error message to the termnial so we can debug
    } finally { 
        rl.close(); //Closes our input channel so the terminal dosent get stuck listening forever
    }
    
    await listStudyMenu(); //Tells the program to run our list menu and wait for it to finish
};

// ----- List Study Sessions -----
async function listStudyMenu() { //Creating a menu to print our study data onto
    console.log('\n----- Recorded Study Sessions -----');

    if (studySessions.length === 0) { //Checks if array is currently empty
        console.log('No Sessions Recorded Yet.'); //Lets the user know there is no study sessions recorded
    } else { //If the array has data in it
        studySessions.forEach((session, index) => { //Loops through every saved session in the array one at a time
            console.log((index + 1) + '. Topic: ' + session.topic + ' | Duration: ' + session.minutes + ' minutes');
        });
    }
    await minutesTotalMenu(); //Display total minutes after displaying the array
};

// ----- Total Minutes Menu -----
async function minutesTotalMenu() { //Creating a function to calculate total minutes in array
    console.log('\n----- Weekly Summary -----');
    //Uses .reduce() to loop through the array and add everything up. 'sum' is our total and '0' is the number it counts from
    const totalMinutes = studySessions.reduce((sum, session) => sum + session.minutes, 0);
    console.log('Total Study Time: ' + totalMinutes + ' minutes');
    await addStudyMenu(); //Sends the user back to the add study menu after the total has been displayed
}

addStudyMenu(); //Using function for testing

