require('dotenv').config()
const fs = require('fs')
const prompt = require('cli-prompt');
const axios  = require('axios');

axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.EGGHEAD_AUTH_TOKEN}`;
const transcripts_data = JSON.parse(fs.readFileSync('enhancedTranscripts.json').toString());

const fetchProperSlug = ({lesson_slug, enhanced_transcript}) => {
    axios.get(`https://egghead.io/api/v1/lessons/${lesson_slug}`)
    .then(response => {
        postTranscript(enhanced_transcript, response.data.slug)

        if(lesson_slug !== response.data.slug) {
            fs.rename(`${transcripts_data.directory}/lessons/${lesson_slug}.md`, `${transcripts_data.directory}/lessons/${response.data.slug}.md`, err => {
                if (err) console.log(err)
                console.log(`Renamed ${lesson_slug} to ${response.data.slug}`)
            })
        }
    })
    .catch(error => console.log("FETCH ERROR", error))
}

const postTranscript = (transcript, slug) => {
    axios.post("https://egghead.io/api/v1/enhanced_transcripts", {
        enhanced_transcript: {
            markdown: transcript,
            title: slug
        }
    })
    .then(response => console.log(response.status))
    .catch(error => console.log("POST ERROR", error))
}


prompt('Deploy to rails? (y/n) ', function (val) {
    const deploy = val;
    if (deploy === 'y' || deploy === 'Y' || deploy === 'yes'){
        transcripts_data.transcripts.forEach(transcript => {
            fetchProperSlug(transcript)
        })
    } else {
        console.log('Have a good day!')
    }
}, function (err) {
    console.error('unable to read answer: ' + err);
});
