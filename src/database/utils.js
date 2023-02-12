const fs = require('fs');

function saveToDatabase(DB) {
    fs.writeFileSync('./src/database/db.json', JSON.stringify(DB, null, 2), 
    {encoding: 'utf8'});
}

module.exports = {saveToDatabase};