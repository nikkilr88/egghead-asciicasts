# egghead.io asciicasts

## Setting up .env
Create a .env file in the   root of the project (see .env.template). The easiest way to get an `EGGHEAD_AUTH_TOKEN` is to
get your user jwt returned to you from [this link](https://egghead.io/users/jwt?return_to=https://instructor.egghead.io). In the url, copy the contents following `https://instructor.egghead.io/?jwt=`

## Steps to Deploy Asciicasts:

* `npm install`
* `npm run build`
* `npm run deploy`

### Notes

The API token for the user may need to be changed in `deployToRails.js`.

## How to build an asciicast:

Asciicasts \(or enhanced transcripts\) are written in the [gitbook](https://www.gitbook.com/) format.

The file structure for a git book is such: 
 \/lessons
 \/images
 book.json
 package.json
 README.md
 SUMMARY.md

The `book.json` and `package.json` are used for grabbing the necessary packages to run the gitbook CLI. We have decided to put the markdown files \(asciicasts\) in the `/lessons` directory so that it makes it easy to automate deploying them to egghead.io.

`SUMMARY.md` is used by gitbook to navigate the files in the book. Each asciicast in `/lessons` should have a corresponding link in `SUMMARY.md`.

`README.md` should have information about the course. This would include the title, description, and version of the library being covered.

Lessons or Asciicasts are where most of the work resides. The transcript of the lessons needs to be grabbed from the lesson page on egghead.io. All of the code that is referenced in the video should be highlighted with back ticks. General concepts should be bolded. They only need to be bolded the first time they are mentioned in the video. Other egghead.io lessons and courses can be linked when a concept is mentioned that egghead.io covers. Any code that is written should show up in a "code fence". Here is an example of how JavaScript would be highlighted:

```js
function helloWorld(){
  console.log("hello world")
}

helloWorld();
// "hello world
```

Generally these code blocks should be added when the instructor adds code to the file they are working in. If the instructor adds code \(like css\) that doesn't have to do with the lesson, it does not need to be displayed. This includes terminal commands that they enter. Any console output that occurs during the lessons should be displayed as a code block.

Screen shots should be taken when any UI is changed. If the image can be turned into a code block, generally that is preferable.

