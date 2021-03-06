(() => {
  "use strict";
  const e = {};
  let t = (e, t = 500, n = 0) => {
      e.classList.contains("_slide") ||
        (e.classList.add("_slide"),
        (e.style.transitionProperty = "height, margin, padding"),
        (e.style.transitionDuration = t + "ms"),
        (e.style.height = `${e.offsetHeight}px`),
        e.offsetHeight,
        (e.style.overflow = "hidden"),
        (e.style.height = n ? `${n}px` : "0px"),
        (e.style.paddingTop = 0),
        (e.style.paddingBottom = 0),
        (e.style.marginTop = 0),
        (e.style.marginBottom = 0),
        window.setTimeout(() => {
          (e.hidden = !n),
            !n && e.style.removeProperty("height"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            !n && e.style.removeProperty("overflow"),
            e.style.removeProperty("transition-duration"),
            e.style.removeProperty("transition-property"),
            e.classList.remove("_slide"),
            document.dispatchEvent(
              new CustomEvent("slideUpDone", { detail: { target: e } })
            );
        }, t));
    },
    n = (e, t = 500, n = 0) => {
      if (!e.classList.contains("_slide")) {
        e.classList.add("_slide"),
          (e.hidden = !e.hidden && null),
          n && e.style.removeProperty("height");
        let i = e.offsetHeight;
        (e.style.overflow = "hidden"),
          (e.style.height = n ? `${n}px` : "0px"),
          (e.style.paddingTop = 0),
          (e.style.paddingBottom = 0),
          (e.style.marginTop = 0),
          (e.style.marginBottom = 0),
          e.offsetHeight,
          (e.style.transitionProperty = "height, margin, padding"),
          (e.style.transitionDuration = t + "ms"),
          (e.style.height = i + "px"),
          e.style.removeProperty("padding-top"),
          e.style.removeProperty("padding-bottom"),
          e.style.removeProperty("margin-top"),
          e.style.removeProperty("margin-bottom"),
          window.setTimeout(() => {
            e.style.removeProperty("height"),
              e.style.removeProperty("overflow"),
              e.style.removeProperty("transition-duration"),
              e.style.removeProperty("transition-property"),
              e.classList.remove("_slide"),
              document.dispatchEvent(
                new CustomEvent("slideDownDone", { detail: { target: e } })
              );
          }, t);
      }
    },
    i = !0,
    r = (e = 500) => {
      let t = document.querySelector("body");
      if (i) {
        let n = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < n.length; e++) {
            n[e].style.paddingRight = "0px";
          }
          (t.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (i = !1),
          setTimeout(function () {
            i = !0;
          }, e);
      }
    },
    s = (e = 500) => {
      let t = document.querySelector("body");
      if (i) {
        let n = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < n.length; e++) {
          n[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (t.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (i = !1),
          setTimeout(function () {
            i = !0;
          }, e);
      }
    };
  function o(e) {
    setTimeout(() => {
      window.FLS && console.log(e);
    }, 0);
  }
  function a(e) {
    return e.filter(function (e, t, n) {
      return n.indexOf(e) === t;
    });
  }
  function l(e, t) {
    const n = Array.from(e).filter(function (e, n, i) {
      if (e.dataset[t]) return e.dataset[t].split(",")[0];
    });
    if (n.length) {
      const e = [];
      n.forEach((n) => {
        const i = {},
          r = n.dataset[t].split(",");
        (i.value = r[0]),
          (i.type = r[1] ? r[1].trim() : "max"),
          (i.item = n),
          e.push(i);
      });
      let i = e.map(function (e) {
        return (
          "(" + e.type + "-width: " + e.value + "px)," + e.value + "," + e.type
        );
      });
      i = a(i);
      const r = [];
      if (i.length)
        return (
          i.forEach((t) => {
            const n = t.split(","),
              i = n[1],
              s = n[2],
              o = window.matchMedia(n[0]),
              a = e.filter(function (e) {
                if (e.value === i && e.type === s) return !0;
              });
            r.push({ itemsArray: a, matchMedia: o });
          }),
          r
        );
    }
  }
  let c = (e, t = !1, n = 500, i = 0) => {
    const s = "string" == typeof e ? document.querySelector(e) : e;
    if (s) {
      let a = "",
        l = 0;
      t &&
        ((a = "header.header"), (l = document.querySelector(a).offsetHeight));
      let c = {
        speedAsDuration: !0,
        speed: n,
        header: a,
        offset: i,
        easing: "easeOutQuad",
      };
      if (
        (document.documentElement.classList.contains("menu-open") &&
          (r(), document.documentElement.classList.remove("menu-open")),
        "undefined" != typeof SmoothScroll)
      )
        new SmoothScroll().animateScroll(s, "", c);
      else {
        let e = s.getBoundingClientRect().top + scrollY;
        window.scrollTo({ top: l ? e - l : e, behavior: "smooth" });
      }
      o(`[gotoBlock]: ????????...???????? ?? ${e}`);
    } else o(`[gotoBlock]: ???? ????..???????????? ?????????? ?????? ???? ????????????????: ${e}`);
  };
  let d = {
    getErrors(e) {
      let t = 0,
        n = e.querySelectorAll("*[data-required]");
      return (
        n.length &&
          n.forEach((e) => {
            (null === e.offsetParent && "SELECT" !== e.tagName) ||
              e.disabled ||
              (t += this.validateInput(e));
          }),
        t
      );
    },
    validateInput(e) {
      let t = 0;
      return (
        "email" === e.dataset.required
          ? ((e.value = e.value.replace(" ", "")),
            this.emailTest(e) ? (this.addError(e), t++) : this.removeError(e))
          : ("checkbox" !== e.type || e.checked) && e.value
          ? this.removeError(e)
          : (this.addError(e), t++),
        t
      );
    },
    addError(e) {
      e.classList.add("_form-error"),
        e.parentElement.classList.add("_form-error");
      let t = e.parentElement.querySelector(".form__error");
      t && e.parentElement.removeChild(t),
        e.dataset.error &&
          e.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="form__error">${e.dataset.error}</div>`
          );
    },
    removeError(e) {
      e.classList.remove("_form-error"),
        e.parentElement.classList.remove("_form-error"),
        e.parentElement.querySelector(".form__error") &&
          e.parentElement.removeChild(
            e.parentElement.querySelector(".form__error")
          );
    },
    formClean(t) {
      t.reset(),
        setTimeout(() => {
          let n = t.querySelectorAll("input,textarea");
          for (let e = 0; e < n.length; e++) {
            const t = n[e];
            t.parentElement.classList.remove("_form-focus"),
              t.classList.remove("_form-focus"),
              d.removeError(t);
          }
          let i = t.querySelectorAll(".checkbox__input");
          if (i.length > 0)
            for (let e = 0; e < i.length; e++) {
              i[e].checked = !1;
            }
          if (e.select) {
            let n = t.querySelectorAll(".select");
            if (n.length)
              for (let t = 0; t < n.length; t++) {
                const i = n[t].querySelector("select");
                e.select.selectBuild(i);
              }
          }
        }, 0);
    },
    emailTest: (e) =>
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
  };
  function p(e) {
    if (null == e) return window;
    if ("[object Window]" !== e.toString()) {
      var t = e.ownerDocument;
      return (t && t.defaultView) || window;
    }
    return e;
  }
  function u(e) {
    return e instanceof p(e).Element || e instanceof Element;
  }
  function f(e) {
    return e instanceof p(e).HTMLElement || e instanceof HTMLElement;
  }
  function h(e) {
    return (
      "undefined" != typeof ShadowRoot &&
      (e instanceof p(e).ShadowRoot || e instanceof ShadowRoot)
    );
  }
  var m = Math.max,
    g = Math.min,
    v = Math.round;
  function y(e, t) {
    void 0 === t && (t = !1);
    var n = e.getBoundingClientRect(),
      i = 1,
      r = 1;
    if (f(e) && t) {
      var s = e.offsetHeight,
        o = e.offsetWidth;
      o > 0 && (i = v(n.width) / o || 1), s > 0 && (r = v(n.height) / s || 1);
    }
    return {
      width: n.width / i,
      height: n.height / r,
      top: n.top / r,
      right: n.right / i,
      bottom: n.bottom / r,
      left: n.left / i,
      x: n.left / i,
      y: n.top / r,
    };
  }
  function b(e) {
    var t = p(e);
    return { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset };
  }
  function w(e) {
    return e ? (e.nodeName || "").toLowerCase() : null;
  }
  function E(e) {
    return ((u(e) ? e.ownerDocument : e.document) || window.document)
      .documentElement;
  }
  function x(e) {
    return y(E(e)).left + b(e).scrollLeft;
  }
  function T(e) {
    return p(e).getComputedStyle(e);
  }
  function S(e) {
    var t = T(e),
      n = t.overflow,
      i = t.overflowX,
      r = t.overflowY;
    return /auto|scroll|overlay|hidden/.test(n + r + i);
  }
  function C(e, t, n) {
    void 0 === n && (n = !1);
    var i,
      r,
      s = f(t),
      o =
        f(t) &&
        (function (e) {
          var t = e.getBoundingClientRect(),
            n = v(t.width) / e.offsetWidth || 1,
            i = v(t.height) / e.offsetHeight || 1;
          return 1 !== n || 1 !== i;
        })(t),
      a = E(t),
      l = y(e, o),
      c = { scrollLeft: 0, scrollTop: 0 },
      d = { x: 0, y: 0 };
    return (
      (s || (!s && !n)) &&
        (("body" !== w(t) || S(a)) &&
          (c =
            (i = t) !== p(i) && f(i)
              ? { scrollLeft: (r = i).scrollLeft, scrollTop: r.scrollTop }
              : b(i)),
        f(t)
          ? (((d = y(t, !0)).x += t.clientLeft), (d.y += t.clientTop))
          : a && (d.x = x(a))),
      {
        x: l.left + c.scrollLeft - d.x,
        y: l.top + c.scrollTop - d.y,
        width: l.width,
        height: l.height,
      }
    );
  }
  function L(e) {
    var t = y(e),
      n = e.offsetWidth,
      i = e.offsetHeight;
    return (
      Math.abs(t.width - n) <= 1 && (n = t.width),
      Math.abs(t.height - i) <= 1 && (i = t.height),
      { x: e.offsetLeft, y: e.offsetTop, width: n, height: i }
    );
  }
  function A(e) {
    return "html" === w(e)
      ? e
      : e.assignedSlot || e.parentNode || (h(e) ? e.host : null) || E(e);
  }
  function O(e) {
    return ["html", "body", "#document"].indexOf(w(e)) >= 0
      ? e.ownerDocument.body
      : f(e) && S(e)
      ? e
      : O(A(e));
  }
  function k(e, t) {
    var n;
    void 0 === t && (t = []);
    var i = O(e),
      r = i === (null == (n = e.ownerDocument) ? void 0 : n.body),
      s = p(i),
      o = r ? [s].concat(s.visualViewport || [], S(i) ? i : []) : i,
      a = t.concat(o);
    return r ? a : a.concat(k(A(o)));
  }
  function M(e) {
    return ["table", "td", "th"].indexOf(w(e)) >= 0;
  }
  function P(e) {
    return f(e) && "fixed" !== T(e).position ? e.offsetParent : null;
  }
  function _(e) {
    for (var t = p(e), n = P(e); n && M(n) && "static" === T(n).position; )
      n = P(n);
    return n &&
      ("html" === w(n) || ("body" === w(n) && "static" === T(n).position))
      ? t
      : n ||
          (function (e) {
            var t = -1 !== navigator.userAgent.toLowerCase().indexOf("firefox");
            if (
              -1 !== navigator.userAgent.indexOf("Trident") &&
              f(e) &&
              "fixed" === T(e).position
            )
              return null;
            for (var n = A(e); f(n) && ["html", "body"].indexOf(w(n)) < 0; ) {
              var i = T(n);
              if (
                "none" !== i.transform ||
                "none" !== i.perspective ||
                "paint" === i.contain ||
                -1 !== ["transform", "perspective"].indexOf(i.willChange) ||
                (t && "filter" === i.willChange) ||
                (t && i.filter && "none" !== i.filter)
              )
                return n;
              n = n.parentNode;
            }
            return null;
          })(e) ||
          t;
  }
  var $ = "top",
    D = "bottom",
    I = "right",
    j = "left",
    z = "auto",
    B = [$, D, I, j],
    N = "start",
    W = "end",
    q = "viewport",
    H = "popper",
    G = B.reduce(function (e, t) {
      return e.concat([t + "-" + N, t + "-" + W]);
    }, []),
    V = [].concat(B, [z]).reduce(function (e, t) {
      return e.concat([t, t + "-" + N, t + "-" + W]);
    }, []),
    R = [
      "beforeRead",
      "read",
      "afterRead",
      "beforeMain",
      "main",
      "afterMain",
      "beforeWrite",
      "write",
      "afterWrite",
    ];
  function F(e) {
    var t = new Map(),
      n = new Set(),
      i = [];
    function r(e) {
      n.add(e.name),
        []
          .concat(e.requires || [], e.requiresIfExists || [])
          .forEach(function (e) {
            if (!n.has(e)) {
              var i = t.get(e);
              i && r(i);
            }
          }),
        i.push(e);
    }
    return (
      e.forEach(function (e) {
        t.set(e.name, e);
      }),
      e.forEach(function (e) {
        n.has(e.name) || r(e);
      }),
      i
    );
  }
  var X = { placement: "bottom", modifiers: [], strategy: "absolute" };
  function Y() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    return !t.some(function (e) {
      return !(e && "function" == typeof e.getBoundingClientRect);
    });
  }
  function U(e) {
    void 0 === e && (e = {});
    var t = e,
      n = t.defaultModifiers,
      i = void 0 === n ? [] : n,
      r = t.defaultOptions,
      s = void 0 === r ? X : r;
    return function (e, t, n) {
      void 0 === n && (n = s);
      var r,
        o,
        a = {
          placement: "bottom",
          orderedModifiers: [],
          options: Object.assign({}, X, s),
          modifiersData: {},
          elements: { reference: e, popper: t },
          attributes: {},
          styles: {},
        },
        l = [],
        c = !1,
        d = {
          state: a,
          setOptions: function (n) {
            var r = "function" == typeof n ? n(a.options) : n;
            p(),
              (a.options = Object.assign({}, s, a.options, r)),
              (a.scrollParents = {
                reference: u(e)
                  ? k(e)
                  : e.contextElement
                  ? k(e.contextElement)
                  : [],
                popper: k(t),
              });
            var o = (function (e) {
              var t = F(e);
              return R.reduce(function (e, n) {
                return e.concat(
                  t.filter(function (e) {
                    return e.phase === n;
                  })
                );
              }, []);
            })(
              (function (e) {
                var t = e.reduce(function (e, t) {
                  var n = e[t.name];
                  return (
                    (e[t.name] = n
                      ? Object.assign({}, n, t, {
                          options: Object.assign({}, n.options, t.options),
                          data: Object.assign({}, n.data, t.data),
                        })
                      : t),
                    e
                  );
                }, {});
                return Object.keys(t).map(function (e) {
                  return t[e];
                });
              })([].concat(i, a.options.modifiers))
            );
            return (
              (a.orderedModifiers = o.filter(function (e) {
                return e.enabled;
              })),
              a.orderedModifiers.forEach(function (e) {
                var t = e.name,
                  n = e.options,
                  i = void 0 === n ? {} : n,
                  r = e.effect;
                if ("function" == typeof r) {
                  var s = r({ state: a, name: t, instance: d, options: i }),
                    o = function () {};
                  l.push(s || o);
                }
              }),
              d.update()
            );
          },
          forceUpdate: function () {
            if (!c) {
              var e = a.elements,
                t = e.reference,
                n = e.popper;
              if (Y(t, n)) {
                (a.rects = {
                  reference: C(t, _(n), "fixed" === a.options.strategy),
                  popper: L(n),
                }),
                  (a.reset = !1),
                  (a.placement = a.options.placement),
                  a.orderedModifiers.forEach(function (e) {
                    return (a.modifiersData[e.name] = Object.assign(
                      {},
                      e.data
                    ));
                  });
                for (var i = 0; i < a.orderedModifiers.length; i++)
                  if (!0 !== a.reset) {
                    var r = a.orderedModifiers[i],
                      s = r.fn,
                      o = r.options,
                      l = void 0 === o ? {} : o,
                      p = r.name;
                    "function" == typeof s &&
                      (a =
                        s({ state: a, options: l, name: p, instance: d }) || a);
                  } else (a.reset = !1), (i = -1);
              }
            }
          },
          update:
            ((r = function () {
              return new Promise(function (e) {
                d.forceUpdate(), e(a);
              });
            }),
            function () {
              return (
                o ||
                  (o = new Promise(function (e) {
                    Promise.resolve().then(function () {
                      (o = void 0), e(r());
                    });
                  })),
                o
              );
            }),
          destroy: function () {
            p(), (c = !0);
          },
        };
      if (!Y(e, t)) return d;
      function p() {
        l.forEach(function (e) {
          return e();
        }),
          (l = []);
      }
      return (
        d.setOptions(n).then(function (e) {
          !c && n.onFirstUpdate && n.onFirstUpdate(e);
        }),
        d
      );
    };
  }
  var Q = { passive: !0 };
  const K = {
    name: "eventListeners",
    enabled: !0,
    phase: "write",
    fn: function () {},
    effect: function (e) {
      var t = e.state,
        n = e.instance,
        i = e.options,
        r = i.scroll,
        s = void 0 === r || r,
        o = i.resize,
        a = void 0 === o || o,
        l = p(t.elements.popper),
        c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
      return (
        s &&
          c.forEach(function (e) {
            e.addEventListener("scroll", n.update, Q);
          }),
        a && l.addEventListener("resize", n.update, Q),
        function () {
          s &&
            c.forEach(function (e) {
              e.removeEventListener("scroll", n.update, Q);
            }),
            a && l.removeEventListener("resize", n.update, Q);
        }
      );
    },
    data: {},
  };
  function Z(e) {
    return e.split("-")[0];
  }
  function J(e) {
    return e.split("-")[1];
  }
  function ee(e) {
    return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
  }
  function te(e) {
    var t,
      n = e.reference,
      i = e.element,
      r = e.placement,
      s = r ? Z(r) : null,
      o = r ? J(r) : null,
      a = n.x + n.width / 2 - i.width / 2,
      l = n.y + n.height / 2 - i.height / 2;
    switch (s) {
      case $:
        t = { x: a, y: n.y - i.height };
        break;
      case D:
        t = { x: a, y: n.y + n.height };
        break;
      case I:
        t = { x: n.x + n.width, y: l };
        break;
      case j:
        t = { x: n.x - i.width, y: l };
        break;
      default:
        t = { x: n.x, y: n.y };
    }
    var c = s ? ee(s) : null;
    if (null != c) {
      var d = "y" === c ? "height" : "width";
      switch (o) {
        case N:
          t[c] = t[c] - (n[d] / 2 - i[d] / 2);
          break;
        case W:
          t[c] = t[c] + (n[d] / 2 - i[d] / 2);
      }
    }
    return t;
  }
  var ne = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
  function ie(e) {
    var t,
      n = e.popper,
      i = e.popperRect,
      r = e.placement,
      s = e.variation,
      o = e.offsets,
      a = e.position,
      l = e.gpuAcceleration,
      c = e.adaptive,
      d = e.roundOffsets,
      u = e.isFixed,
      f = o.x,
      h = void 0 === f ? 0 : f,
      m = o.y,
      g = void 0 === m ? 0 : m,
      y = "function" == typeof d ? d({ x: h, y: g }) : { x: h, y: g };
    (h = y.x), (g = y.y);
    var b = o.hasOwnProperty("x"),
      w = o.hasOwnProperty("y"),
      x = j,
      S = $,
      C = window;
    if (c) {
      var L = _(n),
        A = "clientHeight",
        O = "clientWidth";
      if (
        (L === p(n) &&
          "static" !== T((L = E(n))).position &&
          "absolute" === a &&
          ((A = "scrollHeight"), (O = "scrollWidth")),
        (L = L),
        r === $ || ((r === j || r === I) && s === W))
      )
        (S = D),
          (g -=
            (u && C.visualViewport ? C.visualViewport.height : L[A]) -
            i.height),
          (g *= l ? 1 : -1);
      if (r === j || ((r === $ || r === D) && s === W))
        (x = I),
          (h -=
            (u && C.visualViewport ? C.visualViewport.width : L[O]) - i.width),
          (h *= l ? 1 : -1);
    }
    var k,
      M = Object.assign({ position: a }, c && ne),
      P =
        !0 === d
          ? (function (e) {
              var t = e.x,
                n = e.y,
                i = window.devicePixelRatio || 1;
              return { x: v(t * i) / i || 0, y: v(n * i) / i || 0 };
            })({ x: h, y: g })
          : { x: h, y: g };
    return (
      (h = P.x),
      (g = P.y),
      l
        ? Object.assign(
            {},
            M,
            (((k = {})[S] = w ? "0" : ""),
            (k[x] = b ? "0" : ""),
            (k.transform =
              (C.devicePixelRatio || 1) <= 1
                ? "translate(" + h + "px, " + g + "px)"
                : "translate3d(" + h + "px, " + g + "px, 0)"),
            k)
          )
        : Object.assign(
            {},
            M,
            (((t = {})[S] = w ? g + "px" : ""),
            (t[x] = b ? h + "px" : ""),
            (t.transform = ""),
            t)
          )
    );
  }
  const re = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: function (e) {
      var t = e.state;
      Object.keys(t.elements).forEach(function (e) {
        var n = t.styles[e] || {},
          i = t.attributes[e] || {},
          r = t.elements[e];
        f(r) &&
          w(r) &&
          (Object.assign(r.style, n),
          Object.keys(i).forEach(function (e) {
            var t = i[e];
            !1 === t
              ? r.removeAttribute(e)
              : r.setAttribute(e, !0 === t ? "" : t);
          }));
      });
    },
    effect: function (e) {
      var t = e.state,
        n = {
          popper: {
            position: t.options.strategy,
            left: "0",
            top: "0",
            margin: "0",
          },
          arrow: { position: "absolute" },
          reference: {},
        };
      return (
        Object.assign(t.elements.popper.style, n.popper),
        (t.styles = n),
        t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
        function () {
          Object.keys(t.elements).forEach(function (e) {
            var i = t.elements[e],
              r = t.attributes[e] || {},
              s = Object.keys(
                t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]
              ).reduce(function (e, t) {
                return (e[t] = ""), e;
              }, {});
            f(i) &&
              w(i) &&
              (Object.assign(i.style, s),
              Object.keys(r).forEach(function (e) {
                i.removeAttribute(e);
              }));
          });
        }
      );
    },
    requires: ["computeStyles"],
  };
  const se = {
    name: "offset",
    enabled: !0,
    phase: "main",
    requires: ["popperOffsets"],
    fn: function (e) {
      var t = e.state,
        n = e.options,
        i = e.name,
        r = n.offset,
        s = void 0 === r ? [0, 0] : r,
        o = V.reduce(function (e, n) {
          return (
            (e[n] = (function (e, t, n) {
              var i = Z(e),
                r = [j, $].indexOf(i) >= 0 ? -1 : 1,
                s =
                  "function" == typeof n
                    ? n(Object.assign({}, t, { placement: e }))
                    : n,
                o = s[0],
                a = s[1];
              return (
                (o = o || 0),
                (a = (a || 0) * r),
                [j, I].indexOf(i) >= 0 ? { x: a, y: o } : { x: o, y: a }
              );
            })(n, t.rects, s)),
            e
          );
        }, {}),
        a = o[t.placement],
        l = a.x,
        c = a.y;
      null != t.modifiersData.popperOffsets &&
        ((t.modifiersData.popperOffsets.x += l),
        (t.modifiersData.popperOffsets.y += c)),
        (t.modifiersData[i] = o);
    },
  };
  var oe = { left: "right", right: "left", bottom: "top", top: "bottom" };
  function ae(e) {
    return e.replace(/left|right|bottom|top/g, function (e) {
      return oe[e];
    });
  }
  var le = { start: "end", end: "start" };
  function ce(e) {
    return e.replace(/start|end/g, function (e) {
      return le[e];
    });
  }
  function de(e, t) {
    var n = t.getRootNode && t.getRootNode();
    if (e.contains(t)) return !0;
    if (n && h(n)) {
      var i = t;
      do {
        if (i && e.isSameNode(i)) return !0;
        i = i.parentNode || i.host;
      } while (i);
    }
    return !1;
  }
  function pe(e) {
    return Object.assign({}, e, {
      left: e.x,
      top: e.y,
      right: e.x + e.width,
      bottom: e.y + e.height,
    });
  }
  function ue(e, t) {
    return t === q
      ? pe(
          (function (e) {
            var t = p(e),
              n = E(e),
              i = t.visualViewport,
              r = n.clientWidth,
              s = n.clientHeight,
              o = 0,
              a = 0;
            return (
              i &&
                ((r = i.width),
                (s = i.height),
                /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
                  ((o = i.offsetLeft), (a = i.offsetTop))),
              { width: r, height: s, x: o + x(e), y: a }
            );
          })(e)
        )
      : u(t)
      ? (function (e) {
          var t = y(e);
          return (
            (t.top = t.top + e.clientTop),
            (t.left = t.left + e.clientLeft),
            (t.bottom = t.top + e.clientHeight),
            (t.right = t.left + e.clientWidth),
            (t.width = e.clientWidth),
            (t.height = e.clientHeight),
            (t.x = t.left),
            (t.y = t.top),
            t
          );
        })(t)
      : pe(
          (function (e) {
            var t,
              n = E(e),
              i = b(e),
              r = null == (t = e.ownerDocument) ? void 0 : t.body,
              s = m(
                n.scrollWidth,
                n.clientWidth,
                r ? r.scrollWidth : 0,
                r ? r.clientWidth : 0
              ),
              o = m(
                n.scrollHeight,
                n.clientHeight,
                r ? r.scrollHeight : 0,
                r ? r.clientHeight : 0
              ),
              a = -i.scrollLeft + x(e),
              l = -i.scrollTop;
            return (
              "rtl" === T(r || n).direction &&
                (a += m(n.clientWidth, r ? r.clientWidth : 0) - s),
              { width: s, height: o, x: a, y: l }
            );
          })(E(e))
        );
  }
  function fe(e, t, n) {
    var i =
        "clippingParents" === t
          ? (function (e) {
              var t = k(A(e)),
                n =
                  ["absolute", "fixed"].indexOf(T(e).position) >= 0 && f(e)
                    ? _(e)
                    : e;
              return u(n)
                ? t.filter(function (e) {
                    return u(e) && de(e, n) && "body" !== w(e);
                  })
                : [];
            })(e)
          : [].concat(t),
      r = [].concat(i, [n]),
      s = r[0],
      o = r.reduce(function (t, n) {
        var i = ue(e, n);
        return (
          (t.top = m(i.top, t.top)),
          (t.right = g(i.right, t.right)),
          (t.bottom = g(i.bottom, t.bottom)),
          (t.left = m(i.left, t.left)),
          t
        );
      }, ue(e, s));
    return (
      (o.width = o.right - o.left),
      (o.height = o.bottom - o.top),
      (o.x = o.left),
      (o.y = o.top),
      o
    );
  }
  function he(e) {
    return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, e);
  }
  function me(e, t) {
    return t.reduce(function (t, n) {
      return (t[n] = e), t;
    }, {});
  }
  function ge(e, t) {
    void 0 === t && (t = {});
    var n = t,
      i = n.placement,
      r = void 0 === i ? e.placement : i,
      s = n.boundary,
      o = void 0 === s ? "clippingParents" : s,
      a = n.rootBoundary,
      l = void 0 === a ? q : a,
      c = n.elementContext,
      d = void 0 === c ? H : c,
      p = n.altBoundary,
      f = void 0 !== p && p,
      h = n.padding,
      m = void 0 === h ? 0 : h,
      g = he("number" != typeof m ? m : me(m, B)),
      v = d === H ? "reference" : H,
      b = e.rects.popper,
      w = e.elements[f ? v : d],
      x = fe(u(w) ? w : w.contextElement || E(e.elements.popper), o, l),
      T = y(e.elements.reference),
      S = te({ reference: T, element: b, strategy: "absolute", placement: r }),
      C = pe(Object.assign({}, b, S)),
      L = d === H ? C : T,
      A = {
        top: x.top - L.top + g.top,
        bottom: L.bottom - x.bottom + g.bottom,
        left: x.left - L.left + g.left,
        right: L.right - x.right + g.right,
      },
      O = e.modifiersData.offset;
    if (d === H && O) {
      var k = O[r];
      Object.keys(A).forEach(function (e) {
        var t = [I, D].indexOf(e) >= 0 ? 1 : -1,
          n = [$, D].indexOf(e) >= 0 ? "y" : "x";
        A[e] += k[n] * t;
      });
    }
    return A;
  }
  function ve(e, t, n) {
    return m(e, g(t, n));
  }
  const ye = {
    name: "preventOverflow",
    enabled: !0,
    phase: "main",
    fn: function (e) {
      var t = e.state,
        n = e.options,
        i = e.name,
        r = n.mainAxis,
        s = void 0 === r || r,
        o = n.altAxis,
        a = void 0 !== o && o,
        l = n.boundary,
        c = n.rootBoundary,
        d = n.altBoundary,
        p = n.padding,
        u = n.tether,
        f = void 0 === u || u,
        h = n.tetherOffset,
        v = void 0 === h ? 0 : h,
        y = ge(t, { boundary: l, rootBoundary: c, padding: p, altBoundary: d }),
        b = Z(t.placement),
        w = J(t.placement),
        E = !w,
        x = ee(b),
        T = "x" === x ? "y" : "x",
        S = t.modifiersData.popperOffsets,
        C = t.rects.reference,
        A = t.rects.popper,
        O =
          "function" == typeof v
            ? v(Object.assign({}, t.rects, { placement: t.placement }))
            : v,
        k =
          "number" == typeof O
            ? { mainAxis: O, altAxis: O }
            : Object.assign({ mainAxis: 0, altAxis: 0 }, O),
        M = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
        P = { x: 0, y: 0 };
      if (S) {
        if (s) {
          var z,
            B = "y" === x ? $ : j,
            W = "y" === x ? D : I,
            q = "y" === x ? "height" : "width",
            H = S[x],
            G = H + y[B],
            V = H - y[W],
            R = f ? -A[q] / 2 : 0,
            F = w === N ? C[q] : A[q],
            X = w === N ? -A[q] : -C[q],
            Y = t.elements.arrow,
            U = f && Y ? L(Y) : { width: 0, height: 0 },
            Q = t.modifiersData["arrow#persistent"]
              ? t.modifiersData["arrow#persistent"].padding
              : { top: 0, right: 0, bottom: 0, left: 0 },
            K = Q[B],
            te = Q[W],
            ne = ve(0, C[q], U[q]),
            ie = E
              ? C[q] / 2 - R - ne - K - k.mainAxis
              : F - ne - K - k.mainAxis,
            re = E
              ? -C[q] / 2 + R + ne + te + k.mainAxis
              : X + ne + te + k.mainAxis,
            se = t.elements.arrow && _(t.elements.arrow),
            oe = se ? ("y" === x ? se.clientTop || 0 : se.clientLeft || 0) : 0,
            ae = null != (z = null == M ? void 0 : M[x]) ? z : 0,
            le = H + re - ae,
            ce = ve(f ? g(G, H + ie - ae - oe) : G, H, f ? m(V, le) : V);
          (S[x] = ce), (P[x] = ce - H);
        }
        if (a) {
          var de,
            pe = "x" === x ? $ : j,
            ue = "x" === x ? D : I,
            fe = S[T],
            he = "y" === T ? "height" : "width",
            me = fe + y[pe],
            ye = fe - y[ue],
            be = -1 !== [$, j].indexOf(b),
            we = null != (de = null == M ? void 0 : M[T]) ? de : 0,
            Ee = be ? me : fe - C[he] - A[he] - we + k.altAxis,
            xe = be ? fe + C[he] + A[he] - we - k.altAxis : ye,
            Te =
              f && be
                ? (function (e, t, n) {
                    var i = ve(e, t, n);
                    return i > n ? n : i;
                  })(Ee, fe, xe)
                : ve(f ? Ee : me, fe, f ? xe : ye);
          (S[T] = Te), (P[T] = Te - fe);
        }
        t.modifiersData[i] = P;
      }
    },
    requiresIfExists: ["offset"],
  };
  const be = {
    name: "arrow",
    enabled: !0,
    phase: "main",
    fn: function (e) {
      var t,
        n = e.state,
        i = e.name,
        r = e.options,
        s = n.elements.arrow,
        o = n.modifiersData.popperOffsets,
        a = Z(n.placement),
        l = ee(a),
        c = [j, I].indexOf(a) >= 0 ? "height" : "width";
      if (s && o) {
        var d = (function (e, t) {
            return he(
              "number" !=
                typeof (e =
                  "function" == typeof e
                    ? e(Object.assign({}, t.rects, { placement: t.placement }))
                    : e)
                ? e
                : me(e, B)
            );
          })(r.padding, n),
          p = L(s),
          u = "y" === l ? $ : j,
          f = "y" === l ? D : I,
          h =
            n.rects.reference[c] +
            n.rects.reference[l] -
            o[l] -
            n.rects.popper[c],
          m = o[l] - n.rects.reference[l],
          g = _(s),
          v = g ? ("y" === l ? g.clientHeight || 0 : g.clientWidth || 0) : 0,
          y = h / 2 - m / 2,
          b = d[u],
          w = v - p[c] - d[f],
          E = v / 2 - p[c] / 2 + y,
          x = ve(b, E, w),
          T = l;
        n.modifiersData[i] = (((t = {})[T] = x), (t.centerOffset = x - E), t);
      }
    },
    effect: function (e) {
      var t = e.state,
        n = e.options.element,
        i = void 0 === n ? "[data-popper-arrow]" : n;
      null != i &&
        ("string" != typeof i || (i = t.elements.popper.querySelector(i))) &&
        de(t.elements.popper, i) &&
        (t.elements.arrow = i);
    },
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"],
  };
  function we(e, t, n) {
    return (
      void 0 === n && (n = { x: 0, y: 0 }),
      {
        top: e.top - t.height - n.y,
        right: e.right - t.width + n.x,
        bottom: e.bottom - t.height + n.y,
        left: e.left - t.width - n.x,
      }
    );
  }
  function Ee(e) {
    return [$, I, D, j].some(function (t) {
      return e[t] >= 0;
    });
  }
  var xe = U({
      defaultModifiers: [
        K,
        {
          name: "popperOffsets",
          enabled: !0,
          phase: "read",
          fn: function (e) {
            var t = e.state,
              n = e.name;
            t.modifiersData[n] = te({
              reference: t.rects.reference,
              element: t.rects.popper,
              strategy: "absolute",
              placement: t.placement,
            });
          },
          data: {},
        },
        {
          name: "computeStyles",
          enabled: !0,
          phase: "beforeWrite",
          fn: function (e) {
            var t = e.state,
              n = e.options,
              i = n.gpuAcceleration,
              r = void 0 === i || i,
              s = n.adaptive,
              o = void 0 === s || s,
              a = n.roundOffsets,
              l = void 0 === a || a,
              c = {
                placement: Z(t.placement),
                variation: J(t.placement),
                popper: t.elements.popper,
                popperRect: t.rects.popper,
                gpuAcceleration: r,
                isFixed: "fixed" === t.options.strategy,
              };
            null != t.modifiersData.popperOffsets &&
              (t.styles.popper = Object.assign(
                {},
                t.styles.popper,
                ie(
                  Object.assign({}, c, {
                    offsets: t.modifiersData.popperOffsets,
                    position: t.options.strategy,
                    adaptive: o,
                    roundOffsets: l,
                  })
                )
              )),
              null != t.modifiersData.arrow &&
                (t.styles.arrow = Object.assign(
                  {},
                  t.styles.arrow,
                  ie(
                    Object.assign({}, c, {
                      offsets: t.modifiersData.arrow,
                      position: "absolute",
                      adaptive: !1,
                      roundOffsets: l,
                    })
                  )
                )),
              (t.attributes.popper = Object.assign({}, t.attributes.popper, {
                "data-popper-placement": t.placement,
              }));
          },
          data: {},
        },
        re,
        se,
        {
          name: "flip",
          enabled: !0,
          phase: "main",
          fn: function (e) {
            var t = e.state,
              n = e.options,
              i = e.name;
            if (!t.modifiersData[i]._skip) {
              for (
                var r = n.mainAxis,
                  s = void 0 === r || r,
                  o = n.altAxis,
                  a = void 0 === o || o,
                  l = n.fallbackPlacements,
                  c = n.padding,
                  d = n.boundary,
                  p = n.rootBoundary,
                  u = n.altBoundary,
                  f = n.flipVariations,
                  h = void 0 === f || f,
                  m = n.allowedAutoPlacements,
                  g = t.options.placement,
                  v = Z(g),
                  y =
                    l ||
                    (v === g || !h
                      ? [ae(g)]
                      : (function (e) {
                          if (Z(e) === z) return [];
                          var t = ae(e);
                          return [ce(e), t, ce(t)];
                        })(g)),
                  b = [g].concat(y).reduce(function (e, n) {
                    return e.concat(
                      Z(n) === z
                        ? (function (e, t) {
                            void 0 === t && (t = {});
                            var n = t,
                              i = n.placement,
                              r = n.boundary,
                              s = n.rootBoundary,
                              o = n.padding,
                              a = n.flipVariations,
                              l = n.allowedAutoPlacements,
                              c = void 0 === l ? V : l,
                              d = J(i),
                              p = d
                                ? a
                                  ? G
                                  : G.filter(function (e) {
                                      return J(e) === d;
                                    })
                                : B,
                              u = p.filter(function (e) {
                                return c.indexOf(e) >= 0;
                              });
                            0 === u.length && (u = p);
                            var f = u.reduce(function (t, n) {
                              return (
                                (t[n] = ge(e, {
                                  placement: n,
                                  boundary: r,
                                  rootBoundary: s,
                                  padding: o,
                                })[Z(n)]),
                                t
                              );
                            }, {});
                            return Object.keys(f).sort(function (e, t) {
                              return f[e] - f[t];
                            });
                          })(t, {
                            placement: n,
                            boundary: d,
                            rootBoundary: p,
                            padding: c,
                            flipVariations: h,
                            allowedAutoPlacements: m,
                          })
                        : n
                    );
                  }, []),
                  w = t.rects.reference,
                  E = t.rects.popper,
                  x = new Map(),
                  T = !0,
                  S = b[0],
                  C = 0;
                C < b.length;
                C++
              ) {
                var L = b[C],
                  A = Z(L),
                  O = J(L) === N,
                  k = [$, D].indexOf(A) >= 0,
                  M = k ? "width" : "height",
                  P = ge(t, {
                    placement: L,
                    boundary: d,
                    rootBoundary: p,
                    altBoundary: u,
                    padding: c,
                  }),
                  _ = k ? (O ? I : j) : O ? D : $;
                w[M] > E[M] && (_ = ae(_));
                var W = ae(_),
                  q = [];
                if (
                  (s && q.push(P[A] <= 0),
                  a && q.push(P[_] <= 0, P[W] <= 0),
                  q.every(function (e) {
                    return e;
                  }))
                ) {
                  (S = L), (T = !1);
                  break;
                }
                x.set(L, q);
              }
              if (T)
                for (
                  var H = function (e) {
                      var t = b.find(function (t) {
                        var n = x.get(t);
                        if (n)
                          return n.slice(0, e).every(function (e) {
                            return e;
                          });
                      });
                      if (t) return (S = t), "break";
                    },
                    R = h ? 3 : 1;
                  R > 0;
                  R--
                ) {
                  if ("break" === H(R)) break;
                }
              t.placement !== S &&
                ((t.modifiersData[i]._skip = !0),
                (t.placement = S),
                (t.reset = !0));
            }
          },
          requiresIfExists: ["offset"],
          data: { _skip: !1 },
        },
        ye,
        be,
        {
          name: "hide",
          enabled: !0,
          phase: "main",
          requiresIfExists: ["preventOverflow"],
          fn: function (e) {
            var t = e.state,
              n = e.name,
              i = t.rects.reference,
              r = t.rects.popper,
              s = t.modifiersData.preventOverflow,
              o = ge(t, { elementContext: "reference" }),
              a = ge(t, { altBoundary: !0 }),
              l = we(o, i),
              c = we(a, r, s),
              d = Ee(l),
              p = Ee(c);
            (t.modifiersData[n] = {
              referenceClippingOffsets: l,
              popperEscapeOffsets: c,
              isReferenceHidden: d,
              hasPopperEscaped: p,
            }),
              (t.attributes.popper = Object.assign({}, t.attributes.popper, {
                "data-popper-reference-hidden": d,
                "data-popper-escaped": p,
              }));
          },
        },
      ],
    }),
    Te = "tippy-content",
    Se = "tippy-backdrop",
    Ce = "tippy-arrow",
    Le = "tippy-svg-arrow",
    Ae = { passive: !0, capture: !0 },
    Oe = function () {
      return document.body;
    };
  function ke(e, t, n) {
    if (Array.isArray(e)) {
      var i = e[t];
      return null == i ? (Array.isArray(n) ? n[t] : n) : i;
    }
    return e;
  }
  function Me(e, t) {
    var n = {}.toString.call(e);
    return 0 === n.indexOf("[object") && n.indexOf(t + "]") > -1;
  }
  function Pe(e, t) {
    return "function" == typeof e ? e.apply(void 0, t) : e;
  }
  function _e(e, t) {
    return 0 === t
      ? e
      : function (i) {
          clearTimeout(n),
            (n = setTimeout(function () {
              e(i);
            }, t));
        };
    var n;
  }
  function $e(e) {
    return [].concat(e);
  }
  function De(e, t) {
    -1 === e.indexOf(t) && e.push(t);
  }
  function Ie(e) {
    return e.split("-")[0];
  }
  function je(e) {
    return [].slice.call(e);
  }
  function ze(e) {
    return Object.keys(e).reduce(function (t, n) {
      return void 0 !== e[n] && (t[n] = e[n]), t;
    }, {});
  }
  function Be() {
    return document.createElement("div");
  }
  function Ne(e) {
    return ["Element", "Fragment"].some(function (t) {
      return Me(e, t);
    });
  }
  function We(e) {
    return Me(e, "MouseEvent");
  }
  function qe(e) {
    return !(!e || !e._tippy || e._tippy.reference !== e);
  }
  function He(e) {
    return Ne(e)
      ? [e]
      : (function (e) {
          return Me(e, "NodeList");
        })(e)
      ? je(e)
      : Array.isArray(e)
      ? e
      : je(document.querySelectorAll(e));
  }
  function Ge(e, t) {
    e.forEach(function (e) {
      e && (e.style.transitionDuration = t + "ms");
    });
  }
  function Ve(e, t) {
    e.forEach(function (e) {
      e && e.setAttribute("data-state", t);
    });
  }
  function Re(e) {
    var t,
      n = $e(e)[0];
    return null != n && null != (t = n.ownerDocument) && t.body
      ? n.ownerDocument
      : document;
  }
  function Fe(e, t, n) {
    var i = t + "EventListener";
    ["transitionend", "webkitTransitionEnd"].forEach(function (t) {
      e[i](t, n);
    });
  }
  function Xe(e, t) {
    for (var n = t; n; ) {
      var i;
      if (e.contains(n)) return !0;
      n =
        null == n.getRootNode || null == (i = n.getRootNode())
          ? void 0
          : i.host;
    }
    return !1;
  }
  var Ye = { isTouch: !1 },
    Ue = 0;
  function Qe() {
    Ye.isTouch ||
      ((Ye.isTouch = !0),
      window.performance && document.addEventListener("mousemove", Ke));
  }
  function Ke() {
    var e = performance.now();
    e - Ue < 20 &&
      ((Ye.isTouch = !1), document.removeEventListener("mousemove", Ke)),
      (Ue = e);
  }
  function Ze() {
    var e = document.activeElement;
    if (qe(e)) {
      var t = e._tippy;
      e.blur && !t.state.isVisible && e.blur();
    }
  }
  var Je =
    !!("undefined" != typeof window && "undefined" != typeof document) &&
    !!window.msCrypto;
  var et = {
      animateFill: !1,
      followCursor: !1,
      inlinePositioning: !1,
      sticky: !1,
    },
    tt = Object.assign(
      {
        appendTo: Oe,
        aria: { content: "auto", expanded: "auto" },
        delay: 0,
        duration: [300, 250],
        getReferenceClientRect: null,
        hideOnClick: !0,
        ignoreAttributes: !1,
        interactive: !1,
        interactiveBorder: 2,
        interactiveDebounce: 0,
        moveTransition: "",
        offset: [0, 10],
        onAfterUpdate: function () {},
        onBeforeUpdate: function () {},
        onCreate: function () {},
        onDestroy: function () {},
        onHidden: function () {},
        onHide: function () {},
        onMount: function () {},
        onShow: function () {},
        onShown: function () {},
        onTrigger: function () {},
        onUntrigger: function () {},
        onClickOutside: function () {},
        placement: "top",
        plugins: [],
        popperOptions: {},
        render: null,
        showOnCreate: !1,
        touch: !0,
        trigger: "mouseenter focus",
        triggerTarget: null,
      },
      et,
      {
        allowHTML: !1,
        animation: "fade",
        arrow: !0,
        content: "",
        inertia: !1,
        maxWidth: 350,
        role: "tooltip",
        theme: "",
        zIndex: 9999,
      }
    ),
    nt = Object.keys(tt);
  function it(e) {
    var t = (e.plugins || []).reduce(function (t, n) {
      var i,
        r = n.name,
        s = n.defaultValue;
      r && (t[r] = void 0 !== e[r] ? e[r] : null != (i = tt[r]) ? i : s);
      return t;
    }, {});
    return Object.assign({}, e, t);
  }
  function rt(e, t) {
    var n = Object.assign(
      {},
      t,
      { content: Pe(t.content, [e]) },
      t.ignoreAttributes
        ? {}
        : (function (e, t) {
            return (
              t ? Object.keys(it(Object.assign({}, tt, { plugins: t }))) : nt
            ).reduce(function (t, n) {
              var i = (e.getAttribute("data-tippy-" + n) || "").trim();
              if (!i) return t;
              if ("content" === n) t[n] = i;
              else
                try {
                  t[n] = JSON.parse(i);
                } catch (e) {
                  t[n] = i;
                }
              return t;
            }, {});
          })(e, t.plugins)
    );
    return (
      (n.aria = Object.assign({}, tt.aria, n.aria)),
      (n.aria = {
        expanded: "auto" === n.aria.expanded ? t.interactive : n.aria.expanded,
        content:
          "auto" === n.aria.content
            ? t.interactive
              ? null
              : "describedby"
            : n.aria.content,
      }),
      n
    );
  }
  function st(e, t) {
    e.innerHTML = t;
  }
  function ot(e) {
    var t = Be();
    return (
      !0 === e
        ? (t.className = Ce)
        : ((t.className = Le), Ne(e) ? t.appendChild(e) : st(t, e)),
      t
    );
  }
  function at(e, t) {
    Ne(t.content)
      ? (st(e, ""), e.appendChild(t.content))
      : "function" != typeof t.content &&
        (t.allowHTML ? st(e, t.content) : (e.textContent = t.content));
  }
  function lt(e) {
    var t = e.firstElementChild,
      n = je(t.children);
    return {
      box: t,
      content: n.find(function (e) {
        return e.classList.contains(Te);
      }),
      arrow: n.find(function (e) {
        return e.classList.contains(Ce) || e.classList.contains(Le);
      }),
      backdrop: n.find(function (e) {
        return e.classList.contains(Se);
      }),
    };
  }
  function ct(e) {
    var t = Be(),
      n = Be();
    (n.className = "tippy-box"),
      n.setAttribute("data-state", "hidden"),
      n.setAttribute("tabindex", "-1");
    var i = Be();
    function r(n, i) {
      var r = lt(t),
        s = r.box,
        o = r.content,
        a = r.arrow;
      i.theme
        ? s.setAttribute("data-theme", i.theme)
        : s.removeAttribute("data-theme"),
        "string" == typeof i.animation
          ? s.setAttribute("data-animation", i.animation)
          : s.removeAttribute("data-animation"),
        i.inertia
          ? s.setAttribute("data-inertia", "")
          : s.removeAttribute("data-inertia"),
        (s.style.maxWidth =
          "number" == typeof i.maxWidth ? i.maxWidth + "px" : i.maxWidth),
        i.role ? s.setAttribute("role", i.role) : s.removeAttribute("role"),
        (n.content === i.content && n.allowHTML === i.allowHTML) ||
          at(o, e.props),
        i.arrow
          ? a
            ? n.arrow !== i.arrow &&
              (s.removeChild(a), s.appendChild(ot(i.arrow)))
            : s.appendChild(ot(i.arrow))
          : a && s.removeChild(a);
    }
    return (
      (i.className = Te),
      i.setAttribute("data-state", "hidden"),
      at(i, e.props),
      t.appendChild(n),
      n.appendChild(i),
      r(e.props, e.props),
      { popper: t, onUpdate: r }
    );
  }
  ct.$$tippy = !0;
  var dt = 1,
    pt = [],
    ut = [];
  function ft(e, t) {
    var n,
      i,
      r,
      s,
      o,
      a,
      l,
      c,
      d = rt(e, Object.assign({}, tt, it(ze(t)))),
      p = !1,
      u = !1,
      f = !1,
      h = !1,
      m = [],
      g = _e(X, d.interactiveDebounce),
      v = dt++,
      y = (c = d.plugins).filter(function (e, t) {
        return c.indexOf(e) === t;
      }),
      b = {
        id: v,
        reference: e,
        popper: Be(),
        popperInstance: null,
        props: d,
        state: {
          isEnabled: !0,
          isVisible: !1,
          isDestroyed: !1,
          isMounted: !1,
          isShown: !1,
        },
        plugins: y,
        clearDelayTimeouts: function () {
          clearTimeout(n), clearTimeout(i), cancelAnimationFrame(r);
        },
        setProps: function (t) {
          0;
          if (b.state.isDestroyed) return;
          $("onBeforeUpdate", [b, t]), R();
          var n = b.props,
            i = rt(e, Object.assign({}, n, ze(t), { ignoreAttributes: !0 }));
          (b.props = i),
            V(),
            n.interactiveDebounce !== i.interactiveDebounce &&
              (j(), (g = _e(X, i.interactiveDebounce)));
          n.triggerTarget && !i.triggerTarget
            ? $e(n.triggerTarget).forEach(function (e) {
                e.removeAttribute("aria-expanded");
              })
            : i.triggerTarget && e.removeAttribute("aria-expanded");
          I(), _(), x && x(n, i);
          b.popperInstance &&
            (K(),
            J().forEach(function (e) {
              requestAnimationFrame(e._tippy.popperInstance.forceUpdate);
            }));
          $("onAfterUpdate", [b, t]);
        },
        setContent: function (e) {
          b.setProps({ content: e });
        },
        show: function () {
          0;
          var e = b.state.isVisible,
            t = b.state.isDestroyed,
            n = !b.state.isEnabled,
            i = Ye.isTouch && !b.props.touch,
            r = ke(b.props.duration, 0, tt.duration);
          if (e || t || n || i) return;
          if (O().hasAttribute("disabled")) return;
          if (($("onShow", [b], !1), !1 === b.props.onShow(b))) return;
          (b.state.isVisible = !0), A() && (E.style.visibility = "visible");
          _(), W(), b.state.isMounted || (E.style.transition = "none");
          if (A()) {
            var s = M(),
              o = s.box,
              l = s.content;
            Ge([o, l], 0);
          }
          (a = function () {
            var e;
            if (b.state.isVisible && !h) {
              if (
                ((h = !0),
                E.offsetHeight,
                (E.style.transition = b.props.moveTransition),
                A() && b.props.animation)
              ) {
                var t = M(),
                  n = t.box,
                  i = t.content;
                Ge([n, i], r), Ve([n, i], "visible");
              }
              D(),
                I(),
                De(ut, b),
                null == (e = b.popperInstance) || e.forceUpdate(),
                $("onMount", [b]),
                b.props.animation &&
                  A() &&
                  (function (e, t) {
                    H(e, t);
                  })(r, function () {
                    (b.state.isShown = !0), $("onShown", [b]);
                  });
            }
          }),
            (function () {
              var e,
                t = b.props.appendTo,
                n = O();
              e =
                (b.props.interactive && t === Oe) || "parent" === t
                  ? n.parentNode
                  : Pe(t, [n]);
              e.contains(E) || e.appendChild(E);
              (b.state.isMounted = !0), K(), !1;
            })();
        },
        hide: function () {
          0;
          var e = !b.state.isVisible,
            t = b.state.isDestroyed,
            n = !b.state.isEnabled,
            i = ke(b.props.duration, 1, tt.duration);
          if (e || t || n) return;
          if (($("onHide", [b], !1), !1 === b.props.onHide(b))) return;
          (b.state.isVisible = !1),
            (b.state.isShown = !1),
            (h = !1),
            (p = !1),
            A() && (E.style.visibility = "hidden");
          if ((j(), q(), _(!0), A())) {
            var r = M(),
              s = r.box,
              o = r.content;
            b.props.animation && (Ge([s, o], i), Ve([s, o], "hidden"));
          }
          D(),
            I(),
            b.props.animation
              ? A() &&
                (function (e, t) {
                  H(e, function () {
                    !b.state.isVisible &&
                      E.parentNode &&
                      E.parentNode.contains(E) &&
                      t();
                  });
                })(i, b.unmount)
              : b.unmount();
        },
        hideWithInteractivity: function (e) {
          0;
          k().addEventListener("mousemove", g), De(pt, g), g(e);
        },
        enable: function () {
          b.state.isEnabled = !0;
        },
        disable: function () {
          b.hide(), (b.state.isEnabled = !1);
        },
        unmount: function () {
          0;
          b.state.isVisible && b.hide();
          if (!b.state.isMounted) return;
          Z(),
            J().forEach(function (e) {
              e._tippy.unmount();
            }),
            E.parentNode && E.parentNode.removeChild(E);
          (ut = ut.filter(function (e) {
            return e !== b;
          })),
            (b.state.isMounted = !1),
            $("onHidden", [b]);
        },
        destroy: function () {
          0;
          if (b.state.isDestroyed) return;
          b.clearDelayTimeouts(),
            b.unmount(),
            R(),
            delete e._tippy,
            (b.state.isDestroyed = !0),
            $("onDestroy", [b]);
        },
      };
    if (!d.render) return b;
    var w = d.render(b),
      E = w.popper,
      x = w.onUpdate;
    E.setAttribute("data-tippy-root", ""),
      (E.id = "tippy-" + b.id),
      (b.popper = E),
      (e._tippy = b),
      (E._tippy = b);
    var T = y.map(function (e) {
        return e.fn(b);
      }),
      S = e.hasAttribute("aria-expanded");
    return (
      V(),
      I(),
      _(),
      $("onCreate", [b]),
      d.showOnCreate && ee(),
      E.addEventListener("mouseenter", function () {
        b.props.interactive && b.state.isVisible && b.clearDelayTimeouts();
      }),
      E.addEventListener("mouseleave", function () {
        b.props.interactive &&
          b.props.trigger.indexOf("mouseenter") >= 0 &&
          k().addEventListener("mousemove", g);
      }),
      b
    );
    function C() {
      var e = b.props.touch;
      return Array.isArray(e) ? e : [e, 0];
    }
    function L() {
      return "hold" === C()[0];
    }
    function A() {
      var e;
      return !(null == (e = b.props.render) || !e.$$tippy);
    }
    function O() {
      return l || e;
    }
    function k() {
      var e = O().parentNode;
      return e ? Re(e) : document;
    }
    function M() {
      return lt(E);
    }
    function P(e) {
      return (b.state.isMounted && !b.state.isVisible) ||
        Ye.isTouch ||
        (s && "focus" === s.type)
        ? 0
        : ke(b.props.delay, e ? 0 : 1, tt.delay);
    }
    function _(e) {
      void 0 === e && (e = !1),
        (E.style.pointerEvents = b.props.interactive && !e ? "" : "none"),
        (E.style.zIndex = "" + b.props.zIndex);
    }
    function $(e, t, n) {
      var i;
      (void 0 === n && (n = !0),
      T.forEach(function (n) {
        n[e] && n[e].apply(n, t);
      }),
      n) && (i = b.props)[e].apply(i, t);
    }
    function D() {
      var t = b.props.aria;
      if (t.content) {
        var n = "aria-" + t.content,
          i = E.id;
        $e(b.props.triggerTarget || e).forEach(function (e) {
          var t = e.getAttribute(n);
          if (b.state.isVisible) e.setAttribute(n, t ? t + " " + i : i);
          else {
            var r = t && t.replace(i, "").trim();
            r ? e.setAttribute(n, r) : e.removeAttribute(n);
          }
        });
      }
    }
    function I() {
      !S &&
        b.props.aria.expanded &&
        $e(b.props.triggerTarget || e).forEach(function (e) {
          b.props.interactive
            ? e.setAttribute(
                "aria-expanded",
                b.state.isVisible && e === O() ? "true" : "false"
              )
            : e.removeAttribute("aria-expanded");
        });
    }
    function j() {
      k().removeEventListener("mousemove", g),
        (pt = pt.filter(function (e) {
          return e !== g;
        }));
    }
    function z(t) {
      if (!Ye.isTouch || (!f && "mousedown" !== t.type)) {
        var n = (t.composedPath && t.composedPath()[0]) || t.target;
        if (!b.props.interactive || !Xe(E, n)) {
          if (
            $e(b.props.triggerTarget || e).some(function (e) {
              return Xe(e, n);
            })
          ) {
            if (Ye.isTouch) return;
            if (b.state.isVisible && b.props.trigger.indexOf("click") >= 0)
              return;
          } else $("onClickOutside", [b, t]);
          !0 === b.props.hideOnClick &&
            (b.clearDelayTimeouts(),
            b.hide(),
            (u = !0),
            setTimeout(function () {
              u = !1;
            }),
            b.state.isMounted || q());
        }
      }
    }
    function B() {
      f = !0;
    }
    function N() {
      f = !1;
    }
    function W() {
      var e = k();
      e.addEventListener("mousedown", z, !0),
        e.addEventListener("touchend", z, Ae),
        e.addEventListener("touchstart", N, Ae),
        e.addEventListener("touchmove", B, Ae);
    }
    function q() {
      var e = k();
      e.removeEventListener("mousedown", z, !0),
        e.removeEventListener("touchend", z, Ae),
        e.removeEventListener("touchstart", N, Ae),
        e.removeEventListener("touchmove", B, Ae);
    }
    function H(e, t) {
      var n = M().box;
      function i(e) {
        e.target === n && (Fe(n, "remove", i), t());
      }
      if (0 === e) return t();
      Fe(n, "remove", o), Fe(n, "add", i), (o = i);
    }
    function G(t, n, i) {
      void 0 === i && (i = !1),
        $e(b.props.triggerTarget || e).forEach(function (e) {
          e.addEventListener(t, n, i),
            m.push({ node: e, eventType: t, handler: n, options: i });
        });
    }
    function V() {
      L() &&
        (G("touchstart", F, { passive: !0 }),
        G("touchend", Y, { passive: !0 })),
        (function (e) {
          return e.split(/\s+/).filter(Boolean);
        })(b.props.trigger).forEach(function (e) {
          if ("manual" !== e)
            switch ((G(e, F), e)) {
              case "mouseenter":
                G("mouseleave", Y);
                break;
              case "focus":
                G(Je ? "focusout" : "blur", U);
                break;
              case "focusin":
                G("focusout", U);
            }
        });
    }
    function R() {
      m.forEach(function (e) {
        var t = e.node,
          n = e.eventType,
          i = e.handler,
          r = e.options;
        t.removeEventListener(n, i, r);
      }),
        (m = []);
    }
    function F(e) {
      var t,
        n = !1;
      if (b.state.isEnabled && !Q(e) && !u) {
        var i = "focus" === (null == (t = s) ? void 0 : t.type);
        (s = e),
          (l = e.currentTarget),
          I(),
          !b.state.isVisible &&
            We(e) &&
            pt.forEach(function (t) {
              return t(e);
            }),
          "click" === e.type &&
          (b.props.trigger.indexOf("mouseenter") < 0 || p) &&
          !1 !== b.props.hideOnClick &&
          b.state.isVisible
            ? (n = !0)
            : ee(e),
          "click" === e.type && (p = !n),
          n && !i && te(e);
      }
    }
    function X(e) {
      var t = e.target,
        n = O().contains(t) || E.contains(t);
      if ("mousemove" !== e.type || !n) {
        var i = J()
          .concat(E)
          .map(function (e) {
            var t,
              n = null == (t = e._tippy.popperInstance) ? void 0 : t.state;
            return n
              ? {
                  popperRect: e.getBoundingClientRect(),
                  popperState: n,
                  props: d,
                }
              : null;
          })
          .filter(Boolean);
        (function (e, t) {
          var n = t.clientX,
            i = t.clientY;
          return e.every(function (e) {
            var t = e.popperRect,
              r = e.popperState,
              s = e.props.interactiveBorder,
              o = Ie(r.placement),
              a = r.modifiersData.offset;
            if (!a) return !0;
            var l = "bottom" === o ? a.top.y : 0,
              c = "top" === o ? a.bottom.y : 0,
              d = "right" === o ? a.left.x : 0,
              p = "left" === o ? a.right.x : 0,
              u = t.top - i + l > s,
              f = i - t.bottom - c > s,
              h = t.left - n + d > s,
              m = n - t.right - p > s;
            return u || f || h || m;
          });
        })(i, e) && (j(), te(e));
      }
    }
    function Y(e) {
      Q(e) ||
        (b.props.trigger.indexOf("click") >= 0 && p) ||
        (b.props.interactive ? b.hideWithInteractivity(e) : te(e));
    }
    function U(e) {
      (b.props.trigger.indexOf("focusin") < 0 && e.target !== O()) ||
        (b.props.interactive &&
          e.relatedTarget &&
          E.contains(e.relatedTarget)) ||
        te(e);
    }
    function Q(e) {
      return !!Ye.isTouch && L() !== e.type.indexOf("touch") >= 0;
    }
    function K() {
      Z();
      var t = b.props,
        n = t.popperOptions,
        i = t.placement,
        r = t.offset,
        s = t.getReferenceClientRect,
        o = t.moveTransition,
        l = A() ? lt(E).arrow : null,
        c = s
          ? {
              getBoundingClientRect: s,
              contextElement: s.contextElement || O(),
            }
          : e,
        d = {
          name: "$$tippy",
          enabled: !0,
          phase: "beforeWrite",
          requires: ["computeStyles"],
          fn: function (e) {
            var t = e.state;
            if (A()) {
              var n = M().box;
              ["placement", "reference-hidden", "escaped"].forEach(function (
                e
              ) {
                "placement" === e
                  ? n.setAttribute("data-placement", t.placement)
                  : t.attributes.popper["data-popper-" + e]
                  ? n.setAttribute("data-" + e, "")
                  : n.removeAttribute("data-" + e);
              }),
                (t.attributes.popper = {});
            }
          },
        },
        p = [
          { name: "offset", options: { offset: r } },
          {
            name: "preventOverflow",
            options: { padding: { top: 2, bottom: 2, left: 5, right: 5 } },
          },
          { name: "flip", options: { padding: 5 } },
          { name: "computeStyles", options: { adaptive: !o } },
          d,
        ];
      A() &&
        l &&
        p.push({ name: "arrow", options: { element: l, padding: 3 } }),
        p.push.apply(p, (null == n ? void 0 : n.modifiers) || []),
        (b.popperInstance = xe(
          c,
          E,
          Object.assign({}, n, { placement: i, onFirstUpdate: a, modifiers: p })
        ));
    }
    function Z() {
      b.popperInstance &&
        (b.popperInstance.destroy(), (b.popperInstance = null));
    }
    function J() {
      return je(E.querySelectorAll("[data-tippy-root]"));
    }
    function ee(e) {
      b.clearDelayTimeouts(), e && $("onTrigger", [b, e]), W();
      var t = P(!0),
        i = C(),
        r = i[0],
        s = i[1];
      Ye.isTouch && "hold" === r && s && (t = s),
        t
          ? (n = setTimeout(function () {
              b.show();
            }, t))
          : b.show();
    }
    function te(e) {
      if (
        (b.clearDelayTimeouts(), $("onUntrigger", [b, e]), b.state.isVisible)
      ) {
        if (
          !(
            b.props.trigger.indexOf("mouseenter") >= 0 &&
            b.props.trigger.indexOf("click") >= 0 &&
            ["mouseleave", "mousemove"].indexOf(e.type) >= 0 &&
            p
          )
        ) {
          var t = P(!1);
          t
            ? (i = setTimeout(function () {
                b.state.isVisible && b.hide();
              }, t))
            : (r = requestAnimationFrame(function () {
                b.hide();
              }));
        }
      } else q();
    }
  }
  function ht(e, t) {
    void 0 === t && (t = {});
    var n = tt.plugins.concat(t.plugins || []);
    document.addEventListener("touchstart", Qe, Ae),
      window.addEventListener("blur", Ze);
    var i = Object.assign({}, t, { plugins: n }),
      r = He(e).reduce(function (e, t) {
        var n = t && ft(t, i);
        return n && e.push(n), e;
      }, []);
    return Ne(e) ? r[0] : r;
  }
  (ht.defaultProps = tt),
    (ht.setDefaultProps = function (e) {
      Object.keys(e).forEach(function (t) {
        tt[t] = e[t];
      });
    }),
    (ht.currentInput = Ye);
  Object.assign({}, re, {
    effect: function (e) {
      var t = e.state,
        n = {
          popper: {
            position: t.options.strategy,
            left: "0",
            top: "0",
            margin: "0",
          },
          arrow: { position: "absolute" },
          reference: {},
        };
      Object.assign(t.elements.popper.style, n.popper),
        (t.styles = n),
        t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow);
    },
  });
  ht.setDefaultProps({ render: ct });
  const mt = ht;
  function gt(e) {
    return (
      null !== e &&
      "object" == typeof e &&
      "constructor" in e &&
      e.constructor === Object
    );
  }
  function vt(e = {}, t = {}) {
    Object.keys(t).forEach((n) => {
      void 0 === e[n]
        ? (e[n] = t[n])
        : gt(t[n]) &&
          gt(e[n]) &&
          Object.keys(t[n]).length > 0 &&
          vt(e[n], t[n]);
    });
  }
  e.tippy = mt("[data-tippy-content]", {
    arrow: !1,
    placement: "left",
    touch: "hold",
  });
  const yt = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: "" },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({ initEvent() {} }),
    createElement: () => ({
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName: () => [],
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function bt() {
    const e = "undefined" != typeof document ? document : {};
    return vt(e, yt), e;
  }
  const wt = {
    document: yt,
    navigator: { userAgent: "" },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function () {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: (e) =>
      "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
      "undefined" != typeof setTimeout && clearTimeout(e);
    },
  };
  function Et() {
    const e = "undefined" != typeof window ? window : {};
    return vt(e, wt), e;
  }
  class xt extends Array {
    constructor(e) {
      "number" == typeof e
        ? super(e)
        : (super(...(e || [])),
          (function (e) {
            const t = e.__proto__;
            Object.defineProperty(e, "__proto__", {
              get: () => t,
              set(e) {
                t.__proto__ = e;
              },
            });
          })(this));
    }
  }
  function Tt(e = []) {
    const t = [];
    return (
      e.forEach((e) => {
        Array.isArray(e) ? t.push(...Tt(e)) : t.push(e);
      }),
      t
    );
  }
  function St(e, t) {
    return Array.prototype.filter.call(e, t);
  }
  function Ct(e, t) {
    const n = Et(),
      i = bt();
    let r = [];
    if (!t && e instanceof xt) return e;
    if (!e) return new xt(r);
    if ("string" == typeof e) {
      const n = e.trim();
      if (n.indexOf("<") >= 0 && n.indexOf(">") >= 0) {
        let e = "div";
        0 === n.indexOf("<li") && (e = "ul"),
          0 === n.indexOf("<tr") && (e = "tbody"),
          (0 !== n.indexOf("<td") && 0 !== n.indexOf("<th")) || (e = "tr"),
          0 === n.indexOf("<tbody") && (e = "table"),
          0 === n.indexOf("<option") && (e = "select");
        const t = i.createElement(e);
        t.innerHTML = n;
        for (let e = 0; e < t.childNodes.length; e += 1)
          r.push(t.childNodes[e]);
      } else
        r = (function (e, t) {
          if ("string" != typeof e) return [e];
          const n = [],
            i = t.querySelectorAll(e);
          for (let e = 0; e < i.length; e += 1) n.push(i[e]);
          return n;
        })(e.trim(), t || i);
    } else if (e.nodeType || e === n || e === i) r.push(e);
    else if (Array.isArray(e)) {
      if (e instanceof xt) return e;
      r = e;
    }
    return new xt(
      (function (e) {
        const t = [];
        for (let n = 0; n < e.length; n += 1)
          -1 === t.indexOf(e[n]) && t.push(e[n]);
        return t;
      })(r)
    );
  }
  Ct.fn = xt.prototype;
  const Lt = "resize scroll".split(" ");
  function At(e) {
    return function (...t) {
      if (void 0 === t[0]) {
        for (let t = 0; t < this.length; t += 1)
          Lt.indexOf(e) < 0 &&
            (e in this[t] ? this[t][e]() : Ct(this[t]).trigger(e));
        return this;
      }
      return this.on(e, ...t);
    };
  }
  At("click"),
    At("blur"),
    At("focus"),
    At("focusin"),
    At("focusout"),
    At("keyup"),
    At("keydown"),
    At("keypress"),
    At("submit"),
    At("change"),
    At("mousedown"),
    At("mousemove"),
    At("mouseup"),
    At("mouseenter"),
    At("mouseleave"),
    At("mouseout"),
    At("mouseover"),
    At("touchstart"),
    At("touchend"),
    At("touchmove"),
    At("resize"),
    At("scroll");
  const Ot = {
    addClass: function (...e) {
      const t = Tt(e.map((e) => e.split(" ")));
      return (
        this.forEach((e) => {
          e.classList.add(...t);
        }),
        this
      );
    },
    removeClass: function (...e) {
      const t = Tt(e.map((e) => e.split(" ")));
      return (
        this.forEach((e) => {
          e.classList.remove(...t);
        }),
        this
      );
    },
    hasClass: function (...e) {
      const t = Tt(e.map((e) => e.split(" ")));
      return (
        St(this, (e) => t.filter((t) => e.classList.contains(t)).length > 0)
          .length > 0
      );
    },
    toggleClass: function (...e) {
      const t = Tt(e.map((e) => e.split(" ")));
      this.forEach((e) => {
        t.forEach((t) => {
          e.classList.toggle(t);
        });
      });
    },
    attr: function (e, t) {
      if (1 === arguments.length && "string" == typeof e)
        return this[0] ? this[0].getAttribute(e) : void 0;
      for (let n = 0; n < this.length; n += 1)
        if (2 === arguments.length) this[n].setAttribute(e, t);
        else
          for (const t in e) (this[n][t] = e[t]), this[n].setAttribute(t, e[t]);
      return this;
    },
    removeAttr: function (e) {
      for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
      return this;
    },
    transform: function (e) {
      for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
      return this;
    },
    transition: function (e) {
      for (let t = 0; t < this.length; t += 1)
        this[t].style.transitionDuration = "string" != typeof e ? `${e}ms` : e;
      return this;
    },
    on: function (...e) {
      let [t, n, i, r] = e;
      function s(e) {
        const t = e.target;
        if (!t) return;
        const r = e.target.dom7EventData || [];
        if ((r.indexOf(e) < 0 && r.unshift(e), Ct(t).is(n))) i.apply(t, r);
        else {
          const e = Ct(t).parents();
          for (let t = 0; t < e.length; t += 1)
            Ct(e[t]).is(n) && i.apply(e[t], r);
        }
      }
      function o(e) {
        const t = (e && e.target && e.target.dom7EventData) || [];
        t.indexOf(e) < 0 && t.unshift(e), i.apply(this, t);
      }
      "function" == typeof e[1] && (([t, i, r] = e), (n = void 0)),
        r || (r = !1);
      const a = t.split(" ");
      let l;
      for (let e = 0; e < this.length; e += 1) {
        const t = this[e];
        if (n)
          for (l = 0; l < a.length; l += 1) {
            const e = a[l];
            t.dom7LiveListeners || (t.dom7LiveListeners = {}),
              t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
              t.dom7LiveListeners[e].push({ listener: i, proxyListener: s }),
              t.addEventListener(e, s, r);
          }
        else
          for (l = 0; l < a.length; l += 1) {
            const e = a[l];
            t.dom7Listeners || (t.dom7Listeners = {}),
              t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
              t.dom7Listeners[e].push({ listener: i, proxyListener: o }),
              t.addEventListener(e, o, r);
          }
      }
      return this;
    },
    off: function (...e) {
      let [t, n, i, r] = e;
      "function" == typeof e[1] && (([t, i, r] = e), (n = void 0)),
        r || (r = !1);
      const s = t.split(" ");
      for (let e = 0; e < s.length; e += 1) {
        const t = s[e];
        for (let e = 0; e < this.length; e += 1) {
          const s = this[e];
          let o;
          if (
            (!n && s.dom7Listeners
              ? (o = s.dom7Listeners[t])
              : n && s.dom7LiveListeners && (o = s.dom7LiveListeners[t]),
            o && o.length)
          )
            for (let e = o.length - 1; e >= 0; e -= 1) {
              const n = o[e];
              (i && n.listener === i) ||
              (i &&
                n.listener &&
                n.listener.dom7proxy &&
                n.listener.dom7proxy === i)
                ? (s.removeEventListener(t, n.proxyListener, r), o.splice(e, 1))
                : i ||
                  (s.removeEventListener(t, n.proxyListener, r),
                  o.splice(e, 1));
            }
        }
      }
      return this;
    },
    trigger: function (...e) {
      const t = Et(),
        n = e[0].split(" "),
        i = e[1];
      for (let r = 0; r < n.length; r += 1) {
        const s = n[r];
        for (let n = 0; n < this.length; n += 1) {
          const r = this[n];
          if (t.CustomEvent) {
            const n = new t.CustomEvent(s, {
              detail: i,
              bubbles: !0,
              cancelable: !0,
            });
            (r.dom7EventData = e.filter((e, t) => t > 0)),
              r.dispatchEvent(n),
              (r.dom7EventData = []),
              delete r.dom7EventData;
          }
        }
      }
      return this;
    },
    transitionEnd: function (e) {
      const t = this;
      return (
        e &&
          t.on("transitionend", function n(i) {
            i.target === this && (e.call(this, i), t.off("transitionend", n));
          }),
        this
      );
    },
    outerWidth: function (e) {
      if (this.length > 0) {
        if (e) {
          const e = this.styles();
          return (
            this[0].offsetWidth +
            parseFloat(e.getPropertyValue("margin-right")) +
            parseFloat(e.getPropertyValue("margin-left"))
          );
        }
        return this[0].offsetWidth;
      }
      return null;
    },
    outerHeight: function (e) {
      if (this.length > 0) {
        if (e) {
          const e = this.styles();
          return (
            this[0].offsetHeight +
            parseFloat(e.getPropertyValue("margin-top")) +
            parseFloat(e.getPropertyValue("margin-bottom"))
          );
        }
        return this[0].offsetHeight;
      }
      return null;
    },
    styles: function () {
      const e = Et();
      return this[0] ? e.getComputedStyle(this[0], null) : {};
    },
    offset: function () {
      if (this.length > 0) {
        const e = Et(),
          t = bt(),
          n = this[0],
          i = n.getBoundingClientRect(),
          r = t.body,
          s = n.clientTop || r.clientTop || 0,
          o = n.clientLeft || r.clientLeft || 0,
          a = n === e ? e.scrollY : n.scrollTop,
          l = n === e ? e.scrollX : n.scrollLeft;
        return { top: i.top + a - s, left: i.left + l - o };
      }
      return null;
    },
    css: function (e, t) {
      const n = Et();
      let i;
      if (1 === arguments.length) {
        if ("string" != typeof e) {
          for (i = 0; i < this.length; i += 1)
            for (const t in e) this[i].style[t] = e[t];
          return this;
        }
        if (this[0])
          return n.getComputedStyle(this[0], null).getPropertyValue(e);
      }
      if (2 === arguments.length && "string" == typeof e) {
        for (i = 0; i < this.length; i += 1) this[i].style[e] = t;
        return this;
      }
      return this;
    },
    each: function (e) {
      return e
        ? (this.forEach((t, n) => {
            e.apply(t, [t, n]);
          }),
          this)
        : this;
    },
    html: function (e) {
      if (void 0 === e) return this[0] ? this[0].innerHTML : null;
      for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
      return this;
    },
    text: function (e) {
      if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
      for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
      return this;
    },
    is: function (e) {
      const t = Et(),
        n = bt(),
        i = this[0];
      let r, s;
      if (!i || void 0 === e) return !1;
      if ("string" == typeof e) {
        if (i.matches) return i.matches(e);
        if (i.webkitMatchesSelector) return i.webkitMatchesSelector(e);
        if (i.msMatchesSelector) return i.msMatchesSelector(e);
        for (r = Ct(e), s = 0; s < r.length; s += 1) if (r[s] === i) return !0;
        return !1;
      }
      if (e === n) return i === n;
      if (e === t) return i === t;
      if (e.nodeType || e instanceof xt) {
        for (r = e.nodeType ? [e] : e, s = 0; s < r.length; s += 1)
          if (r[s] === i) return !0;
        return !1;
      }
      return !1;
    },
    index: function () {
      let e,
        t = this[0];
      if (t) {
        for (e = 0; null !== (t = t.previousSibling); )
          1 === t.nodeType && (e += 1);
        return e;
      }
    },
    eq: function (e) {
      if (void 0 === e) return this;
      const t = this.length;
      if (e > t - 1) return Ct([]);
      if (e < 0) {
        const n = t + e;
        return Ct(n < 0 ? [] : [this[n]]);
      }
      return Ct([this[e]]);
    },
    append: function (...e) {
      let t;
      const n = bt();
      for (let i = 0; i < e.length; i += 1) {
        t = e[i];
        for (let e = 0; e < this.length; e += 1)
          if ("string" == typeof t) {
            const i = n.createElement("div");
            for (i.innerHTML = t; i.firstChild; )
              this[e].appendChild(i.firstChild);
          } else if (t instanceof xt)
            for (let n = 0; n < t.length; n += 1) this[e].appendChild(t[n]);
          else this[e].appendChild(t);
      }
      return this;
    },
    prepend: function (e) {
      const t = bt();
      let n, i;
      for (n = 0; n < this.length; n += 1)
        if ("string" == typeof e) {
          const r = t.createElement("div");
          for (r.innerHTML = e, i = r.childNodes.length - 1; i >= 0; i -= 1)
            this[n].insertBefore(r.childNodes[i], this[n].childNodes[0]);
        } else if (e instanceof xt)
          for (i = 0; i < e.length; i += 1)
            this[n].insertBefore(e[i], this[n].childNodes[0]);
        else this[n].insertBefore(e, this[n].childNodes[0]);
      return this;
    },
    next: function (e) {
      return this.length > 0
        ? e
          ? this[0].nextElementSibling && Ct(this[0].nextElementSibling).is(e)
            ? Ct([this[0].nextElementSibling])
            : Ct([])
          : this[0].nextElementSibling
          ? Ct([this[0].nextElementSibling])
          : Ct([])
        : Ct([]);
    },
    nextAll: function (e) {
      const t = [];
      let n = this[0];
      if (!n) return Ct([]);
      for (; n.nextElementSibling; ) {
        const i = n.nextElementSibling;
        e ? Ct(i).is(e) && t.push(i) : t.push(i), (n = i);
      }
      return Ct(t);
    },
    prev: function (e) {
      if (this.length > 0) {
        const t = this[0];
        return e
          ? t.previousElementSibling && Ct(t.previousElementSibling).is(e)
            ? Ct([t.previousElementSibling])
            : Ct([])
          : t.previousElementSibling
          ? Ct([t.previousElementSibling])
          : Ct([]);
      }
      return Ct([]);
    },
    prevAll: function (e) {
      const t = [];
      let n = this[0];
      if (!n) return Ct([]);
      for (; n.previousElementSibling; ) {
        const i = n.previousElementSibling;
        e ? Ct(i).is(e) && t.push(i) : t.push(i), (n = i);
      }
      return Ct(t);
    },
    parent: function (e) {
      const t = [];
      for (let n = 0; n < this.length; n += 1)
        null !== this[n].parentNode &&
          (e
            ? Ct(this[n].parentNode).is(e) && t.push(this[n].parentNode)
            : t.push(this[n].parentNode));
      return Ct(t);
    },
    parents: function (e) {
      const t = [];
      for (let n = 0; n < this.length; n += 1) {
        let i = this[n].parentNode;
        for (; i; )
          e ? Ct(i).is(e) && t.push(i) : t.push(i), (i = i.parentNode);
      }
      return Ct(t);
    },
    closest: function (e) {
      let t = this;
      return void 0 === e ? Ct([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
    },
    find: function (e) {
      const t = [];
      for (let n = 0; n < this.length; n += 1) {
        const i = this[n].querySelectorAll(e);
        for (let e = 0; e < i.length; e += 1) t.push(i[e]);
      }
      return Ct(t);
    },
    children: function (e) {
      const t = [];
      for (let n = 0; n < this.length; n += 1) {
        const i = this[n].children;
        for (let n = 0; n < i.length; n += 1)
          (e && !Ct(i[n]).is(e)) || t.push(i[n]);
      }
      return Ct(t);
    },
    filter: function (e) {
      return Ct(St(this, e));
    },
    remove: function () {
      for (let e = 0; e < this.length; e += 1)
        this[e].parentNode && this[e].parentNode.removeChild(this[e]);
      return this;
    },
  };
  Object.keys(Ot).forEach((e) => {
    Object.defineProperty(Ct.fn, e, { value: Ot[e], writable: !0 });
  });
  const kt = Ct;
  function Mt(e, t = 0) {
    return setTimeout(e, t);
  }
  function Pt() {
    return Date.now();
  }
  function _t(e, t = "x") {
    const n = Et();
    let i, r, s;
    const o = (function (e) {
      const t = Et();
      let n;
      return (
        t.getComputedStyle && (n = t.getComputedStyle(e, null)),
        !n && e.currentStyle && (n = e.currentStyle),
        n || (n = e.style),
        n
      );
    })(e);
    return (
      n.WebKitCSSMatrix
        ? ((r = o.transform || o.webkitTransform),
          r.split(",").length > 6 &&
            (r = r
              .split(", ")
              .map((e) => e.replace(",", "."))
              .join(", ")),
          (s = new n.WebKitCSSMatrix("none" === r ? "" : r)))
        : ((s =
            o.MozTransform ||
            o.OTransform ||
            o.MsTransform ||
            o.msTransform ||
            o.transform ||
            o
              .getPropertyValue("transform")
              .replace("translate(", "matrix(1, 0, 0, 1,")),
          (i = s.toString().split(","))),
      "x" === t &&
        (r = n.WebKitCSSMatrix
          ? s.m41
          : 16 === i.length
          ? parseFloat(i[12])
          : parseFloat(i[4])),
      "y" === t &&
        (r = n.WebKitCSSMatrix
          ? s.m42
          : 16 === i.length
          ? parseFloat(i[13])
          : parseFloat(i[5])),
      r || 0
    );
  }
  function $t(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      e.constructor &&
      "Object" === Object.prototype.toString.call(e).slice(8, -1)
    );
  }
  function Dt(...e) {
    const t = Object(e[0]),
      n = ["__proto__", "constructor", "prototype"];
    for (let r = 1; r < e.length; r += 1) {
      const s = e[r];
      if (
        null != s &&
        ((i = s),
        !("undefined" != typeof window && void 0 !== window.HTMLElement
          ? i instanceof HTMLElement
          : i && (1 === i.nodeType || 11 === i.nodeType)))
      ) {
        const e = Object.keys(Object(s)).filter((e) => n.indexOf(e) < 0);
        for (let n = 0, i = e.length; n < i; n += 1) {
          const i = e[n],
            r = Object.getOwnPropertyDescriptor(s, i);
          void 0 !== r &&
            r.enumerable &&
            ($t(t[i]) && $t(s[i])
              ? s[i].__swiper__
                ? (t[i] = s[i])
                : Dt(t[i], s[i])
              : !$t(t[i]) && $t(s[i])
              ? ((t[i] = {}), s[i].__swiper__ ? (t[i] = s[i]) : Dt(t[i], s[i]))
              : (t[i] = s[i]));
        }
      }
    }
    var i;
    return t;
  }
  function It(e, t, n) {
    e.style.setProperty(t, n);
  }
  function jt({ swiper: e, targetPosition: t, side: n }) {
    const i = Et(),
      r = -e.translate;
    let s,
      o = null;
    const a = e.params.speed;
    (e.wrapperEl.style.scrollSnapType = "none"),
      i.cancelAnimationFrame(e.cssModeFrameID);
    const l = t > r ? "next" : "prev",
      c = (e, t) => ("next" === l && e >= t) || ("prev" === l && e <= t),
      d = () => {
        (s = new Date().getTime()), null === o && (o = s);
        const l = Math.max(Math.min((s - o) / a, 1), 0),
          p = 0.5 - Math.cos(l * Math.PI) / 2;
        let u = r + p * (t - r);
        if ((c(u, t) && (u = t), e.wrapperEl.scrollTo({ [n]: u }), c(u, t)))
          return (
            (e.wrapperEl.style.overflow = "hidden"),
            (e.wrapperEl.style.scrollSnapType = ""),
            setTimeout(() => {
              (e.wrapperEl.style.overflow = ""),
                e.wrapperEl.scrollTo({ [n]: u });
            }),
            void i.cancelAnimationFrame(e.cssModeFrameID)
          );
        e.cssModeFrameID = i.requestAnimationFrame(d);
      };
    d();
  }
  let zt, Bt, Nt;
  function Wt() {
    return (
      zt ||
        (zt = (function () {
          const e = Et(),
            t = bt();
          return {
            smoothScroll:
              t.documentElement && "scrollBehavior" in t.documentElement.style,
            touch: !!(
              "ontouchstart" in e ||
              (e.DocumentTouch && t instanceof e.DocumentTouch)
            ),
            passiveListener: (function () {
              let t = !1;
              try {
                const n = Object.defineProperty({}, "passive", {
                  get() {
                    t = !0;
                  },
                });
                e.addEventListener("testPassiveListener", null, n);
              } catch (e) {}
              return t;
            })(),
            gestures: "ongesturestart" in e,
          };
        })()),
      zt
    );
  }
  function qt(e = {}) {
    return (
      Bt ||
        (Bt = (function ({ userAgent: e } = {}) {
          const t = Wt(),
            n = Et(),
            i = n.navigator.platform,
            r = e || n.navigator.userAgent,
            s = { ios: !1, android: !1 },
            o = n.screen.width,
            a = n.screen.height,
            l = r.match(/(Android);?[\s\/]+([\d.]+)?/);
          let c = r.match(/(iPad).*OS\s([\d_]+)/);
          const d = r.match(/(iPod)(.*OS\s([\d_]+))?/),
            p = !c && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            u = "Win32" === i;
          let f = "MacIntel" === i;
          return (
            !c &&
              f &&
              t.touch &&
              [
                "1024x1366",
                "1366x1024",
                "834x1194",
                "1194x834",
                "834x1112",
                "1112x834",
                "768x1024",
                "1024x768",
                "820x1180",
                "1180x820",
                "810x1080",
                "1080x810",
              ].indexOf(`${o}x${a}`) >= 0 &&
              ((c = r.match(/(Version)\/([\d.]+)/)),
              c || (c = [0, 1, "13_0_0"]),
              (f = !1)),
            l && !u && ((s.os = "android"), (s.android = !0)),
            (c || p || d) && ((s.os = "ios"), (s.ios = !0)),
            s
          );
        })(e)),
      Bt
    );
  }
  function Ht() {
    return (
      Nt ||
        (Nt = (function () {
          const e = Et();
          return {
            isSafari: (function () {
              const t = e.navigator.userAgent.toLowerCase();
              return (
                t.indexOf("safari") >= 0 &&
                t.indexOf("chrome") < 0 &&
                t.indexOf("android") < 0
              );
            })(),
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
              e.navigator.userAgent
            ),
          };
        })()),
      Nt
    );
  }
  const Gt = {
    on(e, t, n) {
      const i = this;
      if ("function" != typeof t) return i;
      const r = n ? "unshift" : "push";
      return (
        e.split(" ").forEach((e) => {
          i.eventsListeners[e] || (i.eventsListeners[e] = []),
            i.eventsListeners[e][r](t);
        }),
        i
      );
    },
    once(e, t, n) {
      const i = this;
      if ("function" != typeof t) return i;
      function r(...n) {
        i.off(e, r), r.__emitterProxy && delete r.__emitterProxy, t.apply(i, n);
      }
      return (r.__emitterProxy = t), i.on(e, r, n);
    },
    onAny(e, t) {
      const n = this;
      if ("function" != typeof e) return n;
      const i = t ? "unshift" : "push";
      return (
        n.eventsAnyListeners.indexOf(e) < 0 && n.eventsAnyListeners[i](e), n
      );
    },
    offAny(e) {
      const t = this;
      if (!t.eventsAnyListeners) return t;
      const n = t.eventsAnyListeners.indexOf(e);
      return n >= 0 && t.eventsAnyListeners.splice(n, 1), t;
    },
    off(e, t) {
      const n = this;
      return n.eventsListeners
        ? (e.split(" ").forEach((e) => {
            void 0 === t
              ? (n.eventsListeners[e] = [])
              : n.eventsListeners[e] &&
                n.eventsListeners[e].forEach((i, r) => {
                  (i === t || (i.__emitterProxy && i.__emitterProxy === t)) &&
                    n.eventsListeners[e].splice(r, 1);
                });
          }),
          n)
        : n;
    },
    emit(...e) {
      const t = this;
      if (!t.eventsListeners) return t;
      let n, i, r;
      "string" == typeof e[0] || Array.isArray(e[0])
        ? ((n = e[0]), (i = e.slice(1, e.length)), (r = t))
        : ((n = e[0].events), (i = e[0].data), (r = e[0].context || t)),
        i.unshift(r);
      return (
        (Array.isArray(n) ? n : n.split(" ")).forEach((e) => {
          t.eventsAnyListeners &&
            t.eventsAnyListeners.length &&
            t.eventsAnyListeners.forEach((t) => {
              t.apply(r, [e, ...i]);
            }),
            t.eventsListeners &&
              t.eventsListeners[e] &&
              t.eventsListeners[e].forEach((e) => {
                e.apply(r, i);
              });
        }),
        t
      );
    },
  };
  const Vt = {
    updateSize: function () {
      const e = this;
      let t, n;
      const i = e.$el;
      (t =
        void 0 !== e.params.width && null !== e.params.width
          ? e.params.width
          : i[0].clientWidth),
        (n =
          void 0 !== e.params.height && null !== e.params.height
            ? e.params.height
            : i[0].clientHeight),
        (0 === t && e.isHorizontal()) ||
          (0 === n && e.isVertical()) ||
          ((t =
            t -
            parseInt(i.css("padding-left") || 0, 10) -
            parseInt(i.css("padding-right") || 0, 10)),
          (n =
            n -
            parseInt(i.css("padding-top") || 0, 10) -
            parseInt(i.css("padding-bottom") || 0, 10)),
          Number.isNaN(t) && (t = 0),
          Number.isNaN(n) && (n = 0),
          Object.assign(e, {
            width: t,
            height: n,
            size: e.isHorizontal() ? t : n,
          }));
    },
    updateSlides: function () {
      const e = this;
      function t(t) {
        return e.isHorizontal()
          ? t
          : {
              width: "height",
              "margin-top": "margin-left",
              "margin-bottom ": "margin-right",
              "margin-left": "margin-top",
              "margin-right": "margin-bottom",
              "padding-left": "padding-top",
              "padding-right": "padding-bottom",
              marginRight: "marginBottom",
            }[t];
      }
      function n(e, n) {
        return parseFloat(e.getPropertyValue(t(n)) || 0);
      }
      const i = e.params,
        { $wrapperEl: r, size: s, rtlTranslate: o, wrongRTL: a } = e,
        l = e.virtual && i.virtual.enabled,
        c = l ? e.virtual.slides.length : e.slides.length,
        d = r.children(`.${e.params.slideClass}`),
        p = l ? e.virtual.slides.length : d.length;
      let u = [];
      const f = [],
        h = [];
      let m = i.slidesOffsetBefore;
      "function" == typeof m && (m = i.slidesOffsetBefore.call(e));
      let g = i.slidesOffsetAfter;
      "function" == typeof g && (g = i.slidesOffsetAfter.call(e));
      const v = e.snapGrid.length,
        y = e.slidesGrid.length;
      let b = i.spaceBetween,
        w = -m,
        E = 0,
        x = 0;
      if (void 0 === s) return;
      "string" == typeof b &&
        b.indexOf("%") >= 0 &&
        (b = (parseFloat(b.replace("%", "")) / 100) * s),
        (e.virtualSize = -b),
        o
          ? d.css({ marginLeft: "", marginBottom: "", marginTop: "" })
          : d.css({ marginRight: "", marginBottom: "", marginTop: "" }),
        i.centeredSlides &&
          i.cssMode &&
          (It(e.wrapperEl, "--swiper-centered-offset-before", ""),
          It(e.wrapperEl, "--swiper-centered-offset-after", ""));
      const T = i.grid && i.grid.rows > 1 && e.grid;
      let S;
      T && e.grid.initSlides(p);
      const C =
        "auto" === i.slidesPerView &&
        i.breakpoints &&
        Object.keys(i.breakpoints).filter(
          (e) => void 0 !== i.breakpoints[e].slidesPerView
        ).length > 0;
      for (let r = 0; r < p; r += 1) {
        S = 0;
        const o = d.eq(r);
        if (
          (T && e.grid.updateSlide(r, o, p, t), "none" !== o.css("display"))
        ) {
          if ("auto" === i.slidesPerView) {
            C && (d[r].style[t("width")] = "");
            const s = getComputedStyle(o[0]),
              a = o[0].style.transform,
              l = o[0].style.webkitTransform;
            if (
              (a && (o[0].style.transform = "none"),
              l && (o[0].style.webkitTransform = "none"),
              i.roundLengths)
            )
              S = e.isHorizontal() ? o.outerWidth(!0) : o.outerHeight(!0);
            else {
              const e = n(s, "width"),
                t = n(s, "padding-left"),
                i = n(s, "padding-right"),
                r = n(s, "margin-left"),
                a = n(s, "margin-right"),
                l = s.getPropertyValue("box-sizing");
              if (l && "border-box" === l) S = e + r + a;
              else {
                const { clientWidth: n, offsetWidth: s } = o[0];
                S = e + t + i + r + a + (s - n);
              }
            }
            a && (o[0].style.transform = a),
              l && (o[0].style.webkitTransform = l),
              i.roundLengths && (S = Math.floor(S));
          } else
            (S = (s - (i.slidesPerView - 1) * b) / i.slidesPerView),
              i.roundLengths && (S = Math.floor(S)),
              d[r] && (d[r].style[t("width")] = `${S}px`);
          d[r] && (d[r].swiperSlideSize = S),
            h.push(S),
            i.centeredSlides
              ? ((w = w + S / 2 + E / 2 + b),
                0 === E && 0 !== r && (w = w - s / 2 - b),
                0 === r && (w = w - s / 2 - b),
                Math.abs(w) < 0.001 && (w = 0),
                i.roundLengths && (w = Math.floor(w)),
                x % i.slidesPerGroup == 0 && u.push(w),
                f.push(w))
              : (i.roundLengths && (w = Math.floor(w)),
                (x - Math.min(e.params.slidesPerGroupSkip, x)) %
                  e.params.slidesPerGroup ==
                  0 && u.push(w),
                f.push(w),
                (w = w + S + b)),
            (e.virtualSize += S + b),
            (E = S),
            (x += 1);
        }
      }
      if (
        ((e.virtualSize = Math.max(e.virtualSize, s) + g),
        o &&
          a &&
          ("slide" === i.effect || "coverflow" === i.effect) &&
          r.css({ width: `${e.virtualSize + i.spaceBetween}px` }),
        i.setWrapperSize &&
          r.css({ [t("width")]: `${e.virtualSize + i.spaceBetween}px` }),
        T && e.grid.updateWrapperSize(S, u, t),
        !i.centeredSlides)
      ) {
        const t = [];
        for (let n = 0; n < u.length; n += 1) {
          let r = u[n];
          i.roundLengths && (r = Math.floor(r)),
            u[n] <= e.virtualSize - s && t.push(r);
        }
        (u = t),
          Math.floor(e.virtualSize - s) - Math.floor(u[u.length - 1]) > 1 &&
            u.push(e.virtualSize - s);
      }
      if ((0 === u.length && (u = [0]), 0 !== i.spaceBetween)) {
        const n = e.isHorizontal() && o ? "marginLeft" : t("marginRight");
        d.filter((e, t) => !i.cssMode || t !== d.length - 1).css({
          [n]: `${b}px`,
        });
      }
      if (i.centeredSlides && i.centeredSlidesBounds) {
        let e = 0;
        h.forEach((t) => {
          e += t + (i.spaceBetween ? i.spaceBetween : 0);
        }),
          (e -= i.spaceBetween);
        const t = e - s;
        u = u.map((e) => (e < 0 ? -m : e > t ? t + g : e));
      }
      if (i.centerInsufficientSlides) {
        let e = 0;
        if (
          (h.forEach((t) => {
            e += t + (i.spaceBetween ? i.spaceBetween : 0);
          }),
          (e -= i.spaceBetween),
          e < s)
        ) {
          const t = (s - e) / 2;
          u.forEach((e, n) => {
            u[n] = e - t;
          }),
            f.forEach((e, n) => {
              f[n] = e + t;
            });
        }
      }
      if (
        (Object.assign(e, {
          slides: d,
          snapGrid: u,
          slidesGrid: f,
          slidesSizesGrid: h,
        }),
        i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)
      ) {
        It(e.wrapperEl, "--swiper-centered-offset-before", -u[0] + "px"),
          It(
            e.wrapperEl,
            "--swiper-centered-offset-after",
            e.size / 2 - h[h.length - 1] / 2 + "px"
          );
        const t = -e.snapGrid[0],
          n = -e.slidesGrid[0];
        (e.snapGrid = e.snapGrid.map((e) => e + t)),
          (e.slidesGrid = e.slidesGrid.map((e) => e + n));
      }
      p !== c && e.emit("slidesLengthChange"),
        u.length !== v &&
          (e.params.watchOverflow && e.checkOverflow(),
          e.emit("snapGridLengthChange")),
        f.length !== y && e.emit("slidesGridLengthChange"),
        i.watchSlidesProgress && e.updateSlidesOffset();
    },
    updateAutoHeight: function (e) {
      const t = this,
        n = [],
        i = t.virtual && t.params.virtual.enabled;
      let r,
        s = 0;
      "number" == typeof e
        ? t.setTransition(e)
        : !0 === e && t.setTransition(t.params.speed);
      const o = (e) =>
        i
          ? t.slides.filter(
              (t) =>
                parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e
            )[0]
          : t.slides.eq(e)[0];
      if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
        if (t.params.centeredSlides)
          t.visibleSlides.each((e) => {
            n.push(e);
          });
        else
          for (r = 0; r < Math.ceil(t.params.slidesPerView); r += 1) {
            const e = t.activeIndex + r;
            if (e > t.slides.length && !i) break;
            n.push(o(e));
          }
      else n.push(o(t.activeIndex));
      for (r = 0; r < n.length; r += 1)
        if (void 0 !== n[r]) {
          const e = n[r].offsetHeight;
          s = e > s ? e : s;
        }
      (s || 0 === s) && t.$wrapperEl.css("height", `${s}px`);
    },
    updateSlidesOffset: function () {
      const e = this,
        t = e.slides;
      for (let n = 0; n < t.length; n += 1)
        t[n].swiperSlideOffset = e.isHorizontal()
          ? t[n].offsetLeft
          : t[n].offsetTop;
    },
    updateSlidesProgress: function (e = (this && this.translate) || 0) {
      const t = this,
        n = t.params,
        { slides: i, rtlTranslate: r, snapGrid: s } = t;
      if (0 === i.length) return;
      void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
      let o = -e;
      r && (o = e),
        i.removeClass(n.slideVisibleClass),
        (t.visibleSlidesIndexes = []),
        (t.visibleSlides = []);
      for (let e = 0; e < i.length; e += 1) {
        const a = i[e];
        let l = a.swiperSlideOffset;
        n.cssMode && n.centeredSlides && (l -= i[0].swiperSlideOffset);
        const c =
            (o + (n.centeredSlides ? t.minTranslate() : 0) - l) /
            (a.swiperSlideSize + n.spaceBetween),
          d =
            (o - s[0] + (n.centeredSlides ? t.minTranslate() : 0) - l) /
            (a.swiperSlideSize + n.spaceBetween),
          p = -(o - l),
          u = p + t.slidesSizesGrid[e];
        ((p >= 0 && p < t.size - 1) ||
          (u > 1 && u <= t.size) ||
          (p <= 0 && u >= t.size)) &&
          (t.visibleSlides.push(a),
          t.visibleSlidesIndexes.push(e),
          i.eq(e).addClass(n.slideVisibleClass)),
          (a.progress = r ? -c : c),
          (a.originalProgress = r ? -d : d);
      }
      t.visibleSlides = kt(t.visibleSlides);
    },
    updateProgress: function (e) {
      const t = this;
      if (void 0 === e) {
        const n = t.rtlTranslate ? -1 : 1;
        e = (t && t.translate && t.translate * n) || 0;
      }
      const n = t.params,
        i = t.maxTranslate() - t.minTranslate();
      let { progress: r, isBeginning: s, isEnd: o } = t;
      const a = s,
        l = o;
      0 === i
        ? ((r = 0), (s = !0), (o = !0))
        : ((r = (e - t.minTranslate()) / i), (s = r <= 0), (o = r >= 1)),
        Object.assign(t, { progress: r, isBeginning: s, isEnd: o }),
        (n.watchSlidesProgress || (n.centeredSlides && n.autoHeight)) &&
          t.updateSlidesProgress(e),
        s && !a && t.emit("reachBeginning toEdge"),
        o && !l && t.emit("reachEnd toEdge"),
        ((a && !s) || (l && !o)) && t.emit("fromEdge"),
        t.emit("progress", r);
    },
    updateSlidesClasses: function () {
      const e = this,
        {
          slides: t,
          params: n,
          $wrapperEl: i,
          activeIndex: r,
          realIndex: s,
        } = e,
        o = e.virtual && n.virtual.enabled;
      let a;
      t.removeClass(
        `${n.slideActiveClass} ${n.slideNextClass} ${n.slidePrevClass} ${n.slideDuplicateActiveClass} ${n.slideDuplicateNextClass} ${n.slideDuplicatePrevClass}`
      ),
        (a = o
          ? e.$wrapperEl.find(
              `.${n.slideClass}[data-swiper-slide-index="${r}"]`
            )
          : t.eq(r)),
        a.addClass(n.slideActiveClass),
        n.loop &&
          (a.hasClass(n.slideDuplicateClass)
            ? i
                .children(
                  `.${n.slideClass}:not(.${n.slideDuplicateClass})[data-swiper-slide-index="${s}"]`
                )
                .addClass(n.slideDuplicateActiveClass)
            : i
                .children(
                  `.${n.slideClass}.${n.slideDuplicateClass}[data-swiper-slide-index="${s}"]`
                )
                .addClass(n.slideDuplicateActiveClass));
      let l = a.nextAll(`.${n.slideClass}`).eq(0).addClass(n.slideNextClass);
      n.loop && 0 === l.length && ((l = t.eq(0)), l.addClass(n.slideNextClass));
      let c = a.prevAll(`.${n.slideClass}`).eq(0).addClass(n.slidePrevClass);
      n.loop &&
        0 === c.length &&
        ((c = t.eq(-1)), c.addClass(n.slidePrevClass)),
        n.loop &&
          (l.hasClass(n.slideDuplicateClass)
            ? i
                .children(
                  `.${n.slideClass}:not(.${
                    n.slideDuplicateClass
                  })[data-swiper-slide-index="${l.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(n.slideDuplicateNextClass)
            : i
                .children(
                  `.${n.slideClass}.${
                    n.slideDuplicateClass
                  }[data-swiper-slide-index="${l.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(n.slideDuplicateNextClass),
          c.hasClass(n.slideDuplicateClass)
            ? i
                .children(
                  `.${n.slideClass}:not(.${
                    n.slideDuplicateClass
                  })[data-swiper-slide-index="${c.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(n.slideDuplicatePrevClass)
            : i
                .children(
                  `.${n.slideClass}.${
                    n.slideDuplicateClass
                  }[data-swiper-slide-index="${c.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(n.slideDuplicatePrevClass)),
        e.emitSlidesClasses();
    },
    updateActiveIndex: function (e) {
      const t = this,
        n = t.rtlTranslate ? t.translate : -t.translate,
        {
          slidesGrid: i,
          snapGrid: r,
          params: s,
          activeIndex: o,
          realIndex: a,
          snapIndex: l,
        } = t;
      let c,
        d = e;
      if (void 0 === d) {
        for (let e = 0; e < i.length; e += 1)
          void 0 !== i[e + 1]
            ? n >= i[e] && n < i[e + 1] - (i[e + 1] - i[e]) / 2
              ? (d = e)
              : n >= i[e] && n < i[e + 1] && (d = e + 1)
            : n >= i[e] && (d = e);
        s.normalizeSlideIndex && (d < 0 || void 0 === d) && (d = 0);
      }
      if (r.indexOf(n) >= 0) c = r.indexOf(n);
      else {
        const e = Math.min(s.slidesPerGroupSkip, d);
        c = e + Math.floor((d - e) / s.slidesPerGroup);
      }
      if ((c >= r.length && (c = r.length - 1), d === o))
        return void (c !== l && ((t.snapIndex = c), t.emit("snapIndexChange")));
      const p = parseInt(
        t.slides.eq(d).attr("data-swiper-slide-index") || d,
        10
      );
      Object.assign(t, {
        snapIndex: c,
        realIndex: p,
        previousIndex: o,
        activeIndex: d,
      }),
        t.emit("activeIndexChange"),
        t.emit("snapIndexChange"),
        a !== p && t.emit("realIndexChange"),
        (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange");
    },
    updateClickedSlide: function (e) {
      const t = this,
        n = t.params,
        i = kt(e).closest(`.${n.slideClass}`)[0];
      let r,
        s = !1;
      if (i)
        for (let e = 0; e < t.slides.length; e += 1)
          if (t.slides[e] === i) {
            (s = !0), (r = e);
            break;
          }
      if (!i || !s)
        return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
      (t.clickedSlide = i),
        t.virtual && t.params.virtual.enabled
          ? (t.clickedIndex = parseInt(
              kt(i).attr("data-swiper-slide-index"),
              10
            ))
          : (t.clickedIndex = r),
        n.slideToClickedSlide &&
          void 0 !== t.clickedIndex &&
          t.clickedIndex !== t.activeIndex &&
          t.slideToClickedSlide();
    },
  };
  const Rt = {
    getTranslate: function (e = this.isHorizontal() ? "x" : "y") {
      const { params: t, rtlTranslate: n, translate: i, $wrapperEl: r } = this;
      if (t.virtualTranslate) return n ? -i : i;
      if (t.cssMode) return i;
      let s = _t(r[0], e);
      return n && (s = -s), s || 0;
    },
    setTranslate: function (e, t) {
      const n = this,
        {
          rtlTranslate: i,
          params: r,
          $wrapperEl: s,
          wrapperEl: o,
          progress: a,
        } = n;
      let l,
        c = 0,
        d = 0;
      n.isHorizontal() ? (c = i ? -e : e) : (d = e),
        r.roundLengths && ((c = Math.floor(c)), (d = Math.floor(d))),
        r.cssMode
          ? (o[n.isHorizontal() ? "scrollLeft" : "scrollTop"] = n.isHorizontal()
              ? -c
              : -d)
          : r.virtualTranslate ||
            s.transform(`translate3d(${c}px, ${d}px, 0px)`),
        (n.previousTranslate = n.translate),
        (n.translate = n.isHorizontal() ? c : d);
      const p = n.maxTranslate() - n.minTranslate();
      (l = 0 === p ? 0 : (e - n.minTranslate()) / p),
        l !== a && n.updateProgress(e),
        n.emit("setTranslate", n.translate, t);
    },
    minTranslate: function () {
      return -this.snapGrid[0];
    },
    maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
    translateTo: function (e = 0, t = this.params.speed, n = !0, i = !0, r) {
      const s = this,
        { params: o, wrapperEl: a } = s;
      if (s.animating && o.preventInteractionOnTransition) return !1;
      const l = s.minTranslate(),
        c = s.maxTranslate();
      let d;
      if (
        ((d = i && e > l ? l : i && e < c ? c : e),
        s.updateProgress(d),
        o.cssMode)
      ) {
        const e = s.isHorizontal();
        if (0 === t) a[e ? "scrollLeft" : "scrollTop"] = -d;
        else {
          if (!s.support.smoothScroll)
            return (
              jt({ swiper: s, targetPosition: -d, side: e ? "left" : "top" }),
              !0
            );
          a.scrollTo({ [e ? "left" : "top"]: -d, behavior: "smooth" });
        }
        return !0;
      }
      return (
        0 === t
          ? (s.setTransition(0),
            s.setTranslate(d),
            n &&
              (s.emit("beforeTransitionStart", t, r), s.emit("transitionEnd")))
          : (s.setTransition(t),
            s.setTranslate(d),
            n &&
              (s.emit("beforeTransitionStart", t, r),
              s.emit("transitionStart")),
            s.animating ||
              ((s.animating = !0),
              s.onTranslateToWrapperTransitionEnd ||
                (s.onTranslateToWrapperTransitionEnd = function (e) {
                  s &&
                    !s.destroyed &&
                    e.target === this &&
                    (s.$wrapperEl[0].removeEventListener(
                      "transitionend",
                      s.onTranslateToWrapperTransitionEnd
                    ),
                    s.$wrapperEl[0].removeEventListener(
                      "webkitTransitionEnd",
                      s.onTranslateToWrapperTransitionEnd
                    ),
                    (s.onTranslateToWrapperTransitionEnd = null),
                    delete s.onTranslateToWrapperTransitionEnd,
                    n && s.emit("transitionEnd"));
                }),
              s.$wrapperEl[0].addEventListener(
                "transitionend",
                s.onTranslateToWrapperTransitionEnd
              ),
              s.$wrapperEl[0].addEventListener(
                "webkitTransitionEnd",
                s.onTranslateToWrapperTransitionEnd
              ))),
        !0
      );
    },
  };
  function Ft({ swiper: e, runCallbacks: t, direction: n, step: i }) {
    const { activeIndex: r, previousIndex: s } = e;
    let o = n;
    if (
      (o || (o = r > s ? "next" : r < s ? "prev" : "reset"),
      e.emit(`transition${i}`),
      t && r !== s)
    ) {
      if ("reset" === o) return void e.emit(`slideResetTransition${i}`);
      e.emit(`slideChangeTransition${i}`),
        "next" === o
          ? e.emit(`slideNextTransition${i}`)
          : e.emit(`slidePrevTransition${i}`);
    }
  }
  const Xt = {
    slideTo: function (e = 0, t = this.params.speed, n = !0, i, r) {
      if ("number" != typeof e && "string" != typeof e)
        throw new Error(
          `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`
        );
      if ("string" == typeof e) {
        const t = parseInt(e, 10);
        if (!isFinite(t))
          throw new Error(
            `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
          );
        e = t;
      }
      const s = this;
      let o = e;
      o < 0 && (o = 0);
      const {
        params: a,
        snapGrid: l,
        slidesGrid: c,
        previousIndex: d,
        activeIndex: p,
        rtlTranslate: u,
        wrapperEl: f,
        enabled: h,
      } = s;
      if ((s.animating && a.preventInteractionOnTransition) || (!h && !i && !r))
        return !1;
      const m = Math.min(s.params.slidesPerGroupSkip, o);
      let g = m + Math.floor((o - m) / s.params.slidesPerGroup);
      g >= l.length && (g = l.length - 1),
        (p || a.initialSlide || 0) === (d || 0) &&
          n &&
          s.emit("beforeSlideChangeStart");
      const v = -l[g];
      if ((s.updateProgress(v), a.normalizeSlideIndex))
        for (let e = 0; e < c.length; e += 1) {
          const t = -Math.floor(100 * v),
            n = Math.floor(100 * c[e]),
            i = Math.floor(100 * c[e + 1]);
          void 0 !== c[e + 1]
            ? t >= n && t < i - (i - n) / 2
              ? (o = e)
              : t >= n && t < i && (o = e + 1)
            : t >= n && (o = e);
        }
      if (s.initialized && o !== p) {
        if (!s.allowSlideNext && v < s.translate && v < s.minTranslate())
          return !1;
        if (
          !s.allowSlidePrev &&
          v > s.translate &&
          v > s.maxTranslate() &&
          (p || 0) !== o
        )
          return !1;
      }
      let y;
      if (
        ((y = o > p ? "next" : o < p ? "prev" : "reset"),
        (u && -v === s.translate) || (!u && v === s.translate))
      )
        return (
          s.updateActiveIndex(o),
          a.autoHeight && s.updateAutoHeight(),
          s.updateSlidesClasses(),
          "slide" !== a.effect && s.setTranslate(v),
          "reset" !== y && (s.transitionStart(n, y), s.transitionEnd(n, y)),
          !1
        );
      if (a.cssMode) {
        const e = s.isHorizontal(),
          n = u ? v : -v;
        if (0 === t) {
          const t = s.virtual && s.params.virtual.enabled;
          t &&
            ((s.wrapperEl.style.scrollSnapType = "none"),
            (s._immediateVirtual = !0)),
            (f[e ? "scrollLeft" : "scrollTop"] = n),
            t &&
              requestAnimationFrame(() => {
                (s.wrapperEl.style.scrollSnapType = ""),
                  (s._swiperImmediateVirtual = !1);
              });
        } else {
          if (!s.support.smoothScroll)
            return (
              jt({ swiper: s, targetPosition: n, side: e ? "left" : "top" }), !0
            );
          f.scrollTo({ [e ? "left" : "top"]: n, behavior: "smooth" });
        }
        return !0;
      }
      return (
        s.setTransition(t),
        s.setTranslate(v),
        s.updateActiveIndex(o),
        s.updateSlidesClasses(),
        s.emit("beforeTransitionStart", t, i),
        s.transitionStart(n, y),
        0 === t
          ? s.transitionEnd(n, y)
          : s.animating ||
            ((s.animating = !0),
            s.onSlideToWrapperTransitionEnd ||
              (s.onSlideToWrapperTransitionEnd = function (e) {
                s &&
                  !s.destroyed &&
                  e.target === this &&
                  (s.$wrapperEl[0].removeEventListener(
                    "transitionend",
                    s.onSlideToWrapperTransitionEnd
                  ),
                  s.$wrapperEl[0].removeEventListener(
                    "webkitTransitionEnd",
                    s.onSlideToWrapperTransitionEnd
                  ),
                  (s.onSlideToWrapperTransitionEnd = null),
                  delete s.onSlideToWrapperTransitionEnd,
                  s.transitionEnd(n, y));
              }),
            s.$wrapperEl[0].addEventListener(
              "transitionend",
              s.onSlideToWrapperTransitionEnd
            ),
            s.$wrapperEl[0].addEventListener(
              "webkitTransitionEnd",
              s.onSlideToWrapperTransitionEnd
            )),
        !0
      );
    },
    slideToLoop: function (e = 0, t = this.params.speed, n = !0, i) {
      const r = this;
      let s = e;
      return r.params.loop && (s += r.loopedSlides), r.slideTo(s, t, n, i);
    },
    slideNext: function (e = this.params.speed, t = !0, n) {
      const i = this,
        { animating: r, enabled: s, params: o } = i;
      if (!s) return i;
      let a = o.slidesPerGroup;
      "auto" === o.slidesPerView &&
        1 === o.slidesPerGroup &&
        o.slidesPerGroupAuto &&
        (a = Math.max(i.slidesPerViewDynamic("current", !0), 1));
      const l = i.activeIndex < o.slidesPerGroupSkip ? 1 : a;
      if (o.loop) {
        if (r && o.loopPreventsSlide) return !1;
        i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
      }
      return o.rewind && i.isEnd
        ? i.slideTo(0, e, t, n)
        : i.slideTo(i.activeIndex + l, e, t, n);
    },
    slidePrev: function (e = this.params.speed, t = !0, n) {
      const i = this,
        {
          params: r,
          animating: s,
          snapGrid: o,
          slidesGrid: a,
          rtlTranslate: l,
          enabled: c,
        } = i;
      if (!c) return i;
      if (r.loop) {
        if (s && r.loopPreventsSlide) return !1;
        i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
      }
      function d(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      const p = d(l ? i.translate : -i.translate),
        u = o.map((e) => d(e));
      let f = o[u.indexOf(p) - 1];
      if (void 0 === f && r.cssMode) {
        let e;
        o.forEach((t, n) => {
          p >= t && (e = n);
        }),
          void 0 !== e && (f = o[e > 0 ? e - 1 : e]);
      }
      let h = 0;
      return (
        void 0 !== f &&
          ((h = a.indexOf(f)),
          h < 0 && (h = i.activeIndex - 1),
          "auto" === r.slidesPerView &&
            1 === r.slidesPerGroup &&
            r.slidesPerGroupAuto &&
            ((h = h - i.slidesPerViewDynamic("previous", !0) + 1),
            (h = Math.max(h, 0)))),
        r.rewind && i.isBeginning
          ? i.slideTo(i.slides.length - 1, e, t, n)
          : i.slideTo(h, e, t, n)
      );
    },
    slideReset: function (e = this.params.speed, t = !0, n) {
      return this.slideTo(this.activeIndex, e, t, n);
    },
    slideToClosest: function (e = this.params.speed, t = !0, n, i = 0.5) {
      const r = this;
      let s = r.activeIndex;
      const o = Math.min(r.params.slidesPerGroupSkip, s),
        a = o + Math.floor((s - o) / r.params.slidesPerGroup),
        l = r.rtlTranslate ? r.translate : -r.translate;
      if (l >= r.snapGrid[a]) {
        const e = r.snapGrid[a];
        l - e > (r.snapGrid[a + 1] - e) * i && (s += r.params.slidesPerGroup);
      } else {
        const e = r.snapGrid[a - 1];
        l - e <= (r.snapGrid[a] - e) * i && (s -= r.params.slidesPerGroup);
      }
      return (
        (s = Math.max(s, 0)),
        (s = Math.min(s, r.slidesGrid.length - 1)),
        r.slideTo(s, e, t, n)
      );
    },
    slideToClickedSlide: function () {
      const e = this,
        { params: t, $wrapperEl: n } = e,
        i =
          "auto" === t.slidesPerView
            ? e.slidesPerViewDynamic()
            : t.slidesPerView;
      let r,
        s = e.clickedIndex;
      if (t.loop) {
        if (e.animating) return;
        (r = parseInt(kt(e.clickedSlide).attr("data-swiper-slide-index"), 10)),
          t.centeredSlides
            ? s < e.loopedSlides - i / 2 ||
              s > e.slides.length - e.loopedSlides + i / 2
              ? (e.loopFix(),
                (s = n
                  .children(
                    `.${t.slideClass}[data-swiper-slide-index="${r}"]:not(.${t.slideDuplicateClass})`
                  )
                  .eq(0)
                  .index()),
                Mt(() => {
                  e.slideTo(s);
                }))
              : e.slideTo(s)
            : s > e.slides.length - i
            ? (e.loopFix(),
              (s = n
                .children(
                  `.${t.slideClass}[data-swiper-slide-index="${r}"]:not(.${t.slideDuplicateClass})`
                )
                .eq(0)
                .index()),
              Mt(() => {
                e.slideTo(s);
              }))
            : e.slideTo(s);
      } else e.slideTo(s);
    },
  };
  const Yt = {
    loopCreate: function () {
      const e = this,
        t = bt(),
        { params: n, $wrapperEl: i } = e,
        r = i.children().length > 0 ? kt(i.children()[0].parentNode) : i;
      r.children(`.${n.slideClass}.${n.slideDuplicateClass}`).remove();
      let s = r.children(`.${n.slideClass}`);
      if (n.loopFillGroupWithBlank) {
        const e = n.slidesPerGroup - (s.length % n.slidesPerGroup);
        if (e !== n.slidesPerGroup) {
          for (let i = 0; i < e; i += 1) {
            const e = kt(t.createElement("div")).addClass(
              `${n.slideClass} ${n.slideBlankClass}`
            );
            r.append(e);
          }
          s = r.children(`.${n.slideClass}`);
        }
      }
      "auto" !== n.slidesPerView ||
        n.loopedSlides ||
        (n.loopedSlides = s.length),
        (e.loopedSlides = Math.ceil(
          parseFloat(n.loopedSlides || n.slidesPerView, 10)
        )),
        (e.loopedSlides += n.loopAdditionalSlides),
        e.loopedSlides > s.length && (e.loopedSlides = s.length);
      const o = [],
        a = [];
      s.each((t, n) => {
        const i = kt(t);
        n < e.loopedSlides && a.push(t),
          n < s.length && n >= s.length - e.loopedSlides && o.push(t),
          i.attr("data-swiper-slide-index", n);
      });
      for (let e = 0; e < a.length; e += 1)
        r.append(kt(a[e].cloneNode(!0)).addClass(n.slideDuplicateClass));
      for (let e = o.length - 1; e >= 0; e -= 1)
        r.prepend(kt(o[e].cloneNode(!0)).addClass(n.slideDuplicateClass));
    },
    loopFix: function () {
      const e = this;
      e.emit("beforeLoopFix");
      const {
        activeIndex: t,
        slides: n,
        loopedSlides: i,
        allowSlidePrev: r,
        allowSlideNext: s,
        snapGrid: o,
        rtlTranslate: a,
      } = e;
      let l;
      (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
      const c = -o[t] - e.getTranslate();
      if (t < i) {
        (l = n.length - 3 * i + t), (l += i);
        e.slideTo(l, 0, !1, !0) &&
          0 !== c &&
          e.setTranslate((a ? -e.translate : e.translate) - c);
      } else if (t >= n.length - i) {
        (l = -n.length + t + i), (l += i);
        e.slideTo(l, 0, !1, !0) &&
          0 !== c &&
          e.setTranslate((a ? -e.translate : e.translate) - c);
      }
      (e.allowSlidePrev = r), (e.allowSlideNext = s), e.emit("loopFix");
    },
    loopDestroy: function () {
      const { $wrapperEl: e, params: t, slides: n } = this;
      e
        .children(
          `.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`
        )
        .remove(),
        n.removeAttr("data-swiper-slide-index");
    },
  };
  function Ut(e) {
    const t = this,
      n = bt(),
      i = Et(),
      r = t.touchEventsData,
      { params: s, touches: o, enabled: a } = t;
    if (!a) return;
    if (t.animating && s.preventInteractionOnTransition) return;
    !t.animating && s.cssMode && s.loop && t.loopFix();
    let l = e;
    l.originalEvent && (l = l.originalEvent);
    let c = kt(l.target);
    if ("wrapper" === s.touchEventsTarget && !c.closest(t.wrapperEl).length)
      return;
    if (
      ((r.isTouchEvent = "touchstart" === l.type),
      !r.isTouchEvent && "which" in l && 3 === l.which)
    )
      return;
    if (!r.isTouchEvent && "button" in l && l.button > 0) return;
    if (r.isTouched && r.isMoved) return;
    !!s.noSwipingClass &&
      "" !== s.noSwipingClass &&
      l.target &&
      l.target.shadowRoot &&
      e.path &&
      e.path[0] &&
      (c = kt(e.path[0]));
    const d = s.noSwipingSelector
        ? s.noSwipingSelector
        : `.${s.noSwipingClass}`,
      p = !(!l.target || !l.target.shadowRoot);
    if (
      s.noSwiping &&
      (p
        ? (function (e, t = this) {
            return (function t(n) {
              return n && n !== bt() && n !== Et()
                ? (n.assignedSlot && (n = n.assignedSlot),
                  n.closest(e) || t(n.getRootNode().host))
                : null;
            })(t);
          })(d, l.target)
        : c.closest(d)[0])
    )
      return void (t.allowClick = !0);
    if (s.swipeHandler && !c.closest(s.swipeHandler)[0]) return;
    (o.currentX = "touchstart" === l.type ? l.targetTouches[0].pageX : l.pageX),
      (o.currentY =
        "touchstart" === l.type ? l.targetTouches[0].pageY : l.pageY);
    const u = o.currentX,
      f = o.currentY,
      h = s.edgeSwipeDetection || s.iOSEdgeSwipeDetection,
      m = s.edgeSwipeThreshold || s.iOSEdgeSwipeThreshold;
    if (h && (u <= m || u >= i.innerWidth - m)) {
      if ("prevent" !== h) return;
      e.preventDefault();
    }
    if (
      (Object.assign(r, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0,
      }),
      (o.startX = u),
      (o.startY = f),
      (r.touchStartTime = Pt()),
      (t.allowClick = !0),
      t.updateSize(),
      (t.swipeDirection = void 0),
      s.threshold > 0 && (r.allowThresholdMove = !1),
      "touchstart" !== l.type)
    ) {
      let e = !0;
      c.is(r.focusableElements) && (e = !1),
        n.activeElement &&
          kt(n.activeElement).is(r.focusableElements) &&
          n.activeElement !== c[0] &&
          n.activeElement.blur();
      const i = e && t.allowTouchMove && s.touchStartPreventDefault;
      (!s.touchStartForcePreventDefault && !i) ||
        c[0].isContentEditable ||
        l.preventDefault();
    }
    t.emit("touchStart", l);
  }
  function Qt(e) {
    const t = bt(),
      n = this,
      i = n.touchEventsData,
      { params: r, touches: s, rtlTranslate: o, enabled: a } = n;
    if (!a) return;
    let l = e;
    if ((l.originalEvent && (l = l.originalEvent), !i.isTouched))
      return void (
        i.startMoving &&
        i.isScrolling &&
        n.emit("touchMoveOpposite", l)
      );
    if (i.isTouchEvent && "touchmove" !== l.type) return;
    const c =
        "touchmove" === l.type &&
        l.targetTouches &&
        (l.targetTouches[0] || l.changedTouches[0]),
      d = "touchmove" === l.type ? c.pageX : l.pageX,
      p = "touchmove" === l.type ? c.pageY : l.pageY;
    if (l.preventedByNestedSwiper) return (s.startX = d), void (s.startY = p);
    if (!n.allowTouchMove)
      return (
        (n.allowClick = !1),
        void (
          i.isTouched &&
          (Object.assign(s, { startX: d, startY: p, currentX: d, currentY: p }),
          (i.touchStartTime = Pt()))
        )
      );
    if (i.isTouchEvent && r.touchReleaseOnEdges && !r.loop)
      if (n.isVertical()) {
        if (
          (p < s.startY && n.translate <= n.maxTranslate()) ||
          (p > s.startY && n.translate >= n.minTranslate())
        )
          return (i.isTouched = !1), void (i.isMoved = !1);
      } else if (
        (d < s.startX && n.translate <= n.maxTranslate()) ||
        (d > s.startX && n.translate >= n.minTranslate())
      )
        return;
    if (
      i.isTouchEvent &&
      t.activeElement &&
      l.target === t.activeElement &&
      kt(l.target).is(i.focusableElements)
    )
      return (i.isMoved = !0), void (n.allowClick = !1);
    if (
      (i.allowTouchCallbacks && n.emit("touchMove", l),
      l.targetTouches && l.targetTouches.length > 1)
    )
      return;
    (s.currentX = d), (s.currentY = p);
    const u = s.currentX - s.startX,
      f = s.currentY - s.startY;
    if (n.params.threshold && Math.sqrt(u ** 2 + f ** 2) < n.params.threshold)
      return;
    if (void 0 === i.isScrolling) {
      let e;
      (n.isHorizontal() && s.currentY === s.startY) ||
      (n.isVertical() && s.currentX === s.startX)
        ? (i.isScrolling = !1)
        : u * u + f * f >= 25 &&
          ((e = (180 * Math.atan2(Math.abs(f), Math.abs(u))) / Math.PI),
          (i.isScrolling = n.isHorizontal()
            ? e > r.touchAngle
            : 90 - e > r.touchAngle));
    }
    if (
      (i.isScrolling && n.emit("touchMoveOpposite", l),
      void 0 === i.startMoving &&
        ((s.currentX === s.startX && s.currentY === s.startY) ||
          (i.startMoving = !0)),
      i.isScrolling)
    )
      return void (i.isTouched = !1);
    if (!i.startMoving) return;
    (n.allowClick = !1),
      !r.cssMode && l.cancelable && l.preventDefault(),
      r.touchMoveStopPropagation && !r.nested && l.stopPropagation(),
      i.isMoved ||
        (r.loop && !r.cssMode && n.loopFix(),
        (i.startTranslate = n.getTranslate()),
        n.setTransition(0),
        n.animating &&
          n.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
        (i.allowMomentumBounce = !1),
        !r.grabCursor ||
          (!0 !== n.allowSlideNext && !0 !== n.allowSlidePrev) ||
          n.setGrabCursor(!0),
        n.emit("sliderFirstMove", l)),
      n.emit("sliderMove", l),
      (i.isMoved = !0);
    let h = n.isHorizontal() ? u : f;
    (s.diff = h),
      (h *= r.touchRatio),
      o && (h = -h),
      (n.swipeDirection = h > 0 ? "prev" : "next"),
      (i.currentTranslate = h + i.startTranslate);
    let m = !0,
      g = r.resistanceRatio;
    if (
      (r.touchReleaseOnEdges && (g = 0),
      h > 0 && i.currentTranslate > n.minTranslate()
        ? ((m = !1),
          r.resistance &&
            (i.currentTranslate =
              n.minTranslate() -
              1 +
              (-n.minTranslate() + i.startTranslate + h) ** g))
        : h < 0 &&
          i.currentTranslate < n.maxTranslate() &&
          ((m = !1),
          r.resistance &&
            (i.currentTranslate =
              n.maxTranslate() +
              1 -
              (n.maxTranslate() - i.startTranslate - h) ** g)),
      m && (l.preventedByNestedSwiper = !0),
      !n.allowSlideNext &&
        "next" === n.swipeDirection &&
        i.currentTranslate < i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      !n.allowSlidePrev &&
        "prev" === n.swipeDirection &&
        i.currentTranslate > i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      n.allowSlidePrev ||
        n.allowSlideNext ||
        (i.currentTranslate = i.startTranslate),
      r.threshold > 0)
    ) {
      if (!(Math.abs(h) > r.threshold || i.allowThresholdMove))
        return void (i.currentTranslate = i.startTranslate);
      if (!i.allowThresholdMove)
        return (
          (i.allowThresholdMove = !0),
          (s.startX = s.currentX),
          (s.startY = s.currentY),
          (i.currentTranslate = i.startTranslate),
          void (s.diff = n.isHorizontal()
            ? s.currentX - s.startX
            : s.currentY - s.startY)
        );
    }
    r.followFinger &&
      !r.cssMode &&
      (((r.freeMode && r.freeMode.enabled && n.freeMode) ||
        r.watchSlidesProgress) &&
        (n.updateActiveIndex(), n.updateSlidesClasses()),
      n.params.freeMode &&
        r.freeMode.enabled &&
        n.freeMode &&
        n.freeMode.onTouchMove(),
      n.updateProgress(i.currentTranslate),
      n.setTranslate(i.currentTranslate));
  }
  function Kt(e) {
    const t = this,
      n = t.touchEventsData,
      { params: i, touches: r, rtlTranslate: s, slidesGrid: o, enabled: a } = t;
    if (!a) return;
    let l = e;
    if (
      (l.originalEvent && (l = l.originalEvent),
      n.allowTouchCallbacks && t.emit("touchEnd", l),
      (n.allowTouchCallbacks = !1),
      !n.isTouched)
    )
      return (
        n.isMoved && i.grabCursor && t.setGrabCursor(!1),
        (n.isMoved = !1),
        void (n.startMoving = !1)
      );
    i.grabCursor &&
      n.isMoved &&
      n.isTouched &&
      (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
      t.setGrabCursor(!1);
    const c = Pt(),
      d = c - n.touchStartTime;
    if (t.allowClick) {
      const e = l.path || (l.composedPath && l.composedPath());
      t.updateClickedSlide((e && e[0]) || l.target),
        t.emit("tap click", l),
        d < 300 &&
          c - n.lastClickTime < 300 &&
          t.emit("doubleTap doubleClick", l);
    }
    if (
      ((n.lastClickTime = Pt()),
      Mt(() => {
        t.destroyed || (t.allowClick = !0);
      }),
      !n.isTouched ||
        !n.isMoved ||
        !t.swipeDirection ||
        0 === r.diff ||
        n.currentTranslate === n.startTranslate)
    )
      return (n.isTouched = !1), (n.isMoved = !1), void (n.startMoving = !1);
    let p;
    if (
      ((n.isTouched = !1),
      (n.isMoved = !1),
      (n.startMoving = !1),
      (p = i.followFinger
        ? s
          ? t.translate
          : -t.translate
        : -n.currentTranslate),
      i.cssMode)
    )
      return;
    if (t.params.freeMode && i.freeMode.enabled)
      return void t.freeMode.onTouchEnd({ currentPos: p });
    let u = 0,
      f = t.slidesSizesGrid[0];
    for (
      let e = 0;
      e < o.length;
      e += e < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup
    ) {
      const t = e < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
      void 0 !== o[e + t]
        ? p >= o[e] && p < o[e + t] && ((u = e), (f = o[e + t] - o[e]))
        : p >= o[e] && ((u = e), (f = o[o.length - 1] - o[o.length - 2]));
    }
    const h = (p - o[u]) / f,
      m = u < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
    if (d > i.longSwipesMs) {
      if (!i.longSwipes) return void t.slideTo(t.activeIndex);
      "next" === t.swipeDirection &&
        (h >= i.longSwipesRatio ? t.slideTo(u + m) : t.slideTo(u)),
        "prev" === t.swipeDirection &&
          (h > 1 - i.longSwipesRatio ? t.slideTo(u + m) : t.slideTo(u));
    } else {
      if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
      t.navigation &&
      (l.target === t.navigation.nextEl || l.target === t.navigation.prevEl)
        ? l.target === t.navigation.nextEl
          ? t.slideTo(u + m)
          : t.slideTo(u)
        : ("next" === t.swipeDirection && t.slideTo(u + m),
          "prev" === t.swipeDirection && t.slideTo(u));
    }
  }
  function Zt() {
    const e = this,
      { params: t, el: n } = e;
    if (n && 0 === n.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: i, allowSlidePrev: r, snapGrid: s } = e;
    (e.allowSlideNext = !0),
      (e.allowSlidePrev = !0),
      e.updateSize(),
      e.updateSlides(),
      e.updateSlidesClasses(),
      ("auto" === t.slidesPerView || t.slidesPerView > 1) &&
      e.isEnd &&
      !e.isBeginning &&
      !e.params.centeredSlides
        ? e.slideTo(e.slides.length - 1, 0, !1, !0)
        : e.slideTo(e.activeIndex, 0, !1, !0),
      e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(),
      (e.allowSlidePrev = r),
      (e.allowSlideNext = i),
      e.params.watchOverflow && s !== e.snapGrid && e.checkOverflow();
  }
  function Jt(e) {
    const t = this;
    t.enabled &&
      (t.allowClick ||
        (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation &&
          t.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function en() {
    const e = this,
      { wrapperEl: t, rtlTranslate: n, enabled: i } = e;
    if (!i) return;
    let r;
    (e.previousTranslate = e.translate),
      e.isHorizontal()
        ? (e.translate = -t.scrollLeft)
        : (e.translate = -t.scrollTop),
      -0 === e.translate && (e.translate = 0),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
    const s = e.maxTranslate() - e.minTranslate();
    (r = 0 === s ? 0 : (e.translate - e.minTranslate()) / s),
      r !== e.progress && e.updateProgress(n ? -e.translate : e.translate),
      e.emit("setTranslate", e.translate, !1);
  }
  let tn = !1;
  function nn() {}
  const rn = (e, t) => {
    const n = bt(),
      {
        params: i,
        touchEvents: r,
        el: s,
        wrapperEl: o,
        device: a,
        support: l,
      } = e,
      c = !!i.nested,
      d = "on" === t ? "addEventListener" : "removeEventListener",
      p = t;
    if (l.touch) {
      const t = !(
        "touchstart" !== r.start ||
        !l.passiveListener ||
        !i.passiveListeners
      ) && { passive: !0, capture: !1 };
      s[d](r.start, e.onTouchStart, t),
        s[d](
          r.move,
          e.onTouchMove,
          l.passiveListener ? { passive: !1, capture: c } : c
        ),
        s[d](r.end, e.onTouchEnd, t),
        r.cancel && s[d](r.cancel, e.onTouchEnd, t);
    } else
      s[d](r.start, e.onTouchStart, !1),
        n[d](r.move, e.onTouchMove, c),
        n[d](r.end, e.onTouchEnd, !1);
    (i.preventClicks || i.preventClicksPropagation) &&
      s[d]("click", e.onClick, !0),
      i.cssMode && o[d]("scroll", e.onScroll),
      i.updateOnWindowResize
        ? e[p](
            a.ios || a.android
              ? "resize orientationchange observerUpdate"
              : "resize observerUpdate",
            Zt,
            !0
          )
        : e[p]("observerUpdate", Zt, !0);
  };
  const sn = {
      attachEvents: function () {
        const e = this,
          t = bt(),
          { params: n, support: i } = e;
        (e.onTouchStart = Ut.bind(e)),
          (e.onTouchMove = Qt.bind(e)),
          (e.onTouchEnd = Kt.bind(e)),
          n.cssMode && (e.onScroll = en.bind(e)),
          (e.onClick = Jt.bind(e)),
          i.touch && !tn && (t.addEventListener("touchstart", nn), (tn = !0)),
          rn(e, "on");
      },
      detachEvents: function () {
        rn(this, "off");
      },
    },
    on = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  const an = {
    setBreakpoint: function () {
      const e = this,
        {
          activeIndex: t,
          initialized: n,
          loopedSlides: i = 0,
          params: r,
          $el: s,
        } = e,
        o = r.breakpoints;
      if (!o || (o && 0 === Object.keys(o).length)) return;
      const a = e.getBreakpoint(o, e.params.breakpointsBase, e.el);
      if (!a || e.currentBreakpoint === a) return;
      const l = (a in o ? o[a] : void 0) || e.originalParams,
        c = on(e, r),
        d = on(e, l),
        p = r.enabled;
      c && !d
        ? (s.removeClass(
            `${r.containerModifierClass}grid ${r.containerModifierClass}grid-column`
          ),
          e.emitContainerClasses())
        : !c &&
          d &&
          (s.addClass(`${r.containerModifierClass}grid`),
          ((l.grid.fill && "column" === l.grid.fill) ||
            (!l.grid.fill && "column" === r.grid.fill)) &&
            s.addClass(`${r.containerModifierClass}grid-column`),
          e.emitContainerClasses());
      const u = l.direction && l.direction !== r.direction,
        f = r.loop && (l.slidesPerView !== r.slidesPerView || u);
      u && n && e.changeDirection(), Dt(e.params, l);
      const h = e.params.enabled;
      Object.assign(e, {
        allowTouchMove: e.params.allowTouchMove,
        allowSlideNext: e.params.allowSlideNext,
        allowSlidePrev: e.params.allowSlidePrev,
      }),
        p && !h ? e.disable() : !p && h && e.enable(),
        (e.currentBreakpoint = a),
        e.emit("_beforeBreakpoint", l),
        f &&
          n &&
          (e.loopDestroy(),
          e.loopCreate(),
          e.updateSlides(),
          e.slideTo(t - i + e.loopedSlides, 0, !1)),
        e.emit("breakpoint", l);
    },
    getBreakpoint: function (e, t = "window", n) {
      if (!e || ("container" === t && !n)) return;
      let i = !1;
      const r = Et(),
        s = "window" === t ? r.innerHeight : n.clientHeight,
        o = Object.keys(e).map((e) => {
          if ("string" == typeof e && 0 === e.indexOf("@")) {
            const t = parseFloat(e.substr(1));
            return { value: s * t, point: e };
          }
          return { value: e, point: e };
        });
      o.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
      for (let e = 0; e < o.length; e += 1) {
        const { point: s, value: a } = o[e];
        "window" === t
          ? r.matchMedia(`(min-width: ${a}px)`).matches && (i = s)
          : a <= n.clientWidth && (i = s);
      }
      return i || "max";
    },
  };
  const ln = {
    addClasses: function () {
      const e = this,
        { classNames: t, params: n, rtl: i, $el: r, device: s, support: o } = e,
        a = (function (e, t) {
          const n = [];
          return (
            e.forEach((e) => {
              "object" == typeof e
                ? Object.keys(e).forEach((i) => {
                    e[i] && n.push(t + i);
                  })
                : "string" == typeof e && n.push(t + e);
            }),
            n
          );
        })(
          [
            "initialized",
            n.direction,
            { "pointer-events": !o.touch },
            { "free-mode": e.params.freeMode && n.freeMode.enabled },
            { autoheight: n.autoHeight },
            { rtl: i },
            { grid: n.grid && n.grid.rows > 1 },
            {
              "grid-column":
                n.grid && n.grid.rows > 1 && "column" === n.grid.fill,
            },
            { android: s.android },
            { ios: s.ios },
            { "css-mode": n.cssMode },
            { centered: n.cssMode && n.centeredSlides },
          ],
          n.containerModifierClass
        );
      t.push(...a), r.addClass([...t].join(" ")), e.emitContainerClasses();
    },
    removeClasses: function () {
      const { $el: e, classNames: t } = this;
      e.removeClass(t.join(" ")), this.emitContainerClasses();
    },
  };
  const cn = {
    loadImage: function (e, t, n, i, r, s) {
      const o = Et();
      let a;
      function l() {
        s && s();
      }
      kt(e).parent("picture")[0] || (e.complete && r)
        ? l()
        : t
        ? ((a = new o.Image()),
          (a.onload = l),
          (a.onerror = l),
          i && (a.sizes = i),
          n && (a.srcset = n),
          t && (a.src = t))
        : l();
    },
    preloadImages: function () {
      const e = this;
      function t() {
        null != e &&
          e &&
          !e.destroyed &&
          (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
          e.imagesLoaded === e.imagesToLoad.length &&
            (e.params.updateOnImagesReady && e.update(),
            e.emit("imagesReady")));
      }
      e.imagesToLoad = e.$el.find("img");
      for (let n = 0; n < e.imagesToLoad.length; n += 1) {
        const i = e.imagesToLoad[n];
        e.loadImage(
          i,
          i.currentSrc || i.getAttribute("src"),
          i.srcset || i.getAttribute("srcset"),
          i.sizes || i.getAttribute("sizes"),
          !0,
          t
        );
      }
    },
  };
  const dn = {
    init: !0,
    direction: "horizontal",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 0,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    preloadImages: !0,
    updateOnImagesReady: !0,
    loop: !1,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    loopFillGroupWithBlank: !1,
    loopPreventsSlide: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-invisible-blank",
    slideActiveClass: "swiper-slide-active",
    slideDuplicateActiveClass: "swiper-slide-duplicate-active",
    slideVisibleClass: "swiper-slide-visible",
    slideDuplicateClass: "swiper-slide-duplicate",
    slideNextClass: "swiper-slide-next",
    slideDuplicateNextClass: "swiper-slide-duplicate-next",
    slidePrevClass: "swiper-slide-prev",
    slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
    wrapperClass: "swiper-wrapper",
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
  function pn(e, t) {
    return function (n = {}) {
      const i = Object.keys(n)[0],
        r = n[i];
      "object" == typeof r && null !== r
        ? (["navigation", "pagination", "scrollbar"].indexOf(i) >= 0 &&
            !0 === e[i] &&
            (e[i] = { auto: !0 }),
          i in e && "enabled" in r
            ? (!0 === e[i] && (e[i] = { enabled: !0 }),
              "object" != typeof e[i] ||
                "enabled" in e[i] ||
                (e[i].enabled = !0),
              e[i] || (e[i] = { enabled: !1 }),
              Dt(t, n))
            : Dt(t, n))
        : Dt(t, n);
    };
  }
  const un = {
      eventsEmitter: Gt,
      update: Vt,
      translate: Rt,
      transition: {
        setTransition: function (e, t) {
          const n = this;
          n.params.cssMode || n.$wrapperEl.transition(e),
            n.emit("setTransition", e, t);
        },
        transitionStart: function (e = !0, t) {
          const n = this,
            { params: i } = n;
          i.cssMode ||
            (i.autoHeight && n.updateAutoHeight(),
            Ft({ swiper: n, runCallbacks: e, direction: t, step: "Start" }));
        },
        transitionEnd: function (e = !0, t) {
          const n = this,
            { params: i } = n;
          (n.animating = !1),
            i.cssMode ||
              (n.setTransition(0),
              Ft({ swiper: n, runCallbacks: e, direction: t, step: "End" }));
        },
      },
      slide: Xt,
      loop: Yt,
      grabCursor: {
        setGrabCursor: function (e) {
          const t = this;
          if (
            t.support.touch ||
            !t.params.simulateTouch ||
            (t.params.watchOverflow && t.isLocked) ||
            t.params.cssMode
          )
            return;
          const n =
            "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          (n.style.cursor = "move"),
            (n.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab"),
            (n.style.cursor = e ? "-moz-grabbin" : "-moz-grab"),
            (n.style.cursor = e ? "grabbing" : "grab");
        },
        unsetGrabCursor: function () {
          const e = this;
          e.support.touch ||
            (e.params.watchOverflow && e.isLocked) ||
            e.params.cssMode ||
            (e[
              "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
            ].style.cursor = "");
        },
      },
      events: sn,
      breakpoints: an,
      checkOverflow: {
        checkOverflow: function () {
          const e = this,
            { isLocked: t, params: n } = e,
            { slidesOffsetBefore: i } = n;
          if (i) {
            const t = e.slides.length - 1,
              n = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
            e.isLocked = e.size > n;
          } else e.isLocked = 1 === e.snapGrid.length;
          !0 === n.allowSlideNext && (e.allowSlideNext = !e.isLocked),
            !0 === n.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
            t && t !== e.isLocked && (e.isEnd = !1),
            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
        },
      },
      classes: ln,
      images: cn,
    },
    fn = {};
  class hn {
    constructor(...e) {
      let t, n;
      if (
        (1 === e.length &&
        e[0].constructor &&
        "Object" === Object.prototype.toString.call(e[0]).slice(8, -1)
          ? (n = e[0])
          : ([t, n] = e),
        n || (n = {}),
        (n = Dt({}, n)),
        t && !n.el && (n.el = t),
        n.el && kt(n.el).length > 1)
      ) {
        const e = [];
        return (
          kt(n.el).each((t) => {
            const i = Dt({}, n, { el: t });
            e.push(new hn(i));
          }),
          e
        );
      }
      const i = this;
      (i.__swiper__ = !0),
        (i.support = Wt()),
        (i.device = qt({ userAgent: n.userAgent })),
        (i.browser = Ht()),
        (i.eventsListeners = {}),
        (i.eventsAnyListeners = []),
        (i.modules = [...i.__modules__]),
        n.modules && Array.isArray(n.modules) && i.modules.push(...n.modules);
      const r = {};
      i.modules.forEach((e) => {
        e({
          swiper: i,
          extendParams: pn(n, r),
          on: i.on.bind(i),
          once: i.once.bind(i),
          off: i.off.bind(i),
          emit: i.emit.bind(i),
        });
      });
      const s = Dt({}, dn, r);
      return (
        (i.params = Dt({}, s, fn, n)),
        (i.originalParams = Dt({}, i.params)),
        (i.passedParams = Dt({}, n)),
        i.params &&
          i.params.on &&
          Object.keys(i.params.on).forEach((e) => {
            i.on(e, i.params.on[e]);
          }),
        i.params && i.params.onAny && i.onAny(i.params.onAny),
        (i.$ = kt),
        Object.assign(i, {
          enabled: i.params.enabled,
          el: t,
          classNames: [],
          slides: kt(),
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => "horizontal" === i.params.direction,
          isVertical: () => "vertical" === i.params.direction,
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          allowSlideNext: i.params.allowSlideNext,
          allowSlidePrev: i.params.allowSlidePrev,
          touchEvents: (function () {
            const e = ["touchstart", "touchmove", "touchend", "touchcancel"],
              t = ["pointerdown", "pointermove", "pointerup"];
            return (
              (i.touchEventsTouch = {
                start: e[0],
                move: e[1],
                end: e[2],
                cancel: e[3],
              }),
              (i.touchEventsDesktop = { start: t[0], move: t[1], end: t[2] }),
              i.support.touch || !i.params.simulateTouch
                ? i.touchEventsTouch
                : i.touchEventsDesktop
            );
          })(),
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: i.params.focusableElements,
            lastClickTime: Pt(),
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            isTouchEvent: void 0,
            startMoving: void 0,
          },
          allowClick: !0,
          allowTouchMove: i.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0,
        }),
        i.emit("_swiper"),
        i.params.init && i.init(),
        i
      );
    }
    enable() {
      const e = this;
      e.enabled ||
        ((e.enabled = !0),
        e.params.grabCursor && e.setGrabCursor(),
        e.emit("enable"));
    }
    disable() {
      const e = this;
      e.enabled &&
        ((e.enabled = !1),
        e.params.grabCursor && e.unsetGrabCursor(),
        e.emit("disable"));
    }
    setProgress(e, t) {
      const n = this;
      e = Math.min(Math.max(e, 0), 1);
      const i = n.minTranslate(),
        r = (n.maxTranslate() - i) * e + i;
      n.translateTo(r, void 0 === t ? 0 : t),
        n.updateActiveIndex(),
        n.updateSlidesClasses();
    }
    emitContainerClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = e.el.className
        .split(" ")
        .filter(
          (t) =>
            0 === t.indexOf("swiper") ||
            0 === t.indexOf(e.params.containerModifierClass)
        );
      e.emit("_containerClasses", t.join(" "));
    }
    getSlideClasses(e) {
      const t = this;
      return e.className
        .split(" ")
        .filter(
          (e) =>
            0 === e.indexOf("swiper-slide") ||
            0 === e.indexOf(t.params.slideClass)
        )
        .join(" ");
    }
    emitSlidesClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = [];
      e.slides.each((n) => {
        const i = e.getSlideClasses(n);
        t.push({ slideEl: n, classNames: i }), e.emit("_slideClass", n, i);
      }),
        e.emit("_slideClasses", t);
    }
    slidesPerViewDynamic(e = "current", t = !1) {
      const {
        params: n,
        slides: i,
        slidesGrid: r,
        slidesSizesGrid: s,
        size: o,
        activeIndex: a,
      } = this;
      let l = 1;
      if (n.centeredSlides) {
        let e,
          t = i[a].swiperSlideSize;
        for (let n = a + 1; n < i.length; n += 1)
          i[n] &&
            !e &&
            ((t += i[n].swiperSlideSize), (l += 1), t > o && (e = !0));
        for (let n = a - 1; n >= 0; n -= 1)
          i[n] &&
            !e &&
            ((t += i[n].swiperSlideSize), (l += 1), t > o && (e = !0));
      } else if ("current" === e)
        for (let e = a + 1; e < i.length; e += 1) {
          (t ? r[e] + s[e] - r[a] < o : r[e] - r[a] < o) && (l += 1);
        }
      else
        for (let e = a - 1; e >= 0; e -= 1) {
          r[a] - r[e] < o && (l += 1);
        }
      return l;
    }
    update() {
      const e = this;
      if (!e || e.destroyed) return;
      const { snapGrid: t, params: n } = e;
      function i() {
        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
          n = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(n), e.updateActiveIndex(), e.updateSlidesClasses();
      }
      let r;
      n.breakpoints && e.setBreakpoint(),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        e.params.freeMode && e.params.freeMode.enabled
          ? (i(), e.params.autoHeight && e.updateAutoHeight())
          : ((r =
              ("auto" === e.params.slidesPerView ||
                e.params.slidesPerView > 1) &&
              e.isEnd &&
              !e.params.centeredSlides
                ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                : e.slideTo(e.activeIndex, 0, !1, !0)),
            r || i()),
        n.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit("update");
    }
    changeDirection(e, t = !0) {
      const n = this,
        i = n.params.direction;
      return (
        e || (e = "horizontal" === i ? "vertical" : "horizontal"),
        e === i ||
          ("horizontal" !== e && "vertical" !== e) ||
          (n.$el
            .removeClass(`${n.params.containerModifierClass}${i}`)
            .addClass(`${n.params.containerModifierClass}${e}`),
          n.emitContainerClasses(),
          (n.params.direction = e),
          n.slides.each((t) => {
            "vertical" === e ? (t.style.width = "") : (t.style.height = "");
          }),
          n.emit("changeDirection"),
          t && n.update()),
        n
      );
    }
    mount(e) {
      const t = this;
      if (t.mounted) return !0;
      const n = kt(e || t.params.el);
      if (!(e = n[0])) return !1;
      e.swiper = t;
      const i = () =>
        `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
      let r = (() => {
        if (e && e.shadowRoot && e.shadowRoot.querySelector) {
          const t = kt(e.shadowRoot.querySelector(i()));
          return (t.children = (e) => n.children(e)), t;
        }
        return n.children(i());
      })();
      if (0 === r.length && t.params.createElements) {
        const e = bt().createElement("div");
        (r = kt(e)),
          (e.className = t.params.wrapperClass),
          n.append(e),
          n.children(`.${t.params.slideClass}`).each((e) => {
            r.append(e);
          });
      }
      return (
        Object.assign(t, {
          $el: n,
          el: e,
          $wrapperEl: r,
          wrapperEl: r[0],
          mounted: !0,
          rtl: "rtl" === e.dir.toLowerCase() || "rtl" === n.css("direction"),
          rtlTranslate:
            "horizontal" === t.params.direction &&
            ("rtl" === e.dir.toLowerCase() || "rtl" === n.css("direction")),
          wrongRTL: "-webkit-box" === r.css("display"),
        }),
        !0
      );
    }
    init(e) {
      const t = this;
      if (t.initialized) return t;
      return (
        !1 === t.mount(e) ||
          (t.emit("beforeInit"),
          t.params.breakpoints && t.setBreakpoint(),
          t.addClasses(),
          t.params.loop && t.loopCreate(),
          t.updateSize(),
          t.updateSlides(),
          t.params.watchOverflow && t.checkOverflow(),
          t.params.grabCursor && t.enabled && t.setGrabCursor(),
          t.params.preloadImages && t.preloadImages(),
          t.params.loop
            ? t.slideTo(
                t.params.initialSlide + t.loopedSlides,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              )
            : t.slideTo(
                t.params.initialSlide,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              ),
          t.attachEvents(),
          (t.initialized = !0),
          t.emit("init"),
          t.emit("afterInit")),
        t
      );
    }
    destroy(e = !0, t = !0) {
      const n = this,
        { params: i, $el: r, $wrapperEl: s, slides: o } = n;
      return (
        void 0 === n.params ||
          n.destroyed ||
          (n.emit("beforeDestroy"),
          (n.initialized = !1),
          n.detachEvents(),
          i.loop && n.loopDestroy(),
          t &&
            (n.removeClasses(),
            r.removeAttr("style"),
            s.removeAttr("style"),
            o &&
              o.length &&
              o
                .removeClass(
                  [
                    i.slideVisibleClass,
                    i.slideActiveClass,
                    i.slideNextClass,
                    i.slidePrevClass,
                  ].join(" ")
                )
                .removeAttr("style")
                .removeAttr("data-swiper-slide-index")),
          n.emit("destroy"),
          Object.keys(n.eventsListeners).forEach((e) => {
            n.off(e);
          }),
          !1 !== e &&
            ((n.$el[0].swiper = null),
            (function (e) {
              const t = e;
              Object.keys(t).forEach((e) => {
                try {
                  t[e] = null;
                } catch (e) {}
                try {
                  delete t[e];
                } catch (e) {}
              });
            })(n)),
          (n.destroyed = !0)),
        null
      );
    }
    static extendDefaults(e) {
      Dt(fn, e);
    }
    static get extendedDefaults() {
      return fn;
    }
    static get defaults() {
      return dn;
    }
    static installModule(e) {
      hn.prototype.__modules__ || (hn.prototype.__modules__ = []);
      const t = hn.prototype.__modules__;
      "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
    }
    static use(e) {
      return Array.isArray(e)
        ? (e.forEach((e) => hn.installModule(e)), hn)
        : (hn.installModule(e), hn);
    }
  }
  Object.keys(un).forEach((e) => {
    Object.keys(un[e]).forEach((t) => {
      hn.prototype[t] = un[e][t];
    });
  }),
    hn.use([
      function ({ swiper: e, on: t, emit: n }) {
        const i = Et();
        let r = null;
        const s = () => {
            e &&
              !e.destroyed &&
              e.initialized &&
              (n("beforeResize"), n("resize"));
          },
          o = () => {
            e && !e.destroyed && e.initialized && n("orientationchange");
          };
        t("init", () => {
          e.params.resizeObserver && void 0 !== i.ResizeObserver
            ? e &&
              !e.destroyed &&
              e.initialized &&
              ((r = new ResizeObserver((t) => {
                const { width: n, height: i } = e;
                let r = n,
                  o = i;
                t.forEach(
                  ({ contentBoxSize: t, contentRect: n, target: i }) => {
                    (i && i !== e.el) ||
                      ((r = n ? n.width : (t[0] || t).inlineSize),
                      (o = n ? n.height : (t[0] || t).blockSize));
                  }
                ),
                  (r === n && o === i) || s();
              })),
              r.observe(e.el))
            : (i.addEventListener("resize", s),
              i.addEventListener("orientationchange", o));
        }),
          t("destroy", () => {
            r && r.unobserve && e.el && (r.unobserve(e.el), (r = null)),
              i.removeEventListener("resize", s),
              i.removeEventListener("orientationchange", o);
          });
      },
      function ({ swiper: e, extendParams: t, on: n, emit: i }) {
        const r = [],
          s = Et(),
          o = (e, t = {}) => {
            const n = new (s.MutationObserver || s.WebkitMutationObserver)(
              (e) => {
                if (1 === e.length) return void i("observerUpdate", e[0]);
                const t = function () {
                  i("observerUpdate", e[0]);
                };
                s.requestAnimationFrame
                  ? s.requestAnimationFrame(t)
                  : s.setTimeout(t, 0);
              }
            );
            n.observe(e, {
              attributes: void 0 === t.attributes || t.attributes,
              childList: void 0 === t.childList || t.childList,
              characterData: void 0 === t.characterData || t.characterData,
            }),
              r.push(n);
          };
        t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
          n("init", () => {
            if (e.params.observer) {
              if (e.params.observeParents) {
                const t = e.$el.parents();
                for (let e = 0; e < t.length; e += 1) o(t[e]);
              }
              o(e.$el[0], { childList: e.params.observeSlideChildren }),
                o(e.$wrapperEl[0], { attributes: !1 });
            }
          }),
          n("destroy", () => {
            r.forEach((e) => {
              e.disconnect();
            }),
              r.splice(0, r.length);
          });
      },
    ]);
  const mn = hn;
  function gn({ swiper: e, extendParams: t, on: n, emit: i }) {
    function r(t) {
      let n;
      return (
        t &&
          ((n = kt(t)),
          e.params.uniqueNavElements &&
            "string" == typeof t &&
            n.length > 1 &&
            1 === e.$el.find(t).length &&
            (n = e.$el.find(t))),
        n
      );
    }
    function s(t, n) {
      const i = e.params.navigation;
      t &&
        t.length > 0 &&
        (t[n ? "addClass" : "removeClass"](i.disabledClass),
        t[0] && "BUTTON" === t[0].tagName && (t[0].disabled = n),
        e.params.watchOverflow &&
          e.enabled &&
          t[e.isLocked ? "addClass" : "removeClass"](i.lockClass));
    }
    function o() {
      if (e.params.loop) return;
      const { $nextEl: t, $prevEl: n } = e.navigation;
      s(n, e.isBeginning && !e.params.rewind),
        s(t, e.isEnd && !e.params.rewind);
    }
    function a(t) {
      t.preventDefault(),
        (!e.isBeginning || e.params.loop || e.params.rewind) && e.slidePrev();
    }
    function l(t) {
      t.preventDefault(),
        (!e.isEnd || e.params.loop || e.params.rewind) && e.slideNext();
    }
    function c() {
      const t = e.params.navigation;
      if (
        ((e.params.navigation = (function (e, t, n, i) {
          const r = bt();
          return (
            e.params.createElements &&
              Object.keys(i).forEach((s) => {
                if (!n[s] && !0 === n.auto) {
                  let o = e.$el.children(`.${i[s]}`)[0];
                  o ||
                    ((o = r.createElement("div")),
                    (o.className = i[s]),
                    e.$el.append(o)),
                    (n[s] = o),
                    (t[s] = o);
                }
              }),
            n
          );
        })(e, e.originalParams.navigation, e.params.navigation, {
          nextEl: "swiper-button-next",
          prevEl: "swiper-button-prev",
        })),
        !t.nextEl && !t.prevEl)
      )
        return;
      const n = r(t.nextEl),
        i = r(t.prevEl);
      n && n.length > 0 && n.on("click", l),
        i && i.length > 0 && i.on("click", a),
        Object.assign(e.navigation, {
          $nextEl: n,
          nextEl: n && n[0],
          $prevEl: i,
          prevEl: i && i[0],
        }),
        e.enabled ||
          (n && n.addClass(t.lockClass), i && i.addClass(t.lockClass));
    }
    function d() {
      const { $nextEl: t, $prevEl: n } = e.navigation;
      t &&
        t.length &&
        (t.off("click", l), t.removeClass(e.params.navigation.disabledClass)),
        n &&
          n.length &&
          (n.off("click", a), n.removeClass(e.params.navigation.disabledClass));
    }
    t({
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: !1,
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-hidden",
        lockClass: "swiper-button-lock",
      },
    }),
      (e.navigation = {
        nextEl: null,
        $nextEl: null,
        prevEl: null,
        $prevEl: null,
      }),
      n("init", () => {
        c(), o();
      }),
      n("toEdge fromEdge lock unlock", () => {
        o();
      }),
      n("destroy", () => {
        d();
      }),
      n("enable disable", () => {
        const { $nextEl: t, $prevEl: n } = e.navigation;
        t &&
          t[e.enabled ? "removeClass" : "addClass"](
            e.params.navigation.lockClass
          ),
          n &&
            n[e.enabled ? "removeClass" : "addClass"](
              e.params.navigation.lockClass
            );
      }),
      n("click", (t, n) => {
        const { $nextEl: r, $prevEl: s } = e.navigation,
          o = n.target;
        if (e.params.navigation.hideOnClick && !kt(o).is(s) && !kt(o).is(r)) {
          if (
            e.pagination &&
            e.params.pagination &&
            e.params.pagination.clickable &&
            (e.pagination.el === o || e.pagination.el.contains(o))
          )
            return;
          let t;
          r
            ? (t = r.hasClass(e.params.navigation.hiddenClass))
            : s && (t = s.hasClass(e.params.navigation.hiddenClass)),
            i(!0 === t ? "navigationShow" : "navigationHide"),
            r && r.toggleClass(e.params.navigation.hiddenClass),
            s && s.toggleClass(e.params.navigation.hiddenClass);
        }
      }),
      Object.assign(e.navigation, { update: o, init: c, destroy: d });
  }
  function vn({ swiper: e, extendParams: t, on: n, emit: i }) {
    let r;
    function s() {
      const t = e.slides.eq(e.activeIndex);
      let n = e.params.autoplay.delay;
      t.attr("data-swiper-autoplay") &&
        (n = t.attr("data-swiper-autoplay") || e.params.autoplay.delay),
        clearTimeout(r),
        (r = Mt(() => {
          let t;
          e.params.autoplay.reverseDirection
            ? e.params.loop
              ? (e.loopFix(),
                (t = e.slidePrev(e.params.speed, !0, !0)),
                i("autoplay"))
              : e.isBeginning
              ? e.params.autoplay.stopOnLastSlide
                ? a()
                : ((t = e.slideTo(e.slides.length - 1, e.params.speed, !0, !0)),
                  i("autoplay"))
              : ((t = e.slidePrev(e.params.speed, !0, !0)), i("autoplay"))
            : e.params.loop
            ? (e.loopFix(),
              (t = e.slideNext(e.params.speed, !0, !0)),
              i("autoplay"))
            : e.isEnd
            ? e.params.autoplay.stopOnLastSlide
              ? a()
              : ((t = e.slideTo(0, e.params.speed, !0, !0)), i("autoplay"))
            : ((t = e.slideNext(e.params.speed, !0, !0)), i("autoplay")),
            ((e.params.cssMode && e.autoplay.running) || !1 === t) && s();
        }, n));
    }
    function o() {
      return (
        void 0 === r &&
        !e.autoplay.running &&
        ((e.autoplay.running = !0), i("autoplayStart"), s(), !0)
      );
    }
    function a() {
      return (
        !!e.autoplay.running &&
        void 0 !== r &&
        (r && (clearTimeout(r), (r = void 0)),
        (e.autoplay.running = !1),
        i("autoplayStop"),
        !0)
      );
    }
    function l(t) {
      e.autoplay.running &&
        (e.autoplay.paused ||
          (r && clearTimeout(r),
          (e.autoplay.paused = !0),
          0 !== t && e.params.autoplay.waitForTransition
            ? ["transitionend", "webkitTransitionEnd"].forEach((t) => {
                e.$wrapperEl[0].addEventListener(t, d);
              })
            : ((e.autoplay.paused = !1), s())));
    }
    function c() {
      const t = bt();
      "hidden" === t.visibilityState && e.autoplay.running && l(),
        "visible" === t.visibilityState &&
          e.autoplay.paused &&
          (s(), (e.autoplay.paused = !1));
    }
    function d(t) {
      e &&
        !e.destroyed &&
        e.$wrapperEl &&
        t.target === e.$wrapperEl[0] &&
        (["transitionend", "webkitTransitionEnd"].forEach((t) => {
          e.$wrapperEl[0].removeEventListener(t, d);
        }),
        (e.autoplay.paused = !1),
        e.autoplay.running ? s() : a());
    }
    function p() {
      e.params.autoplay.disableOnInteraction ? a() : l(),
        ["transitionend", "webkitTransitionEnd"].forEach((t) => {
          e.$wrapperEl[0].removeEventListener(t, d);
        });
    }
    function u() {
      e.params.autoplay.disableOnInteraction || ((e.autoplay.paused = !1), s());
    }
    (e.autoplay = { running: !1, paused: !1 }),
      t({
        autoplay: {
          enabled: !1,
          delay: 3e3,
          waitForTransition: !0,
          disableOnInteraction: !0,
          stopOnLastSlide: !1,
          reverseDirection: !1,
          pauseOnMouseEnter: !1,
        },
      }),
      n("init", () => {
        if (e.params.autoplay.enabled) {
          o();
          bt().addEventListener("visibilitychange", c),
            e.params.autoplay.pauseOnMouseEnter &&
              (e.$el.on("mouseenter", p), e.$el.on("mouseleave", u));
        }
      }),
      n("beforeTransitionStart", (t, n, i) => {
        e.autoplay.running &&
          (i || !e.params.autoplay.disableOnInteraction
            ? e.autoplay.pause(n)
            : a());
      }),
      n("sliderFirstMove", () => {
        e.autoplay.running &&
          (e.params.autoplay.disableOnInteraction ? a() : l());
      }),
      n("touchEnd", () => {
        e.params.cssMode &&
          e.autoplay.paused &&
          !e.params.autoplay.disableOnInteraction &&
          s();
      }),
      n("destroy", () => {
        e.$el.off("mouseenter", p),
          e.$el.off("mouseleave", u),
          e.autoplay.running && a();
        bt().removeEventListener("visibilitychange", c);
      }),
      Object.assign(e.autoplay, { pause: l, run: s, start: o, stop: a });
  }
  function yn() {
    let e = document.querySelectorAll(
      '[class*="__swiper"]:not(.swiper-wrapper)'
    );
    e &&
      e.forEach((e) => {
        e.parentElement.classList.add("swiper"),
          e.classList.add("swiper-wrapper");
        for (const t of e.children) t.classList.add("swiper-slide");
      });
  }
  window.addEventListener("load", function (e) {
    yn(),
      document.querySelector(".collection") &&
        new mn(".collection__slider", {
          modules: [gn, vn],
          autoplay: { delay: 3e3, disableOnInteraction: !1 },
          observer: !0,
          observeParents: !0,
          slidesPerView: 3,
          watchOverflow: !0,
          spaceBetween: 24,
          autoHeight: !0,
          speed: 800,
          simulateTouch: !0,
          loop: !0,
          navigation: {
            nextEl: ".collection__control-arrow_next",
            prevEl: ".collection__control-arrow_prev",
          },
          breakpoints: {
            320: { slidesPerView: 1.5, spaceBetween: 10, centeredSlides: !0 },
            480: { slidesPerView: 2.2, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            992: { slidesPerView: 2, spaceBetween: 16 },
            1268: { slidesPerView: 3, spaceBetween: 24 },
          },
          on: {},
        });
  });
  e.watcher = new (class {
    constructor(e) {
      (this.config = Object.assign({ logging: !0 }, e)),
        this.observer,
        !document.documentElement.classList.contains("watcher") &&
          this.scrollWatcherRun();
    }
    scrollWatcherUpdate() {
      this.scrollWatcherRun();
    }
    scrollWatcherRun() {
      document.documentElement.classList.add("watcher"),
        this.scrollWatcherConstructor(
          document.querySelectorAll("[data-watch]")
        );
    }
    scrollWatcherConstructor(e) {
      if (e.length) {
        this.scrollWatcherLogging(
          `??????????????????, ?????????? ???? ?????????????????? (${e.length})...`
        ),
          a(
            Array.from(e).map(function (e) {
              return `${
                e.dataset.watchRoot ? e.dataset.watchRoot : null
              }|${e.dataset.watchMargin ? e.dataset.watchMargin : "0px"}|${e.dataset.watchThreshold ? e.dataset.watchThreshold : 0}`;
            })
          ).forEach((t) => {
            let n = t.split("|"),
              i = { root: n[0], margin: n[1], threshold: n[2] },
              r = Array.from(e).filter(function (e) {
                let t = e.dataset.watchRoot ? e.dataset.watchRoot : null,
                  n = e.dataset.watchMargin ? e.dataset.watchMargin : "0px",
                  r = e.dataset.watchThreshold ? e.dataset.watchThreshold : 0;
                if (
                  String(t) === i.root &&
                  String(n) === i.margin &&
                  String(r) === i.threshold
                )
                  return e;
              }),
              s = this.getScrollWatcherConfig(i);
            this.scrollWatcherInit(r, s);
          });
      } else
        this.scrollWatcherLogging("????????, ?????? ???????????????? ?????? ????????????????. ZzzZZzz");
    }
    getScrollWatcherConfig(e) {
      let t = {};
      if (
        (document.querySelector(e.root)
          ? (t.root = document.querySelector(e.root))
          : "null" !== e.root &&
            this.scrollWatcherLogging(
              `??????... ?????????????????????????? ?????????????? ${e.root} ?????? ???? ????????????????`
            ),
        (t.rootMargin = e.margin),
        !(e.margin.indexOf("px") < 0 && e.margin.indexOf("%") < 0))
      ) {
        if ("prx" === e.threshold) {
          e.threshold = [];
          for (let t = 0; t <= 1; t += 0.005) e.threshold.push(t);
        } else e.threshold = e.threshold.split(",");
        return (t.threshold = e.threshold), t;
      }
      this.scrollWatcherLogging(
        "???? ????, ?????????????????? data-watch-margin ?????????? ???????????????? ?? PX ?????? %"
      );
    }
    scrollWatcherCreate(e) {
      this.observer = new IntersectionObserver((e, t) => {
        e.forEach((e) => {
          this.scrollWatcherCallback(e, t);
        });
      }, e);
    }
    scrollWatcherInit(e, t) {
      this.scrollWatcherCreate(t), e.forEach((e) => this.observer.observe(e));
    }
    scrollWatcherIntersecting(e, t) {
      e.isIntersecting
        ? (!t.classList.contains("_watcher-view") &&
            t.classList.add("_watcher-view"),
          this.scrollWatcherLogging(
            `?? ???????? ${t.classList}, ?????????????? ?????????? _watcher-view`
          ))
        : (t.classList.contains("_watcher-view") &&
            t.classList.remove("_watcher-view"),
          this.scrollWatcherLogging(
            `?? ???? ???????? ${t.classList}, ?????????? ?????????? _watcher-view`
          ));
    }
    scrollWatcherOff(e, t) {
      t.unobserve(e),
        this.scrollWatcherLogging(`?? ???????????????? ?????????????? ???? ${e.classList}`);
    }
    scrollWatcherLogging(e) {
      this.config.logging && o(`[??????????????????????]: ${e}`);
    }
    scrollWatcherCallback(e, t) {
      const n = e.target;
      this.scrollWatcherIntersecting(e, n),
        n.hasAttribute("data-watch-once") &&
          e.isIntersecting &&
          this.scrollWatcherOff(n, t),
        document.dispatchEvent(
          new CustomEvent("watcherCallback", { detail: { entry: e } })
        );
    }
  })({});
  let bn = !1;
  function wn(e) {
    this.type = e;
  }
  setTimeout(() => {
    if (bn) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0),
    (wn.prototype.init = function () {
      const e = this;
      (this.??bjects = []),
        (this.daClassname = "_dynamic_adapt_"),
        (this.nodes = document.querySelectorAll("[data-da]"));
      for (let e = 0; e < this.nodes.length; e++) {
        const t = this.nodes[e],
          n = t.dataset.da.trim().split(","),
          i = {};
        (i.element = t),
          (i.parent = t.parentNode),
          (i.destination = document.querySelector(n[0].trim())),
          (i.breakpoint = n[1] ? n[1].trim() : "767"),
          (i.place = n[2] ? n[2].trim() : "last"),
          (i.index = this.indexInParent(i.parent, i.element)),
          this.??bjects.push(i);
      }
      this.arraySort(this.??bjects),
        (this.mediaQueries = Array.prototype.map.call(
          this.??bjects,
          function (e) {
            return (
              "(" +
              this.type +
              "-width: " +
              e.breakpoint +
              "px)," +
              e.breakpoint
            );
          },
          this
        )),
        (this.mediaQueries = Array.prototype.filter.call(
          this.mediaQueries,
          function (e, t, n) {
            return Array.prototype.indexOf.call(n, e) === t;
          }
        ));
      for (let t = 0; t < this.mediaQueries.length; t++) {
        const n = this.mediaQueries[t],
          i = String.prototype.split.call(n, ","),
          r = window.matchMedia(i[0]),
          s = i[1],
          o = Array.prototype.filter.call(this.??bjects, function (e) {
            return e.breakpoint === s;
          });
        r.addListener(function () {
          e.mediaHandler(r, o);
        }),
          this.mediaHandler(r, o);
      }
    }),
    (wn.prototype.mediaHandler = function (e, t) {
      if (e.matches)
        for (let e = 0; e < t.length; e++) {
          const n = t[e];
          (n.index = this.indexInParent(n.parent, n.element)),
            this.moveTo(n.place, n.element, n.destination);
        }
      else
        for (let e = t.length - 1; e >= 0; e--) {
          const n = t[e];
          n.element.classList.contains(this.daClassname) &&
            this.moveBack(n.parent, n.element, n.index);
        }
    }),
    (wn.prototype.moveTo = function (e, t, n) {
      t.classList.add(this.daClassname),
        "last" === e || e >= n.children.length
          ? n.insertAdjacentElement("beforeend", t)
          : "first" !== e
          ? n.children[e].insertAdjacentElement("beforebegin", t)
          : n.insertAdjacentElement("afterbegin", t);
    }),
    (wn.prototype.moveBack = function (e, t, n) {
      t.classList.remove(this.daClassname),
        void 0 !== e.children[n]
          ? e.children[n].insertAdjacentElement("beforebegin", t)
          : e.insertAdjacentElement("beforeend", t);
    }),
    (wn.prototype.indexInParent = function (e, t) {
      const n = Array.prototype.slice.call(e.children);
      return Array.prototype.indexOf.call(n, t);
    }),
    (wn.prototype.arraySort = function (e) {
      "min" === this.type
        ? Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? -1
                : "last" === e.place || "first" === t.place
                ? 1
                : e.place - t.place
              : e.breakpoint - t.breakpoint;
          })
        : Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? 1
                : "last" === e.place || "first" === t.place
                ? -1
                : t.place - e.place
              : t.breakpoint - e.breakpoint;
          });
    });
  new wn("max").init();
  const En = document.querySelector(".header");
  new IntersectionObserver(function (e, t) {
    e[0].isIntersecting
      ? En.classList.remove("_scroll")
      : En.classList.add("_scroll");
  }).observe(En),
    (window.FLS = !0),
    (function (e) {
      let t = new Image();
      (t.onload = t.onerror =
        function () {
          e(2 == t.height);
        }),
        (t.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let t = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(t);
    }),
    (function () {
      let e = document.querySelector(".icon-menu");
      e &&
        e.addEventListener("click", function (e) {
          i &&
            (((e = 500) => {
              document.documentElement.classList.contains("lock") ? r(e) : s(e);
            })(),
            document.documentElement.classList.toggle("menu-open"));
        });
    })(),
    (function () {
      const e = document.querySelectorAll("[data-spollers]");
      if (e.length > 0) {
        const i = Array.from(e).filter(function (e, t, n) {
          return !e.dataset.spollers.split(",")[0];
        });
        i.length && s(i);
        let r = l(e, "spollers");
        function s(e, t = !1) {
          e.forEach((e) => {
            (e = t ? e.item : e),
              t.matches || !t
                ? (e.classList.add("_spoller-init"),
                  o(e),
                  e.addEventListener("click", a))
                : (e.classList.remove("_spoller-init"),
                  o(e, !1),
                  e.removeEventListener("click", a));
          });
        }
        function o(e, t = !0) {
          let n = e.querySelectorAll("[data-spoller]");
          n.length &&
            ((n = Array.from(n).filter(
              (t) => t.closest("[data-spollers]") === e
            )),
            n.forEach((e) => {
              t
                ? (e.removeAttribute("tabindex"),
                  e.classList.contains("_spoller-active") ||
                    (e.nextElementSibling.hidden = !0))
                : (e.setAttribute("tabindex", "-1"),
                  (e.nextElementSibling.hidden = !1));
            }));
        }
        function a(e) {
          const i = e.target;
          if (i.closest("[data-spoller]")) {
            const r = i.closest("[data-spoller]"),
              s = r.closest("[data-spollers]"),
              o = !!s.hasAttribute("data-one-spoller");
            s.querySelectorAll("._slide").length ||
              (o && !r.classList.contains("_spoller-active") && c(s),
              r.classList.toggle("_spoller-active"),
              ((e, i = 500) => {
                e.hidden ? n(e, i) : t(e, i);
              })(r.nextElementSibling, 500)),
              e.preventDefault();
          }
        }
        function c(e) {
          const n = e.querySelector("[data-spoller]._spoller-active");
          n &&
            (n.classList.remove("_spoller-active"),
            t(n.nextElementSibling, 500));
        }
        r &&
          r.length &&
          r.forEach((e) => {
            e.matchMedia.addEventListener("change", function () {
              s(e.itemsArray, e.matchMedia);
            }),
              s(e.itemsArray, e.matchMedia);
          });
      }
    })(),
    (function () {
      const e = document.querySelectorAll("[data-tabs]");
      let i = [];
      if (e.length > 0) {
        const t = (function () {
          if (location.hash) return location.hash.replace("#", "");
        })();
        t && t.startsWith("tab-") && (i = t.replace("tab-", "").split("-")),
          e.forEach((e, t) => {
            e.classList.add("_tab-init"),
              e.setAttribute("data-tabs-index", t),
              e.addEventListener("click", o),
              (function (e) {
                let t = e.querySelectorAll("[data-tabs-titles]>*"),
                  n = e.querySelectorAll("[data-tabs-body]>*");
                const r = e.dataset.tabsIndex,
                  s = i[0] == r;
                if (s) {
                  const t = e.querySelector("[data-tabs-titles]>._tab-active");
                  t && t.classList.remove("_tab-active");
                }
                n.length &&
                  ((n = Array.from(n).filter(
                    (t) => t.closest("[data-tabs]") === e
                  )),
                  (t = Array.from(t).filter(
                    (t) => t.closest("[data-tabs]") === e
                  )),
                  n.forEach((e, n) => {
                    t[n].setAttribute("data-tabs-title", ""),
                      e.setAttribute("data-tabs-item", ""),
                      s && n == i[1] && t[n].classList.add("_tab-active"),
                      (e.hidden = !t[n].classList.contains("_tab-active"));
                  }));
              })(e);
          });
        let n = l(e, "tabs");
        n &&
          n.length &&
          n.forEach((e) => {
            e.matchMedia.addEventListener("change", function () {
              r(e.itemsArray, e.matchMedia);
            }),
              r(e.itemsArray, e.matchMedia);
          });
      }
      function r(e, t) {
        e.forEach((e) => {
          let n = (e = e.item).querySelector("[data-tabs-titles]"),
            i = e.querySelectorAll("[data-tabs-title]"),
            r = e.querySelector("[data-tabs-body]"),
            s = e.querySelectorAll("[data-tabs-item]");
          (i = Array.from(i).filter((t) => t.closest("[data-tabs]") === e)),
            (s = Array.from(s).filter((t) => t.closest("[data-tabs]") === e)),
            s.forEach((s, o) => {
              t.matches
                ? (r.append(i[o]), r.append(s), e.classList.add("_tab-spoller"))
                : (n.append(i[o]), e.classList.remove("_tab-spoller"));
            });
        });
      }
      function s(e) {
        let i = e.querySelectorAll("[data-tabs-title]"),
          r = e.querySelectorAll("[data-tabs-item]");
        const s = e.dataset.tabsIndex;
        const o = (function (e) {
          if (e.hasAttribute("data-tabs-animate"))
            return e.dataset.tabsAnimate > 0
              ? Number(e.dataset.tabsAnimate)
              : 500;
        })(e);
        if (r.length > 0) {
          const a = e.hasAttribute("data-tabs-hash");
          (r = Array.from(r).filter((t) => t.closest("[data-tabs]") === e)),
            (i = Array.from(i).filter((t) => t.closest("[data-tabs]") === e)),
            r.forEach((e, r) => {
              i[r].classList.contains("_tab-active")
                ? (o ? n(e, o) : (e.hidden = !1),
                  a &&
                    !e.closest(".popup") &&
                    (function (e) {
                      (e = e ? `#${e}` : window.location.href.split("#")[0]),
                        history.pushState("", "", e);
                    })(`tab-${s}-${r}`))
                : o
                ? t(e, o)
                : (e.hidden = !0);
            });
        }
      }
      function o(e) {
        const t = e.target;
        if (t.closest("[data-tabs-title]")) {
          const n = t.closest("[data-tabs-title]"),
            i = n.closest("[data-tabs]");
          if (
            !n.classList.contains("_tab-active") &&
            !i.querySelector("._slide")
          ) {
            let e = i.querySelectorAll("[data-tabs-title]._tab-active");
            e.length &&
              (e = Array.from(e).filter((e) => e.closest("[data-tabs]") === i)),
              e.length && e[0].classList.remove("_tab-active"),
              n.classList.add("_tab-active"),
              s(i);
          }
          e.preventDefault();
        }
      }
    })(),
    window.addEventListener("load", function (e) {
      const i = document.querySelectorAll("[data-showmore]");
      let r, s;
      function o(e) {
        e.forEach((e) => {
          a(e.itemsArray, e.matchMedia);
        });
      }
      function a(e, i) {
        e.forEach((e) => {
          !(function (e, i = !1) {
            let r = (e = i ? e.item : e).querySelectorAll(
                "[data-showmore-content]"
              ),
              s = e.querySelectorAll("[data-showmore-button]");
            (r = Array.from(r).filter(
              (t) => t.closest("[data-showmore]") === e
            )[0]),
              (s = Array.from(s).filter(
                (t) => t.closest("[data-showmore]") === e
              )[0]);
            const o = c(e, r);
            (i.matches || !i) &&
            o <
              (function (e) {
                let t = e.offsetHeight;
                e.style.removeProperty("height");
                let n = e.offsetHeight;
                return (e.style.height = `${t}px`), n;
              })(r)
              ? (t(r, 0, o), (s.hidden = !1))
              : (n(r, 0, o), (s.hidden = !0));
          })(e, i);
        });
      }
      function c(e, t) {
        let n = 0;
        if ("items" === (e.dataset.showmore ? e.dataset.showmore : "size")) {
          const e = t.dataset.showmoreContent ? t.dataset.showmoreContent : 3,
            i = t.children;
          for (
            let t = 1;
            t < i.length && ((n += i[t - 1].offsetHeight), t != e);
            t++
          );
        } else n = t.dataset.showmoreContent ? t.dataset.showmoreContent : 150;
        return n;
      }
      function d(e) {
        const i = e.target,
          l = e.type;
        if ("click" === l) {
          if (i.closest("[data-showmore-button]")) {
            const e = i
                .closest("[data-showmore-button]")
                .closest("[data-showmore]"),
              r = e.querySelector("[data-showmore-content]"),
              s = e.dataset.showmoreButton ? e.dataset.showmoreButton : "500",
              o = c(e, r);
            r.classList.contains("_slide") ||
              (e.classList.contains("_showmore-active")
                ? t(r, s, o)
                : n(r, s, o),
              e.classList.toggle("_showmore-active"));
          }
        } else "resize" === l && (r && r.length && a(r), s && s.length && o(s));
      }
      i.length &&
        ((r = Array.from(i).filter(function (e, t, n) {
          return !e.dataset.showmoreMedia;
        })),
        r.length && a(r),
        document.addEventListener("click", d),
        window.addEventListener("resize", d),
        (s = l(i, "showmoreMedia")),
        s &&
          s.length &&
          (s.forEach((e) => {
            e.matchMedia.addEventListener("change", function () {
              a(e.itemsArray, e.matchMedia);
            });
          }),
          o(s)));
    }),
    (function () {
      const e = document.querySelectorAll(
        "input[placeholder],textarea[placeholder]"
      );
      e.length &&
        e.forEach((e) => {
          e.dataset.placeholder = e.placeholder;
        }),
        document.body.addEventListener("focusin", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = ""),
            t.classList.add("_form-focus"),
            t.parentElement.classList.add("_form-focus"),
            d.removeError(t));
        }),
        document.body.addEventListener("focusout", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = t.dataset.placeholder),
            t.classList.remove("_form-focus"),
            t.parentElement.classList.remove("_form-focus"),
            t.hasAttribute("data-validate") && d.validateInput(t));
        });
    })(),
    (function (t) {
      e.popup && e.popup.open("some");
      const n = document.forms;
      if (n.length)
        for (const e of n)
          e.addEventListener("submit", function (e) {
            i(e.target, e);
          }),
            e.addEventListener("reset", function (e) {
              const t = e.target;
              d.formClean(t);
            });
      async function i(e, n) {
        if (0 === (t ? d.getErrors(e) : 0)) {
          if (e.hasAttribute("data-ajax")) {
            n.preventDefault();
            const t = e.getAttribute("action")
                ? e.getAttribute("action").trim()
                : "#",
              i = e.getAttribute("method")
                ? e.getAttribute("method").trim()
                : "GET",
              s = new FormData(e);
            e.classList.add("_sending");
            const o = await fetch(t, { method: i, body: s });
            if (o.ok) {
              await o.json();
              e.classList.remove("_sending"), r(e);
            } else alert("????????????"), e.classList.remove("_sending");
          } else e.hasAttribute("data-dev") && (n.preventDefault(), r(e));
        } else {
          n.preventDefault();
          const t = e.querySelector("._form-error");
          t && e.hasAttribute("data-goto-error") && c(t, !0, 1e3);
        }
      }
      function r(t) {
        document.dispatchEvent(
          new CustomEvent("formSent", { detail: { form: t } })
        ),
          setTimeout(() => {
            if (e.popup) {
              const n = t.dataset.popupMessage;
              n && e.popup.open(n);
            }
          }, 0),
          d.formClean(t),
          o(`[??????????]: ${"?????????? ????????????????????!"}`);
      }
    })(!0),
    (function () {
      const e = document.querySelectorAll(".rating");
      e.length > 0 &&
        (function () {
          let t, n;
          for (let t = 0; t < e.length; t++) {
            i(e[t]);
          }
          function i(e) {
            r(e), s(), e.classList.contains("rating_set") && o(e);
          }
          function r(e) {
            (t = e.querySelector(".rating__active")),
              (n = e.querySelector(".rating__value"));
          }
          function s(e = n.innerHTML) {
            const i = e / 0.05;
            t.style.width = `${i}%`;
          }
          function o(e) {
            const t = e.querySelectorAll(".rating__item");
            for (let i = 0; i < t.length; i++) {
              const o = t[i];
              o.addEventListener("mouseenter", function (t) {
                r(e), s(o.value);
              }),
                o.addEventListener("mouseleave", function (e) {
                  s();
                }),
                o.addEventListener("click", function (t) {
                  r(e),
                    e.dataset.ajax
                      ? a(o.value, e)
                      : ((n.innerHTML = i + 1), s());
                });
            }
          }
          async function a(e, t) {
            if (!t.classList.contains("rating_sending")) {
              t.classList.add("rating_sending");
              let e = await fetch("rating.json", { method: "GET" });
              if (e.ok) {
                const i = (await e.json()).newRating;
                (n.innerHTML = i), s(), t.classList.remove("rating_sending");
              } else alert("????????????"), t.classList.remove("rating_sending");
            }
          }
        })();
    })(),
    (function () {
      function e(e) {
        if ("click" === e.type) {
          const t = e.target;
          if (t.closest("[data-goto]")) {
            const n = t.closest("[data-goto]"),
              i = n.dataset.goto ? n.dataset.goto : "",
              r = !!n.hasAttribute("data-goto-header"),
              s = n.dataset.gotoSpeed ? n.dataset.gotoSpeed : "500";
            c(i, r, s), e.preventDefault();
          }
        } else if ("watcherCallback" === e.type && e.detail) {
          const t = e.detail.entry,
            n = t.target;
          if ("navigator" === n.dataset.watch) {
            const e = n.id,
              i =
                (document.querySelector("[data-goto]._navigator-active"),
                document.querySelector(`[data-goto="${e}"]`));
            t.isIntersecting
              ? i && i.classList.add("_navigator-active")
              : i && i.classList.remove("_navigator-active");
          }
        }
      }
      document.addEventListener("click", e),
        document.addEventListener("watcherCallback", e);
    })();
})();
