# portfolio-generator
JS framework to dynamically generate a portfolio site from a JSON resume

<a href="http://www.navdeepsekhon.com/portfolio-generator/index.readable.html" target="_blank">DEMO</a> | <a href="http://www.navdeepsekhon.com" target="_blank">My portfolio</a>

# Features:
* Framework generates a responsive website by reading information from resume.json
* Adapts to different screen sizes from phones to desktops
* Ability to choose the order of diffrent sections
* Ability to create image galleries for projects
* All sections are optional; any section can be skipped
* Ability to have custom names for different project sections

#### Technical:
* The code for generating the page is in builder.js and constants.js.
* It reads the json file using an ajax call to the address listed at the top in constants.js
* index.html contains all the HTML, CSS and JS in minified format. It will read the resume listed at var <code>RESUME_LOCATION="https://raw.githubusercontent.com/" + GITHUB_USERNAME +"/portfolio-generator/master/resume.json";</code>
* <code>The GITHUB_USERNAME is picked up from the username.js</code>
* To host your site qucikly you can put the index.html and username.js on your site, fork this repo and replace content in resume.json
* See below for how to control different views.

#### Display Order:
* The order of different sections is controlled by "displayOrder" in JSON.
* If you don't want a section to appear on the site, just remove it from the displayOrder
* Anything that's empty in the "personal" section won't be shown on the site.

#### Project Sections:
* Project sections are defined in the "projectSections" as an array.
* "title" wil be the title of the project section.
* Project sections appear in same order as they are listed.

#### Projects:
* Images for the pop up gallery are listed in the "gallery" array. They appear in the order they are listed in.
* For bulleted project description, make the "description" attribute a json array and leave out the "gallery"
* For a paragrap style description, make the "desctiption" a simple string.
* If you don't want th "Link to Project" to show up, just leave out the "link" attribute.

#### Work Experience/ Volunteer:
* If a "link" is included for the org, the organization name will an <a> tag with the link, otherwise simple text.
* Highlights can be included in the "highlights" as an array. Highlights are optional as well.
* The "dates" are treated as a string value, so they can be any format.

Pull requests with improvements are welcome.

If you have any questions, please reachout here or @navdeepsekhon9
