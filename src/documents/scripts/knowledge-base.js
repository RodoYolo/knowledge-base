$(function() {
    // For draggable main menu, check drag direction
    var start,
        stop;

    // Initialize Table Of Contents
    $("#nav").tocify({
        showAndHide:false,
        selectors: "h1, h2, h3",
        ignoreSelector: ".jumbotron, footer",
        extendPage: false
    });

    // Initialize Dropdown Navigation Instances
    $('.dropdown-toggle').dropdown();

    // Dropdown menu animations
    $('.dropdown').on('show.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').show();
    });

    // Dropdown menu animations
    $('.dropdown').on('hide.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').hide();
    });

    // Grid-Menu (L1-2) coloring of icons when hovering
    $('div.menu-option').hover(function(){
        $(this).find(".option-head-text").addClass("hover");
        $(this).find("img").addClass("hover");
    }, function(){
        $(this).find(".option-head-text").removeClass("hover");
        $(this).find("img").removeClass("hover");
    });

    /*
     *  Add -/+ collapse option for Table Of Contents
     */
    $(".tocify-header > li:first-child").prepend("<div id='collapse-container'> <span id='collapseToc' class='minus'> </span></div>");
    $('#collapse-container').click(function(e) {
        e.stopPropagation();
        $(".tocify-subheader").slideToggle(200);
        $("#nav").toggleClass("collapsed");

        if ($("#collapseToc").hasClass('minus')) {
            $("#collapseToc").removeClass('minus').addClass('plus');
            $("#main-container .col-md-9").removeClass("col-md-9").addClass("col-md-12");
        } else {
            $("#collapseToc").removeClass('plus').addClass('minus');
            $("#main-container .col-md-12").removeClass("col-md-12").addClass("col-md-9");
        }
    });

    // Set L3-Menu as Article Name On Top Of Article
    $('#article-name').text($("#doc-container h1").text());


    //
    // Expand \ collapse main menu
    //

    var $html               = $("html"),
        $mainMenu           = $("#main-menu"),
        isMainMenuExpanded  = false,
        collapseMainMenu    = function() {
            $mainMenu.removeClass("expanded");
            isMainMenuExpanded = false;
        };

    $("#main-menu-tab").click(function(event) {
        event.stopPropagation();

        // If menu is collapsed, expand it and listen to external clicks
        if (!isMainMenuExpanded) {
            $mainMenu.addClass("expanded");
            $html.one("click.soomlaMainMenu", collapseMainMenu);
            isMainMenuExpanded = true;

        } else {

            // If menu is expanded, stop listening to external clicks and collapse
            $html.off("soomlaMainMenu");
            collapseMainMenu();
        }
    });



    //
    // Move article nav to header on scroll
    //

    var $hierarchyNav = $("#hierarchy-nav");

    if ($hierarchyNav.length) {
        var articleNavTop   = $hierarchyNav.offset().top,
            $articlePosition= $("#knowledge-navbar .container"),
            $headerPosition = $("#main-container .row:first .col-md-9"),
            $window         = $(window),
            inHeader        = false;

        $window.on("scroll.article", function() {
            if ($hierarchyNav.length) {

                // If the article nav is scrolled out of view...
                if ($window.scrollTop() >= articleNavTop) {

                    // If it's not in the header yet, move it there
                    if (!inHeader) {
                        $hierarchyNav.prependTo($articlePosition);
                        inHeader = true;
                    }

                    // otherwise the article
                } else {

                    if (inHeader) {
                        $hierarchyNav.appendTo($headerPosition);
                        inHeader = false;
                    }
                }
            }
        });
    }
});