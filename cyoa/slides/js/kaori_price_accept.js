﻿
Slides.kaori_price_accept = new Slide();

var SVG = null;

Slides.kaori_price_accept.Load = function () {

    var d = $.Deferred();

    //Make sure to add <div id="svgcontainer"></div> 
    $("#svgcontainer").svg(function (svg) {
        var svgsToLoad = [];

        SVG = svg;

        svgsToLoad.push(LoadSvg(svg, "/slides/resources/price_person.svg"));

        $.when.apply($, svgsToLoad).done(function () {
            d.resolve();
        });
    });

    return d.promise();
};

Slides.kaori_price_accept.Unload = function () {
};

Slides.kaori_price_accept.Show = function () {

    SVG.configure({ viewBox: "0 0 620 460" })

    var person = $("g#person").detach();

    var radius = 102;

    var centerX = 310;
    var centerY = 230;

    var incDeg = (2 * Math.PI) / 18;


    var earth = SVG.circle(310, 230, 100, { fill: "#1a1a1a" });

    var g = SVG.group();

    for (var i = 0; i < 18; i++) {
        var c = person.clone();
        c.attr("opacity", "0")
        var posX = (Math.cos(incDeg * i) * radius) + centerX;
        var posY = (Math.sin(incDeg * i) * radius) + centerY;

        var rot = ((incDeg * i) + Math.PI/2) * (180 / Math.PI)
       
        c.attr("transform", "translate({x},{y}) rotate({r})".supplant({ x: posX, y: posY, r: rot}));
        
        c.delay(250 * i).queue(function () { $(this).attr("opacity", "1"); });

        c.appendTo(g);
    }

    $(g).attr("transform", "rotate(0, 310, 230)");
    function harmony() {
        $(g).animate({ svgTransform: "rotate(360, 310, 230)" }, 5000, "linear", function () {
            $(g).attr("transform", "rotate(0, 310, 230)");
            harmony();
        })
    }

    setTimeout(function () {
        harmony();
        $(g).find("*").delay(3000).animate({ svgFill: "#fff" }, 5000).animate({ svgFill: "#f00" }, 5000);
        $(earth).delay(3000).animate({ svgFill: "#fff" }, 3000).animate({ svgFill: "#f00" }, 3000);
    }, 250 * 18);

    
};

Slides.kaori_price_accept.Hide = function () {
    return $("figure").fadeOut().promise();
};

