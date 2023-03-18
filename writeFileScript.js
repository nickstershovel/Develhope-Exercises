const fs = require('fs');

const data = "Text to be written to the file."

fs.writeFile("myFile1.txt", data, (error) => {
    if (error) throw error;
});