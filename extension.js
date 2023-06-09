(() => {
  function e(r) {
    var i = n[r];
    if (void 0 !== i) return i.exports;
    var o = n[r] = {exports: {}};
    return t[r](o, o.exports, e), o.exports;
  }
  var t = {2672: e => {
    e.exports = {meta: {type: "suggestion", docs: {description: "aligns attributes in the metadata", category: "Stylistic Issues"}, schema: [{type: "integer", minimum: 1, default: 2}], messages: {spaceMetadata: "The metadata is not spaced"}, fixable: "code"}, create: e => {
      const t = e.options[0] || 2, n = e.getSourceCode(), r = n.getAllComments();
      let i = false, o = false, s = [], a = {}, l = {};
      for (const e of r.filter(e => "Line" === e.type)) o || (i && "==/UserScript==" === e.value.trim() ? (l = e.loc.end, o = true) : i || "==UserScript==" !== e.value.trim() ? i && e.value.trim().startsWith("@") && s.push({key: e.value.trim().slice(1).split(/\s/)[0], space: /^\S*(\s+)/.exec(e.value.trim().slice(1))[1].length, line: e.loc.start.line, comment: e}) : (a = e.loc.start, i = true));
      if (0 === Object.keys(l).length && (l = n.getLocFromIndex(n.getText().length)), 0 === s.length) return {};
      const d = Math.max(...s.map(e => e.key.length)) + t;
      return (s.map(e => e.space).sort()[0] < t || s.map(e => e.key.length + e.space).find(e => e !== d)) && e.report({loc: {start: a, end: l}, messageId: "spaceMetadata", fix: function (e) {
        const t = [];
        for (const r of s) if (r.key.length + r.space !== d) {
          const i = /^(.*?@\S*)/.exec(n.getLines()[r.line - 1])[1].length;
          t.push(e.replaceTextRange([n.getIndexFromLoc({line: r.line, column: i}), n.getIndexFromLoc({line: r.line, column: i + r.space})], " ".repeat(d - r.key.length)));
        }
        return t;
      }}), {};
    }};
  }, 2162: (e, t, n) => {
    const r = n(2598);
    e.exports = r("include", false, ({attrVal: e, context: t}) => {
      t.report({loc: {start: {line: e.loc.start.line, column: 0}, end: e.loc.end}, messageId: "betterUseMatch"});
    }, {betterUseMatch: "Using @include is potentially unsafe and may be obsolete in Manifest v3 in early 2023. Please switch to @match."});
  }, 8039: e => {
    e.exports = {meta: {type: "suggestion", docs: {description: "ensure userscripts end with .user.js", category: "Best Practices"}, schema: [{enum: ["always", "never"]}], messages: {filenameExtension: "Rename '{{ oldFilename }}' to '{{ newFilename }}'"}}, create: e => {
      const t = e.getFilename();
      return "<input>" === t || "<text>" === t ? {} : {Program() {
        (!t.endsWith(".user.js") && (!e.options[0] || "always" === e.options[0]) || t.endsWith(".user.js") && "never" === e.options[0]) && e.report({loc: {column: 0, line: 1}, messageId: "filenameExtension", data: {newFilename: t.replace("always" === e.options[0] ? /.js$/ : /.user.js$/, "always" === e.options[0] ? ".user.js" : ".js"), oldFilename: t}});
      }};
    }};
  }, 70: (e, t, n) => {
    const r = n(2598), i = ["addElement", "addStyle", "addValueChangeListener", "cookie", "deleteValue", "download", "getResourceText", "getResourceURL", "getTab", "getTabs", "getValue", "info", "listValues", "log", "notification", "openInTab", "registerMenuCommand", "removeValueChangeListener", "saveTab", "setClipboard", "setValue", "unregisterMenuCommand", "xmlhttpRequest"].map(e => `GM_${e}`), o = ["addElement", "addStyle", "addValueChangeListener", "cookie", "deleteValue", "download", "getResourceText", "getResourceUrl", "getTab", "getTabs", "getValue", "info", "listValues", "log", "notification", "openInTab", "registerMenuCommand", "removeValueChangeListener", "saveTab", "setClipboard", "setValue", "unregisterMenuCommand", "xmlHttpRequest"].map(e => `GM.${e}`), s = new Set([...i, ...o, "none", "unsafeWindow", "window.close", "window.focus", "window.onurlchange"]);
    e.exports = r("grant", false, ({attrVal: e, context: t}) => {
      const n = e.val;
      s.has(n) || t.report({loc: {start: {line: e.loc.start.line, column: 0}, end: e.loc.end}, messageId: "grantHasInvalidArgument", data: {argument: n}});
    }, {grantHasInvalidArgument: "'{{ argument }}' is not a valid @grant argument"});
  }, 8754: (e, t, n) => {
    const r = n(2598), i = new Set(["antifeature", "author", "connect", "contributor", "contributors", "copyright", "defaulticon", "description", "developer", "downloadURL", "exclude", "grant", "history", "homepage", "homepageURL", "icon", "icon64", "icon64URL", "iconURL", "include", "license", "match", "name", "namespace", "nocompat", "noframes", "require", "resource", "run-at", "sandbox", "source", "supportURL", "unwrap", "updateURL", "version", "website"].map(e => `@${e}`)), o = ["name", "description", "antifeature"].map(e => new RegExp(`^@${e}(:\\S+)?$`));
    e.exports = r("headers", false, ({attrVal: e, context: t}) => {
      const n = t.options[0], r = new Set((n && n.allowed || []).map(e => `@${e}`));
      for (const n of e) {
        const e = `@${n.key}`;
        i.has(e) || r.has(e) || o.some(t => t.test(e)) || t.report({loc: {start: {line: n.loc.start.line, column: 0}, end: n.loc.end}, messageId: "invalidHeader", data: {header: e}});
      }
    }, {invalidHeader: "'{{ header }}' is not a valid userscript header"}, false, /./, true, [{type: "object", properties: {allowed: {type: "array"}}, additionalProperties: false}]);
  }, 1763: e => {
    e.exports = {meta: {type: "suggestion", docs: {description: "ensure userscripts have valid metadata", category: "Possible Errors"}, messages: {metadataRequired: "Add metadata to the userscript", moveMetadataToTop: "Move the metadata to the top of the file", noClosingMetadata: "Closing metadata comment not found", noCodeBetween: "Code found between in metadata", attributeNotStartsWithAtTheRate: "Attributes should begin with @"}, schema: [{type: "object", properties: {top: {enum: ["required", "optional"], default: "required"}}, additionalProperties: false}]}, create: e => {
      const t = e.getSourceCode(), n = t.getAllComments(), r = t.lines;
      let i = false, o = false;
      for (const [t, n] of r.entries()) {
        if (o) continue;
        const r = {start: {line: t + 1, column: 0}, end: {line: t + 1, column: n.length}};
        i && !n.trim().startsWith("//") && n.trim() ? e.report({loc: r, messageId: "noCodeBetween"}) : i && n.trim().startsWith("//") && "==/UserScript==" === n.trim().slice(2).trim() ? o = true : !i && n.trim().startsWith("//") && "==UserScript==" === n.trim().slice(2).trim() ? i = true : i && !n.trim().slice(2).trim().startsWith("@") && n.trim().slice(2).trim() && e.report({loc: r, messageId: "attributeNotStartsWithAtTheRate"});
      }
      return {Program(t) {
        0 !== n.length && n.find(e => "==UserScript==" === e.value.trim() && "Line" === e.type) ? (n.find(e => "==/UserScript==" === e.value.trim() && "Line" === e.type) || e.report({loc: n.find(e => "==UserScript==" === e.value.trim() && "Line" === e.type).loc, messageId: "noClosingMetadata"}), e.options[0] && e.options[0].top && "required" !== e.options[0].top || "==UserScript==" === n[0].value.trim() && 1 === n[0].loc.start.line || e.report({loc: n.find(e => "==UserScript==" === e.value.trim() && "Line" === e.type).loc, messageId: "moveMetadataToTop"})) : e.report({node: t, messageId: "metadataRequired"});
      }};
    }};
  }, 4350: e => {
    e.exports = {meta: {type: "suggestion", docs: {description: "ensure atributes are prefixed by one space", category: "Possible Errors"}, messages: {attributeNotPrefixedBySpace: "Attributes should be prefixed by one space"}, schema: []}, create: e => {
      const t = e.getSourceCode().lines;
      let n = false, r = false;
      for (const [i, o] of t.entries()) {
        if (r) continue;
        const t = o.trim();
        n && t.startsWith("//") && "==/UserScript==" === t.slice(2).trim() ? r = true : !n && t.startsWith("//") && "==UserScript==" === t.slice(2).trim() ? n = true : n && t.slice(2).trim().startsWith("@") && t.startsWith("//") && (!t.startsWith("// ") || t.startsWith("//  ")) && e.report({loc: {start: {line: i + 1, column: 0}, end: {line: i + 1, column: o.length}}, messageId: "attributeNotPrefixedBySpace"});
      }
      return {};
    }};
  }, 230: (e, t, n) => {
    const r = n(2598);
    e.exports = r("description", true, ({attrVal: e, context: t}) => {
      let n = [];
      for (let r of e) n.includes(r.key) ? t.report({loc: r.loc, messageId: "multipleDescriptions"}) : n.push(r.key);
    }, {multipleDescriptions: "Include only one description for each language"}, false, /^description(:\S+)?$/, true);
  }, 8295: (e, t, n) => {
    const r = n(2598), i = /^name(:\S+)?$/;
    e.exports = r("name", true, ({attrVal: e, context: t, metadata: n}) => {
      let r = [];
      for (let n of e) r.includes(n.key) ? t.report({loc: n.loc, messageId: "multipleNames"}) : r.push(n.key);
      const o = Object.values(n);
      if (o.find((e, t) => 0 !== t && i.test(e[0] ? e[0].key : e.key) && !i.test(o[t - 1][0] ? o[t - 1][0].key : o[t - 1].key))) {
        const n = t.getSourceCode(), r = n.getAllComments(), i = r.find(e => "==/UserScript==" === e.value.trim() && "Line" === e.type);
        t.report({loc: {start: r.find(e => "==UserScript==" === e.value.trim() && "Line" === e.type).loc.start, end: i ? i.loc.end : {line: n.lines.length, column: 0}}, messageId: "nameAtBeginning", fix: function (n) {
          let r = [];
          for (let i of e) {
            Array.isArray(i) || (i = [i]);
            for (let e of i) r.push(n.removeRange(e.comment.range.map((n, r) => 0 === r ? n - t.getSourceCode().lines[e.loc.start.line - 1].split("//")[0].length - 1 : n)));
          }
          return r.push(n.insertTextAfterRange(t.getSourceCode().getAllComments().find(e => "==UserScript==" === e.value.trim()).range, e.sort((e, t) => "name" === e.key ? -1 : "name" === t.key ? 1 : 0).map(e => `\n${t.getSourceCode().lines[e.loc.start.line - 1].split("//")[0]}//${e.comment.value}`).join(""))), r;
        }});
      }
    }, {multipleNames: "Include only one name for each language", nameAtBeginning: "The names should be at the beginning of the metadata"}, true, i, true);
  }, 3880: (e, t, n) => {
    const r = n(2598);
    e.exports = r("version", true, ({attrVal: e, index: t, context: n}) => {
      t > 0 && n.report({loc: e.loc, messageId: "multipleVersions"}), /^([\dA-Za-z-]+)(\.[\dA-Za-z-]+)*\s*$/.test(e.val) || n.report({loc: {start: {line: e.loc.start.line, column: /^(\s*\/\/\s*)/.exec(n.getSourceCode().lines[e.comment.loc.start.line])[1].length - 1}, end: e.loc.end}, messageId: "invalidVersion"});
    }, {multipleVersions: "Include only one version", invalidVersion: "Invalid version"});
  }, 2215: (e, t, n) => {
    const r = n(2598), i = ["downloadURL", "updateURL"];
    e.exports = r(i, false, ({attrVal: e, metadata: t, context: n, keyName: r}) => {
      const o = i.find(e => e !== r);
      t[o] || n.report({loc: e.loc, messageId: "missingAttribute", data: {attribute: o}, fix: function (t) {
        return t.insertTextAfterRange(e.comment.range, `\n${n.getSourceCode().lines[e.comment.loc.start.line - 1].replace(/^(\s*\/\/\s*@)\S*/, "$1" + o)}`);
      }});
    }, {missingAttribute: "Didn't find attribute '{{ attribute }}' in the metadata"}, true);
  }, 1933: (e, t, n) => {
    const r = n(2598), i = ["homepage", "homepageURL"];
    e.exports = r(i, false, ({attrVal: e, metadata: t, context: n, keyName: r}) => {
      const o = i.find(e => e !== r);
      t[o] || n.report({loc: e.loc, messageId: "missingAttribute", data: {attribute: o}, fix: function (t) {
        return t.insertTextAfterRange(e.comment.range, `\n${n.getSourceCode().lines[e.comment.loc.start.line - 1].replace(/^(\s*\/\/\s*@)\S*/, "$1" + o)}`);
      }});
    }, {missingAttribute: "Didn't find attribute '{{ attribute }}' in the metadata"}, true);
  }, 2598: e => {
    e.exports = function (e, t, n = false, r = {}, i = false, o = new RegExp("^(" + ("string" == typeof e ? e : e.join("|")) + ")$"), s = false, a) {
      return "string" == typeof e && (e = [e]), {meta: {type: "suggestion", docs: {description: `${t ? "require " + (n ? "and validate " : "") : "validate "}${e.join(" and ")} in the metadata for userscripts`, category: "Best Practices"}, schema: t ? [{enum: ["required", "optional"], default: "required"}] : a || void 0, messages: {missingAttribute: `Didn't find attribute '${e}' in the metadata`, ...r}, fixable: i ? "code" : void 0}, create: e => {
        const r = e.getSourceCode().getAllComments();
        let i = false, a = false, l = false, d = {};
        for (const e of r.filter(e => "Line" === e.type)) if (!l) if (i && "==/UserScript==" === e.value.trim()) l = true; else if (i || "==UserScript==" !== e.value.trim()) {
          if (i && e.value.trim().startsWith("@")) {
            const t = e.value.trim().slice(1).split(/[ \t]/)[0], n = {val: e.value.trim().slice(1).split(/[ \t]/).slice(1).join(" ").trim(), loc: e.loc, comment: e, key: t};
            if (d[t]) {
              Array.isArray(d[t]) || (d[t] = [d[t]]), d[t].push(n);
              continue;
            }
            d[t] = n;
          }
        } else i = true, a = true;
        const A = Object.keys(d);
        if (!t || !a || e.options[0] && "required" !== e.options[0] || A.find(e => o.test(e))) {
          if (n && A.find(e => o.test(e))) if (s) {
            const t = [];
            for (const e in A) o.test(A[e]) && t.push(+e);
            const r = t.map(e => d[A[e]]).reduce((e, t) => Array.isArray(t) ? [...e, ...t] : [...e, t], []);
            n({attrVal: r, index: [...r.keys()], indexMatch: t.reduce((e, t) => Array.isArray(d[A[t]]) ? [...e, ...d[A[t]].map(() => A)] : [...e, t], []), metadata: d, context: e, keyName: t.map(e => A[e])});
          } else for (const t in A) if (o.test(A[t])) if (Array.isArray(d[A[t]])) for (const [r, i] of d[A[t]].entries()) n({attrVal: i, index: r, indexMatch: t, metadata: d, context: e, keyName: A[t]}); else n({attrVal: d[A[t]], index: 0, indexMatch: t, metadata: d, context: e, keyName: A[t]});
        } else e.report({loc: r.find(e => "==UserScript==" === e.value.trim() && "Line" === e.type).loc, messageId: "missingAttribute"});
        return {};
      }};
    };
  }, 2462: (e, t, n) => {
    e.exports = function e(t, n, r) {
      function i(s) {
        if (!n[s]) {
          if (!t[s]) {
            if (o) return o(s, true);
            var a = new Error("Cannot find module '" + s + "'");
            throw a.code = "MODULE_NOT_FOUND", a;
          }
          var l = n[s] = {exports: {}};
          t[s][0].call(l.exports, function (e) {
            return i(t[s][1][e] || e);
          }, l, l.exports, e, t, n, r);
        }
        return n[s].exports;
      }
      for (var o = void 0, s = 0; s < r.length; s++) i(r[s]);
      return i;
    }({1: [function (e, t, n) {
      "use strict";
      var r = e("./utils"), i = e("./support"), o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      n.encode = function (e) {
        for (var t, n, i, s, a, l, d, A = [], c = 0, u = e.length, h = u, p = "string" !== r.getTypeOf(e); c < e.length;) h = u - c, p ? (t = e[c++], n = c < u ? e[c++] : 0, i = c < u ? e[c++] : 0) : (t = e.charCodeAt(c++), n = c < u ? e.charCodeAt(c++) : 0, i = c < u ? e.charCodeAt(c++) : 0), s = t >> 2, a = (3 & t) << 4 | n >> 4, l = h > 1 ? (15 & n) << 2 | i >> 6 : 64, d = h > 2 ? 63 & i : 64, A.push(o.charAt(s) + o.charAt(a) + o.charAt(l) + o.charAt(d));
        return A.join("");
      }, n.decode = function (e) {
        var t, n, r, s, a, l, d = 0, A = 0, c = "data:";
        if (e.substr(0, c.length) === c) throw new Error("Invalid base64 input, it looks like a data url.");
        var u, h = 3 * (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "")).length / 4;
        if (e.charAt(e.length - 1) === o.charAt(64) && h--, e.charAt(e.length - 2) === o.charAt(64) && h--, h % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
        for (u = i.uint8array ? new Uint8Array(0 | h) : new Array(0 | h); d < e.length;) t = o.indexOf(e.charAt(d++)) << 2 | (s = o.indexOf(e.charAt(d++))) >> 4, n = (15 & s) << 4 | (a = o.indexOf(e.charAt(d++))) >> 2, r = (3 & a) << 6 | (l = o.indexOf(e.charAt(d++))), u[A++] = t, 64 !== a && (u[A++] = n), 64 !== l && (u[A++] = r);
        return u;
      };
    }, {"./support": 30, "./utils": 32}], 2: [function (e, t) {
      "use strict";
      function n(e, t, n, r, i) {
        this.compressedSize = e, this.uncompressedSize = t, this.crc32 = n, this.compression = r, this.compressedContent = i;
      }
      var r = e("./external"), i = e("./stream/DataWorker"), o = e("./stream/DataLengthProbe"), s = e("./stream/Crc32Probe");
      o = e("./stream/DataLengthProbe"), n.prototype = {getContentWorker: function () {
        var e = new i(r.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new o("data_length")), t = this;
        return e.on("end", function () {
          if (this.streamInfo.data_length !== t.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
        }), e;
      }, getCompressedWorker: function () {
        return new i(r.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
      }}, n.createWorkerFrom = function (e, t, n) {
        return e.pipe(new s).pipe(new o("uncompressedSize")).pipe(t.compressWorker(n)).pipe(new o("compressedSize")).withStreamInfo("compression", t);
      }, t.exports = n;
    }, {"./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27}], 3: [function (e, t, n) {
      "use strict";
      var r = e("./stream/GenericWorker");
      n.STORE = {magic: "", compressWorker: function () {
        return new r("STORE compression");
      }, uncompressWorker: function () {
        return new r("STORE decompression");
      }}, n.DEFLATE = e("./flate");
    }, {"./flate": 7, "./stream/GenericWorker": 28}], 4: [function (e, t) {
      "use strict";
      var n = e("./utils"), r = function () {
        for (var e, t = [], n = 0; n < 256; n++) {
          e = n;
          for (var r = 0; r < 8; r++) e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
          t[n] = e;
        }
        return t;
      }();
      t.exports = function (e, t) {
        return void 0 !== e && e.length ? "string" !== n.getTypeOf(e) ? function (e, t, n) {
          var i = r, o = 0 + n;
          e ^= -1;
          for (var s = 0; s < o; s++) e = e >>> 8 ^ i[255 & (e ^ t[s])];
          return -1 ^ e;
        }(0 | t, e, e.length) : function (e, t, n) {
          var i = r, o = 0 + n;
          e ^= -1;
          for (var s = 0; s < o; s++) e = e >>> 8 ^ i[255 & (e ^ t.charCodeAt(s))];
          return -1 ^ e;
        }(0 | t, e, e.length) : 0;
      };
    }, {"./utils": 32}], 5: [function (e, t, n) {
      "use strict";
      n.base64 = false, n.binary = false, n.dir = false, n.createFolders = true, n.date = null, n.compression = null, n.compressionOptions = null, n.comment = null, n.unixPermissions = null, n.dosPermissions = null;
    }, {}], 6: [function (e, t) {
      "use strict";
      var n;
      n = "undefined" != typeof Promise ? Promise : e("lie"), t.exports = {Promise: n};
    }, {lie: 37}], 7: [function (e, t, n) {
      "use strict";
      function r(e, t) {
        a.call(this, "FlateWorker/" + e), this._pako = null, this._pakoAction = e, this._pakoOptions = t, this.meta = {};
      }
      var i = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array, o = e("pako"), s = e("./utils"), a = e("./stream/GenericWorker"), l = i ? "uint8array" : "array";
      n.magic = "", s.inherits(r, a), r.prototype.processChunk = function (e) {
        this.meta = e.meta, null === this._pako && this._createPako(), this._pako.push(s.transformTo(l, e.data), false);
      }, r.prototype.flush = function () {
        a.prototype.flush.call(this), null === this._pako && this._createPako(), this._pako.push([], true);
      }, r.prototype.cleanUp = function () {
        a.prototype.cleanUp.call(this), this._pako = null;
      }, r.prototype._createPako = function () {
        this._pako = new o[this._pakoAction]({raw: true, level: this._pakoOptions.level || -1});
        var e = this;
        this._pako.onData = function (t) {
          e.push({data: t, meta: e.meta});
        };
      }, n.compressWorker = function (e) {
        return new r("Deflate", e);
      }, n.uncompressWorker = function () {
        return new r("Inflate", {});
      };
    }, {"./stream/GenericWorker": 28, "./utils": 32, pako: 38}], 8: [function (e, t) {
      "use strict";
      function n(e, t, n, r) {
        i.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = t, this.zipPlatform = n, this.encodeFileName = r, this.streamFiles = e, this.accumulate = false, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
      }
      var r = e("../utils"), i = e("../stream/GenericWorker"), o = e("../utf8"), s = e("../crc32"), a = e("../signature"), l = function (e, t) {
        var n, r = "";
        for (n = 0; n < t; n++) r += String.fromCharCode(255 & e), e >>>= 8;
        return r;
      }, d = function (e, t, n, i, d, A) {
        var c, u, h = e.file, p = e.compression, f = A !== o.utf8encode, m = r.transformTo("string", a.DATA_DESCRIPTOR + l(h.name.crc32, 4) + l(h.name.compressedSize, 4) + l(h.name.uncompressedSize, 4)), g = r.transformTo("string", o.utf8encode(h.name)), _ = h.comment, b = r.transformTo("string", a.DATA_DESCRIPTOR + l(_.crc32, 4) + l(_.compressedSize, 4) + l(_.uncompressedSize, 4)), v = r.transformTo("string", o.utf8encode(_)), k = g.length !== h.name.length, y = v.length !== _.length, w = "", R = "", C = "", x = h.dir, E = h.date, G = {crc32: 0, compressedSize: 0, uncompressedSize: 0};
        t && !n || (G.crc32 = e.crc32, G.compressedSize = e.compressedSize, G.uncompressedSize = e.uncompressedSize);
        var Z = 0;
        t && (Z |= 8), f || !k && !y || (Z |= 2048);
        var S, B, I = 0, T = 0;
        x && (I |= 16), "UNIX" === d ? (T = 798, I |= (B = S = h.unixPermissions, S || (B = x ? 16893 : 33204), (65535 & B) << 16)) : (T = 20, I |= 63 & (h.dosPermissions || 0)), c = E.getUTCHours(), c <<= 6, c |= E.getUTCMinutes(), c <<= 5, c |= E.getUTCSeconds() / 2, u = E.getUTCFullYear() - 1980, u <<= 4, u |= E.getUTCMonth() + 1, u <<= 5, u |= E.getUTCDate(), k && (R = l(1, 1) + l(s(m), 4) + g, w += "up" + l(R.length, 2) + R), y && (C = l(1, 1) + l(s(b), 4) + v, w += "uc" + l(C.length, 2) + C);
        var U = "";
        return U += "\n", U += l(Z, 2), U += p.magic, U += l(c, 2), U += l(u, 2), U += l(G.crc32, 4), U += l(G.compressedSize, 4), U += l(G.uncompressedSize, 4), U += l(m.length, 2), U += l(w.length, 2), {fileRecord: a.LOCAL_FILE_HEADER + U + m + w, dirRecord: a.CENTRAL_FILE_HEADER + l(T, 2) + U + l(b.length, 2) + "" + l(I, 4) + l(i, 4) + m + w + b};
      };
      r.inherits(n, i), n.prototype.push = function (e) {
        var t = e.meta.percent || 0, n = this.entriesCount, r = this._sources.length;
        this.accumulate ? this.contentBuffer.push(e) : (this.bytesWritten += e.data.length, i.prototype.push.call(this, {data: e.data, meta: {currentFile: this.currentFile, percent: n ? (t + 100 * (n - r - 1)) / n : 100}}));
      }, n.prototype.openedSource = function (e) {
        this.currentSourceOffset = this.bytesWritten, this.currentFile = e.file.name;
        var t = this.streamFiles && !e.file.dir;
        if (t) {
          var n = d(e, t, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          this.push({data: n.fileRecord, meta: {percent: 0}});
        } else this.accumulate = true;
      }, n.prototype.closedSource = function (e) {
        this.accumulate = false;
        var t = this.streamFiles && !e.file.dir, n = d(e, t, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
        if (this.dirRecords.push(n.dirRecord), t) this.push({data: a.DATA_DESCRIPTOR + l(e.crc32, 4) + l(e.compressedSize, 4) + l(e.uncompressedSize, 4), meta: {percent: 100}}); else for (this.push({data: n.fileRecord, meta: {percent: 0}}); this.contentBuffer.length;) this.push(this.contentBuffer.shift());
        this.currentFile = null;
      }, n.prototype.flush = function () {
        for (var e = this.bytesWritten, t = 0; t < this.dirRecords.length; t++) this.push({data: this.dirRecords[t], meta: {percent: 100}});
        var n = this.bytesWritten - e, i = function (e, t, n, i, o) {
          var s = r.transformTo("string", o(i));
          return a.CENTRAL_DIRECTORY_END + "" + l(e, 2) + l(e, 2) + l(t, 4) + l(n, 4) + l(s.length, 2) + s;
        }(this.dirRecords.length, n, e, this.zipComment, this.encodeFileName);
        this.push({data: i, meta: {percent: 100}});
      }, n.prototype.prepareNextSource = function () {
        this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
      }, n.prototype.registerPrevious = function (e) {
        this._sources.push(e);
        var t = this;
        return e.on("data", function (e) {
          t.processChunk(e);
        }), e.on("end", function () {
          t.closedSource(t.previous.streamInfo), t._sources.length ? t.prepareNextSource() : t.end();
        }), e.on("error", function (e) {
          t.error(e);
        }), this;
      }, n.prototype.resume = function () {
        return !!i.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), true) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), true));
      }, n.prototype.error = function (e) {
        var t = this._sources;
        if (!i.prototype.error.call(this, e)) return false;
        for (var n = 0; n < t.length; n++) try {
          t[n].error(e);
        } catch (e) {}
        return true;
      }, n.prototype.lock = function () {
        i.prototype.lock.call(this);
        for (var e = this._sources, t = 0; t < e.length; t++) e[t].lock();
      }, t.exports = n;
    }, {"../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32}], 9: [function (e, t, n) {
      "use strict";
      var r = e("../compressions"), i = e("./ZipFileWorker");
      n.generateWorker = function (e, t, n) {
        var o = new i(t.streamFiles, n, t.platform, t.encodeFileName), s = 0;
        try {
          e.forEach(function (e, n) {
            s++;
            var i = function (e, t) {
              var n = e || t, i = r[n];
              if (!i) throw new Error(n + " is not a valid compression method !");
              return i;
            }(n.options.compression, t.compression), a = n.options.compressionOptions || t.compressionOptions || {}, l = n.dir, d = n.date;
            n._compressWorker(i, a).withStreamInfo("file", {name: e, dir: l, date: d, comment: n.comment || "", unixPermissions: n.unixPermissions, dosPermissions: n.dosPermissions}).pipe(o);
          }), o.entriesCount = s;
        } catch (e) {
          o.error(e);
        }
        return o;
      };
    }, {"../compressions": 3, "./ZipFileWorker": 8}], 10: [function (e, t) {
      "use strict";
      function n() {
        if (!(this instanceof n)) return new n;
        if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
        this.files = {}, this.comment = null, this.root = "", this.clone = function () {
          var e = new n;
          for (var t in this) "function" != typeof this[t] && (e[t] = this[t]);
          return e;
        };
      }
      n.prototype = e("./object"), n.prototype.loadAsync = e("./load"), n.support = e("./support"), n.defaults = e("./defaults"), n.version = "3.5.0", n.loadAsync = function (e, t) {
        return (new n).loadAsync(e, t);
      }, n.external = e("./external"), t.exports = n;
    }, {"./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30}], 11: [function (e, t) {
      "use strict";
      function n(e) {
        return new i.Promise(function (t, n) {
          var r = e.decompressed.getContentWorker().pipe(new a);
          r.on("error", function (e) {
            n(e);
          }).on("end", function () {
            r.streamInfo.crc32 !== e.decompressed.crc32 ? n(new Error("Corrupted zip : CRC32 mismatch")) : t();
          }).resume();
        });
      }
      var r = e("./utils"), i = e("./external"), o = e("./utf8"), s = (r = e("./utils"), e("./zipEntries")), a = e("./stream/Crc32Probe"), l = e("./nodejsUtils");
      t.exports = function (e, t) {
        var a = this;
        return t = r.extend(t || {}, {base64: false, checkCRC32: false, optimizedBinaryString: false, createFolders: false, decodeFileName: o.utf8decode}), l.isNode && l.isStream(e) ? i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : r.prepareContent("the loaded zip file", e, true, t.optimizedBinaryString, t.base64).then(function (e) {
          var n = new s(t);
          return n.load(e), n;
        }).then(function (e) {
          var r = [i.Promise.resolve(e)], o = e.files;
          if (t.checkCRC32) for (var s = 0; s < o.length; s++) r.push(n(o[s]));
          return i.Promise.all(r);
        }).then(function (e) {
          for (var n = e.shift(), r = n.files, i = 0; i < r.length; i++) {
            var o = r[i];
            a.file(o.fileNameStr, o.decompressed, {binary: true, optimizedBinaryString: true, date: o.date, dir: o.dir, comment: o.fileCommentStr.length ? o.fileCommentStr : null, unixPermissions: o.unixPermissions, dosPermissions: o.dosPermissions, createFolders: t.createFolders});
          }
          return n.zipComment.length && (a.comment = n.zipComment), a;
        });
      };
    }, {"./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33}], 12: [function (e, t) {
      "use strict";
      function n(e, t) {
        i.call(this, "Nodejs stream input adapter for " + e), this._upstreamEnded = false, this._bindStream(t);
      }
      var r = e("../utils"), i = e("../stream/GenericWorker");
      r.inherits(n, i), n.prototype._bindStream = function (e) {
        var t = this;
        this._stream = e, e.pause(), e.on("data", function (e) {
          t.push({data: e, meta: {percent: 0}});
        }).on("error", function (e) {
          t.isPaused ? this.generatedError = e : t.error(e);
        }).on("end", function () {
          t.isPaused ? t._upstreamEnded = true : t.end();
        });
      }, n.prototype.pause = function () {
        return !!i.prototype.pause.call(this) && (this._stream.pause(), true);
      }, n.prototype.resume = function () {
        return !!i.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), true);
      }, t.exports = n;
    }, {"../stream/GenericWorker": 28, "../utils": 32}], 13: [function (e, t) {
      "use strict";
      function n(e, t, n) {
        r.call(this, t), this._helper = e;
        var i = this;
        e.on("data", function (e, t) {
          i.push(e) || i._helper.pause(), n && n(t);
        }).on("error", function (e) {
          i.emit("error", e);
        }).on("end", function () {
          i.push(null);
        });
      }
      var r = e("readable-stream").Readable;
      e("../utils").inherits(n, r), n.prototype._read = function () {
        this._helper.resume();
      }, t.exports = n;
    }, {"../utils": 32, "readable-stream": 16}], 14: [function (e, t) {
      "use strict";
      t.exports = {isNode: "undefined" != typeof Buffer, newBufferFrom: function (e, t) {
        if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(e, t);
        if ("number" == typeof e) throw new Error('The "data" argument must not be a number');
        return new Buffer(e, t);
      }, allocBuffer: function (e) {
        if (Buffer.alloc) return Buffer.alloc(e);
        var t = new Buffer(e);
        return t.fill(0), t;
      }, isBuffer: function (e) {
        return Buffer.isBuffer(e);
      }, isStream: function (e) {
        return e && "function" == typeof e.on && "function" == typeof e.pause && "function" == typeof e.resume;
      }};
    }, {}], 15: [function (e, t) {
      "use strict";
      var r = e("./utf8"), i = e("./utils"), o = e("./stream/GenericWorker"), s = e("./stream/StreamHelper"), a = e("./defaults"), l = e("./compressedObject"), d = e("./zipObject"), A = e("./generate"), c = e("./nodejsUtils"), u = e("./nodejs/NodejsStreamInputAdapter"), h = function (e, t, n) {
        var r, s = i.getTypeOf(t), A = i.extend(n || {}, a);
        A.date = A.date || new Date, null !== A.compression && (A.compression = A.compression.toUpperCase()), "string" == typeof A.unixPermissions && (A.unixPermissions = parseInt(A.unixPermissions, 8)), A.unixPermissions && 16384 & A.unixPermissions && (A.dir = true), A.dosPermissions && 16 & A.dosPermissions && (A.dir = true), A.dir && (e = ("/" !== e.slice(-1) && (e += "/"), e)), A.createFolders && (r = p(e)) && m.call(this, r, true);
        var h, g = "string" === s && false === A.binary && false === A.base64;
        n && void 0 !== n.binary || (A.binary = !g), (t instanceof l && 0 === t.uncompressedSize || A.dir || !t || 0 === t.length) && (A.base64 = false, A.binary = true, t = "", A.compression = "STORE", s = "string"), h = t instanceof l || t instanceof o ? t : c.isNode && c.isStream(t) ? new u(e, t) : i.prepareContent(e, t, A.binary, A.optimizedBinaryString, A.base64);
        var _ = new d(e, h, A);
        this.files[e] = _;
      }, p = function (e) {
        "/" === e.slice(-1) && (e = e.substring(0, e.length - 1));
        var t = e.lastIndexOf("/");
        return t > 0 ? e.substring(0, t) : "";
      }, g = {load: function () {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, forEach: function (e) {
        var t, n, r;
        for (t in this.files) this.files.hasOwnProperty(t) && (r = this.files[t], (n = t.slice(this.root.length, t.length)) && t.slice(0, this.root.length) === this.root && e(n, r));
      }, filter: function (e) {
        var t = [];
        return this.forEach(function (n, r) {
          e(n, r) && t.push(r);
        }), t;
      }, file: function (e, t, r) {
        if (1 === arguments.length) {
          if ("[object RegExp]" === {}.toString.call(e)) {
            var i = e;
            return this.filter(function (e, t) {
              return !t.dir && i.test(e);
            });
          }
          var o = this.files[this.root + e];
          return o && !o.dir ? o : null;
        }
        return e = this.root + e, h.call(this, e, t, r), this;
      }, folder: function (e) {
        if (!e) return this;
        if ("[object RegExp]" === {}.toString.call(e)) return this.filter(function (t, n) {
          return n.dir && e.test(t);
        });
        var t = this.root + e, r = m.call(this, t), i = this.clone();
        return i.root = r.name, i;
      }, remove: function (e) {
        e = this.root + e;
        var t = this.files[e];
        if (t || ("/" !== e.slice(-1) && (e += "/"), t = this.files[e]), t && !t.dir) delete this.files[e]; else for (var n = this.filter(function (t, n) {
          return n.name.slice(0, e.length) === e;
        }), r = 0; r < n.length; r++) delete this.files[n[r].name];
        return this;
      }, generate: function () {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, generateInternalStream: function (e) {
        var t, n = {};
        try {
          if ((n = i.extend(e || {}, {streamFiles: false, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: r.utf8encode})).type = n.type.toLowerCase(), n.compression = n.compression.toUpperCase(), "binarystring" === n.type && (n.type = "string"), !n.type) throw new Error("No output type specified.");
          i.checkSupport(n.type), "darwin" !== n.platform && "freebsd" !== n.platform && "linux" !== n.platform && "sunos" !== n.platform || (n.platform = "UNIX"), "win32" === n.platform && (n.platform = "DOS");
          var a = n.comment || this.comment || "";
          t = A.generateWorker(this, n, a);
        } catch (e) {
          (t = new o("error")).error(e);
        }
        return new s(t, n.type || "string", n.mimeType);
      }, generateAsync: function (e, t) {
        return this.generateInternalStream(e).accumulate(t);
      }, generateNodeStream: function (e, t) {
        return (e = e || {}).type || (e.type = "nodebuffer"), this.generateInternalStream(e).toNodejsStream(t);
      }};
      t.exports = g;
    }, {"./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35}], 16: [function (e, t) {
      t.exports = e("stream");
    }, {stream: void 0}], 17: [function (e, t) {
      "use strict";
      function n(e) {
        r.call(this, e);
        for (var t = 0; t < this.data.length; t++) e[t] = 255 & e[t];
      }
      var r = e("./DataReader");
      e("../utils").inherits(n, r), n.prototype.byteAt = function (e) {
        return this.data[this.zero + e];
      }, n.prototype.lastIndexOfSignature = function (e) {
        for (var t = e.charCodeAt(0), n = e.charCodeAt(1), r = e.charCodeAt(2), i = e.charCodeAt(3), o = this.length - 4; o >= 0; --o) if (this.data[o] === t && this.data[o + 1] === n && this.data[o + 2] === r && this.data[o + 3] === i) return o - this.zero;
        return -1;
      }, n.prototype.readAndCheckSignature = function (e) {
        var t = e.charCodeAt(0), n = e.charCodeAt(1), r = e.charCodeAt(2), i = e.charCodeAt(3), o = this.readData(4);
        return t === o[0] && n === o[1] && r === o[2] && i === o[3];
      }, n.prototype.readData = function (e) {
        if (this.checkOffset(e), 0 === e) return [];
        var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
        return this.index += e, t;
      }, t.exports = n;
    }, {"../utils": 32, "./DataReader": 18}], 18: [function (e, t) {
      "use strict";
      function n(e) {
        this.data = e, this.length = e.length, this.index = 0, this.zero = 0;
      }
      var r = e("../utils");
      n.prototype = {checkOffset: function (e) {
        this.checkIndex(this.index + e);
      }, checkIndex: function (e) {
        if (this.length < this.zero + e || e < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + e + "). Corrupted zip ?");
      }, setIndex: function (e) {
        this.checkIndex(e), this.index = e;
      }, skip: function (e) {
        this.setIndex(this.index + e);
      }, byteAt: function () {}, readInt: function (e) {
        var t, n = 0;
        for (this.checkOffset(e), t = this.index + e - 1; t >= this.index; t--) n = (n << 8) + this.byteAt(t);
        return this.index += e, n;
      }, readString: function (e) {
        return r.transformTo("string", this.readData(e));
      }, readData: function () {}, lastIndexOfSignature: function () {}, readAndCheckSignature: function () {}, readDate: function () {
        var e = this.readInt(4);
        return new Date(Date.UTC(1980 + (e >> 25 & 127), (e >> 21 & 15) - 1, e >> 16 & 31, e >> 11 & 31, e >> 5 & 63, (31 & e) << 1));
      }}, t.exports = n;
    }, {"../utils": 32}], 19: [function (e, t) {
      "use strict";
      function n(e) {
        r.call(this, e);
      }
      var r = e("./Uint8ArrayReader");
      e("../utils").inherits(n, r), n.prototype.readData = function (e) {
        this.checkOffset(e);
        var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
        return this.index += e, t;
      }, t.exports = n;
    }, {"../utils": 32, "./Uint8ArrayReader": 21}], 20: [function (e, t) {
      "use strict";
      function n(e) {
        r.call(this, e);
      }
      var r = e("./DataReader");
      e("../utils").inherits(n, r), n.prototype.byteAt = function (e) {
        return this.data.charCodeAt(this.zero + e);
      }, n.prototype.lastIndexOfSignature = function (e) {
        return this.data.lastIndexOf(e) - this.zero;
      }, n.prototype.readAndCheckSignature = function (e) {
        return e === this.readData(4);
      }, n.prototype.readData = function (e) {
        this.checkOffset(e);
        var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
        return this.index += e, t;
      }, t.exports = n;
    }, {"../utils": 32, "./DataReader": 18}], 21: [function (e, t) {
      "use strict";
      function n(e) {
        r.call(this, e);
      }
      var r = e("./ArrayReader");
      e("../utils").inherits(n, r), n.prototype.readData = function (e) {
        if (this.checkOffset(e), 0 === e) return new Uint8Array(0);
        var t = this.data.subarray(this.zero + this.index, this.zero + this.index + e);
        return this.index += e, t;
      }, t.exports = n;
    }, {"../utils": 32, "./ArrayReader": 17}], 22: [function (e, t) {
      "use strict";
      var n = e("../utils"), r = e("../support"), i = e("./ArrayReader"), o = e("./StringReader"), s = e("./NodeBufferReader"), a = e("./Uint8ArrayReader");
      t.exports = function (e) {
        var t = n.getTypeOf(e);
        return n.checkSupport(t), "string" !== t || r.uint8array ? "nodebuffer" === t ? new s(e) : r.uint8array ? new a(n.transformTo("uint8array", e)) : new i(n.transformTo("array", e)) : new o(e);
      };
    }, {"../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21}], 23: [function (e, t, n) {
      "use strict";
      n.LOCAL_FILE_HEADER = "PK", n.CENTRAL_FILE_HEADER = "PK", n.CENTRAL_DIRECTORY_END = "PK", n.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK", n.ZIP64_CENTRAL_DIRECTORY_END = "PK", n.DATA_DESCRIPTOR = "PK";
    }, {}], 24: [function (e, t) {
      "use strict";
      function n(e) {
        r.call(this, "ConvertWorker to " + e), this.destType = e;
      }
      var r = e("./GenericWorker"), i = e("../utils");
      i.inherits(n, r), n.prototype.processChunk = function (e) {
        this.push({data: i.transformTo(this.destType, e.data), meta: e.meta});
      }, t.exports = n;
    }, {"../utils": 32, "./GenericWorker": 28}], 25: [function (e, t) {
      "use strict";
      function n() {
        r.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
      }
      var r = e("./GenericWorker"), i = e("../crc32");
      e("../utils").inherits(n, r), n.prototype.processChunk = function (e) {
        this.streamInfo.crc32 = i(e.data, this.streamInfo.crc32 || 0), this.push(e);
      }, t.exports = n;
    }, {"../crc32": 4, "../utils": 32, "./GenericWorker": 28}], 26: [function (e, t) {
      "use strict";
      function n(e) {
        i.call(this, "DataLengthProbe for " + e), this.propName = e, this.withStreamInfo(e, 0);
      }
      var r = e("../utils"), i = e("./GenericWorker");
      r.inherits(n, i), n.prototype.processChunk = function (e) {
        if (e) {
          var t = this.streamInfo[this.propName] || 0;
          this.streamInfo[this.propName] = t + e.data.length;
        }
        i.prototype.processChunk.call(this, e);
      }, t.exports = n;
    }, {"../utils": 32, "./GenericWorker": 28}], 27: [function (e, t) {
      "use strict";
      function n(e) {
        i.call(this, "DataWorker");
        var t = this;
        this.dataIsReady = false, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = false, e.then(function (e) {
          t.dataIsReady = true, t.data = e, t.max = e && e.length || 0, t.type = r.getTypeOf(e), t.isPaused || t._tickAndRepeat();
        }, function (e) {
          t.error(e);
        });
      }
      var r = e("../utils"), i = e("./GenericWorker");
      r.inherits(n, i), n.prototype.cleanUp = function () {
        i.prototype.cleanUp.call(this), this.data = null;
      }, n.prototype.resume = function () {
        return !!i.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = true, r.delay(this._tickAndRepeat, [], this)), true);
      }, n.prototype._tickAndRepeat = function () {
        this._tickScheduled = false, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (r.delay(this._tickAndRepeat, [], this), this._tickScheduled = true));
      }, n.prototype._tick = function () {
        if (this.isPaused || this.isFinished) return false;
        var e = null, t = Math.min(this.max, this.index + 16384);
        if (this.index >= this.max) return this.end();
        switch (this.type) {
          case "string":
            e = this.data.substring(this.index, t);
            break;
          case "uint8array":
            e = this.data.subarray(this.index, t);
            break;
          case "array":
          case "nodebuffer":
            e = this.data.slice(this.index, t);
        }
        return this.index = t, this.push({data: e, meta: {percent: this.max ? this.index / this.max * 100 : 0}});
      }, t.exports = n;
    }, {"../utils": 32, "./GenericWorker": 28}], 28: [function (e, t) {
      "use strict";
      function n(e) {
        this.name = e || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = true, this.isFinished = false, this.isLocked = false, this._listeners = {data: [], end: [], error: []}, this.previous = null;
      }
      n.prototype = {push: function (e) {
        this.emit("data", e);
      }, end: function () {
        if (this.isFinished) return false;
        this.flush();
        try {
          this.emit("end"), this.cleanUp(), this.isFinished = true;
        } catch (e) {
          this.emit("error", e);
        }
        return true;
      }, error: function (e) {
        return !this.isFinished && (this.isPaused ? this.generatedError = e : (this.isFinished = true, this.emit("error", e), this.previous && this.previous.error(e), this.cleanUp()), true);
      }, on: function (e, t) {
        return this._listeners[e].push(t), this;
      }, cleanUp: function () {
        this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
      }, emit: function (e, t) {
        if (this._listeners[e]) for (var n = 0; n < this._listeners[e].length; n++) this._listeners[e][n].call(this, t);
      }, pipe: function (e) {
        return e.registerPrevious(this);
      }, registerPrevious: function (e) {
        if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
        this.streamInfo = e.streamInfo, this.mergeStreamInfo(), this.previous = e;
        var t = this;
        return e.on("data", function (e) {
          t.processChunk(e);
        }), e.on("end", function () {
          t.end();
        }), e.on("error", function (e) {
          t.error(e);
        }), this;
      }, pause: function () {
        return !this.isPaused && !this.isFinished && (this.isPaused = true, this.previous && this.previous.pause(), true);
      }, resume: function () {
        if (!this.isPaused || this.isFinished) return false;
        this.isPaused = false;
        var e = false;
        return this.generatedError && (this.error(this.generatedError), e = true), this.previous && this.previous.resume(), !e;
      }, flush: function () {}, processChunk: function (e) {
        this.push(e);
      }, withStreamInfo: function (e, t) {
        return this.extraStreamInfo[e] = t, this.mergeStreamInfo(), this;
      }, mergeStreamInfo: function () {
        for (var e in this.extraStreamInfo) this.extraStreamInfo.hasOwnProperty(e) && (this.streamInfo[e] = this.extraStreamInfo[e]);
      }, lock: function () {
        if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
        this.isLocked = true, this.previous && this.previous.lock();
      }, toString: function () {
        var e = "Worker " + this.name;
        return this.previous ? this.previous + " -> " + e : e;
      }}, t.exports = n;
    }, {}], 29: [function (e, t) {
      "use strict";
      function n(e, t, n) {
        var s = t;
        switch (t) {
          case "blob":
          case "arraybuffer":
            s = "uint8array";
            break;
          case "base64":
            s = "string";
        }
        try {
          this._internalType = s, this._outputType = t, this._mimeType = n, r.checkSupport(s), this._worker = e.pipe(new i(s)), e.lock();
        } catch (e) {
          this._worker = new o("error"), this._worker.error(e);
        }
      }
      var r = e("../utils"), i = e("./ConvertWorker"), o = e("./GenericWorker"), s = e("../base64"), a = e("../support"), l = e("../external"), d = null;
      if (a.nodestream) try {
        d = e("../nodejs/NodejsStreamOutputAdapter");
      } catch (e) {}
      n.prototype = {accumulate: function (e) {
        return t = this, n = e, new l.Promise(function (e, i) {
          var o = [], a = t._internalType, l = t._outputType, d = t._mimeType;
          t.on("data", function (e, t) {
            o.push(e), n && n(t);
          }).on("error", function (e) {
            o = [], i(e);
          }).on("end", function () {
            try {
              var t = function (e, t, n) {
                switch (e) {
                  case "blob":
                    return r.newBlob(r.transformTo("arraybuffer", t), n);
                  case "base64":
                    return s.encode(t);
                  default:
                    return r.transformTo(e, t);
                }
              }(l, function (e, t) {
                var n, r = 0, i = null, o = 0;
                for (n = 0; n < t.length; n++) o += t[n].length;
                switch (e) {
                  case "string":
                    return t.join("");
                  case "array":
                    return [].concat.apply([], t);
                  case "uint8array":
                    for (i = new Uint8Array(o), n = 0; n < t.length; n++) i.set(t[n], r), r += t[n].length;
                    return i;
                  case "nodebuffer":
                    return Buffer.concat(t);
                  default:
                    throw new Error("concat : unsupported type '" + e + "'");
                }
              }(a, o), d);
              e(t);
            } catch (e) {
              i(e);
            }
            o = [];
          }).resume();
        });
        var t, n;
      }, on: function (e, t) {
        var n = this;
        return "data" === e ? this._worker.on(e, function (e) {
          t.call(n, e.data, e.meta);
        }) : this._worker.on(e, function () {
          r.delay(t, arguments, n);
        }), this;
      }, resume: function () {
        return r.delay(this._worker.resume, [], this._worker), this;
      }, pause: function () {
        return this._worker.pause(), this;
      }, toNodejsStream: function (e) {
        if (r.checkSupport("nodestream"), "nodebuffer" !== this._outputType) throw new Error(this._outputType + " is not supported by this method");
        return new d(this, {objectMode: "nodebuffer" !== this._outputType}, e);
      }}, t.exports = n;
    }, {"../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28}], 30: [function (e, t, n) {
      "use strict";
      if (n.base64 = true, n.array = true, n.string = true, n.arraybuffer = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array, n.nodebuffer = "undefined" != typeof Buffer, n.uint8array = "undefined" != typeof Uint8Array, "undefined" == typeof ArrayBuffer) n.blob = false; else {
        var r = new ArrayBuffer(0);
        try {
          n.blob = 0 === new Blob([r], {type: "application/zip"}).size;
        } catch (e) {
          try {
            var i = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder);
            i.append(r), n.blob = 0 === i.getBlob("application/zip").size;
          } catch (e) {
            n.blob = false;
          }
        }
      }
      try {
        n.nodestream = !!e("readable-stream").Readable;
      } catch (e) {
        n.nodestream = false;
      }
    }, {"readable-stream": 16}], 31: [function (e, t, n) {
      "use strict";
      function r() {
        l.call(this, "utf-8 decode"), this.leftOver = null;
      }
      function i() {
        l.call(this, "utf-8 encode");
      }
      for (var o = e("./utils"), s = e("./support"), a = e("./nodejsUtils"), l = e("./stream/GenericWorker"), d = new Array(256), A = 0; A < 256; A++) d[A] = A >= 252 ? 6 : A >= 248 ? 5 : A >= 240 ? 4 : A >= 224 ? 3 : A >= 192 ? 2 : 1;
      d[254] = d[254] = 1, n.utf8encode = function (e) {
        return s.nodebuffer ? a.newBufferFrom(e, "utf-8") : function (e) {
          var t, n, r, i, o, a = e.length, l = 0;
          for (i = 0; i < a; i++) 55296 == (64512 & (n = e.charCodeAt(i))) && i + 1 < a && 56320 == (64512 & (r = e.charCodeAt(i + 1))) && (n = 65536 + (n - 55296 << 10) + (r - 56320), i++), l += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
          for (t = s.uint8array ? new Uint8Array(l) : new Array(l), o = 0, i = 0; o < l; i++) 55296 == (64512 & (n = e.charCodeAt(i))) && i + 1 < a && 56320 == (64512 & (r = e.charCodeAt(i + 1))) && (n = 65536 + (n - 55296 << 10) + (r - 56320), i++), n < 128 ? t[o++] = n : n < 2048 ? (t[o++] = 192 | n >>> 6, t[o++] = 128 | 63 & n) : n < 65536 ? (t[o++] = 224 | n >>> 12, t[o++] = 128 | n >>> 6 & 63, t[o++] = 128 | 63 & n) : (t[o++] = 240 | n >>> 18, t[o++] = 128 | n >>> 12 & 63, t[o++] = 128 | n >>> 6 & 63, t[o++] = 128 | 63 & n);
          return t;
        }(e);
      }, n.utf8decode = function (e) {
        return s.nodebuffer ? o.transformTo("nodebuffer", e).toString("utf-8") : function (e) {
          var t, n, r, i, s = e.length, a = new Array(2 * s);
          for (n = 0, t = 0; t < s;) if ((r = e[t++]) < 128) a[n++] = r; else if ((i = d[r]) > 4) a[n++] = 65533, t += i - 1; else {
            for (r &= 2 === i ? 31 : 3 === i ? 15 : 7; i > 1 && t < s;) r = r << 6 | 63 & e[t++], i--;
            i > 1 ? a[n++] = 65533 : r < 65536 ? a[n++] = r : (r -= 65536, a[n++] = 55296 | r >> 10 & 1023, a[n++] = 56320 | 1023 & r);
          }
          return a.length !== n && (a.subarray ? a = a.subarray(0, n) : a.length = n), o.applyFromCharCode(a);
        }(e = o.transformTo(s.uint8array ? "uint8array" : "array", e));
      }, o.inherits(r, l), r.prototype.processChunk = function (e) {
        var t = o.transformTo(s.uint8array ? "uint8array" : "array", e.data);
        if (this.leftOver && this.leftOver.length) {
          if (s.uint8array) {
            var r = t;
            (t = new Uint8Array(r.length + this.leftOver.length)).set(this.leftOver, 0), t.set(r, this.leftOver.length);
          } else t = this.leftOver.concat(t);
          this.leftOver = null;
        }
        var i = function (e, t) {
          var n;
          for ((t = t || e.length) > e.length && (t = e.length), n = t - 1; n >= 0 && 128 == (192 & e[n]);) n--;
          return n < 0 || 0 === n ? t : n + d[e[n]] > t ? n : t;
        }(t), a = t;
        i !== t.length && (s.uint8array ? (a = t.subarray(0, i), this.leftOver = t.subarray(i, t.length)) : (a = t.slice(0, i), this.leftOver = t.slice(i, t.length))), this.push({data: n.utf8decode(a), meta: e.meta});
      }, r.prototype.flush = function () {
        this.leftOver && this.leftOver.length && (this.push({data: n.utf8decode(this.leftOver), meta: {}}), this.leftOver = null);
      }, n.Utf8DecodeWorker = r, o.inherits(i, l), i.prototype.processChunk = function (e) {
        this.push({data: n.utf8encode(e.data), meta: e.meta});
      }, n.Utf8EncodeWorker = i;
    }, {"./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32}], 32: [function (e, t, n) {
      "use strict";
      function i(e, t) {
        for (var n = 0; n < e.length; ++n) t[n] = 255 & e.charCodeAt(n);
        return t;
      }
      function o(e) {
        var t = 65536, r = n.getTypeOf(e), i = true;
        if ("uint8array" === r ? i = u.applyCanBeUsed.uint8array : "nodebuffer" === r && (i = u.applyCanBeUsed.nodebuffer), i) for (; t > 1;) try {
          return u.stringifyByChunk(e, r, t);
        } catch (e) {
          t = Math.floor(t / 2);
        }
        return u.stringifyByChar(e);
      }
      function s(e, t) {
        for (var n = 0; n < e.length; n++) t[n] = e[n];
        return t;
      }
      var a = e("./support"), l = e("./base64"), d = e("./nodejsUtils"), A = e("set-immediate-shim"), c = e("./external");
      n.newBlob = function (e, t) {
        n.checkSupport("blob");
        try {
          return new Blob([e], {type: t});
        } catch (n) {
          try {
            var r = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder);
            return r.append(e), r.getBlob(t);
          } catch (e) {
            throw new Error("Bug : can't construct the Blob.");
          }
        }
      };
      var u = {stringifyByChunk: function (e, t, n) {
        var r = [], i = 0, o = e.length;
        if (o <= n) return String.fromCharCode.apply(null, e);
        for (; i < o;) "array" === t || "nodebuffer" === t ? r.push(String.fromCharCode.apply(null, e.slice(i, Math.min(i + n, o)))) : r.push(String.fromCharCode.apply(null, e.subarray(i, Math.min(i + n, o)))), i += n;
        return r.join("");
      }, stringifyByChar: function (e) {
        for (var t = "", n = 0; n < e.length; n++) t += String.fromCharCode(e[n]);
        return t;
      }, applyCanBeUsed: {uint8array: function () {
        try {
          return a.uint8array && 1 === String.fromCharCode.apply(null, new Uint8Array(1)).length;
        } catch (e) {
          return false;
        }
      }(), nodebuffer: function () {
        try {
          return a.nodebuffer && 1 === String.fromCharCode.apply(null, d.allocBuffer(1)).length;
        } catch (e) {
          return false;
        }
      }()}};
      n.applyFromCharCode = o;
      var h = {};
      h.string = {string: r, array: function (e) {
        return i(e, new Array(e.length));
      }, arraybuffer: function (e) {
        return h.string.uint8array(e).buffer;
      }, uint8array: function (e) {
        return i(e, new Uint8Array(e.length));
      }, nodebuffer: function (e) {
        return i(e, d.allocBuffer(e.length));
      }}, h.array = {string: o, array: r, arraybuffer: function (e) {
        return new Uint8Array(e).buffer;
      }, uint8array: function (e) {
        return new Uint8Array(e);
      }, nodebuffer: function (e) {
        return d.newBufferFrom(e);
      }}, h.arraybuffer = {string: function (e) {
        return o(new Uint8Array(e));
      }, array: function (e) {
        return s(new Uint8Array(e), new Array(e.byteLength));
      }, arraybuffer: r, uint8array: function (e) {
        return new Uint8Array(e);
      }, nodebuffer: function (e) {
        return d.newBufferFrom(new Uint8Array(e));
      }}, h.uint8array = {string: o, array: function (e) {
        return s(e, new Array(e.length));
      }, arraybuffer: function (e) {
        return e.buffer;
      }, uint8array: r, nodebuffer: function (e) {
        return d.newBufferFrom(e);
      }}, h.nodebuffer = {string: o, array: function (e) {
        return s(e, new Array(e.length));
      }, arraybuffer: function (e) {
        return h.nodebuffer.uint8array(e).buffer;
      }, uint8array: function (e) {
        return s(e, new Uint8Array(e.length));
      }, nodebuffer: r}, n.transformTo = function (e, t) {
        if (t || (t = ""), !e) return t;
        n.checkSupport(e);
        var r = n.getTypeOf(t);
        return h[r][e](t);
      }, n.getTypeOf = function (e) {
        return "string" == typeof e ? "string" : "[object Array]" === {}.toString.call(e) ? "array" : a.nodebuffer && d.isBuffer(e) ? "nodebuffer" : a.uint8array && e instanceof Uint8Array ? "uint8array" : a.arraybuffer && e instanceof ArrayBuffer ? "arraybuffer" : void 0;
      }, n.checkSupport = function (e) {
        if (!a[e.toLowerCase()]) throw new Error(e + " is not supported by this platform");
      }, n.MAX_VALUE_16BITS = 65535, n.MAX_VALUE_32BITS = -1, n.pretty = function (e) {
        var t, n, r = "";
        for (n = 0; n < (e || "").length; n++) r += "\\x" + ((t = e.charCodeAt(n)) < 16 ? "0" : "") + t.toString(16).toUpperCase();
        return r;
      }, n.delay = function (e, t, n) {
        A(function () {
          e.apply(n || null, t || []);
        });
      }, n.inherits = function (e, t) {
        var n = function () {};
        n.prototype = t.prototype, e.prototype = new n;
      }, n.extend = function () {
        var e, t, n = {};
        for (e = 0; e < arguments.length; e++) for (t in arguments[e]) arguments[e].hasOwnProperty(t) && void 0 === n[t] && (n[t] = arguments[e][t]);
        return n;
      }, n.prepareContent = function (e, t, r, o, s) {
        return c.Promise.resolve(t).then(function (e) {
          return a.blob && (e instanceof Blob || -1 !== ["[object File]", "[object Blob]"].indexOf({}.toString.call(e))) && "undefined" != typeof FileReader ? new c.Promise(function (t, n) {
            var r = new FileReader;
            r.onload = function (e) {
              t(e.target.result);
            }, r.onerror = function (e) {
              n(e.target.error);
            }, r.readAsArrayBuffer(e);
          }) : e;
        }).then(function (t) {
          var d, A = n.getTypeOf(t);
          return A ? ("arraybuffer" === A ? t = n.transformTo("uint8array", t) : "string" === A && (s ? t = l.decode(t) : r && true !== o && (t = i(d = t, a.uint8array ? new Uint8Array(d.length) : new Array(d.length)))), t) : c.Promise.reject(new Error("Can't read the data of '" + e + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
        });
      };
    }, {"./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, "set-immediate-shim": 54}], 33: [function (e, t) {
      "use strict";
      function n(e) {
        this.files = [], this.loadOptions = e;
      }
      var r = e("./reader/readerFor"), i = e("./utils"), o = e("./signature"), s = e("./zipEntry"), a = (e("./utf8"), e("./support"));
      n.prototype = {checkSignature: function (e) {
        if (!this.reader.readAndCheckSignature(e)) {
          this.reader.index -= 4;
          var t = this.reader.readString(4);
          throw new Error("Corrupted zip or bug: unexpected signature (" + i.pretty(t) + ", expected " + i.pretty(e) + ")");
        }
      }, isSignature: function (e, t) {
        var n = this.reader.index;
        this.reader.setIndex(e);
        var r = this.reader.readString(4) === t;
        return this.reader.setIndex(n), r;
      }, readBlockEndOfCentral: function () {
        this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
        var e = this.reader.readData(this.zipCommentLength), t = a.uint8array ? "uint8array" : "array", n = i.transformTo(t, e);
        this.zipComment = this.loadOptions.decodeFileName(n);
      }, readBlockZip64EndOfCentral: function () {
        this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
        for (var e, t, n, r = this.zip64EndOfCentralSize - 44; 0 < r;) e = this.reader.readInt(2), t = this.reader.readInt(4), n = this.reader.readData(t), this.zip64ExtensibleData[e] = {id: e, length: t, value: n};
      }, readBlockZip64EndOfCentralLocator: function () {
        if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), this.disksCount > 1) throw new Error("Multi-volumes zip are not supported");
      }, readLocalFiles: function () {
        var e, t;
        for (e = 0; e < this.files.length; e++) t = this.files[e], this.reader.setIndex(t.localHeaderOffset), this.checkSignature(o.LOCAL_FILE_HEADER), t.readLocalPart(this.reader), t.handleUTF8(), t.processAttributes();
      }, readCentralDir: function () {
        var e;
        for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(o.CENTRAL_FILE_HEADER);) (e = new s({zip64: this.zip64}, this.loadOptions)).readCentralPart(this.reader), this.files.push(e);
        if (this.centralDirRecords !== this.files.length && 0 !== this.centralDirRecords && 0 === this.files.length) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
      }, readEndOfCentral: function () {
        var e = this.reader.lastIndexOfSignature(o.CENTRAL_DIRECTORY_END);
        if (e < 0) throw this.isSignature(0, o.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
        this.reader.setIndex(e);
        var t = e;
        if (this.checkSignature(o.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === i.MAX_VALUE_16BITS || this.diskWithCentralDirStart === i.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === i.MAX_VALUE_16BITS || this.centralDirRecords === i.MAX_VALUE_16BITS || this.centralDirSize === i.MAX_VALUE_32BITS || this.centralDirOffset === i.MAX_VALUE_32BITS) {
          if (this.zip64 = true, (e = this.reader.lastIndexOfSignature(o.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
          if (this.reader.setIndex(e), this.checkSignature(o.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, o.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(o.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
          this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(o.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
        }
        var n = this.centralDirOffset + this.centralDirSize;
        this.zip64 && (n += 20, n += 12 + this.zip64EndOfCentralSize);
        var r = t - n;
        if (r > 0) this.isSignature(t, o.CENTRAL_FILE_HEADER) || (this.reader.zero = r); else if (r < 0) throw new Error("Corrupted zip: missing " + Math.abs(r) + " bytes.");
      }, prepareReader: function (e) {
        this.reader = r(e);
      }, load: function (e) {
        this.prepareReader(e), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
      }}, t.exports = n;
    }, {"./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utf8": 31, "./utils": 32, "./zipEntry": 34}], 34: [function (e, t) {
      "use strict";
      function n(e, t) {
        this.options = e, this.loadOptions = t;
      }
      var r = e("./reader/readerFor"), i = e("./utils"), o = e("./compressedObject"), s = e("./crc32"), a = e("./utf8"), l = e("./compressions"), d = e("./support");
      n.prototype = {isEncrypted: function () {
        return 1 == (1 & this.bitFlag);
      }, useUTF8: function () {
        return 2048 == (2048 & this.bitFlag);
      }, readLocalPart: function (e) {
        var t, n;
        if (e.skip(22), this.fileNameLength = e.readInt(2), n = e.readInt(2), this.fileName = e.readData(this.fileNameLength), e.skip(n), -1 === this.compressedSize || -1 === this.uncompressedSize) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
        if (null === (t = function (e) {
          for (var t in l) if (l.hasOwnProperty(t) && l[t].magic === e) return l[t];
          return null;
        }(this.compressionMethod))) throw new Error("Corrupted zip : compression " + i.pretty(this.compressionMethod) + " unknown (inner file : " + i.transformTo("string", this.fileName) + ")");
        this.decompressed = new o(this.compressedSize, this.uncompressedSize, this.crc32, t, e.readData(this.compressedSize));
      }, readCentralPart: function (e) {
        this.versionMadeBy = e.readInt(2), e.skip(2), this.bitFlag = e.readInt(2), this.compressionMethod = e.readString(2), this.date = e.readDate(), this.crc32 = e.readInt(4), this.compressedSize = e.readInt(4), this.uncompressedSize = e.readInt(4);
        var t = e.readInt(2);
        if (this.extraFieldsLength = e.readInt(2), this.fileCommentLength = e.readInt(2), this.diskNumberStart = e.readInt(2), this.internalFileAttributes = e.readInt(2), this.externalFileAttributes = e.readInt(4), this.localHeaderOffset = e.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
        e.skip(t), this.readExtraFields(e), this.parseZIP64ExtraField(e), this.fileComment = e.readData(this.fileCommentLength);
      }, processAttributes: function () {
        this.unixPermissions = null, this.dosPermissions = null;
        var e = this.versionMadeBy >> 8;
        this.dir = !!(16 & this.externalFileAttributes), 0 === e && (this.dosPermissions = 63 & this.externalFileAttributes), 3 === e && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || "/" !== this.fileNameStr.slice(-1) || (this.dir = true);
      }, parseZIP64ExtraField: function () {
        if (this.extraFields[1]) {
          var e = r(this.extraFields[1].value);
          this.uncompressedSize === i.MAX_VALUE_32BITS && (this.uncompressedSize = e.readInt(8)), this.compressedSize === i.MAX_VALUE_32BITS && (this.compressedSize = e.readInt(8)), this.localHeaderOffset === i.MAX_VALUE_32BITS && (this.localHeaderOffset = e.readInt(8)), this.diskNumberStart === i.MAX_VALUE_32BITS && (this.diskNumberStart = e.readInt(4));
        }
      }, readExtraFields: function (e) {
        var t, n, r, i = e.index + this.extraFieldsLength;
        for (this.extraFields || (this.extraFields = {}); e.index + 4 < i;) t = e.readInt(2), n = e.readInt(2), r = e.readData(n), this.extraFields[t] = {id: t, length: n, value: r};
        e.setIndex(i);
      }, handleUTF8: function () {
        var e = d.uint8array ? "uint8array" : "array";
        if (this.useUTF8()) this.fileNameStr = a.utf8decode(this.fileName), this.fileCommentStr = a.utf8decode(this.fileComment); else {
          var t = this.findExtraFieldUnicodePath();
          if (null !== t) this.fileNameStr = t; else {
            var n = i.transformTo(e, this.fileName);
            this.fileNameStr = this.loadOptions.decodeFileName(n);
          }
          var r = this.findExtraFieldUnicodeComment();
          if (null !== r) this.fileCommentStr = r; else {
            var o = i.transformTo(e, this.fileComment);
            this.fileCommentStr = this.loadOptions.decodeFileName(o);
          }
        }
      }, findExtraFieldUnicodePath: function () {
        var e = this.extraFields[28789];
        if (e) {
          var t = r(e.value);
          return 1 !== t.readInt(1) || s(this.fileName) !== t.readInt(4) ? null : a.utf8decode(t.readData(e.length - 5));
        }
        return null;
      }, findExtraFieldUnicodeComment: function () {
        var e = this.extraFields[25461];
        if (e) {
          var t = r(e.value);
          return 1 !== t.readInt(1) || s(this.fileComment) !== t.readInt(4) ? null : a.utf8decode(t.readData(e.length - 5));
        }
        return null;
      }}, t.exports = n;
    }, {"./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32}], 35: [function (e, t) {
      "use strict";
      var n = e("./stream/StreamHelper"), r = e("./stream/DataWorker"), i = e("./utf8"), o = e("./compressedObject"), s = e("./stream/GenericWorker"), a = function (e, t, n) {
        this.name = e, this.dir = n.dir, this.date = n.date, this.comment = n.comment, this.unixPermissions = n.unixPermissions, this.dosPermissions = n.dosPermissions, this._data = t, this._dataBinary = n.binary, this.options = {compression: n.compression, compressionOptions: n.compressionOptions};
      };
      a.prototype = {internalStream: function (e) {
        var t = null, r = "string";
        try {
          if (!e) throw new Error("No output type specified.");
          var o = "string" === (r = e.toLowerCase()) || "text" === r;
          "binarystring" !== r && "text" !== r || (r = "string"), t = this._decompressWorker();
          var a = !this._dataBinary;
          a && !o && (t = t.pipe(new i.Utf8EncodeWorker)), !a && o && (t = t.pipe(new i.Utf8DecodeWorker));
        } catch (e) {
          (t = new s("error")).error(e);
        }
        return new n(t, r, "");
      }, async: function (e, t) {
        return this.internalStream(e).accumulate(t);
      }, nodeStream: function (e, t) {
        return this.internalStream(e || "nodebuffer").toNodejsStream(t);
      }, _compressWorker: function (e, t) {
        if (this._data instanceof o && this._data.compression.magic === e.magic) return this._data.getCompressedWorker();
        var n = this._decompressWorker();
        return this._dataBinary || (n = n.pipe(new i.Utf8EncodeWorker)), o.createWorkerFrom(n, e, t);
      }, _decompressWorker: function () {
        return this._data instanceof o ? this._data.getContentWorker() : this._data instanceof s ? this._data : new r(this._data);
      }};
      for (var l = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], d = function () {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, A = 0; A < l.length; A++) a.prototype[l[A]] = d;
      t.exports = a;
    }, {"./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31}], 36: [function (e, t) {
      (function (e) {
        "use strict";
        function n() {
          var e, t;
          i = true;
          for (var n = A.length; n;) {
            for (t = A, A = [], e = -1; ++e < n;) t[e]();
            n = A.length;
          }
          i = false;
        }
        var r, i, o = e.MutationObserver || e.WebKitMutationObserver;
        if (o) {
          var s = 0, a = new o(n), l = e.document.createTextNode("");
          a.observe(l, {characterData: true}), r = function () {
            l.data = s = ++s % 2;
          };
        } else if (e.setImmediate || void 0 === e.MessageChannel) r = "document" in e && "onreadystatechange" in e.document.createElement("script") ? function () {
          var t = e.document.createElement("script");
          t.onreadystatechange = function () {
            n(), t.onreadystatechange = null, t.parentNode.removeChild(t), t = null;
          }, e.document.documentElement.appendChild(t);
        } : function () {
          setTimeout(n, 0);
        }; else {
          var d = new e.MessageChannel;
          d.port1.onmessage = n, r = function () {
            d.port2.postMessage(0);
          };
        }
        var A = [];
        t.exports = function (e) {
          1 !== A.push(e) || i || r();
        };
      }.call(this, void 0 !== n.g ? n.g : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}));
    }, {}], 37: [function (e, t) {
      "use strict";
      function n() {}
      function r(e) {
        if ("function" != typeof e) throw new TypeError("resolver must be a function");
        this.state = h, this.queue = [], this.outcome = void 0, e !== n && a(this, e);
      }
      function i(e, t, n) {
        this.promise = e, "function" == typeof t && (this.onFulfilled = t, this.callFulfilled = this.otherCallFulfilled), "function" == typeof n && (this.onRejected = n, this.callRejected = this.otherCallRejected);
      }
      function o(e, t, n) {
        d(function () {
          var r;
          try {
            r = t(n);
          } catch (t) {
            return A.reject(e, t);
          }
          r === e ? A.reject(e, new TypeError("Cannot resolve promise with itself")) : A.resolve(e, r);
        });
      }
      function s(e) {
        var t = e && e.then;
        if (e && ("object" == typeof e || "function" == typeof e) && "function" == typeof t) return function () {
          t.apply(e, arguments);
        };
      }
      function a(e, t) {
        function n(t) {
          i || (i = true, A.reject(e, t));
        }
        function r(t) {
          i || (i = true, A.resolve(e, t));
        }
        var i = false, o = l(function () {
          t(r, n);
        });
        "error" === o.status && n(o.value);
      }
      function l(e, t) {
        var n = {};
        try {
          n.value = e(t), n.status = "success";
        } catch (e) {
          n.status = "error", n.value = e;
        }
        return n;
      }
      var d = e("immediate"), A = {}, c = ["REJECTED"], u = ["FULFILLED"], h = ["PENDING"];
      t.exports = r, r.prototype.finally = function (e) {
        if ("function" != typeof e) return this;
        var t = this.constructor;
        return this.then(function (n) {
          return t.resolve(e()).then(function () {
            return n;
          });
        }, function (n) {
          return t.resolve(e()).then(function () {
            throw n;
          });
        });
      }, r.prototype.catch = function (e) {
        return this.then(null, e);
      }, r.prototype.then = function (e, t) {
        if ("function" != typeof e && this.state === u || "function" != typeof t && this.state === c) return this;
        var r = new this.constructor(n);
        return this.state !== h ? o(r, this.state === u ? e : t, this.outcome) : this.queue.push(new i(r, e, t)), r;
      }, i.prototype.callFulfilled = function (e) {
        A.resolve(this.promise, e);
      }, i.prototype.otherCallFulfilled = function (e) {
        o(this.promise, this.onFulfilled, e);
      }, i.prototype.callRejected = function (e) {
        A.reject(this.promise, e);
      }, i.prototype.otherCallRejected = function (e) {
        o(this.promise, this.onRejected, e);
      }, A.resolve = function (e, t) {
        var n = l(s, t);
        if ("error" === n.status) return A.reject(e, n.value);
        var r = n.value;
        if (r) a(e, r); else {
          e.state = u, e.outcome = t;
          for (var i = -1, o = e.queue.length; ++i < o;) e.queue[i].callFulfilled(t);
        }
        return e;
      }, A.reject = function (e, t) {
        e.state = c, e.outcome = t;
        for (var n = -1, r = e.queue.length; ++n < r;) e.queue[n].callRejected(t);
        return e;
      }, r.resolve = function (e) {
        return e instanceof this ? e : A.resolve(new this(n), e);
      }, r.reject = function (e) {
        var t = new this(n);
        return A.reject(t, e);
      }, r.all = function (e) {
        function t(e, t) {
          r.resolve(e).then(function (e) {
            s[t] = e, ++a !== i || o || (o = true, A.resolve(d, s));
          }, function (e) {
            o || (o = true, A.reject(d, e));
          });
        }
        var r = this;
        if ("[object Array]" !== {}.toString.call(e)) return this.reject(new TypeError("must be an array"));
        var i = e.length, o = false;
        if (!i) return this.resolve([]);
        for (var s = new Array(i), a = 0, l = -1, d = new this(n); ++l < i;) t(e[l], l);
        return d;
      }, r.race = function (e) {
        if ("[object Array]" !== {}.toString.call(e)) return this.reject(new TypeError("must be an array"));
        var t, r = e.length, i = false;
        if (!r) return this.resolve([]);
        for (var o = -1, s = new this(n); ++o < r;) t = e[o], this.resolve(t).then(function (e) {
          i || (i = true, A.resolve(s, e));
        }, function (e) {
          i || (i = true, A.reject(s, e));
        });
        return s;
      };
    }, {immediate: 36}], 38: [function (e, t) {
      "use strict";
      var n = {};
      (0, e("./lib/utils/common").assign)(n, e("./lib/deflate"), e("./lib/inflate"), e("./lib/zlib/constants")), t.exports = n;
    }, {"./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44}], 39: [function (e, t, n) {
      "use strict";
      function r(e) {
        if (!(this instanceof r)) return new r(e);
        this.options = s.assign({level: u, method: p, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: h, to: ""}, e || {});
        var t = this.options;
        t.raw && t.windowBits > 0 ? t.windowBits = -t.windowBits : t.gzip && t.windowBits > 0 && t.windowBits < 16 && (t.windowBits += 16), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new d, this.strm.avail_out = 0;
        var n = o.deflateInit2(this.strm, t.level, t.method, t.windowBits, t.memLevel, t.strategy);
        if (n !== c) throw new Error(l[n]);
        if (t.header && o.deflateSetHeader(this.strm, t.header), t.dictionary) {
          var i;
          if (i = "string" == typeof t.dictionary ? a.string2buf(t.dictionary) : "[object ArrayBuffer]" === A.call(t.dictionary) ? new Uint8Array(t.dictionary) : t.dictionary, (n = o.deflateSetDictionary(this.strm, i)) !== c) throw new Error(l[n]);
          this._dict_set = true;
        }
      }
      function i(e, t) {
        var n = new r(t);
        if (n.push(e, true), n.err) throw n.msg || l[n.err];
        return n.result;
      }
      var o = e("./zlib/deflate"), s = e("./utils/common"), a = e("./utils/strings"), l = e("./zlib/messages"), d = e("./zlib/zstream"), A = {}.toString, c = 0, u = -1, h = 0, p = 8;
      r.prototype.push = function (e, t) {
        var n, r, i = this.strm, l = this.options.chunkSize;
        if (this.ended) return false;
        r = t === ~~t ? t : true === t ? 4 : 0, "string" == typeof e ? i.input = a.string2buf(e) : "[object ArrayBuffer]" === A.call(e) ? i.input = new Uint8Array(e) : i.input = e, i.next_in = 0, i.avail_in = i.input.length;
        do {
          if (0 === i.avail_out && (i.output = new s.Buf8(l), i.next_out = 0, i.avail_out = l), 1 !== (n = o.deflate(i, r)) && n !== c) return this.onEnd(n), this.ended = true, false;
          0 !== i.avail_out && (0 !== i.avail_in || 4 !== r && 2 !== r) || ("string" === this.options.to ? this.onData(a.buf2binstring(s.shrinkBuf(i.output, i.next_out))) : this.onData(s.shrinkBuf(i.output, i.next_out)));
        } while ((i.avail_in > 0 || 0 === i.avail_out) && 1 !== n);
        return 4 === r ? (n = o.deflateEnd(this.strm), this.onEnd(n), this.ended = true, n === c) : 2 !== r || (this.onEnd(c), i.avail_out = 0, true);
      }, r.prototype.onData = function (e) {
        this.chunks.push(e);
      }, r.prototype.onEnd = function (e) {
        e === c && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = s.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
      }, n.Deflate = r, n.deflate = i, n.deflateRaw = function (e, t) {
        return (t = t || {}).raw = true, i(e, t);
      }, n.gzip = function (e, t) {
        return (t = t || {}).gzip = true, i(e, t);
      };
    }, {"./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53}], 40: [function (e, t, n) {
      "use strict";
      function r(e) {
        if (!(this instanceof r)) return new r(e);
        this.options = s.assign({chunkSize: 16384, windowBits: 0, to: ""}, e || {});
        var t = this.options;
        t.raw && t.windowBits >= 0 && t.windowBits < 16 && (t.windowBits = -t.windowBits, 0 === t.windowBits && (t.windowBits = -15)), !(t.windowBits >= 0 && t.windowBits < 16) || e && e.windowBits || (t.windowBits += 32), t.windowBits > 15 && t.windowBits < 48 && 0 == (15 & t.windowBits) && (t.windowBits |= 15), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new A, this.strm.avail_out = 0;
        var n = o.inflateInit2(this.strm, t.windowBits);
        if (n !== l.Z_OK) throw new Error(d[n]);
        this.header = new c, o.inflateGetHeader(this.strm, this.header);
      }
      function i(e, t) {
        var n = new r(t);
        if (n.push(e, true), n.err) throw n.msg || d[n.err];
        return n.result;
      }
      var o = e("./zlib/inflate"), s = e("./utils/common"), a = e("./utils/strings"), l = e("./zlib/constants"), d = e("./zlib/messages"), A = e("./zlib/zstream"), c = e("./zlib/gzheader"), u = {}.toString;
      r.prototype.push = function (e, t) {
        var n, r, i, d, A, c, h = this.strm, p = this.options.chunkSize, f = this.options.dictionary, m = false;
        if (this.ended) return false;
        r = t === ~~t ? t : true === t ? l.Z_FINISH : l.Z_NO_FLUSH, "string" == typeof e ? h.input = a.binstring2buf(e) : "[object ArrayBuffer]" === u.call(e) ? h.input = new Uint8Array(e) : h.input = e, h.next_in = 0, h.avail_in = h.input.length;
        do {
          if (0 === h.avail_out && (h.output = new s.Buf8(p), h.next_out = 0, h.avail_out = p), (n = o.inflate(h, l.Z_NO_FLUSH)) === l.Z_NEED_DICT && f && (c = "string" == typeof f ? a.string2buf(f) : "[object ArrayBuffer]" === u.call(f) ? new Uint8Array(f) : f, n = o.inflateSetDictionary(this.strm, c)), n === l.Z_BUF_ERROR && true === m && (n = l.Z_OK, m = false), n !== l.Z_STREAM_END && n !== l.Z_OK) return this.onEnd(n), this.ended = true, false;
          h.next_out && (0 !== h.avail_out && n !== l.Z_STREAM_END && (0 !== h.avail_in || r !== l.Z_FINISH && r !== l.Z_SYNC_FLUSH) || ("string" === this.options.to ? (i = a.utf8border(h.output, h.next_out), d = h.next_out - i, A = a.buf2string(h.output, i), h.next_out = d, h.avail_out = p - d, d && s.arraySet(h.output, h.output, i, d, 0), this.onData(A)) : this.onData(s.shrinkBuf(h.output, h.next_out)))), 0 === h.avail_in && 0 === h.avail_out && (m = true);
        } while ((h.avail_in > 0 || 0 === h.avail_out) && n !== l.Z_STREAM_END);
        return n === l.Z_STREAM_END && (r = l.Z_FINISH), r === l.Z_FINISH ? (n = o.inflateEnd(this.strm), this.onEnd(n), this.ended = true, n === l.Z_OK) : r !== l.Z_SYNC_FLUSH || (this.onEnd(l.Z_OK), h.avail_out = 0, true);
      }, r.prototype.onData = function (e) {
        this.chunks.push(e);
      }, r.prototype.onEnd = function (e) {
        e === l.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = s.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
      }, n.Inflate = r, n.inflate = i, n.inflateRaw = function (e, t) {
        return (t = t || {}).raw = true, i(e, t);
      }, n.ungzip = i;
    }, {"./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53}], 41: [function (e, t, n) {
      "use strict";
      var r = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
      n.assign = function (e) {
        for (var t = [].slice.call(arguments, 1); t.length;) {
          var n = t.shift();
          if (n) {
            if ("object" != typeof n) throw new TypeError(n + "must be non-object");
            for (var r in n) n.hasOwnProperty(r) && (e[r] = n[r]);
          }
        }
        return e;
      }, n.shrinkBuf = function (e, t) {
        return e.length === t ? e : e.subarray ? e.subarray(0, t) : (e.length = t, e);
      };
      var i = {arraySet: function (e, t, n, r, i) {
        if (t.subarray && e.subarray) e.set(t.subarray(n, n + r), i); else for (var o = 0; o < r; o++) e[i + o] = t[n + o];
      }, flattenChunks: function (e) {
        var t, n, r, i, o, s;
        for (r = 0, t = 0, n = e.length; t < n; t++) r += e[t].length;
        for (s = new Uint8Array(r), i = 0, t = 0, n = e.length; t < n; t++) o = e[t], s.set(o, i), i += o.length;
        return s;
      }}, o = {arraySet: function (e, t, n, r, i) {
        for (var o = 0; o < r; o++) e[i + o] = t[n + o];
      }, flattenChunks: function (e) {
        return [].concat.apply([], e);
      }};
      n.setTyped = function (e) {
        e ? (n.Buf8 = Uint8Array, n.Buf16 = Uint16Array, n.Buf32 = Int32Array, n.assign(n, i)) : (n.Buf8 = Array, n.Buf16 = Array, n.Buf32 = Array, n.assign(n, o));
      }, n.setTyped(r);
    }, {}], 42: [function (e, t, n) {
      "use strict";
      function r(e, t) {
        if (t < 65537 && (e.subarray && s || !e.subarray && o)) return String.fromCharCode.apply(null, i.shrinkBuf(e, t));
        for (var n = "", r = 0; r < t; r++) n += String.fromCharCode(e[r]);
        return n;
      }
      var i = e("./common"), o = true, s = true;
      try {
        String.fromCharCode.apply(null, [0]);
      } catch (e) {
        o = false;
      }
      try {
        String.fromCharCode.apply(null, new Uint8Array(1));
      } catch (e) {
        s = false;
      }
      for (var a = new i.Buf8(256), l = 0; l < 256; l++) a[l] = l >= 252 ? 6 : l >= 248 ? 5 : l >= 240 ? 4 : l >= 224 ? 3 : l >= 192 ? 2 : 1;
      a[254] = a[254] = 1, n.string2buf = function (e) {
        var t, n, r, o, s, a = e.length, l = 0;
        for (o = 0; o < a; o++) 55296 == (64512 & (n = e.charCodeAt(o))) && o + 1 < a && 56320 == (64512 & (r = e.charCodeAt(o + 1))) && (n = 65536 + (n - 55296 << 10) + (r - 56320), o++), l += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
        for (t = new i.Buf8(l), s = 0, o = 0; s < l; o++) 55296 == (64512 & (n = e.charCodeAt(o))) && o + 1 < a && 56320 == (64512 & (r = e.charCodeAt(o + 1))) && (n = 65536 + (n - 55296 << 10) + (r - 56320), o++), n < 128 ? t[s++] = n : n < 2048 ? (t[s++] = 192 | n >>> 6, t[s++] = 128 | 63 & n) : n < 65536 ? (t[s++] = 224 | n >>> 12, t[s++] = 128 | n >>> 6 & 63, t[s++] = 128 | 63 & n) : (t[s++] = 240 | n >>> 18, t[s++] = 128 | n >>> 12 & 63, t[s++] = 128 | n >>> 6 & 63, t[s++] = 128 | 63 & n);
        return t;
      }, n.buf2binstring = function (e) {
        return r(e, e.length);
      }, n.binstring2buf = function (e) {
        for (var t = new i.Buf8(e.length), n = 0, r = t.length; n < r; n++) t[n] = e.charCodeAt(n);
        return t;
      }, n.buf2string = function (e, t) {
        var n, i, o, s, l = t || e.length, d = new Array(2 * l);
        for (i = 0, n = 0; n < l;) if ((o = e[n++]) < 128) d[i++] = o; else if ((s = a[o]) > 4) d[i++] = 65533, n += s - 1; else {
          for (o &= 2 === s ? 31 : 3 === s ? 15 : 7; s > 1 && n < l;) o = o << 6 | 63 & e[n++], s--;
          s > 1 ? d[i++] = 65533 : o < 65536 ? d[i++] = o : (o -= 65536, d[i++] = 55296 | o >> 10 & 1023, d[i++] = 56320 | 1023 & o);
        }
        return r(d, i);
      }, n.utf8border = function (e, t) {
        var n;
        for ((t = t || e.length) > e.length && (t = e.length), n = t - 1; n >= 0 && 128 == (192 & e[n]);) n--;
        return n < 0 || 0 === n ? t : n + a[e[n]] > t ? n : t;
      };
    }, {"./common": 41}], 43: [function (e, t) {
      "use strict";
      t.exports = function (e, t, n, r) {
        for (var i = 65535 & e | 0, o = e >>> 16 & 65535 | 0, s = 0; 0 !== n;) {
          n -= s = n > 2e3 ? 2e3 : n;
          do {
            o = o + (i = i + t[r++] | 0) | 0;
          } while (--s);
          i %= 65521, o %= 65521;
        }
        return i | o << 16 | 0;
      };
    }, {}], 44: [function (e, t) {
      "use strict";
      t.exports = {Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8};
    }, {}], 45: [function (e, t) {
      "use strict";
      var n = function () {
        for (var e, t = [], n = 0; n < 256; n++) {
          e = n;
          for (var r = 0; r < 8; r++) e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
          t[n] = e;
        }
        return t;
      }();
      t.exports = function (e, t, r, i) {
        var o = n, s = i + r;
        e ^= -1;
        for (var a = i; a < s; a++) e = e >>> 8 ^ o[255 & (e ^ t[a])];
        return -1 ^ e;
      };
    }, {}], 46: [function (e, t, n) {
      "use strict";
      function o(e) {
        for (var t = e.length; --t >= 0;) e[t] = 0;
      }
      function s(e) {
        var t = e.state, n = t.pending;
        n > e.avail_out && (n = e.avail_out), 0 !== n && (v.arraySet(e.output, t.pending_buf, t.pending_out, n, e.next_out), e.next_out += n, t.pending_out += n, e.total_out += n, e.avail_out -= n, t.pending -= n, 0 === t.pending && (t.pending_out = 0));
      }
      function a(e, t) {
        k._tr_flush_block(e, e.block_start >= 0 ? e.block_start : -1, e.strstart - e.block_start, t), e.block_start = e.strstart, s(e.strm);
      }
      function l(e, t) {
        e.pending_buf[e.pending++] = t;
      }
      function d(e, t) {
        e.pending_buf[e.pending++] = t >>> 8 & 255, e.pending_buf[e.pending++] = 255 & t;
      }
      function A(e, t) {
        var n, r, i = e.max_chain_length, o = e.strstart, s = e.prev_length, a = e.nice_match, l = e.strstart > e.w_size - N ? e.strstart - (e.w_size - N) : 0, d = e.window, A = e.w_mask, c = e.prev, u = e.strstart + z, h = d[o + s - 1], p = d[o + s];
        e.prev_length >= e.good_match && (i >>= 2), a > e.lookahead && (a = e.lookahead);
        do {
          if (d[(n = t) + s] === p && d[n + s - 1] === h && d[n] === d[o] && d[++n] === d[o + 1]) {
            o += 2, n++;
            do {} while (d[++o] === d[++n] && d[++o] === d[++n] && d[++o] === d[++n] && d[++o] === d[++n] && d[++o] === d[++n] && d[++o] === d[++n] && d[++o] === d[++n] && d[++o] === d[++n] && o < u);
            if (r = z - (u - o), o = u - z, r > s) {
              if (e.match_start = t, s = r, r >= a) break;
              h = d[o + s - 1], p = d[o + s];
            }
          }
        } while ((t = c[t & A]) > l && 0 != --i);
        return s <= e.lookahead ? s : e.lookahead;
      }
      function c(e) {
        var t, n, r, i, o, s, a, l, d, A, c = e.w_size;
        do {
          if (i = e.window_size - e.lookahead - e.strstart, e.strstart >= c + (c - N)) {
            v.arraySet(e.window, e.window, c, c, 0), e.match_start -= c, e.strstart -= c, e.block_start -= c, t = n = e.hash_size;
            do {
              r = e.head[--t], e.head[t] = r >= c ? r - c : 0;
            } while (--n);
            t = n = c;
            do {
              r = e.prev[--t], e.prev[t] = r >= c ? r - c : 0;
            } while (--n);
            i += c;
          }
          if (0 === e.strm.avail_in) break;
          if (s = e.strm, a = e.window, l = e.strstart + e.lookahead, d = i, A = void 0, (A = s.avail_in) > d && (A = d), n = 0 === A ? 0 : (s.avail_in -= A, v.arraySet(a, s.input, s.next_in, A, l), 1 === s.state.wrap ? s.adler = y(s.adler, a, A, l) : 2 === s.state.wrap && (s.adler = w(s.adler, a, A, l)), s.next_in += A, s.total_in += A, A), e.lookahead += n, e.lookahead + e.insert >= D) for (o = e.strstart - e.insert, e.ins_h = e.window[o], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[o + 1]) & e.hash_mask; e.insert && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[o + D - 1]) & e.hash_mask, e.prev[o & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = o, o++, e.insert--, !(e.lookahead + e.insert < D));) ;
        } while (e.lookahead < N && 0 !== e.strm.avail_in);
      }
      function u(e, t) {
        for (var n, r;;) {
          if (e.lookahead < N) {
            if (c(e), e.lookahead < N && t === C) return X;
            if (0 === e.lookahead) break;
          }
          if (n = 0, e.lookahead >= D && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + D - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), 0 !== n && e.strstart - n <= e.w_size - N && (e.match_length = A(e, n)), e.match_length >= D) if (r = k._tr_tally(e, e.strstart - e.match_start, e.match_length - D), e.lookahead -= e.match_length, e.match_length <= e.max_lazy_match && e.lookahead >= D) {
            e.match_length--;
            do {
              e.strstart++, e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + D - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart;
            } while (0 != --e.match_length);
            e.strstart++;
          } else e.strstart += e.match_length, e.match_length = 0, e.ins_h = e.window[e.strstart], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 1]) & e.hash_mask; else r = k._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++;
          if (r && (a(e, false), 0 === e.strm.avail_out)) return X;
        }
        return e.insert = e.strstart < D - 1 ? e.strstart : D - 1, t === x ? (a(e, true), 0 === e.strm.avail_out ? Y : q) : e.last_lit && (a(e, false), 0 === e.strm.avail_out) ? X : W;
      }
      function h(e, t) {
        for (var n, r, i;;) {
          if (e.lookahead < N) {
            if (c(e), e.lookahead < N && t === C) return X;
            if (0 === e.lookahead) break;
          }
          if (n = 0, e.lookahead >= D && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + D - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), e.prev_length = e.match_length, e.prev_match = e.match_start, e.match_length = D - 1, 0 !== n && e.prev_length < e.max_lazy_match && e.strstart - n <= e.w_size - N && (e.match_length = A(e, n), e.match_length <= 5 && (e.strategy === S || e.match_length === D && e.strstart - e.match_start > 4096) && (e.match_length = D - 1)), e.prev_length >= D && e.match_length <= e.prev_length) {
            i = e.strstart + e.lookahead - D, r = k._tr_tally(e, e.strstart - 1 - e.prev_match, e.prev_length - D), e.lookahead -= e.prev_length - 1, e.prev_length -= 2;
            do {
              ++e.strstart <= i && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + D - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart);
            } while (0 != --e.prev_length);
            if (e.match_available = 0, e.match_length = D - 1, e.strstart++, r && (a(e, false), 0 === e.strm.avail_out)) return X;
          } else if (e.match_available) {
            if ((r = k._tr_tally(e, 0, e.window[e.strstart - 1])) && a(e, false), e.strstart++, e.lookahead--, 0 === e.strm.avail_out) return X;
          } else e.match_available = 1, e.strstart++, e.lookahead--;
        }
        return e.match_available && (r = k._tr_tally(e, 0, e.window[e.strstart - 1]), e.match_available = 0), e.insert = e.strstart < D - 1 ? e.strstart : D - 1, t === x ? (a(e, true), 0 === e.strm.avail_out ? Y : q) : e.last_lit && (a(e, false), 0 === e.strm.avail_out) ? X : W;
      }
      function p(e, t, n, r, i) {
        this.good_length = e, this.max_lazy = t, this.nice_length = n, this.max_chain = r, this.func = i;
      }
      function f() {
        this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = T, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new v.Buf16(2 * L), this.dyn_dtree = new v.Buf16(2 * (2 * M + 1)), this.bl_tree = new v.Buf16(2 * (2 * O + 1)), o(this.dyn_ltree), o(this.dyn_dtree), o(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new v.Buf16(j + 1), this.heap = new v.Buf16(2 * F + 1), o(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new v.Buf16(2 * F + 1), o(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
      }
      function m(e) {
        var t;
        return e && e.state ? (e.total_in = e.total_out = 0, e.data_type = I, (t = e.state).pending = 0, t.pending_out = 0, t.wrap < 0 && (t.wrap = -t.wrap), t.status = t.wrap ? P : Q, e.adler = 2 === t.wrap ? 0 : 1, t.last_flush = C, k._tr_init(t), E) : (e.msg = R[G], G);
      }
      function g(e) {
        var t, n = m(e);
        return n === E && ((t = e.state).window_size = 2 * t.w_size, o(t.head), t.max_lazy_match = b[t.level].max_lazy, t.good_match = b[t.level].good_length, t.nice_match = b[t.level].nice_length, t.max_chain_length = b[t.level].max_chain, t.strstart = 0, t.block_start = 0, t.lookahead = 0, t.insert = 0, t.match_length = t.prev_length = D - 1, t.match_available = 0, t.ins_h = 0), n;
      }
      function _(e, t, n, i, o, s) {
        if (!e) return G;
        var a = 1;
        if (t === Z && (t = 6), i < 0 ? (a = 0, i = -i) : i > 15 && (a = 2, i -= 16), o < 1 || o > U || n !== T || i < 8 || i > 15 || t < 0 || t > 9 || s < 0 || s > B) return e.msg = R[G], G;
        8 === i && (i = 9);
        var l = new f;
        return e.state = l, l.strm = e, l.wrap = a, l.gzhead = null, l.w_bits = i, l.w_size = 1 << l.w_bits, l.w_mask = l.w_size - 1, l.hash_bits = o + 7, l.hash_size = 1 << l.hash_bits, l.hash_mask = l.hash_size - 1, l.hash_shift = ~~((l.hash_bits + D - 1) / D), l.window = new v.Buf8(2 * l.w_size), l.head = new v.Buf16(l.hash_size), l.prev = new v.Buf16(l.w_size), l.lit_bufsize = 1 << o + 6, l.pending_buf_size = 4 * l.lit_bufsize, l.pending_buf = new v.Buf8(l.pending_buf_size), l.d_buf = 1 * l.lit_bufsize, l.l_buf = 3 * l.lit_bufsize, l.level = t, l.strategy = s, l.method = n, g(e);
      }
      var b, v = e("../utils/common"), k = e("./trees"), y = e("./adler32"), w = e("./crc32"), R = e("./messages"), C = 0, x = 4, E = 0, G = -2, Z = -1, S = 1, B = 4, I = 2, T = 8, U = 9, F = 286, M = 30, O = 19, L = 2 * F + 1, j = 15, D = 3, z = 258, N = z + D + 1, P = 42, V = 103, Q = 113, H = 666, X = 1, W = 2, Y = 3, q = 4;
      b = [new p(0, 0, 0, 0, function (e, t) {
        var n = 65535;
        for (n > e.pending_buf_size - 5 && (n = e.pending_buf_size - 5);;) {
          if (e.lookahead <= 1) {
            if (c(e), 0 === e.lookahead && t === C) return X;
            if (0 === e.lookahead) break;
          }
          e.strstart += e.lookahead, e.lookahead = 0;
          var r = e.block_start + n;
          if ((0 === e.strstart || e.strstart >= r) && (e.lookahead = e.strstart - r, e.strstart = r, a(e, false), 0 === e.strm.avail_out)) return X;
          if (e.strstart - e.block_start >= e.w_size - N && (a(e, false), 0 === e.strm.avail_out)) return X;
        }
        return e.insert = 0, t === x ? (a(e, true), 0 === e.strm.avail_out ? Y : q) : (e.strstart > e.block_start && (a(e, false), e.strm.avail_out), X);
      }), new p(4, 4, 8, 4, u), new p(4, 5, 16, 8, u), new p(4, 6, 32, 32, u), new p(4, 4, 16, 16, h), new p(8, 16, 32, 32, h), new p(8, 16, 128, 128, h), new p(8, 32, 128, 256, h), new p(32, 128, 258, 1024, h), new p(32, 258, 258, 4096, h)], n.deflateInit = function (e, t) {
        return _(e, t, T, 15, 8, 0);
      }, n.deflateInit2 = _, n.deflateReset = g, n.deflateResetKeep = m, n.deflateSetHeader = function (e, t) {
        return e && e.state ? 2 !== e.state.wrap ? G : (e.state.gzhead = t, E) : G;
      }, n.deflate = function (e, t) {
        var n, A, u, h;
        if (!e || !e.state || t > 5 || t < 0) return e ? (e.msg = R[G], G) : G;
        if (A = e.state, !e.output || !e.input && 0 !== e.avail_in || A.status === H && t !== x) return e.msg = R[0 === e.avail_out ? -5 : G], 0 === e.avail_out ? -5 : G;
        if (A.strm = e, n = A.last_flush, A.last_flush = t, A.status === P) if (2 === A.wrap) e.adler = 0, l(A, 31), l(A, 139), l(A, 8), A.gzhead ? (l(A, (A.gzhead.text ? 1 : 0) + (A.gzhead.hcrc ? 2 : 0) + (A.gzhead.extra ? 4 : 0) + (A.gzhead.name ? 8 : 0) + (A.gzhead.comment ? 16 : 0)), l(A, 255 & A.gzhead.time), l(A, A.gzhead.time >> 8 & 255), l(A, A.gzhead.time >> 16 & 255), l(A, A.gzhead.time >> 24 & 255), l(A, 9 === A.level ? 2 : A.strategy >= 2 || A.level < 2 ? 4 : 0), l(A, 255 & A.gzhead.os), A.gzhead.extra && A.gzhead.extra.length && (l(A, 255 & A.gzhead.extra.length), l(A, A.gzhead.extra.length >> 8 & 255)), A.gzhead.hcrc && (e.adler = w(e.adler, A.pending_buf, A.pending, 0)), A.gzindex = 0, A.status = 69) : (l(A, 0), l(A, 0), l(A, 0), l(A, 0), l(A, 0), l(A, 9 === A.level ? 2 : A.strategy >= 2 || A.level < 2 ? 4 : 0), l(A, 3), A.status = Q); else {
          var p = T + (A.w_bits - 8 << 4) << 8;
          p |= (A.strategy >= 2 || A.level < 2 ? 0 : A.level < 6 ? 1 : 6 === A.level ? 2 : 3) << 6, 0 !== A.strstart && (p |= 32), p += 31 - p % 31, A.status = Q, d(A, p), 0 !== A.strstart && (d(A, e.adler >>> 16), d(A, 65535 & e.adler)), e.adler = 1;
        }
        if (69 === A.status) if (A.gzhead.extra) {
          for (u = A.pending; A.gzindex < (65535 & A.gzhead.extra.length) && (A.pending !== A.pending_buf_size || (A.gzhead.hcrc && A.pending > u && (e.adler = w(e.adler, A.pending_buf, A.pending - u, u)), s(e), u = A.pending, A.pending !== A.pending_buf_size));) l(A, 255 & A.gzhead.extra[A.gzindex]), A.gzindex++;
          A.gzhead.hcrc && A.pending > u && (e.adler = w(e.adler, A.pending_buf, A.pending - u, u)), A.gzindex === A.gzhead.extra.length && (A.gzindex = 0, A.status = 73);
        } else A.status = 73;
        if (73 === A.status) if (A.gzhead.name) {
          u = A.pending;
          do {
            if (A.pending === A.pending_buf_size && (A.gzhead.hcrc && A.pending > u && (e.adler = w(e.adler, A.pending_buf, A.pending - u, u)), s(e), u = A.pending, A.pending === A.pending_buf_size)) {
              h = 1;
              break;
            }
            h = A.gzindex < A.gzhead.name.length ? 255 & A.gzhead.name.charCodeAt(A.gzindex++) : 0, l(A, h);
          } while (0 !== h);
          A.gzhead.hcrc && A.pending > u && (e.adler = w(e.adler, A.pending_buf, A.pending - u, u)), 0 === h && (A.gzindex = 0, A.status = 91);
        } else A.status = 91;
        if (91 === A.status) if (A.gzhead.comment) {
          u = A.pending;
          do {
            if (A.pending === A.pending_buf_size && (A.gzhead.hcrc && A.pending > u && (e.adler = w(e.adler, A.pending_buf, A.pending - u, u)), s(e), u = A.pending, A.pending === A.pending_buf_size)) {
              h = 1;
              break;
            }
            h = A.gzindex < A.gzhead.comment.length ? 255 & A.gzhead.comment.charCodeAt(A.gzindex++) : 0, l(A, h);
          } while (0 !== h);
          A.gzhead.hcrc && A.pending > u && (e.adler = w(e.adler, A.pending_buf, A.pending - u, u)), 0 === h && (A.status = V);
        } else A.status = V;
        if (A.status === V && (A.gzhead.hcrc ? (A.pending + 2 > A.pending_buf_size && s(e), A.pending + 2 <= A.pending_buf_size && (l(A, 255 & e.adler), l(A, e.adler >> 8 & 255), e.adler = 0, A.status = Q)) : A.status = Q), 0 !== A.pending) {
          if (s(e), 0 === e.avail_out) return A.last_flush = -1, E;
        } else if (0 === e.avail_in && (t << 1) - (t > 4 ? 9 : 0) <= (n << 1) - (n > 4 ? 9 : 0) && t !== x) return e.msg = R[-5], -5;
        if (A.status === H && 0 !== e.avail_in) return e.msg = R[-5], -5;
        if (0 !== e.avail_in || 0 !== A.lookahead || t !== C && A.status !== H) {
          var f = 2 === A.strategy ? function (e, t) {
            for (var n;;) {
              if (0 === e.lookahead && (c(e), 0 === e.lookahead)) {
                if (t === C) return X;
                break;
              }
              if (e.match_length = 0, n = k._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++, n && (a(e, false), 0 === e.strm.avail_out)) return X;
            }
            return e.insert = 0, t === x ? (a(e, true), 0 === e.strm.avail_out ? Y : q) : e.last_lit && (a(e, false), 0 === e.strm.avail_out) ? X : W;
          }(A, t) : 3 === A.strategy ? function (e, t) {
            for (var n, r, i, o, s = e.window;;) {
              if (e.lookahead <= z) {
                if (c(e), e.lookahead <= z && t === C) return X;
                if (0 === e.lookahead) break;
              }
              if (e.match_length = 0, e.lookahead >= D && e.strstart > 0 && (r = s[i = e.strstart - 1]) === s[++i] && r === s[++i] && r === s[++i]) {
                o = e.strstart + z;
                do {} while (r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && i < o);
                e.match_length = z - (o - i), e.match_length > e.lookahead && (e.match_length = e.lookahead);
              }
              if (e.match_length >= D ? (n = k._tr_tally(e, 1, e.match_length - D), e.lookahead -= e.match_length, e.strstart += e.match_length, e.match_length = 0) : (n = k._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++), n && (a(e, false), 0 === e.strm.avail_out)) return X;
            }
            return e.insert = 0, t === x ? (a(e, true), 0 === e.strm.avail_out ? Y : q) : e.last_lit && (a(e, false), 0 === e.strm.avail_out) ? X : W;
          }(A, t) : b[A.level].func(A, t);
          if (f !== Y && f !== q || (A.status = H), f === X || f === Y) return 0 === e.avail_out && (A.last_flush = -1), E;
          if (f === W && (1 === t ? k._tr_align(A) : 5 !== t && (k._tr_stored_block(A, 0, 0, false), 3 === t && (o(A.head), 0 === A.lookahead && (A.strstart = 0, A.block_start = 0, A.insert = 0))), s(e), 0 === e.avail_out)) return A.last_flush = -1, E;
        }
        return t !== x ? E : A.wrap <= 0 ? 1 : (2 === A.wrap ? (l(A, 255 & e.adler), l(A, e.adler >> 8 & 255), l(A, e.adler >> 16 & 255), l(A, e.adler >> 24 & 255), l(A, 255 & e.total_in), l(A, e.total_in >> 8 & 255), l(A, e.total_in >> 16 & 255), l(A, e.total_in >> 24 & 255)) : (d(A, e.adler >>> 16), d(A, 65535 & e.adler)), s(e), A.wrap > 0 && (A.wrap = -A.wrap), 0 !== A.pending ? E : 1);
      }, n.deflateEnd = function (e) {
        var t;
        return e && e.state ? (t = e.state.status) !== P && 69 !== t && 73 !== t && 91 !== t && t !== V && t !== Q && t !== H ? (e.msg = R[G], G) : (e.state = null, t === Q ? (e.msg = R[-3], -3) : E) : G;
      }, n.deflateSetDictionary = function (e, t) {
        var n, r, i, s, a, l, d, A, u = t.length;
        if (!e || !e.state) return G;
        if (2 === (s = (n = e.state).wrap) || 1 === s && n.status !== P || n.lookahead) return G;
        for (1 === s && (e.adler = y(e.adler, t, u, 0)), n.wrap = 0, u >= n.w_size && (0 === s && (o(n.head), n.strstart = 0, n.block_start = 0, n.insert = 0), A = new v.Buf8(n.w_size), v.arraySet(A, t, u - n.w_size, n.w_size, 0), t = A, u = n.w_size), a = e.avail_in, l = e.next_in, d = e.input, e.avail_in = u, e.next_in = 0, e.input = t, c(n); n.lookahead >= D;) {
          r = n.strstart, i = n.lookahead - (D - 1);
          do {
            n.ins_h = (n.ins_h << n.hash_shift ^ n.window[r + D - 1]) & n.hash_mask, n.prev[r & n.w_mask] = n.head[n.ins_h], n.head[n.ins_h] = r, r++;
          } while (--i);
          n.strstart = r, n.lookahead = D - 1, c(n);
        }
        return n.strstart += n.lookahead, n.block_start = n.strstart, n.insert = n.lookahead, n.lookahead = 0, n.match_length = n.prev_length = D - 1, n.match_available = 0, e.next_in = l, e.input = d, e.avail_in = a, n.wrap = s, E;
      }, n.deflateInfo = "pako deflate (from Nodeca project)";
    }, {"../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52}], 47: [function (e, t) {
      "use strict";
      t.exports = function () {
        this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = false;
      };
    }, {}], 48: [function (e, t) {
      "use strict";
      t.exports = function (e, t) {
        var n, r, i, o, s, a, l, d, A, c, u, h, p, f, m, g, _, b, v, k, y, w, R, C, x;
        n = e.state, r = e.next_in, C = e.input, i = r + (e.avail_in - 5), o = e.next_out, x = e.output, s = o - (t - e.avail_out), a = o + (e.avail_out - 257), l = n.dmax, d = n.wsize, A = n.whave, c = n.wnext, u = n.window, h = n.hold, p = n.bits, f = n.lencode, m = n.distcode, g = (1 << n.lenbits) - 1, _ = (1 << n.distbits) - 1;
        e: do {
          p < 15 && (h += C[r++] << p, p += 8, h += C[r++] << p, p += 8), b = f[h & g];
          t: for (;;) {
            if (h >>>= v = b >>> 24, p -= v, 0 == (v = b >>> 16 & 255)) x[o++] = 65535 & b; else {
              if (!(16 & v)) {
                if (0 == (64 & v)) {
                  b = f[(65535 & b) + (h & (1 << v) - 1)];
                  continue t;
                }
                if (32 & v) {
                  n.mode = 12;
                  break e;
                }
                e.msg = "invalid literal/length code", n.mode = 30;
                break e;
              }
              k = 65535 & b, (v &= 15) && (p < v && (h += C[r++] << p, p += 8), k += h & (1 << v) - 1, h >>>= v, p -= v), p < 15 && (h += C[r++] << p, p += 8, h += C[r++] << p, p += 8), b = m[h & _];
              n: for (;;) {
                if (h >>>= v = b >>> 24, p -= v, !(16 & (v = b >>> 16 & 255))) {
                  if (0 == (64 & v)) {
                    b = m[(65535 & b) + (h & (1 << v) - 1)];
                    continue n;
                  }
                  e.msg = "invalid distance code", n.mode = 30;
                  break e;
                }
                if (y = 65535 & b, p < (v &= 15) && (h += C[r++] << p, (p += 8) < v && (h += C[r++] << p, p += 8)), (y += h & (1 << v) - 1) > l) {
                  e.msg = "invalid distance too far back", n.mode = 30;
                  break e;
                }
                if (h >>>= v, p -= v, y > (v = o - s)) {
                  if ((v = y - v) > A && n.sane) {
                    e.msg = "invalid distance too far back", n.mode = 30;
                    break e;
                  }
                  if (w = 0, R = u, 0 === c) {
                    if (w += d - v, v < k) {
                      k -= v;
                      do {
                        x[o++] = u[w++];
                      } while (--v);
                      w = o - y, R = x;
                    }
                  } else if (c < v) {
                    if (w += d + c - v, (v -= c) < k) {
                      k -= v;
                      do {
                        x[o++] = u[w++];
                      } while (--v);
                      if (w = 0, c < k) {
                        k -= v = c;
                        do {
                          x[o++] = u[w++];
                        } while (--v);
                        w = o - y, R = x;
                      }
                    }
                  } else if (w += c - v, v < k) {
                    k -= v;
                    do {
                      x[o++] = u[w++];
                    } while (--v);
                    w = o - y, R = x;
                  }
                  for (; k > 2;) x[o++] = R[w++], x[o++] = R[w++], x[o++] = R[w++], k -= 3;
                  k && (x[o++] = R[w++], k > 1 && (x[o++] = R[w++]));
                } else {
                  w = o - y;
                  do {
                    x[o++] = x[w++], x[o++] = x[w++], x[o++] = x[w++], k -= 3;
                  } while (k > 2);
                  k && (x[o++] = x[w++], k > 1 && (x[o++] = x[w++]));
                }
                break;
              }
            }
            break;
          }
        } while (r < i && o < a);
        r -= k = p >> 3, h &= (1 << (p -= k << 3)) - 1, e.next_in = r, e.next_out = o, e.avail_in = r < i ? i - r + 5 : 5 - (r - i), e.avail_out = o < a ? a - o + 257 : 257 - (o - a), n.hold = h, n.bits = p;
      };
    }, {}], 49: [function (e, t, n) {
      "use strict";
      function i() {
        this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new h.Buf16(320), this.work = new h.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
      }
      function o(e) {
        var t;
        return e && e.state ? (t = e.state, e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = 1 & t.wrap), t.mode = y, t.last = 0, t.havedict = 0, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new h.Buf32(C), t.distcode = t.distdyn = new h.Buf32(x), t.sane = 1, t.back = -1, v) : k;
      }
      function s(e) {
        var t;
        return e && e.state ? ((t = e.state).wsize = 0, t.whave = 0, t.wnext = 0, o(e)) : k;
      }
      function a(e, t) {
        var n, r;
        return e && e.state ? (r = e.state, t < 0 ? (n = 0, t = -t) : (n = 1 + (t >> 4), t < 48 && (t &= 15)), t && (t < 8 || t > 15) ? k : (null !== r.window && r.wbits !== t && (r.window = null), r.wrap = n, r.wbits = t, s(e))) : k;
      }
      function l(e, t) {
        var n, r;
        return e ? (r = new i, e.state = r, r.window = null, (n = a(e, t)) !== v && (e.state = null), n) : k;
      }
      function d(e) {
        if (E) {
          var t;
          for (c = new h.Buf32(512), u = new h.Buf32(32), t = 0; t < 144;) e.lens[t++] = 8;
          for (; t < 256;) e.lens[t++] = 9;
          for (; t < 280;) e.lens[t++] = 7;
          for (; t < 288;) e.lens[t++] = 8;
          for (g(_, e.lens, 0, 288, c, 0, e.work, {bits: 9}), t = 0; t < 32;) e.lens[t++] = 5;
          g(b, e.lens, 0, 32, u, 0, e.work, {bits: 5}), E = false;
        }
        e.lencode = c, e.lenbits = 9, e.distcode = u, e.distbits = 5;
      }
      function A(e, t, n, r) {
        var i, o = e.state;
        return null === o.window && (o.wsize = 1 << o.wbits, o.wnext = 0, o.whave = 0, o.window = new h.Buf8(o.wsize)), r >= o.wsize ? (h.arraySet(o.window, t, n - o.wsize, o.wsize, 0), o.wnext = 0, o.whave = o.wsize) : ((i = o.wsize - o.wnext) > r && (i = r), h.arraySet(o.window, t, n - r, i, o.wnext), (r -= i) ? (h.arraySet(o.window, t, n - r, r, 0), o.wnext = r, o.whave = o.wsize) : (o.wnext += i, o.wnext === o.wsize && (o.wnext = 0), o.whave < o.wsize && (o.whave += i))), 0;
      }
      var c, u, h = e("../utils/common"), p = e("./adler32"), f = e("./crc32"), m = e("./inffast"), g = e("./inftrees"), _ = 1, b = 2, v = 0, k = -2, y = 1, w = 12, R = 30, C = 852, x = 592, E = true;
      n.inflateReset = s, n.inflateReset2 = a, n.inflateResetKeep = o, n.inflateInit = function (e) {
        return l(e, 15);
      }, n.inflateInit2 = l, n.inflate = function (e, t) {
        var n, i, o, s, a, l, c, u, C, x, E, G, Z, S, B, I, T, U, F, M, O, L, j, D, z = 0, N = new h.Buf8(4), P = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
        if (!e || !e.state || !e.output || !e.input && 0 !== e.avail_in) return k;
        (n = e.state).mode === w && (n.mode = 13), a = e.next_out, o = e.output, c = e.avail_out, s = e.next_in, i = e.input, l = e.avail_in, u = n.hold, C = n.bits, x = l, E = c, L = v;
        e: for (;;) switch (n.mode) {
          case y:
            if (0 === n.wrap) {
              n.mode = 13;
              break;
            }
            for (; C < 16;) {
              if (0 === l) break e;
              l--, u += i[s++] << C, C += 8;
            }
            if (2 & n.wrap && 35615 === u) {
              n.check = 0, N[0] = 255 & u, N[1] = u >>> 8 & 255, n.check = f(n.check, N, 2, 0), u = 0, C = 0, n.mode = 2;
              break;
            }
            if (n.flags = 0, n.head && (n.head.done = false), !(1 & n.wrap) || (((255 & u) << 8) + (u >> 8)) % 31) {
              e.msg = "incorrect header check", n.mode = R;
              break;
            }
            if (8 != (15 & u)) {
              e.msg = "unknown compression method", n.mode = R;
              break;
            }
            if (C -= 4, O = 8 + (15 & (u >>>= 4)), 0 === n.wbits) n.wbits = O; else if (O > n.wbits) {
              e.msg = "invalid window size", n.mode = R;
              break;
            }
            n.dmax = 1 << O, e.adler = n.check = 1, n.mode = 512 & u ? 10 : w, u = 0, C = 0;
            break;
          case 2:
            for (; C < 16;) {
              if (0 === l) break e;
              l--, u += i[s++] << C, C += 8;
            }
            if (n.flags = u, 8 != (255 & n.flags)) {
              e.msg = "unknown compression method", n.mode = R;
              break;
            }
            if (57344 & n.flags) {
              e.msg = "unknown header flags set", n.mode = R;
              break;
            }
            n.head && (n.head.text = u >> 8 & 1), 512 & n.flags && (N[0] = 255 & u, N[1] = u >>> 8 & 255, n.check = f(n.check, N, 2, 0)), u = 0, C = 0, n.mode = 3;
          case 3:
            for (; C < 32;) {
              if (0 === l) break e;
              l--, u += i[s++] << C, C += 8;
            }
            n.head && (n.head.time = u), 512 & n.flags && (N[0] = 255 & u, N[1] = u >>> 8 & 255, N[2] = u >>> 16 & 255, N[3] = u >>> 24 & 255, n.check = f(n.check, N, 4, 0)), u = 0, C = 0, n.mode = 4;
          case 4:
            for (; C < 16;) {
              if (0 === l) break e;
              l--, u += i[s++] << C, C += 8;
            }
            n.head && (n.head.xflags = 255 & u, n.head.os = u >> 8), 512 & n.flags && (N[0] = 255 & u, N[1] = u >>> 8 & 255, n.check = f(n.check, N, 2, 0)), u = 0, C = 0, n.mode = 5;
          case 5:
            if (1024 & n.flags) {
              for (; C < 16;) {
                if (0 === l) break e;
                l--, u += i[s++] << C, C += 8;
              }
              n.length = u, n.head && (n.head.extra_len = u), 512 & n.flags && (N[0] = 255 & u, N[1] = u >>> 8 & 255, n.check = f(n.check, N, 2, 0)), u = 0, C = 0;
            } else n.head && (n.head.extra = null);
            n.mode = 6;
          case 6:
            if (1024 & n.flags && ((G = n.length) > l && (G = l), G && (n.head && (O = n.head.extra_len - n.length, n.head.extra || (n.head.extra = new Array(n.head.extra_len)), h.arraySet(n.head.extra, i, s, G, O)), 512 & n.flags && (n.check = f(n.check, i, G, s)), l -= G, s += G, n.length -= G), n.length)) break e;
            n.length = 0, n.mode = 7;
          case 7:
            if (2048 & n.flags) {
              if (0 === l) break e;
              G = 0;
              do {
                O = i[s + G++], n.head && O && n.length < 65536 && (n.head.name += String.fromCharCode(O));
              } while (O && G < l);
              if (512 & n.flags && (n.check = f(n.check, i, G, s)), l -= G, s += G, O) break e;
            } else n.head && (n.head.name = null);
            n.length = 0, n.mode = 8;
          case 8:
            if (4096 & n.flags) {
              if (0 === l) break e;
              G = 0;
              do {
                O = i[s + G++], n.head && O && n.length < 65536 && (n.head.comment += String.fromCharCode(O));
              } while (O && G < l);
              if (512 & n.flags && (n.check = f(n.check, i, G, s)), l -= G, s += G, O) break e;
            } else n.head && (n.head.comment = null);
            n.mode = 9;
          case 9:
            if (512 & n.flags) {
              for (; C < 16;) {
                if (0 === l) break e;
                l--, u += i[s++] << C, C += 8;
              }
              if (u !== (65535 & n.check)) {
                e.msg = "header crc mismatch", n.mode = R;
                break;
              }
              u = 0, C = 0;
            }
            n.head && (n.head.hcrc = n.flags >> 9 & 1, n.head.done = true), e.adler = n.check = 0, n.mode = w;
            break;
          case 10:
            for (; C < 32;) {
              if (0 === l) break e;
              l--, u += i[s++] << C, C += 8;
            }
            e.adler = n.check = (u >>> 24 & 255) + (u >>> 8 & 65280) + ((65280 & u) << 8) + ((255 & u) << 24), u = 0, C = 0, n.mode = 11;
          case 11:
            if (0 === n.havedict) return e.next_out = a, e.avail_out = c, e.next_in = s, e.avail_in = l, n.hold = u, n.bits = C, 2;
            e.adler = n.check = 1, n.mode = w;
          case w:
            if (5 === t || 6 === t) break e;
          case 13:
            if (n.last) {
              u >>>= 7 & C, C -= 7 & C, n.mode = 27;
              break;
            }
            for (; C < 3;) {
              if (0 === l) break e;
              l--, u += i[s++] << C, C += 8;
            }
            switch (n.last = 1 & u, C -= 1, 3 & (u >>>= 1)) {
              case 0:
                n.mode = 14;
                break;
              case 1:
                if (d(n), n.mode = 20, 6 === t) {
                  u >>>= 2, C -= 2;
                  break e;
                }
                break;
              case 2:
                n.mode = 17;
                break;
              case 3:
                e.msg = "invalid block type", n.mode = R;
            }
            u >>>= 2, C -= 2;
            break;
          case 14:
            for (u >>>= 7 & C, C -= 7 & C; C < 32;) {
              if (0 === l) break e;
              l--, u += i[s++] << C, C += 8;
            }
            if ((65535 & u) != (u >>> 16 ^ 65535)) {
              e.msg = "invalid stored block lengths", n.mode = R;
              break;
            }
            if (n.length = 65535 & u, u = 0, C = 0, n.mode = 15, 6 === t) break e;
          case 15:
            n.mode = 16;
          case 16:
            if (G = n.length) {
              if (G > l && (G = l), G > c && (G = c), 0 === G) break e;
              h.arraySet(o, i, s, G, a), l -= G, s += G, c -= G, a += G, n.length -= G;
              break;
            }
            n.mode = w;
            break;
          case 17:
            for (; C < 14;) {
              if (0 === l) break e;
              l--, u += i[s++] << C, C += 8;
            }
            if (n.nlen = 257 + (31 & u), u >>>= 5, C -= 5, n.ndist = 1 + (31 & u), u >>>= 5, C -= 5, n.ncode = 4 + (15 & u), u >>>= 4, C -= 4, n.nlen > 286 || n.ndist > 30) {
              e.msg = "too many length or distance symbols", n.mode = R;
              break;
            }
            n.have = 0, n.mode = 18;
          case 18:
            for (; n.have < n.ncode;) {
              for (; C < 3;) {
                if (0 === l) break e;
                l--, u += i[s++] << C, C += 8;
              }
              n.lens[P[n.have++]] = 7 & u, u >>>= 3, C -= 3;
            }
            for (; n.have < 19;) n.lens[P[n.have++]] = 0;
            if (n.lencode = n.lendyn, n.lenbits = 7, j = {bits: n.lenbits}, L = g(0, n.lens, 0, 19, n.lencode, 0, n.work, j), n.lenbits = j.bits, L) {
              e.msg = "invalid code lengths set", n.mode = R;
              break;
            }
            n.have = 0, n.mode = 19;
          case 19:
            for (; n.have < n.nlen + n.ndist;) {
              for (; I = (z = n.lencode[u & (1 << n.lenbits) - 1]) >>> 16 & 255, T = 65535 & z, !((B = z >>> 24) <= C);) {
                if (0 === l) break e;
                l--, u += i[s++] << C, C += 8;
              }
              if (T < 16) u >>>= B, C -= B, n.lens[n.have++] = T; else {
                if (16 === T) {
                  for (D = B + 2; C < D;) {
                    if (0 === l) break e;
                    l--, u += i[s++] << C, C += 8;
                  }
                  if (u >>>= B, C -= B, 0 === n.have) {
                    e.msg = "invalid bit length repeat", n.mode = R;
                    break;
                  }
                  O = n.lens[n.have - 1], G = 3 + (3 & u), u >>>= 2, C -= 2;
                } else if (17 === T) {
                  for (D = B + 3; C < D;) {
                    if (0 === l) break e;
                    l--, u += i[s++] << C, C += 8;
                  }
                  C -= B, O = 0, G = 3 + (7 & (u >>>= B)), u >>>= 3, C -= 3;
                } else {
                  for (D = B + 7; C < D;) {
                    if (0 === l) break e;
                    l--, u += i[s++] << C, C += 8;
                  }
                  C -= B, O = 0, G = 11 + (127 & (u >>>= B)), u >>>= 7, C -= 7;
                }
                if (n.have + G > n.nlen + n.ndist) {
                  e.msg = "invalid bit length repeat", n.mode = R;
                  break;
                }
                for (; G--;) n.lens[n.have++] = O;
              }
            }
            if (n.mode === R) break;
            if (0 === n.lens[256]) {
              e.msg = "invalid code -- missing end-of-block", n.mode = R;
              break;
            }
            if (n.lenbits = 9, j = {bits: n.lenbits}, L = g(_, n.lens, 0, n.nlen, n.lencode, 0, n.work, j), n.lenbits = j.bits, L) {
              e.msg = "invalid literal/lengths set", n.mode = R;
              break;
            }
            if (n.distbits = 6, n.distcode = n.distdyn, j = {bits: n.distbits}, L = g(b, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, j), n.distbits = j.bits, L) {
              e.msg = "invalid distances set", n.mode = R;
              break;
            }
            if (n.mode = 20, 6 === t) break e;
          case 20:
            n.mode = 21;
          case 21:
            if (l >= 6 && c >= 258) {
              e.next_out = a, e.avail_out = c, e.next_in = s, e.avail_in = l, n.hold = u, n.bits = C, m(e, E), a = e.next_out, o = e.output, c = e.avail_out, s = e.next_in, i = e.input, l = e.avail_in, u = n.hold, C = n.bits, n.mode === w && (n.back = -1);
              break;
            }
            for (n.back = 0; I = (z = n.lencode[u & (1 << n.lenbits) - 1]) >>> 16 & 255, T = 65535 & z, !((B = z >>> 24) <= C);) {
              if (0 === l) break e;
              l--, u += i[s++] << C, C += 8;
            }
            if (I && 0 == (240 & I)) {
              for (U = B, F = I, M = T; I = (z = n.lencode[M + ((u & (1 << U + F) - 1) >> U)]) >>> 16 & 255, T = 65535 & z, !(U + (B = z >>> 24) <= C);) {
                if (0 === l) break e;
                l--, u += i[s++] << C, C += 8;
              }
              u >>>= U, C -= U, n.back += U;
            }
            if (u >>>= B, C -= B, n.back += B, n.length = T, 0 === I) {
              n.mode = 26;
              break;
            }
            if (32 & I) {
              n.back = -1, n.mode = w;
              break;
            }
            if (64 & I) {
              e.msg = "invalid literal/length code", n.mode = R;
              break;
            }
            n.extra = 15 & I, n.mode = 22;
          case 22:
            if (n.extra) {
              for (D = n.extra; C < D;) {
                if (0 === l) break e;
                l--, u += i[s++] << C, C += 8;
              }
              n.length += u & (1 << n.extra) - 1, u >>>= n.extra, C -= n.extra, n.back += n.extra;
            }
            n.was = n.length, n.mode = 23;
          case 23:
            for (; I = (z = n.distcode[u & (1 << n.distbits) - 1]) >>> 16 & 255, T = 65535 & z, !((B = z >>> 24) <= C);) {
              if (0 === l) break e;
              l--, u += i[s++] << C, C += 8;
            }
            if (0 == (240 & I)) {
              for (U = B, F = I, M = T; I = (z = n.distcode[M + ((u & (1 << U + F) - 1) >> U)]) >>> 16 & 255, T = 65535 & z, !(U + (B = z >>> 24) <= C);) {
                if (0 === l) break e;
                l--, u += i[s++] << C, C += 8;
              }
              u >>>= U, C -= U, n.back += U;
            }
            if (u >>>= B, C -= B, n.back += B, 64 & I) {
              e.msg = "invalid distance code", n.mode = R;
              break;
            }
            n.offset = T, n.extra = 15 & I, n.mode = 24;
          case 24:
            if (n.extra) {
              for (D = n.extra; C < D;) {
                if (0 === l) break e;
                l--, u += i[s++] << C, C += 8;
              }
              n.offset += u & (1 << n.extra) - 1, u >>>= n.extra, C -= n.extra, n.back += n.extra;
            }
            if (n.offset > n.dmax) {
              e.msg = "invalid distance too far back", n.mode = R;
              break;
            }
            n.mode = 25;
          case 25:
            if (0 === c) break e;
            if (G = E - c, n.offset > G) {
              if ((G = n.offset - G) > n.whave && n.sane) {
                e.msg = "invalid distance too far back", n.mode = R;
                break;
              }
              G > n.wnext ? (G -= n.wnext, Z = n.wsize - G) : Z = n.wnext - G, G > n.length && (G = n.length), S = n.window;
            } else S = o, Z = a - n.offset, G = n.length;
            G > c && (G = c), c -= G, n.length -= G;
            do {
              o[a++] = S[Z++];
            } while (--G);
            0 === n.length && (n.mode = 21);
            break;
          case 26:
            if (0 === c) break e;
            o[a++] = n.length, c--, n.mode = 21;
            break;
          case 27:
            if (n.wrap) {
              for (; C < 32;) {
                if (0 === l) break e;
                l--, u |= i[s++] << C, C += 8;
              }
              if (E -= c, e.total_out += E, n.total += E, E && (e.adler = n.check = n.flags ? f(n.check, o, E, a - E) : p(n.check, o, E, a - E)), E = c, (n.flags ? u : (u >>> 24 & 255) + (u >>> 8 & 65280) + ((65280 & u) << 8) + ((255 & u) << 24)) !== n.check) {
                e.msg = "incorrect data check", n.mode = R;
                break;
              }
              u = 0, C = 0;
            }
            n.mode = 28;
          case 28:
            if (n.wrap && n.flags) {
              for (; C < 32;) {
                if (0 === l) break e;
                l--, u += i[s++] << C, C += 8;
              }
              if (u !== (4294967295 & n.total)) {
                e.msg = "incorrect length check", n.mode = R;
                break;
              }
              u = 0, C = 0;
            }
            n.mode = 29;
          case 29:
            L = 1;
            break e;
          case R:
            L = -3;
            break e;
          case 31:
            return -4;
          default:
            return k;
        }
        return e.next_out = a, e.avail_out = c, e.next_in = s, e.avail_in = l, n.hold = u, n.bits = C, (n.wsize || E !== e.avail_out && n.mode < R && (n.mode < 27 || 4 !== t)) && A(e, e.output, e.next_out, E - e.avail_out) ? (n.mode = 31, -4) : (x -= e.avail_in, E -= e.avail_out, e.total_in += x, e.total_out += E, n.total += E, n.wrap && E && (e.adler = n.check = n.flags ? f(n.check, o, E, e.next_out - E) : p(n.check, o, E, e.next_out - E)), e.data_type = n.bits + (n.last ? 64 : 0) + (n.mode === w ? 128 : 0) + (20 === n.mode || 15 === n.mode ? 256 : 0), (0 === x && 0 === E || 4 === t) && L === v && (L = -5), L);
      }, n.inflateEnd = function (e) {
        if (!e || !e.state) return k;
        var t = e.state;
        return t.window && (t.window = null), e.state = null, v;
      }, n.inflateGetHeader = function (e, t) {
        var n;
        return e && e.state ? 0 == (2 & (n = e.state).wrap) ? k : (n.head = t, t.done = false, v) : k;
      }, n.inflateSetDictionary = function (e, t) {
        var n, r = t.length;
        return e && e.state ? 0 !== (n = e.state).wrap && 11 !== n.mode ? k : 11 === n.mode && p(1, t, r, 0) !== n.check ? -3 : A(e, t, r, r) ? (n.mode = 31, -4) : (n.havedict = 1, v) : k;
      }, n.inflateInfo = "pako inflate (from Nodeca project)";
    }, {"../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50}], 50: [function (e, t) {
      "use strict";
      var n = e("../utils/common"), r = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], i = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], o = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], s = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
      t.exports = function (e, t, a, l, d, A, c, u) {
        var h, p, f, m, g, _, b, v, k, y = u.bits, w = 0, R = 0, C = 0, x = 0, E = 0, G = 0, Z = 0, S = 0, B = 0, I = 0, T = null, U = 0, F = new n.Buf16(16), M = new n.Buf16(16), O = null, L = 0;
        for (w = 0; w <= 15; w++) F[w] = 0;
        for (R = 0; R < l; R++) F[t[a + R]]++;
        for (E = y, x = 15; x >= 1 && 0 === F[x]; x--) ;
        if (E > x && (E = x), 0 === x) return d[A++] = 20971520, d[A++] = 20971520, u.bits = 1, 0;
        for (C = 1; C < x && 0 === F[C]; C++) ;
        for (E < C && (E = C), S = 1, w = 1; w <= 15; w++) if (S <<= 1, (S -= F[w]) < 0) return -1;
        if (S > 0 && (0 === e || 1 !== x)) return -1;
        for (M[1] = 0, w = 1; w < 15; w++) M[w + 1] = M[w] + F[w];
        for (R = 0; R < l; R++) 0 !== t[a + R] && (c[M[t[a + R]]++] = R);
        if (0 === e ? (T = O = c, _ = 19) : 1 === e ? (T = r, U -= 257, O = i, L -= 257, _ = 256) : (T = o, O = s, _ = -1), I = 0, R = 0, w = C, g = A, G = E, Z = 0, f = -1, m = (B = 1 << E) - 1, 1 === e && B > 852 || 2 === e && B > 592) return 1;
        for (;;) {
          b = w - Z, c[R] < _ ? (v = 0, k = c[R]) : c[R] > _ ? (v = O[L + c[R]], k = T[U + c[R]]) : (v = 96, k = 0), h = 1 << w - Z, C = p = 1 << G;
          do {
            d[g + (I >> Z) + (p -= h)] = b << 24 | v << 16 | k | 0;
          } while (0 !== p);
          for (h = 1 << w - 1; I & h;) h >>= 1;
          if (0 !== h ? (I &= h - 1, I += h) : I = 0, R++, 0 == --F[w]) {
            if (w === x) break;
            w = t[a + c[R]];
          }
          if (w > E && (I & m) !== f) {
            for (0 === Z && (Z = E), g += C, S = 1 << (G = w - Z); G + Z < x && !((S -= F[G + Z]) <= 0);) G++, S <<= 1;
            if (B += 1 << G, 1 === e && B > 852 || 2 === e && B > 592) return 1;
            d[f = I & m] = E << 24 | G << 16 | g - A | 0;
          }
        }
        return 0 !== I && (d[g + I] = w - Z << 24 | 4194304 | 0), u.bits = E, 0;
      };
    }, {"../utils/common": 41}], 51: [function (e, t) {
      "use strict";
      t.exports = {2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version"};
    }, {}], 52: [function (e, t, n) {
      "use strict";
      function r(e) {
        for (var t = e.length; --t >= 0;) e[t] = 0;
      }
      function i(e, t, n, r, i) {
        this.static_tree = e, this.extra_bits = t, this.extra_base = n, this.elems = r, this.max_length = i, this.has_stree = e && e.length;
      }
      function o(e, t) {
        this.dyn_tree = e, this.max_code = 0, this.stat_desc = t;
      }
      function s(e) {
        return e < 256 ? D[e] : D[256 + (e >>> 7)];
      }
      function a(e, t) {
        e.pending_buf[e.pending++] = 255 & t, e.pending_buf[e.pending++] = t >>> 8 & 255;
      }
      function l(e, t, n) {
        e.bi_valid > Z - n ? (e.bi_buf |= t << e.bi_valid & 65535, a(e, e.bi_buf), e.bi_buf = t >> Z - e.bi_valid, e.bi_valid += n - Z) : (e.bi_buf |= t << e.bi_valid & 65535, e.bi_valid += n);
      }
      function d(e, t, n) {
        l(e, n[2 * t], n[2 * t + 1]);
      }
      function A(e, t) {
        var n = 0;
        do {
          n |= 1 & e, e >>>= 1, n <<= 1;
        } while (--t > 0);
        return n >>> 1;
      }
      function c(e, t, n) {
        var r, i, o = new Array(G + 1), s = 0;
        for (r = 1; r <= G; r++) o[r] = s = s + n[r - 1] << 1;
        for (i = 0; i <= t; i++) {
          var a = e[2 * i + 1];
          0 !== a && (e[2 * i] = A(o[a]++, a));
        }
      }
      function u(e) {
        var t;
        for (t = 0; t < R; t++) e.dyn_ltree[2 * t] = 0;
        for (t = 0; t < C; t++) e.dyn_dtree[2 * t] = 0;
        for (t = 0; t < x; t++) e.bl_tree[2 * t] = 0;
        e.dyn_ltree[2 * S] = 1, e.opt_len = e.static_len = 0, e.last_lit = e.matches = 0;
      }
      function h(e) {
        e.bi_valid > 8 ? a(e, e.bi_buf) : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf), e.bi_buf = 0, e.bi_valid = 0;
      }
      function p(e, t, n, r) {
        var i = 2 * t, o = 2 * n;
        return e[i] < e[o] || e[i] === e[o] && r[t] <= r[n];
      }
      function f(e, t, n) {
        for (var r = e.heap[n], i = n << 1; i <= e.heap_len && (i < e.heap_len && p(t, e.heap[i + 1], e.heap[i], e.depth) && i++, !p(t, r, e.heap[i], e.depth));) e.heap[n] = e.heap[i], n = i, i <<= 1;
        e.heap[n] = r;
      }
      function m(e, t, n) {
        var r, i, o, a, A = 0;
        if (0 !== e.last_lit) do {
          r = e.pending_buf[e.d_buf + 2 * A] << 8 | e.pending_buf[e.d_buf + 2 * A + 1], i = e.pending_buf[e.l_buf + A], A++, 0 === r ? d(e, i, t) : (d(e, (o = z[i]) + w + 1, t), 0 !== (a = U[o]) && l(e, i -= N[o], a), d(e, o = s(--r), n), 0 !== (a = F[o]) && l(e, r -= H[o], a));
        } while (A < e.last_lit);
        d(e, S, t);
      }
      function g(e, t) {
        var n, r, i, o = t.dyn_tree, s = t.stat_desc.static_tree, a = t.stat_desc.has_stree, l = t.stat_desc.elems, d = -1;
        for (e.heap_len = 0, e.heap_max = E, n = 0; n < l; n++) 0 !== o[2 * n] ? (e.heap[++e.heap_len] = d = n, e.depth[n] = 0) : o[2 * n + 1] = 0;
        for (; e.heap_len < 2;) o[2 * (i = e.heap[++e.heap_len] = d < 2 ? ++d : 0)] = 1, e.depth[i] = 0, e.opt_len--, a && (e.static_len -= s[2 * i + 1]);
        for (t.max_code = d, n = e.heap_len >> 1; n >= 1; n--) f(e, o, n);
        i = l;
        do {
          n = e.heap[1], e.heap[1] = e.heap[e.heap_len--], f(e, o, 1), r = e.heap[1], e.heap[--e.heap_max] = n, e.heap[--e.heap_max] = r, o[2 * i] = o[2 * n] + o[2 * r], e.depth[i] = (e.depth[n] >= e.depth[r] ? e.depth[n] : e.depth[r]) + 1, o[2 * n + 1] = o[2 * r + 1] = i, e.heap[1] = i++, f(e, o, 1);
        } while (e.heap_len >= 2);
        e.heap[--e.heap_max] = e.heap[1], function (e, t) {
          var n, r, i, o, s, a, l = t.dyn_tree, d = t.max_code, A = t.stat_desc.static_tree, c = t.stat_desc.has_stree, u = t.stat_desc.extra_bits, h = t.stat_desc.extra_base, p = t.stat_desc.max_length, f = 0;
          for (o = 0; o <= G; o++) e.bl_count[o] = 0;
          for (l[2 * e.heap[e.heap_max] + 1] = 0, n = e.heap_max + 1; n < E; n++) (o = l[2 * l[2 * (r = e.heap[n]) + 1] + 1] + 1) > p && (o = p, f++), l[2 * r + 1] = o, r > d || (e.bl_count[o]++, s = 0, r >= h && (s = u[r - h]), a = l[2 * r], e.opt_len += a * (o + s), c && (e.static_len += a * (A[2 * r + 1] + s)));
          if (0 !== f) {
            do {
              for (o = p - 1; 0 === e.bl_count[o];) o--;
              e.bl_count[o]--, e.bl_count[o + 1] += 2, e.bl_count[p]--, f -= 2;
            } while (f > 0);
            for (o = p; 0 !== o; o--) for (r = e.bl_count[o]; 0 !== r;) (i = e.heap[--n]) > d || (l[2 * i + 1] !== o && (e.opt_len += (o - l[2 * i + 1]) * l[2 * i], l[2 * i + 1] = o), r--);
          }
        }(e, t), c(o, d, e.bl_count);
      }
      function _(e, t, n) {
        var r, i, o = -1, s = t[1], a = 0, l = 7, d = 4;
        for (0 === s && (l = 138, d = 3), t[2 * (n + 1) + 1] = 65535, r = 0; r <= n; r++) i = s, s = t[2 * (r + 1) + 1], ++a < l && i === s || (a < d ? e.bl_tree[2 * i] += a : 0 !== i ? (i !== o && e.bl_tree[2 * i]++, e.bl_tree[2 * B]++) : a <= 10 ? e.bl_tree[2 * I]++ : e.bl_tree[2 * T]++, a = 0, o = i, 0 === s ? (l = 138, d = 3) : i === s ? (l = 6, d = 3) : (l = 7, d = 4));
      }
      function b(e, t, n) {
        var r, i, o = -1, s = t[1], a = 0, A = 7, c = 4;
        for (0 === s && (A = 138, c = 3), r = 0; r <= n; r++) if (i = s, s = t[2 * (r + 1) + 1], !(++a < A && i === s)) {
          if (a < c) do {
            d(e, i, e.bl_tree);
          } while (0 != --a); else 0 !== i ? (i !== o && (d(e, i, e.bl_tree), a--), d(e, B, e.bl_tree), l(e, a - 3, 2)) : a <= 10 ? (d(e, I, e.bl_tree), l(e, a - 3, 3)) : (d(e, T, e.bl_tree), l(e, a - 11, 7));
          a = 0, o = i, 0 === s ? (A = 138, c = 3) : i === s ? (A = 6, c = 3) : (A = 7, c = 4);
        }
      }
      function v(e, t, n, r) {
        l(e, (y << 1) + (r ? 1 : 0), 3), function (e, t, n) {
          h(e), a(e, n), a(e, ~n), k.arraySet(e.pending_buf, e.window, t, n, e.pending), e.pending += n;
        }(e, t, n);
      }
      var k = e("../utils/common"), y = 0, w = 256, R = w + 1 + 29, C = 30, x = 19, E = 2 * R + 1, G = 15, Z = 16, S = 256, B = 16, I = 17, T = 18, U = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], F = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], M = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], O = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], L = new Array(2 * (R + 2));
      r(L);
      var j = new Array(2 * C);
      r(j);
      var D = new Array(512);
      r(D);
      var z = new Array(256);
      r(z);
      var N = new Array(29);
      r(N);
      var P, V, Q, H = new Array(C);
      r(H);
      var X = false;
      n._tr_init = function (e) {
        X || (function () {
          var e, t, n, r, o, s = new Array(G + 1);
          for (n = 0, r = 0; r < 28; r++) for (N[r] = n, e = 0; e < 1 << U[r]; e++) z[n++] = r;
          for (z[n - 1] = r, o = 0, r = 0; r < 16; r++) for (H[r] = o, e = 0; e < 1 << F[r]; e++) D[o++] = r;
          for (o >>= 7; r < C; r++) for (H[r] = o << 7, e = 0; e < 1 << F[r] - 7; e++) D[256 + o++] = r;
          for (t = 0; t <= G; t++) s[t] = 0;
          for (e = 0; e <= 143;) L[2 * e + 1] = 8, e++, s[8]++;
          for (; e <= 255;) L[2 * e + 1] = 9, e++, s[9]++;
          for (; e <= 279;) L[2 * e + 1] = 7, e++, s[7]++;
          for (; e <= 287;) L[2 * e + 1] = 8, e++, s[8]++;
          for (c(L, R + 1, s), e = 0; e < C; e++) j[2 * e + 1] = 5, j[2 * e] = A(e, 5);
          P = new i(L, U, w + 1, R, G), V = new i(j, F, 0, C, G), Q = new i(new Array(0), M, 0, x, 7);
        }(), X = true), e.l_desc = new o(e.dyn_ltree, P), e.d_desc = new o(e.dyn_dtree, V), e.bl_desc = new o(e.bl_tree, Q), e.bi_buf = 0, e.bi_valid = 0, u(e);
      }, n._tr_stored_block = v, n._tr_flush_block = function (e, t, n, r) {
        var i, o, s = 0;
        e.level > 0 ? (2 === e.strm.data_type && (e.strm.data_type = function (e) {
          var t, n = 4093624447;
          for (t = 0; t <= 31; t++, n >>>= 1) if (1 & n && 0 !== e.dyn_ltree[2 * t]) return 0;
          if (0 !== e.dyn_ltree[18] || 0 !== e.dyn_ltree[20] || 0 !== e.dyn_ltree[26]) return 1;
          for (t = 32; t < w; t++) if (0 !== e.dyn_ltree[2 * t]) return 1;
          return 0;
        }(e)), g(e, e.l_desc), g(e, e.d_desc), s = function (e) {
          var t;
          for (_(e, e.dyn_ltree, e.l_desc.max_code), _(e, e.dyn_dtree, e.d_desc.max_code), g(e, e.bl_desc), t = x - 1; t >= 3 && 0 === e.bl_tree[2 * O[t] + 1]; t--) ;
          return e.opt_len += 3 * (t + 1) + 5 + 5 + 4, t;
        }(e), i = e.opt_len + 3 + 7 >>> 3, (o = e.static_len + 3 + 7 >>> 3) <= i && (i = o)) : i = o = n + 5, n + 4 <= i && -1 !== t ? v(e, t, n, r) : 4 === e.strategy || o === i ? (l(e, 2 + (r ? 1 : 0), 3), m(e, L, j)) : (l(e, 4 + (r ? 1 : 0), 3), function (e, t, n, r) {
          var i;
          for (l(e, t - 257, 5), l(e, n - 1, 5), l(e, r - 4, 4), i = 0; i < r; i++) l(e, e.bl_tree[2 * O[i] + 1], 3);
          b(e, e.dyn_ltree, t - 1), b(e, e.dyn_dtree, n - 1);
        }(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, s + 1), m(e, e.dyn_ltree, e.dyn_dtree)), u(e), r && h(e);
      }, n._tr_tally = function (e, t, n) {
        return e.pending_buf[e.d_buf + 2 * e.last_lit] = t >>> 8 & 255, e.pending_buf[e.d_buf + 2 * e.last_lit + 1] = 255 & t, e.pending_buf[e.l_buf + e.last_lit] = 255 & n, e.last_lit++, 0 === t ? e.dyn_ltree[2 * n]++ : (e.matches++, t--, e.dyn_ltree[2 * (z[n] + w + 1)]++, e.dyn_dtree[2 * s(t)]++), e.last_lit === e.lit_bufsize - 1;
      }, n._tr_align = function (e) {
        l(e, 2, 3), d(e, S, L), function (e) {
          16 === e.bi_valid ? (a(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : e.bi_valid >= 8 && (e.pending_buf[e.pending++] = 255 & e.bi_buf, e.bi_buf >>= 8, e.bi_valid -= 8);
        }(e);
      };
    }, {"../utils/common": 41}], 53: [function (e, t) {
      "use strict";
      t.exports = function () {
        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
      };
    }, {}], 54: [function (e, t) {
      "use strict";
      t.exports = "function" == typeof setImmediate ? setImmediate : function () {
        var e = [].slice.apply(arguments);
        e.splice(1, 0, 0), setTimeout.apply(null, e);
      };
    }, {}]}, {}, [10])(10);
  }}, n = {};
  e.n = t => {
    var n = t && t.__esModule ? () => t.default : () => t;
    return e.d(n, {a: n}), n;
  }, e.d = (t, n) => {
    for (var r in n) e.o(n, r) && !e.o(t, r) && Object.defineProperty(t, r, {enumerable: true, get: n[r]});
  }, e.g = function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (e) {
      if ("object" == typeof window) return window;
    }
  }(), e.o = (e, t) => ({}.hasOwnProperty.call(e, t)), (() => {
    "use strict";
    function t(e) {
      if (this.data = "", this.read = 0, "string" == typeof e) this.data = e; else if (Xn.isArrayBuffer(e) || Xn.isArrayBufferView(e)) {
        var n = new Uint8Array(e);
        try {
          this.data = String.fromCharCode.apply(null, n);
        } catch (e) {
          for (var r = 0; r < n.length; ++r) this.putByte(n[r]);
        }
      } else (e instanceof t || "object" == typeof e && "string" == typeof e.data && "number" == typeof e.read) && (this.data = e.data, this.read = e.read);
      this._constructedStringLength = 0;
    }
    function n(e, t, n) {
      for (var r, i, o, s, a, l, d, A, c, u, h, p, f, m = n.length(); m >= 64;) {
        for (a = 0; a < 16; ++a) t[a] = n.getInt32();
        for (; a < 64; ++a) r = ((r = t[a - 2]) >>> 17 | r << 15) ^ (r >>> 19 | r << 13) ^ r >>> 10, i = ((i = t[a - 15]) >>> 7 | i << 25) ^ (i >>> 18 | i << 14) ^ i >>> 3, t[a] = r + t[a - 7] + i + t[a - 16] | 0;
        for (l = e.h0, d = e.h1, A = e.h2, c = e.h3, u = e.h4, h = e.h5, p = e.h6, f = e.h7, a = 0; a < 64; ++a) o = (l >>> 2 | l << 30) ^ (l >>> 13 | l << 19) ^ (l >>> 22 | l << 10), s = l & d | A & (l ^ d), r = f + ((u >>> 6 | u << 26) ^ (u >>> 11 | u << 21) ^ (u >>> 25 | u << 7)) + (p ^ u & (h ^ p)) + Jn[a] + t[a], f = p, p = h, h = u, u = c + r | 0, c = A, A = d, d = l, l = r + (i = o + s) | 0;
        e.h0 = e.h0 + l | 0, e.h1 = e.h1 + d | 0, e.h2 = e.h2 + A | 0, e.h3 = e.h3 + c | 0, e.h4 = e.h4 + u | 0, e.h5 = e.h5 + h | 0, e.h6 = e.h6 + p | 0, e.h7 = e.h7 + f | 0, m -= 64;
      }
    }
    let r;
    Object.fromEntries ? r = Object.fromEntries : (r = e => [...e].reduce((e, [t, n]) => (e[t] = n, e), {}), Object.fromEntries = r), Object.defineProperties(Promise.prototype, {done: {value: function (e) {
      return this.then((...t) => e.apply(this, t));
    }, configurable: true, enumerable: true, writable: false}, fail: {value: function (e) {
      return this.then(() => {}, (...t) => e.apply(this, t));
    }, configurable: true, enumerable: true, writable: false}, always: {value: function (e) {
      return this.then((...t) => e.apply(this, t), (...t) => e.apply(this, t));
    }, configurable: true, enumerable: true, writable: false}});
    const i = Promise, {setTimeout: o, setInterval: s, clearTimeout: a, clearInterval: l, AbortController: d, fetch: A, XMLHttpRequest: c, webkitNotifications: u, decodeURIComponent: h, encodeURIComponent: p, Notification: f, TextDecoder: m, FileReader: g, DOMParser: _, unescape: b, escape: v, btoa: k, atob: y, alert: w, confirm: R, crypto: C, Worker: x} = (self, location.origin, self), E = (e, t) => {
      null == t && (t = []);
      const n = new RegExp("(\\" + ["/", ".", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\"].concat(t).join("|\\") + ")", "g");
      return e.replace(n, "\\$1");
    }, G = e => E(e, ["*"]), Z = e => (({}.toString.apply(e).match(/\s([a-z|A-Z]+)/) || [])[1]), S = (e, t) => {
      const n = Z(e);
      if ("Array" === n || "NodeList" === n) {
        for (let n = 0; n < e.length; n++) if (false === t(e[n], n)) return;
      } else if ("XPathResult" === n) {
        let n = e.iterateNext(), r = 0;
        for (; n;) {
          if (false === t(n, r++)) return;
          n = e.iterateNext();
        }
      } else for (const n in e) if (e.hasOwnProperty(n) && false === t(e[n], n)) return;
    }, B = (e, t, n, r) => {
      let i;
      if (Array.isArray(n)) {
        const e = {};
        n.forEach(t => {
          e[t] = true;
        }), i = e;
      } else i = n;
      return S(i || e, (n, o) => {
        if (!i || i.hasOwnProperty(o)) {
          let n;
          const s = e[o], a = Z(s);
          if ("Undefined" == a) return;
          if (i && r && (n = Z(i[o])) && n !== a && ("Array" === n || "Object" === n)) return;
          "Object" == a ? (t[o] = {}, B(s, t[o], i ? i[o] : null)) : "Array" == a ? (t[o] = [], B(s, t[o])) : t[o] = s;
        }
      }), t;
    }, I = (e, t, n) => {
      void 0 === n && (n = "-");
      const r = t ? /[:<>|~?*\x00-\x1F\uFDD0-\uFDEF"]/g : /[:<>|~?*\x00-\x1F\uFDD0-\uFDEF"\/\\]|^[.]|[.]$/g;
      return !t && /^((CON|PRN|AUX|NUL|CLOCK\$|COM[1-9]|LPT[1-9])(\..*)?|device(\..*)?|desktop.ini|thumbs.db)$/i.test(e) ? (n || "_") + e.replace(r, n) : e.replace(r, n);
    }, T = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, e => {
      const t = 16 * Math.random() | 0;
      return ("x" == e ? t : 3 & t | 8).toString(16);
    }), U = (e, t) => {
      const n = [];
      for (let r = 0, i = e.length; r < i; r += t) n.push(e.slice(r, t + r));
      return n;
    }, F = void 0, M = "display: none;";
    let O = 0;
    const L = [], j = () => {
      const e = ["debug"], t = ["log"], n = ["warn", "info"], r = ["error"], i = [...e, ...t, ...n, ...r], o = r;
      O >= 80 && o.push(...e), O >= 60 && o.push(...t), O >= 30 && o.push(...n), i.forEach(e => D[e] = o.includes(e) ? console[e].bind(console) : () => {});
    }, D = {set: e => {
      O = e, L.forEach(e => {
        e(D, O);
      }), j();
    }, get: () => O, get verbose() {
      return (D.debug || (() => {})).bind(console);
    }, debug: () => {}, log: () => {}, warn: () => {}, info: () => {}, error: () => {}, addChangeListener: e => {
      L.push(e);
    }};
    j();
    const z = e => b(p(e)), N = e => h(v(e)), P = e => {
      let t = "";
      for (let n = 0; n < e.length; n++) t += String.fromCharCode(255 & e.charCodeAt(n));
      return k(t);
    }, V = e => y(e), Q = (e, t) => {
      try {
        let n, r;
        if ("object" == typeof t ? (n = t.encoding, r = t.array) : n = t, !r && n) return new m(n).decode(e);
        {
          let t = 0;
          const r = [], i = e.byteLength;
          for (; t < i; t += 16384) r.push(String.fromCharCode.apply(null, new Uint8Array(e, t, Math.min(16384, i - t))));
          let o = r.join("");
          return n && "utf-8" == n.toLowerCase() && (o = N(o)), o;
        }
      } catch (e) {
        D.warn(e);
      }
      return null;
    }, H = (e, t) => {
      try {
        let n;
        n = "object" == typeof t ? t.encoding : t, n && "utf-8" == n.toLowerCase() && (e = z(e));
        const r = new Uint8Array(e.length);
        for (let t = 0; t < e.length; t++) r[t] = 255 & e.charCodeAt(t);
        return r.buffer;
      } catch (e) {
        D.warn(e);
      }
      return new Uint8Array(0).buffer;
    }, X = (e, t) => new Promise((n, r) => {
      const i = t && t.encoding ? "text/plain" : "binary/octet-stream", o = new Blob([e], {type: i}), s = new g;
      s.onload = e => {
        e.target ? n(e.target.result) : r(new Error("Could not convert array to string!"));
      }, t && t.encoding ? s.readAsText(o, t.encoding) : s.readAsBinaryString(o);
    }), W = (e, t) => {
      const n = (e, t) => e << t | e >>> 32 - t, r = (e, t) => {
        const n = 2147483648 & e, r = 2147483648 & t, i = 1073741824 & e, o = 1073741824 & t, s = (1073741823 & e) + (1073741823 & t);
        return i & o ? 2147483648 ^ s ^ n ^ r : i | o ? 1073741824 & s ? 3221225472 ^ s ^ n ^ r : 1073741824 ^ s ^ n ^ r : s ^ n ^ r;
      }, i = (e, t, i, o, s, a, l) => (e = r(e, r(r(((e, t, n) => e & t | ~e & n)(t, i, o), s), l)), r(n(e, a), t)), o = (e, t, i, o, s, a, l) => (e = r(e, r(r(((e, t, n) => e & n | t & ~n)(t, i, o), s), l)), r(n(e, a), t)), s = (e, t, i, o, s, a, l) => (e = r(e, r(r(((e, t, n) => e ^ t ^ n)(t, i, o), s), l)), r(n(e, a), t)), a = (e, t, i, o, s, a, l) => (e = r(e, r(r(((e, t, n) => t ^ (e | ~n))(t, i, o), s), l)), r(n(e, a), t)), l = e => {
        let t, n, r = "", i = "";
        for (n = 0; n <= 3; n++) t = e >>> 8 * n & 255, i = "0" + t.toString(16), r += i.substr(i.length - 2, 2);
        return r;
      };
      let d, A, c, u, h, p, f, m, g, _ = [];
      for (t && "utf-8" == t.toLowerCase() && (e = z(e)), _ = (e => {
        let t;
        const n = e.length, r = n + 8, i = 16 * ((r - r % 64) / 64 + 1), o = Array(i - 1);
        let s = 0, a = 0;
        for (; a < n;) t = (a - a % 4) / 4, s = a % 4 * 8, o[t] = o[t] | e.charCodeAt(a) << s, a++;
        return t = (a - a % 4) / 4, s = a % 4 * 8, o[t] = o[t] | 128 << s, o[i - 2] = n << 3, o[i - 1] = n >>> 29, o;
      })(e), p = 1732584193, f = 4023233417, m = 2562383102, g = 271733878, d = 0; d < _.length; d += 16) A = p, c = f, u = m, h = g, p = i(p, f, m, g, _[d + 0], 7, 3614090360), g = i(g, p, f, m, _[d + 1], 12, 3905402710), m = i(m, g, p, f, _[d + 2], 17, 606105819), f = i(f, m, g, p, _[d + 3], 22, 3250441966), p = i(p, f, m, g, _[d + 4], 7, 4118548399), g = i(g, p, f, m, _[d + 5], 12, 1200080426), m = i(m, g, p, f, _[d + 6], 17, 2821735955), f = i(f, m, g, p, _[d + 7], 22, 4249261313), p = i(p, f, m, g, _[d + 8], 7, 1770035416), g = i(g, p, f, m, _[d + 9], 12, 2336552879), m = i(m, g, p, f, _[d + 10], 17, 4294925233), f = i(f, m, g, p, _[d + 11], 22, 2304563134), p = i(p, f, m, g, _[d + 12], 7, 1804603682), g = i(g, p, f, m, _[d + 13], 12, 4254626195), m = i(m, g, p, f, _[d + 14], 17, 2792965006), f = i(f, m, g, p, _[d + 15], 22, 1236535329), p = o(p, f, m, g, _[d + 1], 5, 4129170786), g = o(g, p, f, m, _[d + 6], 9, 3225465664), m = o(m, g, p, f, _[d + 11], 14, 643717713), f = o(f, m, g, p, _[d + 0], 20, 3921069994), p = o(p, f, m, g, _[d + 5], 5, 3593408605), g = o(g, p, f, m, _[d + 10], 9, 38016083), m = o(m, g, p, f, _[d + 15], 14, 3634488961), f = o(f, m, g, p, _[d + 4], 20, 3889429448), p = o(p, f, m, g, _[d + 9], 5, 568446438), g = o(g, p, f, m, _[d + 14], 9, 3275163606), m = o(m, g, p, f, _[d + 3], 14, 4107603335), f = o(f, m, g, p, _[d + 8], 20, 1163531501), p = o(p, f, m, g, _[d + 13], 5, 2850285829), g = o(g, p, f, m, _[d + 2], 9, 4243563512), m = o(m, g, p, f, _[d + 7], 14, 1735328473), f = o(f, m, g, p, _[d + 12], 20, 2368359562), p = s(p, f, m, g, _[d + 5], 4, 4294588738), g = s(g, p, f, m, _[d + 8], 11, 2272392833), m = s(m, g, p, f, _[d + 11], 16, 1839030562), f = s(f, m, g, p, _[d + 14], 23, 4259657740), p = s(p, f, m, g, _[d + 1], 4, 2763975236), g = s(g, p, f, m, _[d + 4], 11, 1272893353), m = s(m, g, p, f, _[d + 7], 16, 4139469664), f = s(f, m, g, p, _[d + 10], 23, 3200236656), p = s(p, f, m, g, _[d + 13], 4, 681279174), g = s(g, p, f, m, _[d + 0], 11, 3936430074), m = s(m, g, p, f, _[d + 3], 16, 3572445317), f = s(f, m, g, p, _[d + 6], 23, 76029189), p = s(p, f, m, g, _[d + 9], 4, 3654602809), g = s(g, p, f, m, _[d + 12], 11, 3873151461), m = s(m, g, p, f, _[d + 15], 16, 530742520), f = s(f, m, g, p, _[d + 2], 23, 3299628645), p = a(p, f, m, g, _[d + 0], 6, 4096336452), g = a(g, p, f, m, _[d + 7], 10, 1126891415), m = a(m, g, p, f, _[d + 14], 15, 2878612391), f = a(f, m, g, p, _[d + 5], 21, 4237533241), p = a(p, f, m, g, _[d + 12], 6, 1700485571), g = a(g, p, f, m, _[d + 3], 10, 2399980690), m = a(m, g, p, f, _[d + 10], 15, 4293915773), f = a(f, m, g, p, _[d + 1], 21, 2240044497), p = a(p, f, m, g, _[d + 8], 6, 1873313359), g = a(g, p, f, m, _[d + 15], 10, 4264355552), m = a(m, g, p, f, _[d + 6], 15, 2734768916), f = a(f, m, g, p, _[d + 13], 21, 1309151649), p = a(p, f, m, g, _[d + 4], 6, 4149444226), g = a(g, p, f, m, _[d + 11], 10, 3174756917), m = a(m, g, p, f, _[d + 2], 15, 718787259), f = a(f, m, g, p, _[d + 9], 21, 3951481745), p = r(p, A), f = r(f, c), m = r(m, u), g = r(g, h);
      return (l(p) + l(f) + l(m) + l(g)).toLowerCase();
    }, Y = e => {
      let t;
      t = e.split(",")[0].includes("base64") ? y(e.split(",")[1]) : b(e.split(",")[1]);
      const n = e.split(",")[0].split(":")[1].split(";")[0], r = new Uint8Array(t.length);
      for (let e = 0; e < t.length; e++) r[e] = t.charCodeAt(e);
      return new Blob([r], {type: n});
    }, q = async (e, t) => new Promise(n => {
      const r = new g;
      r.onload = () => {
        n(r.result || "");
      }, r.onerror = e => {
        D.warn(`unable to decode data ${e}`), n("");
      }, t ? r.readAsText(e, t) : r.readAsBinaryString(e);
    }), J = (e, t) => P(e + "_" + t).replace(/[^0-9a-zA-Z_-]/g, ""), K = e => {
      const t = {};
      let n = window.location.search.replace(/^\?/, "");
      const r = window.location.hash.replace(/^#/, "");
      n ? e && r && (n = n + "&" + r) : n = r;
      const i = n.split("&");
      let o;
      for (let e = 0; e < i.length; e++) {
        if (o = i[e].split("="), 2 != o.length) {
          const e = o[0], t = o.slice(1).join("=");
          o = [e, t];
        }
        t[o[0]] = decodeURIComponent(o[1]);
      }
      return t;
    }, $ = e => {
      setTimeout(() => {
        alert(e);
      }, 1);
    }, ee = (e, t) => {
      setTimeout(() => {
        const n = confirm(e);
        t && t(n);
      }, 1);
    }, te = (e, t, n, r, i, o) => {
      let s;
      try {
        let a = e + "_" + J(n, r);
        if (null != i && (a += "_" + i), s = document.getElementById(a), s && o) {
          const t = document.createElement(e);
          t.setAttribute("id", a);
          const n = s.parentNode;
          n.insertBefore(t, s), n.removeChild(s), s = t;
        } else s ? s.inserted = true : (s = document.createElement(e), s.setAttribute("id", a));
        t && s.setAttribute("class", t), s.__removeChild || (s.__removeChild = s.removeChild, s.removeChild = e => {
          delete e.inserted, s.__removeChild(e);
        }), s.__appendChild || (s.__appendChild = s.appendChild, s.appendChild = (e, t) => {
          "Array" !== Z(e) && (e = [e]), e.forEach(e => {
            (!e.parentElement && !e.inserted || t) && s.__appendChild(e);
          });
        }), s.__insertBefore || (s.__insertBefore = s.insertBefore, s.insertBefore = (e, t) => {
          e.parentElement || e.inserted || s.__insertBefore(e, t);
        });
      } catch (e) {
        console.log("options: Error:" + e.message);
      }
      return s;
    }, ne = (e, t, n, r, i) => te(e, null, t, n, r, i);
    let re, ie, oe, se, ae, le;
    ae = () => {
      if (void 0 !== ie) return ie;
      try {
        ie = -1 != navigator.userAgent.indexOf("Mac OS X");
      } catch (e) {}
      return ie;
    }, se = () => {
      if (void 0 !== re) return re;
      try {
        const e = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
        e && (re = parseInt(e[2]));
      } catch (e) {}
      return re;
    }, le = () => {
      if (void 0 !== oe) return oe;
      try {
        oe = -1 != navigator.userAgent.search(/Android|Mobile/);
      } catch (e) {}
      return oe;
    };
    const de = {FAST_EXEC_SUPPORT: true, DETECT_CONSTRUCTORS_BY_KEYS: se() >= 60, ALLOWS_FILE_SCHEME_ACCESS: false, MAX_SCRIPTS: 1e3, WEBREQUEST_XHR_SUPPORT: true, WEBREQUEST_WEBSOCKET: false, CAN_SAVEAS_ZIP: true, SHARED_OBJECT_URLS: true, SHARED_BLOBS: false, CONTEXT_MENU: true, INCOGNITO_MODE: true, FPI: false, CLIPBOARD_API: false}, Ae = {CLOSE_ALLOWED: true, MIN_DELAY: ae() ? 150 : 0}, ce = {USE: null, DEFAULT: "chromeStorage", SECURE: false, NO_WARNING: false}, ue = {LOCALSTORAGE: void 0}, he = ["chrome-extension:"], pe = globalThis, {chrome: fe, browser: me} = pe, ge = ([].concat(["chrome"]), () => {
      window.location.reload();
    }), _e = (() => {
      const e = {getInternalPathRegexp: function (e, t) {
        const n = new RegExp("(\\" + ["/", ".", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\"].join("|\\") + ")", "g"), r = "chrome-extension://" + _e.id + "/";
        return new RegExp(r.replace(n, "\\$1") + "([a-zA-Z" + (e ? "\\/" : "") + "]*)" + (t || "").replace(n, "\\$1"));
      }, getInternalPageRegexp: function () {
        return _e.getInternalPathRegexp(false, ".html");
      }};
      return Object.defineProperty(e, "lastError", {get: () => fe.runtime.lastError, enumerable: true}), Object.defineProperty(e, "id", {get: () => fe.runtime.id, enumerable: true}), Object.defineProperty(e, "short_id", {get: () => e.id.replace(/[^0-9a-zA-Z]/g, "").substr(0, 4), enumerable: true}), e;
    })(), be = (() => {
      const e = {getURL: function (e) {
        return fe.runtime.getURL(e);
      }, sendMessage: function (e, t) {
        return fe.runtime.sendMessage(e, t);
      }, onMessage: {addListener: function (e) {
        return fe.runtime.onMessage.addListener(e);
      }}, connect: function (e) {
        return fe.runtime.connect({name: e});
      }};
      let t;
      return Object.defineProperty(e, "inIncognitoContext", {get: () => (void 0 === t && (t = fe.extension.inIncognitoContext), t), set: e => {
        t = e;
      }, enumerable: true}), e;
    })();
    let ve = [];
    const ke = {}, ye = {}, we = (e, t) => {
      const n = "string" == typeof e ? [e] : e, r = () => {
        n.every(e => !!Re[e]) ? t() : ve.push(r);
      };
      n.forEach(e => {
        if (void 0 === Re[e] && void 0 === ke[e]) {
          const t = o(() => {
            ye[e] || (delete ke[e], xe(e), Ge(be.getURL(e + ".js"), () => {
              Ee(e);
            }));
          }, 0);
          ke[e] = () => {
            a(t), delete ke[e];
          };
        }
      }), r();
    }, Re = {}, Ce = {}, xe = e => {
      ye[e] = true;
    }, Ee = e => {
      if (!Re[e]) {
        let t;
        Re[e] = true, delete ye[e], (t = ke[e]) && t(), (() => {
          const e = ve;
          ve = [];
          for (const t of e) t();
        })();
      }
    }, Ge = (e, t) => {
      let n = 1;
      const r = () => {
        0 == --n && t && t();
      };
      ("string" == typeof e ? [e] : e).forEach(e => {
        n++;
        try {
          !function (e, t) {
            {
              const n = document.createElement("script");
              n.setAttribute("src", e), t && (n.onload = () => t(true), n.onerror = () => t(false)), (document.head || document.body || document.documentElement || document).appendChild(n);
            }
          }(e, t => {
            t || D.warn("registry: self.load " + e + " failed! "), r();
          });
        } catch (t) {
          D.warn("registry: self.load " + e + " failed! ", t), r();
        }
      }), r();
    }, Ze = Object.defineProperties({}, {...Object.getOwnPropertyDescriptors(be), ...Object.getOwnPropertyDescriptors({onConnect: {addListener: function (e) {
      return fe.runtime.onConnect.addListener(e);
    }}, onConnectExternal: {addListener: function (e) {
      return fe.runtime.onConnectExternal.addListener(e);
    }}, onMessageExternal: {addListener: function (e) {
      return fe.runtime.onMessageExternal.addListener(e);
    }}, onMessage: {...be.onMessage, addListener: e => {
      be.onMessage.addListener((t, n, r) => e(t, n, r));
    }}, manifest: fe.runtime.getManifest(), inIncognitoContext: be.inIncognitoContext, getViews: function (e) {
      return fe.extension.getViews(e);
    }, urls: {prepareForReport: function (e) {
      return e;
    }}})}), Se = Object.defineProperties({}, {...Object.getOwnPropertyDescriptors(_e), ...Object.getOwnPropertyDescriptors({onInstalled: {addListener: function (e) {
      fe.runtime.onInstalled && fe.runtime.onInstalled.addListener(e);
    }}, onUpdateAvailable: {addListener: function (e) {
      fe.runtime.onUpdateAvailable && fe.runtime.onUpdateAvailable.addListener(e);
    }}, setUninstallURL: e => {
      fe.runtime.setUninstallURL && fe.runtime.setUninstallURL(e);
    }, isDarkMode: () => !!window.matchMedia("(prefers-color-scheme: dark)").matches})}), Te = (fe.webRequest && fe.webRequest.OnBeforeSendHeadersOptions && fe.webRequest.OnBeforeSendHeadersOptions.hasOwnProperty("EXTRA_HEADERS"), fe.webNavigation, fe.declarativeContent && fe.declarativeContent.onPageChanged && (fe.declarativeContent.PageStateMatcher, fe.declarativeContent.RequestContentScript), fe.contentScripts && fe.contentScripts.register, fe.userScripts && fe.userScripts.register, {onChanged: {addListener: function (e) {
      return fe.storage.onChanged.addListener(e);
    }}, local: (() => {
      let e = {}, t = {}, n = null, r = false, i = [];
      const o = e => {
        r ? i.push(e) : e();
      }, s = (o, s) => {
        n && window.clearTimeout(n);
        const a = () => {
          r = true;
          let o = 1;
          const a = () => {
            let n;
            if ((n = fe.runtime.lastError) && console.warn(n), 0 == --o) {
              r = false;
              const n = i;
              i = [], e = {}, t = {}, n.forEach(e => e()), s && s();
            }
          }, l = () => {
            Object.keys(e).length && (o++, fe.storage.local.set(e, a));
          };
          let d;
          (d = Object.keys(t)).length ? (o++, fe.storage.local.remove(d, () => {
            l(), a();
          })) : l(), a(), n = null;
        };
        o ? a() : n = window.setTimeout(a, 500);
      }, a = (t, n) => {
        if (t instanceof Array) {
          let e = 1;
          const r = {}, i = () => {
            0 == --e && n(r);
          };
          t.forEach(t => {
            e++, a(t, e => {
              r[t] = e[t], i();
            });
          }), i();
        } else if (void 0 !== e[t]) {
          const r = {};
          r[t] = e[t], n(r);
        } else fe.storage.local.get(t, n);
      };
      return {set: function (n, r) {
        o(() => {
          r && i.push(r), Object.keys(n).forEach(r => {
            var i, o;
            i = r, o = n[r], e[i] = o, delete t[i];
          }), s();
        });
      }, get: (e, t) => {
        null === e ? s(true, () => {
          fe.storage.local.get(null, t);
        }) : o(() => {
          a(e, t);
        });
      }, remove: function (n, r) {
        o(() => {
          var o;
          r && i.push(r), t[o = n] = true, delete e[o], s();
        });
      }, clear: function (r) {
        o(() => {
          n && window.clearTimeout(n), i = [], e = {}, t = {}, fe.storage.local.clear(r);
        });
      }};
    })(), sync: {supported: true, set: function (e, t) {
      return fe.storage.sync.set(e, t);
    }, get: function (e, t) {
      return fe.storage.sync.get(e, t);
    }, remove: function (e, t) {
      return fe.storage.sync.remove(e, t);
    }, clear: function (e) {
      return fe.storage.sync.clear(e);
    }}}), Ue = (Object.defineProperties({}, {...Object.getOwnPropertyDescriptors({DEFAULT_STORE_ID: void 0}), ...Object.getOwnPropertyDescriptors({getAll: function (e, t) {
      return fe.cookies.getAll(e, t);
    }, remove: function (e, t) {
      return fe.cookies.remove(e, t);
    }, set: function (e, t) {
      return fe.cookies.set(e, t);
    }})}), !fe.commands || fe.commands.onCommand, fe.notifications && fe.notifications.getPermissionLevel && fe.notifications.onPermissionLevelChanged && fe.notifications.onClicked, de.CONTEXT_MENU && fe.contextMenus && fe.contextMenus.create && fe.contextMenus.update && fe.contextMenus.remove, {supported: true, getAll: function (e) {
      return fe.permissions.getAll(e);
    }, contains: function (e, t) {
      return fe.permissions.contains(e, t);
    }, request: function (e, t) {
      return fe.permissions.request(e, t);
    }, remove: function (e, t) {
      return fe.permissions.remove(e, t);
    }, onAdded: {addListener: function (e) {
      if (fe.permissions.onAdded) return fe.permissions.onAdded.addListener(e);
    }}, onRemoved: {addListener: function (e) {
      if (fe.permissions.onRemoved) return fe.permissions.onRemoved.addListener(e);
    }}}), Fe = {native_support: true, getMessage: function (...e) {
      return fe.i18n.getMessage.apply(this, e);
    }, getUILanguage: function () {
      return fe.i18n.getUILanguage ? fe.i18n.getUILanguage() : navigator.language;
    }, getAcceptLanguages: function (e) {
      return fe.i18n.getAcceptLanguages ? fe.i18n.getAcceptLanguages(e) : e([]);
    }};
    (() => {
      try {
        ue.LOCALSTORAGE = window.localStorage;
      } catch (e) {
        console.warn("prep: window.localStorage will be unavailable");
      }
      ce.USE = ce.DEFAULT;
      try {
        ue.LOCALSTORAGE && (ce.NO_WARNING = "nowarning" === ue.LOCALSTORAGE.getItem("#brokenprofile"), ce.USE = ue.LOCALSTORAGE.getItem("#storage") || ce.DEFAULT);
      } catch (e) {
        console.warn("prep: error at storage type detection", e);
      }
      var e;
      e = e => {
        de.ALLOWS_FILE_SCHEME_ACCESS = e;
      }, fe.extension.isAllowedFileSchemeAccess ? fe.extension.isAllowedFileSchemeAccess(e) : e(false);
    })();
    const Me = "en";
    let Oe = {}, Le = {}, je = null;
    const De = [], ze = (e, ...t) => {
      const n = [], r = e => {
        for (let t = 0; t < e.length; t++) Array.isArray(e[t]) ? r(e[t]) : n.push(String(e[t]));
      };
      return r(t), Fe.getMessage(e, n);
    }, Ne = e => new Promise((t, n) => {
      ((e, t) => {
        let n;
        if (void 0 !== (n = Ce[e])) t && t(n); else {
          const r = be.getURL(e);
          try {
            const i = new c;
            if (c.onlyasync) {
              if (!t) return void D.warn("registry: async xhr without a callback!");
              i.open("GET", r), i.onload = () => {
                t(i.responseText);
              }, i.onerror = () => {
                t();
              }, i.send(null);
            } else i.open("GET", r, false), i.send(null), n = i.responseText, n || D.warn("registry: content of " + e + " is null!"), t && t(n);
          } catch (e) {
            D.log("getRawContent " + e);
          }
        }
      })(`_locales/${e}/messages.json`, r => {
        try {
          if (r) return t(JSON.parse(r));
        } catch (t) {
          D.log("i18n: parsing locale " + e + " failed!");
        }
        n();
      });
    }), Pe = async e => {
      e = e.concat(Me);
      let t = -1, n = null;
      const r = async () => {
        if (t++, t < e.length) {
          const i = e[t];
          if (!i || !He.includes(i)) return r();
          try {
            const e = await Ne(i);
            n = i, Oe = e;
          } catch (e) {
            return r();
          }
          if (!Xe && i != Me) try {
            const e = await Ne(Me);
            Le = e || {};
          } catch (e) {}
        }
      };
      return await r(), n;
    }, Ve = e => e ? e.replace(/-/g, "_").split("_").map((e, t) => t ? e.toUpperCase() : e.toLowerCase()).join("_") : e, Qe = (e, t) => {
      let n, r;
      return t = t || (je ? [je, je.split("_")[0]].concat(De).filter(e => e) : De), S(t, (t, i) => {
        const o = Number(i);
        if (S(e, (e, i) => {
          const s = Number(i), a = Ve(e), l = a.split(/_/)[0];
          if (a == t) return r = s, false;
          l == t && (void 0 === n || o < n) && (r = s, n = o);
        }), void 0 !== r) return false;
      }), void 0 === r ? r : e[r];
    }, He = [{value: "ar", name: "Arabic - ‎‫العربية‬‎"}, {value: "be", name: "Belarusian - беларуская"}, {value: "cs", name: "Czech - čeština"}, {value: "da", name: "Danish - dansk"}, {value: "de", name: "German - Deutsch"}, {value: "el", name: "Hellenic (Greek) - Ελληνικά"}, {value: "en", name: "English"}, {value: "es", name: "Spanish - español"}, {value: "fr", name: "French - français"}, {value: "hi", name: "Hindi - हिन्दी"}, {value: "hr", name: "Croatian - hrvatski"}, {value: "hu", name: "Hungarian - magyar"}, {value: "id", name: "Indonesian - Indonesia"}, {value: "it", name: "Italian - italiano"}, {value: "ja", name: "Japanese - 日本語"}, {value: "ko", name: "Korean - 한국어"}, {value: "mk", name: "Macedonian - македонски"}, {value: "nb", name: "Norwegian - norsk"}, {value: "nl", name: "Dutch - Nederlands"}, {value: "pl", name: "Polish - polski"}, {value: "pt_BR", name: "Portuguese (Brazil) - português (Brasil)"}, {value: "pt_PT", name: "Portuguese (Portugal) - português (Portugal)"}, {value: "ru", name: "Russian - русский"}, {value: "sk", name: "Slovak - slovenčina"}, {value: "sr", name: "Serbian - српски"}, {value: "tr", name: "Turkish - Türkçe"}, {value: "uk", name: "Ukrainian - українська"}, {value: "vi", name: "Vietnamese - Tiếng Việt"}, {value: "zh_CN", name: "Chinese (Simplified) - 中文（简体中文）"}, {value: "zh_TW", name: "Chinese (Traditional) - 中文（繁體）"}].map(e => e.value), Xe = !(void 0 === Fe) && Fe.native_support, We = (e, ...t) => {
      let n;
      return je && (n = Oe[e] || Le[e]) ? ((e, t) => {
        let n, r = e.message;
        return n = 1 == t.length && Array.isArray(t[0]) ? t[0] : t, e.placeholders && Object.entries(e.placeholders).forEach(([e, t]) => {
          try {
            const i = Number(t.content.replace(/^\$/, "")) - 1;
            let o;
            i < n.length ? (o = n[i], r = r.replace("$" + e + "$", o)) : D.log('i18n: invalid argument count on processing "' + r + '" with args ' + JSON.stringify(n));
          } catch (e) {
            D.log('i18n: error processing "' + r + '" with args ' + JSON.stringify(n));
          }
        }), r;
      })(n, t) : (Xe && (n = ze(e, ...t)) || (n = function (e, ...t) {
        let n = e;
        1 == t.length && Array.isArray(t[0]) && (t = t[0]);
        const r = new RegExp("(^|_)0[a-zA-Z]+0(_|$)");
        for (let e = 0; e < t.length; e++) {
          const i = n.match(r);
          if (!i) {
            D.log("i18n: getMessage(): wrong argument count!!!");
            break;
          }
          n = n.replace(r, (i[1] ? " " : "") + t[e] + (i[2] ? " " : ""));
        }
        return n.replace(/_/g, " ");
      }(e, ...t), D.warn("i18n: missing translation" + n)), n);
    }, Ye = ze, qe = (e, t) => {
      let n;
      const r = e[t];
      if (e) {
        let i = e[t + "_i18n"] || {};
        r && (i = {en: r, ...i});
        const o = Qe(Object.keys(i));
        void 0 !== o && (n = i[o]);
      }
      return n || r;
    }, Je = async e => {
      let t = e;
      if ("null" === e && (t = null), t && (t = Ve(t)), !t && Xe) je = t; else if (t !== je) return Pe([t, ...De, je].filter(e => e)).then(t => {
        je = t, je != e && D.log("i18n: retrieving locale " + t + " failed!");
      });
    }, Ke = Qe, $e = (e, t) => {
      for (let n = 0, r = e.length; n < r; n++) if (e[n] == t) return true;
      return false;
    }, et = (...e) => {
      const t = e.length > 1 ? e : e[0];
      if (null == t ? void 0 : t.queryHelper) return t;
      const n = Array.isArray(t) ? "array" : typeof t;
      if ("function" == n) return "loading" != window.document.readyState ? t(null) : window.addEventListener("DOMContentLoaded", t), et([]);
      if ("string" == n) {
        let e = [];
        if ("<" == t.trim()[0]) {
          let n = t;
          try {
            if (-1 != n.indexOf("<script")) {
              const t = /<script[^>]*>[^<]*<\/script>/g, r = /([^\r\n\t\f\v= '"]+)(?:=(["'])?((?:.(?!\2?\s+(?:\S+)=|\2))+.)\2?)?/g, i = n.match(t);
              i && i.length && (n = n.replace(t, ""), i.forEach(t => {
                const n = t.match(r);
                if (!n || !n.length) return;
                const i = {};
                if (n.slice(1, -1).forEach(e => {
                  const t = e.split("="), n = t.shift() || e;
                  i[n] = (t.join("=") || "").replace(/^"|"$/g, "");
                }), !i.src) return void console.error(`ssjq: unable to parse "${t}"`, i);
                const o = document.createElement("script");
                ["src", "async"].forEach(e => {
                  void 0 !== i[e] && o.setAttribute(e, i[e]);
                }), e.push(o);
              }));
            }
            const t = /^<([^>]+)>$/.exec(n);
            t && 2 == t.length && (n = `${n}</${t[1].split(" ")[0]}>`);
            const r = (new DOMParser).parseFromString(n, "text/html"), i = [].slice.call(r.body.children);
            e = i.concat(e);
          } catch (t) {
            console.error(`ssjq: ${t}`), e = [];
          }
        } else {
          const n = document.querySelectorAll(t);
          e = [].slice.call(n);
        }
        return et(e);
      }
      if ("array" == n) {
        const e = t, n = {}, r = Object.assign(e, {queryHelper: true, append: (...t) => (t.forEach(t => {
          const n = e[0];
          n && et(t).forEach(e => n.appendChild(et(e)[0]));
        }), et(e)), appendTo: t => {
          const n = et(t);
          return e.forEach(e => n.append(e)), et(e);
        }, insertBefore: t => {
          const n = [...e];
          if (e.length) {
            const r = et(t)[0], i = null == r ? void 0 : r.parentNode;
            i && e.forEach(e => {
              const t = et(e)[0];
              t && (i.insertBefore(t, r), n.push(t));
            });
          }
          return et(n);
        }, remove: () => (e.forEach(e => null == e ? void 0 : e.remove(e)), et([])), replaceWith: t => {
          const n = e[0];
          if (n) {
            const e = et(t), r = e.shift();
            return n.replaceWith(r), e.forEach(e => {
              var t;
              null === (t = null == r ? void 0 : r.parentNode) || void 0 === t || t.insertBefore(e, r.nextSibling);
            }), et(n);
          }
          return et(e);
        }, prevAll: t => {
          var n;
          const r = e[0];
          if (!r) return et([]);
          const i = null === (n = et(r).parent()) || void 0 === n ? void 0 : n.children(t);
          if (!i || !i.length) return et([]);
          const o = [];
          for (let e = 0; e < i.length; e++) {
            const t = i[e];
            if (t == r) break;
            o.push(t);
          }
          return et(o.reverse());
        }, nextAll: t => {
          var n;
          const r = e[0];
          if (!r) return et([]);
          const i = null === (n = et(r).parent()) || void 0 === n ? void 0 : n.children(t);
          if (!i || !i.length) return et([]);
          const o = [];
          let s = false;
          for (let e = 0; e < i.length; e++) {
            const t = i[e];
            s && o.push(t), t == r && (s = true);
          }
          return et(o);
        }, addClass: t => (e.forEach(e => null == e ? void 0 : e.classList.add(t)), et(e)), removeClass: t => (e.forEach(e => null == e ? void 0 : e.classList.remove(t)), et(e)), toggleClass: (t, n) => (true === n ? r.addClass(t) : false === n ? r.removeClass(t) : e.forEach(e => null == e ? void 0 : e.classList.toggle(t)), et(e)), hasClass: t => !!e.filter(e => null == e ? void 0 : e.classList.contains(t)).length, is: t => {
          const n = e[0];
          if (n) return ":visible" == t ? "none" !== window.getComputedStyle(n).display : ":checked" == t ? 1 == n.checked : void 0;
        }, attr: (t, n) => {
          if (e.length) {
            const r = (t, n) => {
              null === n ? e.forEach(e => e.removeAttribute(t)) : e.forEach(e => e.setAttribute(t, n.toString()));
            };
            if ("string" == typeof t) {
              if (void 0 === n) return e[0].getAttribute(t);
              r(t, n);
            } else for (const e of Object.keys(t)) r(e, t[e]);
          }
          return et(e);
        }, prop: (t, n) => {
          if (e.length) {
            const r = (t, n) => {
              null === n ? e.forEach(e => delete e[t]) : e.forEach(e => e[t] = n);
            };
            if ("string" == typeof t) {
              if (void 0 === n) return e[0][t];
              r(t, n);
            } else for (const e of Object.keys(t)) r(e, t[e]);
          }
          return et(e);
        }, text: t => {
          if (e.length) {
            if (void 0 === t) return e.map(e => e.innerText).join("");
            e.forEach(e => e.innerText = t);
          }
          return et(e);
        }, html: t => {
          if (e.length) {
            if (void 0 === t) return e.map(e => e.innerHTML).join("");
            e.forEach(e => e.innerHTML = t);
          }
          return et(e);
        }, closest: t => {
          if (e.length) {
            const n = ((e, t) => {
              const n = document.querySelectorAll(t);
              let r = e.parentNode;
              for (; r && !$e(n, r);) r = r.parentNode;
              return r;
            })(e[0], t);
            if (n) return et(n);
          }
          return et([]);
        }, parent: () => {
          const t = e[0];
          return et(t ? t.parentNode : []);
        }, children: t => {
          const n = e[0];
          if (n) if (t) {
            if (n.querySelectorAll) {
              const e = n.querySelectorAll(t);
              return et([].slice.call(e));
            }
          } else if (n.children) return et([].slice.call(n.children));
          return et([]);
        }, find: t => {
          let n = [];
          return e.forEach(e => {
            et(e).children(t).each((e, r) => {
              const i = et(r).find(t).toArray();
              n = [...n, r, ...i];
            });
          }), et(n);
        }, each: t => (e.forEach((e, n) => t(n, e)), et(e)), toArray: () => [...e], bind: (t, i) => (t.split(" ").forEach(t => {
          (n[t] || (n[t] = [])).push(i), e.forEach(e => e.addEventListener(t, i));
        }), r), unbind: t => (t.split(" ").forEach(t => {
          n[t] && (n[t].forEach(n => {
            e.forEach(e => {
              e.removeEventListener(t, n);
            });
          }), n[t] = []);
        }), r), value: t => {
          if (void 0 === t) {
            let t;
            return e.reverse().some(e => {
              if (!e.disabled) return "checkbox" != e.type || 1 == e.checked ? (t = e.value, true) : void 0;
            }), t;
          }
          {
            const n = e.length ? e[e.length - 1] : void 0;
            n && ("checkbox" == n.type ? n.value == t && (n.checked = true) : n.setAttribute("value", t));
          }
        }, data: t => {
          const n = e[0];
          if (n) return n.dataset[t];
        }, offset: () => {
          var t;
          return (null === (t = e[0]) || void 0 === t ? void 0 : t.getBoundingClientRect()) || {left: -1, top: -1, right: -1, bottom: -1, x: -1, y: -1, height: -1, width: -1};
        }, height: () => {
          const t = e[0];
          return t && (t === window ? window.innerHeight : t.offsetHeight) || 0;
        }, scrollTop: () => {
          const t = e[0];
          return t && (t.scrollTop || t.pageYOffset) || 0;
        }, get: t => e[t], on: (t, n) => (t.split(" ").forEach(t => e.forEach(e => null == e ? void 0 : e.addEventListener(t, n))), et(e)), off: (t, n) => (t.split(" ").forEach(t => e.forEach(e => null == e ? void 0 : e.removeEventListener(t, n))), et(e)), trigger: (t, ...n) => (e.forEach(e => {
          const r = e[t];
          r && r.apply(e, n);
        }), et(e)), toggle: t => (e.forEach(e => {
          const n = et(e);
          (void 0 === t ? n.is(":visible") : !t) ? n.hide() : n.show();
        }), et(e)), hide: () => (e.forEach(e => {
          var t;
          const n = null === (t = null == e ? void 0 : e.style) || void 0 === t ? void 0 : t.display;
          n && -1 == n.indexOf("none") && (e.backuped_display = n), et(e).attr("style", "display: none !important");
        }), et(e)), fadeOut: () => et(e).hide(), show: () => (e.forEach(e => {
          e.style.display = e.backuped_display || "";
        }), et(e)), fadeIn: () => et(e).show(), animate: (t, n, r) => {
          const i = e[0];
          return i.current_action && window.clearInterval(i.current_action), i.current_action = window.setInterval(() => {
            if (void 0 !== t.scrollTop) {
              const e = i === window ? document.documentElement : i, n = e.scrollTop;
              e.scrollTop < t.scrollTop ? e.scrollTop = e.scrollTop + 3 : e.scrollTop = e.scrollTop - 3, (e.scrollTop === n || Math.abs(e.scrollTop - t.scrollTop) <= 3) && (e.scrollTop = t.scrollTop, window.clearInterval(i.current_action), delete i.current_action, r && r()), window.getComputedStyle(e);
            } else e.forEach(e => {
              if (void 0 !== t.height) {
                const n = et(e).get(0);
                n && n.style && (n.style.height = `${t.height}px`);
              }
            }), r && r();
          }, void 0 === n ? 100 : n), et(e);
        }});
        return r;
      }
      return et("undefined" == n || null == t ? [] : [t]);
    };
    let tt = null, nt = null;
    const rt = (e, t) => {
      t || (t = {});
      const n = "ct", r = "0", i = ne("div", n, r, "p"), o = te("div", "curbg", n, r, "c"), s = te("div", t.fixed ? "curmiddle_fixed" : "curmiddle_relative", n, r, "d");
      i.inserted || (i.setAttribute("class", "curouter hide"), i.setAttribute("style", "z-index: 10000"));
      const a = ((e, t, n, r) => {
        r || (r = "");
        const i = te("table", "curtable", t, n, "table" + r), o = te("tr", "", t, n, "tr2" + r), s = te("td", "curtableoutertd", t, n, "td1" + r), a = te("td", "curtableinner", t, n, "td2" + r), l = te("td", "curtableoutertd", t, n, "td3" + r);
        return o.appendChild(s), o.appendChild(a), o.appendChild(l), i.appendChild(o), e && a.appendChild(e), i;
      })(e, n, r);
      return s.appendChild(a), i.appendChild(s), i.appendChild(o), i.show = () => {
        i.setAttribute("class", "curouter block");
      }, i.hide = () => {
        i.setAttribute("class", "curouter hide");
      }, i.remove = () => {
        i.parentNode && i.parentNode.removeChild(i);
      }, i.setText = e => {
        i.text = e;
      }, i.print = e => {
        i.text && (i.text.textContent = e);
      }, document.body.appendChild(i), i;
    }, it = () => {
      const e = document.createElement("div");
      e.setAttribute("class", "curcontainer");
      const t = document.createElement("div");
      t.setAttribute("class", "curwaithead");
      const n = document.createElement("div");
      return n.setAttribute("class", "curwaitmsg"), e.appendChild(t), e.appendChild(n), {head: t, outer: e, inner: n};
    }, ot = {wait: e => {
      if (document.body) {
        if (void 0 === e && (e = We("Please_wait___")), null === nt) {
          tt && (tt.remove(), tt = null);
          const t = e => {
            const t = it(), n = t.inner, r = document.createElement("div");
            return r.textContent = e, r.setAttribute("class", "curtext"), et(n).append(et('<div class="lds-css ng-scope"><div class="lds-dual-ring"><div></div><div></div></div></div>')).append(r), {all: t.outer, text: r};
          };
          nt = 0;
          const n = t(e);
          return tt = rt(n.all, {fixed: true}), tt.setText(n.text), tt.show(), true;
        }
        return 0 === nt && (void 0 === e && (e = We("Please_wait___")), tt) ? (e && tt.print(e), tt.show(), true) : void 0;
      }
    }, hide: () => {
      0 === nt && (tt && tt.hide(), nt = null);
    }, dialog: (e, t) => {
      if (!document.body) return;
      if (1 === nt) return false;
      if (null !== nt) return;
      tt && (tt.remove(), tt = null), nt = 1;
      const n = it();
      if (n.inner.appendChild(e), tt = rt(n.outer), tt.show(), t) {
        const e = document.createElement("div");
        e.setAttribute("class", "curclose"), n.head.appendChild(e), e.addEventListener("click", () => t()), tt.addEventListener("keydown", e => {
          27 == e.keyCode && (t(), e.preventDefault());
        }, true), tt.setAttribute("tabindex", 0);
      }
      return true;
    }, hideDialog: () => {
      1 === nt && (tt && tt.hide(), nt = null);
    }};
    let st = null, at = 2;
    const lt = (e, t) => {
      let n = e, r = t;
      const i = () => {
        null != st && window.clearTimeout(st), st = null;
      }, o = e => {
        e && (i(), n && (n(e), n = null));
      };
      st = window.setTimeout(() => {
        if (i(), at-- > 0 && n && r) return lt(n, r), void (n = r = null);
        r && r();
      }, 5e3);
      const s = {method: "ping"};
      try {
        Ze.sendMessage(s, o);
      } catch (e) {}
    }, dt = lt, At = [{name: We("Default"), layout: "default", value: "default"}, {name: We("Default_Light"), layout: "default", theme: "light", value: "default#light"}, {name: We("Default_Dark"), layout: "default", theme: "dark", value: "default#dark"}, {name: We("Default_Darker"), layout: "default", theme: "darker", footer: 'Theme by <a href="https://github.com/narcolepticinsomniac" target="blank">narcolepticinsomniac</a> from the <a href="https://github.com/openstyles/stylus" target="blank">Stylus</a> project.', value: "default#darker"}], ct = {default: We("Default"), monokai: "Monokai", solarized: "Solarized", "mdn-like": "MDN-like", eclipse: "Eclipse", railscasts: "RailsCasts", zenburn: "ZenBurn"}, ut = {images: {origin: e => ({unknown: "data:image/png;base64,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", uso: "data:image/png;base64,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", gf: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3ggEBCQHM3fXsAAAAVdJREFUOMudkz2qwkAUhc/goBaGJBgUtBCZyj0ILkpwAW7Bws4yO3AHLiCtEFD8KVREkoiFxZzX5A2KGfN4F04zMN+ce+5c4LMUgDmANYBnrnV+plBSi+FwyHq9TgA2LQpvCiEiABwMBtzv95RSfoNEHy8DYBzHrNVqVEr9BWKcqNFoxF6vx3a7zc1mYyC73a4MogBg7vs+z+czO50OW60Wt9stK5UKp9Mpj8cjq9WqDTBHnjAdxzGQZrPJw+HA31oulzbAWgLoA0CWZVBKIY5jzGYzdLtdE9DlcrFNrY98zobqOA6TJKHW2jg4nU5sNBpFDp6mhVe5rsvVasUwDHm9Xqm15u12o+/7Hy0gD8KatOd5vN/v1FozTVN6nkchxFuI6hsAAIMg4OPxMJCXdtTbR7JJCMEgCJhlGUlyPB4XfumozInrupxMJpRSRtZlKoNYl+m/6/wDuWAjtPfsQuwAAAAASUVORK5CYII=", gh: "data:image/png;base64,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F/8VFRf/FRUX/xMTFKsAAAAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGRMTFKsVFRf/FRUX/xUVF/8VFRf/FRUX/xUVF/8TExT1AAAADQ4OFFkVFRf/FRUX/xUVF/8VFRf/FRUX/xUVF/8TExOPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABMTE48VFRf/FRUX/xUVF/8VFRf/FRUX/xUVF/8ODhRZExMTnRUVF/8VFRf/FRUX/xUVF/8VFRf/EREU0QAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBERFNEVFRf/FRUX/xUVF/8VFRf/FRUX/xMTE50RERTQFRUX/xUVF/8VFRf/FRUX/xUVF/8SEhJeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEhISXhUVF/8VFRf/FRUX/xUVF/8VFRf/EREU0BISFPIVFRf/FRUX/xUVF/8VFRf/FRUX/wAAABYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWFRUX/xUVF/8VFRf/FRUX/xUVF/8SEhTyFRUX/xUVF/8VFRf/FRUX/xUVF/8SEhTyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASEhTyFRUX/xUVF/8VFRf/FRUX/xUVF/8VFRf/FRUX/xUVF/8VFRf/FRUX/xMTFNsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABMTFNwVFRf/FRUX/xUVF/8VFRf/FRUX/xMTFPYVFRf/FRUX/xUVF/8VFRf/FBQU4QAA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AAAAAAAADAwMFA8PD2MRERSkFBQU0hMTFPMVFRf/FRUX/xMTFPMUFBTSEREUpA8PD2MMDAwUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=", gl: "data:image/png;base64,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", bb: "data:image/png;base64,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", ouj: "data:image/x-icon;base64,AAABAAEAQEAAAAEACAAoFgAAFgAAACgAAABAAAAAgAAAAAEACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwTwoAclEOAHVWAABzUhAAdlcAAHdYAAB0UxIAdVQTAHhZAgB2VRUAe1sJAH1dDgB3XB0AeF0eAHpfIQB7YCIAfGEjAH1iJAB+YyYAf2QnAIFmKQCEah8AgmcrAIVpLgCHbSQAhmovAIhuJQCJbyYAh3EzAIhyNACJczYAi3U4AIx2OQCNdzoAjng7AI95PACQej0Aknw/AJN9QQCXgUUAlYROAJaFTwCXhlAAnItWAKCPWgChkFsAo5FcAJ2RYQCekmIAn5NjAKKWZgCkmGgAp5pyAKqdbQCrnXUArJ52AK+hegCpoX4AraWCALOqhwC0q4gAtayJALatigC3r4sAuLCMALmxjQC3tJQAuLWVALm2lgC7uJgAvbqaAL67mwC/vJwAwb6eAMbBqQDHwqoAwsOuAMXGsgDHyLQAyMm1AM7PugDP0LsA0NG8ANLTvwDT1MAAztXEANDWxQDR18YA0tnHANTbyQDV3MoA19zTANfezQDZ4M8A2t/VANvg1gDc4dcA3eLYAN7j2QDf5NoA4OXbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRjYl9dXFlZWVlcXV9iY2RkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkY2FcVU9JQDo2NDQ2OkBJTlVcYWNkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRiXVZMPTIpIRoUDg0NDhQaISgyPUxWXWJkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGNfVEk0JxgLCAIDAQAAAAABAwIFCxgnNElTX2NkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGJZSzQkEQUDAQAAAAAAAAAAAAAAAAEDBREjNEpZYmRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkY2BSPykUBQEAAAAAAAAAAAAAAAAAAAAAAAABBBMoP1JfY2RkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkY11NNB0MAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAADDB00TV1jZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkY11MMBYEAQAAAAAAAAEDBwIJBAQJAgcDAQAAAAAAAAEEFC5MW2NkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkY11MLBMHAAAAAAABAwcIERccHyIiHxwXEQgHAwEAAAAAAAcTLExdY2RkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGBNMBMHAAAAAAABCQ4YJi84PURGRkQ+OC8mGA4JAQAAAAAABxMuTV9kZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGJSNBYHAAAAAAEDChgqOEVNUlhcW1tcWFJNRTkqGAoGAQAAAAAHFjRRYmRkZGRkZGRkZGRkZGRkZGRkZGRkZGNZPx0EAAAAAAECDyM0SFBcYGJiY2RkY2JiYFxRSTQjDwIBAAAAAAQdP1ljZGRkZGRkZGRkZGRkZGRkZGRkZGRfSykMAQAAAAEEFCk7TlphY2RkZGRkZGRkZGRjYVpPPCkUBAEAAAABDChKX2RkZGRkZGRkZGRkZGRkZGRkZGRiVDQUAwAAAAECFCtDUl5iZGRkZGRkZGRkZGRkZGRiXlNDKxQCAQAAAAMTNFNiZGRkZGRkZGRkZGRkZGRkZGRkXUkkBQAAAAADDypDVGBjZGRkZGRkZGRkZGRkZGRkZGNgVUMqEAYAAAAABSRJXWRkZGRkZGRkZGRkZGRkZGRkY1Y1EgMAAAABCiM8UmBjZGRkZGRkZGRkZGRkZGRkZGRkY2BTPCMKAQAAAAERNFZjZGRkZGRkZGRkZGRkZGRkZGFMJwgAAAABCRg0Tl5jZGRkZGRkZGRkZGRkZGRkZGRkZGRjXk80GAkBAAAABSdMYWRkZGRkZGRkZGRkZGRkZGRcPRgHAAAAAw4qSFpiZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGJaSCoOAwAAAAMYPVxkZGRkZGRkZGRkZGRkZGRjVTMOAQAAAAcYOFBhZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkYVE5GAcAAAABCzJVY2RkZGRkZGRkZGRkZGRkYk8pCAAAAAEIJkVaYmRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGNcRSYIAQAAAAgpTmJkZGRkZGRkZGRkZGRkZGBJIgQAAAADES1NX2RkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkYE0vEQMAAAACIUlfZGRkZGRkZGRkZGRkZGRdQRsHAAAABhc4UmJkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGJSOBcHAAAABxpAXWRkZGRkZGRkZGRkZGRkXDoUAwAAAAccPVdiZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRiWD4cAgAAAAEUOlxkZGRkZGRkZGRkZGRkZFo2DwEAAAACH0RcY2RkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkY1xEIAkAAAABDjZZZGRkZGRkZGRkZGRkZGRZNA0BAAAACSJGW2NkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRbRiIJAAAAAA00WWRkZGRkZGRkZGRkZGRkWTQNAQAAAAkiRltjZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkW0YiCQAAAAANNFlkZGRkZGRkZGRkZGRkZFo3DwEAAAACH0RcY2RkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkY1xEIAkAAAABDzZZZGRkZGRkZGRkZGRkZGRcOhQDAAAABxw9V2JkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGJYPRwCAAAAARQ6XGRkZGRkZGRkZGRkZGRkXUEbBwAAAAYXOFJiZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRiUjgXBwAAAAcaQF1kZGRkZGRkZGRkZGRkZGBJIgQAAAADES1NX2RkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkYE0vEQMAAAACIklfZGRkZGRkZGRkZGRkZGRiTykIAAAAAQgmRVpiZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkY1xFJggBAAAACClOYmRkZGRkZGRkZGRkZGRkY1UzDgEAAAAHGDhQYGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGFQORgHAAAAAQsyVWNkZGRkZGRkZGRkZGRkZGRcPhoHAAAAAQ4qSFpiZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGJaSCoOAwAAAAMYPVxkZGRkZGRkZGRkZGRkZGRkYUwnCAAAAAEJGTROXmNkZGRkZGRkZGRkZGRkZGRkZGRkZGNeTjQYCQEAAAAFJ0xhZGRkZGRkZGRkZGRkZGRkZGNWNRIDAAAAAQgjO1JgY2RkZGRkZGRkZGRkZGRkZGRkZGNgUzwjCgEAAAABETRWY2RkZGRkZGRkZGRkZGRkZGRkXUkkBQAAAAADDylCVGBjZGRkZGRkZGRkZGRkZGRkZGNgVEMpDwMAAAAABSRJXWRkZGRkZGRkZGRkZGRkZGRkZGJUNRQDAAAAAQIUK0NSXmJkZGRkZGRkZGRkZGRkZGJeUkMrFAIBAAAAAxM0VGJkZGRkZGRkZGRkZGRkZGRkZGRkX0spDAEAAAABBBQpO05aYWJkZGRkZGRkZGRkYmFaTjspFAQBAAAAAQwoS19kZGRkZGRkZGRkZGRkZGRkZGRkZGNZQB4EAAAAAAECDyI0R1BaYGJiY2NjY2JiYFxQSDQjDwIBAAAAAAQdP1ljZGRkZGRkZGRkZGRkZGRkZGRkZGRkYlI0FQIAAAAAAQMIGCo4RU1SV1xbW1xXUk1FOSoYCAMBAAAAAAcWNFJiZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRgTTEUBwAAAAAAAQkOGSUtOD1ERkZEPTgvJhgOCQEAAAAAAAcTME1gZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkY15MLxQHAAAAAAABAwcIERccHyIiHxwXEQgHAwEAAAAAAAcTLExeY2RkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRjXUwxFQUBAAAAAAAAAQMGBwIJCQIHBgMBAAAAAAAAAQQWMExdY2RkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGNeTTQeDAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwwdNE1dY2RkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkY2BSQCkUBQMAAAAAAAAAAAAAAAAAAAAAAAADBRMpP1JgY2RkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkYllLNSQSCAcBAAAAAAAAAAAAAAAAAQcIEiQ0SlliZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRjX1RJNScaDggCBwMBAQEBAwcCCA4aJzVJVF9jZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRiXVZMPjMqIhsUDwsLDxQbIikzPkxWXWJkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRjYVxVT0lBOjc0NDc6QElPVVxhY2RkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkY2JgXVxaWVlaXF1gYmNkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", usty: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PHRpdGxlPjlDMzAwNDI3LTg4Q0QtNDI2RC05QkZELUFEMUU2RUI2RjRDNjwvdGl0bGU+PGRlZnM+PHBhdGggZD0iTTAgNS42MjNBNS42MjMgNS42MjMgMCAwIDEgNS42MjMgMGgxMi43NTRBNS42MjMgNS42MjMgMCAwIDEgMjQgNS42MjN2MTIuNzU0QTUuNjIzIDUuNjIzIDAgMCAxIDE4LjM3NyAyNEg1LjYyM0E1LjYyMyA1LjYyMyAwIDAgMSAwIDE4LjM3N1Y1LjYyM3oiIGlkPSJhIi8+PC9kZWZzPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PG1hc2sgaWQ9ImIiIGZpbGw9IiNmZmYiPjx1c2UgeGxpbms6aHJlZj0iI2EiLz48L21hc2s+PHVzZSBmaWxsLW9wYWNpdHk9IjAiIGZpbGw9IiNGRkYiIHhsaW5rOmhyZWY9IiNhIi8+PHBhdGggZmlsbD0iIzJFQ0M3MSIgbWFzaz0idXJsKCNiKSIgZD0iTTExLjI1IDB2MTQuNjI1SDBWMHoiLz48cGF0aCBmaWxsPSIjRTc0QzNDIiBtYXNrPSJ1cmwoI2IpIiBkPSJNMjQgMHY3Ljg3NUgxMi43NVYweiIvPjxwYXRoIGZpbGw9IiNGMzlDMTIiIG1hc2s9InVybCgjYikiIGQ9Ik0xMS4yNSAxNi4xMjVWMjRIMHYtNy44NzV6Ii8+PHBhdGggZmlsbD0iIzM0OThEQiIgbWFzaz0idXJsKCNiKSIgZD0iTTI0IDkuNTYzdjE0LjYyNEgxMi43NVY5LjU2M3oiLz48L2c+PC9zdmc+"}["gst" == e ? "gh" : e]), brand: e => "data:image/svg+xml," + encodeURI({tampermonkey: "<?xml version='1.0' encoding='utf-8'?><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><g id='XMLID_273_'><g id='XMLID_78_'><path id='XMLID_83_' class='st0' d='M304.8,0H95.2C42.6,0,0,42.6,0,95.2v209.6C0,357.4,42.6,400,95.2,400h209.6 c52.6,0,95.2-42.6,95.2-95.2V95.2C400,42.6,357.4,0,304.8,0z M106.3,375C61.4,375,25,338.6,25,293.8c0-44.9,36.4-81.3,81.3-81.3 c44.9,0,81.3,36.4,81.3,81.3C187.5,338.6,151.1,375,106.3,375z M293.8,375c-44.9,0-81.3-36.4-81.3-81.3 c0-44.9,36.4-81.3,81.3-81.3c44.9,0,81.3,36.4,81.3,81.3C375,338.6,338.6,375,293.8,375z'/></g><g id='XMLID_67_' class='st2'><path id='XMLID_74_' class='st3' d='M304.8,0H95.2C42.6,0,0,42.6,0,95.2v209.6C0,357.4,42.6,400,95.2,400h209.6 c52.6,0,95.2-42.6,95.2-95.2V95.2C400,42.6,357.4,0,304.8,0z M106.3,375C61.4,375,25,338.6,25,293.8c0-44.9,36.4-81.3,81.3-81.3 c44.9,0,81.3,36.4,81.3,81.3C187.5,338.6,151.1,375,106.3,375z M293.8,375c-44.9,0-81.3-36.4-81.3-81.3 c0-44.9,36.4-81.3,81.3-81.3c44.9,0,81.3,36.4,81.3,81.3C375,338.6,338.6,375,293.8,375z'/></g></g></svg>", webdav: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512'><path d='M537.585 226.56C541.725 215.836 544 204.184 544 192c0-53.019-42.981-96-96-96-19.729 0-38.065 5.954-53.316 16.159C367.042 64.248 315.288 32 256 32c-88.366 0-160 71.634-160 160 0 2.728.07 5.439.204 8.133C40.171 219.845 0 273.227 0 336c0 79.529 64.471 144 144 144h368c70.692 0 128-57.308 128-128 0-61.93-43.983-113.586-102.415-125.44z'/></svg>", yandex: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 512'><path d='M153.1 315.8L65.7 512H2l96-209.8c-45.1-22.9-75.2-64.4-75.2-141.1C22.7 53.7 90.8 0 171.7 0H254v512h-55.1V315.8h-45.8zm45.8-269.3h-29.4c-44.4 0-87.4 29.4-87.4 114.6 0 82.3 39.4 108.8 87.4 108.8h29.4V46.5z'/></svg>", firefox: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 496 512'><path d='M496 262.5C497.6 380.8 388.9 504 248 504c-106.7 0-190.9-62.5-229.8-151.7-43-97.7-5.7-251.6 70.3-320.3l-2.7 69.7c3.9-5 32.5-6.4 37.1 0C139 71 190.7 48 232.1 47.2c-15.8 13.3-52.2 61.6-49.2 86.2 20.2 6.4 51.1 6.6 67.4 7.7 5 2.8 4.1 19.6-5.8 33.4 0 0-13 18-48.1 24.3l2.7 41.1-37-7.4c-12.4 31.5 17.4 59.4 48.4 54.2 34.3-5.8 45.9-32 70-30.6 23.8 1.4 33.2 14.6 30.1 27.1 0 0-3.9 14.9-29.6 12.4-21.8 34.5-50.4 53.5-97.3 49.4 71.3 59.1 168.3 5.5 192.6-42.8 24.3-48.1 8-122.1-16.3-142.3 28.7 12.4 43.7 27.6 54.2 55.5 5.5-61.9-22.9-132.1-73.8-173.3C436 70.1 494.3 144.2 496 262.5z'/></svg>", chrome: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 496 512'><path d='M131.5 217.5L55.1 100.1c47.6-59.2 119-91.8 192-92.1 42.3-.3 85.5 10.5 124.8 33.2 43.4 25.2 76.4 61.4 97.4 103L264 133.4c-58.1-3.4-113.4 29.3-132.5 84.1zm32.9 38.5c0 46.2 37.4 83.6 83.6 83.6s83.6-37.4 83.6-83.6-37.4-83.6-83.6-83.6-83.6 37.3-83.6 83.6zm314.9-89.2L339.6 174c37.9 44.3 38.5 108.2 6.6 157.2L234.1 503.6c46.5 2.5 94.4-7.7 137.8-32.9 107.4-62 150.9-192 107.4-303.9zM133.7 303.6L40.4 120.1C14.9 159.1 0 205.9 0 256c0 124 90.8 226.7 209.5 244.9l63.7-124.8c-57.6 10.8-113.2-20.8-139.5-72.5z'/></svg>", onedrive: "<svg xmlns='http://www.w3.org/2000/svg' id='Layer_1' data-name='Layer 1' viewBox='0 0 24 24'><title>Artboard 1</title><g id='Templates'><path d='M17,10.57a3,3,0,0,1,1.18.23,3.11,3.11,0,0,1,1,.64,2.82,2.82,0,0,1,.65,1,3,3,0,0,1-1.6,3.95,3.08,3.08,0,0,1-1.16.23H8a4,4,0,0,1-1.56-.31,4,4,0,0,1,0-7.38A4,4,0,0,1,8,8.57a3.54,3.54,0,0,1,.73.07,4.63,4.63,0,0,1,.72-.87,4.72,4.72,0,0,1,.89-.65,4.58,4.58,0,0,1,1-.41,4.79,4.79,0,0,1,1.13-.14,4.37,4.37,0,0,1,1.64.3,4.55,4.55,0,0,1,1.36.84,4.39,4.39,0,0,1,1,1.27A4.66,4.66,0,0,1,17,10.57Z'/></g></svg>", gdrive: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M339 314.9L175.4 32h161.2l163.6 282.9H339zm-137.5 23.6L120.9 480h310.5L512 338.5H201.5zM154.1 67.4L0 338.5 80.6 480 237 208.8 154.1 67.4z'/></svg>", dropbox: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M256 87.2l-151.9 93.9L0 97.5 150.6 0 256 87.2zM0 265.3l150.6 98.3 105.4-88L104.1 181 0 265.3zm256 10.3l105.4 88L512 265.3l-104.1-84.2L256 275.6zM512 97.5L361.4 0 256 87.2l151.9 93.9L512 97.5zM256.3 294.6l-105.7 87.7-45.2-29.5V385l150.9 90.5L407.2 385v-32.2L362 382.3l-105.7-87.7z'/></svg>", instagram: "<svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='5 4 44 44' style='enable-background:new 5 4 44 44;' xml:space='preserve'><style type='text/css'>.st0{fill:none;}</style><g><rect x='-0.2' y='0.1' class='st0' width='53.8' height='53.4'/><path d='M48.1,26.3c0,4.3,0,7.2-0.1,8.8c-0.2,3.9-1.3,6.9-3.5,9s-5.1,3.3-9,3.5c-1.6,0.1-4.6,0.1-8.8,0.1c-4.3,0-7.2,0-8.8-0.1 c-3.9-0.2-6.9-1.3-9-3.5c-2.1-2.1-3.3-5.1-3.5-9c-0.1-1.6-0.1-4.6-0.1-8.8s0-7.2,0.1-8.8c0.2-3.9,1.3-6.9,3.5-9 c2.1-2.1,5.1-3.3,9-3.5c1.6-0.1,4.6-0.1,8.8-0.1c4.3,0,7.2,0,8.8,0.1c3.9,0.2,6.9,1.3,9,3.5s3.3,5.1,3.5,9 C48,19.1,48.1,22,48.1,26.3z M28.8,8.7c-1.3,0-2,0-2.1,0c-0.1,0-0.8,0-2.1,0c-1.3,0-2.3,0-2.9,0c-0.7,0-1.6,0-2.7,0.1 c-1.1,0-2.1,0.1-2.9,0.3c-0.8,0.1-1.5,0.3-2,0.5c-0.9,0.4-1.7,0.9-2.5,1.6c-0.7,0.7-1.2,1.5-1.6,2.5c-0.2,0.5-0.4,1.2-0.5,2 s-0.2,1.7-0.3,2.9c0,1.1-0.1,2-0.1,2.7c0,0.7,0,1.7,0,2.9c0,1.3,0,2,0,2.1s0,0.8,0,2.1c0,1.3,0,2.3,0,2.9c0,0.7,0,1.6,0.1,2.7 c0,1.1,0.1,2.1,0.3,2.9s0.3,1.5,0.5,2c0.4,0.9,0.9,1.7,1.6,2.5c0.7,0.7,1.5,1.2,2.5,1.6c0.5,0.2,1.2,0.4,2,0.5 c0.8,0.1,1.7,0.2,2.9,0.3s2,0.1,2.7,0.1c0.7,0,1.7,0,2.9,0c1.3,0,2,0,2.1,0c0.1,0,0.8,0,2.1,0c1.3,0,2.3,0,2.9,0 c0.7,0,1.6,0,2.7-0.1c1.1,0,2.1-0.1,2.9-0.3c0.8-0.1,1.5-0.3,2-0.5c0.9-0.4,1.7-0.9,2.5-1.6c0.7-0.7,1.2-1.5,1.6-2.5 c0.2-0.5,0.4-1.2,0.5-2c0.1-0.8,0.2-1.7,0.3-2.9c0-1.1,0.1-2,0.1-2.7c0-0.7,0-1.7,0-2.9c0-1.3,0-2,0-2.1s0-0.8,0-2.1 c0-1.3,0-2.3,0-2.9c0-0.7,0-1.6-0.1-2.7c0-1.1-0.1-2.1-0.3-2.9c-0.1-0.8-0.3-1.5-0.5-2c-0.4-0.9-0.9-1.7-1.6-2.5 c-0.7-0.7-1.5-1.2-2.5-1.6c-0.5-0.2-1.2-0.4-2-0.5c-0.8-0.1-1.7-0.2-2.9-0.3c-1.1,0-2-0.1-2.7-0.1C31.1,8.7,30.1,8.7,28.8,8.7z  M34.4,18.5c2.1,2.1,3.2,4.7,3.2,7.8s-1.1,5.6-3.2,7.8c-2.1,2.1-4.7,3.2-7.8,3.2c-3.1,0-5.6-1.1-7.8-3.2c-2.1-2.1-3.2-4.7-3.2-7.8 s1.1-5.6,3.2-7.8c2.1-2.1,4.7-3.2,7.8-3.2C29.7,15.3,32.3,16.3,34.4,18.5z M31.7,31.3c1.4-1.4,2.1-3.1,2.1-5s-0.7-3.7-2.1-5.1 c-1.4-1.4-3.1-2.1-5.1-2.1c-2,0-3.7,0.7-5.1,2.1s-2.1,3.1-2.1,5.1s0.7,3.7,2.1,5c1.4,1.4,3.1,2.1,5.1,2.1 C28.6,33.4,30.3,32.7,31.7,31.3z M39.9,13c0.5,0.5,0.8,1.1,0.8,1.8c0,0.7-0.3,1.3-0.8,1.8c-0.5,0.5-1.1,0.8-1.8,0.8 s-1.3-0.3-1.8-0.8c-0.5-0.5-0.8-1.1-0.8-1.8c0-0.7,0.3-1.3,0.8-1.8c0.5-0.5,1.1-0.8,1.8-0.8S39.4,12.5,39.9,13z'/></g></svg>", facebook: "<svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 30 30' style='enable-background:new 0 0 30 30;' xml:space='preserve'><style type='text/css'>.f{}.c{fill:none;}</style><g><circle class='c' cx='15' cy='15' r='13' stroke='black' stroke-width='3'/><path class='f' d='M16.4,23.9v-8.1h2.7l0.4-3.2h-3.1v-2c0-0.9,0.3-1.5,1.6-1.5l1.7,0V6.2c-0.3,0-1.3-0.1-2.4-0.1c-2.4,0-4.1,1.5-4.1,4.2v2.3h-2.7v3.2h2.7v8.1H16.4z'/></g></svg>"}[e]).replace(/%20/g, " "), empty: "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="}, getLayouts: () => At.map(e => {
      const {name: t, theme: n, layout: r} = e;
      return {name: t, value: n ? [r, n].join("#") : r};
    }), getLayoutByValue: e => {
      let t;
      return At.some(n => {
        if (n.value === e) return t = n, true;
      }), t;
    }, getEditorThemes: () => Object.keys(ct).map(e => ({name: ct[e] || e, value: e}))}, {getLayoutByValue: ht} = ut;
    let pt;
    const ft = (() => {
      const e = ue.LOCALSTORAGE;
      let t, n;
      return {cache: function () {
        const t = document.documentElement, n = location.pathname;
        if (e && t && n) try {
          const r = JSON.parse(e.getItem("background") || "{}");
          r[n] = {class: t.getAttribute("class")}, e.setItem("background", JSON.stringify(r));
        } catch (e) {}
      }, reset: function () {
        n = true;
        const e = document.documentElement;
        "string" == typeof t && e && e.setAttribute("class", t);
      }, restore: function () {
        if (n) return;
        const r = location.pathname;
        if (e && r) try {
          let n;
          const i = e.getItem("background");
          if (i && (n = JSON.parse(i)) && (n = n[r]) && n.class) {
            const e = document.documentElement;
            if (!e) return;
            t = e.getAttribute("class") || "", e.setAttribute("class", t + " " + n.class);
          }
        } catch (e) {}
      }};
    })(), mt = e => {
      const t = () => {
        e(), ft.restore();
      };
      _t ? document.body ? t() : window.addEventListener("DOMContentLoaded", t) : (gt = gt || []).push(() => {
        mt(e);
      }), pt && (window.clearTimeout(pt), pt = void 0);
    };
    let gt, _t = false;
    const bt = e => {
      _t = true, gt && (gt.forEach(e => {
        e();
      }), gt = void 0), ft.restore(), dt(t => {
        if (t && t.pong) {
          const e = t.config;
          let n, r = e.layout;
          e.dark && !r.includes("#") && (r += "#dark");
          const i = ht(r);
          if (!i) return void D.warn(`Unknown layout ${r}`);
          const {theme: o, footer: s} = i;
          o && "light" !== o ? (s && window.setTimeout(() => {
            const e = document.querySelectorAll(".footer")[0];
            e && (e.innerHTML = s);
          }, 0), n = o) : n = "default", ft.reset(), document.documentElement.classList.add(le() ? "mobile" : "desktop", n), window.setTimeout(ft.cache, 500);
        }
        e.suc && e.suc();
      }, e.fail);
    }, vt = e => {
      const t = (() => {
        let e, t;
        const n = [], r = [], i = e => {
          r.push(e), o();
        }, o = () => {
          if (void 0 !== e) {
            let n;
            for (; r.length;) n = r.shift(), void 0 !== n.state && n.state !== e || (t = ("function" == typeof n.f ? n.f.call(s, t) : n.f) || t);
          }
        }, s = {promise: () => s, done: e => (i({state: true, f: e}), s), fail: e => (i({state: false, f: e}), s), always: e => (i({f: e}), s), progress: e => (e && n.push(e), s), then: (e, n, r) => vt(i => {
          const o = (e, n) => (...r) => {
            const o = e ? e(t) : void 0, s = o && "function" == typeof o.promise ? o.promise() : null, a = o && "function" == typeof o.then ? o : null;
            if (s) s.done(e => i.resolve(e)).fail((...e) => i.reject(e[0])).progress((...e) => i.notify(...e)); else if (a) a.then((...e) => i.resolve(...e), e => i.reject(e)); else {
              const t = e ? [o] : r;
              i[n](t[0]);
            }
          };
          s.done(o(e, "resolve")), s.fail(o(n, "reject")), s.progress(o(r, "notify"));
        }).promise(), each: e => {
          const t = vt();
          return s.then(n => {
            const r = Array.isArray(n) ? n : [n];
            vt.when(r.map(t => e(t))).then(t.resolve);
          }), t.promise();
        }, iterate: e => {
          const t = vt();
          return s.then(n => {
            const r = (Array.isArray(n) ? n : [n]).map(t => () => e(t));
            vt.onebyone(r, true).done(e => {
              t.resolve(e);
            }).fail(t.reject);
          }), t.promise();
        }};
        return {get: () => s, try_resolve: n => (void 0 === e && (e = true, t = n), o(), s), try_reject: n => (void 0 === e && (e = false, t = n), o(), s), do_notify: e => ((e => {
          n.forEach(t => t(e));
        })(e), s)};
      })(), n = {promise: () => t.get(), resolve: e => t.try_resolve(e), reject: e => t.try_reject(e), notify: e => t.do_notify(e), consume: e => (e && e.promise ? e.promise().done(e => n.resolve(e)).fail((...e) => n.reject(e[0])).progress(e => n.notify(e)) : e && e.then ? e.then(e => n.resolve(e), (...e) => n.reject(e[0])) : D.warn("promise: incompatible object given to consume()", e), n.promise())};
      return e && e(n), n;
    };
    vt.Pledge = (...e) => {
      const t = vt();
      return t.resolve(...e), t.promise();
    }, vt.Breach = (...e) => {
      const t = vt();
      return t.reject(e[0]), t.promise();
    }, vt.onebyone = (e, t = true) => {
      const n = [], r = vt();
      let i = 0;
      const o = () => {
        if (i < e.length) {
          const s = (0, e[i++])();
          s && s.promise ? s.promise().done(e => {
            n.push(e), o();
          }).fail(() => {
            if (n.push(null), t) return r.reject();
            o();
          }) : s && s.then ? s.then(e => {
            n.push(e), o();
          }, () => {
            if (n.push(null), t) return r.reject();
            o();
          }) : (n.push(s), o());
        } else r.resolve(n);
      };
      return o(), r.promise();
    }, vt.or = e => {
      let t;
      const n = vt(), r = () => {
        e.length ? (t = e.shift(), t && vt.Pledge().then(t).done(n.resolve).fail(r)) : n.reject();
      };
      return r(), n.promise();
    }, vt.sidebyside = e => {
      e = Array.isArray(e) ? e : [e];
      const t = vt();
      let n = e.length;
      return n ? e.forEach(e => {
        e && e.promise && e.promise().always(() => {
          0 == --n && t.resolve();
        });
      }) : t.resolve(), t.promise();
    }, vt.when = e => {
      e = Array.isArray(e) ? e : [e];
      const t = vt();
      let n = e.length;
      const r = [];
      return n ? e.forEach(e => {
        let i;
        if (e && e.promise) i = e.promise(); else {
          if (!e.then) return void D.warn("promise: incompatible object given to when()", e);
          i = e;
        }
        i.fail(() => {
          t.reject(), n = -1;
        }).done(e => {
          r.push(e), 0 == --n && t.resolve(r);
        });
      }) : t.resolve(r), t.promise();
    }, vt.sleep = e => {
      const t = vt();
      return o(t.resolve, e), t.promise();
    };
    const kt = e => new i(t => Ct(t, e));
    let yt = 0;
    const wt = (e, t) => {
      const n = Date.now();
      if (yt + e < n) return new i(e => o(() => {
        yt = Date.now(), e();
      }, t || 0));
    }, Rt = async function (e, ...t) {
      await wt(1e3), e.apply(this, t);
    }, Ct = function (e, t) {
      return t ? o.apply(this, [e, t]) : (Rt.apply(this, [e]), 0);
    }, xt = e => {
      const t = [], n = [], r = () => {
        let i;
        if (n.length < e.threads && t.length && (i = t.shift())) {
          const e = i.fn();
          let t;
          if (void 0 !== e.catch) {
            const n = vt();
            e.then(n.resolve).catch(n.reject), t = n.promise();
          } else t = e;
          n.push(t), t.always(() => {
            let e;
            (e = n.indexOf(t)) > -1 && n.splice(e, 1), r();
          }), i.p.consume(t);
        }
      };
      return {add: function (e) {
        const n = vt();
        return t.push({fn: e, p: n}), r(), n.promise();
      }};
    }, Et = e => {
      let t = {};
      const n = (null == e ? void 0 : e.retimeout_on_get) || false, r = (null == e ? void 0 : e.timeout) || 300, i = (null == e ? void 0 : e.check_interval) || 120;
      let o;
      const a = e => {
        delete t[e];
      }, d = () => {
        const e = Date.now() - 1e3 * r;
        Object.entries(t).forEach(([t, n]) => {
          n.ts < e && Ct(() => a(t), 1);
        });
      }, A = {init: () => (o || (o && l(o), o = null, o = s(d, 1e3 * i)), A), set: (e, n) => {
        t[e] = {value: n, ts: Date.now()};
      }, get: (e, r) => {
        let i = r;
        return t[e] && (n && (t[e].ts = Date.now()), i = t[e].value), i;
      }, remove: a, removeAll: () => {
        t = {};
      }};
      return A;
    }, Gt = "aaa\naarp\nabb\nabbott\nabogado\nac\nacademy\naccenture\naccountant\naccountants\naco\nactive\nactor\nad\nadac\nads\nadult\nae\naeg\naero\naf\nafl\nag\nagency\nai\naig\nairforce\nairtel\nal\nalibaba\nalipay\nallfinanz\nalsace\nam\namica\namsterdam\nan\nanalytics\nandroid\nao\napartments\napp\napple\naq\naquarelle\nar\naramco\narchi\narmy\narpa\narte\nas\nasia\nassociates\nat\nattorney\nau\nauction\naudi\naudio\nauthor\nauto\nautos\naw\nax\naxa\naz\nazure\nba\nbaidu\nband\nbank\nbar\nbarcelona\nbarclaycard\nbarclays\nbargains\nbauhaus\nbayern\nbb\nbbc\nbbva\nbcn\nbd\nbe\nbeats\nbeer\nbentley\nberlin\nbest\nbet\nbf\nbg\nbh\nbharti\nbi\nbible\nbid\nbike\nbing\nbingo\nbio\nbiz\nbj\nbl\nblack\nblackfriday\nbloomberg\nblue\nbm\nbms\nbmw\nbn\nbnl\nbnpparibas\nbo\nboats\nboehringer\nbom\nbond\nboo\nbook\nboots\nbosch\nbostik\nbot\nboutique\nbq\nbr\nbradesco\nbridgestone\nbroadway\nbroker\nbrother\nbrussels\nbs\nbt\nbudapest\nbugatti\nbuild\nbuilders\nbusiness\nbuy\nbuzz\nbv\nbw\nby\nbz\nbzh\nca\ncab\ncafe\ncal\ncall\ncamera\ncamp\ncancerresearch\ncanon\ncapetown\ncapital\ncar\ncaravan\ncards\ncare\ncareer\ncareers\ncars\ncartier\ncasa\ncash\ncasino\ncat\ncatering\ncba\ncbn\ncc\ncd\nceb\ncenter\nceo\ncern\ncf\ncfa\ncfd\ncg\nch\nchanel\nchannel\nchat\ncheap\nchloe\nchristmas\nchrome\nchurch\nci\ncipriani\ncircle\ncisco\ncitic\ncity\ncityeats\nck\ncl\nclaims\ncleaning\nclick\nclinic\nclinique\nclothing\ncloud\nclub\nclubmed\ncm\ncn\nco\ncoach\ncodes\ncoffee\ncollege\ncologne\ncom\ncommbank\ncommunity\ncompany\ncompare\ncomputer\ncomsec\ncondos\nconstruction\nconsulting\ncontact\ncontractors\ncooking\ncool\ncoop\ncorsica\ncountry\ncoupons\ncourses\ncr\ncredit\ncreditcard\ncreditunion\ncricket\ncrown\ncrs\ncruises\ncsc\ncu\ncuisinella\ncv\ncw\ncx\ncy\ncymru\ncyou\ncz\ndabur\ndad\ndance\ndate\ndating\ndatsun\nday\ndclk\nde\ndealer\ndeals\ndegree\ndelivery\ndell\ndeloitte\ndelta\ndemocrat\ndental\ndentist\ndesi\ndesign\ndev\ndiamonds\ndiet\ndigital\ndirect\ndirectory\ndiscount\ndj\ndk\ndm\ndnp\ndo\ndocs\ndog\ndoha\ndomains\ndoosan\ndownload\ndrive\ndubai\ndurban\ndvag\ndz\nearth\neat\nec\nedeka\nedu\neducation\nee\neg\neh\nemail\nemerck\nenergy\nengineer\nengineering\nenterprises\nepson\nequipment\ner\nerni\nes\nesq\nestate\net\neu\neurovision\neus\nevents\neverbank\nexchange\nexpert\nexposed\nexpress\nfage\nfail\nfairwinds\nfaith\nfamily\nfan\nfans\nfarm\nfashion\nfast\nfeedback\nferrero\nfi\nfilm\nfinal\nfinance\nfinancial\nfirestone\nfirmdale\nfish\nfishing\nfit\nfitness\nfj\nfk\nflickr\nflights\nflorist\nflowers\nflsmidth\nfly\nfm\nfo\nfoo\nfootball\nford\nforex\nforsale\nforum\nfoundation\nfox\nfr\nfresenius\nfrl\nfrogans\nfrontier\nfund\nfurniture\nfutbol\nfyi\nga\ngal\ngallery\ngallup\ngame\ngarden\ngb\ngbiz\ngd\ngdn\nge\ngea\ngent\ngenting\ngf\ngg\nggee\ngh\ngi\ngift\ngifts\ngives\ngiving\ngl\nglass\ngle\nglobal\nglobo\ngm\ngmail\ngmo\ngmx\ngn\ngold\ngoldpoint\ngolf\ngoo\ngoog\ngoogle\ngop\ngot\ngov\ngp\ngq\ngr\ngrainger\ngraphics\ngratis\ngreen\ngripe\ngroup\ngs\ngt\ngu\ngucci\nguge\nguide\nguitars\nguru\ngw\ngy\nhamburg\nhangout\nhaus\nhdfcbank\nhealth\nhealthcare\nhelp\nhelsinki\nhere\nhermes\nhiphop\nhitachi\nhiv\nhk\nhm\nhn\nhockey\nholdings\nholiday\nhomedepot\nhomes\nhonda\nhorse\nhost\nhosting\nhoteles\nhotmail\nhouse\nhow\nhr\nhsbc\nht\nhu\nhyundai\nibm\nicbc\nice\nicu\nid\nie\nifm\niinet\nil\nim\nimmo\nimmobilien\nin\nindustries\ninfiniti\ninfo\ning\nink\ninstitute\ninsurance\ninsure\nint\ninternational\ninvestments\nio\nipiranga\niq\nir\nirish\nis\niselect\nist\nistanbul\nit\nitau\niwc\njaguar\njava\njcb\nje\njetzt\njewelry\njlc\njll\njm\njmp\njo\njobs\njoburg\njot\njoy\njp\njprs\njuegos\nkaufen\nkddi\nke\nkfh\nkg\nkh\nki\nkia\nkim\nkinder\nkitchen\nkiwi\nkm\nkn\nkoeln\nkomatsu\nkp\nkpn\nkr\nkrd\nkred\nkw\nky\nkyoto\nkz\nla\nlacaixa\nlamborghini\nlamer\nlancaster\nland\nlandrover\nlanxess\nlasalle\nlat\nlatrobe\nlaw\nlawyer\nlb\nlc\nlds\nlease\nleclerc\nlegal\nlexus\nlgbt\nli\nliaison\nlidl\nlife\nlifeinsurance\nlifestyle\nlighting\nlike\nlimited\nlimo\nlincoln\nlinde\nlink\nlive\nliving\nlixil\nlk\nloan\nloans\nlol\nlondon\nlotte\nlotto\nlove\nlr\nls\nlt\nltd\nltda\nlu\nlupin\nluxe\nluxury\nlv\nly\nma\nmadrid\nmaif\nmaison\nmakeup\nman\nmanagement\nmango\nmarket\nmarketing\nmarkets\nmarriott\nmba\nmc\nmd\nme\nmed\nmedia\nmeet\nmelbourne\nmeme\nmemorial\nmen\nmenu\nmeo\nmf\nmg\nmh\nmiami\nmicrosoft\nmil\nmini\nmk\nml\nmm\nmma\nmn\nmo\nmobi\nmobily\nmoda\nmoe\nmoi\nmom\nmonash\nmoney\nmontblanc\nmormon\nmortgage\nmoscow\nmotorcycles\nmov\nmovie\nmovistar\nmp\nmq\nmr\nms\nmt\nmtn\nmtpc\nmtr\nmu\nmuseum\nmutuelle\nmv\nmw\nmx\nmy\nmz\nna\nnadex\nnagoya\nname\nnatura\nnavy\nnc\nne\nnec\nnet\nnetbank\nnetwork\nneustar\nnew\nnews\nnexus\nnf\nng\nngo\nnhk\nni\nnico\nnikon\nninja\nnissan\nnl\nno\nnokia\nnorton\nnowruz\nnp\nnr\nnra\nnrw\nntt\nnu\nnyc\nnz\nobi\noffice\nokinawa\nom\nomega\none\nong\nonl\nonline\nooo\noracle\norange\norg\norganic\norigins\nosaka\notsuka\novh\npa\npage\npamperedchef\npanerai\nparis\npars\npartners\nparts\nparty\npe\npet\npf\npg\nph\npharmacy\nphilips\nphoto\nphotography\nphotos\nphysio\npiaget\npics\npictet\npictures\npid\npin\nping\npink\npizza\npk\npl\nplace\nplay\nplaystation\nplumbing\nplus\npm\npn\npohl\npoker\nporn\npost\npr\npraxi\npress\npro\nprod\nproductions\nprof\npromo\nproperties\nproperty\nprotection\nps\npt\npub\npw\npwc\npy\nqa\nqpon\nquebec\nquest\nracing\nre\nread\nrealtor\nrealty\nrecipes\nred\nredstone\nredumbrella\nrehab\nreise\nreisen\nreit\nren\nrent\nrentals\nrepair\nreport\nrepublican\nrest\nrestaurant\nreview\nreviews\nrexroth\nrich\nricoh\nrio\nrip\nro\nrocher\nrocks\nrodeo\nroom\nrs\nrsvp\nru\nruhr\nrun\nrw\nrwe\nryukyu\nsa\nsaarland\nsafe\nsafety\nsakura\nsale\nsalon\nsamsung\nsandvik\nsandvikcoromant\nsanofi\nsap\nsapo\nsarl\nsas\nsaxo\nsb\nsbs\nsc\nsca\nscb\nschaeffler\nschmidt\nscholarships\nschool\nschule\nschwarz\nscience\nscor\nscot\nsd\nse\nseat\nsecurity\nseek\nselect\nsener\nservices\nseven\nsew\nsex\nsexy\nsfr\nsg\nsh\nsharp\nshell\nshia\nshiksha\nshoes\nshow\nshriram\nsi\nsingles\nsite\nsj\nsk\nski\nskin\nsky\nskype\nsl\nsm\nsmile\nsn\nsncf\nso\nsoccer\nsocial\nsoftbank\nsoftware\nsohu\nsolar\nsolutions\nsony\nsoy\nspace\nspiegel\nspreadbetting\nsr\nsrl\nss\nst\nstada\nstar\nstarhub\nstatefarm\nstatoil\nstc\nstcgroup\nstockholm\nstorage\nstudio\nstudy\nstyle\nsu\nsucks\nsupplies\nsupply\nsupport\nsurf\nsurgery\nsuzuki\nsv\nswatch\nswiss\nsx\nsy\nsydney\nsymantec\nsystems\nsz\ntab\ntaipei\ntaobao\ntatamotors\ntatar\ntattoo\ntax\ntaxi\ntc\ntci\ntd\nteam\ntech\ntechnology\ntel\ntelefonica\ntemasek\ntennis\ntf\ntg\nth\nthd\ntheater\ntheatre\ntickets\ntienda\ntiffany\ntips\ntires\ntirol\ntj\ntk\ntl\ntm\ntmall\ntn\nto\ntoday\ntokyo\ntools\ntop\ntoray\ntoshiba\ntours\ntown\ntoyota\ntoys\ntp\ntr\ntrade\ntrading\ntraining\ntravel\ntravelers\ntravelersinsurance\ntrust\ntrv\ntt\ntube\ntui\ntushu\ntv\ntvs\ntw\ntz\nua\nubs\nug\nuk\num\nunicom\nuniversity\nuno\nuol\nus\nuy\nuz\nva\nvacations\nvana\nvc\nve\nvegas\nventures\nverisign\nversicherung\nvet\nvg\nvi\nviajes\nvideo\nvillas\nvin\nvip\nvirgin\nvision\nvista\nvistaprint\nviva\nvlaanderen\nvn\nvodka\nvolkswagen\nvote\nvoting\nvoto\nvoyage\nvu\nwales\nwalter\nwang\nwanggou\nwatch\nwatches\nweather\nweatherchannel\nwebcam\nweber\nwebsite\nwed\nwedding\nweir\nwf\nwhoswho\nwien\nwiki\nwilliamhill\nwin\nwindows\nwine\nwme\nwolterskluwer\nwork\nworks\nworld\nws\nwtc\nwtf\nxbox\nxerox\nxin\n测试\nकॉम\nपरीक्षा\n佛山\n慈善\n集团\n在线\n한국\n点看\nคอม\nভারত\n八卦\n‏موقع‎\nবাংলা\n公益\n公司\n移动\n我爱你\nмосква\nиспытание\nқаз\nонлайн\nсайт\n联通\nсрб\nбел\n‏קום‎\n时尚\n테스트\n淡马锡\nорг\nनेट\n삼성\nசிங்கப்பூர்\n商标\n商店\n商城\nдети\nмкд\n‏טעסט‎\nею\nポイント\n新闻\n工行\n‏كوم‎\n中文网\n中信\n中国\n中國\n娱乐\n谷歌\nభారత్\nලංකා\n购物\n測試\nભારત\nभारत\n‏آزمایشی‎\nபரிட்சை\n网店\nसंगठन\n餐厅\n网络\nком\nукр\n香港\n诺基亚\nδοκιμή\n飞利浦\n‏إختبار‎\n台湾\n台灣\n手表\n手机\nмон\n‏الجزائر‎\n‏عمان‎\n‏ارامكو‎\n‏ایران‎\n‏امارات‎\n‏بازار‎\n‏پاکستان‎\n‏الاردن‎\n‏موبايلي‎\n‏بھارت‎\n‏المغرب‎\n‏السعودية‎\n‏سودان‎\n‏همراه‎\n‏عراق‎\n‏مليسيا‎\n澳門\n닷컴\n政府\n‏شبكة‎\n‏بيتك‎\nგე\n机构\n组织机构\n健康\nไทย\n‏سورية‎\nрус\nрф\n珠宝\n‏تونس‎\n大拿\nみんな\nグーグル\nελ\n世界\nਭਾਰਤ\n网址\n닷넷\nコム\n游戏\nvermögensberater\nvermögensberatung\n企业\n信息\n‏مصر‎\n‏قطر‎\n广东\nஇலங்கை\nஇந்தியா\nհայ\n新加坡\n‏فلسطين‎\nテスト\n政务\nxperia\nxxx\nxyz\nyachts\nyahoo\nyamaxun\nyandex\nye\nyodobashi\nyoga\nyokohama\nyoutube\nyt\nza\nzara\nzero\nzip\nzm\nzone\nzuerich\nzw".split("\n").join("|"), Zt = "ac.cn\nac.jp\nac.uk\nad.jp\nah.cn\naichi.jp\nakita.jp\naomori.jp\nasn.au\nbj.cn\nchiba.jp\nco.cc\nco.ck\nco.fk\nco.gg\nco.im\nco.in\nco.ir\nco.je\nco.jp\nco.kr\nco.ma\ncom.ac\ncom.af\ncom.ag\ncom.ai\ncom.al\ncom.ar\ncom.au\ncom.aw\ncom.az\ncom.ba\ncom.bb\ncom.bh\ncom.bi\ncom.bm\ncom.bo\ncom.br\ncom.bs\ncom.bt\ncom.by\ncom.bz\ncom.ci\ncom.cm\ncom.cn\ncom.co\ncom.cu\ncom.cw\ncom.cy\ncom.de\ncom.dm\ncom.do\ncom.dz\ncom.ec\ncom.ee\ncom.eg\ncom.es\ncom.et\ncom.fr\ncom.ge\ncom.gh\ncom.gi\ncom.gl\ncom.gn\ncom.gp\ncom.gr\ncom.gt\ncom.gu\ncom.gy\ncom.hk\ncom.hn\ncom.hr\ncom.ht\ncom.im\ncom.io\ncom.iq\ncom.is\ncom.jo\ncom.kg\ncom.ki\ncom.km\ncom.kp\ncom.ky\ncom.kz\ncom.la\ncom.lb\ncom.lc\ncom.lk\ncom.lr\ncom.lv\ncom.ly\ncom.mg\ncom.mk\ncom.ml\ncom.mo\ncom.ms\ncom.mt\ncom.mu\ncom.mv\ncom.mw\ncom.mx\ncom.my\ncom.na\ncom.nf\ncom.ng\ncom.ni\ncom.nr\ncom.om\ncom.pa\ncom.pe\ncom.pf\ncom.ph\ncom.pk\ncom.pl\ncom.pr\ncom.ps\ncom.pt\ncom.py\ncom.qa\ncom.re\ncom.ro\ncom.ru\ncom.rw\ncom.sa\ncom.sb\ncom.sc\ncom.sd\ncom.se\ncom.sg\ncom.sh\ncom.sl\ncom.sn\ncom.so\ncom.st\ncom.sv\ncom.sy\ncom.tj\ncom.tm\ncom.tn\ncom.to\ncom.tr\ncom.tt\ncom.tw\nco.mu\ncom.ua\ncom.ug\ncom.uy\ncom.uz\ncom.vc\ncom.ve\ncom.vi\ncom.vn\ncom.vu\ncom.ws\ncom.zm\nconf.au\nco.nz\nco.rw\nco.th\nco.tj\nco.tt\nco.tv\nco.tz\nco.ug\nco.uk\nco.us\nco.ve\nco.yu\nco.za\nco.zm\nco.zw\ncq.cn\ncsiro.au\nde.net\ndk.org\ned.jp\nedu.au\nedu.cn\nedu.uk\nehime.jp\neu.org\nfukui.jp\nfukuoka.jp\nfukushima.jp\ngb.net\ngd.cn\ngifu.jp\ngo.jp\ngov.au\ngov.cn\ngov.jp\ngov.uk\ngr.jp\ngs.cn\ngunma.jp\ngx.cn\ngz.cn\nhb.cn\nhe.cn\nhi.cn\nhiroshima.jp\nhk.cn\nhl.cn\nhn.cn\nhokkaido.jp\nhyogo.jp\nibaraki.jp\nid.au\ninfo.au\nishikawa.jp\niwate.jp\njl.cn\njs.cn\nkagawa.jp\nkagoshima.jp\nkanagawa.jp\nkanazawa.jp\nkawasaki.jp\nkitakyushu.jp\nkobe.jp\nkochi.jp\nkumamoto.jp\nkyoto.jp\nlg.jp\nln.cn\nltd.uk\nmatsuyama.jp\nme.uk\nmie.jp\nmiyagi.jp\nmiyazaki.jp\nmo.cn\nmod.uk\nnagano.jp\nnagasaki.jp\nnagoya.jp\nnara.jp\nne.jp\nnet.au\nnet.cn\nnet.jp\nnet.uk\nnhs.uk\nnic.uk\nniigata.jp\nnm.cn\nnx.cn\noita.jp\nokayama.jp\nokinawa.jp\norg.au\norg.cn\norg.jp\norg.uk\nor.jp\nosaka.jp\notc.au\noz.au\nplc.uk\npolice.uk\nqh.cn\nsaga.jp\nsaitama.jp\nsapporo.jp\nsc.cn\nsch.uk\nsendai.jp\nsh.cn\nshiga.jp\nshimane.jp\nshizuoka.jp\nsn.cn\nsx.cn\ntakamatsu.jp\ntelememo.au\ntj.cn\ntochigi.jp\ntokushima.jp\ntokyo.jp\ntottori.jp\ntoyama.jp\ntw.cn\nuk.net\nutsunomiya.jp\nwakayama.jp\nxj.cn\nxz.cn\nyamagata.jp\nyamaguchi.jp\nyamanashi.jp\nyn.cn\nyokohama.jp\nzj.cn".split("\n").join("|"), St = (".(" + [Gt, Zt].join("|") + ")").replace(/\./gi, "\\."), Bt = Et({timeout: 180, check_interval: 120, retimeout_on_get: true}).init(), It = e => e.split("").map(e => {
      const t = e.toLowerCase(), n = e.toUpperCase();
      return t != n ? "[" + t + n + "]" : e;
    }).join(""), Tt = "://", Ut = (e, t) => {
      let {scheme: n, host: r, path: i} = (e => {
        let t, n, r, i;
        const o = "/", s = e.replace(/\$$/, "").split(Tt);
        s.length < 2 ? (t = "", n = e) : (t = s[0].replace(/^\^/, ""), n = s.slice(1).join(Tt));
        const a = n.split(o);
        if (i = a.length < 2 ? "/" : o + a.slice(1).join(o), r = a[0], "http*" === t ? t = "https<1>" : t.match(/\*|http|https|file|ftp/) || (D.warn('uri: override scheme "' + t + '" with "*"'), t = "*"), "file" === t) r = ""; else {
          const e = r, t = r.match(/\*$|(\*\.)?[^/*]+/);
          r = (t ? t[0] : "").replace(/:[0-9]*$/, ""), r !== e && D.warn('uri: override host "' + e + '" with "' + r + '"');
        }
        return i && i.substr(0, 1) === o || (D.warn('uri: prefix path "' + i + '" with "/"'), i = o + i), {scheme: t, host: r, path: i};
      })(e);
      return n = E(n).replace(/\*/gi, "[^:/#?]*"), r = E(r).replace(/\*\\\./gi, "(*\\.)?").replace(/\*/gi, "[^#?/]*"), i = E(i).replace(/\*/gi, ".*"), n = n.replace(/<1>/g, "?"), r = r.replace(new RegExp(E(".tld") + "$"), St), t ? (n = n.toLowerCase(), r = r.toLowerCase()) : (n = It(n), r = It(r)), r += "(:[0-9]{1,5})?", "^" + n + E(Tt) + r + i + "$";
    }, Ft = ["protocol", "hostname", "origin"], Mt = ["port"], Ot = ["pathname"], Lt = ["search", "hash"];
    let jt;
    const Dt = {protocol: "", origin: "", pathname: "", hostname: "", port: void 0, search: "", hash: ""}, zt = (e, t) => {
      let n = Object.assign({}, Dt);
      if (null == e) ; else if (["data:", "view-source:"].some(t => e.startsWith(t))) {
        n.origin = "null";
        const t = e.indexOf(":");
        n.protocol = e.substr(0, t + 1), n.pathname = e.substr(t + 1);
      } else {
        const r = document.createElement("a");
        r.href = e;
        const i = document.body || document.documentElement || document;
        i.appendChild(r);
        const {protocol: o, origin: s, pathname: a, hostname: l, port: d, search: A, hash: c} = r;
        if (n = {protocol: o, origin: s, pathname: a, hostname: l, port: parseInt(d) || void 0, search: A, hash: c}, i.removeChild(r), !t && o) {
          if (0 !== e.toLowerCase().indexOf(o)) if (e.startsWith("//")) n.origin = "", n.protocol = ""; else {
            if (!["/", "?", "#"].includes(e[0])) return zt("/" + e);
            jt = jt || zt("", true), [...Lt, ...Ot].forEach(e => {
              jt[e] === n[e] && (n[e] = "");
            }), Ft.forEach(e => {
              n[e] = "";
            }), Mt.forEach(e => {
              n[e] = void 0;
            });
          }
          ["tampermonkey:"].includes(n.protocol) && (n.pathname = ((n.hostname ? "/" + n.hostname : "") + (n.pathname || "")).replace(/^\/+/, "/"), n.hostname = "");
        }
      }
      return 0 === n.port && (n.port = void 0), Object.defineProperties(n, {domain: {get: function () {
        const e = n.hostname.split("."), t = e.pop();
        let r = `${e.pop()}.${t}`;
        return Pt(r) && (r = `${e.pop()}.${r}`), r;
      }}}), n;
    };
    let Nt;
    const Pt = e => (Nt = Nt || new RegExp("^(" + Zt.replace(/\./g, "\\.") + ")$"), !!e.match(Nt)), Vt = e => {
      if (null == e) return;
      let t = Bt.get(e);
      return t || (t = zt(e), Bt.set(e, t), t);
    }, Qt = e => Object.entries(e).map(([e, t]) => void 0 === t ? null : encodeURIComponent(e) + "=" + encodeURIComponent(t)).filter(e => e).join("&"), Ht = "mtm_visitor", Xt = "default", Wt = "pageview", Yt = "script_update", qt = "script", Jt = "cloud", Kt = "event", $t = "pageview", en = "ping", tn = "https://a.tampermonkey.net/matomo.php", nn = ue.LOCALSTORAGE;
    let rn, on, sn, an = false, ln = false;
    const dn = () => ({url: tn, siteId: 4, tracker: {[Xt]: {enabled: vn(4, 1)}, [qt]: {enabled: true}, [Yt]: {enabled: vn(4, 10)}, [Jt]: {enabled: vn(4, 0.0005)}}}), An = () => ({url: tn, siteId: 5, tracker: {[Xt]: {enabled: vn(5, 10)}, [qt]: {enabled: true}, [Yt]: {enabled: vn(5, 10)}, [Jt]: {enabled: vn(5, 0.001)}}}), cn = () => ({url: tn, siteId: 6, tracker: {[Xt]: {enabled: vn(6, 50)}, [qt]: {enabled: true}, [Yt]: {enabled: vn(6, 10)}, [Jt]: {enabled: vn(6, 0.01)}}}), un = {default: An, gcal: An, iikm: dn, fcmf: dn, saap: () => ({url: tn, siteId: 7, tracker: {[Xt]: {enabled: true}, [qt]: {enabled: true}, [Yt]: {enabled: vn(7, 10)}, [Jt]: {enabled: vn(7, 0.01)}}}), fire: cn, firb: cn, dhdg: () => ({url: tn, siteId: 3, tracker: {[Xt]: {enabled: vn(3, 1)}, [qt]: {enabled: true}, [Yt]: {enabled: vn(3, 10)}, [Jt]: {enabled: vn(3, 0.0005)}}}), mfdh: An, heif: () => ({url: "http://a.userscript.grobilan:8081/matomo.php", siteId: 2, tracker: {[Xt]: {enabled: true}}})};
    let hn;
    const pn = [{msg: "a disconnected port"}, {msg: "Function.prototype.apply: Arguments list has wrong type", url: "event_bindings"}, {msg: "Script error."}], fn = e => [...Array(e)].map(() => Math.floor(16 * Math.random()).toString(16)).join(""), mn = e => {
      if (!nn) return;
      const t = [e.uuid, e.createTs, e.visitCount, e.currentVisitTs, e.lastVisitTs].join(".");
      nn.setItem(Ht, t);
    }, gn = e => {
      const t = e || Xt, n = hn.tracker[t] || hn.tracker.default;
      return n.enabled ? {url: hn.url, siteId: hn.siteId, options: n} : null;
    }, _n = fn(6), bn = async (e, t, n) => {
      if (!e) return;
      const r = (() => {
        if (!nn) return;
        const e = nn.getItem(Ht);
        if (!e) return;
        const t = e.split(".");
        if (t.length >= 5) {
          t.unshift("0");
          const [e, n, r, i, o, s] = t;
          return {createdNow: false, newVisitor: e, uuid: n, createTs: r, visitCount: i, currentVisitTs: o, lastVisitTs: s};
        }
      })() || (() => {
        const e = Math.floor(Date.now() / 1e3).toString(), t = {createdNow: true, newVisitor: "1", uuid: fn(16), createTs: e, visitCount: "0", currentVisitTs: e, lastVisitTs: ""};
        return mn(t), t;
      })();
      let i;
      const o = new Date, s = {idsite: e.siteId, rec: 1, action_name: document.title || Se.short_id, url: location.href, _id: r.uuid, rand: fn(4), apiv: 1, h: o.getHours(), m: o.getMinutes(), s: o.getSeconds(), cookie: 1, pv_id: _n}, a = {...s, _idts: Number(r.createTs), _idvc: Number(r.visitCount), _viewts: Number(r.lastVisitTs), res: `${screen.width}x${screen.height}`};
      if (t == $t) {
        const e = on ? {gt_ms: on} : {}, t = {...s, ...a, ...e, new_visit: 1};
        mn((e => {
          const t = Math.floor(Date.now() / 1e3).toString();
          return e.newVisitor = "0", e.visitCount = (Number(e.visitCount) + 1).toString(), e.lastVisitTs = e.currentVisitTs, e.currentVisitTs = t, e;
        })(r)), i = t;
      } else if (t == Kt) {
        if (!n) return;
        i = {...s, ca: 1, e_c: n.category, e_a: n.action, e_n: n.name, e_v: n.value};
      } else {
        if (t != en) return;
        i = {...s, ...a, ping: 1};
      }
      i = Object.assign(s, i);
      const l = `${e.url}?${Qt(i)}`, d = document.createElement("img");
      d.src = l, d.onload = () => {
        var e;
        null === (e = d.parentNode) || void 0 === e || e.removeChild(d);
      }, d.onerror = () => {
        var e;
        null === (e = d.parentNode) || void 0 === e || e.removeChild(d);
      }, (document.body || document.head || document.documentElement).appendChild(d);
    }, vn = (e, t) => {
      let n = 100 * Math.random() < t;
      if (nn) try {
        let r, i;
        const o = ["wsr", e, t].join("_"), s = Date.now(), a = 864e7;
        if (r = nn.getItem(o)) {
          try {
            i = JSON.parse(r);
          } catch (e) {}
          (!i || i.ts + a < s) && (i = {ts: s, w: n});
        } else i = {ts: s, w: n};
        n = i.w, nn.setItem(o, JSON.stringify(i));
      } catch (e) {}
      return n;
    }, kn = e => {
      an && (ln = e, ln ? rn && yn && (yn(), yn = void 0) : sn && (clearInterval(sn), sn = void 0));
    };
    let yn = () => {
      bn(gn(Wt), $t), sn = window.setInterval(() => bn(gn(Wt), en), 864e5);
    };
    const wn = (e, t, n) => {
      if (!ln) return;
      void 0 === n && (t += " " + window.location.href, n = "");
      let r = false;
      for (const n of pn) {
        if (!n.msg && !n.url) return;
        n.msg && -1 == e.indexOf(n.msg) || n.url && -1 == t.indexOf(n.url) || (r = true);
      }
      r || bn(gn("error"), Kt, {category: "Error", action: e, name: t + ":" + n});
    }, Rn = {init: (e, t, n) => {
      const r = `${(null == n ? void 0 : n.version) || ""} `, i = Se.short_id;
      hn = (un[i] || un.default)(), window.onerror = (t, n, i, o, s) => {
        let a = "";
        if (s) try {
          a = s.stack || "";
        } catch (e) {}
        wn(t.toString(), r + e + "@" + Ze.urls.prepareForReport(n || ""), [i + ":" + o, a].join(";"));
      }, document.addEventListener("securitypolicyviolation", t => {
        let n = "";
        try {
          n = t.stack;
        } catch (e) {}
        wn("CSP violation of " + t.effectiveDirective, r + e + "@" + Ze.urls.prepareForReport(t.documentURI), [t.sourceFile, " -> ", t.lineNumber + ":" + t.columnNumber, n].join(";"));
      }), (null == n ? void 0 : n.started) && (on = Date.now() - n.started.getTime()), an = true, rn = !!(null == n ? void 0 : n.trackView), kn(t);
    }, setEnabled: kn, isActive: function (e) {
      return ln && !!gn(e);
    }, tC: (e, t, n) => {
      if (!ln) return;
      let r = "", i = "";
      "init" === t ? (i = "Initialized", r = e) : "error" === t && (i = "Error", r = e + " -> " + n), bn(gn(Jt), Kt, {category: "Cloud", action: i, name: r});
    }, tS: (e, t, n) => {
      if (!ln) return;
      const r = `${e}${n ? ` <${n}> ` : ""}`;
      let i = "", o = null;
      if ("i" === t) i = "Installed"; else if ("u" === t) i = "Updated", o = gn(Yt); else if ("m" === t) i = "Revealed"; else {
        if ("r" !== t) return;
        i = "Removed";
      }
      bn(o || gn(qt), Kt, {category: "Script", action: i, name: r});
    }, tE: wn, tG: (e, t, n) => {
      if (!ln) return;
      let r = "", i = "";
      "clicked" === e ? (i = "Click", r = t + ":" + n) : "button" === e ? (i = "Button", r = t || "?") : "dialog" === e && (i = "Dialog"), bn(gn("begging"), Kt, {category: "Begging", action: i, name: r});
    }}, Cn = Rn, {SHARED_OBJECT_URLS: xn, SHARED_BLOBS: En} = de, Gn = e => void 0 !== e.objUrl, Zn = e => void 0 !== e.blob, Sn = e => void 0 !== e.dataUri;
    class Bn {
      constructor(e) {
        if (Gn(e)) this.objUrl = e.objUrl.url, this.type = e.objUrl.type; else if (Zn(e)) this.blob = e.blob; else {
          if (!Sn(e)) throw new Error("incompatible TransferableData");
          this.dataUri = e.dataUri;
        }
      }
      dispose() {
        this.objUrl && URL.revokeObjectURL(this.objUrl);
      }
      async toTransferableData() {
        if (xn) {
          if (!this.objUrl && (!this.blob && this.dataUri && (this.blob = Y(this.dataUri)), this.blob && (this.objUrl = URL.createObjectURL(this.blob)), !this.objUrl)) throw new Error("incomplete Transferable");
          return {objUrl: {url: this.objUrl, type: this.type}};
        }
        if (En) {
          if (!this.blob && (this.objUrl ? this.blob = await A(this.objUrl).then(e => e.blob()) : this.dataUri && (this.blob = Y(this.dataUri)), !this.blob)) throw new Error("incomplete Transferable");
          return {blob: this.blob};
        }
        throw new Error("incompatible Transferable");
      }
      get tryObjectUrl() {
        return this.objUrl;
      }
      get tryBlob() {
        return this.blob;
      }
      get tryDataUri() {
        return this.dataUri;
      }
      async toBlob() {
        if (this.blob) return this.blob;
        if (!this.objUrl) {
          if (this.dataUri) return Y(this.dataUri);
          throw new Error("incompatible Transferable");
        }
        try {
          return await (await A(this.objUrl)).blob();
        } catch (e) {
          return;
        }
      }
      async toDataUri() {
        if (this.dataUri) return this.dataUri;
        {
          const e = await this.toBlob();
          if (!e) throw new Error("incompatible Transferable");
          return await (e => new Promise(t => {
            const n = new g;
            n.onload = e => {
              var n;
              t((null === (n = e.target) || void 0 === n ? void 0 : n.result) || void 0);
            }, n.readAsDataURL(e);
          }))(e);
        }
      }
      static fromTransferableData(e) {
        return e && (Zn(e) || Gn(e) || Sn(e)) ? new Bn(e) : void 0;
      }
    }
    let In = {};
    const Tn = e => ["https:", "http:", "data:", "blob"].some(t => e.startsWith(t)), Un = ["internal", "user-agent", "accept-charset", "accept-encoding", "access-control-request-headers", "access-control-request-method", "connection", "content-length", "cookie", "cookie2", "date", "dnt", "expect", "host", "keep-alive", "origin", "referer", "te", "trailer", "transfer-encoding", "upgrade", "via"], Fn = {"cache-control": "no-cache", pragma: "no-cache"}, Mn = {"cache-control": "max-age=0, must-revalidate"}, On = e => {
      if (e) {
        const t = {};
        return Object.keys(e).forEach(n => {
          let r = n, i = e[n];
          if (In.prefix) o = n.toLowerCase(), (Un.includes(o) || 0 === o.indexOf("proxy-") || 0 === o.indexOf("sec-")) && (r = In.prefix + n, i = null === i ? "" : k(z(i))); else if (null === i) return;
          var o;
          t[r] = i;
        }), t;
      }
    }, Ln = e => ({responseText: "", response: null, readyState: 4, responseHeaders: "", status: 0, statusText: "", error: e = e || "Forbidden"}), jn = e => {
      if ("Blob" === e.type) return new Blob([H(e.value)]);
      if ("File" === e.type) {
        if (!e.name) return;
        return new File([H(e.value)], e.name, {type: e.meta, lastModified: e.lastModified || Date.now()});
      }
      if ("FormData" == e.type) {
        const t = new FormData;
        return Object.keys(e.value).forEach(n => {
          const r = "Array" === e.value[n].type, i = jn(e.value[n]), o = r ? i : [i];
          o.forEach((e, r) => {
            t.append(n, o[r]);
          });
        }), t;
      }
      if ("Array" === e.type || "Object" === e.type) {
        let t, n, r;
        "Object" === e.type ? (r = Object.keys(e.value), n = e => e < r.length ? r[e] : null, t = {}) : (n = t => t < e.value.length ? t : null, t = []);
        for (let r, i = 0; null !== (r = n(i)); i++) t[r] = jn(e.value[r]);
        return t;
      }
      return e.value;
    }, Dn = e => {
      const t = {};
      return e && e.split("\n").forEach(e => {
        const n = e.match(/^([^:]+): ?(.*)/);
        if (n) {
          const e = n[1].toLowerCase();
          t[e] = (void 0 !== t[e] ? ", " : "") + (n[2] || "").replace(/,/g, "%2C");
        }
      }), t;
    }, zn = (e, t, n) => {
      const r = {...t || {}}, i = async (e, t) => {
        const n = r[e];
        n && n("function" == typeof t ? await t() : t);
      }, o = async (e, t) => {
        r[e] && (await i(e, t), r[e] = void 0);
      };
      if (!(n = n || {}).internal && !Tn(e.url)) {
        D.warn("xhr: invalid scheme of url:", e.url);
        const t = Ln("Invalid scheme");
        return o("onerror", t), void o("ondone", t);
      }
      const s = void 0 !== e.responseType ? e.responseType.toLowerCase() : void 0, a = e.url && "http" == e.url.substr(0, 4), l = !In.mozAnon && e.anonymous || "stream" == s, d = e.fetch;
      if ("stream" == s && !a) {
        D.warn("xhr: stream reqponse requested, but fetch is not available");
        const e = Ln("No fetch support");
        return o("onerror", e), void o("ondone", e);
      }
      return a && (l || d) ? Vn(e, r, n, e.retries || 0, o, i) : Qn(e, r, n, e.retries || 0, o, i);
    }, Nn = "tm-finalurl" + _e.short_id.toLowerCase(), Pn = "tm-setcookie" + _e.short_id.toLowerCase(), Vn = (e, t, n, r, i, s) => {
      const l = e.responseType ? e.responseType.toLowerCase() : "", c = (e, t) => {
        const n = [];
        let r, i;
        e.headers && (r = e.headers.get(Nn) || e.url, e.headers.forEach((e, t) => {
          const r = t.toLowerCase();
          [Nn, Pn].includes(r) || n.push(r + ":" + e);
        }), (i = e.headers.get(Pn)) && n.push("set-cookie:" + i));
        const o = void 0 === t ? 4 : t, s = e.status || 0, a = e.statusText || "";
        return {readyState: o, responseHeaders: n.join("\n"), finalUrl: r, status: s, statusText: a};
      }, u = async (e, t, r) => {
        let i;
        if (r) i = e; else {
          const t = e;
          if (!n.no_blob && (de.SHARED_BLOBS || de.SHARED_OBJECT_URLS && !n.foreign_context)) {
            const e = new Bn({blob: t});
            return s("onpartial", {tfd: await e.toTransferableData()}), void o(() => e.dispose(), 3e5);
          }
          i = await q(e);
        }
        const a = U(i, t);
        a.forEach((e, t) => {
          s("onpartial", {partial: e, index: t, length: a.length});
        });
      };
      let h, p, f, g = false;
      const b = e => {
        e && (f = true), y ? y.abort() : f ? v() : v({name: "AbortError", message: "Aborted by user"});
      }, v = e => {
        let t;
        p || (f ? (t = c({status: 408, statusText: "Request Timeout"}), i("ontimeout")) : "AbortError" == (null == e ? void 0 : e.name) ? (t = Ln("aborted"), i("onabort", t)) : (t = c({status: 408, statusText: (null == e ? void 0 : e.message) || "Request Timeout"}), i("onerror", t)), p = true, i("ondone", t));
      };
      let y;
      try {
        const f = {};
        let w;
        f.method = e.method || "GET", f.redirect = "follow", e.headers && (w = On(e.headers)), e.nocache ? f.cache = "reload" : e.revalidate && (f.cache = "default", w = w || {}, w = {...w, ...Mn}), e.anonymous ? f.credentials = "omit" : f.credentials = "include", e.user && e.password && (w = w || {}, w.Authorization = "Basic " + k(e.user + ":" + e.password)), w && (f.headers = new Headers(w)), void 0 !== e.data && ("typified" === e.data_type ? f.body = jn(e.data) : "string" == typeof e.data ? f.body = e.data : f.body = JSON.stringify(e.data)), y = d ? new d : void 0, y && (f.signal = y.signal), i("onloadstart", c({status: 0, statusText: ""}, 1)), A(e.url, f).then(o => {
          if (h && (a(h), h = null), p) return;
          let d = c(o);
          if (d.status > 0 && (d.status < 200 || d.status >= 300) && r > 0) return void Vn(e, t, n, r - 1, i, s);
          const {partialSize: A, overrideMimeType: f, responseType: b} = e;
          (async () => {
            var t;
            if (s("onreadystatechange", c(o, 2)), "stream" == l) {
              let n;
              if (o.ok) {
                if (n = null === (t = o.body) || void 0 === t ? void 0 : t.getReader()) for (;;) {
                  const {done: t, value: r} = await n.read();
                  if (r) {
                    const t = new Blob([r]);
                    await u(t, parseInt(e.partialSize), false);
                  }
                  if (t) break;
                }
              } else try {
                const t = await o.text(), n = new Blob([t]);
                await u(n, parseInt(e.partialSize), false);
              } catch (e) {}
            } else if (o.ok) if (A) {
              let t;
              ["arraybuffer", "blob"].includes(l) || void 0 !== f ? (d.response = await o.blob(), t = false) : (d.response = await o.text(), t = true), d = await (async (t, n) => {
                if (e.partialSize) {
                  const r = t.response;
                  ["response", "responseText", "responseXML"].forEach(e => {
                    delete t[e];
                  }), !g && r && (g = true, await u(r, parseInt(e.partialSize), n));
                }
                return t;
              })(d, t);
            } else if (void 0 !== b) {
              let e;
              if ("arraybuffer" == l) d.response = await o.arrayBuffer(); else if ("blob" == l) d.response = await o.blob(); else if ("document" == l) {
                e = (Dn(d.responseHeaders)["content-type"] || "text/xml").toString().split(";")[0];
                const t = new _;
                d.response = t.parseFromString(await o.text(), e);
              } else if ("json" == l) {
                const e = await o.text();
                d.response = JSON.parse(e);
              } else D.warn("xhr: responseType", l, " is not implemented!"), d.response = await o.text();
            } else if (void 0 !== f && m) {
              const e = await o.arrayBuffer(), t = (f.toLowerCase().match(/charset=([^;]+)/) || [])[1];
              d.response = new m(t).decode(e);
            } else {
              const e = await o.text();
              d.response = e;
            } else {
              d.responseXML = void 0;
              try {
                d.responseText = d.response = await o.text();
              } catch (e) {}
            }
          })().then(() => {
            i("onreadystatechange", d), i("onload", d), i("ondone", d);
          }).catch(v);
        }).catch(v), void 0 !== e.timeout && (h = o(() => {
          h = null, b(true);
        }, e.timeout));
      } catch (e) {
        const t = e;
        D.error(t.stack);
        const n = Ln(t.message);
        i("onerror", n), i("ondone", n);
      }
      return {abort: () => b()};
    }, Qn = (e, t, n, r, i, s) => {
      const a = e.responseType ? e.responseType.toLowerCase() : "";
      let l, d;
      e.anonymous && (l = In.mozAnon ? {mozAnon: true} : {anonymous: true});
      const A = new c(l), u = t => {
        let n = "", r = e.url;
        if (A.readyState >= 2) {
          let e;
          n = A.getAllResponseHeaders(), n && (n = n.replace(/tm-finalurl[0-9a-zA-Z]*: .*[\r\n]{1,2}/i, ""), n = n.replace(/tm-setcookie[0-9a-zA-Z]*:/i, "set-cookie:")), (e = A.getResponseHeader(Nn) || A.responseURL) && (r = e);
        }
        const i = {readyState: A.readyState, responseHeaders: n, finalUrl: r, status: A.readyState >= 2 ? A.status : 0, statusText: A.readyState >= 2 ? A.statusText : ""};
        return t && 4 == A.readyState ? A.responseType ? (i.responseXML = void 0, i.responseText = void 0, i.responseType = A.responseType, i.response = A.response) : (i.responseXML = A.responseXML || void 0, i.responseText = A.responseText, i.response = A.response) : (i.responseXML = void 0, i.responseText = "", i.response = void 0), i;
      };
      let h = false;
      const p = async t => {
        if (e.partialSize) {
          const r = t.response, i = !["arraybuffer", "blob"].includes(a);
          ["response", "responseText", "responseXML"].forEach(e => {
            delete t[e];
          }), !h && r && (h = true, await (async (e, t, r) => {
            let i;
            if (r) i = e; else {
              const t = e;
              if (!n.no_blob && (de.SHARED_BLOBS || de.SHARED_OBJECT_URLS && !n.foreign_context)) {
                const e = new Bn({blob: t});
                return s("onpartial", {tfd: await e.toTransferableData()}), void o(() => e.dispose(), 3e5);
              }
              i = await q(e);
            }
            const a = U(i, t);
            a.forEach((e, t) => {
              s("onpartial", {partial: e, index: t, length: a.length});
            });
          })(r, parseInt(e.partialSize), i));
        }
        return t;
      }, f = xt({threads: 1}), m = e => t => f.add(() => e(t)), g = {onload: m(async () => {
        let o = u(true);
        o.status > 0 && (o.status < 200 || o.status >= 300) && r > 0 ? Qn(e, t, n, r - 1, i, s) : (e.partialSize && (o = await p(o)), await i("onload", o), 4 == o.readyState && await i("ondone", o));
      }), onerror: m(async () => {
        const o = u();
        4 == o.readyState && 200 != o.status && 0 != o.status && r > 0 ? Qn(e, t, n, r - 1, i, s) : (await i("onerror", o), await i("ondone", o));
      }), onloadstart: m(async () => {
        await s("onloadstart", () => u());
      }), onreadystatechange: m(async () => {
        await s("onreadystatechange", async () => {
          let e = u();
          return e = await p(e), e;
        });
      }), onprogress: m(async e => {
        await s("onprogress", async () => {
          let t = u();
          return t = await p(t), v(e, t);
        });
      }), ontimeout: m(async () => {
        const e = u();
        await i("ontimeout"), await i("ondone", e);
      }), onabort: m(async () => {
        const e = Ln("aborted");
        await i("onabort"), await i("ondone", e);
      })}, _ = {onuploadprogress: m(async e => {
        await s("onuploadprogress", async () => v(e));
      })}, b = 0 == Object.keys(g).concat(["ondone"]).filter(e => !!t[e]).length;
      if (b) throw new Error("Synchronous XHR is not supported anymore");
      const v = (e, t) => {
        let n, r, i, o, s, a;
        try {
          if (e.lengthComputable || e.total > 0) n = e.loaded, r = e.total; else if (t) {
            const i = !A.responseType || ["", "text"].includes(A.responseType) ? A.responseText : null;
            let o = Number(Dn(t.responseHeaders)["content-length"] || "");
            const s = t.readyState > 2 && i ? i.length : 0;
            0 == o && (o = -1), n = e.loaded || s, r = e.total || o;
          }
          o = e.lengthComputable, i = n, s = n, a = r;
        } catch (e) {}
        return Object.assign(t || {}, {lengthComputable: o, loaded: i, done: n, position: s, total: r, totalSize: a});
      }, k = ["ontimeout", "onload", "onerror", "onabort"];
      Object.keys(g).forEach(e => {
        (t[e] || k.includes(e)) && (A[e] = g[e]);
      });
      const y = {onuploadprogress: "onprogress"};
      A.upload && Object.keys(_).forEach(e => {
        const n = y[e];
        n && t[e] && (A.upload[n] = _[e]);
      });
      try {
        if (!n.internal && !Tn(e.url)) throw new Error("Invalid scheme of url: " + e.url);
        A.open(e.method || "GET", e.url, !b, e.user, e.password);
        let t = On(e.headers);
        (e.nocache || e.revalidate) && (t = t || {}, e.nocache ? t = {...t, ...Fn} : e.revalidate && (t = {...t, ...Mn})), t && Object.keys(t).forEach(e => {
          try {
            A.setRequestHeader(e, t[e]);
          } catch (n) {
            D.warn("xhr: rejected header", e, t[e]);
          }
        }), void 0 !== e.overrideMimeType && A.overrideMimeType(e.overrideMimeType), e.partialSize ? ["arraybuffer", "blob"].includes(a) ? A.responseType = e.responseType = "blob" : delete e.responseType : void 0 !== e.responseType && (d = e.responseType.toLowerCase(), "document" != d && "json" != d && "xml" != d && "headers" != d && "stream" != d && (A.responseType = d)), void 0 !== e.timeout && (A.timeout = e.timeout), void 0 !== e.data ? "typified" === e.data_type ? A.send(jn(e.data)) : "string" == typeof e.data ? A.send(e.data) : A.send(JSON.stringify(e.data)) : A.send();
      } catch (e) {
        const t = e;
        D.error(t.stack);
        const n = Ln(t.message);
        i("onerror", n), i("ondone", n);
      }
      return {abort: function () {
        A.abort();
      }};
    };
    var Hn = {}, Xn = Hn.util = Hn.util || {};
    Xn.isArrayBuffer = function (e) {
      return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer;
    }, Xn.isArrayBufferView = function (e) {
      return e && Xn.isArrayBuffer(e.buffer) && void 0 !== e.byteLength;
    }, Xn.ByteBuffer = t, Xn.ByteStringBuffer = t, Xn.ByteStringBuffer.prototype._optimizeConstructedString = function (e) {
      this._constructedStringLength += e, this._constructedStringLength > 4096 && (this.data.substr(0, 1), this._constructedStringLength = 0);
    }, Xn.ByteStringBuffer.prototype.length = function () {
      return this.data.length - this.read;
    }, Xn.ByteStringBuffer.prototype.isEmpty = function () {
      return this.length() <= 0;
    }, Xn.ByteStringBuffer.prototype.putByte = function (e) {
      return this.putBytes(String.fromCharCode(e));
    }, Xn.ByteStringBuffer.prototype.fillWithByte = function (e, t) {
      e = String.fromCharCode(e);
      for (var n = this.data; t > 0;) 1 & t && (n += e), (t >>>= 1) > 0 && (e += e);
      return this.data = n, this._optimizeConstructedString(t), this;
    }, Xn.ByteStringBuffer.prototype.putBytes = function (e) {
      return this.data += e, this._optimizeConstructedString(e.length), this;
    }, Xn.ByteStringBuffer.prototype.putString = function (e) {
      return this.putBytes(Xn.encodeUtf8(e));
    }, Xn.ByteStringBuffer.prototype.putInt16 = function (e) {
      return this.putBytes(String.fromCharCode(e >> 8 & 255) + String.fromCharCode(255 & e));
    }, Xn.ByteStringBuffer.prototype.putInt24 = function (e) {
      return this.putBytes(String.fromCharCode(e >> 16 & 255) + String.fromCharCode(e >> 8 & 255) + String.fromCharCode(255 & e));
    }, Xn.ByteStringBuffer.prototype.putInt32 = function (e) {
      return this.putBytes(String.fromCharCode(e >> 24 & 255) + String.fromCharCode(e >> 16 & 255) + String.fromCharCode(e >> 8 & 255) + String.fromCharCode(255 & e));
    }, Xn.ByteStringBuffer.prototype.putInt16Le = function (e) {
      return this.putBytes(String.fromCharCode(255 & e) + String.fromCharCode(e >> 8 & 255));
    }, Xn.ByteStringBuffer.prototype.putInt24Le = function (e) {
      return this.putBytes(String.fromCharCode(255 & e) + String.fromCharCode(e >> 8 & 255) + String.fromCharCode(e >> 16 & 255));
    }, Xn.ByteStringBuffer.prototype.putInt32Le = function (e) {
      return this.putBytes(String.fromCharCode(255 & e) + String.fromCharCode(e >> 8 & 255) + String.fromCharCode(e >> 16 & 255) + String.fromCharCode(e >> 24 & 255));
    }, Xn.ByteStringBuffer.prototype.putInt = function (e, t) {
      var n = "";
      do {
        t -= 8, n += String.fromCharCode(e >> t & 255);
      } while (t > 0);
      return this.putBytes(n);
    }, Xn.ByteStringBuffer.prototype.putSignedInt = function (e, t) {
      return e < 0 && (e += 2 << t - 1), this.putInt(e, t);
    }, Xn.ByteStringBuffer.prototype.putBuffer = function (e) {
      return this.putBytes(e.getBytes());
    }, Xn.ByteStringBuffer.prototype.getByte = function () {
      return this.data.charCodeAt(this.read++);
    }, Xn.ByteStringBuffer.prototype.getInt16 = function () {
      var e = this.data.charCodeAt(this.read) << 8 ^ this.data.charCodeAt(this.read + 1);
      return this.read += 2, e;
    }, Xn.ByteStringBuffer.prototype.getInt24 = function () {
      var e = this.data.charCodeAt(this.read) << 16 ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2);
      return this.read += 3, e;
    }, Xn.ByteStringBuffer.prototype.getInt32 = function () {
      var e = this.data.charCodeAt(this.read) << 24 ^ this.data.charCodeAt(this.read + 1) << 16 ^ this.data.charCodeAt(this.read + 2) << 8 ^ this.data.charCodeAt(this.read + 3);
      return this.read += 4, e;
    }, Xn.ByteStringBuffer.prototype.getInt16Le = function () {
      var e = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8;
      return this.read += 2, e;
    }, Xn.ByteStringBuffer.prototype.getInt24Le = function () {
      var e = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2) << 16;
      return this.read += 3, e;
    }, Xn.ByteStringBuffer.prototype.getInt32Le = function () {
      var e = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2) << 16 ^ this.data.charCodeAt(this.read + 3) << 24;
      return this.read += 4, e;
    }, Xn.ByteStringBuffer.prototype.getInt = function (e) {
      var t = 0;
      do {
        t = (t << 8) + this.data.charCodeAt(this.read++), e -= 8;
      } while (e > 0);
      return t;
    }, Xn.ByteStringBuffer.prototype.getSignedInt = function (e) {
      var t = this.getInt(e), n = 2 << e - 2;
      return t >= n && (t -= n << 1), t;
    }, Xn.ByteStringBuffer.prototype.getBytes = function (e) {
      var t;
      return e ? (e = Math.min(this.length(), e), t = this.data.slice(this.read, this.read + e), this.read += e) : 0 === e ? t = "" : (t = 0 === this.read ? this.data : this.data.slice(this.read), this.clear()), t;
    }, Xn.ByteStringBuffer.prototype.bytes = function (e) {
      return void 0 === e ? this.data.slice(this.read) : this.data.slice(this.read, this.read + e);
    }, Xn.ByteStringBuffer.prototype.at = function (e) {
      return this.data.charCodeAt(this.read + e);
    }, Xn.ByteStringBuffer.prototype.setAt = function (e, t) {
      return this.data = this.data.substr(0, this.read + e) + String.fromCharCode(t) + this.data.substr(this.read + e + 1), this;
    }, Xn.ByteStringBuffer.prototype.last = function () {
      return this.data.charCodeAt(this.data.length - 1);
    }, Xn.ByteStringBuffer.prototype.copy = function () {
      var e = Xn.createBuffer(this.data);
      return e.read = this.read, e;
    }, Xn.ByteStringBuffer.prototype.compact = function () {
      return this.read > 0 && (this.data = this.data.slice(this.read), this.read = 0), this;
    }, Xn.ByteStringBuffer.prototype.clear = function () {
      return this.data = "", this.read = 0, this;
    }, Xn.ByteStringBuffer.prototype.truncate = function (e) {
      var t = Math.max(0, this.length() - e);
      return this.data = this.data.substr(this.read, t), this.read = 0, this;
    }, Xn.ByteStringBuffer.prototype.toHex = function () {
      for (var e = "", t = this.read; t < this.data.length; ++t) {
        var n = this.data.charCodeAt(t);
        n < 16 && (e += "0"), e += n.toString(16);
      }
      return e;
    }, Xn.ByteStringBuffer.prototype.toString = function () {
      return Xn.decodeUtf8(this.bytes());
    }, Xn.createBuffer = function (e, t) {
      return t = t || "raw", void 0 !== e && "utf8" === t && (e = Xn.encodeUtf8(e)), new Xn.ByteBuffer(e);
    }, Xn.fillString = function (e, t) {
      for (var n = ""; t > 0;) 1 & t && (n += e), (t >>>= 1) > 0 && (e += e);
      return n;
    }, Xn.encodeUtf8 = function (e) {
      return unescape(encodeURIComponent(e));
    }, Xn.decodeUtf8 = function (e) {
      return decodeURIComponent(escape(e));
    };
    var Wn = Hn.sha256 = Hn.sha256 || {};
    Hn.md = Hn.md || {}, Hn.md.algorithms = Hn.md.algorithms || {}, Hn.md.sha256 = Hn.md.algorithms.sha256 = Wn, Wn.create = function () {
      qn || (Yn = String.fromCharCode(128), Yn += Hn.util.fillString(String.fromCharCode(0), 64), Jn = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298], qn = true);
      var e = null, t = Hn.util.createBuffer(), r = new Array(64), i = {algorithm: "sha256", blockLength: 64, digestLength: 32, messageLength: 0, messageLength64: [0, 0], start: function () {
        return i.messageLength = 0, i.messageLength64 = [0, 0], t = Hn.util.createBuffer(), e = {h0: 1779033703, h1: 3144134277, h2: 1013904242, h3: 2773480762, h4: 1359893119, h5: 2600822924, h6: 528734635, h7: 1541459225}, i;
      }};
      return i.start(), i.update = function (o, s) {
        return "utf8" === s && (o = Hn.util.encodeUtf8(o)), i.messageLength += o.length, i.messageLength64[0] += o.length / 4294967296 >>> 0, i.messageLength64[1] += o.length >>> 0, t.putBytes(o), n(e, r, t), (t.read > 2048 || 0 === t.length()) && t.compact(), i;
      }, i.digest = function () {
        var o = Hn.util.createBuffer();
        o.putBytes(t.bytes()), o.putBytes(Yn.substr(0, 64 - (i.messageLength64[1] + 8 & 63))), o.putInt32(i.messageLength64[0] << 3 | i.messageLength64[0] >>> 28), o.putInt32(i.messageLength64[1] << 3);
        var s = {h0: e.h0, h1: e.h1, h2: e.h2, h3: e.h3, h4: e.h4, h5: e.h5, h6: e.h6, h7: e.h7};
        n(s, r, o);
        var a = Hn.util.createBuffer();
        return a.putInt32(s.h0), a.putInt32(s.h1), a.putInt32(s.h2), a.putInt32(s.h3), a.putInt32(s.h4), a.putInt32(s.h5), a.putInt32(s.h6), a.putInt32(s.h7), a;
      }, i;
    };
    var Yn = null, qn = false, Jn = null;
    Xn.hasWideChar = function (e) {
      for (var t = 0; t < e.length; t++) if (e.charCodeAt(t) >>> 8) return true;
      return false;
    };
    const Kn = function (e, t) {
      var n = Hn.md.sha256.create();
      return n.update(e, "UTF-8" == t || void 0 === t && Xn.hasWideChar(e) ? "utf8" : void 0), n.digest().toHex();
    };
    let $n;
    const er = xt({threads: 1}), tr = (e, t) => {
      const n = (e ? e.split("/") : []).concat(t ? [t] : []).join("/");
      return n ? ("/" == n.substr(0, 1) ? "" : "/") + n : "";
    }, nr = e => {
      const t = (e.match(/[\dA-F]{2}/gi) || []).map(e => parseInt(e, 16));
      return new Uint8Array(t).buffer;
    }, rr = e => {
      const t = {type: e, request: e => {
        const t = () => {
          const t = vt(), n = e => {
            D.log("rest service: request failed", e), t.reject(e);
          }, r = "xml" === e.responseType, i = "headers" === e.responseType;
          return (r || i) && delete e.responseType, zn(e, {onload: o => {
            if ([200, 201, 204, 207].includes(o.status)) {
              let n;
              n = r ? e.anonymous || e.fetch || null === o.responseXML ? (new _).parseFromString(o.responseText || "", "text/xml") : o.responseXML : i ? Dn(o.responseHeaders) : o.response, t.resolve({result: n});
            } else n(o);
          }, onerror: n, ontimeout: () => n("timed out"), onprogress: e => t.notify(e), onuploadprogress: e => t.notify(e)}, {internal: true}), t.promise();
        };
        return e.no_queue ? t() : er.add(t);
      }, error: t => {
        const n = t;
        let r;
        if (void 0 !== n.status) {
          r = n.status.toString();
          try {
            r = r + " | " + n.responseText;
          } catch (e) {}
        } else r = t;
        Cn.tC(e, "error", "request: " + r);
      }, wait: e => (...t) => e(...t).then(e => e, e => (e => vt.Breach(e ? e.responseText || e.statusText : void 0))(e)), changes: (() => {
        let e;
        return {listen: () => (e || (e = vt(), t.watch && t.watch.start()), e.promise()), notify: t => {
          e.notify(t);
        }};
      })()};
      return t;
    }, ir = e => {
      const t = Object.assign({}, e), n = t.type;
      if (void 0 === n) throw new Error("Internal error");
      let r, i = [];
      const o = Object.assign(e, {...t, config: {...t.config, auth_prefix: "Bearer", storage_key: ""}, credentials: {}, request: e => (e.no_auth || (e.headers = e.headers || {}, e.headers.Authorization = o.config.auth_prefix + " " + o.credentials.access_token), t.request(e)), oauth: (() => {
        let e;
        const t = {run: () => {
          if (r) return r;
          let i = vt();
          const s = r = i.promise();
          e = "!!" + n + "-" + T();
          let a = o.credentials ? o.credentials.refresh_token : null;
          const l = (e, t) => {
            o.credentials = t, null == i || i.resolve(), i = void 0, e && e.close();
          };
          return (() => {
            if (!o.config.refresh_supported || !a) return vt.Pledge();
            const e = vt(), r = () => {
              a = null, delete o.credentials.refresh_token;
            };
            return zn({url: t.getRefreshUrl(a), fetch: true}, {onload: e => {
              if (!e.finalUrl) return Cn.tC(n, "error", "auth refresh token: !finalUrl"), void r();
              const i = t.onUrl(e.finalUrl);
              i && (i.error || !i.access_token ? (Cn.tC(n, "error", "auth refresh token: " + (i.error || "!access_token")), r()) : l(null, i));
            }, onerror: r, ondone: () => e.resolve()}), e.promise();
          })().then(() => {
            if (!i) return;
            if (!o.config.refresh_supported) return vt.Pledge();
            const e = vt(), r = $n({url: t.getRefreshUrl()});
            return r.promise.progress(e => {
              let s;
              i && (s = t.onUrl(e.url)) && (s.error || !s.access_token ? (Cn.tC(n, "error", "auth refresh: " + (s.error || "!access_token")), o.config.refresh_supported = false) : l(r, s));
            }).always(e.resolve), e.promise();
          }).then(() => {
            if (!i) return;
            const e = vt(), r = $n({url: t.getAuthUrl()});
            return r.promise.progress(e => {
              let o;
              i && (o = t.onUrl(e.url)) && (o.error || !o.access_token ? Cn.tC(n, "error", "auth: " + (o.error || "!access_token")) : l(r, o));
            }).always(e.resolve), e.promise();
          }).done(() => {
            r = void 0, i && i.reject("auth_failed");
          }), s;
        }, getAuthUrl: () => o.config.request_uri + "?" + Qt({response_type: o.config.response_type, client_id: o.config.client_id, redirect_uri: o.config.redirect_uri, state: e, scope: o.config.scope}), getRefreshUrl: t => {
          const n = {client_id: o.config.client_id, redirect_uri: o.config.redirect_uri, state: e, scope: o.config.scope, refresh_token: t};
          return o.config.redirect_uri + "?" + Qt(n);
        }, onUrl: t => {
          let n, r;
          if (t && 0 === t.indexOf(o.config.redirect_uri) && (r = Vt(t)) && ("string" != typeof (i = r) && (i = i.search ? i.search.substring(1) : i.hash ? i.hash.substring(1) : ""), n = i.split("&").reduce((e, t) => {
            const n = t.split("=");
            return e[decodeURIComponent(n[0])] = decodeURIComponent(n[1]), e;
          }, {})) && (n.access_token || n.error) && n.state === e) return {uid: n.uid, access_token: n.access_token, refresh_token: n.refresh_token, error: n.error};
          var i;
        }, reset: () => (delete o.credentials.access_token, delete o.credentials.refresh_token, vt.Pledge())};
        return t;
      })(), revoke: t.wait(() => o.oauth.reset()), wait: e => t.wait((...t) => {
        if (o.credentials.access_token) return e(...t);
        {
          const n = vt();
          return i.push(() => n.consume(e(...t))), o.oauth.run().done(() => {
            i.forEach(e => e()), i = [];
          }).fail(e => {
            n.reject(e);
          }), n.promise();
        }
      })}), s = ue.LOCALSTORAGE;
      let a;
      return Object.defineProperty(o, "credentials", {get: () => {
        if (void 0 === a) {
          if (Cn.tC(n, "init"), s) try {
            const e = JSON.parse(s.getItem(o.config.storage_key) || "");
            a = {uid: e.uid, access_token: e.access_token, refresh_token: e.refresh_token};
          } catch (e) {}
          a = a || {};
        }
        return a;
      }, set: e => {
        if (s) try {
          s.setItem(o.config.storage_key, JSON.stringify({uid: e.uid, access_token: e.access_token, refresh_token: e.refresh_token}));
        } catch (e) {}
        a = e;
      }, enumerable: false}), o;
    }, or = e => {
      let t, n, r, i, s, l, d, A, c, u = null, p = null;
      const f = Object.assign({}, e), m = e => {
        var t;
        let n;
        return e && (n = (null === (t = e.firstChild) || void 0 === t ? void 0 : t.nextSibling) ? e.firstChild.nextSibling : e.firstChild), n;
      }, g = e => f.wait((...t) => y.init().then(() => e(...t))), _ = (e, t) => {
        let n, r;
        if ((n = e.getElementsByTagNameNS("*", t)[0]) && (r = n.firstChild)) return r.nodeValue || void 0;
      }, b = e => {
        const i = [], o = e.getElementsByTagNameNS("*", "response");
        for (let e = 0; e < o.length; e++) {
          const s = o[e];
          let a = _(s, "href");
          if (null == a) continue;
          a = a.replace(/\/$/, "");
          const l = s.getElementsByTagNameNS("*", "propstat")[0].getElementsByTagNameNS("*", "prop")[0], d = _(l, "getlastmodified"), A = _(l, "getetag"), c = parseInt(_(l, "getcontentlength") || ""), u = l.getElementsByTagNameNS("*", "resourcetype")[0].getElementsByTagNameNS("*", "collection")[0], p = a.replace(new RegExp("^(" + [E(n + t) + "/?", E(r + t) + "/?"].join("|") + ")"), "");
          let f;
          try {
            f = h(p);
          } catch (e) {
            f = p;
          }
          if (u) ; else {
            const e = {etag: A, name: f, id: p, modifiedTime: new Date(d || 0).getTime(), size: c >= 0 ? c : void 0, removed: -1 == c};
            i.push(e);
          }
        }
        return i;
      }, v = e => _(e, "td:cursor"), k = (e, t) => {
        const n = t || {};
        return n.set_current_list && (s = {}), y.request({method: "PROPFIND", url: e, headers: {"Content-Type": "text/xml; charset=UTF-8", Depth: void 0 !== n.depth ? n.depth : 1}, responseType: "xml"}).then(e => {
          const t = e.result;
          let r;
          if (null === t || !(r = m(t)) || !r.childNodes) return vt.Breach();
          const i = b(r);
          if (n.set_current_list) {
            const e = v(r);
            e && (l = e), i.forEach(e => {
              s[e.id] = e;
            });
          }
          return i;
        });
      }, y = Object.assign(e, {...e, config: {...e.config, watch_interval: 36e5, root: void 0, path: void 0}, request: e => (e.headers = e.headers || {}, e.headers["User-Agent"] = "Tampermonkey", e.headers.Cookie = "", f.request(e).then(e => e, t => {
        const n = (null == t ? void 0 : t.status) || -1;
        return !t || [403, 500].includes(n) ? (e.backoff = 2 * (e.backoff || 1e3), kt(e.backoff).then(() => y.request(e))) : 404 == n ? vt.Pledge(t) : (y.error(t), vt.Breach(t));
      })), init: () => {
        if (i) return i;
        t = tr(y.config.root, y.config.path), n = y.config.url || "", "/" == n.slice(-1) && (n = n.slice(0, -1));
        const e = Vt(n);
        if (!e) return vt.Breach("invalid url");
        r = e.pathname, "/" == r.slice(-1) && (r = r.slice(0, -1));
        const o = vt();
        i = o.promise();
        const s = n + t;
        return y.request({method: "OPTIONS", url: n, responseType: "headers"}).done(e => {
          const t = e.result;
          let n;
          t && (n = t["access-control-allow-methods"]) && n.includes("EDITOR") && (c = true);
        }).always(() => {
          k(s, {depth: 0}).done(() => o.resolve()).fail(() => {
            const e = [];
            vt.onebyone(t.split("/").filter(e => e).map(t => {
              e.push(t);
              const r = e.join("/");
              return () => y.request({method: "MKCOL", url: n + "/" + r, headers: {"Content-Type": "text/xml; charset=UTF-8"}, responseType: "xml"});
            })).done(() => o.resolve()).fail(o.reject);
          });
        }), i;
      }, list: g(e => k(n + t, {set_current_list: true}).then(t => {
        const n = {};
        return t.map(t => {
          if (!e) {
            if (n[t.id]) return;
            n[t.id] = true;
          }
          return {name: t.name, id: t.id, size: t.size || 0, etag: t.etag, modified: t.modifiedTime, precision: 1e3, removed: t.removed};
        }).filter(e => e);
      })), get: g(e => {
        const r = e.id || e;
        return y.request({method: "GET", url: n + tr(t, r), headers: {"Content-Type": "text/xml; charset=UTF-8"}, responseType: "arraybuffer"}).then(e => {
          const t = e.result;
          return new Blob([t]);
        });
      }), put: g((e, r, i) => {
        const o = e.id || e;
        let s, a, l;
        const d = {"Content-Type": "application/octet-stream"};
        let A = false;
        return i && i.lastModified && (A = null === p, s = i.lastModified, l = new Date(i.lastModified).toISOString(), a = i.lastModified / 1e3, (p || A) && (d["X-OC-Mtime"] = a)), y.request({method: "PUT", url: n + tr(t, o), headers: d, data_type: "typified", data: {type: "raw", value: r}, responseType: "headers"}).then(e => {
          const r = e.result;
          if (r && A) {
            let e;
            p = !("accepted" != r["x-oc-mtime"] && (!r.date || !(e = new Date(r.date).getTime()) || e != s && e != Math.floor(a)));
          }
          if (!p && !u && l) return y.request({method: "PROPPATCH", url: n + tr(t, o), headers: {"Content-Type": "text/xml; charset=UTF-8"}, responseType: "xml", data: `\n                            <?xml version="1.0"?>\n                            <d:propertyupdate xmlns:d="DAV:">\n                                <d:set>\n                                    <d:prop>\n                                        <d:getlastmodified>${l}</d:getlastmodified>\n                                    </d:prop>\n                                </d:set>\n                            </d:propertyupdate>\n                        `}).then(e => {
            var t;
            const n = e.result;
            let r, i, o;
            n && (r = n.childNodes[0]) && (i = r.getElementsByTagNameNS("*", "status")[0]) && (o = null === (t = i.firstChild) || void 0 === t ? void 0 : t.nodeValue) && -1 != o.search(/HTTP\/[0-9.]+ 403/) && (D.warn("WebDAV: no way to set file modification date! This might cause redundant up and downloads."), u = true);
          }, () => (D.warn("WebDAV: no way to set file modification date! This might cause redundant up and downloads."), u = true, vt.Pledge()));
        });
      }), delete: g(e => {
        const r = e.id || e;
        return y.request({method: "DELETE", url: n + tr(t, r), headers: {"Content-Type": "text/xml; charset=UTF-8"}});
      }), watch: {start: () => {
        if (d) return;
        d = true;
        let e = null;
        const r = () => {
          if (A = void 0, d) if (false === e) {
            const e = s;
            k(n + t, {set_current_list: true}).then(() => {
              e && (Object.keys(e).forEach(t => {
                const n = s[t], r = e[t];
                n ? r.modifiedTime != n.modifiedTime && f.changes.notify({time: n.modifiedTime, name: n.name, id: n.id}) : f.changes.notify({time: Date.now(), name: r.name, id: r.id, removed: true});
              }), Object.keys(s).forEach(t => {
                if (!e[t]) {
                  const e = s[t];
                  f.changes.notify({time: e.modifiedTime, name: e.name, id: e.id});
                }
              }));
            }).fail(e => {
              D.warn("WebDAV: file changes check failed", e);
            }).always(() => {
              A = o(r, y.config.watch_interval);
            });
          } else {
            let i = 100;
            ((e, t) => {
              const n = {"Content-Type": "text/xml; charset=UTF-8", Depth: 1, Timeout: 90};
              return t && (n.Cursor = t), y.request({method: "SUBSCRIBE", url: e, headers: n, responseType: "xml", no_queue: true}).then(e => {
                const t = e.result;
                let n;
                return null === t ? vt.Pledge({changes: [], cursor: l}) : (n = m(t)) && n.childNodes ? {changes: b(n), cursor: v(n)} : vt.Breach();
              });
            })(n + t, l).then(e => {
              const t = e.changes;
              l = e.cursor, i = 1, t.forEach(e => {
                f.changes.notify({time: e.modifiedTime, name: e.name, id: e.id, removed: e.removed});
              });
            }, () => {
              if (null !== e) return i *= 2, kt(i);
              e = false;
            }).always(r);
          }
        };
        g(() => d ? (r(), vt.Pledge()) : vt.Breach())();
      }, stop: () => {
        d = false, A && (a(A), A = void 0);
      }}, getRemoteUrl: e => {
        if (c) return n + tr(t, e) + "?method=editor#bypass=true";
      }, getRemoteDomains: () => {
        var e;
        return [((null === (e = Vt(n)) || void 0 === e ? void 0 : e.origin) || "").replace(/^.*:\/\//, "")];
      }});
      return y;
    }, sr = {drive: () => {
      let e, t;
      (e = ue.LOCALSTORAGE) && (t = parseInt(e.getItem("dropbox_poll_interval") || "")) || (t = 18e5);
      const n = ir(rr("drive")), r = Object.assign({}, n), i = "appDataFolder";
      let s, l;
      const d = Object.assign(n, {...n, config: {...n.config, redirect_uri: "https://auth.tampermonkey.net/oauth.php", refresh_supported: true, request_uri: "https://accounts.google.com/o/oauth2/v2/auth", client_id: "408438522028-3cgn3t3jas3fak7isbnfod1q4h15g2fv.apps.googleusercontent.com", storage_key: "gd_config", scope: "https://www.googleapis.com/auth/drive.appdata", response_type: "token", watch_interval: t}, request: e => r.request(e).then(e => e, t => {
        const n = (null == t ? void 0 : t.status) || -1;
        if (!t || [403, 500].includes(n)) return e.backoff = 2 * (e.backoff || 1e3), kt(e.backoff).then(() => d.request(e));
        if ([400, 401].includes(n)) {
          if (D.warn("Google Drive: authentication error", t), delete d.credentials.access_token, !e.retry_auth) return e.retry_auth = true, d.oauth.run().then(() => d.request(e));
        } else if (404 == n) return vt.Pledge(t);
        return d.error(t), vt.Breach(t);
      }), list: r.wait(e => {
        let t = [];
        const n = vt(), r = e => "https://www.googleapis.com/drive/v3/files?" + Qt({spaces: i, pageToken: e, orderBy: "modifiedTime desc", fields: "nextPageToken, files(id, size, name, modifiedTime, md5Checksum)", pageSize: 500}), o = e => {
          d.request({method: "GET", url: e, headers: {"Content-Type": "application/json"}}).then(e => {
            const i = e.result, s = i ? JSON.parse(i) : {files: []};
            if (t = t.concat(s.files), s.nextPageToken) return o(r(s.nextPageToken));
            n.resolve(t);
          });
        };
        return o(r()), n.promise().then(t => {
          const n = {};
          return t.map(t => {
            if (!e) {
              if (n[t.name]) return;
              n[t.name] = true;
            }
            return {name: t.name, size: t.size || 0, id: t.id, md5: t.md5Checksum, modified: new Date(t.modifiedTime).getTime()};
          }).filter(e => e);
        });
      }), get: r.wait(e => {
        const t = e.id || e;
        return d.request({method: "GET", url: "https://www.googleapis.com/drive/v3/files/" + t + "?" + Qt({spaces: i, alt: "media"}), responseType: "arraybuffer"}).then(e => {
          const t = e.result;
          return new Blob([t]);
        });
      }), put: r.wait((e, t, n) => {
        const r = e, o = r.name || e, s = r.id, a = T();
        return vt.Pledge().then(() => {
          if (t) return q(t);
        }).then(e => {
          const t = n && n.lastModified ? new Date(n.lastModified).toISOString() : void 0, r = [];
          return r.push("--" + a), r.push("Content-Type: application/json"), r.push(""), r.push(JSON.stringify({name: o, parents: s ? void 0 : [i], modifiedTime: t})), r.push("--" + a), e && (r.push("Content-Type: application/octet-stream"), r.push("Content-Transfer-Encoding: base64"), r.push(""), r.push(P(e)), r.push("--" + a + "--")), r.push(""), d.request({method: s || !e ? "PATCH" : "POST", url: "https://www.googleapis.com/" + (e ? "upload/" : "") + "drive/v3/files" + (s ? "/" + s : "") + "?" + Qt({uploadType: "multipart"}), headers: {"Content-Type": "multipart/related; boundary=" + a}, data: r.join("\r\n")});
        });
      }), delete: r.wait(e => {
        const t = e.id || e;
        return d.request({method: "DELETE", url: "https://www.googleapis.com/drive/v3/files/" + t + "?" + Qt({spaces: i}), headers: {"Content-Type": " application/json"}});
      }), revoke: r.wait(() => {
        const e = d.credentials.access_token;
        return e ? r.request({method: "GET", url: "https://accounts.google.com/o/oauth2/revoke?" + Qt({token: e})}).always(() => d.oauth.reset()) : vt.Breach();
      }), compare: (e, t) => {
        const n = vt();
        let r;
        return (r = e.md5) && r == W(t, "utf-8") ? n.resolve(true) : n.resolve(false), n.promise();
      }, watch: {start: () => {
        if (s) return;
        let e;
        s = true;
        const t = () => {
          l = null, s && d.request({method: "GET", url: "https://www.googleapis.com/drive/v3/changes/?" + Qt({pageToken: e, spaces: i, pageSize: 1e3, includeRemoved: true}), headers: {"Content-Type": " application/json"}}).then(t => {
            const n = t.result;
            if (!s) return vt.Breach();
            const r = n ? JSON.parse(n) : {};
            if (!(e = r.newStartPageToken)) return D.warn("Google Drive: watch token error", n), d.watch.stop();
            r.nextPageToken && D.warn("Google Drive: too much changes", n), (r.changes || []).forEach(e => {
              let t;
              const n = e.file;
              "file" === e.type && n && (t = Date.parse(e.time), isNaN(t) && (t = Date.now()), d.changes.notify({id: n.id, time: t, name: n.name, removed: e.removed}));
            });
          }).fail(e => {
            D.warn("Google Drive: file changes check failed", e);
          }).always(() => {
            l = o(t, d.config.watch_interval);
          });
        };
        r.wait(() => s ? d.request({method: "GET", url: "https://www.googleapis.com/drive/v3/changes/startPageToken", headers: {"Content-Type": " application/json"}}).then(n => {
          const r = n.result, i = r ? JSON.parse(r) : {};
          if (!(e = i.startPageToken)) return D.warn("Google Drive: watch token error", r), d.watch.stop();
          t();
        }) : vt.Breach())();
      }, stop: () => {
        s = false, l && (a(l), l = null);
      }}, getRemoteUrl: void 0});
      return d;
    }, dropbox: e => {
      const t = e.path || "", n = ue.LOCALSTORAGE;
      let r;
      n && (r = parseInt(n.getItem("dropbox_poll_interval") || "")) || (r = 18e5);
      const i = ir(rr("dropbox")), s = Object.assign({}, i);
      let l, d, A, c, u = true;
      const h = e => {
        let n = [];
        const r = vt(), i = e => {
          p.request({method: "POST", url: "https://api.dropboxapi.com/2/files/list_folder" + (e ? "/continue" : ""), headers: {"Content-Type": " application/json"}, data: {path: e ? void 0 : tr(t), cursor: e}}).then(e => {
            const t = e.result, o = t ? JSON.parse(t) : {entries: []};
            if (n = n.concat(o.entries), o.has_more && o.cursor) return i(o.cursor);
            r.resolve({list: n, cursor: o.cursor});
          }).fail(r.reject);
        };
        return u ? (u = false, p.put(".version", new Blob([ar])).then(() => {
          i(e);
        }).fail(r.reject)) : i(e), r.promise();
      }, p = Object.assign(i, {...i, config: {...i.config, redirect_uri: "https://auth.tampermonkey.net/oauth.php", request_uri: "https://www.dropbox.com/oauth2/authorize", client_id: "gq3auc9yym0e21y", storage_key: "db_config", response_type: "token", watch_interval: r ? Number(r) : 0}, request: e => s.request(e).then(e => e, t => {
        const n = (null == t ? void 0 : t.status) || -1;
        return !t || [500, 429].includes(n) ? (e.backoff = 2 * (e.backoff || 1e3), kt(e.backoff).then(() => p.request(e))) : [401].includes(n) && (D.warn("Dropbox: authentication error", t), delete p.credentials.access_token, !e.retry_auth) ? (e.retry_auth = true, p.oauth.run().then(() => p.request(e))) : (p.error(t), vt.Breach(t));
      }), list: s.wait(e => h().then(t => {
        const n = {};
        return d = t.cursor, t.list.map(t => {
          if (!e) {
            if (n[t.name]) return;
            n[t.name] = true;
          }
          return {name: t.name, size: t.size, dropbox_hash: t.content_hash, modified: new Date(t.client_modified).getTime(), precision: 1e3};
        }).filter(e => e);
      }).always(() => {
        l && d && (l(), l = null);
      })), get: s.wait(e => {
        const n = e.name || e;
        return p.request({method: "POST", url: "https://content.dropboxapi.com/2/files/download", headers: {"Dropbox-API-Arg": JSON.stringify({path: tr(t, n)})}, responseType: "arraybuffer"}).then(e => {
          const t = e.result;
          return new Blob([t]);
        });
      }), put: s.wait((e, n, r) => {
        const i = e.name || e, o = r && r.lastModified ? (new Date(r.lastModified).toISOString().match(/[^:]*:[^:]*:[^:.a-zA_Z]*/) || "")[0] + "Z" : void 0;
        return p.request({method: "POST", url: "https://content.dropboxapi.com/2/files/upload", headers: {"Dropbox-API-Arg": JSON.stringify({path: tr(t, i), client_modified: o, mode: "overwrite"}), "Content-Type": "application/octet-stream"}, data_type: "typified", data: {type: "raw", value: n}});
      }), delete: s.wait(e => {
        const n = e.name || e;
        return p.request({method: "POST", url: "https://api.dropboxapi.com/2/files/delete", headers: {"Content-Type": "application/json"}, data: {path: tr(t, n)}});
      }), revoke: s.wait(() => p.credentials.access_token ? s.request({method: "POST", url: "https://api.dropboxapi.com/2/auth/token/revoke"}).always(() => p.oauth.reset()) : vt.Breach()), compare: (e, t) => {
        const n = vt(), r = 4194304, i = H(t, {encoding: "utf-8"}), o = [], s = i.byteLength;
        let a = 1;
        const l = async () => {
          if (0 == --a) {
            let t = new ArrayBuffer(0);
            o.forEach(e => {
              e && (t = ((e, t) => {
                const n = new Uint8Array(e.byteLength + t.byteLength);
                return n.set(new Uint8Array(e), 0), n.set(new Uint8Array(t), e.byteLength), n.buffer;
              })(t, e));
            });
            const r = await X(t), i = Kn(r, "ASCII");
            n.resolve(i == e.dropbox_hash);
          }
        };
        for (let e = 0, t = 0; t < s; t += r, e++) (e => {
          o.push(null), a++, X(i.slice(t, t + Math.min(r, s - t))).then(t => {
            const n = Kn(t, "ASCII");
            o[e] = nr(n), l();
          }, () => {
            D.warn("Dropbox: unable to calculate SHA-256 hashes"), n.reject();
          });
        })(e);
        return l(), n.promise();
      }, watch: {start: () => {
        if (A) return;
        A = true;
        let e = 0;
        const t = () => {
          if (c = null, e = 0, A) return d ? void p.request({method: "POST", url: "https://notify.dropboxapi.com/2/files/list_folder/longpoll", headers: {"Content-Type": " application/json"}, no_auth: true, no_queue: true, data: {cursor: d, timeout: 180}}).then(t => {
            const n = t.result;
            if (!A) return vt.Breach();
            const r = n ? JSON.parse(n) : {};
            return r.backoff && (e = 1e3 * r.backoff), r.changes ? kt(6e4).then(() => h(d)).then(e => (d = e.cursor) ? e.list : (D.warn("Dropbox: watch token error", n), p.watch.stop())) : null;
          }).then(e => {
            e && e.forEach(e => {
              let t;
              const n = e[".tag"];
              ["file", "deleted"].includes(n) && (t = Date.parse(e.server_modified), p.changes.notify({id: e.id, time: t, name: e.name, removed: "deleted" == n}));
            });
          }).fail(e => {
            D.warn("Dropbox: file changes check failed", e);
          }).always(() => {
            c = o(t, e + p.config.watch_interval);
          }) : (D.warn("Dropbox: watch token error", d), p.watch.stop());
        };
        s.wait(() => A ? (d ? t() : l = t, vt.Pledge()) : vt.Breach())();
      }, stop: () => {
        A = false, c && (a(c), c = null);
      }}, getRemoteDomains: () => ["dropbox.com", "dropboxapi.com"], getRemoteUrl: void 0});
      return p;
    }, onedrive: e => {
      const t = e.path || "";
      let n, r, i;
      (n = ue.LOCALSTORAGE) && (r = parseInt(n.getItem("onedrive_poll_interval") || "")) || (r = 18e5);
      const s = ir(rr("onedrive")), l = Object.assign({}, s);
      let d, A;
      const c = e => {
        const n = vt();
        let r = [];
        const o = s => {
          u.request({method: "GET", url: s || "https://api.onedrive.com/v1.0/drive/special/approot:" + tr(t) + ":/children", headers: {"Content-Type": " application/json"}}).then(t => {
            const s = t.result, a = s ? JSON.parse(s) : {value: []};
            if (r = r.concat(a.value.map(e => {
              var t, n, r;
              const i = (null === (t = null == e ? void 0 : e.fileSystemInfo) || void 0 === t ? void 0 : t.lastModifiedDateTime) || 0, o = (null === (r = null === (n = null == e ? void 0 : e.file) || void 0 === n ? void 0 : n.hashes) || void 0 === r ? void 0 : r.sha1Hash) || void 0;
              return {id: e.id, name: e.name, size: e.size, sha1: o, modified: new Date(i).getTime()};
            })), a["@odata.nextLink"]) return o(a["@odata.nextLink"]);
            e.set_current_list && (i = r), n.resolve(r);
          }).fail(e => n.reject(e));
        };
        return o(), n.promise();
      }, u = Object.assign(s, {...s, config: {...s.config, redirect_uri: "https://auth.tampermonkey.net/oauth.php", request_uri: "https://login.live.com/oauth20_authorize.srf", client_id: "000000004C1A3122", storage_key: "od_config", response_type: "token", scope: "onedrive.appfolder", watch_interval: r}, request: e => l.request(e).then(e => e, t => {
        const n = (null == t ? void 0 : t.status) || -1;
        if (!t || [403, 500].includes(n)) return e.backoff = 2 * (e.backoff || 1e3), kt(e.backoff).then(() => u.request(e));
        if ([401].includes(n)) {
          if (D.warn("OneDrive: authentication error", t), delete u.credentials.access_token, !e.retry_auth) return e.retry_auth = true, u.oauth.run().then(() => u.request(e));
        } else if (404 == n) return vt.Pledge(t);
        return u.error(t), vt.Breach(t);
      }), list: l.wait(() => c({set_current_list: true})), get: l.wait(e => {
        const n = e.name || e;
        return u.request({method: "GET", url: "https://api.onedrive.com/v1.0/drive/special/approot:" + tr(t, p(n)) + ":/content", responseType: "arraybuffer"}).then(e => {
          const t = e.result;
          return new Blob([t]);
        });
      }), put: l.wait((e, n, r) => {
        const i = e.name || e, o = p(i.replace(/[#%<>:"|?*/\\]/g, "-"));
        return u.request({method: "PUT", url: "https://api.onedrive.com/v1.0/drive/special/approot:" + tr(t, o) + ":/content", headers: {"Content-Type": "application/octet-stream"}, data_type: "typified", data: {type: "raw", value: n}}).then(e => {
          const t = r && r.lastModified ? new Date(r.lastModified).toISOString() : void 0;
          if (!t) return e;
          const n = e.result, i = JSON.parse(n);
          return u.request({method: "PATCH", url: "https://api.onedrive.com/v1.0/drive/items/" + i.id, headers: {"Content-Type": "application/json"}, data: JSON.stringify({fileSystemInfo: {lastModifiedDateTime: t}})});
        });
      }), delete: l.wait(e => {
        const n = e.name || e;
        return u.request({method: "DELETE", url: "https://api.onedrive.com/v1.0/drive/special/approot:" + tr(t, p(n))});
      }), watch: {start: () => {
        if (d) return;
        d = true;
        const e = () => {
          if (A = null, !d) return;
          const t = i;
          c({set_current_list: true}).then(() => {
            if (!t) return;
            const e = {}, n = {};
            i.forEach(t => {
              e[t.id] = t;
            }), t.forEach(e => {
              n[e.id] = e;
            }), Object.keys(n).forEach(t => {
              const r = e[t], i = n[t];
              r ? i.modified != r.modified && u.changes.notify({time: r.modified, name: r.name}) : u.changes.notify({time: Date.now(), name: i.name, removed: true});
            }), Object.keys(e).forEach(t => {
              if (!n[t]) {
                const n = e[t];
                u.changes.notify({time: n.modified, name: n.name});
              }
            });
          }).fail(e => {
            D.warn("OneDrive: file changes check failed", e);
          }).always(() => {
            A = o(e, u.config.watch_interval);
          });
        };
        l.wait(() => d ? (e(), vt.Pledge()) : vt.Breach())();
      }, stop: () => {
        d = false, A && (a(A), A = null);
      }}, getRemoteDomains: () => ["onedrive.live.com"], getRemoteUrl: void 0});
      return u;
    }, yandex: () => {
      let e, t;
      (e = ue.LOCALSTORAGE) && (t = parseInt(e.getItem("yandex_poll_interval") || "")) || (t = 18e5);
      const n = ir(rr("yandex")), r = or(n), i = Object.assign({}, r);
      let o;
      const s = Object.assign(r, {...n, ...r, config: {...r.config, root: "/Programs/Tampermonkey", url: "https://webdav.yandex.ru", redirect_uri: "https://auth.tampermonkey.net/oauth.php", refresh_supported: true, request_uri: "https://oauth.yandex.com/authorize", client_id: "a591fcd2ccd248f0baa84222898065f4", storage_key: "ya_config", response_type: "token", auth_prefix: "OAuth", watch_interval: t}, init: () => {
        if (o) return o;
        const e = vt();
        return o = e.promise(), s.request({method: "GET", url: "https://cloud-api.yandex.net/v1/disk/"}).done(e => {
          const t = e.result, n = t ? JSON.parse(t) : {};
          n.total_space && n.used_space && (n.used_space + 5e7 > n.total_space ? D.warn("Yandex: low disk space warning, only " + (n.total_space - n.used_space) + " bytes available") : D.log("Yandex: " + (n.total_space - n.used_space) + " bytes on disk available!"));
        }).always(() => {
          e.consume(i.init());
        }), o;
      }, getRemoteDomains: () => ["disk.yandex.com"], getRemoteUrl: void 0, list: e => i.list(e).then(e => e.map(e => (e.md5 = e.etag, e))), request: e => (() => {
        const t = e.headers = e.headers || {};
        if (t["X-Requested-With"] = "XMLHttpRequest", "PUT" == e.method && e.data && "raw" == e.data.type && e.data.value) {
          const n = vt();
          return q(e.data.value).then(e => {
            t.Etag = W(e), t.Sha256 = Kn(e, "ASCII");
          }).always(n.resolve), n.promise();
        }
        return vt.Pledge();
      })().then(() => i.request(e)).then(e => e, t => {
        const n = (null == t ? void 0 : t.status) || -1;
        return [401].includes(n) && (D.warn("Yandex: authentication error", t), delete s.credentials.access_token, !e.retry_auth) ? (e.retry_auth = true, s.oauth.run().then(() => i.request(e))) : t;
      }), compare: (e, t) => {
        const n = vt();
        let r;
        return (r = e.md5) && r == W(t, "utf-8") ? n.resolve(true) : n.resolve(false), n.promise();
      }});
      return s;
    }, webdav: e => {
      let t, n;
      (t = ue.LOCALSTORAGE) && (n = parseInt(t.getItem("webdav_poll_interval") || "")) || (n = 18e5);
      const r = e.url;
      if (r) {
        const t = r.toLowerCase();
        t.startsWith("webdav") ? e.url = r.replace(/^webdav/i, "http") : t.startsWith("http") || (e.url = `http://${r}`);
      }
      const i = or((e => {
        const t = Object.assign({}, e), n = t.type;
        if (void 0 === n) throw new Error("Internal error");
        const r = Object.assign(e, {...t, config: {...t.config}, credentials: {}, request: e => r.credentials.basic_auth ? (e.no_auth || (e.headers = e.headers || {}, e.headers.Authorization = "Basic " + r.credentials.basic_auth), t.request(e)) : vt.Breach("Authentication failed"), wait: e => t.wait((...t) => e(...t))});
        let i;
        return Object.defineProperty(r, "credentials", {get: () => (void 0 === i && (Cn.tC(n, "init"), i = {basic_auth: r.config.basic_auth}), i), set: e => {
          i = e;
        }, enumerable: false}), r;
      })(rr("webdav")));
      return Object.assign(i, {...i, config: {...i.config, root: "Tampermonkey", watch_interval: n, ...e}});
    }};
    let ar;
    let lr, dr = [], Ar = false;
    (() => {
      const e = e => {
        const t = e.type, n = e.id, r = ".meta.json", i = ".user.js";
        let o, s;
        const a = e => {
          let t;
          return vt.Pledge().then(() => {
            if (!s) return t = true, l();
          }).then(() => {
            if (s && void 0 === s[e] && !t) return l();
          }).then(() => s ? (s[e] = s[e] || void 0, s[e]) : (D.warn("si: unable to list remote list!"), vt.Breach()));
        }, l = e => o.list(e).then(e => {
          s = {};
          const t = {}, n = {};
          let r, i;
          const o = Date.now();
          return e.map(e => {
            const {name: a, modified: l} = e;
            if (!s) return;
            s[a] = e;
            const d = new RegExp(".meta.json$"), A = new RegExp(".user.js$");
            if (l > o) D.log("si: ignore future list item", o, e); else if ((r = !!a.match(d)) || (i = !!a.match(A))) {
              let o;
              if (r) {
                o = a.replace(d, "");
                const n = l, {precision: r} = e;
                t[o] = {uuid: o, options: {}, url: void 0, precision: r, lastModified: n};
              } else i && (o = a.replace(A, ""), n[o] = !!e);
            }
          }), Object.keys(t).map(e => {
            const r = t[e];
            return r && (r.sourceAvailable = n[e]), r;
          }).filter(e => e);
        });
        let d;
        const A = {init: e => (o = sr[t]({...e, path: "sync"}), vt.Pledge().then(() => (d || (d = o.changes.listen(), d.progress(e => {
          ((e, t) => {
            if (0 != t) return;
            const n = e.name, r = new RegExp(".meta.json$"), i = new RegExp(".user.js$");
            D.log("si: cloud file changed", n, e), (n.match(r) || n.match(i)) && dr.forEach(e => {
              e(n);
            });
          })(e, n);
        })), true))), list: l, setSource: (e, t) => {
          const n = e + i;
          return a(n).then(e => {
            let r;
            return vt.Pledge(false).then(() => {
              if (e && o.compare) return o.compare(e, t);
            }).then(i => i ? (D.log("si: remote source data matches, skip upload of", n), vt.Pledge()) : (r = new Blob([t], {type: "text/plain"}), s && delete s[n], o.put(e || n, r)));
          });
        }, getSource: (e, t) => {
          const n = e + i;
          return a(n).then(r => r ? vt.Pledge(false).then(() => {
            if (t && o.compare) return o.compare(r, t);
          }).then(e => e ? (D.log("si: remote source data matches, skip download of", n), vt.Pledge(t)) : o.get(r).then(e => q(e, "utf-8"))) : (D.warn("si: list cache does not contain this UUID", e), vt.Breach()));
        }, getMeta: e => a(e + r).then(t => t ? o.get(t).then(e => q(e, "utf-8")).then(n => {
          let r;
          if ((r = (e => {
            let t;
            try {
              t = JSON.parse(e);
            } catch (e) {}
            if (t && t.uuid) return t;
            D.log("si: unable to parse extended info of " + void 0);
          })(n)) && (r.uuid = e)) {
            let {options: n, url: i, precision: o, lastModified: s} = r;
            return s = t.modified || s || 0, o = t.precision || o, n = n || {}, {...r, uuid: e, url: i, options: n, precision: o, lastModified: s};
          }
        }) : vt.Breach()), setMeta: (e, t) => {
          const n = new Blob([JSON.stringify(e)], {type: "text/plain"}), i = e.uuid + r;
          return a(i).then(e => o.put(e || i, n, t));
        }, remove: e => {
          const t = e.uuid + r;
          e.options.removed = Date.now();
          const n = new Blob([JSON.stringify(e)], {type: "text/plain"});
          return o.put(t, n).then(() => {
            const t = e.uuid + i;
            return a(t).then(e => {
              if (e) return s && delete s[t], o.delete(e);
            });
          });
        }, reset: () => o.list(true).then(e => e.filter(e => {
          const t = new RegExp(".meta.json$"), n = new RegExp(".user.js$");
          return e.name.match(t) || e.name.match(n);
        })).then(e => {
          const t = [];
          return e.forEach(e => {
            t.push((() => {
              const t = vt();
              return o.delete(e).always(() => {
                t.resolve();
              }), t.promise();
            })());
          }), vt.when(t).always(() => {
            s = void 0;
          });
        }).then(() => {}), getRemoteUrl: function (e) {
          if (o.getRemoteUrl) return o.getRemoteUrl(e.uuid + i);
        }, getRemoteDomains: function () {
          if (o.getRemoteDomains) return o.getRemoteDomains();
        }};
        return A;
      };
      e({type: "drive", id: 4}), e({type: "dropbox", id: 5}), e({type: "onedrive", id: 8}), e({type: "webdav", id: 6}), e({type: "yandex", id: 7}), (() => {
        let e, t = false;
        const n = () => {}, r = e => {
          const t = vt();
          let n = [];
          return e ? i().done(r => {
            n = r.filter(t => t.item.uuid == e), t.resolve(n);
          }).fail(e => {
            t.reject(e);
          }) : t.resolve(n), t.promise();
        }, i = () => cr(() => {
          const t = vt(), n = new RegExp(e + "$");
          return Te.sync.get(null, e => {
            const r = [];
            e && Object.entries(e).forEach(([e, t]) => {
              if (-1 == e.search(n)) return;
              const i = s(t, e);
              i && r.push({key: e, item: i});
            }), t.resolve(r);
          }), t.promise();
        }), s = (e, t) => {
          let n;
          try {
            n = JSON.parse(e);
          } catch (e) {}
          if (n && (n.url || n.options)) return n;
          D.log("si: unable to parse extended info of " + t);
        }, l = e => e.then(e => {
          const t = {};
          if ((e = e.filter(e => {
            if (!t[e.key]) return t[e.key] = true, true;
          })).length > 1) {
            const t = vt(), n = [], r = e.pop();
            return e.forEach(e => {
              n.push(c(e.key));
            }), vt.when(n).done(() => {
              t.resolve(r);
            }), t.promise();
          }
          return vt.Pledge(e[0]);
        });
        let d, A = {};
        const c = e => {
          const t = vt();
          return Te.sync.remove(e, () => {
            const e = Se.lastError;
            e ? t.reject(e) : t.resolve();
          }), t.promise();
        }, u = () => {
          const e = vt();
          return Te.sync.set(A, () => {
            const t = Se.lastError;
            t ? e.reject(t) : (A = {}, e.resolve());
          }), e.promise();
        }, h = () => vt.Pledge().then(() => i()).then(t => {
          const n = new RegExp(e + "$"), r = [];
          return t.forEach(e => {
            const t = e.key, i = e.item, o = t.replace(n, "");
            let a;
            if (a = A[t] ? s(A[t], t) : i, !a) return;
            const l = a.options || {};
            r.push({uuid: l.removed ? o : a.uuid, lastModified: l.removed || a.lastModified, url: a.url, options: l});
          }), vt.Pledge(r);
        }), p = {init: function () {
          let r = true;
          if (!t) try {
            Te.onChanged.addListener(n), t = true;
          } catch (e) {
            D.warn("si: error registering sync callback: " + e.message), r = false;
          }
          return e = "@v2", vt.Pledge(r);
        }, list: h, setMeta: (t, n) => {
          const i = vt();
          return l(r(t.uuid)).done(r => {
            let s;
            s = r ? r.key : t.uuid + e;
            const {uuid: l, options: c, url: h} = t, p = (null == n ? void 0 : n.lastModified) || 0, f = {...(null == r ? void 0 : r.item) || {}, url: h, options: c || {}, uuid: l, lastModified: p};
            A[s] = JSON.stringify(f), d && a(d), d = o(u, 3e3), i.resolve();
          }), i.promise();
        }, getMeta: e => h().then(t => {
          let n;
          return t.some(t => {
            if (t.uuid == e) return n = t, true;
          }), n;
        }), remove: t => {
          const n = vt();
          return l(r(t.uuid)).done(r => {
            let i;
            i = r ? r.key : t.uuid + e;
            const {url: s, options: l, uuid: c, lastModified: h} = t, p = {...(null == r ? void 0 : r.item) || {}, url: s, options: l || {}, uuid: c, lastModified: h};
            p.options.removed = Date.now(), A[i] = JSON.stringify(p), d && (a(d), d = void 0), d = o(u, 3e3), n.resolve();
          }), n.promise();
        }, reset: () => cr(() => {
          const e = vt();
          return Te.sync.clear(() => {
            A = {}, e.resolve();
          }), e.promise();
        })};
      })();
      Te.sync.supported;
    })();
    const cr = (e, t) => {
      const n = vt();
      let r = void 0 !== t ? t : 3;
      const i = () => {
        if (Ar) o(i, 500); else {
          Ar = true;
          try {
            e().always(() => {
              Ar = false;
            }).done(e => n.resolve(e)).fail(() => {
              --r > 0 ? (D.log("si: some retries left, wait for 60000 ms"), o(i, 6e4)) : (D.warn("si: no retries left, skipping this sync request!"), n.reject("no retries left"));
            });
          } catch (e) {
            D.warn(e), Ar = false, n.reject(("string" == typeof e ? e : e.message) || "internal error");
          }
        }
      };
      return i(), n.promise();
    };
    Object.defineProperties({}, {specialMeta: {get: function () {
      return lr;
    }, enumerable: true}, syncsSource: {get: function () {
      return lr;
    }, enumerable: true}});
    var ur = e(2462), hr = e.n(ur);
    const pr = (() => {
      let e, t, n = false;
      const r = () => {
        const e = vt();
        return t = e, e;
      };
      return {write: () => {
        const t = vt();
        return n = false, e = new (hr()), t.resolve(e), t.promise();
      }, open: i => {
        const o = r();
        return n = true, hr().loadAsync(i).then(t => {
          e = t, o.resolve(e);
        }, e => {
          t && t.reject(e), o.reject(e);
        }), o.promise();
      }, entries: () => {
        const t = r(), n = e.files, i = Object.keys(n).map(e => {
          const t = n[e];
          if (t && !t.dir) return {filename: t.name};
        }).filter(e => e);
        return t.resolve(i), t.promise();
      }, get: t => {
        const n = r(), i = e.file(t.filename);
        return i ? i.async("arraybuffer").then(e => {
          n.resolve(e);
        }) : n.resolve(), n.promise();
      }, put: (t, n, i) => {
        const o = r();
        try {
          e.file(t, n, {date: i ? new Date(i) : void 0}), o.resolve();
        } catch (e) {
          o.reject(e);
        }
        return o.promise();
      }, end: () => {
        const t = r();
        return n ? t.reject() : e.generateAsync({type: "blob", compression: "DEFLATE", comment: "Created by Tampermonkey"}).then(e => t.resolve(e), e => t.reject(e)), t.promise();
      }};
    })(), fr = {zip: {create: function (e, t) {
      const n = vt();
      return vt.Pledge().then(() => pr.write()).then(() => {
        const t = vt(), r = {}, i = (e, t) => {
          let n = [e, t].join(".");
          if (r[n]) {
            let o;
            do {
              o = e + " (" + r[n] + ")", n = [o, t].join("."), r[n]++;
            } while (r[n]);
            return i(o, t);
          }
          return r[n] = 1, n;
        }, o = e.length, s = () => {
          if (!e.length) return t.resolve();
          const r = e.shift();
          if (!r) return t.resolve();
          const a = r.meta.name.replace(/[\\/$*?|]/g, "-"), l = i(a, "user.js"), d = i(a, "options.json"), A = i(a, "storage.json"), c = {options: r.options, settings: r.settings, meta: r.meta}, u = JSON.stringify(c), h = r.storage ? JSON.stringify(r.storage) : null;
          n.notify("Zip: " + Math.floor((o - e.length) / o * 100) + "%"), pr.put(l, r.source, r.meta.modified).then(() => pr.put(d, u)).then(() => h ? pr.put(A, h) : vt.Pledge()).then(() => {
            if (!r.resources.length && !r.requires.length) return vt.Pledge();
            const e = [];
            return ["resources", "requires"].forEach(t => {
              const n = r[t];
              n && n.length && n.forEach(n => {
                if (void 0 === n.source) return;
                const r = n.meta.name.replace(/[\\/$*?|]/g, "-"), i = W(t + n.meta.url), o = [l, i, r].join("-"), s = JSON.stringify(n.meta), a = H(n.source, {encoding: "resources" == t ? void 0 : "UTF-8"}), d = pr.put(o, a).then(() => pr.put(o + "." + t + ".json", s));
                e.push(d);
              });
            }), vt.when(e);
          }).fail(() => {
            D.log("porter: add to zip failed");
          }).always(async () => {
            await wt(1e3), s();
          });
        };
        return s(), t.promise();
      }).then(() => t ? pr.put("Tampermonkey.global.json", JSON.stringify(t)) : vt.Pledge()).then(() => pr.end()).done(e => {
        n.resolve(e);
      }).fail(() => {
        n.reject();
      }), n.promise();
    }, read: function (e) {
      const t = vt();
      let n;
      return vt.Pledge().then(() => pr.open(e)).then(() => pr.entries()).then(e => {
        const r = vt(), i = {}, o = {}, s = e.length, a = () => {
          const l = e.shift();
          if (l) pr.get(l).done(e => {
            let t = l.filename.match(/((.*)\.(storage\.json)|(.*)\.(options\.json)|(.*)\.(global\.json)|(.*)\.(user\.js)|(.*)\.user\.js-[0-9a-f]+-.*\.(resources\.json)|(.*)\.user\.js-[0-9a-f]+-.*\.(requires\.json))$/);
            if (t && (t = t.slice(1).filter(e => e)), !e || !t || t.length < 3) o[l.filename] = e; else try {
              const r = t[1], o = t[2], s = Q(e, "UTF-8");
              if ("global.json" == o) n = JSON.parse(s); else {
                const e = i[r] || {resources: {}, requires: {}};
                i[r] = e, "user.js" == o ? e.source = s : "options.json" == o ? e.options = JSON.parse(s) : "resources.json" == o ? e.resources[l.filename] = {name: l.filename, data: JSON.parse(s)} : "requires.json" == o ? e.requires[l.filename] = {name: l.filename, data: JSON.parse(s)} : "storage.json" == o && (e.storage = JSON.parse(s));
              }
            } catch (e) {
              D.warn("porter: read from zip failed", e);
            }
          }).always(async () => {
            t.notify("Zip: " + Math.floor((s - e.length) / s * 100) + "%"), await wt(1e3), a();
          }); else {
            const e = [];
            for (const [t, n] of Object.entries(i)) {
              const {options: r, source: i, storage: s} = n;
              if (!i) {
                D.warn(`porter: invalid script ${t}`);
                continue;
              }
              const a = {requires: [], resources: []};
              ["resources", "requires"].forEach(e => {
                for (const t of Object.values(n[e])) {
                  const n = t.name.replace("." + e + ".json", ""), r = o[n];
                  r && a[e].push({meta: t.data, source: Q(r, {encoding: "resources" == e ? void 0 : "UTF-8"}) || void 0});
                }
              });
              const l = {...a, ...r, source: i, storage: s};
              e.push(l);
            }
            r.resolve({scripts: e, global_settings: n});
          }
        };
        return a(), r.promise();
      }).done(e => {
        t.resolve(e);
      }).fail(() => {
        t.reject();
      }), t.promise();
    }}, json: {create: function (e, t) {
      const n = vt(), r = {created_by: "Tampermonkey", version: "1", scripts: [], settings: t};
      return e.forEach(e => {
        const t = {name: e.meta.name, options: e.options, storage: e.storage, enabled: e.settings.enabled, position: e.settings.position, file_url: e.meta.file_url, uuid: e.meta.uuid, source: P(z(e.source))};
        ["resources", "requires"].forEach(n => {
          const r = e[n];
          if (!r || !r.length) return;
          const i = t[n] = [];
          r.forEach(e => {
            if (void 0 === e.source) return;
            const t = e.meta, n = P(z(e.source));
            i.push({meta: t, source: n});
          });
        }), r.scripts.push(t);
      }), n.resolve(JSON.stringify(r)), n.promise();
    }, read: function (e) {
      const t = vt(), n = (e, r) => {
        if (e.trim()) {
          let i = null;
          try {
            i = JSON.parse(e);
            const n = e => {
              if (e && e.length) return e.map(e => ({meta: e.meta, source: e.source ? N(V(e.source)) : e.source}));
            }, r = i.scripts.map(e => ({meta: {uuid: e.uuid, name: e.name, file_url: e.file_url}, settings: {enabled: e.enabled, position: e.position}, options: e.options, storage: e.storage, source: N(V(e.source)), resources: n(e.resources) || [], requires: n(e.requires) || []}));
            return t.resolve({scripts: r, global_settings: i.settings});
          } catch (t) {
            if (!r) {
              const t = "<body>", r = "</body>";
              if (-1 != e.indexOf(t)) {
                const i = e.indexOf(t), o = e.lastIndexOf(r);
                if (-1 != i && -1 != o) return e = e.substr(i + t.length, o - (i + t.length)), n(e, true);
              }
            }
          }
        }
        t.reject();
      };
      return n(e), t.promise();
    }}}, mr = fr;
    var gr = e(8039), _r = e.n(gr), br = e(70), vr = e.n(br), kr = e(8754), yr = e.n(kr), wr = e(1763), Rr = e.n(wr), Cr = e(8295), xr = e.n(Cr), Er = e(230), Gr = e.n(Er), Zr = e(3880), Sr = e.n(Zr), Br = e(4350), Ir = e.n(Br), Tr = e(1933), Ur = e.n(Tr), Fr = e(2215), Mr = e.n(Fr), Or = e(2672), Lr = e.n(Or), jr = e(2162), Dr = e.n(jr);
    const zr = {rules: {"userscripts/filename-user": _r(), "userscripts/no-invalid-grant": vr(), "userscripts/no-invalid-headers": yr(), "userscripts/no-invalid-metadata": Rr(), "userscripts/require-name": xr(), "userscripts/require-description": Gr(), "userscripts/require-version": Sr(), "userscripts/require-attribute-space-prefix": Ir(), "userscripts/use-homepage-and-url": Ur(), "userscripts/use-download-and-update-url": Mr(), "userscripts/align-attributes": Lr(), "userscripts/better-use-match": Dr()}};
    let Nr;
    const Pr = se();
    let Vr = true, Qr = !!x;
    const Hr = ue.LOCALSTORAGE;
    if (Hr) {
      let e;
      try {
        e = Hr.getItem("lint_worker") || "";
      } catch (e) {}
      "false" == e && (Qr = false);
    }
    Nr = Pr >= 94 ? 2022 : Pr >= 86 ? 2021 : Pr >= 83 ? 2020 : Pr >= 64 ? 2018 : Pr >= 59 ? 2017 : Pr >= 47 ? 2015 : 5, Pr < 77 ? (Vr = false, D.warn("hint: disable inline ESLint config due to web worker CSP issues", "https://bugs.chromium.org/p/chromium/issues/detail?id=777076", "https://bugs.chromium.org/p/chromium/issues/detail?id=159303")) : Qr || (Vr = false, D.warn("hint: disable inline ESLint config because web workers are unavailable and this extension's CSP doesn't allow unsafe eval, which is required for ESLint's dynamic reconfigration"));
    const Xr = {"userscripts/no-invalid-grant": 1, "userscripts/no-invalid-headers": 1, "userscripts/no-invalid-metadata": [2, {top: "optional"}], "userscripts/require-name": [2, "required"], "userscripts/require-description": [1, "required"], "userscripts/require-version": [1, "required"], "userscripts/require-attribute-space-prefix": 1, "userscripts/use-homepage-and-url": 0, "userscripts/use-download-and-update-url": 1, "userscripts/better-use-match": 1}, Wr = {env: {es6: Nr >= 2015, browser: true}, parserOptions: {ecmaVersion: Nr, sourceType: "script", ecmaFeatures: {globalReturn: true}, allowAwaitOutsideFunction: true}, rules: {curly: [1, "multi-line"], "dot-location": 0, "dot-notation": [1, {allowKeywords: true}], "no-caller": 1, "no-case-declarations": 2, "no-div-regex": 0, "no-empty-pattern": 2, "no-eq-null": 0, "no-eval": 1, "no-extra-bind": 1, "no-fallthrough": 1, "no-implicit-globals": 2, "no-implied-eval": 1, "no-lone-blocks": 1, "no-loop-func": 1, "no-multi-spaces": 1, "no-multi-str": 1, "no-native-reassign": 1, "no-octal-escape": 2, "no-octal": 2, "no-proto": 1, "no-redeclare": 2, "no-return-assign": 1, "no-sequences": 1, "no-undef": 1, "no-useless-call": 1, "no-useless-concat": 1, "no-with": 1}}, Yr = {}, qr = ["uneval", "unsafeWindow", "GM_info", "GM", "GM_addStyle", "GM_addElement", "GM_cookie", "GM_deleteValue", "GM_listValues", "GM_getValue", "GM_download", "GM_log", "GM_registerMenuCommand", "GM_unregisterMenuCommand", "GM_openInTab", "GM_setValue", "GM_addValueChangeListener", "GM_removeValueChangeListener", "GM_xmlhttpRequest", "GM_webRequest", "GM_getTab", "GM_saveTab", "GM_getTabs", "GM_setClipboard", "GM_notification", "GM_getResourceText", "GM_getResourceURL"];
    let Jr;
    const Kr = {};
    let $r;
    const ei = e => e.map(e => {
      const {message: t} = e;
      if (!Vr) {
        let n;
        t && (n = t.match(/Configuration for rule "([^"]+)"[\s\S]*evaluate a string as JavaScript[\s\S]*/)) && (e.message = `Rule "${n[1]}": ESLint inline configuration is not supported by this browser.`, e.severity = 1);
      }
      return e;
    }).filter(e => e), ti = {}, ni = e => {
      const t = null == e ? void 0 : e.keys, n = {keys: t, default: () => [], set: (e, t) => (e.push(t), e)};
      return (null == t ? void 0 : t.length) && t.forEach(e => ti[e] = n), n;
    }, ri = e => {
      const t = null == e ? void 0 : e.keys, n = {keys: t, default: () => null, set: (t, n, r) => {
        const i = (null == e ? void 0 : e.convert) ? e.convert(n, r) : n;
        return null === t ? i : t;
      }};
      return (null == t ? void 0 : t.length) && t.forEach(e => ti[e] = n), n;
    }, ii = e => {
      const t = null == e ? void 0 : e.keys, n = {default: () => null, set: () => true};
      return (null == t ? void 0 : t.length) && t.forEach(e => ti[e] = n), n;
    }, oi = e => {
      const t = null == e ? void 0 : e.keys, n = {keys: t, default: () => ({}), set: (t, n, r, i) => {
        i = i ? Ve(i) : "default";
        const o = (null == e ? void 0 : e.convert) ? e.convert(n, r) : n;
        return t[i] = t[i] || o, t;
      }};
      return (null == t ? void 0 : t.length) && t.forEach(e => ti[e] = n), n;
    }, si = {name: oi({convert: e => null == e ? void 0 : e.replace(/\s\s+/g, " ")}), version: ri({convert: e => (null == e ? void 0 : e.replace(/\s/g, "")) || e}), grants: ni({keys: ["grant"]}), icon: ri({keys: ["icon", "iconURL", "iconUrl", "defaulticon"]}), icon64: ri({keys: ["icon64", "iconURL64"]}), supportURL: ri({keys: ["supportURL", "supportUrl"]}), fileURL: ri(), downloadURL: ri({keys: ["downloadURL", "downloadUrl"]}), updateURL: ri({keys: ["updateURL", "updateUrl"]}), namespace: ri({convert: e => "" === e ? null : e}), author: ri(), copyright: ri(), homepage: ri({keys: ["homepage", "homepageURL", "homepageUrl", "website", "source"]}), description: oi(), includes: ni({keys: ["include"]}), excludes: ni({keys: ["exclude"]}), matches: ni({keys: ["match"]}), requires: ni({keys: ["require"]}), resources: (e => {
      const t = null == e ? void 0 : e.keys, n = {keys: t, default: () => ({}), set: (t, n, r) => {
        const i = n.match(/^(\S*)\s+(.*)/);
        if (i && void 0 === t[i[1]]) {
          const n = (null == e ? void 0 : e.convert) ? e.convert(i[2], r) : i[2];
          t[i[1]] = n;
        }
        return t;
      }};
      return (null == t ? void 0 : t.length) && t.forEach(e => ti[e] = n), n;
    })({keys: ["resource"]}), sandbox: ri({keys: ["sandbox", "inject-into"], convert: (e, t) => null !== e && "inject-into" === t ? {auto: "DOM", content: "DOM", page: null}[e] || null : e}), noframes: ii(), unwrap: ii(), connects: ni({keys: ["connect", "connect-src", "domain"]}), webRequest: ni(), "run-at": ri(), antifeatures: (e => {
      const t = null == e ? void 0 : e.keys, n = {keys: t, default: () => ({}), set: (t, n, r, i) => {
        var o;
        i = i ? Ve(i) : "default";
        const s = n.match(/^(\S*)\s+(.*)/);
        if (s) {
          const n = t[o = s[1]] || (t[o] = {}), a = (null == e ? void 0 : e.convert) ? e.convert(s[2], r) : s[2];
          n[i] = a;
        }
        return t;
      }};
      return (null == t ? void 0 : t.length) && t.forEach(e => ti[e] = n), n;
    })({keys: ["antifeature"]})}, ai = {};
    Object.entries(si).forEach(([e, t]) => {
      t.keys ? t.keys.forEach(t => {
        ai[t] = e;
      }) : ai[e] = e;
    });
    const li = (() => {
      const e = e => {
        const t = e.split(".");
        return t.slice(0, 3).concat([t.slice(3).join(".")]).concat([0, 0, 0, 0]).slice(0, 4).map(e => {
          const t = e.toString().match(/((?:-?[0-9]+)?)([^0-9-]*)((?:-?[0-9]+)?)(.*)/);
          return t ? [Number(t[1]), t[2], Number(t[3]), t[4]] : [];
        }).reduce((e, t) => e.concat(t));
      }, t = (n, r) => {
        const i = Array.isArray(n) ? n : e(n), o = Array.isArray(r) ? r : e(r);
        for (let e = 0; e < 16; e++) {
          const n = i[e], r = o[e];
          if (e % 2 == 1) {
            if (!n && r) return t.eNEWER;
            if (n && !r) return t.eOLDER;
            const e = n.match(/\w/g) || [], i = r.match(/\w/g) || [];
            for (let n = 0; n < Math.min(e.length, i.length); n++) {
              if (e[n].charCodeAt(0) > i[n].charCodeAt(0)) return t.eNEWER;
              if (e[n].charCodeAt(0) < i[n].charCodeAt(0)) return t.eOLDER;
            }
            if (e.length > i.length) return t.eNEWER;
            if (e.length < i.length) return t.eOLDER;
          } else {
            if (Number(n) > Number(r)) return t.eNEWER;
            if (Number(n) < Number(r)) return t.eOLDER;
          }
        }
        return t.eEQUAL;
      };
      return t.eERROR = -2, t.eOLDER = -1, t.eEQUAL = 0, t.eNEWER = 1, t;
    })(), di = {images: {origin: ut.images.origin, brand: ut.images.brand, get: function (e) {
      return {about: "info-circle blue", bug: "bug", button_ok: "check green", cancel: "times red", check: "badge-check", clock: "clock green", cloud: "cloud", critical: "exclamation-triangle orange", contrib: "heart", db: "database grey", delete: "trash-alt", download: "spinner rotate", edit: "edit", edit_add: "plus-square", editor_cancel: "undo", enabler: "angle-right", enabler_enabled: "angle-down", error: "bell red", exit: "times", filesave: "save", filter: "filter", flag: "flag", encrypted: "lock orange", save_to_disk: "download", help: "question-square", home: "home", import: "upload", incognito: "eye-slash", info: "info-square", no_script: "info", lock: "cog", menu_cmd: "cogs", no: "minus-circle red", no_domain: "thumbs-down red", question_mark: "question-circle", resources: "cloud purple", script_add: "plus-square", script_cancel: "industry-alt", script_download: "file-code purple", script_search: "search", permissionless: "star-exclamation green", update: "sync", utilities: "cog", web: "globe blue", windowlist: "window-restore grey", yes_domain: "thumbs-up green"}[e] || "";
    }}, formatBytes: (e, t) => {
      if (0 == e) return "0 Byte";
      const n = void 0 === t ? 3 : t, r = Math.floor(Math.log(e) / Math.log(1e3));
      return (0 === t ? Math.round : e => e)(e / Math.pow(1e3, r)).toFixed(n) + " " + ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][r];
    }}, Ai = di.images, ci = (e, t, n, r) => {
      const i = (r.uuid ? r.uuid : "") + r.id;
      t.title = e;
      const o = mi({after: {image: "help"}, name: r.name, id: i});
      o && n.appendChild(o);
    }, ui = (e, t, n, r, i, o) => {
      const s = te("i", "far fa-" + e, t, n, r, true);
      if (i && (s.title = i), s.key = n, s.name = t, o) {
        const e = s.getAttribute("class") || "";
        s.setAttribute("class", e + " clickable"), s.addEventListener("click", o), s.href = "#";
      }
      return s;
    }, hi = (e, t, n) => {
      const r = (t.uuid ? t.uuid : "") + t.id, i = ne("div", t.name, r, "input");
      i.key = t.id;
      const o = ne("input", t.name, r, "input", true), s = e.split("##");
      o.name = t.name, o.uuid = t.uuid, o.key = t.id, o.oldvalue = t.value, o.value = null != t.value ? t.value : "", o.type = t.password ? "password" : "text", o.setAttribute("spellcheck", "false"), t.placeholder && o.setAttribute("placeholder", t.placeholder), n && !o.inserted && o.addEventListener("change", n);
      const a = te("span", "optiondesc", t.name, r, "s1"), l = ne("span", t.name, r, "s2");
      return a.textContent = s[0] + ":", s.length > 1 && (l.textContent = s[1]), i.appendChild(a), i.appendChild(o), i.appendChild(l), t.enabledBy && i.setAttribute("name", "enabled_by_" + t.enabledBy), {elem: i, input: o};
    }, pi = (e, t, n) => {
      const r = (t.uuid ? t.uuid : "") + t.id;
      let i = null;
      return i = te("input", "button", t.name, r, "bu", true), i.name = t.name, i.uuid = t.uuid, i.key = t.id, i.type = "button", i.value = t.name, i.data = t.data, i.reload = t.reload, i.ignore = t.ignore || t.reload, i.warning = t.warning, t.enabledBy && i.setAttribute("name", "enabled_by_" + t.enabledBy), !i.inserted && n && i.addEventListener("click", n), i;
    }, fi = (e, t, n, r) => {
      let i = null;
      return i = te("input", "button", e, t, "bu", true), i.name = e, i.key = t, i.type = "button", i.value = n, !i.inserted && r && i.addEventListener("click", r), i;
    }, mi = (e, t) => {
      const n = (e.uuid ? e.uuid : "") + e.id;
      let r, i, o;
      if (i = e.after || e.validation) {
        if (o = e.validation ? "validation" : "help", t && (o += " clickable"), r = te("span", o, e.name, n, o, true), i.image) {
          const e = ui(Ai.get(i.image), n, "after_icon"), t = [];
          i.opacity && t.push("opacity: " + i.opacity), e.setAttribute("style", t.join(";")), r.appendChild(e);
        }
        r && (t && r.addEventListener("click", t), i.msg && r.setAttribute("title", i.msg));
      }
      return r;
    }, gi = e => ({"&": "&amp;", "<": "&lt;", ">": "&gt;"}[e] || e), _i = {getInfoFromUrl: e => {
      let t;
      if (-1 != e.search(/\/\^?(http(s|s\?|\.\+)?|\.\*):\/\/(\.\*)*\$?\/?$/) || -1 != e.search(/htt(ps|p):\/\/(\*\/\*|\*)*$/) || -1 != e.search(/\*:\/\/(\*\/\*|\*)*$/) || "*" == e) return {dom: "*", tld: "*"};
      0 == e.search(/\//) ? (t = e, t = t.replace(/\([^\)]*\)[\?|\+|\*|\{[^\}]*]*/g, ""), t = t.replace(/\[[^\]]*\][\?|\+|\*|\{[^\}]*]*/g, ""), t = t.replace(/^\/|\/$|\^|\$|\\\?.*|#.*|\?|\(|\)|\+|\\|\.\*|/g, "")) : t = e, t = t.replace(/^\*:\/\//, "http://"), 0 != t.search("http") && (t = "http://" + t);
      const n = t.split("/");
      if (n.length < 3) return null;
      const r = n[2].split(".");
      if (r.length < 2) return null;
      const i = r[r.length - 1].split(":")[0];
      let o = r[r.length - 2];
      "*" !== o && (o = o.replace(/\*/g, ""));
      const s = [];
      for (let e = r.length - 3; e >= 0 && -1 == r[e].search("\\*"); e--) s.push(r[e]);
      return {tld: i, dom: o, subdom: s.reverse()};
    }, getValue: e => {
      let t = e.value;
      if ("native" === e.valtype) if ("undefined" === t) t = void 0; else if ("null" === t) t = null; else try {
        t = JSON.parse(t);
      } catch (e) {}
      return t;
    }, safeTagsReplace: e => e.replace(/[&<>]/g, gi), addClass: (e, t) => {
      let n = e.getAttribute("class") || "";
      const r = new RegExp("[ 	]*" + t + "[ 	]*");
      -1 == n.search(r) && (n = (n ? n + " " : "") + t), e.setAttribute("class", n);
    }, toggleClass: (e, t) => {
      let n = e.getAttribute("class") || "";
      const r = new RegExp("[ 	]*" + t + "[ 	]*");
      n = -1 != n.search(r) ? n.replace(r, "") : (n ? n + " " : "") + t, e.setAttribute("class", n);
    }, setHelp: ci, createAfterIcon: mi, createEnabler: (e, t, n, r, i) => {
      const o = r.append, s = r.disabled, a = r.title, l = te("div", (s ? "" : "clickable ") + "enabler " + e, t, n + "_enabler", o, "wrap"), d = te("i", "far fa-toggle-on on", t, n + "toggle-on"), A = te("i", "far fa-toggle-on fa-flip-horizontal off greyed", t, n + "toggle-off");
      l.appendChild([d, A]), a && (l.title = a), l.key = n, l.uuid = t;
      const c = "enabler_enabled";
      return s || l.addEventListener("click", () => {
        et(l).hasClass(c) ? et(l).removeClass(c) : et(l).addClass(c), i && window.setTimeout(() => {
          i.call(l);
        }, 100);
      }), l;
    }, createImage: (e, t, n, r, i, o) => {
      const s = te("img", "icon16", t, n, r, true);
      if (s.setAttribute("src", e), o) {
        const e = s.getAttribute("class") || "";
        s.setAttribute("class", e + " clickable");
      }
      return s.key = n, i && (s.title = i), t && (s.name = t), o && (s.addEventListener("click", o), s.href = "#"), s;
    }, createIcon: ui, createFileInput: (e, t, n) => {
      const r = te("input", "import", "file", null, null, true);
      return r.inserted || (r.type = "file", n && r.addEventListener("change", n)), r;
    }, createNamedSettings: (e, t, n) => {
      const r = (t.uuid ? t.uuid : "") + t.id, i = te("div", "settingsta", t.name, r, "named_wrapper"), o = te("div", "named", t.name, r, "named_settings"), s = [], a = ne("span", t.name, r, "s1");
      return e && (a.textContent = e + ":"), t.desc && ci(t.desc, a, a, t), i.appendChild(a), i.appendChild(o), i.key = t.id, t.value.forEach(e => {
        const i = te("div", "", t.name + e.name, r, "named", true), a = te("div", "", t.name + e.name, r, "named_label", true);
        a.textContent = e.name, i.appendChild(a);
        const l = ne("textarea", t.name + e.name, r, "textarea", true);
        l.setAttribute("spellcheck", "false"), l.name = t.name, l.key = t.id, l.named_name = e.name, l.uuid = t.uuid, l.named = true, l.oldvalue = e.value || "", l.value = e.value || "", n && !l.inserted && l.addEventListener("change", n), i.appendChild(l), o.appendChild(i), s.push(l);
      }), {elem: i, textareas: s, label: a};
    }, createTextarea: (e, t, n) => {
      const r = (t.uuid ? t.uuid : "") + t.id, i = ne("div", t.name, r, "textarea");
      i.key = t.id;
      const o = te("textarea", "settingsta", t.name, r, "textarea", true);
      o.setAttribute("spellcheck", "false"), o.name = t.name, o.key = t.id, o.uuid = t.uuid, o.json = t.json, o.array = t.array, o.oldvalue = t.value, void 0 === t.value || null === t.value ? o.value = "" : t.array ? o.value = t.value.join("\n") : t.json ? o.value = JSON.stringify(t.value, null, 4) : o.value = t.value, n && !o.inserted && o.addEventListener("change", n);
      const s = ne("span", t.name, r, "s1");
      return e && (s.textContent = e + ":"), t.desc && ci(t.desc, s, s, t), i.appendChild(s), i.appendChild(o), {elem: i, textarea: o, label: s};
    }, createFileSelect: (e, t, n) => {
      const r = (t.uuid ? t.uuid : "") + t.id, i = ne("input", t.name, r, "file");
      if (i.inserted || (i.type = "file", i.addEventListener("change", e => {
        n(e.target.files);
      }, false)), e) {
        const n = ne("div", t.name, r, "input"), o = ne("span", t.name, r, "s1");
        return o.textContent = e + ":", n.appendChild(o), n.appendChild(i), {elem: n, input: i};
      }
      return {elem: i};
    }, createInput: hi, createColorChooser: (e, t, n) => {
      const r = (t.uuid ? t.uuid : "") + t.id, i = hi(e, t, n), o = function () {
        n && n.apply(this, arguments);
        const e = (this.value.match(/[a-fA-F0-9]+/) || "")[0];
        e && [3, 6].includes(e.length) && s.setAttribute("style", "background-color: #" + e + ";");
      };
      i.input.inserted || i.input.addEventListener("keyup", o);
      const s = te("span", "color_choosed", t.name, r, "col");
      return i.col = s, i.elem.appendChild(i.col), o.call(i.input), i;
    }, createPassword: (e, t, n) => {
      const r = hi(e, t, n);
      return r.input.setAttribute("type", "password"), r;
    }, createCheckbox: (e, t, n) => {
      const r = (t.uuid ? t.uuid : "") + t.id, i = te("div", "checkbox", t.name, r, "cb1");
      i.key = t.id;
      const o = ne("input", t.name, r, "cb", true);
      o.title = t.desc ? t.desc : "", o.name = t.name, o.uuid = t.uuid, o.key = t.id, o.reload = t.reload, o.warning = t.warning, o.oldvalue = t.enabled, o.checked = t.enabled, o.type = "checkbox", o.valtype = "boolean", n && !o.inserted && o.addEventListener("click", n);
      const s = te("span", "checkbox_desc", t.name, r, "cb2");
      return s.textContent = e, t.desc && ci(t.desc, i, s, t), i.appendChild(o), i.appendChild(s), {elem: i, input: o};
    }, createDropDown: (e, t, n, r, i) => {
      const o = (t.uuid ? t.uuid : "") + t.id, s = ne("div", t.name, o, "outer_dd");
      s.key = t.id;
      const a = ne("select", t.name, o, "dd", true);
      let l = false;
      if (n && Object.keys(n).forEach(e => {
        const r = ne("option", t.name, n[e].name, "dd" + o, true);
        r.textContent = n[e].name.replace(/(?:&#x([a-fA-F0-9]+);|&#([0-9]+);)/g, (e, t, n) => t ? String.fromCharCode(parseInt(t, 16)) : String.fromCharCode(parseInt(n, 10))), r.value = n[e].value, r.warning = n[e].warning, l |= !!n[e].warning, n[e].enabledBy && r.setAttribute("name", "enabled_by_" + n[e].enabledBy), t.enabler && n[e].enable && r.setAttribute("enables", JSON.stringify(n[e].enable)), n[e].value == t.value && (r.selected = true), a.appendChild(r);
      }), a.key = t.id, a.name = t.name, a.uuid = t.uuid, a.reload = t.reload, a.warning = t.warning, a.oldvalue = t.value, a.valtype = "native", a.inserted || (r && a.addEventListener("change", r), l && i && a.addEventListener("change", i)), null !== e) {
        const n = te("span", "optiondesc", t.name, o, "inner_dd");
        n.textContent = e + ": ", s.appendChild(n);
      }
      return s.appendChild(a), t.desc && ci(t.desc, s, s, t), t.enabledBy && s.setAttribute("name", "enabled_by_" + t.enabledBy), {elem: s, select: a};
    }, createImageButton: (e, t, n, r, i) => {
      let o = null, s = null, a = null;
      return o = te("button", "imgbutton button", e, t, "bu", true), s = te("div", "imgbutton_container", e, t, "bu_container"), s.appendChild(o), o.uuid = e, o.key = t, a = te("i", "imgbutton_image far fa-" + r, e, t, "bu_img", true), o.appendChild(a), o.title = a.title = a.alt = n, !o.inserted && i && o.addEventListener("click", i), s;
    }, createImageTextButton: (e, t, n, r, i) => {
      const o = te("button", "button imgtextbutton", e, t + n, "itb", true);
      if (o.key = t, o.uuid = e, r) {
        const i = ui(Ai.get(r), e, t + n + "itb", r);
        o.appendChild(i);
      }
      const s = ne("span", e, t + n, "itb");
      return s.textContent = n, o.appendChild(s), i && o.addEventListener("click", i), o;
    }, createButton: function (e, t) {
      return "Object" === Z(t) ? pi.apply(this, arguments) : fi.apply(this, arguments);
    }, createPosition: (e, t, n) => {
      const r = (t.uuid ? t.uuid : "") + t.id, i = ne("div", t.name, r, "pos1"), o = ne("select", t.name, r, "pos", true);
      for (let e = 1; e <= t.posof; e++) {
        const n = ne("option", t.name, r, "opt" + e);
        n.textContent = e, e == t.pos && (n.selected = true), o.appendChild(n);
      }
      o.key = t.id, o.uuid = t.uuid, o.name = t.name, o.valtype = "native", n && !o.inserted && o.addEventListener("change", n);
      const s = te("span", "optiondesc", t.name, r, "pos2");
      return s.textContent = e, i.appendChild(s), i.appendChild(o), i;
    }, createSearchBox: e => {
      const t = te("div", "searchbox", "search_inner"), n = te("div", "searchbox_mv", "search_inner_mv"), r = te("input", "searchbox_input", "search_input"), i = te("input", "searchbox_button", "search_button");
      r.type = "text", r.setAttribute("spellcheck", "false"), r.value = e, i.type = "button", i.value = "Go";
      const o = () => {
        const e = r.value;
        window.location = window.location.origin + window.location.pathname + "?url=" + encodeURIComponent(e);
      };
      return i.addEventListener("click", o), r.addEventListener("keyup", e => {
        e && 13 == e.keyCode && o();
      }), n.appendChild(r), n.appendChild(i), t.appendChild(n), t;
    }, createSocialButtons: () => {
      const e = [], t = te("a", "", "github_link");
      t.href = "https://github.com/derjanb", t.target = "_blank";
      const n = te("img", "icon16", "github");
      n.setAttribute("src", Ai.origin("gh")), t.appendChild(n), e.push(t);
      const r = te("a", "", "facebook_link");
      r.href = "https://www.facebook.com/tampermonkey", r.target = "_blank";
      const i = te("img", "icon16", "facebook");
      i.setAttribute("src", Ai.brand("facebook")), r.appendChild(i), e.push(r);
      const o = te("a", "", "insta_link");
      o.href = "https://www.instagram.com/der_jan_b/", o.target = "_blank";
      const s = te("img", "icon16", "instagram");
      return s.setAttribute("src", Ai.brand("instagram")), o.appendChild(s), e.push(o), e;
    }, createGobalHint: (e, t) => {
      const n = "global_hint_" + (e.class ? e.class : "warning"), r = e.id || Date.now(), i = te("span", ["global_hint", n].join(" "), "globalhint", r), o = ne("span", "globalhint_c", r), s = ne("span", "globalhint_t", r);
      e.title && (s.title = e.title), e.image && o.appendChild(ui(Ai.get(e.image), "globalhint_" + r, "icon" + r)), s.textContent = e.text, e.onclick && !s.inserted && s.addEventListener("click", e.onclick), o.appendChild(s), i.appendChild(o);
      const a = et(i);
      e.instant || (a.hide(), window.setTimeout(() => {
        a.fadeIn(500);
      }, e.delay ? e.delay : 1));
      const l = () => {
        e.instant ? (a.hide(), a.remove()) : a.fadeOut(500, () => {
          a.remove();
        }), e.done && e.done(i);
      };
      if (e.timeout && window.setTimeout(l, e.timeout), !e.timeout || e.timeout > 18e5) {
        const t = te("span", "close", "gh_close", r);
        o.appendChild(t), t.addEventListener("click", () => {
          l(), e.onclose && e.onclose();
        });
      }
      return a.appendTo(t || document.body), a;
    }, isScrolledIntoView: (e, t, n) => {
      const r = et(e), i = et(t), o = n && n.padding && n.padding.top || 0, s = n && n.padding && n.padding.bottom || 0, a = i.height(), l = r.offset().top - i.offset().top;
      return l + r.height() <= a - s && l >= 0 + o;
    }}, bi = _i, vi = {}, ki = {create: (e, t, n, r) => {
      const i = (s = /[0-9a-zA-Z]/g, (o = e) && s ? (o.match(s) || []).join("") : "");
      var o, s;
      let a = false;
      null == n && (n = {tv: "tv", tv_table: "tv_table", tr_tabs: "tr_tabs", tr_content: "tr_content", td_content: "td_content", td_tabs: "td_tabs", tv_tabs_fill: "tv_tabs_fill", tv_tabs_table: "tv_tabs_table", tv_tabs_align: "tv_tabs_align", tv_contents: "tv_contents", tv_tab_selected: "tv_tab tv_selected", tv_tab_close: "tv_tab_close", tv_tab: "tv_tab", tv_content: "tv_content"});
      const l = te("div", n.tv, "main" + i), d = te("table", n.tv_table + " noborder", "main_table" + i);
      d.inserted ? a = true : (vi[i] = {}, vi[i].g_entries = {}, vi[i].g_selectedId = null);
      const A = te("tr", n.tr_tabs, "tabs" + t.id + i), c = te("td", n.td_tabs, "pages" + i), u = te("div", n.tv_tabs_fill, "tv_tabs_fill" + i), h = te("div", n.tv_tabs_table, "tv_tabs_table" + i), p = te("div", n.tv_tabs_align, "tv_tabs_align" + i), f = te("tr", n.tr_content, "content" + t.id + i), m = te("td", n.td_content, "content" + i), g = te("div", n.tv_contents, "tv_content" + i), _ = ne("tfoot", "tv_footer_t" + i), b = ne("tr", "tv_footer_tr" + i), v = ne("td", "tv_footer_td" + i);
      _.appendChild(b), b.appendChild(v), h.appendChild(p), u.appendChild(h), c.appendChild(u), A.appendChild(c), d.appendChild(A), m.appendChild(g), f.appendChild(m), d.appendChild(f), d.appendChild(_), l.appendChild(d), t.appendChild(l);
      const k = (e, t, n) => {
        t ? e.setAttribute("style", n ? void 0 : F) : e.setAttribute("style", n ? "position:absolute; left: -20000px; top: -200000px; width: 1px; height: 1px;" : M), e.setAttribute("vis", t.toString());
      }, y = (e, t) => {
        const n = e.getId();
        if (vi[i].g_entries[n]) {
          if (t == vi[i].g_entries[n].visible) return;
          vi[i].g_entries[n].visible = t, k(vi[i].g_entries[n].tab, t);
        }
      }, w = (e, t) => {
        e && k(e.content, t, false);
      }, R = e => {
        if (null === e) return null;
        const t = Object.keys(vi[i].g_entries);
        for (let n, r = 0; n = t[r]; r++) {
          const t = vi[i].g_entries[n];
          if (t.entry.getId() == e) return t.entry;
        }
        return null;
      }, C = e => {
        e.hide();
        const t = e.getId(), n = vi[i].g_entries[t];
        if (n) {
          n.tab.parentNode.removeChild(n.tab), n.content.parentNode.removeChild(n.content);
          const e = (e => {
            const t = Object.keys(vi[i].g_entries);
            for (let n, r = 0; n = t[r]; r++) if (vi[i].g_entries[n].tab.id == e.id) return n;
            return null;
          })(n.tab);
          e && delete vi[i].g_entries[e];
        } else console.log("tv: WARN: tab not part of tabview!");
      };
      let x = null;
      return a ? x = vi[i].tv : (x = {getTabById: R, getSelectedTab: function () {
        return R(vi[i].g_selectedId);
      }, getAllTabs: function () {
        const e = et(p).find("div[tvid]");
        let t, n;
        const r = [];
        return e.each(i => {
          (t = et(e.get(i)).attr("tvid")) && (n = R(t)) && r.push(n);
        }), r;
      }, getNextTab: function () {
        const e = et(p).find("div[tvid]");
        let t;
        return vi[i].g_selectedId && e.each((n, r) => {
          t || et(r).attr("tvid") === vi[i].g_selectedId && (t = et(e.get(n + 1)).attr("tvid"));
        }), R(t || e.first().attr("tvid"));
      }, getPreviousTab: function () {
        const e = et(p).find("div[tvid]");
        let t;
        return vi[i].g_selectedId && e.each((n, r) => {
          t || et(r).attr("tvid") === vi[i].g_selectedId && (t = et(e.get(n - 1)).attr("tvid"));
        }), R(t || e.last().attr("tvid"));
      }, removeTab: C, appendTab: function (e, t, n, r, i) {
        return this.insertTab(void 0, e, t, n, r, i);
      }, insertTab: function (e, t, o, s, a, l) {
        null === e && (e = p.firstChild);
        const d = "tab_" + t, A = ne("div", d, "content" + i), c = void 0 !== A.inserted && 1 == A.inserted, u = ne("div", d, "head_text" + i);
        if (o.appendChild(u), l) {
          const e = te("div", n.tv_tab_close, d, "tv_close" + i, "tab_close");
          e.inserted || (e.addEventListener("click", () => l()), o.addEventListener("auxclick", e => {
            e && 1 == e.button && l();
          })), o.appendChild(e);
        }
        if (c) {
          const e = (e => {
            const t = Object.keys(vi[i].g_entries);
            for (let n, r = 0; n = t[r]; r++) {
              const t = vi[i].g_entries[n];
              if (t.tab.id == e.id) return t;
            }
            return null;
          })(A);
          if (e) return e.entry;
          console.log("tv: WARN: old tab, but not in tabs collection!");
        }
        let h;
        const f = t, m = e => {
          "" != e.target.className && e.target.className == n.tv_tab_close || h.select();
        };
        return A.setAttribute("tvid", t), A.addEventListener("click", m), o.addEventListener("click", m), A.setAttribute("name", "tabview_tab" + i), A.setAttribute("class", n.tv_tab), A.appendChild(o), e ? p.insertBefore(A, e) : p.appendChild(A), s.setAttribute("name", "tabview_content" + i), s.setAttribute("class", n.tv_content), g.appendChild(s), h = {getId: function () {
          return f;
        }, isVisible: function () {
          return "true" == A.getAttribute("vis");
        }, isSelected: function () {
          return vi[i].g_selectedId == this.getId();
        }, isCloseable: function () {
          return !!l;
        }, modified: function () {
          return et(o).hasClass("modified");
        }, remove: function () {
          C(this);
        }, hide: function () {
          (e => {
            const t = e.getId(), n = t == vi[i].g_selectedId;
            if (vi[i].g_entries[t] ? y(e, false) : console.log("tv: WARN: tab not part of tabview!"), n) {
              let e = null, t = null;
              for (const n in vi[i].g_entries) vi[i].g_entries[n].visible && (e = vi[i].g_entries[n], t || e.closable || (t = e));
              r || e.closable || (e = t), e ? e.entry.select() : (vi[i].g_selectedId = null, console.log("tv: WARN: selected tab set, but entry collection empty!"));
            }
          })(this);
        }, show: function () {
          (e => {
            const t = e.getId();
            vi[i].g_entries[t] ? y(e, true) : console.log("tv: WARN: tab not part of tabview!");
          })(this);
        }, select: function (e) {
          if (!e && h.isSelected()) return;
          const t = vt();
          a && a(t.promise()), (e => {
            if (e.getId() == vi[i].g_selectedId) return;
            const t = e.getId();
            vi[i].g_selectedId && w(vi[i].g_entries[vi[i].g_selectedId], false), Object.keys(vi[i].g_entries).forEach(e => {
              const r = vi[i].g_entries[e];
              r.entry.getId() == t ? r.visible ? r.selected || (r.tab.setAttribute("class", n.tv_tab_selected), w(r, true), r.selected = true) : console.log("tv: WARN: tab selected but not visible!") : r.selected && (r.tab.setAttribute("class", n.tv_tab), w(r, false), r.selected = false);
            }), vi[i].g_selectedId = t;
          })(this), t.resolve();
        }, setHeading: function (e, t, n) {
          const r = o.firstChild;
          if (t && e.length > t) {
            const i = Math.round(t / 2);
            r.textContent = e.substr(0, i) + "..." + e.substr(i - t), r.title = n || e;
          } else r.textContent = e;
        }, toggleClass: function (e, t) {
          et(o, g).toggleClass(e, t);
        }, close: function () {
          l && l();
        }}, vi[i].g_entries[f] = {entry: h, tab: A, content: s, closable: null != l}, w(vi[i].g_entries[f], false), h.show(), h;
      }, setFooter: function (e) {
        v.appendChild(e);
      }}, vi[i].tv = x), x;
    }}, yi = Et({timeout: 10800, check_interval: 300, retimeout_on_get: true}).init(), wi = xt({threads: 5}), Ri = {}, Ci = async e => {
      let t, n;
      const r = Ri[e];
      if (r) return await r;
      const i = wi.add(async () => (n = yi.get(e), n && (t = await n.toBlob()), t || (t = await xi(e)), t && (n || (n = new Bn({blob: t}), yi.set(e, n))), delete Ri[e], n));
      return Ri[e] = i, await i;
    }, xi = async e => {
      if (/^data:image\/svg|^chrome:|\.svgz?([#?].*)?$/.test(e)) return new i(t => {
        const n = new Image;
        n.crossOrigin = "anonymous", n.src = e, n.onload = () => {
          const e = document.createElement("canvas"), r = e.getContext("2d");
          r ? (e.width = n.naturalWidth, e.height = n.naturalHeight, r.drawImage(n, 0, 0), e.toBlob(e => {
            t(e || void 0);
          }, "image/png", 0.75)) : t(void 0);
        }, n.onerror = () => t(void 0);
      });
      try {
        const t = await A(e);
        if (t.ok) return await t.blob();
      } catch (e) {}
    }, Ei = new class {
      constructor() {
        this.events = {};
      }
      on(e, t) {
        const {events: n} = this;
        let r = n[e];
        return r || (r = [], n[e] = r), r.push(t), () => this.off(e, t);
      }
      once(e, t) {
        const n = this.on(e, (...e) => (n(), t.bind(this)(...e)));
        return n;
      }
      off(e, t) {
        const n = this.events[e];
        if (n) {
          const e = n.indexOf(t);
          e >= 0 && n.splice(e, 1);
        }
      }
      emit(e, ...t) {
        const n = this.events[e];
        if (n) for (const e of n) if (e(...t)) return true;
        return false;
      }
    };
    window.requestFileSystem || (window.requestFileSystem = window.webkitRequestFileSystem);
    const Gi = di.images, Zi = window.CodeMirror, Si = window.MirrorFrame;
    window.setTimeout = Ct, window.Hinter = {hint: (e, t) => {
      const n = vt(), r = n.promise(), i = t || {}, o = i.options || Yr;
      let s;
      if (i.config ? (s = JSON.parse(JSON.stringify(i.config)), "object" != typeof s && (s = {})) : s = JSON.parse(JSON.stringify(Wr)), i.userscript || i.external) {
        const e = {};
        S(qr, t => {
          e[t] = "writeable";
        }), s.globals = {...e};
      }
      if (i.userscript && (s.rules = {...Xr, ...s.rules}), e) if (Qr) {
        const t = () => {
          const e = new x("lint.js");
          e.onmessage = e => {
            const t = e.data, {results: n, id: r} = t;
            let o, s;
            r && (o = Kr[r]) && (s = o.d) && (delete Kr[r], n ? s.resolve(ei(n)) : s.reject(t.error || "Unknown error")), i(!!r);
          };
          const t = {method: "base_uri", value: be.getURL("/")};
          return e.postMessage(t), $r = void 0, e;
        }, i = e => {
          if (Jr = Jr || t(), e) $r = void 0; else if ($r) return;
          let n, r = Date.now();
          if (Object.keys(Kr).forEach(e => {
            Kr[e].ts <= r && (n = Kr[e], r = n.ts);
          }), n) {
            $r = n.id;
            const e = {method: n.method, id: n.id, config: n.c, options: n.o, text: n.t};
            Jr.postMessage(e);
          }
        };
        r.abort = () => {
          Jr && (Jr.terminate(), Jr = void 0, i());
        }, Jr || t();
        const a = T(), l = {method: "lint", id: a, d: n, t: e, c: s, o, ts: Date.now()};
        Kr[a] = l, i();
      } else we("vendor/eslint/eslint", () => {
        try {
          const t = ((e, t, n) => {
            const r = self.eslint, i = {problem: "error", layout: 1, suggestion: 1}, o = new r.Linter;
            if (o.defineRules(zr.rules), t.extends && t.extends.includes("eslint:recommended")) {
              const e = t.rules = t.rules || {};
              o.getRules().forEach(function (t, n) {
                if (!t || void 0 !== e[n]) return;
                const r = t.meta;
                if (!r) return;
                const o = r.docs;
                if (!o || !o.recommended) return;
                let s;
                const a = [(r.type ? i[r.type] : null) || 1], l = r.schema;
                if (l) {
                  const e = {};
                  (Array.isArray(l) ? l : [l]).forEach(t => {
                    if ("object" != t.type) return;
                    const n = t.properties;
                    n && Object.entries(n).forEach(([t, n]) => {
                      const r = n.default;
                      void 0 !== r && false !== r && (e[t] = n.default, s = true);
                    });
                  }), s && a.push(e);
                }
                e[n] = a;
              });
            }
            return o.verify(e, t, n);
          })(e, s, o);
          n.resolve(ei(t || []));
        } catch (e) {
          n.reject(e.message);
        }
      }); else n.resolve([]);
      return r;
    }};
    const Bi = () => {
      mt(() => {
        const e = {};
        let t = {};
        const n = [], r = {}, i = {};
        let s = {}, l = {};
        const d = {}, A = (() => {
          let e, t, n, r, i, o;
          if ((e = ue.LOCALSTORAGE) && (t = e.getItem("export_tm_settings"), n = "true" === t, t = e.getItem("export_externals"), r = "false" !== t, t = e.getItem("export_script_storage"), o = "false" !== t, i = e.getItem("cloud_config"))) try {
            i = JSON.parse(V(i));
          } catch (e) {}
          return {script_storage: o, add_tm_settings: n, include_externals: r, cloud_config: i};
        })();
        let c;
        const u = {}, h = function (e, t) {
          let n, r;
          if ((n = u[e]) && (r = n[t])) return r.apply(this, [].slice.call(arguments, 2));
        }, p = e => {
          const t = e.msg || e;
          if (e.once) {
            if (i[t]) return true;
            i[t] = true;
          }
          let n = confirm(t), r = {};
          return n && e.ok ? r = e.ok : !n && e.cancel && (r = e.cancel), (e.ok || e.cancel) && (n = true), r.url && sendMessage({method: "newTab", url: r.url}, () => {}), n;
        }, f = (e, t) => {
          try {
            const n = () => {};
            t ? sendMessage({method: "newTab", url: e}, n) : fe.tabs.getSelected(null, r => {
              "function" == typeof n && (r = n, n = {}), fe.tabs.sendMessage(r.id, {method: "loadUrl", url: e, newtab: t}, n, r);
            });
          } catch (e) {
            console.log("lU: " + e.message);
          }
        }, m = (e, t, n, r, i) => {
          r = r || {};
          const o = bi.createImage(r.default_icon || ut.images.empty, void 0, n, t, r.title, i);
          if (o.inserted) return o;
          Array.isArray(e) || (e = e ? [e] : []);
          const s = async () => {
            if (0 == e.length) {
              if (r.fill_with_question_mark && o.parentNode) {
                const e = bi.createIcon(Gi.get("question_mark"), t + "_ico", n);
                o.parentNode.insertBefore(e, o), o.parentNode.removeChild(o);
              }
              return;
            }
            const i = e.shift();
            let a, l;
            if (i.startsWith("data:") ? a = i : l = de.SHARED_OBJECT_URLS || de.SHARED_BLOBS ? await (e => {
              const t = vt();
              return sendMessage({method: "imageUrlToTransferable", url: e}, e => {
                t.resolve(Bn.fromTransferableData(e.transferable));
              }), t.promise();
            })(i) : await Ci(i), a) o.setAttribute("src", a); else if (l) {
              if (l.tryObjectUrl) o.setAttribute("src", l.tryObjectUrl); else if (l.tryDataUri) o.setAttribute("src", l.tryDataUri); else if (l.tryBlob) {
                const e = URL.createObjectURL(l.tryBlob);
                o.setAttribute("src", e), o.onload = () => URL.revokeObjectURL(e);
              }
            } else await s();
          };
          return s(), r.title && (o.title = r.title), o;
        };
        let g = false;
        const _ = e => {
          if (g) return;
          const t = je, n = et("<div>").hide(), r = e => {
            e ? (n.html(""), n.append(et('<div class="contrib_iframe" style="font-size: 2.5em;"></div>').append(et('<div style="padding-top: 150px;">').text(e))), window.setTimeout(r, 1e3)) : (n.fadeOut(1e3), window.setTimeout(ot.hideDialog, 1e3));
          }, i = et('<iframe src="https://www.tampermonkey.net/contrib.php?embedded=2' + (t ? "&locale=" + t : "") + "&src=" + (e || "e") + Se.short_id + '" class="contrib_iframe"></iframe>'), o = [et('<button class="contrib_button">').html(We("Remind_me_later")).on("click", () => {
            W("later"), r(We("Ok"));
          }), et('<button class="contrib_button">').html(We("I_contributed_already")).on("click", () => {
            W("contributed"), r(We("Thank_you_very_much_"));
          }), et('<button class="contrib_button">').html(We("I_dont_want_to_contribute")).on("click", () => {
            W("hide"), r(We("Ok"));
          })], s = () => {
            a && window.clearTimeout(a), o.forEach(e => {
              e.prop("disabled", false);
            });
          };
          o.forEach(e => {
            e.prop("disabled", true);
          }), n.append(i, o), i.bind("load", s);
          let a = window.setTimeout(() => {
            a = null, s();
          }, 15e3);
          const l = () => {
            const e = ot.dialog(n[0]);
            true === e ? (n.fadeIn(1e3), W("dialog")) : void 0 === e && window.setTimeout(l, 500), g = true;
          };
          l(), window.addEventListener("message", e => {
            let t;
            const i = e.data.clicked || e.data.type, o = e.data.amount, s = e.data.currency, a = e.data.redirect_url;
            if (i) if (a && f(a, true), e.data.success) {
              t = et(".contrib_iframe");
              const n = t.data("oheight");
              if (!n || n < 0 || n > 1e3) return;
              t.animate({height: n}, 1e3), W("contributed", i, {id: e.data.id});
            } else e.data.clicked && (W("clicked", i, {amount: o || "?", currency: s || "?"}), et(".contrib_button").remove(), n.append(et('<button class="contrib_button">').text(We("Ok")).on("click", () => {
              r();
            })), e.data.enlarge && (t = et(".contrib_iframe"), t.data("oheight", t.height()), t.animate({height: 740}, 1e3)));
          }, false);
        }, b = e => {
          const t = vt(), n = new FileReader;
          return n.onloadend = function () {
            t.resolve(this.result);
          }, n.onerror = () => t.reject(n.error), n.onabort = () => t.reject("aborted"), n.readAsBinaryString(e), t.promise();
        }, v = () => {
          if (ue.LOCALSTORAGE) return ue.LOCALSTORAGE.getItem("sort_key");
        }, k = () => {
          if (ue.LOCALSTORAGE) return ue.LOCALSTORAGE.getItem("sort_sequence");
        }, y = e => {
          if (ue.LOCALSTORAGE) return ue.LOCALSTORAGE.setItem("sort_key", e);
        }, w = e => {
          if (ue.LOCALSTORAGE) return ue.LOCALSTORAGE.setItem("sort_sequence", e);
        }, R = e => {
          const t = (e, n) => e.tagName == n ? e : e.parentNode ? t(e.parentNode, n) : null;
          let n = "down" == k(), r = null, i = [], o = 0;
          const a = Date.now();
          Object.keys(s).forEach(e => {
            const n = s[e];
            if (!n) return void console.warn("options: something went wrong!", e);
            const l = t(n.dom, "TR");
            if (l) {
              const e = t(l, "TBODY");
              let s, d;
              r ? e && r != e && console.warn("options: different parents?!?!") : r = e, o++, (!(s = n.script.lastModified || n.script.lastUpdated) || (d = a - parseInt(s)) && isNaN(d)) && (d = 0);
              const {code: A, resources: c, requires: u} = Fe(n.script), h = A + c + u;
              i.push({tr: l, sites: x.get(n.script), enabled: n.script.enabled, size: h, position: n.script.position ? n.script.position : 1e3 + o, name: qe(n.script, "name").toLowerCase(), homepage: [n.script.origin ? Vt(n.script.origin.url).hostname : "z", Ue(n.script) ? Vt(Ue(n.script)).hostname : "z"].join("_"), updated: d, version: n.script.version || ""}), l.inserted = false, l.parentNode && l.parentNode.removeChild(l);
            } else console.log("options: unable to sort script at pos " + n.pos);
          }), i = (e => {
            let t;
            const r = e => (t, n) => t[e] - n[e], i = v();
            var o, s;
            return "pos" == i ? t = r("position") : "enabled" == i ? (o = "enabled", s = n, t = (e, t) => {
              const n = (s ^ e[o] ? "a" : "b") + e.name, r = (s ^ t[o] ? "a" : "b") + t.name;
              return n < r ? -1 : n > r ? 1 : 0;
            }, n = null) : t = "ver" == i ? (e => (t, n) => li(String(t[e]), String(n[e])))("version") : "size" == i ? r("size") : "updated" == i ? r("updated") : (e => (t, n) => t[e] < n[e] ? -1 : t[e] > n[e] ? 1 : 0)(i), e.sort(t), e;
          })(i), n && (i = i.reverse());
          for (let e = 0; e < o; e++) r.appendChild(i[e].tr);
          et(".sorting").each((e, t) => {
            et(t)["pos" == v() && "up" == k() ? "fadeIn" : "fadeOut"]();
          }), e && e();
        }, C = Et({timeout: 600, check_interval: 300, retimeout_on_get: true}).init(), x = (() => {
          let e = {};
          const t = e => e.toString().length < 7 ? t("0" + e) : e, n = e => {
            if (e.includes || e.matches) {
              const t = {}, n = [], r = e.includes.length ? e.includes : e.matches;
              for (let i = 0; i < r.length; i++) {
                const o = r[i];
                if (!o) {
                  console.log("o: Warn: script '" + e.name + "' has invalid include (index: " + i + ")");
                  continue;
                }
                const s = C.get(o), a = (void 0 !== s ? s : null) || bi.getInfoFromUrl(o);
                void 0 === s && C.set(o, a), a && a.dom ? t[a.dom] || (t[a.dom] = true, n.push({include: o, info: a})) : n.push({include: o});
              }
              return n;
            }
          };
          return {init: function (t) {
            e = {}, t.forEach(t => {
              const r = n(t);
              r && r.length && r.forEach(t => {
                t.info && (e[t.info.dom] = (e[t.info.dom] || 0) + 1);
              });
            });
          }, get: function (r) {
            const i = n(r);
            if (!i || !i.length) return t(0);
            const o = i.map(t => t.info ? {score: 1e3 * e[t.info.dom] + t.info.dom.charCodeAt(0) || 0, dom: t.info.dom} : {score: 0, dom: ""}).sort((e, t) => t.score - e.score)[0];
            return t(o.score) + o.dom;
          }, topIcons: function (t, r) {
            let i;
            const o = [], s = n(t);
            if (!s || !s.length) return [];
            const a = s.map(t => (t.score = t.info && e[t.info.dom] || 0, t)).sort((e, t) => t.score - e.score);
            return S(a, e => {
              const n = e.info;
              if (0 == r--) {
                const e = te("span", "", t.uuid, "tbc");
                return e.textContent = "...", o.push(e), false;
              }
              if (!n) return i = bi.createIcon(Gi.get("question_mark"), "favicon", t.uuid, e.include, e.include), void o.push(i);
              if ("*" == n.tld) return i = bi.createIcon(Gi.get("web"), "web", t.uuid, e.include, e.include), o.push(i), false;
              let s = "com", a = "";
              "*" != n.tld && "tld" != n.tld && (s = n.tld), n.subdom.length && (a = n.subdom.join(".") + ".");
              const l = (a + n.dom + "." + s).replace(/\*|^\./g, ""), [d, A] = Me(l);
              i = m([d, A].filter(e => e), "favicon", t.uuid, {fill_with_question_mark: true, title: e.include}), o.push(i);
            }), o;
          }};
        })();
        let E = null;
        const U = () => {
          E && (window.clearTimeout(E), E = null);
        }, O = e => {
          let t;
          const n = e.key || "general";
          (t = lt[n]) && et(t).remove(), lt[n] = bi.createGobalHint({onclose: () => {
            sendMessage({method: "clearHint", key: n}, () => null);
          }, ...e}, et("body > div.status")[0]);
        }, L = (e, t, n, r) => {
          void 0 === r && (r = 3e3), O({key: "success", text: e, image: t, class: n, delay: 500, timeout: r, done: () => {}});
        }, j = () => {
          L(We("Operation_completed_successfully"), "button_ok", "notice");
        }, D = (e, t) => {
          void 0 === t && (t = "button_ok"), L(e, t, "information", 8e3);
        }, z = (e, t) => {
          void 0 === t && (t = "error"), L(e, t, "warning", 8e3);
        }, N = e => {
          E || (E = window.setTimeout(() => {
            E = null, ot.wait(We("Please_wait___"));
          }, e || 500));
        };
        let Q = null, H = null;
        const X = (e, t) => {
          null != Q ? (window.clearTimeout(Q), Q = null, X(e || H.items, e ? t : H.with_scripts)) : (H = {items: e, with_scripts: t}, Q = window.setTimeout(() => {
            Q = null, H.with_scripts && (s = {}, l = {}), Ge(H.items), H = null;
          }, 50));
        }, W = (e, t, n) => {
          const r = vt();
          return sendMessage({method: "begEvent", action: e, type: t, extra: n}, e => {
            r.resolve(e);
          }), r.promise();
        }, Y = (e, t) => {
          let n = vt();
          try {
            const {json: r, code: i, url: o, data: s} = e;
            N();
            const a = Ze.connect("importEx");
            a.onMessage.addListener(e => {
              if (!n) return;
              const {items: t, reload: r, success: i, error: o, progress: s} = e;
              s ? n.notify(s) : (U(), o ? (n.reject(o), ot.hide()) : (r ? window.setTimeout(() => {
                ge();
              }, 500) : t ? (i ? j() : z(We("Action_failed")), X(t, true)) : ot.hide(), n.resolve(e)), n = null, a.disconnect());
            }), a.onDisconnect.addListener(() => {
              n && n.reject("communication lost");
            }), a.postMessage({method: "importEx", json: r, data: s, code: i, url: o, reload: t.reload});
          } catch (e) {
            console.log("sS: " + e.message), n.reject({err: e.message});
          }
          return n.promise();
        }, q = (e, t, n) => re({uuid: e}, t, n), re = (e, t, n) => {
          const r = vt();
          void 0 === n.reload && (n.reload = true);
          try {
            n.auto_save || N(), sendMessage({...e, method: "saveScript", code: t, clean: n.clean, force: n.force, new_script: n.new_script, auto_save: n.auto_save, restore: n.restore, lastModTime: n.lastModTime, reload: n.reload}, e => {
              n.auto_save || (j(), U()), (e = e || {}).items ? X(e.items, true) : ot.hide(), !t && n.reload && ot.hide(), r.resolve(e);
            });
          } catch (e) {
            console.log("sS: " + e.message), r.reject({err: e.message});
          }
          return r.promise();
        }, ie = (e, n, r) => {
          const i = vt();
          try {
            N(), sendMessage({method: "setOption", name: e, value: n}, e => {
              U(), j(), t = e.options || t, !r && e.items ? X(e.items, false) : ot.hide(), i.resolve(e);
            });
          } catch (e) {
            console.log("sO: " + e.message), i.reject({err: e.message});
          }
          return i.promise();
        }, oe = e => {
          const t = vt();
          try {
            N(), sendMessage({method: "purgeScripts", uuids: e}, e => {
              U(), e.items ? (j(), X(e.items, false)) : ot.hide(), t.resolve(e);
            });
          } catch (e) {
            console.log("sO: " + e.message), t.reject({err: e.message});
          }
          return t.promise();
        }, se = (e, t, n) => {
          const r = vt();
          try {
            let i;
            N(), "run_sync" === e && (i = e => ot.wait(e.text), Ei.on("syncProgressEvent", i)), sendMessage({method: "buttonPress", name: e, data: t}, t => {
              "run_sync" === e && Ei.off("syncProgressEvent", i), U(), !n && t.items ? (j(), X(t.items, false)) : ot.hide(), r.resolve(t);
            });
          } catch (e) {
            console.log("sO: " + e.message), r.reject({err: e.message});
          }
          return r.promise();
        }, ae = (e, t) => {
          N(), sendMessage({method: "loadTree", complete: e.complete, uuid: e.uuid, url: e.url, referrer: e.referrer, layout: e.layout, filter: e.filter}, e => {
            U(), e.items || (e.error ? $(e.error) : confirm(Ye("An_internal_error_occured_Do_you_want_to_visit_the_forum_")) && (window.location.href = "https://www.tampermonkey.net/bug")), t(e);
          });
        }, le = () => {
          const e = Ze.connect("syncInfo");
          e.onMessage.addListener(e => {
            e && Ei.emit("syncProgressEvent", e.info);
          }), e.onDisconnect.addListener(() => {
            setTimeout(le, 500);
          }), e.postMessage({method: "syncInfo"});
        }, Ae = () => {
          vt.onebyone(["options.scripts", "options.trash"].map(e => () => {
            const t = vt();
            return ae({referrer: e}, e => {
              t.resolve(e.items || []);
            }), t.promise();
          })).then(e => {
            const t = e.reduce((e, t) => e.concat(t), []).filter(e => e);
            t && t.length ? X(t, true) : ot.hide();
          });
        }, ce = (e, n, r) => {
          null == r && (r = true);
          try {
            const i = {method: "modifyScriptOptions", uuid: e, reload: r};
            for (const e in n) n.hasOwnProperty(e) && (i[e] = n[e]);
            N(), sendMessage(i, e => {
              U(), t = e.options || t, e.i18n && Je(e.i18n), j(), e.items ? X(e.items, true) : ot.hide();
            });
          } catch (e) {
            console.log("mSo: " + e.message);
          }
        }, he = (e, t, n) => {
          try {
            const r = {method: "saveStorageKey", uuid: e, key: t, value: n, id: "options"};
            N(), sendMessage(r, () => {
              U(), j(), ot.hide();
            });
          } catch (e) {
            console.log("sSk: " + e.message);
          }
        }, pe = window.navigator.userAgent.includes("Mac") ? "mac" : "other";
        let fe;
        window.addEventListener("keydown", e => {
          let t, n, r = false;
          if ("keydown" == e.type && !e.defaultPrevented) {
            if (27 == e.keyCode) {
              if (t = c.getTabById("dashboard"), !t.isSelected()) return;
              if (e.target && "text" == e.target.type) return void et(e.target).trigger("blur");
              u.multiselect.toggleRow(false), r = true;
            } else ("mac" != pe && 39 == e.keyCode || "mac" == pe && 40 == e.keyCode) && !e.ctrlKey && e.altKey && !e.shiftKey ? (n = c.getNextTab(), n && (n.select(), r = true)) : ("mac" != pe && 37 == e.keyCode || "mac" == pe && 38 == e.keyCode) && !e.ctrlKey && e.altKey && !e.shiftKey && (n = c.getPreviousTab(), n && (n.select(), r = true));
            return r ? (e.stopPropagation(), e.preventDefault(), false) : void 0;
          }
        }, true), window.addEventListener("keydown", e => {
          let t, n, r = false;
          if ("keydown" == e.type && !e.defaultPrevented) {
            if (112 == e.keyCode) t = c.getTabById("help"), t && t.select(), r = true; else if (38 != e.keyCode && 40 != e.keyCode || !e.shiftKey) {
              if (70 == e.keyCode && (e.ctrlKey || e.metaKey)) {
                if (t = c.getTabById("dashboard"), !t.isSelected()) return;
                u.multiselect.toggleRow(true, true), r = true;
              } else if (65 == e.keyCode && (e.ctrlKey || e.metaKey)) {
                if (t = c.getTabById("dashboard"), !t.isSelected() || e.target && "text" == e.target.type) return;
                u.multiselect.un_selectAll(true), r = true;
              }
            } else {
              if (t = c.getTabById("dashboard"), !t.isSelected()) return;
              let i = rt.length && rt[rt.length - 1];
              i && (i = et(i)) && (() => {
                r = true;
                const t = i.closest("tr");
                if (!t.length) return;
                let o, s;
                if (38 == e.keyCode ? (n = et(t.prevAll("tr").filter(e => et(e).is(":visible"))[0]), o = true) : (n = et(t.nextAll("tr").filter(e => et(e).is(":visible"))[0]), o = false), !n.length) return;
                const a = n.find('input[name="scriptselectors"]');
                if (rt.includes(a[0]) ? (rt.pop(), i.prop("checked", false), i.removeClass("selected"), s = i) : a.length && (a.prop("checked", true), a.addClass("selected"), rt.push(a[0]), void 0 === rt.direction && (rt.direction = o), s = a), s) {
                  const e = et(".scripttable").parent().get(0), {top: t, bottom: r} = e.getBoundingClientRect(), i = n, s = 3 * i.height(), a = e.scrollTop;
                  if (!bi.isScrolledIntoView(i, e, {padding: o ? {top: s} : {bottom: s}})) {
                    const n = o ? i.offset().top - t - s - i.height() : i.offset().top - t - (r - t) + s + 2 * i.height(), l = Math.floor(a + n);
                    et(e).animate({scrollTop: l}, 0);
                  }
                  u.multiselect.single_click();
                }
              })();
            }
            return r ? (e.stopPropagation(), e.preventDefault(), false) : void 0;
          }
        }, false), document.addEventListener("dragover", e => e.preventDefault()), document.addEventListener("drop", async e => {
          try {
            const t = e.dataTransfer.files[0];
            if (!t) return;
            const n = await new Bn({blob: t}).toTransferableData();
            se("installFromUrl", {transferable: n}), e.preventDefault();
          } catch (e) {}
        }, true);
        const me = (() => {
          const e = {}, t = () => {
            fe = K(true), Object.keys(e).forEach(t => {
              const n = e[t];
              o.is(n.main, n.sub) && n.fn();
            });
          };
          let r;
          t(), window.onhashchange = function () {
            r || t.apply(this, arguments);
          };
          const i = e => {
            r = true, e(), r = false;
          }, o = {set: function (e) {
            const n = o.get();
            let r;
            r = "object" == typeof e ? [e.main, e.sub].filter(e => e) : arguments, n.main === r[0] && n.sub === r[1] || (!r[0] && r[1] ? o.setSub(r[1]) : i(() => {
              window.location.hash = "nav=" + [].join.call(r, "+"), t();
            }));
          }, setSub: function (e) {
            const n = o.get();
            n.sub !== e && i(() => {
              window.location.hash = "nav=" + (n.main ? n.main : "") + "+" + e, t();
            });
          }, get: function () {
            const e = fe.nav ? fe.nav.split("+") : [];
            return {main: e[0], sub: e[1]};
          }, is: function (e, t) {
            const n = o.get(), r = !e || n.main === e, i = !t || n.sub === t;
            return r && i;
          }, isSub: function (e) {
            return o.is(null, e);
          }, registerListener: function (t, n, r) {
            void 0 === r && (r = n, n = null);
            const i = [t, n].join("+");
            return e[i] = {main: t, sub: n, fn: r}, o.is(t, n) && r(), i;
          }, unregisterListener: function (t) {
            delete e[t];
          }, clear: function () {
            o.set("");
          }}, s = o.get();
          return n.push(() => {
            const e = c.getTabById(s.main);
            if (e) return e.select(true);
            if (s.main) {
              const e = c.getTabById("dashboard");
              e && e.select(true), n.push(() => {
                window.setTimeout(() => {
                  o.set(s);
                }, 0);
              });
            } else window.onhashchange();
          }), o;
        })();
        n.push(() => {
          t.statistics_enabled && Cn.init("opt", true, {trackView: false, version: Ze.manifest.version});
        });
        const _e = (() => {
          let e = {};
          const t = {clear: () => {
            S(e, e => a(e)), e = {};
          }, is: (n, r) => {
            const i = void 0 !== e[n];
            return r && t.add(n), i;
          }, add: (n, r) => {
            t.is(n) && a(e[n]), e[n] = o(() => {
              delete e[n];
            }, r || 1e3);
          }};
          return t;
        })(), be = () => {
          for (; n.length;) try {
            n.shift()();
          } catch (e) {
            console.warn("doneListeners:", e);
          }
        }, ve = (e, t) => {
          const n = ne("input", e.name, e.id, "Save");
          return n.inserted || (n.type = "button", n.section = e, n.disabled = true, n.value = We("Save"), n.addEventListener("click", function () {
            if (t && t.warning && !p(t.warning)) return;
            const e = et(this.section).find("input, select, textarea").toArray(), n = [], r = [];
            for (let i = 0; i < e.length; i++) {
              let o = null;
              const s = e[i], a = s.key;
              if (!r.includes(s)) {
                if ("textarea" == s.tagName.toLowerCase()) if (s.named) {
                  const e = document.getElementsByName(s.name);
                  o = [], S(e, e => {
                    o.push({name: e.named_name, value: e.value}), r.push(e);
                  });
                } else if (s.array) o = s.value.split("\n").map(e => e.trim()).filter(e => e); else if (s.json) {
                  let e;
                  try {
                    o = (e = s.value) && (e = e.trim()) ? JSON.parse(e) : null;
                  } catch (e) {
                    return void $(We("Unable_to_parse_0name0", s.name));
                  }
                } else o = s.value; else if ("checkbox" == s.getAttribute("type")) o = s.checked; else if ("select" == s.getAttribute("type")) {
                  let e = 0;
                  s.selectedIndex >= 0 && s.selectedIndex < s.options.length && (e = s.selectedIndex), o = s[e] ? s[e].value : s.options[0].value;
                } else "button" == s.getAttribute("type") || (o = s.value);
                a && n.push(ie(a, o, t && t.reload));
              }
            }
            t && t.reload && (ot.wait(), vt.when(n).done(() => {
              ge();
            }));
          }, false)), n;
        }, ke = (r, i, o, a) => {
          let A, c, h, m, g, _, b = [];
          const C = (e, t) => {
            if (o) if (o.save_button) et(e).on("change", () => {
              o.save_button.disabled = false;
            }), et(t).on("input propertychange", () => {
              o.save_button.disabled = false;
            }); else {
              const e = "Section needs a save button!";
              console.error(e, o);
            }
          };
          if (i.divider) return null;
          if (i.image && (i.image_id = Gi.get(i.image)), i.checkbox) o && o.need_save ? i.enabler && (h = function () {
            const e = document.getElementsByName("enabled_by_" + this.key);
            S(e, e => {
              this.checked ? e.removeAttribute("disabled") : e.setAttribute("disabled", "disabled");
            });
          }, n.push(() => h.bind(A.input)())) : h = function () {
            let e = true;
            const t = this;
            t.warning && (e = p(t.warning), e || (t.checked = !t.checked)), e && ie(this.key, t.checked, t.reload).always(() => {
              t.reload && ge(500);
            });
          }, A = bi.createCheckbox(i.name, i, h), b.push(A.elem), o && o.save_button && C(null, A.input); else if (i.button) h = function () {
            let e = true;
            const t = this;
            t.warning && (e = p(t.warning)), e && se(t.key, t.data, t.ignore).always(() => {
              t.reload && ge(500);
            });
          }, A = bi.createButton(i.name, i, h), b.push(A); else if (i.status) {
            A = bi.createTextarea(i.name, i), A.textarea.setAttribute("readonly", true), A.textarea.setAttribute("class", "settingsta event_status"), d[i.event] && Ei.off(i.event, d[i.event]);
            const e = e => {
              A.textarea.value = (new Date).toLocaleString() + ": " + e.text + "\n" + A.textarea.value;
            };
            d[i.event] = e, Ei.on(i.event, e), b.push({element: A.elem, validation: A.label});
          } else if (i.named) A = bi.createNamedSettings(i.name, i), b.push({element: A.elem, validation: A.label}), C(null, A.textareas); else if (i.input) A = bi.createTextarea(i.name, i), b.push({element: A.elem, validation: A.label}), C(null, A.textarea); else if (i.text) A = bi.createInput(i.name, i), b.push(A.elem), C(A.input); else if (i.color) A = bi.createColorChooser(i.name, i), b.push(A.elem), C(A.input); else if (i.password) A = bi.createPassword(i.name, i), b.push(A.elem), C(A.input); else if (i.select) {
            c = function () {
              let e = true;
              const t = this;
              t.warning && (e = p(t.warning), e || (t.value = t.oldvalue)), e && ie(t.key, bi.getValue(t), t.reload).always(() => {
                t.reload && ge(500);
              });
            };
            const e = function () {
              let e = true;
              this.selectedOptions.length && this.selectedOptions[0].warning && this.selectedOptions[0].value !== this.oldvalue && (e = p(this.selectedOptions[0].warning), e || (this.value = this.previousValue || this.oldvalue)), this.previousValue = this.value;
            };
            o && o.need_save && (c = i.enabler ? function () {
              const e = document.getElementsByName("enabled_by_" + this.key), t = (this.selectedIndex < this.options.length ? this.options[this.selectedIndex] : this.options[0]).getAttribute("enables"), n = t ? JSON.parse(t) : {};
              S(e, e => {
                void 0 === n[e.key] || n[e.key] ? e.setAttribute("style", F) : e.setAttribute("style", M);
              });
            } : null), A = bi.createDropDown(i.name, i, i.select, c, e), b.push(A.elem), o && o.save_button && C(A.select), r && i.enabler && (() => {
              const e = c, t = A;
              n.push(() => {
                e.apply(t.select, []);
              });
            })();
          } else if (i.url) {
            const e = ne("a", i.name, i.id);
            e.href = "#", e.url = i.url, e.newtab = i.newtab, e.inserted || (c = function () {
              f(this.url, this.newtab);
            }, e.addEventListener("click", c)), e.textContent = i.name, b = Array(14), b[3] = e;
          } else if (i.main_menu_item) {
            g = ne("div", i.name, i.id), g.textContent = i.name;
            const s = ne("div", i.name, i.id, "tab_content"), d = ((e, r) => {
              const i = (e, t, n, r, i) => {
                let o;
                const s = te("th", "settingsth", e.name, e.id, t), a = te("a", "settingsth_a", e.name, e.id, t + "_a");
                a.setAttribute("name", "settingsth_a" + e.name);
                const l = te("a", "settingsth_a_up", e.name, e.id, t + "_a_up");
                l.setAttribute("name", "settingsth_a_up" + e.name);
                const d = te("a", "settingsth_a_down", e.name, e.id, t + "_a_down");
                d.setAttribute("name", "settingsth_a_down" + e.name);
                const A = () => {
                  ((t, n, r) => {
                    const i = document.getElementsByName("settingsth_a_up" + e.name), s = document.getElementsByName("settingsth_a_down" + e.name);
                    for (o = 0; o < i.length; o++) i[o].style.display = "none";
                    for (o = 0; o < s.length; o++) s[o].style.display = "none";
                    "up" == k() ? n.style.display = "" : r.style.display = "";
                  })(0, l, d);
                }, c = () => {
                  A();
                }, u = () => {
                  window.setTimeout(() => {
                    v() == r ? w("down" == k() ? "up" : "down") : y(r), R(c);
                  }, 0);
                };
                return s.inserted || (s.appendChild(a), s.appendChild(d), s.appendChild(l), a.addEventListener("click", u), l.addEventListener("click", u), d.addEventListener("click", u), a.textContent = n + " ", a.href = "#", l.innerHTML = "&#x25B4;", l.href = "#", d.innerHTML = "&#x25BE;", d.href = "#"), i && !v() ? (y(r), w("up"), window.setTimeout(A, 0)) : r == v() && window.setTimeout(A, 0), s;
              };
              let o, s, a, d, A, c;
              if (A = ne("tbody", e.name, e.id, "body"), c = ne("thead", e.name, e.id, "head"), "dashboard" == e.id) {
                const l = at(e), A = nt(e);
                o = ne("table", e.name, e.id, "main"), o.inserted || o.setAttribute("class", "scripttable multiselect");
                const h = te("th", "script_sel", e.name, e.id, "thead_sel");
                h.appendChild(l.selAllm);
                const p = te("th", "left", e.name, e.id, "thead_multi_action");
                p.setAttribute("colspan", de.MOBILE ? 3 : 11), p.appendChild(l.actionBox), p.appendChild(A);
                const f = te("th", "right", e.name, e.id, "thead_multi_close");
                f.appendChild(l.close), a = te("tr", "multiselectrow", e.name, e.id, "filler_multi"), a.appendChild([h, p, f]), d = te("tr", "multiselectscrolldummy", e.name, e.id, "scrolldummy");
                const m = te("th", "left", e.name, e.id, "scrolldummyth");
                m.setAttribute("colspan", de.MOBILE ? 3 : 11), d.appendChild([m]), s = te("tr", "scripttr multiselectreplaced", e.name, e.id, "filler");
                const g = te("th", "script_sel", e.name, e.id, "thead_sel");
                g.appendChild(l.selAll);
                const _ = i(e, "thead_pos", "#", "pos"), b = i(e, "thead_en", We("Enabled"), "enabled"), y = i(e, "thead_name", We("Name"), "name", true), w = te("th", "settingsth", e.name, e.id, "thead_del");
                if (w.textContent = We("Actions"), de.MOBILE) S([g, _, b, y, w], e => {
                  s.appendChild(e);
                }); else {
                  const r = i(e, "thead_ver", We("Version"), "ver"), o = i(e, "thead_size", We("Size"), "size"), a = te("th", "settingsth ", e.name, e.id, "thead_type"), l = te("span", "script_type", e.name, e.id, "thead_type_span");
                  l.textContent = We("Type"), a.appendChild(l);
                  const d = te("th", "settingsth", e.name, e.id, "thead_sync");
                  d.textContent = "";
                  const A = i(e, "thead_sites", We("Sites"), "sites");
                  A.width = "25%";
                  const c = te("th", "settingsth", e.name, e.id, "thead_features");
                  c.textContent = We("Features");
                  const u = i(e, "thead_homepage", We("Homepage"), "homepage"), h = i(e, "thead_updated", We("Last_updated"), "updated"), p = te("th", "settingsth", e.name, e.id, "thead_sort"), f = te("span", "sorting", e.name, e.id, "thead_sort_span");
                  f.textContent = We("Sort"), "pos" == v() && "up" == k() || f.setAttribute("style", "display: none;"), p.appendChild(f);
                  const m = () => {
                    t.sync_enabled && (d.textContent = We("Imported"));
                  };
                  n.push(m), S([g, _, b, y, r, o, a, d, A, c, u, h, p, w], e => {
                    s.appendChild(e);
                  });
                }
                c.appendChild([a, d, s]), s.inserted || (u.multiselect.checkScroll = () => {
                  const e = et(c), t = e.is(":visible") && et(a).is(":visible") && et(r).scrollTop() > 0;
                  e.toggleClass("multiscrolling", t);
                }, et(r).on("scroll", u.multiselect.checkScroll));
              } else if ("trash" == e.id) {
                o = te("table", "settingstable", e.name, e.id, "main");
                const t = te("tr", "", "tr_trash"), n = te("td", "", "td_trash"), r = te("div", "trash_actions", "div_trash_actions");
                n.appendChild(r), t.appendChild(n), o.appendChild(t);
                const i = bi.createButton("restore_all", `${e.uuid}_delall`, We("Restore_all"), () => {
                  if (confirm(We("Really_restore_all_userscripts_"))) {
                    const e = Object.keys(l);
                    re({uuids: e}, null, {reload: true, restore: true}), e.length && ot.wait();
                  }
                }), s = bi.createButton("delete_all", `${e.uuid}_delall`, We("Delete_all"), () => {
                  if (confirm(We("Really_delete_all_userscripts_"))) {
                    const e = Object.keys(l);
                    oe(e), e.length && ot.wait();
                  }
                });
                r.appendChild([i, s]);
              } else o = te("table", "settingstable", e.name, e.id, "main");
              return o.appendChild(c), o.appendChild(A), {table: o, head: c, body: A};
            })(i, s);
            s.appendChild(d.table);
            let A = null;
            const c = a.appendTab(i.id, g, s, t => {
              t.then(() => {
                A && (e.global ? A() : n.push(A)), me.set(i.id), document.title = i.name;
              });
            });
            me.registerListener(i.id, () => {
              c.select();
            }), i.hidden ? c.hide() : c.show(), i.referrer && (A = () => {
              A = null, N(50), ae({referrer: i.referrer}, e => {
                e.items && e.items.forEach(e => {
                  ke(r, e, o, a);
                }), be(), U(), ot.hide();
              });
            }), i.items && ye(d.body, i.items, null, a), !e.global && i.selected_default && n.push(() => {
              a.getSelectedTab() || c.select();
            });
          } else if (i.sub_menu_item) m = te("div", "section type_" + i.id, i.name, i.id, "section"), g = te("div", "section_head", i.name, i.id, "head"), _ = te("table", "section_content", i.name, i.id, "content"), g.textContent = i.name, m.appendChild(g), i.desc && bi.setHelp(i.desc, g, g, i), m.appendChild(_), i.need_save && (i.save_button = ve(_, i)), ye(_, i.items, i, a), i.save_button && _.appendChild(i.save_button), b.push(m); else if (i.userscript) if (i.deleted) {
            l[i.uuid] = {dom: r, script: i};
            const e = te("div", "trash_list", "deleted_scripts");
            e.appendChild(Pe(i, e, a)), e.inserted || te("td", "", "td_trash").appendChild(e);
          } else if (b = Ve(i, r, a), s[i.uuid] = {dom: r, script: i}, r.setAttribute("class", "scripttr"), i.nnew) r.setAttribute("style", "display: none;"); else {
            const t = "script_refresh";
            _e.is(t) || (n.push(() => {
              x.init(Object.values(s).map(e => e.script)), u.multiselect.single_click(), R(), e.scripts = true, _e.clear();
            }), _e.add(t));
          } else if (i.globalhint) O(B(i.options, {onclick: i.options.info_url ? () => {
            f(i.options.info_url, true);
          } : null})); else {
            const e = ne("span", "", i.uuid || i.id + i.name);
            e.textContent = i.name, b = Array(14), b[3] = e;
          }
          return b.forEach(e => {
            if (e) {
              if (void 0 !== i.level && (e.element || e).setAttribute("style", i.level > t.configMode ? M : ""), i.hint) {
                const t = ne("span", "", i.uuid || i.id + i.name, "hint");
                t.textContent = i.hint, e.appendChild(t);
              }
              i.validation && Re(i, e.validation || e.element || e), i.width && e.setAttribute("class", "width-172-" + i.width);
            }
          }), r && (_ = r.getAttribute("class"), g = " hide", false === i.visible ? _ = (_ || "") + g : _ && (_ = _.replace(g, "")), r.setAttribute("class", _)), b;
        }, ye = (e, t, n, r) => {
          Object.keys(t).forEach(i => {
            const o = t[i], s = e ? te("tr", "settingstr", o.uuid || o.id + o.name, "pi") : null, a = ke(s, o, n, r);
            a && a.length && (e && e.appendChild(s), S(a, (e, t) => {
              let n = e, r = "";
              "Object" === Z(e) && (n = e.element, r = e.style || "");
              const i = te("td", r + " settingstd", "", o.uuid || o.id + o.name, t);
              e && i.appendChild(n), s && s.appendChild(i);
            }));
          });
        }, Re = (e, t) => {
          let n;
          if (e.validation) {
            e.validation.url && (n = function () {
              f(this.url, true);
            });
            const r = bi.createAfterIcon(e, n);
            r && (r.url = e.validation ? e.validation.url : void 0, t.appendChild(r));
          }
        }, Ce = (e, t) => {
          const n = vt(), r = [];
          return ((e, t) => {
            const n = [];
            let r, i = vt();
            const o = e => {
              i && (e && i.reject(), r && r.disconnect(), i = null);
            };
            try {
              N(), r = Ze.connect("exportToJson"), r.onMessage.addListener(e => {
                if (i) if (e.partial && n.push(e.partial), e.done) {
                  const e = n.join("");
                  let t;
                  try {
                    t = JSON.parse(e);
                  } catch (e) {}
                  U(), ot.hide(), t ? i.resolve(t) : i.reject(), o();
                } else e.error && o(true);
              }), r.onDisconnect.addListener(() => {
                o(true);
              }), r.postMessage({method: "exportToJson", ids: e, options: t});
            } catch (e) {
              console.log("eJ: " + e.message), o(true);
            }
            return i.promise();
          })(e, t).done(e => {
            e.scripts.forEach(e => {
              e.uuid && e.userscript && !e.system && !e.nnew && (e.code && "" != e.code.trim() ? r.push((e => {
                const t = e => {
                  var t;
                  return e.url ? {meta: {name: null === (t = Vt(e.url)) || void 0 === t ? void 0 : t.pathname.split("/").pop(), url: e.url, sri: e.sri, ts: e.ts, mimetype: e.mimetype, modified: e.modified}, source: e.data.content} : void 0;
                };
                return {source: e.code, meta: {name: e.name, uuid: e.uuid, modified: e.lastModified, file_url: e.file_url && e.file_url.trim() ? e.file_url : void 0}, settings: {enabled: e.enabled, position: e.position}, resources: e.resources ? e.resources.map(t).filter(e => e) : [], requires: e.requires ? e.requires.map(t).filter(e => e) : [], storage: e.storage || {ts: 0, data: {}}, options: e.options};
              })(e)) : console.log("options: Strange script: " + e.name));
            }), n.resolve({scripts: r, global_settings: e.global_settings});
          }).fail(() => {
            n.reject();
          }), n.promise();
        };
        let xe = () => {
          if (de.SHARED_OBJECT_URLS || de.SHARED_BLOBS) return window.saveAs = async (e, t) => {
            const n = new Bn({blob: e});
            ((e, t, n) => {
              try {
                const {tfd: r} = e, i = {method: "download", details: {from: {tfd: r}, name: t, saveAs: true}, id: "options"};
                N(), sendMessage(i, e => {
                  U(), e.load ? j() : e.error && z(We("Action_failed")), ot.hide(), n && n();
                });
              } catch (e) {
                console.log("dDU: " + e.message);
              }
            })({tfd: await n.toTransferableData()}, t, () => n.dispose());
          }, vt.Pledge();
          {
            const e = vt();
            return we(["vendor/saveas/filesaver"], () => {
              xe = vt.Pledge, e.resolve();
            }), e.promise();
          }
        };
        const Ee = e => {
          const r = {name: "utils", id: "utils"}, i = ne("div", r.name, r.id, "tab_util_h"), o = i.textContent = We("Utilities"), s = ne("div", r.name, r.id, "tab_util");
          e.appendTab(r.id, i, s, e => {
            e.then(() => {
              me.set(r.id), document.title = o;
            });
          }).show();
          const a = te("div", "tv_util", r.name, r.id, "tab_util_cont");
          let l = () => {
            ((e, t) => {
              $n = e => {
                let t = vt();
                const n = Ze.connect("tabWatch");
                return n.onMessage.addListener(e => {
                  let r;
                  t && ((r = e.tab) ? t.notify(r) : (t.resolve(), t = null, n.disconnect()));
                }), n.onDisconnect.addListener(() => {
                  t && t.resolve();
                }), n.postMessage({method: "tabWatch", url: e.url, active: false}), {promise: t.promise(), close: function () {
                  t && t.resolve(), n.disconnect();
                }};
              }, ar = t;
            })(0, Ze.manifest.version), l = null;
          }, d = {};
          const c = e => {
            let t, n;
            return t = "webdav" == e && (n = A.cloud_config) ? {url: n.url, basic_auth: P(n.user + ":" + n.pass)} : {}, d[e] = d[e] || sr[e](t);
          }, u = () => Ce(null, {storage: A.script_storage, global_settings: A.add_tm_settings, externals: A.include_externals}).then(e => (ot.wait(), mr.zip.create(e.scripts, e.global_settings).progress(ot.wait).done(() => j()).fail(() => z(We("Action_failed"))))), h = e => {
            ot.wait();
            for (let t, n = 0; t = e[n]; n++) b(t).then(e => Y({data: e}, {reload: true})).progress(e => ot.wait(e)).fail(e => {
              z(e || We("Unable_to_parse_this_"));
            }).always(ot.hide);
          }, p = bi.createButton(r.name, r.id + "_i_ta", We("Import"), () => {
            Y({json: C.value}, {reload: true}).fail(e => {
              z(e || We("Unable_to_parse_this_"));
            });
          }), f = bi.createButton(r.name, r.id + "_i_cloud", We("Show_backups"), () => {
            ot.wait();
            const e = X.select.value, t = X.select.selectedOptions[0].text;
            l && l(), c(e).list().progress(e => {
              e.total > 0 && ot.wait(t + ": " + Math.floor(e.loaded / e.total * 100) + "%");
            }).then(e => (e = e.filter(e => e.name.match(/\.zip$/))).length ? e : vt.Breach("empty")).then(t => {
              const n = vt(), i = T(), o = te("table", "nowrap file_select", "table", i), s = ne("thead", "thead", i);
              o.appendChild(s);
              const a = ne("th", "thead_th", i);
              a.setAttribute("colspan", "3"), s.appendChild(a);
              const l = ne("span", "thead_span", i);
              l.textContent = We("Please_select_a_file"), a.appendChild(l), t.sort((e, t) => e.modified - t.modified).forEach((t, r) => {
                const s = et('<input class="button" type="button" value="' + We("Import") + '">').on("click", () => {
                  n.resolve(t), ot.hideDialog(), ot.wait();
                }), a = et('<input class="button" type="button" value="' + We("Delete") + '">').on("click", () => {
                  et(l).hide(), c(e).delete(t);
                }), l = ne("tr", "tr", r, i);
                o.appendChild(l), [t.name, di.formatBytes(t.size, 2), new Date(t.modified).toLocaleString().replace((new Date).toLocaleDateString(), We("Today")), [s, a]].forEach((e, t) => {
                  const n = ne("td", "td" + t, r, i);
                  l.appendChild(n), n.appendChild(et("<span>")[Array.isArray(e) ? "append" : "text"](e).get(0), true);
                });
              });
              const d = () => {
                n.reject("cancel"), ot.hideDialog();
              }, A = et('<input class="button" type="button" value="' + We("Cancel") + '">').on("click", d), u = ne("tfoot", "tfoot", i);
              o.appendChild(u);
              const h = ne("tr", "tfoot_tr", i);
              u.appendChild(h);
              const p = ne("td", "td", r, i);
              return p.setAttribute("colspan", "3"), h.appendChild(p), p.appendChild(A.get(0), true), window.setTimeout(() => A.trigger("focus"), 100), ot.hide(), ot.dialog(o, d), n.promise();
            }).then(n => c(e).get(n).progress(e => {
              e.total > 0 && ot.wait(t + ": " + Math.floor(e.loaded / e.total * 100) + "%");
            })).then(e => h([e])).fail(e => {
              let t;
              "empty" === e ? t = We("No_backups_found") : "cancel" == e || ("auth_failed" == e ? console.warn("cloud: Authentication failed") : t = We("Error") + ": " + (e || We("Action_failed"))), t && $(t), ot.hide();
            });
          }), m = bi.createButton(r.name, r.id + "_i_url", We("Install"), () => (ot.wait(), Y({url: he.value}, {reload: true}).progress(e => ot.wait(e)).fail(e => {
            z(e || We("Unable_to_parse_this_"));
          }).always(ot.hide))), g = bi.createButton(r.name, r.id + "_e_ta", We("Export"), () => {
            ot.wait(), Ce(null, {storage: A.script_storage, global_settings: A.add_tm_settings, externals: A.include_externals}).then(e => mr.json.create(e.scripts, e.global_settings)).done(e => {
              C.value = e, j();
            }).fail(() => z(We("Action_failed"))).always(ot.hide);
          }), _ = bi.createButton(r.name, r.id + "_e_file", We("Export"), () => {
            ot.wait(), Ce(null, {storage: A.script_storage, global_settings: A.add_tm_settings, externals: A.include_externals}).then(e => mr.json.create(e.scripts, e.global_settings).then(e => xe().done(() => {
              const t = new Blob([e], {type: "text/plain"});
              saveAs(t, I("tampermonkey-backup-chrome-" + (new Date).toISOString().replace(/[.:]/g, "-") + ".txt")), j();
            }))).fail(() => z(We("Action_failed"))).always(ot.hide);
          }), v = bi.createButton(r.name, r.id + "_e_zip", We("Export"), () => u().then(e => {
            xe().done(() => {
              saveAs(e, I("tampermonkey-backup-chrome-" + (new Date).toISOString().replace(/[.:]/g, "-") + ".zip"));
            });
          }).always(ot.hide)), k = bi.createButton(r.name, r.id + "_e_zip", We("Export"), () => {
            const e = vt(), t = X.select.value, n = X.select.selectedOptions[0].text;
            var r, i, o;
            return r = We("Name"), i = "backup-chrome-" + (new Date).toISOString().replace(/[.:]/g, "-"), o = r => {
              r ? e.consume((e => u().then(r => (ot.wait(n + "..."), l && l(), c(t).put(e + ".zip", r).progress(e => {
                e.total > 0 && ot.wait(n + ":" + Math.floor(e.loaded / e.total * 100) + "%");
              }))).fail(e => {
                $(We("Error") + ": " + (e || We("Action_failed")));
              }).always(ot.hide))(r)) : e.reject("aborted");
            }, setTimeout(() => {
              const e = prompt(r, i);
              o && o(e);
            }, 1), e.promise();
          }), y = bi.createCheckbox(We("Include_TM_settings"), {id: r.id + "_e_export_tm_settings", enabled: "true"}, function () {
            A.add_tm_settings = this.checked, ue.LOCALSTORAGE && ue.LOCALSTORAGE.setItem("export_tm_settings", A.add_tm_settings);
          });
          y.elem.setAttribute("style", "padding-left: 2px"), y.input.checked = A.add_tm_settings;
          const w = bi.createCheckbox(We("Include_script_storage"), {id: r.id + "_e_export_storage", enabled: "true"}, function () {
            A.script_storage = this.checked, ue.LOCALSTORAGE && ue.LOCALSTORAGE.setItem("export_script_storage", A.script_storage);
          });
          w.elem.setAttribute("style", "padding-left: 2px; display: inline"), w.input.checked = A.script_storage;
          const R = bi.createCheckbox(We("Include_script_externals"), {id: r.id + "_e_export_externals", enabled: "true"}, function () {
            A.include_externals = this.checked, ue.LOCALSTORAGE && ue.LOCALSTORAGE.setItem("export_externals", A.include_externals);
          });
          R.elem.setAttribute("style", "padding-left: 2px"), R.input.checked = A.include_externals;
          var C = te("textarea", "importta", r.name, r.id, "ta");
          C.setAttribute("spellcheck", "false");
          const x = te("div", "section", r.name, r.id, "ta"), E = te("div", "section_head", r.name, r.id, "head_ta"), G = te("div", "section_content", r.name, r.id, "content_ta");
          E.textContent = We("General"), G.appendChild(w.elem), G.appendChild(y.elem), G.appendChild(R.elem), x.appendChild(E), x.appendChild(G);
          const Z = te("div", "section", r.name, r.id, "ta"), B = te("div", "section_head", r.name, r.id, "head_ta"), U = te("div", "section_content", r.name, r.id, "content_ta");
          B.textContent = We("TextArea"), U.appendChild(g), U.appendChild(p), U.appendChild(C), Z.appendChild(B), Z.appendChild(U);
          const F = te("div", "section", r.name, r.id, "sb"), M = te("div", "section_head", r.name, r.id, "head_sb"), O = te("div", "section_content", r.name, r.id, "content_sb");
          M.textContent = We("Zip"), F.appendChild(M), F.appendChild(O), O.appendChild(v);
          const L = te("div", "section", r.name, r.id, "sb"), D = te("div", "section_head", r.name, r.id, "head_sb"), N = te("div", "section_content", r.name, r.id, "content_sb"), V = ue.LOCALSTORAGE, Q = function () {
            et(ee).toggle("webdav" === this.value);
            const e = c(this.value);
            et(re).toggle(e && !!e.revoke), V && V.setItem("cloud_type", this.value);
          };
          let H;
          V && (H = V.getItem("cloud_type"));
          var X = bi.createDropDown(We("Type"), {id: "cloud_type", value: H || "drive"}, [{name: We("Google_Drive"), value: "drive"}, {name: We("Dropbox"), value: "dropbox"}, {name: We("OneDrive"), value: "onedrive"}, {name: We("Yandex_Disk"), value: "yandex"}, {name: We("WebDAV"), value: "webdav"}].filter(e => e), Q);
          const W = e => function () {
            let t;
            d = {}, (A.cloud_config = A.cloud_config || {})[e] = this.value, (t = ue.LOCALSTORAGE) && t.setItem("cloud_config", P(JSON.stringify(A.cloud_config)));
          }, q = bi.createInput(We("URL"), {id: "select_cloud_url", uuid: r.uuid, value: (A.cloud_config ? A.cloud_config.url : null) || ""}, W("url")), J = bi.createInput(We("Login"), {id: "select_cloud_username", uuid: r.uuid, value: (A.cloud_config ? A.cloud_config.user : null) || ""}, W("user")), K = bi.createInput(We("Password"), {id: "select_cloud_password", uuid: r.uuid, password: true, value: (A.cloud_config ? A.cloud_config.pass : null) || ""}, W("pass")), ee = [q.elem, J.elem, K.elem];
          n.push(() => {
            Q.apply(X.select, []);
          }), D.textContent = We("Cloud"), L.appendChild(D), L.appendChild(N), N.appendChild([X.elem].concat(ee)), N.appendChild(k), N.appendChild(f);
          const re = bi.createButton("revoke_token_button", r.uuid, We("Revoke_Access_Token"), () => {
            l && l(), et(re).prop("disabled", true);
            const e = c(X.select.value);
            ot.wait(), e.revoke().then(() => kt(15e3)).done(j).fail(() => z(We("Action_failed"))).always(() => {
              ot.hide(), et(re).prop("disabled", false);
            });
          });
          N.appendChild(re);
          const ie = te("div", "section", r.name, r.id, "fi"), oe = te("div", "section_head", r.name, r.id, "head_fi"), se = te("div", "section_content", r.name, r.id, "content_fi");
          oe.textContent = We("File"), ie.appendChild(oe), ie.appendChild(se), se.appendChild(_);
          const ae = bi.createFileSelect("", {name: "file", id: r.id}, h), le = te("div", "section", r.name, r.id, "ifi"), Ae = te("div", "section_head", r.name, r.id, "head_ifi"), ce = te("div", "section_content", r.name, r.id, "content_ifi");
          ce.appendChild(ae.elem), Ae.textContent = We("Import_from_file"), le.appendChild(Ae), le.appendChild(ce);
          const he = te("input", "updateurl_input", r.name, r.id, "url");
          he.setAttribute("type", "text"), he.setAttribute("spellcheck", "false");
          const pe = te("div", "section", r.name, r.id, "ur"), fe = te("div", "section_head", r.name, r.id, "head_ur"), ge = te("div", "section_content", r.name, r.id, "content_ur");
          fe.textContent = We("Import_from_URL"), pe.appendChild(fe), pe.appendChild(ge), ge.appendChild(he), ge.appendChild(m), a.appendChild(x), "undefined" != typeof Blob && a.appendChild(L), a.appendChild(le), de.CAN_SAVEAS_ZIP && a.appendChild(F), "undefined" != typeof Blob && a.appendChild(ie), a.appendChild(Z), a.appendChild(pe), S([Z], e => {
            const n = " hide";
            let r = e.getAttribute("class");
            t.configMode < 50 ? r += n : r = r.replace(n, ""), e.setAttribute("class", r);
          }), s.appendChild(a);
        }, Ge = e => {
          ye(null, e, null, c), ot.hide(), be();
        }, Te = (e, t, n, r) => {
          void 0 === r && (r = {});
          const i = t.item, o = i.uuid + (r.orig || "") + t.id, s = (r.orig ? "orig_" : "use_") + t.id, a = e => "select_" + J(e, i.uuid) + "_sel1", l = te("div", "cludes", e, o, "cb1"), d = ne("span", e, o, "cb2");
          if (r.orig) {
            const n = function () {
              if ("checkbox" == this.type) {
                const e = {};
                e[this.key] = this.checked, ce(this.uuid, e);
              }
            }, r = "merge_" + t.id, o = !!(i.options && i.options.override && i.options.override[r]), s = bi.createCheckbox(e, {id: r, uuid: i.uuid, enabled: o}, n);
            d.appendChild(s.elem);
          } else d.textContent = e;
          const A = te("select", "cludes", s, i.uuid, "sel1");
          A.innerHTML = "", A.setAttribute("size", "6"), A.setAttribute("multiple", "true");
          for (let e = 0; e < n.length; e++) {
            const t = document.createElement("option");
            t.value = t.text = n[e], A.appendChild(t);
          }
          l.appendChild(d), i.desc && bi.setHelp(i.desc, l, d, i), l.appendChild(A);
          const c = e => {
            const t = [], n = e && e.options;
            for (let e = 0, r = n.length; e < r; e++) n[e].selected && t.push(n[e]);
            return t;
          }, u = () => {
            const e = a("use_" + ("excludes" == t.id ? "includes" : "excludes")), n = document.getElementById(e), r = c(A);
            let i = false;
            const o = "matches" == t.id;
            r.forEach(e => {
              const t = o ? "/" + Ut(e.value, true) + "/" : e.value;
              let r;
              e && !n.querySelector('option[value="' + t + '"]') && (r = e.cloneNode(true), o && (r.value = t, r.textContent = t), n.appendChild(r), i = true);
            }), i && g();
          }, h = () => {
            const e = prompt(We("Enter_the_new_rule"));
            if (e) {
              const t = document.createElement("option");
              t.value = t.text = e.trim(), A.appendChild(t), g();
            }
          }, p = () => {
            const e = A.options[A.selectedIndex];
            if (!e) return;
            const t = prompt(We("Enter_the_new_rule"), e.value);
            t && (e.value = e.text = t.trim(), g());
          }, f = () => {
            const e = c(A);
            let t = false;
            e.forEach(e => {
              e && (e.parentNode.removeChild(e), t = true);
            }), t && g();
          }, m = e => {
            const t = [];
            for (let n = 0; n < e.options.length; n++) t.push(e.options[n].value);
            return t;
          };
          var g = () => {
            const e = {includes: m(document.getElementById(a("use_includes"))), matches: m(document.getElementById(a("use_matches"))), excludes: m(document.getElementById(a("use_excludes"))), connects: m(document.getElementById(a("use_connects"))), temp_connects: m(document.getElementById(a("use_temp_connects"))), blockers: m(document.getElementById(a("use_blockers")))};
            return ce(i.uuid, e), true;
          };
          if (r.other_name) {
            const t = ne("button", e, o, "btn1", true);
            t.textContent = We("Add_as_0clude0", r.other_name), t.addEventListener("click", u, false), l.appendChild(t);
          } else if (!r.orig) {
            const t = ne("button", e, o, "btn2", true);
            t.textContent = We("Add") + "...", t.addEventListener("click", h, false), l.appendChild(t);
            const n = ne("button", e, o, "btn3", true);
            n.textContent = We("Edit") + "...", n.addEventListener("click", p, false), l.appendChild(n);
            const r = ne("button", e, o, "btn4", true);
            r.textContent = We("Remove"), r.addEventListener("click", f, false), l.appendChild(r);
          }
          return {elem: l};
        }, Ue = e => e.homepage ? e.homepage : e.namespace && 0 == e.namespace.search(/https?:\/\//) ? e.namespace : null, Fe = e => ({code: (e.code ? e.code : e).length, requires: (e.requires || []).reduce((e, {data: t}) => e + (t && t.content ? t.content : t).length || 0, 0), resources: (e.resources || []).reduce((e, {data: t}) => e + (t && t.content ? t.content : t).length || 0, 0)}), Me = e => {
          const n = "http://" + e + "/", r = "chrome://favicon/" + n;
          let i;
          return i = 0 == n.indexOf("http://userscripts.org/") || 0 == n.indexOf("http://userscripts.com/") ? Gi.origin("uso") : "native" == t.favicon_service ? n + "favicon.ico" : "duckduckgo" == t.favicon_service ? "https://icons.duckduckgo.com/ip2/" + encodeURIComponent(e) + ".ico" : "https://www.google.com/s2/favicons?sz=64&domain=" + encodeURIComponent(e), [i, r];
        }, Oe = (e, t) => {
          const n = ne("div", e.uuid, "script_setting_h"), r = ne("div", e.uuid, "script_settings_c");
          n.textContent = We("Settings");
          const i = function () {
            const e = {};
            if ("checkbox" == this.type) e[this.key] = !!this.checked, ce(this.uuid, e); else if ("button" == this.type) e[this.key] = !this.oldvalue, ce(this.uuid, e); else if ("text" == this.type || "textarea" == this.type || "select-one" == this.type) {
              const t = bi.getValue(this);
              e[this.key] = t, ce(this.uuid, e);
            }
          }, o = bi.createCheckbox(We("Enabled"), {id: "enabled", uuid: e.uuid, name: "upd", enabled: e.enabled}, i).elem, s = bi.createPosition(We("Position_") + ": ", {id: "position", uuid: e.uuid, name: "pos", pos: e.position, posof: e.positionof}, i), a = bi.createDropDown(We("Run_at"), {id: "run_at", uuid: e.uuid, name: "run-at", value: e.options.run_at}, [{name: "document-start", value: "document-start"}, {name: "document-body", value: "document-body"}, {name: "document-end", value: "document-end"}, {name: "document-idle", value: "document-idle"}, {name: "context-menu", value: "context-menu"}, {name: We("Default"), value: null}], i), l = bi.createDropDown(We("No_frames"), {id: "noframes", uuid: e.uuid, name: "no_frames", value: e.options.noframes}, [{name: We("Yes"), value: true}, {name: We("No"), value: false}, {name: We("Default"), value: null}], i), d = bi.createDropDown(We("Tab_types"), {id: "tab_types", uuid: e.uuid, name: "tab_types", value: e.options.tab_types}, [{name: We("Incognito_tabs"), value: "incognito"}, {name: We("Normal_tabs"), value: "normal"}, {name: We("All_tabs"), value: "incognito+normal"}, {name: We("Default"), value: null}], i), A = bi.createCheckbox(We("Check_for_Updates"), {id: "check_for_updates", uuid: e.uuid, name: "upd", enabled: e.options.check_for_updates}), c = bi.createInput(We("Update_URL_"), {id: "file_url", uuid: e.uuid, name: "uu", value: e.file_url});
          c.input.setAttribute("class", "updateurl_input"), c.elem.setAttribute("class", "updateurl"), e.is_external && c.input.setAttribute("readonly", "true");
          const u = t => (e.options && e.options.override ? e.options.override[t] : null) || [], h = Te(We("Original_includes"), {id: "includes", item: e}, u("orig_includes"), {orig: true, other_name: We("User_excludes")}), p = Te(We("Original_matches"), {id: "matches", item: e}, u("orig_matches"), {orig: true, other_name: We("User_excludes")}), f = Te(We("Original_excludes"), {id: "excludes", item: e}, u("orig_excludes"), {orig: true, other_name: We("User_includes")}), m = te("div", "clear", e.uuid, "clear"), g = Te(We("User_includes"), {id: "includes", item: e}, u("use_includes")), _ = Te(We("User_matches"), {id: "matches", item: e}, u("use_matches")), b = Te(We("User_excludes"), {id: "excludes", item: e}, u("use_excludes")), v = Te(We("Original_domain_whitelist"), {id: "connects", item: e}, e.connects, {orig: true}), k = Te(We("Temporary_domain_whitelist"), {id: "temp_connects", item: e}, e.temp_connects), y = Te(We("User_domain_whitelist"), {id: "connects", item: e}, u("use_connects")), w = Te(We("User_domain_blacklist"), {id: "blockers", item: e}, u("use_blockers")), R = [bi.createCheckbox(We("Apply_compatibility_options_to_required_script_too"), {id: "compatopts_for_requires", uuid: e.uuid, name: "", enabled: e.options.compatopts_for_requires}, i), bi.createCheckbox(We("Fix_wrappedJSObject_property_access"), {id: "compat_wrappedjsobject", uuid: e.uuid, name: "", enabled: e.options.compat_wrappedjsobject}, i), bi.createCheckbox(We("Convert_CDATA_sections_into_a_chrome_compatible_format"), {id: "compat_metadata", uuid: e.uuid, name: "", enabled: e.options.compat_metadata}, i), bi.createCheckbox(We("Replace_for_each_statements"), {id: "compat_foreach", uuid: e.uuid, name: "", enabled: e.options.compat_foreach}, i), bi.createDropDown(We("Add_GM_functions_to_this_or_window"), {id: "compat_powerful_this", uuid: e.uuid, name: "", value: e.options.compat_powerful_this, desc: We("Enabling_this_makes_it_easy_for_scripts_to_leak_it_s_granted_powers_to_the_page_Therefore__off__is_the_safest_option_", We("Off"))}, [{name: We("Auto"), value: null}, {name: We("On"), value: true}, {name: We("Off"), value: false}], i)], C = te("div", "section", e.uuid, "ta_opt"), x = te("div", "section_head", e.uuid, "head_ta_opt"), E = te("div", "section_content", e.uuid, "content_ta_opt");
          x.textContent = We("General"), C.appendChild(x), C.appendChild(E);
          const G = te("div", "section", e.uuid, "ta_upd"), Z = te("div", "section_head", e.uuid, "head_ta_upd"), S = te("div", "section_content", e.uuid, "content_ta_upd");
          Z.textContent = We("Updates"), G.appendChild(Z), G.appendChild(S);
          const B = te("div", "section", e.uuid, "ta_cludes"), I = te("div", "section_head", e.uuid, "head_ta_cludes"), T = te("div", "section_content", e.uuid, "content_ta_cludes");
          I.textContent = We("Includes_Excludes"), B.appendChild(I), B.appendChild(T);
          const U = te("div", "section", e.uuid, "ta_security"), F = te("div", "section_head", e.uuid, "head_ta_security"), M = te("div", "section_content", e.uuid, "content_ta_security");
          F.textContent = We("XHR_Security"), U.appendChild(F), U.appendChild(M);
          const O = te("div", "section", e.uuid, "ta_compat"), L = te("div", "section_head", e.uuid, "head_ta_compat"), j = te("div", "section_content", e.uuid, "content_ta_compat");
          L.textContent = We("GM_compat_options_"), O.appendChild(L), O.appendChild(j), E.appendChild(o), E.appendChild(s), E.appendChild(a.elem), E.appendChild(l.elem), E.appendChild(d.elem);
          const D = bi.createButton("save_update_button", e.uuid, We("Save"), () => {
            i.apply(A.input, []), e.is_external || i.apply(c.input, []);
          });
          S.appendChild([A.elem, c.elem, D]), T.appendChild([h.elem, p.elem, f.elem, m, g.elem, _.elem, b.elem]);
          const z = [v.elem, k.elem, y.elem, w.elem];
          et(z).addClass("domain"), M.appendChild(z);
          for (let e = 0; e < R.length; e++) j.appendChild(R[e].elem);
          const N = {name: "", uuid: e.uuid, id: "comment", value: e.options.comment}, P = bi.createTextarea(null, N);
          P.elem.setAttribute("class", "script_setting_wrapper");
          const V = ne("div", e.uuid, "save"), Q = bi.createButton("save_button", e.uuid, We("Save"), () => {
            i.apply(P.textarea, []);
          });
          V.appendChild(Q);
          const H = te("div", "section", e.uuid, "ta_comment"), X = te("div", "section_head", e.uuid, "head_ta_comment"), W = te("div", "section_content", e.uuid, "content_ta_comment");
          X.textContent = We("Comment"), H.appendChild(X), H.appendChild(W), W.appendChild(P.elem), W.appendChild(V);
          const Y = te("div", "section", e.uuid, "ta_det"), q = te("div", "section_head", e.uuid, "head_ta_det"), J = te("div", "section_content", e.uuid, "content_ta_det");
          q.textContent = We("Details"), Y.appendChild(q), Y.appendChild(J), q.textContent = We("Details");
          const K = te("table", "script_details", e.uuid, "script_details");
          [{label: We("Size"), value: di.formatBytes((e.code ? e.code : e).length, 2)}, {label: We("Last_updated"), value: new Date(e.lastModified || e.lastUpdated).toLocaleString()}, {label: We("UUID"), value: e.uuid}].forEach(t => {
            const n = te("tr", "external_desc", e.uuid, t.label, "tr"), r = te("td", "external_desc", e.uuid, t.label, "td1"), i = te("td", "", e.uuid, t.label, "td2");
            r.textContent = t.label, i.textContent = t.value, n.appendChild(r), n.appendChild(i), K.appendChild(n);
          }), J.appendChild(K), r.appendChild([Y, C, G, B, U, O, H]);
          const $ = t.appendTab("settings", n, r, e => {
            e.then(() => {
              me.setSub("settings");
            });
          });
          return me.registerListener(e.uuid, "settings", () => {
            $.select();
          }), {};
        }, Le = (e, t, n, r) => {
          const i = te("table", "externals", e.uuid, "outer_req2html", t, true);
          let o = 0;
          const s = [{label: We("URL"), prop: "display_url"}, {label: We("Size"), prop: "data", fn: function (e) {
            let t = "?";
            return e && (void 0 !== e.length ? t = e.length : void 0 !== e.content && (t = e.content.length)), di.formatBytes(t, 2);
          }}, {label: We("MIME_Type"), prop: "mimetype"}, {label: We("Subresource_Integrity"), prop: "sri", fn: function (e) {
            return e ? e.type + "=" + e.value : We("_not_set_");
          }}, {label: We("Last_updated"), prop: "ts", fn: function (e) {
            return e ? new Date(e).toString() : null;
          }}];
          if (s.push({label: We("User_modified"), prop: "modified", klass: "validation", title: We("This_external_resource_will_not_auto_update__Please_delete_it_in_order_to_enable_updates_again_"), icon: Gi.get("info"), fn: function (e) {
            return e ? We("Yes") : null;
          }}), e[t].forEach(a => {
            const l = o + J(a.url) + t;
            s.forEach(t => {
              let n;
              const r = te("tr", "", e.uuid, t.prop, "tr" + l), o = te("td", "external_label", e.uuid, t.prop, "td1" + l), s = te("td", "external_desc", e.uuid, t.prop, "td2" + l);
              if (o.textContent = t.label, s.textContent = n = (t.fn ? t.fn : e => e)(a[t.prop]), null !== n) {
                if (t.klass && et(s).addClass(t.klass), t.title && s.setAttribute("title", t.title), t.icon) {
                  const n = te("span", "validation", e.uuid, "validation", "span" + l);
                  n.appendChild(bi.createIcon(t.icon + " red", "warning", e.uuid, l + "no_require_update_warning")), s.appendChild(n);
                }
                r.appendChild(o), r.appendChild(s), i.appendChild(r);
              }
            });
            const d = te("tr", "external_desc_buttons", e.uuid, a.url, "tr" + l), A = te("td", "", e.uuid, "buttons", "td" + l);
            if (d.appendChild(A), i.appendChild(d), a.ts) {
              if ("requires" == t || a.viewable) {
                const t = ne("span", e.uuid, "edit_external" + l), i = bi.createImageTextButton(e.uuid, "edit_external" + l, a.editable ? We("Edit") : We("View"), "edit", () => {
                  De(n, e.uuid, a, r);
                });
                t.appendChild(i), A.appendChild(t);
              }
              const i = ne("span", e.uuid, "delete_external" + l), o = bi.createImageTextButton(e.uuid, "delete_external" + l, We("Delete"), "delete", () => {
                ((e, t) => {
                  try {
                    N(), sendMessage({method: "buttonPress", name: "externals_delete", scriptuid: e, safe_url: t}, e => {
                      U(), j(), e.items ? X(e.items, false) : ot.hide();
                    });
                  } catch (e) {
                    console.log("dEx: " + e.message);
                  }
                })(e.uuid, a.url), o.parentNode && o.parentNode.removeChild(o);
              });
              i.appendChild(o), A.appendChild(i);
            }
            o++;
          }), !o) {
            const t = te("tr", "script_desc", e.uuid, o, "tr"), n = te("td", "script_desc", e.uuid, o, "td1");
            n.textContent = We("No_entry_found"), t.appendChild(n), i.appendChild(t);
          }
          return i;
        }, De = (e, t, n, i) => {
          const o = "externals-" + t + "-" + n.url;
          u[o] = {};
          const s = Ne({uuid: o, script_uuid: t, readonly: !n.editable, mimetype: n.mimetype, name: We("Externals") + " - " + n.url, file_url: n.url, referrer: "options.scripts.userscripts"}, e, () => {
            i(s.getEditor());
          }, () => {
            delete r["tab" + o], delete r["editor" + o], delete u[o];
          });
          s.show();
        }, ze = (e, n, i) => {
          const o = te("tr", "editor_container p100100", e.uuid, "container"), s = i.mimetype || "text/javascript", a = !s || /(application|text)\/(?:x-)?(?:java|ecma)script/.test(s);
          if (!e.nnew && h(e.uuid, "lastI")) return r["editor" + e.uuid] || {};
          e.nnew && (e.code = (e => {
            const t = fe.url ? V(fe.url) : null;
            return e.replace("<$URL$>", t || "http://*/*").replace("<$ICON$>", t ? Me(Vt(t).domain)[0] : ut.images.empty);
          })(t.script_templates[0].value));
          const l = ne("div", e.uuid, "script_editor_h"), d = l.inserted, A = ne("div", e.uuid, "script_editor_c"), c = te("tr", "editormenubar", e.uuid, "container_menu"), p = te("tr", "editorbuttonbar", e.uuid, "container_button_menu"), f = te("table", "editor_container_o p100100 noborder", e.uuid, "container_o");
          f.appendChild(p), f.appendChild(c), f.appendChild(o), A.appendChild(f);
          const m = () => {
            let n = false;
            return o.editor && (t.editor_enabled ? n |= o.editor.changed && o.editor.mirror.historySize().undo : n = o.editor.value != e.code), n;
          }, g = () => {
            Zi.commands.trimTrailingSpacesIfEnabled(o.editor.mirror), h(e.uuid, "saveEm");
          }, _ = (e, t, n) => {
            i.do_close && i.do_close(t, n);
          }, b = n => {
            if ((n || confirm(We("Really_reset_all_changes_"))) && o.editor) {
              const n = e.code || "";
              t.editor_enabled ? (o.editor.mirror.setValue(n), v(false)) : o.editor.value = n;
            }
          }, v = e => {
            o.editor.changed != e && (i.set_tab_class && i.set_tab_class("modified", e), Q.toggleClass("modified", e)), o.editor.changed = e;
          }, k = () => {
            window.setTimeout(() => {
              let e;
              t.editor_enabled && (e = o.editor) && (ot.wait(), window.setTimeout(() => {
                (() => {
                  const t = e.mirror.performLint(true);
                  return t && t.then ? t : vt.Pledge(t);
                })().then(() => {
                  const t = e.mirror.state.lint ? e.mirror.state.lint.marked : null;
                  if (t && t.length) {
                    1 === t.length ? z(We("One_error_or_hint_was_found_")) : z(We("0count0_errors_or_hints_were_found_", t.length));
                    for (let n, r = 0; n = t[r]; r++) {
                      let t, r, i;
                      if (void 0 !== n.line && void 0 !== n.column ? (r = n.line, i = n.column) : n.lines && n.lines.length && (t = n.lines[0], r = t.lineNo() + 1, i = t.markedSpans && t.markedSpans.length ? t.markedSpans[0].from + 1 : 1), r && i) {
                        e.mirror.setCursor(r - 1, i - 1), e.mirror.focus();
                        break;
                      }
                    }
                  } else D(We("No_syntax_errors_were_found_"));
                  ot.hide();
                });
              }, 100));
            }, 0);
          }, y = te("td", "", e.uuid, "editor_buttonmenu_td");
          p.appendChild(y);
          const w = te("ul", "editormenu", e.uuid, "editormenu"), R = te("td", "", e.uuid, "editormenu_td");
          let C, x;
          R.appendChild(w);
          const E = (e, t) => {
            let n, r;
            e && (n = et(e), r = !!t && n.hasClass("visible")), et("ul.editormenu .submenu").removeClass("visible"), e ? (n.toggleClass("visible", !r), x = r ? null : e) : x = null, e && r || (C = e => {
              let t;
              C && (t = et(e.target)) && !t.closest(".editormenu").length && (E(), document.body.removeEventListener("click", C), C = null);
            }, document.body.addEventListener("click", C));
          }, G = (t, n) => {
            const r = te("li", "entry", e.uuid, t, "editormenuentry", true), i = ne("label", e.uuid, t, "editormenulabel_id");
            i.textContent = n;
            const o = te("table", "submenu noborder", e.uuid, "editormenucontent" + t);
            return r.appendChild([i, o]), r.addEventListener("click", e => {
              et(e.target).closest(".entry").hasClass("list") || E(o, true);
            }), r.addEventListener("mousemove", function () {
              x && x != this && E(o);
            }), {elem: r, content: o};
          }, Z = e => () => {
            o.editor.mirror.focus(), o.editor.mirror.execCommand(e);
          }, S = {file: {text: We("File"), entries: [].concat(e.readonly ? [] : [{text: We("Save"), command: "save", image: Gi.get("filesave"), cb: g}, {text: We("Save_to_disk"), command: "save_to_disk", image: Gi.get("save_to_disk"), cb: () => {
            h(e.uuid, "saveToDisk");
          }}, {type: "sep"}, {command: "cancel", text: We("Editor_reset"), image: Gi.get("editor_cancel"), cb: b}]).concat(e.nnew || e.is_external ? [] : [{text: We("Check_for_Updates"), command: "update", image: Gi.get("update"), disabled: (!e.options.check_for_updates || !e.file_url || "none" == e.file_url) && We("Update_check_is_disabled"), cb: () => {
            m() && !confirm(We("Really_reset_all_changes_")) || (b(true), h(e.uuid, "scriptUpdate"));
          }}, {text: We("Remove"), command: "remove", image: Gi.get("delete"), cb: () => {
            _(0, true, false), u[e.uuid].deleteScript();
          }}]).concat([{type: "sep"}, {text: We("Close"), command: "close", image: Gi.get("exit"), cb: _}])}, edit: e.readonly || !t.editor_enabled ? void 0 : {text: We("Edit"), entries: [{text: We("Undo"), command: "undo"}, {text: We("Redo"), command: "redo"}, {type: "sep"}, {text: We("Select_All"), command: "selectAll"}, {type: "sep"}, {text: We("Toggle_Comment"), command: "toggleComment"}, {text: We("Toggle_Comment_Indented"), command: "toggleCommentIndented"}, {text: We("Toggle_Block_Comment"), command: "toggleBlockComment", modes: ["js"]}, {type: "sep"}, {id: "edit_lines", text: We("Lines_Menu"), modes: ["js"], entries: [{text: We("Indent"), command: "intelligentTab"}, {text: We("Indent_Less"), command: "indentLess"}, {text: We("Indent_More"), command: "indentMore"}, {text: We("Auto_Indent_all"), command: "reindentall"}, {type: "sep"}, {text: We("Move_Line_Up"), command: "swapLineUp"}, {text: We("Move_Line_Down"), command: "swapLineDown"}, {text: We("Duplicate_Lines"), command: "duplicateLine"}, {text: We("Delete_Line"), command: "deleteLine"}, {text: We("Join_Lines"), command: "joinLines"}, {type: "sep"}, {text: We("Insert_Line_Before"), command: "insertLineBefore"}, {text: We("Insert_Line_After"), command: "insertLineAfter"}]}, {id: "edit_text", text: We("Text"), entries: [{text: We("Upper_Case"), command: "upcaseAtCursor"}, {text: We("Lower_Case"), command: "downcaseAtCursor"}, {type: "sep"}, {text: We("Delete_Line_Left"), command: "delLineLeft"}, {text: We("Delete_Line_Right"), command: "delLineRight"}, {text: We("Delete_to_Previous_Word_Boundary"), command: "delGroupBefore"}, {text: We("Delete_to_Next_Word_Boundary"), command: "delGroupAfter"}, {text: We("Delete_Line"), command: "deleteLine"}, {type: "sep"}, {text: We("Transpose"), command: "transposeChars"}]}, {id: "edit_sort", text: We("Sort"), entries: [{text: We("Lines"), command: "sortLines"}, {text: We("Line_Case_Insensitive"), command: "sortLinesInsensitive"}]}, {id: "edit_folding", text: We("Folding"), entries: [{text: We("Fold"), command: "fold"}, {text: We("Unfold"), command: "unfold"}, {text: We("Fold_All"), command: "foldAll"}, {text: We("Unfold_All"), command: "unfoldAll"}]}, {id: "edit_sublime_mark", text: We("Sublime_Mark"), entries: [{text: We("Set_Sublime_Mark"), command: "setSublimeMark"}, {text: We("Select_to_Sublime_Mark"), command: "selectToSublimeMark"}, {text: We("Swap_with_Sublime_Mark"), command: "swapWithSublimeMark"}, {text: We("Delete_to_Sublime_Mark"), command: "deleteToSublimeMark"}, {text: We("Yank_Sublime_Mark"), command: "sublimeYank"}]}]}, selection: e.readonly || !t.editor_enabled ? void 0 : {text: We("Selection"), entries: [{text: We("Incremental_Find"), command: "selectMatchingPartsOfCurrentSelection"}, {text: We("Split_into_Lines"), command: "splitSelection"}, {type: "sep"}, {text: We("Incremental_Find"), command: "selectMatchingPartsOfCurrentSelection"}, {type: "sep"}, {text: We("Select_Line"), command: "selectLine"}, {text: We("Select_Scope"), command: "selectScope"}, {text: We("Select_Bookmarks"), command: "selectBookmarks"}, {text: We("Select_between_Brackets"), command: "selectBetweenBrackets"}, {text: We("Select_Next_Occurrence"), command: "selectNextOccurrence"}]}, find: t.editor_enabled ? {text: We("Find"), entries: [{text: We("Find"), command: "find"}, {text: We("Replace"), command: "replace"}, {text: We("Replace_All"), command: "replaceAll"}, {type: "sep"}, {text: We("Find_Next"), command: "findNext"}, {text: We("Find_Previous"), command: "findPrev"}, {text: We("Find_Under"), command: "findUnder"}, {text: We("Find_All_Under"), command: "findAllUnder"}, {text: We("Find_Under_Previous"), command: "findUnderPrevious"}, {type: "sep"}, {text: We("Incremental_Find"), command: "selectMatchingPartsOfCurrentSelection"}]} : void 0, goto: t.editor_enabled ? {text: We("GoTo"), entries: [{text: We("Jump_to_line"), command: "jump"}, {text: We("Document_Start"), command: "goDocStart"}, {text: We("Document_End"), command: "goDocEnd"}, {text: We("Group_Left"), command: "goGroupLeft"}, {text: We("Group_Right"), command: "goGroupRight"}, {text: We("Closing_Bracket"), command: "goToBracket"}, {text: We("Line_Up"), command: "goLineUp"}, {text: We("Line_Down"), command: "goLineDown"}, {type: "sep"}, {text: We("Center_Cursor"), command: "showInCenter"}, {type: "sep"}, {id: "bookmarks", text: We("Bookmarks"), entries: [{text: We("Toggle"), command: "toggleBookmark"}, {text: We("Clear_All"), command: "clearBookmarks"}, {type: "sep"}, {text: We("Next_Bookmark"), command: "nextBookmark"}, {text: We("Prev_Bookmark"), command: "prevBookmark"}]}]} : void 0, dev: e.readonly || !t.editor_enabled ? void 0 : {text: We("Developer"), entries: [{command: "macro", text: We("Insert_constructor"), modes: ["js"]}].concat(!e.system && t.editor_enabled && a ? [{type: "sep"}, {text: We("Run_syntax_check"), command: "lint_script", image: Gi.get("check")}, {text: We("Auto_Indent_all"), command: "reindentall"}] : []).concat(e.nnew || e.is_external ? [] : [{type: "sep"}, {text: We("Full_reset"), command: "reset", image: Gi.get("script_cancel"), cb: () => {
            confirm(We("Really_factory_reset_this_script_")) && u[e.uuid].fullReset(e => {
              e.cleaned && _(0, true, false);
            });
          }}]).concat(e.nnew ? [{type: "sep"}, {id: "templates", text: We("Templates"), entries: t.script_templates.map(e => ({text: e.name, command: e.name, image: Gi.get("dot"), cb: function () {
            if (m() && !confirm(We("Really_reset_all_changes_"))) return;
            const n = e.value || "";
            o.editor && (t.editor_enabled ? (o.editor.mirror.setValue(n), v(false)) : o.editor.value = n);
          }}))}] : [])}}, T = (e, t) => {
            const n = t[0];
            let r, i;
            return (r = e[n]) ? T(r, t.slice(1)) : (e.entries && e.entries.some(e => e.command == n ? (i = e, true) : !(!e.entries || !(i = T(e, t))) || void 0), i);
          };
          ["file.save_to_disk", "file.save", "file.cancel", "dev.reset", "find.findNext", "find.findPrev", "edit.replace", "goto.jump", "edit.reindentall", "dev.lint_script", "file.close"].forEach(t => {
            const n = T(S, t.split("."));
            n && (n.image ? y.appendChild(bi.createImageButton(e.uuid, n.id || n.command, n.text, n.image, n.cb || Z(n.command))) : y.appendChild(bi.createButton(n.id || n.command, e.uuid, n.text, n.cb || Z(n.command))));
          });
          const F = (e, n) => {
            const r = n || Zi.keyMap[t.editor_keyMap];
            let i, o;
            return Object.keys(r).every(t => r[t] != e || (i = t, false)), i || (r.fallthrough && (o = Zi.keyMap[r.fallthrough]) && o !== r ? F(e, o) : void 0);
          }, M = (t, n) => n.map((n, r) => {
            if (n.modes && !n.modes.includes(a ? "js" : "other")) ; else {
              if ("sep" == n.type) return (t => {
                const n = te("tr", "entry sep", e.uuid, "editorsubmenusep_tr" + t), r = ne("td", e.uuid, "editorsubmenusep_td" + t), i = ne("hr", e.uuid, "editorsubmenusep" + t);
                return r.setAttribute("colspan", 4), n.appendChild(r), r.appendChild(i), n;
              })(t + r);
              if (n.command) return ((t, n, r, i, o, s, a, l) => {
                const d = s || Zi.commands.hasOwnProperty(n), A = te("tr", "entry " + (!a && d ? "" : "disabled"), e.uuid, t, "editorsubmenuentry_tr", true);
                let c;
                c = te("i", i ? "far fa-" + i : "far", e.uuid, t, "editorsubmenuentry_i", true);
                const u = ne("td", e.uuid, "editorsubmenuentry_td_i" + t);
                u.appendChild(c);
                const h = te("td", "label", e.uuid, "editorsubmenuentry_td_l" + t);
                h.textContent = r;
                const p = te("td", "shortcut", e.uuid, "editorsubmenuentry_td_m" + t);
                return p.setAttribute("colspan", 2), o && (p.textContent = o), A.appendChild([u, h, p]), a ? "string" == typeof a && A.setAttribute("title", a) : d && A.addEventListener("click", l), A;
              })(t + "_" + n.command, n.command, n.text, n.image, F(n.command), !!n.cb, n.disabled, n.cb || Z(n.command));
              {
                const r = t + n.id, i = ((t, n, r) => {
                  const i = te("tr", "entry list", e.uuid, t, "editorsubmenulistentry", true);
                  let o;
                  o = te("i", r ? "far fa-" + r : "far", e.uuid, t, "editorsubmenulistentry_i", true);
                  const s = ne("td", e.uuid, "editorsubmenulistentry_td_i" + t);
                  s.appendChild(o);
                  const a = te("td", "label", e.uuid, "editorsubmenulistentry_td_l" + t);
                  a.textContent = n;
                  const l = te("td", e.uuid, "editorsubmenulistentry_td_m" + t), d = ne("td", e.uuid, "editorsubmenulistentry_td_s" + t);
                  i.appendChild([s, a, l, d]);
                  const A = te("span", "submenulist", e.uuid, "editorsubmenulistcontent" + t), c = te("span", "submenumore", e.uuid, "editorsubmenulistmore" + t), u = te("i", "more far fa-caret-right", e.uuid, t, "editorsubmenulistentrymore_i", true);
                  return c.appendChild([u, A]), d.appendChild([u, c]), {elem: i, content: A};
                })(r, n.text, n.image), o = M(r, n.entries);
                if (o.length > 0) return i.content.appendChild(o), i.elem;
              }
            }
          }).filter(e => e);
          Object.keys(S).forEach(e => {
            const t = S[e];
            if (!t) return;
            const n = G(e, t.text), r = M(e, t.entries);
            r.length > 0 && (w.appendChild(n.elem), n.content.appendChild(r));
          });
          const O = te("textarea", "editorta", e.uuid, "editor");
          O.setAttribute("wrap", "off"), O.setAttribute("spellcheck", "false");
          const L = te("td", "editor_outer", e.uuid, "edit"), P = te("div", "editor_100 editor_border", e.uuid, "edit");
          L.appendChild(P), c.appendChild(R), o.inserted || (P.appendChild(O), o.appendChild(L)), u[e.uuid].saveToDisk = () => {
            if (!o.editor) return;
            const n = t.editor_enabled ? o.editor.mirror.getValue() : o.editor.value;
            return ot.wait(), xe().done(() => {
              const t = new Blob([n], {type: "text/plain"});
              saveAs(t, I(e.name + (e.is_external ? "" : ".user.js")));
            }).always(() => {
              ot.hide();
            });
          }, e.system || (e.is_external ? u[e.uuid].saveEm = n => {
            if (!o.editor) return;
            const r = t.editor_enabled ? o.editor.mirror.getValue() : o.editor.value;
            ((e, t, n) => {
              const r = vt();
              try {
                n.auto_save || N(), sendMessage({method: "saveExternal", uuid: e, code: t, mimetype: n.mimetype, url: n.url, auto_save: n.auto_save}, e => {
                  n.auto_save || (j(), U()), (e = e || {}).items ? X(e.items, true) : ot.hide(), r.resolve(e);
                });
              } catch (e) {
                console.log("sS: " + e.message), r.reject({err: e.message});
              }
              return r.promise();
            })(e.script_uuid, r, {url: e.file_url, mimetype: e.mimetype, auto_save: n && n.auto_save}).done(e => {
              e.success ? v(false) : e.aborted || n && n.auto_save || (e.messages && e.messages.errors && e.messages.errors.length ? $(e.messages.errors.join("\n")) : $(We("Unable_to_parse_this_")));
            });
          } : u[e.uuid].saveEm = n => {
            if (!o.editor) return;
            let r = true;
            t.showFixedSrc && (r = confirm(We("Do_you_really_want_to_store_fixed_code_", We("Show_fixed_source"))));
            const i = t.editor_enabled ? o.editor.mirror.getValue() : o.editor.value;
            return r && q(e.uuid, i, {clean: false, new_script: e.nnew, auto_save: n && n.auto_save, reload: true, lastModTime: u[e.uuid].saveEm_lastModTime}).done(t => {
              t.installed ? e.nnew ? _(0, true, false) : (v(false), t.lastModified && (e.lastModTime = t.lastModified)) : t.aborted || n && n.auto_save || (t.messages && t.messages.errors && t.messages.errors.length ? $(t.messages.errors.join("\n")) : $(We("Unable_to_parse_this_")));
            }), r;
          });
          const Q = n.insertTab(null, i.navid, l, A, e => {
            e.then(() => {
              me.setSub(i.navid), i.on_tab_select && i.on_tab_select();
            });
          }, i.on_tab_close);
          if (Q.setHeading(i.tab_name || We("Editor"), 50), me.registerListener(e.uuid, i.navid, () => {
            Q.select(), t.editor_enabled && o.editor && (o.editor.refresh(), o.editor.mirror.focus());
          }), d) return r["editor" + e.uuid];
          const H = (e, t, n, r) => {
            e = r.getValue();
            const i = r.getHelper(Zi.Pos(0, 0), "lint")(e, n, r);
            if (i && i.then) return i.then(t);
            t(i);
          }, W = e => {
            ie("editor_theme", e, true).done(() => {
              D("Theme switched to " + e);
            });
          }, Y = () => {
            t.editor_autoSave && m() && h(e.uuid, "saveEm", {auto_save: true});
          }, J = {getTab: function () {
            return Q;
          }, getEditor: function () {
            if (o.editor) return t.editor_enabled ? o.editor.mirror : {save: g};
          }, onShow: () => {
            (() => {
              const t = vt();
              return e.referrer && void 0 === e.code ? ae(B(i.tree_opts || {}, {referrer: e.referrer + "." + i.treeid, uuid: e.uuid}), n => {
                n.items ? (e.code = n.items[0], t.resolve()) : t.reject(), ot.hide();
              }) : window.setTimeout(t.resolve, 100), t.promise();
            })().done(() => {
              const n = A.getElementsByTagName("textarea");
              if (u[e.uuid].lastI = () => e, n.length && !o.editor) {
                const r = n[0], l = () => {
                  o.editor && v(!!o.editor.mirror.historySize().undo);
                };
                if (t.editor_enabled) {
                  const n = r.parentNode;
                  n.removeChild(r);
                  const i = e.code || "", d = i.indexOf("\r\n") >= 0 ? "\r\n" : null;
                  o.editor = new Si(n, {mode: s, readOnly: e.readonly, theme: t.editor_theme, fontSize: t.editor_fontSize, themeOptions: {all: ut.getEditorThemes().map(e => e.value), onChange: W}, lineSeparator: d, value: i, indentUnit: Number(t.editor_indentUnit), tabSize: Number(t.editor_tabSize), indentWithTabs: "tabs" == t.editor_indentWithTabs, smartIndent: "classic" != t.editor_tabMode, indentByTab: "indent" == t.editor_tabMode, electricChars: "true" == t.editor_electricChars.toString(), lineNumbers: true, lineWrapping: t.editor_lineWrapping, extraKeys: {Enter: "newlineAndIndentContinueComment"}, keyMap: t.editor_keyMap, bookmarkGutter: true, gutters: ["gutter", "CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers", "CodeMirror-bookmarks"], matchBrackets: true, foldGutter: true, styleActiveLine: true, specifyMoreJsTokens: a, styleSelectedText: true, autoTrimTrailingSpace: "true" == t.editor_trimTrailingSpacesFromModifiedLines.toString(), highlightSelectionMatches: "off" != t.editor_highlightSelectionMatches ? {showToken: /\w/, annotateScrollbar: true, cursorOnly: "cursor" == t.editor_highlightSelectionMatches} : void 0, hintOptions: a ? {keywords: qr} : void 0, lint: a ? {lintOnChange: t.editor_autoLint, autoLintMaxLen: t.editor_autoLintMaxLen, async: true, getAnnotations: H, hintConfig: t.editor_linter_config || Wr, userscript: e.userscript, external: e.is_external} : void 0, showTrailingSpace: t.editor_highlightTrailingWhitespace}, We, {save: g, close: _, lint_script: k}, {change: l, blur: Y});
                } else o.editor = r, r.value = e.code;
                i.on_editor_load && i.on_editor_load();
              }
            }).fail(() => {
              _(0, false, true);
            });
          }, onClose: function (t) {
            const n = () => {
              o.editor = null, delete u[e.uuid].lastI;
            };
            if (!t && m()) {
              const e = confirm(We("There_are_unsaved_changed_"));
              return e && n(), !e;
            }
            return n(), false;
          }};
          return r["editor" + e.uuid] = J, J;
        }, Ne = (e, t, n, r) => {
          let i;
          e.is_external = true;
          const o = () => {
            i && !s.onClose() && (r(), i && i.remove(), i = null);
          }, s = ze(e, t, {tab_name: e.name, navid: e.uuid, treeid: "external", readonly: e.readonly, mimetype: e.mimetype, tree_opts: {url: e.file_url, uuid: e.script_uuid}, do_close: function () {
            window.setTimeout(o, 100);
          }, on_tab_close: o, on_tab_select: n, on_editor_load: n});
          return i = s.getTab(), s.show = () => {
            s.onShow(), i.select();
          }, s;
        }, Pe = e => {
          u[e.uuid] || (u[e.uuid] = {});
          const t = (t, n, r, i) => {
            const o = te("dt", " " + (i || ""), e.name, e.uuid, "dt_mapping" + n), s = te("dd", " " + (i || ""), e.name, e.uuid, "dd_mapping" + n);
            o.textContent = n, "string" == typeof r ? (s.textContent = r, s.setAttribute("title", r)) : s.appendChild(r), t.appendChild([o, s]);
          }, n = te("dl", "trash_script_details", e.name, e.uuid, "script_details_dl"), r = te("span", "name", e.uuid, "sname"), i = te("span", "nameNname16", e.uuid, "sname_name"), o = qe(e, "name");
          if (i.textContent = o, e.icon) {
            const t = m(e.icon, e.uuid, "sname_img");
            et(t).addClass("nameNicon16"), r.appendChild(t);
          }
          r.appendChild(i), t(n, We("Name"), r), t(n, We("Version"), e.version || ""), t(n, We("Deleted_on"), new Date(e.deleted).toISOString().split("T")[0]);
          const s = bi.createButton("restore", `${e.uuid}_restore`, We("Restore"), () => {
            q(e.uuid, null, {reload: true, restore: true}), n.parentNode.removeChild(n);
          }), a = u[e.uuid].purgeScript = (t, r) => {
            1 == (r || confirm(We("Really_delete_0name0__", e.name))) && (oe([e.uuid]), n.parentNode.removeChild(n));
          }, l = bi.createButton("delete", `${e.uuid}_delete`, We("Delete"), a), d = te("span", "", e.uuid, "actions");
          return d.appendChild([s, l]), t(n, We("Actions"), d, "actions"), [n];
        }, Ve = (e, i, o) => {
          let a, l;
          u[e.uuid] || (u[e.uuid] = {}), u[e.uuid].getName = () => qe(e, "name");
          const d = e.icon, A = [];
          A.push("clickable"), (e.blacklisted || e.foisted) && A.push("crossedout");
          const c = te("span", A.join(" "), e.uuid, "sname"), p = d ? m(e.icon, e.uuid, "sname_img") : te("span", "nameNicon16 icon16 nameNOicon16", e.uuid, "sname_img");
          d && et(p).addClass("nameNicon16");
          const f = te("span", "nameNname16 " + (e.enabled ? "" : "greyed"), e.uuid, "sname_name");
          c.appendChild(p);
          const g = Ue(e), _ = qe(e, "name");
          f.textContent = _;
          const b = ne("span", e.uuid, "spos");
          b.textContent = e.position || "";
          const v = ne("span", e.uuid, "sversion");
          v.textContent = e.version ? e.version : "";
          const k = ne("span", e.uuid, "ssize");
          if (!e.nnew) {
            const {code: t, resources: n, requires: r} = Fe(e);
            k.textContent = di.formatBytes(t + r + n, 0), k.title = [We("Size") + ": " + di.formatBytes(t, 2), r ? We("Requires") + ": " + di.formatBytes(r, 2) : void 0, n ? We("Resources") + ": " + di.formatBytes(n, 2) : void 0].filter(e => e).join("\n");
          }
          const y = [], w = (e, t, n) => {
            const r = te("span", n || "", e.uuid, "wrap");
            return t && ("Array" === Z(t) ? S(t, e => {
              r.appendChild(e);
            }) : r.appendChild(t)), r;
          }, R = (t, n) => {
            void 0 === n && (n = !t), l && l.onClose && l.onClose(t) || (e.uuid && me.is(e.uuid) && me.clear(), a && (a.remove(), a = null), delete r["tab" + e.uuid], delete r["editor" + e.uuid], c.parentNode && c.parentNode.removeChild(c), n && window.setTimeout(() => {
              const t = Object.keys(s);
              for (let n, r = 0; n = t[r]; r++) {
                const t = s[n].script;
                if (t.uuid == e.uuid) {
                  ye(i, [t], null, o);
                  break;
                }
              }
              be();
            }, 0));
          }, C = e => {
            l && l.onSelect && l.onSelect(e);
          }, x = () => {
            let n = null;
            e.nnew ? (n = te("div", "head_icon", e.uuid, "details_h"), n.appendChild(bi.createIcon(e.image_id, "", e.uuid, "new_script_head"))) : n = ne("div", e.uuid, "details_h");
            const i = ne("div", e.uuid, "details_c");
            if (a = o.insertTab(null, e.uuid, n, i, C, e.nnew ? null : R), !e.nnew) {
              let t;
              t = e.version ? " " + e.version : "";
              const n = We("Edit") + " - " + qe(e, "name") + t;
              a.setHeading(n, 50), a.isSelected() && a.select(true);
            }
            l = ((e, n, i, o, s) => {
              const a = ne("div", n.uuid, "script_tab_head"), l = a.inserted, d = te("table", "noborder p100100 heading", n.uuid, "h_table"), A = te("tr", "", n.uuid, "h_tr1"), c = te("td", "nameNicon64", n.uuid, "h_td1"), u = te("td", "", n.uuid, "h_td2");
              d.appendChild(A), A.appendChild(c), A.appendChild(u), u.setAttribute("style", "width: 99%");
              const p = n.icon64 || n.icon;
              c.appendChild(m(p ? [p] : [], n.uuid, "heading_icon", {default_icon: ut.images.origin("unknown")}));
              const f = te("div", "nameNname64", n.uuid, "heading_name");
              f.textContent = qe(n, "name"), u.appendChild(f);
              const g = te("div", "author", n.uuid, "author");
              n.author ? g.textContent = "by " + n.author : n.copyright && (g.innerHTML = "&copy; ", g.textContent += n.copyright), u.appendChild(g);
              const _ = te("table", "noborder p100100", n.uuid, "table"), b = te("tr", "script_tab_head", n.uuid, "tr1"), v = te("tr", "details", n.uuid, "tr2"), k = te("td", "", n.uuid, "td1"), y = te("td", "", n.uuid, "td2");
              a.appendChild(d), k.appendChild(a), b.appendChild(k), v.appendChild(y), _.appendChild(b), _.appendChild(v), o.appendChild(_);
              const w = ki.create("_details" + n.uuid, y, {tv: "tv tv_alt", tv_table: "tv_table tv_table_alt", tr_tabs: "tr_tabs tr_tabs_alt", tr_content: "tr_content tr_content_alt", td_content: "td_content td_content_alt", td_tabs: "td_tabs td_tabs_alt", tv_tabs_align: "tv_tabs_align tv_tabs_align_alt", tv_tabs_fill: "tv_tabs_fill tv_tabs_fill_alt", tv_tabs_table: "tv_tabs_table tv_tabs_table_alt", tv_contents: "tv_contents tv_contents_alt", tv_tab_selected: "tv_tab tv_selected tv_tab_alt tv_selected_alt", tv_tab_close: "tv_tab_close", tv_tab: "tv_tab tv_tab_alt", tv_content: "tv_content tv_content_alt"}, true), R = ((t, n, r, i) => ze(t, n, {do_close: i, set_tab_class: (t, n) => {
                e.toggleClass(t, n);
              }, navid: "editor", treeid: "source"}))(n, w, 0, s), C = n.nnew || n.system ? {} : Oe(n, w), x = n.nnew || n.system || !n.storage_key_count || t.configMode < 80 ? {} : ((e, t) => {
                const n = ne("div", "", e.uuid, "script_storage_h");
                n.textContent = We("Storage");
                const r = ne("div", "", e.uuid, "script_storages_c"), i = te("div", "section", e.uuid, "ta_storage"), o = te("div", "section_head", e.uuid, "head_ta_storage"), s = te("div", "section_content", e.uuid, "content_ta_storage");
                let a;
                o.textContent = We("Storage"), i.appendChild(o), i.appendChild(s);
                const l = te("textarea", "storageta", e.uuid, "storage");
                l.setAttribute("wrap", "off"), l.setAttribute("spellcheck", "false"), l.addEventListener("change", () => a = true);
                const d = bi.createButton("storage_save_button", e.uuid, We("Save"), () => {
                  let t = null;
                  try {
                    t = JSON.parse(l.value);
                  } catch (e) {
                    return void $(We("Unable_to_parse_this_"));
                  }
                  const n = e.storage.data, r = Object.keys(t), i = Object.keys(n);
                  r.concat(i).filter((e, t, n) => n.lastIndexOf(e) === t).forEach(o => {
                    r.includes(o) ? i.includes(o) && t[o] === n[o] || he(e.uuid, o, (e => {
                      const t = (typeof e)[0];
                      if ("o" === t) try {
                        e = t + JSON.stringify(e);
                      } catch (n) {
                        console.error("Storage: setValue ERROR: " + n.message), e = t + JSON.stringify({});
                      } else e = t + e;
                      return e;
                    })(t[o])) : he(e.uuid, o);
                  });
                }), A = bi.createButton("storage_reload_button", e.uuid, We("Reload"), () => {
                  a && !confirm(We("Really_reset_all_changes_")) || (ot.wait(), u(true, true).always(() => {
                    window.setTimeout(ot.hide, 500), j();
                  }));
                }), c = bi.createButton("storage_reset_button", e.uuid, We("Editor_reset"), () => {
                  a && !confirm(We("Really_reset_all_changes_")) || (ot.wait(), u(true).always(() => {
                    window.setTimeout(ot.hide, 500), j();
                  }));
                }), u = (t, n) => (l.setAttribute("disabled", "disabled"), (() => {
                  if (e.referrer && (n || void 0 === e.storage)) {
                    const t = vt();
                    return ae({referrer: e.referrer + ".storage", uuid: e.uuid}, e => {
                      if (e.items) {
                        const n = {}, r = e.items[0], {data: i, ts: o} = r;
                        Object.keys(i).forEach(e => {
                          n[e] = ((e, t) => {
                            if (!e) return t;
                            const n = e[0];
                            switch (e = e.substring(1), n) {
                              case "b":
                                return "true" == e;
                              case "n":
                                return Number(e);
                              case "o":
                                try {
                                  return JSON.parse(e);
                                } catch (e) {
                                  console.error("Storage: getValue ERROR: " + e.message);
                                }
                                return t;
                              default:
                                return e;
                            }
                          })(i[e]);
                        }), t.resolve({data: n, ts: o});
                      } else t.reject();
                      ot.hide();
                    }), t.promise();
                  }
                  return vt.Pledge(e.storage);
                })().done(n => {
                  !t && l.value || (l.value = JSON.stringify(n.data, null, 4), a = false), e.storage = n, l.removeAttribute("disabled");
                }).fail(() => {
                  l.setAttribute("disabled", true);
                }));
                s.appendChild(l), s.appendChild(d), s.appendChild(c), s.appendChild(A), r.appendChild(i);
                const h = t.appendTab("storage", n, r, e => {
                  e.then(() => {
                    me.setSub("storage");
                  });
                });
                return me.registerListener(e.uuid, "storage", () => {
                  u(), h.select();
                }), {};
              })(n, w), E = n.nnew || n.system || !n.requires.length && !n.resources.length ? {} : ((e, t) => {
                let n;
                const r = e => {
                  n = e;
                }, i = ne("div", "", e.uuid, "script_external_h");
                i.textContent = We("Externals");
                const o = ne("div", "", e.uuid, "script_externals_c"), s = te("div", "section", e.uuid, "ta_requires"), a = te("div", "section_head", e.uuid, "head_ta_requires"), l = te("div", "section_content", e.uuid, "content_ta_requires");
                a.textContent = We("Requires"), s.appendChild(a), s.appendChild(l), l.appendChild(Le(e, "requires", t, r));
                const d = te("div", "section", e.uuid, "ta_resources"), A = te("div", "section_head", e.uuid, "head_ta_resources"), c = te("div", "section_content", e.uuid, "content_ta_resources");
                A.textContent = We("Resources"), d.appendChild(A), d.appendChild(c), c.appendChild(Le(e, "resources", t, r)), o.appendChild(s), o.appendChild(d);
                const u = t.appendTab("externals", i, o, e => {
                  e.then(() => {
                    me.setSub("externals");
                  });
                });
                return me.registerListener(e.uuid, "externals", () => {
                  u.select();
                }), {getEditor: function () {
                  return n;
                }};
              })(n, w);
              if (l) return r["tab" + n.uuid];
              const G = () => {
                let e;
                return (e = w.getSelectedTab()) && e.isCloseable() ? E.getEditor() : R.getEditor();
              }, Z = n => {
                let r = false;
                if ("keydown" == n.type && e.isSelected() && !n.defaultPrevented) {
                  if (27 == n.keyCode) {
                    if (!t.editor_enabled || "vim" != t.editor_keyMap) {
                      let e;
                      (e = w.getSelectedTab()) && e.isCloseable() ? e.close() : window.setTimeout(s, 0), r = true;
                    }
                  } else if (t.editor_enabled) {
                    const e = {save: true, find: true, findNext: true, findPrev: true, replace: true, replaceAll: true}, t = G(), i = Zi.keyName(n);
                    t && !t.hasFocus() && "handled" == Zi.lookupKey(i, t.getOption("keyMap"), n => {
                      if (e[n]) return t.execCommand(n), true;
                    }) && (r = true);
                  } else if (83 == n.keyCode && (n.ctrlKey || n.metaKey)) {
                    const e = G();
                    e && (e.save(), r = true);
                  }
                  return r ? (n.stopPropagation(), n.preventDefault(), false) : void 0;
                }
              }, B = {onShow: () => {
                S([C, R, x, E], e => {
                  e.onShow && e.onShow();
                }), window.addEventListener("keydown", Z, false);
              }, onClose: e => {
                let t;
                return S([C, R, x, E], n => {
                  if (n.onClose && n.onClose(e)) return t = true, false;
                }), t || window.removeEventListener("keydown", Z, false), t;
              }, onSelect: e => {
                e.then(() => {
                  if (n.uuid) {
                    const e = me.get().sub, t = w.getTabById(e);
                    me.set(n.uuid, (t ? e : null) || "editor"), document.title = h(n.uuid, "getName");
                  }
                }), S([C, R, E], t => {
                  t.onSelect && t.onSelect(e);
                });
              }};
              return r["tab" + n.uuid] = B, B;
            })(a, e, 0, i, R);
          }, E = u[e.uuid].scriptClick = (e, t) => {
            a || x(), l && l.onShow && l.onShow(), a.show(), e && 1 == e.button || t || a.select(), f.setAttribute("open", "true");
          };
          "true" == f.getAttribute("open") && E(null, true);
          const G = ne("span", "", e.uuid, "last_updated", true);
          let B = "?";
          if (e.nnew || e.system) B = ""; else if (u[e.uuid].scriptUpdate = () => {
            const t = G.textContent;
            G.textContent = "", G.appendChild(bi.createIcon(Gi.get("download"), "down", e.uuid, "spinner")), ((e, t) => {
              try {
                sendMessage({method: "buttonPress", name: "run_script_updates", scriptuid: e}, e => {
                  j(), t && t(e.updatable);
                });
              } catch (e) {
                console.log("rSu: " + e.message);
              }
            })(e.uuid, n => {
              G.textContent = t, n ? (et(G).addClass("green"), G.title = We("There_is_an_update_for_0name0_avaiable_", e.name), R(true), Ae()) : (et(G).addClass("red"), G.title = We("No_update_found__sry_"));
            });
          }, e.options.check_for_updates && e.file_url && "none" != e.file_url ? (G.addEventListener("click", () => {
            h(e.uuid, "scriptUpdate");
          }), G.setAttribute("class", "clickable"), G.title = We("Check_for_Updates")) : (G.setAttribute("class", "greyed italic"), G.title = We("Update_check_is_disabled")), e.lastModified || e.lastUpdated) try {
            B = ((e, t) => {
              const n = e.getTime(), r = t.getTime(), i = Math.abs(n - r), o = Math.round(i / 6e4), s = Math.round(i / 36e5), a = Math.round(i / 864e5);
              return o <= 60 ? o + " min" : s <= 48 ? s + " h" : a <= 28 ? a + " d" : t.toLocaleDateString();
            })(new Date, new Date(e.lastModified || e.lastUpdated));
          } catch (e) {
            console.log("o: error calculating time " + e.message);
          }
          G.textContent = B;
          let I, T = ne("div", e.uuid, "imported"), U = "";
          n.push(() => {
            t.sync_enabled && (U = e.nnew || e.system ? "" : e.sync && e.sync.imported ? 2 == e.sync.imported ? de.FIREFOX ? '<img src="' + Gi.brand("firefox") + '" class="icon16" title="Firefox Sync"/>' : '<img src="' + Gi.brand("chrome") + '" class="icon16" title="Google Sync"/>' : 4 == e.sync.imported ? '<img src="' + Gi.brand("gdrive") + '" class="icon16" title="Google Drive"/>' : 5 == e.sync.imported ? '<img src="' + Gi.brand("dropbox") + '" class="icon16" title="Dropbox"/>' : 6 == e.sync.imported ? '<img src="' + Gi.brand("webdav") + '" class="icon16" title="WebDAV"/>' : 7 == e.sync.imported ? '<img src="' + Gi.brand("yandex") + '" class="icon16" title="Yandex"/>' : 8 == e.sync.imported ? '<img src="' + Gi.brand("onedrive") + '" class="icon16" title="OneDrive"/>' : '<i class="icon16 far fa-' + Gi.get("question_mark") + '" />' : "", T.innerHTML = U, T = null);
          });
          const F = ne("span", e.uuid, "hp");
          if (e.origin) {
            I = ne("a", e.uuid, "hp_origin"), I.setAttribute("href", e.origin.url), I.setAttribute("target", "_blank");
            const t = bi.createImage(Gi.origin(e.origin.token), "", e.uuid, e.origin.token);
            I.appendChild(t), F.appendChild(I);
          }
          if (g && (!e.origin || e.origin.url !== g)) {
            I = ne("a", e.uuid, "hp_script"), I.setAttribute("href", g), I.setAttribute("target", "_blank");
            const t = bi.createIcon(Gi.get("home"), "", e.uuid, "homepage", "");
            I.appendChild(t), F.appendChild(I);
          }
          u[e.uuid].saveEm_lastModTime = e.lastModified, u[e.uuid].fullReset = t => {
            q(e.uuid, null, {clean: true, reload: true}).done(t || (() => {})), i.parentNode.removeChild(i);
          }, u[e.uuid].reportAnIssue = t => {
            ((e, t) => {
              try {
                sendMessage({method: "reportAnIssue", uuid: e, to: t}, () => {});
              } catch (e) {
                console.log("rRi: " + e.message);
              }
            })(e.uuid, t);
          }, u[e.uuid].deleteScript = (t, n) => {
            const r = {reload: !n};
            q(e.uuid, null, r), i.parentNode.removeChild(i);
          };
          const M = [];
          if (!e.nnew && !e.system && e.origin && e.origin.abuse_url) {
            const t = bi.createIcon(Gi.get("flag"), "", e.uuid, "issue", We("Report_an_issue_to_the_script_hoster_"), () => {
              h(e.uuid, "reportAnIssue", "hoster");
            });
            M.push(t);
          }
          if (!e.nnew && !e.system && (e.origin || e.supportURL)) {
            const t = bi.createIcon(Gi.get("bug"), "", e.uuid, "bug", We("Report_a_bug"), () => {
              h(e.uuid, "reportAnIssue", "author");
            });
            M.push(t);
          }
          if (!e.nnew && !e.system) {
            if (e.remote_url) {
              const t = bi.createIcon(Gi.get("cloud"), "", e.uuid, "cloud_edit", We("Edit"), () => {
                sendMessage({method: "newTab", url: e.remote_url}, () => {});
              });
              M.push(t);
            }
            const t = bi.createIcon(Gi.get("edit"), "", e.uuid, "edit", We("Edit"), () => {
              h(e.uuid, "scriptClick");
            });
            M.push(t);
          }
          if (!e.nnew && !e.system) {
            const t = bi.createIcon(Gi.get("delete"), "", e.uuid, "delete", We("Delete"), () => {
              h(e.uuid, "deleteScript");
            });
            M.push(t);
          }
          de.MOBILE ? c.inserted || f.addEventListener("click", () => {
            et(i).toggleClass("show_details");
          }) : c.inserted || (c.addEventListener("click", E), c.addEventListener("auxclick", E)), c.appendChild(f);
          let O = [e.name];
          if (e.description && O.push(qe(e, "description")), (e.blacklisted || e.foisted) && (O = e.blacklisted ? e.warnings && e.warnings.length ? [e.blacklisted, ...e.warnings] : [e.blacklisted] : [e.foisted]), c.title = O.join("\n\n").replace(/\"/g, '"'), y.push(e.nnew || e.system ? null : {element: st(e), style: "script_sel"}), y.push(b), y.push((() => {
            let t = null;
            t = e.blacklisted || e.foisted ? "enabler_warning" : e.enabled ? e.contexter ? "enabler_enabled enabler_later" : "enabler_enabled" : "enabler_disabled";
            const n = e.blacklisted || e.foisted || (e.enabled ? We("Enabled") : We("Disabled")), r = bi.createEnabler(t, e.uuid, "enabled", {append: "enabled", disabled: !!e.blacklisted, title: n}, () => {
              h(e.uuid, "switchEnabled");
            });
            return u[e.uuid].switchEnabled = (t, n, r) => {
              void 0 === n && (n = !e.enabled), ce(e.uuid, {enabled: n, whitewash: !!e.foisted}, r);
            }, r;
          })()), y.push({element: c, style: "script_name"}), de.MOBILE) {
            const t = (t, n, r, i) => {
              const o = te("dt", "script_info " + (i || ""), e.name, e.uuid, "dt_mapping" + n), s = te("dd", "script_info " + (i || ""), e.name, e.uuid, "dd_mapping" + n);
              o.textContent = n, "string" == typeof r ? s.textContent = r : s.appendChild(r), t.appendChild([o, s]);
            }, n = te("dl", "script_details", e.name, e.uuid, "script_details_dl");
            let r;
            c.appendChild(n), t(n, We("Version"), v), t(n, We("Type"), Qe(e), "script_type"), t(n, We("Sites"), tt(e)), (r = He(e)) && t(n, We("Features"), r), g && t(n, We("Homepage"), F), B && t(n, We("Last_updated"), G), y.push(w(e, M, "actions"));
          } else {
            y.push({element: v, style: "script_version"}), y.push(k), y.push(Qe(e)), y.push(T), y.push(tt(e)), y.push(He(e)), y.push(F), y.push(G), y.push($e(e)), y.push(w(e, M, "actions"));
            for (let e = y.length; e < 10; e++) y.push(null);
          }
          return me.registerListener(e.uuid, () => {
            E();
          }), e.nnew && n.push(() => {
            E(null, true);
          }), y;
        }, Qe = e => {
          let t;
          const n = te("span", "script_type", "", e.uuid, "pos_type", true);
          return e.nnew || e.userscript && (t = bi.createImage(Gi.origin("uso"), "", e.uuid, "user_script", We("This_is_a_userscript")), n.appendChild(t)), n;
        }, He = e => {
          let n, r, i, o = null;
          const s = [];
          if (e.nnew) return null;
          e.system && (n = bi.createIcon(Gi.get("lock"), "", e.uuid, "lock", We("This_is_a_system_script")), s.push(n)), e.warnings && e.warnings.forEach((t, r) => {
            n = bi.createIcon(Gi.get("critical"), "compat", e.uuid, "warning_" + r, t), et(n).addClass("flashing"), s.push(n);
          }), e.requires.length && (i = !e.requires.filter(e => e.modified).length, n = bi.createIcon(Gi.get("script_download") + (i ? "" : " red"), "", e.uuid, "requires", e.requires.filter(e => e && e.url).map(e => e.url).join("\n"), () => {
            me.set(e.uuid, "externals");
          }), s.push(n)), e.resources.length && (i = !e.resources.filter(e => e.modified).length, n = bi.createIcon(Gi.get("resources") + (i ? "" : " red"), "", e.uuid, "resources", e.resources.filter(e => e && e.url).map(e => e.url).join("\n"), () => {
            me.set(e.uuid, "externals");
          }), s.push(n));
          let a = false;
          const l = {includes: true, matches: true};
          for (r in l) if (e[r]) {
            for (let t = 0; t < e[r].length; t++) if (e[r][t] && (0 == e[r][t].search(/\/\^?http(s|\.\*?|s\?|\[[^\]]*s[^\]]*\]|\([^\)]*s[^\)]*\))+/) || 0 == e[r][t].search(/http[s\*]{1,1}|\*/))) {
              n = bi.createIcon(Gi.get("encrypted"), "", e.uuid, "encrypt", We("This_script_has_access_to_https_pages")), s.push(n), a = true;
              break;
            }
            if (a) break;
          }
          const d = {};
          for (r in e.grant.forEach(e => {
            d[e] = true;
          }), (d.GM_xmlhttpRequest || d["GM.xmlHttpRequest"]) && (n = bi.createIcon(Gi.get("web"), "", e.uuid, "web", We("This_script_has_full_web_access")), s.push(n)), (d.GM_setValue || d["GM.setValue"]) && (n = bi.createIcon(Gi.get("db"), "", e.uuid, "db", We("This_script_stores_data")), s.push(n)), (d.none || 0 === e.grant.length) && (n = bi.createIcon(Gi.get("permissionless"), "", e.uuid, "none", We("This_script_does_not_require_any_special_powers_")), s.push(n)), "normal" == (e.options.tab_types || t.default_tab_types) && (n = bi.createIcon(Gi.get("incognito") + " blue", "", e.uuid, "tab_types", We("Does_not_run_in_incognito_tabs")), s.push(n)), e.options) if (-1 != r.indexOf("compat_") && e.options[r]) {
            n = bi.createIcon(Gi.get("critical"), "compat", e.uuid, "crit", We("One_or_more_compatibility_options_are_set")), s.push(n);
            break;
          }
          for (r in e.antifeatures) {
            const t = e.antifeatures[r];
            let i;
            i = We("ads" == r ? "Antifeature_ads" : "miner" == r ? "Antifeature_miner" : "tracking" == r ? "Antifeature_tracking" : "Antifeature_other");
            const o = t[Ke(Object.keys(t))] || t.default || t.en || We("Antifeature_no_details");
            n = bi.createIcon(Gi.get("about"), "compat", e.uuid, "crit", We("Antifeature__0name0__0description0", i, o)), s.push(n);
          }
          return s.length && (o = ne("span", "", e.uuid, "pos_features", true), o.appendChild(s, true)), o;
        }, Xe = (() => {
          let e, t = null, n = null, r = null, i = 0, o = 0, s = 0;
          const a = n => {
            const i = r.x + n.pageX, o = r.y + n.pageY;
            t.style.top = o + e.scrollTop + "px", t.style.left = i + "px";
          };
          let l, d;
          const A = r => {
            if (t && !l) {
              let t;
              if ("scroll" == r.type && d) return void (t = d);
              t = d = r;
              let A, u, h, p, f, m = null;
              a(t);
              const g = e.scrollTop, _ = 5, {top: b, bottom: v} = e.getBoundingClientRect();
              for (; m != s && (m = s, u = n.previousSibling, h = n.nextSibling, p = n.parentNode, f = c(n), !(t.pageY < b || t.pageY > v));) t.pageY > f.y + i + o && h ? (p.removeChild(h), p.insertBefore(h, n), s++, A = false) : t.pageY < f.y && s > 1 && (p.removeChild(u), h ? p.insertBefore(u, h) : p.appendChild(u), s--, A = true);
              if (void 0 !== A) {
                const t = et(A ? u : h);
                if (t.length && !bi.isScrolledIntoView(t, e, {padding: A ? {top: _} : {bottom: _}})) {
                  const n = A ? t.offset().top - b - _ - t.height() : t.offset().top - b - (v - b) + _ + 2 * t.height();
                  l = true;
                  const r = Math.floor(g + n);
                  e.scrollTop = r, et(e).animate({scrollTop: r}, 0, () => {
                    l = false;
                  });
                }
              }
              return t.stopPropagation && (t.stopPropagation(), t.preventDefault()), false;
            }
          }, c = e => {
            const t = e.getBoundingClientRect();
            return {x: Math.floor(t.left), y: Math.floor(t.top)};
          }, u = e => {
            t.style.position = "static";
            const i = {};
            return i[t.key] = s, ce(t.uuid, i), t = n = r = null, document.removeEventListener("mousemove", A), document.removeEventListener("mouseup", u), e.stopPropagation(), e.preventDefault(), false;
          };
          return {start: function (l, d) {
            return ((s, l) => {
              e || (e = et(".scripttable").parent().get(0));
              const d = s.parentNode.parentNode, A = d.parentNode;
              t = s, n = A, i = n.offsetHeight, o = n.offsetHeight - d.clientHeight, r = c(e), r.x = -r.x - t.offsetWidth / 2, r.y = -r.y - n.offsetHeight / 2 + 2 * o, t.style.position = "absolute", a(l);
            })(this, l), s = d, document.addEventListener("mousemove", A), document.addEventListener("mouseup", u), l.stopPropagation(), l.preventDefault(), false;
          }};
        })(), $e = e => {
          const t = te("span", "sorting", "", e.uuid, "pos_images", true);
          if (e.nnew) return t;
          if ("pos" == v() && "up" == k() || t.setAttribute("style", "display: none;"), e.position > 1 || e.position < e.positionof) {
            const n = te("span", "clickable movable", "position", e.uuid, true);
            n.innerHTML = "&#9776;", n.title = We("Click_here_to_move_this_script"), n.uuid = e.uuid, n.key = "position", n.addEventListener("mousedown", function (t) {
              Xe.start.apply(this, [t, e.position]);
            }), t.appendChild(n);
          }
          return t;
        }, tt = e => {
          let t = ne("span", "", e.uuid, "site_images"), n = null;
          return t.inserted && (n = t, n.setAttribute("id", n.id + "foo"), t = ne("span", "", e.uuid, "site_images")), x.topIcons(e, 7).forEach(e => {
            t.appendChild(e, true);
          }), n && n.parentNode.removeChild(n), t;
        }, nt = e => {
          const t = te("div", "search_filter", e.name, e.id, "filter");
          if (t.inserted) return t;
          const r = et(t);
          let i, o, a, l = null;
          const d = (e, t) => {
            i && !e || (l && window.clearTimeout(l), h.show(), l = window.setTimeout(() => {
              p = null, o = m, a = A.value;
              const e = () => o != m || a != A.value, t = document.getElementsByName("scriptselectors"), n = [];
              for (let e = 0; e < t.length; e++) n.push(t[e]);
              i = true, ("matching_url" != o && "auto" != o || !a.match(f.matching_url.match) ? vt.Pledge() : (g = f.matching_url.update_interval || g, (e => {
                const t = vt();
                return sendMessage({method: "determineScriptsToRun", url: e}, e => {
                  t.resolve(e.scripts || []);
                }), t.promise();
              })(a))).then(t => {
                const i = new RegExp(G(a), "i"), l = new RegExp(G(a)), d = xt({threads: 32}), A = [], c = n.map(n => () => {
                  let a, d, c, u;
                  return (d = s[n.s_id]) && (c = d.script) && (u = d.dom) && !e() ? (A.push(() => {
                    et(u).toggle(!!a), n.is_hidden = !a;
                  }), (() => {
                    if (!r.is(":visible")) return vt.Pledge();
                    if ("auto" == o) return vt.or(Object.keys(f).map(e => () => {
                      const n = f[e];
                      return n.check ? n.check(c, n.ignore_case ? i : l, t) : vt.Breach();
                    }));
                    {
                      const e = f[o];
                      if (e.check) return e.check(c, e.ignore_case ? i : l, t);
                    }
                    return vt.Breach();
                  })().done(() => {
                    a = true;
                  }).fail(() => {
                    a = false;
                  })) : vt.Breach();
                });
                return vt.sidebyside(c.map(e => d.add(e))).always(() => A.forEach(e => e()));
              }).always(() => {
                i = false, e() ? d(false, 1) : h.fadeOut();
              });
            }, t || g));
          }, A = te("input", "filter_text", "sms", "all", null);
          A.setAttribute("spellcheck", "false");
          let c = "";
          A.inserted || A.addEventListener("keyup", () => {
            c != A.value && (c = A.value, d());
          });
          const h = et(bi.createIcon(Gi.get("download"), "wait_for_filter", e.uuid));
          let p;
          h.attr("style", "vertical-align: middle;"), h.hide(), u.filter = {onShow: function (e) {
            d(true), e && et(A).trigger("focus");
          }, onHide: function () {
            A.value = "", d(true, 1);
          }};
          const f = {auto: {name: We("Auto"), update_interval: 500}, name: {name: "@name", sync: function (e, t) {
            return -1 != e.name.search(t);
          }, ignore_case: true}, namespace: {name: "@namespace", sync: function (e, t) {
            return e.namespace && -1 != e.namespace.search(t);
          }, ignore_case: true}, author: {name: "@author", sync: function (e, t) {
            return e.author && -1 != e.author.search(t);
          }, ignore_case: true}, grant: {name: "@grant", default: "GM_", sync: function (e, t) {
            return e.grant && e.grant.filter(e => -1 != e.search(t)).length > 0;
          }, ignore_case: true}, includes: {name: "@include/@match", sync: function (e, t) {
            return e.includes && e.includes.filter(e => -1 != e.search(t)).length > 0 || e.matches && e.matches.filter(e => -1 != e.search(t)).length > 0;
          }, ignore_case: true}, code: {name: We("Source_Code"), async: function (e, t) {
            const n = vt();
            if (!p) {
              const e = vt();
              p = e.promise(), r = {code: t.toString()}, i = t => {
                e.resolve(t);
              }, ae({referrer: "options.scripts.userscripts.matches", uuid: null, filter: r}, e => {
                ot.hide(), i(e.items);
              });
            }
            var r, i;
            return p.done(t => {
              window.setTimeout(() => {
                (t.includes(e.uuid) ? n.resolve : n.reject)();
              }, 0);
            }), n.promise();
          }, ignore_case: true}, comment: {name: We("Comment"), sync: function (e, t) {
            return e.comment && -1 != e.comment.search(t);
          }, ignore_case: true}, url: {name: We("Update_URL_"), default: "https://", sync: function (e, t) {
            return e.file_url && -1 != e.file_url.search(t);
          }, ignore_case: true}, matching_url: {name: We("Matching_URL"), update_interval: 1500, default: "http://", match: new RegExp("^https?://.*"), sync: function (e, t, n) {
            return n && n.includes(e.uuid);
          }}};
          Object.keys(f).forEach(e => {
            const t = f[e];
            t.check = t.sync || t.async ? function () {
              return t.sync ? t.sync.apply(this, arguments) ? vt.Pledge() : vt.Breach() : t.async ? t.async.apply(this, arguments) : void 0;
            } : null;
          });
          let m = "auto", g = f.auto.update_interval;
          const _ = bi.createDropDown(We("Filter_by"), {value: 0, uuid: "sms-filter", name: "select"}, Object.keys(f).map(e => ({name: f[e].name, value: e})), function () {
            let e, t;
            const n = this.value;
            n != m && (m = n, e = f[m], g = (e ? e.update_interval : null) || f.auto.update_interval, t = (e ? e.default : null) || "", A.value = A.value || t, d());
          });
          return _.elem.setAttribute("class", "label"), t.appendChild(_.elem), t.appendChild(A), t.appendChild(h[0]), fe.filter && n.push(() => {
            u.multiselect.toggleRow(true, true), A.value = fe.filter;
          }), t;
        };
        let rt = [];
        const it = e => {
          rt = [], e && rt.push(e);
        }, st = e => {
          const t = ne("input", "", e.uuid, "sel");
          return t.type = "checkbox", t.s_id = e.uuid, t.name = "scriptselectors", t.inserted || t.addEventListener("click", e => {
            it(t), e.shiftKey ? u.multiselect.shift_click(e) : e.ctrlKey || e.metaKey ? u.multiselect.un_selectAll() : u.multiselect.single_click(e);
          }), t;
        }, at = e => {
          const t = te("input", "multiselectcb", "sms", "all", null), n = te("div", "filter multiselectcb clickable", "sms2", "all", null);
          t.inserted || (t.type = "checkbox", t.addEventListener("click", u.multiselect.un_selectAll), n.addEventListener("click", () => {
            u.multiselect.toggleRow();
          }));
          let r = 0, i = [{name: We("__Please_choose__"), value: 0}, {name: We("Enable"), value: 1}, {name: We("Disable"), value: 2}, {name: We("Toggle_Enable"), value: 7}];
          (de.CAN_SAVEAS_ZIP || "undefined" != typeof Blob) && i.push({name: We("Export"), value: 3}), i = i.concat([{name: We("Trigger_Update"), value: 5}, {name: We("Factory_Reset"), value: 8}, {name: We("Remove"), value: 6}]);
          const o = bi.createDropDown(We("Apply_this_action_to_the_selected_scripts"), {value: 0, uuid: "sms-select", name: "select"}, i, function () {
            0 == this.value ? a.setAttribute("disabled", "true") : a.removeAttribute("disabled"), r = this.value;
          }), a = bi.createButton("MultiSelectButton", "start_button", We("Start"), () => {
            if (0 == r) return void console.log("option: ?!?!");
            let e, t = null;
            if (6 == r ? t = We("Really_delete_the_selected_items_") : 8 == r && (t = We("Really_factory_reset_the_selected_items_")), t && !confirm(t)) return;
            const n = document.getElementsByName("scriptselectors"), i = [];
            for (e = 0; e < n.length; e++) i.push(n[e]);
            const o = {};
            let a, l = false, d = 100;
            for (e = 0; e < i.length; e++) if (i[e].checked && !i[e].is_hidden) if (1 == r || 2 == r || 7 == r) {
              let t;
              a = "switchEnabled";
              const n = s[i[e].s_id] ? s[i[e].s_id].script : null;
              7 == r ? n && (t = !n.enabled || !!n.foisted) : 2 == r && n && n.foisted || (t = 1 == r), void 0 !== t && (h(i[e].s_id, a, null, t, false), l = true);
            } else 3 == r ? o[i[e].s_id] = true : 5 == r ? (a = "scriptUpdate", h(i[e].s_id, a)) : 6 == r ? (a = "deleteScript", h(i[e].s_id, a, null, true), l = true, d = 1500) : 8 == r && (a = "fullReset", h(i[e].s_id, a), l = true, d = 1500);
            3 == r && (ot.wait(), Ce(o, {storage: A.script_storage, externals: A.include_externals}).then(e => (ot.wait(), de.CAN_SAVEAS_ZIP ? mr.zip.create(e.scripts).progress(ot.wait) : mr.json.create(e.scripts).then(e => new Blob([e], {type: "text/plain"})))).then(e => xe().done(() => {
              saveAs(e, "tampermonkey_scripts" + (de.CAN_SAVEAS_ZIP ? ".zip" : ".txt")), j();
            })).fail(() => z(We("Action_failed"))).always(() => {
              ot.hide();
            })), l && (ot.wait(We("Please_wait___")), window.setTimeout(() => {
              Ae();
            }, d));
          });
          a.setAttribute("class", "action_button"), a.setAttribute("disabled", "true"), o.elem.appendChild(a);
          const l = te("div", "actions", e.name, e.id, "actions");
          l.appendChild(o.elem);
          const d = bi.createButton("MultiSelectButton", "close_button", We("Close"), () => {
            u.multiselect.toggleRow(false);
          });
          return et(d).addClass("close_button"), {selAllm: t, selAll: n, actionBox: l, close: d};
        };
        (() => {
          let e, t = 0;
          u.multiselect = {};
          let n = false;
          u.multiselect.toggleRow = (t, r) => {
            const i = et(".multiselect");
            void 0 === t && (t = !n), t ? (n = true, i.addClass("multiselectvisible"), u.filter.onShow(r)) : (e = void 0, n = false, i.removeClass("multiselectvisible"), u.filter.onHide(), u.multiselect.un_selectAll(false));
          }, u.multiselect.shift_click = t => {
            const n = document.getElementsByName("scriptselectors");
            let r = [];
            if (e) {
              let i;
              for (let o of n) if (o == e || o == t.target) {
                if (r.push(o), i) break;
                i = o;
              } else i && r.push(o);
            }
            if (r.length) for (let e of n) e.checked = r.includes(e); else e = t.target.checked ? t.target : void 0;
            u.multiselect.single_click();
          }, u.multiselect.single_click = n => {
            let r = 0;
            const i = document.getElementsByName("scriptselectors");
            let o = true, s = false, a = false, l = 0;
            for (let e = 0; e < i.length; e++) {
              a = true, o = o && i[e].checked, s = s || i[e].checked;
              const t = et(i[e]).closest("tr");
              i[e].checked ? (l++, t.addClass("selected")) : t.removeClass("selected");
            }
            a && o && (r += 2), r != t && (t = r, et(".multiselectcb").prop("checked", 0 != r ? "checked" : "")), l && u.multiselect.toggleRow(true), u.multiselect.checkScroll && u.multiselect.checkScroll(), n && (e = n.target.checked ? n.target : void 0);
          }, u.multiselect.un_selectAll = n => {
            ++t > 3 && (t = 0), 1 == t && t++;
            let r = false, i = 0;
            const o = document.getElementsByName("scriptselectors");
            it(), true === n && (t = 2);
            for (let e = 0; e < o.length; e++) {
              const s = et(o[e]).closest("tr");
              false === n ? (o[e].checked = false, s.removeClass("selected")) : (0 == e && 3 == t && (t = 0), r = true, o[e].checked = 3 == t || 2 == t, o[e].checked ? (i++, s.addClass("selected"), rt.push(o[e])) : s.removeClass("selected")), i && u.multiselect.toggleRow(true);
            }
            void 0 === n ? t > 1 && !r && (t = 0) : n || (t = 0), et(".multiselectcb").prop("checked", 0 != t ? "checked" : ""), e = void 0;
          };
        })();
        const lt = {};
        Ze.onMessage.addListener((e, n, r) => {
          if ("updateOptions" == e.method) t = e.options || t, X(e.items, false), r({}); else if ("confirm" == e.method) {
            const t = e => {
              r({confirm: e});
            };
            ee(e.msg, t);
          } else if ("showMsg" == e.method) $(e.msg), r({}); else {
            if ("status" != e.method) return false;
            O(e.options), r({});
          }
          return true;
        }), le(), (() => {
          const r = te("div", "content_wrapper", "options", "main"), i = te("div", "options status", "options", "status");
          et(document.body).append(r, i).addClass("main");
          const o = te("div", "head_container", "opt", "head_container"), s = te("div", "tv_container_fit", "opt", "tv_container"), a = ne("a", "head_link", "heads", "head_link");
          a.href = "https://www.tampermonkey.net", a.target = "_blank";
          const l = te("div", "float", "heads", "head1"), d = te("img", "banner", "heads");
          d.src = Gi.brand("tampermonkey");
          const A = te("div", "float head", "heads", "head2"), u = te("div", "header_title", "heads"), h = te("div", "version", "version", "version");
          h.textContent = `v${Ze.manifest.version}`;
          const p = ne("div", "search", "box", ""), f = te("div", "footer", "footer");
          u.innerHTML = "Tampermonkey<sup>®</sup>";
          const m = te("div", "social", "social");
          m.textContent = " by Jan Biniok", m.appendChild(bi.createSocialButtons()), u.appendChild(m), l.appendChild(d), A.appendChild(u), A.appendChild(h), a.appendChild(l), a.appendChild(A), o.appendChild(a), o.appendChild(p), r.appendChild(o), r.appendChild(s), window.tab_view = c = ki.create("_main", s), c.setFooter(f), n.unshift(() => {
            Ee(c), (e => {
              let n, r;
              const i = "help", o = "help", s = ne("div", i, o, "tab_help_h"), a = s.textContent = We("Help"), l = ne("div", i, o, "tab_help");
              e.appendTab(o, s, l, e => {
                e.then(() => {
                  if (me.set(o), document.title = a, !r) {
                    ot.wait();
                    const e = te("div", "section", i, o, "ta"), s = te("div", "section_head", i, o, "head_ta"), a = te("div", "section_content", i, o, "content_ta");
                    s.textContent = We("Editor"), e.appendChild([s, a]);
                    const d = te("dl", "dl-horizontal shortcuts", i, o, "dl");
                    a.appendChild(d);
                    const A = te("dt", "keymapping", i, o, "dt_mapping");
                    if (n = te("dd", "keymapping", i, o, "dd_mapping"), A.textContent = We("Key_Mapping"), n.textContent = t.editor_keyMap, d.appendChild([A, n]), "vim" == t.editor_keyMap) n = te("dd", "keymapping", i, o, "dd_unsup"), n.textContent = We("Please_check_the_0editor0_documentation_for_more_details_", "VIM"), d.appendChild(n); else if ("emacs" == t.editor_keyMap) n = te("dd", "keymapping", i, o, "dd_unsup"), n.textContent = We("Please_check_the_0editor0_documentation_for_more_details_", "Emacs"), d.appendChild(n); else {
                      const e = [];
                      r = {};
                      const n = e => {
                        const t = e.split(/-+/), n = t.pop(), r = [];
                        let i = "";
                        return -1 != (i = ["up", "down", "left", "right"].indexOf(n.toLowerCase())) && r.push("#cursor"), n.toLowerCase().match(/f[0-9]{1,2}/) && r.push("#function"), r.length ? r.join("-") + t.join("-") + i + n : ("0000" + (100 - Math.min(n.length, 4))).slice(-4) + n + t.join("-");
                      };
                      [{Esc: "backOrClose", ..."mac" != pe ? {"Alt-Left": "previousTab", "Alt-Right": "nextTab"} : {"Alt-Up": "previousTab", "Alt-Down": "nextTab"}}, Zi.keyMap[t.editor_keyMap], "mac" != pe ? Zi.keyMap.pcDefault : Zi.keyMap.macDefault, Zi.keyMap.default].forEach(t => {
                        Object.keys(t).forEach(i => {
                          r[i] || "fallthrough" == i || (e.push({name: i, fn: t[i].replace ? t[i].replace(/([A-Z])/g, " $1").replace(/ [A-Z]/g, e => e.toLowerCase()) : t[i], sort: n(i)}), r[i] = true);
                        });
                      }), e.sort((e, t) => e.sort < t.sort ? -1 : e.sort > t.sort ? 1 : 0), e.forEach(e => {
                        const t = ne("dt", i, o, "dt_" + e.sort), n = ne("dd", i, o, "dd_" + e.sort);
                        t.textContent = e.name, n.textContent = e.fn, d.appendChild([t, n]);
                      });
                    }
                    l.appendChild(e), ot.hide();
                  }
                });
              });
            })(c);
          }), n.push(() => {
            void 0 !== fe.contribute && window.setTimeout(() => {
              _("f");
            }, 100), e.global = true;
          }), window.onbeforeunload = () => {
            let e;
            return c.getAllTabs().forEach(t => {
              e = e || t.modified();
            }), e ? We("There_are_unsaved_changed_") : void 0;
          };
        })(), ae({referrer: "options"}, e => {
          if (e.options && e.options.layout_user_css && "reset" !== fe.layout) {
            const t = document.createElement("style");
            t.innerHTML = e.options.layout_user_css, (document.head || document.body || document.documentElement || document).appendChild(t);
          }
          var r;
          t = e.options || t, e.xhr && (r = e.xhr, In = r), e.items ? (X(e.items, false), e.begging && n.push(() => {
            window.setTimeout(() => {
              _(e.begging);
            }, 100);
          })) : ot.hide();
        });
      });
    };
    window.requestFileSystem || (window.requestFileSystem = window.webkitRequestFileSystem), window.BlobBuilder || (window.BlobBuilder = window.WebKitBlobBuilder);
    const Ii = di.images, Ti = window.MirrorFrame, Ui = di.images;
    let Fi = 3;
    if (de.MOBILE) try {
      window.matchMedia("(orientation: portrait)").matches && (Fi = 1);
    } catch (e) {}
    const Mi = () => {
      mt(() => {
        let e, t = {};
        const n = (i, c) => {
          const g = [];
          if (c.sub_menu_item) {
            if (c.tabId && (e = c.tabId), c.items.length) {
              const e = te("table", "actiontable at_" + c.id, "actiontable-" + c.id);
              if (c.more_menu) {
                const t = te("tr", "", c.name, c.id, "mm_outer_tr");
                e.appendChild(t);
                const n = te("td", "", c.name, c.id, "mm_outer_td1"), i = te("td", "", c.name, c.id, "mm_outer_td2");
                i.setAttribute("colspan", 2), t.appendChild([n, i]);
                const o = te("table", "moremenu", "mmtable-" + c.id);
                i.appendChild(o);
                const s = te("tr", "moremenu_toggle", c.name, c.id, "tw_mm_tr1");
                let a = [s];
                const l = te("div", "clickable", c.name, c.id, "mmname");
                l.textContent = c.name;
                const d = te("td", "", c.name, c.id, "mm_td2");
                d.setAttribute("colspan", 2), s.appendChild(d), d.appendChild(l);
                const A = te("div", "", c.name, c.id, "mmenablercol"), u = te("i", "ifdisabled clickable far fa-" + Ui.get("enabler"), c.name, c.id, "mmenabler"), h = te("i", "ifenabled clickable far fa-" + Ui.get("enabler_enabled"), c.name, c.id, "mmenabler_enabled"), p = te("td", "moremenuenabler", c.name, c.id, "tw_td3"), f = et(p);
                let m;
                et("body").on("click", () => {
                  m ? m = false : (et(o).removeClass("show_moremenu"), f.removeClass("enabled"));
                }, false), t.addEventListener("click", () => {
                  f.toggleClass("enabled"), et(o).toggleClass("show_moremenu"), m = true;
                }, true), A.appendChild([u, h]), s.appendChild(p), p.appendChild(A), o.appendChild(a), r(o, c.items);
              } else r(e, c.items);
              g.push(e);
            }
          } else {
            let e = null;
            if (c.image ? e = bi.createIcon(Ui.get(c.image), c.name, c.id, null, "") : c.enabler && (e = bi.createIcon(Ui.get(t.enabled ? "button_ok" : "cancel"), c.name, c.uuid, null, "")), e && g.push(e), c.url || c.urls) {
              const e = ne("span", c.name, c.id, "urls"), t = c.urls || [c];
              for (let n = 0; n < t.length; n++) {
                const r = t[n], s = document.createElement("span");
                let a;
                r.social ? (a = bi.createSocialButtons(), et(s).addClass("social").append(a)) : (s.textContent = r.name, a = c.urls ? s : i, a.url = r.url, a.url_alt = r.url_alt, a.newtab = r.newtab);
                if (et(a).addClass("clickable").on("click auxclick", l), e.appendChild(s), c.always_visible && et(i).addClass("always_visible"), n < t.length - 1) {
                  const t = document.createElement("span");
                  t.textContent = " | ", e.appendChild(t);
                }
              }
              g.push(e);
            } else if (c.globalhint) l(c.options); else if (c.button) {
              const e = function () {
                let e = true;
                this.warning && (e = a(this.warning)), e && A(this.key, {reload: this.reload, data: this.data});
              }, t = te("span", c.display || "", c.name, c.id, "bu", true);
              t.textContent = c.name, i.key = c.id, i.warning = c.warning, i.reload = c.reload, i.data = c.data, i.addEventListener("click", e), et(i).addClass("clickable"), g.push(t);
            } else if (c.userscript) {
              const e = te("table", "", c.name, c.uuid, "tw"), t = te("tr", "script", c.name, c.uuid, "tw_tr1");
              let n = [t];
              const r = te("div", "clickable" + (c.active_count ? "" : " not_executed") + (c.deleted ? " was_deleted" : ""), c.name, c.uuid, "ai");
              if (c.uuid) {
                const e = [];
                let n = null;
                n = c.blacklisted || c.foisted ? "enabler_warning" : c.enabled ? c.contexter ? "enabler_enabled enabler_later" : "enabler_enabled" : "enabler_disabled";
                const a = c.blacklisted || c.foisted || (c.enabled ? We("Enabled") : We("Disabled")), l = function (e) {
                  if (e && (0 != e.button || e.ctrlKey || e.metaKey)) return o(Ze.getURL("options.html") + "#nav=" + this.key, true), e.stopPropagation(), e.preventDefault(), false;
                  c.foisted ? f(c.uuid, "whitewash", true) : f(c.uuid, "enabled", !c.enabled);
                }, A = bi.createEnabler(n, c.uuid, "enabled", {append: "enabled", disabled: c.blacklisted || c.deleted, title: a}, l), m = te("td", "", c.name, c.uuid, "tw_td1");
                t.appendChild(m), m.appendChild(A);
                const g = s(c.icon64 || c.icon, c.uuid, "icon", {default_icon: ut.images.origin("unknown")});
                r.appendChild(g);
                const _ = te("div", "script_name", c.name, c.uuid, "name");
                if (_.textContent = qe(c, "name"), r.appendChild(_), r.uuid = c.uuid, r.key = c.uuid, !c.deleted && !c.blacklisted) {
                  et(r).on("click auxclick", l);
                  const t = We("Edit"), n = bi.createIcon(Ui.get("edit"), "", c.uuid, "edit_script", t), i = te("span", "clickable", c.name, c.uuid, "edit_script");
                  i.setAttribute("title", t), i.textContent = t, e.push({always_visible: false, id: "edit_script", img: n, text: i, oc: function () {
                    o(Ze.getURL("options.html") + "#nav=" + c.uuid, true);
                  }});
                }
                if (c.blacklisted || c.foisted) {
                  let e;
                  e = c.blacklisted ? c.warnings && c.warnings.length ? `${c.blacklisted} - ${c.warnings.join("\n")}` : c.blacklisted : c.foisted, i.setAttribute("title", e), et(_).addClass("crossedout");
                } else c.active_count ? _.title = We("This_script_was_executed_0count0_times", c.active_count) : c.all_time_active_count ? _.title = We("This_script_was_executed_0count0_times_but_is_not_active_anymore", c.all_time_active_count) : _.title = We("This_script_was_not_executed_yet");
                const b = te("td", "", c.name, c.uuid, "tw_td2");
                let v;
                if (b.appendChild(r), !c.nnew && !c.system && c.abuse) {
                  const t = bi.createIcon(Ui.get("flag"), "", c.uuid, "issue", We("Report_an_issue_to_the_script_hoster_")), n = te("span", "clickable", c.name, c.uuid, "action_issue_expl");
                  n.textContent = We("Report_an_issue_to_the_script_hoster_").split(/[\.\(]+/)[0], e.push({always_visible: false, id: "action_issue_expl", img: t, text: n, oc: function () {
                    d(c.uuid, "hoster");
                  }});
                }
                if (!c.nnew && !c.system && c.support) {
                  const t = bi.createIcon(Ui.get("bug"), "", c.uuid, "bug", We("Report_a_bug")), n = te("span", "clickable", c.name, c.uuid, "action_issue_expl");
                  n.textContent = We("Report_a_bug"), e.push({always_visible: false, id: "action_issue_expl", img: t, text: n, oc: function () {
                    d(c.uuid, "author");
                  }});
                }
                const k = {};
                if (c.active_urls && c.active_urls.forEach(t => {
                  const n = Vt(t).hostname;
                  if (k[n]) return;
                  k[n] = true;
                  const r = "/" + Ut("*://*." + n + "/*", true) + "/";
                  if (c.options.override && c.options.override.use_excludes.includes(r)) return;
                  const i = We("Exclude_0domain0", n), o = bi.createIcon(Ui.get("no"), "", c.uuid, "domain" + t, i), s = te("span", "clickable", c.name, c.uuid, "action_domain");
                  s.setAttribute("title", i), s.textContent = i, e.push({always_visible: false, id: "action_domain", img: o, text: s, oc: function () {
                    f(c.uuid, "add_excludes", [r]);
                  }});
                }), !c.deleted && !c.blacklisted) {
                  const t = We("Delete"), n = bi.createIcon(Ui.get("delete"), "", c.uuid, "delete_script", t), r = te("span", "clickable", c.name, c.uuid, "delete_script");
                  r.setAttribute("title", t), r.textContent = t, e.push({always_visible: false, id: "delete_script", img: n, text: r, oc: function () {
                    p(c.uuid);
                  }});
                }
                if (c.menu_cmds) {
                  let t;
                  try {
                    t = new RegExp("^" + G(c.name) + "[ -:+/]*");
                  } catch (e) {
                    console.log(e);
                  }
                  c.menu_cmds.forEach(n => {
                    const r = te("span", "clickable", c.name, c.uuid, "menucmd_" + c.id);
                    r.setAttribute("title", c.name);
                    const o = (t ? n.name.replace(t, "") : "") || n.name;
                    r.textContent = o;
                    const s = e => {
                      h(n.id, e, () => {
                        Ae.CLOSE_ALLOWED && window.close();
                      });
                    };
                    if (n.accessKey) {
                      const e = n.accessKey[0].toUpperCase();
                      if (u(e, s, i)) {
                        const t = new RegExp(e, "i");
                        let i = r.textContent.search(t);
                        const o = [];
                        -1 == i && (r.textContent += " (" + e + ")", i = r.textContent.search(t)), o.push({text: r.textContent.substr(0, i)}), o.push({text: r.textContent.substr(i, 1), class: "underlined"}), o.push({text: r.textContent.substr(i + 1)}), r.textContent = "", o.forEach(e => {
                          const t = te("span", e.class || "", n.id, e);
                          t.textContent = e.text, r.appendChild(t);
                        });
                      } else console.warn("Registering keyboard shortcut for '" + n.name + "' failed");
                    }
                    e.push({always_visible: true, id: c.id, img: bi.createIcon(Ui.get(n.image), o, n.id, null, ""), text: r, oc: s, aoc: s});
                  });
                }
                if (c.deleted || !e.length) t.appendChild(b); else {
                  const n = te("td", "", c.name, c.uuid, "mma_outer_td2");
                  n.setAttribute("colspan", 2);
                  const r = te("table", "moremenu", "mmatable-" + c.uuid);
                  n.appendChild(r), t.appendChild(n);
                  const i = te("tr", "moremenu_toggle", c.name, c.uuid, "mma_n_tr");
                  i.appendChild(b), r.appendChild(i), e.forEach(e => {
                    const t = c.uuid + e.id, n = te("tr", e.always_visible ? " always_visible" : "", c.name, c.uuid, "tw_a_tr1"), i = te("td", "clickable", t, "tw_tdn", 2, true);
                    i.setAttribute("colspan", "2"), i.addEventListener("click", e.oc), e.aoc && i.addEventListener("auxclick", e.aoc), i.appendChild([e.img, e.text]), n.appendChild(i), r.appendChild(n);
                  }), v = te("div", "", c.name, c.uuid, "moremenuenabler");
                  const o = te("i", "ifdisabled clickable far fa-" + Ui.get("enabler"), c.name, c.uuid, "moremenuenabler"), s = te("i", "ifenabled clickable far fa-" + Ui.get("enabler_enabled"), c.name, c.uuid, "moremenuenabler_enabled"), a = te("td", "moremenuenabler", c.name, c.uuid, "tw_td3"), l = et(a);
                  let d;
                  et("body").on("click", () => {
                    d ? d = false : (et(r).removeClass("show_moremenu"), l.removeClass("enabled"));
                  }, false), v.addEventListener("click", () => {
                    l.toggleClass("enabled"), et(r).toggleClass("show_moremenu"), d = true;
                  }, true), v.appendChild([o, s]), i.appendChild(a), a.appendChild(v);
                }
              }
              e.appendChild(n), g.push(e);
            } else if (c.referrer) {
              const t = te("span", c.class || "", c.referrer, c.id, "ref", true);
              t.textContent = c.name, et(i).addClass("pleasewait"), g.push(t), m(B(c.data, {referrer: c.referrer}), r => {
                et(i).removeClass("pleasewait");
                const [o, s] = n(i, r.items[0]);
                let a, l;
                s ? (a = o, l = s) : l = o, a && e.parentNode.replaceChild(a, e), t.parentNode.replaceChild(l, t);
              });
            } else {
              const e = te("span", c.class || "", c.name, c.id, "ai");
              e.textContent = c.name, g.push(e);
            }
          }
          return g;
        }, r = (e, t, r) => {
          Object.keys(t).forEach(i => {
            const o = t[i];
            if (!e) {
              if (!r[o.pos]) return void console.warn("Warn(cAm): unknown pos " + o.pos);
              o.items && o.items.length && et(r[o.pos]).show();
            }
            const s = e || r[o.pos], a = s ? ne("tr", o.name, o.uuid || o.id, "outer") : null, l = n(a, o);
            if (l && l.length) {
              s.appendChild(a);
              for (let e, t = 0; e = l[t]; t++) {
                const n = t == l.length - 1 ? 3 - t : 0, r = ne("td", "actiontd", o.name, o.uuid || o.id, t);
                n > 0 && r.setAttribute("colspan", n), e && r.appendChild(e), a.appendChild(r);
              }
            }
          });
        }, i = e => {
          let n;
          if (n = document.getElementById("action")) n.innerHTML = ""; else {
            n = ne("div"), n.setAttribute("id", "action"), n.setAttribute("class", "action");
            const e = te("div", "action status", "status", "status");
            e.setAttribute("id", "status"), et(document.body).append(e, n);
          }
          const i = te("table", "actionlayout", "actionlayout");
          n.appendChild(i);
          const o = te("tr", "actionpostr", "hor"), s = te("td", "actionpostd", "hor_west");
          let a;
          o.appendChild(s), i.appendChild(o);
          const l = te("table", "actionregion noborder ar_top", "top"), d = te("table", "actionregion noborder ar_right", "right");
          let A;
          const c = te("table", "actionregion noborder ar_left", "left"), u = te("table", "actionregion noborder ar_bottom", "bottom");
          if (Math.min(t.action_menu_columns, Fi) > 2) {
            A = te("table", "actionregion noborder ar_center", "center");
            const e = te("td", "actionpostd", "hor_center");
            a = te("td", "actionpostd", "hor_east"), e.appendChild(A), o.appendChild(e), o.appendChild(a);
          } else Math.min(t.action_menu_columns, Fi) > 1 ? (A = d, a = te("td", "actionpostd", "hor_east"), o.appendChild(a)) : (A = c, a = s);
          et([A, d]).hide(), s.appendChild(l), a.appendChild(d), s.appendChild(c), s.appendChild(u), r(null, e, {top: l, left: c, center: A, right: d, bottom: u});
        }, o = (e, t) => {
          try {
            const n = () => {
              t && Ae.CLOSE_ALLOWED && window.close();
            };
            t ? sendMessage({method: "newTab", url: e}, n) : fe.tabs.getSelected(null, r => {
              "function" == typeof n && (r = n, n = {}), fe.tabs.sendMessage(r.id, {method: "loadUrl", url: e, newtab: t}, n, r);
            });
          } catch (e) {
            console.warn("lU:", e);
          }
        }, s = (e, t, n, r) => {
          r = r || {};
          const i = bi.createImage(r.default_icon || ut.images.empty, void 0, n, t);
          if (i.inserted) return i;
          Array.isArray(e) || (e = e ? [e] : []);
          const o = async () => {
            if (0 == e.length) return;
            const t = e.shift();
            let n, r;
            var s;
            if (t.startsWith("data:") ? n = t : r = de.SHARED_OBJECT_URLS || de.SHARED_BLOBS ? await (s = t, new Promise(e => {
              sendMessage({method: "imageUrlToTransferable", url: s}, t => {
                e(Bn.fromTransferableData(t.transferable));
              });
            })) : await Ci(t), n) i.setAttribute("src", n); else if (r) {
              if (r.tryObjectUrl) i.setAttribute("src", r.tryObjectUrl); else if (r.tryDataUri) i.setAttribute("src", r.tryDataUri); else if (r.tryBlob) {
                const e = URL.createObjectURL(r.tryBlob);
                i.setAttribute("src", e), i.onload = () => URL.revokeObjectURL(e);
              }
            } else await o();
          };
          return o(), i;
        }, a = e => {
          let t = confirm(e.msg), n = {};
          return t && e.ok ? n = e.ok : !t && e.cancel && (n = e.cancel), (e.ok || e.cancel) && (t = true), n.url && sendMessage({method: "newTab", url: n.url}, () => null), t;
        }, l = e => {
          let t;
          const n = e.key || "general";
          (t = g[n]) && et(t).remove(), g[n] = bi.createGobalHint(B(e, {instant: true, onclose: () => {
            sendMessage({method: "clearHint", key: n}, () => null);
          }}), document.getElementById("status"));
        }, d = (e, t, n) => {
          try {
            sendMessage({method: "reportAnIssue", uuid: e, to: t}, () => {
              n && n();
            });
          } catch (e) {
            console.warn("raI:", e);
          }
        }, A = (e, t) => {
          try {
            sendMessage({method: "buttonPress", name: e, data: t.data}, () => {
              t.reload && ge();
            });
          } catch (e) {
            console.warn("rSU:", e);
          }
        }, c = {}, u = (e, t, n) => {
          const r = e.charCodeAt(0);
          return c[r] ? (console.log("MenuCmdKeyListener: ...failed!"), false) : (c[r] = {key: r, cb: t, elem: n}, true);
        }, h = (e, t, n) => {
          try {
            const {keyCode: r, key: i, code: o, button: s, shiftKey: a, altKey: l, ctrlKey: d, metaKey: A} = t;
            sendMessage({method: "execMenuCmd", id: e, event: {keyCode: r, key: i, code: o, button: s, shiftKey: a, altKey: l, ctrlKey: d, metaKey: A}}, () => {
              n && n();
            });
          } catch (t) {
            console.warn("Error(eMC):", t);
          }
        }, p = e => {
          try {
            sendMessage({method: "saveScript", uuid: e, code: null}, e => {
              document.getElementById("action").innerHTML = "", e && e.items && (e.options && (t = {...t, ...e.options}), i(e.items));
            });
          } catch (e) {
            console.warn("Error(sS): " + e.message);
          }
        }, f = (e, n, r) => {
          try {
            const o = {method: "modifyScriptOptions", uuid: e};
            n && "" != n && (o[n] = r), sendMessage(o, e => {
              document.getElementById("action").innerHTML = "", e && e.items && (e.options && (t = {...t, ...e.options}), i(e.items));
            });
          } catch (e) {
            console.warn("Error(mSo): " + e.message);
          }
        }, m = (e, n) => {
          const r = Date.now(), i = e.referrer, o = e.min_delay, s = e.layout;
          sendMessage({method: "loadTree", referrer: i, layout: s, url: e.url, available_columns: Fi, uuid: e.uuid, tabId: e.tabId}, e => {
            e.options && (t = {...t, ...e.options}, t.statistics_enabled && Cn.init("act", true, {trackView: false, version: Ze.manifest.version}));
            const i = Date.now() - r, s = () => {
              n(e);
            };
            !o || i >= o ? s() : window.setTimeout(s, o - i);
          });
        }, g = {};
        Ze.onMessage.addListener((e, t, n) => {
          "update" == e.method ? _() : "status" == e.method ? (l(e.options), n({})) : console.log('onMessage: Unknown method "' + e.method + '"');
        });
        const _ = window.main = () => {
          m({referrer: "actions", min_delay: Ae.MIN_DELAY, layout: true, tabId: e}, e => {
            if (e.options && e.options.layout_user_css) {
              const t = document.createElement("style");
              t.innerHTML = e.options.layout_user_css, (document.head || document.body || document.documentElement || document).appendChild(t);
            }
            document.body.addEventListener("keydown", e => {
              e.altKey || e.ctrlKey || e.shiftKey || Object.keys(c).forEach(t => {
                const n = c[t];
                n && e.keyCode == n.key && n.cb.apply(n.elem || window, [e]);
              });
            }, false), i(e.items);
          });
        };
        _();
      });
    };
    if ((async () => {
      const e = async () => {
        je || Xe || (je = await Pe(De));
      }, t = Ve(Xe ? Fe.getUILanguage() : navigator.language);
      if (t) {
        const e = [t], n = t.split(/_/);
        n[0] !== t && e.push(n[0]), e.forEach(e => {
          De.unshift(e);
        });
      }
      await e(), Xe && (await new Promise(e => {
        Fe.getAcceptLanguages(t => {
          t.forEach(e => {
            De.push(Ve(e));
          }), e();
        });
      }), await e());
    })(), navigator.serviceWorker) {
      const e = ue.LOCALSTORAGE, t = () => {
        ["/options.html"].forEach(e => {
          navigator.serviceWorker.register("cache.js", {scope: e}).then(function (t) {
            console.debug(`SQ: registration succ'ed for ${e} scope -> ${t.scope}`);
          }).catch(function (t) {
            console.log(`SQ: registration for ${e} failed -> ${t}`);
          });
        });
      }, n = () => {
        navigator.serviceWorker.getRegistrations().then(function (e) {
          for (let t of e) t.unregister();
        });
      };
      e && "false" === e.getItem("no_sw") ? t() : n();
    }
    0 === window.location.pathname.indexOf("/action") ? (() => {
      window.sendMessage = (e, t) => {
        e.origin = "action";
        const r = e => {
          n(), t(e);
        };
        Ze.sendMessage(e, e => {
          if (e && e.i18n) return Je(e.i18n).always(() => r(e));
          r(e);
        });
      };
      let e = null, t = null;
      const n = () => {
        e && (window.clearTimeout(e), e = null), t && (t.remove(), t = null);
      };
      e = window.setTimeout(() => {
        t = et('<div id="initialWait" class="lds-css ng-scope"><div class="lds-dual-ring"><div></div><div></div></div></div>'), et("body").append(t);
      }, 200), bt({suc: () => {
        Mi();
      }, fail: () => {
        n(), confirm(We("An_internal_error_occured_Do_you_want_to_visit_the_forum_")) && window.open("https://www.tampermonkey.net/bug");
      }});
    })() : 0 === window.location.pathname.indexOf("/options") ? (window.sendMessage = (e, t) => {
      e.origin = "options", Ze.sendMessage(e, e => {
        if (e && e.i18n) return Je(e.i18n).always(() => {
          t(e);
        });
        t(e);
      });
    }, ot.wait(We("Please_wait___")), bt({suc: () => {
      ot.hide(), Bi();
    }, fail: () => {
      window.confirm(Ye("An_internal_error_occured_Do_you_want_to_visit_the_forum_")) && (window.location.href = "https://www.tampermonkey.net/bug");
    }}), document.title = "...") : 0 === window.location.pathname.indexOf("/ask") ? (window.sendMessage = (e, t) => {
      e.origin = "extension", Ze.sendMessage(e, e => {
        if (e && e.i18n) return Je(e.i18n).always(() => {
          t(e);
        });
        t(e);
      });
    }, bt({suc: () => {
      ot.wait(We("Please_wait___")), mt(() => {
        let e = null, t = {}, n = "???", r = null;
        const i = (e, n, r) => {
          r = r || {};
          const i = vt();
          try {
            const o = {aid: e, method: n, message: r.data};
            sendMessage({method: "askCom", data: o}, e => {
              const n = e.message || {};
              r.bg || ot.hide(), t = e.options || t, n.error ? (n.please_close && window.setTimeout(window.close, 100), i.reject(n)) : i.resolve(n);
            }), r.bg || ot.wait(We("Please_wait___"));
          } catch (e) {
            console.warn("sS: " + e.message), i.reject();
          }
          return i.promise();
        }, o = () => i(e.aid, "ping", {bg: true}), s = () => i(e.aid, "abort"), a = () => {
          let e;
          const t = te("div", "content_wrapper", "ask", "main"), n = te("div", "ask status", "ask", "status");
          et(document.body).append(t, n).addClass("main");
          const r = te("div", "head_container", "ask", "head_container"), i = te("div", "tv_container_fit", "ask", "tv_container"), o = ne("a", "head_link", "ask", "head_link");
          o.href = "https://www.tampermonkey.net", o.target = "_blank";
          const s = te("div", "float", "ask", "head1"), a = te("img", "banner", "ask");
          a.src = Ii.brand("tampermonkey");
          const d = te("div", "float head", "ask", "head2"), A = te("div", "header_title", "heading"), c = te("div", "version", "version", "version");
          c.textContent = `v${Ze.manifest.version}`;
          const u = ne("div", "search", "box", "");
          A.innerHTML = "Tampermonkey<sup>&reg;</sup>", s.appendChild(a), d.appendChild(A), d.appendChild(c), o.appendChild(s), o.appendChild(d), r.appendChild(o), r.appendChild(u), t.appendChild(n), t.appendChild(r), t.appendChild(i);
          const h = ki.create("_main", i);
          return e = l(h), ot.hide(), e;
        }, l = e => {
          const t = "main", r = "main", i = ne("div", t, r, "tab_content_h");
          i.textContent = n;
          const o = ne("div", t, r, "tab_content");
          return e.appendTab(J(t, r), i, o).select(), o;
        }, d = e => {
          const n = e.script, r = e.oldscript, i = te("div", "viewer_bottom_tab", "bottom", ""), o = {tv: "tv tv_alt", tv_table: "tv_table tv_table_alt", tr_tabs: "tr_tabs tr_tabs_alt", tr_content: "tr_content tr_content_alt", td_content: "td_content td_content_alt", td_tabs: "td_tabs td_tabs_alt", tv_tabs_align: "tv_tabs_align tv_tabs_align_alt", tv_tabs_fill: "tv_tabs_fill tv_tabs_fill_alt", tv_tabs_table: "tv_tabs_table tv_tabs_table_alt", tv_contents: "tv_contents tv_contents_alt", tv_tab_selected: "tv_tab tv_selected tv_tab_alt tv_selected_alt", tv_tab_close: "", tv_tab: "tv_tab tv_tab_alt", tv_content: "tv_content tv_content_alt"};
          if (t.editor_enabled) {
            const e = ki.create("_source" + n.uuid, i, o);
            let s;
            const a = (e, t) => {
              const n = te("div", "tv_content tv_content_alt", e.uuid, t + "container_o"), r = te("table", "editor_container_o editor_400p_container_o p100100 noborder", e.uuid, t + "container_o"), i = te("tr", "editor_container p100100", e.uuid, t + "container");
              n.appendChild(r), r.appendChild(i);
              const o = te("td", "editor_outer editor_400p_outer", e.uuid, t + "edit"), s = te("div", "editor_100 editor_border", e.uuid, t + "edit");
              return i.appendChild(o), o.appendChild(s), {c: n, e: s};
            };
            let l = () => {
              const e = vt();
              return we(["vendor/jsdiff/diff"], () => {
                l = vt.Pledge, e.resolve();
              }), e.promise();
            };
            (r && r.textContent != n.textContent ? l().then(() => {
              const o = ne("div", n.uuid, "diff_h");
              o.textContent = We("Changes");
              const l = a(n, "diff");
              i.diff = new Ti(l.e, {theme: "diff", fontSize: t.editor_fontSize, value: We("Please_wait___"), noButtons: true, mode: "diff", readOnly: true}, We), s = e.appendTab("diff", o, l.c, () => {
                window.setTimeout(() => {
                  i.diff.refresh(), i.diff.mirror.focus();
                }, 1);
              }), window.setTimeout(() => {
                let e;
                try {
                  e = window.JsDiff.createTwoFilesPatch(We("Current_Version"), We("New_Version"), r.textContent, n.textContent, void 0, void 0, {timeout: 4e3});
                } catch (e) {
                  console.warn(e);
                }
                e || (e = We("The_diff_for_this_script_is_too_large_to_render")), i.diff.mirror.setValue(e);
              }, 500);
            }) : vt.Pledge()).then(() => {
              const r = ne("div", n.uuid, "source_h");
              r.textContent = We("Source_Code");
              const o = a(n, "source");
              i.editor = new Ti(o.e, {theme: t.editor_theme, fontSize: t.editor_fontSize, tabSize: Number(t.editor_tabSize), styleSelectedText: true, highlightSelectionMatches: "off" != t.editor_highlightSelectionMatches ? {showToken: /\w/, annotateScrollbar: true, cursorOnly: "cursor" == t.editor_highlightSelectionMatches} : void 0, value: n.textContent, noButtons: true, matchBrackets: true, readOnly: true}, We);
              const l = e.appendTab("source", r, o.c, () => {
                window.setTimeout(() => {
                  i.editor.refresh(), i.editor.mirror.focus();
                }, 1);
              });
              s = s || l;
            }).then(() => {
              s.select();
            });
          } else {
            const e = te("div", "editor_400p_outer", "editor", n.name), t = te("div", "editor_400p editor_border", "editor", n.name);
            i.appendChild(e), e.appendChild(t);
            const r = te("textarea", "editorta", "editor", n.name);
            r.setAttribute("wrap", "off"), t.appendChild(r), r.value = n.textContent;
          }
          return i;
        }, A = (() => {
          const e = {};
          return window.addEventListener("keydown", t => {
            let n = false;
            if ("keydown" == t.type) return e[t.keyCode] && (n = e[t.keyCode](t)), n ? (t.stopPropagation(), t.preventDefault(), false) : void 0;
          }, true), {registerListener: function (t, n) {
            e[t] = n;
          }};
        })(), c = (e, t, n) => {
          n.filter(e => e.label).forEach(n => {
            const r = n.icon ? bi.createImageTextButton(n.id, n.id, n.label, n.icon, n.fn) : bi.createButton(n.label, n.id, n.label, n.fn), i = et(r);
            if (i.addClass(t), n.id && i.attr("data-btn-id", n.id), e.appendChild(r), n.focus && window.setTimeout(() => {
              i.trigger("focus");
            }, 300), n.keyDown) {
              const e = n.keyDown.keyCode ? n.keyDown.keyCode : n.keyDown, t = n.keyDown.cb ? n.keyDown.cb : n.fn;
              A.registerListener(e, t);
            }
          });
        }, u = t => {
          const n = t.script, r = te("div", "viewer_last", "install"), o = te("div", "viewer_content", "install_content"), s = te("div", "ask_action_buttons", "install_buttons"), a = [];
          return a.push({label: t.messages.action, fn: function () {
            i(e.aid, "install");
          }, focus: true}), se() < 21 && a.push({label: t.messages.flags.install ? We("Process_with_Chrome") : null, fn: function () {
            m(n.fileURL), et(r).hide();
          }}), a.push({label: We("Cancel"), fn: g, keyDown: 27}), c(s, "install", a), o.appendChild(s), r.appendChild(o), r;
        }, h = () => {
          const e = te("div", "viewer_last", "ok"), t = te("div", "viewer_content", "ok_content"), n = te("div", "ask_action_buttons", "ok_buttons");
          return c(n, "import", [{label: We("Ok"), fn: g, focus: true}]), t.appendChild(n), e.appendChild(t), e;
        }, p = (e, t) => {
          const n = ne("input", e + "_", t, "", true);
          return n.setAttribute(`data-${e}-id`, t), n.checked = true, n.type = "checkbox", n.title = We("Press_ctrl_to_toggle_all_checkboxes"), n.addEventListener("click", r => {
            (r.ctrlKey || r.metaKey) && et(`input[type=checkbox][data-${e}-id]:not([data-${e}="${t}"])`).prop("checked", n.checked);
          }), n;
        }, f = (e, t) => {
          const n = e.preparat, r = e.content, i = n.script || {}, o = i.uuid || i.id || i.name;
          n.short_info || (n.short_info = []);
          const s = te("div", "viewer_upper", o), a = te("div", "viewer_info " + (t ? "viewer_info_wide" : "viewer_info_multiple"), "general", o), l = te("div", "viewer_content", "general_content", o), d = ne("h3", "install", "heading", o);
          if (e.checkbox && d.appendChild(p("import", e.key)), i.icon || i.icon64) {
            const e = ne("img", "version", "heading", o);
            e.src = i.icon || i.icon64, d.appendChild(e);
          }
          const A = ne("span", "name", "heading", o);
          if (A.textContent = n.heading || qe(i, "name") || "", d.appendChild(A), i.version) {
            const e = te("span", "view_version", "heading", o);
            e.textContent = "v" == i.version[0] ? "" : "v", e.textContent += i.version, d.appendChild(e);
          }
          a.appendChild(d), e.externals && n.short_info.unshift({prop: "externals", dom: p("externals", e.key), label: We("Externals")}), e.storage && n.short_info.unshift({prop: "storage", dom: p("storage", e.key), label: We("Storage")}), t && n.short_info.unshift({prop: "heading", value: n.messages.heading, label: We("Action")});
          const c = te("table", "script_desc", o);
          n.short_info.forEach(e => {
            const n = (e.i18n ? qe(i, e.prop) : i[e.prop]) || e.value, r = e.dom;
            if (!r && !n && t) return;
            const s = te("tr", "script_desc", e.prop, o), a = te("td", "script_desc", e.prop, o + "dt"), l = te("td", "script_desc", e.prop, o + "dd");
            a.textContent = e.label ? e.label : "", r ? l.appendChild(r) : l.textContent = n || We("_not_set_"), s.appendChild(a), s.appendChild(l), c.appendChild(s);
          }), l.appendChild(c);
          const u = te("div", "viewer_info viewer_info_multiple", "info", o);
          let h;
          if (t) h = l; else {
            h = te("div", "viewer_content", "info_content", o);
            const e = ne("h4", "action", "heading", o);
            document.title = e.textContent = n.messages.heading, h.appendChild(e);
          }
          let f = 0;
          ["errors", "warnings", "info"].forEach(e => {
            const t = ne("table", e, o + f);
            (n.messages[e] || []).forEach(n => {
              f++;
              const r = ne("tr", e, o + f), i = ne("td", e, o + "dt" + f), s = ne("td", e, o + "dd" + f);
              if ("info" == e) if (n.label && n.value) i.textContent = n.label, s.textContent = n.value; else {
                let e = '<i class="far fa-' + Ii.get("about") + '"></i>&nbsp;';
                de.MOBILE || (i.innerHTML = e, e = ""), s.innerHTML = e + bi.safeTagsReplace(n).replace(/\n/g, "<br />");
              } else if ("warnings" == e) {
                let e = '<i class="far fa-' + Ii.get("critical") + '"></i>&nbsp;';
                de.MOBILE || (i.innerHTML = e, e = ""), s.innerHTML = e + bi.safeTagsReplace(n).replace(/\n/g, "<br />");
              } else if ("errors" == e) {
                let e = '<i class="far fa-' + Ii.get("error") + '"></i>&nbsp;';
                de.MOBILE || (i.innerHTML = e, e = ""), s.innerHTML = e + bi.safeTagsReplace(n).replace(/\n/g, "<br />");
              }
              r.appendChild(i), r.appendChild(s), t.appendChild(r);
            }), h.appendChild(t);
          });
          const m = (e, t, n, r) => {
            const s = ne("table", e, o);
            let a = 0;
            const l = {};
            if (t.forEach(t => {
              if (a > r) return;
              const i = t;
              if (l[i]) return;
              l[i] = true;
              const d = te("tr", e + "desc", i, o + a), A = te("td", e + "desc", i, o + a + "dt"), c = te("td", e + "desc", i, o + a + "dd");
              A.innerHTML = 0 == a ? bi.safeTagsReplace(n.label) : "&nbsp;", c.innerHTML = a == r ? '<span title="' + bi.safeTagsReplace(n.warning) + '">...!</span>' : bi.safeTagsReplace(i), d.appendChild(A), d.appendChild(c), s.appendChild(d), a++;
            }), i.options) {
              const t = i.options.override && i.options.override["use_" + e];
              if (t && t.length) {
                const t = te("tr", e + "desc", "ovverride", o + a), r = te("td", e + "desc", "ovverride", o + a + "dt"), i = te("td", e + "desc", "ovverride", o + a + "dd");
                r.innerHTML = 0 == a ? bi.safeTagsReplace(n.label) : "&nbsp;", i.innerHTML = bi.safeTagsReplace(" (" + We("overwritten_by_user") + ")"), t.appendChild(r), t.appendChild(i), s.appendChild(t);
              }
            }
            h.appendChild(s);
          };
          m("includes", (i.includes || []).concat(i.matches || []), {label: We("Include_s__"), warning: We("Attention_Can_not_display_all_includes_")}, 5), m("excludes", i.excludes || [], {label: We("Exclude_s__"), warning: We("Attention_Can_not_display_all_excludes_")}, 3), a.appendChild(l), u.appendChild(h), s.appendChild(a), s.appendChild(u);
          const g = te("div", "section", o, "install_src");
          g.appendChild(s), e.install && g.appendChild(e.install(n)), e.editor && g.appendChild(e.editor(n)), r.appendChild(g);
        }, m = e => {
          s(), window.setTimeout(() => {
            window.location = e + "#bypass=true";
          }, 10);
        };
        var g = () => {
          s(), window.setTimeout(() => {
            window.close();
          }, 3e3);
        };
        window.addEventListener("unload", () => {
          i(e.aid, "unload"), r && (window.clearInterval(r), r = null);
        }, {once: true});
        const _ = () => {
          window.location.search || window.location.hash ? (e = K(), e.aid ? ((e.aid, i(e.aid, "preparat")).done(t => {
            if (t.options && (t.options.statistics_enabled && Cn.init("ask", true, {trackView: false, version: Ze.manifest.version}), t.options.layout_user_css)) {
              const e = document.createElement("style");
              e.innerHTML = t.options.layout_user_css, (document.head || document.body || document.documentElement || document).appendChild(e);
            }
            n = We("Install");
            let s = null;
            t.preparat && ("install" == t.type ? s = () => {
              f({content: a(), preparat: t.preparat, install: u, editor: d});
            } : "install_error" == t.type ? s = () => {
              f({content: a(), preparat: t.preparat, install: h}, true);
            } : "import" == t.type ? s = () => {
              ((t, n) => {
                if (document.title = We("Import"), t.appendChild((t => {
                  const n = te("div", "viewer_last", "import"), r = te("div", "viewer_content", "import_content"), o = te("div", "ask_action_buttons import_buttons", "import_buttons");
                  c(o, "import", [{label: We("Import"), fn: function () {
                    const n = Object.keys(t.scripts).filter(e => !!et('input[type="checkbox"][data-import-id="' + e + '"]').value());
                    var r, o, s, a;
                    r = Object.keys(t.scripts).filter(e => !!et('input[type="checkbox"][data-storage-id="' + e + '"]').value()), o = Object.keys(t.scripts).filter(e => !!et('input[type="checkbox"][data-externals-id="' + e + '"]').value()), s = n, a = t.global_settings && !!et('input[type="checkbox"][data-settings-id="global_settings"]').value(), i(e.aid, "import", {data: {storage_ids: r, externals_ids: o, import_ids: s, global_settings: a}});
                  }, focus: true}, {label: We("Cancel"), fn: g, keyDown: 27}]), r.appendChild(o), n.appendChild(r);
                  const s = te("div", "section", "btn");
                  return s.appendChild(n), s;
                })(n)), n.global_settings) {
                  const e = te("div", "viewer_upper", "");
                  (e => {
                    const t = e.key, n = e.content, r = te("div", "viewer_upper", t), i = te("div", "viewer_info viewer_info_wide", "general", t), o = te("div", "viewer_content", "general_content", t), s = ne("h3", "install", "heading", t);
                    e.checkbox && s.appendChild(p(e.checkbox, e.key));
                    const a = ne("img", "version", "heading", t);
                    a.src = Ii.brand("tampermonkey"), s.appendChild(a);
                    const l = ne("span", "name", "heading", t);
                    l.textContent = We("Global_Settings"), s.appendChild(l), i.appendChild(s);
                    const d = te("table", "script_desc", t);
                    let A = te("tr", "settings_desc", "action", t), c = te("td", "settings_desc", "action", t + "dt"), u = te("td", "settings_desc", "action", t + "dd");
                    c.textContent = We("Action"), u.textContent = We("Global_settings_import"), A.appendChild(c), A.appendChild(u), d.appendChild(A), A = te("tr", "settings_desc", "warning", t), c = te("td", "settings_desc", "warning", t + "dt"), u = te("td", "settings_desc", "warning", t + "dd");
                    let h = '<i class="far fa-' + Ii.get("critical") + '"></i>&nbsp;';
                    de.MOBILE || (c.innerHTML = h, h = ""), u.innerHTML = h + bi.safeTagsReplace(We("This_will_overwrite_your_global_settings_")), A.appendChild(c), A.appendChild(u), d.appendChild(A), o.appendChild(d), i.appendChild(o), r.appendChild(i);
                    const f = te("div", "section", "settings_src");
                    f.appendChild(r), n.appendChild(f);
                  })({content: e, checkbox: "settings", key: "global_settings"}), t.appendChild(e);
                }
                const r = n.storage_ids || [], o = n.externals_ids || [];
                n.scripts && Object.keys(n.scripts).forEach(e => {
                  const i = n.scripts[e], s = te("div", "viewer_upper", e);
                  f({content: s, preparat: i, checkbox: "import", storage: r.includes(e), externals: o.includes(e), key: e}, true), t.appendChild(s);
                });
              })(a(), t.preparat);
            } : "permission" == t.type ? s = () => {
              ((t, n) => {
                const r = te("div", "viewer_last", "ok"), o = te("div", "viewer_content", "ok_content"), s = te("div", "ask_action_buttons", "ok_buttons");
                c(s, "permission", [{label: We("Ok"), fn: () => {
                  const t = {permissions: n.permissions, origins: n.origins};
                  Ue.request(t, n => {
                    let r;
                    Se.lastError && (r = Se.lastError.message, console.warn("notify: error on getting permission", t, "reason:", r)), ((t, n, r) => {
                      i(e.aid, "permission", {data: {granted: t, permissions: n.permissions, origins: n.origins, error: r}});
                    })(n, t, r);
                  });
                }, focus: true}, {label: We("Cancel"), fn: g, keyDown: 27}]), o.appendChild(s), r.appendChild(o);
                const a = "permission", l = te("div", "viewer_upper", a), d = te("div", "viewer_info viewer_info_wide", "general", a), A = te("div", "viewer_content", "general_content", a), u = ne("h3", "install", "heading", a), h = ne("span", "install", "heading_span", a), p = te("span", "message", "heading", a);
                document.title = h.textContent = n.title, p.innerHTML = bi.safeTagsReplace(n.message).replace(/\n/g, "<br>"), u.appendChild(h), A.appendChild(p), d.appendChild(u), d.appendChild(A), l.appendChild(d);
                const f = te("div", "section", "perm_src", a);
                f.appendChild(l), f.appendChild(r), t.appendChild(f);
              })(a(), t.preparat);
            } : "connect" == t.type && (s = () => {
              ((t, n) => {
                const r = Date.now();
                let o, s;
                n.timeout && (o = window.setTimeout(() => {
                  g(), l();
                }, n.timeout));
                const a = () => et("input[data-btn-id]")[0], l = () => {
                  let e;
                  s && window.clearInterval(s), o && window.clearTimeout(o), s = o = null, (e = a()) && e.parentNode.removeChild(e);
                }, d = te("div", "viewer_last", "ok"), A = te("div", "viewer_content", "ok_content"), u = te("div", "ask_action_buttons", "ok_buttons"), h = te("div", "ask_action_buttons", "ok_buttons"), p = te("div", "ask_action_buttons", "ok_buttons"), f = "connect";
                c(u, "connect", [{label: We("Allow_once"), icon: "button_ok", fn: function () {
                  return i(e.aid, "connect", {data: {ok: true, allow: true, once: true}});
                }, focus: true}, {label: We("Temporarily_allow"), icon: "clock", fn: function () {
                  return i(e.aid, "connect", {data: {ok: true, allow: true, temporary: true}});
                }}, {label: n.hostname != n.domain ? We("Always_allow") : We("Always_allow_domain"), icon: "yes_domain", fn: function () {
                  return i(e.aid, "connect", {data: {ok: true, allow: true}});
                }}, n.domain && n.hostname != n.domain ? {label: We("Always_allow_domain"), icon: "yes_domain", fn: function () {
                  return i(e.aid, "connect", {data: {ok: true, allow: true, whole_domain: true}});
                }} : null, n.all_domains ? {label: We("Always_allow_all_domains"), icon: "critical", fn: function () {
                  if (l(), window.confirm(We("This_gives_this_script_the_permission_to_retrieve_and_send_data_from_and_to_every_webpage__This_is_potentially_unsafe__Are_you_sure_you_want_to_continue_"))) return i(e.aid, "connect", {data: {ok: true, allow: true, all_domains: true}});
                }} : null].filter(e => e)), c(h, "connect", [{label: We("Forbid_once"), icon: "cancel", fn: function () {
                  return i(e.aid, "connect", {data: {ok: true, deny: true, once: true}});
                }, keyDown: 27}, {label: n.hostname != n.domain ? We("Always_forbid") : We("Always_forbid_domain"), icon: "no_domain", fn: function () {
                  return i(e.aid, "connect", {data: {ok: true, deny: true}});
                }}, n.domain && n.hostname != n.domain ? {label: We("Always_forbid_domain"), icon: "no", fn: function () {
                  return i(e.aid, "connect", {data: {ok: true, deny: true, whole_domain: true}});
                }} : null, {label: We("Dont_ask_again"), icon: "no", fn: function () {
                  return i(e.aid, "connect", {data: {ok: true, deny: true, all_domains: true}});
                }}].filter(e => e)), c(p, "connect_misc", [n.tabid ? {label: We("Focus_tab"), icon: "windowlist", fn: function () {
                  ((e, t) => {
                    try {
                      sendMessage({method: "buttonPress", name: "focus_tab", ...t}, () => {});
                    } catch (e) {
                      console.log("button: " + e.message);
                    }
                  })(0, {tabid: n.tabid});
                }} : null, (() => {
                  if (n.timeout) return s = window.setInterval(() => {
                    let e;
                    (e = a()) && et(e).attr("value", We("Skip_timeout__0seconds0_seconds_", Math.round((n.timeout + r - Date.now()) / 1e3)));
                  }, 1e3), {label: We("Skip_timeout__0seconds0_seconds_", Math.round(n.timeout / 1e3)), id: "skip_timeout_button", fn: l};
                })()].filter(e => e));
                const m = te("div", "viewer_upper", f), _ = te("div", "viewer_info viewer_info_wide", "general", f), b = te("div", "viewer_content", "general_content", f), v = ne("h3", "install", "heading", f), k = ne("span", "install", "heading_span", f), y = te("span", "message", "heading", f);
                if (n.script.icon) {
                  const e = ne("img", "version", "heading", f);
                  e.src = n.script.icon, k.appendChild(e);
                }
                document.title = k.textContent = We("A_userscript_wants_to_access_a_cross_origin_resource_");
                const w = te("div", "ask_action_buttons message", "help", f), R = ne("div", "help", f);
                let C = We("A_request_to_a_cross_origin_resource_is_nothing_unusual__You_just_have_to_check_whether_this_script_has_a_good_reason_to_access_this_domain__For_example_there_are_only_a_very_few_reasons_for_a_userscript_to_contact_your_bank__Please_note_that_userscript_authors_can_avoid_this_dialog_by_adding_@connect_tags_to_their_scripts__You_can_change_your_opinion_at_any_time_at_the_scripts_settings_tab_", n.connect_url, n.settings_url);
                C = bi.safeTagsReplace(C).replace(/\[url=([^\]]+)\](.*)\[\/url\]/g, '<a target="_blank" href="$1">$2 &#x2B00;</a>').replace(/\n/g, "<br>"), R.innerHTML = C + "<br><br>", w.appendChild(R), v.appendChild(k), A.appendChild([p, w, u, h]), d.appendChild(A);
                const x = te("table", "script_desc", f);
                [{prop: "name", label: We("Name")}, {prop: "src_url", label: We("Tab_URL")}, n.domain ? {prop: "hostname", label: We("Destination_domain")} : null, {prop: "url", label: We("Destination_URL")}].forEach(e => {
                  if (!e) return;
                  const t = n[e.prop] || n.script[e.prop] || e.value, r = te("tr", "script_desc", e.prop, f), i = te("td", "script_desc", e.prop, f + "dt"), o = te("td", "script_desc", e.prop, f + "dd");
                  i.textContent = e.label ? e.label : "", o.textContent = t || We("_not_set_"), r.appendChild(i), r.appendChild(o), x.appendChild(r);
                }), y.appendChild(x), b.appendChild(y), _.appendChild(v), _.appendChild(b), m.appendChild(_);
                const E = te("div", "section", "connect_src", f);
                E.appendChild(m), E.appendChild(d), t.appendChild(E);
              })(a(), t.preparat);
            }), r = window.setInterval(o, 3e3), s && window.setTimeout(() => {
              var e, n;
              s(), (e = t.preparat) && (n = e.hints) && n.length && n.forEach(e => {
                e.globalhint && bi.createGobalHint(e.options, et("body > div.status")[0]);
              });
            }, 1));
          }).fail(() => {
            g();
          }), ot.wait(We("Please_wait___"))) : g()) : window.onhashchange = () => {
            _();
          };
        };
        Ze.onMessage.addListener((e, n, r) => {
          if (t = e.options || t, "confirm" == e.method) {
            const t = e => {
              r({confirm: e});
            };
            ee(e.msg, t);
          } else {
            if ("showMsg" != e.method) return false;
            $(e.msg), r({});
          }
          return true;
        }), _();
      });
    }, fail: () => {
      window.confirm(Ye("An_internal_error_occured_Do_you_want_to_visit_the_forum_")) && (window.location.href = "https://www.tampermonkey.net/bug");
    }}), document.title = "...") : 0 === window.location.pathname.indexOf("/userscript") && (() => {
      const e = K(true);
      e.id && (window.location.href = Ze.getURL("options.html") + "#nav=" + e.id + "+editor");
    })();
  })();
})();

