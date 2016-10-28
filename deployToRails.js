require('dotenv').config()
const fs = require('fs')
const prompt = require('cli-prompt');
const axios  = require('axios');

axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.EGGHEAD_AUTH_TOKEN}`;

prompt('Deploy to rails? (y/n) ', function (val) {
    const deploy = val;

    if (deploy === 'y' || deploy === 'Y' || deploy === 'yes'){
        prompt('What domain would you like to send these to? (specify http or https) ', (val) => {
            const domain = val;
            prompt('This will deploy enhancedTranscripts.json, are you sure? (y/n) ', (val) => {
                if (val === 'y' || val === 'Y' || val === 'yes'){
                    const extracted_enhanced_transcripts = JSON.parse(fs.readFileSync('enhancedTranscripts.json').toString());
                    extracted_enhanced_transcripts.forEach((et, index) => {
                       axios.post(`${domain}/api/v1/enhanced_transcripts`, {
                           enhanced_transcript: {
                               markdown: et.enhanced_transcript,
                               title: et.lesson_slug
                           }
                       })
                           .then(response => console.log(response.status))
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
