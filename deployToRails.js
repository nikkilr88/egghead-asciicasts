const fs = require('fs')
const prompt = require('cli-prompt');
const axios  = require('axios');

const AUTH_TOKEN = '2977fdfd-9b2f-4948-9960-04e8507957e6';
axios.defaults.headers.common['AuthToken'] = AUTH_TOKEN;

prompt('Deploy to rails? (y/n) ', function (val) {
    const deploy = val;

    if (deploy === 'y' || deploy === 'Y' || deploy === 'yes'){
        prompt('What domain would you like to send these to? (specify http or https) ', (val) => {
            const domain = val;
            prompt('This will deploy enhancedTranscripts.json, are you sure? (y/n) ', (val) => {
                if (val === 'y' || val === 'Y' || val === 'yes'){
                    const extracted_enhanced_transcripts = JSON.parse(fs.readFileSync('enhancedTranscripts.json').toString());
                    extracted_enhanced_transcripts.forEach((et, index) => {
                       axios.put(`${domain}/api/v1/lessons/${et.lesson_slug}`, {
                           enhanced_transcript: et.enhanced_transcript
                       })
                           .then(response => console.log(response.data.title, response.status))
                           .catch(error => console.log(error))
                    });
                } else {
                    console.log('Come back soon!');
                }
            })

        })
    } else {
        console.log('Have a good day!')
    }
}, function (err) {
    console.error('unable to read answer: ' + err);
});
