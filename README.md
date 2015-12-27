# portfolio-generator
JS framework to dynamically generate a portfolio site from a JSON resume

#Features:
* Framework generates a responsive website by reading information from resume.json
* Adapts to different screen sizes from phones to desktops
* Ability to choose the order of diffrent sections
* Ability to create image galleries for projects
* All sections are optional; any section can be skipped
* Ability to have custom names for different project sections

####Technical:
* The code for generating the page is in builder.js and constants.js.
* It reads the json file using an ajax call to the address listed in constants.js


####Step by Step how to create and host a portfolio website with github:

#####Prerequisites:
* Create a github account
* Download [github desktop app](https://desktop.github.com/) and login to the app

#####Steps:
1. Fork this repository. (Fork button at the top)
2. Go to your github homepage, you should see portfolio-generator listed under your repositories.
3. Open the desktop app, in the top left corner click the "+" button.
4. Select the "Clone" tab, then select portfolio-generator. It should show up in the list on the left after cloning.
5. Again click the "+" sign and select "Create".
6. For the name enter yourGitHubUserName.github.io and create. It should also get listed on the left with portfolio-generator now.
7. Now right click on each one and click "Show in explorer".
8. From the portfolio-generator folder, copy index.html and username.js into the other one.
9. Edit the new username.js and replace navdeepsekhon with your github username.
10. Back in the github app, select the github.io project, select the "Changes" tab on the right.
11. Write some message in the "Summary" box and click commit.
12. Click "Sync" in the top right corner.
13. Go to http://yourGitHubUsername.github.io. If you did everything right, you sould see a sample portfolio.

#####Updating the portfolio with your data:
Look for the resume.json file in your portfolio-generator project(It should be here: https://github.com/YOURUSERNAME/portfolio-generator/blob/master/resume.json), edit it with your data. You should see your website updated with new data.

#####Helpful links:
* [Understanding JSON format](http://code.tutsplus.com/tutorials/understanding-json--active-8817)
* If nothing shows up on the site after your changes, copy/paste the json file at www.jsonlint.com and make sure you fix any errors listed.
* You might find http://www.jsoneditoronline.org/ useful when editing your json. Paste the sample json on the left, click the arrow poiting right, now you can make changes on the right. When done click the arrow pointing left.

If you have any questions, please reachout here or @navdeepsekhon9
