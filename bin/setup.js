const readline = require('readline');

const createTable = require('./table_master/functions/createTable');
const {join, getJoinLinks} = require('./table_master/functions/joinMaster');

const setupController = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });


    let newTableParams = {
        fields: []
    }


    const returnFunc = (ques) => {question(ques)}


    let scenario = 0;
    //0 - NaN
    //1 - create table / name
    //2 - add field to the table
    const question = (ques = '=> ') => {
        rl.question(ques, (answer) => {

            if(scenario == 0) {
                if (answer == 'close') rl.close();

                else if (answer == 'create table') {
                    scenario = 1;
                    returnFunc('Enter new table name ');
                } else if (answer == 'add field') {
                    scenario = 2;
                    returnFunc("Enter new field name ");
                } else if (answer == 'finish table') {
                    scenario = 0;
                    const ans = createTable(newTableParams);
                    if(ans) console.log(ans);
                    newTableParams = { fields: [] };
                    returnFunc();
                } else if (answer == "join"){
                    scenario = 3;
                    returnFunc("Enter join link ");
                } else if (answer == "show joins"){
                    console.log(getJoinLinks());
                    returnFunc();
                }


            } else {
                switch (scenario) {
                    case 1:
                        newTableParams["name"] = answer;
                        scenario = 0;
                        console.log('Table has been created ');
                        returnFunc();
                        break;
                    case 2:
                        newTableParams.fields.push(answer);
                        console.log('Field has been created ');
                        scenario = 0;
                        returnFunc();
                        break;
                    case 3:
                        const [from, to] = answer.split(' -> ');
                        // tableFrom : fieldFrom -> tableTO : fieldTo
                        const [fromT, fromF] = from.split(' : ');
                        const [toT, toF] = to.split(' : ');
                        const ans = join(fromT, fromF, toT, toF, answer);
                        if(ans) console.log(ans);
                        scenario = 0;
                        console.log('fields has been joined');
                        returnFunc();
                        break;
                }
            }
        });
    }
    question();
}

module.exports = setupController;