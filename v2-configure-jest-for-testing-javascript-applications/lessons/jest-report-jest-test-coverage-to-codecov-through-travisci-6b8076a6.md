Instructor: [00:01] Whatever CI service you're using, whether it's Travis, CircleCI, or whatever it is, it probably works really well with CodeCov. CodeCov is a really awesome tool that will help you keep track of your code coverage for your project and give you some visibility in your progress as you're adding coverage to your project.

[00:18] To make CodeCov work, we're going to open up our travis.yml file here. Right after this script, we're going to add a after-script configuration. You'll just want something that runs after your tests run.

```js
sudo: false
language: node_js
cache:
  directories:
    - ~/.npm
notifications:
  email: false
node_js: '12'
install: echo "install happens as part of setup"
script: npm run setup
after_script: npx codecov@3
branches:
  only: master
```

[00:30] We're going to run npxCodeCov at three. This is going to use npx, which is built into npm. The CodeCov module is, of course, built by CodeCov. The third version is the one that I'm going to use here. This is going to automatically search for the coverage information that I have here, and upload that to the CodeCov servers.

[00:51] You're going to have to, of course, sign up for an account on CodeCov. If this is a private repository, then you're going to need to follow the instructions from CodeCov to make that all wired up properly, but it should work really well.

[01:02] With that configured and pushed up, then your Travis build should run. Right here at the very bottom, you'll have this NPX CodeCov line where it actually uploads the code coverage report to CodeCov.

[01:12] Then you can look at your CodeCov dashboard and it'll give you a review of how you're doing on your code coverage in your project. You can even inspect lots of the coverage of your project right in here, in CodeCov.

[01:26] In review, to make this work, all we needed to do was update our travis.yml to have an afterscript that uses npx to run the CodeCov module on npm, which will automatically pick up the coverage directory and upload it to CodeCov for you.
