#!/usr/bin/env node

//Module for adding colours to terminal
const chalk = require('chalk');

//Module for converting csv to json array
const csv = require('csvtojson');

//Module for drawing boxes in terminal
const boxen = require('boxen');

//Module for developing command line applications
const { program } = require('commander');
program.version('0.0.1');

//path to supported currencies file
let url = __dirname + '/Cheap.Stocks.Internationalization.Currencies.csv';


//Asynchronous function for checking whether currency code exists in the created json array
async function start(value, dummy) {
    await csv()
        .fromFile(url)
        .then((jsonObj) => {

            for (i in jsonObj) {
                if (value == jsonObj[i].ISO4217Code) {

                    console.log(boxen(chalk.green(`Success! Currency supported\n` +
                        `Country       - ${jsonObj[i].Country}\n` +
                        `Currency      - ${jsonObj[i].Currency}\n` +
                        `ISO 4217 Code - ${jsonObj[i].ISO4217Code}`),
                        { padding: 1, margin: '5,0,0,0', borderStyle: 'single', borderColor: 'green', backgroundColor: 'black', align: 'left' }));

                    return 0;

                }

            }

        });
}


//Command line options
program.option('-a')
    .option('-h')
    .option('-v <value>', 'Compute currency', start);

//Method for accepting inputs in the command line
program.parse(process.argv);

//Conditional statements for responding to options entered in the command line
if (program.a) {
    console.log(boxen(chalk.green(' This application accepts input in form of currency ISO 4217 code and displays whether or not the currency is supported in the application. '),
        { padding: 1, borderStyle: 'single', borderColor: 'green', backgroundColor: 'black', align: 'center' }));

}
else if (program.h) {
    console.log(boxen(chalk.green('Use below flags to access listed services\n' +
        ' -a                  Know what this application does e.g cheap-stocks -a\n' +
        ' -h                  Get the help menu e.g cheap-stocks -h\n' +
        ' -v <input>          Check whether a given currency is supported in the application e.g cheap-stocks -v DZD\n'),
        { padding: 1, margin: '5, 0, 0, 0', borderStyle: 'single', borderColor: 'green', backgroundColor: 'black', align: 'left' }));

}
else if (program.v) {

}
else {
    console.log(boxen(chalk.green('WELCOME\n To get started type "cheap-stocks -h" in your terminal'),
        { padding: 1, margin: '5,0,0,0', borderStyle: 'single', borderColor: 'green', backgroundColor: 'black', align: 'center' }));
}
