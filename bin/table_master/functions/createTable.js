const conf = require('gh-config');
const fs = require('fs');
const path = require('path');


const fieldTemplate = {
    join: {
        isWork: false,
        table: "",
        field: ""
    },
    data: []
}

const createTable = (object) => {
    try {
        fs.mkdirSync(path.join(__dirname, conf.get('backPath1'), object.name));
        for (let i = 0; i < object.fields.length; i++) {
            const fileName = object.fields[i] + '.json';
            fs.writeFileSync(path.join(__dirname, conf.get('backPath1'), object.name, fileName), JSON.stringify(fieldTemplate, null, 4));
        }
        fs.writeFileSync(path.join(__dirname, conf.get('backPath1'), object.name, '__system__fieldList.json'), JSON.stringify(object.fields, null, 4));
        return;
    } catch (err) {
        return err;
    }
}

module.exports = createTable;