Build your project with poi build. This creates a dist folder. I'll go ahead and launch the dist folder with http-server and launch that folder. Now this is on 8080. Let's launch that. You can see we now have the same project, exact same content to serve statically now.

To analyze our project, let's install the webpack-bundle-analyzer. Then we'll add it to our poi.config. We'll say BundleAnalyzer is the ('webpack-bundle-analyzer').BundleAnalyzerPlugin. Then we can add that to our plugins by saying config.plugins.push(new BundleAnalyzer()).

Before we run this, we want to make sure we hide it behind a flag so it doesn't run every time. The way we can do that is by changing our exports to a function and then passing in some options. Now I'll wrap this in parens.

Now I can pass in options and check to see if something like if (options.analyze) then do this. If I say poi build --analyze, this will hit this if block and use that plugin. We can see this automatically launched the BundleAnalyzer. We can go ahead and navigate through our bundles, click on these areas, zoom in, and see how we can optimize our project.