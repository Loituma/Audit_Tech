!function (t) {
    var e = t.fn.navDropdown, n = {ESC: 27, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40}, o = {XS: 544, SM: 768, MD: 992, LG: 1200, XL: 1 / 0}, r = function () {
        function e(e, n) {
            "length" in e || (e = [e]), this.props = {}, this.length = e.length, n && (this.prevItem = n, t.extend(this.props, n.props));
            for (var o = 0; o < e.length; o++) this[o] = e[o]
        }

        return e.prototype.eq = function (t) {
            return new e(this[t] ? this[t] : [], this)
        }, e.prototype.parent = function () {
            return new e(t(this).map(function () {
                var n = new e(this);
                return n.is(":upper") ? null : t(n.is(":toggle") ? this.parentNode.parentNode : this).closest(".dropdown").find('>[data-toggle="dropdown-submenu"]')[0]
            }), this)
        }, e.prototype.parents = function (n) {
            var o = t(this).map(function () {
                return new e(this).is(":toggle") ? this.parentNode : this
            }).parentsUntil(".nav-dropdown", ".dropdown");
            return ":upper" === n && (o = o.last()), o = o.find('>[data-toggle="dropdown-submenu"]'), new e(o, this)
        }, e.prototype.children = function (n) {
            var o = [];
            return t(this).each(function () {
                var r, s = new e(this);
                if (s.is(":root")) r = t(this); else {
                    if (!s.is(":toggle")) return;
                    r = t(this).parent().find(">.dropdown-menu")
                }
                (n ? r.find("a") : s.is(":root") ? r.find(">li>a") : r.find(">a, >.dropdown>a")).each(function () {
                    n && !this.offsetWidth && !this.offsetHeight || this.disabled || t(this).is("[data-button]") || t(this).hasClass("disabled") || ~t.inArray(this, o) || o.push(this)
                })
            }), new e(o, this)
        }, e.prototype.root = function () {
            return new e(t(this).closest(".nav-dropdown"), this)
        }, e.prototype.jump = function (n) {
            if (n = n || "next", !this.length) return new e([], this);
            var o;
            o = this.eq(0), o = this.is(":flat") || o.is(":upper") ? o.root().children(this.is(":flat")) : o.parent().children();
            var r = t.inArray(this[0], o);
            if (!o.length || !~r) return new e([], this);
            if ("next" == n) {
                if (r += 1, r < o.length) return new e(o[r], this);
                n = "first"
            }
            else if ("prev" == n) {
                if (--r, r >= 0) return new e(o[r], this);
                n = "last"
            }
            return "first" == n ? new e(o[0], this) : "last" == n ? new e(o[o.length - 1], this) : new e([], this)
        }, e.prototype.next = function () {
            return this.jump("next")
        }, e.prototype.prev = function () {
            return this.jump("prev")
        }, e.prototype.first = function () {
            return this.jump("first")
        }, e.prototype.last = function () {
            return this.jump("last")
        }, e.prototype.prop = function (e, n) {
            return arguments.length ? 1 < arguments.length ? (this.props[e] = n, this) : "object" == typeof arguments[0] ? (t.extend(this.props, arguments[0]), this) : e in this.props ? this.props[e] : null : t.extend({}, this.props)
        }, e.prototype.removeProp = function (t) {
            return delete this.props[t], this
        }, e.prototype.is = function (e) {
            for (var n = t(this), o = (e || "").split(/(?=[*#.\[:\s])/); e = o.pop();) switch (e) {
                case":root":
                    if (!n.is(".nav-dropdown")) return !1;
                    break;
                case":upper":
                    if (!n.parent().parent().is(".nav-dropdown")) return !1;
                    break;
                case":opened":
                case":closed":
                    if (":opened" == e != n.parent().hasClass("open")) return !1;
                case":toggle":
                    if (!n.is('[data-toggle="dropdown-submenu"]')) return !1;
                    break;
                default:
                    if (!this.props[e]) return !1
            }
            return !0
        }, e.prototype.open = function () {
            return this.is(":closed") && this.click(), this
        }, e.prototype.close = function () {
            return this.is(":opened") && this.click(), this
        }, e.prototype.focus = function () {
            return this.length && this[0].focus(), this
        }, e.prototype.click = function () {
            return this.length && t(this[0]).trigger("click"), this
        }, function (t) {
            return new e(t)
        }
    }(), s = function (e) {
        this._element = e, t(this._element).on("click.bs.nav-dropdown", this.toggle)
    };
    s.prototype.toggle = function (e) {
        if (this.disabled || t(this).hasClass("disabled")) return !1;
        e = t(this.parentNode);
        var n = e.hasClass("open"), o = s._isCollapsed(t(this).closest(".nav-dropdown"));
        return s._clearMenus(t.Event("click", {
            target: this,
            data: {toggles: o ? [this] : null}
        })), n ? !1 : ("ontouchstart" in document.documentElement && !e.closest(".dropdown.open").length && (n = document.createElement("div"), n.className = "dropdown-backdrop", t(n).insertBefore(t(this).closest(".nav-dropdown")), t(n).on("click", s._clearMenus)), n = {relatedTarget: this}, o = t.Event("show.bs.nav-dropdown", n), e.trigger(o), o.isDefaultPrevented() ? !1 : (this.focus(), this.setAttribute("aria-expanded", "true"), e.toggleClass("open"), e.trigger(t.Event("shown.bs.nav-dropdown", n)), !1))
    }, s.prototype.dispose = function () {
        t.removeData(this._element, "bs.nav-dropdown"), t(this._element).off(".bs.nav-dropdown"), this._element = null
    }, s._clearMenus = function (e) {
        if (e = e || {}, 3 !== e.which) {
            var n, o = function () {
                return !1
            };
            if (e.target) {
                if (this === document) if (t(e.target).is("a:not([disabled], .disabled)")) n = t.Event("collapse.bs.nav-dropdown", {relatedTarget: e.target}); else {
                    var r = e.targetWrapper && t(e.targetWrapper).find(".nav-dropdown") || t(e.target).closest(".nav-dropdown");
                    if (s._isCollapsed(r)) return
                } else if (t(e.target).hasClass("dropdown-backdrop") && (r = t(e.target).next(), r.is(".nav-dropdown") && s._isCollapsed(r))) return;
                t(e.target).is('[data-toggle="dropdown-submenu"]') ? o = t(e.target.parentNode).parents(".dropdown").find('>[data-toggle="dropdown-submenu"]') : t(".dropdown-backdrop").remove()
            }
            for (o = e.data && e.data.toggles && t(e.data.toggles).parent().find('[data-toggle="dropdown-submenu"]') || t.makeArray(t('[data-toggle="dropdown-submenu"]').not(o)), r = 0; r < o.length; r++) {
                var i = o[r].parentNode, a = {relatedTarget: o[r]};
                if (t(i).hasClass("open") && ("click" !== e.type || !/input|textarea/i.test(e.target.tagName) || !t.contains(i, e.target))) {
                    var d = t.Event("hide.bs.nav-dropdown", a);
                    t(i).trigger(d), d.isDefaultPrevented() || (o[r].setAttribute("aria-expanded", "false"), t(i).removeClass("open").trigger(t.Event("hidden.bs.nav-dropdown", a)))
                }
            }
            n && t(document).trigger(n)
        }
    }, s._dataApiKeydownHandler = function (e) {
        if (!/input|textarea/i.test(e.target.tagName)) {
            var o, i;
            for (i in n) if (o = n[i] === e.which) break;
            o && (e.preventDefault(), e.stopPropagation(), e.which == n.ESC ? s._isCollapsed(this) || (e = t(e.target).parents(".dropdown.open").last().find('>[data-toggle="dropdown-submenu"]'), s._clearMenus(), e.trigger("focus")) : "A" == e.target.tagName && (o = r(e.target), o.prop(":flat", s._isCollapsed(o.root())), o.is(":flat") ? e.which === n.DOWN || e.which === n.UP ? o[e.which === n.UP ? "prev" : "next"]().focus() : e.which === n.LEFT ? o.is(":opened") ? o.close() : o.parent().close().focus() : e.which === n.RIGHT && o.is(":toggle") && o.open() : o.is(":upper") ? e.which === n.LEFT || e.which === n.RIGHT ? (o[e.which === n.LEFT ? "prev" : "next"]().focus().open(), o.is(":toggle") && o.close()) : e.which !== n.DOWN && e.which !== n.UP || !o.is(":toggle") || o.children()[e.which === n.DOWN ? "first" : "last"]().focus() : e.which === n.LEFT ? (e = o.parent(), e.is(":upper") ? e.close().prev().focus().open() : e.focus().close()) : e.which === n.RIGHT ? (e = o.children(), e.length ? (o.open(), e.first().focus()) : o.parents(":upper").close().next().focus().open()) : e.which !== n.DOWN && e.which !== n.UP || o[e.which === n.UP ? "prev" : "next"]().focus()))
        }
    }, s._isCollapsed = function (t) {
        var e;
        return t.length && (t = t[0]), t && (e = /navbar-toggleable-(xs|sm|md|lg|xl)/.exec(t.className)) && window.innerWidth < o[e[1].toUpperCase()]
    }, s._dataApiResizeHandler = function () {
        t(".nav-dropdown").each(function () {
            var e = s._isCollapsed(this);
            t(this).find(".dropdown").removeClass("open"), t(this).find('[aria-expanded="true"]').attr("aria-expanded", "false");
            var n = t(".dropdown-backdrop")[0];
            n && n.parentNode.removeChild(n), e != t(this).hasClass("nav-dropdown-sm") && (e ? t(this).addClass("nav-dropdown-sm") : t(this).removeClass("nav-dropdown-sm"))
        })
    }, t.fn.navDropdown = function (e) {
        return this.each(function () {
            var n = t(this).data("bs.nav-dropdown");
            if (n || t(this).data("bs.nav-dropdown", n = new s(this)), "string" == typeof e) {
                if (void 0 === n[e]) throw Error('No method named "' + e + '"');
                n[e].call(this)
            }
        })
    }, t.fn.navDropdown.noConflict = function () {
        return t.fn.navDropdown = e, this
    }, t.fn.navDropdown.Constructor = s, t.fn.navDropdown.$$ = r, t(window).on("resize.bs.nav-dropdown.data-api ready.bs.nav-dropdown.data-api", s._dataApiResizeHandler), t(document).on("keydown.bs.nav-dropdown.data-api", ".nav-dropdown", s._dataApiKeydownHandler).on("collapse.bs.navbar-dropdown", s._clearMenus).on("click.bs.nav-dropdown.data-api", s._clearMenus).on("click.bs.nav-dropdown.data-api", '[data-toggle="dropdown-submenu"]', s.prototype.toggle).on("click.bs.nav-dropdown.data-api", ".dropdown form", function (t) {
        t.stopPropagation()
    }), t(window).trigger("ready.bs.nav-dropdown")
}(jQuery);