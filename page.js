this.pagejs = e => {
  (() => {
    "use strict";
    const t = "vault" in e;
    if (t && void 0 === e.vault) throw "Invalid vault";
    const n = e.vault = e.vault || (e => {
      const t = Object.call, n = t.bind(t), o = Object.assign, r = Object.getOwnPropertyDescriptor, s = e => o({__proto__: null}, e);
      return s({sourceWindow: e, cSO: s, F_c: n, F_a: Object.apply, F_b: Object.bind, F_tS: Function.toString, A_fE: [].forEach, A_so: [].some, A_sh: [].shift, A_j: [].join, A_po: [].pop, A_f: [].filter, A_iO: [].indexOf, A_iA: Array.isArray, O_a: o, O_k: Object.keys, O_v: Object.values, O_dP: Object.defineProperties, O_dPy: Object.defineProperty, O_hOP: Object.hasOwnProperty, O_gOPN: Object.getOwnPropertyNames, O_gOPD: r, O_gOPDs: Object.getOwnPropertyDescriptors, O_gPO: Object.getPrototypeOf, O_tS: {}.toString, J_p: JSON.parse, J_s: JSON.stringify, M_f: Math.floor, M_r: Math.random, M_m: Math.max, M_i: MutationEvent.prototype.initMutationEvent, M_pA: MutationEvent.prototype.ADDITION, M_pAT: MutationEvent.AT_TARGET, N_tS: 0..toString, N_MSI: Number.MAX_SAFE_INTEGER, P_t: Promise.prototype.then, P_c: Promise.prototype.catch, R_rABS: FileReader.prototype.readAsBinaryString, R_rAT: FileReader.prototype.readAsText, R_r: r(FileReader.prototype, "result").get, R_enq: e.ReadableStreamDefaultController ? e.ReadableStreamDefaultController.prototype.enqueue : null, R_cl: e.ReadableStreamDefaultController ? e.ReadableStreamDefaultController.prototype.close : null, S_fCC: String.fromCharCode, S_sl: "".slice, S_su: "".substr, S_sp_nr: "".split, S_iO: "".indexOf, S_tr: "".trim, S_r_nr: "".replace, S_rA_nr: "".replaceAll, S_cCA: "".charCodeAt, S_tLC: "".toLowerCase, S_tUC: "".toUpperCase, Y_tST: Symbol.toStringTag, D_pFS: DOMParser.prototype.parseFromString, U_cOU: URL.createObjectURL, U_rOU: URL.revokeObjectURL, X_o: XMLHttpRequest.prototype.open, X_pSD: XMLHttpRequest.prototype.DONE, X_pSH: XMLHttpRequest.prototype.HEADERS_RECEIVED, X_pSL: XMLHttpRequest.prototype.LOADING, X_pSO: XMLHttpRequest.prototype.OPENED, X_pSU: XMLHttpRequest.prototype.UNSENT, X_s: XMLHttpRequest.prototype.send, D_n: Date.now, I_tS: e => "" + e, E_r: Element.prototype.remove, E_s: Element.prototype.setAttribute, D_cS: r(Document.prototype, "currentScript").get, D_gRS: r(Document.prototype, "readyState").get, D_cE: Document.prototype.createElementNS, D_gEBT: Document.prototype.getElementsByTagName, M_aN: r(MutationEvent.prototype, "attrName").get, M_rN: r(MutationEvent.prototype, "relatedNode").get, C_d: r(CustomEvent.prototype, "detail").get, W_aEL: addEventListener, W_rEL: removeEventListener, parseInt, parseFloat, CustomEvent, CompositionEvent, KeyboardEvent, MouseEvent, MutationEvent, MutationObserver, console: Object.assign({}, console), Error, Uint8Array, Blob, ReadableStream, Number, String, Proxy, Window, FileReader, DOMParser, XMLHttpRequest, Function, RegExp, Promise, encodeURIComponent, decodeURIComponent, encodeURI, decodeURI, escape, unescape, atob, btoa, setTimeout, clearTimeout, setInterval, clearInterval, postMessage, dispatchEvent, alert, prompt, confirm, close, getElementById: e.Document.prototype.getElementById, createEvent: e.Document.prototype.createEvent, createElement: e.Document.prototype.createElement});
    })(e.unsafeWindow), {cSO: o, F_c: r, F_a: s, F_b: a, F_tS: i, A_fE: l, A_so: c, A_sh: u, A_j: d, A_po: g, A_f: p, A_iO: f, A_iA: v, O_a: m, O_k: _, O_v: M, O_dP: b, O_dPy: h, O_hOP: y, O_gOPN: E, O_gOPD: w, O_gOPDs: S, O_gPO: G, O_tS: O, J_p: R, J_s: L, M_f: C, M_r: T, M_m: x, M_i: I, M_pA: A, M_pAT: D, N_tS: P, N_MSI: U, P_t: $, P_c: k, R_rABS: F, R_rAT: N, R_r: j, R_enq: V, R_cl: q, S_fCC: X, S_sl: B, S_su: H, S_iO: W, S_sp_nr: J, S_tr: K, S_rA_nr: z, S_cCA: Y, S_tLC: Q, S_tUC: Z, Y_tST: ee, D_pFS: te, D_cS: ne, D_gRS: oe, D_cE: re, D_gEBT: se, E_r: ae, E_s: ie, M_aN: le, M_rN: ce, C_d: ue, U_cOU: de, U_rOU: ge, X_o: pe, X_s: fe, X_pSD: ve, X_pSH: me, X_pSL: _e, X_pSO: Me, X_pSU: be, D_n: he, I_tS: ye, W_aEL: Ee, W_rEL: we, parseInt: Se, parseFloat: Ge, console: Oe, encodeURIComponent: Re, decodeURIComponent: Le, encodeURI: Ce, decodeURI: Te, escape: xe, unescape: Ie, atob: Ae, btoa: De, postMessage: Pe, dispatchEvent: Ue, alert: $e, prompt: ke, confirm: Fe, close: Ne, getElementById: je, createEvent: Ve, createElement: qe, CustomEvent: Xe, CompositionEvent: Be, KeyboardEvent: He, MouseEvent: We, MutationEvent: Je, MutationObserver: Ke, Uint8Array: ze, FileReader: Ye, DOMParser: Qe, XMLHttpRequest: Ze, Function: et, RegExp: tt, Promise: nt, Blob: ot, ReadableStream: rt, Number: st, String: at, Proxy: it, Window: lt} = n, ct = r, ut = s, dt = _, gt = M, pt = m, ft = b, vt = h, mt = E, _t = w, Mt = G, bt = S || (e => {
      const t = Gt({});
      for (const n in e) t[n] = _t(e, n);
      return t;
    }), ht = v, yt = C, Et = T, wt = x, St = (e, t, n) => ct(ut, e, t, n), Gt = o, Ot = (e, t, n) => (vt(e, t, Gt({value: n, configurable: true, enumerable: true, writable: true})), e), Rt = (e, t) => Wt(e, t) ? e[t] : void 0, Lt = (e, t) => {
      const n = _t(e, t);
      return n ? Gt(n).value : void 0;
    }, Ct = (e, t) => {
      const n = (e, t, o) => {
        const r = _t(e, t), s = r ? Gt(r) : void 0;
        let a;
        return s ? s.enumerable ? s.value : void 0 : --o >= 0 && (a = Mt(e)) ? n(a, t, o) : void 0;
      };
      return n(e, t, 5);
    }, Tt = e => {
      const t = (t, ...n) => St(e, t, n);
      return Ot(t, "wrappedJSObject", e), t;
    }, xt = () => e => Tt(e), It = Tt(a), At = R, Dt = e => {
      const t = (e, n) => {
        let o;
        if (null === e) o = "null"; else if ("object" == typeof e) {
          if (n) {
            if (-1 != Bt(n, e)) throw "Converting circular structure to JSON";
            Ot(n, n.length, e);
          } else n = [e];
          if (ht(e)) {
            let r = "";
            for (let o = 0; o < e.length; o++) {
              let s;
              s = Wt(e, o) ? Rt(e, o) : Ct(e, o);
              const a = t(s, n);
              r += `${o ? "," : ""}${void 0 === a ? "null" : a}`;
            }
            o = `[${r}]`;
          } else {
            let r = "";
            Ht(dt(e), o => {
              const s = t(e[o], n);
              void 0 !== s && (r += `${r ? "," : ""}${L(o)}: ${s}`);
            }), o = `{${r}}`;
          }
          n.length -= 1;
        } else o = L(e);
        return o;
      };
      return t(e);
    }, Pt = e => {
      const t = R(e), n = e => {
        const t = [];
        for (let n = 0; n < e.length; n++) Ot(t, n, o(e[n]));
        return t;
      }, o = e => {
        if (null === e) ; else if ("object" == typeof e) {
          if (ht(e)) return n(e);
          {
            const t = {};
            return Ht(dt(e), r => {
              const s = e[r];
              let a;
              a = "object" == typeof s ? ht(s) ? n(s) : o(s) : s, Ot(t, r, a);
            }), t;
          }
        }
        return e;
      };
      return o(t);
    }, Ut = xt()(c), $t = (e, t, n, ...o) => {
      const r = o || [], s = jt(e, 0, t), a = jt(e, t, n), i = jt(e, t + n);
      let l = qt([], s);
      return l = qt(l, r), l = qt(l, i), Gt({result: l, removed: a});
    }, kt = xt()(u), Ft = xt()(g), Nt = xt()(p), jt = (e, t, n) => {
      const o = e.length;
      let r = t || 0;
      if (r >= o) return [];
      r < 0 && (r = wt(0, o + r));
      let s = void 0 === n ? o : n;
      s < 0 && (s = wt(0, o + s)), s > o && (s = o);
      const a = Gt({});
      for (let t = r; t < s; t++) a[t] = Lt(e, t);
      return gt(a);
    }, Vt = xt()(d), qt = (e, ...t) => {
      let n = e.length;
      const o = Gt(e);
      for (let e = 0; e < t.length; e++) {
        const r = t[e], s = ht(r) ? r : [r];
        for (let e = 0; e < s.length; e++) o[n + e] = Lt(s, e);
        n += s.length;
      }
      return gt(o);
    }, Xt = (e, t) => {
      let n = e.length || 0;
      return Ot(e, n, t), n++, e.length = n;
    }, Bt = xt()(f), Ht = xt()(l), Wt = xt()(y), Jt = xt()(J), Kt = xt()(B), zt = Tt(O), Yt = Mt({}), Qt = e => {
      const t = Gt(e), n = mt(t);
      for (let e = 0; e < n.length; e++) {
        const o = n[e], r = t[o];
        null !== r && "object" == typeof r && Mt(r) === Yt && (t[o] = Qt(r));
      }
      return t;
    }, Zt = e => {
      const t = Jt(zt(e), " ");
      return Kt(Vt(jt(t, 1), " "), 0, -1);
    }, en = (xt()(i), xt()(I)), tn = A, nn = D, on = xt()(P), rn = U, sn = async e => e, an = xt()($), ln = xt()(k), cn = xt()(F), un = xt()(N), dn = xt()(j), gn = V ? xt()(V) : V, pn = q ? xt()(q) : q, fn = X, vn = xt()(H), mn = xt()(W), _n = xt()(K), Mn = (xt()(z || function (e, t) {
      return Vt(Jt(this, e), t);
    }), xt()(Y)), bn = xt()(Q), hn = xt()(Z), yn = ee, En = Tt(te), wn = Tt(ne), Sn = Tt(oe), Gn = (Tt(re), Tt(se), Tt(ae)), On = Tt(ie), Rn = Tt(le), Ln = Tt(ce), Cn = Tt(ue), Tn = (xt()(pe), ve), xn = me, In = _e, An = Me, Dn = be, Pn = (xt()(fe), he), Un = it, $n = st, kn = Xe, Fn = He, Nn = We, jn = ze, Vn = Ke, qn = ot, Bn = Gt({addEventListener: false, Array: true, Blob: true, close: false, CustomEvent: true, Date: true, DOMParser: true, Error: true, Event: true, FileReader: true, KeyboardEvent: true, location: true, Math: true, MouseEvent: true, MutationEvent: true, Number: true, Object: true, Promise: true, ReadableStream: true, removeEventListener: false, Uint8Array: true, XMLHttpRequest: true}), Hn = (() => {
      const e = Gt({getElementById: je, createEvent: Ve, createElement: qe, dispatchEvent: Ue, addEventListener, removeEventListener}), t = Gt({});
      return Ht(dt(e), n => {
        try {
          const o = e[n];
          t[n] = function (...e) {
            return St(o, Kn.document, e);
          };
        } catch (e) {
          t[n] = ((e, t) => {
            if (Yn.error(`Tampermonkey sandbox preparation ${t ? "(" + t + ") " : ""}failed. This usually is caused by a third-party extension.`, e), t) return () => {};
          })(e, `document.${n}`);
        }
      }), t;
    })(), Wn = Gt({top: true, location: true}), Jn = e, {unsafeWindow: Kn, unsafeThis: zn} = Jn;
    e.bridges = e.bridges || Gt({});
    const Yn = e.console = e.console || Gt({}), Qn = Gt({addEventListener: It(Ee, Kn), removeEventListener: It(we, Kn)});
    Ht(dt(Wn), async e => {
      if (!Qn[e]) try {
        const t = Kn[e];
        if (null == t) return;
        Qn[e] = t;
      } catch (e) {}
    }), Ht(dt(Bn), async e => {
      if (!Qn[e]) try {
        let t = Lt(Kn, e);
        if (void 0 === t && (zn === Kn || void 0 === (t = Lt(zn, e)))) return;
        const n = Bn[e];
        Qn[e] = false === n && "function" == typeof t ? It(t, zn) : t;
      } catch (e) {}
    });
    const Zn = e => {
      let t, n = [], o = false;
      e(e => {
        if (!o) {
          if (n.length) {
            const t = n;
            n = [], Ht(t, t => t(e));
          } else t = e;
          o = true;
        }
      });
      const r = Gt({then: e => (o ? e(t) : Xt(n, e), r)});
      return r;
    }, eo = () => on(Pn() + 19831206 * Et() + 1, 36), to = async e => {
      await null, e();
    }, {createEvent: no} = Hn, oo = (() => {
      const {console: t, bridges: n} = e, o = Gt({});
      let r;
      const s = (e, t) => {
        let n = [], r = [];
        const s = () => {
          n = [], r = [], a = null, delete o[e];
        };
        let a = Gt({postMessage: n => {
          t.send("port.message", Gt({response_id: e, value: n}));
        }, onMessage: Gt({addListener: e => {
          Xt(n, e);
        }}), onDisconnect: Gt({addListener: e => {
          Xt(r, e);
        }}), disconnect: () => {
          t.send("port.message", Gt({response_id: e, disconnect: true})), s();
        }});
        return o[e] = Gt({message: e => {
          n && Ht(n, t => t(e));
        }, disconnect: () => {
          r && Ht(r, e => e()), s();
        }}), a;
      };
      return Gt({message: (e, n) => {
        let a;
        if (e.connect) {
          if (!e.destination || !e.response_id) throw "invalid message";
          r && r(e.destination, s(e.response_id, n));
        } else {
          if (!e.response_id) throw "invalid message";
          if (!(a = o[e.response_id])) return void t.warn("ports: unkown id", e.response_id, e);
          e.disconnect ? a.disconnect() : a.message(e.value);
        }
      }, connect: e => {
        const t = eo();
        return n.first.send("port.message", Gt({response_id: t, connect: true, destination: e})), s(t, n.first);
      }, onConnect: Gt({addListener: e => {
        r = e;
      }})});
    })(), {bridges: ro} = e, so = Gt({}), ao = Gt({});
    let io = true, lo = [];
    to(() => {
      io = false, Ht(lo, ({m: e, i: t}) => ro.first.send("console", [e, t])), lo = [];
    }), Ht(["debug", "log", "info", "warn", "error"], e => {
      Ot(so, e, (...t) => {
        const n = (e => {
          const t = [];
          return Ht(e, e => {
            Xt(t, (e => Dt(e))(e));
          }), t;
        })(t);
        if (io) return Xt(lo, Gt({m: e, i: n}));
        ro.first.send("console", [e, n]);
      });
    });
    const co = Gt(bt(Kn.console)), uo = Gt({});
    Ht(mt(Oe), e => {
      const t = Gt(co[e]);
      uo[e] = Gt({get: "value" in t ? () => t.value : t.get, enumerable: true, configurable: false});
    }), ft(ao, uo);
    const go = ["chrome"], po = ["GM_addElement", "GM.addElement", "GM_addStyle", "GM.addStyle"], fo = ["GM_cookie", "GM.cookie"], vo = ["GM_listValues", "GM.listValues", "GM_getValue", "GM.getValue", "GM_addValueChangeListener", "GM.addValueChangeListener", "GM_removeValueChangeListener", "GM.removeValueChangeListener"], mo = ["GM_setValue", "GM.setValue", "GM_deleteValue", "GM.deleteValue"], _o = ["GM_download", "GM.download"], Mo = ["GM_getResourceText", "GM.getResourceText", "GM_getResourceURL", "GM.getResourceUrl"], bo = ["GM_getTab", "GM.getTab", "GM_getTabs", "GM.getTabs", "GM_saveTab", "GM.saveTab"], ho = ["GM_log", "GM.log"], yo = ["GM_notification", "GM.notification"], Eo = ["GM_openInTab", "GM.openInTab"], wo = ["GM_registerMenuCommand", "GM.registerMenuCommand", "GM_unregisterMenuCommand", "GM.unregisterMenuCommand"], So = ["GM_setClipboard", "GM.setClipboard"], Go = ["GM_xmlhttpRequest", "GM.xmlHttpRequest"], Oo = ["window.close"], Ro = ["window.focus"], Lo = ["window.onurlchange"], Co = ["GM_webRequest", "GM.webRequest"], To = Gt({encode: e => Ie(Re(e)), decode: e => Le(xe(e))}), xo = Gt({encode: e => {
      let t = "";
      for (let n = 0; n < e.length; n++) t += fn(255 & Mn(e, n));
      return De(t);
    }, decode: e => Ae(e)}), Io = e => {
      const t = new jn(e.length);
      for (let n = 0; n < e.length; n++) t[n] = Mn(e, n);
      return t.buffer;
    }, Ao = (e, t) => Zn(n => {
      const o = new Qn.FileReader;
      o.onload = () => {
        n(dn(o));
      }, o.onerror = e => {
        Yn.warn(`unable to decode data ${e}`), n("");
      }, t ? un(o, e, t) : cn(o, e);
    }), {bridges: Do} = e;
    let Po = 0, Uo = 0;
    const $o = Gt({}), ko = Gt({}), Fo = function (e, t, n, o) {
      const r = () => {
        $o[n] && (St(e, this, o), delete $o[n]);
      };
      "function" == typeof e && ($o[n] = e, 0 === t ? to(() => r()) : Do.first.send("setTimeout", Gt({t: t || 1}), () => r()));
    }, No = e => {
      const t = ko[e];
      t && (t.disconnect(), delete ko[e]);
    }, jo = (e, t, ...n) => {
      const o = eo();
      return Fo(e, t, o, n), o;
    }, Vo = e => {
      (e => {
        delete $o[e];
      })(e);
    }, qo = e => No(e), Xo = (e, t, ...n) => {
      const o = ++Uo;
      return t = wt(t, 1), Fo(e, t, o, n), o;
    }, Bo = (e, t, ...n) => {
      const o = ++Po;
      return function (e, t, n, o) {
        if ("function" == typeof e) {
          const r = ko[n] = oo.connect("setInterval");
          r.onMessage.addListener(() => {
            ko[n] && St(e, this, o);
          }), r.onDisconnect.addListener(() => No(n)), r.postMessage(Gt({method: "setInterval", t: t || 1}));
        }
      }(e, t = wt(t, 1), o, n), o;
    }, Ho = t => {
      const {contextId: n, bridges: o} = e, r = Gt({}), s = (e, t) => Ut(t, t => -1 != Bt(e, t)), a = e => function () {
        const t = sn(St(e, this, arguments));
        return Ot(t, "then", e => an(t, e)), Ot(t, "catch", e => ln(t, e)), t;
      }, i = (e, t) => function (...n) {
        const o = [];
        if (void 0 !== t) for (let e = 0; e < t; e++) Xt(o, Lt(n, e) || void 0);
        return new Qn.Promise(t => {
          St(e, this, qt(o, [t]));
        });
      }, l = (e, t) => {
        let n;
        const o = new Qn.Promise((o, r) => {
          const s = Gt({}), a = t.onload, i = t.ontimeout, l = t.onerror;
          Ht(dt(t), e => {
            s[e] = t[e];
          }), s.onerror = function (e) {
            r(e), l && St(l, this, arguments);
          }, s.ontimeout = function (e) {
            r(e), i && St(i, this, arguments);
          }, s.onload = function (e) {
            o(e), a && St(a, this, arguments);
          };
          const c = e(s).abort;
          true === n ? c() : n = c;
        });
        return Ot(o, "abort", () => {
          "function" == typeof n ? n() : n = true;
        }), o;
      };
      return Gt({of: e => {
        const c = e.script, u = (() => {
          const e = s(c.grant, So), t = (e, t, r) => {
            o.first.send("setClipboard", Gt({content: e, info: t, id: n, uuid: c.uuid}), r ? () => r() : null);
          };
          return Gt({GM_setClipboard: e ? Gt({value: t}) : void 0, "GM.setClipboard": e ? Gt({get: () => i(t, 2)}) : void 0});
        })(), d = (() => {
          let t = [];
          const o = e.storage;
          let r = 0, i = null;
          const l = s(c.grant, vo), u = s(c.grant, mo), d = (e, t) => {
            if ("string" != typeof e) return t;
            {
              const n = vn(e, 0, 1);
              switch (e = vn(e, 1), n) {
                case "b":
                  return "true" === e;
                case "n":
                  return $n(e);
                case "x":
                  return To.decode(xo.decode(e));
                case "o":
                  try {
                    return Pt(e);
                  } catch (e) {
                    Yn.log(`values: parseValueFromStorage: ${e}`);
                  }
                  return t;
                case "u":
                  return;
                default:
                  return e;
              }
            }
          }, g = (e, n, o, r) => {
            n != o && Ht(t, t => {
              if (t && t.key == e && t.cb) try {
                t.cb(e, d(n), d(o), r);
              } catch (t) {
                Yn.warn(`values: change listener of "${e}" failed with: ${t.message}`);
              }
            });
          }, p = e => {
            i && i.postMessage(Gt({method: "saveStorageKey", uuid: c.uuid, key: e, value: o.data[e], id: n, ts: o.ts}));
          };
          l && (i = oo.connect("values"), i.onMessage.addListener(e => {
            const {storage: t, removed: n} = e;
            if (!t) return;
            const r = t.data, s = dt(r);
            n && Xt(s, n), Ht(s, e => {
              const t = o.data[e], n = r[e];
              void 0 === n ? delete o.data[e] : o.data[e] = n, g(e, t, n, true);
            });
          }), i.onDisconnect.addListener(() => {
            i = null;
          }), i.postMessage(Gt({method: "addStorageListener", uuid: c.uuid, id: n})));
          const f = (e, t) => d(o.data[e], t), v = () => dt(o.data), m = (e, n) => {
            const o = ++r, s = Gt({id: o, key: e, cb: n});
            return Xt(t, s), o;
          }, _ = e => {
            t = Nt(t, t => t.id !== e);
          }, M = (e, t) => {
            const n = o.data[e];
            o.ts = Pn(), o.data[e] = (e => {
              let t, n = vn(typeof e, 0, 1);
              switch (n) {
                case "o":
                  try {
                    t = n + Dt(e);
                  } catch (e) {
                    return void Yn.log(e);
                  }
                  break;
                case "s":
                  const o = e;
                  -1 === mn(o, fn(8232)) && -1 === mn(o, fn(8233)) || (n = "x", t = xo.encode(To.encode(o))), t = n + e;
                  break;
                default:
                  t = n + e;
              }
              return t;
            })(t), p(e), g(e, n, o.data[e], false);
          }, b = e => {
            const t = o.data[e];
            o.ts = Pn(), delete o.data[e], p(e), g(e, t, o.data[e], false);
          };
          return Gt({GM_getValue: l ? Gt({value: f}) : void 0, "GM.getValue": l ? Gt({get: () => a(f)}) : void 0, GM_listValues: l ? Gt({value: v}) : void 0, "GM.listValues": l ? Gt({get: () => a(v)}) : void 0, GM_addValueChangeListener: l ? Gt({value: m}) : void 0, "GM.addValueChangeListener": l ? Gt({get: () => a(m)}) : void 0, GM_removeValueChangeListener: l ? Gt({value: _}) : void 0, "GM.removeValueChangeListener": l ? Gt({get: () => a(_)}) : void 0, GM_setValue: u ? Gt({value: M}) : void 0, "GM.setValue": u ? Gt({get: () => a(M)}) : void 0, GM_deleteValue: u ? Gt({value: b}) : void 0, "GM.deleteValue": u ? Gt({get: () => a(b)}) : void 0});
        })(), g = (() => {
          const e = s(c.grant, Lo), t = (() => {
            let e = [], t = null;
            return Gt({register: o => {
              Xt(e, o), t || (t = oo.connect("onurlchange"), t.onMessage.addListener(({url: t}) => {
                t && Ht(e, e => e(Gt({url: t})));
              }), t.postMessage(Gt({method: "observeUrlChanges", uuid: c.uuid, id: n})));
            }, unregister: n => {
              let o;
              n && (o = Bt(e, n)) > -1 && (e = $t(e, o, 1).result), t && 0 === e.length && (t.disconnect(), t = null);
            }});
          })();
          return Gt({"window.onurlchange": e ? Gt({value: t}) : void 0});
        })(), p = (() => {
          const e = s(c.grant, Mo), t = e => {
            for (let t = 0; t < c.resources.length; t++) {
              const n = c.resources[t];
              if (n.name == e) {
                if (n.error) Yn.warn("@resource: " + n.error); else try {
                  if ("string" == typeof n.content) return To.decode(n.content);
                } catch (e) {}
                return "";
              }
            }
            return null;
          }, n = e => {
            for (let t = 0; t < c.resources.length; t++) {
              const n = c.resources[t];
              if (n.name == e) {
                if (n.error) Yn.warn("@resource: " + n.error); else if ("string" == typeof n.content) {
                  try {
                    return `data:${n.meta || "application/octet-stream"};base64,${xo.encode(n.content)}`;
                  } catch (e) {}
                  return n.url;
                }
                return "";
              }
            }
            return null;
          };
          return Gt({GM_getResourceText: e ? Gt({value: t}) : void 0, "GM.getResourceText": e ? Gt({get: () => a(t)}) : void 0, GM_getResourceURL: e ? Gt({value: n}) : void 0, "GM.getResourceUrl": e ? Gt({get: () => a(n)}) : void 0});
        })(), f = (() => {
          const e = s(c.grant, bo), t = (e, t) => {
            o.first.send("tabs", Gt({action: "set", uuid: c.uuid, tab: e}), t ? () => t() : null);
          }, n = e => {
            o.first.send("tabs", Gt({action: "get", uuid: c.uuid}), e ? t => {
              e(t || Gt({}));
            } : null);
          }, r = e => {
            o.first.send("tabs", Gt({action: "list", uuid: c.uuid}), e ? t => {
              e(t || Gt({}));
            } : null);
          };
          return Gt({GM_saveTab: e ? Gt({value: t}) : void 0, "GM.saveTab": e ? Gt({get: () => i(t, 1)}) : void 0, GM_getTab: e ? Gt({value: n}) : void 0, "GM.getTab": e ? Gt({get: () => i(n)}) : void 0, GM_getTabs: e ? Gt({value: r}) : void 0, "GM.getTabs": e ? Gt({get: () => i(r)}) : void 0});
        })(), v = (() => {
          const e = s(c.grant, Go), o = e => {
            const o = Qt(e);
            let s = false, a = () => {
              s = true;
            };
            const i = (e, t) => {
              t = t || Gt({}), e && jo(() => {
                pt(t, r), St(e, t, [t]);
              }, 1);
            }, l = o.url;
            "object" == typeof l && l.href && (o.url = l.href);
            const u = (e, t) => {
              const n = Zt(e);
              if ("Blob" === n || "File" === n) {
                const o = e;
                Ao(o).then(e => {
                  t(Gt({type: n, value: e, meta: o.type, name: o.name, lastModified: o.lastModified}));
                });
              } else if ("FormData" === n) {
                const n = e, o = n.keys();
                let r;
                const s = Gt({}), a = [];
                for (; !(r = o.next()).done;) Xt(a, r.value);
                const i = () => {
                  if (a.length) {
                    const e = Ft(a);
                    let t = n.getAll(e);
                    "[]" !== vn(e, -2) && (t = Lt(t, 0)), u(t, t => {
                      s[e] = t, i();
                    });
                  } else t(Gt({type: "FormData", value: s}));
                };
                i();
              } else if ("Array" === n || "Object" === n) {
                const o = e;
                let r, s, a = 0, i = 0;
                if ("Object" === n) {
                  const e = dt(o);
                  s = t => t < e.length ? e[t] : null, r = Gt({});
                } else s = e => e < o.length ? e : null, r = [];
                const l = () => {
                  const e = s(a);
                  null === e ? t(Gt({type: n, value: r})) : u(o[e], t => {
                    r[e] = t, a++, i++ < 1024 ? l() : (i = 0, jo(l, 1));
                  });
                };
                l();
              } else t(Gt({value: e}));
            }, d = (e, t, n, o, r) => {
              let s;
              if (n) "stream" == o && (s = n); else if ("arraybuffer" == o) s = t || Io(e || ""); else if ("blob" == o) s = new Qn.Blob([t || Io(e || "")], Gt({type: r})); else if ("json" == o) s = Pt(e || ""); else {
                if ("document" == o) {
                  const t = new Qn.DOMParser, n = Lt(Jt(r || "text/xml", ";"), 0);
                  return En(t, e || "", n);
                }
                s = e || (t ? (e => {
                  let t = "";
                  const n = new jn(e);
                  for (let e = 0; e < n.length; e += 32687) t += St(fn, null, n.subarray(e, e + 32687));
                  return t;
                })(t) : "");
              }
              return s;
            };
            return (e => {
              if (o.url) {
                const t = vn(o.url, 0, 5);
                if (-1 != Bt(["data:", "blob:"], t)) return e();
              }
              if (!o.data) return e();
              u(o.data, t => {
                o.binary && (t.type = "Blob"), o.data = t, o.data_type = "typified", e();
              });
            })(() => {
              if (s) return s = false, void i(o.onabort);
              let e, r, l, u = oo.connect("xhr"), g = [];
              const {method: p, url: f, headers: v, cookie: m, binary: _, nocache: M, revalidate: b, timeout: h, context: y, responseType: E, overrideMimeType: w, anonymous: S, fetch: G, user: O, password: R, data: L, data_type: C} = o, T = Gt({method: p, url: f, headers: v, cookie: m, binary: _, nocache: M, revalidate: b, timeout: h, responseType: E, overrideMimeType: w, anonymous: S, fetch: G, user: O, password: R, data: L, data_type: C});
              if (T.headers) {
                const e = T.headers;
                Ht(dt(e), t => {
                  "cookie" === bn(t) && (T.cookie = `${e[t]}`, delete e[t]);
                });
              }
              let x, I, A, D;
              u.postMessage(Gt({method: "xhr", details: T, callbacks: Gt({onloadstart: !!o.onloadstart, onload: !!o.onload, ondone: !!o.onloadend, onreadystatechange: !!o.onreadystatechange, onerror: true, onabort: !!o.onabort, ontimeout: !!o.ontimeout, onprogress: !!o.onprogress, onuploadprogress: !(!o.upload || !o.upload.onprogress), onpartial: true}), id: n, url: Qn.location.href, uuid: c.uuid, no_blob: "js" == t.sandboxMode}));
              const P = E ? bn(E) : "";
              let U;
              const $ = async t => {
                if (t && (l || void 0 !== e || void 0 !== r)) {
                  if (w ? D = w : t && (D = (e => {
                    const t = Gt({});
                    return e && Ht(Jt(e, "\n"), e => {
                      const n = Jt(e, ":");
                      if (n.length < 2) return;
                      const o = Lt(n, 0);
                      if (!o) return;
                      const r = Vt(jt(n, 1), ":");
                      t[bn(_n(o))] = _n(r || "");
                    }), t;
                  })(t.responseHeaders)["content-type"]), x = e, l) A = l.stream; else if (r) {
                    const e = r;
                    if (I = e.buffer, -1 == Bt(["blob", "arraybuffer"], P) && !x) {
                      let t;
                      Ut([D, e.type], e => t = ((e, t, n, o) => {
                        const r = mn(e, t);
                        if (-1 == r) return;
                        const s = vn(e, r + t.length), a = mn(s, ";");
                        return -1 == a ? o && o.optionalEnd ? s : void 0 : vn(e, r + t.length, a);
                      })(bn(e || ""), "charset=", 0, Gt({optionalEnd: true})));
                      const n = new qn([I]);
                      U = Ao(n, t), x = await U;
                    }
                    U = void 0;
                  } else U && await U;
                  e = r = void 0;
                }
                if (x || A || I) {
                  t.responseType = E, Ht(["response_data"], e => delete t[e]);
                  const e = Gt({response: () => d(x, I, A, P, D || "binary/octet-stream"), responseText: () => d(x, I, A, "text", D), responseXML: () => d(x, I, A, "document", "text/xml")});
                  Ht(dt(e), n => {
                    vt(t, n, Gt({get() {
                      try {
                        return e[n]();
                      } catch (e) {
                        Yn.warn(`${p}:`, e);
                      }
                    }}));
                  });
                }
              }, k = [], F = async e => {
                e && Xt(k, e);
                {
                  const e = kt(k);
                  e && e();
                }
              };
              "stream" === P && F(async () => {
                l = await Zn(e => {
                  const t = new Qn.ReadableStream(Gt({start: n => {
                    jo(() => e(Gt({stream: t, ctrl: n})), 0);
                  }, cancel: () => {
                    l && (l.canceled || a(), l.canceled = true);
                  }}));
                });
              }), u.onMessage.addListener(t => F(() => (async t => {
                if (t.onpartial) {
                  const n = t.data, o = n, s = o.partial, a = n.nada;
                  if (l) {
                    if (l.canceled) return;
                    const e = gn || ((e, t) => e.enqueue(t));
                    if (void 0 !== s) e(l.ctrl, s); else if (void 0 !== a) {
                      const t = new jn(a.buffer);
                      e(l.ctrl, t);
                    } else Yn.error(`${p}:`, "data message without data?!");
                  } else {
                    let t;
                    s && Xt(g, s), a && (t = a), void 0 !== o.index && o.index !== o.length - 1 || (g.length && (e = Vt(g, ""), g = []), r = t);
                  }
                } else {
                  const e = t.data;
                  if (y && (e.context = y), t.onload) await $(e), i(o.onreadystatechange, e), i(o.onload, e); else if (t.onreadystatechange) await $(e), 4 != e.readyState && i(o.onreadystatechange, e); else if (t.onerror) t.exception && Yn.error(t.exception), i(o.onerror, e); else if (t.onabort) i(o.onabort, e); else if (t.ondone) l && !l.canceled && (pn || (e => e.close()))(l.ctrl), await $(e), i(o.onloadend, e); else if (t.onloadstart) l && await $(e), i(o.onloadstart, e); else if (t.onuploadprogress) o.upload && i(o.upload.onprogress, e); else {
                    const n = Lt(Nt(["onprogress", "ontimeout"], e => !!t[e]), 0) || "onerror";
                    i(o[n], e);
                  }
                }
              })(t))), u.onDisconnect.addListener(() => u = null), a = () => {
                u && u.postMessage(Gt({cancel: true}));
              };
            }), Gt({abort: () => {
              a();
            }});
          }, r = (() => {
            const e = Gt({DONE: Tn, HEADERS_RECEIVED: xn, LOADING: In, OPENED: An, UNSENT: Dn});
            return Ht(["text", "arraybuffer", "blob", "document", "json", "stream"], t => {
              e[`RESPONSE_TYPE_${hn(t)}`] = t;
            }), e;
          })();
          return Ht(dt(r), e => Ot(o, e, r[e])), Gt({GM_xmlhttpRequest: e ? Gt({value: o}) : void 0, "GM.xmlHttpRequest": e ? Gt({get: () => {
            const e = e => l(o, e);
            return Ht(dt(r), t => Ot(e, t, r[t])), e;
          }}) : void 0});
        })(), m = (() => {
          const e = s(c.grant, yo), t = (e, t, r, s) => {
            let a = null;
            const i = ["timeout", "text", "image", "title", "highlight", "silent"], l = Gt({});
            if ("object" == typeof e) {
              const n = e;
              Ht(i, e => {
                l[e] = n[e];
              }), a = n.ondone, s = n.onclick, "function" == typeof t && (a = t);
            } else l.image = r, l.text = e, l.title = t;
            l.text && (l.image = l.image || c.icon64 || c.icon || void 0, l.title = l.title || c.name), l.onclick = s, l.ondone = a || void 0, (e => {
              const {text: t, title: r, image: s, highlight: a, silent: i, timeout: l, onclick: u, ondone: d} = Qt(e), g = Gt({id: n, uuid: c.uuid, text: t, title: r, image: s, highlight: a, silent: i, timeout: l});
              t || a ? o.first.send("notification", g, e => {
                u && e.clicked && u(), d && d(true === e.clicked);
              }) : Yn.warn("GM_notification: neither a message text nor highlight options were given!");
            })(l);
          };
          return Gt({GM_notification: e ? Gt({value: t}) : void 0, "GM.notification": e ? Gt({get: () => (e, n, o, r) => {
            let s;
            return s = "object" == typeof e ? e : Gt({text: e, title: n, image: o, onclick: r}), new Qn.Promise(e => {
              const n = Gt({});
              Ht(dt(s), e => {
                n[e] = s[e];
              });
              const o = n.ondone;
              n.ondone = function (...t) {
                o && St(o, this, t), St(e, this, t);
              }, t(n);
            });
          }}) : void 0});
        })(), _ = (() => {
          let n;
          const o = () => {
            if (!n) {
              const {script: o} = e, {updateURL: r, fileURL: s, grant: a, options: {run_at: i, override: {orig_excludes: l, orig_includes: c, orig_matches: u}}} = o, {version: d, inIncognitoContext: g, isFirstPartyIsolation: p, sandboxMode: f, downloadMode: v} = t, m = Gt({uuid: 1, enabled: 1, hash: 1, fileURL: 1}), _ = r || s, M = Gt({unwrap: false, "run-at": i, excludes: l, includes: c, matches: u, grant: a}), b = Gt({scriptMetaStr: o.header, scriptWillUpdate: !!_, scriptUpdateURL: _, version: d, scriptHandler: "Tampermonkey", sandboxMode: f, isIncognito: g, isFirstPartyIsolation: p, downloadMode: v, script: M});
              Ht(dt(o), e => {
                m[e] || (M[e] = o[e]);
              }), n = b;
            }
            return Pt(Dt(n));
          };
          return Gt({GM_info: Gt({get: o}), "GM.info": Gt({get: o})});
        })(), M = (() => {
          const e = s(c.grant, Co);
          let t = null;
          const n = (e, n) => {
            const o = () => {
              t == r && (t = null), r = null;
            };
            t && t.disconnect();
            let r = t = oo.connect("webRequest");
            return n && r.onMessage.addListener(e => {
              n(e.type, e.message || "ok", e.details);
            }), r.onDisconnect.addListener(o), r.postMessage(Gt({rules: e, uuid: c.uuid})), Gt({abort: () => {
              r && r.disconnect(), o();
            }});
          };
          return Gt({GM_webRequest: e ? Gt({value: n}) : void 0, "GM.webRequest": e ? Gt({get: () => a(n)}) : void 0});
        })(), b = (() => {
          const e = s(c.grant, wo);
          let t = 0;
          const n = Gt({}), o = (e, o, s) => {
            const a = ++t, i = oo.connect("registerMenuCommand");
            return i.onMessage.addListener(e => {
              if ("run" === e.method) {
                const t = e.event, n = t ? t.keyCode ? new Fn("keypress", t) : new Nn("click", e.event) : void 0;
                jo(() => o(n), 1);
              }
            }), i.onDisconnect.addListener(() => {
              r(a);
            }), i.postMessage(Gt({method: "register", name: e, uuid: c.uuid, accessKey: s})), n[a] = i.disconnect, a;
          }, r = e => {
            let t;
            (t = n[e]) && (t(), delete n[e]);
          };
          return Gt({GM_registerMenuCommand: e ? Gt({value: o}) : void 0, "GM.registerMenuCommand": e ? Gt({get: () => a(o)}) : void 0, GM_unregisterMenuCommand: e ? Gt({value: r}) : void 0, "GM.unregisterMenuCommand": e ? Gt({get: () => a(r)}) : void 0});
        })(), h = (() => {
          const e = s(c.grant, fo), t = (e, t) => Gt({action: e, uuid: c.uuid, url: Qn.location.href, details: t}), n = Gt({set: (e, n) => {
            o.first.send("cookie", t("set", e), n ? e => {
              n(e.error);
            } : null);
          }, delete: (e, n) => {
            o.first.send("cookie", t("delete", e), n ? e => {
              n(e.error);
            } : null);
          }, list: (e, n) => {
            o.first.send("cookie", t("list", e), n ? e => {
              n(e.cookies, e.error);
            } : null);
          }});
          return Gt({GM_cookie: e ? Gt({get: () => {
            const e = (e, t, o) => (n[e] || (() => {}))(t, o);
            return Ht(dt(n), t => {
              Ot(e, t, n[t]);
            }), e;
          }}) : void 0, "GM.cookie": e ? Gt({get: () => {
            const e = Gt({});
            return Ht(dt(n), t => {
              e[t] = e => ((e, t) => new Qn.Promise((o, r) => {
                "list" == e ? n[e](t, (e, t) => {
                  t ? r(t) : o(e);
                }) : n[e](t, e => {
                  e ? r(e) : o(void 0);
                });
              }))(t, e);
            }), e;
          }}) : void 0});
        })(), y = (() => {
          const e = s(c.grant, _o), t = (e, t) => {
            const n = "object" == typeof e ? e : Gt({url: e, name: t, headers: void 0, saveAs: void 0, conflictAction: void 0}), o = (e, t) => {
              t = t || Gt({}), e && jo(() => {
                St(e, t, [t]);
              }, 1);
            };
            let {url: r} = n;
            const {name: s, headers: a, saveAs: i, conflictAction: l} = n;
            let u = oo.connect("download");
            return u.onMessage.addListener(e => {
              try {
                e.load ? n.onload && o(n.onload, e.data) : e.progress ? n.onprogress && o(n.onprogress, e.data) : e.timeout ? n.ontimeout && o(n.ontimeout, e.data) : n.onerror && o(n.onerror, e.data);
              } catch (e) {
                Yn.log("env: Error: TM_download - ", e, n);
              }
            }), u.onDisconnect.addListener(() => u = null), Zn(e => {
              e();
            }).then(() => {
              if (!u) return;
              const e = Gt({details: Gt({url: r, name: s || "File.download", headers: a, conflictAction: l, saveAs: i}), uuid: c.uuid});
              u.postMessage(e);
            }), Gt({abort: () => {
              u && u.postMessage(Gt({uuid: c.uuid, cancel: true}));
            }});
          };
          return Gt({GM_download: e ? Gt({value: t}) : void 0, "GM.download": e ? Gt({get: () => e => l(t, e)}) : void 0});
        })(), E = (() => {
          const e = s(c.grant, Eo), t = (e, t) => {
            let n, o, r = false, s = null;
            const a = (() => {
              const e = [];
              return Gt({run: t => {
                if (t && Xt(e, t), n) for (; e.length;) Ft(e)();
              }});
            })();
            let i = oo.connect("openInTab");
            const l = () => {
              i && i.postMessage(Gt({close: true}));
            };
            i.onMessage.addListener(e => {
              e.tabId ? r ? l() : (n = e.tabId, a.run()) : e.name ? o = e.name : e.closed && (r = true, s && (s(), s = null));
            }), i.onDisconnect.addListener(() => i = null), i.postMessage(Gt({method: "openTab", url: e, options: t, uuid: c.uuid}));
            const u = Gt({});
            return ft(u, Gt({close: Gt({value: () => {
              r ? Yn.warn("env: attempt to close already closed tab!") : l();
            }}), focus: Gt({value: () => {
              i && i.postMessage(Gt({focus: true}));
            }}), closed: Gt({get: () => r}), onclose: Gt({get: () => s, set: e => {
              s = e;
            }}), name: Gt({get: () => o, set: e => {
              a.run(() => {
                i && i.postMessage(Gt({name: e}));
              });
            }})})), u;
          };
          return Gt({GM_openInTab: e ? Gt({value: t}) : void 0, "GM.openInTab": e ? Gt({get: () => a(t)}) : void 0});
        })(), w = (() => {
          const e = s(c.grant, Oo);
          return Gt({"window.close": e ? Gt({value: e => {
            o.first.send("closeTab", Gt({uuid: c.uuid}), e ? () => e() : null);
          }}) : void 0});
        })(), S = (() => {
          const e = s(c.grant, Ro);
          return Gt({"window.focus": e ? Gt({value: e => {
            o.first.send("focusTab", Gt({uuid: c.uuid}), e ? () => e() : null);
          }}) : void 0});
        })(), G = (() => {
          const e = s(c.grant, ho), t = function (...e) {
            St(Yn.log, this, e);
          };
          return Gt({GM_log: e ? Gt({value: t}) : void 0, "GM.log": e ? Gt({get: () => a(t)}) : void 0});
        })(), O = ({root: e, tag: t, properties: n, cb: r}) => {
          const s = eo(), a = Gt({tag: t, properties: n, id: s, uuid: c.uuid});
          o.first.send("addElement", a, e, r ? () => r() : null);
          const i = Hn.getElementById(s), l = n ? n.id : void 0;
          return void 0 !== l && On(i, "id", l), i;
        }, R = (() => {
          const e = s(c.grant, po), t = (e, t) => O(Gt({root: void 0, tag: "style", properties: Gt({textContent: e}), cb: t}));
          return Gt({GM_addStyle: e ? Gt({value: t}) : void 0, "GM.addStyle": e ? Gt({get: () => a(t)}) : void 0});
        })(), L = (() => {
          const e = s(c.grant, po), t = (e, t, n, o) => {
            let r, s, a, i;
            return "string" == typeof e ? (s = e, a = t, i = n) : (r = e, s = t, a = n, i = o), a && (a = Gt(a)), O(Gt({root: r, tag: s, properties: a, cb: i}));
          };
          return Gt({GM_addElement: e ? Gt({value: t}) : void 0, "GM.addElement": e ? Gt({get: () => a(t)}) : void 0});
        })(), C = Gt({...L, ...R, ...w, ...h, ...y, ...S, ..._, ...G, ...b, ...m, ...E, ...p, ...u, ...f, ...g, ...d, ...M, ...v});
        return r[e.script.uuid] = r[e.script.uuid] || C, r[e.script.uuid];
      }});
    }, Wo = (e, t, n, o, r, s) => {
      const a = (e, t, n, o, r) => {
        const a = t[n], i = typeof a;
        return o && "string" === i ? t[n] = () => s(a, r) : r && "function" === i && (t[n] = function () {
          return St(a, r, arguments);
        }), St(e, Kn, t);
      };
      let i = true;
      to(() => i = false);
      const l = Gt({}), c = e => !!("object" == typeof e && null !== e ? e.capture : e), u = (e, o, r) => {
        if ("urlchange" != e || !n["window.onurlchange"]) {
          const n = c(r);
          let u, d;
          if (i && ((u = "DOMContentLoaded" == e) || "load" == e)) {
            const r = Sn(Kn.document);
            if (u && ("complete" == r || "interactive" === r) && "document-idle" != t || !u && "complete" == r) return void (async (e, t, n, o) => {
              const r = Gt({attrName: "null", newValue: "null", prevValue: "null", eventPhase: nn, attrChange: tn, target: Kn.document, relatedNode: Kn.document, srcElement: Kn.document});
              await null, n || await null, "load" === e && await null, ((e, t, n, o) => {
                const r = Gt({attrChange: 0, attrName: null, bubbles: true, cancelBubble: false, cancelable: false, clipboardData: void 0, currentTarget: null, defaultPrevented: false, eventPhase: 0, newValue: null, prevValue: null, relatedNode: null, returnValue: true, srcElement: null, target: null, timeStamp: Pn()}), a = "string" == typeof n ? () => s(n, o) : n, i = new Event(e);
                Ht(dt(r), e => {
                  Ot(i, e, r[e]);
                }), Ht(dt(t), e => {
                  Ot(i, e, t[e]);
                }), St(a, o, [i]);
              })(e, r, t, o);
            })(e, o, n, p);
          }
          if ("string" == typeof o || "object" == typeof r && r.once) d = o; else {
            const t = `${e}-${n}`;
            l[t] = l[t] || [];
            Xt(l[t], Gt({listener: o, filter: r})), d = r;
          }
          return a(Qn.addEventListener, [e, d, r], 1, true);
        }
        n["window.onurlchange"].value.register(o);
      }, d = (e, t, o) => {
        if ("urlchange" != e || !n["window.onurlchange"]) {
          const n = c(o), r = `${e}-${n}`, s = l[r] && Nt(l[r], e => e.listener === t);
          if (s && s.length) {
            let t;
            if (Ht(s, n => {
              try {
                a(Qn.removeEventListener, [e, n.filter, o], 1, true);
              } catch (n) {
                t = n;
              }
              const s = Bt(l[r], n);
              l[r] = $t(l[r], s, 1).result;
            }), l[r].length || delete l[r], t) throw t;
            return;
          }
          return a(Qn.removeEventListener, [e, t, o], 1, true);
        }
        n["window.onurlchange"].value.unregister(t);
      }, g = Gt({CDATA: Gt({value: function (e) {
        this.src = e, this.toString = function () {
          return this.src;
        }, this.toXMLString = this.toString;
      }}), uneval: Gt({value: e => {
        try {
          return `\\$1 = ${Dt(e)};`;
        } catch (e) {
          Yn.log(e);
        }
      }}), define: Gt({value: void 0}), module: Gt({value: void 0}), exports: Gt({value: void 0}), setTimeout: Gt({value: (...e) => a(Xo, e, 0, true, p)}), setInterval: Gt({value: (...e) => a(Bo, e, 0, true, p)}), close: (() => {
        const e = n["window.close"];
        return e ? Gt({get: () => Kn == Kn.top ? t => e.value(t) : Qn.close}) : void 0;
      })(), focus: (() => {
        const e = n["window.focus"];
        return e ? Gt({get: () => t => e.value(t)}) : void 0;
      })(), onurlchange: n["window.onurlchange"] ? (() => {
        let e = null;
        return Gt({get: () => e, set: t => {
          e && d("urlchange", e), e = t, u("urlchange", e);
        }});
      })() : void 0, location: Gt({set: e => {
        Qn.location.href = e;
      }}), name: Gt({get: () => Kn.name, set: e => {
        Kn.name = e;
      }}), clearInterval: Gt({get: () => qo}), clearTimeout: Gt({get: () => Vo}), addEventListener: Gt({value: u}), removeEventListener: Gt({value: d}), console: Gt({get: () => ao})});
      if (!e) {
        const e = Gt({window: Gt({get: () => p}), globalThis: Gt({get: () => p}), cloneInto: Gt({value: e => e}), exportFunction: Gt({value: (e, t, n) => (n && void 0 !== n.defineAs && (t[n.defineAs] = e), e)}), createObjectIn: Gt({value: (e, t) => {
          const n = Gt({});
          return t && void 0 !== t.defineAs && (e[t.defineAs] = n), n;
        }}), undefined: Gt({get: () => {}})});
        pt(g, e);
      }
      o && pt(g, o);
      const p = r(g);
      return p;
    };
    let Jo;
    (async () => {
      const n = e.contextId;
      let o;
      const {fSend: r, fOnMessage: s, cloneInto: a, pageWindow: i} = e;
      o = r && s ? (({sendPrefix: e, listenPrefix: t, send: n, onMessage: o}) => {
        if (void 0 === n || void 0 === o) throw "invalid args";
        let r, s, a = 1;
        const i = Gt({}), l = e => {
          e && (r = e);
        }, c = e => {
          const t = ++a;
          return i[a] = e, t;
        };
        o((o, a) => o == `${t}_${r}` ? (t => {
          const {m: o, r: a, a: l} = t;
          if ("message.response" == o) {
            if (null == a) throw "Invalid Message";
            ((e, t) => {
              let n;
              e && (n = i[e]) && (n(t), delete i[e]);
            })(a, l);
          } else if (s) {
            const i = a ? t => {
              n(`${e}_${r}`, Gt({m: "message.response", a: t, r: a}));
            } : () => {};
            s(Gt({method: o, args: l, node: "MutationEvent" === Zt(t) ? Ln(t) : void 0}), i);
          }
        })(a) : null);
        const u = Gt({init: async e => {
          r ? l() : l(e);
        }, refresh: () => null, switchId: e => {
          r && u.cleanup(), l(e);
        }, send: (t, o, s, a) => {
          let i, l;
          "function" != typeof s && null !== s ? (i = s, l = a) : l = s, n(`${e}_${r}`, Gt({m: t, a: o, r: l ? c(l) : null, n: i}));
        }, sendToId: (t, o, r) => {
          n(`${e}_${t}`, Gt({m: o, a: r, r: null}));
        }, setMessageListener: e => {
          s = e;
        }, cleanup: () => null});
        return u;
      })(Gt({sendPrefix: "2U", listenPrefix: "2S", send: r, onMessage: s})) : (({sendPrefix: e, listenPrefix: n, cloneInto: o}) => {
        let r, s, a, i = 1;
        const l = Gt({});
        let c = false, u = [];
        const d = e => {
          const t = ++i;
          return l[i] = e, t;
        }, g = (e, t) => {
          const {m: n, a: r, r: s, n: a} = t, i = ((e, t, n) => {
            let r;
            var s;
            return n ? (r = no("MutationEvent"), en(r, e, false, false, n || null, void 0, void 0, Dt(t), tn)) : r = new kn(e, Gt({detail: (s = t, o ? o(s, Kn.document) : s)})), r;
          })(e, Gt({m: n, a: r, r: s}), a);
          St(Ue, Kn, [i]);
        }, p = t => {
          const {m: n, r: o, a: i} = Qt("CustomEvent" == Zt(d = t) ? Cn(d) : At(Rn(d)));
          var d;
          if ("bridge.onpurge" == n) to(() => {
            a !== Kn.document.documentElement && m.refresh();
          }); else if ("unlock" == n) {
            c = false;
            const e = u;
            u = [], Ht(e, e => e());
          } else if ("message.response" == n) {
            if (null == o) throw "Invalid Message";
            ((e, t) => {
              let n;
              e && (n = l[e]) && (n(t), delete l[e]);
            })(o, i);
          } else if (r) {
            const a = o ? t => {
              g(`${e}_${s}`, Gt({m: "message.response", a: t, r: o}));
            } : () => {};
            r(Gt({method: n, args: i, node: "MutationEvent" === Zt(t) ? Ln(t) : void 0}), a);
          }
        }, f = e => {
          e && (s = e), s && (a = Kn.document.documentElement, Qn.addEventListener(`${n}_${s}`, p, true));
        };
        let v = () => {};
        const m = Gt({init: async n => {
          s ? f() : f(n), await function () {
            let e;
            return e = void 0, Zn(t => {
              const n = Sn(Kn.document);
              "interactive" == n || "complete" == n ? (e && e(), t()) : Qn.addEventListener("DOMContentLoaded", () => {
                e && e(), t();
              }, Gt({capture: true, once: true}));
            });
          }(), t ? (a = Kn.document.documentElement, v = () => {
            a !== Kn.document.documentElement && (m.refresh(), g(`${e}_${s}`, Gt({m: "unlock", a: void 0, r: null})));
          }) : Zn(e => {
            if (t) throw "not supported";
            {
              const t = new Vn(n => {
                Ut(n, e => ((e, t) => {
                  for (let n = 0, o = e.length; n < o; n++) if (Lt(e, n) === t) return true;
                  return false;
                })(e.addedNodes, Kn.document.documentElement)) && (e(Kn.document), t.disconnect());
              });
              t.observe(Kn.document, Gt({childList: true}));
            }
          }).then(() => {
            c = true, m.send("bridge.onpurge"), m.refresh();
          });
        }, refresh: () => {
          const e = s;
          e && (m.cleanup(), m.init(e));
        }, switchId: e => {
          s && m.cleanup(), f(e);
        }, send: (n, o, r, a) => {
          let i, l;
          "function" != typeof r && null !== r ? (i = r, l = a) : l = r, t && v();
          const p = () => g(`${e}_${s}`, Gt({m: n, a: o, r: l ? d(l) : null, n: i}));
          c ? Xt(u, p) : p();
        }, sendToId: (t, n, o) => {
          g(`${e}_${t}`, Gt({m: n, a: o, r: null}));
        }, setMessageListener: e => {
          r = e;
        }, cleanup: () => {
          s && (Qn.removeEventListener(`${n}_${s}`, p, true), a = void 0, s = void 0);
        }});
        return m;
      })(Gt({sendPrefix: "2C", listenPrefix: "2P"})), e.bridges.first = o;
      const l = pt(e.console, so);
      o.init(n);
      const c = Gt({});
      o.setMessageListener(({method: t, args: n}) => {
        if ("commid" == t) o.switchId(n.id); else if ("setForeignAttr" == t) Kn[n.attr] = n.value; else if ("script" == t) {
          const {id: t, flags: o, bundle: r} = n, {script: s} = r, {name: a, uuid: i, options: {run_at: l}} = s;
          g(t, t => {
            const n = () => St(t, ((t, n, o, r) => {
              const {pageWindow: s} = e, a = s || Kn, {script: i} = t, l = i.options.compat_powerful_this, c = -1 !== Bt(i.grant, "none");
              Jo = Jo || Ho(n);
              const u = Jo.of(t), d = e => Gt({p: f, r: St, s: e}), g = Gt({seed: Gt({get: () => d(m), once: true})}), p = Gt({}), f = Gt({GM: p}), v = a && a;
              l && (Ot(g, "GM", Gt({value: p})), Ot(g, "unsafeWindow", Gt({value: v}))), c || (f.unsafeWindow = v), Ht(dt(u), e => {
                const t = vn(e, 0, 3), n = u[e];
                if (void 0 !== n) if ("GM_" === t) f[e] = void 0 !== n.get ? n.get() : n.value, l && Ot(g, e, n); else if ("GM." === t) {
                  const t = Kt(e, 3);
                  vt(p, t, n);
                }
              });
              const m = c ? d(l ? f : Gt({})) : Wo(c, i.options.run_at, u, g, o, r);
              return m;
            })(r, o, u, p), []);
            "document-start" == l || "context-menu" == l ? n() : c[i] = n;
          });
        } else if ("port.message" == t) oo.message(n, o); else if ("external.connect" == t) (t => {
          const {bridges: n} = e, o = Kn, r = Rt(o, "external");
          if (!r) return;
          const s = t ? e => t(e, o, Gt({cloneFunctions: true})) : e => e, a = (e, t) => {
            n.first.send("external.message", e, t);
          };
          try {
            const e = () => {
              const e = Gt({getVersion: e => {
                a(Gt({method: "getVersion"}), t => e(s(t)));
              }, openOptions: (e, t) => {
                a(Gt({method: "openOptions", params: e}), t);
              }, isInstalled: (e, t, n) => {
                "function" == typeof t && (n = t, t = null), a(Gt({method: "isInstalled", script: Gt({name: e, namespace: t})}), e => n(s(e)));
              }});
              return s(e);
            };
            ft(r, Gt({Tampermonkey: Gt({value: e(), configurable: true})}));
          } catch (e) {}
        })(a); else if ("run" == t) {
          const {uuid: e} = n, t = Rt(c, e);
          t ? (t(), delete c[e]) : l.warn(`env: missing script "${e}"!`);
        }
      });
      const {createProxy: u} = ((e, t) => {
        const n = (e => {
          let t = Gt({});
          const n = (e, o, r) => {
            const s = Mt(e);
            s && s === o || (null != s && --r >= 0 && n(s, e, r), t = pt(t, bt(e)));
          };
          return n(e, null, 5), t;
        })(Kn);
        Ht(go, e => delete n[e]);
        const o = n;
        return Gt({createProxy: n => {
          let r = o;
          const s = e => {
            let t, n;
            const o = (t = _t(p, e)) || (n = r[e]);
            return Gt({d: o ? Gt(o) : o, l: !!t, w: !!n});
          }, a = e => {
            if (!l(e)) return false;
            if ("length" === e) return true;
            const t = yt($n(e));
            return t >= 0 && t <= rn && e === `${t}`;
          }, i = e => "on" === vn(e, 0, 2), l = e => "string" == typeof e, c = (e, n) => {
            const o = vn(e, 2), r = g[o];
            if (r && (t.removeEventListener(o, r), delete g[o]), n && (e => "function" == typeof e)(n)) {
              const e = (...e) => St(n, t, e);
              t.addEventListener(o, e), g[o] = e;
            }
          }, u = t => void 0 !== t && (t === e || t === Kn || t === zn), d = Gt({addEventListener: true, alert: true, atob: true, blur: true, btoa: true, cancelAnimationFrame: true, cancelIdleCallback: true, captureEvents: true, clearInterval: true, clearTimeout: true, close: true, confirm: true, createImageBitmap: true, dispatchEvent: true, dump: true, fetch: true, find: true, focus: true, getComputedStyle: true, getDefaultComputedStyle: true, getSelection: true, matchMedia: true, moveBy: true, moveTo: true, open: true, openDatabase: true, postMessage: true, print: true, prompt: true, queueMicrotask: true, releaseEvents: true, removeEventListener: true, reportError: true, requestAnimationFrame: true, requestIdleCallback: true, resizeBy: true, resizeTo: true, scroll: true, scrollBy: true, scrollByLines: true, scrollByPages: true, scrollTo: true, setInterval: true, setResizable: true, setTimeout: true, sizeToContent: true, stop: true, structuredClone: true, updateCommands: true, webkitCancelAnimationFrame: true, webkitRequestAnimationFrame: true, webkitRequestFileSystem: true, webkitResolveLocalFileSystemURL: true});
          Ht(dt(d), e => {
            n[e] = n[e] || Gt({bind: true});
          });
          const g = Gt({}), p = Gt({});
          Ot(p, yn, "Window");
          const f = new Un(p, Gt({defineProperty: (e, t, o) => {
            const {d: r, l: u} = s(t), d = Gt(o);
            return r && !r.configurable && (!!r.configurable != !!d.configurable || !!r.enumerable != !!r.enumerable) || a(t) ? (vt(u ? p : Kn, t, d), false) : (vt(p, t, d), l(t) && i(t) && c(t), delete n[t], true);
          }, deleteProperty: (e, t) => {
            let {d: a, l: u, w: d} = s(t);
            return !(!a || !a.configurable) && (u && (u = delete p[t], l(t) && i(t) && c(t)), (d || (a = r[t]) && a.configurable) && (o === r && (r = pt(Gt({}), o)), d = delete r[t]), delete n[t], u || d);
          }, get: (e, t) => {
            const o = n[t];
            if (o) {
              if (o.once && delete n[t], "value" in o) return o.value;
              if (o.get) return o.get();
            }
            const {d: r, l: i} = a(t) ? Gt({d: _t(Kn, t), l: false}) : s(t);
            if (r) {
              let e;
              const n = "value" in r ? Rt(r, "value") : (e = Rt(r, "get")) && "function" == typeof e ? i ? e() : It(e, Kn)() : void 0;
              return n && o && o.bind ? It(n, Kn) : i || "event" == t ? n : u(n) || "globalThis" === t ? f : n;
            }
          }, getOwnPropertyDescriptor: (e, t) => {
            let {d: o, l: r} = s(t);
            if (!o) {
              const e = n[t];
              if (e) return Gt({enumerable: true, configurable: true, writable: true, value: e.value, set: e.set, get: e.get});
              if (!a(t)) return;
              o = _t(Kn, t), r = false;
            }
            const i = pt(Gt({}), o);
            if (u(i.value) && (i.value = f), !r) {
              const e = i.get;
              e && (i.get = () => {
                const t = It(e, Kn)();
                return u(t) ? f : t;
              }), i && !i.configurable && vt(p, t, i);
            }
            return i;
          }, has: (e, t) => t in p || t in n || t in r, ownKeys: () => {
            const e = e => !(e in r), t = dt(r), n = Nt(dt(bt(p)), e), o = Gt({});
            for (let e = 0; "Window" === Zt(Lt(Kn, e)); e += 1) o[e] = true;
            const s = Nt(dt(o), e);
            return qt(t, n, s);
          }, preventExtensions: () => true, set: (e, t, o) => {
            const r = n[t];
            if (r && r.set) return r.set(o), true;
            const {d: u} = s(t);
            return !(u && !u.writable && !Rt(u, "set") || a(t) || (delete n[t], Ot(p, t, o), l(t) && i(t) && c(t, o), 0));
          }}));
          return f;
        }});
      })(i, Qn), d = e => {
        o.send("csp", Gt({src: e}));
      }, g = async (e, t) => {
        vt(zn, e, Gt({set: n => {
          delete zn[e];
          const o = wn(Kn.document);
          return o && Gn(o), t(n);
        }, configurable: true, enumerable: false})), to(() => delete zn[e]);
      }, p = (e, t) => t ? ((e, t) => {
        const n = `__p__${eo()}`;
        (async (e, t) => {
          g(e, e => St(e, t, []));
        })(n, t), d('window["' + n + '"] = function(){' + e + "};"), delete zn[n];
      })(e, t) : d(e);
    })();
  })();
};

