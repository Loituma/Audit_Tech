jQuery(function (a) {
    function s(s) {
        "resize" === s.type && (a(e.BODY).removeClass(r.DROPDOWN_OPEN), a(e.BASE).find(".navbar-collapse").removeClass("show"), a(e.BASE).removeClass(r.OPENED).find(e.TOGGLER).each(function () {
            a(a(this).attr("data-target")).removeClass(r.IN).add(this).attr("aria-expanded", "false")
        }));
        var o = a(this).scrollTop();
        a(e.BASE).each(function () {
            a(this).is(e.FIXED_TOP) && (a(this).is(e.TRANSPARENT) && !a(this).hasClass(r.OPENED) && (o > 0 ? a(this).removeClass(r.BG_COLOR) : a(this).addClass(r.BG_COLOR)), o > 0 ? a(this).addClass(r.SHORT) : a(this).removeClass(r.SHORT))
        })
    }

    var o, r = {IN: "in", OPENED: "opened", BG_COLOR: "bg-color", DROPDOWN_OPEN: "navbar-dropdown-open", SHORT: "navbar-short"}, e = {BODY: "body", BASE: ".navbar-dropdown", TOGGLER: '.navbar-toggler[aria-expanded="true"]', TRANSPARENT: ".transparent", FIXED_TOP: ".navbar-fixed-top"};
    a(window).on("scroll.bs.navbar-dropdown.data-api resize.bs.navbar-dropdown.data-api", function (a) {
        clearTimeout(o), o = setTimeout(function () {
            s(a)
        }, 10)
    }).trigger("scroll.bs.navbar-dropdown.data-api"), a(document).on("click.bs.navbar-dropdown.data-api", e.BASE, function (a) {
        a.targetWrapper = this
    }).on("show.bs.collapse hide.bs.collapse", function (s) {
        a(s.target).closest(e.BASE).each(function () {
            "show" == s.type ? (a(e.BODY).addClass(r.DROPDOWN_OPEN), a(this).addClass(r.OPENED)) : (a(e.BODY).removeClass(r.DROPDOWN_OPEN), a(this).removeClass(r.OPENED), a(window).trigger("scroll.bs.navbar-dropdown.data-api"), a(this).trigger("collapse.bs.navbar-dropdown"))
        })
    }).on("collapse.bs.nav-dropdown", function (s) {
        a(s.relatedTarget).closest(e.BASE).find(e.TOGGLER).trigger("click")
    })
});