#!/usr/bin/env node

//Module for adding colours to terminal
const chalk = require('chalk');

//Module for converting csv to json array
const csv = require('csvtojson');

//Module for drawing boxes in terminal
const boxen = require('boxen');

//Module for loading http protocol used in making api get requests
const http = require('http');

//Module for developing command line applications
const { program } = require('commander');
program.version('0.0.1');

//path to supported currencies file
let url = __dirname + '/Cheap.Stocks.Internationalization.Currencies.csv';

//path to supported languages file
let language_url = __dirname + '/Cheap.Stocks.Internationalization.Languages.csv';


//Asynchronous function for listing all supported currencies
async function currencies() {
    await csv()
        .fromFile(url)
        .then((jsonObj) => {

            let currency = [];

            for (i in jsonObj) {
                currency.push(`${jsonObj[i].ISO4217Code}\n`);
                // console.log(chalk.green(`${jsonObj[i].ISO4217Code}\n`));

            }

            console.log(boxen(chalk.green(currency.join('')),
                { padding: 1, margin: '5,0,0,0', borderStyle: 'single', borderColor: 'green', backgroundColor: 'black', align: 'left' }));
            return 0;

        });
}

//Asynchronous function for listing all supported languages
async function languages() {
    await csv()
        .fromFile(language_url)
        .then((jsonObj) => {

            //array for holding all supported languages
            let language = [];

            for (i in jsonObj) {
                language.push(`${jsonObj[i].ISO6391code} \n`);
            }
            console.log(boxen(chalk.green(language.join('')),
                { padding: 1, margin: '5,0,0,0', borderStyle: 'single', borderColor: 'green', backgroundColor: 'black', align: 'left' }));
            return 0;
        });
}

//Variable for holding results from curr_support_method
let val1;

//Variable for holding results from lang_support_method
let val2;

//Method which gets result value from check_language_support method
function curr_support(params) {
    val1 = params;
}

//Method which gets result value from check_currency_support method
function lang_support(params) {
    val2 = params;
}

//Asynchronous function for checking whether language is supported
async function check_language_support(value) {
    await csv()
        .fromFile(language_url)
        .then((jsonObj) => {
            for (i in jsonObj) {
                if (value == jsonObj[i].ISO6391code) {
                    lang_support(0);
                }
            }
        });
}

//Asynchronous function for checking whether currency is supported
async function check_currency_support(value) {
    await csv()
        .fromFile(url)
        .then((jsonObj) => {
            for (i in jsonObj) {
                if (value == jsonObj[i].ISO4217Code) {
                    curr_support(0);
                }
            }
        });
}



//Asynchronous function for converting currencies and confirming language and currency support
async function stock(value) {

    //Variable for holding input string
    let word = "";
    word = value;

    //variable for holding language extracted from input string
    let currency_value = word.substr(0, 3);

    //variable for holding currency extracted from input string
    let language_value = word.substr(4, 2);

    //Synchronous method for checking whether language is supported 
    await check_language_support(language_value);

    //Synchronous method for checking whether currency is supported 
    await check_currency_support(currency_value);

    //Variable for getting language support status from return value for checking whether language is supported 
    let language_support = val2;

    //Variable for getting currency support status from return value for checking whether language is supported 
    let currency_support = val1;

    //Conditional statement for returning error statement if language is not supported
    if (language_support != 0) {
        console.log(boxen(chalk.red(`Error! Language not supported`),
            { padding: 1, borderStyle: 'single', borderColor: 'red', backgroundColor: 'black', align: 'center' }));

    }
    //Conditional statement for returning error statement if currency is not supported
    if (currency_support != 0) {
        console.log(boxen(chalk.red(`Error! Currency is not supported`),
            { padding: 1, borderStyle: 'single', borderColor: 'red', backgroundColor: 'black', align: 'center' }));

    }

    //conditional method for calling api if both curency and language is supported
    if (currency_support == 0 && language_support == 0) {

        url_string = `http://apilayer.net/api/live?access_key=0df6a7689612f0534337b3635023b3db` +
            `&currencies=USD&source=${currency_value}&format=1`

        //http get method for accessing currency layer api
        http.get(url_string, (res) => {

            const { statusCode } = res;
            const contentType = res.headers['content-type'];

            let error;
            if (statusCode !== 200) {
                error = new Error('Request Failed.\n' +
                    `Status Code: ${statusCode}`);
            } else if (!/^application\/json/.test(contentType)) {
                error = new Error('Invalid content-type.\n' +
                    `Expected application/json but received ${contentType}`);
            }

            if (error) {
                console.error(error.message);
                res.resume();
                return;
            }

            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);

                    console.log(boxen(chalk.green(`The current price for ${currency_value} is ${parsedData.quotes} USD`),
                        { padding: 1, margin: '5,0,0,0', borderStyle: 'single', borderColor: 'green', backgroundColor: 'black', align: 'left' }));


                    console.log(boxen(chalk.red(`${parsedData.error.info}`),
                        { padding: 1, margin: '5,0,0,0', borderStyle: 'single', borderColor: 'red', backgroundColor: 'black', align: 'left' }));

                    //return 0;


                } catch (e) {
                    console.error(e.message);
                }
            });
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });

    }

}


//Command line options
program.option('-a')
    .option('-h')
    .option('-c', 'Supported currencies', currencies)
    .option('-l', 'Supported languages', languages)
    .option('-p <value>', 'Currency convertion', stock);

//Method for accepting inputs in the command line
program.parse(process.argv);

//Conditional statements for responding to options entered in the command line
if (program.a) {
    console.log(boxen(chalk.green(' This application provides below services \n' +
        '1. Lists all supported currencies\n' +
        '2. Lists all supported languages\n' +
        '3. Performs currency convertion\n'),
        { padding: 1, borderStyle: 'single', borderColor: 'green', backgroundColor: 'black', align: 'left' }));

}
else if (program.h) {
    console.log(boxen(chalk.green('Use below flags to access listed services\n' +
        ' -a                  Know what this application does e.g cheap-stocks -a\n' +
        ' -h                  Get the help menu e.g cheap-stocks -h\n' +
        ' -c                  Display all supported currencies e.g cheap-stocks -c\n' +
        ' -l                  Display all supported languages e.g cheap-stocks -l\n' +
        ' -p <value>,<value>  Perform currency convertion by providing currency ISO 4217 code as first parameter and language ISO 6391 code as second parameter e.g cheap-stocks -cp EUR,en\n'),
        { padding: 1, margin: '5, 0, 0, 0', borderStyle: 'single', borderColor: 'green', backgroundColor: 'black', align: 'left' }));

}
else if (program.c) {

}
else if (program.l) {

}
else if (program.p) {
    console.log(boxen(chalk.green(`This process may take time. Please be patient.`),
        { padding: 1, margin: '5,0,0,0', borderStyle: 'single', borderColor: 'green', backgroundColor: 'black', align: 'left' }));

}
else {
    console.log(boxen(chalk.green('WELCOME\n To get started type "cheap-stocks -h" in your terminal'),
        { padding: 1, margin: '5,0,0,0', borderStyle: 'single', borderColor: 'green', backgroundColor: 'black', align: 'center' }));
}
