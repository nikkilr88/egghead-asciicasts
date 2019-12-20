var markdownpdf = require('markdown-pdf'),
  fs = require('fs')

/* This is the graphql query you can run
   on https://egghead.io/graphiql to get the data
   you need for this script.

{
  enhanced_transcripts(attributes: {course_slug: "SLUG_OF_COURSE"}) {
    data {
      title
      lesson {
        title
        course {
          title
          slug
          description
          square_cover_url
          http_url
          instructor {
            http_url
            full_name
          }
        }
      }
      markdown
    }
  }
}
*/

/*
  You need to add the lesson slugs in the order they appear 
  in the course because the graphql data that comes back doesn't order the lessons correctly.
  
  Running this in the rails console is the best way to get ordered lesson slugs:
  Series.find("SLUG_OF_COURSE").lessons.rank(:series_row_order).map(&:slug)
*/
const lessonOrder = []

/*
  The data will come back in this shape:
  {
    "data": {
      "enhanced_transcript": ...
    }
  }

  You need to delete the surrounding brackets and turn the string "data" into a variable:

  const data = {
    "enhanced_transcripts": ...
  }
*/
const data = {}

const course = data.enhanced_transcripts.data[0].lesson.course

const {
  title: courseTitle,
  slug: courseSlug,
  description: courseDescription,
  square_cover_url: courseImage,
  http_url: courseUrl,
} = course
const instructor = course.instructor
const { full_name: instructorName, http_url: instructorUrl } = instructor

const courseDescriptionMarkdown =
  '# ' +
  courseTitle +
  '\n\n![course image](' +
  courseImage +
  ')\n\nTranscripts for [' +
  instructorName +
  '](' +
  instructorUrl +
  ') course on [egghead.io](' +
  courseUrl +
  ').\n\n## Description\n\n' +
  courseDescription

const markdown = lessonOrder.reduce((markdownString, lessonSlug) => {
  const et = data.enhanced_transcripts.data.filter(
    x => x.title === lessonSlug,
  )[0]
  let result = markdownString

  if (et) {
    result += '\n\n## ' + et.lesson.title + '\n\n' + et.markdown
  } else {
    console.error('Missing Transcript: ', lessonSlug)
  }

  return result
}, courseDescriptionMarkdown)

const basePath = './' + courseSlug + '/' + courseSlug
const markdownPath = basePath + '.md'
fs.writeFileSync(markdownPath, markdown)
console.log('Created', markdownPath)

const pdfPath = basePath + '.pdf'
const markdownOptions = {
  cssPath: './hljs.css',
}
markdownpdf(markdownOptions)
  .from.string(markdown)
  .to(pdfPath, function() {
    console.log('Created', pdfPath)
  })
