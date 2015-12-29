var RESUME_LOCATION="https://raw.githubusercontent.com/" + GITHUB_USERNAME +"/portfolio-generator/master/resume.json";

var titleOnBlur = "Miss You :(";
var titleOnActive = "Portfolio";

var HTMLEmail = '<li><span class="glyphicon glyphicon-envelope contact-icon"></span><span class="contact-text">%data%</span></li>';
var HTMLPhone = '<li><span class="glyphicon glyphicon-earphone contact-icon"></span><span class="contact-text">%data%</span></li>';
var HTMLPersonalWebsite = '<li><span class="glyphicon glyphicon-globe contact-icon"></span><span class="contact-text"><a href ="%data%">%data%</a></span></li>';
var HTMLLocation = '<li><span class="glyphicon glyphicon-home contact-icon"></span><span class="contact-text">%data%</span></li>';

var HTMLShortBio = '<div class="row"><div class="col-md-12"><p id ="short-bio" class="text-center">%data%</p></div></div><hr/>';

var HTMLProjectsStart = '<div class="row"><div class="col-md-12"><h2 class="text-muted">%sectionTitle%</h2></div></div><div id="projects%id%"></div><hr/>';
var HTMLProjectRow = '<div class="row text-center project-row"></div>';
var HTMLProjectWithGallery = '<div class="col-md-4"><img id="project-%id%" project-title="%title%" project-desc="%projectDesc%" class="img-responsive image-center gallery-thumbnail-image thumbnail-image tooltip-image clickable" title="Click image for more information" src="%image%" ><h3>%title%</h3>';
var HTMLProjectWithModal = '<div class="col-md-4"><img id="project-%id%" project-title="%title%" project-desc="%projectDesc%" class="img-responsive image-center modal-thumbnail-image thumbnail-image tooltip-image clickable" title="Click image for more information" src="%image%" ><h3>%title%</h3>';
var HTMLProjectSimple = '<div class="col-md-4"><img id="project-%id%" project-title="%title%" project-desc="%projectDesc%" class="img-responsive image-center thumbnail-image" src="%image%" ><h3>%title%</h3>';
var HTMLProjectLink = '<p><a href="%link%" target="_blank">Link to project</a></p>';
var HTMLProjectGalleryItem = '<div class="item" id="project-%id%"><img class="img-responsive img-gallery" src="%src%"></div>';
var HTMLProjectBulletDescriptionStart = "<ul class='bullet-list text-left'>";
var HTMLProjectBulletDescriptionItem = "<li>%data%</li>";
var HTMLProjectBulletDescriptionEnd = "</ul>";

var HTMLWorkExperienceStart = '<div class="row"><div class="col-md-12"><h2 class="text-muted">Work Experience</h2></div></div><div id="work"></div><hr/>';
var HTMLInstitutionName = '<div class="row"><div class="col-md-12"><h3>%data%</h3></div></div>';
var HTMLEmploymentDateAndLocation = '<div class="row"><div class="col-md-6 location-text">%location%</div><div class="col-md-6 date-text text-right">%date%</div></div>';
var HTMLEmployer = '<div class="row"><div class="col-md-12"><a href="%url%" target="_blank"><h3>%employer%</h3></a></div>';
var HTMLEmployerWithoutUrl = '<div class="row"><div class="col-md-12"><h3>%employer%</h3></div>';
var HTMLJobTitle = '<div class="row"><div class="col-md-12"><p>%data%</p></div>';
var HTMLEmploymentDates = '<div class="col-md-6 date-text text-right">%data%</div>';
var HTMLWorkLocation = '<div class="col-md-6 location-text">%data%</div>';
var HTMLWorkHighlightsTitle = '<div class="row"><div id= "%id%" class="col-md-12 highlights clickable" data-toggle="collapse" data-target="#%targetId%"><span class="glyphicon glyphicon-triangle-right contact-icon"></span><span class="text-bold contact-text">Highlights</span></div></div>';
var HTMLWorkHighlightsList = '<ul class="collapse bullet-list" id = "%data%"></ul>';
var HTMLWorkHighlightsListItem = '<li>%data%</li>';

var HTMLEducationStart = ' <div class="row"><div class="col-md-12"><h2 class="text-muted">Education</h2></div></div><div id="education"></div><hr/>';
var HTMLDegree = '<div class="col-md-4 location-text">%data%</div>';
var HTMLGpa = '<div class="row"><div class="col-md-12 gpa-text text-left">GPA: %data%</div></div>';

var HTMLSocialStart = '<div class="social"><ul id="social" class="social-list"></ul></div>';
var HTMLSocialItem = '<li ><a href="%link%" target="_blank"><span class="zocial-%network%"></span></a></li>';
var HTMLSocialEnd = '</ul>';

var HTMLAwardsStart = ' <div class="row"><div class="col-md-12"><h2 class="text-muted">Awards</h2></div></div><div id="awards"></div><hr/>';
var HTMLAwardTitle = '<div class="row"><div class="col-md-12"><h3>%data%</h3></div></div>';
var HTMLAwarderAndDate = '<div class="row"><div class="col-md-6 text-left"><p>%awarder%</p></div><div class="col-md-6 date-text text-right">%date%</div></div>';
var HTMLAwardDetails = '<div class="row collapse award-detail-text" id ="%id%"><div class="col-md-9"><p>%data%</p></div></div>';
var HTMLAwardDetailsTitle = '<div class="row"><div id= "%id%" class="col-md-12 highlights clickable" data-toggle="collapse" data-target="#%targetId%"><span class="glyphicon glyphicon-triangle-right contact-icon"></span><span class="text-bold contact-text">Details</span></div></div>';


var HTMLVolunteerStart = '<div class="row"><div class="col-md-12"><h2 class="text-muted">Volunteer Work</h2></div></div><div id="volunteer"></div><hr/>';