const fs = require('fs');
const prompt = require('prompt');

// Start of script
//
// Ask user what course they want to extract
prompt.start();
prompt.get(['directory'], function (err, result) {
    //
    // Log the results.
    //
    console.log('  directory: ' + result.directory);
    console.log("extracting...")
    const extractedTranscripts = fs.readdirSync(`${result.directory}/lessons`)
        .reduce((prev, curr) => {
            const keyName = curr.slice(0, -3);
            prev[keyName] = fs.readFileSync(`${result.directory}/lessons/${curr}`).toString();
            return prev
        }, {});
    fs.writeFileSync('asciicast.json', JSON.stringify(extractedTranscripts))
    console.log('done')
});

