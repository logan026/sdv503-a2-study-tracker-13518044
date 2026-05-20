//Initialize the readLine interface
const readline = required('node:readline/promises');
const { stdin: input, stdout: output } = required('node:process');

//Array to store our study session in
const studySessions = [];