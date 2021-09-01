const conf = require('gh-config');
const fs = require('fs');
const path = require('path');

module.exports = {
    join(fromT, fromF, toT, toF, inlet){
        try {
            const toFName = toF + '.json';
            let file = JSON.parse(fs.readFileSync(path.join(__dirname, conf.get('backPath1'), toT, toFName), 'utf8'));

            file.join.isWork = true;
            file.join.table = fromT;
            file.join.field = fromF;

            fs.writeFileSync(path.join(__dirname, conf.get('backPath1'), toT, toFName), JSON.stringify(file, null, 4));

            let joinList = fs.readFileSync(path.join(__dirname, '../../../config/joinLinks.txt'), 'utf8')

            if(joinList == '') joinList = inlet
            else joinList = joinList + `\n` + inlet;

            return;
        } catch (err) {
            return err;
        }
    },

    getJoinLinks(){
        try{
            return(fs.readFileSync(path.join(__dirname, '../../../config/joinLinks.txt'), 'utf8'))
        } catch (err) {
            return err;
        }
    }
}

