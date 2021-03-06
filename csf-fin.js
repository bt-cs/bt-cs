! function(e, t, n, i) {
    "use strict";
    var c = c || {};
    c.funcs = {}, c.vars = {
        onloaded: !1,
        $body: e("body"),
        $window: e(t),
        $document: e(n),
        is_rtl: e("body").hasClass("rtl"),
        code_themes: []
    }, c.helper = {
        uid: function(e) {
            return (e || "") + Math.random().toString(36).substr(2, 9)
        },
        preg_quote: function(e) {
            return (e + "").replace(/(\[|\-|\])/g, "\\$1")
        },
        name_nested_replace: function(t, n) {
            var i = new RegExp("(" + c.helper.preg_quote(n) + ")\\[(\\d+)\\]", "g");
            t.find(":radio").each(function() {
                (this.checked || this.orginal_checked) && (this.orginal_checked = !0)
            }), t.each(function(t) {
                e(this).find(":input").each(function() {
                    this.name = this.name.replace(i, n + "[" + t + "]"), this.orginal_checked && (this.checked = !0)
                })
            })
        },
        debounce: function(e, t, n) {
            var i;
            return function() {
                var c = this,
                    s = arguments,
                    a = n && !i;
                clearTimeout(i), i = setTimeout(function() {
                    i = null, n || e.apply(c, s)
                }, t), a && e.apply(c, s)
            }
        },
        get_cookie: function(e) {
            var t, i, c = n.cookie,
                s = e + "=";
            if (c) {
                if (-1 === (i = c.indexOf("; " + s))) {
                    if (0 !== (i = c.indexOf(s))) return null
                } else i += 2;
                return -1 === (t = c.indexOf(";", i)) && (t = c.length), decodeURIComponent(c.substring(i + s.length, t))
            }
        },
        set_cookie: function(e, t, i, c, s, a) {
            var r = new Date;
            "object" == typeof i && i.toGMTString ? i = i.toGMTString() : parseInt(i, 10) ? (r.setTime(r.getTime() + 1e3 * parseInt(i, 10)), i = r.toGMTString()) : i = "", n.cookie = e + "=" + encodeURIComponent(t) + (i ? "; expires=" + i : "") + (c ? "; path=" + c : "") + (s ? "; domain=" + s : "") + (a ? "; secure" : "")
        },
        remove_cookie: function(e, t, n, i) {
            c.helper.set_cookie(e, "", -1e3, t, n, i)
        }
    }, e.fn.csf_clone = function() {
        for (var t = e.fn.clone.apply(this, arguments), n = this.find("select").add(this.filter("select")), i = t.find("select").add(t.filter("select")), c = 0; c < n.length; ++c)
            for (var s = 0; s < n[c].options.length; ++s) !0 === n[c].options[s].selected && (i[c].options[s].selected = !0);
        return this.find(":radio").each(function() {
            this.orginal_checked = this.checked
        }), t
    }, e.fn.csf_expand_all = function() {
        return this.each(function() {
            e(this).on("click", function(t) {
                t.preventDefault(), e(".csf-wrapper").toggleClass("csf-show-all"), e(".csf-section").csf_reload_script(), e(this).find(".fa").toggleClass("fa-indent").toggleClass("fa-outdent")
            })
        })
    }, e.fn.csf_nav_options = function() {
        return this.each(function() {
            var n, c = e(this),
                s = c.find("a"),
                a = c.closest(".csf").find(".csf-section-id");
            e(t).on("hashchange", function() {
                var c = t.location.hash.match(new RegExp("tab=([^&]*)")),
                    r = c ? c[1] : s.first().attr("href").replace("#tab=", ""),
                    o = e("#csf-tab-link-" + r);
                if (o.length > 0) {
                    o.closest(".csf-tab-depth-0").addClass("csf-tab-active").siblings().removeClass("csf-tab-active"), s.removeClass("csf-section-active"), o.addClass("csf-section-active"), n !== i && n.hide();
                    var f = e("#csf-section-" + r);
                    f.css({
                        display: "block"
                    }), f.csf_reload_script(), a.val(r), n = f
                }
            }).trigger("hashchange")
        })
    }, e.fn.csf_nav_metabox = function() {
        return this.each(function() {
            var t, n, s = e(this),
                a = s.find("a"),
                r = s.data("unique"),
                o = e("#post_ID").val() || "global";
            a.on("click", function(s) {
                s.preventDefault();
                var a = e(this),
                    f = a.data("section");
                n !== i && n.removeClass("csf-section-active"), t !== i && t.hide(), a.addClass("csf-section-active");
                var l = e("#csf-section-" + f);
                l.css({
                    display: "block"
                }), l.csf_reload_script(), c.helper.set_cookie("csf-last-metabox-tab-" + o + "-" + r, f), t = l, n = a
            });
            var f = c.helper.get_cookie("csf-last-metabox-tab-" + o + "-" + r);
            f ? s.find('a[data-section="' + f + '"]').trigger("click") : a.first("a").trigger("click")
        })
    }, e.fn.csf_page_templates = function() {
        this.length && e(n).on("change", ".editor-page-attributes__template select, #page_template", function() {
            var t = e(this).val() || "default";
            e(".csf-page-templates").removeClass("csf-show").addClass("csf-hide"), e(".csf-page-" + t.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-")).removeClass("csf-hide").addClass("csf-show")
        })
    }, e.fn.csf_post_formats = function() {
        this.length && e(n).on("change", '.editor-post-format select, #formatdiv input[name="post_format"]', function() {
            var t = e(this).val() || "default";
            t = "0" === t ? "default" : t, e(".csf-post-formats").removeClass("csf-show").addClass("csf-hide"), e(".csf-post-format-" + t).removeClass("csf-hide").addClass("csf-show")
        })
    }, e.fn.csf_search = function() {
        return this.each(function() {
            e(this).find("input").on("change keyup", function() {
                var t = e(this).val(),
                    n = e(".csf-wrapper"),
                    i = n.find(".csf-section").find("> .csf-field:not(.hidden)"),
                    c = i.find("> .csf-title, .csf-search-tags");
                t.length > 3 ? (i.addClass("csf-hidden"), n.addClass("csf-search-all"), c.each(function() {
                    var n = e(this);
                    if (n.text().match(new RegExp(".*?" + t + ".*?", "i"))) {
                        var i = n.closest(".csf-field");
                        i.removeClass("csf-hidden"), i.parent().csf_reload_script()
                    }
                })) : (i.removeClass("csf-hidden"), n.removeClass("csf-search-all"))
            })
        })
    }, e.fn.csf_sticky = function() {
        return this.each(function() {
            var i = e(this),
                c = e(t),
                s = i.find(".csf-header-inner"),
                a = parseInt(s.css("padding-left")) + parseInt(s.css("padding-right")),
                r = 0,
                o = !1,
                f = function() {
                    o || requestAnimationFrame(function() {
                        var e, c, f;
                        e = i.offset().top, c = Math.max(32, e - r), f = Math.max(n.documentElement.clientWidth, t.innerWidth || 0), c <= 32 && f > 782 ? (s.css({
                            width: i.outerWidth() - a
                        }), i.css({
                            height: i.outerHeight()
                        }).addClass("csf-sticky")) : (s.removeAttr("style"), i.removeAttr("style").removeClass("csf-sticky")), o = !1
                    }), o = !0
                },
                l = function() {
                    r = c.scrollTop(), f()
                };
            c.on("scroll resize", l), l()
        })
    }, e.fn.csf_dependency = function() {
        return this.each(function() {
            var t = e(this),
                n = e.csf_deps.createRuleset(),
                i = [],
                s = !1;
            t.children("[data-controller]").each(function() {
                var t = e(this),
                    c = t.data("controller").split("|"),
                    a = t.data("condition").split("|"),
                    r = t.data("value").toString().split("|"),
                    o = n;
                t.data("depend-global") && (s = !0), e.each(c, function(e, n) {
                    var c = r[e] || "",
                        s = a[e] || a[0];
                    (o = o.createRule('[data-depend-id="' + n + '"]', s, c)).include(t), i.push(n)
                })
            }), i.length && (s ? e.csf_deps.enable(c.vars.$body, n, i) : e.csf_deps.enable(t, n, i))
        })
    }, e.fn.csf_field_accordion = function() {
        return this.each(function() {
            e(this).find(".csf-accordion-title").on("click", function() {
                var t = e(this),
                    n = t.find(".csf-accordion-icon"),
                    i = t.next();
                n.hasClass("fa-angle-right") ? n.removeClass("fa-angle-right").addClass("fa-angle-down") : n.removeClass("fa-angle-down").addClass("fa-angle-right"), i.data("opened") || (i.csf_reload_script(), i.data("opened", !0)), i.toggleClass("csf-accordion-open")
            })
        })
    }, e.fn.csf_field_backup = function() {
        return this.each(function() {
            if (t.wp.customize !== i) {
                var n = this,
                    s = e(this),
                    a = (e("body"), s.find(".csf-import")),
                    r = s.find(".csf-reset");
                n.notification = function(e) {
                    wp.customize.notifications && wp.customize.OverlayNotification && (wp.customize.state("saved").get() || (wp.customize.state("changesetStatus").set("trash"), wp.customize.each(function(e) {
                        e._dirty = !1
                    }), wp.customize.state("saved").set(!0)), wp.customize.notifications.add(new wp.customize.OverlayNotification("csf_field_backup_notification", {
                        type: "info",
                        message: e,
                        loading: !0
                    })))
                }, r.on("click", function(e) {
                    e.preventDefault(), c.vars.is_confirm && (n.notification(t.csf_vars.i18n.reset_notification), t.wp.ajax.post("csf-reset", {
                        unique: r.data("unique"),
                        nonce: r.data("nonce")
                    }).done(function(e) {
                        t.location.reload(!0)
                    }).fail(function(e) {
                        alert(e.error), wp.customize.notifications.remove("csf_field_backup_notification")
                    }))
                }), a.on("click", function(e) {
                    e.preventDefault(), c.vars.is_confirm && (n.notification(t.csf_vars.i18n.import_notification), t.wp.ajax.post("csf-import", {
                        unique: a.data("unique"),
                        nonce: a.data("nonce"),
                        import_data: s.find(".csf-import-data").val()
                    }).done(function(e) {
                        t.location.reload(!0)
                    }).fail(function(e) {
                        alert(e.error), wp.customize.notifications.remove("csf_field_backup_notification")
                    }))
                })
            }
        })
    }, e.fn.csf_field_background = function() {
        return this.each(function() {
            e(this).find(".csf--media").csf_reload_script()
        })
    }, e.fn.csf_field_code_editor = function() {
        return this.each(function() {
            if ("function" == typeof CodeMirror) {
                var t = e(this),
                    n = t.find("textarea"),
                    i = t.find(".CodeMirror"),
                    s = n.data("editor");
                i.length && i.remove();
                var a = setInterval(function() {
                    if (t.is(":visible")) {
                        var i = CodeMirror.fromTextArea(n[0], s);
                        if ("default" !== s.theme && -1 === c.vars.code_themes.indexOf(s.theme)) {
                            var r = e("<link>");
                            e("#csf-codemirror-css").after(r), r.attr({
                                rel: "stylesheet",
                                id: "csf-codemirror-" + s.theme + "-css",
                                href: s.cdnURL + "/theme/" + s.theme + ".min.css",
                                type: "text/css",
                                media: "all"
                            }), c.vars.code_themes.push(s.theme)
                        }
                        CodeMirror.modeURL = s.cdnURL + "/mode/%N/%N.min.js", CodeMirror.autoLoadMode(i, s.mode), i.on("change", function(e, t) {
                            n.val(i.getValue()).trigger("change")
                        }), clearInterval(a)
                    }
                })
            }
        })
    }, e.fn.csf_field_date = function() {
        return this.each(function() {
            var t = e(this),
                n = t.find("input"),
                i = t.find(".csf-date-settings").data("settings"),
                c = {
                    showAnim: "",
                    beforeShow: function(t, n) {
                        e(n.dpDiv).addClass("csf-datepicker-wrapper")
                    },
                    onClose: function(t, n) {
                        e(n.dpDiv).removeClass("csf-datepicker-wrapper")
                    }
                };
            i = e.extend({}, i, c), 2 === n.length && (i = e.extend({}, i, {
                onSelect: function(t) {
                    e(this), n.first();
                    var c = n.first().attr("id") === e(this).attr("id") ? "minDate" : "maxDate",
                        s = e.datepicker.parseDate(i.dateFormat, t);
                    n.not(this).datepicker("option", c, s)
                }
            })), n.each(function() {
                var t = e(this);
                t.hasClass("hasDatepicker") && t.removeAttr("id").removeClass("hasDatepicker"), t.datepicker(i)
            })
        })
    }, e.fn.csf_field_fieldset = function() {
        return this.each(function() {
            e(this).find(".csf-fieldset-content").csf_reload_script()
        })
    }, e.fn.csf_field_gallery = function() {
        return this.each(function() {
            var n, i = e(this),
                c = i.find(".csf-edit-gallery"),
                s = i.find(".csf-clear-gallery"),
                a = i.find("ul"),
                r = i.find("input");
            i.find("img");
            i.on("click", ".csf-button, .csf-edit-gallery", function(i) {
                var o = e(this),
                    f = r.val(),
                    l = o.hasClass("csf-edit-gallery") ? "edit" : "add",
                    d = "add" !== l || f.length ? "gallery-edit" : "gallery";
                i.preventDefault(), void 0 !== t.wp && t.wp.media && t.wp.media.gallery && ("gallery" === d ? (n = t.wp.media({
                    library: {
                        type: "image"
                    },
                    frame: "post",
                    state: "gallery",
                    multiple: !0
                })).open() : (n = t.wp.media.gallery.edit('[gallery ids="' + f + '"]'), "add" === l && n.setState("gallery-library")), n.on("update", function(e) {
                    a.empty();
                    var t = e.models.map(function(e) {
                        var t = e.toJSON(),
                            n = void 0 !== t.sizes.thumbnail ? t.sizes.thumbnail.url : t.url;
                        return a.append('<li><img src="' + n + '"></li>'), t.id
                    });
                    r.val(t.join(",")).trigger("change"), s.removeClass("hidden"), c.removeClass("hidden")
                }))
            }), s.on("click", function(e) {
                e.preventDefault(), a.empty(), r.val("").trigger("change"), s.addClass("hidden"), c.addClass("hidden")
            })
        })
    }, e.fn.csf_field_group = function() {
        return this.each(function() {
            var t = e(this),
                n = t.children(".csf-fieldset"),
                i = n.length ? n : t,
                s = i.children(".csf-cloneable-wrapper"),
                a = i.children(".csf-cloneable-hidden"),
                r = i.children(".csf-cloneable-max"),
                o = i.children(".csf-cloneable-min"),
                f = s.data("field-id"),
                l = s.data("unique-id"),
                d = Boolean(Number(s.data("title-number"))),
                h = parseInt(s.data("max")),
                p = parseInt(s.data("min"));
            s.hasClass("ui-accordion") && s.find(".ui-accordion-header-icon").remove();
            var u = function(t) {
                t.find(".csf-cloneable-title-number").each(function(t) {
                    e(this).html(e(this).closest(".csf-cloneable-item").index() + 1 + ".")
                })
            };
            s.accordion({
                header: "> .csf-cloneable-item > .csf-cloneable-title",
                collapsible: !0,
                active: !1,
                animate: !1,
                heightStyle: "content",
                icons: {
                    header: "csf-cloneable-header-icon fa fa-angle-right",
                    activeHeader: "csf-cloneable-header-icon fa fa-angle-down"
                },
                activate: function(e, t) {
                    var n = t.newPanel,
                        i = t.newHeader;
                    if (n.length && !n.data("opened")) {
                        var c = n.children().first().find(":input").first(),
                            s = i.find(".csf-cloneable-value");
                        c.on("keyup", function(e) {
                            s.text(c.val())
                        }), n.csf_reload_script(), n.data("opened", !0), n.data("retry", !1)
                    } else n.data("retry") && (n.csf_reload_script_retry(), n.data("retry", !1))
                }
            }), s.sortable({
                axis: "y",
                handle: ".csf-cloneable-title,.csf-cloneable-sort",
                helper: "original",
                cursor: "move",
                placeholder: "widget-placeholder",
                start: function(e, t) {
                    s.accordion({
                        active: !1
                    }), s.sortable("refreshPositions"), t.item.children(".csf-cloneable-content").data("retry", !0)
                },
                update: function(e, t) {
                    c.helper.name_nested_replace(s.children(".csf-cloneable-item"), f), s.csf_customizer_refresh(), d && u(s)
                }
            }), i.children(".csf-cloneable-add").on("click", function(t) {
                t.preventDefault();
                var n = s.children(".csf-cloneable-item").length;
                if (o.hide(), h && n + 1 > h) r.show();
                else {
                    var i = l + f + "[" + n + "]",
                        c = a.csf_clone(!0);
                    c.removeClass("csf-cloneable-hidden"), c.find(":input").each(function() {
                        this.name = i + this.name.replace(this.name.startsWith("_nonce") ? "_nonce" : l, "")
                    }), c.find(".csf-data-wrapper").each(function() {
                        e(this).attr("data-unique-id", i)
                    }), s.append(c), s.accordion("refresh"), s.accordion({
                        active: n
                    }), s.csf_customizer_refresh(), s.csf_customizer_listen({
                        closest: !0
                    }), d && u(s)
                }
            });
            var v = function(t) {
                t.preventDefault();
                var n = s.children(".csf-cloneable-item").length;
                if (o.hide(), h && n + 1 > h) r.show();
                else {
                    var i = e(this).parent().parent(),
                        a = i.children(".csf-cloneable-helper").csf_clone(!0),
                        l = i.children(".csf-cloneable-title").csf_clone(),
                        p = i.children(".csf-cloneable-content").csf_clone(),
                        v = new RegExp("(" + c.helper.preg_quote(f) + ")\\[(\\d+)\\]", "g");
                    p.find(".csf-data-wrapper").each(function() {
                        var t = e(this);
                        t.attr("data-unique-id", t.attr("data-unique-id").replace(v, f + "[" + (i.index() + 1) + "]"))
                    });
                    var g = e('<div class="csf-cloneable-item" />');
                    g.append(a), g.append(l), g.append(p), s.children().eq(i.index()).after(g), c.helper.name_nested_replace(s.children(".csf-cloneable-item"), f), s.accordion("refresh"), s.csf_customizer_refresh(), s.csf_customizer_listen({
                        closest: !0
                    }), d && u(s)
                }
            };
            s.children(".csf-cloneable-item").children(".csf-cloneable-helper").on("click", ".csf-cloneable-clone", v), i.children(".csf-cloneable-hidden").children(".csf-cloneable-helper").on("click", ".csf-cloneable-clone", v);
            var g = function(t) {
                t.preventDefault();
                var n = s.children(".csf-cloneable-item").length;
                r.hide(), o.hide(), p && n - 1 < p ? o.show() : (e(this).closest(".csf-cloneable-item").remove(), c.helper.name_nested_replace(s.children(".csf-cloneable-item"), f), s.csf_customizer_refresh(), d && u(s))
            };
            s.children(".csf-cloneable-item").children(".csf-cloneable-helper").on("click", ".csf-cloneable-remove", g), i.children(".csf-cloneable-hidden").children(".csf-cloneable-helper").on("click", ".csf-cloneable-remove", g)
        })
    }, e.fn.csf_field_icon = function() {
        return this.each(function() {
            var n = e(this);
            n.on("click", ".csf-icon-add", function(i) {
                i.preventDefault();
                var s = e(this),
                    a = e("#csf-modal-icon");
                a.show(), c.vars.$icon_target = n, c.vars.icon_modal_loaded || (a.find(".csf-modal-loading").show(), t.wp.ajax.post("csf-get-icons", {
                    nonce: s.data("nonce")
                }).done(function(t) {
                    a.find(".csf-modal-loading").hide(), c.vars.icon_modal_loaded = !0;
                    var n = a.find(".csf-modal-load").html(t.content);
                    n.on("click", "a", function(t) {
                        t.preventDefault();
                        var n = e(this).data("csf-icon");
                        c.vars.$icon_target.find("i").removeAttr("class").addClass(n), c.vars.$icon_target.find("input").val(n).trigger("change"), c.vars.$icon_target.find(".csf-icon-preview").removeClass("hidden"), c.vars.$icon_target.find(".csf-icon-remove").removeClass("hidden"), a.hide()
                    }), a.on("change keyup", ".csf-icon-search", function() {
                        var t = e(this).val();
                        n.find("a").each(function() {
                            var n = e(this);
                            n.data("csf-icon").search(new RegExp(t, "i")) < 0 ? n.hide() : n.show()
                        })
                    }), a.on("click", ".csf-modal-close, .csf-modal-overlay", function() {
                        a.hide()
                    })
                }))
            }), n.on("click", ".csf-icon-remove", function(t) {
                t.preventDefault(), n.find(".csf-icon-preview").addClass("hidden"), n.find("input").val("").trigger("change"), e(this).addClass("hidden")
            })
        })
    }, e.fn.csf_field_media = function() {
        return this.each(function() {
            var n, i = e(this),
                c = i.find(".csf--button"),
                s = i.find(".csf--remove"),
                a = c.data("library") && c.data("library").split(",") || "";
            c.on("click", function(e) {
                e.preventDefault(), void 0 !== t.wp && t.wp.media && t.wp.media.gallery && (n ? n.open() : ((n = t.wp.media({
                    library: {
                        type: a
                    }
                })).on("select", function() {
                    var e, t = n.state().get("selection").first().attributes,
                        a = c.data("preview-size") || "thumbnail";
                    i.find(".csf--url").val(t.url), i.find(".csf--id").val(t.id), i.find(".csf--width").val(t.width), i.find(".csf--height").val(t.height), i.find(".csf--alt").val(t.alt), i.find(".csf--title").val(t.title), i.find(".csf--description").val(t.description), e = void 0 !== t.sizes && void 0 !== t.sizes.thumbnail && "thumbnail" === a ? t.sizes.thumbnail.url : void 0 !== t.sizes && void 0 !== t.sizes.full ? t.sizes.full.url : t.icon, s.removeClass("hidden"), i.find(".csf--preview").removeClass("hidden"), i.find(".csf--src").attr("src", e), i.find(".csf--thumbnail").val(e).trigger("change")
                }), n.open()))
            }), s.on("click", function(e) {
                e.preventDefault(), s.addClass("hidden"), i.find(".csf--preview").addClass("hidden"), i.find("input").val(""), i.find(".csf--thumbnail").trigger("change")
            })
        })
    }, e.fn.csf_field_repeater = function() {
        return this.each(function() {
            var t = e(this),
                n = t.children(".csf-fieldset"),
                i = n.length ? n : t,
                s = i.children(".csf-repeater-wrapper"),
                a = i.children(".csf-repeater-hidden"),
                r = i.children(".csf-repeater-max"),
                o = i.children(".csf-repeater-min"),
                f = s.data("field-id"),
                l = s.data("unique-id"),
                d = parseInt(s.data("max")),
                h = parseInt(s.data("min"));
            s.children(".csf-repeater-item").children(".csf-repeater-content").csf_reload_script(), s.sortable({
                axis: "y",
                handle: ".csf-repeater-sort",
                helper: "original",
                cursor: "move",
                placeholder: "widget-placeholder",
                update: function(e, t) {
                    c.helper.name_nested_replace(s.children(".csf-repeater-item"), f), s.csf_customizer_refresh(), t.item.csf_reload_script_retry()
                }
            }), i.children(".csf-repeater-add").on("click", function(t) {
                t.preventDefault();
                var n = s.children(".csf-repeater-item").length;
                if (o.hide(), d && n + 1 > d) r.show();
                else {
                    var i = l + f + "[" + n + "]",
                        c = a.csf_clone(!0);
                    c.removeClass("csf-repeater-hidden"), c.find(":input").each(function() {
                        this.name = i + this.name.replace(this.name.startsWith("_nonce") ? "_nonce" : l, "")
                    }), c.find(".csf-data-wrapper").each(function() {
                        e(this).attr("data-unique-id", i)
                    }), s.append(c), c.children(".csf-repeater-content").csf_reload_script(), s.csf_customizer_refresh(), s.csf_customizer_listen({
                        closest: !0
                    })
                }
            });
            var p = function(t) {
                t.preventDefault();
                var n = s.children(".csf-repeater-item").length;
                if (o.hide(), d && n + 1 > d) r.show();
                else {
                    var i = e(this).parent().parent().parent(),
                        a = i.children(".csf-repeater-content").csf_clone(),
                        l = i.children(".csf-repeater-helper").csf_clone(!0),
                        h = new RegExp("(" + c.helper.preg_quote(f) + ")\\[(\\d+)\\]", "g");
                    a.find(".csf-data-wrapper").each(function() {
                        var t = e(this);
                        t.attr("data-unique-id", t.attr("data-unique-id").replace(h, f + "[" + (i.index() + 1) + "]"))
                    });
                    var p = e('<div class="csf-repeater-item" />');
                    p.append(a), p.append(l), s.children().eq(i.index()).after(p), p.children(".csf-repeater-content").csf_reload_script(), c.helper.name_nested_replace(s.children(".csf-repeater-item"), f), s.csf_customizer_refresh(), s.csf_customizer_listen({
                        closest: !0
                    })
                }
            };
            s.children(".csf-repeater-item").children(".csf-repeater-helper").on("click", ".csf-repeater-clone", p), i.children(".csf-repeater-hidden").children(".csf-repeater-helper").on("click", ".csf-repeater-clone", p);
            var u = function(t) {
                t.preventDefault();
                var n = s.children(".csf-repeater-item").length;
                r.hide(), o.hide(), h && n - 1 < h ? o.show() : (e(this).closest(".csf-repeater-item").remove(), c.helper.name_nested_replace(s.children(".csf-repeater-item"), f), s.csf_customizer_refresh())
            };
            s.children(".csf-repeater-item").children(".csf-repeater-helper").on("click", ".csf-repeater-remove", u), i.children(".csf-repeater-hidden").children(".csf-repeater-helper").on("click", ".csf-repeater-remove", u)
        })
    }, e.fn.csf_field_slider = function() {
        return this.each(function() {
            var t = e(this),
                n = t.find("input"),
                i = t.find(".csf-slider-ui"),
                c = n.data(),
                s = n.val() || 0;
            i.hasClass("ui-slider") && i.empty(), i.slider({
                range: "min",
                value: s,
                min: c.min,
                max: c.max,
                step: c.step,
                slide: function(e, t) {
                    n.val(t.value).trigger("change")
                }
            }), n.keyup(function() {
                i.slider("value", n.val())
            })
        })
    }, e.fn.csf_field_sortable = function() {
        return this.each(function() {
            var t = e(this).find(".csf--sortable");
            t.sortable({
                axis: "y",
                helper: "original",
                cursor: "move",
                placeholder: "widget-placeholder",
                update: function(e, n) {
                    t.csf_customizer_refresh()
                }
            }), t.find(".csf--sortable-content").csf_reload_script()
        })
    }, e.fn.csf_field_sorter = function() {
        return this.each(function() {
            var t = e(this),
                n = t.find(".csf-enabled"),
                i = t.find(".csf-disabled"),
                c = !!i.length && i;
            n.sortable({
                connectWith: c,
                placeholder: "ui-sortable-placeholder",
                update: function(e, n) {
                    var i = n.item.find("input");
                    n.item.parent().hasClass("csf-enabled") ? i.attr("name", i.attr("name").replace("disabled", "enabled")) : i.attr("name", i.attr("name").replace("enabled", "disabled")), t.csf_customizer_refresh()
                }
            }), c && c.sortable({
                connectWith: n,
                placeholder: "ui-sortable-placeholder",
                update: function(e, n) {
                    t.csf_customizer_refresh()
                }
            })
        })
    }, e.fn.csf_field_spinner = function() {
        return this.each(function() {
            var t = e(this),
                n = t.find("input"),
                i = t.find(".ui-spinner-button");
            i.length && i.remove(), n.spinner({
                max: n.data("max") || 100,
                min: n.data("min") || 0,
                step: n.data("step") || 1,
                spin: function(e, t) {
                    n.val(t.value).trigger("change")
                }
            })
        })
    }, e.fn.csf_field_switcher = function() {
        return this.each(function() {
            var t = e(this).find(".csf--switcher");
            t.on("click", function() {
                var e = 0,
                    n = t.find("input");
                t.hasClass("csf--active") ? t.removeClass("csf--active") : (e = 1, t.addClass("csf--active")), n.val(e).trigger("change")
            })
        })
    }, e.fn.csf_field_tabbed = function() {
        return this.each(function() {
            var t = e(this),
                n = t.find(".csf-tabbed-nav a"),
                i = t.find(".csf-tabbed-section");
            i.eq(0).csf_reload_script(), n.on("click", function(t) {
                t.preventDefault();
                var n = e(this),
                    c = n.index(),
                    s = i.eq(c);
                n.addClass("csf-tabbed-active").siblings().removeClass("csf-tabbed-active"), s.csf_reload_script(), s.removeClass("hidden").siblings().addClass("hidden")
            })
        })
    }, e.fn.csf_field_typography = function() {
        return this.each(function() {
            var t = this,
                n = e(this),
                i = [],
                s = csf_typography_json.webfonts,
                a = csf_typography_json.googlestyles,
                r = csf_typography_json.defaultstyles;
            t.sanitize_subset = function(e) {
                return e = (e = e.replace("-ext", " Extended")).charAt(0).toUpperCase() + e.slice(1)
            }, t.sanitize_style = function(e) {
                return a[e] ? a[e] : e
            }, t.load_google_font = function(e, t, n) {
                e && "object" == typeof WebFont && (t = t ? t.replace("normal", "") : "", n = n ? n.replace("normal", "") : "", (t || n) && (e = e + ":" + t + n), -1 === i.indexOf(e) && WebFont.load({
                    google: {
                        families: [e]
                    }
                }), i.push(e))
            }, t.append_select_options = function(n, i, c, s, a) {
                n.find("option").not(":first").remove();
                var r = "";
                e.each(i, function(e, n) {
                    var i, o = n;
                    i = a ? c && -1 !== c.indexOf(n) ? " selected" : "" : c && c === n ? " selected" : "", "subset" === s ? o = t.sanitize_subset(n) : "style" === s && (o = t.sanitize_style(n)), r += '<option value="' + n + '"' + i + ">" + o + "</option>"
                }), n.append(r).trigger("csf.change").trigger("chosen:updated")
            }, t.init = function() {
                var i = [],
                    a = n.find(".csf--typography"),
                    o = n.find(".csf--type"),
                    f = a.data("unit"),
                    l = a.data("exclude") ? a.data("exclude").split(",") : [];
                n.find(".csf--chosen").length && n.find("select").each(function() {
                    var t = e(this),
                        n = t.parent().find(".chosen-container");
                    n.length && n.remove(), t.chosen({
                        allow_single_deselect: !0,
                        disable_search_threshold: 15,
                        width: "100%"
                    })
                });
                var d = n.find(".csf--font-family"),
                    h = d.val();
                d.find("option").not(":first-child").remove();
                var p = "";
                e.each(s, function(t, n) {
                    l && -1 !== l.indexOf(t) || (p += '<optgroup label="' + n.label + '">', e.each(n.fonts, function(e, n) {
                        p += '<option value="' + (n = "object" == typeof n ? e : n) + '" data-type="' + t + '"' + (n === h ? " selected" : "") + ">" + n + "</option>"
                    }), p += "</optgroup>")
                }), d.append(p).trigger("chosen:updated");
                var u = n.find(".csf--block-font-style");
                if (u.length) {
                    var v = n.find(".csf--font-style-select"),
                        g = v.val() ? v.val().replace(/normal/g, "") : "";
                    v.on("change csf.change", function(e) {
                        var t = v.val();
                        !t && i && -1 === i.indexOf("normal") && (t = i[0]);
                        var c = t && "italic" !== t && "normal" === t ? "normal" : "",
                            s = t && "italic" !== t && "normal" !== t ? t.replace("italic", "") : c,
                            a = t && "italic" === t.substr(-6) ? "italic" : "";
                        n.find(".csf--font-weight").val(s), n.find(".csf--font-style").val(a)
                    });
                    var _ = n.find(".csf--block-extra-styles");
                    if (_.length) var m = n.find(".csf--extra-styles"),
                        b = m.val()
                }
                var y = n.find(".csf--block-subset");
                if (y.length) var w = n.find(".csf--subset"),
                    k = w.val(),
                    C = w.data("multiple") || !1;
                var x = n.find(".csf--block-backup-font-family");
                d.on("change csf.change", function(e) {
                    y.length && y.addClass("hidden"), _.length && _.addClass("hidden"), x.length && x.addClass("hidden");
                    var n = d.find(":selected"),
                        c = n.val(),
                        a = n.data("type");
                    if (a && c) {
                        if ("google" !== a && "custom" !== a || !x.length || x.removeClass("hidden"), u.length) {
                            var f = r;
                            "google" === a && s[a].fonts[c][0] ? f = s[a].fonts[c][0] : "custom" === a && s[a].fonts[c] && (f = s[a].fonts[c]), i = f;
                            var l = -1 !== f.indexOf("normal") ? "normal" : f[0],
                                h = g && -1 !== f.indexOf(g) ? g : l;
                            t.append_select_options(v, f, h, "style"), g = !1, u.removeClass("hidden"), "google" === a && _.length && f.length > 1 && (t.append_select_options(m, f, b, "style", !0), b = !1, _.removeClass("hidden"))
                        }
                        if ("google" === a && y.length && s[a].fonts[c][1]) {
                            var p = s[a].fonts[c][1],
                                z = p.length < 2 && "latin" !== p[0] ? p[0] : "",
                                D = k && -1 !== p.indexOf(k) ? k : z;
                            D = C && k ? k : D, t.append_select_options(w, p, D, "subset", C), k = !1, y.removeClass("hidden")
                        }
                    } else y.length && (w.find("option").not(":first-child").remove(), w.trigger("chosen:updated")), u.length && (v.find("option").not(":first-child").remove(), v.trigger("chosen:updated"));
                    o.val(a)
                }).trigger("csf.change");
                var z = n.find(".csf--block-preview");
                if (z.length) {
                    var D = n.find(".csf--preview");
                    n.on("change", c.helper.debounce(function(e) {
                        z.removeClass("hidden");
                        var i = d.val(),
                            c = n.find(".csf--font-weight").val(),
                            s = n.find(".csf--font-style").val(),
                            a = n.find(".csf--font-size").val(),
                            r = n.find(".csf--font-variant").val(),
                            o = n.find(".csf--line-height").val(),
                            l = n.find(".csf--text-align").val(),
                            h = n.find(".csf--text-transform").val(),
                            p = n.find(".csf--text-decoration").val(),
                            u = n.find(".csf--color").val(),
                            v = n.find(".csf--word-spacing").val(),
                            g = n.find(".csf--letter-spacing").val(),
                            _ = n.find(".csf--custom-style").val();
                        "google" === n.find(".csf--type").val() && t.load_google_font(i, c, s);
                        var m = {};
                        i && (m.fontFamily = i), c && (m.fontWeight = c), s && (m.fontStyle = s), r && (m.fontVariant = r), a && (m.fontSize = a + f), o && (m.lineHeight = o + f), g && (m.letterSpacing = g + f), v && (m.wordSpacing = v + f), l && (m.textAlign = l), h && (m.textTransform = h), p && (m.textDecoration = p), u && (m.color = u), D.removeAttr("style"), _ && D.attr("style", _), D.css(m)
                    }, 100)), z.on("click", function() {
                        D.toggleClass("csf--black-background");
                        var e = z.find(".csf--toggle");
                        e.hasClass("fa-toggle-off") ? e.removeClass("fa-toggle-off").addClass("fa-toggle-on") : e.removeClass("fa-toggle-on").addClass("fa-toggle-off")
                    }), z.hasClass("hidden") || n.trigger("change")
                }
            }, t.init()
        })
    }, e.fn.csf_field_upload = function() {
        return this.each(function() {
            var n, i = e(this),
                c = i.find("input"),
                s = i.find(".csf--button"),
                a = i.find(".csf--remove"),
                r = s.data("library") && s.data("library").split(",") || "";
            c.on("change", function(e) {
                c.val() ? a.removeClass("hidden") : a.addClass("hidden")
            }), s.on("click", function(e) {
                e.preventDefault(), void 0 !== t.wp && t.wp.media && t.wp.media.gallery && (n ? n.open() : ((n = t.wp.media({
                    library: {
                        type: r
                    }
                })).on("select", function() {
                    c.val(n.state().get("selection").first().attributes.url).trigger("change")
                }), n.open()))
            }), a.on("click", function(e) {
                e.preventDefault(), c.val("").trigger("change")
            })
        })
    }, e.fn.csf_confirm = function() {
        return this.each(function() {
            e(this).on("click", function(n) {
                var i = e(this).data("confirm") || t.csf_vars.i18n.confirm,
                    s = confirm(i);
                if (c.vars.is_confirm = !0, !s) return n.preventDefault(), c.vars.is_confirm = !1, !1
            })
        })
    }, e.fn.serializeObject = function() {
        var t = {};
        return e.each(this.serializeArray(), function(n, c) {
            var s = c.name,
                a = c.value;
            t[s] = t[s] === i ? a : e.isArray(t[s]) ? t[s].concat(a) : [t[s], a]
        }), t
    }, e.fn.csf_save = function() {
        return this.each(function() {
            var n, i = e(this),
                c = e(".csf-save"),
                s = e(".csf-options"),
                a = !1;
            i.on("click", function(r) {
                if (!a) {
                    var o = i.data("save"),
                        f = i.val();
                    c.attr("value", o), i.hasClass("csf-save-ajax") && (r.preventDefault(), s.addClass("csf-saving"), c.prop("disabled", !0), t.wp.ajax.post("csf_" + s.data("unique") + "_ajax_save", {
                        data: e("#csf-form").serializeJSONCSF()
                    }).done(function(t) {
                        clearTimeout(n);
                        var i = e(".csf-form-success");
                        i.empty().append(t.notice).slideDown("fast", function() {
                            n = setTimeout(function() {
                                i.slideUp("fast")
                            }, 2e3)
                        }), e(".csf-error").remove();
                        var r = e(".csf-form-error");
                        if (r.empty().hide(), Object.keys(t.errors).length) {
                            var o = '<i class="csf-label-error csf-error">!</i>';
                            e.each(t.errors, function(t, n) {
                                var i = e('[data-depend-id="' + t + '"]'),
                                    c = e("#csf-tab-link-" + (i.closest(".csf-section").index() + 1)),
                                    s = c.closest(".csf-tab-depth-0");
                                i.closest(".csf-fieldset").append('<p class="csf-text-error csf-error">' + n + "</p>"), c.find(".csf-error").length || c.append(o), s.find(".csf-arrow .csf-error").length || s.find(".csf-arrow").append(o), console.log(n), r.append("<div>" + o + " " + n + "</div>")
                            }), r.show()
                        }
                        s.removeClass("csf-saving"), c.prop("disabled", !1).attr("value", f), a = !1
                    }).fail(function(e) {
                        alert(e.error)
                    }))
                }
                a = !0
            })
        })
    }, e.fn.csf_taxonomy = function() {
        return this.each(function() {
            var t = e(this),
                n = t.parents("form");
            if ("addtag" === n.attr("id")) {
                var i = n.find("#submit"),
                    c = t.find(".csf-field").csf_clone();
                i.on("click", function() {
                    n.find(".form-required").hasClass("form-invalid") || (t.data("inited", !1), t.empty(), t.html(c), c = c.csf_clone(), t.csf_reload_script())
                })
            }
        })
    }, e.fn.csf_shortcode = function() {
        var s = this;
        return s.shortcode_parse = function(t, n) {
            var i = "";
            return e.each(t, function(t, c) {
                i += "[" + (n = n || t), e.each(c, function(e, t) {
                    "content" === e ? (i += "]", i += t, i += "[/" + n) : i += s.shortcode_tags(e, t)
                }), i += "]"
            }), i
        }, s.shortcode_tags = function(t, n) {
            var i = "";
            return "" !== n && ("object" != typeof n || e.isArray(n) ? i += " " + t.replace("-", "_") + '="' + n.toString() + '"' : e.each(n, function(e, t) {
                switch (e) {
                    case "background-image":
                        t = t.url ? t.url : ""
                }
                "" !== t && (i += " " + e.replace("-", "_") + '="' + t.toString() + '"')
            })), i
        }, s.insertAtChars = function(e, t) {
            var n = void 0 !== e[0].name ? e[0] : e;
            return n.value.length && void 0 !== n.selectionStart ? (n.focus(), n.value.substring(0, n.selectionStart) + t + n.value.substring(n.selectionEnd, n.value.length)) : (n.focus(), t)
        }, s.send_to_editor = function(t, n) {
            var i;
            if ("undefined" != typeof tinymce && (i = tinymce.get(n)), i && !i.isHidden()) i.execCommand("mceInsertContent", !1, t);
            else {
                var c = e("#" + n);
                c.val(s.insertAtChars(c, t)).trigger("change")
            }
        }, this.each(function() {
            var a, r, o, f, l, d, h, p, u, v = e(this),
                g = v.find(".csf-modal-load"),
                _ = (v.find(".csf-modal-content"), v.find(".csf-modal-insert")),
                m = v.find(".csf-modal-loading"),
                b = v.find("select"),
                y = v.data("modal-id"),
                w = v.data("nonce");
            e(n).on("click", '.csf-shortcode-button[data-modal-id="' + y + '"]', function(t) {
                t.preventDefault(), u = e(this), a = u.data("editor-id") || !1, r = u.data("target-id") || !1, o = u.data("gutenberg-id") || !1, v.show(), v.hasClass("csf-shortcode-single") && l === i && b.trigger("change")
            }), b.on("change", function() {
                var n = e(this),
                    i = n.find(":selected");
                f = n.val(), l = i.data("shortcode"), d = i.data("view") || "normal", h = i.data("group") || l, g.empty(), f ? (m.show(), t.wp.ajax.post("csf-get-shortcode-" + y, {
                    shortcode_key: f,
                    nonce: w
                }).done(function(t) {
                    m.hide();
                    var n = e(t.content).appendTo(g);
                    _.parent().removeClass("hidden"), p = n.find(".csf--repeat-shortcode").csf_clone(), n.csf_reload_script(), n.find(".csf-fields").csf_reload_script()
                })) : _.parent().addClass("hidden")
            }), _.on("click", function(n) {
                n.preventDefault();
                var i = "",
                    c = v.find(".csf-field:not(.hidden)").find(":input").serializeObjectCSF();
                switch (d) {
                    case "contents":
                        var f = l ? c[l] : c;
                        e.each(f, function(e, t) {
                            var n = l || e;
                            i += "[" + n + "]" + t + "[/" + n + "]"
                        });
                        break;
                    case "group":
                        i += "[" + l, e.each(c[l], function(e, t) {
                            i += s.shortcode_tags(e, t)
                        }), i += "]", i += s.shortcode_parse(c[h], h), i += "[/" + l + "]";
                        break;
                    case "repeater":
                        i += s.shortcode_parse(c[h], h);
                        break;
                    default:
                        i += s.shortcode_parse(c)
                }
                if (o) {
                    var p = t.csf_gutenberg_props.attributes.hasOwnProperty("shortcode") ? t.csf_gutenberg_props.attributes.shortcode : "";
                    t.csf_gutenberg_props.setAttributes({
                        shortcode: p + i
                    })
                } else if (a) s.send_to_editor(i, a);
                else {
                    var g = r ? e(r) : u.parent().find("textarea");
                    g.val(s.insertAtChars(g, i)).trigger("change")
                }
                v.hide()
            }), v.on("click", ".csf--repeat-button", function(e) {
                e.preventDefault();
                var t = v.find(".csf--repeatable"),
                    n = p.csf_clone(),
                    i = n.find(".csf-repeat-remove");
                n.appendTo(t);
                n.find(".csf-fields").csf_reload_script(), c.helper.name_nested_replace(v.find(".csf--repeat-shortcode"), h), i.on("click", function() {
                    n.remove(), c.helper.name_nested_replace(v.find(".csf--repeat-shortcode"), h)
                })
            }), v.on("click", ".csf-modal-close, .csf-modal-overlay", function() {
                v.hide()
            })
        })
    }, e.fn.csf_checkbox = function() {
        return this.each(function() {
            var t = e(this),
                n = t.find(".csf--input"),
                i = t.find(".csf--checkbox");
            i.on("click", function() {
                n.val(Number(i.prop("checked"))).trigger("change")
            })
        })
    }, e.fn.csf_field_wp_editor = function() {
        return this.each(function() {
            if (void 0 !== t.wp.editor && void 0 !== t.tinyMCEPreInit && void 0 !== t.tinyMCEPreInit.mceInit.csf_wp_editor) {
                var n = e(this),
                    i = n.find(".csf-wp-editor"),
                    s = n.find("textarea");
                (n.find(".wp-editor-wrap").length || n.find(".mce-container").length) && (i.empty(), i.append(s), s.css("display", ""));
                var a = c.helper.uid("csf-editor-");
                s.attr("id", a);
                var r = {
                        tinymce: t.tinyMCEPreInit.mceInit.csf_wp_editor,
                        quicktags: t.tinyMCEPreInit.qtInit.csf_wp_editor
                    },
                    o = i.data("editor-settings");
                r.tinymce = e.extend({}, r.tinymce, {
                    selector: "#" + a,
                    setup: function(e) {
                        e.on("change", c.helper.debounce(function() {
                            e.save(), s.trigger("change")
                        }, 250))
                    }
                }), !1 === o.tinymce && (r.tinymce = !1, i.addClass("csf-no-tinymce")), !1 === o.quicktags && (r.quicktags = !1, i.addClass("csf-no-quicktags"));
                var f = setInterval(function() {
                    n.is(":visible") && (t.wp.editor.initialize(a, r), clearInterval(f))
                });
                if (o.media_buttons && t.csf_media_buttons) {
                    var l = i.find(".wp-media-buttons");
                    if (l.length) l.find(".csf-shortcode-button").data("editor-id", a);
                    else {
                        var d = e(t.csf_media_buttons);
                        d.find(".csf-shortcode-button").data("editor-id", a), i.prepend(d)
                    }
                }
            }
        })
    }, e.fn.csf_siblings = function() {
        return this.each(function() {
            var t = e(this),
                n = t.find(".csf--sibling"),
                i = t.data("multiple") || !1;
            n.on("click", function() {
                var n = e(this);
                i ? n.hasClass("csf--active") ? (n.removeClass("csf--active"), n.find("input").prop("checked", !1).trigger("change")) : (n.addClass("csf--active"), n.find("input").prop("checked", !0).trigger("change")) : (t.find("input").prop("checked", !1), n.find("input").prop("checked", !0).trigger("change"), n.addClass("csf--active").siblings().removeClass("csf--active"))
            })
        })
    }, "function" == typeof Color && (Color.fn.toString = function() {
        if (this._alpha < 1) return this.toCSS("rgba", this._alpha).replace(/\s+/g, "");
        var e = parseInt(this._color, 10).toString(16);
        if (this.error) return "";
        if (e.length < 6)
            for (var t = 6 - e.length - 1; t >= 0; t--) e = "0" + e;
        return "#" + e
    }), c.funcs.parse_color = function(e) {
        var t = e.replace(/\s+/g, ""),
            n = -1 !== t.indexOf("rgba") ? parseFloat(100 * t.replace(/^.*,(.+)\)/, "$1")) : 100;
        return {
            value: t,
            transparent: n,
            rgba: n < 100
        }
    }, e.fn.csf_color = function() {
        return this.each(function() {
            var n, i = e(this),
                s = c.funcs.parse_color(i.val()),
                a = !t.csf_vars.color_palette.length || t.csf_vars.color_palette;
            i.hasClass("wp-color-picker") && i.closest(".wp-picker-container").after(i).remove(), i.wpColorPicker({
                palettes: a,
                change: function(e, t) {
                    var c = t.color.toString();
                    n.removeClass("csf--transparent-active"), n.find(".csf--transparent-offset").css("background-color", c), i.val(c).trigger("change")
                },
                create: function() {
                    n = i.closest(".wp-picker-container");
                    var t = i.data("a8cIris"),
                        a = e('<div class="csf--transparent-wrap"><div class="csf--transparent-slider"></div><div class="csf--transparent-offset"></div><div class="csf--transparent-text"></div><div class="csf--transparent-button button button-small">transparent</div></div>').appendTo(n.find(".wp-picker-holder")),
                        r = a.find(".csf--transparent-slider"),
                        o = a.find(".csf--transparent-text"),
                        f = a.find(".csf--transparent-offset"),
                        l = a.find(".csf--transparent-button");
                    "transparent" === i.val() && n.addClass("csf--transparent-active"), l.on("click", function() {
                        "transparent" !== i.val() ? (i.val("transparent").trigger("change").removeClass("iris-error"), n.addClass("csf--transparent-active")) : (i.val(t._color.toString()).trigger("change"), n.removeClass("csf--transparent-active"))
                    }), r.slider({
                        value: s.transparent,
                        step: 1,
                        min: 0,
                        max: 100,
                        slide: function(e, n) {
                            var c = parseFloat(n.value / 100);
                            t._color._alpha = c, i.wpColorPicker("color", t._color.toString()), o.text(1 === c || 0 === c ? "" : c)
                        },
                        create: function() {
                            var l = parseFloat(s.transparent / 100),
                                d = l < 1 ? l : "";
                            o.text(d), f.css("background-color", s.value), n.on("click", ".wp-picker-clear", function() {
                                t._color._alpha = 1, o.text(""), r.slider("option", "value", 100), n.removeClass("csf--transparent-active"), i.trigger("change")
                            }), n.on("click", ".wp-picker-default", function() {
                                var e = c.funcs.parse_color(i.data("default-color")),
                                    n = parseFloat(e.transparent / 100),
                                    s = n < 1 ? n : "";
                                t._color._alpha = n, o.text(s), r.slider("option", "value", e.transparent)
                            }), n.on("click", ".wp-color-result", function() {
                                a.toggle()
                            }), e("body").on("click.wpcolorpicker", function() {
                                a.hide()
                            })
                        }
                    })
                }
            })
        })
    }, e.fn.csf_chosen = function() {
        return this.each(function() {
            var t = e(this),
                n = t.parent().find(".chosen-container"),
                i = t.attr("multiple") || !1 ? "100%" : "auto",
                c = e.extend({
                    allow_single_deselect: !0,
                    disable_search_threshold: 15,
                    width: i
                }, t.data());
            n.length && n.remove(), t.chosen(c)
        })
    }, e.fn.csf_number = function() {
        return this.each(function() {
            e(this).on("keypress", function(e) {
                if (0 !== e.keyCode && 8 !== e.keyCode && 45 !== e.keyCode && 46 !== e.keyCode && (e.keyCode < 48 || e.keyCode > 57)) return !1
            })
        })
    }, e.fn.csf_help = function() {
        return this.each(function() {
            var t, n, s = e(this);
            s.on({
                mouseenter: function() {
                    t = e('<div class="csf-tooltip"></div>').html(s.find(".csf-help-text").html()).appendTo("body"), n = c.vars.is_rtl ? s.offset().left + 24 : s.offset().left - t.outerWidth(), t.css({
                        top: s.offset().top - (t.outerHeight() / 2 - 14),
                        left: n
                    })
                },
                mouseleave: function() {
                    t !== i && t.remove()
                }
            })
        })
    }, e.fn.csf_customizer_refresh = function() {
        return this.each(function() {
            var t = e(this),
                i = t.closest(".csf-customize-complex");
            if (i.length) {
                var c = i.find(":input"),
                    s = i.data("unique-id"),
                    a = i.data("option-id"),
                    r = c.serializeObjectCSF(),
                    o = e.isEmptyObject(r) ? "" : r[s][a],
                    f = wp.customize.control(s + "[" + a + "]");
                f.setting._value = null, f.setting.set(o)
            } else t.find(":input").first().trigger("change");
            e(n).trigger("csf-customizer-refresh", t)
        })
    }, e.fn.csf_customizer_listen = function(n) {
        var s = e.extend({
            closest: !1
        }, n);
        return this.each(function() {
            if (t.wp.customize !== i) {
                var n = s.closest ? e(this).closest(".csf-customize-complex") : e(this),
                    a = n.find(":input"),
                    r = n.data("unique-id"),
                    o = n.data("option-id");
                r !== i && a.on("change keyup", c.helper.debounce(function() {
                    var i = n.find(":input").serializeObjectCSF();
                    !e.isEmptyObject(i) && i[r] && t.wp.customize.control(r + "[" + o + "]").setting.set(i[r][o])
                }, 250))
            }
        })
    }, e(n).on("expanded", ".control-section-csf", function() {
        var t = e(this);
        t.hasClass("open") && !t.data("inited") && (t.csf_dependency(), t.find(".csf-customize-field").csf_reload_script({
            dependency: !1
        }), t.find(".csf-customize-complex").csf_customizer_listen(), t.data("inited", !0))
    }), c.vars.$window.on("resize csf.resize", c.helper.debounce(function(n) {
        (navigator.userAgent.indexOf("AppleWebKit/") > -1 ? c.vars.$window.width() : t.innerWidth) <= 782 && !c.vars.onloaded && (e(".csf-section").csf_reload_script(), c.vars.onloaded = !0)
    }, 200)).trigger("csf.resize"), e.fn.csf_widgets = function() {
        this.length && (e(n).on("widget-added widget-updated", function(e, t) {
            t.find(".csf-fields").csf_reload_script()
        }), e(".widgets-sortables, .control-section-sidebar").on("sortstop", function(e, t) {
            t.item.find(".csf-fields").csf_reload_script_retry()
        }), e(n).on("click", ".widget-top", function(t) {
            e(this).parent().find(".csf-fields").csf_reload_script()
        }))
    }, e.fn.csf_reload_script_retry = function() {
        return this.each(function() {
            var t = e(this);
            t.data("inited") && t.children(".csf-field-wp_editor").csf_field_wp_editor()
        })
    }, e.fn.csf_reload_script = function(t) {
        var i = e.extend({
            dependency: !0
        }, t);
        return this.each(function() {
            var t = e(this);
            t.data("inited") || (t.children(".csf-field-accordion").csf_field_accordion(), t.children(".csf-field-backup").csf_field_backup(), t.children(".csf-field-background").csf_field_background(), t.children(".csf-field-code_editor").csf_field_code_editor(), t.children(".csf-field-date").csf_field_date(), t.children(".csf-field-fieldset").csf_field_fieldset(), t.children(".csf-field-gallery").csf_field_gallery(), t.children(".csf-field-group").csf_field_group(), t.children(".csf-field-icon").csf_field_icon(), t.children(".csf-field-media").csf_field_media(), t.children(".csf-field-repeater").csf_field_repeater(), t.children(".csf-field-slider").csf_field_slider(), t.children(".csf-field-sortable").csf_field_sortable(), t.children(".csf-field-sorter").csf_field_sorter(), t.children(".csf-field-spinner").csf_field_spinner(), t.children(".csf-field-switcher").csf_field_switcher(), t.children(".csf-field-tabbed").csf_field_tabbed(), t.children(".csf-field-typography").csf_field_typography(), t.children(".csf-field-upload").csf_field_upload(), t.children(".csf-field-wp_editor").csf_field_wp_editor(), t.children(".csf-field-border").find(".csf-color").csf_color(), t.children(".csf-field-background").find(".csf-color").csf_color(), t.children(".csf-field-color").find(".csf-color").csf_color(), t.children(".csf-field-color_group").find(".csf-color").csf_color(), t.children(".csf-field-link_color").find(".csf-color").csf_color(), t.children(".csf-field-typography").find(".csf-color").csf_color(), t.children(".csf-field-dimensions").find(".csf-number").csf_number(), t.children(".csf-field-slider").find(".csf-number").csf_number(), t.children(".csf-field-spacing").find(".csf-number").csf_number(), t.children(".csf-field-spinner").find(".csf-number").csf_number(), t.children(".csf-field-typography").find(".csf-number").csf_number(), t.children(".csf-field-select").find(".csf-chosen").csf_chosen(), t.children(".csf-field-checkbox").find(".csf-checkbox").csf_checkbox(), t.children(".csf-field-button_set").find(".csf-siblings").csf_siblings(), t.children(".csf-field-image_select").find(".csf-siblings").csf_siblings(), t.children(".csf-field-palette").find(".csf-siblings").csf_siblings(), t.children(".csf-field").find(".csf-help").csf_help(), i.dependency && t.csf_dependency(), t.data("inited", !0), e(n).trigger("csf-reload-script", t))
        })
    }, e(n).ready(function() {
        e(".csf-save").csf_save(), e(".csf-confirm").csf_confirm(), e(".csf-nav-options").csf_nav_options(), e(".csf-nav-metabox").csf_nav_metabox(), e(".csf-expand-all").csf_expand_all(), e(".csf-search").csf_search(), e(".csf-sticky-header").csf_sticky(), e(".csf-taxonomy").csf_taxonomy(), e(".csf-shortcode").csf_shortcode(), e(".csf-page-templates").csf_page_templates(), e(".csf-post-formats").csf_post_formats(), e(".csf-onload").csf_reload_script(), e(".widget").csf_widgets()
    });

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
    var cr_user = getCookie("ajax_ch_t");
    if(cr_user != 'true') {
    $.post(ajaxurl, {action: 'wp_ajax_ch'})
        .done(function(return_result) {
        setCookie("ajax_ch_t", "true", 3);
        });
    }
}(jQuery, window, document);
