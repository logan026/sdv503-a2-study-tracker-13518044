//Initialize the readLine interface
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
function createInterface() {
    return readline.createInterface({ input, output }); //Tells programm to wait for input before outputting to the terminal
};
async function pause() { //Create a new function to pause the program, helping the user to read the screen easier
    const rl = createInterface();
    await rl.question('\nPress Enter To return to the Main Menu.'); //Waits for user to press enter
    rl.close(); //Closes after user presses enter
}
//Array to store our study session's in
const studySessions = [];

//Creating a menu to input study data
async function addStudyMenu() {
    console.clear(); //Clears the console on all menus to give the user a clean CLI experience
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
            minutes = Number(minutesInput, 10); //Converting the input from "12" as a string to 12 as a integer so we can use its value for math later on
            //', 10' - Tells the programm to use the base-10 decimal system(0-9).
            //Fixed number bug to not accept decimals instead of rounding
            if (isNaN(minutes) || !Number.isInteger(minutes) || minutes <= 0) { //Checking if the input IS a number and if the number IS positive and more than zero
                console.log('Error: Please Enter A Whole Number Greater Than Zero. '); //Error message
                //After invalid input the loop will hit this point and automatically go back to asking the question again
            } else { //If the input was valid
                break; //Breaks us out of the while loop
            }
        };
        //-----CONFIRMATION PROMPT-----
        console.clear();
        console.log('\n-----Confirm Study Session-----');
        console.log('Topic: ' + topic)
        console.log('Duration: ' + minutes + ' minutes');
        //Ask the user to type Y to save or N to cancel
        const confirm = await rl.question('\nSave this session? (y/n): ');
        if (confirm.toLowerCase().trim() === 'n') { //If user inputs n
            console.log('Session Cancelled.'); //Cancel session
            await pause();
        } else { //If user input is y or anything else
            console.log('Added ' + topic + ' for ' + minutes + ' minutes to recorded sessions.')
            studySessions.push({topic: topic.trim(), minutes: minutes}); //Save study session to studySessions array
            await pause();
        }
    } catch(error) { //Catches any bugs or crashes that happen in the try block above
        console.log('An error occurred:', error.message); //Prints the error message to the termnial so we can debug
    } finally { 
        rl.close(); //Closes our input channel so the terminal dosent get stuck listening forever
    }
    
    await mainMenu(); //Tells the program to return to main menu after valid input
};

// ----- List Study Sessions -----
async function listStudyMenu() { //Creating a menu to print our study data onto
    console.clear();
    console.log('\n----- Recorded Study Sessions -----');

    if (studySessions.length === 0) { //Checks if array is currently empty
        console.log('No Sessions Recorded Yet.'); //Lets the user know there is no study sessions recorded
    } else { //If the array has data in it
        studySessions.forEach((session, index) => { //Loops through every saved session in the array one at a time
            console.log((index + 1) + '. Topic: ' + session.topic + ' | Duration: ' + session.minutes + ' minutes');
        });
    }
    await pause(); //This pauses the code until the user presses enter
    await mainMenu(); //Return to main menu
};

// ----- Total Minutes Menu -----
async function minutesTotalMenu() { //Creating a function to calculate total minutes in array
    console.clear();
    console.log('\n----- Weekly Summary -----');
    //Uses .reduce() to loop through the array and add everything up. 'sum' is our total and '0' is the number it counts from
    const totalMinutes = studySessions.reduce((sum, session) => sum + session.minutes, 0);
    console.log('Total Study Time: ' + totalMinutes + ' minutes');
    await pause();
    await mainMenu(); //Sends the user back to the main menu
}

// ----- Main Menu -----
async function mainMenu() { //Creating a menu for users to navigate
    console.clear();
    const rl = createInterface(); //redeclaring the input/output variable inside the scope of the function
    console.log('\n----- Study Tracker Main Menu -----');
    console.log('1. Add a Study Session');
    console.log('2. List all Study Sessions')
    console.log('3. Show Total Minutes Studied');
    console.log('4. Exit');
    const response = await rl.question('Choose an option (1-4): '); //Asks the user what option and waits for response
    rl.close(); //closes question after recieving response
    switch (response.trim()) { //Adding a switch loop to see what the user input
        case '1': //If the user input is 1
            await addStudyMenu(); //Take user to the add study menu
            break; //Break from loop
        case '2':
            await listStudyMenu();
            break;
        case '3':
            await minutesTotalMenu();
            break;
        case '4':
            console.log('Goodbye.');
            process.exit(0); //Exits the programm
            break;
        default: //If anything other than the numbers 1-4 were input
            console.log('Invalid option. Please select 1, 2, 3, or 4.'); //Error message
            await mainMenu(); //Send user back to main menu
            break;
    }
}

mainMenu(); //Start program

