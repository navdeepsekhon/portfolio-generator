var defaultOrder = ["shortBio", "projects", "work", "education", "awards", "volunteer", "social"];
var functions = [];
var hidden, visibilityChange;

if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
} else {
  window.onblur = function () {
      document.title = titleOnBlur;
  };
  window.onfocus = function () {
      document.title = titleOnActive;
  };
}

function handleVisibilityChange() {
  if (document[hidden]) {
    document.title = titleOnBlur;
  } else {
    document.title = titleOnActive;
  }
}

document.addEventListener(visibilityChange, handleVisibilityChange, false);

functions["shortBio"] = addShortBio;
functions["work"] = addWork;
functions["projects"] = addProjectSections;
functions["awards"] = addAwards;
functions["education"] = addEducation;
functions["volunteer"] = addVolunteer;
functions["social"] = addSocialLinks;

var DOMMain = null;
$("#modal-carousel").carousel({ interval: false });
$.getJSON(RESUME_LOCATION, function (data) {
    setData(data);
});

function setData(data) {
    DOMMain = document.getElementById("main");
    document.title = data.personal.name + ', ' + data.personal.title;
    titleOnActive = data.personal.name + ', ' + data.personal.title;
    document.getElementById("name").innerHTML = data.personal.name;
    document.getElementById("title").innerHTML = data.personal.title;
    addContacts(data.personal);

    var sectionOrder = defaultOrder;
    if (data.displayOrder != undefined && data.displayOrder.length != 0) {
        sectionOrder = data.displayOrder;
    }

    for (var i in sectionOrder) {
        functions[sectionOrder[i]](data);
    }

    $('.tooltip-image').tooltip();
    $('.tooltip-image').first().tooltip("show");
    addProjectThumbnailListener();
    addCollapseListeners();
    if(data.hideDesignedBy)
        hideFooter();
}

function addShortBio(data) {
    var personal = data.personal;
    if (personal.shortBio != undefined && personal.shortBio != '') {
        append(DOMMain, HTMLShortBio.replace("%data%", personal.shortBio));
    }

}

function addContacts(personal) {
    if (personal.email != undefined && personal.email != '')
        append(document.getElementById("contacts"), HTMLEmail.replace("%data%", personal.email));
    if (personal.phone != undefined && personal.phone != '')
        append(document.getElementById("contacts"), HTMLPhone.replace("%data%", personal.phone));
    if (personal.location != undefined && personal.location != '')
        append(document.getElementById("contacts"), HTMLLocation.replace("%data%", personal.location));
    if (personal.website != undefined && personal.website != '')
        append(document.getElementById("contacts"), replaceAll(HTMLPersonalWebsite, "%data%", personal.website));
}

function addProjectSections(data) {
    if (data.projectSections == undefined || data.projectSections.length == 0)
        return;

    var projectSections = data.projectSections;
    for (var i in projectSections) {
        var projectSectionHtml = HTMLProjectsStart.replace("%sectionTitle%", projectSections[i].title);
        projectSectionHtml = projectSectionHtml.replace("%id%", i);
        append(DOMMain, projectSectionHtml);
        var domProjects = document.getElementById("projects" + i);
        addProjects(projectSections[i].projects, domProjects);
    }
}
function addProjects(projects, domProjects) {

    var projectRow;
    var projectCount = 0;
    var projectHtml = '';
    for (var i in projects) {
        var projectUniqueId = i + "-" +new Date().getMilliseconds();
        projectCount++;
        if (projectCount == 1) {
            append(domProjects, HTMLProjectRow);
            projectRow = document.getElementsByClassName("project-row");
            projectRow = projectRow[projectRow.length - 1];
        }
        if (projects[i].gallery != undefined && projects[i].gallery.length != 0) {
            addProjectImagesToRepo(projects[i].gallery, projectUniqueId);
            projectHtml = HTMLProjectWithGallery;
        } else if (projects[i].description != undefined && projects[i].description != '') {
            projectHtml = HTMLProjectWithModal;
        } else {
            projectHtml = HTMLProjectSimple;
        }

        projectHtml = projectHtml.replace("%image%", projects[i].thumbnail);
        projectHtml = replaceAll(projectHtml, "%title%", projects[i].title);
        projectHtml = projectHtml.replace("%id%", projectUniqueId);
        if (projects[i].link != undefined && projects[i].link != '') {
            projectHtml += HTMLProjectLink.replace("%link%", projects[i].link);
        }

        if (projects[i].description != undefined && projects[i].description.length != 0) {
            if (projects[i].description instanceof Array) {
                projectHtml = addProjectBulletDescription(projectHtml, projects[i].description);
            } else
                projectHtml = projectHtml.replace("%projectDesc%", projects[i].description);
        }
        append(projectRow, projectHtml);


        if (projectCount == 3) {
            projectCount = 0;
        }

    }

}

function addProjectBulletDescription(projectHtml, description) {
    var listHtml = HTMLProjectBulletDescriptionStart;
    for (var i in description) {
        listHtml += HTMLProjectBulletDescriptionItem.replace("%data%", description[i]);
    }
    listHtml += HTMLProjectBulletDescriptionEnd;
    projectHtml = projectHtml.replace("%projectDesc%", listHtml);
    return projectHtml;
}

function addProjectImagesToRepo(images, id) {
    var DOMImageRepo = document.getElementById('image-repo');
    for (var j in images) {
        var repoItem = HTMLProjectGalleryItem.replace("%src%", images[j]);
        repoItem = repoItem.replace("%id%", id);
        append(DOMImageRepo, repoItem);
    }
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function addAwards(data) {
    if (data.awards == undefined || data.awards.length == 0)
        return;
    var awards = data.awards;
    append(DOMMain, HTMLAwardsStart);
    var domAwards = document.getElementById("awards");

    for (var i in awards) {
        var awardTitle = HTMLAwardTitle.replace("%data%", awards[i].title);
        var awarderAndDate = HTMLAwarderAndDate.replace("%awarder%", awards[i].awarder);
        awarderAndDate = awarderAndDate.replace("%date%", awards[i].date);
        append(domAwards, awardTitle);
        append(domAwards, awarderAndDate);

        if (awards[i].description != null && awards[i].description != '') {
            var unique = new Date().getMilliseconds()
            var detailId = "awardDetails" + i + "-" + unique;
            var divId = "detailsDiv" + detailId+"-" + unique;
            var detailsTitleHTML = HTMLAwardDetailsTitle.replace("%id%", detailId);
            detailsTitleHTML = detailsTitleHTML.replace("%targetId%", divId);
            append(domAwards, detailsTitleHTML);
            append(domAwards, HTMLAwardDetails.replace("%id%", divId).replace("%data%", awards[i].description));
        }
    }

}

function addVolunteer(data) {
    if (data.volunteer == undefined || data.volunteer.length == 0)
        return;
    var volunteer = data.volunteer;
    DOMMain.innerHTML += HTMLVolunteerStart;

    var domVolunteer = document.getElementById("volunteer");
    for (var i in volunteer) {
        var title = HTMLJobTitle.replace("%data%", volunteer[i].title);
        var volunteerDateAndLocation = HTMLEmploymentDateAndLocation.replace("%date%", volunteer[i].dates === undefined ? '' : volunteer[i].dates);
        volunteerDateAndLocation = volunteerDateAndLocation.replace("%location%", volunteer[i].location === undefined ? '' : volunteer[i].location);
        var organization = '';

        if (volunteer[i].website != undefined && volunteer[i].website != '') {
            organization = HTMLEmployer.replace("%employer%", volunteer[i].organization);
            organization = organization.replace("%url%", volunteer[i].website);
        } else {
            organization = HTMLEmployerWithoutUrl.replace("%employer%", volunteer[i].organization);
        }

        append(domVolunteer, organization);
        append(domVolunteer, title);
        append(domVolunteer, volunteerDateAndLocation);

        if (volunteer[i].highlights != undefined && volunteer[i].highlights instanceof Array && volunteer[i].highlights.length != 0) {
            var unique = new Date().getMilliseconds();
            var highlightId = "volunteerHighlights" + i + "-" + unique;
            var divId = "highlightDiv-" + highlightId;
            append(domVolunteer, HTMLWorkHighlightsTitle.replace("%targetId%", highlightId).replace("%id%", divId));
            var highlightDiv = document.getElementById(divId);
            append(highlightDiv, HTMLWorkHighlightsList.replace("%data%", highlightId));
            var highlightList = document.getElementById(highlightId);
            for (var j in volunteer[i].highlights) {
                append(highlightList, HTMLWorkHighlightsListItem.replace("%data%", volunteer[i].highlights[j]));
            }
        }
    }
}

function addWork(data) {
    if (data.work === undefined || data.work.length === 0)
        return;
    var work = data.work;
    DOMMain.innerHTML += HTMLWorkExperienceStart;

    var domWork = document.getElementById("work");
    for (var i in work) {
        var jobTitle = HTMLJobTitle.replace("%data%", work[i].title);
        var employmentDateAndLocation = HTMLEmploymentDateAndLocation.replace("%date%", work[i].dates === undefined ? '' : work[i].dates);
        employmentDateAndLocation = employmentDateAndLocation.replace("%location%", work[i].location === undefined ? '' : work[i].location);
        var employer = '';
        if (work[i].website != undefined && work[i].website != '') {
            employer = HTMLEmployer.replace("%employer%", work[i].employer);
            employer = employer.replace("%url%", work[i].website);
        } else {
            employer = HTMLEmployerWithoutUrl.replace("%employer%", work[i].employer);
        }
        append(domWork, employer);
        append(domWork, jobTitle);
        append(domWork, employmentDateAndLocation);

        if (work[i].highlights != null && work[i].highlights.length != 0) {
            var unique = new Date().getMilliseconds();
            var highlightId = "workHighlights" + i + unique;
            var divId = "highlightDiv-" + highlightId;
            append(domWork, HTMLWorkHighlightsTitle.replace("%targetId%", divId).replace("%id%", highlightId));
            var highlightDiv = document.getElementById(highlightId);
            append(highlightDiv, HTMLWorkHighlightsList.replace("%data%", divId));
            var highlightList = document.getElementById(divId);
            for (var j in work[i].highlights) {
                append(highlightList, HTMLWorkHighlightsListItem.replace("%data%", work[i].highlights[j]));
            }
        }
    }
}

function addEducation(data) {
    if (data.education === undefined || data.education.length === 0)
        return;
    var education = data.education;
    append(DOMMain, HTMLEducationStart);
    var domEducation = document.getElementById("education");
    for (var i in education) {
        var institution = HTMLInstitutionName.replace("%data%", education[i].institution);
        var degreeString = education[i].degree + ", " + education[i].major;
        var degreeAndGraduation = HTMLEmploymentDateAndLocation.replace("%date%", education[i].graduationDate);
        degreeAndGraduation = degreeAndGraduation.replace("%location%", degreeString);


        domEducation.innerHTML += institution;
        domEducation.innerHTML += degreeAndGraduation;
        if (education[i].gpa != undefined && education[i].gpa != '') {
            var gpa = HTMLGpa.replace("%data%", education[i].gpa);
            domEducation.innerHTML += gpa;
        }
    }
}

function addSocialLinks(data) {
    if (data.personal.profiles === undefined || data.personal.profiles.length === 0)
        return;
    var social = data.personal.profiles;
    DOMMain.innerHTML += HTMLSocialStart;
    var domSoical = document.getElementById("social");
    for (var i in social) {
        var socialItem = HTMLSocialItem.replace("%network%", social[i].network.toLowerCase());
        socialItem = socialItem.replace("%link%", social[i].url);
        domSoical.innerHTML += socialItem;
    }


}

function append(dom, htmlToAppend) {
    dom.innerHTML += htmlToAppend;
}

function addProjectThumbnailListener() {
    addListenerForGallery();
    addListenerForModal();
}

function addListenerForGallery() {
    $(".gallery-thumbnail-image").click(function () {
        var content = $(".carousel-inner");
        var title = $("#gallery-title");
        var projectDesc = this.getAttribute('project-desc');
        var projectTitle = this.getAttribute('project-title');


        var projectDescDom = document.getElementById("modal-project-desc");
        content.empty();
        title.empty();
        var id = this.id;
        var repo = $("#image-repo .item");
        var repoCopy = repo.filter("#" + id).clone();
        var active = repoCopy.first();
        active.addClass("active");
        title.html(projectTitle);
        projectDescDom.innerHTML = projectDesc;
        content.append(repoCopy);

        $("#modal-gallery").modal("show");
    });
}

function addListenerForModal() {
    $(".modal-thumbnail-image").click(function () {
        var content = document.getElementById("modal-desc-body");
        var title = document.getElementById("modal-title");
        var projectDesc = this.getAttribute('project-desc');
        var projectTitle = this.getAttribute('project-title');


        title.innerHTML = projectTitle;
        content.innerHTML = projectDesc;

        $("#modal-desc").modal("show");
    });
}

function addCollapseListeners() {
    $('.collapse').on('shown.bs.collapse', function () {
        $(this).parent().find(".glyphicon").removeClass("glyphicon-triangle-right").addClass("glyphicon-triangle-bottom");
    });

    $('.collapse').on('hidden.bs.collapse', function () {
        $(this).parent().find(".glyphicon").removeClass("glyphicon-triangle-bottom").addClass("glyphicon-triangle-right");
    });
}

function hideFooter(){
    document.getElementsByTagName("footer")[0].hidden = true;
}
