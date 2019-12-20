const fs = require('fs');
const prompt = require('prompt');

// Start of script
//
// Ask user what course they want to extract
// Assumes that the lessons are held in a /dir/lessons subfolder
prompt.start();
prompt.get(['directory'], function (err, result) {
    //
    // Log the results.
    //
    console.log('  directory: ' + result.directory);
    console.log("extracting...");
    const extractedTranscripts = {
        directory: result.directory,
        transcripts: fs.readdirSync(`${result.directory}/lessons`)
        .reduce((acc, curr) => {
            // Use underscores to match rails api
            const enhanced_transcript = fs.readFileSync(`${result.directory}/lessons/${curr}`).toString();
            const lesson_slug = curr.slice(0, -3);
            acc.push({lesson_slug, enhanced_transcript});
            return acc
        }, [])
    }
    fs.writeFileSync('enhancedTranscripts.json', JSON.stringify(extractedTranscripts))
    console.log('done')
});

