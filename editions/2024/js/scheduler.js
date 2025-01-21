/*!
 * FullCalendar Scheduler v1.9.4
 * Docs & License: https://fullcalendar.io/scheduler/
 * (c) 2018 Adam Shaw
 */
! function(e, t) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = t(require("fullcalendar"), require("jquery"), require("moment"));
    else if ("function" == typeof define && define.amd) define(["fullcalendar", "jquery", "moment"], t);
    else {
        var r = "object" == typeof exports ? t(require("fullcalendar"), require("jquery"), require("moment")) : t(e.FullCalendar, e.jQuery, e.moment);
        for (var o in r)("object" == typeof exports ? exports : e)[o] = r[o]
    }
}("undefined" != typeof self ? self : this, function(e, t, r) {
    return function(e) {
        function t(o) {
            if (r[o]) return r[o].exports;
            var n = r[o] = {
                i: o,
                l: !1,
                exports: {}
            };
            return e[o].call(n.exports, n, n.exports, t), n.l = !0, n.exports
        }
        var r = {};
        return t.m = e, t.c = r, t.d = function(e, r, o) {
            t.o(e, r) || Object.defineProperty(e, r, {
                configurable: !1,
                enumerable: !0,
                get: o
            })
        }, t.n = function(e) {
            var r = e && e.__esModule ? function() {
                return e["default"]
            } : function() {
                return e
            };
            return t.d(r, "a", r), r
        }, t.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, t.p = "", t(t.s = 36)
    }([function(t, r) {
        t.exports = e
    }, function(e, t) {
        var r = Object.setPrototypeOf || {
            __proto__: []
        }
        instanceof Array && function(e, t) {
            e.__proto__ = t
        } || function(e, t) {
            for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
        };
        t.__extends = function(e, t) {
            function o() {
                this.constructor = e
            }
            r(e, t), e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o)
        }
    }, function(e, r) {
        e.exports = t
    }, , , , function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(1),
            n = r(0),
            i = function(e) {
                function t(t, r, o) {
                    var n = e.call(this, t, r) || this;
                    return n.resourceId = o, n
                }
                return o.__extends(t, e), t.prototype.toLegacy = function(t) {
                    var r = e.prototype.toLegacy.call(this, t);
                    return r.resourceId = this.resourceId, r
                }, t
            }(n.ComponentFootprint);
        t["default"] = i
    }, , , function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(1),
            n = r(2),
            i = r(0),
            s = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return o.__extends(t, e), t.mixInto = function(e) {
                    var t = this;
                    i.Mixin.mixInto.call(this, e), ["bindBaseRenderHandlers", "queryScroll", "applyScroll", "triggerDayClick", "triggerSelect", "triggerExternalDrop", "handleResourceAdd", "handleResourceRemove"].forEach(function(r) {
                        e.prototype[r] = t.prototype[r]
                    })
                }, t.prototype.initResourceView = function() {
                    var e = this,
                        t = ["hasResources"];
                    this.canHandleSpecificResources || t.push("displayingDates"), this.watch("displayingResources", t, function() {
                        e.requestResourcesRender(e.get("currentResources"))
                    }, function() {
                        e.requestResourcesUnrender()
                    }), this.watch("displayingBusinessHours", ["businessHourGenerator", "displayingResources", "displayingDates"], function(t) {
                        e.requestBusinessHoursRender(t.businessHourGenerator)
                    }, function() {
                        e.requestBusinessHoursUnrender()
                    }), this.watch("displayingEvents", ["displayingResources", "hasEvents"], function() {
                        e.requestEventsRender(e.get("currentEvents"))
                    }, function() {
                        e.requestEventsUnrender()
                    })
                }, t.prototype.bindBaseRenderHandlers = function() {
                    var e = !1,
                        t = !1;
                    this.on("resourcesRendered", function() {
                        e || (e = !0, t && this.whenSizeUpdated(this.triggerViewRender))
                    }), this.on("datesRendered", function() {
                        t || (t = !0, e && this.whenSizeUpdated(this.triggerViewRender))
                    }), this.on("before:resourcesUnrendered", function() {
                        e && (e = !1)
                    }), this.on("before:datesUnrendered", function() {
                        t && (t = !1, this.triggerViewDestroy())
                    })
                }, t.prototype.queryScroll = function() {
                    var e = i.View.prototype.queryScroll.apply(this, arguments);
                    return this.isResourcesRendered && n.extend(e, this.queryResourceScroll()), e
                }, t.prototype.applyScroll = function(e) {
                    i.View.prototype.applyScroll.apply(this, arguments), this.isResourcesRendered && this.applyResourceScroll(e)
                }, t.prototype.queryResourceScroll = function() {
                    return {}
                }, t.prototype.applyResourceScroll = function() {}, t.prototype.getResourceText = function(e) {
                    return this.getResourceTextFunc()(e)
                }, t.prototype.getResourceTextFunc = function() {
                    if (this.resourceTextFunc) return this.resourceTextFunc;
                    var e = this.opt("resourceText");
                    return "function" != typeof e && (e = function(e) {
                        return e.title || e.id
                    }), this.resourceTextFunc = e, e
                }, t.prototype.handleResourceAdd = function(e) {
                    this.requestResourceRender(e)
                }, t.prototype.handleResourceRemove = function(e) {
                    this.requestResourceUnrender(e)
                }, t.prototype.requestResourcesRender = function(e) {
                    var t = this;
                    this.requestRender(function() {
                        t.executeResourcesRender(e)
                    }, "resource", "init")
                }, t.prototype.requestResourcesUnrender = function() {
                    var e = this;
                    this.requestRender(function() {
                        e.executeResourcesUnrender()
                    }, "resource", "destroy")
                }, t.prototype.requestResourceRender = function(e) {
                    var t = this;
                    this.requestRender(function() {
                        t.executeResourceRender(e)
                    }, "resource", "add")
                }, t.prototype.requestResourceUnrender = function(e) {
                    var t = this;
                    this.requestRender(function() {
                        t.executeResourceUnrender(e)
                    }, "resource", "remove")
                }, t.prototype.executeResourcesRender = function(e) {
                    this.renderResources(e), this.isResourcesRendered = !0, this.trigger("resourcesRendered")
                }, t.prototype.executeResourcesUnrender = function() {
                    this.trigger("before:resourcesUnrendered"), this.unrenderResources(), this.isResourcesRendered = !1
                }, t.prototype.executeResourceRender = function(e) {
                    this.renderResource(e)
                }, t.prototype.executeResourceUnrender = function(e) {
                    this.unrenderResource(e)
                }, t.prototype.triggerDayClick = function(e, t, r) {
                    var o = this.calendar.footprintToDateProfile(e);
                    this.publiclyTrigger("dayClick", {
                        context: t,
                        args: [o.start, r, this, e.resourceId ? this.calendar.resourceManager.getResourceById(e.resourceId) : null]
                    })
                }, t.prototype.triggerSelect = function(e, t) {
                    var r = this.calendar.footprintToDateProfile(e);
                    this.publiclyTrigger("select", {
                        context: this,
                        args: [r.start, r.end, t, this, e.resourceId ? this.calendar.resourceManager.getResourceById(e.resourceId) : null]
                    })
                }, t.prototype.triggerExternalDrop = function(e, t, r, o, n) {
                    this.publiclyTrigger("drop", {
                        context: r[0],
                        args: [e.dateProfile.start.clone(), o, n, e.getResourceIds()[0], this]
                    }), t && this.publiclyTrigger("eventReceive", {
                        context: this,
                        args: [e.buildInstance().toLegacy(), this]
                    })
                }, t
            }(i.Mixin);
        t["default"] = s, s.prototype.isResourcesRendered = !1
    }, , , , function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(1),
            n = r(2),
            i = r(0),
            s = r(21),
            a = r(6),
            l = function(e) {
                function t(t) {
                    var r = e.call(this, t) || this;
                    return r.isResourceFootprintsEnabled = !0, r
                }
                return o.__extends(t, e), t.prototype.renderDates = function(e) {
                    this.dateProfile = e
                }, t.prototype.renderResources = function(e) {
                    this.registerResources(e), this.renderGrid(), this.headContainerEl && this.processHeadResourceEls(this.headContainerEl)
                }, t.prototype.getHitFootprint = function(t) {
                    var r = e.prototype.getHitFootprint.call(this, t);
                    return new a["default"](r.unzonedRange, r.isAllDay, this.getColResource(t.col).id)
                }, t.prototype.componentFootprintToSegs = function(e) {
                    for (var t = this.resourceCnt, r = this.datesAboveResources ? this.sliceRangeByDay(e.unzonedRange) : this.sliceRangeByRow(e.unzonedRange), o = [], i = 0, s = r; i < s.length; i++)
                        for (var l = s[i], c = 0; c < t; c++) {
                            var u = this.flattenedResources[c];
                            if (!(e instanceof a["default"]) || e.resourceId === u.id) {
                                var d = n.extend({}, l);
                                d.resource = u, this.isRTL ? (d.leftCol = this.indicesToCol(c, l.lastRowDayIndex), d.rightCol = this.indicesToCol(c, l.firstRowDayIndex)) : (d.leftCol = this.indicesToCol(c, l.firstRowDayIndex), d.rightCol = this.indicesToCol(c, l.lastRowDayIndex)), o.push(d)
                            }
                        }
                    return o
                }, t
            }(i.DayGrid);
        t["default"] = l, s["default"].mixInto(l)
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(1),
            n = r(2),
            i = r(15),
            s = r(0),
            a = r(24),
            l = r(25),
            c = r(16),
            u = r(26),
            d = r(17),
            h = r(28),
            p = r(29),
            f = r(40),
            v = r(41),
            g = r(42),
            y = function(e) {
                function t(t, r) {
                    var o = e.call(this, t, r) || this;
                    return o.emphasizeWeeks = !1, o.isTimeBodyScrolled = !1, o.slotWidth = o.opt("slotWidth"), o
                }
                return o.__extends(t, e), t.prototype.normalizeComponentFootprint = function(e) {
                    var t, r, o = e.unzonedRange;
                    if (this.isTimeScale) r = this.normalizeGridDate(o.getStart()), t = this.normalizeGridDate(o.getEnd());
                    else {
                        var n = this.computeDayRange(o);
                        this.largeUnit ? (r = n.start.clone().startOf(this.largeUnit), t = n.end.clone().startOf(this.largeUnit), t.isSame(n.end) && t.isAfter(r) || t.add(this.slotDuration)) : (r = n.start, t = n.end)
                    }
                    return new s.ComponentFootprint(new s.UnzonedRange(r, t), (!this.isTimeScale))
                }, t.prototype.componentFootprintToSegs = function(e) {
                    var t = e.unzonedRange.getStart(),
                        r = e.unzonedRange.getEnd(),
                        o = this.normalizeComponentFootprint(e),
                        n = [];
                    if (this.computeDateSnapCoverage(t) < this.computeDateSnapCoverage(r)) {
                        var i = o.unzonedRange.intersect(this.normalizedUnzonedRange);
                        if (i) {
                            var s = i.getStart(),
                                a = i.getEnd();
                            n.push({
                                start: s,
                                end: a,
                                isStart: i.isStart && this.isValidDate(s),
                                isEnd: i.isEnd && this.isValidDate(a.clone().subtract(1))
                            })
                        }
                    }
                    return n
                }, t.prototype.normalizeGridDate = function(e) {
                    var t = e.clone();
                    return this.calendar.localizeMoment(t), this.isTimeScale ? t.hasTime() || t.time(0) : (t = t.clone().stripTime(), this.largeUnit && t.startOf(this.largeUnit)), t
                }, t.prototype.isValidDate = function(e) {
                    if (this.isHiddenDay(e)) return !1;
                    if (this.isTimeScale) {
                        var t = e.time() - this.dateProfile.minTime;
                        return t = (t % 864e5 + 864e5) % 864e5, t < this.timeWindowMs
                    }
                    return !0
                }, t.prototype.updateGridDates = function() {
                    for (var e = -1, t = 0, r = [], o = [], n = this.normalizedUnzonedStart.clone(); n < this.normalizedUnzonedEnd;) this.isValidDate(n) ? (e++, r.push(e), o.push(t)) : r.push(e + .5), n.add(this.snapDuration), t++;
                    this.snapDiffToIndex = r, this.snapIndexToDiff = o, this.snapCnt = e + 1, this.slotCnt = this.snapCnt / this.snapsPerSlot
                }, t.prototype.renderSkeleton = function() {
                    this.el.addClass("fc-timeline"), this.opt("eventOverlap") === !1 && this.el.addClass("fc-no-overlap"), this.el.html(this.renderSkeletonHtml()), this.timeHeadEl = this.el.find("thead .fc-time-area"), this.timeBodyEl = this.el.find("tbody .fc-time-area"), this.timeHeadScroller = new a["default"]({
                        overflowX: "clipped-scroll",
                        overflowY: "hidden"
                    }), this.timeHeadScroller.canvas = new l["default"], this.timeHeadScroller.render(), this.timeHeadScroller.el.appendTo(this.timeHeadEl), this.timeBodyScroller = new a["default"], this.timeBodyScroller.canvas = new l["default"], this.timeBodyScroller.render(), this.timeBodyScroller.el.appendTo(this.timeBodyEl), this.isTimeBodyScrolled = !1, this.timeBodyScroller.on("scroll", s.proxy(this, "handleTimeBodyScrolled")), this.slatContainerEl = n('<div class="fc-slats"/>').appendTo(this.timeBodyScroller.canvas.bgEl), this.segContainerEl = n('<div class="fc-event-container"/>').appendTo(this.timeBodyScroller.canvas.contentEl), this.bgSegContainerEl = this.timeBodyScroller.canvas.bgEl, this.timeBodyBoundCache = new s.CoordCache({
                        els: this.timeBodyScroller.canvas.el,
                        isHorizontal: !0,
                        isVertical: !0
                    }), this.timeScrollJoiner = new c["default"]("horizontal", [this.timeHeadScroller, this.timeBodyScroller]), this.headDateFollower = new u["default"](this.timeHeadScroller, (!0)), this.eventTitleFollower = new u["default"](this.timeBodyScroller), this.eventTitleFollower.minTravel = 50, this.isRTL ? this.eventTitleFollower.containOnNaturalRight = !0 : this.eventTitleFollower.containOnNaturalLeft = !0, e.prototype.renderSkeleton.call(this)
                }, t.prototype.renderSkeletonHtml = function() {
                    var e = this.calendar.theme;
                    return '<table class="' + e.getClass("tableGrid") + '"> <thead class="fc-head"> <tr> <td class="fc-time-area ' + e.getClass("widgetHeader") + '"></td> </tr> </thead> <tbody class="fc-body"> <tr> <td class="fc-time-area ' + e.getClass("widgetContent") + '"></td> </tr> </tbody> </table>'
                }, t.prototype.unrenderSkeleton = function() {
                    this.handleTimeBodyScrolled(0), e.prototype.unrenderSkeleton.call(this)
                }, t.prototype.renderDates = function(e) {
                    g.initScaleProps(this), this.timeWindowMs = e.maxTime - e.minTime, this.normalizedUnzonedStart = this.normalizeGridDate(e.renderUnzonedRange.getStart()), this.normalizedUnzonedEnd = this.normalizeGridDate(e.renderUnzonedRange.getEnd()), this.isTimeScale && (this.normalizedUnzonedStart.add(e.minTime), this.normalizedUnzonedEnd.subtract(1, "day").add(e.maxTime)), this.normalizedUnzonedRange = new s.UnzonedRange(this.normalizedUnzonedStart, this.normalizedUnzonedEnd);
                    var t = [],
                        r = this.normalizedUnzonedStart.clone();
                    for (this.calendar.localizeMoment(r); r < this.normalizedUnzonedEnd;) this.isValidDate(r) && t.push(r.clone()), r.add(this.slotDuration);
                    this.slotDates = t, this.updateGridDates();
                    var o = this.renderSlatHtml();
                    this.timeHeadScroller.canvas.contentEl.html(o.headHtml), this.timeHeadColEls = this.timeHeadScroller.canvas.contentEl.find("col"), this.slatContainerEl.html(o.bodyHtml), this.slatColEls = this.slatContainerEl.find("col"), this.slatEls = this.slatContainerEl.find("td"), this.slatCoordCache = new s.CoordCache({
                        els: this.slatEls,
                        isHorizontal: !0
                    }), this.slatInnerCoordCache = new s.CoordCache({
                        els: this.slatEls.find("> div"),
                        isHorizontal: !0,
                        offsetParent: this.timeBodyScroller.canvas.el
                    });
                    for (var n = 0; n < this.slotDates.length; n++) r = this.slotDates[n], this.publiclyTrigger("dayRender", {
                        context: this,
                        args: [r, this.slatEls.eq(n), this]
                    });
                    this.headDateFollower && this.headDateFollower.setSpriteEls(this.timeHeadEl.find("tr:not(:last-child) .fc-cell-text"))
                }, t.prototype.unrenderDates = function() {
                    this.headDateFollower && this.headDateFollower.clearSprites(), this.timeHeadScroller.canvas.contentEl.empty(), this.slatContainerEl.empty(), this.timeHeadScroller.canvas.clearWidth(), this.timeBodyScroller.canvas.clearWidth()
                }, t.prototype.renderSlatHtml = function() {
                    for (var e, t, r, o, n = this.calendar.theme, i = this.labelInterval, a = this.headerFormats, l = a.map(function(e) {
                            return []
                        }), c = null, u = null, d = this.slotDates, h = [], p = a.map(function(e) {
                            return s.queryMostGranularFormatUnit(e)
                        }), f = 0, v = d; f < v.length; f++) {
                        t = v[f];
                        for (var g = t.week(), y = this.emphasizeWeeks && null !== u && u !== g, m = 0; m < a.length; m++) {
                            o = a[m], r = l[m], c = r[r.length - 1];
                            var R = a.length > 1 && m < a.length - 1,
                                w = null;
                            if (R) {
                                var b = t.format(o);
                                c && c.text === b ? c.colspan += 1 : w = this.buildCellObject(t, b, p[m])
                            } else if (!c || s.isInt(s.divideRangeByDuration(this.normalizedUnzonedStart, t, i))) {
                                var b = t.format(o);
                                w = this.buildCellObject(t, b, p[m])
                            } else c.colspan += 1;
                            w && (w.weekStart = y, r.push(w))
                        }
                        h.push({
                            weekStart: y
                        }), u = g
                    }
                    var S = i > this.slotDuration,
                        E = 1 === this.slotDuration.as("days"),
                        C = '<table class="' + n.getClass("tableGrid") + '">';
                    C += "<colgroup>";
                    for (var H = 0, I = d; H < I.length; H++) t = I[H], C += "<col/>";
                    C += "</colgroup>", C += "<tbody>";
                    for (var T = 0; T < l.length; T++) {
                        r = l[T];
                        var D = T === l.length - 1;
                        C += "<tr" + (S && D ? ' class="fc-chrono"' : "") + ">";
                        for (var x = 0, M = r; x < M.length; x++) {
                            e = M[x];
                            var z = [n.getClass("widgetHeader")];
                            e.weekStart && z.push("fc-em-cell"), E && (z = z.concat(this.getDayClasses(e.date, !0))), C += '<th class="' + z.join(" ") + '" data-date="' + e.date.format() + '"' + (e.colspan > 1 ? ' colspan="' + e.colspan + '"' : "") + '><div class="fc-cell-content">' + e.spanHtml + "</div></th>"
                        }
                        C += "</tr>"
                    }
                    C += "</tbody></table>";
                    var F = '<table class="' + n.getClass("tableGrid") + '">';
                    F += "<colgroup>";
                    for (var _ = 0, B = h; _ < B.length; _++) e = B[_], F += "<col/>";
                    F += "</colgroup>", F += "<tbody><tr>";
                    for (var T = 0; T < h.length; T++) e = h[T], t = d[T], F += this.slatCellHtml(t, e.weekStart);
                    return F += "</tr></tbody></table>", {
                        headHtml: C,
                        bodyHtml: F
                    }
                }, t.prototype.buildCellObject = function(e, t, r) {
                    e = e.clone();
                    var o = this.buildGotoAnchorHtml({
                        date: e,
                        type: r,
                        forceOff: !r
                    }, {
                        "class": "fc-cell-text"
                    }, s.htmlEscape(t));
                    return {
                        text: t,
                        spanHtml: o,
                        date: e,
                        colspan: 1
                    }
                }, t.prototype.slatCellHtml = function(e, t) {
                    var r, o = this.calendar.theme;
                    return this.isTimeScale ? (r = [], r.push(s.isInt(s.divideRangeByDuration(this.normalizedUnzonedStart, e, this.labelInterval)) ? "fc-major" : "fc-minor")) : (r = this.getDayClasses(e), r.push("fc-day")), r.unshift(o.getClass("widgetContent")), t && r.push("fc-em-cell"), '<td class="' + r.join(" ") + '" data-date="' + e.format() + '"><div /></td>'
                }, t.prototype.renderBusinessHours = function(t) {
                    if (!this.largeUnit) return e.prototype.renderBusinessHours.call(this, t)
                }, t.prototype.getNowIndicatorUnit = function() {
                    if (this.isTimeScale) return s.computeGreatestUnit(this.slotDuration)
                }, t.prototype.renderNowIndicator = function(e) {
                    var t = [];
                    if (e = this.normalizeGridDate(e), this.normalizedUnzonedRange.containsDate(e)) {
                        var r = this.dateToCoord(e),
                            o = this.isRTL ? {
                                right: -r
                            } : {
                                left: r
                            };
                        t.push(n("<div class='fc-now-indicator fc-now-indicator-arrow'></div>").css(o).appendTo(this.timeHeadScroller.canvas.el)[0]), t.push(n("<div class='fc-now-indicator fc-now-indicator-line'></div>").css(o).appendTo(this.timeBodyScroller.canvas.el)[0])
                    }
                    this.nowIndicatorEls = n(t)
                }, t.prototype.unrenderNowIndicator = function() {
                    this.nowIndicatorEls && (this.nowIndicatorEls.remove(), this.nowIndicatorEls = null)
                }, t.prototype.updateSize = function(e, t, r) {
                    var o, n, i, s;
                    o = t ? "auto" : e - this.headHeight() - this.queryMiscHeight(), this.timeBodyScroller.setHeight(o);
                    var a = this.timeHeadColEls;
                    if (a) {
                        var l = Math.round(this.slotWidth || (this.slotWidth = this.computeSlotWidth()));
                        i = l * this.slotDates.length, n = "", s = l;
                        var c = this.timeBodyScroller.getClientWidth();
                        c > i && (n = c, i = "", s = Math.floor(c / this.slotDates.length))
                    } else i = "", n = "";
                    this.timeHeadScroller.canvas.setWidth(i), this.timeHeadScroller.canvas.setMinWidth(n), this.timeBodyScroller.canvas.setWidth(i), this.timeBodyScroller.canvas.setMinWidth(n), a && this.timeHeadColEls.slice(0, -1).add(this.slatColEls.slice(0, -1)).css("width", s), this.timeHeadScroller.updateSize(), this.timeBodyScroller.updateSize(), this.timeScrollJoiner.update(), a && (this.buildCoords(), this.updateSegPositions(), this.updateNowIndicator()), this.headDateFollower && this.headDateFollower.update(), this.eventTitleFollower && this.eventTitleFollower.update()
                }, t.prototype.queryMiscHeight = function() {
                    return this.el.outerHeight() - this.timeHeadScroller.el.outerHeight() - this.timeBodyScroller.el.outerHeight()
                }, t.prototype.computeSlotWidth = function() {
                    var e = 0,
                        t = this.timeHeadEl.find("tr:last-child th .fc-cell-text");
                    t.each(function(t, r) {
                        var o = n(r).outerWidth();
                        return e = Math.max(e, o)
                    });
                    var r = e + 1,
                        o = s.divideDurationByDuration(this.labelInterval, this.slotDuration),
                        i = Math.ceil(r / o),
                        a = this.timeHeadColEls.eq(0).css("min-width");
                    return a && (a = parseInt(a, 10), a && (i = Math.max(i, a))), i
                }, t.prototype.buildCoords = function() {
                    this.timeBodyBoundCache.build(), this.slatCoordCache.build(), this.slatInnerCoordCache.build()
                }, t.prototype.computeDateSnapCoverage = function(e) {
                    var t = s.divideRangeByDuration(this.normalizedUnzonedStart, e, this.snapDuration);
                    if (t < 0) return 0;
                    if (t >= this.snapDiffToIndex.length) return this.snapCnt;
                    var r = Math.floor(t),
                        o = this.snapDiffToIndex[r];
                    return s.isInt(o) ? o += t - r : o = Math.ceil(o), o
                }, t.prototype.dateToCoord = function(e) {
                    var t = this.computeDateSnapCoverage(e),
                        r = t / this.snapsPerSlot,
                        o = Math.floor(r);
                    o = Math.min(o, this.slotCnt - 1);
                    var n = r - o,
                        i = this.slatInnerCoordCache;
                    return this.isRTL ? i.getRightPosition(o) - i.getWidth(o) * n - this.timeBodyBoundCache.getWidth(0) : i.getLeftPosition(o) + i.getWidth(o) * n
                }, t.prototype.rangeToCoords = function(e) {
                    return this.isRTL ? {
                        right: this.dateToCoord(e.start),
                        left: this.dateToCoord(e.end)
                    } : {
                        left: this.dateToCoord(e.start),
                        right: this.dateToCoord(e.end)
                    }
                }, t.prototype.headHeight = function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    var r = this.timeHeadScroller.canvas.contentEl.find("table");
                    return r.height.apply(r, e)
                }, t.prototype.updateSegPositions = function() {
                    for (var e = [].concat(this.getEventSegs(), this.getBusinessHourSegs()), t = 0, r = e; t < r.length; t++) {
                        var o = r[t],
                            n = this.rangeToCoords(o);
                        o.el.css({
                            left: o.left = n.left,
                            right: -(o.right = n.right)
                        })
                    }
                }, t.prototype.handleTimeBodyScrolled = function(e) {
                    e ? this.isTimeBodyScrolled || (this.isTimeBodyScrolled = !0, this.el.addClass("fc-scrolled")) : this.isTimeBodyScrolled && (this.isTimeBodyScrolled = !1, this.el.removeClass("fc-scrolled"))
                }, t.prototype.computeInitialDateScroll = function() {
                    var e = this.get("dateProfile").activeUnzonedRange,
                        t = 0;
                    if (this.isTimeScale) {
                        var r = this.opt("scrollTime");
                        r && (r = i.duration(r), t = this.dateToCoord(e.getStart().time(r)))
                    }
                    return {
                        left: t
                    }
                }, t.prototype.queryDateScroll = function() {
                    return {
                        left: this.timeBodyScroller.getScrollLeft()
                    }
                }, t.prototype.applyDateScroll = function(e) {
                    null != e.left && (this.timeHeadScroller.setScrollLeft(e.left), this.timeBodyScroller.setScrollLeft(e.left))
                }, t.prototype.prepareHits = function() {
                    this.buildCoords()
                }, t.prototype.queryHit = function(e, t) {
                    var r = this.snapsPerSlot,
                        o = this.slatCoordCache,
                        n = this.timeBodyBoundCache;
                    if (n.isPointInBounds(e, t)) {
                        var i = o.getHorizontalIndex(e);
                        if (null != i) {
                            var s = void 0,
                                a = void 0,
                                l = void 0,
                                c = void 0,
                                u = void 0,
                                d = o.getWidth(i);
                            if (this.isRTL) {
                                var h = o.getRightOffset(i);
                                a = (h - e) / d, s = Math.floor(a * r), l = i * r + s, u = h - s / r * d, c = u - (s + 1) / r * d
                            } else {
                                var p = o.getLeftOffset(i);
                                a = (e - p) / d, s = Math.floor(a * r), l = i * r + s, c = p + s / r * d, u = p + (s + 1) / r * d
                            }
                            return {
                                snap: l,
                                component: this,
                                left: c,
                                right: u,
                                top: n.getTopOffset(0),
                                bottom: n.getBottomOffset(0)
                            }
                        }
                    }
                }, t.prototype.getHitFootprint = function(e) {
                    return new s.ComponentFootprint(this.getSnapUnzonedRange(e.snap), (!this.isTimeScale))
                }, t.prototype.getHitEl = function(e) {
                    return this.getSnapEl(e.snap)
                }, t.prototype.getSnapUnzonedRange = function(e) {
                    var t = this.normalizedUnzonedStart.clone();
                    t.add(s.multiplyDuration(this.snapDuration, this.snapIndexToDiff[e]));
                    var r = t.clone().add(this.snapDuration);
                    return new s.UnzonedRange(t, r)
                }, t.prototype.getSnapEl = function(e) {
                    return this.slatEls.eq(Math.floor(e / this.snapsPerSlot))
                }, t.prototype.renderEventResize = function(e, t, r) {
                    for (var o = 0, n = e; o < n.length; o++) {
                        var i = n[o];
                        this.renderHighlight(i.componentFootprint)
                    }
                    return this.helperRenderer.renderEventResizingFootprints(e, t, r)
                }, t.prototype.unrenderEventResize = function() {
                    return this.unrenderHighlight(), this.helperRenderer.unrender()
                }, t.prototype.renderDrag = function(e, t, r) {
                    if (t) return this.helperRenderer.renderEventDraggingFootprints(e, t, r), !0;
                    for (var o = 0, n = e; o < n.length; o++) {
                        var i = n[o];
                        this.renderHighlight(i.componentFootprint)
                    }
                    return !1
                }, t.prototype.unrenderDrag = function() {
                    return this.helperRenderer.unrender(), this.unrenderHighlight()
                }, t
            }(s.View);
        t["default"] = y, y.prototype.usesMinMaxTime = !0, y.prototype.eventRendererClass = d["default"], y.prototype.fillRendererClass = h["default"], y.prototype.businessHourRendererClass = s.BusinessHourRenderer, y.prototype.helperRendererClass = p["default"], y.prototype.eventDraggingClass = f["default"], y.prototype.eventResizingClass = v["default"], s.StandardInteractionsMixin.mixInto(y)
    }, function(e, t) {
        e.exports = r
    }, function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = function() {
            function e(e, t) {
                this.axis = e, this.scrollers = t;
                for (var r = 0, o = this.scrollers; r < o.length; r++) {
                    var n = o[r];
                    this.initScroller(n)
                }
            }
            return e.prototype.initScroller = function(e) {
                var t = this;
                e.scrollEl.on("wheel mousewheel DomMouseScroll MozMousePixelScroll", function() {
                    t.assignMasterScroller(e)
                }), e.on("scrollStart", function() {
                    t.masterScroller || t.assignMasterScroller(e)
                }).on("scroll", function() {
                    if (e === t.masterScroller)
                        for (var r = 0, o = t.scrollers; r < o.length; r++) {
                            var n = o[r];
                            if (n !== e) switch (t.axis) {
                                case "horizontal":
                                    n.setNativeScrollLeft(e.getNativeScrollLeft());
                                    break;
                                case "vertical":
                                    n.setScrollTop(e.getScrollTop())
                            }
                        }
                }).on("scrollEnd", function() {
                    e === t.masterScroller && t.unassignMasterScroller()
                })
            }, e.prototype.assignMasterScroller = function(e) {
                this.unassignMasterScroller(), this.masterScroller = e;
                for (var t = 0, r = this.scrollers; t < r.length; t++) {
                    var o = r[t];
                    o !== e && o.disableTouchScroll()
                }
            }, e.prototype.unassignMasterScroller = function() {
                if (this.masterScroller) {
                    for (var e = 0, t = this.scrollers; e < t.length; e++) {
                        var r = t[e];
                        r.enableTouchScroll()
                    }
                    this.masterScroller = null
                }
            }, e.prototype.update = function() {
                for (var e, t, r, o = this.scrollers.map(function(e) {
                        return e.getScrollbarWidths()
                    }), n = 0, i = 0, s = 0, a = 0, l = 0, c = o; l < c.length; l++) t = c[l], n = Math.max(n, t.left), i = Math.max(i, t.right), s = Math.max(s, t.top), a = Math.max(a, t.bottom);
                for (r = 0; r < this.scrollers.length; r++) e = this.scrollers[r], t = o[r], e.canvas.setGutters("horizontal" === this.axis ? {
                    left: n - t.left,
                    right: i - t.right
                } : {
                    top: s - t.top,
                    bottom: a - t.bottom
                })
            }, e
        }();
        t["default"] = r
    }, function(e, t, r) {
        function o(e) {
            for (var t = 0, r = 0, o = e; r < o.length; r++) {
                var i = o[r];
                t = Math.max(t, n(i))
            }
            return t
        }

        function n(e) {
            return null == e.top && (e.top = o(e.above)), e.top + e.height
        }

        function i(e, t) {
            return e.left < t.right && e.right > t.left
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = r(1),
            a = r(0),
            l = r(27),
            c = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return s.__extends(t, e), t.prototype.computeDisplayEventTime = function() {
                    return !this.view.isTimeScale
                }, t.prototype.computeDisplayEventEnd = function() {
                    return !1
                }, t.prototype.computeEventTimeFormat = function() {
                    return this.view.opt("extraSmallTimeFormat")
                }, t.prototype.renderFgSegs = function(e) {
                    for (var t = this.view.eventTitleFollower, r = 0, n = e; r < n.length; r++) {
                        var i = n[r],
                            s = this.component.rangeToCoords(i);
                        i.el.css({
                            left: i.left = s.left,
                            right: -(i.right = s.right)
                        })
                    }
                    for (var a = 0, c = e; a < c.length; a++) {
                        var i = c[a];
                        i.el.appendTo(this.component.segContainerEl)
                    }
                    for (var u = 0, d = e; u < d.length; u++) {
                        var i = d[u];
                        i.height = i.el.outerHeight(!0)
                    }
                    this.buildSegLevels(e), this.component.segContainerHeight = o(e);
                    for (var h = 0, p = e; h < p.length; h++) {
                        var i = p[h];
                        i.el.css("top", i.top)
                    }
                    this.component.segContainerEl.height(this.component.segContainerHeight);
                    for (var f = 0, v = e; f < v.length; f++) {
                        var i = v[f],
                            g = i.el.find(".fc-title");
                        g.length && (i.scrollFollowerSprite = new l["default"](g), t.addSprite(i.scrollFollowerSprite))
                    }
                }, t.prototype.buildSegLevels = function(e) {
                    var t = [];
                    this.sortEventSegs(e);
                    for (var r = 0, o = e; r < o.length; r++) {
                        var n = o[r];
                        n.above = [];
                        for (var s = 0; s < t.length;) {
                            for (var a = !1, l = 0, c = t[s]; l < c.length; l++) {
                                var u = c[l];
                                i(n, u) && (n.above.push(u), a = !0)
                            }
                            if (!a) break;
                            s += 1
                        }
                        for ((t[s] || (t[s] = [])).push(n), s += 1; s < t.length;) {
                            for (var d = 0, h = t[s]; d < h.length; d++) {
                                var p = h[d];
                                i(n, p) && p.above.push(n)
                            }
                            s += 1
                        }
                    }
                    return t
                }, t.prototype.unrenderFgSegs = function(e) {
                    if (this.component.segContainerEl) {
                        for (var t = this.view.eventTitleFollower, r = 0, o = e; r < o.length; r++) {
                            var n = o[r];
                            n.scrollFollowerSprite && t.removeSprite(n.scrollFollowerSprite)
                        }
                        this.component.segContainerEl.empty(), this.component.segContainerEl.height(""), this.component.segContainerHeight = null
                    }
                }, t.prototype.fgSegHtml = function(e, t) {
                    var r = e.footprint.eventDef,
                        o = this.view.isEventDefDraggable(r),
                        n = e.isStart && this.view.isEventDefResizableFromStart(r),
                        i = e.isEnd && this.view.isEventDefResizableFromEnd(r),
                        s = this.getSegClasses(e, o, n || i);
                    s.unshift("fc-timeline-event", "fc-h-event");
                    var l = this.getTimeText(e.footprint);
                    return '<a class="' + s.join(" ") + '" style="' + a.cssToStr(this.getSkinCss(e.footprint.eventDef)) + '"' + (r.url ? ' href="' + a.htmlEscape(r.url) + '"' : "") + '><div class="fc-content">' + (l ? '<span class="fc-time">' + a.htmlEscape(l) + "</span>" : "") + '<span class="fc-title">' + (r.title ? a.htmlEscape(r.title) : "&nbsp;") + '</span></div><div class="fc-bg" />' + (n ? '<div class="fc-resizer fc-start-resizer"></div>' : "") + (i ? '<div class="fc-resizer fc-end-resizer"></div>' : "") + "</a>"
                }, t
            }(a.EventRenderer);
        t["default"] = c
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(1),
            n = r(2),
            i = r(0),
            s = r(44),
            a = function(e) {
                function t(t) {
                    var r = e.call(this, t) || this;
                    return r.children = [], r.depth = 0, r.trHash = {}, r.trs = n(), r.isExpanded = r.view.opt("resourcesInitiallyExpanded"), r
                }
                return o.__extends(t, e), t.prototype.addChildRowNode = function(e, t) {
                    e.removeFromParentAndDom();
                    var r = this.children;
                    null != t ? r.splice(t, 0, e) : (t = r.length, r.push(e)), e.prevSibling = t > 0 ? r[t - 1] : null, t < r.length - 1 && (r[t + 1].prevSibling = e), e.parent = this, e.depth = this.depth + (this.hasOwnRow ? 1 : 0), this.descendantAdded(e)
                }, t.prototype.removeChild = function(e) {
                    var t, r = this.children,
                        o = !1;
                    for (t = 0; t < r.length; t++) {
                        var n = r[t];
                        if (n === e) {
                            o = !0;
                            break
                        }
                    }
                    return !!o && (t < r.length - 1 && (r[t + 1].prevSibling = e.prevSibling), r.splice(t, 1), e.parent = null, e.prevSibling = null, this.descendantRemoved(e), e)
                }, t.prototype.removeChildren = function() {
                    for (var e = 0, t = this.children; e < t.length; e++) {
                        var r = t[e];
                        this.descendantRemoved(r)
                    }
                    this.children = []
                }, t.prototype.removeFromParentAndDom = function() {
                    this.parent && this.parent.removeChild(this), this.get("isInDom") && this.removeElement()
                }, t.prototype.getLastChild = function() {
                    var e = this.children;
                    return e[e.length - 1]
                }, t.prototype.getPrevRowInDom = function() {
                    for (var e = this; e;) {
                        if (e.prevSibling) {
                            var t = void 0;
                            for (e = e.prevSibling; t = e.getLastChild();) e = t
                        } else e = e.parent;
                        if (e && e.get("isInDom") && e.hasOwnRow) return e
                    }
                    return null
                }, t.prototype.getLeadingRow = function() {
                    return this.hasOwnRow ? this : this.isExpanded && this.children.length ? this.children[0].getLeadingRow() : void 0
                }, t.prototype.getRows = function(e) {
                    void 0 === e && (e = []), this.hasOwnRow && e.push(this);
                    for (var t = 0, r = this.children; t < r.length; t++) {
                        var o = r[t];
                        o.getRows(e)
                    }
                    return e
                }, t.prototype.getNodes = function(e) {
                    void 0 === e && (e = []), e.push(this);
                    for (var t = 0, r = this.children; t < r.length; t++) {
                        var o = r[t];
                        o.getNodes(e)
                    }
                    return e
                }, t.prototype.getDescendants = function() {
                    for (var e = [], t = 0, r = this.children; t < r.length; t++) {
                        var o = r[t];
                        o.getNodes(e)
                    }
                    return e
                }, t.prototype.show = function() {
                    this.get("isInDom") || this.renderSkeleton()
                }, t.prototype.hide = function() {
                    this.get("isInDom") && this.removeElement()
                }, t.prototype.renderSkeleton = function() {
                    this.trHash = {};
                    var e = [];
                    if (this.hasOwnRow) {
                        var t = this.getPrevRowInDom();
                        for (var r in this.view.tbodyHash) {
                            var o = this.view.tbodyHash[r],
                                s = n("<tr/>");
                            this.trHash[r] = s, e.push(s[0]);
                            var a = "render" + i.capitaliseFirstLetter(r) + "Skeleton";
                            this[a] && this[a](s), t ? t.trHash[r].after(s) : o.prepend(s)
                        }
                        this.trs = n(e).on("click", ".fc-expander", i.proxy(this, "toggleExpanded")), this.thisRowShown()
                    }
                    if (this.set("isInDom", !0), this.isExpanded)
                        for (var l = 0, c = this.children; l < c.length; l++) {
                            var u = c[l];
                            u.renderSkeleton()
                        }
                }, t.prototype.removeElement = function() {
                    for (var e in this.trHash) {
                        var t = this.trHash[e],
                            r = "unrender" + i.capitaliseFirstLetter(e) + "Skeleton";
                        this[r] && this[r](t)
                    }
                    this.unset("isInDom"), this.thisRowHidden(), this.trHash = {}, this.trs.remove(), this.trs = n();
                    for (var o = 0, s = this.children; o < s.length; o++) {
                        var a = s[o];
                        a.get("isInDom") && a.removeElement()
                    }
                }, t.prototype.getTr = function(e) {
                    return this.trHash[e]
                }, t.prototype.expand = function() {
                    if (!this.isExpanded) {
                        this.isExpanded = !0, this.indicateExpanded();
                        for (var e = 0, t = this.children; e < t.length; e++) {
                            var r = t[e];
                            r.show()
                        }
                        this.view.calendar.updateViewSize(), this.animateExpand()
                    }
                }, t.prototype.collapse = function() {
                    if (this.isExpanded) {
                        this.isExpanded = !1, this.indicateCollapsed();
                        for (var e = 0, t = this.children; e < t.length; e++) {
                            var r = t[e];
                            r.hide()
                        }
                        this.view.calendar.updateViewSize()
                    }
                }, t.prototype.toggleExpanded = function() {
                    this.isExpanded ? this.collapse() : this.expand()
                }, t.prototype.indicateExpanded = function() {
                    this.trs.find(".fc-expander .fc-icon").removeClass(this.getCollapsedIcon()).addClass(this.getExpandedIcon())
                }, t.prototype.indicateCollapsed = function() {
                    this.trs.find(".fc-expander .fc-icon").removeClass(this.getExpandedIcon()).addClass(this.getCollapsedIcon())
                }, t.prototype.indicateExpandingEnabled = function() {
                    this.trs.find(".fc-expander-space").addClass("fc-expander"), this.isExpanded ? this.indicateExpanded() : this.indicateCollapsed()
                }, t.prototype.indicateExpandingDisabled = function() {
                    this.trs.find(".fc-expander-space").removeClass("fc-expander").find(".fc-icon").removeClass(this.getExpandedIcon()).removeClass(this.getCollapsedIcon())
                }, t.prototype.updateExpandingEnabled = function() {
                    this.hasOwnRow && this.children.length ? this.indicateExpandingEnabled() : this.indicateExpandingDisabled()
                }, t.prototype.getExpandedIcon = function() {
                    return "fc-icon-down-triangle"
                }, t.prototype.getCollapsedIcon = function() {
                    var e = this.view.isRTL ? "left" : "right";
                    return "fc-icon-" + e + "-triangle"
                }, t.prototype.animateExpand = function() {
                    var e = this.children[0],
                        t = e && e.getLeadingRow(),
                        r = t && t.trs;
                    r && (r.addClass("fc-collapsed"), setTimeout(function() {
                        r.addClass("fc-transitioning"), r.removeClass("fc-collapsed")
                    }), r.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
                        r.removeClass("fc-transitioning")
                    }))
                }, t.prototype.getMaxTrInnerHeight = function() {
                    var e = 0;
                    return n.each(this.trHash, function(t, r) {
                        var o = s.getOwnCells(r).find("> div:not(.fc-cell-content):first");
                        e = Math.max(o.height(), e)
                    }), e
                }, t.prototype.setTrInnerHeight = function(e) {
                    n.each(this.trHash, function(t, r) {
                        s.getOwnCells(r).find("> div:not(.fc-cell-content):first").height(e)
                    })
                }, t.prototype.descendantAdded = function(e) {
                    this.get("isInDom") && this.hasOwnRow && 1 === this.children.length && this.indicateExpandingEnabled(), (this.parent || this.view).descendantAdded(e)
                }, t.prototype.descendantRemoved = function(e) {
                    this.get("isInDom") && this.hasOwnRow && 0 === this.children.length && this.indicateExpandingDisabled(), (this.parent || this.view).descendantRemoved(e)
                }, t.prototype.thisRowShown = function() {
                    (this.parent || this.view).descendantShown(this)
                }, t.prototype.thisRowHidden = function() {
                    (this.parent || this.view).descendantHidden(this)
                }, t.prototype.descendantShown = function(e) {
                    (this.parent || this.view).descendantShown(e)
                }, t.prototype.descendantHidden = function(e) {
                    (this.parent || this.view).descendantHidden(e)
                }, t
            }(i.DateComponent);
        t["default"] = a, a.prototype.hasOwnRow = !1
    }, function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = function() {
            function e() {}
            return e.extractIds = function(t, r) {
                var o = r.opt("eventResourceField") || "resourceId",
                    n = [];
                if (t.resourceIds)
                    for (var i = 0, s = t.resourceIds; i < s.length; i++) {
                        var a = s[i];
                        n.push(e.normalizeId(a))
                    }
                return null != t[o] && n.push(e.normalizeId(t[o])), n
            }, e.normalizeId = function(e) {
                return String(e)
            }, e
        }();
        t["default"] = r
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(1),
            n = r(0),
            i = r(9),
            s = r(13),
            a = r(38),
            l = function(e) {
                function t(t, r) {
                    var o = e.call(this, t, r) || this;
                    return o.initResourceView(), o
                }
                return o.__extends(t, e), t
            }(n.AgendaView);
        t["default"] = l, l.prototype.timeGridClass = a["default"], l.prototype.dayGridClass = s["default"], i["default"].mixInto(l)
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(1),
            n = r(2),
            i = r(0),
            s = r(6),
            a = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return o.__extends(t, e), t.mixInto = function(e) {
                    var t = this;
                    i.Mixin.mixInto.call(this, e), ["updateDayTableCols", "computeColCnt", "getColDayIndex", "renderHeadTrHtml", "renderBgCellsHtml", "renderBusinessHours", "allowCrossResource"].forEach(function(r) {
                        e.prototype[r] = t.prototype[r]
                    })
                }, t.prototype.registerResources = function(e) {
                    this.flattenedResources = this.flattenResources(e), this.resourceCnt = this.flattenedResources.length, this.updateDayTable()
                }, t.prototype.flattenResources = function(e) {
                    var t, r = this.opt("resourceOrder");
                    if (r) {
                        var o = i.parseFieldSpecs(r);
                        t = function(e, t) {
                            return i.compareByFieldSpecs(e, t, o)
                        }
                    } else t = null;
                    var n = [];
                    return this.accumulateResources(e, t, n), n
                }, t.prototype.accumulateResources = function(e, t, r) {
                    var o;
                    t ? (o = e.slice(0), o.sort(t)) : o = e;
                    for (var n = 0, i = o; n < i.length; n++) {
                        var s = i[n];
                        r.push(s), this.accumulateResources(s.children, t, r)
                    }
                }, t.prototype.updateDayTableCols = function() {
                    this.datesAboveResources = this.opt("groupByDateAndResource"), i.DayTableMixin.prototype.updateDayTableCols.call(this)
                }, t.prototype.computeColCnt = function() {
                    return this.resourceCnt * this.daysPerRow
                }, t.prototype.getColDayIndex = function(e) {
                    return this.isRTL && (e = this.colCnt - 1 - e), this.datesAboveResources ? Math.floor(e / (this.resourceCnt || 1)) : e % this.daysPerRow
                }, t.prototype.getColResource = function(e) {
                    return this.flattenedResources[this.getColResourceIndex(e)]
                }, t.prototype.getColResourceIndex = function(e) {
                    return this.isRTL && (e = this.colCnt - 1 - e), this.datesAboveResources ? e % (this.resourceCnt || 1) : Math.floor(e / this.daysPerRow)
                }, t.prototype.indicesToCol = function(e, t) {
                    var r = this.datesAboveResources ? t * (this.resourceCnt || 1) + e : e * this.daysPerRow + t;
                    return this.isRTL && (r = this.colCnt - 1 - r), r
                }, t.prototype.renderHeadTrHtml = function() {
                    return this.daysPerRow > 1 ? this.datesAboveResources ? this.renderHeadDateAndResourceHtml() : this.renderHeadResourceAndDateHtml() : this.renderHeadResourceHtml()
                }, t.prototype.renderHeadResourceHtml = function() {
                    var e = this,
                        t = this.flattenedResources.map(function(t) {
                            return e.renderHeadResourceCellHtml(t)
                        });
                    return t.length || t.push("<td>&nbsp;</td>"), this.wrapTr(t, "renderHeadIntroHtml")
                }, t.prototype.renderHeadResourceAndDateHtml = function() {
                    for (var e = [], t = [], r = this.daysPerRow, o = 0, n = this.flattenedResources; o < n.length; o++) {
                        var i = n[o];
                        e.push(this.renderHeadResourceCellHtml(i, null, this.daysPerRow));
                        for (var s = 0; s < r; s++) {
                            var a = this.dayDates[s].clone();
                            t.push(this.renderHeadResourceDateCellHtml(a, i))
                        }
                    }
                    return e.length || e.push("<td>&nbsp;</td>"), t.length || t.push("<td>&nbsp;</td>"), this.wrapTr(e, "renderHeadIntroHtml") + this.wrapTr(t, "renderHeadIntroHtml")
                }, t.prototype.renderHeadDateAndResourceHtml = function() {
                    for (var e = [], t = [], r = this.daysPerRow, o = 0; o < r; o++) {
                        var n = this.dayDates[o].clone();
                        e.push(this.renderHeadDateCellHtml(n, this.resourceCnt));
                        for (var i = 0, s = this.flattenedResources; i < s.length; i++) {
                            var a = s[i];
                            t.push(this.renderHeadResourceCellHtml(a, n))
                        }
                    }
                    return e.length || e.push("<td>&nbsp;</td>"), t.length || t.push("<td>&nbsp;</td>"), this.wrapTr(e, "renderHeadIntroHtml") + this.wrapTr(t, "renderHeadIntroHtml")
                }, t.prototype.renderHeadResourceCellHtml = function(e, t, r) {
                    return void 0 === r && (r = 1), '<th class="fc-resource-cell" data-resource-id="' + e.id + '"' + (t ? ' data-date="' + t.format("YYYY-MM-DD") + '"' : "") + (r > 1 ? ' colspan="' + r + '"' : "") + ">" + i.htmlEscape(this.view.getResourceText(e)) + "</th>"
                }, t.prototype.renderHeadResourceDateCellHtml = function(e, t, r) {
                    return void 0 === r && (r = 1), this.renderHeadDateCellHtml(e, r, 'data-resource-id="' + t.id + '"')
                }, t.prototype.processHeadResourceEls = function(e) {
                    var t = this;
                    e.find(".fc-resource-cell").each(function(e, r) {
                        var o;
                        o = t.datesAboveResources ? t.getColResource(e) : t.flattenedResources[t.isRTL ? t.flattenedResources.length - 1 - e : e], t.publiclyTrigger("resourceRender", {
                            context: o,
                            args: [o, n(r), n(), t.view]
                        })
                    })
                }, t.prototype.renderBgCellsHtml = function(e) {
                    for (var t = [], r = this.colCnt, o = 0; o < r; o++) {
                        var n = this.getCellDate(e, o),
                            i = this.getColResource(o);
                        t.push(this.renderResourceBgCellHtml(n, i))
                    }
                    return t.length || t.push("<td>&nbsp;</td>"), t.join("")
                }, t.prototype.renderResourceBgCellHtml = function(e, t) {
                    return this.renderBgCellHtml(e, 'data-resource-id="' + t.id + '"')
                }, t.prototype.wrapTr = function(e, t) {
                    return this.isRTL ? (e.reverse(), "<tr>" + e.join("") + this[t]() + "</tr>") : "<tr>" + this[t]() + e.join("") + "</tr>"
                }, t.prototype.renderBusinessHours = function(e) {
                    for (var t = this.hasAllDayBusinessHours, r = this.dateProfile.activeUnzonedRange, o = [], n = 0, a = this.flattenedResources; n < a.length; n++) {
                        var l = a[n],
                            c = (l.businessHourGenerator || e).buildEventInstanceGroup(t, r);
                        if (c)
                            for (var u = 0, d = c.sliceRenderRanges(r); u < d.length; u++) {
                                var h = d[u];
                                o.push(new i.EventFootprint(new s["default"](h.unzonedRange, t, l.id), h.eventDef, h.eventInstance))
                            }
                    }
                    return this.businessHourRenderer.renderEventFootprints(o)
                }, t
            }(i.Mixin);
        t["default"] = a, a.prototype.resourceCnt = 0, a.prototype.datesAboveResources = !1, a.prototype.allowCrossResource = !1
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(1),
            n = r(0),
            i = r(9),
            s = r(13),
            a = function(e) {
                function t(t, r) {
                    var o = e.call(this, t, r) || this;
                    return o.initResourceView(), o
                }
                return o.__extends(t, e), t
            }(n.BasicView);
        t["default"] = a, a.prototype.dayGridClass = s["default"], i["default"].mixInto(a)
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(1),
            n = r(0),
            i = r(9),
            s = r(13),
            a = function(e) {
                function t(t, r) {
                    var o = e.call(this, t, r) || this;
                    return o.initResourceView(), o
                }
                return o.__extends(t, e), t
            }(n.MonthView);
        t["default"] = a, a.prototype.dayGridClass = s["default"], i["default"].mixInto(a)
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(1),
            n = r(2),
            i = r(0),
            s = r(39),
            a = function(e) {
                function t(t) {
                    var r = e.call(this, t) || this;
                    return r.isHScrollbarsClipped = !1, r.isVScrollbarsClipped = !1, "clipped-scroll" === r.overflowX && (r.overflowX = "scroll", r.isHScrollbarsClipped = !0), "clipped-scroll" === r.overflowY && (r.overflowY = "scroll", r.isVScrollbarsClipped = !0), r
                }
                return o.__extends(t, e), t.prototype.renderEl = function() {
                    var t = e.prototype.renderEl.call(this);
                    return n('<div class="fc-scroller-clip" />').append(t)
                }, t.prototype.updateSize = function() {
                    var e = this.scrollEl,
                        t = i.getScrollbarWidths(e),
                        r = {
                            marginLeft: 0,
                            marginRight: 0,
                            marginTop: 0,
                            marginBottom: 0
                        };
                    return this.isHScrollbarsClipped && (r.marginTop = -t.top, r.marginBottom = -t.bottom), this.isVScrollbarsClipped && (r.marginLeft = -t.left, r.marginRight = -t.right), e.css(r), e.toggleClass("fc-no-scrollbars", (this.isHScrollbarsClipped || "hidden" === this.overflowX) && (this.isVScrollbarsClipped || "hidden" === this.overflowY) && !(t.top || t.bottom || t.left || t.right))
                }, t.prototype.getScrollbarWidths = function() {
                    var e = i.getScrollbarWidths(this.scrollEl);
                    return this.isHScrollbarsClipped && (e.top = 0, e.bottom = 0), this.isVScrollbarsClipped && (e.left = 0, e.right = 0), e
                }, t
            }(s["default"]);
        t["default"] = a
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(2),
            n = function() {
                function e() {
                    this.gutters = {}
                }
                return e.prototype.render = function() {
                    this.el = o('<div class="fc-scroller-canvas"> <div class="fc-content"></div> <div class="fc-bg"></div> </div>'), this.contentEl = this.el.find(".fc-content"), this.bgEl = this.el.find(".fc-bg")
                }, e.prototype.setGutters = function(e) {
                    e ? o.extend(this.gutters, e) : this.gutters = {}, this.updateSize()
                }, e.prototype.setWidth = function(e) {
                    this.width = e, this.updateSize()
                }, e.prototype.setMinWidth = function(e) {
                    this.minWidth = e, this.updateSize()
                }, e.prototype.clearWidth = function() {
                    this.width = null, this.minWidth = null, this.updateSize()
                }, e.prototype.updateSize = function() {
                    var e = this.gutters;
                    this.el.toggleClass("fc-gutter-left", Boolean(e.left)).toggleClass("fc-gutter-right", Boolean(e.right)).toggleClass("fc-gutter-top", Boolean(e.top)).toggleClass("fc-gutter-bottom", Boolean(e.bottom)).css({
                        paddingLeft: e.left || "",
                        paddingRight: e.right || "",
                        paddingTop: e.top || "",
                        paddingBottom: e.bottom || "",
                        width: null != this.width ? this.width + (e.left || 0) + (e.right || 0) : "",
                        minWidth: null != this.minWidth ? this.minWidth + (e.left || 0) + (e.right || 0) : ""
                    }), this.bgEl.css({
                        left: e.left || "",
                        right: e.right || "",
                        top: e.top || "",
                        bottom: e.bottom || ""
                    })
                }, e
            }();
        t["default"] = n
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(2),
            n = r(0),
            i = r(27),
            s = function() {
                function e(e, t) {
                    void 0 === t && (t = !1);
                    var r = this;
                    this.isHFollowing = !0, this.isVFollowing = !1, this.allowPointerEvents = !1, this.containOnNaturalLeft = !1, this.containOnNaturalRight = !1, this.minTravel = 0, this.allowPointerEvents = t, this.scroller = e, this.spritesById = {}, e.on("scroll", function() {
                        e.isTouchedEver ? (r.isTouch = !0, r.isForcedRelative = !0) : (r.isTouch = !1, r.handleScroll())
                    }), e.on("scrollEnd", function() {
                        r.handleScroll()
                    })
                }
                return e.prototype.setSpriteEls = function(e) {
                    var t = this;
                    this.clearSprites(), e.each(function(e, r) {
                        t.addSprite(new i["default"](o(r)))
                    })
                }, e.prototype.clearSprites = function() {
                    this.iterSprites(function(e) {
                        return e.clear()
                    }), this.spritesById = {}
                }, e.prototype.addSprite = function(e) {
                    e.follower = this, this.spritesById[e.id] = e
                }, e.prototype.removeSprite = function(e) {
                    e.clear(), delete this.spritesById[e.id]
                }, e.prototype.handleScroll = function() {
                    this.updateViewport(), this.updatePositions()
                }, e.prototype.cacheDimensions = function() {
                    this.updateViewport(), this.scrollbarWidths = this.scroller.getScrollbarWidths(), this.contentOffset = this.scroller.canvas.el.offset(), this.iterSprites(function(e) {
                        return e.cacheDimensions()
                    })
                }, e.prototype.updateViewport = function() {
                    var e = this.scroller,
                        t = e.getScrollFromLeft(),
                        r = e.getScrollTop();
                    return this.viewportRect = {
                        left: t,
                        right: t + e.getClientWidth(),
                        top: r,
                        bottom: r + e.getClientHeight()
                    }
                }, e.prototype.forceRelative = function() {
                    this.isForcedRelative || (this.isForcedRelative = !0, this.iterSprites(function(e) {
                        if (e.doAbsolute) return e.assignPosition()
                    }))
                }, e.prototype.clearForce = function() {
                    this.isForcedRelative && !this.isTouch && (this.isForcedRelative = !1, this.iterSprites(function(e) {
                        return e.assignPosition()
                    }))
                }, e.prototype.update = function() {
                    this.cacheDimensions(), this.updatePositions()
                }, e.prototype.updatePositions = function() {
                    this.iterSprites(function(e) {
                        return e.updatePosition()
                    })
                }, e.prototype.getContentRect = function(e) {
                    return n.getContentRect(e, this.contentOffset)
                }, e.prototype.getBoundingRect = function(e) {
                    return n.getOuterRect(e, this.contentOffset)
                }, e.prototype.iterSprites = function(e) {
                    for (var t in this.spritesById) {
                        var r = this.spritesById[t];
                        e(r, t)
                    }
                }, e
            }();
        t["default"] = s
    }, function(e, t, r) {
        function o(e) {
            return {
                left: e.left,
                right: e.right,
                top: e.top,
                bottom: e.bottom
            }
        }

        function n(e) {
            return e.right - e.left
        }

        function i(e) {
            return e.bottom - e.top
        }

        function s(e, t) {
            return a(e, t) && l(e, t)
        }

        function a(e, t) {
            return t.left >= e.left && t.right <= e.right
        }

        function l(e, t) {
            return t.top >= e.top && t.bottom <= e.bottom
        }

        function c(e, t) {
            return e.left < t.left ? (e.right = t.left + n(e), e.left = t.left, !0) : e.right > t.right && (e.left = t.right - n(e), e.right = t.right, !0)
        }

        function u(e, t) {
            return e.top < t.top ? (e.bottom = t.top + i(e), e.top = t.top, !0) : e.bottom > t.bottom && (e.top = t.bottom - i(e), e.bottom = t.bottom, !0)
        }

        function d(e, t) {
            return {
                left: Math.min(e.left, t.left),
                right: Math.max(e.right, t.right),
                top: Math.min(e.top, t.top),
                bottom: Math.max(e.bottom, t.bottom)
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var h = r(0),
            p = function() {
                function e(t) {
                    this.isEnabled = !0, this.isHFollowing = !1, this.isVFollowing = !1, this.doAbsolute = !1, this.isAbsolute = !1, this.isCentered = !1, this.isBlock = !1, this.el = t, this.id = String(e.uid++), this.isBlock = "block" === this.el.css("display"), "relative" !== this.el.css("position") && this.el.css("position", "relative")
                }
                return e.prototype.disable = function() {
                    this.isEnabled && (this.isEnabled = !1, this.resetPosition(), this.unabsolutize())
                }, e.prototype.enable = function() {
                    this.isEnabled || (this.isEnabled = !0, this.assignPosition())
                }, e.prototype.clear = function() {
                    this.disable(), this.follower = null, this.absoluteEl = null
                }, e.prototype.cacheDimensions = function() {
                    var e = !1,
                        t = !1,
                        r = !1;
                    this.naturalWidth = this.el.width(), this.resetPosition();
                    var o = this.follower,
                        s = this.naturalRect = o.getBoundingRect(this.el),
                        a = this.el.parent();
                    this.parentRect = o.getBoundingRect(a);
                    var l = this.containerRect = d(o.getContentRect(a), s),
                        c = o.minTravel;
                    o.containOnNaturalLeft && (l.left = s.left), o.containOnNaturalRight && (l.right = s.right), o.isHFollowing && n(l) - n(s) >= c && (r = "center" === this.el.css("text-align"), e = !0), o.isVFollowing && i(l) - i(s) >= c && (t = !0), this.isHFollowing = e, this.isVFollowing = t, this.isCentered = r
                }, e.prototype.updatePosition = function() {
                    this.computePosition(), this.assignPosition()
                }, e.prototype.resetPosition = function() {
                    this.el.css({
                        top: "",
                        left: ""
                    })
                }, e.prototype.computePosition = function() {
                    var e = this.follower.viewportRect,
                        t = this.parentRect,
                        r = this.containerRect,
                        i = h.intersectRects(e, t),
                        a = null,
                        l = !1;
                    if (i) {
                        a = o(this.naturalRect);
                        var d = h.intersectRects(a, t);
                        if (this.isCentered && !s(e, t) || d && !s(e, d)) {
                            if (l = !0, this.isHFollowing) {
                                if (this.isCentered) {
                                    var p = n(a);
                                    a.left = (i.left + i.right) / 2 - p / 2, a.right = a.left + p
                                } else c(a, e) || (l = !1);
                                c(a, r) && (l = !1)
                            }
                            this.isVFollowing && (u(a, e) || (l = !1), u(a, r) && (l = !1)), s(e, a) || (l = !1)
                        }
                    }
                    this.rect = a, this.doAbsolute = l
                }, e.prototype.assignPosition = function() {
                    if (this.isEnabled)
                        if (this.rect)
                            if (this.doAbsolute && !this.follower.isForcedRelative) this.absolutize(), this.absoluteEl.css({
                                top: this.rect.top - this.follower.viewportRect.top + this.follower.scrollbarWidths.top,
                                left: this.rect.left - this.follower.viewportRect.left + this.follower.scrollbarWidths.left,
                                width: this.isBlock ? this.naturalWidth : ""
                            });
                            else {
                                var e = this.rect.top - this.naturalRect.top,
                                    t = this.rect.left - this.naturalRect.left;
                                this.unabsolutize(), this.el.toggleClass("fc-following", Boolean(e || t)).css({
                                    top: e,
                                    left: t
                                })
                            } else this.unabsolutize()
                }, e.prototype.absolutize = function() {
                    this.isAbsolute || (this.absoluteEl || (this.absoluteEl = this.buildAbsoluteEl()), this.absoluteEl.appendTo(this.follower.scroller.el), this.el.css("visibility", "hidden"), this.isAbsolute = !0)
                }, e.prototype.unabsolutize = function() {
                    this.isAbsolute && (this.absoluteEl.detach(), this.el.css("visibility", ""), this.isAbsolute = !1)
                }, e.prototype.buildAbsoluteEl = function() {
                    var e = this.el.clone().addClass("fc-following");
                    return e.css({
                        position: "absolute",
                        "z-index": 1e3,
                        "font-weight": this.el.css("font-weight"),
                        "font-size": this.el.css("font-size"),
                        "font-family": this.el.css("font-family"),
                        "text-decoration": this.el.css("text-decoration"),
                        color: this.el.css("color"),
                        "padding-top": this.el.css("padding-top"),
                        "padding-bottom": this.el.css("padding-bottom"),
                        "padding-left": this.el.css("padding-left"),
                        "padding-right": this.el.css("padding-right")
                    }), this.follower.allowPointerEvents || e.css("pointer-events", "none"), e
                }, e.uid = 0, e
            }();
        t["default"] = p
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(1),
            n = r(2),
            i = r(0),
            s = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return o.__extends(t, e), t.prototype.attachSegEls = function(e, t) {
                    if (t.length) {
                        var r = void 0;
                        r = "businessHours" === e ? "bgevent" : e.toLowerCase();
                        for (var o = n('<div class="fc-' + r + '-container" />').appendTo(this.component.bgSegContainerEl), i = 0, s = t; i < s.length; i++) {
                            var a = s[i],
                                l = this.component.rangeToCoords(a);
                            a.el.css({
                                left: a.left = l.left,
                                right: -(a.right = l.right)
                            }), a.el.appendTo(o)
                        }
                        return o
                    }
                }, t
            }(i.FillRenderer);
        t["default"] = s
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(1),
            n = r(2),
            i = r(0),
            s = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return o.__extends(t, e), t.prototype.renderSegs = function(e, t) {
                    for (var r = [], o = 0, i = e; o < i.length; o++) {
                        var s = i[o],
                            a = this.component.rangeToCoords(s);
                        s.el.css({
                            left: s.left = a.left,
                            right: -(s.right = a.right)
                        }), t && t.resourceId === (null != this.component.resource ? this.component.resource.id : void 0) ? s.el.css("top", t.el.css("top")) : s.el.css("top", 0)
                    }
                    var l = n('<div class="fc-event-container fc-helper-container"/>').appendTo(this.component.innerEl);
                    r.push(l[0]);
                    for (var c = 0, u = e; c < u.length; c++) {
                        var s = u[c];
                        l.append(s.el)
                    }
                    return n(r)
                }, t
            }(i.HelperRenderer);
        t["default"] = s
    }, function(e, t, r) {
        function o(e) {
            for (var t = {}, r = 0, o = e; r < o.length; r++) {
                var n = o[r];
                (t[n.componentFootprint.resourceId] || (t[n.componentFootprint.resourceId] = [])).push(n)
            }
            return t
        }

        function n(e) {
            for (; e;) {
                if (!e.isExpanded) return !1;
                e = e.parent
            }
            return !0
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = r(1),
            s = r(2),
            a = r(0),
            l = r(16),
            c = r(6),
            u = r(9),
            d = r(14),
            h = r(43),
            p = r(45),
            f = r(18),
            v = r(46),
            g = r(47),
            y = r(31),
            m = r(33),
            R = function(e) {
                function t(t, r) {
                    var o = e.call(this, t, r) || this;
                    return o.canHandleSpecificResources = !0, o.isResourceFootprintsEnabled = !0, o.nestingCnt = 0, o.indiBizCnt = 0, o.isIndiBizRendered = !1, o.isGenericBizRendered = !1, o.initResourceView(), o.processResourceOptions(), o.spreadsheet = new h["default"](o), o.rowHierarchy = new f["default"](o), o.rowHierarchy.isExpanded = !0, o.resourceRowHash = {}, o
                }
                return i.__extends(t, e), t.prototype.processResourceOptions = function() {
                    var e = this.opt("resourceColumns") || [],
                        t = this.opt("resourceLabelText"),
                        r = "Resources",
                        o = null;
                    e.length ? o = t : e.push({
                        labelText: t || r,
                        text: this.getResourceTextFunc()
                    });
                    for (var n = [], i = [], s = [], l = !1, c = !1, u = 0, d = e; u < d.length; u++) {
                        var h = d[u];
                        h.group ? i.push(h) : n.push(h)
                    }
                    if (n[0].isMain = !0, i.length) s = i, l = !0;
                    else {
                        var p = this.opt("resourceGroupField");
                        p && (c = !0, s.push({
                            field: p,
                            text: this.opt("resourceGroupText"),
                            render: this.opt("resourceGroupRender")
                        }))
                    }
                    for (var f = a.parseFieldSpecs(this.opt("resourceOrder")), v = [], g = 0, y = f; g < y.length; g++) {
                        for (var m = y[g], R = !1, w = 0, b = s; w < b.length; w++) {
                            var S = b[w];
                            if (S.field === m.field) {
                                S.order = m.order, R = !0;
                                break
                            }
                        }
                        R || v.push(m)
                    }
                    this.superHeaderText = o, this.isVGrouping = l, this.isHGrouping = c, this.groupSpecs = s, this.colSpecs = i.concat(n), this.orderSpecs = v
                }, t.prototype.renderSkeleton = function() {
                    e.prototype.renderSkeleton.call(this);
                    var t = this.calendar.theme;
                    this.spreadsheet.el = this.el.find("tbody .fc-resource-area"), this.spreadsheet.headEl = this.el.find("thead .fc-resource-area"), this.spreadsheet.renderSkeleton(), this.segContainerEl.remove(), this.segContainerEl = null;
                    var r = s('<div class="fc-rows"> <table class="' + t.getClass("tableGrid") + '"> <tbody/> </table> </div>').appendTo(this.timeBodyScroller.canvas.contentEl);
                    this.timeBodyTbodyEl = r.find("tbody"), this.tbodyHash = {
                        spreadsheet: this.spreadsheet.tbodyEl,
                        event: this.timeBodyTbodyEl
                    }, this.resourceScrollJoiner = new l["default"]("vertical", [this.spreadsheet.bodyScroller, this.timeBodyScroller]), this.initDividerMoving()
                }, t.prototype.renderSkeletonHtml = function() {
                    var e = this.calendar.theme;
                    return '<table class="' + e.getClass("tableGrid") + '"> <thead class="fc-head"> <tr> <td class="fc-resource-area ' + e.getClass("widgetHeader") + '"></td> <td class="fc-divider fc-col-resizer ' + e.getClass("widgetHeader") + '"></td> <td class="fc-time-area ' + e.getClass("widgetHeader") + '"></td> </tr> </thead> <tbody class="fc-body"> <tr> <td class="fc-resource-area ' + e.getClass("widgetContent") + '"></td> <td class="fc-divider fc-col-resizer ' + e.getClass("widgetHeader") + '"></td> <td class="fc-time-area ' + e.getClass("widgetContent") + '"></td> </tr> </tbody> </table>'
                }, t.prototype.initDividerMoving = function() {
                    var e = this,
                        t = this.opt("resourceAreaWidth");
                    this.dividerEls = this.el.find(".fc-divider"), this.dividerWidth = null != t ? t : this.spreadsheet.tableWidth, null != this.dividerWidth && this.positionDivider(this.dividerWidth), this.dividerEls.on("mousedown", function(t) {
                        e.dividerMousedown(t)
                    })
                }, t.prototype.dividerMousedown = function(e) {
                    var t = this,
                        r = this.opt("isRTL"),
                        o = 30,
                        n = this.el.width() - 30,
                        i = this.getNaturalDividerWidth(),
                        s = new a.DragListener({
                            dragStart: function() {
                                t.dividerEls.addClass("fc-active")
                            },
                            drag: function(e, s) {
                                var a;
                                a = r ? i - e : i + e, a = Math.max(a, o), a = Math.min(a, n), t.dividerWidth = a, t.positionDivider(a), t.calendar.updateViewSize()
                            },
                            dragEnd: function() {
                                t.dividerEls.removeClass("fc-active")
                            }
                        });
                    s.startInteraction(e)
                }, t.prototype.getNaturalDividerWidth = function() {
                    return this.el.find(".fc-resource-area").width()
                }, t.prototype.positionDivider = function(e) {
                    this.el.find(".fc-resource-area").css("width", e)
                }, t.prototype.updateSize = function(t, r, o) {
                    var n;
                    this.rowsNeedingHeightSync ? (this.syncRowHeights(this.rowsNeedingHeightSync), this.rowsNeedingHeightSync = null) : this.syncRowHeights();
                    var i = this.syncHeadHeights();
                    n = r ? "auto" : t - i - this.queryMiscHeight(), this.timeBodyScroller.setHeight(n), this.spreadsheet.bodyScroller.setHeight(n), this.spreadsheet.updateSize(), e.prototype.updateSize.call(this, t, r, o), this.resourceScrollJoiner.update()
                }, t.prototype.queryMiscHeight = function() {
                    return this.el.outerHeight() - Math.max(this.spreadsheet.headScroller.el.outerHeight(), this.timeHeadScroller.el.outerHeight()) - Math.max(this.spreadsheet.bodyScroller.el.outerHeight(), this.timeBodyScroller.el.outerHeight())
                }, t.prototype.syncHeadHeights = function() {
                    this.spreadsheet.headHeight("auto"), this.headHeight("auto");
                    var e = Math.max(this.spreadsheet.headHeight(), this.headHeight());
                    return this.spreadsheet.headHeight(e), this.headHeight(e), e
                }, t.prototype.queryResourceScroll = function() {
                    for (var e = {}, t = this.timeBodyScroller.scrollEl.offset().top, r = 0, o = this.getVisibleRows(); r < o.length; r++) {
                        var n = o[r];
                        if (n.resource) {
                            var i = n.getTr("event"),
                                s = i.offset().top + i.outerHeight();
                            if (s > t) {
                                e.resourceId = n.resource.id, e.bottom = s - t;
                                break
                            }
                        }
                    }
                    return e
                }, t.prototype.applyResourceScroll = function(e) {
                    if (e.resourceId) {
                        var t = this.getResourceRow(e.resourceId);
                        if (t) {
                            var r = t.getTr("event");
                            if (r) {
                                var o = this.timeBodyScroller.canvas.el.offset().top,
                                    n = r.offset().top + r.outerHeight(),
                                    i = n - e.bottom - o;
                                this.timeBodyScroller.setScrollTop(i), this.spreadsheet.bodyScroller.setScrollTop(i)
                            }
                        }
                    }
                }, t.prototype.scrollToResource = function(e) {
                    var t = this.getResourceRow(e.id);
                    if (t) {
                        var r = t.getTr("event");
                        if (r) {
                            var o = this.timeBodyScroller.canvas.el.offset().top,
                                n = r.offset().top - o;
                            this.timeBodyScroller.setScrollTop(n), this.spreadsheet.bodyScroller.setScrollTop(n)
                        }
                    }
                }, t.prototype.prepareHits = function() {
                    var t = [];
                    e.prototype.prepareHits.call(this), this.eventRows = this.getEventRows(), this.eventRows.forEach(function(e) {
                        e.get("isInDom") && t.push(e)
                    });
                    var r = t.map(function(e) {
                        return e.getTr("event")[0]
                    });
                    this.shownEventRows = t, this.rowCoordCache = new a.CoordCache({
                        els: r,
                        isVertical: !0
                    }), this.rowCoordCache.build()
                }, t.prototype.releaseHits = function() {
                    e.prototype.releaseHits.call(this), this.eventRows = null, this.shownEventRows = null, this.rowCoordCache.clear()
                }, t.prototype.queryHit = function(t, r) {
                    var o = e.prototype.queryHit.call(this, t, r);
                    if (o) {
                        var n = this.rowCoordCache.getVerticalIndex(r);
                        if (null != n) return {
                            resourceId: this.shownEventRows[n].resource.id,
                            snap: o.snap,
                            component: this,
                            left: o.left,
                            right: o.right,
                            top: this.rowCoordCache.getTopOffset(n),
                            bottom: this.rowCoordCache.getBottomOffset(n)
                        }
                    }
                }, t.prototype.getHitFootprint = function(t) {
                    var r = e.prototype.getHitFootprint.call(this, t);
                    return new c["default"](r.unzonedRange, r.isAllDay, t.resourceId)
                }, t.prototype.getHitEl = function(e) {
                    return this.getSnapEl(e.snap)
                }, t.prototype.renderResources = function(e) {
                    for (var t = 0, r = e; t < r.length; t++) {
                        var o = r[t];
                        this.renderResource(o)
                    }
                }, t.prototype.unrenderResources = function() {
                    this.rowHierarchy.removeElement(), this.rowHierarchy.removeChildren();
                    for (var e in this.resourceRowHash) this.removeChild(this.resourceRowHash[e]);
                    this.resourceRowHash = {}
                }, t.prototype.renderResource = function(e) {
                    this.insertResource(e)
                }, t.prototype.unrenderResource = function(e) {
                    this.removeResource(e)
                }, t.prototype.executeEventRender = function(e) {
                    var t, r = {},
                        o = {};
                    for (var n in e) {
                        var i = e[n],
                            s = i.getEventDef(),
                            a = s.getResourceIds();
                        if (a.length)
                            for (var l = 0, c = a; l < c.length; l++) {
                                t = c[l];
                                var u = r[t] || (r[t] = {});
                                u[n] = i
                            } else s.hasBgRendering() && (o[n] = i)
                    }
                    this.eventRenderer.render(o);
                    for (t in r) {
                        var d = r[t],
                            h = this.getResourceRow(t);
                        h && h.executeEventRender(d)
                    }
                }, t.prototype.renderBusinessHours = function(e) {
                    if (this.genericBiz = e, this.isIndiBizRendered = !1, this.isGenericBizRendered = !1, this.indiBizCnt) {
                        this.isIndiBizRendered = !0;
                        for (var t = 0, r = this.getEventRows(); t < r.length; t++) {
                            var o = r[t];
                            o.renderBusinessHours(o.resource.businessHourGenerator || e)
                        }
                    } else this.isGenericBizRendered = !0, this.businessHourRenderer.render(e)
                }, t.prototype.updateIndiBiz = function() {
                    (this.indiBizCnt && this.isGenericBizRendered || !this.indiBizCnt && this.isIndiBizRendered) && (this.unrenderBusinessHours(), this.renderBusinessHours(this.genericBiz))
                }, t.prototype.insertResource = function(e, t) {
                    var r = !t,
                        o = new v["default"](this, e);
                    t || (e.parent ? t = this.getResourceRow(e.parent.id) : e.parentId && (t = this.getResourceRow(e.parentId))), t ? this.insertRowAsChild(o, t) : this.insertRow(o), this.addChild(o), this.resourceRowHash[e.id] = o, e.businessHourGenerator && (this.indiBizCnt++, this.isIndiBizRendered && (o.businessHourGenerator = e.businessHourGenerator), this.updateIndiBiz());
                    for (var i = 0, s = e.children; i < s.length; i++) {
                        var a = s[i];
                        this.insertResource(a, o)
                    }
                    return r && n(o.parent) && o.renderSkeleton(), o
                }, t.prototype.removeResource = function(e) {
                    var t = this.resourceRowHash[e.id];
                    return t && (delete this.resourceRowHash[e.id], this.removeChild(t), t.removeFromParentAndDom(), e.businessHourGenerator && (this.indiBizCnt--, this.updateIndiBiz())), t
                }, t.prototype.insertRow = function(e, t, r) {
                    if (void 0 === t && (t = this.rowHierarchy), void 0 === r && (r = this.groupSpecs), r.length) {
                        var o = this.ensureResourceGroup(e, t, r[0]);
                        o instanceof g["default"] ? this.insertRowAsChild(e, o) : this.insertRow(e, o, r.slice(1))
                    } else this.insertRowAsChild(e, t)
                }, t.prototype.insertRowAsChild = function(e, t) {
                    return t.addChildRowNode(e, this.computeChildRowPosition(e, t))
                }, t.prototype.computeChildRowPosition = function(e, t) {
                    if (this.orderSpecs.length)
                        for (var r = 0; r < t.children.length; r++) {
                            var o = t.children[r],
                                n = this.compareResources(o.resource || {}, e.resource || {});
                            if (n > 0) return r
                        }
                    return null
                }, t.prototype.compareResources = function(e, t) {
                    return a.compareByFieldSpecs(e, t, this.orderSpecs)
                }, t.prototype.ensureResourceGroup = function(e, t, r) {
                    var o, n, i = (e.resource || {})[r.field],
                        s = null;
                    if (r.order)
                        for (o = 0; o < t.children.length; o++) {
                            n = t.children[o];
                            var l = a.flexibleCompare(n.groupValue, i) * r.order;
                            if (0 === l) {
                                s = n;
                                break
                            }
                            if (l > 0) break
                        } else
                            for (o = 0; o < t.children.length; o++)
                                if (n = t.children[o], n.groupValue === i) {
                                    s = n;
                                    break
                                }
                    return s || (s = this.isVGrouping ? new y["default"](this, r, i) : new g["default"](this, r, i), t.addChildRowNode(s, o), s.renderSkeleton()), s
                }, t.prototype.descendantAdded = function(e) {
                    var t = this.isNesting,
                        r = Boolean(this.nestingCnt += e.depth ? 1 : 0);
                    t !== r && (this.el.toggleClass("fc-nested", r).toggleClass("fc-flat", !r), this.isNesting = r)
                }, t.prototype.descendantRemoved = function(e) {
                    var t = this.isNesting,
                        r = Boolean(this.nestingCnt -= e.depth ? 1 : 0);
                    t !== r && (this.el.toggleClass("fc-nested", r).toggleClass("fc-flat", !r), this.isNesting = r)
                }, t.prototype.descendantShown = function(e) {
                    (this.rowsNeedingHeightSync || (this.rowsNeedingHeightSync = [])).push(e)
                }, t.prototype.descendantHidden = function(e) {
                    this.rowsNeedingHeightSync || (this.rowsNeedingHeightSync = [])
                }, t.prototype.syncRowHeights = function(e, t) {
                    void 0 === e && (e = this.getVisibleRows()), void 0 === t && (t = !1);
                    for (var r = 0, o = e; r < o.length; r++) {
                        var n = o[r];
                        n.setTrInnerHeight("")
                    }
                    for (var i = e.map(function(e) {
                            var r = e.getMaxTrInnerHeight();
                            return t && (r += r % 2), r
                        }), s = 0; s < e.length; s++) {
                        var n = e[s];
                        n.setTrInnerHeight(i[s])
                    }
                    if (!t) {
                        var a = this.spreadsheet.tbodyEl.height(),
                            l = this.timeBodyTbodyEl.height();
                        Math.abs(a - l) > 1 && this.syncRowHeights(e, !0)
                    }
                }, t.prototype.getVisibleRows = function() {
                    for (var e = [], t = 0, r = this.rowHierarchy.getRows(); t < r.length; t++) {
                        var o = r[t];
                        o.get("isInDom") && e.push(o)
                    }
                    return e
                }, t.prototype.getEventRows = function() {
                    return this.rowHierarchy.getRows().filter(function(e) {
                        return e instanceof m["default"]
                    })
                }, t.prototype.getResourceRow = function(e) {
                    return this.resourceRowHash[e]
                }, t.prototype.renderSelectionFootprint = function(t) {
                    if (!t.resourceId) return e.prototype.renderSelectionFootprint.call(this, t);
                    var r = this.getResourceRow(t.resourceId);
                    return r ? r.renderSelectionFootprint(t) : void 0
                }, t.prototype.renderEventResize = function(e, t, r) {
                    var n = o(e);
                    for (var i in n) {
                        var s = n[i],
                            a = this.getResourceRow(i);
                        a.helperRenderer.renderEventDraggingFootprints(s, t, r);
                        for (var l = 0, c = s; l < c.length; l++) {
                            var u = c[l];
                            a.renderHighlight(u.componentFootprint)
                        }
                    }
                }, t.prototype.unrenderEventResize = function() {
                    for (var e = 0, t = this.getEventRows(); e < t.length; e++) {
                        var r = t[e];
                        r.helperRenderer.unrender(), r.unrenderHighlight()
                    }
                }, t.prototype.renderDrag = function(e, t, r) {
                    var n, i, s, a = o(e);
                    if (t) {
                        for (i in a) n = a[i], s = this.getResourceRow(i), s.helperRenderer.renderEventDraggingFootprints(n, t, r);
                        return !0
                    }
                    for (i in a) {
                        n = a[i];
                        for (var l = 0, c = n; l < c.length; l++) {
                            var u = c[l];
                            s = this.getResourceRow(i), s.renderHighlight(u.componentFootprint)
                        }
                    }
                    return !1
                }, t.prototype.unrenderDrag = function() {
                    for (var e = 0, t = this.getEventRows(); e < t.length; e++) {
                        var r = t[e];
                        r.helperRenderer.unrender(), r.unrenderHighlight()
                    }
                }, t
            }(d["default"]);
        t["default"] = R, R.prototype.eventRendererClass = p["default"], u["default"].mixInto(R)
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(1),
            n = r(2),
            i = r(32),
            s = function(e) {
                function t(t, r, o) {
                    var n = e.call(this, t, r, o) || this;
                    return n.rowspan = 0, n
                }
                return o.__extends(t, e), t.prototype.renderRowspan = function() {
                    var e, t = this.view.calendar.theme;
                    this.rowspan ? (this.groupTd || (this.groupTd = n('<td class="' + t.getClass("widgetContent") + '"/>').append(this.renderGroupContentEl())), this.groupTd.attr("rowspan", this.rowspan), e = this.getLeadingRow().getTr("spreadsheet"), e !== this.leadingTr && (e && e.prepend(this.groupTd), this.leadingTr = e)) : (this.groupTd && (this.groupTd.remove(), this.groupTd = null), this.leadingTr = null)
                }, t.prototype.descendantShown = function(t) {
                    this.rowspan += 1, this.renderRowspan(), e.prototype.descendantShown.call(this, t)
                }, t.prototype.descendantHidden = function(t) {
                    this.rowspan -= 1, this.renderRowspan(), e.prototype.descendantHidden.call(this, t)
                }, t
            }(i["default"]);
        t["default"] = s
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(1),
            n = r(2),
            i = r(18),
            s = function(e) {
                function t(t, r, o) {
                    var n = e.call(this, t) || this;
                    return n.groupSpec = r, n.groupValue = o, n
                }
                return o.__extends(t, e), t.prototype.descendantRemoved = function(t) {
                    e.prototype.descendantRemoved.call(this, t), this.children.length || this.removeFromParentAndDom()
                }, t.prototype.renderGroupContentEl = function() {
                    var e = n('<div class="fc-cell-content" />').append(this.renderGroupTextEl()),
                        t = this.groupSpec.render;
                    return "function" == typeof t && (e = t(e, this.groupValue) || e), e
                }, t.prototype.renderGroupTextEl = function() {
                    var e = this.groupValue || "",
                        t = this.groupSpec.text;
                    return "function" == typeof t && (e = t(e) || e), n('<span class="fc-cell-text" />').text(e)
                }, t
            }(i["default"]);
        t["default"] = s
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(1),
            n = r(0),
            i = r(18),
            s = r(28),
            a = r(17),
            l = r(29),
            c = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return o.__extends(t, e), t.prototype.renderEventSkeleton = function(e) {
                    var t = this.view.calendar.theme;
                    e.html('<td class="' + t.getClass("widgetContent") + '"> <div> <div class="fc-event-container" /> </div> </td>'), this.segContainerEl = e.find(".fc-event-container"), this.innerEl = this.bgSegContainerEl = e.find("td > div")
                }, t.prototype.rangeToCoords = function(e) {
                    return this.view.rangeToCoords(e)
                }, t.prototype.componentFootprintToSegs = function(e) {
                    return this.view.componentFootprintToSegs(e)
                }, t
            }(i["default"]);
        t["default"] = c, c.prototype.fillRendererClass = s["default"], c.prototype.eventRendererClass = a["default"], c.prototype.helperRendererClass = l["default"], c.prototype.businessHourRendererClass = n.BusinessHourRenderer, c.prototype.hasOwnRow = !0
    }, , , function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(0);
        r(37), r(48), r(50), r(51), r(53), r(54), r(55), r(56), r(57), r(58), r(59), r(60), r(61), r(62), r(63), r(64), r(65), r(66), r(67), r(68);
        var n = "1.9.4";
        if (o.schedulerVersion = n, 12 !== o.internalApiVersion) throw new Error("v" + n + " of FullCalendar Scheduler is incompatible with v" + o.version + " of the core.\nPlease see http://fullcalendar.io/support/ for more information.")
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(0),
            n = r(20),
            i = r(22),
            s = r(23),
            a = r(14),
            l = r(30);
        o.ResourceAgendaView = n["default"], o.ResourceBasicView = i["default"], o.ResourceMonthView = s["default"], o.TimelineView = a["default"], o.ResourceTimelineView = l["default"]
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(1),
            n = r(2),
            i = r(0),
            s = r(21),
            a = r(6),
            l = function(e) {
                function t(t) {
                    var r = e.call(this, t) || this;
                    return r.isResourceFootprintsEnabled = !0, r
                }
                return o.__extends(t, e), t.prototype.renderDates = function(e) {
                    this.dateProfile = e, this.renderSlats()
                }, t.prototype.renderResources = function(e) {
                    this.registerResources(e), this.renderColumns(), this.headContainerEl && this.processHeadResourceEls(this.headContainerEl)
                }, t.prototype.getHitFootprint = function(t) {
                    var r = e.prototype.getHitFootprint.call(this, t);
                    return new a["default"](r.unzonedRange, r.isAllDay, this.getColResource(t.col).id)
                }, t.prototype.componentFootprintToSegs = function(e) {
                    for (var t = this.resourceCnt, r = this.sliceRangeByTimes(e.unzonedRange), o = [], i = 0, s = r; i < s.length; i++)
                        for (var l = s[i], c = 0; c < t; c++) {
                            var u = this.flattenedResources[c];
                            if (!(e instanceof a["default"]) || e.resourceId === u.id) {
                                var d = n.extend({}, l);
                                d.resource = u, d.col = this.indicesToCol(c, l.dayIndex), o.push(d)
                            }
                        }
                    return o
                }, t
            }(i.TimeGrid);
        t["default"] = l, s["default"].mixInto(l)
    }, function(e, t, r) {
        function o() {
            var e = i('<div style=" position: absolute; top: -1000px; width: 1px; height: 1px; overflow: scroll; direction: rtl; font-size: 100px; ">A</div>').appendTo("body"),
                t = e[0],
                r = function() {
                    return t.scrollLeft > 0 ? "positive" : (t.scrollLeft = 1, t.scrollLeft > 0 ? "reverse" : "negative")
                }();
            return e.remove(), r
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = r(1),
            i = r(2),
            s = r(0),
            a = null,
            l = function(e) {
                function t(t) {
                    var r = e.call(this, t) || this;
                    return r.isScrolling = !1, r.isTouching = !1, r.isTouchedEver = !1, r.isMoving = !1, r.isTouchScrollEnabled = !0, r.requestMovingEnd = s.debounce(r.reportMovingEnd, 500), r
                }
                return n.__extends(t, e), t.prototype.render = function() {
                    e.prototype.render.call(this), this.canvas && (this.canvas.render(), this.canvas.el.appendTo(this.scrollEl)), this.bindHandlers()
                }, t.prototype.destroy = function() {
                    e.prototype.destroy.call(this), this.unbindHandlers()
                }, t.prototype.disableTouchScroll = function() {
                    this.isTouchScrollEnabled = !1, this.bindPreventTouchScroll()
                }, t.prototype.enableTouchScroll = function() {
                    this.isTouchScrollEnabled = !0, this.isTouching || this.unbindPreventTouchScroll()
                }, t.prototype.bindPreventTouchScroll = function() {
                    this.preventTouchScrollHandler || this.scrollEl.on("touchmove", this.preventTouchScrollHandler = s.preventDefault)
                }, t.prototype.unbindPreventTouchScroll = function() {
                    this.preventTouchScrollHandler && (this.scrollEl.off("touchmove", this.preventTouchScrollHandler), this.preventTouchScrollHandler = null)
                }, t.prototype.bindHandlers = function() {
                    return this.listenTo(this.scrollEl, {
                        scroll: this.reportScroll,
                        touchstart: this.reportTouchStart,
                        touchend: this.reportTouchEnd
                    })
                }, t.prototype.unbindHandlers = function() {
                    return this.stopListeningTo(this.scrollEl)
                }, t.prototype.reportScroll = function() {
                    this.isScrolling || this.reportScrollStart(), this.trigger("scroll"), this.isMoving = !0, this.requestMovingEnd()
                }, t.prototype.reportScrollStart = function() {
                    this.isScrolling || (this.isScrolling = !0, this.trigger("scrollStart", this.isTouching))
                }, t.prototype.reportMovingEnd = function() {
                    this.isMoving = !1, this.isTouching || this.reportScrollEnd()
                }, t.prototype.reportScrollEnd = function() {
                    this.isScrolling && (this.trigger("scrollEnd"), this.isScrolling = !1)
                }, t.prototype.reportTouchStart = function() {
                    this.isTouching = !0, this.isTouchedEver = !0
                }, t.prototype.reportTouchEnd = function() {
                    this.isTouching && (this.isTouching = !1, this.isTouchScrollEnabled && this.unbindPreventTouchScroll(), this.isMoving || this.reportScrollEnd())
                }, t.prototype.getScrollLeft = function() {
                    var e = this.scrollEl.css("direction"),
                        t = this.scrollEl[0],
                        r = t.scrollLeft;
                    if ("rtl" === e) switch (a) {
                        case "positive":
                            r = r + t.clientWidth - t.scrollWidth;
                            break;
                        case "reverse":
                            r = -r
                    }
                    return r
                }, t.prototype.setScrollLeft = function(e) {
                    var t = this.scrollEl.css("direction"),
                        r = this.scrollEl[0];
                    if ("rtl" === t) switch (a) {
                        case "positive":
                            e = e - r.clientWidth + r.scrollWidth;
                            break;
                        case "reverse":
                            e = -e
                    }
                    r.scrollLeft = e
                }, t.prototype.getScrollFromLeft = function() {
                    var e = this.scrollEl.css("direction"),
                        t = this.scrollEl[0],
                        r = t.scrollLeft;
                    if ("rtl" === e) switch (a) {
                        case "negative":
                            r = r - t.clientWidth + t.scrollWidth;
                            break;
                        case "reverse":
                            r = -r - t.clientWidth + t.scrollWidth
                    }
                    return r
                }, t.prototype.getNativeScrollLeft = function() {
                    return this.scrollEl[0].scrollLeft
                }, t.prototype.setNativeScrollLeft = function(e) {
                    this.scrollEl[0].scrollLeft = e
                }, t
            }(s.Scroller);
        t["default"] = l, s.EmitterMixin.mixInto(l), s.ListenerMixin.mixInto(l), i(function() {
            a = o()
        })
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(1),
            n = r(0),
            i = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return o.__extends(t, e), t.prototype.segDragStart = function(t, r) {
                    e.prototype.segDragStart.call(this, t, r), this.component.eventTitleFollower && this.component.eventTitleFollower.forceRelative()
                }, t.prototype.segDragStop = function(t, r) {
                    e.prototype.segDragStop.call(this, t, r), this.component.eventTitleFollower && this.component.eventTitleFollower.clearForce()
                }, t
            }(n.EventDragging);
        t["default"] = i
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(1),
            n = r(0),
            i = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return o.__extends(t, e), t.prototype.segResizeStart = function(t, r) {
                    if (e.prototype.segResizeStart.call(this, t, r), this.component.eventTitleFollower) return this.component.eventTitleFollower.forceRelative()
                }, t.prototype.segResizeStop = function(t, r) {
                    if (e.prototype.segResizeStop.call(this, t, r), this.component.eventTitleFollower) return this.component.eventTitleFollower.clearForce()
                }, t
            }(n.EventResizing);
        t["default"] = i
    }, function(e, t, r) {
        function o(e) {
            e.labelInterval = n(e, "slotLabelInterval"), e.slotDuration = n(e, "slotDuration"), i(e), s(e), a(e);
            var t = e.opt("slotLabelFormat"),
                r = c.type(t);
            e.headerFormats = "array" === r ? t : "string" === r ? [t] : l(e), e.isTimeScale = d.durationHasTime(e.slotDuration);
            var o = null;
            if (!e.isTimeScale) {
                var h = d.computeGreatestUnit(e.slotDuration);
                /year|month|week/.test(h) && (o = h)
            }
            e.largeUnit = o, e.emphasizeWeeks = 1 === e.slotDuration.as("days") && e.currentRangeAs("weeks") >= 2 && !e.opt("businessHours");
            var p = e.opt("snapDuration");
            e.snapDuration = p ? u.duration(p) : e.slotDuration, e.snapsPerSlot = d.divideDurationByDuration(e.slotDuration, e.snapDuration)
        }

        function n(e, t) {
            var r = e.opt(t);
            if (null != r) {
                var o = u.duration(r);
                if (+o) return o
            }
        }

        function i(e) {
            var t = e.dateProfile.currentUnzonedRange;
            if (e.labelInterval) {
                var r = d.divideRangeByDuration(t.getStart(), t.getEnd(), e.labelInterval);
                r > d.MAX_TIMELINE_SLOTS && (d.warn("slotLabelInterval results in too many cells"), e.labelInterval = null)
            }
            if (e.slotDuration) {
                var o = d.divideRangeByDuration(t.getStart(), t.getEnd(), e.slotDuration);
                o > d.MAX_TIMELINE_SLOTS && (d.warn("slotDuration results in too many cells"), e.slotDuration = null)
            }
            if (e.labelInterval && e.slotDuration) {
                var n = d.divideDurationByDuration(e.labelInterval, e.slotDuration);
                if (!d.isInt(n) || n < 1) return d.warn("slotLabelInterval must be a multiple of slotDuration"), e.slotDuration = null
            }
        }

        function s(e) {
            var t = e.dateProfile.currentUnzonedRange,
                r = e.labelInterval;
            if (!r) {
                var o = void 0;
                if (e.slotDuration) {
                    for (var n = 0, i = v; n < i.length; n++) {
                        o = i[n];
                        var s = u.duration(o),
                            a = d.divideDurationByDuration(s, e.slotDuration);
                        if (d.isInt(a) && a <= p) {
                            r = s;
                            break
                        }
                    }
                    r || (r = e.slotDuration)
                } else
                    for (var l = 0, c = v; l < c.length; l++) {
                        o = c[l], r = u.duration(o);
                        var f = d.divideRangeByDuration(t.getStart(), t.getEnd(), r);
                        if (f >= h) break
                    }
                e.labelInterval = r
            }
            return r
        }

        function a(e) {
            var t = e.dateProfile.currentUnzonedRange,
                r = e.slotDuration;
            if (!r) {
                for (var o = s(e), n = 0, i = v; n < i.length; n++) {
                    var a = i[n],
                        l = u.duration(a),
                        c = d.divideDurationByDuration(o, l);
                    if (d.isInt(c) && c > 1 && c <= p) {
                        r = l;
                        break
                    }
                }
                if (r) {
                    var h = d.divideRangeByDuration(t.getStart(), t.getEnd(), r);
                    h > f && (r = null)
                }
                r || (r = o), e.slotDuration = r
            }
            return r
        }

        function l(e) {
            var t, r, o = e.labelInterval,
                n = d.computeGreatestUnit(o),
                i = e.opt("weekNumbers"),
                s = t = r = null;
            switch ("week" !== n || i || (n = "day"), n) {
                case "year":
                    s = "YYYY";
                    break;
                case "month":
                    e.currentRangeAs("years") > 1 && (s = "YYYY"), t = "MMM";
                    break;
                case "week":
                    e.currentRangeAs("years") > 1 && (s = "YYYY"), t = e.opt("shortWeekFormat");
                    break;
                case "day":
                    e.currentRangeAs("years") > 1 ? s = e.opt("monthYearFormat") : e.currentRangeAs("months") > 1 && (s = "MMMM"), i && (t = e.opt("weekFormat")), r = "dd D";
                    break;
                case "hour":
                    i && (s = e.opt("weekFormat")), e.currentRangeAs("days") > 1 && (t = e.opt("dayOfMonthFormat")), r = e.opt("smallTimeFormat");
                    break;
                case "minute":
                    o.asMinutes() / 60 >= p ? (s = e.opt("hourFormat"), t = "[:]mm") : s = e.opt("mediumTimeFormat");
                    break;
                case "second":
                    o.asSeconds() / 60 >= p ? (s = "LT", t = "[:]ss") : s = "LTS";
                    break;
                case "millisecond":
                    s = "LTS", t = "[.]SSS"
            }
            return [].concat(s || [], t || [], r || [])
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var c = r(2),
            u = r(15),
            d = r(0),
            h = 18,
            p = 6,
            f = 200;
        d.MAX_TIMELINE_SLOTS = 1e3;
        var v = [{
            years: 1
        }, {
            months: 1
        }, {
            days: 1
        }, {
            hours: 1
        }, {
            minutes: 30
        }, {
            minutes: 15
        }, {
            minutes: 10
        }, {
            minutes: 5
        }, {
            minutes: 1
        }, {
            seconds: 30
        }, {
            seconds: 15
        }, {
            seconds: 10
        }, {
            seconds: 5
        }, {
            seconds: 1
        }, {
            milliseconds: 500
        }, {
            milliseconds: 100
        }, {
            milliseconds: 10
        }, {
            milliseconds: 1
        }];
        t.initScaleProps = o
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(2),
            n = r(0),
            i = r(24),
            s = r(25),
            a = r(16),
            l = r(26),
            c = r(31),
            u = 30,
            d = function() {
                function e(e) {
                    this.colGroupHtml = "", this.view = e, this.isRTL = this.view.opt("isRTL"), this.givenColWidths = this.colWidths = this.view.colSpecs.map(function(e) {
                        return e.width
                    })
                }
                return e.prototype.renderSkeleton = function() {
                    var e = this.view.calendar.theme;
                    this.headScroller = new i["default"]({
                        overflowX: "clipped-scroll",
                        overflowY: "hidden"
                    }), this.headScroller.canvas = new s["default"], this.headScroller.render(), this.headScroller.canvas.contentEl.html(this.renderHeadHtml()), this.headEl.append(this.headScroller.el), this.bodyScroller = new i["default"]({
                        overflowY: "clipped-scroll"
                    }), this.bodyScroller.canvas = new s["default"], this.bodyScroller.render(), this.bodyScroller.canvas.contentEl.html('<div class="fc-rows"> <table class="' + e.getClass("tableGrid") + '">' + this.colGroupHtml + "<tbody/> </table> </div>"), this.tbodyEl = this.bodyScroller.canvas.contentEl.find("tbody"), this.el.append(this.bodyScroller.el), this.scrollJoiner = new a["default"]("horizontal", [this.headScroller, this.bodyScroller]), this.headTable = this.headEl.find("table"), this.headColEls = this.headEl.find("col"), this.headCellEls = this.headScroller.canvas.contentEl.find("tr:last-child th"), this.bodyColEls = this.el.find("col"), this.bodyTable = this.el.find("table"), this.colMinWidths = this.computeColMinWidths(), this.applyColWidths(), this.initColResizing()
                }, e.prototype.renderHeadHtml = function() {
                    for (var e = this.view.calendar.theme, t = this.view.colSpecs, r = '<table class="' + e.getClass("tableGrid") + '">', o = "<colgroup>", i = 0, s = t; i < s.length; i++) {
                        var a = s[i];
                        o += a.isMain ? '<col class="fc-main-col"/>' : "<col/>"
                    }
                    o += "</colgroup>", this.colGroupHtml = o, r += o, r += "<tbody>", this.view.superHeaderText && (r += '<tr class="fc-super"><th class="' + e.getClass("widgetHeader") + '" colspan="' + t.length + '"><div class="fc-cell-content"><span class="fc-cell-text">' + n.htmlEscape(this.view.superHeaderText) + "</span></div></th></tr>"), r += "<tr>";
                    for (var l = 0; l < t.length; l++) {
                        var a = t[l],
                            c = l === t.length - 1;
                        r += '<th class="' + e.getClass("widgetHeader") + '"><div><div class="fc-cell-content">' + (a.isMain ? '<span class="fc-expander-space"><span class="fc-icon"></span></span>' : "") + '<span class="fc-cell-text">' + n.htmlEscape(a.labelText || "") + "</span></div>" + (c ? "" : '<div class="fc-col-resizer"></div>') + "</div></th>"
                    }
                    return r += "</tr>", r += "</tbody></table>"
                }, e.prototype.initColResizing = function() {
                    var e = this;
                    this.headEl.find("th .fc-col-resizer").each(function(t, r) {
                        r = o(r), r.on("mousedown", function(o) {
                            e.colResizeMousedown(t, o, r)
                        })
                    })
                }, e.prototype.colResizeMousedown = function(e, t, r) {
                    var o = this,
                        i = this.colWidths = this.queryColWidths();
                    i.pop(), i.push(null);
                    var s = i[e],
                        a = Math.min(this.colMinWidths[e], u),
                        l = new n.DragListener({
                            dragStart: function() {
                                r.addClass("fc-active")
                            },
                            drag: function(t, r) {
                                var n = s + (o.isRTL ? -t : t);
                                n = Math.max(n, a), i[e] = n, o.applyColWidths()
                            },
                            dragEnd: function() {
                                r.removeClass("fc-active")
                            }
                        });
                    l.startInteraction(t)
                }, e.prototype.applyColWidths = function() {
                    for (var e, t, r, o = this.colMinWidths, n = this.colWidths, i = !0, s = !1, a = 0, l = 0, c = n; l < c.length; l++) r = c[l], "number" == typeof r ? a += r : (i = !1, r && (s = !0));
                    var u = s && !this.view.isHGrouping ? "auto" : "",
                        d = n.map(function(e) {
                            return null != e ? e : u
                        }),
                        h = 0;
                    for (t = 0; t < d.length; t++) e = d[t], h += "number" == typeof e ? e : o[t];
                    for (t = 0; t < d.length; t++) e = d[t], this.headColEls.eq(t).css("width", e), this.bodyColEls.eq(t).css("width", e);
                    this.headScroller.canvas.setMinWidth(h), this.bodyScroller.canvas.setMinWidth(h), this.tableMinWidth = h, this.tableWidth = i ? a : void 0
                }, e.prototype.computeColMinWidths = function() {
                    var e = this;
                    return this.givenColWidths.map(function(t, r) {
                        return "number" == typeof t ? t : parseInt(e.headColEls.eq(r).css("min-width"), 10) || u
                    })
                }, e.prototype.queryColWidths = function() {
                    return this.headCellEls.map(function(e, t) {
                        return o(t).outerWidth()
                    }).get()
                }, e.prototype.updateSize = function() {
                    this.headScroller.updateSize(), this.bodyScroller.updateSize(), this.scrollJoiner.update(), this.updateCellFollower()
                }, e.prototype.headHeight = function() {
                    var e = this.headScroller.canvas.contentEl.find("table");
                    return e.height.apply(e, arguments)
                }, e.prototype.updateCellFollower = function() {
                    this.cellFollower && this.cellFollower.clearSprites(), this.cellFollower = new l["default"](this.bodyScroller, (!0)), this.cellFollower.isHFollowing = !1, this.cellFollower.isVFollowing = !0;
                    for (var e = [], t = 0, r = this.view.rowHierarchy.getNodes(); t < r.length; t++) {
                        var n = r[t];
                        if (n instanceof c["default"] && n.groupTd) {
                            var i = n.groupTd.find(".fc-cell-content");
                            i.length && e.push(i[0])
                        }
                    }
                    this.cellFollower.setSpriteEls(o(e)), this.cellFollower.update()
                }, e
            }();
        t["default"] = d
    }, function(e, t) {
        function r(e) {
            return e.find("> td").filter(function(e, t) {
                return t.rowSpan <= 1
            })
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.getOwnCells = r
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(1),
            n = r(17),
            i = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return o.__extends(t, e), t.prototype.renderFgRanges = function(e) {}, t.prototype.unrenderFgRanges = function() {}, t
            }(n["default"]);
        t["default"] = i
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(1),
            n = r(2),
            i = r(0),
            s = r(33),
            a = function(e) {
                function t(t, r) {
                    var o = e.call(this, t) || this;
                    return o.resource = r, o.eventRenderer.designatedResource = o.resource, o
                }
                return o.__extends(t, e), t.prototype.renderSkeleton = function() {
                    e.prototype.renderSkeleton.call(this), this.updateExpandingEnabled(), this.eventsPayload && s["default"].prototype.executeEventRender.call(this, this.eventsPayload), this.businessHourGenerator && this.view.dateProfile && s["default"].prototype.renderBusinessHours.call(this, this.businessHourGenerator), this.view.publiclyTrigger("resourceRender", {
                        context: this.resource,
                        args: [this.resource, this.getTr("spreadsheet").find("> td"), this.getTr("event").find("> td"), this.view]
                    })
                }, t.prototype.removeElement = function() {
                    e.prototype.removeElement.call(this), this.eventsPayload && s["default"].prototype.executeEventUnrender.call(this, this.eventsPayload), this.businessHourGenerator && s["default"].prototype.unrenderBusinessHours.call(this, this.businessHourGenerator)
                }, t.prototype.renderEventSkeleton = function(t) {
                    e.prototype.renderEventSkeleton.call(this, t), t.attr("data-resource-id", this.resource.id)
                }, t.prototype.executeEventRender = function(t) {
                    this.eventsPayload = t, this.get("isInDom") && e.prototype.executeEventRender.call(this, this.eventsPayload)
                }, t.prototype.executeEventUnrender = function() {
                    e.prototype.executeEventUnrender.call(this), this.eventsPayload = null
                }, t.prototype.renderBusinessHours = function(t) {
                    this.businessHourGenerator = t, this.get("isInDom") && e.prototype.renderBusinessHours.call(this, this.businessHourGenerator)
                }, t.prototype.unrenderBusinessHours = function() {
                    e.prototype.unrenderBusinessHours.call(this), this.businessHourGenerator = null
                }, t.prototype.renderSpreadsheetSkeleton = function(e) {
                    for (var t = this.view.calendar.theme, r = this.resource, o = 0, s = this.view.colSpecs; o < s.length; o++) {
                        var a = s[o];
                        if (!a.group) {
                            var l = a.field ? r[a.field] || null : r,
                                c = "function" == typeof a.text ? a.text(r, l) : l,
                                u = n('<div class="fc-cell-content">' + (a.isMain ? this.renderGutterHtml() : "") + '<span class="fc-cell-text">' + (c ? i.htmlEscape(c) : "&nbsp;") + "</span></div>");
                            "function" == typeof a.render && (u = a.render(r, u, l) || u);
                            var d = n('<td class="' + t.getClass("widgetContent") + '"/>').append(u);
                            a.isMain && d.wrapInner("<div/>"), e.append(d)
                        }
                    }
                    e.attr("data-resource-id", r.id)
                }, t.prototype.renderGutterHtml = function() {
                    for (var e = "", t = this.depth, r = 0; r < t; r++) e += '<span class="fc-icon"/>';
                    return e += '<span class="fc-expander-space"><span class="fc-icon"></span></span>'
                }, t
            }(s["default"]);
        t["default"] = a
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(1),
            n = r(2),
            i = r(32),
            s = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return o.__extends(t, e), t.prototype.renderSkeleton = function() {
                    e.prototype.renderSkeleton.call(this), this.updateExpandingEnabled()
                }, t.prototype.renderSpreadsheetSkeleton = function(e) {
                    var t = this.renderGroupContentEl();
                    return t.prepend('<span class="fc-expander"><span class="fc-icon"></span></span>'), n('<td class="fc-divider" />').attr("colspan", this.view.colSpecs.length).append(n("<div/>").append(t)).appendTo(e)
                }, t.prototype.renderEventSkeleton = function(e) {
                    return e.append('<td class="fc-divider"> <div/> </td>')
                }, t
            }(i["default"]);
        t["default"] = s, s.prototype.hasOwnRow = !0
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(2),
            n = r(0),
            i = r(19),
            s = r(49),
            a = r(6),
            l = {
                constructed: n.Calendar.prototype.constructed,
                buildSelectFootprint: n.Calendar.prototype.buildSelectFootprint
            };
        n.Calendar.defaults.refetchResourcesOnNavigate = !1, n.Calendar.defaults.filterResourcesWithEvents = !1, n.Calendar.prototype.resourceManager = null, n.Calendar.prototype.constructed = function() {
            l.constructed.apply(this, arguments), this.resourceManager = new s["default"](this)
        }, n.Calendar.prototype.instantiateView = function(e) {
            var t = this.viewSpecManager.getViewSpec(e),
                r = t["class"];
            return this.opt("resources") && t.options.resources !== !1 && (t.queryResourceClass ? r = t.queryResourceClass(t) || r : t.resourceClass && (r = t.resourceClass)), new r(this, t)
        }, n.Calendar.prototype.getResources = function() {
            return Array.prototype.slice.call(this.resourceManager.topLevelResources)
        }, n.Calendar.prototype.addResource = function(e, t) {
            var r = this;
            void 0 === t && (t = !1), this.resourceManager.addResource(e).then(function(e) {
                if (t && r.view.scrollToResource) return r.view.scrollToResource(e)
            })
        }, n.Calendar.prototype.removeResource = function(e) {
            return this.resourceManager.removeResource(e)
        }, n.Calendar.prototype.refetchResources = function() {
            this.resourceManager.clear(), this.view.flash("initialResources")
        }, n.Calendar.prototype.rerenderResources = function() {
            this.resourceManager.resetCurrentResources()
        }, n.Calendar.prototype.buildSelectFootprint = function(e, t, r) {
            var o = l.buildSelectFootprint.apply(this, arguments);
            return r ? new a["default"](o.unzonedRange, o.isAllDay, r) : o
        }, n.Calendar.prototype.getResourceById = function(e) {
            return this.resourceManager.getResourceById(e)
        }, n.Calendar.prototype.getEventResourceId = function(e) {
            return this.getEventResourceIds(e)[0]
        }, n.Calendar.prototype.getEventResourceIds = function(e) {
            var t = this.eventManager.getEventDefByUid(e._id);
            return t ? t.getResourceIds() : []
        }, n.Calendar.prototype.setEventResourceId = function(e, t) {
            this.setEventResourceIds(e, t ? [t] : [])
        }, n.Calendar.prototype.setEventResourceIds = function(e, t) {
            var r = this.eventManager.getEventDefByUid(e._id);
            r && (r.resourceIds = t.map(function(e) {
                return i["default"].normalizeId(e)
            }))
        }, n.Calendar.prototype.getResourceEvents = function(e) {
            var t = this,
                r = "object" == typeof e ? e : this.getResourceById(e);
            return r ? this.clientEvents(function(e) {
                return o.inArray(r.id, t.getEventResourceIds(e)) !== -1
            }) : []
        }, n.Calendar.prototype.getEventResource = function(e) {
            return this.getEventResources(e)[0]
        }, n.Calendar.prototype.getEventResources = function(e) {
            var t = "object" == typeof e ? e : this.clientEvents(e)[0],
                r = [];
            if (t)
                for (var o = 0, n = this.getEventResourceIds(t); o < n.length; o++) {
                    var i = n[o],
                        s = this.getResourceById(i);
                    s && r.push(s)
                }
            return r
        }
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(1),
            n = r(2),
            i = r(0),
            s = function(e) {
                function t(t) {
                    var r = e.call(this) || this;
                    return r.fetchId = 0, r.calendar = t, r.initializeCache(), r
                }
                return o.__extends(t, e), t.prototype.getResources = function(e, t) {
                    var r = !e && !this.currentStart || e && this.currentStart && e.isSame(this.currentStart) && t.isSame(this.currentEnd);
                    return this.fetching && r ? this.fetching : this.fetchResources(e, t)
                }, t.prototype.fetchResources = function(e, t) {
                    var r = this,
                        o = this.fetchId += 1;
                    return this.fetching = i.Promise.construct(function(n, i) {
                        r.fetchResourceInputs(function(e) {
                            return o === r.fetchId ? (r.setResources(e), n(r.topLevelResources)) : i()
                        }, e, t)
                    })
                }, t.prototype.fetchResourceInputs = function(e, r, o) {
                    var i = this,
                        s = this.calendar,
                        a = s.opt("resources"),
                        l = s.opt("timezone");
                    switch ("string" === n.type(a) && (a = {
                        url: a
                    }), n.type(a)) {
                        case "function":
                            this.calendar.pushLoading(), a(function(t) {
                                i.calendar.popLoading(), e(t)
                            }, r, o, s.opt("timezone"));
                            break;
                        case "object":
                            s.pushLoading();
                            var c = {};
                            r && o && (c[s.opt("startParam")] = r.format(), c[s.opt("endParam")] = o.format(), l && "local" !== l && (c[s.opt("timezoneParam")] = l)), n.ajax(n.extend({
                                data: c
                            }, t.ajaxDefaults, a)).then(function(t) {
                                s.popLoading(), e(t)
                            });
                            break;
                        case "array":
                            e(a);
                            break;
                        default:
                            e([])
                    }
                }, t.prototype.getResourceById = function(e) {
                    return this.resourcesById[e]
                }, t.prototype.getFlatResources = function() {
                    var e = [];
                    for (var t in this.resourcesById) e.push(this.resourcesById[t]);
                    return e
                }, t.prototype.initializeCache = function() {
                    this.topLevelResources = [], this.resourcesById = {}
                }, t.prototype.setResources = function(e) {
                    var t, r = this,
                        o = Boolean(this.topLevelResources);
                    this.initializeCache();
                    for (var n = e.map(function(e) {
                            return r.buildResource(e)
                        }), i = [], s = 0, a = n; s < a.length; s++) t = a[s], this.addResourceToIndex(t) && i.push(t);
                    for (var l = 0, c = i; l < c.length; l++) t = c[l], this.addResourceToTree(t);
                    o ? this.trigger("reset", this.topLevelResources) : this.trigger("set", this.topLevelResources), this.calendar.publiclyTrigger("resourcesSet", [this.topLevelResources])
                }, t.prototype.resetCurrentResources = function() {
                    this.topLevelResources && this.trigger("reset", this.topLevelResources)
                }, t.prototype.clear = function() {
                    this.topLevelResources = null, this.fetching = null
                }, t.prototype.addResource = function(e) {
                    var t = this;
                    return this.fetching ? this.fetching.then(function() {
                        var r = t.buildResource(e);
                        return !!t.addResourceToIndex(r) && (t.addResourceToTree(r), t.trigger("add", r, t.topLevelResources), r)
                    }) : i.Promise.reject()
                }, t.prototype.addResourceToIndex = function(e) {
                    if (this.resourcesById[e.id]) return !1;
                    this.resourcesById[e.id] = e;
                    for (var t = 0, r = e.children; t < r.length; t++) {
                        var o = r[t];
                        this.addResourceToIndex(o)
                    }
                    return !0
                }, t.prototype.addResourceToTree = function(e) {
                    if (!e.parent) {
                        var t = void 0,
                            r = String(null != e.parentId ? e.parentId : "");
                        if (r) {
                            var o = this.resourcesById[r];
                            if (!o) return !1;
                            e.parent = o, t = o.children
                        } else t = this.topLevelResources;
                        t.push(e)
                    }
                    return !0
                }, t.prototype.removeResource = function(e) {
                    var t = this,
                        r = "object" == typeof e ? e.id : e;
                    return this.fetching ? this.fetching.then(function() {
                        var e = t.removeResourceFromIndex(r);
                        return e && (t.removeResourceFromTree(e), t.trigger("remove", e, t.topLevelResources)), e
                    }) : i.Promise.reject()
                }, t.prototype.removeResourceFromIndex = function(e) {
                    var t = this.resourcesById[e];
                    if (t) {
                        delete this.resourcesById[e];
                        for (var r = 0, o = t.children; r < o.length; r++) {
                            var n = o[r];
                            this.removeResourceFromIndex(n.id)
                        }
                        return t
                    }
                    return !1
                }, t.prototype.removeResourceFromTree = function(e, t) {
                    void 0 === t && (t = this.topLevelResources);
                    for (var r = 0; r < t.length; r++) {
                        var o = t[r];
                        if (o === e) return e.parent = null, t.splice(r, 1), !0;
                        if (this.removeResourceFromTree(e, o.children)) return !0
                    }
                    return !1
                }, t.prototype.buildResource = function(e) {
                    var r = this,
                        o = n.extend({}, e),
                        s = e.eventClassName;
                    return o.id = String(null != e.id ? e.id : "_fc" + t.resourceGuid++), o.eventClassName = function() {
                        switch (n.type(s)) {
                            case "string":
                                return s.split(/\s+/);
                            case "array":
                                return s;
                            default:
                                return []
                        }
                    }(), e.businessHours && (o.businessHourGenerator = new i.BusinessHourGenerator(e.businessHours, this.calendar)), o.children = (e.children || []).map(function(e) {
                        var t = r.buildResource(e);
                        return t.parent = o, t
                    }), o
                }, t.resourceGuid = 1, t.ajaxDefaults = {
                    dataType: "json",
                    cache: !1
                }, t
            }(i.Class);
        t["default"] = s, i.EmitterMixin.mixInto(s)
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(2),
            n = r(0),
            i = r(19),
            s = r(6),
            a = {
                getPeerEventInstances: n.Constraints.prototype.getPeerEventInstances,
                isFootprintAllowed: n.Constraints.prototype.isFootprintAllowed,
                buildCurrentBusinessFootprints: n.Constraints.prototype.buildCurrentBusinessFootprints,
                footprintContainsFootprint: n.Constraints.prototype.footprintContainsFootprint,
                footprintsIntersect: n.Constraints.prototype.footprintsIntersect,
                eventRangeToEventFootprints: n.Constraints.prototype.eventRangeToEventFootprints,
                parseFootprints: n.Constraints.prototype.parseFootprints
            };
        n.Constraints.prototype.getPeerEventInstances = function(e) {
            var t = e.getResourceIds(),
                r = a.getPeerEventInstances.apply(this, arguments);
            return t.length ? r.filter(function(e) {
                if (!e.def.resourceIds.length) return !0;
                for (var r = 0, o = t; r < o.length; r++) {
                    var n = o[r];
                    if (e.def.hasResourceId(n)) return !0
                }
                return !1
            }) : r
        }, n.Constraints.prototype.isFootprintAllowed = function(e, t, r, n, l) {
            if ("object" == typeof r) {
                var c = i["default"].extractIds(r, this);
                if (c.length && (!(e instanceof s["default"]) || o.inArray(e.resourceId, c) === -1)) return !1
            }
            return a.isFootprintAllowed.apply(this, arguments)
        }, n.Constraints.prototype.buildCurrentBusinessFootprints = function(e) {
            for (var t = this._calendar.resourceManager.getFlatResources(), r = !1, o = 0, n = t; o < n.length; o++) {
                var i = n[o];
                i.businessHourGenerator && (r = !0)
            }
            if (r) {
                for (var l = this._calendar.view, c = l.get("businessHourGenerator"), u = l.dateProfile.activeUnzonedRange, d = [], h = 0, p = t; h < p.length; h++) {
                    var i = p[h],
                        f = i.businessHourGenerator || c,
                        v = f.buildEventInstanceGroup(e, u);
                    if (v)
                        for (var g = 0, y = v.getAllEventRanges(); g < y.length; g++) {
                            var m = y[g];
                            d.push(new s["default"](m.unzonedRange, e, i.id))
                        }
                }
                return d
            }
            return a.buildCurrentBusinessFootprints.apply(this, arguments)
        }, n.Constraints.prototype.footprintContainsFootprint = function(e, t) {
            return (!(e instanceof s["default"]) || t instanceof s["default"] && t.resourceId === e.resourceId) && a.footprintContainsFootprint.apply(this, arguments)
        }, n.Constraints.prototype.footprintsIntersect = function(e, t) {
            return !(e instanceof s["default"] && t instanceof s["default"] && e.resourceId !== t.resourceId) && a.footprintsIntersect.apply(this, arguments)
        }, n.Constraints.prototype.eventRangeToEventFootprints = function(e) {
            var t = e.eventDef,
                r = t.getResourceIds();
            return r.length ? r.map(function(r) {
                return new n.EventFootprint(new s["default"](e.unzonedRange, t.isAllDay(), r), t, e.eventInstance)
            }) : a.eventRangeToEventFootprints.apply(this, arguments)
        }, n.Constraints.prototype.parseFootprints = function(e) {
            var t = a.parseFootprints.apply(this, arguments),
                r = e.resourceIds || [];
            if (e.resourceId && (r = [e.resourceId].concat(r)), r.length) {
                for (var o = [], n = 0, i = r; n < i.length; n++)
                    for (var l = i[n], c = 0, u = t; c < u.length; c++) {
                        var d = u[c];
                        o.push(new s["default"](d.unzonedRange, d.isAllDay, l))
                    }
                return o
            }
            return t
        }
    }, function(e, t, r) {
        function o(e, t) {
            for (var r = [], n = 0, i = e; n < i.length; n++) {
                var s = i[n];
                if (s.children.length) {
                    var a = o(s.children, t);
                    if (a.length || t[s.id]) {
                        var l = Object.create(s);
                        l.children = a, r.push(l)
                    }
                } else t[s.id] && r.push(s)
            }
            return r
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = r(0),
            i = r(52),
            s = {
                setElement: n.View.prototype.setElement,
                removeElement: n.View.prototype.removeElement,
                triggerViewRender: n.View.prototype.triggerViewRender
            };
        n.View.prototype.canHandleSpecificResources = !1, n.View.prototype.setElement = function() {
            s.setElement.apply(this, arguments), this.watchResources()
        }, n.View.prototype.removeElement = function() {
            this.unwatchResources(), s.removeElement.apply(this, arguments)
        }, n.View.prototype.triggerViewRender = function() {
            i.processLicenseKey(this.opt("schedulerLicenseKey"), this.el), s.triggerViewRender.apply(this, arguments)
        }, n.View.prototype.watchResources = function() {
            var e = this,
                t = [],
                r = ["initialResources"];
            this.opt("refetchResourcesOnNavigate") && t.push("dateProfile"), this.opt("filterResourcesWithEvents") && r.push("currentEvents"), this.watch("initialResources", t, function(t) {
                return e.getInitialResources(t.dateProfile)
            }), this.watch("bindingResources", r, function(t) {
                e.bindResourceChanges(t.currentEvents), e.setResources(t.initialResources, t.currentEvents)
            }, function() {
                e.unbindResourceChanges(), e.unsetResources()
            })
        }, n.View.prototype.unwatchResources = function() {
            this.unwatch("initialResources"), this.unwatch("bindingResources")
        }, n.View.prototype.getInitialResources = function(e) {
            var t = this.calendar;
            return e ? t.resourceManager.getResources(t.msToMoment(e.activeUnzonedRange.startMs, e.isRangeAllDay), t.msToMoment(e.activeUnzonedRange.endMs, e.isRangeAllDay)) : t.resourceManager.getResources()
        }, n.View.prototype.bindResourceChanges = function(e) {
            var t = this;
            this.listenTo(this.calendar.resourceManager, {
                set: function(r) {
                    t.setResources(r, e)
                },
                unset: function() {
                    t.unsetResources()
                },
                reset: function(r) {
                    t.resetResources(r, e)
                },
                add: function(r, o) {
                    t.addResource(r, o, e)
                },
                remove: function(r, o) {
                    t.removeResource(r, o, e)
                }
            })
        }, n.View.prototype.unbindResourceChanges = function() {
            this.stopListeningTo(this.calendar.resourceManager)
        }, n.View.watch("displayingEvents", ["displayingDates", "hasEvents", "currentResources"], function(e) {
            this.requestEventsRender(this.get("currentEvents"))
        }, function() {
            this.requestEventsUnrender()
        }), n.View.prototype.setResources = function(e, t) {
            t && (e = this.filterResourcesWithEvents(e, t)), this.set("currentResources", e), this.set("hasResources", !0)
        }, n.View.prototype.unsetResources = function() {
            this.unset("currentResources"), this.unset("hasResources")
        }, n.View.prototype.resetResources = function(e, t) {
            this.startBatchRender(), this.unsetResources(), this.setResources(e, t), this.stopBatchRender()
        }, n.View.prototype.addResource = function(e, t, r) {
            if (!this.canHandleSpecificResources) return void this.resetResources(t, r);
            if (r) {
                var o = this.filterResourcesWithEvents([e], r);
                o.length || (e = null)
            }
            e && (this.set("currentResources", t), this.handleResourceAdd(e))
        }, n.View.prototype.removeResource = function(e, t, r) {
            return this.canHandleSpecificResources ? (this.set("currentResources", t), void this.handleResourceRemove(e)) : void this.resetResources(t, r)
        }, n.View.prototype.handleResourceAdd = function(e) {}, n.View.prototype.handleResourceRemove = function(e) {}, n.View.prototype.filterResourcesWithEvents = function(e, t) {
            for (var r = this.eventsPayloadToRanges(t), n = {}, i = 0, s = r; i < s.length; i++)
                for (var a = s[i], l = 0, c = a.eventDef.getResourceIds(); l < c.length; l++) {
                    var u = c[l];
                    n[u] = !0
                }
            return o(e, n)
        }, n.View.prototype.eventsPayloadToRanges = function(e) {
            var t = this._getDateProfile(),
                r = [];
            for (var o in e) {
                var n = e[o],
                    i = n.sliceRenderRanges(t.activeUnzonedRange);
                r.push.apply(r, i || [])
            }
            return r
        }
    }, function(e, t, r) {
        function o(e, t) {
            if (!i(window.location.href) && !n(e) && !a(t)) return s('Please use a valid license key. <a href="' + p + '">More Info</a>', t)
        }

        function n(e) {
            if (l.inArray(e, f) !== -1) return !0;
            var t = (e || "").match(/^(\d+)\-fcs\-(\d+)$/);
            if (t && 10 === t[1].length) {
                var r = c.utc(1e3 * parseInt(t[2], 10)),
                    o = c.utc(u.mockSchedulerReleaseDate || d);
                if (o.isValid()) {
                    var n = o.clone().subtract(h);
                    if (r.isAfter(n)) return !0
                }
            }
            return !1
        }

        function i(e) {
            return /\w+\:\/\/fullcalendar\.io\/|\/demos\/[\w-]+\.html$/.test(e)
        }

        function s(e, t) {
            return t.append(l('<div class="fc-license-message" />').html(e))
        }

        function a(e) {
            return e.find(".fc-license-message").length >= 1
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var l = r(2),
            c = r(15),
            u = r(0),
            d = "2018-03-27",
            h = {
                years: 1,
                weeks: 1
            },
            p = "http://fullcalendar.io/scheduler/license/",
            f = ["GPL-My-Project-Is-Open-Source", "CC-Attribution-NonCommercial-NoDerivatives"];
        t.processLicenseKey = o, t.isValidKey = n, t.isImmuneUrl = i, t.renderingWarningInContainer = s, t.detectWarningInContainer = a
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(0),
            n = r(6),
            i = {
                eventRangeToEventFootprints: o.DateComponent.prototype.eventRangeToEventFootprints
            };
        o.DateComponent.prototype.isResourceFootprintsEnabled = !1, o.DateComponent.prototype.eventRangeToEventFootprints = function(e) {
            if (this.isResourceFootprintsEnabled) {
                var t = e.eventDef,
                    r = t.getResourceIds();
                return r.length ? r.map(function(r) {
                    return new o.EventFootprint(new n["default"](e.unzonedRange, t.isAllDay(), r), t, e.eventInstance)
                }) : t.hasBgRendering() ? i.eventRangeToEventFootprints.apply(this, arguments) : []
            }
            return i.eventRangeToEventFootprints.apply(this, arguments)
        }, o.DateComponent.prototype.renderResources = function(e) {
            this.callChildren("renderResources", arguments)
        }, o.DateComponent.prototype.unrenderResources = function() {
            this.callChildren("unrenderResources", arguments)
        }, o.DateComponent.prototype.renderResource = function(e) {
            this.callChildren("renderResource", arguments)
        }, o.DateComponent.prototype.unrenderResource = function(e) {
            this.callChildren("unrenderResource", arguments)
        }
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(0),
            n = {
                isEventDefDraggable: o.InteractiveDateComponent.prototype.isEventDefDraggable
            };
        o.InteractiveDateComponent.prototype.allowCrossResource = !0, o.InteractiveDateComponent.prototype.isEventDefDraggable = function(e) {
            return this.isEventDefResourceEditable(e) || n.isEventDefDraggable.call(this, e)
        }, o.InteractiveDateComponent.prototype.isEventDefResourceEditable = function(e) {
            var t = e.resourceEditable;
            return null == t && (t = (e.source || {}).resourceEditable, null == t && (t = this.opt("eventResourceEditable"), null == t && (t = this.isEventDefGenerallyEditable(e)))), t
        }
    }, function(e, t, r) {
        function o(e, t) {
            return e.view.calendar.resourceManager.getResourceById(t)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = r(0),
            i = {
                getFallbackStylingObjs: n.EventRenderer.prototype.getFallbackStylingObjs
            };
        n.EventRenderer.prototype.designatedResource = null, n.EventRenderer.prototype.currentResource = null, n.EventRenderer.prototype.beforeFgSegHtml = function(e) {
            var t = e.footprint.componentFootprint.resourceId;
            this.designatedResource ? this.currentResource = this.designatedResource : t ? this.currentResource = o(this, t) : this.currentResource = null
        }, n.EventRenderer.prototype.getFallbackStylingObjs = function(e) {
            var t = i.getFallbackStylingObjs.apply(this, arguments);
            if (this.currentResource) t.unshift(this.currentResource);
            else {
                for (var r = [], n = 0, s = e.getResourceIds(); n < s.length; n++) {
                    var a = s[n],
                        l = o(this, a);
                    l && r.push(l)
                }
                t = r.concat(t)
            }
            return t
        }
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(0),
            n = r(6),
            i = {
                computeSelectionFootprint: o.DateSelecting.prototype.computeSelectionFootprint
            };
        o.DateSelecting.prototype.computeSelectionFootprint = function(e, t) {
            if (e.resourceId && t.resourceId && e.resourceId !== t.resourceId && !this.component.allowCrossResource) return null;
            var r = i.computeSelectionFootprint.apply(this, arguments);
            return e.resourceId && (r = new n["default"](r.unzonedRange, r.isAllDay, e.resourceId)), r
        }
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(0),
            n = {
                computeEventDropMutation: o.EventDragging.prototype.computeEventDropMutation
            };
        o.EventDragging.prototype.computeEventDropMutation = function(e, t, r) {
            var i = this.component.isEventDefStartEditable(r);
            if (e.resourceId && t.resourceId && e.resourceId !== t.resourceId && this.component.isEventDefResourceEditable(r)) {
                var s = new o.EventDefMutation;
                return s.oldResourceId = e.resourceId, s.newResourceId = t.resourceId, i && s.setDateMutation(this.computeEventDateMutation(e, t)), s
            }
            if (i) return n.computeEventDropMutation.apply(this, arguments)
        }
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(0),
            n = {
                computeEventStartResizeMutation: o.EventResizing.prototype.computeEventStartResizeMutation,
                computeEventEndResizeMutation: o.EventResizing.prototype.computeEventEndResizeMutation
            };
        o.EventResizing.prototype.computeEventStartResizeMutation = function(e, t, r) {
            return e.resourceId && t.resourceId && e.resourceId !== t.resourceId && !this.component.allowCrossResource ? null : n.computeEventStartResizeMutation.apply(this, arguments)
        }, o.EventResizing.prototype.computeEventEndResizeMutation = function(e, t, r) {
            return e.resourceId && t.resourceId && e.resourceId !== t.resourceId && !this.component.allowCrossResource ? null : n.computeEventEndResizeMutation.apply(this, arguments)
        }
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(0),
            n = {
                computeExternalDrop: o.ExternalDropping.prototype.computeExternalDrop
            };
        o.ExternalDropping.prototype.computeExternalDrop = function(e, t) {
            var r = n.computeExternalDrop.apply(this, arguments);
            return e.resourceId && r.addResourceId(e.resourceId), r
        }
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(0);
        o.EventSource.prototype.standardPropMap.resourceEditable = !0
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(2),
            n = r(0),
            i = r(19),
            s = {
                applyMiscProps: n.EventDef.prototype.applyMiscProps,
                clone: n.EventDef.prototype.clone,
                toLegacy: n.EventDef.prototype.toLegacy
            };
        n.EventDef.defineStandardProps({
            resourceEditable: !0
        }), n.EventDef.prototype.resourceIds = null, n.EventDef.prototype.resourceEditable = null, n.EventDef.prototype.applyMiscProps = function(e) {
            e = o.extend({}, e), this.resourceIds = i["default"].extractIds(e, this.source.calendar), delete e.resourceId, delete e.resourceIds, s.applyMiscProps.apply(this, arguments)
        }, n.EventDef.prototype.hasResourceId = function(e) {
            return o.inArray(e, this.resourceIds) !== -1
        }, n.EventDef.prototype.removeResourceId = function(e) {
            n.removeExact(this.resourceIds, e)
        }, n.EventDef.prototype.addResourceId = function(e) {
            this.hasResourceId(e) || this.resourceIds.push(e)
        }, n.EventDef.prototype.getResourceIds = function() {
            return this.resourceIds ? this.resourceIds.slice() : []
        }, n.EventDef.prototype.clone = function() {
            var e = s.clone.apply(this, arguments);
            return e.resourceIds = this.getResourceIds(), e
        }, n.EventDef.prototype.toLegacy = function() {
            var e = s.toLegacy.apply(this, arguments),
                t = this.getResourceIds();
            return e.resourceId = 1 === t.length ? t[0] : null, e.resourceIds = t.length > 1 ? t : null, null != this.resourceEditable && (e.resourceEditable = this.resourceEditable), e
        }
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(0),
            n = o.EventDefMutation.prototype.mutateSingle;
        o.EventDefMutation.prototype.oldResourceId = null, o.EventDefMutation.prototype.newResourceId = null, o.EventDefMutation.prototype.mutateSingle = function(e) {
            var t = n.apply(this, arguments),
                r = null;
            return this.oldResourceId && e.hasResourceId(this.oldResourceId) && (r = e.getResourceIds(), e.removeResourceId(this.oldResourceId), e.addResourceId(this.newResourceId)),
                function() {
                    t(), r && (e.resourceIds = r)
                }
        }
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(0),
            n = r(14);
        o.defineView("timeline", {
            "class": n["default"],
            defaults: {
                eventResizableFromStart: !0
            }
        }), o.defineView("timelineDay", {
            type: "timeline",
            duration: {
                days: 1
            }
        }), o.defineView("timelineWeek", {
            type: "timeline",
            duration: {
                weeks: 1
            }
        }), o.defineView("timelineMonth", {
            type: "timeline",
            duration: {
                months: 1
            }
        }), o.defineView("timelineYear", {
            type: "timeline",
            duration: {
                years: 1
            }
        })
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(0),
            n = r(30);
        o.getViewConfig("timeline").resourceClass = n["default"], o.Calendar.defaults.resourcesInitiallyExpanded = !0
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(0),
            n = r(22),
            i = r(23);
        o.getViewConfig("basic").queryResourceClass = function(e) {
            var t = e.options.groupByResource || e.options.groupByDateAndResource,
                r = !1;
            if (null != t ? r = t : e.duration && (r = 1 === e.duration.as("days")), r) return n["default"]
        }, o.getViewConfig("month").queryResourceClass = function(e) {
            if (e.options.groupByResource || e.options.groupByDateAndResource) return i["default"]
        }
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = r(0),
            n = r(20);
        o.getViewConfig("agenda").queryResourceClass = function(e) {
            var t = e.options.groupByResource || e.options.groupByDateAndResource,
                r = !1;
            if (null != t ? r = t : e.duration && (r = 1 === e.duration.as("days")), r) return n["default"]
        }
    }, function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }])
});
