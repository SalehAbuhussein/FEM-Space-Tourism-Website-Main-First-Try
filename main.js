$(function () {
    // Destination Pages Content
    let destinationPlanetImg = $(".destination__planet-image img");
    let destinationPlanetHeading = $(".destination__planet-content-heading");
    let destinationPlanetDescription = $(".destination__planet-content-description");
    let destinationDistance = $(".destination__planet-distance div:last-of-type");
    let destinationTime = $(".destination__planet-travel-time div:last-of-type");
    // Crew Pages Content
    let crewImage = $(".crew__content-image img");
    let crewPosition = $(".crew-position");
    let crewName = $(".crew-name");
    let crewDescription = $(".crew-description");
    // Technology Pages Content
    let technologyImgOne = $(".technology__content-image img:first-child");
    let technologyImgTwo = $(".technology__content-image img:last-child");
    let techonologySubHead1 = $(".technology__title .sub-head-1");
    let technologyDescription = $(".technology-description");
    // Nav Menu Open and Close
    $(".menu-icon").on("click", function (event) {
        event.preventDefault();
        $("nav").attr("id", "active-menu");
    });
    $(".menu-close-icon").on("click", function (event) {
        event.preventDefault();
        $("nav").attr("id", "");
    })
    let destinationData, crewData, technologyData;
    // Start Load Data
    $.get("../data.json", (data) => {
        let {destinations, crew, technology} = data;
        destinationData = destinations;
        crewData = crew;
        technologyData = technology;
        console.log(technologyData);
    });
    // End Load Data
    // Start Destination Planets Select Event
    $(".destination__planet-tabs li").on("click", (event) => {
        event.preventDefault();
        $(event.currentTarget).addClass("active").siblings().removeClass("active");
        destinationData.forEach((ele, index, arr) => {
            if (ele.name === $(event.currentTarget).text().trim()) {
                destinationPlanetImg.attr("src", ele.images.png);
                destinationPlanetHeading.text(ele.name.toUpperCase());
                destinationPlanetDescription.text(ele.description);
                destinationDistance.text(ele.distance);
                destinationTime.text(ele.travel);
                return;
            }
        });
        // console.log(destinationPlanetImg.attr("src"));
    });
    // End Destination Planets Select Event
    // Start Select Crew Members Event
    let activeDestinationIndex = 0;
    $(".dots a").on("click", (event) => {
        event.preventDefault();
        $(event.currentTarget).addClass("active").siblings().removeClass("active");
        $(".dots a").each((index, element) => {
            if (element === event.currentTarget) {
                activeDestinationIndex = index;
                return;
            }
        });
        let { name, images: { png }, role, bio } = crewData[activeDestinationIndex];
        crewImage.attr("src", png,);
        crewPosition.text(role.toUpperCase());
        crewName.text(name.toUpperCase());
        crewDescription.text(bio);
    });
    // End Select Crew Members Event
    // Start Technology Select Event
    let technologyActiveIndex = 0;
    $(".slider a").on("click", (event) => {
        event.preventDefault();
        $(event.currentTarget).addClass("active").siblings().removeClass("active");
        $(".slider a").each((index, element) => {
            if (element === event.currentTarget) {
                technologyActiveIndex = index;
                return;
            }
        });
        // console.log(technologyActiveIndex);
        let { name, images: { landscape, portrait }, description} = technologyData[technologyActiveIndex];
        technologyImgOne.attr("src", landscape);
        technologyImgTwo.attr("src", portrait);
        techonologySubHead1.text(name);
        technologyDescription.text(description);
    });
    // End Technology Select Event
});

