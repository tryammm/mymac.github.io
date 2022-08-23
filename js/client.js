(() => {
    "use strict";
    var e = "__replain_widget", t = "__replain_widget_iframe", i = "__replain_widget_iframe_embedded",
        n = {INIT: "onReplainEmbeddedInit"};
    const r = {scrolling: "no"};
    var d = (e, t = {}) => {
        const i = document.createElement("iframe"), n = {...r, ...t};
        return i.id = e, i.setAttribute("title", e), i.setAttribute("name", e), i.setAttribute("src", "about:blank"), i.setAttribute("scrolling", n.scrolling), i.setAttribute("frameBorder", "0"), i.setAttribute("allowfullscreen", ""), i
    }, a = {
        init(e) {
            e.addEventListener(n.INIT, (({detail: e}) => {
                const t = document.body.querySelector(`#${e.wrapperId}`);
                if (null === t) return;
                const n = t.getAttribute("data-department") || 0;
                window.ReplainWidget.embedded = {
                    ...e,
                    width: t.getAttribute("data-width") || e.width,
                    height: t.getAttribute("data-height") || e.height,
                    subject: t.getAttribute("data-subject") || "",
                    theme: t.getAttribute("data-theme") || "light",
                    department: Number(n)
                }, (e => {
                    e.style.display = "none";
                    const t = d(i);
                    e.appendChild(t), t.contentDocument.write('<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Re:plain Embedded</title><link href="https://widget.replain.cc/dist/css/embedded.ef04573a.css" rel="stylesheet"></head><body><div id="app"></div><script src="https://widget.replain.cc/dist/js/embedded.b4bdb9ab.js"><\/script></body></html>'), t.contentDocument.close()
                })(t)
            }))
        }
    };
    let o = !1;
    var s = () => {
        if (!0 === o) return void console.warn("[RE:PLAIN] Prevent duplicate initialization");
        o = !0, window.ReplainWidget = {};
        const i = d(t), n = document.createElement("div");
        n.id = e, n.style.display = "none", n.appendChild(i), document.body.appendChild(n), i.contentDocument.write('<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Re:plain Widget</title><link href="https://widget.replain.cc/dist/css/widget.5461d341.css" rel="stylesheet"></head><body><div id="app"></div><script src="https://widget.replain.cc/dist/js/widget.2f0a303b.js"><\/script></body></html>'), i.contentDocument.close(), a.init(i)
    };

    function l(e, t) {
        return t.some((t => {
            const i = "/" === t[0] ? t : `/${t}`;
            if ("*" === t.substr(-1)) {
                const i = t.substr(0, t.length - 1);
                return 0 === e.indexOf(i)
            }
            return e === i
        }))
    }

    const c = window.location.search, w = `${window.location.pathname}${c}`;

    function p(e) {
        if (!e || !e.id) return {error: "Invalid widget code"};
        if (!1 === e.showChat) return {error: "Skip page by `showChat`"};
        const {excludePages: t = []} = e;
        if (t.length > 0 && l(w, t)) return {error: "Skip page by `excludePages`"};
        const {includePages: i = []} = e;
        return i.length > 0 && !l(w, i) ? {error: "Skip page by `includePages`"} : {}
    }

    const {readyState: u, currentScript: h} = document;
    let g = null;
    if (window.WebSocket || (g = "WebSocket is not supported"), null !== h && window.URL) {
        const e = h.getAttribute("src");
        if (null !== e) {
            const t = new window.URL(e, "https://replain.cc");
            t.searchParams.has("id") && (window.__REPLAIN_ = t.searchParams.get("id"))
        }
    }
    window.replainSettings || (window.replainSettings = {id: window.__REPLAIN_}), (() => {
        if (void 0 !== window.replainInitialized) return void console.warn("[RE:PLAIN] Duplicate widget code");
        if (window.replainInitialized = !0, g) return void console.warn(`[RE:PLAIN] ${g}`);
        const {replainSettings: e} = window, t = (e => {
            let t = e;
            Array.isArray(t) || (t = [t]);
            let i = null;
            for (const e of t) {
                const t = p(e);
                t.error ? console.warn(`[RE:PLAIN] ${t.error} (id: ${e.id})`) : i = e
            }
            return "?replain-chat-open" === c && void 0 === i.openChatAfterPageLoad && (i.openChatAfterPageLoad = !0), i
        })(e);
        null !== t ? (window.replainSettings = t, "complete" !== u ? window.addEventListener("load", s, !1) : s()) : console.warn("[RE:PLAIN] Settings not found")
    })()
})();