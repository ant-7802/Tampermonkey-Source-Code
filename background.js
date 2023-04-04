(() => {
  function e(r) {
    var s = n[r];
    if (void 0 !== s) return s.exports;
    var o = n[r] = {exports: {}};
    return t[r](o, o.exports, e), o.exports;
  }
  var t = {2462: (e, t, n) => {
    e.exports = function e(t, n, r) {
      function s(a) {
        if (!n[a]) {
          if (!t[a]) {
            if (o) return o(a, true);
            var i = new Error("Cannot find module '" + a + "'");
            throw i.code = "MODULE_NOT_FOUND", i;
          }
          var l = n[a] = {exports: {}};
          t[a][0].call(l.exports, function (e) {
            return s(t[a][1][e] || e);
          }, l, l.exports, e, t, n, r);
        }
        return n[a].exports;
      }
      for (var o = void 0, a = 0; a < r.length; a++) s(r[a]);
      return s;
    }({1: [function (e, t, n) {
      "use strict";
      var r = e("./utils"), s = e("./support"), o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      n.encode = function (e) {
        for (var t, n, s, a, i, l, c, A = [], u = 0, d = e.length, p = d, h = "string" !== r.getTypeOf(e); u < e.length;) p = d - u, h ? (t = e[u++], n = u < d ? e[u++] : 0, s = u < d ? e[u++] : 0) : (t = e.charCodeAt(u++), n = u < d ? e.charCodeAt(u++) : 0, s = u < d ? e.charCodeAt(u++) : 0), a = t >> 2, i = (3 & t) << 4 | n >> 4, l = p > 1 ? (15 & n) << 2 | s >> 6 : 64, c = p > 2 ? 63 & s : 64, A.push(o.charAt(a) + o.charAt(i) + o.charAt(l) + o.charAt(c));
        return A.join("");
      }, n.decode = function (e) {
        var t, n, r, a, i, l, c = 0, A = 0, u = "data:";
        if (e.substr(0, u.length) === u) throw new Error("Invalid base64 input, it looks like a data url.");
        var d, p = 3 * (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "")).length / 4;
        if (e.charAt(e.length - 1) === o.charAt(64) && p--, e.charAt(e.length - 2) === o.charAt(64) && p--, p % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
        for (d = s.uint8array ? new Uint8Array(0 | p) : new Array(0 | p); c < e.length;) t = o.indexOf(e.charAt(c++)) << 2 | (a = o.indexOf(e.charAt(c++))) >> 4, n = (15 & a) << 4 | (i = o.indexOf(e.charAt(c++))) >> 2, r = (3 & i) << 6 | (l = o.indexOf(e.charAt(c++))), d[A++] = t, 64 !== i && (d[A++] = n), 64 !== l && (d[A++] = r);
        return d;
      };
    }, {"./support": 30, "./utils": 32}], 2: [function (e, t) {
      "use strict";
      function n(e, t, n, r, s) {
        this.compressedSize = e, this.uncompressedSize = t, this.crc32 = n, this.compression = r, this.compressedContent = s;
      }
      var r = e("./external"), s = e("./stream/DataWorker"), o = e("./stream/DataLengthProbe"), a = e("./stream/Crc32Probe");
      o = e("./stream/DataLengthProbe"), n.prototype = {getContentWorker: function () {
        var e = new s(r.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new o("data_length")), t = this;
        return e.on("end", function () {
          if (this.streamInfo.data_length !== t.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
        }), e;
      }, getCompressedWorker: function () {
        return new s(r.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
      }}, n.createWorkerFrom = function (e, t, n) {
        return e.pipe(new a).pipe(new o("uncompressedSize")).pipe(t.compressWorker(n)).pipe(new o("compressedSize")).withStreamInfo("compression", t);
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
          var s = r, o = 0 + n;
          e ^= -1;
          for (var a = 0; a < o; a++) e = e >>> 8 ^ s[255 & (e ^ t[a])];
          return -1 ^ e;
        }(0 | t, e, e.length) : function (e, t, n) {
          var s = r, o = 0 + n;
          e ^= -1;
          for (var a = 0; a < o; a++) e = e >>> 8 ^ s[255 & (e ^ t.charCodeAt(a))];
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
        i.call(this, "FlateWorker/" + e), this._pako = null, this._pakoAction = e, this._pakoOptions = t, this.meta = {};
      }
      var s = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array, o = e("pako"), a = e("./utils"), i = e("./stream/GenericWorker"), l = s ? "uint8array" : "array";
      n.magic = "", a.inherits(r, i), r.prototype.processChunk = function (e) {
        this.meta = e.meta, null === this._pako && this._createPako(), this._pako.push(a.transformTo(l, e.data), false);
      }, r.prototype.flush = function () {
        i.prototype.flush.call(this), null === this._pako && this._createPako(), this._pako.push([], true);
      }, r.prototype.cleanUp = function () {
        i.prototype.cleanUp.call(this), this._pako = null;
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
        s.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = t, this.zipPlatform = n, this.encodeFileName = r, this.streamFiles = e, this.accumulate = false, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
      }
      var r = e("../utils"), s = e("../stream/GenericWorker"), o = e("../utf8"), a = e("../crc32"), i = e("../signature"), l = function (e, t) {
        var n, r = "";
        for (n = 0; n < t; n++) r += String.fromCharCode(255 & e), e >>>= 8;
        return r;
      }, c = function (e, t, n, s, c, A) {
        var u, d, p = e.file, h = e.compression, f = A !== o.utf8encode, m = r.transformTo("string", i.DATA_DESCRIPTOR + l(p.name.crc32, 4) + l(p.name.compressedSize, 4) + l(p.name.uncompressedSize, 4)), g = r.transformTo("string", o.utf8encode(p.name)), v = p.comment, _ = r.transformTo("string", i.DATA_DESCRIPTOR + l(v.crc32, 4) + l(v.compressedSize, 4) + l(v.uncompressedSize, 4)), b = r.transformTo("string", o.utf8encode(v)), w = g.length !== p.name.length, k = b.length !== v.length, y = "", R = "", x = "", E = p.dir, S = p.date, G = {crc32: 0, compressedSize: 0, uncompressedSize: 0};
        t && !n || (G.crc32 = e.crc32, G.compressedSize = e.compressedSize, G.uncompressedSize = e.uncompressedSize);
        var C = 0;
        t && (C |= 8), f || !w && !k || (C |= 2048);
        var M, I, Z = 0, U = 0;
        E && (Z |= 16), "UNIX" === c ? (U = 798, Z |= (I = M = p.unixPermissions, M || (I = E ? 16893 : 33204), (65535 & I) << 16)) : (U = 20, Z |= 63 & (p.dosPermissions || 0)), u = S.getUTCHours(), u <<= 6, u |= S.getUTCMinutes(), u <<= 5, u |= S.getUTCSeconds() / 2, d = S.getUTCFullYear() - 1980, d <<= 4, d |= S.getUTCMonth() + 1, d <<= 5, d |= S.getUTCDate(), w && (R = l(1, 1) + l(a(m), 4) + g, y += "up" + l(R.length, 2) + R), k && (x = l(1, 1) + l(a(_), 4) + b, y += "uc" + l(x.length, 2) + x);
        var T = "";
        return T += "\n", T += l(C, 2), T += h.magic, T += l(u, 2), T += l(d, 2), T += l(G.crc32, 4), T += l(G.compressedSize, 4), T += l(G.uncompressedSize, 4), T += l(m.length, 2), T += l(y.length, 2), {fileRecord: i.LOCAL_FILE_HEADER + T + m + y, dirRecord: i.CENTRAL_FILE_HEADER + l(U, 2) + T + l(_.length, 2) + "" + l(Z, 4) + l(s, 4) + m + y + _};
      };
      r.inherits(n, s), n.prototype.push = function (e) {
        var t = e.meta.percent || 0, n = this.entriesCount, r = this._sources.length;
        this.accumulate ? this.contentBuffer.push(e) : (this.bytesWritten += e.data.length, s.prototype.push.call(this, {data: e.data, meta: {currentFile: this.currentFile, percent: n ? (t + 100 * (n - r - 1)) / n : 100}}));
      }, n.prototype.openedSource = function (e) {
        this.currentSourceOffset = this.bytesWritten, this.currentFile = e.file.name;
        var t = this.streamFiles && !e.file.dir;
        if (t) {
          var n = c(e, t, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          this.push({data: n.fileRecord, meta: {percent: 0}});
        } else this.accumulate = true;
      }, n.prototype.closedSource = function (e) {
        this.accumulate = false;
        var t = this.streamFiles && !e.file.dir, n = c(e, t, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
        if (this.dirRecords.push(n.dirRecord), t) this.push({data: i.DATA_DESCRIPTOR + l(e.crc32, 4) + l(e.compressedSize, 4) + l(e.uncompressedSize, 4), meta: {percent: 100}}); else for (this.push({data: n.fileRecord, meta: {percent: 0}}); this.contentBuffer.length;) this.push(this.contentBuffer.shift());
        this.currentFile = null;
      }, n.prototype.flush = function () {
        for (var e = this.bytesWritten, t = 0; t < this.dirRecords.length; t++) this.push({data: this.dirRecords[t], meta: {percent: 100}});
        var n = this.bytesWritten - e, s = function (e, t, n, s, o) {
          var a = r.transformTo("string", o(s));
          return i.CENTRAL_DIRECTORY_END + "" + l(e, 2) + l(e, 2) + l(t, 4) + l(n, 4) + l(a.length, 2) + a;
        }(this.dirRecords.length, n, e, this.zipComment, this.encodeFileName);
        this.push({data: s, meta: {percent: 100}});
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
        return !!s.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), true) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), true));
      }, n.prototype.error = function (e) {
        var t = this._sources;
        if (!s.prototype.error.call(this, e)) return false;
        for (var n = 0; n < t.length; n++) try {
          t[n].error(e);
        } catch (e) {}
        return true;
      }, n.prototype.lock = function () {
        s.prototype.lock.call(this);
        for (var e = this._sources, t = 0; t < e.length; t++) e[t].lock();
      }, t.exports = n;
    }, {"../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32}], 9: [function (e, t, n) {
      "use strict";
      var r = e("../compressions"), s = e("./ZipFileWorker");
      n.generateWorker = function (e, t, n) {
        var o = new s(t.streamFiles, n, t.platform, t.encodeFileName), a = 0;
        try {
          e.forEach(function (e, n) {
            a++;
            var s = function (e, t) {
              var n = e || t, s = r[n];
              if (!s) throw new Error(n + " is not a valid compression method !");
              return s;
            }(n.options.compression, t.compression), i = n.options.compressionOptions || t.compressionOptions || {}, l = n.dir, c = n.date;
            n._compressWorker(s, i).withStreamInfo("file", {name: e, dir: l, date: c, comment: n.comment || "", unixPermissions: n.unixPermissions, dosPermissions: n.dosPermissions}).pipe(o);
          }), o.entriesCount = a;
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
        return new s.Promise(function (t, n) {
          var r = e.decompressed.getContentWorker().pipe(new i);
          r.on("error", function (e) {
            n(e);
          }).on("end", function () {
            r.streamInfo.crc32 !== e.decompressed.crc32 ? n(new Error("Corrupted zip : CRC32 mismatch")) : t();
          }).resume();
        });
      }
      var r = e("./utils"), s = e("./external"), o = e("./utf8"), a = (r = e("./utils"), e("./zipEntries")), i = e("./stream/Crc32Probe"), l = e("./nodejsUtils");
      t.exports = function (e, t) {
        var i = this;
        return t = r.extend(t || {}, {base64: false, checkCRC32: false, optimizedBinaryString: false, createFolders: false, decodeFileName: o.utf8decode}), l.isNode && l.isStream(e) ? s.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : r.prepareContent("the loaded zip file", e, true, t.optimizedBinaryString, t.base64).then(function (e) {
          var n = new a(t);
          return n.load(e), n;
        }).then(function (e) {
          var r = [s.Promise.resolve(e)], o = e.files;
          if (t.checkCRC32) for (var a = 0; a < o.length; a++) r.push(n(o[a]));
          return s.Promise.all(r);
        }).then(function (e) {
          for (var n = e.shift(), r = n.files, s = 0; s < r.length; s++) {
            var o = r[s];
            i.file(o.fileNameStr, o.decompressed, {binary: true, optimizedBinaryString: true, date: o.date, dir: o.dir, comment: o.fileCommentStr.length ? o.fileCommentStr : null, unixPermissions: o.unixPermissions, dosPermissions: o.dosPermissions, createFolders: t.createFolders});
          }
          return n.zipComment.length && (i.comment = n.zipComment), i;
        });
      };
    }, {"./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33}], 12: [function (e, t) {
      "use strict";
      function n(e, t) {
        s.call(this, "Nodejs stream input adapter for " + e), this._upstreamEnded = false, this._bindStream(t);
      }
      var r = e("../utils"), s = e("../stream/GenericWorker");
      r.inherits(n, s), n.prototype._bindStream = function (e) {
        var t = this;
        this._stream = e, e.pause(), e.on("data", function (e) {
          t.push({data: e, meta: {percent: 0}});
        }).on("error", function (e) {
          t.isPaused ? this.generatedError = e : t.error(e);
        }).on("end", function () {
          t.isPaused ? t._upstreamEnded = true : t.end();
        });
      }, n.prototype.pause = function () {
        return !!s.prototype.pause.call(this) && (this._stream.pause(), true);
      }, n.prototype.resume = function () {
        return !!s.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), true);
      }, t.exports = n;
    }, {"../stream/GenericWorker": 28, "../utils": 32}], 13: [function (e, t) {
      "use strict";
      function n(e, t, n) {
        r.call(this, t), this._helper = e;
        var s = this;
        e.on("data", function (e, t) {
          s.push(e) || s._helper.pause(), n && n(t);
        }).on("error", function (e) {
          s.emit("error", e);
        }).on("end", function () {
          s.push(null);
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
      var r = e("./utf8"), s = e("./utils"), o = e("./stream/GenericWorker"), a = e("./stream/StreamHelper"), i = e("./defaults"), l = e("./compressedObject"), c = e("./zipObject"), A = e("./generate"), u = e("./nodejsUtils"), d = e("./nodejs/NodejsStreamInputAdapter"), p = function (e, t, n) {
        var r, a = s.getTypeOf(t), A = s.extend(n || {}, i);
        A.date = A.date || new Date, null !== A.compression && (A.compression = A.compression.toUpperCase()), "string" == typeof A.unixPermissions && (A.unixPermissions = parseInt(A.unixPermissions, 8)), A.unixPermissions && 16384 & A.unixPermissions && (A.dir = true), A.dosPermissions && 16 & A.dosPermissions && (A.dir = true), A.dir && (e = ("/" !== e.slice(-1) && (e += "/"), e)), A.createFolders && (r = h(e)) && m.call(this, r, true);
        var p, g = "string" === a && false === A.binary && false === A.base64;
        n && void 0 !== n.binary || (A.binary = !g), (t instanceof l && 0 === t.uncompressedSize || A.dir || !t || 0 === t.length) && (A.base64 = false, A.binary = true, t = "", A.compression = "STORE", a = "string"), p = t instanceof l || t instanceof o ? t : u.isNode && u.isStream(t) ? new d(e, t) : s.prepareContent(e, t, A.binary, A.optimizedBinaryString, A.base64);
        var v = new c(e, p, A);
        this.files[e] = v;
      }, h = function (e) {
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
            var s = e;
            return this.filter(function (e, t) {
              return !t.dir && s.test(e);
            });
          }
          var o = this.files[this.root + e];
          return o && !o.dir ? o : null;
        }
        return e = this.root + e, p.call(this, e, t, r), this;
      }, folder: function (e) {
        if (!e) return this;
        if ("[object RegExp]" === {}.toString.call(e)) return this.filter(function (t, n) {
          return n.dir && e.test(t);
        });
        var t = this.root + e, r = m.call(this, t), s = this.clone();
        return s.root = r.name, s;
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
          if ((n = s.extend(e || {}, {streamFiles: false, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: r.utf8encode})).type = n.type.toLowerCase(), n.compression = n.compression.toUpperCase(), "binarystring" === n.type && (n.type = "string"), !n.type) throw new Error("No output type specified.");
          s.checkSupport(n.type), "darwin" !== n.platform && "freebsd" !== n.platform && "linux" !== n.platform && "sunos" !== n.platform || (n.platform = "UNIX"), "win32" === n.platform && (n.platform = "DOS");
          var i = n.comment || this.comment || "";
          t = A.generateWorker(this, n, i);
        } catch (e) {
          (t = new o("error")).error(e);
        }
        return new a(t, n.type || "string", n.mimeType);
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
        for (var t = e.charCodeAt(0), n = e.charCodeAt(1), r = e.charCodeAt(2), s = e.charCodeAt(3), o = this.length - 4; o >= 0; --o) if (this.data[o] === t && this.data[o + 1] === n && this.data[o + 2] === r && this.data[o + 3] === s) return o - this.zero;
        return -1;
      }, n.prototype.readAndCheckSignature = function (e) {
        var t = e.charCodeAt(0), n = e.charCodeAt(1), r = e.charCodeAt(2), s = e.charCodeAt(3), o = this.readData(4);
        return t === o[0] && n === o[1] && r === o[2] && s === o[3];
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
      var n = e("../utils"), r = e("../support"), s = e("./ArrayReader"), o = e("./StringReader"), a = e("./NodeBufferReader"), i = e("./Uint8ArrayReader");
      t.exports = function (e) {
        var t = n.getTypeOf(e);
        return n.checkSupport(t), "string" !== t || r.uint8array ? "nodebuffer" === t ? new a(e) : r.uint8array ? new i(n.transformTo("uint8array", e)) : new s(n.transformTo("array", e)) : new o(e);
      };
    }, {"../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21}], 23: [function (e, t, n) {
      "use strict";
      n.LOCAL_FILE_HEADER = "PK", n.CENTRAL_FILE_HEADER = "PK", n.CENTRAL_DIRECTORY_END = "PK", n.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK", n.ZIP64_CENTRAL_DIRECTORY_END = "PK", n.DATA_DESCRIPTOR = "PK";
    }, {}], 24: [function (e, t) {
      "use strict";
      function n(e) {
        r.call(this, "ConvertWorker to " + e), this.destType = e;
      }
      var r = e("./GenericWorker"), s = e("../utils");
      s.inherits(n, r), n.prototype.processChunk = function (e) {
        this.push({data: s.transformTo(this.destType, e.data), meta: e.meta});
      }, t.exports = n;
    }, {"../utils": 32, "./GenericWorker": 28}], 25: [function (e, t) {
      "use strict";
      function n() {
        r.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
      }
      var r = e("./GenericWorker"), s = e("../crc32");
      e("../utils").inherits(n, r), n.prototype.processChunk = function (e) {
        this.streamInfo.crc32 = s(e.data, this.streamInfo.crc32 || 0), this.push(e);
      }, t.exports = n;
    }, {"../crc32": 4, "../utils": 32, "./GenericWorker": 28}], 26: [function (e, t) {
      "use strict";
      function n(e) {
        s.call(this, "DataLengthProbe for " + e), this.propName = e, this.withStreamInfo(e, 0);
      }
      var r = e("../utils"), s = e("./GenericWorker");
      r.inherits(n, s), n.prototype.processChunk = function (e) {
        if (e) {
          var t = this.streamInfo[this.propName] || 0;
          this.streamInfo[this.propName] = t + e.data.length;
        }
        s.prototype.processChunk.call(this, e);
      }, t.exports = n;
    }, {"../utils": 32, "./GenericWorker": 28}], 27: [function (e, t) {
      "use strict";
      function n(e) {
        s.call(this, "DataWorker");
        var t = this;
        this.dataIsReady = false, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = false, e.then(function (e) {
          t.dataIsReady = true, t.data = e, t.max = e && e.length || 0, t.type = r.getTypeOf(e), t.isPaused || t._tickAndRepeat();
        }, function (e) {
          t.error(e);
        });
      }
      var r = e("../utils"), s = e("./GenericWorker");
      r.inherits(n, s), n.prototype.cleanUp = function () {
        s.prototype.cleanUp.call(this), this.data = null;
      }, n.prototype.resume = function () {
        return !!s.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = true, r.delay(this._tickAndRepeat, [], this)), true);
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
        var a = t;
        switch (t) {
          case "blob":
          case "arraybuffer":
            a = "uint8array";
            break;
          case "base64":
            a = "string";
        }
        try {
          this._internalType = a, this._outputType = t, this._mimeType = n, r.checkSupport(a), this._worker = e.pipe(new s(a)), e.lock();
        } catch (e) {
          this._worker = new o("error"), this._worker.error(e);
        }
      }
      var r = e("../utils"), s = e("./ConvertWorker"), o = e("./GenericWorker"), a = e("../base64"), i = e("../support"), l = e("../external"), c = null;
      if (i.nodestream) try {
        c = e("../nodejs/NodejsStreamOutputAdapter");
      } catch (e) {}
      n.prototype = {accumulate: function (e) {
        return t = this, n = e, new l.Promise(function (e, s) {
          var o = [], i = t._internalType, l = t._outputType, c = t._mimeType;
          t.on("data", function (e, t) {
            o.push(e), n && n(t);
          }).on("error", function (e) {
            o = [], s(e);
          }).on("end", function () {
            try {
              var t = function (e, t, n) {
                switch (e) {
                  case "blob":
                    return r.newBlob(r.transformTo("arraybuffer", t), n);
                  case "base64":
                    return a.encode(t);
                  default:
                    return r.transformTo(e, t);
                }
              }(l, function (e, t) {
                var n, r = 0, s = null, o = 0;
                for (n = 0; n < t.length; n++) o += t[n].length;
                switch (e) {
                  case "string":
                    return t.join("");
                  case "array":
                    return [].concat.apply([], t);
                  case "uint8array":
                    for (s = new Uint8Array(o), n = 0; n < t.length; n++) s.set(t[n], r), r += t[n].length;
                    return s;
                  case "nodebuffer":
                    return Buffer.concat(t);
                  default:
                    throw new Error("concat : unsupported type '" + e + "'");
                }
              }(i, o), c);
              e(t);
            } catch (e) {
              s(e);
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
        return new c(this, {objectMode: "nodebuffer" !== this._outputType}, e);
      }}, t.exports = n;
    }, {"../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28}], 30: [function (e, t, n) {
      "use strict";
      if (n.base64 = true, n.array = true, n.string = true, n.arraybuffer = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array, n.nodebuffer = "undefined" != typeof Buffer, n.uint8array = "undefined" != typeof Uint8Array, "undefined" == typeof ArrayBuffer) n.blob = false; else {
        var r = new ArrayBuffer(0);
        try {
          n.blob = 0 === new Blob([r], {type: "application/zip"}).size;
        } catch (e) {
          try {
            var s = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder);
            s.append(r), n.blob = 0 === s.getBlob("application/zip").size;
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
      function s() {
        l.call(this, "utf-8 encode");
      }
      for (var o = e("./utils"), a = e("./support"), i = e("./nodejsUtils"), l = e("./stream/GenericWorker"), c = new Array(256), A = 0; A < 256; A++) c[A] = A >= 252 ? 6 : A >= 248 ? 5 : A >= 240 ? 4 : A >= 224 ? 3 : A >= 192 ? 2 : 1;
      c[254] = c[254] = 1, n.utf8encode = function (e) {
        return a.nodebuffer ? i.newBufferFrom(e, "utf-8") : function (e) {
          var t, n, r, s, o, i = e.length, l = 0;
          for (s = 0; s < i; s++) 55296 == (64512 & (n = e.charCodeAt(s))) && s + 1 < i && 56320 == (64512 & (r = e.charCodeAt(s + 1))) && (n = 65536 + (n - 55296 << 10) + (r - 56320), s++), l += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
          for (t = a.uint8array ? new Uint8Array(l) : new Array(l), o = 0, s = 0; o < l; s++) 55296 == (64512 & (n = e.charCodeAt(s))) && s + 1 < i && 56320 == (64512 & (r = e.charCodeAt(s + 1))) && (n = 65536 + (n - 55296 << 10) + (r - 56320), s++), n < 128 ? t[o++] = n : n < 2048 ? (t[o++] = 192 | n >>> 6, t[o++] = 128 | 63 & n) : n < 65536 ? (t[o++] = 224 | n >>> 12, t[o++] = 128 | n >>> 6 & 63, t[o++] = 128 | 63 & n) : (t[o++] = 240 | n >>> 18, t[o++] = 128 | n >>> 12 & 63, t[o++] = 128 | n >>> 6 & 63, t[o++] = 128 | 63 & n);
          return t;
        }(e);
      }, n.utf8decode = function (e) {
        return a.nodebuffer ? o.transformTo("nodebuffer", e).toString("utf-8") : function (e) {
          var t, n, r, s, a = e.length, i = new Array(2 * a);
          for (n = 0, t = 0; t < a;) if ((r = e[t++]) < 128) i[n++] = r; else if ((s = c[r]) > 4) i[n++] = 65533, t += s - 1; else {
            for (r &= 2 === s ? 31 : 3 === s ? 15 : 7; s > 1 && t < a;) r = r << 6 | 63 & e[t++], s--;
            s > 1 ? i[n++] = 65533 : r < 65536 ? i[n++] = r : (r -= 65536, i[n++] = 55296 | r >> 10 & 1023, i[n++] = 56320 | 1023 & r);
          }
          return i.length !== n && (i.subarray ? i = i.subarray(0, n) : i.length = n), o.applyFromCharCode(i);
        }(e = o.transformTo(a.uint8array ? "uint8array" : "array", e));
      }, o.inherits(r, l), r.prototype.processChunk = function (e) {
        var t = o.transformTo(a.uint8array ? "uint8array" : "array", e.data);
        if (this.leftOver && this.leftOver.length) {
          if (a.uint8array) {
            var r = t;
            (t = new Uint8Array(r.length + this.leftOver.length)).set(this.leftOver, 0), t.set(r, this.leftOver.length);
          } else t = this.leftOver.concat(t);
          this.leftOver = null;
        }
        var s = function (e, t) {
          var n;
          for ((t = t || e.length) > e.length && (t = e.length), n = t - 1; n >= 0 && 128 == (192 & e[n]);) n--;
          return n < 0 || 0 === n ? t : n + c[e[n]] > t ? n : t;
        }(t), i = t;
        s !== t.length && (a.uint8array ? (i = t.subarray(0, s), this.leftOver = t.subarray(s, t.length)) : (i = t.slice(0, s), this.leftOver = t.slice(s, t.length))), this.push({data: n.utf8decode(i), meta: e.meta});
      }, r.prototype.flush = function () {
        this.leftOver && this.leftOver.length && (this.push({data: n.utf8decode(this.leftOver), meta: {}}), this.leftOver = null);
      }, n.Utf8DecodeWorker = r, o.inherits(s, l), s.prototype.processChunk = function (e) {
        this.push({data: n.utf8encode(e.data), meta: e.meta});
      }, n.Utf8EncodeWorker = s;
    }, {"./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32}], 32: [function (e, t, n) {
      "use strict";
      function s(e, t) {
        for (var n = 0; n < e.length; ++n) t[n] = 255 & e.charCodeAt(n);
        return t;
      }
      function o(e) {
        var t = 65536, r = n.getTypeOf(e), s = true;
        if ("uint8array" === r ? s = d.applyCanBeUsed.uint8array : "nodebuffer" === r && (s = d.applyCanBeUsed.nodebuffer), s) for (; t > 1;) try {
          return d.stringifyByChunk(e, r, t);
        } catch (e) {
          t = Math.floor(t / 2);
        }
        return d.stringifyByChar(e);
      }
      function a(e, t) {
        for (var n = 0; n < e.length; n++) t[n] = e[n];
        return t;
      }
      var i = e("./support"), l = e("./base64"), c = e("./nodejsUtils"), A = e("set-immediate-shim"), u = e("./external");
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
      var d = {stringifyByChunk: function (e, t, n) {
        var r = [], s = 0, o = e.length;
        if (o <= n) return String.fromCharCode.apply(null, e);
        for (; s < o;) "array" === t || "nodebuffer" === t ? r.push(String.fromCharCode.apply(null, e.slice(s, Math.min(s + n, o)))) : r.push(String.fromCharCode.apply(null, e.subarray(s, Math.min(s + n, o)))), s += n;
        return r.join("");
      }, stringifyByChar: function (e) {
        for (var t = "", n = 0; n < e.length; n++) t += String.fromCharCode(e[n]);
        return t;
      }, applyCanBeUsed: {uint8array: function () {
        try {
          return i.uint8array && 1 === String.fromCharCode.apply(null, new Uint8Array(1)).length;
        } catch (e) {
          return false;
        }
      }(), nodebuffer: function () {
        try {
          return i.nodebuffer && 1 === String.fromCharCode.apply(null, c.allocBuffer(1)).length;
        } catch (e) {
          return false;
        }
      }()}};
      n.applyFromCharCode = o;
      var p = {};
      p.string = {string: r, array: function (e) {
        return s(e, new Array(e.length));
      }, arraybuffer: function (e) {
        return p.string.uint8array(e).buffer;
      }, uint8array: function (e) {
        return s(e, new Uint8Array(e.length));
      }, nodebuffer: function (e) {
        return s(e, c.allocBuffer(e.length));
      }}, p.array = {string: o, array: r, arraybuffer: function (e) {
        return new Uint8Array(e).buffer;
      }, uint8array: function (e) {
        return new Uint8Array(e);
      }, nodebuffer: function (e) {
        return c.newBufferFrom(e);
      }}, p.arraybuffer = {string: function (e) {
        return o(new Uint8Array(e));
      }, array: function (e) {
        return a(new Uint8Array(e), new Array(e.byteLength));
      }, arraybuffer: r, uint8array: function (e) {
        return new Uint8Array(e);
      }, nodebuffer: function (e) {
        return c.newBufferFrom(new Uint8Array(e));
      }}, p.uint8array = {string: o, array: function (e) {
        return a(e, new Array(e.length));
      }, arraybuffer: function (e) {
        return e.buffer;
      }, uint8array: r, nodebuffer: function (e) {
        return c.newBufferFrom(e);
      }}, p.nodebuffer = {string: o, array: function (e) {
        return a(e, new Array(e.length));
      }, arraybuffer: function (e) {
        return p.nodebuffer.uint8array(e).buffer;
      }, uint8array: function (e) {
        return a(e, new Uint8Array(e.length));
      }, nodebuffer: r}, n.transformTo = function (e, t) {
        if (t || (t = ""), !e) return t;
        n.checkSupport(e);
        var r = n.getTypeOf(t);
        return p[r][e](t);
      }, n.getTypeOf = function (e) {
        return "string" == typeof e ? "string" : "[object Array]" === {}.toString.call(e) ? "array" : i.nodebuffer && c.isBuffer(e) ? "nodebuffer" : i.uint8array && e instanceof Uint8Array ? "uint8array" : i.arraybuffer && e instanceof ArrayBuffer ? "arraybuffer" : void 0;
      }, n.checkSupport = function (e) {
        if (!i[e.toLowerCase()]) throw new Error(e + " is not supported by this platform");
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
      }, n.prepareContent = function (e, t, r, o, a) {
        return u.Promise.resolve(t).then(function (e) {
          return i.blob && (e instanceof Blob || -1 !== ["[object File]", "[object Blob]"].indexOf({}.toString.call(e))) && "undefined" != typeof FileReader ? new u.Promise(function (t, n) {
            var r = new FileReader;
            r.onload = function (e) {
              t(e.target.result);
            }, r.onerror = function (e) {
              n(e.target.error);
            }, r.readAsArrayBuffer(e);
          }) : e;
        }).then(function (t) {
          var c, A = n.getTypeOf(t);
          return A ? ("arraybuffer" === A ? t = n.transformTo("uint8array", t) : "string" === A && (a ? t = l.decode(t) : r && true !== o && (t = s(c = t, i.uint8array ? new Uint8Array(c.length) : new Array(c.length)))), t) : u.Promise.reject(new Error("Can't read the data of '" + e + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
        });
      };
    }, {"./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, "set-immediate-shim": 54}], 33: [function (e, t) {
      "use strict";
      function n(e) {
        this.files = [], this.loadOptions = e;
      }
      var r = e("./reader/readerFor"), s = e("./utils"), o = e("./signature"), a = e("./zipEntry"), i = (e("./utf8"), e("./support"));
      n.prototype = {checkSignature: function (e) {
        if (!this.reader.readAndCheckSignature(e)) {
          this.reader.index -= 4;
          var t = this.reader.readString(4);
          throw new Error("Corrupted zip or bug: unexpected signature (" + s.pretty(t) + ", expected " + s.pretty(e) + ")");
        }
      }, isSignature: function (e, t) {
        var n = this.reader.index;
        this.reader.setIndex(e);
        var r = this.reader.readString(4) === t;
        return this.reader.setIndex(n), r;
      }, readBlockEndOfCentral: function () {
        this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
        var e = this.reader.readData(this.zipCommentLength), t = i.uint8array ? "uint8array" : "array", n = s.transformTo(t, e);
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
        for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(o.CENTRAL_FILE_HEADER);) (e = new a({zip64: this.zip64}, this.loadOptions)).readCentralPart(this.reader), this.files.push(e);
        if (this.centralDirRecords !== this.files.length && 0 !== this.centralDirRecords && 0 === this.files.length) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
      }, readEndOfCentral: function () {
        var e = this.reader.lastIndexOfSignature(o.CENTRAL_DIRECTORY_END);
        if (e < 0) throw this.isSignature(0, o.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
        this.reader.setIndex(e);
        var t = e;
        if (this.checkSignature(o.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === s.MAX_VALUE_16BITS || this.diskWithCentralDirStart === s.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === s.MAX_VALUE_16BITS || this.centralDirRecords === s.MAX_VALUE_16BITS || this.centralDirSize === s.MAX_VALUE_32BITS || this.centralDirOffset === s.MAX_VALUE_32BITS) {
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
      var r = e("./reader/readerFor"), s = e("./utils"), o = e("./compressedObject"), a = e("./crc32"), i = e("./utf8"), l = e("./compressions"), c = e("./support");
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
        }(this.compressionMethod))) throw new Error("Corrupted zip : compression " + s.pretty(this.compressionMethod) + " unknown (inner file : " + s.transformTo("string", this.fileName) + ")");
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
          this.uncompressedSize === s.MAX_VALUE_32BITS && (this.uncompressedSize = e.readInt(8)), this.compressedSize === s.MAX_VALUE_32BITS && (this.compressedSize = e.readInt(8)), this.localHeaderOffset === s.MAX_VALUE_32BITS && (this.localHeaderOffset = e.readInt(8)), this.diskNumberStart === s.MAX_VALUE_32BITS && (this.diskNumberStart = e.readInt(4));
        }
      }, readExtraFields: function (e) {
        var t, n, r, s = e.index + this.extraFieldsLength;
        for (this.extraFields || (this.extraFields = {}); e.index + 4 < s;) t = e.readInt(2), n = e.readInt(2), r = e.readData(n), this.extraFields[t] = {id: t, length: n, value: r};
        e.setIndex(s);
      }, handleUTF8: function () {
        var e = c.uint8array ? "uint8array" : "array";
        if (this.useUTF8()) this.fileNameStr = i.utf8decode(this.fileName), this.fileCommentStr = i.utf8decode(this.fileComment); else {
          var t = this.findExtraFieldUnicodePath();
          if (null !== t) this.fileNameStr = t; else {
            var n = s.transformTo(e, this.fileName);
            this.fileNameStr = this.loadOptions.decodeFileName(n);
          }
          var r = this.findExtraFieldUnicodeComment();
          if (null !== r) this.fileCommentStr = r; else {
            var o = s.transformTo(e, this.fileComment);
            this.fileCommentStr = this.loadOptions.decodeFileName(o);
          }
        }
      }, findExtraFieldUnicodePath: function () {
        var e = this.extraFields[28789];
        if (e) {
          var t = r(e.value);
          return 1 !== t.readInt(1) || a(this.fileName) !== t.readInt(4) ? null : i.utf8decode(t.readData(e.length - 5));
        }
        return null;
      }, findExtraFieldUnicodeComment: function () {
        var e = this.extraFields[25461];
        if (e) {
          var t = r(e.value);
          return 1 !== t.readInt(1) || a(this.fileComment) !== t.readInt(4) ? null : i.utf8decode(t.readData(e.length - 5));
        }
        return null;
      }}, t.exports = n;
    }, {"./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32}], 35: [function (e, t) {
      "use strict";
      var n = e("./stream/StreamHelper"), r = e("./stream/DataWorker"), s = e("./utf8"), o = e("./compressedObject"), a = e("./stream/GenericWorker"), i = function (e, t, n) {
        this.name = e, this.dir = n.dir, this.date = n.date, this.comment = n.comment, this.unixPermissions = n.unixPermissions, this.dosPermissions = n.dosPermissions, this._data = t, this._dataBinary = n.binary, this.options = {compression: n.compression, compressionOptions: n.compressionOptions};
      };
      i.prototype = {internalStream: function (e) {
        var t = null, r = "string";
        try {
          if (!e) throw new Error("No output type specified.");
          var o = "string" === (r = e.toLowerCase()) || "text" === r;
          "binarystring" !== r && "text" !== r || (r = "string"), t = this._decompressWorker();
          var i = !this._dataBinary;
          i && !o && (t = t.pipe(new s.Utf8EncodeWorker)), !i && o && (t = t.pipe(new s.Utf8DecodeWorker));
        } catch (e) {
          (t = new a("error")).error(e);
        }
        return new n(t, r, "");
      }, async: function (e, t) {
        return this.internalStream(e).accumulate(t);
      }, nodeStream: function (e, t) {
        return this.internalStream(e || "nodebuffer").toNodejsStream(t);
      }, _compressWorker: function (e, t) {
        if (this._data instanceof o && this._data.compression.magic === e.magic) return this._data.getCompressedWorker();
        var n = this._decompressWorker();
        return this._dataBinary || (n = n.pipe(new s.Utf8EncodeWorker)), o.createWorkerFrom(n, e, t);
      }, _decompressWorker: function () {
        return this._data instanceof o ? this._data.getContentWorker() : this._data instanceof a ? this._data : new r(this._data);
      }};
      for (var l = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], c = function () {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, A = 0; A < l.length; A++) i.prototype[l[A]] = c;
      t.exports = i;
    }, {"./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31}], 36: [function (e, t) {
      (function (e) {
        "use strict";
        function n() {
          var e, t;
          s = true;
          for (var n = A.length; n;) {
            for (t = A, A = [], e = -1; ++e < n;) t[e]();
            n = A.length;
          }
          s = false;
        }
        var r, s, o = e.MutationObserver || e.WebKitMutationObserver;
        if (o) {
          var a = 0, i = new o(n), l = e.document.createTextNode("");
          i.observe(l, {characterData: true}), r = function () {
            l.data = a = ++a % 2;
          };
        } else if (e.setImmediate || void 0 === e.MessageChannel) r = "document" in e && "onreadystatechange" in e.document.createElement("script") ? function () {
          var t = e.document.createElement("script");
          t.onreadystatechange = function () {
            n(), t.onreadystatechange = null, t.parentNode.removeChild(t), t = null;
          }, e.document.documentElement.appendChild(t);
        } : function () {
          setTimeout(n, 0);
        }; else {
          var c = new e.MessageChannel;
          c.port1.onmessage = n, r = function () {
            c.port2.postMessage(0);
          };
        }
        var A = [];
        t.exports = function (e) {
          1 !== A.push(e) || s || r();
        };
      }.call(this, void 0 !== n.g ? n.g : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}));
    }, {}], 37: [function (e, t) {
      "use strict";
      function n() {}
      function r(e) {
        if ("function" != typeof e) throw new TypeError("resolver must be a function");
        this.state = p, this.queue = [], this.outcome = void 0, e !== n && i(this, e);
      }
      function s(e, t, n) {
        this.promise = e, "function" == typeof t && (this.onFulfilled = t, this.callFulfilled = this.otherCallFulfilled), "function" == typeof n && (this.onRejected = n, this.callRejected = this.otherCallRejected);
      }
      function o(e, t, n) {
        c(function () {
          var r;
          try {
            r = t(n);
          } catch (t) {
            return A.reject(e, t);
          }
          r === e ? A.reject(e, new TypeError("Cannot resolve promise with itself")) : A.resolve(e, r);
        });
      }
      function a(e) {
        var t = e && e.then;
        if (e && ("object" == typeof e || "function" == typeof e) && "function" == typeof t) return function () {
          t.apply(e, arguments);
        };
      }
      function i(e, t) {
        function n(t) {
          s || (s = true, A.reject(e, t));
        }
        function r(t) {
          s || (s = true, A.resolve(e, t));
        }
        var s = false, o = l(function () {
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
      var c = e("immediate"), A = {}, u = ["REJECTED"], d = ["FULFILLED"], p = ["PENDING"];
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
        if ("function" != typeof e && this.state === d || "function" != typeof t && this.state === u) return this;
        var r = new this.constructor(n);
        return this.state !== p ? o(r, this.state === d ? e : t, this.outcome) : this.queue.push(new s(r, e, t)), r;
      }, s.prototype.callFulfilled = function (e) {
        A.resolve(this.promise, e);
      }, s.prototype.otherCallFulfilled = function (e) {
        o(this.promise, this.onFulfilled, e);
      }, s.prototype.callRejected = function (e) {
        A.reject(this.promise, e);
      }, s.prototype.otherCallRejected = function (e) {
        o(this.promise, this.onRejected, e);
      }, A.resolve = function (e, t) {
        var n = l(a, t);
        if ("error" === n.status) return A.reject(e, n.value);
        var r = n.value;
        if (r) i(e, r); else {
          e.state = d, e.outcome = t;
          for (var s = -1, o = e.queue.length; ++s < o;) e.queue[s].callFulfilled(t);
        }
        return e;
      }, A.reject = function (e, t) {
        e.state = u, e.outcome = t;
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
            a[t] = e, ++i !== s || o || (o = true, A.resolve(c, a));
          }, function (e) {
            o || (o = true, A.reject(c, e));
          });
        }
        var r = this;
        if ("[object Array]" !== {}.toString.call(e)) return this.reject(new TypeError("must be an array"));
        var s = e.length, o = false;
        if (!s) return this.resolve([]);
        for (var a = new Array(s), i = 0, l = -1, c = new this(n); ++l < s;) t(e[l], l);
        return c;
      }, r.race = function (e) {
        if ("[object Array]" !== {}.toString.call(e)) return this.reject(new TypeError("must be an array"));
        var t, r = e.length, s = false;
        if (!r) return this.resolve([]);
        for (var o = -1, a = new this(n); ++o < r;) t = e[o], this.resolve(t).then(function (e) {
          s || (s = true, A.resolve(a, e));
        }, function (e) {
          s || (s = true, A.reject(a, e));
        });
        return a;
      };
    }, {immediate: 36}], 38: [function (e, t) {
      "use strict";
      var n = {};
      (0, e("./lib/utils/common").assign)(n, e("./lib/deflate"), e("./lib/inflate"), e("./lib/zlib/constants")), t.exports = n;
    }, {"./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44}], 39: [function (e, t, n) {
      "use strict";
      function r(e) {
        if (!(this instanceof r)) return new r(e);
        this.options = a.assign({level: d, method: h, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: p, to: ""}, e || {});
        var t = this.options;
        t.raw && t.windowBits > 0 ? t.windowBits = -t.windowBits : t.gzip && t.windowBits > 0 && t.windowBits < 16 && (t.windowBits += 16), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new c, this.strm.avail_out = 0;
        var n = o.deflateInit2(this.strm, t.level, t.method, t.windowBits, t.memLevel, t.strategy);
        if (n !== u) throw new Error(l[n]);
        if (t.header && o.deflateSetHeader(this.strm, t.header), t.dictionary) {
          var s;
          if (s = "string" == typeof t.dictionary ? i.string2buf(t.dictionary) : "[object ArrayBuffer]" === A.call(t.dictionary) ? new Uint8Array(t.dictionary) : t.dictionary, (n = o.deflateSetDictionary(this.strm, s)) !== u) throw new Error(l[n]);
          this._dict_set = true;
        }
      }
      function s(e, t) {
        var n = new r(t);
        if (n.push(e, true), n.err) throw n.msg || l[n.err];
        return n.result;
      }
      var o = e("./zlib/deflate"), a = e("./utils/common"), i = e("./utils/strings"), l = e("./zlib/messages"), c = e("./zlib/zstream"), A = {}.toString, u = 0, d = -1, p = 0, h = 8;
      r.prototype.push = function (e, t) {
        var n, r, s = this.strm, l = this.options.chunkSize;
        if (this.ended) return false;
        r = t === ~~t ? t : true === t ? 4 : 0, "string" == typeof e ? s.input = i.string2buf(e) : "[object ArrayBuffer]" === A.call(e) ? s.input = new Uint8Array(e) : s.input = e, s.next_in = 0, s.avail_in = s.input.length;
        do {
          if (0 === s.avail_out && (s.output = new a.Buf8(l), s.next_out = 0, s.avail_out = l), 1 !== (n = o.deflate(s, r)) && n !== u) return this.onEnd(n), this.ended = true, false;
          0 !== s.avail_out && (0 !== s.avail_in || 4 !== r && 2 !== r) || ("string" === this.options.to ? this.onData(i.buf2binstring(a.shrinkBuf(s.output, s.next_out))) : this.onData(a.shrinkBuf(s.output, s.next_out)));
        } while ((s.avail_in > 0 || 0 === s.avail_out) && 1 !== n);
        return 4 === r ? (n = o.deflateEnd(this.strm), this.onEnd(n), this.ended = true, n === u) : 2 !== r || (this.onEnd(u), s.avail_out = 0, true);
      }, r.prototype.onData = function (e) {
        this.chunks.push(e);
      }, r.prototype.onEnd = function (e) {
        e === u && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = a.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
      }, n.Deflate = r, n.deflate = s, n.deflateRaw = function (e, t) {
        return (t = t || {}).raw = true, s(e, t);
      }, n.gzip = function (e, t) {
        return (t = t || {}).gzip = true, s(e, t);
      };
    }, {"./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53}], 40: [function (e, t, n) {
      "use strict";
      function r(e) {
        if (!(this instanceof r)) return new r(e);
        this.options = a.assign({chunkSize: 16384, windowBits: 0, to: ""}, e || {});
        var t = this.options;
        t.raw && t.windowBits >= 0 && t.windowBits < 16 && (t.windowBits = -t.windowBits, 0 === t.windowBits && (t.windowBits = -15)), !(t.windowBits >= 0 && t.windowBits < 16) || e && e.windowBits || (t.windowBits += 32), t.windowBits > 15 && t.windowBits < 48 && 0 == (15 & t.windowBits) && (t.windowBits |= 15), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new A, this.strm.avail_out = 0;
        var n = o.inflateInit2(this.strm, t.windowBits);
        if (n !== l.Z_OK) throw new Error(c[n]);
        this.header = new u, o.inflateGetHeader(this.strm, this.header);
      }
      function s(e, t) {
        var n = new r(t);
        if (n.push(e, true), n.err) throw n.msg || c[n.err];
        return n.result;
      }
      var o = e("./zlib/inflate"), a = e("./utils/common"), i = e("./utils/strings"), l = e("./zlib/constants"), c = e("./zlib/messages"), A = e("./zlib/zstream"), u = e("./zlib/gzheader"), d = {}.toString;
      r.prototype.push = function (e, t) {
        var n, r, s, c, A, u, p = this.strm, h = this.options.chunkSize, f = this.options.dictionary, m = false;
        if (this.ended) return false;
        r = t === ~~t ? t : true === t ? l.Z_FINISH : l.Z_NO_FLUSH, "string" == typeof e ? p.input = i.binstring2buf(e) : "[object ArrayBuffer]" === d.call(e) ? p.input = new Uint8Array(e) : p.input = e, p.next_in = 0, p.avail_in = p.input.length;
        do {
          if (0 === p.avail_out && (p.output = new a.Buf8(h), p.next_out = 0, p.avail_out = h), (n = o.inflate(p, l.Z_NO_FLUSH)) === l.Z_NEED_DICT && f && (u = "string" == typeof f ? i.string2buf(f) : "[object ArrayBuffer]" === d.call(f) ? new Uint8Array(f) : f, n = o.inflateSetDictionary(this.strm, u)), n === l.Z_BUF_ERROR && true === m && (n = l.Z_OK, m = false), n !== l.Z_STREAM_END && n !== l.Z_OK) return this.onEnd(n), this.ended = true, false;
          p.next_out && (0 !== p.avail_out && n !== l.Z_STREAM_END && (0 !== p.avail_in || r !== l.Z_FINISH && r !== l.Z_SYNC_FLUSH) || ("string" === this.options.to ? (s = i.utf8border(p.output, p.next_out), c = p.next_out - s, A = i.buf2string(p.output, s), p.next_out = c, p.avail_out = h - c, c && a.arraySet(p.output, p.output, s, c, 0), this.onData(A)) : this.onData(a.shrinkBuf(p.output, p.next_out)))), 0 === p.avail_in && 0 === p.avail_out && (m = true);
        } while ((p.avail_in > 0 || 0 === p.avail_out) && n !== l.Z_STREAM_END);
        return n === l.Z_STREAM_END && (r = l.Z_FINISH), r === l.Z_FINISH ? (n = o.inflateEnd(this.strm), this.onEnd(n), this.ended = true, n === l.Z_OK) : r !== l.Z_SYNC_FLUSH || (this.onEnd(l.Z_OK), p.avail_out = 0, true);
      }, r.prototype.onData = function (e) {
        this.chunks.push(e);
      }, r.prototype.onEnd = function (e) {
        e === l.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = a.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
      }, n.Inflate = r, n.inflate = s, n.inflateRaw = function (e, t) {
        return (t = t || {}).raw = true, s(e, t);
      }, n.ungzip = s;
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
      var s = {arraySet: function (e, t, n, r, s) {
        if (t.subarray && e.subarray) e.set(t.subarray(n, n + r), s); else for (var o = 0; o < r; o++) e[s + o] = t[n + o];
      }, flattenChunks: function (e) {
        var t, n, r, s, o, a;
        for (r = 0, t = 0, n = e.length; t < n; t++) r += e[t].length;
        for (a = new Uint8Array(r), s = 0, t = 0, n = e.length; t < n; t++) o = e[t], a.set(o, s), s += o.length;
        return a;
      }}, o = {arraySet: function (e, t, n, r, s) {
        for (var o = 0; o < r; o++) e[s + o] = t[n + o];
      }, flattenChunks: function (e) {
        return [].concat.apply([], e);
      }};
      n.setTyped = function (e) {
        e ? (n.Buf8 = Uint8Array, n.Buf16 = Uint16Array, n.Buf32 = Int32Array, n.assign(n, s)) : (n.Buf8 = Array, n.Buf16 = Array, n.Buf32 = Array, n.assign(n, o));
      }, n.setTyped(r);
    }, {}], 42: [function (e, t, n) {
      "use strict";
      function r(e, t) {
        if (t < 65537 && (e.subarray && a || !e.subarray && o)) return String.fromCharCode.apply(null, s.shrinkBuf(e, t));
        for (var n = "", r = 0; r < t; r++) n += String.fromCharCode(e[r]);
        return n;
      }
      var s = e("./common"), o = true, a = true;
      try {
        String.fromCharCode.apply(null, [0]);
      } catch (e) {
        o = false;
      }
      try {
        String.fromCharCode.apply(null, new Uint8Array(1));
      } catch (e) {
        a = false;
      }
      for (var i = new s.Buf8(256), l = 0; l < 256; l++) i[l] = l >= 252 ? 6 : l >= 248 ? 5 : l >= 240 ? 4 : l >= 224 ? 3 : l >= 192 ? 2 : 1;
      i[254] = i[254] = 1, n.string2buf = function (e) {
        var t, n, r, o, a, i = e.length, l = 0;
        for (o = 0; o < i; o++) 55296 == (64512 & (n = e.charCodeAt(o))) && o + 1 < i && 56320 == (64512 & (r = e.charCodeAt(o + 1))) && (n = 65536 + (n - 55296 << 10) + (r - 56320), o++), l += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
        for (t = new s.Buf8(l), a = 0, o = 0; a < l; o++) 55296 == (64512 & (n = e.charCodeAt(o))) && o + 1 < i && 56320 == (64512 & (r = e.charCodeAt(o + 1))) && (n = 65536 + (n - 55296 << 10) + (r - 56320), o++), n < 128 ? t[a++] = n : n < 2048 ? (t[a++] = 192 | n >>> 6, t[a++] = 128 | 63 & n) : n < 65536 ? (t[a++] = 224 | n >>> 12, t[a++] = 128 | n >>> 6 & 63, t[a++] = 128 | 63 & n) : (t[a++] = 240 | n >>> 18, t[a++] = 128 | n >>> 12 & 63, t[a++] = 128 | n >>> 6 & 63, t[a++] = 128 | 63 & n);
        return t;
      }, n.buf2binstring = function (e) {
        return r(e, e.length);
      }, n.binstring2buf = function (e) {
        for (var t = new s.Buf8(e.length), n = 0, r = t.length; n < r; n++) t[n] = e.charCodeAt(n);
        return t;
      }, n.buf2string = function (e, t) {
        var n, s, o, a, l = t || e.length, c = new Array(2 * l);
        for (s = 0, n = 0; n < l;) if ((o = e[n++]) < 128) c[s++] = o; else if ((a = i[o]) > 4) c[s++] = 65533, n += a - 1; else {
          for (o &= 2 === a ? 31 : 3 === a ? 15 : 7; a > 1 && n < l;) o = o << 6 | 63 & e[n++], a--;
          a > 1 ? c[s++] = 65533 : o < 65536 ? c[s++] = o : (o -= 65536, c[s++] = 55296 | o >> 10 & 1023, c[s++] = 56320 | 1023 & o);
        }
        return r(c, s);
      }, n.utf8border = function (e, t) {
        var n;
        for ((t = t || e.length) > e.length && (t = e.length), n = t - 1; n >= 0 && 128 == (192 & e[n]);) n--;
        return n < 0 || 0 === n ? t : n + i[e[n]] > t ? n : t;
      };
    }, {"./common": 41}], 43: [function (e, t) {
      "use strict";
      t.exports = function (e, t, n, r) {
        for (var s = 65535 & e | 0, o = e >>> 16 & 65535 | 0, a = 0; 0 !== n;) {
          n -= a = n > 2e3 ? 2e3 : n;
          do {
            o = o + (s = s + t[r++] | 0) | 0;
          } while (--a);
          s %= 65521, o %= 65521;
        }
        return s | o << 16 | 0;
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
      t.exports = function (e, t, r, s) {
        var o = n, a = s + r;
        e ^= -1;
        for (var i = s; i < a; i++) e = e >>> 8 ^ o[255 & (e ^ t[i])];
        return -1 ^ e;
      };
    }, {}], 46: [function (e, t, n) {
      "use strict";
      function o(e) {
        for (var t = e.length; --t >= 0;) e[t] = 0;
      }
      function a(e) {
        var t = e.state, n = t.pending;
        n > e.avail_out && (n = e.avail_out), 0 !== n && (b.arraySet(e.output, t.pending_buf, t.pending_out, n, e.next_out), e.next_out += n, t.pending_out += n, e.total_out += n, e.avail_out -= n, t.pending -= n, 0 === t.pending && (t.pending_out = 0));
      }
      function i(e, t) {
        w._tr_flush_block(e, e.block_start >= 0 ? e.block_start : -1, e.strstart - e.block_start, t), e.block_start = e.strstart, a(e.strm);
      }
      function l(e, t) {
        e.pending_buf[e.pending++] = t;
      }
      function c(e, t) {
        e.pending_buf[e.pending++] = t >>> 8 & 255, e.pending_buf[e.pending++] = 255 & t;
      }
      function A(e, t) {
        var n, r, s = e.max_chain_length, o = e.strstart, a = e.prev_length, i = e.nice_match, l = e.strstart > e.w_size - V ? e.strstart - (e.w_size - V) : 0, c = e.window, A = e.w_mask, u = e.prev, d = e.strstart + D, p = c[o + a - 1], h = c[o + a];
        e.prev_length >= e.good_match && (s >>= 2), i > e.lookahead && (i = e.lookahead);
        do {
          if (c[(n = t) + a] === h && c[n + a - 1] === p && c[n] === c[o] && c[++n] === c[o + 1]) {
            o += 2, n++;
            do {} while (c[++o] === c[++n] && c[++o] === c[++n] && c[++o] === c[++n] && c[++o] === c[++n] && c[++o] === c[++n] && c[++o] === c[++n] && c[++o] === c[++n] && c[++o] === c[++n] && o < d);
            if (r = D - (d - o), o = d - D, r > a) {
              if (e.match_start = t, a = r, r >= i) break;
              p = c[o + a - 1], h = c[o + a];
            }
          }
        } while ((t = u[t & A]) > l && 0 != --s);
        return a <= e.lookahead ? a : e.lookahead;
      }
      function u(e) {
        var t, n, r, s, o, a, i, l, c, A, u = e.w_size;
        do {
          if (s = e.window_size - e.lookahead - e.strstart, e.strstart >= u + (u - V)) {
            b.arraySet(e.window, e.window, u, u, 0), e.match_start -= u, e.strstart -= u, e.block_start -= u, t = n = e.hash_size;
            do {
              r = e.head[--t], e.head[t] = r >= u ? r - u : 0;
            } while (--n);
            t = n = u;
            do {
              r = e.prev[--t], e.prev[t] = r >= u ? r - u : 0;
            } while (--n);
            s += u;
          }
          if (0 === e.strm.avail_in) break;
          if (a = e.strm, i = e.window, l = e.strstart + e.lookahead, c = s, A = void 0, (A = a.avail_in) > c && (A = c), n = 0 === A ? 0 : (a.avail_in -= A, b.arraySet(i, a.input, a.next_in, A, l), 1 === a.state.wrap ? a.adler = k(a.adler, i, A, l) : 2 === a.state.wrap && (a.adler = y(a.adler, i, A, l)), a.next_in += A, a.total_in += A, A), e.lookahead += n, e.lookahead + e.insert >= P) for (o = e.strstart - e.insert, e.ins_h = e.window[o], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[o + 1]) & e.hash_mask; e.insert && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[o + P - 1]) & e.hash_mask, e.prev[o & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = o, o++, e.insert--, !(e.lookahead + e.insert < P));) ;
        } while (e.lookahead < V && 0 !== e.strm.avail_in);
      }
      function d(e, t) {
        for (var n, r;;) {
          if (e.lookahead < V) {
            if (u(e), e.lookahead < V && t === x) return H;
            if (0 === e.lookahead) break;
          }
          if (n = 0, e.lookahead >= P && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + P - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), 0 !== n && e.strstart - n <= e.w_size - V && (e.match_length = A(e, n)), e.match_length >= P) if (r = w._tr_tally(e, e.strstart - e.match_start, e.match_length - P), e.lookahead -= e.match_length, e.match_length <= e.max_lazy_match && e.lookahead >= P) {
            e.match_length--;
            do {
              e.strstart++, e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + P - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart;
            } while (0 != --e.match_length);
            e.strstart++;
          } else e.strstart += e.match_length, e.match_length = 0, e.ins_h = e.window[e.strstart], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 1]) & e.hash_mask; else r = w._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++;
          if (r && (i(e, false), 0 === e.strm.avail_out)) return H;
        }
        return e.insert = e.strstart < P - 1 ? e.strstart : P - 1, t === E ? (i(e, true), 0 === e.strm.avail_out ? Y : W) : e.last_lit && (i(e, false), 0 === e.strm.avail_out) ? H : X;
      }
      function p(e, t) {
        for (var n, r, s;;) {
          if (e.lookahead < V) {
            if (u(e), e.lookahead < V && t === x) return H;
            if (0 === e.lookahead) break;
          }
          if (n = 0, e.lookahead >= P && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + P - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), e.prev_length = e.match_length, e.prev_match = e.match_start, e.match_length = P - 1, 0 !== n && e.prev_length < e.max_lazy_match && e.strstart - n <= e.w_size - V && (e.match_length = A(e, n), e.match_length <= 5 && (e.strategy === M || e.match_length === P && e.strstart - e.match_start > 4096) && (e.match_length = P - 1)), e.prev_length >= P && e.match_length <= e.prev_length) {
            s = e.strstart + e.lookahead - P, r = w._tr_tally(e, e.strstart - 1 - e.prev_match, e.prev_length - P), e.lookahead -= e.prev_length - 1, e.prev_length -= 2;
            do {
              ++e.strstart <= s && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + P - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart);
            } while (0 != --e.prev_length);
            if (e.match_available = 0, e.match_length = P - 1, e.strstart++, r && (i(e, false), 0 === e.strm.avail_out)) return H;
          } else if (e.match_available) {
            if ((r = w._tr_tally(e, 0, e.window[e.strstart - 1])) && i(e, false), e.strstart++, e.lookahead--, 0 === e.strm.avail_out) return H;
          } else e.match_available = 1, e.strstart++, e.lookahead--;
        }
        return e.match_available && (r = w._tr_tally(e, 0, e.window[e.strstart - 1]), e.match_available = 0), e.insert = e.strstart < P - 1 ? e.strstart : P - 1, t === E ? (i(e, true), 0 === e.strm.avail_out ? Y : W) : e.last_lit && (i(e, false), 0 === e.strm.avail_out) ? H : X;
      }
      function h(e, t, n, r, s) {
        this.good_length = e, this.max_lazy = t, this.nice_length = n, this.max_chain = r, this.func = s;
      }
      function f() {
        this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = U, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new b.Buf16(2 * j), this.dyn_dtree = new b.Buf16(2 * (2 * O + 1)), this.bl_tree = new b.Buf16(2 * (2 * F + 1)), o(this.dyn_ltree), o(this.dyn_dtree), o(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new b.Buf16(L + 1), this.heap = new b.Buf16(2 * B + 1), o(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new b.Buf16(2 * B + 1), o(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
      }
      function m(e) {
        var t;
        return e && e.state ? (e.total_in = e.total_out = 0, e.data_type = Z, (t = e.state).pending = 0, t.pending_out = 0, t.wrap < 0 && (t.wrap = -t.wrap), t.status = t.wrap ? N : q, e.adler = 2 === t.wrap ? 0 : 1, t.last_flush = x, w._tr_init(t), S) : (e.msg = R[G], G);
      }
      function g(e) {
        var t, n = m(e);
        return n === S && ((t = e.state).window_size = 2 * t.w_size, o(t.head), t.max_lazy_match = _[t.level].max_lazy, t.good_match = _[t.level].good_length, t.nice_match = _[t.level].nice_length, t.max_chain_length = _[t.level].max_chain, t.strstart = 0, t.block_start = 0, t.lookahead = 0, t.insert = 0, t.match_length = t.prev_length = P - 1, t.match_available = 0, t.ins_h = 0), n;
      }
      function v(e, t, n, s, o, a) {
        if (!e) return G;
        var i = 1;
        if (t === C && (t = 6), s < 0 ? (i = 0, s = -s) : s > 15 && (i = 2, s -= 16), o < 1 || o > T || n !== U || s < 8 || s > 15 || t < 0 || t > 9 || a < 0 || a > I) return e.msg = R[G], G;
        8 === s && (s = 9);
        var l = new f;
        return e.state = l, l.strm = e, l.wrap = i, l.gzhead = null, l.w_bits = s, l.w_size = 1 << l.w_bits, l.w_mask = l.w_size - 1, l.hash_bits = o + 7, l.hash_size = 1 << l.hash_bits, l.hash_mask = l.hash_size - 1, l.hash_shift = ~~((l.hash_bits + P - 1) / P), l.window = new b.Buf8(2 * l.w_size), l.head = new b.Buf16(l.hash_size), l.prev = new b.Buf16(l.w_size), l.lit_bufsize = 1 << o + 6, l.pending_buf_size = 4 * l.lit_bufsize, l.pending_buf = new b.Buf8(l.pending_buf_size), l.d_buf = 1 * l.lit_bufsize, l.l_buf = 3 * l.lit_bufsize, l.level = t, l.strategy = a, l.method = n, g(e);
      }
      var _, b = e("../utils/common"), w = e("./trees"), k = e("./adler32"), y = e("./crc32"), R = e("./messages"), x = 0, E = 4, S = 0, G = -2, C = -1, M = 1, I = 4, Z = 2, U = 8, T = 9, B = 286, O = 30, F = 19, j = 2 * B + 1, L = 15, P = 3, D = 258, V = D + P + 1, N = 42, z = 103, q = 113, Q = 666, H = 1, X = 2, Y = 3, W = 4;
      _ = [new h(0, 0, 0, 0, function (e, t) {
        var n = 65535;
        for (n > e.pending_buf_size - 5 && (n = e.pending_buf_size - 5);;) {
          if (e.lookahead <= 1) {
            if (u(e), 0 === e.lookahead && t === x) return H;
            if (0 === e.lookahead) break;
          }
          e.strstart += e.lookahead, e.lookahead = 0;
          var r = e.block_start + n;
          if ((0 === e.strstart || e.strstart >= r) && (e.lookahead = e.strstart - r, e.strstart = r, i(e, false), 0 === e.strm.avail_out)) return H;
          if (e.strstart - e.block_start >= e.w_size - V && (i(e, false), 0 === e.strm.avail_out)) return H;
        }
        return e.insert = 0, t === E ? (i(e, true), 0 === e.strm.avail_out ? Y : W) : (e.strstart > e.block_start && (i(e, false), e.strm.avail_out), H);
      }), new h(4, 4, 8, 4, d), new h(4, 5, 16, 8, d), new h(4, 6, 32, 32, d), new h(4, 4, 16, 16, p), new h(8, 16, 32, 32, p), new h(8, 16, 128, 128, p), new h(8, 32, 128, 256, p), new h(32, 128, 258, 1024, p), new h(32, 258, 258, 4096, p)], n.deflateInit = function (e, t) {
        return v(e, t, U, 15, 8, 0);
      }, n.deflateInit2 = v, n.deflateReset = g, n.deflateResetKeep = m, n.deflateSetHeader = function (e, t) {
        return e && e.state ? 2 !== e.state.wrap ? G : (e.state.gzhead = t, S) : G;
      }, n.deflate = function (e, t) {
        var n, A, d, p;
        if (!e || !e.state || t > 5 || t < 0) return e ? (e.msg = R[G], G) : G;
        if (A = e.state, !e.output || !e.input && 0 !== e.avail_in || A.status === Q && t !== E) return e.msg = R[0 === e.avail_out ? -5 : G], 0 === e.avail_out ? -5 : G;
        if (A.strm = e, n = A.last_flush, A.last_flush = t, A.status === N) if (2 === A.wrap) e.adler = 0, l(A, 31), l(A, 139), l(A, 8), A.gzhead ? (l(A, (A.gzhead.text ? 1 : 0) + (A.gzhead.hcrc ? 2 : 0) + (A.gzhead.extra ? 4 : 0) + (A.gzhead.name ? 8 : 0) + (A.gzhead.comment ? 16 : 0)), l(A, 255 & A.gzhead.time), l(A, A.gzhead.time >> 8 & 255), l(A, A.gzhead.time >> 16 & 255), l(A, A.gzhead.time >> 24 & 255), l(A, 9 === A.level ? 2 : A.strategy >= 2 || A.level < 2 ? 4 : 0), l(A, 255 & A.gzhead.os), A.gzhead.extra && A.gzhead.extra.length && (l(A, 255 & A.gzhead.extra.length), l(A, A.gzhead.extra.length >> 8 & 255)), A.gzhead.hcrc && (e.adler = y(e.adler, A.pending_buf, A.pending, 0)), A.gzindex = 0, A.status = 69) : (l(A, 0), l(A, 0), l(A, 0), l(A, 0), l(A, 0), l(A, 9 === A.level ? 2 : A.strategy >= 2 || A.level < 2 ? 4 : 0), l(A, 3), A.status = q); else {
          var h = U + (A.w_bits - 8 << 4) << 8;
          h |= (A.strategy >= 2 || A.level < 2 ? 0 : A.level < 6 ? 1 : 6 === A.level ? 2 : 3) << 6, 0 !== A.strstart && (h |= 32), h += 31 - h % 31, A.status = q, c(A, h), 0 !== A.strstart && (c(A, e.adler >>> 16), c(A, 65535 & e.adler)), e.adler = 1;
        }
        if (69 === A.status) if (A.gzhead.extra) {
          for (d = A.pending; A.gzindex < (65535 & A.gzhead.extra.length) && (A.pending !== A.pending_buf_size || (A.gzhead.hcrc && A.pending > d && (e.adler = y(e.adler, A.pending_buf, A.pending - d, d)), a(e), d = A.pending, A.pending !== A.pending_buf_size));) l(A, 255 & A.gzhead.extra[A.gzindex]), A.gzindex++;
          A.gzhead.hcrc && A.pending > d && (e.adler = y(e.adler, A.pending_buf, A.pending - d, d)), A.gzindex === A.gzhead.extra.length && (A.gzindex = 0, A.status = 73);
        } else A.status = 73;
        if (73 === A.status) if (A.gzhead.name) {
          d = A.pending;
          do {
            if (A.pending === A.pending_buf_size && (A.gzhead.hcrc && A.pending > d && (e.adler = y(e.adler, A.pending_buf, A.pending - d, d)), a(e), d = A.pending, A.pending === A.pending_buf_size)) {
              p = 1;
              break;
            }
            p = A.gzindex < A.gzhead.name.length ? 255 & A.gzhead.name.charCodeAt(A.gzindex++) : 0, l(A, p);
          } while (0 !== p);
          A.gzhead.hcrc && A.pending > d && (e.adler = y(e.adler, A.pending_buf, A.pending - d, d)), 0 === p && (A.gzindex = 0, A.status = 91);
        } else A.status = 91;
        if (91 === A.status) if (A.gzhead.comment) {
          d = A.pending;
          do {
            if (A.pending === A.pending_buf_size && (A.gzhead.hcrc && A.pending > d && (e.adler = y(e.adler, A.pending_buf, A.pending - d, d)), a(e), d = A.pending, A.pending === A.pending_buf_size)) {
              p = 1;
              break;
            }
            p = A.gzindex < A.gzhead.comment.length ? 255 & A.gzhead.comment.charCodeAt(A.gzindex++) : 0, l(A, p);
          } while (0 !== p);
          A.gzhead.hcrc && A.pending > d && (e.adler = y(e.adler, A.pending_buf, A.pending - d, d)), 0 === p && (A.status = z);
        } else A.status = z;
        if (A.status === z && (A.gzhead.hcrc ? (A.pending + 2 > A.pending_buf_size && a(e), A.pending + 2 <= A.pending_buf_size && (l(A, 255 & e.adler), l(A, e.adler >> 8 & 255), e.adler = 0, A.status = q)) : A.status = q), 0 !== A.pending) {
          if (a(e), 0 === e.avail_out) return A.last_flush = -1, S;
        } else if (0 === e.avail_in && (t << 1) - (t > 4 ? 9 : 0) <= (n << 1) - (n > 4 ? 9 : 0) && t !== E) return e.msg = R[-5], -5;
        if (A.status === Q && 0 !== e.avail_in) return e.msg = R[-5], -5;
        if (0 !== e.avail_in || 0 !== A.lookahead || t !== x && A.status !== Q) {
          var f = 2 === A.strategy ? function (e, t) {
            for (var n;;) {
              if (0 === e.lookahead && (u(e), 0 === e.lookahead)) {
                if (t === x) return H;
                break;
              }
              if (e.match_length = 0, n = w._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++, n && (i(e, false), 0 === e.strm.avail_out)) return H;
            }
            return e.insert = 0, t === E ? (i(e, true), 0 === e.strm.avail_out ? Y : W) : e.last_lit && (i(e, false), 0 === e.strm.avail_out) ? H : X;
          }(A, t) : 3 === A.strategy ? function (e, t) {
            for (var n, r, s, o, a = e.window;;) {
              if (e.lookahead <= D) {
                if (u(e), e.lookahead <= D && t === x) return H;
                if (0 === e.lookahead) break;
              }
              if (e.match_length = 0, e.lookahead >= P && e.strstart > 0 && (r = a[s = e.strstart - 1]) === a[++s] && r === a[++s] && r === a[++s]) {
                o = e.strstart + D;
                do {} while (r === a[++s] && r === a[++s] && r === a[++s] && r === a[++s] && r === a[++s] && r === a[++s] && r === a[++s] && r === a[++s] && s < o);
                e.match_length = D - (o - s), e.match_length > e.lookahead && (e.match_length = e.lookahead);
              }
              if (e.match_length >= P ? (n = w._tr_tally(e, 1, e.match_length - P), e.lookahead -= e.match_length, e.strstart += e.match_length, e.match_length = 0) : (n = w._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++), n && (i(e, false), 0 === e.strm.avail_out)) return H;
            }
            return e.insert = 0, t === E ? (i(e, true), 0 === e.strm.avail_out ? Y : W) : e.last_lit && (i(e, false), 0 === e.strm.avail_out) ? H : X;
          }(A, t) : _[A.level].func(A, t);
          if (f !== Y && f !== W || (A.status = Q), f === H || f === Y) return 0 === e.avail_out && (A.last_flush = -1), S;
          if (f === X && (1 === t ? w._tr_align(A) : 5 !== t && (w._tr_stored_block(A, 0, 0, false), 3 === t && (o(A.head), 0 === A.lookahead && (A.strstart = 0, A.block_start = 0, A.insert = 0))), a(e), 0 === e.avail_out)) return A.last_flush = -1, S;
        }
        return t !== E ? S : A.wrap <= 0 ? 1 : (2 === A.wrap ? (l(A, 255 & e.adler), l(A, e.adler >> 8 & 255), l(A, e.adler >> 16 & 255), l(A, e.adler >> 24 & 255), l(A, 255 & e.total_in), l(A, e.total_in >> 8 & 255), l(A, e.total_in >> 16 & 255), l(A, e.total_in >> 24 & 255)) : (c(A, e.adler >>> 16), c(A, 65535 & e.adler)), a(e), A.wrap > 0 && (A.wrap = -A.wrap), 0 !== A.pending ? S : 1);
      }, n.deflateEnd = function (e) {
        var t;
        return e && e.state ? (t = e.state.status) !== N && 69 !== t && 73 !== t && 91 !== t && t !== z && t !== q && t !== Q ? (e.msg = R[G], G) : (e.state = null, t === q ? (e.msg = R[-3], -3) : S) : G;
      }, n.deflateSetDictionary = function (e, t) {
        var n, r, s, a, i, l, c, A, d = t.length;
        if (!e || !e.state) return G;
        if (2 === (a = (n = e.state).wrap) || 1 === a && n.status !== N || n.lookahead) return G;
        for (1 === a && (e.adler = k(e.adler, t, d, 0)), n.wrap = 0, d >= n.w_size && (0 === a && (o(n.head), n.strstart = 0, n.block_start = 0, n.insert = 0), A = new b.Buf8(n.w_size), b.arraySet(A, t, d - n.w_size, n.w_size, 0), t = A, d = n.w_size), i = e.avail_in, l = e.next_in, c = e.input, e.avail_in = d, e.next_in = 0, e.input = t, u(n); n.lookahead >= P;) {
          r = n.strstart, s = n.lookahead - (P - 1);
          do {
            n.ins_h = (n.ins_h << n.hash_shift ^ n.window[r + P - 1]) & n.hash_mask, n.prev[r & n.w_mask] = n.head[n.ins_h], n.head[n.ins_h] = r, r++;
          } while (--s);
          n.strstart = r, n.lookahead = P - 1, u(n);
        }
        return n.strstart += n.lookahead, n.block_start = n.strstart, n.insert = n.lookahead, n.lookahead = 0, n.match_length = n.prev_length = P - 1, n.match_available = 0, e.next_in = l, e.input = c, e.avail_in = i, n.wrap = a, S;
      }, n.deflateInfo = "pako deflate (from Nodeca project)";
    }, {"../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52}], 47: [function (e, t) {
      "use strict";
      t.exports = function () {
        this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = false;
      };
    }, {}], 48: [function (e, t) {
      "use strict";
      t.exports = function (e, t) {
        var n, r, s, o, a, i, l, c, A, u, d, p, h, f, m, g, v, _, b, w, k, y, R, x, E;
        n = e.state, r = e.next_in, x = e.input, s = r + (e.avail_in - 5), o = e.next_out, E = e.output, a = o - (t - e.avail_out), i = o + (e.avail_out - 257), l = n.dmax, c = n.wsize, A = n.whave, u = n.wnext, d = n.window, p = n.hold, h = n.bits, f = n.lencode, m = n.distcode, g = (1 << n.lenbits) - 1, v = (1 << n.distbits) - 1;
        e: do {
          h < 15 && (p += x[r++] << h, h += 8, p += x[r++] << h, h += 8), _ = f[p & g];
          t: for (;;) {
            if (p >>>= b = _ >>> 24, h -= b, 0 == (b = _ >>> 16 & 255)) E[o++] = 65535 & _; else {
              if (!(16 & b)) {
                if (0 == (64 & b)) {
                  _ = f[(65535 & _) + (p & (1 << b) - 1)];
                  continue t;
                }
                if (32 & b) {
                  n.mode = 12;
                  break e;
                }
                e.msg = "invalid literal/length code", n.mode = 30;
                break e;
              }
              w = 65535 & _, (b &= 15) && (h < b && (p += x[r++] << h, h += 8), w += p & (1 << b) - 1, p >>>= b, h -= b), h < 15 && (p += x[r++] << h, h += 8, p += x[r++] << h, h += 8), _ = m[p & v];
              n: for (;;) {
                if (p >>>= b = _ >>> 24, h -= b, !(16 & (b = _ >>> 16 & 255))) {
                  if (0 == (64 & b)) {
                    _ = m[(65535 & _) + (p & (1 << b) - 1)];
                    continue n;
                  }
                  e.msg = "invalid distance code", n.mode = 30;
                  break e;
                }
                if (k = 65535 & _, h < (b &= 15) && (p += x[r++] << h, (h += 8) < b && (p += x[r++] << h, h += 8)), (k += p & (1 << b) - 1) > l) {
                  e.msg = "invalid distance too far back", n.mode = 30;
                  break e;
                }
                if (p >>>= b, h -= b, k > (b = o - a)) {
                  if ((b = k - b) > A && n.sane) {
                    e.msg = "invalid distance too far back", n.mode = 30;
                    break e;
                  }
                  if (y = 0, R = d, 0 === u) {
                    if (y += c - b, b < w) {
                      w -= b;
                      do {
                        E[o++] = d[y++];
                      } while (--b);
                      y = o - k, R = E;
                    }
                  } else if (u < b) {
                    if (y += c + u - b, (b -= u) < w) {
                      w -= b;
                      do {
                        E[o++] = d[y++];
                      } while (--b);
                      if (y = 0, u < w) {
                        w -= b = u;
                        do {
                          E[o++] = d[y++];
                        } while (--b);
                        y = o - k, R = E;
                      }
                    }
                  } else if (y += u - b, b < w) {
                    w -= b;
                    do {
                      E[o++] = d[y++];
                    } while (--b);
                    y = o - k, R = E;
                  }
                  for (; w > 2;) E[o++] = R[y++], E[o++] = R[y++], E[o++] = R[y++], w -= 3;
                  w && (E[o++] = R[y++], w > 1 && (E[o++] = R[y++]));
                } else {
                  y = o - k;
                  do {
                    E[o++] = E[y++], E[o++] = E[y++], E[o++] = E[y++], w -= 3;
                  } while (w > 2);
                  w && (E[o++] = E[y++], w > 1 && (E[o++] = E[y++]));
                }
                break;
              }
            }
            break;
          }
        } while (r < s && o < i);
        r -= w = h >> 3, p &= (1 << (h -= w << 3)) - 1, e.next_in = r, e.next_out = o, e.avail_in = r < s ? s - r + 5 : 5 - (r - s), e.avail_out = o < i ? i - o + 257 : 257 - (o - i), n.hold = p, n.bits = h;
      };
    }, {}], 49: [function (e, t, n) {
      "use strict";
      function s() {
        this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new p.Buf16(320), this.work = new p.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
      }
      function o(e) {
        var t;
        return e && e.state ? (t = e.state, e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = 1 & t.wrap), t.mode = k, t.last = 0, t.havedict = 0, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new p.Buf32(x), t.distcode = t.distdyn = new p.Buf32(E), t.sane = 1, t.back = -1, b) : w;
      }
      function a(e) {
        var t;
        return e && e.state ? ((t = e.state).wsize = 0, t.whave = 0, t.wnext = 0, o(e)) : w;
      }
      function i(e, t) {
        var n, r;
        return e && e.state ? (r = e.state, t < 0 ? (n = 0, t = -t) : (n = 1 + (t >> 4), t < 48 && (t &= 15)), t && (t < 8 || t > 15) ? w : (null !== r.window && r.wbits !== t && (r.window = null), r.wrap = n, r.wbits = t, a(e))) : w;
      }
      function l(e, t) {
        var n, r;
        return e ? (r = new s, e.state = r, r.window = null, (n = i(e, t)) !== b && (e.state = null), n) : w;
      }
      function c(e) {
        if (S) {
          var t;
          for (u = new p.Buf32(512), d = new p.Buf32(32), t = 0; t < 144;) e.lens[t++] = 8;
          for (; t < 256;) e.lens[t++] = 9;
          for (; t < 280;) e.lens[t++] = 7;
          for (; t < 288;) e.lens[t++] = 8;
          for (g(v, e.lens, 0, 288, u, 0, e.work, {bits: 9}), t = 0; t < 32;) e.lens[t++] = 5;
          g(_, e.lens, 0, 32, d, 0, e.work, {bits: 5}), S = false;
        }
        e.lencode = u, e.lenbits = 9, e.distcode = d, e.distbits = 5;
      }
      function A(e, t, n, r) {
        var s, o = e.state;
        return null === o.window && (o.wsize = 1 << o.wbits, o.wnext = 0, o.whave = 0, o.window = new p.Buf8(o.wsize)), r >= o.wsize ? (p.arraySet(o.window, t, n - o.wsize, o.wsize, 0), o.wnext = 0, o.whave = o.wsize) : ((s = o.wsize - o.wnext) > r && (s = r), p.arraySet(o.window, t, n - r, s, o.wnext), (r -= s) ? (p.arraySet(o.window, t, n - r, r, 0), o.wnext = r, o.whave = o.wsize) : (o.wnext += s, o.wnext === o.wsize && (o.wnext = 0), o.whave < o.wsize && (o.whave += s))), 0;
      }
      var u, d, p = e("../utils/common"), h = e("./adler32"), f = e("./crc32"), m = e("./inffast"), g = e("./inftrees"), v = 1, _ = 2, b = 0, w = -2, k = 1, y = 12, R = 30, x = 852, E = 592, S = true;
      n.inflateReset = a, n.inflateReset2 = i, n.inflateResetKeep = o, n.inflateInit = function (e) {
        return l(e, 15);
      }, n.inflateInit2 = l, n.inflate = function (e, t) {
        var n, s, o, a, i, l, u, d, x, E, S, G, C, M, I, Z, U, T, B, O, F, j, L, P, D = 0, V = new p.Buf8(4), N = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
        if (!e || !e.state || !e.output || !e.input && 0 !== e.avail_in) return w;
        (n = e.state).mode === y && (n.mode = 13), i = e.next_out, o = e.output, u = e.avail_out, a = e.next_in, s = e.input, l = e.avail_in, d = n.hold, x = n.bits, E = l, S = u, j = b;
        e: for (;;) switch (n.mode) {
          case k:
            if (0 === n.wrap) {
              n.mode = 13;
              break;
            }
            for (; x < 16;) {
              if (0 === l) break e;
              l--, d += s[a++] << x, x += 8;
            }
            if (2 & n.wrap && 35615 === d) {
              n.check = 0, V[0] = 255 & d, V[1] = d >>> 8 & 255, n.check = f(n.check, V, 2, 0), d = 0, x = 0, n.mode = 2;
              break;
            }
            if (n.flags = 0, n.head && (n.head.done = false), !(1 & n.wrap) || (((255 & d) << 8) + (d >> 8)) % 31) {
              e.msg = "incorrect header check", n.mode = R;
              break;
            }
            if (8 != (15 & d)) {
              e.msg = "unknown compression method", n.mode = R;
              break;
            }
            if (x -= 4, F = 8 + (15 & (d >>>= 4)), 0 === n.wbits) n.wbits = F; else if (F > n.wbits) {
              e.msg = "invalid window size", n.mode = R;
              break;
            }
            n.dmax = 1 << F, e.adler = n.check = 1, n.mode = 512 & d ? 10 : y, d = 0, x = 0;
            break;
          case 2:
            for (; x < 16;) {
              if (0 === l) break e;
              l--, d += s[a++] << x, x += 8;
            }
            if (n.flags = d, 8 != (255 & n.flags)) {
              e.msg = "unknown compression method", n.mode = R;
              break;
            }
            if (57344 & n.flags) {
              e.msg = "unknown header flags set", n.mode = R;
              break;
            }
            n.head && (n.head.text = d >> 8 & 1), 512 & n.flags && (V[0] = 255 & d, V[1] = d >>> 8 & 255, n.check = f(n.check, V, 2, 0)), d = 0, x = 0, n.mode = 3;
          case 3:
            for (; x < 32;) {
              if (0 === l) break e;
              l--, d += s[a++] << x, x += 8;
            }
            n.head && (n.head.time = d), 512 & n.flags && (V[0] = 255 & d, V[1] = d >>> 8 & 255, V[2] = d >>> 16 & 255, V[3] = d >>> 24 & 255, n.check = f(n.check, V, 4, 0)), d = 0, x = 0, n.mode = 4;
          case 4:
            for (; x < 16;) {
              if (0 === l) break e;
              l--, d += s[a++] << x, x += 8;
            }
            n.head && (n.head.xflags = 255 & d, n.head.os = d >> 8), 512 & n.flags && (V[0] = 255 & d, V[1] = d >>> 8 & 255, n.check = f(n.check, V, 2, 0)), d = 0, x = 0, n.mode = 5;
          case 5:
            if (1024 & n.flags) {
              for (; x < 16;) {
                if (0 === l) break e;
                l--, d += s[a++] << x, x += 8;
              }
              n.length = d, n.head && (n.head.extra_len = d), 512 & n.flags && (V[0] = 255 & d, V[1] = d >>> 8 & 255, n.check = f(n.check, V, 2, 0)), d = 0, x = 0;
            } else n.head && (n.head.extra = null);
            n.mode = 6;
          case 6:
            if (1024 & n.flags && ((G = n.length) > l && (G = l), G && (n.head && (F = n.head.extra_len - n.length, n.head.extra || (n.head.extra = new Array(n.head.extra_len)), p.arraySet(n.head.extra, s, a, G, F)), 512 & n.flags && (n.check = f(n.check, s, G, a)), l -= G, a += G, n.length -= G), n.length)) break e;
            n.length = 0, n.mode = 7;
          case 7:
            if (2048 & n.flags) {
              if (0 === l) break e;
              G = 0;
              do {
                F = s[a + G++], n.head && F && n.length < 65536 && (n.head.name += String.fromCharCode(F));
              } while (F && G < l);
              if (512 & n.flags && (n.check = f(n.check, s, G, a)), l -= G, a += G, F) break e;
            } else n.head && (n.head.name = null);
            n.length = 0, n.mode = 8;
          case 8:
            if (4096 & n.flags) {
              if (0 === l) break e;
              G = 0;
              do {
                F = s[a + G++], n.head && F && n.length < 65536 && (n.head.comment += String.fromCharCode(F));
              } while (F && G < l);
              if (512 & n.flags && (n.check = f(n.check, s, G, a)), l -= G, a += G, F) break e;
            } else n.head && (n.head.comment = null);
            n.mode = 9;
          case 9:
            if (512 & n.flags) {
              for (; x < 16;) {
                if (0 === l) break e;
                l--, d += s[a++] << x, x += 8;
              }
              if (d !== (65535 & n.check)) {
                e.msg = "header crc mismatch", n.mode = R;
                break;
              }
              d = 0, x = 0;
            }
            n.head && (n.head.hcrc = n.flags >> 9 & 1, n.head.done = true), e.adler = n.check = 0, n.mode = y;
            break;
          case 10:
            for (; x < 32;) {
              if (0 === l) break e;
              l--, d += s[a++] << x, x += 8;
            }
            e.adler = n.check = (d >>> 24 & 255) + (d >>> 8 & 65280) + ((65280 & d) << 8) + ((255 & d) << 24), d = 0, x = 0, n.mode = 11;
          case 11:
            if (0 === n.havedict) return e.next_out = i, e.avail_out = u, e.next_in = a, e.avail_in = l, n.hold = d, n.bits = x, 2;
            e.adler = n.check = 1, n.mode = y;
          case y:
            if (5 === t || 6 === t) break e;
          case 13:
            if (n.last) {
              d >>>= 7 & x, x -= 7 & x, n.mode = 27;
              break;
            }
            for (; x < 3;) {
              if (0 === l) break e;
              l--, d += s[a++] << x, x += 8;
            }
            switch (n.last = 1 & d, x -= 1, 3 & (d >>>= 1)) {
              case 0:
                n.mode = 14;
                break;
              case 1:
                if (c(n), n.mode = 20, 6 === t) {
                  d >>>= 2, x -= 2;
                  break e;
                }
                break;
              case 2:
                n.mode = 17;
                break;
              case 3:
                e.msg = "invalid block type", n.mode = R;
            }
            d >>>= 2, x -= 2;
            break;
          case 14:
            for (d >>>= 7 & x, x -= 7 & x; x < 32;) {
              if (0 === l) break e;
              l--, d += s[a++] << x, x += 8;
            }
            if ((65535 & d) != (d >>> 16 ^ 65535)) {
              e.msg = "invalid stored block lengths", n.mode = R;
              break;
            }
            if (n.length = 65535 & d, d = 0, x = 0, n.mode = 15, 6 === t) break e;
          case 15:
            n.mode = 16;
          case 16:
            if (G = n.length) {
              if (G > l && (G = l), G > u && (G = u), 0 === G) break e;
              p.arraySet(o, s, a, G, i), l -= G, a += G, u -= G, i += G, n.length -= G;
              break;
            }
            n.mode = y;
            break;
          case 17:
            for (; x < 14;) {
              if (0 === l) break e;
              l--, d += s[a++] << x, x += 8;
            }
            if (n.nlen = 257 + (31 & d), d >>>= 5, x -= 5, n.ndist = 1 + (31 & d), d >>>= 5, x -= 5, n.ncode = 4 + (15 & d), d >>>= 4, x -= 4, n.nlen > 286 || n.ndist > 30) {
              e.msg = "too many length or distance symbols", n.mode = R;
              break;
            }
            n.have = 0, n.mode = 18;
          case 18:
            for (; n.have < n.ncode;) {
              for (; x < 3;) {
                if (0 === l) break e;
                l--, d += s[a++] << x, x += 8;
              }
              n.lens[N[n.have++]] = 7 & d, d >>>= 3, x -= 3;
            }
            for (; n.have < 19;) n.lens[N[n.have++]] = 0;
            if (n.lencode = n.lendyn, n.lenbits = 7, L = {bits: n.lenbits}, j = g(0, n.lens, 0, 19, n.lencode, 0, n.work, L), n.lenbits = L.bits, j) {
              e.msg = "invalid code lengths set", n.mode = R;
              break;
            }
            n.have = 0, n.mode = 19;
          case 19:
            for (; n.have < n.nlen + n.ndist;) {
              for (; Z = (D = n.lencode[d & (1 << n.lenbits) - 1]) >>> 16 & 255, U = 65535 & D, !((I = D >>> 24) <= x);) {
                if (0 === l) break e;
                l--, d += s[a++] << x, x += 8;
              }
              if (U < 16) d >>>= I, x -= I, n.lens[n.have++] = U; else {
                if (16 === U) {
                  for (P = I + 2; x < P;) {
                    if (0 === l) break e;
                    l--, d += s[a++] << x, x += 8;
                  }
                  if (d >>>= I, x -= I, 0 === n.have) {
                    e.msg = "invalid bit length repeat", n.mode = R;
                    break;
                  }
                  F = n.lens[n.have - 1], G = 3 + (3 & d), d >>>= 2, x -= 2;
                } else if (17 === U) {
                  for (P = I + 3; x < P;) {
                    if (0 === l) break e;
                    l--, d += s[a++] << x, x += 8;
                  }
                  x -= I, F = 0, G = 3 + (7 & (d >>>= I)), d >>>= 3, x -= 3;
                } else {
                  for (P = I + 7; x < P;) {
                    if (0 === l) break e;
                    l--, d += s[a++] << x, x += 8;
                  }
                  x -= I, F = 0, G = 11 + (127 & (d >>>= I)), d >>>= 7, x -= 7;
                }
                if (n.have + G > n.nlen + n.ndist) {
                  e.msg = "invalid bit length repeat", n.mode = R;
                  break;
                }
                for (; G--;) n.lens[n.have++] = F;
              }
            }
            if (n.mode === R) break;
            if (0 === n.lens[256]) {
              e.msg = "invalid code -- missing end-of-block", n.mode = R;
              break;
            }
            if (n.lenbits = 9, L = {bits: n.lenbits}, j = g(v, n.lens, 0, n.nlen, n.lencode, 0, n.work, L), n.lenbits = L.bits, j) {
              e.msg = "invalid literal/lengths set", n.mode = R;
              break;
            }
            if (n.distbits = 6, n.distcode = n.distdyn, L = {bits: n.distbits}, j = g(_, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, L), n.distbits = L.bits, j) {
              e.msg = "invalid distances set", n.mode = R;
              break;
            }
            if (n.mode = 20, 6 === t) break e;
          case 20:
            n.mode = 21;
          case 21:
            if (l >= 6 && u >= 258) {
              e.next_out = i, e.avail_out = u, e.next_in = a, e.avail_in = l, n.hold = d, n.bits = x, m(e, S), i = e.next_out, o = e.output, u = e.avail_out, a = e.next_in, s = e.input, l = e.avail_in, d = n.hold, x = n.bits, n.mode === y && (n.back = -1);
              break;
            }
            for (n.back = 0; Z = (D = n.lencode[d & (1 << n.lenbits) - 1]) >>> 16 & 255, U = 65535 & D, !((I = D >>> 24) <= x);) {
              if (0 === l) break e;
              l--, d += s[a++] << x, x += 8;
            }
            if (Z && 0 == (240 & Z)) {
              for (T = I, B = Z, O = U; Z = (D = n.lencode[O + ((d & (1 << T + B) - 1) >> T)]) >>> 16 & 255, U = 65535 & D, !(T + (I = D >>> 24) <= x);) {
                if (0 === l) break e;
                l--, d += s[a++] << x, x += 8;
              }
              d >>>= T, x -= T, n.back += T;
            }
            if (d >>>= I, x -= I, n.back += I, n.length = U, 0 === Z) {
              n.mode = 26;
              break;
            }
            if (32 & Z) {
              n.back = -1, n.mode = y;
              break;
            }
            if (64 & Z) {
              e.msg = "invalid literal/length code", n.mode = R;
              break;
            }
            n.extra = 15 & Z, n.mode = 22;
          case 22:
            if (n.extra) {
              for (P = n.extra; x < P;) {
                if (0 === l) break e;
                l--, d += s[a++] << x, x += 8;
              }
              n.length += d & (1 << n.extra) - 1, d >>>= n.extra, x -= n.extra, n.back += n.extra;
            }
            n.was = n.length, n.mode = 23;
          case 23:
            for (; Z = (D = n.distcode[d & (1 << n.distbits) - 1]) >>> 16 & 255, U = 65535 & D, !((I = D >>> 24) <= x);) {
              if (0 === l) break e;
              l--, d += s[a++] << x, x += 8;
            }
            if (0 == (240 & Z)) {
              for (T = I, B = Z, O = U; Z = (D = n.distcode[O + ((d & (1 << T + B) - 1) >> T)]) >>> 16 & 255, U = 65535 & D, !(T + (I = D >>> 24) <= x);) {
                if (0 === l) break e;
                l--, d += s[a++] << x, x += 8;
              }
              d >>>= T, x -= T, n.back += T;
            }
            if (d >>>= I, x -= I, n.back += I, 64 & Z) {
              e.msg = "invalid distance code", n.mode = R;
              break;
            }
            n.offset = U, n.extra = 15 & Z, n.mode = 24;
          case 24:
            if (n.extra) {
              for (P = n.extra; x < P;) {
                if (0 === l) break e;
                l--, d += s[a++] << x, x += 8;
              }
              n.offset += d & (1 << n.extra) - 1, d >>>= n.extra, x -= n.extra, n.back += n.extra;
            }
            if (n.offset > n.dmax) {
              e.msg = "invalid distance too far back", n.mode = R;
              break;
            }
            n.mode = 25;
          case 25:
            if (0 === u) break e;
            if (G = S - u, n.offset > G) {
              if ((G = n.offset - G) > n.whave && n.sane) {
                e.msg = "invalid distance too far back", n.mode = R;
                break;
              }
              G > n.wnext ? (G -= n.wnext, C = n.wsize - G) : C = n.wnext - G, G > n.length && (G = n.length), M = n.window;
            } else M = o, C = i - n.offset, G = n.length;
            G > u && (G = u), u -= G, n.length -= G;
            do {
              o[i++] = M[C++];
            } while (--G);
            0 === n.length && (n.mode = 21);
            break;
          case 26:
            if (0 === u) break e;
            o[i++] = n.length, u--, n.mode = 21;
            break;
          case 27:
            if (n.wrap) {
              for (; x < 32;) {
                if (0 === l) break e;
                l--, d |= s[a++] << x, x += 8;
              }
              if (S -= u, e.total_out += S, n.total += S, S && (e.adler = n.check = n.flags ? f(n.check, o, S, i - S) : h(n.check, o, S, i - S)), S = u, (n.flags ? d : (d >>> 24 & 255) + (d >>> 8 & 65280) + ((65280 & d) << 8) + ((255 & d) << 24)) !== n.check) {
                e.msg = "incorrect data check", n.mode = R;
                break;
              }
              d = 0, x = 0;
            }
            n.mode = 28;
          case 28:
            if (n.wrap && n.flags) {
              for (; x < 32;) {
                if (0 === l) break e;
                l--, d += s[a++] << x, x += 8;
              }
              if (d !== (4294967295 & n.total)) {
                e.msg = "incorrect length check", n.mode = R;
                break;
              }
              d = 0, x = 0;
            }
            n.mode = 29;
          case 29:
            j = 1;
            break e;
          case R:
            j = -3;
            break e;
          case 31:
            return -4;
          default:
            return w;
        }
        return e.next_out = i, e.avail_out = u, e.next_in = a, e.avail_in = l, n.hold = d, n.bits = x, (n.wsize || S !== e.avail_out && n.mode < R && (n.mode < 27 || 4 !== t)) && A(e, e.output, e.next_out, S - e.avail_out) ? (n.mode = 31, -4) : (E -= e.avail_in, S -= e.avail_out, e.total_in += E, e.total_out += S, n.total += S, n.wrap && S && (e.adler = n.check = n.flags ? f(n.check, o, S, e.next_out - S) : h(n.check, o, S, e.next_out - S)), e.data_type = n.bits + (n.last ? 64 : 0) + (n.mode === y ? 128 : 0) + (20 === n.mode || 15 === n.mode ? 256 : 0), (0 === E && 0 === S || 4 === t) && j === b && (j = -5), j);
      }, n.inflateEnd = function (e) {
        if (!e || !e.state) return w;
        var t = e.state;
        return t.window && (t.window = null), e.state = null, b;
      }, n.inflateGetHeader = function (e, t) {
        var n;
        return e && e.state ? 0 == (2 & (n = e.state).wrap) ? w : (n.head = t, t.done = false, b) : w;
      }, n.inflateSetDictionary = function (e, t) {
        var n, r = t.length;
        return e && e.state ? 0 !== (n = e.state).wrap && 11 !== n.mode ? w : 11 === n.mode && h(1, t, r, 0) !== n.check ? -3 : A(e, t, r, r) ? (n.mode = 31, -4) : (n.havedict = 1, b) : w;
      }, n.inflateInfo = "pako inflate (from Nodeca project)";
    }, {"../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50}], 50: [function (e, t) {
      "use strict";
      var n = e("../utils/common"), r = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], s = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], o = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], a = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
      t.exports = function (e, t, i, l, c, A, u, d) {
        var p, h, f, m, g, v, _, b, w, k = d.bits, y = 0, R = 0, x = 0, E = 0, S = 0, G = 0, C = 0, M = 0, I = 0, Z = 0, U = null, T = 0, B = new n.Buf16(16), O = new n.Buf16(16), F = null, j = 0;
        for (y = 0; y <= 15; y++) B[y] = 0;
        for (R = 0; R < l; R++) B[t[i + R]]++;
        for (S = k, E = 15; E >= 1 && 0 === B[E]; E--) ;
        if (S > E && (S = E), 0 === E) return c[A++] = 20971520, c[A++] = 20971520, d.bits = 1, 0;
        for (x = 1; x < E && 0 === B[x]; x++) ;
        for (S < x && (S = x), M = 1, y = 1; y <= 15; y++) if (M <<= 1, (M -= B[y]) < 0) return -1;
        if (M > 0 && (0 === e || 1 !== E)) return -1;
        for (O[1] = 0, y = 1; y < 15; y++) O[y + 1] = O[y] + B[y];
        for (R = 0; R < l; R++) 0 !== t[i + R] && (u[O[t[i + R]]++] = R);
        if (0 === e ? (U = F = u, v = 19) : 1 === e ? (U = r, T -= 257, F = s, j -= 257, v = 256) : (U = o, F = a, v = -1), Z = 0, R = 0, y = x, g = A, G = S, C = 0, f = -1, m = (I = 1 << S) - 1, 1 === e && I > 852 || 2 === e && I > 592) return 1;
        for (;;) {
          _ = y - C, u[R] < v ? (b = 0, w = u[R]) : u[R] > v ? (b = F[j + u[R]], w = U[T + u[R]]) : (b = 96, w = 0), p = 1 << y - C, x = h = 1 << G;
          do {
            c[g + (Z >> C) + (h -= p)] = _ << 24 | b << 16 | w | 0;
          } while (0 !== h);
          for (p = 1 << y - 1; Z & p;) p >>= 1;
          if (0 !== p ? (Z &= p - 1, Z += p) : Z = 0, R++, 0 == --B[y]) {
            if (y === E) break;
            y = t[i + u[R]];
          }
          if (y > S && (Z & m) !== f) {
            for (0 === C && (C = S), g += x, M = 1 << (G = y - C); G + C < E && !((M -= B[G + C]) <= 0);) G++, M <<= 1;
            if (I += 1 << G, 1 === e && I > 852 || 2 === e && I > 592) return 1;
            c[f = Z & m] = S << 24 | G << 16 | g - A | 0;
          }
        }
        return 0 !== Z && (c[g + Z] = y - C << 24 | 4194304 | 0), d.bits = S, 0;
      };
    }, {"../utils/common": 41}], 51: [function (e, t) {
      "use strict";
      t.exports = {2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version"};
    }, {}], 52: [function (e, t, n) {
      "use strict";
      function r(e) {
        for (var t = e.length; --t >= 0;) e[t] = 0;
      }
      function s(e, t, n, r, s) {
        this.static_tree = e, this.extra_bits = t, this.extra_base = n, this.elems = r, this.max_length = s, this.has_stree = e && e.length;
      }
      function o(e, t) {
        this.dyn_tree = e, this.max_code = 0, this.stat_desc = t;
      }
      function a(e) {
        return e < 256 ? P[e] : P[256 + (e >>> 7)];
      }
      function i(e, t) {
        e.pending_buf[e.pending++] = 255 & t, e.pending_buf[e.pending++] = t >>> 8 & 255;
      }
      function l(e, t, n) {
        e.bi_valid > C - n ? (e.bi_buf |= t << e.bi_valid & 65535, i(e, e.bi_buf), e.bi_buf = t >> C - e.bi_valid, e.bi_valid += n - C) : (e.bi_buf |= t << e.bi_valid & 65535, e.bi_valid += n);
      }
      function c(e, t, n) {
        l(e, n[2 * t], n[2 * t + 1]);
      }
      function A(e, t) {
        var n = 0;
        do {
          n |= 1 & e, e >>>= 1, n <<= 1;
        } while (--t > 0);
        return n >>> 1;
      }
      function u(e, t, n) {
        var r, s, o = new Array(G + 1), a = 0;
        for (r = 1; r <= G; r++) o[r] = a = a + n[r - 1] << 1;
        for (s = 0; s <= t; s++) {
          var i = e[2 * s + 1];
          0 !== i && (e[2 * s] = A(o[i]++, i));
        }
      }
      function d(e) {
        var t;
        for (t = 0; t < R; t++) e.dyn_ltree[2 * t] = 0;
        for (t = 0; t < x; t++) e.dyn_dtree[2 * t] = 0;
        for (t = 0; t < E; t++) e.bl_tree[2 * t] = 0;
        e.dyn_ltree[2 * M] = 1, e.opt_len = e.static_len = 0, e.last_lit = e.matches = 0;
      }
      function p(e) {
        e.bi_valid > 8 ? i(e, e.bi_buf) : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf), e.bi_buf = 0, e.bi_valid = 0;
      }
      function h(e, t, n, r) {
        var s = 2 * t, o = 2 * n;
        return e[s] < e[o] || e[s] === e[o] && r[t] <= r[n];
      }
      function f(e, t, n) {
        for (var r = e.heap[n], s = n << 1; s <= e.heap_len && (s < e.heap_len && h(t, e.heap[s + 1], e.heap[s], e.depth) && s++, !h(t, r, e.heap[s], e.depth));) e.heap[n] = e.heap[s], n = s, s <<= 1;
        e.heap[n] = r;
      }
      function m(e, t, n) {
        var r, s, o, i, A = 0;
        if (0 !== e.last_lit) do {
          r = e.pending_buf[e.d_buf + 2 * A] << 8 | e.pending_buf[e.d_buf + 2 * A + 1], s = e.pending_buf[e.l_buf + A], A++, 0 === r ? c(e, s, t) : (c(e, (o = D[s]) + y + 1, t), 0 !== (i = T[o]) && l(e, s -= V[o], i), c(e, o = a(--r), n), 0 !== (i = B[o]) && l(e, r -= Q[o], i));
        } while (A < e.last_lit);
        c(e, M, t);
      }
      function g(e, t) {
        var n, r, s, o = t.dyn_tree, a = t.stat_desc.static_tree, i = t.stat_desc.has_stree, l = t.stat_desc.elems, c = -1;
        for (e.heap_len = 0, e.heap_max = S, n = 0; n < l; n++) 0 !== o[2 * n] ? (e.heap[++e.heap_len] = c = n, e.depth[n] = 0) : o[2 * n + 1] = 0;
        for (; e.heap_len < 2;) o[2 * (s = e.heap[++e.heap_len] = c < 2 ? ++c : 0)] = 1, e.depth[s] = 0, e.opt_len--, i && (e.static_len -= a[2 * s + 1]);
        for (t.max_code = c, n = e.heap_len >> 1; n >= 1; n--) f(e, o, n);
        s = l;
        do {
          n = e.heap[1], e.heap[1] = e.heap[e.heap_len--], f(e, o, 1), r = e.heap[1], e.heap[--e.heap_max] = n, e.heap[--e.heap_max] = r, o[2 * s] = o[2 * n] + o[2 * r], e.depth[s] = (e.depth[n] >= e.depth[r] ? e.depth[n] : e.depth[r]) + 1, o[2 * n + 1] = o[2 * r + 1] = s, e.heap[1] = s++, f(e, o, 1);
        } while (e.heap_len >= 2);
        e.heap[--e.heap_max] = e.heap[1], function (e, t) {
          var n, r, s, o, a, i, l = t.dyn_tree, c = t.max_code, A = t.stat_desc.static_tree, u = t.stat_desc.has_stree, d = t.stat_desc.extra_bits, p = t.stat_desc.extra_base, h = t.stat_desc.max_length, f = 0;
          for (o = 0; o <= G; o++) e.bl_count[o] = 0;
          for (l[2 * e.heap[e.heap_max] + 1] = 0, n = e.heap_max + 1; n < S; n++) (o = l[2 * l[2 * (r = e.heap[n]) + 1] + 1] + 1) > h && (o = h, f++), l[2 * r + 1] = o, r > c || (e.bl_count[o]++, a = 0, r >= p && (a = d[r - p]), i = l[2 * r], e.opt_len += i * (o + a), u && (e.static_len += i * (A[2 * r + 1] + a)));
          if (0 !== f) {
            do {
              for (o = h - 1; 0 === e.bl_count[o];) o--;
              e.bl_count[o]--, e.bl_count[o + 1] += 2, e.bl_count[h]--, f -= 2;
            } while (f > 0);
            for (o = h; 0 !== o; o--) for (r = e.bl_count[o]; 0 !== r;) (s = e.heap[--n]) > c || (l[2 * s + 1] !== o && (e.opt_len += (o - l[2 * s + 1]) * l[2 * s], l[2 * s + 1] = o), r--);
          }
        }(e, t), u(o, c, e.bl_count);
      }
      function v(e, t, n) {
        var r, s, o = -1, a = t[1], i = 0, l = 7, c = 4;
        for (0 === a && (l = 138, c = 3), t[2 * (n + 1) + 1] = 65535, r = 0; r <= n; r++) s = a, a = t[2 * (r + 1) + 1], ++i < l && s === a || (i < c ? e.bl_tree[2 * s] += i : 0 !== s ? (s !== o && e.bl_tree[2 * s]++, e.bl_tree[2 * I]++) : i <= 10 ? e.bl_tree[2 * Z]++ : e.bl_tree[2 * U]++, i = 0, o = s, 0 === a ? (l = 138, c = 3) : s === a ? (l = 6, c = 3) : (l = 7, c = 4));
      }
      function _(e, t, n) {
        var r, s, o = -1, a = t[1], i = 0, A = 7, u = 4;
        for (0 === a && (A = 138, u = 3), r = 0; r <= n; r++) if (s = a, a = t[2 * (r + 1) + 1], !(++i < A && s === a)) {
          if (i < u) do {
            c(e, s, e.bl_tree);
          } while (0 != --i); else 0 !== s ? (s !== o && (c(e, s, e.bl_tree), i--), c(e, I, e.bl_tree), l(e, i - 3, 2)) : i <= 10 ? (c(e, Z, e.bl_tree), l(e, i - 3, 3)) : (c(e, U, e.bl_tree), l(e, i - 11, 7));
          i = 0, o = s, 0 === a ? (A = 138, u = 3) : s === a ? (A = 6, u = 3) : (A = 7, u = 4);
        }
      }
      function b(e, t, n, r) {
        l(e, (k << 1) + (r ? 1 : 0), 3), function (e, t, n) {
          p(e), i(e, n), i(e, ~n), w.arraySet(e.pending_buf, e.window, t, n, e.pending), e.pending += n;
        }(e, t, n);
      }
      var w = e("../utils/common"), k = 0, y = 256, R = y + 1 + 29, x = 30, E = 19, S = 2 * R + 1, G = 15, C = 16, M = 256, I = 16, Z = 17, U = 18, T = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], B = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], O = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], F = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], j = new Array(2 * (R + 2));
      r(j);
      var L = new Array(2 * x);
      r(L);
      var P = new Array(512);
      r(P);
      var D = new Array(256);
      r(D);
      var V = new Array(29);
      r(V);
      var N, z, q, Q = new Array(x);
      r(Q);
      var H = false;
      n._tr_init = function (e) {
        H || (function () {
          var e, t, n, r, o, a = new Array(G + 1);
          for (n = 0, r = 0; r < 28; r++) for (V[r] = n, e = 0; e < 1 << T[r]; e++) D[n++] = r;
          for (D[n - 1] = r, o = 0, r = 0; r < 16; r++) for (Q[r] = o, e = 0; e < 1 << B[r]; e++) P[o++] = r;
          for (o >>= 7; r < x; r++) for (Q[r] = o << 7, e = 0; e < 1 << B[r] - 7; e++) P[256 + o++] = r;
          for (t = 0; t <= G; t++) a[t] = 0;
          for (e = 0; e <= 143;) j[2 * e + 1] = 8, e++, a[8]++;
          for (; e <= 255;) j[2 * e + 1] = 9, e++, a[9]++;
          for (; e <= 279;) j[2 * e + 1] = 7, e++, a[7]++;
          for (; e <= 287;) j[2 * e + 1] = 8, e++, a[8]++;
          for (u(j, R + 1, a), e = 0; e < x; e++) L[2 * e + 1] = 5, L[2 * e] = A(e, 5);
          N = new s(j, T, y + 1, R, G), z = new s(L, B, 0, x, G), q = new s(new Array(0), O, 0, E, 7);
        }(), H = true), e.l_desc = new o(e.dyn_ltree, N), e.d_desc = new o(e.dyn_dtree, z), e.bl_desc = new o(e.bl_tree, q), e.bi_buf = 0, e.bi_valid = 0, d(e);
      }, n._tr_stored_block = b, n._tr_flush_block = function (e, t, n, r) {
        var s, o, a = 0;
        e.level > 0 ? (2 === e.strm.data_type && (e.strm.data_type = function (e) {
          var t, n = 4093624447;
          for (t = 0; t <= 31; t++, n >>>= 1) if (1 & n && 0 !== e.dyn_ltree[2 * t]) return 0;
          if (0 !== e.dyn_ltree[18] || 0 !== e.dyn_ltree[20] || 0 !== e.dyn_ltree[26]) return 1;
          for (t = 32; t < y; t++) if (0 !== e.dyn_ltree[2 * t]) return 1;
          return 0;
        }(e)), g(e, e.l_desc), g(e, e.d_desc), a = function (e) {
          var t;
          for (v(e, e.dyn_ltree, e.l_desc.max_code), v(e, e.dyn_dtree, e.d_desc.max_code), g(e, e.bl_desc), t = E - 1; t >= 3 && 0 === e.bl_tree[2 * F[t] + 1]; t--) ;
          return e.opt_len += 3 * (t + 1) + 5 + 5 + 4, t;
        }(e), s = e.opt_len + 3 + 7 >>> 3, (o = e.static_len + 3 + 7 >>> 3) <= s && (s = o)) : s = o = n + 5, n + 4 <= s && -1 !== t ? b(e, t, n, r) : 4 === e.strategy || o === s ? (l(e, 2 + (r ? 1 : 0), 3), m(e, j, L)) : (l(e, 4 + (r ? 1 : 0), 3), function (e, t, n, r) {
          var s;
          for (l(e, t - 257, 5), l(e, n - 1, 5), l(e, r - 4, 4), s = 0; s < r; s++) l(e, e.bl_tree[2 * F[s] + 1], 3);
          _(e, e.dyn_ltree, t - 1), _(e, e.dyn_dtree, n - 1);
        }(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, a + 1), m(e, e.dyn_ltree, e.dyn_dtree)), d(e), r && p(e);
      }, n._tr_tally = function (e, t, n) {
        return e.pending_buf[e.d_buf + 2 * e.last_lit] = t >>> 8 & 255, e.pending_buf[e.d_buf + 2 * e.last_lit + 1] = 255 & t, e.pending_buf[e.l_buf + e.last_lit] = 255 & n, e.last_lit++, 0 === t ? e.dyn_ltree[2 * n]++ : (e.matches++, t--, e.dyn_ltree[2 * (D[n] + y + 1)]++, e.dyn_dtree[2 * a(t)]++), e.last_lit === e.lit_bufsize - 1;
      }, n._tr_align = function (e) {
        l(e, 2, 3), c(e, M, j), function (e) {
          16 === e.bi_valid ? (i(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : e.bi_valid >= 8 && (e.pending_buf[e.pending++] = 255 & e.bi_buf, e.bi_buf >>= 8, e.bi_valid -= 8);
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
      if (this.data = "", this.read = 0, "string" == typeof e) this.data = e; else if (jo.isArrayBuffer(e) || jo.isArrayBufferView(e)) {
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
      for (var r, s, o, a, i, l, c, A, u, d, p, h, f, m = n.length(); m >= 64;) {
        for (i = 0; i < 16; ++i) t[i] = n.getInt32();
        for (; i < 64; ++i) r = ((r = t[i - 2]) >>> 17 | r << 15) ^ (r >>> 19 | r << 13) ^ r >>> 10, s = ((s = t[i - 15]) >>> 7 | s << 25) ^ (s >>> 18 | s << 14) ^ s >>> 3, t[i] = r + t[i - 7] + s + t[i - 16] | 0;
        for (l = e.h0, c = e.h1, A = e.h2, u = e.h3, d = e.h4, p = e.h5, h = e.h6, f = e.h7, i = 0; i < 64; ++i) o = (l >>> 2 | l << 30) ^ (l >>> 13 | l << 19) ^ (l >>> 22 | l << 10), a = l & c | A & (l ^ c), r = f + ((d >>> 6 | d << 26) ^ (d >>> 11 | d << 21) ^ (d >>> 25 | d << 7)) + (h ^ d & (p ^ h)) + Vo[i] + t[i], f = h, h = p, p = d, d = u + r | 0, u = A, A = c, c = l, l = r + (s = o + a) | 0;
        e.h0 = e.h0 + l | 0, e.h1 = e.h1 + c | 0, e.h2 = e.h2 + A | 0, e.h3 = e.h3 + u | 0, e.h4 = e.h4 + d | 0, e.h5 = e.h5 + p | 0, e.h6 = e.h6 + h | 0, e.h7 = e.h7 + f | 0, m -= 64;
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
    const s = Promise;
    let o = 0;
    const a = [], i = () => {
      const e = ["debug"], t = ["log"], n = ["warn", "info"], r = ["error"], s = [...e, ...t, ...n, ...r], a = r;
      o >= 80 && a.push(...e), o >= 60 && a.push(...t), o >= 30 && a.push(...n), s.forEach(e => l[e] = a.includes(e) ? console[e].bind(console) : () => {});
    }, l = {set: e => {
      o = e, a.forEach(e => {
        e(l, o);
      }), i();
    }, get: () => o, get verbose() {
      return (l.debug || (() => {})).bind(console);
    }, debug: () => {}, log: () => {}, warn: () => {}, info: () => {}, error: () => {}, addChangeListener: e => {
      a.push(e);
    }};
    i();
    let c = [];
    const A = {late: false, init: () => {}, registerLateCallback: e => {
      l.debug("toea: register callback"), c.push(e);
    }, ensureLate: e => {
      A.late ? e() : A.registerLateCallback(e);
    }, setReady: () => {
      l.debug("toea: run " + c.length + " callbacks"), A.late = true;
      for (let e = 0; e < c.length; e++) c[e]();
      c = [];
    }}, u = A, d = e => new s(t => m(t, e));
    let p = 0;
    const h = (e, t) => {
      const n = Date.now();
      if (p + e < n) return new s(e => y(() => {
        p = Date.now(), e();
      }, t || 0));
    }, f = async function (e, ...t) {
      await h(1e3), e.apply(this, t);
    }, m = function (e, t) {
      return t ? y.apply(this, [e, t]) : (f.apply(this, [e]), 0);
    }, g = e => {
      const t = [], n = [], r = () => {
        let s;
        if (n.length < e.threads && t.length && (s = t.shift())) {
          const e = s.fn();
          let t;
          if (void 0 !== e.catch) {
            const n = q();
            e.then(n.resolve).catch(n.reject), t = n.promise();
          } else t = e;
          n.push(t), t.always(() => {
            let e;
            (e = n.indexOf(t)) > -1 && n.splice(e, 1), r();
          }), s.p.consume(t);
        }
      };
      return {add: function (e) {
        const n = q();
        return t.push({fn: e, p: n}), r(), n.promise();
      }};
    }, v = e => {
      let t = {};
      const n = (null == e ? void 0 : e.retimeout_on_get) || false, r = (null == e ? void 0 : e.timeout) || 300, s = (null == e ? void 0 : e.check_interval) || 120;
      let o;
      const a = e => {
        delete t[e];
      }, i = () => {
        const e = Date.now() - 1e3 * r;
        Object.entries(t).forEach(([t, n]) => {
          n.ts < e && m(() => a(t), 1);
        });
      }, l = {init: () => (o || (o && E(o), o = null, o = R(i, 1e3 * s)), l), set: (e, n) => {
        t[e] = {value: n, ts: Date.now()};
      }, get: (e, r) => {
        let s = r;
        return t[e] && (n && (t[e].ts = Date.now()), s = t[e].value), s;
      }, remove: a, removeAll: () => {
        t = {};
      }};
      return l;
    }, _ = () => document.cookie, b = e => {
      document.cookie = e;
    }, w = self, k = location.origin, {setTimeout: y, setInterval: R, clearTimeout: x, clearInterval: E, AbortController: S, fetch: G, XMLHttpRequest: C, webkitNotifications: M, decodeURIComponent: I, encodeURIComponent: Z, Notification: U, TextDecoder: T, FileReader: B, DOMParser: O, unescape: F, escape: j, btoa: L, atob: P, alert: D, confirm: V, crypto: N, Worker: z} = self, q = e => {
      const t = (() => {
        let e, t;
        const n = [], r = [], s = e => {
          r.push(e), o();
        }, o = () => {
          if (void 0 !== e) {
            let n;
            for (; r.length;) n = r.shift(), void 0 !== n.state && n.state !== e || (t = ("function" == typeof n.f ? n.f.call(a, t) : n.f) || t);
          }
        }, a = {promise: () => a, done: e => (s({state: true, f: e}), a), fail: e => (s({state: false, f: e}), a), always: e => (s({f: e}), a), progress: e => (e && n.push(e), a), then: (e, n, r) => q(s => {
          const o = (e, n) => (...r) => {
            const o = e ? e(t) : void 0, a = o && "function" == typeof o.promise ? o.promise() : null, i = o && "function" == typeof o.then ? o : null;
            if (a) a.done(e => s.resolve(e)).fail((...e) => s.reject(e[0])).progress((...e) => s.notify(...e)); else if (i) i.then((...e) => s.resolve(...e), e => s.reject(e)); else {
              const t = e ? [o] : r;
              s[n](t[0]);
            }
          };
          a.done(o(e, "resolve")), a.fail(o(n, "reject")), a.progress(o(r, "notify"));
        }).promise(), each: e => {
          const t = q();
          return a.then(n => {
            const r = Array.isArray(n) ? n : [n];
            q.when(r.map(t => e(t))).then(t.resolve);
          }), t.promise();
        }, iterate: e => {
          const t = q();
          return a.then(n => {
            const r = (Array.isArray(n) ? n : [n]).map(t => () => e(t));
            q.onebyone(r, true).done(e => {
              t.resolve(e);
            }).fail(t.reject);
          }), t.promise();
        }};
        return {get: () => a, try_resolve: n => (void 0 === e && (e = true, t = n), o(), a), try_reject: n => (void 0 === e && (e = false, t = n), o(), a), do_notify: e => ((e => {
          n.forEach(t => t(e));
        })(e), a)};
      })(), n = {promise: () => t.get(), resolve: e => t.try_resolve(e), reject: e => t.try_reject(e), notify: e => t.do_notify(e), consume: e => (e && e.promise ? e.promise().done(e => n.resolve(e)).fail((...e) => n.reject(e[0])).progress(e => n.notify(e)) : e && e.then ? e.then(e => n.resolve(e), (...e) => n.reject(e[0])) : l.warn("promise: incompatible object given to consume()", e), n.promise())};
      return e && e(n), n;
    };
    q.Pledge = (...e) => {
      const t = q();
      return t.resolve(...e), t.promise();
    }, q.Breach = (...e) => {
      const t = q();
      return t.reject(e[0]), t.promise();
    }, q.onebyone = (e, t = true) => {
      const n = [], r = q();
      let s = 0;
      const o = () => {
        if (s < e.length) {
          const a = (0, e[s++])();
          a && a.promise ? a.promise().done(e => {
            n.push(e), o();
          }).fail(() => {
            if (n.push(null), t) return r.reject();
            o();
          }) : a && a.then ? a.then(e => {
            n.push(e), o();
          }, () => {
            if (n.push(null), t) return r.reject();
            o();
          }) : (n.push(a), o());
        } else r.resolve(n);
      };
      return o(), r.promise();
    }, q.or = e => {
      let t;
      const n = q(), r = () => {
        e.length ? (t = e.shift(), t && q.Pledge().then(t).done(n.resolve).fail(r)) : n.reject();
      };
      return r(), n.promise();
    }, q.sidebyside = e => {
      e = Array.isArray(e) ? e : [e];
      const t = q();
      let n = e.length;
      return n ? e.forEach(e => {
        e && e.promise && e.promise().always(() => {
          0 == --n && t.resolve();
        });
      }) : t.resolve(), t.promise();
    }, q.when = e => {
      e = Array.isArray(e) ? e : [e];
      const t = q();
      let n = e.length;
      const r = [];
      return n ? e.forEach(e => {
        let s;
        if (e && e.promise) s = e.promise(); else {
          if (!e.then) return void l.warn("promise: incompatible object given to when()", e);
          s = e;
        }
        s.fail(() => {
          t.reject(), n = -1;
        }).done(e => {
          r.push(e), 0 == --n && t.resolve(r);
        });
      }) : t.resolve(r), t.promise();
    }, q.sleep = e => {
      const t = q();
      return y(t.resolve, e), t.promise();
    };
    const Q = (e, t) => {
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
    }, H = e => {
      const t = (typeof e)[0];
      if ("o" === t) try {
        e = t + JSON.stringify(e);
      } catch (n) {
        console.error("Storage: setValue ERROR: " + n.message), e = t + JSON.stringify({});
      } else e = t + e;
      return e;
    };
    let X, Y, W, J, K, $;
    K = () => {
      if (void 0 !== Y) return Y;
      try {
        Y = -1 != navigator.userAgent.indexOf("Mac OS X");
      } catch (e) {}
      return Y;
    }, J = () => {
      if (void 0 !== X) return X;
      try {
        const e = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
        e && (X = parseInt(e[2]));
      } catch (e) {}
      return X;
    }, $ = () => {
      if (void 0 !== W) return W;
      try {
        W = -1 != navigator.userAgent.search(/Android|Mobile/);
      } catch (e) {}
      return W;
    };
    const ee = {STORAGE: {SCHEMA: "#schema", TYPE: "#storage", CONFIG: "#config", SESSION: "#session", VERSION: "#version", LEGACY_VERSION: "TM_version", LAST_START: "#laststart", UPDATE: "#update", BEGGING: "#begging"}, PREFIX: {SCRIPT_UID: "@uid#", COND: "@re#", STORE: "@st#", SCRIPT: "@source#", EXTERNAL: "@ext#", META: "@meta#"}}, te = {FAST_EXEC_SUPPORT: true, DETECT_CONSTRUCTORS_BY_KEYS: J() >= 60, ALLOWS_FILE_SCHEME_ACCESS: false, MAX_SCRIPTS: 1e3, WEBREQUEST_XHR_SUPPORT: true, WEBREQUEST_WEBSOCKET: false, CAN_SAVEAS_ZIP: true, SHARED_OBJECT_URLS: true, SHARED_BLOBS: false, CONTEXT_MENU: true, INCOGNITO_MODE: true, FPI: false, CLIPBOARD_API: false}, ne = {USE: null, DEFAULT: "chromeStorage", SECURE: false, NO_WARNING: false}, re = {RETRIES: 0, PARTIAL_SIZE: 8388608, COOKIE_PASSTHROUGH: false}, se = {LOCALSTORAGE: void 0}, oe = {HAS_SENDER_ID: true, INTERNAL_PAGE_PROTOCOLS: ["chrome-extension:"], SENDS_ORIGIN: true}, ae = globalThis, {chrome: ie, browser: le} = ae, ce = ([].concat(["chrome"]), () => {
      window.location.reload();
    }), Ae = (() => {
      const e = {getInternalPathRegexp: function (e, t) {
        const n = new RegExp("(\\" + ["/", ".", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\"].join("|\\") + ")", "g"), r = oe.INTERNAL_PAGE_PROTOCOLS[0] + "//" + Ae.id + "/";
        return new RegExp(r.replace(n, "\\$1") + "([a-zA-Z" + (e ? "\\/" : "") + "]*)" + (t || "").replace(n, "\\$1"));
      }, getInternalPageRegexp: function () {
        return Ae.getInternalPathRegexp(false, ".html");
      }};
      return Object.defineProperty(e, "lastError", {get: () => ie.runtime.lastError, enumerable: true}), Object.defineProperty(e, "id", {get: () => ie.runtime.id, enumerable: true}), Object.defineProperty(e, "short_id", {get: () => e.id.replace(/[^0-9a-zA-Z]/g, "").substr(0, 4), enumerable: true}), e;
    })(), ue = (() => {
      const e = {getURL: function (e) {
        return ie.runtime.getURL(e);
      }, sendMessage: function (e, t) {
        return ie.runtime.sendMessage(e, t);
      }, onMessage: {addListener: function (e) {
        return ie.runtime.onMessage.addListener(e);
      }}, connect: function (e) {
        return ie.runtime.connect({name: e});
      }};
      let t;
      return Object.defineProperty(e, "inIncognitoContext", {get: () => (void 0 === t && (t = ie.extension.inIncognitoContext), t), set: e => {
        t = e;
      }, enumerable: true}), e;
    })(), de = {DEFAULT_STORE_ID: void 0}, pe = Object.defineProperties({}, {...Object.getOwnPropertyDescriptors(ue), ...Object.getOwnPropertyDescriptors({onConnect: {addListener: function (e) {
      return ie.runtime.onConnect.addListener(e);
    }}, onConnectExternal: {addListener: function (e) {
      return ie.runtime.onConnectExternal.addListener(e);
    }}, onMessageExternal: {addListener: function (e) {
      return ie.runtime.onMessageExternal.addListener(e);
    }}, onMessage: {...ue.onMessage, addListener: e => {
      ue.onMessage.addListener((t, n, r) => e(t, n, r));
    }}, manifest: ie.runtime.getManifest(), inIncognitoContext: ue.inIncognitoContext, getViews: function (e) {
      return ie.extension.getViews(e);
    }, urls: {prepareForReport: function (e) {
      return e;
    }}})}), he = Object.defineProperties({}, {...Object.getOwnPropertyDescriptors(Ae), ...Object.getOwnPropertyDescriptors({onInstalled: {addListener: function (e) {
      ie.runtime.onInstalled && ie.runtime.onInstalled.addListener(e);
    }}, onUpdateAvailable: {addListener: function (e) {
      ie.runtime.onUpdateAvailable && ie.runtime.onUpdateAvailable.addListener(e);
    }}, setUninstallURL: e => {
      ie.runtime.setUninstallURL && ie.runtime.setUninstallURL(e);
    }, isDarkMode: () => !!window.matchMedia("(prefers-color-scheme: dark)").matches})}), ge = function (e) {
      if (ie.tabs.onReplaced) return ie.tabs.onReplaced.addListener(e);
    }, _e = function (e, t) {
      let n, r, s;
      (n = e.parent) && (void 0 !== (r = n.id) && (r < 0 ? console.warn(`tabs.create: openerTabId lower than 0 is not supported -> ${r}!`) : e.openerTabId = r), void 0 !== (s = n.windowId) && (e.windowId = s)), delete e.parent, e.incognito ? (delete e.incognito, ie.windows.getAll({windowTypes: ["normal"]}, n => {
        let r;
        return n.some(e => e.incognito ? r = e.id : null), void 0 === r ? ie.windows.create({url: e.url, incognito: true}, t) : (e.windowId = r, ie.tabs.create(e, t));
      })) : ie.tabs.create(e, t);
    }, Re = {headerModificationSupported: true, extraHeaderNeeded: ie.webRequest && ie.webRequest.OnBeforeSendHeadersOptions && ie.webRequest.OnBeforeSendHeadersOptions.hasOwnProperty("EXTRA_HEADERS"), onBeforeRequest: {addListener: (e, t, n) => ie.webRequest.onBeforeRequest.addListener(e, t, n), removeListener: e => ie.webRequest.onBeforeRequest.removeListener(e), hasListener: e => ie.webRequest.onBeforeRequest.hasListener(e)}, onBeforeSendHeaders: {addListener: (e, t, n) => ie.webRequest.onBeforeSendHeaders.addListener(e, t, n), removeListener: e => ie.webRequest.onBeforeSendHeaders.removeListener(e), hasListener: e => ie.webRequest.onBeforeSendHeaders.hasListener(e)}, onHeadersReceived: {addListener: (e, t, n) => ie.webRequest.onHeadersReceived.addListener(e, t, n), removeListener: e => ie.webRequest.onHeadersReceived.removeListener(e), hasListener: e => ie.webRequest.onHeadersReceived.hasListener(e)}, onBeforeRedirect: {addListener: (e, t, n) => ie.webRequest.onBeforeRedirect.addListener(e, t, n), removeListener: e => ie.webRequest.onBeforeRedirect.removeListener(e), hasListener: e => ie.webRequest.onBeforeRedirect.hasListener(e)}, onResponseStarted: {addListener: (e, t) => ie.webRequest.onResponseStarted.addListener(e, t), removeListener: e => ie.webRequest.onResponseStarted.removeListener(e), hasListener: e => ie.webRequest.onResponseStarted.hasListener(e)}, onErrorOccurred: {addListener: e => ie.webRequest.onErrorOccurred.addListener(e), removeListener: e => ie.webRequest.onErrorOccurred.removeListener(e), hasListener: e => ie.webRequest.onErrorOccurred.hasListener(e)}, handlerBehaviorChanged: () => ie.webRequest.handlerBehaviorChanged()}, xe = !!ie.webNavigation, Ee = {addListener: function (e) {
      return ie.webNavigation.onHistoryStateUpdated ? ie.webNavigation.onHistoryStateUpdated.addListener(e) : ie.webNavigation.onReferenceFragmentUpdated ? ie.webNavigation.onReferenceFragmentUpdated.addListener(e) : void 0;
    }}, Se = function (e, t) {
      const {path: n, ...r} = e;
      let s = {};
      return n && (s = J() >= 53 ? {19: n.replace(/\.png$/, "19.png"), 38: n.replace(/\.png$/, "38.png"), 16: n.replace(/\.png$/, "16.png"), 24: n.replace(/\.png$/, "24.png"), 32: n.replace(/\.png$/, "32.png")} : {19: n.replace(/\.png$/, "19.png"), 38: n.replace(/\.png$/, "38.png")}), ie.browserAction.setIcon({path: s, ...r}, t);
    }, Ge = function (e) {
      if (ie.browserAction.setTitle) return ie.browserAction.setTitle(e);
    }, Ce = ie.declarativeContent && ie.declarativeContent.onPageChanged ? {supported: true, onPageChanged: {addRules: (e, t) => ie.declarativeContent.onPageChanged.addRules(e, t), getRules: (e, t) => ie.declarativeContent.onPageChanged.getRules(e, t), removeRules: (e, t) => ie.declarativeContent.onPageChanged.removeRules(e, t)}, PageStateMatcher: ie.declarativeContent.PageStateMatcher, RequestContentScript: ie.declarativeContent.RequestContentScript} : {supported: false}, Me = (ie.contentScripts && ie.contentScripts.register, ie.userScripts && ie.userScripts.register, {onChanged: {addListener: function (e) {
      return ie.storage.onChanged.addListener(e);
    }}, local: (() => {
      let e = {}, t = {}, n = null, r = false, s = [];
      const o = e => {
        r ? s.push(e) : e();
      }, a = (o, a) => {
        n && window.clearTimeout(n);
        const i = () => {
          r = true;
          let o = 1;
          const i = () => {
            let n;
            if ((n = ie.runtime.lastError) && console.warn(n), 0 == --o) {
              r = false;
              const n = s;
              s = [], e = {}, t = {}, n.forEach(e => e()), a && a();
            }
          }, l = () => {
            Object.keys(e).length && (o++, ie.storage.local.set(e, i));
          };
          let c;
          (c = Object.keys(t)).length ? (o++, ie.storage.local.remove(c, () => {
            l(), i();
          })) : l(), i(), n = null;
        };
        o ? i() : n = window.setTimeout(i, 500);
      }, i = (t, n) => {
        if (t instanceof Array) {
          let e = 1;
          const r = {}, s = () => {
            0 == --e && n(r);
          };
          t.forEach(t => {
            e++, i(t, e => {
              r[t] = e[t], s();
            });
          }), s();
        } else if (void 0 !== e[t]) {
          const r = {};
          r[t] = e[t], n(r);
        } else ie.storage.local.get(t, n);
      }, l = {set: function (n, r) {
        o(() => {
          r && s.push(r), Object.keys(n).forEach(r => {
            var s, o;
            s = r, o = n[r], e[s] = o, delete t[s];
          }), a();
        });
      }, get: (e, t) => {
        null === e ? a(true, () => {
          ie.storage.local.get(null, t);
        }) : o(() => {
          i(e, t);
        });
      }, remove: function (n, r) {
        o(() => {
          var o;
          r && s.push(r), t[o = n] = true, delete e[o], a();
        });
      }, clear: function (r) {
        o(() => {
          n && window.clearTimeout(n), s = [], e = {}, t = {}, ie.storage.local.clear(r);
        });
      }};
      return l;
    })(), sync: {supported: true, set: function (e, t) {
      return ie.storage.sync.set(e, t);
    }, get: function (e, t) {
      return ie.storage.sync.get(e, t);
    }, remove: function (e, t) {
      return ie.storage.sync.remove(e, t);
    }, clear: function (e) {
      return ie.storage.sync.clear(e);
    }}}), Ze = function (e, t, n) {
      try {
        const r = new XMLHttpRequest;
        r.open("GET", e, true), r.responseType = "arraybuffer", r.onload = () => {
          t(r.response);
        }, r.onerror = () => {
          n(r.statusText);
        }, r.send();
      } catch (e) {
        n(e.message);
      }
    }, Ue = Object.defineProperties({}, {...Object.getOwnPropertyDescriptors(de), ...Object.getOwnPropertyDescriptors({getAll: function (e, t) {
      return ie.cookies.getAll(e, t);
    }, remove: function (e, t) {
      return ie.cookies.remove(e, t);
    }, set: function (e, t) {
      return ie.cookies.set(e, t);
    }})}), Te = {is_supported: false, set: () => {}}, Be = !(!ie.commands || !ie.commands.onCommand), Le = !!(ie.notifications && ie.notifications.getPermissionLevel && ie.notifications.onPermissionLevelChanged && ie.notifications.onClicked), Pe = te.CONTEXT_MENU && ie.contextMenus && ie.contextMenus.create && ie.contextMenus.update && ie.contextMenus.remove ? {supported: true, create: function (e, t) {
      return ie.contextMenus.create(e, t);
    }, update: function (e, t, n) {
      return ie.contextMenus.update(e, t, n);
    }, remove: function (e, t) {
      return ie.contextMenus.remove(e, t);
    }, removeAll: function (e) {
      return ie.contextMenus.removeAll(e);
    }, onClicked: {addListener: function (e) {
      return ie.contextMenus.onClicked.addListener(e);
    }}} : {supported: false}, De = function (e) {
      if (ie.permissions.onAdded) return ie.permissions.onAdded.addListener(e);
    }, Ve = function (e) {
      if (ie.permissions.onRemoved) return ie.permissions.onRemoved.addListener(e);
    }, Ne = {native_support: true, getMessage: function (...e) {
      return ie.i18n.getMessage.apply(this, e);
    }, getUILanguage: function () {
      return ie.i18n.getUILanguage ? ie.i18n.getUILanguage() : navigator.language;
    }, getAcceptLanguages: function (e) {
      return ie.i18n.getAcceptLanguages ? ie.i18n.getAcceptLanguages(e) : e([]);
    }}, ze = function (e, t) {
      return ie.idle ? ie.idle.queryState(e, t) : t("unknown");
    };
    (() => {
      try {
        se.LOCALSTORAGE = window.localStorage;
      } catch (e) {
        console.warn("prep: window.localStorage will be unavailable");
      }
      ne.USE = ne.DEFAULT;
      try {
        se.LOCALSTORAGE && (ne.NO_WARNING = "nowarning" === se.LOCALSTORAGE.getItem("#brokenprofile"), ne.USE = se.LOCALSTORAGE.getItem(ee.STORAGE.TYPE) || ne.DEFAULT);
      } catch (e) {
        console.warn("prep: error at storage type detection", e);
      }
      var e;
      e = e => {
        te.ALLOWS_FILE_SCHEME_ACCESS = e;
      }, ie.extension.isAllowedFileSchemeAccess ? ie.extension.isAllowedFileSchemeAccess(e) : e(false);
    })();
    const qe = se.LOCALSTORAGE, Qe = [];
    let He = true;
    const Xe = (() => {
      const e = [ee.STORAGE.VERSION, ee.STORAGE.TYPE], t = {};
      return e.forEach(e => {
        t[e] = true;
      }), {keys: e, has: function (e) {
        return !!t[e];
      }};
    })(), Ye = function (e, t) {
      const n = q();
      let r;
      return e == ne.USE && "clean" == t ? l.warn("Storage: can't clean currently active storage") : r = et[e][t], r ? r().then(() => {
        n.resolve();
      }, () => {
        n.reject();
      }) : n.resolve(), n.promise();
    }, We = (() => {
      const e = "s_", t = t => {
        b(e + t + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/");
      }, n = {setValue: (t, n) => {
        const r = q();
        return ((t, n) => {
          const r = new Date;
          r.setTime(r.getTime() + 47304e7);
          const s = "expires=" + r.toUTCString();
          b(e + t + "=" + n + ";" + s + ";path=/");
        })(t, H(n)), r.resolve(), r.promise();
      }, setValues: e => {
        const t = [];
        return Object.keys(e).forEach(r => {
          t.push(n.setValue(r, e[r]));
        }), q.sidebyside(t);
      }, getValue: (t, n) => Q((t => {
        const n = e + t + "=", r = _().split(";");
        for (let e = 0; e < r.length; e++) {
          let t = r[e];
          for (; " " == t.charAt(0);) t = t.substring(1);
          if (0 == t.indexOf(n)) return t.substring(n.length, t.length);
        }
        return null;
      })(t), n), deleteAll: () => {
        const e = q();
        return n.listValues().forEach(e => {
          t(e);
        }), e.resolve(), e.promise();
      }, deleteValue: e => {
        const n = q();
        return t(e), n.resolve(), n.promise();
      }, listValues: () => (() => {
        const t = _().split(";"), n = [];
        for (let r = 0; r < t.length; r++) {
          const s = t[r].trim(), o = s.indexOf("="), a = s.substr(0, o);
          a.substr(0, e.length) == e && n.push(a.substr(e.length));
        }
        return n;
      })().map(e => e)};
      return n;
    })(), Je = (() => {
      const e = se.LOCALSTORAGE, t = {setValue: (t, n) => {
        const r = q(), s = t, o = H(n);
        return He && void 0 !== o && e.setItem(s, o), r.resolve(), r.promise();
      }, setValues: e => {
        const n = [];
        return Object.keys(e).forEach(r => {
          n.push(t.setValue(r, e[r]));
        }), q.sidebyside(n);
      }, getValue: (t, n) => {
        const r = t;
        return Q(e.getItem(r), n);
      }, deleteAll: () => {
        const n = q();
        return He && t.listValues().forEach(t => {
          Xe.has(t) || e.removeItem(t);
        }), n.resolve(), n.promise();
      }, deleteValue: t => {
        const n = q(), r = t;
        return He && e.removeItem(r), n.resolve(), n.promise();
      }, listValues: () => {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = e.key(n);
          null !== r && t.push(r);
        }
        return t;
      }};
      return {options: {}, methods: t};
    })(), Ke = (() => {
      let e = false, t = {}, n = false, r = false;
      const s = pe.inIncognitoContext ? "incognito" : "normal", o = (e, n) => {
        He && r && "local" == n && e && Object.keys(e).forEach(n => {
          const r = e[n], o = r.newValue, a = r.oldValue;
          o ? o.origin !== s && (o.value && (t[n] = o.value), nt.notifyDifferentOriginChangeListeners(n, o.value)) : a && a.origin !== s && delete t[n];
        });
      }, a = {setValue: (e, n) => {
        const r = q(), o = e;
        if (t[o] = n, He) {
          const e = {};
          e[o] = {origin: s, value: n}, Me.local.set(e, r.resolve);
        } else r.resolve();
        return r.promise();
      }, setValues: e => {
        const n = q(), r = {};
        return Object.keys(e).forEach(n => {
          const o = n, a = e[n];
          t[o] = a, He && (r[o] = {origin: s, value: a});
        }), He ? Me.local.set(r, n.resolve) : n.resolve(), n.promise();
      }, getValue: (e, n) => {
        const r = e;
        return void 0 === t[r] ? n : t[r];
      }, deleteAll: () => {
        const e = q(), n = ((e, t) => {
          const n = {};
          for (const r of t) {
            const t = e.getValue(r);
            void 0 !== t && (n[r] = t);
          }
          return n;
        })(a, Xe.keys);
        return t = n, He ? Me.local.clear(() => {
          ((e, t) => {
            const n = q(), r = [];
            return Object.getOwnPropertyNames(t).forEach(n => {
              void 0 !== t[n] && r.push(e.setValue(n, t[n]));
            }), q.when(r).done(() => {
              n.resolve();
            }), n.promise();
          })(a, n).done(e.resolve);
        }) : e.resolve(), e.promise();
      }, deleteValue: e => {
        const n = q(), r = e;
        return delete t[r], He ? Me.local.remove(r, n.resolve) : n.resolve(), n.promise();
      }, listValues: () => {
        const e = [];
        return Object.getOwnPropertyNames(t).forEach(t => {
          e.push(t);
        }), e;
      }, setTemporary: e => {
        He = !e, r = true;
      }, isWorking: () => {
        const e = q();
        let t = 0;
        const n = Date.now(), r = "foo", s = {};
        s[r] = {origin: "normal", value: n};
        const o = () => {
          c && x(c), c = null;
        }, a = e => {
          ++t <= 5 ? (l.warn("storage:", e || "storage set/get test failed!"), y(A, t * t * 100)) : (l.warn("storage: storage set/get test finally failed!"), i());
        }, i = () => {
          c && (o(), e.reject());
        };
        let c = y(() => {
          c = null, i();
        }, 18e4);
        const A = () => {
          l.log("Storage: test -> start");
          const t = Date.now();
          Me.local.set(s, () => {
            l.log("Storage: test -> set after " + (Date.now() - t) + "ms"), Me.local.get(r, s => (l.log("Storage: test -> get after " + (Date.now() - t) + "ms"), s && s[r] ? s[r].value !== n ? a("read value is different " + JSON.stringify(s[r]) + " != " + JSON.stringify(n)) : he.lastError ? a(he.lastError && he.lastError.message || "lastError is set") : void Me.local.remove(r, () => {
              l.log("Storage: test -> remove after " + (Date.now() - t) + "ms"), c && (o(), e.resolve());
            }) : a("read value is" + JSON.stringify(s))));
          });
        };
        return A(), e.promise();
      }};
      return {init: () => {
        const r = q();
        if (e) r.resolve(); else {
          e = true;
          const s = e => {
            t = {}, e && Object.keys(e).forEach(n => {
              const r = e[n];
              r && r.hasOwnProperty("origin") && r.hasOwnProperty("value") ? t[n] = r.value : t[n] = r;
            }), n || (Me.onChanged.addListener(o), n = true), r.resolve();
          };
          Me.local.get(null, s);
        }
        return r.promise();
      }, clean: () => {
        const n = q();
        return e = false, t = {}, n.resolve(), n.promise();
      }, options: {}, methods: a};
    })();
    let $e;
    const et = {localStorage: Je, chromeStorage: Ke}, tt = () => {
      if ($e) return ($e.isWorking || q.Pledge)();
      {
        const e = q();
        return y(() => {
          e.consume(tt());
        }, 1e3), e.promise();
      }
    }, nt = {secure: {cookie: We}, setValue: (e, t) => $e.setValue(e, t), setValues: e => $e.setValues(e), getValue: (e, t) => $e.getValue(e, t), deleteAll: () => $e.deleteAll(), deleteValue: e => $e.deleteValue(e), listValues: () => $e.listValues(), isWorking: tt, migrate: (e, t, n) => {
      const r = q(), s = et[e], o = et[t], a = n || {};
      return s && o ? Ye(e, "init").then(() => Ye(t, "init")).then(() => {
        const e = q(), t = [];
        return s.methods.listValues().forEach(e => {
          const n = s.methods.getValue(e);
          a.drop && t.push(s.methods.deleteValue(e)), void 0 !== n && t.push(o.methods.setValue(e, n));
        }), q.when(t).done(() => {
          e.resolve();
        }), e.promise();
      }).then(() => Ye(t, "clean")).then(() => Ye(e, "clean")).done(() => {
        r.resolve();
      }).fail(() => {
        r.reject();
      }) : (l.error("Migration: unknown storage implementation(s) ", e, t), r.reject()), r.promise();
    }, setTemporary: e => {
      He = !e;
    }, init: () => {
      l.debug("Storage: use " + ne.USE);
      const e = et[ne.USE];
      return $e = e.methods, e.init ? e.init() : q.Pledge();
    }, factoryReset: () => (qe && qe.removeItem(ee.STORAGE.LEGACY_VERSION), nt.deleteAll()), isWiped: () => {
      if ("localStorage" === ne.USE || !qe) return q.Pledge(false);
      const e = q(), t = nt.getValue(ee.STORAGE.VERSION);
      let n = false;
      return qe.getItem(ee.STORAGE.LEGACY_VERSION) && !t && (nt.listValues().length ? l.warn("storage: unable to find version information") : n = true), e.resolve(n), e.promise();
    }, setVersion: (e, t) => {
      const n = q();
      return He ? (qe && qe.setItem(ee.STORAGE.LEGACY_VERSION, e), nt.setValue(ee.STORAGE.VERSION, e).then(() => t ? nt.setValue(ee.STORAGE.SCHEMA, t) : q.Pledge()).always(n.resolve)) : n.resolve(), n.promise();
    }, getVersion: e => {
      const t = q(), n = nt.getValue(ee.STORAGE.VERSION) || nt.getValue(ee.STORAGE.LEGACY_VERSION) || (qe ? qe.getItem(ee.STORAGE.LEGACY_VERSION) : null);
      return t.resolve(n || e), t.promise();
    }, getSchemaVersion: () => nt.getValue(ee.STORAGE.SCHEMA, "3.5"), addDifferentOriginChangeListener: (e, t) => {
      Qe.push({search: e, cb: t});
    }, notifyDifferentOriginChangeListeners: (e, t) => {
      Qe.forEach(n => {
        0 == e.indexOf(n.search) && n.cb(e, t);
      });
    }, recover: e => {
      const t = q();
      "string" == typeof e && (e = {method: e, storages: ["chromeStorage"]});
      const n = {};
      if (e.storages.forEach(e => {
        n[e] = true;
      }), "log" == e.method) {
        let e, r;
        const s = [{method: "chromeStorage", fn: e => {
          l.debug("check chromeStorage for data..."), Me.local.get(null, t => {
            r = t, e();
          });
        }}, {method: "chromeStorage", fn: e => {
          const t = r ? Object.getOwnPropertyNames(r) : [];
          r && t.length ? (l.debug("found values:"), t.forEach(e => {
            var t;
            const n = null === (t = r[e]) || void 0 === t ? void 0 : t.toString();
            l.debug("    ", e, n && n.length > 30 ? n.substr(0, 30) : n);
          })) : (l.warn("no data found"), n.chromeStorage = false, y(e, 1));
        }}], o = () => {
          if (e) return l.warn("error:", e), void t.resolve();
          for (const e of s) if (n[e.method]) return void e.fn(o);
          t.resolve();
        };
        o();
      } else t.resolve();
      return t.promise();
    }}, rt = nt, st = e => F(Z(e)), ot = e => I(j(e)), at = e => {
      let t = "";
      for (let n = 0; n < e.length; n++) t += String.fromCharCode(255 & e.charCodeAt(n));
      return L(t);
    }, it = e => P(e), lt = (e, t) => {
      try {
        let n, r;
        if ("object" == typeof t ? (n = t.encoding, r = t.array) : n = t, !r && n) return new T(n).decode(e);
        {
          let t = 0;
          const r = [], s = e.byteLength;
          for (; t < s; t += 16384) r.push(String.fromCharCode.apply(null, new Uint8Array(e, t, Math.min(16384, s - t))));
          let o = r.join("");
          return n && "utf-8" == n.toLowerCase() && (o = ot(o)), o;
        }
      } catch (e) {
        l.warn(e);
      }
      return null;
    }, ct = (e, t) => {
      try {
        let n;
        n = "object" == typeof t ? t.encoding : t, n && "utf-8" == n.toLowerCase() && (e = st(e));
        const r = new Uint8Array(e.length);
        for (let t = 0; t < e.length; t++) r[t] = 255 & e.charCodeAt(t);
        return r.buffer;
      } catch (e) {
        l.warn(e);
      }
      return new Uint8Array(0).buffer;
    }, At = (e, t) => new Promise((n, r) => {
      const s = t && t.encoding ? "text/plain" : "binary/octet-stream", o = new Blob([e], {type: s}), a = new B;
      a.onload = e => {
        e.target ? n(e.target.result) : r(new Error("Could not convert array to string!"));
      }, t && t.encoding ? a.readAsText(o, t.encoding) : a.readAsBinaryString(o);
    }), ut = (e, t) => {
      const n = (e, t) => e << t | e >>> 32 - t, r = (e, t) => {
        const n = 2147483648 & e, r = 2147483648 & t, s = 1073741824 & e, o = 1073741824 & t, a = (1073741823 & e) + (1073741823 & t);
        return s & o ? 2147483648 ^ a ^ n ^ r : s | o ? 1073741824 & a ? 3221225472 ^ a ^ n ^ r : 1073741824 ^ a ^ n ^ r : a ^ n ^ r;
      }, s = (e, t, s, o, a, i, l) => (e = r(e, r(r(((e, t, n) => e & t | ~e & n)(t, s, o), a), l)), r(n(e, i), t)), o = (e, t, s, o, a, i, l) => (e = r(e, r(r(((e, t, n) => e & n | t & ~n)(t, s, o), a), l)), r(n(e, i), t)), a = (e, t, s, o, a, i, l) => (e = r(e, r(r(((e, t, n) => e ^ t ^ n)(t, s, o), a), l)), r(n(e, i), t)), i = (e, t, s, o, a, i, l) => (e = r(e, r(r(((e, t, n) => t ^ (e | ~n))(t, s, o), a), l)), r(n(e, i), t)), l = e => {
        let t, n, r = "", s = "";
        for (n = 0; n <= 3; n++) t = e >>> 8 * n & 255, s = "0" + t.toString(16), r += s.substr(s.length - 2, 2);
        return r;
      };
      let c, A, u, d, p, h, f, m, g, v = [];
      for (t && "utf-8" == t.toLowerCase() && (e = st(e)), v = (e => {
        let t;
        const n = e.length, r = n + 8, s = 16 * ((r - r % 64) / 64 + 1), o = Array(s - 1);
        let a = 0, i = 0;
        for (; i < n;) t = (i - i % 4) / 4, a = i % 4 * 8, o[t] = o[t] | e.charCodeAt(i) << a, i++;
        return t = (i - i % 4) / 4, a = i % 4 * 8, o[t] = o[t] | 128 << a, o[s - 2] = n << 3, o[s - 1] = n >>> 29, o;
      })(e), h = 1732584193, f = 4023233417, m = 2562383102, g = 271733878, c = 0; c < v.length; c += 16) A = h, u = f, d = m, p = g, h = s(h, f, m, g, v[c + 0], 7, 3614090360), g = s(g, h, f, m, v[c + 1], 12, 3905402710), m = s(m, g, h, f, v[c + 2], 17, 606105819), f = s(f, m, g, h, v[c + 3], 22, 3250441966), h = s(h, f, m, g, v[c + 4], 7, 4118548399), g = s(g, h, f, m, v[c + 5], 12, 1200080426), m = s(m, g, h, f, v[c + 6], 17, 2821735955), f = s(f, m, g, h, v[c + 7], 22, 4249261313), h = s(h, f, m, g, v[c + 8], 7, 1770035416), g = s(g, h, f, m, v[c + 9], 12, 2336552879), m = s(m, g, h, f, v[c + 10], 17, 4294925233), f = s(f, m, g, h, v[c + 11], 22, 2304563134), h = s(h, f, m, g, v[c + 12], 7, 1804603682), g = s(g, h, f, m, v[c + 13], 12, 4254626195), m = s(m, g, h, f, v[c + 14], 17, 2792965006), f = s(f, m, g, h, v[c + 15], 22, 1236535329), h = o(h, f, m, g, v[c + 1], 5, 4129170786), g = o(g, h, f, m, v[c + 6], 9, 3225465664), m = o(m, g, h, f, v[c + 11], 14, 643717713), f = o(f, m, g, h, v[c + 0], 20, 3921069994), h = o(h, f, m, g, v[c + 5], 5, 3593408605), g = o(g, h, f, m, v[c + 10], 9, 38016083), m = o(m, g, h, f, v[c + 15], 14, 3634488961), f = o(f, m, g, h, v[c + 4], 20, 3889429448), h = o(h, f, m, g, v[c + 9], 5, 568446438), g = o(g, h, f, m, v[c + 14], 9, 3275163606), m = o(m, g, h, f, v[c + 3], 14, 4107603335), f = o(f, m, g, h, v[c + 8], 20, 1163531501), h = o(h, f, m, g, v[c + 13], 5, 2850285829), g = o(g, h, f, m, v[c + 2], 9, 4243563512), m = o(m, g, h, f, v[c + 7], 14, 1735328473), f = o(f, m, g, h, v[c + 12], 20, 2368359562), h = a(h, f, m, g, v[c + 5], 4, 4294588738), g = a(g, h, f, m, v[c + 8], 11, 2272392833), m = a(m, g, h, f, v[c + 11], 16, 1839030562), f = a(f, m, g, h, v[c + 14], 23, 4259657740), h = a(h, f, m, g, v[c + 1], 4, 2763975236), g = a(g, h, f, m, v[c + 4], 11, 1272893353), m = a(m, g, h, f, v[c + 7], 16, 4139469664), f = a(f, m, g, h, v[c + 10], 23, 3200236656), h = a(h, f, m, g, v[c + 13], 4, 681279174), g = a(g, h, f, m, v[c + 0], 11, 3936430074), m = a(m, g, h, f, v[c + 3], 16, 3572445317), f = a(f, m, g, h, v[c + 6], 23, 76029189), h = a(h, f, m, g, v[c + 9], 4, 3654602809), g = a(g, h, f, m, v[c + 12], 11, 3873151461), m = a(m, g, h, f, v[c + 15], 16, 530742520), f = a(f, m, g, h, v[c + 2], 23, 3299628645), h = i(h, f, m, g, v[c + 0], 6, 4096336452), g = i(g, h, f, m, v[c + 7], 10, 1126891415), m = i(m, g, h, f, v[c + 14], 15, 2878612391), f = i(f, m, g, h, v[c + 5], 21, 4237533241), h = i(h, f, m, g, v[c + 12], 6, 1700485571), g = i(g, h, f, m, v[c + 3], 10, 2399980690), m = i(m, g, h, f, v[c + 10], 15, 4293915773), f = i(f, m, g, h, v[c + 1], 21, 2240044497), h = i(h, f, m, g, v[c + 8], 6, 1873313359), g = i(g, h, f, m, v[c + 15], 10, 4264355552), m = i(m, g, h, f, v[c + 6], 15, 2734768916), f = i(f, m, g, h, v[c + 13], 21, 1309151649), h = i(h, f, m, g, v[c + 4], 6, 4149444226), g = i(g, h, f, m, v[c + 11], 10, 3174756917), m = i(m, g, h, f, v[c + 2], 15, 718787259), f = i(f, m, g, h, v[c + 9], 21, 3951481745), h = r(h, A), f = r(f, u), m = r(m, d), g = r(g, p);
      return (l(h) + l(f) + l(m) + l(g)).toLowerCase();
    }, dt = e => {
      let t;
      t = e.split(",")[0].includes("base64") ? P(e.split(",")[1]) : F(e.split(",")[1]);
      const n = e.split(",")[0].split(":")[1].split(";")[0], r = new Uint8Array(t.length);
      for (let e = 0; e < t.length; e++) r[e] = t.charCodeAt(e);
      return new Blob([r], {type: n});
    }, pt = e => new Promise(t => {
      const n = new B;
      n.onload = e => {
        var n;
        t((null === (n = e.target) || void 0 === n ? void 0 : n.result) || void 0);
      }, n.readAsDataURL(e);
    }), ht = async (e, t) => new Promise(n => {
      const r = new B;
      r.onload = () => {
        n(r.result || "");
      }, r.onerror = e => {
        l.warn(`unable to decode data ${e}`), n("");
      }, t ? r.readAsText(e, t) : r.readAsBinaryString(e);
    }), ft = e => L(st(e)), mt = e => ot(P(e)), gt = (e, t, n) => {
      const r = e.indexOf(t);
      if (-1 == r) return "";
      if (!n) return e.substr(r + t.length);
      const s = e.substr(r + t.length).indexOf(n);
      return -1 == s ? "" : e.substr(r + t.length, s);
    }, vt = (e, t) => {
      null == t && (t = []);
      const n = new RegExp("(\\" + ["/", ".", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\"].concat(t).join("|\\") + ")", "g");
      return e.replace(n, "\\$1");
    }, _t = e => vt(e, ["*"]), bt = e => (({}.toString.apply(e).match(/\s([a-z|A-Z]+)/) || [])[1]), wt = (e, t) => {
      const n = bt(e);
      if ("Array" === n || "NodeList" === n) {
        for (let n = 0; n < e.length; n++) if (false === t(e[n], n)) return;
      } else if ("XPathResult" === n) {
        let n = e.iterateNext(), r = 0;
        for (; n;) {
          if (false === t(n, r++)) return;
          n = e.iterateNext();
        }
      } else for (const n in e) if (e.hasOwnProperty(n) && false === t(e[n], n)) return;
    }, kt = (e, t, n, r) => e.slice(0, t) + r + e.slice(t + Math.abs(n)), yt = (e, t, n, r) => {
      let s;
      if (Array.isArray(n)) {
        const e = {};
        n.forEach(t => {
          e[t] = true;
        }), s = e;
      } else s = n;
      return wt(s || e, (n, o) => {
        if (!s || s.hasOwnProperty(o)) {
          let n;
          const a = e[o], i = bt(a);
          if ("Undefined" == i) return;
          if (s && r && (n = bt(s[o])) && n !== i && ("Array" === n || "Object" === n)) return;
          "Object" == i ? (t[o] = {}, yt(a, t[o], s ? s[o] : null)) : "Array" == i ? (t[o] = [], yt(a, t[o])) : t[o] = a;
        }
      }), t;
    }, Rt = e => (() => {
      let t = {};
      const n = e || 1e3, r = {clear: () => {
        wt(t, e => x(e)), t = {};
      }, is: (e, n) => {
        const s = void 0 !== t[e];
        return n && r.add(e), s;
      }, add: (e, s) => {
        r.is(e) && x(t[e]), t[e] = y(() => {
          delete t[e];
        }, s || n);
      }};
      return r;
    })(), xt = e => Array.isArray(e) ? e : [e], Et = (e, t, n = "both") => "notinfirst" == n ? t.filter(t => !e.includes(t)) : e.concat(t).filter(n => !e.includes(n) || !t.includes(n)), St = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, e => {
      const t = 16 * Math.random() | 0;
      return ("x" == e ? t : 3 & t | 8).toString(16);
    }), Gt = (e, t) => {
      const n = [];
      for (let r = 0, s = e.length; r < s; r += t) n.push(e.slice(r, t + r));
      return n;
    }, Ct = e => !!(ue.inIncognitoContext || e && (e.incognito || e.cookieStoreId != de.DEFAULT_STORE_ID)), {SHARED_OBJECT_URLS: Mt, SHARED_BLOBS: It} = te, Zt = e => void 0 !== e.objUrl, Ut = e => void 0 !== e.blob, Tt = e => void 0 !== e.dataUri;
    class Bt {
      constructor(e) {
        if (Zt(e)) this.objUrl = e.objUrl.url, this.type = e.objUrl.type; else if (Ut(e)) this.blob = e.blob; else {
          if (!Tt(e)) throw new Error("incompatible TransferableData");
          this.dataUri = e.dataUri;
        }
      }
      dispose() {
        this.objUrl && URL.revokeObjectURL(this.objUrl);
      }
      async toTransferableData() {
        if (Mt) {
          if (!this.objUrl && (!this.blob && this.dataUri && (this.blob = dt(this.dataUri)), this.blob && (this.objUrl = URL.createObjectURL(this.blob)), !this.objUrl)) throw new Error("incomplete Transferable");
          return {objUrl: {url: this.objUrl, type: this.type}};
        }
        if (It) {
          if (!this.blob && (this.objUrl ? this.blob = await G(this.objUrl).then(e => e.blob()) : this.dataUri && (this.blob = dt(this.dataUri)), !this.blob)) throw new Error("incomplete Transferable");
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
          if (this.dataUri) return dt(this.dataUri);
          throw new Error("incompatible Transferable");
        }
        try {
          return await (await G(this.objUrl)).blob();
        } catch (e) {
          return;
        }
      }
      async toDataUri() {
        if (this.dataUri) return this.dataUri;
        {
          const e = await this.toBlob();
          if (!e) throw new Error("incompatible Transferable");
          return await pt(e);
        }
      }
      static fromTransferableData(e) {
        return e && (Ut(e) || Zt(e) || Tt(e)) ? new Bt(e) : void 0;
      }
    }
    const Ot = ["arraybuffer", "blob", "document", "json", "xml", "headers", "stream"];
    let Ft = {};
    const jt = e => ["https:", "http:", "data:", "blob"].some(t => e.startsWith(t)), Lt = ["internal", "user-agent", "accept-charset", "accept-encoding", "access-control-request-headers", "access-control-request-method", "connection", "content-length", "cookie", "cookie2", "date", "dnt", "expect", "host", "keep-alive", "origin", "referer", "te", "trailer", "transfer-encoding", "upgrade", "via"], Pt = {"cache-control": "no-cache", pragma: "no-cache"}, Dt = {"cache-control": "max-age=0, must-revalidate"}, Vt = e => {
      if (e) {
        const t = {};
        return Object.keys(e).forEach(n => {
          let r = n, s = e[n];
          if (Ft.prefix) o = n.toLowerCase(), (Lt.includes(o) || 0 === o.indexOf("proxy-") || 0 === o.indexOf("sec-")) && (r = Ft.prefix + n, s = null === s ? "" : ft(s)); else if (null === s) return;
          var o;
          t[r] = s;
        }), t;
      }
    }, Nt = e => ({responseText: "", response: null, readyState: 4, responseHeaders: "", status: 0, statusText: "", error: e = e || "Forbidden"}), zt = e => {
      if ("Blob" === e.type) return new Blob([ct(e.value)]);
      if ("File" === e.type) {
        if (!e.name) return;
        return new File([ct(e.value)], e.name, {type: e.meta, lastModified: e.lastModified || Date.now()});
      }
      if ("FormData" == e.type) {
        const t = new FormData;
        return Object.keys(e.value).forEach(n => {
          const r = "Array" === e.value[n].type, s = zt(e.value[n]), o = r ? s : [s];
          o.forEach((e, r) => {
            t.append(n, o[r]);
          });
        }), t;
      }
      if ("Array" === e.type || "Object" === e.type) {
        let t, n, r;
        "Object" === e.type ? (r = Object.keys(e.value), n = e => e < r.length ? r[e] : null, t = {}) : (n = t => t < e.value.length ? t : null, t = []);
        for (let r, s = 0; null !== (r = n(s)); s++) t[r] = zt(e.value[r]);
        return t;
      }
      return e.value;
    }, qt = e => {
      const t = {};
      return e && e.split("\n").forEach(e => {
        const n = e.match(/^([^:]+): ?(.*)/);
        if (n) {
          const e = n[1].toLowerCase();
          t[e] = (void 0 !== t[e] ? ", " : "") + (n[2] || "").replace(/,/g, "%2C");
        }
      }), t;
    }, Qt = (e, t, n) => {
      const r = {...t || {}}, s = async (e, t) => {
        const n = r[e];
        n && n("function" == typeof t ? await t() : t);
      }, o = async (e, t) => {
        r[e] && (await s(e, t), r[e] = void 0);
      };
      if (!(n = n || {}).internal && !jt(e.url)) {
        l.warn("xhr: invalid scheme of url:", e.url);
        const t = Nt("Invalid scheme");
        return o("onerror", t), void o("ondone", t);
      }
      const a = void 0 !== e.responseType ? e.responseType.toLowerCase() : void 0, i = e.url && "http" == e.url.substr(0, 4), c = !Ft.mozAnon && e.anonymous || "stream" == a, A = e.fetch;
      if ("stream" == a && !i) {
        l.warn("xhr: stream reqponse requested, but fetch is not available");
        const e = Nt("No fetch support");
        return o("onerror", e), void o("ondone", e);
      }
      return i && (c || A) ? Yt(e, r, n, e.retries || 0, o, s) : Wt(e, r, n, e.retries || 0, o, s);
    }, Ht = "tm-finalurl" + Ae.short_id.toLowerCase(), Xt = "tm-setcookie" + Ae.short_id.toLowerCase(), Yt = (e, t, n, r, s, o) => {
      const a = e.responseType ? e.responseType.toLowerCase() : "", i = (e, t) => {
        const n = [];
        let r, s;
        e.headers && (r = e.headers.get(Ht) || e.url, e.headers.forEach((e, t) => {
          const r = t.toLowerCase();
          [Ht, Xt].includes(r) || n.push(r + ":" + e);
        }), (s = e.headers.get(Xt)) && n.push("set-cookie:" + s));
        const o = void 0 === t ? 4 : t, a = e.status || 0, i = e.statusText || "";
        return {readyState: o, responseHeaders: n.join("\n"), finalUrl: r, status: a, statusText: i};
      }, c = async (e, t, r) => {
        let s;
        if (r) s = e; else {
          const t = e;
          if (!n.no_blob && (te.SHARED_BLOBS || te.SHARED_OBJECT_URLS && !n.foreign_context)) {
            const e = new Bt({blob: t});
            return o("onpartial", {tfd: await e.toTransferableData()}), void y(() => e.dispose(), 3e5);
          }
          s = await ht(e);
        }
        const a = Gt(s, t);
        a.forEach((e, t) => {
          o("onpartial", {partial: e, index: t, length: a.length});
        });
      };
      let A, u, d, p = false;
      const h = e => {
        e && (d = true), m ? m.abort() : d ? f() : f({name: "AbortError", message: "Aborted by user"});
      }, f = e => {
        let t;
        u || (d ? (t = i({status: 408, statusText: "Request Timeout"}), s("ontimeout")) : "AbortError" == (null == e ? void 0 : e.name) ? (t = Nt("aborted"), s("onabort", t)) : (t = i({status: 408, statusText: (null == e ? void 0 : e.message) || "Request Timeout"}), s("onerror", t)), u = true, s("ondone", t));
      };
      let m;
      try {
        const d = {};
        let g;
        d.method = e.method || "GET", d.redirect = "follow", e.headers && (g = Vt(e.headers)), e.nocache ? d.cache = "reload" : e.revalidate && (d.cache = "default", g = g || {}, g = {...g, ...Dt}), e.anonymous ? d.credentials = "omit" : d.credentials = "include", e.user && e.password && (g = g || {}, g.Authorization = "Basic " + L(e.user + ":" + e.password)), g && (d.headers = new Headers(g)), void 0 !== e.data && ("typified" === e.data_type ? d.body = zt(e.data) : "string" == typeof e.data ? d.body = e.data : d.body = JSON.stringify(e.data)), m = S ? new S : void 0, m && (d.signal = m.signal), s("onloadstart", i({status: 0, statusText: ""}, 1)), G(e.url, d).then(d => {
          if (A && (x(A), A = null), u) return;
          let h = i(d);
          if (h.status > 0 && (h.status < 200 || h.status >= 300) && r > 0) return void Yt(e, t, n, r - 1, s, o);
          const {partialSize: m, overrideMimeType: g, responseType: v} = e;
          (async () => {
            var t;
            if (o("onreadystatechange", i(d, 2)), "stream" == a) {
              let n;
              if (d.ok) {
                if (n = null === (t = d.body) || void 0 === t ? void 0 : t.getReader()) for (;;) {
                  const {done: t, value: r} = await n.read();
                  if (r) {
                    const t = new Blob([r]);
                    await c(t, parseInt(e.partialSize), false);
                  }
                  if (t) break;
                }
              } else try {
                const t = await d.text(), n = new Blob([t]);
                await c(n, parseInt(e.partialSize), false);
              } catch (e) {}
            } else if (d.ok) if (m) {
              let t;
              ["arraybuffer", "blob"].includes(a) || void 0 !== g ? (h.response = await d.blob(), t = false) : (h.response = await d.text(), t = true), h = await (async (t, n) => {
                if (e.partialSize) {
                  const r = t.response;
                  ["response", "responseText", "responseXML"].forEach(e => {
                    delete t[e];
                  }), !p && r && (p = true, await c(r, parseInt(e.partialSize), n));
                }
                return t;
              })(h, t);
            } else if (void 0 !== v) {
              let e;
              if ("arraybuffer" == a) h.response = await d.arrayBuffer(); else if ("blob" == a) h.response = await d.blob(); else if ("document" == a) {
                e = (qt(h.responseHeaders)["content-type"] || "text/xml").toString().split(";")[0];
                const t = new O;
                h.response = t.parseFromString(await d.text(), e);
              } else if ("json" == a) {
                const e = await d.text();
                h.response = JSON.parse(e);
              } else l.warn("xhr: responseType", a, " is not implemented!"), h.response = await d.text();
            } else if (void 0 !== g && T) {
              const e = await d.arrayBuffer(), t = (g.toLowerCase().match(/charset=([^;]+)/) || [])[1];
              h.response = new T(t).decode(e);
            } else {
              const e = await d.text();
              h.response = e;
            } else {
              h.responseXML = void 0;
              try {
                h.responseText = h.response = await d.text();
              } catch (e) {}
            }
          })().then(() => {
            s("onreadystatechange", h), s("onload", h), s("ondone", h);
          }).catch(f);
        }).catch(f), void 0 !== e.timeout && (A = y(() => {
          A = null, h(true);
        }, e.timeout));
      } catch (e) {
        const t = e;
        l.error(t.stack);
        const n = Nt(t.message);
        s("onerror", n), s("ondone", n);
      }
      return {abort: () => h()};
    }, Wt = (e, t, n, r, s, o) => {
      const a = e.responseType ? e.responseType.toLowerCase() : "";
      let i, c;
      e.anonymous && (i = Ft.mozAnon ? {mozAnon: true} : {anonymous: true});
      const A = new C(i), u = t => {
        let n = "", r = e.url;
        if (A.readyState >= 2) {
          let e;
          n = A.getAllResponseHeaders(), n && (n = n.replace(/tm-finalurl[0-9a-zA-Z]*: .*[\r\n]{1,2}/i, ""), n = n.replace(/tm-setcookie[0-9a-zA-Z]*:/i, "set-cookie:")), (e = A.getResponseHeader(Ht) || A.responseURL) && (r = e);
        }
        const s = {readyState: A.readyState, responseHeaders: n, finalUrl: r, status: A.readyState >= 2 ? A.status : 0, statusText: A.readyState >= 2 ? A.statusText : ""};
        return t && 4 == A.readyState ? A.responseType ? (s.responseXML = void 0, s.responseText = void 0, s.responseType = A.responseType, s.response = A.response) : (s.responseXML = A.responseXML || void 0, s.responseText = A.responseText, s.response = A.response) : (s.responseXML = void 0, s.responseText = "", s.response = void 0), s;
      };
      let d = false;
      const p = async t => {
        if (e.partialSize) {
          const r = t.response, s = !["arraybuffer", "blob"].includes(a);
          ["response", "responseText", "responseXML"].forEach(e => {
            delete t[e];
          }), !d && r && (d = true, await (async (e, t, r) => {
            let s;
            if (r) s = e; else {
              const t = e;
              if (!n.no_blob && (te.SHARED_BLOBS || te.SHARED_OBJECT_URLS && !n.foreign_context)) {
                const e = new Bt({blob: t});
                return o("onpartial", {tfd: await e.toTransferableData()}), void y(() => e.dispose(), 3e5);
              }
              s = await ht(e);
            }
            const a = Gt(s, t);
            a.forEach((e, t) => {
              o("onpartial", {partial: e, index: t, length: a.length});
            });
          })(r, parseInt(e.partialSize), s));
        }
        return t;
      }, h = g({threads: 1}), f = e => t => h.add(() => e(t)), m = {onload: f(async () => {
        let a = u(true);
        a.status > 0 && (a.status < 200 || a.status >= 300) && r > 0 ? Wt(e, t, n, r - 1, s, o) : (e.partialSize && (a = await p(a)), await s("onload", a), 4 == a.readyState && await s("ondone", a));
      }), onerror: f(async () => {
        const a = u();
        4 == a.readyState && 200 != a.status && 0 != a.status && r > 0 ? Wt(e, t, n, r - 1, s, o) : (await s("onerror", a), await s("ondone", a));
      }), onloadstart: f(async () => {
        await o("onloadstart", () => u());
      }), onreadystatechange: f(async () => {
        await o("onreadystatechange", async () => {
          let e = u();
          return e = await p(e), e;
        });
      }), onprogress: f(async e => {
        await o("onprogress", async () => {
          let t = u();
          return t = await p(t), b(e, t);
        });
      }), ontimeout: f(async () => {
        const e = u();
        await s("ontimeout"), await s("ondone", e);
      }), onabort: f(async () => {
        const e = Nt("aborted");
        await s("onabort"), await s("ondone", e);
      })}, v = {onuploadprogress: f(async e => {
        await o("onuploadprogress", async () => b(e));
      })}, _ = 0 == Object.keys(m).concat(["ondone"]).filter(e => !!t[e]).length;
      if (_) throw new Error("Synchronous XHR is not supported anymore");
      const b = (e, t) => {
        let n, r, s, o, a, i;
        try {
          if (e.lengthComputable || e.total > 0) n = e.loaded, r = e.total; else if (t) {
            const s = !A.responseType || ["", "text"].includes(A.responseType) ? A.responseText : null;
            let o = Number(qt(t.responseHeaders)["content-length"] || "");
            const a = t.readyState > 2 && s ? s.length : 0;
            0 == o && (o = -1), n = e.loaded || a, r = e.total || o;
          }
          o = e.lengthComputable, s = n, a = n, i = r;
        } catch (e) {}
        return Object.assign(t || {}, {lengthComputable: o, loaded: s, done: n, position: a, total: r, totalSize: i});
      }, w = ["ontimeout", "onload", "onerror", "onabort"];
      Object.keys(m).forEach(e => {
        (t[e] || w.includes(e)) && (A[e] = m[e]);
      });
      const k = {onuploadprogress: "onprogress"};
      A.upload && Object.keys(v).forEach(e => {
        const n = k[e];
        n && t[e] && (A.upload[n] = v[e]);
      });
      try {
        if (!n.internal && !jt(e.url)) throw new Error("Invalid scheme of url: " + e.url);
        A.open(e.method || "GET", e.url, !_, e.user, e.password);
        let t = Vt(e.headers);
        (e.nocache || e.revalidate) && (t = t || {}, e.nocache ? t = {...t, ...Pt} : e.revalidate && (t = {...t, ...Dt})), t && Object.keys(t).forEach(e => {
          try {
            A.setRequestHeader(e, t[e]);
          } catch (n) {
            l.warn("xhr: rejected header", e, t[e]);
          }
        }), void 0 !== e.overrideMimeType && A.overrideMimeType(e.overrideMimeType), e.partialSize ? ["arraybuffer", "blob"].includes(a) ? A.responseType = e.responseType = "blob" : delete e.responseType : void 0 !== e.responseType && (c = e.responseType.toLowerCase(), "document" != c && "json" != c && "xml" != c && "headers" != c && "stream" != c && (A.responseType = c)), void 0 !== e.timeout && (A.timeout = e.timeout), void 0 !== e.data ? "typified" === e.data_type ? A.send(zt(e.data)) : "string" == typeof e.data ? A.send(e.data) : A.send(JSON.stringify(e.data)) : A.send();
      } catch (e) {
        const t = e;
        l.error(t.stack);
        const n = Nt(t.message);
        s("onerror", n), s("ondone", n);
      }
      return {abort: function () {
        A.abort();
      }};
    }, Jt = ".tld", Kt = "aaa\naarp\nabb\nabbott\nabogado\nac\nacademy\naccenture\naccountant\naccountants\naco\nactive\nactor\nad\nadac\nads\nadult\nae\naeg\naero\naf\nafl\nag\nagency\nai\naig\nairforce\nairtel\nal\nalibaba\nalipay\nallfinanz\nalsace\nam\namica\namsterdam\nan\nanalytics\nandroid\nao\napartments\napp\napple\naq\naquarelle\nar\naramco\narchi\narmy\narpa\narte\nas\nasia\nassociates\nat\nattorney\nau\nauction\naudi\naudio\nauthor\nauto\nautos\naw\nax\naxa\naz\nazure\nba\nbaidu\nband\nbank\nbar\nbarcelona\nbarclaycard\nbarclays\nbargains\nbauhaus\nbayern\nbb\nbbc\nbbva\nbcn\nbd\nbe\nbeats\nbeer\nbentley\nberlin\nbest\nbet\nbf\nbg\nbh\nbharti\nbi\nbible\nbid\nbike\nbing\nbingo\nbio\nbiz\nbj\nbl\nblack\nblackfriday\nbloomberg\nblue\nbm\nbms\nbmw\nbn\nbnl\nbnpparibas\nbo\nboats\nboehringer\nbom\nbond\nboo\nbook\nboots\nbosch\nbostik\nbot\nboutique\nbq\nbr\nbradesco\nbridgestone\nbroadway\nbroker\nbrother\nbrussels\nbs\nbt\nbudapest\nbugatti\nbuild\nbuilders\nbusiness\nbuy\nbuzz\nbv\nbw\nby\nbz\nbzh\nca\ncab\ncafe\ncal\ncall\ncamera\ncamp\ncancerresearch\ncanon\ncapetown\ncapital\ncar\ncaravan\ncards\ncare\ncareer\ncareers\ncars\ncartier\ncasa\ncash\ncasino\ncat\ncatering\ncba\ncbn\ncc\ncd\nceb\ncenter\nceo\ncern\ncf\ncfa\ncfd\ncg\nch\nchanel\nchannel\nchat\ncheap\nchloe\nchristmas\nchrome\nchurch\nci\ncipriani\ncircle\ncisco\ncitic\ncity\ncityeats\nck\ncl\nclaims\ncleaning\nclick\nclinic\nclinique\nclothing\ncloud\nclub\nclubmed\ncm\ncn\nco\ncoach\ncodes\ncoffee\ncollege\ncologne\ncom\ncommbank\ncommunity\ncompany\ncompare\ncomputer\ncomsec\ncondos\nconstruction\nconsulting\ncontact\ncontractors\ncooking\ncool\ncoop\ncorsica\ncountry\ncoupons\ncourses\ncr\ncredit\ncreditcard\ncreditunion\ncricket\ncrown\ncrs\ncruises\ncsc\ncu\ncuisinella\ncv\ncw\ncx\ncy\ncymru\ncyou\ncz\ndabur\ndad\ndance\ndate\ndating\ndatsun\nday\ndclk\nde\ndealer\ndeals\ndegree\ndelivery\ndell\ndeloitte\ndelta\ndemocrat\ndental\ndentist\ndesi\ndesign\ndev\ndiamonds\ndiet\ndigital\ndirect\ndirectory\ndiscount\ndj\ndk\ndm\ndnp\ndo\ndocs\ndog\ndoha\ndomains\ndoosan\ndownload\ndrive\ndubai\ndurban\ndvag\ndz\nearth\neat\nec\nedeka\nedu\neducation\nee\neg\neh\nemail\nemerck\nenergy\nengineer\nengineering\nenterprises\nepson\nequipment\ner\nerni\nes\nesq\nestate\net\neu\neurovision\neus\nevents\neverbank\nexchange\nexpert\nexposed\nexpress\nfage\nfail\nfairwinds\nfaith\nfamily\nfan\nfans\nfarm\nfashion\nfast\nfeedback\nferrero\nfi\nfilm\nfinal\nfinance\nfinancial\nfirestone\nfirmdale\nfish\nfishing\nfit\nfitness\nfj\nfk\nflickr\nflights\nflorist\nflowers\nflsmidth\nfly\nfm\nfo\nfoo\nfootball\nford\nforex\nforsale\nforum\nfoundation\nfox\nfr\nfresenius\nfrl\nfrogans\nfrontier\nfund\nfurniture\nfutbol\nfyi\nga\ngal\ngallery\ngallup\ngame\ngarden\ngb\ngbiz\ngd\ngdn\nge\ngea\ngent\ngenting\ngf\ngg\nggee\ngh\ngi\ngift\ngifts\ngives\ngiving\ngl\nglass\ngle\nglobal\nglobo\ngm\ngmail\ngmo\ngmx\ngn\ngold\ngoldpoint\ngolf\ngoo\ngoog\ngoogle\ngop\ngot\ngov\ngp\ngq\ngr\ngrainger\ngraphics\ngratis\ngreen\ngripe\ngroup\ngs\ngt\ngu\ngucci\nguge\nguide\nguitars\nguru\ngw\ngy\nhamburg\nhangout\nhaus\nhdfcbank\nhealth\nhealthcare\nhelp\nhelsinki\nhere\nhermes\nhiphop\nhitachi\nhiv\nhk\nhm\nhn\nhockey\nholdings\nholiday\nhomedepot\nhomes\nhonda\nhorse\nhost\nhosting\nhoteles\nhotmail\nhouse\nhow\nhr\nhsbc\nht\nhu\nhyundai\nibm\nicbc\nice\nicu\nid\nie\nifm\niinet\nil\nim\nimmo\nimmobilien\nin\nindustries\ninfiniti\ninfo\ning\nink\ninstitute\ninsurance\ninsure\nint\ninternational\ninvestments\nio\nipiranga\niq\nir\nirish\nis\niselect\nist\nistanbul\nit\nitau\niwc\njaguar\njava\njcb\nje\njetzt\njewelry\njlc\njll\njm\njmp\njo\njobs\njoburg\njot\njoy\njp\njprs\njuegos\nkaufen\nkddi\nke\nkfh\nkg\nkh\nki\nkia\nkim\nkinder\nkitchen\nkiwi\nkm\nkn\nkoeln\nkomatsu\nkp\nkpn\nkr\nkrd\nkred\nkw\nky\nkyoto\nkz\nla\nlacaixa\nlamborghini\nlamer\nlancaster\nland\nlandrover\nlanxess\nlasalle\nlat\nlatrobe\nlaw\nlawyer\nlb\nlc\nlds\nlease\nleclerc\nlegal\nlexus\nlgbt\nli\nliaison\nlidl\nlife\nlifeinsurance\nlifestyle\nlighting\nlike\nlimited\nlimo\nlincoln\nlinde\nlink\nlive\nliving\nlixil\nlk\nloan\nloans\nlol\nlondon\nlotte\nlotto\nlove\nlr\nls\nlt\nltd\nltda\nlu\nlupin\nluxe\nluxury\nlv\nly\nma\nmadrid\nmaif\nmaison\nmakeup\nman\nmanagement\nmango\nmarket\nmarketing\nmarkets\nmarriott\nmba\nmc\nmd\nme\nmed\nmedia\nmeet\nmelbourne\nmeme\nmemorial\nmen\nmenu\nmeo\nmf\nmg\nmh\nmiami\nmicrosoft\nmil\nmini\nmk\nml\nmm\nmma\nmn\nmo\nmobi\nmobily\nmoda\nmoe\nmoi\nmom\nmonash\nmoney\nmontblanc\nmormon\nmortgage\nmoscow\nmotorcycles\nmov\nmovie\nmovistar\nmp\nmq\nmr\nms\nmt\nmtn\nmtpc\nmtr\nmu\nmuseum\nmutuelle\nmv\nmw\nmx\nmy\nmz\nna\nnadex\nnagoya\nname\nnatura\nnavy\nnc\nne\nnec\nnet\nnetbank\nnetwork\nneustar\nnew\nnews\nnexus\nnf\nng\nngo\nnhk\nni\nnico\nnikon\nninja\nnissan\nnl\nno\nnokia\nnorton\nnowruz\nnp\nnr\nnra\nnrw\nntt\nnu\nnyc\nnz\nobi\noffice\nokinawa\nom\nomega\none\nong\nonl\nonline\nooo\noracle\norange\norg\norganic\norigins\nosaka\notsuka\novh\npa\npage\npamperedchef\npanerai\nparis\npars\npartners\nparts\nparty\npe\npet\npf\npg\nph\npharmacy\nphilips\nphoto\nphotography\nphotos\nphysio\npiaget\npics\npictet\npictures\npid\npin\nping\npink\npizza\npk\npl\nplace\nplay\nplaystation\nplumbing\nplus\npm\npn\npohl\npoker\nporn\npost\npr\npraxi\npress\npro\nprod\nproductions\nprof\npromo\nproperties\nproperty\nprotection\nps\npt\npub\npw\npwc\npy\nqa\nqpon\nquebec\nquest\nracing\nre\nread\nrealtor\nrealty\nrecipes\nred\nredstone\nredumbrella\nrehab\nreise\nreisen\nreit\nren\nrent\nrentals\nrepair\nreport\nrepublican\nrest\nrestaurant\nreview\nreviews\nrexroth\nrich\nricoh\nrio\nrip\nro\nrocher\nrocks\nrodeo\nroom\nrs\nrsvp\nru\nruhr\nrun\nrw\nrwe\nryukyu\nsa\nsaarland\nsafe\nsafety\nsakura\nsale\nsalon\nsamsung\nsandvik\nsandvikcoromant\nsanofi\nsap\nsapo\nsarl\nsas\nsaxo\nsb\nsbs\nsc\nsca\nscb\nschaeffler\nschmidt\nscholarships\nschool\nschule\nschwarz\nscience\nscor\nscot\nsd\nse\nseat\nsecurity\nseek\nselect\nsener\nservices\nseven\nsew\nsex\nsexy\nsfr\nsg\nsh\nsharp\nshell\nshia\nshiksha\nshoes\nshow\nshriram\nsi\nsingles\nsite\nsj\nsk\nski\nskin\nsky\nskype\nsl\nsm\nsmile\nsn\nsncf\nso\nsoccer\nsocial\nsoftbank\nsoftware\nsohu\nsolar\nsolutions\nsony\nsoy\nspace\nspiegel\nspreadbetting\nsr\nsrl\nss\nst\nstada\nstar\nstarhub\nstatefarm\nstatoil\nstc\nstcgroup\nstockholm\nstorage\nstudio\nstudy\nstyle\nsu\nsucks\nsupplies\nsupply\nsupport\nsurf\nsurgery\nsuzuki\nsv\nswatch\nswiss\nsx\nsy\nsydney\nsymantec\nsystems\nsz\ntab\ntaipei\ntaobao\ntatamotors\ntatar\ntattoo\ntax\ntaxi\ntc\ntci\ntd\nteam\ntech\ntechnology\ntel\ntelefonica\ntemasek\ntennis\ntf\ntg\nth\nthd\ntheater\ntheatre\ntickets\ntienda\ntiffany\ntips\ntires\ntirol\ntj\ntk\ntl\ntm\ntmall\ntn\nto\ntoday\ntokyo\ntools\ntop\ntoray\ntoshiba\ntours\ntown\ntoyota\ntoys\ntp\ntr\ntrade\ntrading\ntraining\ntravel\ntravelers\ntravelersinsurance\ntrust\ntrv\ntt\ntube\ntui\ntushu\ntv\ntvs\ntw\ntz\nua\nubs\nug\nuk\num\nunicom\nuniversity\nuno\nuol\nus\nuy\nuz\nva\nvacations\nvana\nvc\nve\nvegas\nventures\nverisign\nversicherung\nvet\nvg\nvi\nviajes\nvideo\nvillas\nvin\nvip\nvirgin\nvision\nvista\nvistaprint\nviva\nvlaanderen\nvn\nvodka\nvolkswagen\nvote\nvoting\nvoto\nvoyage\nvu\nwales\nwalter\nwang\nwanggou\nwatch\nwatches\nweather\nweatherchannel\nwebcam\nweber\nwebsite\nwed\nwedding\nweir\nwf\nwhoswho\nwien\nwiki\nwilliamhill\nwin\nwindows\nwine\nwme\nwolterskluwer\nwork\nworks\nworld\nws\nwtc\nwtf\nxbox\nxerox\nxin\n测试\nकॉम\nपरीक्षा\n佛山\n慈善\n集团\n在线\n한국\n点看\nคอม\nভারত\n八卦\n‏موقع‎\nবাংলা\n公益\n公司\n移动\n我爱你\nмосква\nиспытание\nқаз\nонлайн\nсайт\n联通\nсрб\nбел\n‏קום‎\n时尚\n테스트\n淡马锡\nорг\nनेट\n삼성\nசிங்கப்பூர்\n商标\n商店\n商城\nдети\nмкд\n‏טעסט‎\nею\nポイント\n新闻\n工行\n‏كوم‎\n中文网\n中信\n中国\n中國\n娱乐\n谷歌\nభారత్\nලංකා\n购物\n測試\nભારત\nभारत\n‏آزمایشی‎\nபரிட்சை\n网店\nसंगठन\n餐厅\n网络\nком\nукр\n香港\n诺基亚\nδοκιμή\n飞利浦\n‏إختبار‎\n台湾\n台灣\n手表\n手机\nмон\n‏الجزائر‎\n‏عمان‎\n‏ارامكو‎\n‏ایران‎\n‏امارات‎\n‏بازار‎\n‏پاکستان‎\n‏الاردن‎\n‏موبايلي‎\n‏بھارت‎\n‏المغرب‎\n‏السعودية‎\n‏سودان‎\n‏همراه‎\n‏عراق‎\n‏مليسيا‎\n澳門\n닷컴\n政府\n‏شبكة‎\n‏بيتك‎\nგე\n机构\n组织机构\n健康\nไทย\n‏سورية‎\nрус\nрф\n珠宝\n‏تونس‎\n大拿\nみんな\nグーグル\nελ\n世界\nਭਾਰਤ\n网址\n닷넷\nコム\n游戏\nvermögensberater\nvermögensberatung\n企业\n信息\n‏مصر‎\n‏قطر‎\n广东\nஇலங்கை\nஇந்தியா\nհայ\n新加坡\n‏فلسطين‎\nテスト\n政务\nxperia\nxxx\nxyz\nyachts\nyahoo\nyamaxun\nyandex\nye\nyodobashi\nyoga\nyokohama\nyoutube\nyt\nza\nzara\nzero\nzip\nzm\nzone\nzuerich\nzw".split("\n").join("|"), $t = "ac.cn\nac.jp\nac.uk\nad.jp\nah.cn\naichi.jp\nakita.jp\naomori.jp\nasn.au\nbj.cn\nchiba.jp\nco.cc\nco.ck\nco.fk\nco.gg\nco.im\nco.in\nco.ir\nco.je\nco.jp\nco.kr\nco.ma\ncom.ac\ncom.af\ncom.ag\ncom.ai\ncom.al\ncom.ar\ncom.au\ncom.aw\ncom.az\ncom.ba\ncom.bb\ncom.bh\ncom.bi\ncom.bm\ncom.bo\ncom.br\ncom.bs\ncom.bt\ncom.by\ncom.bz\ncom.ci\ncom.cm\ncom.cn\ncom.co\ncom.cu\ncom.cw\ncom.cy\ncom.de\ncom.dm\ncom.do\ncom.dz\ncom.ec\ncom.ee\ncom.eg\ncom.es\ncom.et\ncom.fr\ncom.ge\ncom.gh\ncom.gi\ncom.gl\ncom.gn\ncom.gp\ncom.gr\ncom.gt\ncom.gu\ncom.gy\ncom.hk\ncom.hn\ncom.hr\ncom.ht\ncom.im\ncom.io\ncom.iq\ncom.is\ncom.jo\ncom.kg\ncom.ki\ncom.km\ncom.kp\ncom.ky\ncom.kz\ncom.la\ncom.lb\ncom.lc\ncom.lk\ncom.lr\ncom.lv\ncom.ly\ncom.mg\ncom.mk\ncom.ml\ncom.mo\ncom.ms\ncom.mt\ncom.mu\ncom.mv\ncom.mw\ncom.mx\ncom.my\ncom.na\ncom.nf\ncom.ng\ncom.ni\ncom.nr\ncom.om\ncom.pa\ncom.pe\ncom.pf\ncom.ph\ncom.pk\ncom.pl\ncom.pr\ncom.ps\ncom.pt\ncom.py\ncom.qa\ncom.re\ncom.ro\ncom.ru\ncom.rw\ncom.sa\ncom.sb\ncom.sc\ncom.sd\ncom.se\ncom.sg\ncom.sh\ncom.sl\ncom.sn\ncom.so\ncom.st\ncom.sv\ncom.sy\ncom.tj\ncom.tm\ncom.tn\ncom.to\ncom.tr\ncom.tt\ncom.tw\nco.mu\ncom.ua\ncom.ug\ncom.uy\ncom.uz\ncom.vc\ncom.ve\ncom.vi\ncom.vn\ncom.vu\ncom.ws\ncom.zm\nconf.au\nco.nz\nco.rw\nco.th\nco.tj\nco.tt\nco.tv\nco.tz\nco.ug\nco.uk\nco.us\nco.ve\nco.yu\nco.za\nco.zm\nco.zw\ncq.cn\ncsiro.au\nde.net\ndk.org\ned.jp\nedu.au\nedu.cn\nedu.uk\nehime.jp\neu.org\nfukui.jp\nfukuoka.jp\nfukushima.jp\ngb.net\ngd.cn\ngifu.jp\ngo.jp\ngov.au\ngov.cn\ngov.jp\ngov.uk\ngr.jp\ngs.cn\ngunma.jp\ngx.cn\ngz.cn\nhb.cn\nhe.cn\nhi.cn\nhiroshima.jp\nhk.cn\nhl.cn\nhn.cn\nhokkaido.jp\nhyogo.jp\nibaraki.jp\nid.au\ninfo.au\nishikawa.jp\niwate.jp\njl.cn\njs.cn\nkagawa.jp\nkagoshima.jp\nkanagawa.jp\nkanazawa.jp\nkawasaki.jp\nkitakyushu.jp\nkobe.jp\nkochi.jp\nkumamoto.jp\nkyoto.jp\nlg.jp\nln.cn\nltd.uk\nmatsuyama.jp\nme.uk\nmie.jp\nmiyagi.jp\nmiyazaki.jp\nmo.cn\nmod.uk\nnagano.jp\nnagasaki.jp\nnagoya.jp\nnara.jp\nne.jp\nnet.au\nnet.cn\nnet.jp\nnet.uk\nnhs.uk\nnic.uk\nniigata.jp\nnm.cn\nnx.cn\noita.jp\nokayama.jp\nokinawa.jp\norg.au\norg.cn\norg.jp\norg.uk\nor.jp\nosaka.jp\notc.au\noz.au\nplc.uk\npolice.uk\nqh.cn\nsaga.jp\nsaitama.jp\nsapporo.jp\nsc.cn\nsch.uk\nsendai.jp\nsh.cn\nshiga.jp\nshimane.jp\nshizuoka.jp\nsn.cn\nsx.cn\ntakamatsu.jp\ntelememo.au\ntj.cn\ntochigi.jp\ntokushima.jp\ntokyo.jp\ntottori.jp\ntoyama.jp\ntw.cn\nuk.net\nutsunomiya.jp\nwakayama.jp\nxj.cn\nxz.cn\nyamagata.jp\nyamaguchi.jp\nyamanashi.jp\nyn.cn\nyokohama.jp\nzj.cn".split("\n").join("|"), en = (".(" + [Kt, $t].join("|") + ")").replace(/\./gi, "\\."), tn = v({timeout: 180, check_interval: 120, retimeout_on_get: true}).init(), nn = /^([^:]+:\/\/)([^/]+)(.*)?/, rn = e => e.split("").map(e => {
      const t = e.toLowerCase(), n = e.toUpperCase();
      return t != n ? "[" + t + n + "]" : e;
    }).join(""), sn = "://", on = (e, t) => {
      let {scheme: n, host: r, path: s} = (e => {
        let t, n, r, s;
        const o = "/", a = e.replace(/\$$/, "").split(sn);
        a.length < 2 ? (t = "", n = e) : (t = a[0].replace(/^\^/, ""), n = a.slice(1).join(sn));
        const i = n.split(o);
        if (s = i.length < 2 ? "/" : o + i.slice(1).join(o), r = i[0], "http*" === t ? t = "https<1>" : t.match(/\*|http|https|file|ftp/) || (l.warn('uri: override scheme "' + t + '" with "*"'), t = "*"), "file" === t) r = ""; else {
          const e = r, t = r.match(/\*$|(\*\.)?[^/*]+/);
          r = (t ? t[0] : "").replace(/:[0-9]*$/, ""), r !== e && l.warn('uri: override host "' + e + '" with "' + r + '"');
        }
        return s && s.substr(0, 1) === o || (l.warn('uri: prefix path "' + s + '" with "/"'), s = o + s), {scheme: t, host: r, path: s};
      })(e);
      return n = vt(n).replace(/\*/gi, "[^:/#?]*"), r = vt(r).replace(/\*\\\./gi, "(*\\.)?").replace(/\*/gi, "[^#?/]*"), s = vt(s).replace(/\*/gi, ".*"), n = n.replace(/<1>/g, "?"), r = r.replace(new RegExp(vt(Jt) + "$"), en), t ? (n = n.toLowerCase(), r = r.toLowerCase()) : (n = rn(n), r = rn(r)), r += "(:[0-9]{1,5})?", "^" + n + vt(sn) + r + s + "$";
    }, an = ["protocol", "hostname", "origin"], ln = ["port"], cn = ["pathname"], An = ["search", "hash"];
    let un;
    const dn = {protocol: "", origin: "", pathname: "", hostname: "", port: void 0, search: "", hash: ""}, pn = (e, t) => {
      let n = Object.assign({}, dn);
      if (null == e) ; else if (["data:", "view-source:"].some(t => e.startsWith(t))) {
        n.origin = "null";
        const t = e.indexOf(":");
        n.protocol = e.substr(0, t + 1), n.pathname = e.substr(t + 1);
      } else {
        const r = document.createElement("a");
        r.href = e;
        const s = document.body || document.documentElement || document;
        s.appendChild(r);
        const {protocol: o, origin: a, pathname: i, hostname: l, port: c, search: A, hash: u} = r;
        if (n = {protocol: o, origin: a, pathname: i, hostname: l, port: parseInt(c) || void 0, search: A, hash: u}, s.removeChild(r), !t && o) {
          if (0 !== e.toLowerCase().indexOf(o)) if (e.startsWith("//")) n.origin = "", n.protocol = ""; else {
            if (!["/", "?", "#"].includes(e[0])) return pn("/" + e);
            un = un || pn("", true), [...An, ...cn].forEach(e => {
              un[e] === n[e] && (n[e] = "");
            }), an.forEach(e => {
              n[e] = "";
            }), ln.forEach(e => {
              n[e] = void 0;
            });
          }
          ["tampermonkey:"].includes(n.protocol) && (n.pathname = ((n.hostname ? "/" + n.hostname : "") + (n.pathname || "")).replace(/^\/+/, "/"), n.hostname = "");
        }
      }
      return 0 === n.port && (n.port = void 0), Object.defineProperties(n, {domain: {get: function () {
        const e = n.hostname.split("."), t = e.pop();
        let r = `${e.pop()}.${t}`;
        return vn(r) && (r = `${e.pop()}.${r}`), r;
      }}}), n;
    }, hn = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/, fn = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/;
    let mn;
    const gn = e => {
      return !(!(t = e).match(hn) && !t.match(fn) && e.includes("."));
      var t;
    }, vn = e => (mn = mn || new RegExp("^(" + $t.replace(/\./g, "\\.") + ")$"), !!e.match(mn)), _n = (e, t, n) => {
      let r = false;
      const s = bn(e);
      let o = e;
      if (s) return "tampermonkey:" == s.protocol ? s.pathname.includes("..") ? r = true : o = ue.getURL(e.replace(/^tampermonkey:\/\//, "")) : s.protocol || t && (o = wn(e, t, n || ["http:", "https:"])) || (r = true), r ? null : o;
    }, bn = e => {
      if (null == e) return;
      let t = tn.get(e);
      return t || (t = pn(e), tn.set(e, t), t);
    }, wn = (e, t, n) => {
      let r, s, o;
      if (e && t && (r = bn(e)) && (s = bn(t)) && s.protocol && (!n || n.includes(s.protocol) || !e.includes(".."))) {
        if (e.startsWith("//")) return s.protocol + "//" + r.hostname + (r.port ? ":" + r.port : "") + r.pathname + r.search;
        if ("/" === e[0]) o = r.pathname; else {
          if (t = yn(s), !(s = bn(t + ("/" === t[t.length - 1] ? "" : "/") + e))) return;
          o = s.pathname;
        }
        return s.protocol + "//" + s.hostname + (s.port ? ":" + s.port : "") + o + r.search;
      }
    }, kn = (e, t) => (t = t || {}, (["about:"].includes(e.protocol) ? e.protocol : e.protocol + "//") + e.hostname + (e.port && e.port > 0 ? ":" + e.port : "") + (t.nopath ? "" : e.pathname + (t.nosearch ? "" : e.search))), yn = e => {
      const t = "string" == typeof e ? bn(e) : e;
      if (!t) throw new Error("invalid url");
      return kn(t, {nosearch: true});
    }, Rn = e => {
      const t = "string" == typeof e ? bn(e) : e;
      if (!t) throw new Error("invalid url");
      return kn(t);
    }, xn = e => Object.entries(e).map(([e, t]) => void 0 === t ? null : encodeURIComponent(e) + "=" + encodeURIComponent(t)).filter(e => e).join("&");
    let En = [];
    const Sn = {}, Gn = {}, Cn = {}, Mn = {}, In = "en";
    let Zn = {}, Un = {}, Tn = null;
    const Bn = [], On = (e, ...t) => {
      const n = [], r = e => {
        for (let t = 0; t < e.length; t++) Array.isArray(e[t]) ? r(e[t]) : n.push(String(e[t]));
      };
      return r(t), Ne.getMessage(e, n);
    }, Fn = e => new Promise((t, n) => {
      ((e, t) => {
        let n;
        if (void 0 !== (n = Mn[e])) t && t(n); else {
          const r = ue.getURL(e);
          try {
            const s = new C;
            if (C.onlyasync) {
              if (!t) return void l.warn("registry: async xhr without a callback!");
              s.open("GET", r), s.onload = () => {
                t(s.responseText);
              }, s.onerror = () => {
                t();
              }, s.send(null);
            } else s.open("GET", r, false), s.send(null), n = s.responseText, n || l.warn("registry: content of " + e + " is null!"), t && t(n);
          } catch (e) {
            l.log("getRawContent " + e);
          }
        }
      })(`_locales/${e}/messages.json`, r => {
        try {
          if (r) return t(JSON.parse(r));
        } catch (t) {
          l.log("i18n: parsing locale " + e + " failed!");
        }
        n();
      });
    }), jn = async e => {
      e = e.concat(In);
      let t = -1, n = null;
      const r = async () => {
        if (t++, t < e.length) {
          const s = e[t];
          if (!s || !Vn.includes(s)) return r();
          try {
            const e = await Fn(s);
            n = s, Zn = e;
          } catch (e) {
            return r();
          }
          if (!Nn && s != In) try {
            const e = await Fn(In);
            Un = e || {};
          } catch (e) {}
        }
      };
      return await r(), n;
    }, Ln = e => e ? e.replace(/-/g, "_").split("_").map((e, t) => t ? e.toUpperCase() : e.toLowerCase()).join("_") : e, Pn = (e, t) => {
      let n, r;
      return t = t || (Tn ? [Tn, Tn.split("_")[0]].concat(Bn).filter(e => e) : Bn), wt(t, (t, s) => {
        const o = Number(s);
        if (wt(e, (e, s) => {
          const a = Number(s), i = Ln(e), l = i.split(/_/)[0];
          if (i == t) return r = a, false;
          l == t && (void 0 === n || o < n) && (r = a, n = o);
        }), void 0 !== r) return false;
      }), void 0 === r ? r : e[r];
    }, Dn = [{value: "ar", name: "Arabic - ‎‫العربية‬‎"}, {value: "be", name: "Belarusian - беларуская"}, {value: "cs", name: "Czech - čeština"}, {value: "da", name: "Danish - dansk"}, {value: "de", name: "German - Deutsch"}, {value: "el", name: "Hellenic (Greek) - Ελληνικά"}, {value: "en", name: "English"}, {value: "es", name: "Spanish - español"}, {value: "fr", name: "French - français"}, {value: "hi", name: "Hindi - हिन्दी"}, {value: "hr", name: "Croatian - hrvatski"}, {value: "hu", name: "Hungarian - magyar"}, {value: "id", name: "Indonesian - Indonesia"}, {value: "it", name: "Italian - italiano"}, {value: "ja", name: "Japanese - 日本語"}, {value: "ko", name: "Korean - 한국어"}, {value: "mk", name: "Macedonian - македонски"}, {value: "nb", name: "Norwegian - norsk"}, {value: "nl", name: "Dutch - Nederlands"}, {value: "pl", name: "Polish - polski"}, {value: "pt_BR", name: "Portuguese (Brazil) - português (Brasil)"}, {value: "pt_PT", name: "Portuguese (Portugal) - português (Portugal)"}, {value: "ru", name: "Russian - русский"}, {value: "sk", name: "Slovak - slovenčina"}, {value: "sr", name: "Serbian - српски"}, {value: "tr", name: "Turkish - Türkçe"}, {value: "uk", name: "Ukrainian - українська"}, {value: "vi", name: "Vietnamese - Tiếng Việt"}, {value: "zh_CN", name: "Chinese (Simplified) - 中文（简体中文）"}, {value: "zh_TW", name: "Chinese (Traditional) - 中文（繁體）"}], Vn = Dn.map(e => e.value), Nn = !(void 0 === Ne) && Ne.native_support, zn = {init: async () => {
      const e = async () => {
        Tn || Nn || (Tn = await jn(Bn));
      }, t = Ln(Nn ? Ne.getUILanguage() : navigator.language);
      if (t) {
        const e = [t], n = t.split(/_/);
        n[0] !== t && e.push(n[0]), e.forEach(e => {
          Bn.unshift(e);
        });
      }
      await e(), Nn && (await new Promise(e => {
        Ne.getAcceptLanguages(t => {
          t.forEach(e => {
            Bn.push(Ln(e));
          }), e();
        });
      }), await e());
    }, getMessage: (e, ...t) => {
      let n;
      return Tn && (n = Zn[e] || Un[e]) ? ((e, t) => {
        let n, r = e.message;
        return n = 1 == t.length && Array.isArray(t[0]) ? t[0] : t, e.placeholders && Object.entries(e.placeholders).forEach(([e, t]) => {
          try {
            const s = Number(t.content.replace(/^\$/, "")) - 1;
            let o;
            s < n.length ? (o = n[s], r = r.replace("$" + e + "$", o)) : l.log('i18n: invalid argument count on processing "' + r + '" with args ' + JSON.stringify(n));
          } catch (e) {
            l.log('i18n: error processing "' + r + '" with args ' + JSON.stringify(n));
          }
        }), r;
      })(n, t) : (Nn && (n = On(e, ...t)) || (n = function (e, ...t) {
        let n = e;
        1 == t.length && Array.isArray(t[0]) && (t = t[0]);
        const r = new RegExp("(^|_)0[a-zA-Z]+0(_|$)");
        for (let e = 0; e < t.length; e++) {
          const s = n.match(r);
          if (!s) {
            l.log("i18n: getMessage(): wrong argument count!!!");
            break;
          }
          n = n.replace(r, (s[1] ? " " : "") + t[e] + (s[2] ? " " : ""));
        }
        return n.replace(/_/g, " ");
      }(e, ...t), l.warn("i18n: missing translation" + n)), n);
    }, getOriginalMessage: On, normalizeLocale: Ln, getTranslation: (e, t) => {
      let n;
      const r = e[t];
      if (e) {
        let s = e[t + "_i18n"] || {};
        r && (s = {en: r, ...s});
        const o = Pn(Object.keys(s));
        void 0 !== o && (n = s[o]);
      }
      return n || r;
    }, setLocale: async e => {
      let t = e;
      if ("null" === e && (t = null), t && (t = Ln(t)), !t && Nn) Tn = t; else if (t !== Tn) return jn([t, ...Bn, Tn].filter(e => e)).then(t => {
        Tn = t, Tn != e && l.log("i18n: retrieving locale " + t + " failed!");
      });
    }, getLocale: () => Tn, getUiLocale: () => Ln(Tn || Nn ? Ne.getUILanguage() : Bn[0] || navigator.language || In), getBestLocale: Pn, supported: Dn};
    let qn = {}, Qn = null;
    const Hn = () => {
      const e = Date.now(), t = qn;
      qn = {};
      const n = Object.keys(t);
      n.forEach(n => {
        const r = t[n];
        r && e - r.ts < Xn ? qn[n] = r : r.com.reject({error: "timeout", please_close: true});
      }), null !== Qn && 0 === n.length && (E(Qn), Qn = null);
    }, Xn = 15e3;
    let Yn = false;
    const Wn = (e, t) => {
      Yn || Jn.init(), null === Qn && (Qn = R(Hn, 5e3));
      const n = q();
      return ((e, t) => {
        const n = q();
        return void 0 === t && (t = true), ie.tabs.getSelected(null, r => {
          const s = r ? r.index + 1 : void 0;
          _e({url: pe.getURL("ask.html") + "?aid=" + e, active: t, index: s, parent: r}, e => {
            if (!e) {
              const e = "tabs.create failed -> giving up now!";
              return l.error(e), void n.reject({error: e});
            }
            n.resolve({id: e.id, close: () => ie.tabs.remove(e.id, t)});
          });
        }), n.promise();
      })((e => {
        const t = St();
        return qn[t] = e, t;
      })({ts: Date.now(), com: n, preparat: t, type: e}), t.active).then(e => n.promise().done(t => {
        (t.ok || t.aborted) && e.close();
      }));
    }, Jn = {init: () => {
      Yn || (Yn = true);
    }, onMessage: e => {
      const t = q(), n = e.aid, r = qn[n];
      if (r) {
        if (r.aborter && (x(r.aborter), delete r.aborter), "ping" == e.method) qn[n].ts = Date.now(), t.resolve({pong: true}); else if ("preparat" == e.method) t.resolve({preparat: r.preparat, type: r.type}); else if ("install" == e.method) {
          const s = e.message;
          r.com.resolve({ok: true, message: s}), t.resolve({}), delete qn[n];
        } else if ("import" == e.method) {
          const s = e.message;
          r.com.resolve({ok: true, message: s}), t.resolve({}), delete qn[n];
        } else if ("permission" == e.method) {
          const s = e.message;
          r.com.resolve({ok: true, message: s}), t.resolve({}), delete qn[n];
        } else if ("unload" == e.method || "abort" == e.method) {
          t.resolve({});
          const s = () => {
            r.com.resolve({ok: false, aborted: true, message: void 0}), delete qn[n];
          };
          "abort" == e.method ? s() : r.aborter = y(s, 3e3);
        } else if ("connect" == e.method) {
          const s = e.message;
          r.com.resolve({ok: true, message: s}), t.resolve({}), delete qn[n];
        }
      } else t.reject({error: "unknown_id", please_close: true});
      return t.promise();
    }, install: e => Wn("install", e), import: e => Wn("import", e), askForPermission: (e, t, n) => {
      const r = {permissions: e.permissions, origins: e.origins, title: t, message: n};
      return Wn("permission", r);
    }, installError: e => Wn("install_error", e), askForConnect: e => Wn("connect", e)}, Kn = Jn;
    let $n, er, tr;
    const nr = () => $n || q.Pledge(), rr = e => {
      De(t => {
        e({added: t});
      }), Ve(t => {
        e({removed: t});
      });
    }, sr = () => {
      const e = q(), t = er = {}, n = tr = {};
      return $n = e.promise(), r = r => {
        r.permissions && Object.values(r.permissions).forEach(e => t[e] = true), r.origins && Object.values(r.origins).forEach(e => n[e] = true), $n = void 0, e.resolve();
      }, ie.permissions.getAll(r), e.promise();
      var r;
    }, or = {permDownloads: "downloads", has: e => nr().then(() => er && tr ? !!er[e] || !!tr[e] : (rr(() => {
      nr().then(() => sr());
    }), sr().then(() => or.has(e)))), hasOrigin: e => {
      const t = xt(e);
      return nr().then(() => {
        const e = q();
        return n = {origins: t}, r = t => {
          e.resolve(t);
        }, ie.permissions.contains(n, r), e.promise();
        var n, r;
      });
    }, ask: (e, t, n) => {
      const r = xt(e), s = q();
      return Kn.askForPermission({permissions: r}, t, n).done(({message: e}) => {
        const t = !!(null == e ? void 0 : e.granted);
        if (t) {
          er || (er = {});
          for (const e of r) er[e] = true;
        }
        s.resolve(t);
      }), s.promise();
    }, askOrigin: (e, t, n) => {
      const r = xt(e), s = q();
      return Kn.askForPermission({origins: r}, t, n).done(({message: e}) => {
        const t = !!(null == e ? void 0 : e.granted);
        if (t) {
          tr || (tr = {});
          for (const e of r) tr[e] = true;
        }
        s.resolve(t);
      }), s.promise();
    }, remove: e => nr().then(() => {
      const t = q();
      return $n = t.promise(), n = {permissions: [e]}, r = n => {
        $n = void 0, er && (er[e] = false), t.resolve(n);
      }, ie.permissions.remove(n, r), t.promise();
      var n, r;
    }), addListener: rr}, ar = or, ir = {}, lr = {}, cr = (e, t) => {
      let n;
      const r = t.key || "general", s = t.timeout || 3e5, o = y(() => {
        delete e[r];
      }, s);
      (n = e[r]) && x(n.to), e[r] = {ts: Date.now() + s, options: t, to: o};
    }, Ar = e => {
      const t = Date.now();
      return Object.keys(e).map(n => {
        const r = e[n], s = Object.assign(r.options, {});
        let o;
        if (o = Math.max(0, r.ts - t)) return s.timeout = o, s;
      }).filter(e => e);
    }, ur = {all: (e, t) => {
      ur.actionPage(e, t), ur.optionsPage(e, t);
    }, removeAll: e => {
      delete ir[e], delete lr[e];
    }, actionPage: (e, t) => {
      const n = pe.getViews({type: "popup"});
      n && n.length && pe.sendMessage({method: e, options: t}, () => {}), t && cr(ir, t);
    }, optionsPage: (e, t) => {
      const n = pe.getViews({type: "tab"});
      n && n.length && pe.sendMessage({method: e, options: t}, () => {}), t && cr(lr, t);
    }, actionStatus: () => Ar(lr), optionsStatus: () => Ar(ir)}, dr = ur, pr = new class {
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
    let hr, fr, mr, gr, vr = {};
    const _r = "runtime_host_permissions", br = () => q.sleep(1).then(() => ar.has("<all_urls>").then(e => e, () => true)).always(e => {
      e ? dr.removeAll(_r) : (dr.all("status", {key: _r, id: _r, class: "warning", text: zn.getMessage("Limited_runtime_host_permissions_might_break_some_Tampermonkey_features_"), timeout: 31536e6}), void 0 === hr && pr.on("onRequestRedirect", ({url: e}) => {
        kr(e, 1e3);
      })), hr = e, mr = void 0;
    });
    let wr;
    const kr = (e, t) => {
      if (wr || (wr = y(() => {
        wr = void 0, q.Pledge().then(() => {
          if (void 0 === hr) return fr || (ar.addListener(e => {
            l.info("pcx: detected permission change", e), hr = void 0, mr = br();
          }), fr = true), mr = mr || br(), mr;
        }).then(() => gr).then(() => {
          const e = Object.values(vr);
          if (vr = {}, hr) return e;
          {
            const t = {}, n = e.map(e => {
              const n = (e => (e => {
                const t = "string" == typeof e ? bn(e) : e;
                if (!t) throw new Error("invalid url");
                return kn(t, {nopath: true});
              })(e) + "/*")(e.url);
              return ar.hasOrigin(n).then(e => {
                e || (t[n] = true);
              });
            }), r = gr = q.sidebyside(n).then(() => {
              const n = Object.keys(t);
              return n.length ? (l.info("pcx: need to ask for some permissions", n), ar.askOrigin(n, zn.getMessage("Cross_Origin_Request_Permission"), zn.getMessage("Click_here_to_allow_TM_to_access_the_following_hosts_0host_list0", n.join("\n"))).then(() => (gr = void 0, e))) : e;
            }).always(() => {
              gr = void 0;
            });
            return r;
          }
        }).always(e => {
          e && e.forEach(e => e.deferred.resolve()), Object.keys(vr).length && kr();
        });
      }, t || 100)), !e) return q.Pledge();
      if (vr[e]) return vr[e].deferred.promise();
      const n = q(), r = {url: e, deferred: n};
      return vr[e] = r, n.promise();
    }, yr = (e, t, n, r) => {
      let s, o;
      const a = t || {};
      return kr(e.url).then(() => {
        if (o) {
          const e = Nt("aborted");
          return a.onabort && a.onabort(e), void (a.ondone && a.ondone(e));
        }
        (n = n || {}).internal = r, s = Qt(e, a, n);
      }), {abort: function () {
        if (s) return s.abort();
        o = true;
      }};
    }, Rr = {init: () => {}, internal: (e, t, n) => yr(e, t, n, true), external: (e, t, n) => yr(e, t, n, false)}, xr = Rr, Er = {protocol: "https:", www: "www", api: "api", domain: "userscript.zone"}, Sr = v({timeout: 600, check_interval: 300, retimeout_on_get: true}).init();
    let Gr, Cr, Mr, Ir, Zr;
    const Ur = () => ({utm_source: "ext", utm_medium: Ir.substr(0, 3), utm_campaign: he.short_id});
    let Tr;
    const Br = e => {
      const t = (e => `${Gr}/api?` + xn(Object.assign({l: Mr, q: e}, Ur())))(e), n = Sr.get(t);
      if (n) return n;
      const r = q(), s = r.promise(), o = e => {
        r.reject({error: e});
      };
      if (Tr && Tr > Date.now()) return o("rate limit or backoff"), s;
      if (!e.startsWith("http")) return o("unsupported url"), s;
      Tr = void 0;
      let a = 1;
      const i = Zr({url: t, headers: {Accept: "application/json, */*"}, fetch: true, responseType: "json"}, {onload: e => {
        if (200 == e.status) {
          const {count: t, url: n} = e.response, s = `${Gr}${n}`;
          a = 1, r.resolve({count: Number(t || 0), url: s});
        } else if (429 === e.status) {
          const t = qt(e.responseHeaders), n = Number(t["retry-after"] || 15);
          a = 1, n && (Tr = Date.now() + 1e3 * n, o("rate limit"));
        } else a = Math.min(2 * a, 300), Tr = Date.now() + 1e3 * a, o(e.responseText || "unknown error");
      }, onerror: e => {
        o(e.responseText || e.statusText);
      }, onabort: () => {
        o("aborted");
      }, ontimeout: () => {
        o("timed out");
      }}, {internal: true});
      return s.abort = () => null == i ? void 0 : i.abort(), Sr.set(t, s), s;
    }, Or = e => ((e, t) => {
      let n, r = "", s = "";
      return "click" == Ir ? (r = "?" + xn(Object.assign({l: Mr}, Ur())), s = "#" + xn(Object.assign({q: t})), n = `${e}/` + r + s) : (r = "?" + xn(Object.assign({l: Mr, q: t}, Ur())), n = `${e}/search?` + r + s), n;
    })(Cr, e), Fr = () => {
      const e = "?" + xn(Object.assign({l: Mr}, Ur()));
      return `${Gr}/privacy?` + e;
    }, jr = [{name: "ECMAScript 5", value: ["// ==UserScript==", "// @name         New Userscript", "// @namespace    http://tampermonkey.net/", "// @version      0.1", "// @description  try to take over the world!", "// @author       You", "// @match        <$URL$>", "// @icon         <$ICON$>", "// @grant        none", "// ==/UserScript==", "", "(function() {", "    'use strict';", "", "    // Your code here...", "})();"].join("\n")}, {name: "ECMAScript 6", value: ["// ==UserScript==", "// @name         New ES6-Userscript", "// @namespace    http://tampermonkey.net/", "// @version      0.1", "// @description  shows how to use babel compiler", "// @author       You", "// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js", "// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js", "// @match        <$URL$>", "// @icon         <$ICON$>", "// ==/UserScript==", "", "var inline_src = (<><![CDATA[", "", "    // Your code here...", "", "]]></>).toString();", 'var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });', "eval(c.code);"].join("\n")}, {name: "CoffeeScript", value: ["// ==UserScript==", "// @name         New Coffee-Userscript", "// @namespace    http://tampermonkey.net/", "// @version      0.1", "// @description  shows how to use coffeescript compiler", "// @author       You", "// @require      http://coffeescript.org/browser-compiler/coffeescript.js", "// @match        <$URL$>", "// @icon         <$ICON$>", "// ==/UserScript==", "", "var inline_src = (<><![CDATA[", "", "    // Your code here", "", "]]></>).toString();", "var compiled = this.CoffeeScript.compile(inline_src);", "eval(compiled);"].join("\n")}], Lr = {}, Pr = {enabled: true, configMode: 0, debug: false, logLevel: 0, showFixedSrc: false, webrequest_modHeaders: "yes", webrequest_fixCSP: "yes", webrequest_fixContentCSP: "no", notification_showUpdate: "changelog", notification_silentScriptUpdate: true, script_templates: jr, scriptUpdateCheckPeriod: 864e5, scriptUpdateHideNotificationAfter: 15e3, scriptUpdateCheckDisabled: false, scriptUrlDetection: "auto", script_file_access: "externals", trash_mode: "on", trash_cleanup_after: 6048e5, runtime_strict_mode: "byscript", runtime_top_level_await: "default", runtime_inject_mode: "default", runtime_content_mode: "content", autoReload: false, appearance_badges: "running", appearance_badge_color: ["gcal", "fcmf", "firb", "heif"].includes(he.short_id) ? "#444" : "#ee3131", appearance_badge_text_color: "#ffffff", context_menu_enabled: true, context_menu_scripts: true, context_menu_commands: true, editor_enabled: true, editor_fontSize: 100, editor_theme: "default", editor_keyMap: "windows", editor_indentUnit: 4, editor_tabSize: 4, editor_indentWithTabs: "spaces", editor_tabMode: "indent", editor_electricChars: true, editor_autoSave: false, editor_easySave: true, editor_autoLint: true, editor_autoLintMaxLen: 1e6, editor_lineWrapping: false, userscript_search_url: Er, userscript_search_mode: "off", editor_highlightTrailingWhitespace: true, editor_trimTrailingSpacesFromModifiedLines: true, editor_highlightSelectionMatches: "cursor", editor_linter_config: null, favicon_service: "google", i18n: null, action_menu_columns: 1, action_menu_scripts_hide_disabled: false, action_menu_scripts_sort: "auto", incognito_mode: "temporary", layout: "default", layout_user_css: "", sync_enabled: false, sync_type: 2, statistics_enabled: true, default_tab_types: "incognito+normal", downloads_mode: "default", downloads_extension_whitelist: ["/^[^\\.]*$/", "/\\.(mp[34a]|m4[ab]|m3u|wma|wav|aac|og[ag]|cda|flac)$/", "/\\.(avi|mkv|flv|divx|mpe?g|webm)$/", "/\\.(ico|gif|png|jpe?g|webp|svg)/", "/\\.(srt|sub|idx)$/", "/\\.(ttf|otf|woff)$/", "/\\.(txt|pdf|yml)$/", ".iso", ".zip", "/\\.r(ar|[0-9]{2,2})$/", ".rss"], external_update_interval: 0, external_connect: "all", require_timeout: 2e4, require_blacklist: ["/^https?:\\/\\/example.com(:[0-9]{1,5})?\\/.*/"], require_sri_mode: "supported", sandbox_mode: "default", script_include_mode: "default", script_blacklist_server: [], script_blacklist_type: "server", script_blacklist_severity: 4, connect_mode: "ask", page_filter_mode: "black", page_whitelist: ["/https?:\\/\\/greasyfork\\.org\\/.*/", "http://xkcd.com/970/"], forbiddenPages: ["*example.org/*", "*paypal.tld/*", "*stripe.com/*", "https://*deutsche-bank-24.tld/*", "https://*bankofamerica.tld/*", "/^.*:\\/\\/apis\\.google\\.com\\/((?!render)([^\\/]+)\\/)+([^\\/]+)?$/", "*://www.facebook.com/plugins/*", "*://platform.twitter.com/widgets/*"]}, Dr = {cloud_url: null, cloud_user: null, cloud_pass: null}, Vr = e => {
      let t, n = rt.getValue(ee.STORAGE.CONFIG, {});
      return n instanceof Object || (n = {}), void 0 !== (t = n[e]) ? t : "function" == typeof (t = Pr[e]) ? t() : t;
    }, Nr = (e, t) => {
      let n = rt.getValue(ee.STORAGE.CONFIG, {});
      n instanceof Object || (n = {});
      const r = Vr(e);
      n[e] = t;
      const s = rt.setValue(ee.STORAGE.CONFIG, n), o = Lr[e];
      return o && JSON.stringify(r) != JSON.stringify(t) && o.forEach(n => {
        try {
          n(e, r, t, s);
        } catch (e) {
          l.warn("config: changeListener error", e);
        }
      }), s;
    };
    let zr = {};
    (() => {
      const e = se.LOCALSTORAGE;
      let t;
      if (e && (t = e.getItem(ee.STORAGE.SESSION))) try {
        zr = JSON.parse(it(t));
      } catch (e) {}
    })();
    const qr = e => {
      let t;
      return void 0 !== (t = zr[e]) ? t : Dr[e];
    }, Qr = (e, t) => {
      const n = qr(e);
      void 0 === t ? delete zr[e] : zr[e] = t, se.LOCALSTORAGE && se.LOCALSTORAGE.setItem(ee.STORAGE.SESSION, at(JSON.stringify(zr)));
      const r = Lr[e];
      return r && JSON.stringify(n) != JSON.stringify(t) && r.forEach(r => {
        try {
          r(e, n, t);
        } catch (e) {
          l.warn("config: changeListener error", e);
        }
      }), q.Pledge();
    }, Hr = {initialized: false, values: {}, snapshot: {}, init: () => {
      const e = {};
      return Object.defineProperty(Hr, "snapshot", {get: function () {
        return {...Hr.values};
      }, enumerable: true}), Object.keys(Pr).forEach(t => {
        Object.defineProperty(e, t, {get: function () {
          return Vr(t);
        }, set: function (e) {
          Nr(t, e);
        }, enumerable: true});
      }), Object.keys(Dr).forEach(t => {
        Object.defineProperty(e, t, {get: function () {
          return qr(t);
        }, set: function (e) {
          Qr(t, e);
        }, enumerable: true});
      }), Hr.values = e, Hr.initialized = true, q.Pledge();
    }, defaultScripts: async () => [], getValue: e => Dr.hasOwnProperty(e) ? qr(e) : Vr(e), setValue: (e, t) => Dr.hasOwnProperty(e) ? Qr(e, t) : Nr(e, t), getDefaults: () => Pr, addChangeListener: (e, t) => {
      xt(e).forEach(e => {
        let n = Lr[e];
        n || (n = Lr[e] = []), n.push(t);
      });
    }}, Xr = Hr, Yr = "mtm_visitor", Wr = "default", Jr = "pageview", Kr = "script_update", $r = "script", es = "cloud", ts = "event", ns = "pageview", rs = "ping", ss = "https://a.tampermonkey.net/matomo.php", os = se.LOCALSTORAGE;
    let as, is, ls, cs = false, As = false;
    const us = () => ({url: ss, siteId: 4, tracker: {[Wr]: {enabled: ks(4, 1)}, [$r]: {enabled: true}, [Kr]: {enabled: ks(4, 10)}, [es]: {enabled: ks(4, 0.0005)}}}), ds = () => ({url: ss, siteId: 5, tracker: {[Wr]: {enabled: ks(5, 10)}, [$r]: {enabled: true}, [Kr]: {enabled: ks(5, 10)}, [es]: {enabled: ks(5, 0.001)}}}), ps = () => ({url: ss, siteId: 6, tracker: {[Wr]: {enabled: ks(6, 50)}, [$r]: {enabled: true}, [Kr]: {enabled: ks(6, 10)}, [es]: {enabled: ks(6, 0.01)}}}), hs = {default: ds, gcal: ds, iikm: us, fcmf: us, saap: () => ({url: ss, siteId: 7, tracker: {[Wr]: {enabled: true}, [$r]: {enabled: true}, [Kr]: {enabled: ks(7, 10)}, [es]: {enabled: ks(7, 0.01)}}}), fire: ps, firb: ps, dhdg: () => ({url: ss, siteId: 3, tracker: {[Wr]: {enabled: ks(3, 1)}, [$r]: {enabled: true}, [Kr]: {enabled: ks(3, 10)}, [es]: {enabled: ks(3, 0.0005)}}}), mfdh: ds, heif: () => ({url: "http://a.userscript.grobilan:8081/matomo.php", siteId: 2, tracker: {[Wr]: {enabled: true}}})};
    let fs;
    const ms = [{msg: "a disconnected port"}, {msg: "Function.prototype.apply: Arguments list has wrong type", url: "event_bindings"}, {msg: "Script error."}], gs = e => [...Array(e)].map(() => Math.floor(16 * Math.random()).toString(16)).join(""), vs = e => {
      if (!os) return;
      const t = [e.uuid, e.createTs, e.visitCount, e.currentVisitTs, e.lastVisitTs].join(".");
      os.setItem(Yr, t);
    }, _s = e => {
      const t = e || Wr, n = fs.tracker[t] || fs.tracker.default;
      return n.enabled ? {url: fs.url, siteId: fs.siteId, options: n} : null;
    }, bs = gs(6), ws = async (e, t, n) => {
      if (!e) return;
      const r = (() => {
        if (!os) return;
        const e = os.getItem(Yr);
        if (!e) return;
        const t = e.split(".");
        if (t.length >= 5) {
          t.unshift("0");
          const [e, n, r, s, o, a] = t;
          return {createdNow: false, newVisitor: e, uuid: n, createTs: r, visitCount: s, currentVisitTs: o, lastVisitTs: a};
        }
      })() || (() => {
        const e = Math.floor(Date.now() / 1e3).toString(), t = {createdNow: true, newVisitor: "1", uuid: gs(16), createTs: e, visitCount: "0", currentVisitTs: e, lastVisitTs: ""};
        return vs(t), t;
      })();
      let s;
      const o = new Date, a = {idsite: e.siteId, rec: 1, action_name: document.title || he.short_id, url: location.href, _id: r.uuid, rand: gs(4), apiv: 1, h: o.getHours(), m: o.getMinutes(), s: o.getSeconds(), cookie: 1, pv_id: bs}, i = {...a, _idts: Number(r.createTs), _idvc: Number(r.visitCount), _viewts: Number(r.lastVisitTs), res: `${screen.width}x${screen.height}`};
      if (t == ns) {
        const e = is ? {gt_ms: is} : {}, t = {...a, ...i, ...e, new_visit: 1};
        vs((e => {
          const t = Math.floor(Date.now() / 1e3).toString();
          return e.newVisitor = "0", e.visitCount = (Number(e.visitCount) + 1).toString(), e.lastVisitTs = e.currentVisitTs, e.currentVisitTs = t, e;
        })(r)), s = t;
      } else if (t == ts) {
        if (!n) return;
        s = {...a, ca: 1, e_c: n.category, e_a: n.action, e_n: n.name, e_v: n.value};
      } else {
        if (t != rs) return;
        s = {...a, ...i, ping: 1};
      }
      s = Object.assign(a, s);
      const l = `${e.url}?${xn(s)}`, c = document.createElement("img");
      c.src = l, c.onload = () => {
        var e;
        null === (e = c.parentNode) || void 0 === e || e.removeChild(c);
      }, c.onerror = () => {
        var e;
        null === (e = c.parentNode) || void 0 === e || e.removeChild(c);
      }, (document.body || document.head || document.documentElement).appendChild(c);
    }, ks = (e, t) => {
      let n = 100 * Math.random() < t;
      if (os) try {
        let r, s;
        const o = ["wsr", e, t].join("_"), a = Date.now(), i = 864e7;
        if (r = os.getItem(o)) {
          try {
            s = JSON.parse(r);
          } catch (e) {}
          (!s || s.ts + i < a) && (s = {ts: a, w: n});
        } else s = {ts: a, w: n};
        n = s.w, os.setItem(o, JSON.stringify(s));
      } catch (e) {}
      return n;
    }, ys = e => {
      cs && (As = e, As ? as && Rs && (Rs(), Rs = void 0) : ls && (clearInterval(ls), ls = void 0));
    };
    let Rs = () => {
      ws(_s(Jr), ns), ls = window.setInterval(() => ws(_s(Jr), rs), 864e5);
    };
    const xs = (e, t, n) => {
      if (!As) return;
      void 0 === n && (t += " " + window.location.href, n = "");
      let r = false;
      for (const n of ms) {
        if (!n.msg && !n.url) return;
        n.msg && -1 == e.indexOf(n.msg) || n.url && -1 == t.indexOf(n.url) || (r = true);
      }
      r || ws(_s("error"), ts, {category: "Error", action: e, name: t + ":" + n});
    }, Es = {init: (e, t, n) => {
      const r = `${(null == n ? void 0 : n.version) || ""} `, s = he.short_id;
      fs = (hs[s] || hs.default)(), window.onerror = (t, n, s, o, a) => {
        let i = "";
        if (a) try {
          i = a.stack || "";
        } catch (e) {}
        xs(t.toString(), r + e + "@" + pe.urls.prepareForReport(n || ""), [s + ":" + o, i].join(";"));
      }, document.addEventListener("securitypolicyviolation", t => {
        let n = "";
        try {
          n = t.stack;
        } catch (e) {}
        xs("CSP violation of " + t.effectiveDirective, r + e + "@" + pe.urls.prepareForReport(t.documentURI), [t.sourceFile, " -> ", t.lineNumber + ":" + t.columnNumber, n].join(";"));
      }), (null == n ? void 0 : n.started) && (is = Date.now() - n.started.getTime()), cs = true, as = !!(null == n ? void 0 : n.trackView), ys(t);
    }, setEnabled: ys, isActive: function (e) {
      return As && !!_s(e);
    }, tC: (e, t, n) => {
      if (!As) return;
      let r = "", s = "";
      "init" === t ? (s = "Initialized", r = e) : "error" === t && (s = "Error", r = e + " -> " + n), ws(_s(es), ts, {category: "Cloud", action: s, name: r});
    }, tS: (e, t, n) => {
      if (!As) return;
      const r = `${e}${n ? ` <${n}> ` : ""}`;
      let s = "", o = null;
      if ("i" === t) s = "Installed"; else if ("u" === t) s = "Updated", o = _s(Kr); else if ("m" === t) s = "Revealed"; else {
        if ("r" !== t) return;
        s = "Removed";
      }
      ws(o || _s($r), ts, {category: "Script", action: s, name: r});
    }, tE: xs, tG: (e, t, n) => {
      if (!As) return;
      let r = "", s = "";
      "clicked" === e ? (s = "Click", r = t + ":" + n) : "button" === e ? (s = "Button", r = t || "?") : "dialog" === e && (s = "Dialog"), ws(_s("begging"), ts, {category: "Begging", action: s, name: r});
    }}, Ss = Es;
    let Gs;
    const Cs = ["DOM", "JavaScript", "raw"], Ms = {}, Is = e => {
      const t = null == e ? void 0 : e.keys, n = {keys: t, default: () => [], set: (e, t) => (e.push(t), e)};
      return (null == t ? void 0 : t.length) && t.forEach(e => Ms[e] = n), n;
    }, Zs = e => {
      const t = null == e ? void 0 : e.keys, n = {keys: t, default: () => null, set: (t, n, r) => {
        const s = (null == e ? void 0 : e.convert) ? e.convert(n, r) : n;
        return null === t ? s : t;
      }};
      return (null == t ? void 0 : t.length) && t.forEach(e => Ms[e] = n), n;
    }, Us = e => {
      const t = null == e ? void 0 : e.keys, n = {default: () => null, set: () => true};
      return (null == t ? void 0 : t.length) && t.forEach(e => Ms[e] = n), n;
    }, Ts = e => {
      const t = null == e ? void 0 : e.keys, n = {keys: t, default: () => ({}), set: (t, n, r, s) => {
        s = s ? Ln(s) : "default";
        const o = (null == e ? void 0 : e.convert) ? e.convert(n, r) : n;
        return t[s] = t[s] || o, t;
      }};
      return (null == t ? void 0 : t.length) && t.forEach(e => Ms[e] = n), n;
    }, Bs = {name: Ts({convert: e => null == e ? void 0 : e.replace(/\s\s+/g, " ")}), version: Zs({convert: e => (null == e ? void 0 : e.replace(/\s/g, "")) || e}), grants: Is({keys: ["grant"]}), icon: Zs({keys: ["icon", "iconURL", "iconUrl", "defaulticon"]}), icon64: Zs({keys: ["icon64", "iconURL64"]}), supportURL: Zs({keys: ["supportURL", "supportUrl"]}), fileURL: Zs(), downloadURL: Zs({keys: ["downloadURL", "downloadUrl"]}), updateURL: Zs({keys: ["updateURL", "updateUrl"]}), namespace: Zs({convert: e => "" === e ? null : e}), author: Zs(), copyright: Zs(), homepage: Zs({keys: ["homepage", "homepageURL", "homepageUrl", "website", "source"]}), description: Ts(), includes: Is({keys: ["include"]}), excludes: Is({keys: ["exclude"]}), matches: Is({keys: ["match"]}), requires: Is({keys: ["require"]}), resources: (e => {
      const t = null == e ? void 0 : e.keys, n = {keys: t, default: () => ({}), set: (t, n, r) => {
        const s = n.match(/^(\S*)\s+(.*)/);
        if (s && void 0 === t[s[1]]) {
          const n = (null == e ? void 0 : e.convert) ? e.convert(s[2], r) : s[2];
          t[s[1]] = n;
        }
        return t;
      }};
      return (null == t ? void 0 : t.length) && t.forEach(e => Ms[e] = n), n;
    })({keys: ["resource"]}), sandbox: Zs({keys: ["sandbox", "inject-into"], convert: (e, t) => null !== e && "inject-into" === t ? {auto: "DOM", content: "DOM", page: null}[e] || null : e}), noframes: Us(), unwrap: Us(), connects: Is({keys: ["connect", "connect-src", "domain"]}), webRequest: Is(), "run-at": Zs(), antifeatures: (e => {
      const t = null == e ? void 0 : e.keys, n = {keys: t, default: () => ({}), set: (t, n, r, s) => {
        var o;
        s = s ? Ln(s) : "default";
        const a = n.match(/^(\S*)\s+(.*)/);
        if (a) {
          const n = t[o = a[1]] || (t[o] = {}), i = (null == e ? void 0 : e.convert) ? e.convert(a[2], r) : a[2];
          n[s] = i;
        }
        return t;
      }};
      return (null == t ? void 0 : t.length) && t.forEach(e => Ms[e] = n), n;
    })({keys: ["antifeature"]})}, Os = {};
    Object.entries(Bs).forEach(([e, t]) => {
      t.keys ? t.keys.forEach(t => {
        Os[t] = e;
      }) : Os[e] = e;
    });
    const Fs = "==UserScript==", js = "==/UserScript==", Ls = /(?:^|\n)\s*\/\/\x20*==UserScript==([\s\S]*?\n)\s*\/\/\x20*==\/UserScript==|$/, Ps = () => {
      const e = {...Object.fromEntries(Object.keys(Bs).map(e => [e, Bs[e].default()]))};
      return {...e};
    }, Ds = e => {
      const t = e.match(Ls), n = (t ? t[1] : "") || "", r = {};
      return n.replace(/(?:^|\n)\s*\/\/\s*(@\S+)(.*)/g, (e, t, n) => {
        const [s, o] = t.slice(1).split(":"), a = Os[s];
        let i;
        if (a && (i = Ms[a] || Bs[a] || void 0)) {
          const e = n.trim();
          let t = r[a];
          void 0 === t && (t = i.default()), r[a] = i.set(t, e, s, o);
        }
        return "";
      }), {...Ps(), ...r};
    }, Vs = e => {
      const {name: t, description: n, version: r, grants: s, fileURL: o, requires: a, resources: i, webRequest: l, namespace: c, sandbox: A, noframes: u, unwrap: d, author: p, copyright: h, antifeatures: f} = e;
      let {icon: m, icon64: g, updateURL: v, downloadURL: _, supportURL: b, homepage: w, includes: k, matches: y, excludes: R, connects: x} = e;
      const E = e["run-at"] || null, S = (e, {[e]: t, ...n}) => n, G = s.includes("none") ? ["none"] : s.filter(e => e), C = A && Cs.includes(A) ? A : null;
      m = m || null, g = g || null, v = v || null, _ = _ || null, b = b || null, w = w || null;
      const M = t.default, I = n.default || "", Z = S("default", t), U = S("default", n);
      k = k.filter(e => e), y = y.filter(e => e), R = R.filter(e => e), x = x.filter(e => e);
      const T = Object.entries(i).map(([e, t]) => ({name: e, url: t, loaded: false})).filter(e => e.url), B = a.filter(e => e).map(e => ({url: e, loaded: false, textContent: ""})), O = l.length ? l.map(e => {
        const t = JSON.parse(e);
        return Array.isArray(t) ? t : [t];
      }).reduce((e, t) => e.concat(t), []) : null;
      return {name: M, description: I, version: r || "0.0", grant: G, icon: m, icon64: g, supportURL: b, fileURL: o, downloadURL: _, updateURL: v, namespace: c, requires: B, includes: k, matches: y, excludes: R, homepage: w, resources: T, connects: x, webRequest: O, author: p, copyright: h, antifeatures: f, name_i18n: Z, description_i18n: U, uuid: null, system: false, enabled: true, position: 0, blockers: [], lastModified: 0, sync: {}, options: {check_for_updates: true, comment: null, compatopts_for_requires: true, compat_wrappedjsobject: false, compat_metadata: false, compat_foreach: false, compat_powerful_this: null, sandbox: C, noframes: u, unwrap: d, run_at: E, tab_types: null, override: {use_includes: [], orig_includes: [], merge_includes: true, use_matches: [], orig_matches: [], merge_matches: true, use_excludes: [], orig_excludes: [], merge_excludes: true, use_connects: [], orig_connects: [], merge_connects: true, use_blockers: [], orig_run_at: null, orig_noframes: null}}, textContent: null, header: null};
    }, Ns = (() => {
      const e = e => {
        const t = e.split(".");
        return t.slice(0, 3).concat([t.slice(3).join(".")]).concat([0, 0, 0, 0]).slice(0, 4).map(e => {
          const t = e.toString().match(/((?:-?[0-9]+)?)([^0-9-]*)((?:-?[0-9]+)?)(.*)/);
          return t ? [Number(t[1]), t[2], Number(t[3]), t[4]] : [];
        }).reduce((e, t) => e.concat(t));
      }, t = (n, r) => {
        const s = Array.isArray(n) ? n : e(n), o = Array.isArray(r) ? r : e(r);
        for (let e = 0; e < 16; e++) {
          const n = s[e], r = o[e];
          if (e % 2 == 1) {
            if (!n && r) return t.eNEWER;
            if (n && !r) return t.eOLDER;
            const e = n.match(/\w/g) || [], s = r.match(/\w/g) || [];
            for (let n = 0; n < Math.min(e.length, s.length); n++) {
              if (e[n].charCodeAt(0) > s[n].charCodeAt(0)) return t.eNEWER;
              if (e[n].charCodeAt(0) < s[n].charCodeAt(0)) return t.eOLDER;
            }
            if (e.length > s.length) return t.eNEWER;
            if (e.length < s.length) return t.eOLDER;
          } else {
            if (Number(n) > Number(r)) return t.eNEWER;
            if (Number(n) < Number(r)) return t.eOLDER;
          }
        }
        return t.eEQUAL;
      };
      return t.eERROR = -2, t.eOLDER = -1, t.eEQUAL = 0, t.eNEWER = 1, t;
    })(), zs = e => {
      const t = (e => {
        const t = gt(e, Fs, js);
        if (!t) return null;
        const n = e.indexOf(Fs), r = e.indexOf("<html>"), s = e.indexOf("<body>");
        return r > 0 && r < n || s > 0 && s < n ? null : ["// ", Fs, t, js].join("");
      })(e);
      if (!t) return null;
      const n = qs(t);
      return n ? (n.textContent = e, n.header = t, n.options.compat_metadata = e != Gs.unMetaDataify(e), n) : null;
    }, qs = e => {
      const t = (e => Ds(e))(e = (e = (e = (e = (e || "").replace(/(\r\n|\n|\r)/gm, "\n")).replace(/\t/g, "    ")).replace(/\n\n+/g, "\n")).replace(/[^|\n][ \t]+\/\//g, "//"));
      if (t) return Vs(t);
    }, Qs = () => Vs(Ps()), Hs = "try to take over the world!", Xs = "This script was deleted from Greasy Fork, and due to its negative effects, it has been automatically removed from your browser.", Ys = {uso: {test: e => {
      const t = e.match(new RegExp("https?://userscripts\\.org/scripts/(source|version)/([0-9]{1,9})\\.user\\.js")) || e.match(new RegExp("https?://userscripts-mirror\\.org/scripts/(source|version)/([0-9]{1,9})\\.user\\.js"));
      if (t && 3 == t.length) return {id: t[2], token: "uso", meta_url: true, url: "http://userscripts-mirror.org/scripts/show/" + t[2], code_url: "http://userscripts-mirror.org/scripts/review/" + t[2], issue_url: "http://contactbyweb.com/userscripts-mirror"};
    }, updates: () => false}, gf: {test: e => {
      const t = e.match(new RegExp("https?://greasyfork\\.org/(?:[^/]+/)?scripts/([^/-]+).*/code.*\\.user\\.js"));
      if (t && 2 == t.length) {
        const e = t[1];
        return {id: e, token: "gf", meta_url: true, url: "https://greasyfork.org/scripts/" + e, issue_url: "https://greasyfork.org/scripts/" + e + "/feedback", code_url: "https://greasyfork.org/scripts/" + e + "/code"};
      }
    }, convert: async e => {
      let t, n = e;
      if (n) {
        const e = n.description.trim();
        e === Hs ? n.description = "" : e === Xs && (n = null, t = "deleted by hoster");
      }
      return {script: n, warning: t};
    }, updates: e => !e.match(new RegExp("https?://greasyfork\\.org/scripts/([^/]+)/code/.*\\.user\\.js.*version=[0-9]+.*"))}, sf: {test: e => {
      const t = e.match(new RegExp("https?://sleazyfork\\.org/(?:[^/]+/)?scripts/([^/-]+).*/code.*\\.user\\.js"));
      if (t && 2 == t.length) {
        const e = t[1];
        return {id: e, token: "sf", meta_url: true, url: "https://sleazyfork.org/scripts/" + e, issue_url: "https://sleazyfork.org/scripts/" + e + "/feedback", code_url: "https://sleazyfork.org/scripts/" + e + "/code"};
      }
    }, convert: async e => {
      let t, n = e;
      if (n) {
        const e = n.description.trim();
        e === Hs ? n.description = "" : e === Xs && (n = null, t = "deleted by hoster");
      }
      return {script: n, warning: t};
    }, updates: e => !e.match(new RegExp("https?://sleazyfork\\.org/scripts/([^/]+)/code/.*\\.user\\.js.*version=[0-9]+.*"))}, ouj: {test: e => {
      const t = e.match(new RegExp("https?://openuserjs\\.org/install/([^/]+)+/(.+?)(?:\\.min)?\\.user\\.js"));
      if (t && 3 == t.length) return t.shift(), {id: t.join("/"), token: "ouj", meta_header: true, url: "https://openuserjs.org/scripts/" + t[0] + "/" + t[1], issue_url: "https://openuserjs.org/scripts/" + t[0] + "/" + t[1] + "/issues", code_url: "https://openuserjs.org/scripts/" + t[0] + "/" + t[1] + "/source"};
    }, convert: async e => {
      const t = e;
      return t && t.description.trim() === Hs && (t.description = ""), {script: t, warning: void 0};
    }, updates: () => true}, gh: {test: e => {
      let t;
      const n = e.match(new RegExp("https?://raw\\.githubusercontent\\.com/([^/]+)/([^/]+)/[^/]+/(.*)\\.user\\.js")) || e.match(new RegExp("https?://github\\.com/([^/]+)/([^/]+)/raw/[^/]+/(.*)\\.user\\.js")) || e.match(new RegExp("https?://raw.github\\.com/([^/]+)/([^/]+)/[^/]+/(.*)\\.user\\.js")) || e.match(new RegExp("https?://github\\.com/([^/]+)/([^/]+)/releases/download/[^/]+/(.*)\\.user\\.js")), r = e.match(new RegExp("https?://(([^\\.]+).github\\.io)/(.*)\\.user\\.js"));
      if (n && 4 == n.length || r && 4 == r.length) {
        let e;
        if (n) {
          n.shift();
          const [r, s, o] = n;
          e = [r, s].join("/"), t = [r, s].concat(s == o ? [] : o).join("/");
        } else {
          if (!r) throw new Error("Should never happen!");
          {
            r.shift();
            const [n, s, o] = r;
            e = [s, n].join("/"), t = [s, n].concat(n == o ? [] : o).join("/");
          }
        }
        return {id: t, token: "gh", url: "https://github.com/" + e, issue_url: "https://github.com/" + e + "/issues"};
      }
    }, updates: () => true}, gst: (() => {
      const e = e => {
        const t = e.match(new RegExp("https?://gist\\.github\\.com/([^/]+)/([^/]+)/raw/(.*/)?.*\\.user\\.js")) || e.match(new RegExp("https?://gist\\.githubusercontent\\.com/([^/]+)/([^/]+)/raw/(.*/)?.*\\.user\\.js"));
        if (t && (3 == t.length || 4 == t.length)) {
          const e = t[1], n = t[2];
          return {user: e, gistId: n, id: `${e}/${n}`, updates: 4 == t.length};
        }
        return {};
      };
      return {test: t => {
        const {gistId: n, id: r, updates: s} = e(t);
        if (n && r && void 0 !== s) return {id: r, token: "gst", url: `https://gist.github.com/${r}`, issue_url: `https://gist.github.com/${r}#new_comment_field`, code_url: `https://gist.github.com/${r}`};
      }, updates: t => {
        const {updates: n} = e(t);
        return !!n;
      }};
    })(), gl: {test: e => {
      const t = e.match(new RegExp("https?://gitlab\\.com/([^/]+)/([^/]+)/(?:-/)?(?:raw|blob)/[^/]+/(.*)\\.user\\.js"));
      if (t && 4 == t.length) {
        t.shift();
        const [e, n, r] = t, s = [e, n].concat(n == r ? [] : r).join("/"), o = [e, n].join("/");
        return {id: s, token: "gl", url: "https://gitlab.com/" + o, issue_url: "https://gitlab.com/" + o + "/issues"};
      }
    }, updates: () => true}, bb: {test: e => {
      const t = e.match(new RegExp("https?://bitbucket\\.org/([^/]+)/([^/]+)/raw/[^/]+/(.*)\\.user\\.js")) || e.match(new RegExp("https?://bitbucket\\.org/([^/]+)/([^/]+)/downloads/(.*)\\.user\\.js"));
      if (t && 4 == t.length) {
        t.shift();
        const [e, n, r] = t, s = [e, n].concat(n == r ? [] : r).join("/"), o = [e, n].join("/");
        return {id: s, token: "bb", url: "https://bitbucket.org/" + o, issue_url: "https://bitbucket.org/" + o + "/issues"};
      }
    }, updates: () => true}, usty: {test: e => {
      const t = e.match(new RegExp("https?://userstyles\\.org/styles/userjs/([^/]+)/.*\\.user\\.js"));
      if (t && 2 == t.length) return t.shift(), {id: t[0], token: "usty", url: "https://userstyles.org/styles/" + t[0], issue_url: "https://forum.userstyles.org/post/discussion?Discussion/StyleID=" + t[0]};
    }, convert: async e => {
      let t, n, r, s;
      const o = [{tag: "includes", re: /(?: \|\| \(new RegExp\("\^)([^$]+)(?:\$"\)\)\.test\(document\.location\.href\))/g, idx: 1, value: e => "/^" + e.replace(/\\\\(.)/g, "\\$1") + "$/"}, {tag: "includes", re: /(?: \|\| \(document\.location\.href\.indexOf\(")([^"]+)"(?:\) == 0\))/g, idx: 1, value: e => e + "*"}, {tag: "matches", re: /(?: \|\| \(document\.domain == ")([^"]+)"(?: \|\| document\.domain\.substring\(document\.domain\.indexOf\("[^"]+"\) \+ 1\) == "[^"]+"\))/g, idx: 1, value: e => "*." + e}], a = new RegExp("(?:if \\(false)(" + o.map(e => "(?:" + e.re.source + ")").join("|") + ")+", "g");
      return e.textContent && 0 === e.includes.length && 0 === e.matches.length && 0 === e.excludes.length && e.options && e.options.override && e.options.override.orig_includes && 0 === e.options.override.orig_includes.length && e.options.override.orig_matches && 0 === e.options.override.orig_matches.length && (n = e.textContent.match(a)) && (n.forEach(t => {
        o.forEach(n => {
          for (; r = n.re.exec(t);) if (r.length > n.idx) {
            const t = n.value(r[n.idx]);
            e.options.override["orig_" + n.tag].push(t), e[n.tag].push(t), s = true;
          }
        });
      }), s && (t = "includes added")), 0 === e.grant.length && (e.grant.push("GM_addStyle"), t = "includes added"), {script: e, info: t};
    }, updates: () => true}, web: {test: e => {
      const t = e.match(new RegExp("https://static\\.iitc\\.me/build/release/(plugins/)?(.*)\\.user\\.js"));
      if (t && 3 === t.length) {
        t.shift();
        const [e, n] = t, r = "iitc-project/ingress-intel-total-conversion";
        return {id: [r].concat(e ? [e, n] : []).join("/").replace(/\/\//g, "/"), token: "gh", url: "https://github.com/" + r, issue_url: "https://github.com/" + r + "/issues"};
      }
      const n = e.match(new RegExp("https://iitc\\.app/build/release/(plugins/)?(.*)\\.user\\.js"));
      if (n && 3 === n.length) {
        n.shift();
        const [e, t] = n, r = "IITC-CE/ingress-intel-total-conversion";
        return {id: [r].concat(e ? [e, t] : []).join("/").replace(/\/\//g, "/"), token: "gh", url: "https://github.com/" + r, issue_url: "https://github.com/" + r + "/issues"};
      }
      return e.match(new RegExp("https?://socialfixer\\.com/socialfixer\\.user\\.js")) ? {id: "socialfixer", token: "web", url: "http://socialfixer.com", issue_url: "https://www.facebook.com/groups/SocialFixerUsersSupport/"} : e.match(new RegExp("https?://www\\.fbpurity\\.com/.*\\.user\\.js")) ? {id: "fbpurity", token: "web", url: "https://www.fbpurity.com/", issue_url: "https://www.facebook.com/fluffbustingpurity"} : void 0;
    }, updates: () => true}}, Ws = e => {
      if (e) for (const t of Object.values(Ys)) {
        const n = t.test(e);
        if (n) return n;
      }
    }, Js = [], Ks = (e, t, n) => {
      const r = {title: e.join("\n\n")}, s = t ? "_" + t : "", o = pe.getURL("images/icon" + s + ".png");
      l.warn(e.join("\n")), Se({path: o}), Ge(r), n || pe.onMessage.addListener((t, n, r) => {
        const s = {name: "1", id: "1", sub_menu_item: true, pos: "left", items: []};
        s.items.push({name: e[0], image: "info"}), e.length > 1 && s.items.push({name: e[1]}), r({items: [s], options: {enabled: false}});
      });
    }, $s = () => {
      const e = q();
      if ("chromeStorage" != ne.USE || ne.NO_WARNING) e.resolve(true); else {
        const t = () => {
          if (!rt) return y(t, 2e3);
          rt.isWorking ? rt.isWorking().done(() => e.resolve(true)).fail(() => {
            V("Tampermonkey detected that the extension storage is unreliable!\n\nUnfortunately this means that all your settings and userscripts are inaccessible at the moment.\n\nDo you want to visit the FAQ entry that explains how to recover from that?") && _e({url: "https://www.tampermonkey.net/faq#Q206"}, () => {});
            const t = ["Tampermonkey detected that the extension storage is unreliable!"];
            Ks(t, "paused", true), e.reject("Tampermonkey detected that the extension storage is unreliable!");
          }) : e.resolve(true);
        };
        y(t, 1e3);
      }
      return e.promise();
    }, eo = Ks, to = (e, t, n) => {
      Js.push({text: e, description: t, url: n});
    }, no = () => Js, ro = [{name: zn.getMessage("Default"), layout: "default", value: "default"}, {name: zn.getMessage("Default_Light"), layout: "default", theme: "light", value: "default#light"}, {name: zn.getMessage("Default_Dark"), layout: "default", theme: "dark", value: "default#dark"}, {name: zn.getMessage("Default_Darker"), layout: "default", theme: "darker", footer: 'Theme by <a href="https://github.com/narcolepticinsomniac" target="blank">narcolepticinsomniac</a> from the <a href="https://github.com/openstyles/stylus" target="blank">Stylus</a> project.', value: "default#darker"}], so = {default: zn.getMessage("Default"), monokai: "Monokai", solarized: "Solarized", "mdn-like": "MDN-like", eclipse: "Eclipse", railscasts: "RailsCasts", zenburn: "ZenBurn"}, oo = e => ({unknown: "data:image/png;base64,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", uso: "data:image/png;base64,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", gf: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3ggEBCQHM3fXsAAAAVdJREFUOMudkz2qwkAUhc/goBaGJBgUtBCZyj0ILkpwAW7Bws4yO3AHLiCtEFD8KVREkoiFxZzX5A2KGfN4F04zMN+ce+5c4LMUgDmANYBnrnV+plBSi+FwyHq9TgA2LQpvCiEiABwMBtzv95RSfoNEHy8DYBzHrNVqVEr9BWKcqNFoxF6vx3a7zc1mYyC73a4MogBg7vs+z+czO50OW60Wt9stK5UKp9Mpj8cjq9WqDTBHnjAdxzGQZrPJw+HA31oulzbAWgLoA0CWZVBKIY5jzGYzdLtdE9DlcrFNrY98zobqOA6TJKHW2jg4nU5sNBpFDp6mhVe5rsvVasUwDHm9Xqm15u12o+/7Hy0gD8KatOd5vN/v1FozTVN6nkchxFuI6hsAAIMg4OPxMJCXdtTbR7JJCMEgCJhlGUlyPB4XfumozInrupxMJpRSRtZlKoNYl+m/6/wDuWAjtPfsQuwAAAAASUVORK5CYII=", gh: "data:image/png;base64,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F/8VFRf/FRUX/xMTFKsAAAAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGRMTFKsVFRf/FRUX/xUVF/8VFRf/FRUX/xUVF/8TExT1AAAADQ4OFFkVFRf/FRUX/xUVF/8VFRf/FRUX/xUVF/8TExOPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABMTE48VFRf/FRUX/xUVF/8VFRf/FRUX/xUVF/8ODhRZExMTnRUVF/8VFRf/FRUX/xUVF/8VFRf/EREU0QAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBERFNEVFRf/FRUX/xUVF/8VFRf/FRUX/xMTE50RERTQFRUX/xUVF/8VFRf/FRUX/xUVF/8SEhJeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEhISXhUVF/8VFRf/FRUX/xUVF/8VFRf/EREU0BISFPIVFRf/FRUX/xUVF/8VFRf/FRUX/wAAABYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWFRUX/xUVF/8VFRf/FRUX/xUVF/8SEhTyFRUX/xUVF/8VFRf/FRUX/xUVF/8SEhTyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASEhTyFRUX/xUVF/8VFRf/FRUX/xUVF/8VFRf/FRUX/xUVF/8VFRf/FRUX/xMTFNsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABMTFNwVFRf/FRUX/xUVF/8VFRf/FRUX/xMTFPYVFRf/FRUX/xUVF/8VFRf/FBQU4QAA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AAAAAAAADAwMFA8PD2MRERSkFBQU0hMTFPMVFRf/FRUX/xMTFPMUFBTSEREUpA8PD2MMDAwUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=", gl: "data:image/png;base64,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", bb: "data:image/png;base64,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", ouj: "data:image/x-icon;base64,AAABAAEAQEAAAAEACAAoFgAAFgAAACgAAABAAAAAgAAAAAEACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwTwoAclEOAHVWAABzUhAAdlcAAHdYAAB0UxIAdVQTAHhZAgB2VRUAe1sJAH1dDgB3XB0AeF0eAHpfIQB7YCIAfGEjAH1iJAB+YyYAf2QnAIFmKQCEah8AgmcrAIVpLgCHbSQAhmovAIhuJQCJbyYAh3EzAIhyNACJczYAi3U4AIx2OQCNdzoAjng7AI95PACQej0Aknw/AJN9QQCXgUUAlYROAJaFTwCXhlAAnItWAKCPWgChkFsAo5FcAJ2RYQCekmIAn5NjAKKWZgCkmGgAp5pyAKqdbQCrnXUArJ52AK+hegCpoX4AraWCALOqhwC0q4gAtayJALatigC3r4sAuLCMALmxjQC3tJQAuLWVALm2lgC7uJgAvbqaAL67mwC/vJwAwb6eAMbBqQDHwqoAwsOuAMXGsgDHyLQAyMm1AM7PugDP0LsA0NG8ANLTvwDT1MAAztXEANDWxQDR18YA0tnHANTbyQDV3MoA19zTANfezQDZ4M8A2t/VANvg1gDc4dcA3eLYAN7j2QDf5NoA4OXbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRjYl9dXFlZWVlcXV9iY2RkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkY2FcVU9JQDo2NDQ2OkBJTlVcYWNkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRiXVZMPTIpIRoUDg0NDhQaISgyPUxWXWJkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGNfVEk0JxgLCAIDAQAAAAABAwIFCxgnNElTX2NkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGJZSzQkEQUDAQAAAAAAAAAAAAAAAAEDBREjNEpZYmRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkY2BSPykUBQEAAAAAAAAAAAAAAAAAAAAAAAABBBMoP1JfY2RkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkY11NNB0MAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAADDB00TV1jZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkY11MMBYEAQAAAAAAAAEDBwIJBAQJAgcDAQAAAAAAAAEEFC5MW2NkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkY11MLBMHAAAAAAABAwcIERccHyIiHxwXEQgHAwEAAAAAAAcTLExdY2RkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGBNMBMHAAAAAAABCQ4YJi84PURGRkQ+OC8mGA4JAQAAAAAABxMuTV9kZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGJSNBYHAAAAAAEDChgqOEVNUlhcW1tcWFJNRTkqGAoGAQAAAAAHFjRRYmRkZGRkZGRkZGRkZGRkZGRkZGRkZGNZPx0EAAAAAAECDyM0SFBcYGJiY2RkY2JiYFxRSTQjDwIBAAAAAAQdP1ljZGRkZGRkZGRkZGRkZGRkZGRkZGRfSykMAQAAAAEEFCk7TlphY2RkZGRkZGRkZGRjYVpPPCkUBAEAAAABDChKX2RkZGRkZGRkZGRkZGRkZGRkZGRiVDQUAwAAAAECFCtDUl5iZGRkZGRkZGRkZGRkZGRiXlNDKxQCAQAAAAMTNFNiZGRkZGRkZGRkZGRkZGRkZGRkXUkkBQAAAAADDypDVGBjZGRkZGRkZGRkZGRkZGRkZGNgVUMqEAYAAAAABSRJXWRkZGRkZGRkZGRkZGRkZGRkY1Y1EgMAAAABCiM8UmBjZGRkZGRkZGRkZGRkZGRkZGRkY2BTPCMKAQAAAAERNFZjZGRkZGRkZGRkZGRkZGRkZGFMJwgAAAABCRg0Tl5jZGRkZGRkZGRkZGRkZGRkZGRkZGRjXk80GAkBAAAABSdMYWRkZGRkZGRkZGRkZGRkZGRcPRgHAAAAAw4qSFpiZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGJaSCoOAwAAAAMYPVxkZGRkZGRkZGRkZGRkZGRjVTMOAQAAAAcYOFBhZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkYVE5GAcAAAABCzJVY2RkZGRkZGRkZGRkZGRkYk8pCAAAAAEIJkVaYmRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGNcRSYIAQAAAAgpTmJkZGRkZGRkZGRkZGRkZGBJIgQAAAADES1NX2RkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkYE0vEQMAAAACIUlfZGRkZGRkZGRkZGRkZGRdQRsHAAAABhc4UmJkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGJSOBcHAAAABxpAXWRkZGRkZGRkZGRkZGRkXDoUAwAAAAccPVdiZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRiWD4cAgAAAAEUOlxkZGRkZGRkZGRkZGRkZFo2DwEAAAACH0RcY2RkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkY1xEIAkAAAABDjZZZGRkZGRkZGRkZGRkZGRZNA0BAAAACSJGW2NkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRbRiIJAAAAAA00WWRkZGRkZGRkZGRkZGRkWTQNAQAAAAkiRltjZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkW0YiCQAAAAANNFlkZGRkZGRkZGRkZGRkZFo3DwEAAAACH0RcY2RkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkY1xEIAkAAAABDzZZZGRkZGRkZGRkZGRkZGRcOhQDAAAABxw9V2JkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGJYPRwCAAAAARQ6XGRkZGRkZGRkZGRkZGRkXUEbBwAAAAYXOFJiZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRiUjgXBwAAAAcaQF1kZGRkZGRkZGRkZGRkZGBJIgQAAAADES1NX2RkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkYE0vEQMAAAACIklfZGRkZGRkZGRkZGRkZGRiTykIAAAAAQgmRVpiZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkY1xFJggBAAAACClOYmRkZGRkZGRkZGRkZGRkY1UzDgEAAAAHGDhQYGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGFQORgHAAAAAQsyVWNkZGRkZGRkZGRkZGRkZGRcPhoHAAAAAQ4qSFpiZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGJaSCoOAwAAAAMYPVxkZGRkZGRkZGRkZGRkZGRkYUwnCAAAAAEJGTROXmNkZGRkZGRkZGRkZGRkZGRkZGRkZGNeTjQYCQEAAAAFJ0xhZGRkZGRkZGRkZGRkZGRkZGNWNRIDAAAAAQgjO1JgY2RkZGRkZGRkZGRkZGRkZGRkZGNgUzwjCgEAAAABETRWY2RkZGRkZGRkZGRkZGRkZGRkXUkkBQAAAAADDylCVGBjZGRkZGRkZGRkZGRkZGRkZGNgVEMpDwMAAAAABSRJXWRkZGRkZGRkZGRkZGRkZGRkZGJUNRQDAAAAAQIUK0NSXmJkZGRkZGRkZGRkZGRkZGJeUkMrFAIBAAAAAxM0VGJkZGRkZGRkZGRkZGRkZGRkZGRkX0spDAEAAAABBBQpO05aYWJkZGRkZGRkZGRkYmFaTjspFAQBAAAAAQwoS19kZGRkZGRkZGRkZGRkZGRkZGRkZGNZQB4EAAAAAAECDyI0R1BaYGJiY2NjY2JiYFxQSDQjDwIBAAAAAAQdP1ljZGRkZGRkZGRkZGRkZGRkZGRkZGRkYlI0FQIAAAAAAQMIGCo4RU1SV1xbW1xXUk1FOSoYCAMBAAAAAAcWNFJiZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRgTTEUBwAAAAAAAQkOGSUtOD1ERkZEPTgvJhgOCQEAAAAAAAcTME1gZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkY15MLxQHAAAAAAABAwcIERccHyIiHxwXEQgHAwEAAAAAAAcTLExeY2RkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRjXUwxFQUBAAAAAAAAAQMGBwIJCQIHBgMBAAAAAAAAAQQWMExdY2RkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGNeTTQeDAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwwdNE1dY2RkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkY2BSQCkUBQMAAAAAAAAAAAAAAAAAAAAAAAADBRMpP1JgY2RkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkYllLNSQSCAcBAAAAAAAAAAAAAAAAAQcIEiQ0SlliZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRjX1RJNScaDggCBwMBAQEBAwcCCA4aJzVJVF9jZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRiXVZMPjMqIhsUDwsLDxQbIikzPkxWXWJkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRjYVxVT0lBOjc0NDc6QElPVVxhY2RkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkY2JgXVxaWVlaXF1gYmNkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", usty: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PHRpdGxlPjlDMzAwNDI3LTg4Q0QtNDI2RC05QkZELUFEMUU2RUI2RjRDNjwvdGl0bGU+PGRlZnM+PHBhdGggZD0iTTAgNS42MjNBNS42MjMgNS42MjMgMCAwIDEgNS42MjMgMGgxMi43NTRBNS42MjMgNS42MjMgMCAwIDEgMjQgNS42MjN2MTIuNzU0QTUuNjIzIDUuNjIzIDAgMCAxIDE4LjM3NyAyNEg1LjYyM0E1LjYyMyA1LjYyMyAwIDAgMSAwIDE4LjM3N1Y1LjYyM3oiIGlkPSJhIi8+PC9kZWZzPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PG1hc2sgaWQ9ImIiIGZpbGw9IiNmZmYiPjx1c2UgeGxpbms6aHJlZj0iI2EiLz48L21hc2s+PHVzZSBmaWxsLW9wYWNpdHk9IjAiIGZpbGw9IiNGRkYiIHhsaW5rOmhyZWY9IiNhIi8+PHBhdGggZmlsbD0iIzJFQ0M3MSIgbWFzaz0idXJsKCNiKSIgZD0iTTExLjI1IDB2MTQuNjI1SDBWMHoiLz48cGF0aCBmaWxsPSIjRTc0QzNDIiBtYXNrPSJ1cmwoI2IpIiBkPSJNMjQgMHY3Ljg3NUgxMi43NVYweiIvPjxwYXRoIGZpbGw9IiNGMzlDMTIiIG1hc2s9InVybCgjYikiIGQ9Ik0xMS4yNSAxNi4xMjVWMjRIMHYtNy44NzV6Ii8+PHBhdGggZmlsbD0iIzM0OThEQiIgbWFzaz0idXJsKCNiKSIgZD0iTTI0IDkuNTYzdjE0LjYyNEgxMi43NVY5LjU2M3oiLz48L2c+PC9zdmc+"}["gst" == e ? "gh" : e]), ao = e => "data:image/svg+xml," + encodeURI({tampermonkey: "<?xml version='1.0' encoding='utf-8'?><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><g id='XMLID_273_'><g id='XMLID_78_'><path id='XMLID_83_' class='st0' d='M304.8,0H95.2C42.6,0,0,42.6,0,95.2v209.6C0,357.4,42.6,400,95.2,400h209.6 c52.6,0,95.2-42.6,95.2-95.2V95.2C400,42.6,357.4,0,304.8,0z M106.3,375C61.4,375,25,338.6,25,293.8c0-44.9,36.4-81.3,81.3-81.3 c44.9,0,81.3,36.4,81.3,81.3C187.5,338.6,151.1,375,106.3,375z M293.8,375c-44.9,0-81.3-36.4-81.3-81.3 c0-44.9,36.4-81.3,81.3-81.3c44.9,0,81.3,36.4,81.3,81.3C375,338.6,338.6,375,293.8,375z'/></g><g id='XMLID_67_' class='st2'><path id='XMLID_74_' class='st3' d='M304.8,0H95.2C42.6,0,0,42.6,0,95.2v209.6C0,357.4,42.6,400,95.2,400h209.6 c52.6,0,95.2-42.6,95.2-95.2V95.2C400,42.6,357.4,0,304.8,0z M106.3,375C61.4,375,25,338.6,25,293.8c0-44.9,36.4-81.3,81.3-81.3 c44.9,0,81.3,36.4,81.3,81.3C187.5,338.6,151.1,375,106.3,375z M293.8,375c-44.9,0-81.3-36.4-81.3-81.3 c0-44.9,36.4-81.3,81.3-81.3c44.9,0,81.3,36.4,81.3,81.3C375,338.6,338.6,375,293.8,375z'/></g></g></svg>", webdav: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512'><path d='M537.585 226.56C541.725 215.836 544 204.184 544 192c0-53.019-42.981-96-96-96-19.729 0-38.065 5.954-53.316 16.159C367.042 64.248 315.288 32 256 32c-88.366 0-160 71.634-160 160 0 2.728.07 5.439.204 8.133C40.171 219.845 0 273.227 0 336c0 79.529 64.471 144 144 144h368c70.692 0 128-57.308 128-128 0-61.93-43.983-113.586-102.415-125.44z'/></svg>", yandex: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 512'><path d='M153.1 315.8L65.7 512H2l96-209.8c-45.1-22.9-75.2-64.4-75.2-141.1C22.7 53.7 90.8 0 171.7 0H254v512h-55.1V315.8h-45.8zm45.8-269.3h-29.4c-44.4 0-87.4 29.4-87.4 114.6 0 82.3 39.4 108.8 87.4 108.8h29.4V46.5z'/></svg>", firefox: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 496 512'><path d='M496 262.5C497.6 380.8 388.9 504 248 504c-106.7 0-190.9-62.5-229.8-151.7-43-97.7-5.7-251.6 70.3-320.3l-2.7 69.7c3.9-5 32.5-6.4 37.1 0C139 71 190.7 48 232.1 47.2c-15.8 13.3-52.2 61.6-49.2 86.2 20.2 6.4 51.1 6.6 67.4 7.7 5 2.8 4.1 19.6-5.8 33.4 0 0-13 18-48.1 24.3l2.7 41.1-37-7.4c-12.4 31.5 17.4 59.4 48.4 54.2 34.3-5.8 45.9-32 70-30.6 23.8 1.4 33.2 14.6 30.1 27.1 0 0-3.9 14.9-29.6 12.4-21.8 34.5-50.4 53.5-97.3 49.4 71.3 59.1 168.3 5.5 192.6-42.8 24.3-48.1 8-122.1-16.3-142.3 28.7 12.4 43.7 27.6 54.2 55.5 5.5-61.9-22.9-132.1-73.8-173.3C436 70.1 494.3 144.2 496 262.5z'/></svg>", chrome: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 496 512'><path d='M131.5 217.5L55.1 100.1c47.6-59.2 119-91.8 192-92.1 42.3-.3 85.5 10.5 124.8 33.2 43.4 25.2 76.4 61.4 97.4 103L264 133.4c-58.1-3.4-113.4 29.3-132.5 84.1zm32.9 38.5c0 46.2 37.4 83.6 83.6 83.6s83.6-37.4 83.6-83.6-37.4-83.6-83.6-83.6-83.6 37.3-83.6 83.6zm314.9-89.2L339.6 174c37.9 44.3 38.5 108.2 6.6 157.2L234.1 503.6c46.5 2.5 94.4-7.7 137.8-32.9 107.4-62 150.9-192 107.4-303.9zM133.7 303.6L40.4 120.1C14.9 159.1 0 205.9 0 256c0 124 90.8 226.7 209.5 244.9l63.7-124.8c-57.6 10.8-113.2-20.8-139.5-72.5z'/></svg>", onedrive: "<svg xmlns='http://www.w3.org/2000/svg' id='Layer_1' data-name='Layer 1' viewBox='0 0 24 24'><title>Artboard 1</title><g id='Templates'><path d='M17,10.57a3,3,0,0,1,1.18.23,3.11,3.11,0,0,1,1,.64,2.82,2.82,0,0,1,.65,1,3,3,0,0,1-1.6,3.95,3.08,3.08,0,0,1-1.16.23H8a4,4,0,0,1-1.56-.31,4,4,0,0,1,0-7.38A4,4,0,0,1,8,8.57a3.54,3.54,0,0,1,.73.07,4.63,4.63,0,0,1,.72-.87,4.72,4.72,0,0,1,.89-.65,4.58,4.58,0,0,1,1-.41,4.79,4.79,0,0,1,1.13-.14,4.37,4.37,0,0,1,1.64.3,4.55,4.55,0,0,1,1.36.84,4.39,4.39,0,0,1,1,1.27A4.66,4.66,0,0,1,17,10.57Z'/></g></svg>", gdrive: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M339 314.9L175.4 32h161.2l163.6 282.9H339zm-137.5 23.6L120.9 480h310.5L512 338.5H201.5zM154.1 67.4L0 338.5 80.6 480 237 208.8 154.1 67.4z'/></svg>", dropbox: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M256 87.2l-151.9 93.9L0 97.5 150.6 0 256 87.2zM0 265.3l150.6 98.3 105.4-88L104.1 181 0 265.3zm256 10.3l105.4 88L512 265.3l-104.1-84.2L256 275.6zM512 97.5L361.4 0 256 87.2l151.9 93.9L512 97.5zM256.3 294.6l-105.7 87.7-45.2-29.5V385l150.9 90.5L407.2 385v-32.2L362 382.3l-105.7-87.7z'/></svg>", instagram: "<svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='5 4 44 44' style='enable-background:new 5 4 44 44;' xml:space='preserve'><style type='text/css'>.st0{fill:none;}</style><g><rect x='-0.2' y='0.1' class='st0' width='53.8' height='53.4'/><path d='M48.1,26.3c0,4.3,0,7.2-0.1,8.8c-0.2,3.9-1.3,6.9-3.5,9s-5.1,3.3-9,3.5c-1.6,0.1-4.6,0.1-8.8,0.1c-4.3,0-7.2,0-8.8-0.1 c-3.9-0.2-6.9-1.3-9-3.5c-2.1-2.1-3.3-5.1-3.5-9c-0.1-1.6-0.1-4.6-0.1-8.8s0-7.2,0.1-8.8c0.2-3.9,1.3-6.9,3.5-9 c2.1-2.1,5.1-3.3,9-3.5c1.6-0.1,4.6-0.1,8.8-0.1c4.3,0,7.2,0,8.8,0.1c3.9,0.2,6.9,1.3,9,3.5s3.3,5.1,3.5,9 C48,19.1,48.1,22,48.1,26.3z M28.8,8.7c-1.3,0-2,0-2.1,0c-0.1,0-0.8,0-2.1,0c-1.3,0-2.3,0-2.9,0c-0.7,0-1.6,0-2.7,0.1 c-1.1,0-2.1,0.1-2.9,0.3c-0.8,0.1-1.5,0.3-2,0.5c-0.9,0.4-1.7,0.9-2.5,1.6c-0.7,0.7-1.2,1.5-1.6,2.5c-0.2,0.5-0.4,1.2-0.5,2 s-0.2,1.7-0.3,2.9c0,1.1-0.1,2-0.1,2.7c0,0.7,0,1.7,0,2.9c0,1.3,0,2,0,2.1s0,0.8,0,2.1c0,1.3,0,2.3,0,2.9c0,0.7,0,1.6,0.1,2.7 c0,1.1,0.1,2.1,0.3,2.9s0.3,1.5,0.5,2c0.4,0.9,0.9,1.7,1.6,2.5c0.7,0.7,1.5,1.2,2.5,1.6c0.5,0.2,1.2,0.4,2,0.5 c0.8,0.1,1.7,0.2,2.9,0.3s2,0.1,2.7,0.1c0.7,0,1.7,0,2.9,0c1.3,0,2,0,2.1,0c0.1,0,0.8,0,2.1,0c1.3,0,2.3,0,2.9,0 c0.7,0,1.6,0,2.7-0.1c1.1,0,2.1-0.1,2.9-0.3c0.8-0.1,1.5-0.3,2-0.5c0.9-0.4,1.7-0.9,2.5-1.6c0.7-0.7,1.2-1.5,1.6-2.5 c0.2-0.5,0.4-1.2,0.5-2c0.1-0.8,0.2-1.7,0.3-2.9c0-1.1,0.1-2,0.1-2.7c0-0.7,0-1.7,0-2.9c0-1.3,0-2,0-2.1s0-0.8,0-2.1 c0-1.3,0-2.3,0-2.9c0-0.7,0-1.6-0.1-2.7c0-1.1-0.1-2.1-0.3-2.9c-0.1-0.8-0.3-1.5-0.5-2c-0.4-0.9-0.9-1.7-1.6-2.5 c-0.7-0.7-1.5-1.2-2.5-1.6c-0.5-0.2-1.2-0.4-2-0.5c-0.8-0.1-1.7-0.2-2.9-0.3c-1.1,0-2-0.1-2.7-0.1C31.1,8.7,30.1,8.7,28.8,8.7z  M34.4,18.5c2.1,2.1,3.2,4.7,3.2,7.8s-1.1,5.6-3.2,7.8c-2.1,2.1-4.7,3.2-7.8,3.2c-3.1,0-5.6-1.1-7.8-3.2c-2.1-2.1-3.2-4.7-3.2-7.8 s1.1-5.6,3.2-7.8c2.1-2.1,4.7-3.2,7.8-3.2C29.7,15.3,32.3,16.3,34.4,18.5z M31.7,31.3c1.4-1.4,2.1-3.1,2.1-5s-0.7-3.7-2.1-5.1 c-1.4-1.4-3.1-2.1-5.1-2.1c-2,0-3.7,0.7-5.1,2.1s-2.1,3.1-2.1,5.1s0.7,3.7,2.1,5c1.4,1.4,3.1,2.1,5.1,2.1 C28.6,33.4,30.3,32.7,31.7,31.3z M39.9,13c0.5,0.5,0.8,1.1,0.8,1.8c0,0.7-0.3,1.3-0.8,1.8c-0.5,0.5-1.1,0.8-1.8,0.8 s-1.3-0.3-1.8-0.8c-0.5-0.5-0.8-1.1-0.8-1.8c0-0.7,0.3-1.3,0.8-1.8c0.5-0.5,1.1-0.8,1.8-0.8S39.4,12.5,39.9,13z'/></g></svg>", facebook: "<svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 30 30' style='enable-background:new 0 0 30 30;' xml:space='preserve'><style type='text/css'>.f{}.c{fill:none;}</style><g><circle class='c' cx='15' cy='15' r='13' stroke='black' stroke-width='3'/><path class='f' d='M16.4,23.9v-8.1h2.7l0.4-3.2h-3.1v-2c0-0.9,0.3-1.5,1.6-1.5l1.7,0V6.2c-0.3,0-1.3-0.1-2.4-0.1c-2.4,0-4.1,1.5-4.1,4.2v2.3h-2.7v3.2h2.7v8.1H16.4z'/></g></svg>"}[e]).replace(/%20/g, " "), io = v({timeout: 10800, check_interval: 300, retimeout_on_get: true}).init(), lo = g({threads: 5}), co = {}, Ao = async e => {
      let t, n;
      const r = co[e];
      if (r) return await r;
      const s = lo.add(async () => (n = io.get(e), n && (t = await n.toBlob()), t || (t = await uo(e)), t && (n || (n = new Bt({blob: t}), io.set(e, n))), delete co[e], n));
      return co[e] = s, await s;
    }, uo = async e => {
      if (/^data:image\/svg|^chrome:|\.svgz?([#?].*)?$/.test(e)) return new s(t => {
        const n = new Image;
        n.crossOrigin = "anonymous", n.src = e, n.onload = () => {
          const e = document.createElement("canvas"), r = e.getContext("2d");
          r ? (e.width = n.naturalWidth, e.height = n.naturalHeight, r.drawImage(n, 0, 0), e.toBlob(e => {
            t(e || void 0);
          }, "image/png", 0.75)) : t(void 0);
        }, n.onerror = () => t(void 0);
      });
      try {
        const t = await G(e);
        if (t.ok) return await t.blob();
      } catch (e) {}
    }, po = (() => {
      const e = {};
      let t, n = null;
      return {create: (r, s, o, a) => {
        let i = 0;
        return (() => {
          if (t) return t;
          const r = q(), s = e => {
            n = e || "unknown", l.log("notify: chronos level", e), r.resolve();
          };
          return Le ? (o = s, ie.notifications.getPermissionLevel(o), ie.notifications.onPermissionLevelChanged.addListener(s), ie.notifications.onClicked.addListener(t => {
            l.log("notify: chronos click", t);
            const n = e[t];
            if (!n) return;
            const r = n.cb;
            r && r.click && r.click(), n.cancel(), delete e[t];
          }), ie.notifications.onClosed.addListener(t => {
            l.log("notify: chronos close", t);
            const n = e[t];
            if (!n) return;
            const r = n.cb;
            r && r.close && r.close(), delete e[t];
          })) : s("unsupported"), t = r.promise();
          var o;
        })().then(() => {
          const t = q();
          let c = 10;
          const A = () => {
            if (n) if ("granted" == n) {
              const n = {}, c = {cb: n, on: (e, t) => {
                n[e] = t;
              }, cancel: () => {}, show: () => {
                const n = {type: "basic", title: s || "", message: o || ""};
                n.iconUrl = 0 == i ? r : "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==", J() >= 70 && void 0 !== a.silent && (n.silent = a.silent), J() >= 50 && (n.requireInteraction = true);
                const A = St();
                var u, d, p;
                u = A, d = n, p = () => {
                  if (he.lastError) {
                    if (i < 1) return l.log("notify: chronos creating failed, retry...", he.lastError), i++, void c.show();
                    l.log("notify: chronos creating finally failed", he.lastError), t.reject();
                  } else l.log("notify: chronos created", A), c.cancel = () => {
                    var t, n;
                    e[A] && (t = A, n = () => {}, ie.notifications.clear(t, n));
                  }, e[A] = c;
                }, ie.notifications.create(u, d, p);
              }};
              t.resolve(c);
            } else t.resolve(); else {
              const e = () => {
                n ? A() : c-- ? y(e, 200) : t.resolve();
              };
              e();
            }
          };
          return A(), t.promise();
        });
      }};
    })(), ho = (() => {
      const e = {};
      let t, n = null;
      const r = {create: (r, s, o, a) => {
        return (t || (i = U ? U.permission : "unsupported", n = i || "unknown", l.log("notify: notification level", i), t = q.Pledge())).then(() => {
          const t = q(), i = () => {
            if ("granted" == n || "default" == n) {
              const n = {cb: {}, on: (e, t) => {
                n.cb[e] = t;
              }, cancel: () => {}, show: () => {
                const t = {body: o || "", icon: r};
                J() >= 43 && void 0 !== a.silent && (t.silent = a.silent), t.requireInteraction = true;
                const i = St(), c = new U(s || "", t);
                c.onclick = () => {
                  l.log("notify: notification click", i);
                  const t = e[i];
                  t && (t.cb && t.cb.click && t.cb.click(), t.cancel(), delete e[i]);
                }, c.onclose = c.onerror = t => {
                  l.log("notify: notification close", i, t);
                  const n = e[i];
                  n && n.cb && n.cb.close && n.cb.close(), delete e[i];
                }, n.cancel = () => {
                  e[i] && c.close();
                }, e[i] = n;
              }};
              t.resolve(n);
            } else if ("denied" == n) t.resolve(); else if ("unsupported" == n) t.resolve(); else {
              const e = e => {
                n = "granted" == e ? "granted" : "denied", i();
              };
              U.requestPermission().then(e);
            }
          };
          return i(), t.promise();
        });
        var i;
      }};
      return r;
    })(), fo = {notify: (e, t, n, r, s) => {
      const o = (r = r || {}).timeout;
      let a, i = null, c = false, A = null;
      const u = () => {
        A && x(A), !c && s && s({});
      }, d = () => {
        c = true, s && s({clicked: c}), i && i.cancel();
      };
      return n = n || pe.getURL("images/icon128.png"), Ao(n).then(e => null == e ? void 0 : e.toDataUri()).then(e => (a = e || n, q.Pledge())).then(() => po.create(a, e, t, r)).then(n => n || ((e, t, n) => {
        let r;
        if (M) try {
          const s = M.createNotification(e, t || "", n || "");
          r = {on: (e, t) => {
            s["on" + e] = t;
          }, cancel: () => {
            closed || s.cancel();
          }, show: () => {
            s.show();
          }};
        } catch (e) {
          l.warn("notify: webkitNotifications creation failed with: " + e.message);
        }
        return q.Pledge(r);
      })(a, e, t)).then(n => n || ho.create(a, e, t, r)).then(n => n || ((e, t, n, r) => {
        const s = {cb: {}, on: (e, t) => {
          s.cb && (s.cb[e] = t);
        }, cancel: () => {}, show: () => {
          r.informational || y(() => {
            const e = V((t ? t + "\n\n" : "") + n);
            s.cb && (e ? s.cb.click && s.cb.click() : s.cb.close && s.cb.close());
          }, 1);
        }};
        return q.Pledge(s);
      })(0, e, t, {informational: !s})).then(r => {
        r && (i = r, r.on("close", u), r.on("click", d), A = y(() => {
          A = null, r.cancel();
        }, o || 6e5), l.log("notify:", e, t, n, o), r.show && r.show());
      }), {cancel: () => {
        i && i.cancel();
      }};
    }, showUpdate: (e, t, n, r) => fo.notify(e, t, n, {timeout: 3e5}, r), show: (e, t, n, r, s) => fo.notify(e, t, n, r, s), highlight: (e, t) => {
      !function (e, t) {
        if (e && e.tabs) {
          const n = e.tabs instanceof Array ? e.tabs : [e.tabs], r = [];
          let s;
          const o = () => {
            if (!n.length) return ie.tabs.highlight({windowId: s, tabs: r}, () => {
              ie.windows.update(s, {focused: true}, () => {
                t && t();
              });
            });
            {
              const e = n.pop();
              ie.tabs.get(e, e => {
                void 0 === s && (s = e.windowId), e.windowId === s && r.push(e.index), o();
              });
            }
          };
          o();
        } else t && t();
      }({tabs: e}, t);
    }};
    let mo;
    const go = {newV: pe.manifest.version, oldV: void 0, first_run: false, active: false}, vo = () => {
      if (!u.late) return void u.registerLateCallback(vo);
      let e, t = "version=" + go.newV + "&ext=" + he.short_id + "&updated=true";
      if (go.first_run ? (e = "https://www.tampermonkey.net/installed.php?" + t, go.active = true) : (t += "&old=" + go.oldV, e = "https://www.tampermonkey.net/changelog.php?" + t), "off" == Xr.values.notification_showUpdate) ; else if ("notification" == Xr.values.notification_showUpdate) fo.showUpdate(zn.getMessage("Updated_to__0version0", go.newV), zn.getMessage("Click_here_to_see_the_recent_changes"), ao("tampermonkey"), t => {
        t.clicked && _e({url: e}, () => {});
      }); else if ("changelog" == Xr.values.notification_showUpdate) {
        go.active || (e += "&intr=true"), go.active = true;
        const t = {url: e, active: go.active};
        _e(t, () => {});
      }
    }, _o = (() => {
      const e = q(), t = () => {
        const t = Date.now(), n = rt.getValue(ee.STORAGE.LAST_START, 0), r = Math.round((t - n) / 1e3), s = r <= 60;
        l.log("upd: restart?", s, "(", r, "seconds ago)"), e.resolve(s);
      };
      return u.late ? t() : u.registerLateCallback(t), e.promise();
    })(), bo = () => {
      let e = false, t = false;
      (() => {
        let e, t;
        const n = q(), r = () => {
          t && (t = void 0, n.resolve(!!e));
        };
        return t = y(r, 300), ze(15, t => {
          e = "active" == t, r();
        }), n.promise();
      })().then(e => (t = e, _o)).then(t => {
        e = t;
      }).always(() => {
        go.active = !t || e, vo(), Ro = true;
      });
    };
    let wo = false;
    const ko = "extentsion_update_available";
    let yo, Ro;
    const xo = {scheduleNotification: (e, t) => {
      Ro || (go.oldV = e || void 0, go.first_run || (go.first_run = t), yo && x(yo), yo = y(bo, 1e3));
    }, updateAvailable: () => mo, onInstalled: () => {
      xo.scheduleNotification(void 0, true);
    }, onUpdated: e => {
      xo.scheduleNotification(e, false);
    }, onUpdateAvailable: e => {
      wo || (l.info("An update to version", e.version, "is available"), mo = e.version, dr.all("status", {key: ko, id: ko, class: "information", text: zn.getMessage("0name0_0version0_is_available__Please_re_start_your_browser_to_update_", pe.manifest.name, e.version), timeout: 864e5}), wo = true);
    }};
    u.registerLateCallback(() => {
      rt.setValue(ee.STORAGE.LAST_START, Date.now());
    });
    const Eo = xo, So = (e, t) => {
      if (!e || -1 != e.search(/#bypass=true/) || -1 != e.search(he.getInternalPageRegexp()) || !["https:", "http:", "file:", "ftp:"].some(t => e.startsWith(t))) return false;
      const n = t ? e : e.split(/[?#$]/)[0], r = -1 != n.search(/[^/]{1}\.user\.(js#|js\?|js$)/) || -1 != n.search(/[^/]{1}\.tamper\.(js#|js\?|js$)/);
      return r ? !(-1 != n.search(/^htt[ps]{1,2}:\/\/code\.google\.com/) || -1 != n.search(/^htt[ps]{1,2}:\/\/(github|gitlab)\.com/) && !Ws(n) || -1 != n.search(/^htt[ps]{1,2}:\/\/bitbucket\.org/) && !Ws(n)) : r;
    }, Go = (e, t) => {
      const n = q(), r = bn(e);
      if (r && ["file:"].concat(oe.INTERNAL_PAGE_PROTOCOLS).includes(r.protocol)) Ze(e, e => {
        n.resolve(e);
      }, e => {
        n.reject(e);
      }); else {
        const r = {method: "GET", retries: re.RETRIES, timeout: 6e4, revalidate: true, headers: null == t ? void 0 : t.headers, responseType: "arraybuffer", url: e};
        xr.internal(r, {onload: t => {
          4 != t.readyState || 200 != t.status && 0 != t.status || t.error ? (l.verbose("getScriptFromUrl: " + e + " req.status = " + t.status), n.reject(t.responseText || "request error")) : n.resolve(t.response);
        }, onerror: e => n.reject(e.responseText || "request error"), ontimeout: () => n.reject("timeout")});
      }
      return n.promise();
    }, Co = e => {
      const t = q();
      return Go(e, {headers: {Accept: "text/x-userscript, */*"}}).then(e => {
        At(e, {encoding: "UTF-8"}).then(e => {
          t.resolve(e);
        }, e => {
          t.reject(e.message || "charset issue");
        });
      }), t.promise();
    }, Mo = () => {
      const e = q();
      return ie.tabs.getSelected(null, t => {
        t ? e.resolve(t) : e.reject();
      }), e.promise();
    }, Io = (e, t) => {
      let n, r;
      try {
        t || "/" != e.substr(0, 1) ? t ? (r = on(e), n = new RegExp(r)) : (r = (e => {
          let t;
          if ("*" == e) t = "^(https?|file)://.*"; else {
            t = e;
            const n = nn.exec(t);
            if (n) {
              let [, e, r, s] = n;
              e = e ? vt(e).replace(/\*/gi, "[^:]*") : "", r = r ? vt(s ? r.replace(/\.\*$/, Jt) : r).replace(/\*+/g, (e, t) => 1 == e.length && (s || !t && r.length > 1 && (r.match(/\*/g) || []).length > 1 && r.replace(/\*\./g, "").length > 0) ? "[^/]*" : ".*") : r || "", s = s ? vt(s).replace(/\*/gi, ".*") : "", t = "^" + [e, r, s].join("") + "$";
            } else t = "^" + vt(t) + "$", t = t.replace(/\*/gi, ".*"), t = t.replace(/(\^|:\/\/)\.\*/, "$1([^?#])*");
            t = t.replace(vt(".tld/"), en + "/");
          }
          return t;
        })(e), n = new RegExp(r, "i")) : (r = ("^" == e.substr(1, 1) ? "" : ".*") + e.replace(/^\//g, "").replace(/\/$/g, "") + ("$" == e.substr(-2, 1) ? "" : ".*"), r = r.replace(/(\.\*){1,}/g, ".*"), n = new RegExp(r, "i"));
      } catch (t) {
        return void l.warn("scriptman: invalid regexp ", e);
      }
      return n;
    }, Zo = (e, t) => "" === e.replace(t, ""), Uo = (e, t) => {
      let n = [], r = [];
      const s = (e, t) => e && e.length ? e.map(e => Io(e, t)).filter(e => void 0 !== e) : [], {inc: o, match: a, exc: i} = e;
      return n = s(o).concat(s(a, true)), r = s(i), {rinc: n.length || t ? n : void 0, rexc: r.length || t ? r : void 0};
    }, To = (e, t, n) => {
      let r = false;
      if (t.rinc) {
        if (t.rinc.every(t => !Zo(e, t) || (l.debug('scriptman: @include "' + t + '" matched' + (n ? " (" + n + ")" : '"')), r = true, false)), !r) return r;
      } else r = true;
      return t.rexc && t.rexc.every(t => !Zo(e, t) || (l.debug('scriptman: @exclude "' + t + '" matched' + (n ? " (" + n + ")" : '"')), r = false, false)), r;
    }, Bo = v({timeout: 5, check_interval: 10, retimeout_on_get: true}).init(), Oo = v({timeout: 300, check_interval: 120, retimeout_on_get: true}).init();
    var Fo = {}, jo = Fo.util = Fo.util || {};
    jo.isArrayBuffer = function (e) {
      return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer;
    }, jo.isArrayBufferView = function (e) {
      return e && jo.isArrayBuffer(e.buffer) && void 0 !== e.byteLength;
    }, jo.ByteBuffer = t, jo.ByteStringBuffer = t, jo.ByteStringBuffer.prototype._optimizeConstructedString = function (e) {
      this._constructedStringLength += e, this._constructedStringLength > 4096 && (this.data.substr(0, 1), this._constructedStringLength = 0);
    }, jo.ByteStringBuffer.prototype.length = function () {
      return this.data.length - this.read;
    }, jo.ByteStringBuffer.prototype.isEmpty = function () {
      return this.length() <= 0;
    }, jo.ByteStringBuffer.prototype.putByte = function (e) {
      return this.putBytes(String.fromCharCode(e));
    }, jo.ByteStringBuffer.prototype.fillWithByte = function (e, t) {
      e = String.fromCharCode(e);
      for (var n = this.data; t > 0;) 1 & t && (n += e), (t >>>= 1) > 0 && (e += e);
      return this.data = n, this._optimizeConstructedString(t), this;
    }, jo.ByteStringBuffer.prototype.putBytes = function (e) {
      return this.data += e, this._optimizeConstructedString(e.length), this;
    }, jo.ByteStringBuffer.prototype.putString = function (e) {
      return this.putBytes(jo.encodeUtf8(e));
    }, jo.ByteStringBuffer.prototype.putInt16 = function (e) {
      return this.putBytes(String.fromCharCode(e >> 8 & 255) + String.fromCharCode(255 & e));
    }, jo.ByteStringBuffer.prototype.putInt24 = function (e) {
      return this.putBytes(String.fromCharCode(e >> 16 & 255) + String.fromCharCode(e >> 8 & 255) + String.fromCharCode(255 & e));
    }, jo.ByteStringBuffer.prototype.putInt32 = function (e) {
      return this.putBytes(String.fromCharCode(e >> 24 & 255) + String.fromCharCode(e >> 16 & 255) + String.fromCharCode(e >> 8 & 255) + String.fromCharCode(255 & e));
    }, jo.ByteStringBuffer.prototype.putInt16Le = function (e) {
      return this.putBytes(String.fromCharCode(255 & e) + String.fromCharCode(e >> 8 & 255));
    }, jo.ByteStringBuffer.prototype.putInt24Le = function (e) {
      return this.putBytes(String.fromCharCode(255 & e) + String.fromCharCode(e >> 8 & 255) + String.fromCharCode(e >> 16 & 255));
    }, jo.ByteStringBuffer.prototype.putInt32Le = function (e) {
      return this.putBytes(String.fromCharCode(255 & e) + String.fromCharCode(e >> 8 & 255) + String.fromCharCode(e >> 16 & 255) + String.fromCharCode(e >> 24 & 255));
    }, jo.ByteStringBuffer.prototype.putInt = function (e, t) {
      var n = "";
      do {
        t -= 8, n += String.fromCharCode(e >> t & 255);
      } while (t > 0);
      return this.putBytes(n);
    }, jo.ByteStringBuffer.prototype.putSignedInt = function (e, t) {
      return e < 0 && (e += 2 << t - 1), this.putInt(e, t);
    }, jo.ByteStringBuffer.prototype.putBuffer = function (e) {
      return this.putBytes(e.getBytes());
    }, jo.ByteStringBuffer.prototype.getByte = function () {
      return this.data.charCodeAt(this.read++);
    }, jo.ByteStringBuffer.prototype.getInt16 = function () {
      var e = this.data.charCodeAt(this.read) << 8 ^ this.data.charCodeAt(this.read + 1);
      return this.read += 2, e;
    }, jo.ByteStringBuffer.prototype.getInt24 = function () {
      var e = this.data.charCodeAt(this.read) << 16 ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2);
      return this.read += 3, e;
    }, jo.ByteStringBuffer.prototype.getInt32 = function () {
      var e = this.data.charCodeAt(this.read) << 24 ^ this.data.charCodeAt(this.read + 1) << 16 ^ this.data.charCodeAt(this.read + 2) << 8 ^ this.data.charCodeAt(this.read + 3);
      return this.read += 4, e;
    }, jo.ByteStringBuffer.prototype.getInt16Le = function () {
      var e = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8;
      return this.read += 2, e;
    }, jo.ByteStringBuffer.prototype.getInt24Le = function () {
      var e = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2) << 16;
      return this.read += 3, e;
    }, jo.ByteStringBuffer.prototype.getInt32Le = function () {
      var e = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2) << 16 ^ this.data.charCodeAt(this.read + 3) << 24;
      return this.read += 4, e;
    }, jo.ByteStringBuffer.prototype.getInt = function (e) {
      var t = 0;
      do {
        t = (t << 8) + this.data.charCodeAt(this.read++), e -= 8;
      } while (e > 0);
      return t;
    }, jo.ByteStringBuffer.prototype.getSignedInt = function (e) {
      var t = this.getInt(e), n = 2 << e - 2;
      return t >= n && (t -= n << 1), t;
    }, jo.ByteStringBuffer.prototype.getBytes = function (e) {
      var t;
      return e ? (e = Math.min(this.length(), e), t = this.data.slice(this.read, this.read + e), this.read += e) : 0 === e ? t = "" : (t = 0 === this.read ? this.data : this.data.slice(this.read), this.clear()), t;
    }, jo.ByteStringBuffer.prototype.bytes = function (e) {
      return void 0 === e ? this.data.slice(this.read) : this.data.slice(this.read, this.read + e);
    }, jo.ByteStringBuffer.prototype.at = function (e) {
      return this.data.charCodeAt(this.read + e);
    }, jo.ByteStringBuffer.prototype.setAt = function (e, t) {
      return this.data = this.data.substr(0, this.read + e) + String.fromCharCode(t) + this.data.substr(this.read + e + 1), this;
    }, jo.ByteStringBuffer.prototype.last = function () {
      return this.data.charCodeAt(this.data.length - 1);
    }, jo.ByteStringBuffer.prototype.copy = function () {
      var e = jo.createBuffer(this.data);
      return e.read = this.read, e;
    }, jo.ByteStringBuffer.prototype.compact = function () {
      return this.read > 0 && (this.data = this.data.slice(this.read), this.read = 0), this;
    }, jo.ByteStringBuffer.prototype.clear = function () {
      return this.data = "", this.read = 0, this;
    }, jo.ByteStringBuffer.prototype.truncate = function (e) {
      var t = Math.max(0, this.length() - e);
      return this.data = this.data.substr(this.read, t), this.read = 0, this;
    }, jo.ByteStringBuffer.prototype.toHex = function () {
      for (var e = "", t = this.read; t < this.data.length; ++t) {
        var n = this.data.charCodeAt(t);
        n < 16 && (e += "0"), e += n.toString(16);
      }
      return e;
    }, jo.ByteStringBuffer.prototype.toString = function () {
      return jo.decodeUtf8(this.bytes());
    }, jo.createBuffer = function (e, t) {
      return t = t || "raw", void 0 !== e && "utf8" === t && (e = jo.encodeUtf8(e)), new jo.ByteBuffer(e);
    }, jo.fillString = function (e, t) {
      for (var n = ""; t > 0;) 1 & t && (n += e), (t >>>= 1) > 0 && (e += e);
      return n;
    }, jo.encodeUtf8 = function (e) {
      return unescape(encodeURIComponent(e));
    }, jo.decodeUtf8 = function (e) {
      return decodeURIComponent(escape(e));
    };
    var Lo = Fo.sha256 = Fo.sha256 || {};
    Fo.md = Fo.md || {}, Fo.md.algorithms = Fo.md.algorithms || {}, Fo.md.sha256 = Fo.md.algorithms.sha256 = Lo, Lo.create = function () {
      Do || (Po = String.fromCharCode(128), Po += Fo.util.fillString(String.fromCharCode(0), 64), Vo = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298], Do = true);
      var e = null, t = Fo.util.createBuffer(), r = new Array(64), s = {algorithm: "sha256", blockLength: 64, digestLength: 32, messageLength: 0, messageLength64: [0, 0], start: function () {
        return s.messageLength = 0, s.messageLength64 = [0, 0], t = Fo.util.createBuffer(), e = {h0: 1779033703, h1: 3144134277, h2: 1013904242, h3: 2773480762, h4: 1359893119, h5: 2600822924, h6: 528734635, h7: 1541459225}, s;
      }};
      return s.start(), s.update = function (o, a) {
        return "utf8" === a && (o = Fo.util.encodeUtf8(o)), s.messageLength += o.length, s.messageLength64[0] += o.length / 4294967296 >>> 0, s.messageLength64[1] += o.length >>> 0, t.putBytes(o), n(e, r, t), (t.read > 2048 || 0 === t.length()) && t.compact(), s;
      }, s.digest = function () {
        var o = Fo.util.createBuffer();
        o.putBytes(t.bytes()), o.putBytes(Po.substr(0, 64 - (s.messageLength64[1] + 8 & 63))), o.putInt32(s.messageLength64[0] << 3 | s.messageLength64[0] >>> 28), o.putInt32(s.messageLength64[1] << 3);
        var a = {h0: e.h0, h1: e.h1, h2: e.h2, h3: e.h3, h4: e.h4, h5: e.h5, h6: e.h6, h7: e.h7};
        n(a, r, o);
        var i = Fo.util.createBuffer();
        return i.putInt32(a.h0), i.putInt32(a.h1), i.putInt32(a.h2), i.putInt32(a.h3), i.putInt32(a.h4), i.putInt32(a.h5), i.putInt32(a.h6), i.putInt32(a.h7), i;
      }, s;
    };
    var Po = null, Do = false, Vo = null;
    jo.hasWideChar = function (e) {
      for (var t = 0; t < e.length; t++) if (e.charCodeAt(t) >>> 8) return true;
      return false;
    };
    const No = function (e, t) {
      var n = Fo.md.sha256.create();
      return n.update(e, "UTF-8" == t || void 0 === t && jo.hasWideChar(e) ? "utf8" : void 0), n.digest().toHex();
    };
    let zo;
    const qo = g({threads: 1}), Qo = (e, t) => {
      const n = (e ? e.split("/") : []).concat(t ? [t] : []).join("/");
      return n ? ("/" == n.substr(0, 1) ? "" : "/") + n : "";
    }, Ho = e => {
      const t = (e.match(/[\dA-F]{2}/gi) || []).map(e => parseInt(e, 16));
      return new Uint8Array(t).buffer;
    }, Xo = e => {
      const t = {type: e, request: e => {
        const t = () => {
          const t = q(), n = e => {
            l.log("rest service: request failed", e), t.reject(e);
          }, r = "xml" === e.responseType, s = "headers" === e.responseType;
          return (r || s) && delete e.responseType, Qt(e, {onload: o => {
            if ([200, 201, 204, 207].includes(o.status)) {
              let n;
              n = r ? e.anonymous || e.fetch || null === o.responseXML ? (new O).parseFromString(o.responseText || "", "text/xml") : o.responseXML : s ? qt(o.responseHeaders) : o.response, t.resolve({result: n});
            } else n(o);
          }, onerror: n, ontimeout: () => n("timed out"), onprogress: e => t.notify(e), onuploadprogress: e => t.notify(e)}, {internal: true}), t.promise();
        };
        return e.no_queue ? t() : qo.add(t);
      }, error: t => {
        const n = t;
        let r;
        if (void 0 !== n.status) {
          r = n.status.toString();
          try {
            r = r + " | " + n.responseText;
          } catch (e) {}
        } else r = t;
        Ss.tC(e, "error", "request: " + r);
      }, wait: e => (...t) => e(...t).then(e => e, e => (e => q.Breach(e ? e.responseText || e.statusText : void 0))(e)), changes: (() => {
        let e;
        const n = {listen: () => (e || (e = q(), t.watch && t.watch.start()), e.promise()), notify: t => {
          e.notify(t);
        }};
        return n;
      })()};
      return t;
    }, Yo = e => {
      const t = Object.assign({}, e), n = t.type;
      if (void 0 === n) throw new Error("Internal error");
      let r, s = [];
      const o = Object.assign(e, {...t, config: {...t.config, auth_prefix: "Bearer", storage_key: ""}, credentials: {}, request: e => (e.no_auth || (e.headers = e.headers || {}, e.headers.Authorization = o.config.auth_prefix + " " + o.credentials.access_token), t.request(e)), oauth: (() => {
        let e;
        const t = {run: () => {
          if (r) return r;
          let s = q();
          const a = r = s.promise();
          e = "!!" + n + "-" + St();
          let i = o.credentials ? o.credentials.refresh_token : null;
          const l = (e, t) => {
            o.credentials = t, null == s || s.resolve(), s = void 0, e && e.close();
          };
          return (() => {
            if (!o.config.refresh_supported || !i) return q.Pledge();
            const e = q(), r = () => {
              i = null, delete o.credentials.refresh_token;
            };
            return Qt({url: t.getRefreshUrl(i), fetch: true}, {onload: e => {
              if (!e.finalUrl) return Ss.tC(n, "error", "auth refresh token: !finalUrl"), void r();
              const s = t.onUrl(e.finalUrl);
              s && (s.error || !s.access_token ? (Ss.tC(n, "error", "auth refresh token: " + (s.error || "!access_token")), r()) : l(null, s));
            }, onerror: r, ondone: () => e.resolve()}), e.promise();
          })().then(() => {
            if (!s) return;
            if (!o.config.refresh_supported) return q.Pledge();
            const e = q(), r = zo({url: t.getRefreshUrl()});
            return r.promise.progress(e => {
              let a;
              s && (a = t.onUrl(e.url)) && (a.error || !a.access_token ? (Ss.tC(n, "error", "auth refresh: " + (a.error || "!access_token")), o.config.refresh_supported = false) : l(r, a));
            }).always(e.resolve), e.promise();
          }).then(() => {
            if (!s) return;
            const e = q(), r = zo({url: t.getAuthUrl()});
            return r.promise.progress(e => {
              let o;
              s && (o = t.onUrl(e.url)) && (o.error || !o.access_token ? Ss.tC(n, "error", "auth: " + (o.error || "!access_token")) : l(r, o));
            }).always(e.resolve), e.promise();
          }).done(() => {
            r = void 0, s && s.reject("auth_failed");
          }), a;
        }, getAuthUrl: () => o.config.request_uri + "?" + xn({response_type: o.config.response_type, client_id: o.config.client_id, redirect_uri: o.config.redirect_uri, state: e, scope: o.config.scope}), getRefreshUrl: t => {
          const n = {client_id: o.config.client_id, redirect_uri: o.config.redirect_uri, state: e, scope: o.config.scope, refresh_token: t};
          return o.config.redirect_uri + "?" + xn(n);
        }, onUrl: t => {
          let n, r;
          if (t && 0 === t.indexOf(o.config.redirect_uri) && (r = bn(t)) && ("string" != typeof (s = r) && (s = s.search ? s.search.substring(1) : s.hash ? s.hash.substring(1) : ""), n = s.split("&").reduce((e, t) => {
            const n = t.split("=");
            return e[decodeURIComponent(n[0])] = decodeURIComponent(n[1]), e;
          }, {})) && (n.access_token || n.error) && n.state === e) return {uid: n.uid, access_token: n.access_token, refresh_token: n.refresh_token, error: n.error};
          var s;
        }, reset: () => (delete o.credentials.access_token, delete o.credentials.refresh_token, q.Pledge())};
        return t;
      })(), revoke: t.wait(() => o.oauth.reset()), wait: e => t.wait((...t) => {
        if (o.credentials.access_token) return e(...t);
        {
          const n = q();
          return s.push(() => n.consume(e(...t))), o.oauth.run().done(() => {
            s.forEach(e => e()), s = [];
          }).fail(e => {
            n.reject(e);
          }), n.promise();
        }
      })}), a = se.LOCALSTORAGE;
      let i;
      return Object.defineProperty(o, "credentials", {get: () => {
        if (void 0 === i) {
          if (Ss.tC(n, "init"), a) try {
            const e = JSON.parse(a.getItem(o.config.storage_key) || "");
            i = {uid: e.uid, access_token: e.access_token, refresh_token: e.refresh_token};
          } catch (e) {}
          i = i || {};
        }
        return i;
      }, set: e => {
        if (a) try {
          a.setItem(o.config.storage_key, JSON.stringify({uid: e.uid, access_token: e.access_token, refresh_token: e.refresh_token}));
        } catch (e) {}
        i = e;
      }, enumerable: false}), o;
    }, Wo = e => {
      let t, n, r, s, o, a, i, c, A, u = null, p = null;
      const h = Object.assign({}, e), f = e => {
        var t;
        let n;
        return e && (n = (null === (t = e.firstChild) || void 0 === t ? void 0 : t.nextSibling) ? e.firstChild.nextSibling : e.firstChild), n;
      }, m = e => h.wait((...t) => w.init().then(() => e(...t))), g = (e, t) => {
        let n, r;
        if ((n = e.getElementsByTagNameNS("*", t)[0]) && (r = n.firstChild)) return r.nodeValue || void 0;
      }, v = e => {
        const s = [], o = e.getElementsByTagNameNS("*", "response");
        for (let e = 0; e < o.length; e++) {
          const a = o[e];
          let i = g(a, "href");
          if (null == i) continue;
          i = i.replace(/\/$/, "");
          const l = a.getElementsByTagNameNS("*", "propstat")[0].getElementsByTagNameNS("*", "prop")[0], c = g(l, "getlastmodified"), A = g(l, "getetag"), u = parseInt(g(l, "getcontentlength") || ""), d = l.getElementsByTagNameNS("*", "resourcetype")[0].getElementsByTagNameNS("*", "collection")[0], p = i.replace(new RegExp("^(" + [vt(n + t) + "/?", vt(r + t) + "/?"].join("|") + ")"), "");
          let h;
          try {
            h = I(p);
          } catch (e) {
            h = p;
          }
          if (d) ; else {
            const e = {etag: A, name: h, id: p, modifiedTime: new Date(c || 0).getTime(), size: u >= 0 ? u : void 0, removed: -1 == u};
            s.push(e);
          }
        }
        return s;
      }, _ = e => g(e, "td:cursor"), b = (e, t) => {
        const n = t || {};
        n.set_current_list && (o = {});
        const r = w.request({method: "PROPFIND", url: e, headers: {"Content-Type": "text/xml; charset=UTF-8", Depth: void 0 !== n.depth ? n.depth : 1}, responseType: "xml"}).then(e => {
          const t = e.result;
          let r;
          if (null === t || !(r = f(t)) || !r.childNodes) return q.Breach();
          const s = v(r);
          if (n.set_current_list) {
            const e = _(r);
            e && (a = e), s.forEach(e => {
              o[e.id] = e;
            });
          }
          return s;
        });
        return r;
      }, w = Object.assign(e, {...e, config: {...e.config, watch_interval: 36e5, root: void 0, path: void 0}, request: e => (e.headers = e.headers || {}, e.headers["User-Agent"] = "Tampermonkey", e.headers.Cookie = "", h.request(e).then(e => e, t => {
        const n = (null == t ? void 0 : t.status) || -1;
        return !t || [403, 500].includes(n) ? (e.backoff = 2 * (e.backoff || 1e3), d(e.backoff).then(() => w.request(e))) : 404 == n ? q.Pledge(t) : (w.error(t), q.Breach(t));
      })), init: () => {
        if (s) return s;
        t = Qo(w.config.root, w.config.path), n = w.config.url || "", "/" == n.slice(-1) && (n = n.slice(0, -1));
        const e = bn(n);
        if (!e) return q.Breach("invalid url");
        r = e.pathname, "/" == r.slice(-1) && (r = r.slice(0, -1));
        const o = q();
        s = o.promise();
        const a = n + t;
        return w.request({method: "OPTIONS", url: n, responseType: "headers"}).done(e => {
          const t = e.result;
          let n;
          t && (n = t["access-control-allow-methods"]) && n.includes("EDITOR") && (A = true);
        }).always(() => {
          b(a, {depth: 0}).done(() => o.resolve()).fail(() => {
            const e = [];
            q.onebyone(t.split("/").filter(e => e).map(t => {
              e.push(t);
              const r = e.join("/");
              return () => w.request({method: "MKCOL", url: n + "/" + r, headers: {"Content-Type": "text/xml; charset=UTF-8"}, responseType: "xml"});
            })).done(() => o.resolve()).fail(o.reject);
          });
        }), s;
      }, list: m(e => b(n + t, {set_current_list: true}).then(t => {
        const n = {};
        return t.map(t => {
          if (!e) {
            if (n[t.id]) return;
            n[t.id] = true;
          }
          return {name: t.name, id: t.id, size: t.size || 0, etag: t.etag, modified: t.modifiedTime, precision: 1e3, removed: t.removed};
        }).filter(e => e);
      })), get: m(e => {
        const r = e.id || e;
        return w.request({method: "GET", url: n + Qo(t, r), headers: {"Content-Type": "text/xml; charset=UTF-8"}, responseType: "arraybuffer"}).then(e => {
          const t = e.result;
          return new Blob([t]);
        });
      }), put: m((e, r, s) => {
        const o = e.id || e;
        let a, i, c;
        const A = {"Content-Type": "application/octet-stream"};
        let d = false;
        return s && s.lastModified && (d = null === p, a = s.lastModified, c = new Date(s.lastModified).toISOString(), i = s.lastModified / 1e3, (p || d) && (A["X-OC-Mtime"] = i)), w.request({method: "PUT", url: n + Qo(t, o), headers: A, data_type: "typified", data: {type: "raw", value: r}, responseType: "headers"}).then(e => {
          const r = e.result;
          if (r && d) {
            let e;
            p = !("accepted" != r["x-oc-mtime"] && (!r.date || !(e = new Date(r.date).getTime()) || e != a && e != Math.floor(i)));
          }
          if (!p && !u && c) return w.request({method: "PROPPATCH", url: n + Qo(t, o), headers: {"Content-Type": "text/xml; charset=UTF-8"}, responseType: "xml", data: `\n                            <?xml version="1.0"?>\n                            <d:propertyupdate xmlns:d="DAV:">\n                                <d:set>\n                                    <d:prop>\n                                        <d:getlastmodified>${c}</d:getlastmodified>\n                                    </d:prop>\n                                </d:set>\n                            </d:propertyupdate>\n                        `}).then(e => {
            var t;
            const n = e.result;
            let r, s, o;
            n && (r = n.childNodes[0]) && (s = r.getElementsByTagNameNS("*", "status")[0]) && (o = null === (t = s.firstChild) || void 0 === t ? void 0 : t.nodeValue) && -1 != o.search(/HTTP\/[0-9.]+ 403/) && (l.warn("WebDAV: no way to set file modification date! This might cause redundant up and downloads."), u = true);
          }, () => (l.warn("WebDAV: no way to set file modification date! This might cause redundant up and downloads."), u = true, q.Pledge()));
        });
      }), delete: m(e => {
        const r = e.id || e;
        return w.request({method: "DELETE", url: n + Qo(t, r), headers: {"Content-Type": "text/xml; charset=UTF-8"}});
      }), watch: {start: () => {
        if (i) return;
        i = true;
        let e = null;
        const r = () => {
          if (c = void 0, i) if (false === e) {
            const e = o;
            b(n + t, {set_current_list: true}).then(() => {
              e && (Object.keys(e).forEach(t => {
                const n = o[t], r = e[t];
                n ? r.modifiedTime != n.modifiedTime && h.changes.notify({time: n.modifiedTime, name: n.name, id: n.id}) : h.changes.notify({time: Date.now(), name: r.name, id: r.id, removed: true});
              }), Object.keys(o).forEach(t => {
                if (!e[t]) {
                  const e = o[t];
                  h.changes.notify({time: e.modifiedTime, name: e.name, id: e.id});
                }
              }));
            }).fail(e => {
              l.warn("WebDAV: file changes check failed", e);
            }).always(() => {
              c = y(r, w.config.watch_interval);
            });
          } else {
            let s = 100;
            ((e, t) => {
              const n = {"Content-Type": "text/xml; charset=UTF-8", Depth: 1, Timeout: 90};
              return t && (n.Cursor = t), w.request({method: "SUBSCRIBE", url: e, headers: n, responseType: "xml", no_queue: true}).then(e => {
                const t = e.result;
                let n;
                return null === t ? q.Pledge({changes: [], cursor: a}) : (n = f(t)) && n.childNodes ? {changes: v(n), cursor: _(n)} : q.Breach();
              });
            })(n + t, a).then(e => {
              const t = e.changes;
              a = e.cursor, s = 1, t.forEach(e => {
                h.changes.notify({time: e.modifiedTime, name: e.name, id: e.id, removed: e.removed});
              });
            }, () => {
              if (null !== e) return s *= 2, d(s);
              e = false;
            }).always(r);
          }
        };
        m(() => i ? (r(), q.Pledge()) : q.Breach())();
      }, stop: () => {
        i = false, c && (x(c), c = void 0);
      }}, getRemoteUrl: e => {
        if (A) return n + Qo(t, e) + "?method=editor#bypass=true";
      }, getRemoteDomains: () => {
        var e;
        return [((null === (e = bn(n)) || void 0 === e ? void 0 : e.origin) || "").replace(/^.*:\/\//, "")];
      }});
      return w;
    }, Jo = {drive: () => {
      let e, t;
      (e = se.LOCALSTORAGE) && (t = parseInt(e.getItem("dropbox_poll_interval") || "")) || (t = 18e5);
      const n = Yo(Xo("drive")), r = Object.assign({}, n), s = "appDataFolder";
      let o, a;
      const i = Object.assign(n, {...n, config: {...n.config, redirect_uri: "https://auth.tampermonkey.net/oauth.php", refresh_supported: true, request_uri: "https://accounts.google.com/o/oauth2/v2/auth", client_id: "408438522028-3cgn3t3jas3fak7isbnfod1q4h15g2fv.apps.googleusercontent.com", storage_key: "gd_config", scope: "https://www.googleapis.com/auth/drive.appdata", response_type: "token", watch_interval: t}, request: e => r.request(e).then(e => e, t => {
        const n = (null == t ? void 0 : t.status) || -1;
        if (!t || [403, 500].includes(n)) return e.backoff = 2 * (e.backoff || 1e3), d(e.backoff).then(() => i.request(e));
        if ([400, 401].includes(n)) {
          if (l.warn("Google Drive: authentication error", t), delete i.credentials.access_token, !e.retry_auth) return e.retry_auth = true, i.oauth.run().then(() => i.request(e));
        } else if (404 == n) return q.Pledge(t);
        return i.error(t), q.Breach(t);
      }), list: r.wait(e => {
        let t = [];
        const n = q(), r = e => "https://www.googleapis.com/drive/v3/files?" + xn({spaces: s, pageToken: e, orderBy: "modifiedTime desc", fields: "nextPageToken, files(id, size, name, modifiedTime, md5Checksum)", pageSize: 500}), o = e => {
          i.request({method: "GET", url: e, headers: {"Content-Type": "application/json"}}).then(e => {
            const s = e.result, a = s ? JSON.parse(s) : {files: []};
            if (t = t.concat(a.files), a.nextPageToken) return o(r(a.nextPageToken));
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
        return i.request({method: "GET", url: "https://www.googleapis.com/drive/v3/files/" + t + "?" + xn({spaces: s, alt: "media"}), responseType: "arraybuffer"}).then(e => {
          const t = e.result;
          return new Blob([t]);
        });
      }), put: r.wait((e, t, n) => {
        const r = e, o = r.name || e, a = r.id, l = St();
        return q.Pledge().then(() => {
          if (t) return ht(t);
        }).then(e => {
          const t = n && n.lastModified ? new Date(n.lastModified).toISOString() : void 0, r = [];
          return r.push("--" + l), r.push("Content-Type: application/json"), r.push(""), r.push(JSON.stringify({name: o, parents: a ? void 0 : [s], modifiedTime: t})), r.push("--" + l), e && (r.push("Content-Type: application/octet-stream"), r.push("Content-Transfer-Encoding: base64"), r.push(""), r.push(at(e)), r.push("--" + l + "--")), r.push(""), i.request({method: a || !e ? "PATCH" : "POST", url: "https://www.googleapis.com/" + (e ? "upload/" : "") + "drive/v3/files" + (a ? "/" + a : "") + "?" + xn({uploadType: "multipart"}), headers: {"Content-Type": "multipart/related; boundary=" + l}, data: r.join("\r\n")});
        });
      }), delete: r.wait(e => {
        const t = e.id || e;
        return i.request({method: "DELETE", url: "https://www.googleapis.com/drive/v3/files/" + t + "?" + xn({spaces: s}), headers: {"Content-Type": " application/json"}});
      }), revoke: r.wait(() => {
        const e = i.credentials.access_token;
        return e ? r.request({method: "GET", url: "https://accounts.google.com/o/oauth2/revoke?" + xn({token: e})}).always(() => i.oauth.reset()) : q.Breach();
      }), compare: (e, t) => {
        const n = q();
        let r;
        return (r = e.md5) && r == ut(t, "utf-8") ? n.resolve(true) : n.resolve(false), n.promise();
      }, watch: {start: () => {
        if (o) return;
        let e;
        o = true;
        const t = () => {
          a = null, o && i.request({method: "GET", url: "https://www.googleapis.com/drive/v3/changes/?" + xn({pageToken: e, spaces: s, pageSize: 1e3, includeRemoved: true}), headers: {"Content-Type": " application/json"}}).then(t => {
            const n = t.result;
            if (!o) return q.Breach();
            const r = n ? JSON.parse(n) : {};
            if (!(e = r.newStartPageToken)) return l.warn("Google Drive: watch token error", n), i.watch.stop();
            r.nextPageToken && l.warn("Google Drive: too much changes", n), (r.changes || []).forEach(e => {
              let t;
              const n = e.file;
              "file" === e.type && n && (t = Date.parse(e.time), isNaN(t) && (t = Date.now()), i.changes.notify({id: n.id, time: t, name: n.name, removed: e.removed}));
            });
          }).fail(e => {
            l.warn("Google Drive: file changes check failed", e);
          }).always(() => {
            a = y(t, i.config.watch_interval);
          });
        };
        r.wait(() => o ? i.request({method: "GET", url: "https://www.googleapis.com/drive/v3/changes/startPageToken", headers: {"Content-Type": " application/json"}}).then(n => {
          const r = n.result, s = r ? JSON.parse(r) : {};
          if (!(e = s.startPageToken)) return l.warn("Google Drive: watch token error", r), i.watch.stop();
          t();
        }) : q.Breach())();
      }, stop: () => {
        o = false, a && (x(a), a = null);
      }}, getRemoteUrl: void 0});
      return i;
    }, dropbox: e => {
      const t = e.path || "", n = se.LOCALSTORAGE;
      let r;
      n && (r = parseInt(n.getItem("dropbox_poll_interval") || "")) || (r = 18e5);
      const s = Yo(Xo("dropbox")), o = Object.assign({}, s);
      let a, i, c, A, u = true;
      const p = e => {
        let n = [];
        const r = q(), s = e => {
          h.request({method: "POST", url: "https://api.dropboxapi.com/2/files/list_folder" + (e ? "/continue" : ""), headers: {"Content-Type": " application/json"}, data: {path: e ? void 0 : Qo(t), cursor: e}}).then(e => {
            const t = e.result, o = t ? JSON.parse(t) : {entries: []};
            if (n = n.concat(o.entries), o.has_more && o.cursor) return s(o.cursor);
            r.resolve({list: n, cursor: o.cursor});
          }).fail(r.reject);
        };
        return u ? (u = false, h.put(".version", new Blob([Ko])).then(() => {
          s(e);
        }).fail(r.reject)) : s(e), r.promise();
      }, h = Object.assign(s, {...s, config: {...s.config, redirect_uri: "https://auth.tampermonkey.net/oauth.php", request_uri: "https://www.dropbox.com/oauth2/authorize", client_id: "gq3auc9yym0e21y", storage_key: "db_config", response_type: "token", watch_interval: r ? Number(r) : 0}, request: e => o.request(e).then(e => e, t => {
        const n = (null == t ? void 0 : t.status) || -1;
        return !t || [500, 429].includes(n) ? (e.backoff = 2 * (e.backoff || 1e3), d(e.backoff).then(() => h.request(e))) : [401].includes(n) && (l.warn("Dropbox: authentication error", t), delete h.credentials.access_token, !e.retry_auth) ? (e.retry_auth = true, h.oauth.run().then(() => h.request(e))) : (h.error(t), q.Breach(t));
      }), list: o.wait(e => p().then(t => {
        const n = {};
        return i = t.cursor, t.list.map(t => {
          if (!e) {
            if (n[t.name]) return;
            n[t.name] = true;
          }
          return {name: t.name, size: t.size, dropbox_hash: t.content_hash, modified: new Date(t.client_modified).getTime(), precision: 1e3};
        }).filter(e => e);
      }).always(() => {
        a && i && (a(), a = null);
      })), get: o.wait(e => {
        const n = e.name || e;
        return h.request({method: "POST", url: "https://content.dropboxapi.com/2/files/download", headers: {"Dropbox-API-Arg": JSON.stringify({path: Qo(t, n)})}, responseType: "arraybuffer"}).then(e => {
          const t = e.result;
          return new Blob([t]);
        });
      }), put: o.wait((e, n, r) => {
        const s = e.name || e, o = r && r.lastModified ? (new Date(r.lastModified).toISOString().match(/[^:]*:[^:]*:[^:.a-zA_Z]*/) || "")[0] + "Z" : void 0;
        return h.request({method: "POST", url: "https://content.dropboxapi.com/2/files/upload", headers: {"Dropbox-API-Arg": JSON.stringify({path: Qo(t, s), client_modified: o, mode: "overwrite"}), "Content-Type": "application/octet-stream"}, data_type: "typified", data: {type: "raw", value: n}});
      }), delete: o.wait(e => {
        const n = e.name || e;
        return h.request({method: "POST", url: "https://api.dropboxapi.com/2/files/delete", headers: {"Content-Type": "application/json"}, data: {path: Qo(t, n)}});
      }), revoke: o.wait(() => h.credentials.access_token ? o.request({method: "POST", url: "https://api.dropboxapi.com/2/auth/token/revoke"}).always(() => h.oauth.reset()) : q.Breach()), compare: (e, t) => {
        const n = q(), r = 4194304, s = ct(t, {encoding: "utf-8"}), o = [], a = s.byteLength;
        let i = 1;
        const c = async () => {
          if (0 == --i) {
            let t = new ArrayBuffer(0);
            o.forEach(e => {
              e && (t = ((e, t) => {
                const n = new Uint8Array(e.byteLength + t.byteLength);
                return n.set(new Uint8Array(e), 0), n.set(new Uint8Array(t), e.byteLength), n.buffer;
              })(t, e));
            });
            const r = await At(t), s = No(r, "ASCII");
            n.resolve(s == e.dropbox_hash);
          }
        };
        for (let e = 0, t = 0; t < a; t += r, e++) (e => {
          o.push(null), i++, At(s.slice(t, t + Math.min(r, a - t))).then(t => {
            const n = No(t, "ASCII");
            o[e] = Ho(n), c();
          }, () => {
            l.warn("Dropbox: unable to calculate SHA-256 hashes"), n.reject();
          });
        })(e);
        return c(), n.promise();
      }, watch: {start: () => {
        if (c) return;
        c = true;
        let e = 0;
        const t = () => {
          if (A = null, e = 0, c) return i ? void h.request({method: "POST", url: "https://notify.dropboxapi.com/2/files/list_folder/longpoll", headers: {"Content-Type": " application/json"}, no_auth: true, no_queue: true, data: {cursor: i, timeout: 180}}).then(t => {
            const n = t.result;
            if (!c) return q.Breach();
            const r = n ? JSON.parse(n) : {};
            return r.backoff && (e = 1e3 * r.backoff), r.changes ? d(6e4).then(() => p(i)).then(e => (i = e.cursor) ? e.list : (l.warn("Dropbox: watch token error", n), h.watch.stop())) : null;
          }).then(e => {
            e && e.forEach(e => {
              let t;
              const n = e[".tag"];
              ["file", "deleted"].includes(n) && (t = Date.parse(e.server_modified), h.changes.notify({id: e.id, time: t, name: e.name, removed: "deleted" == n}));
            });
          }).fail(e => {
            l.warn("Dropbox: file changes check failed", e);
          }).always(() => {
            A = y(t, e + h.config.watch_interval);
          }) : (l.warn("Dropbox: watch token error", i), h.watch.stop());
        };
        o.wait(() => c ? (i ? t() : a = t, q.Pledge()) : q.Breach())();
      }, stop: () => {
        c = false, A && (x(A), A = null);
      }}, getRemoteDomains: () => ["dropbox.com", "dropboxapi.com"], getRemoteUrl: void 0});
      return h;
    }, onedrive: e => {
      const t = e.path || "";
      let n, r, s;
      (n = se.LOCALSTORAGE) && (r = parseInt(n.getItem("onedrive_poll_interval") || "")) || (r = 18e5);
      const o = Yo(Xo("onedrive")), a = Object.assign({}, o);
      let i, c;
      const A = e => {
        const n = q();
        let r = [];
        const o = a => {
          u.request({method: "GET", url: a || "https://api.onedrive.com/v1.0/drive/special/approot:" + Qo(t) + ":/children", headers: {"Content-Type": " application/json"}}).then(t => {
            const a = t.result, i = a ? JSON.parse(a) : {value: []};
            if (r = r.concat(i.value.map(e => {
              var t, n, r;
              const s = (null === (t = null == e ? void 0 : e.fileSystemInfo) || void 0 === t ? void 0 : t.lastModifiedDateTime) || 0, o = (null === (r = null === (n = null == e ? void 0 : e.file) || void 0 === n ? void 0 : n.hashes) || void 0 === r ? void 0 : r.sha1Hash) || void 0;
              return {id: e.id, name: e.name, size: e.size, sha1: o, modified: new Date(s).getTime()};
            })), i["@odata.nextLink"]) return o(i["@odata.nextLink"]);
            e.set_current_list && (s = r), n.resolve(r);
          }).fail(e => n.reject(e));
        };
        return o(), n.promise();
      }, u = Object.assign(o, {...o, config: {...o.config, redirect_uri: "https://auth.tampermonkey.net/oauth.php", request_uri: "https://login.live.com/oauth20_authorize.srf", client_id: "000000004C1A3122", storage_key: "od_config", response_type: "token", scope: "onedrive.appfolder", watch_interval: r}, request: e => a.request(e).then(e => e, t => {
        const n = (null == t ? void 0 : t.status) || -1;
        if (!t || [403, 500].includes(n)) return e.backoff = 2 * (e.backoff || 1e3), d(e.backoff).then(() => u.request(e));
        if ([401].includes(n)) {
          if (l.warn("OneDrive: authentication error", t), delete u.credentials.access_token, !e.retry_auth) return e.retry_auth = true, u.oauth.run().then(() => u.request(e));
        } else if (404 == n) return q.Pledge(t);
        return u.error(t), q.Breach(t);
      }), list: a.wait(() => A({set_current_list: true})), get: a.wait(e => {
        const n = e.name || e;
        return u.request({method: "GET", url: "https://api.onedrive.com/v1.0/drive/special/approot:" + Qo(t, Z(n)) + ":/content", responseType: "arraybuffer"}).then(e => {
          const t = e.result;
          return new Blob([t]);
        });
      }), put: a.wait((e, n, r) => {
        const s = e.name || e, o = Z(s.replace(/[#%<>:"|?*/\\]/g, "-"));
        return u.request({method: "PUT", url: "https://api.onedrive.com/v1.0/drive/special/approot:" + Qo(t, o) + ":/content", headers: {"Content-Type": "application/octet-stream"}, data_type: "typified", data: {type: "raw", value: n}}).then(e => {
          const t = r && r.lastModified ? new Date(r.lastModified).toISOString() : void 0;
          if (!t) return e;
          const n = e.result, s = JSON.parse(n);
          return u.request({method: "PATCH", url: "https://api.onedrive.com/v1.0/drive/items/" + s.id, headers: {"Content-Type": "application/json"}, data: JSON.stringify({fileSystemInfo: {lastModifiedDateTime: t}})});
        });
      }), delete: a.wait(e => {
        const n = e.name || e;
        return u.request({method: "DELETE", url: "https://api.onedrive.com/v1.0/drive/special/approot:" + Qo(t, Z(n))});
      }), watch: {start: () => {
        if (i) return;
        i = true;
        const e = () => {
          if (c = null, !i) return;
          const t = s;
          A({set_current_list: true}).then(() => {
            if (!t) return;
            const e = {}, n = {};
            s.forEach(t => {
              e[t.id] = t;
            }), t.forEach(e => {
              n[e.id] = e;
            }), Object.keys(n).forEach(t => {
              const r = e[t], s = n[t];
              r ? s.modified != r.modified && u.changes.notify({time: r.modified, name: r.name}) : u.changes.notify({time: Date.now(), name: s.name, removed: true});
            }), Object.keys(e).forEach(t => {
              if (!n[t]) {
                const n = e[t];
                u.changes.notify({time: n.modified, name: n.name});
              }
            });
          }).fail(e => {
            l.warn("OneDrive: file changes check failed", e);
          }).always(() => {
            c = y(e, u.config.watch_interval);
          });
        };
        a.wait(() => i ? (e(), q.Pledge()) : q.Breach())();
      }, stop: () => {
        i = false, c && (x(c), c = null);
      }}, getRemoteDomains: () => ["onedrive.live.com"], getRemoteUrl: void 0});
      return u;
    }, yandex: () => {
      let e, t;
      (e = se.LOCALSTORAGE) && (t = parseInt(e.getItem("yandex_poll_interval") || "")) || (t = 18e5);
      const n = Yo(Xo("yandex")), r = Wo(n), s = Object.assign({}, r);
      let o;
      const a = Object.assign(r, {...n, ...r, config: {...r.config, root: "/Programs/Tampermonkey", url: "https://webdav.yandex.ru", redirect_uri: "https://auth.tampermonkey.net/oauth.php", refresh_supported: true, request_uri: "https://oauth.yandex.com/authorize", client_id: "a591fcd2ccd248f0baa84222898065f4", storage_key: "ya_config", response_type: "token", auth_prefix: "OAuth", watch_interval: t}, init: () => {
        if (o) return o;
        const e = q();
        return o = e.promise(), a.request({method: "GET", url: "https://cloud-api.yandex.net/v1/disk/"}).done(e => {
          const t = e.result, n = t ? JSON.parse(t) : {};
          n.total_space && n.used_space && (n.used_space + 5e7 > n.total_space ? l.warn("Yandex: low disk space warning, only " + (n.total_space - n.used_space) + " bytes available") : l.log("Yandex: " + (n.total_space - n.used_space) + " bytes on disk available!"));
        }).always(() => {
          e.consume(s.init());
        }), o;
      }, getRemoteDomains: () => ["disk.yandex.com"], getRemoteUrl: void 0, list: e => s.list(e).then(e => e.map(e => (e.md5 = e.etag, e))), request: e => (() => {
        const t = e.headers = e.headers || {};
        if (t["X-Requested-With"] = "XMLHttpRequest", "PUT" == e.method && e.data && "raw" == e.data.type && e.data.value) {
          const n = q();
          return ht(e.data.value).then(e => {
            t.Etag = ut(e), t.Sha256 = No(e, "ASCII");
          }).always(n.resolve), n.promise();
        }
        return q.Pledge();
      })().then(() => s.request(e)).then(e => e, t => {
        const n = (null == t ? void 0 : t.status) || -1;
        return [401].includes(n) && (l.warn("Yandex: authentication error", t), delete a.credentials.access_token, !e.retry_auth) ? (e.retry_auth = true, a.oauth.run().then(() => s.request(e))) : t;
      }), compare: (e, t) => {
        const n = q();
        let r;
        return (r = e.md5) && r == ut(t, "utf-8") ? n.resolve(true) : n.resolve(false), n.promise();
      }});
      return a;
    }, webdav: e => {
      let t, n;
      (t = se.LOCALSTORAGE) && (n = parseInt(t.getItem("webdav_poll_interval") || "")) || (n = 18e5);
      const r = e.url;
      if (r) {
        const t = r.toLowerCase();
        t.startsWith("webdav") ? e.url = r.replace(/^webdav/i, "http") : t.startsWith("http") || (e.url = `http://${r}`);
      }
      const s = Wo((e => {
        const t = Object.assign({}, e), n = t.type;
        if (void 0 === n) throw new Error("Internal error");
        const r = Object.assign(e, {...t, config: {...t.config}, credentials: {}, request: e => r.credentials.basic_auth ? (e.no_auth || (e.headers = e.headers || {}, e.headers.Authorization = "Basic " + r.credentials.basic_auth), t.request(e)) : q.Breach("Authentication failed"), wait: e => t.wait((...t) => e(...t))});
        let s;
        return Object.defineProperty(r, "credentials", {get: () => (void 0 === s && (Ss.tC(n, "init"), s = {basic_auth: r.config.basic_auth}), s), set: e => {
          s = e;
        }, enumerable: false}), r;
      })(Xo("webdav")));
      return Object.assign(s, {...s, config: {...s.config, root: "Tampermonkey", watch_interval: n, ...e}});
    }};
    let Ko;
    const $o = "PageFilter", ea = e => {
      let t = false, n = false;
      const r = (ml() || []).map(e => `*://${e}/*`), s = Xr.values.forbiddenPages.concat(r), o = s.length > 0, a = Xr.values.page_whitelist.length > 0;
      switch (Xr.values.page_filter_mode) {
        case "black":
          n = o;
          break;
        case "off":
          break;
        case "white":
          t = a;
          break;
        default:
          t = a, n = o;
      }
      let i = Oo.get($o);
      return i || (i = Uo({inc: t ? Xr.values.page_whitelist : void 0, exc: n ? s : void 0}), Oo.set($o, i)), !n && !t || To(e, i);
    }, ta = () => {
      const e = rt.getValue(ee.STORAGE.UPDATE, {}) || {};
      let {scripts: t, black: n} = e;
      return null == n && (n = Object.assign({}, {version: 0, last: 0})), null == t && (t = 0), {black: n, scripts: t};
    }, na = function (e) {
      e && rt.setValue(ee.STORAGE.UPDATE, e);
    }, ra = "https://blacklist.tampermonkey.net/get.php", sa = se.LOCALSTORAGE, oa = (e, t) => {
      let n = false;
      if (t.length) {
        if ("/" == t.substr(0, 1)) {
          const r = Io(t);
          if (!r) return;
          n = Zo(e, r);
        } else n = -1 != e.indexOf(t);
        return n && l.log('black: entry "' + t + '" matched'), n;
      }
    }, aa = "broadcast", ia = e => {
      if (dr.removeAll(aa), e && e.description) {
        let {name: t, name_i18n: n, description: r, description_i18n: s, expires: o, exclude: a, timeout: i, ...l} = e;
        if (o) {
          const e = Date.now();
          if (!(o > e)) return;
          i = o - e;
        }
        if (a && a.includes(Ae.short_id)) return;
        t = t || zn.getMessage("Info"), i = i || 864e5;
        const c = {name: t, description: r, name_i18n: n || null, description_i18n: s || null, timeout: i, ...l};
        dr.all("status", {key: aa, class: c.class || "information", title: zn.getTranslation(c, "name"), text: zn.getTranslation(c, "description"), timeout: i});
      }
    }, la = {SEVERITY_MAX: 10, SEVERITY_MANUALLY_DEFINED: 11, SEVERITY_FOISTED_SCRIPT: 12, init: () => {
      const e = q(), t = () => {
        if ("server" === Xr.values.script_blacklist_type && y(la.checkUpdate, 2e4), sa) try {
          const e = sa.getItem(aa);
          e && ia(JSON.parse(e));
        } catch (e) {
          l.error(e);
        }
      };
      return t(), Xr.addChangeListener("script_blacklist_type", t), e.resolve(), e.promise();
    }, getWarningsFor: e => {
      const t = [];
      return e && wt(Xr.values.script_blacklist_server, n => {
        if (!n) return;
        const {rules: r, reasons: s, reason: o, exclude: a} = n;
        if (a && a.includes(Ae.short_id)) return;
        let i = false;
        if (wt(r, t => (i = i || !!oa(e, t), 1 != i)), i) if (s) {
          const e = zn.getBestLocale(Object.keys(s));
          t.push(s[e || "en"]);
        } else o && t.push(o);
      }), t;
    }, getEvilnessOf: e => {
      if ("off" === Xr.values.script_blacklist_type) return 0;
      if (!e) return 0;
      let t = false, n = 0;
      return wt(Xr.values.require_blacklist, n => (t = t || !!oa(e, n), 1 != t)), t ? n = la.SEVERITY_MANUALLY_DEFINED : "server" === Xr.values.script_blacklist_type && wt(Xr.values.script_blacklist_server, r => {
        if (!r) return;
        const {rules: s, severity: o, exclude: a} = r;
        return a && a.includes(Ae.short_id) ? void 0 : (wt(s, n => (t = t || !!oa(e, n), 1 != t)), t ? (n = o, false) : void 0);
      }), Number(n);
    }, checkUpdate: e => {
      const t = q();
      let n, r = ta();
      if (e || Date.now() - r.black.last > 864e5) {
        const s = (e, t) => {
          const n = q(), r = {method: "GET", url: e, nocache: t, retries: re.RETRIES, overrideMimeType: "text/plain; charset=x-user-defined"};
          return xr.internal(r, {ondone: e => n.resolve(e)}), n.promise();
        };
        s(ra + "?version=get").then(t => {
          if (4 == t.readyState && 200 == t.status) {
            try {
              const e = JSON.parse(t.responseText);
              n = e.version;
            } catch (e) {
              l.warn("black: unable to parse version response! " + t.responseText);
            }
            if (l.info("black: local version: " + r.black.version + " remote: " + n), n > r.black.version || e) return s(ra, true);
          }
        }).then(e => {
          if (e && 4 == e.readyState && 200 == e.status) try {
            const t = JSON.parse(e.responseText);
            if (t && t.blacklist && 1 == t.version) {
              Xr.values.script_blacklist_server = t.blacklist;
              const e = t.broadcast;
              if (sa) try {
                e ? sa.setItem(aa, JSON.stringify(e)) : sa.removeItem(aa);
              } catch (e) {
                l.error(e);
              }
              ia(e);
            }
            l.info("black: updated blacklist to ", t);
          } catch (t) {
            l.warn("black: blacklist update failed! ", e.responseText);
          }
        }).always(() => {
          r = ta(), r.black.last = Date.now(), r.black.version = n || r.black.version, na(r), t.resolve();
        });
      } else t.resolve();
      return t.promise();
    }}, ca = la, Aa = ["md5", "sha256", "sha1", "sha384", "sha512"], ua = (() => {
      const e = e => {
        const t = [], n = new DataView(e);
        for (let e = 0; e < n.byteLength; e += 4) {
          const r = "00000000", s = (r + n.getUint32(e).toString(16)).slice(-r.length);
          t.push(s);
        }
        return t.join("");
      }, t = t => {
        try {
          return e(ct(it(t)));
        } catch (e) {
          return null;
        }
      }, n = {md5: (e, t) => q.Pledge(ut(e, t)), sha256: (e, t) => q.Pledge(No(e, t))}, r = {};
      ["SHA-1", "SHA-384", "SHA-512"].forEach(t => {
        const n = t.toLowerCase().replace("-", "");
        r[n] = () => {
          const n = (n, r) => {
            const s = q();
            return N.subtle.digest(t, ct(n, {encoding: r})).then(t => {
              s.resolve(e(t));
            }, () => {
              s.reject();
            }), s.promise();
          };
          try {
            return n("").then(e => e && e.substr(0, 4).toLowerCase().match(/[0-9a-f]{4,4}/) ? n : q.Breach());
          } catch (e) {
            return q.Breach();
          }
        };
      });
      const s = e => Object.keys(n).includes(e), o = e => (...t) => {
        if (false !== a) {
          const n = q();
          return a.push(() => n.consume(e(...t))), n.promise();
        }
        return e(...t);
      };
      let a = [];
      const i = {init: () => (l.get() >= 60 && Object.keys(n).forEach(e => l.log("sri:", e, "is supported")), q.sidebyside(Object.keys(r).map(e => r[e]().done(t => {
        l.log("sri:", e, "is supported"), n[e] = t;
      }).fail(() => {
        l.log("sri:", e, "is unsupported");
      }))).always(() => {
        if (false === a) return;
        const e = a;
        a = false, e.forEach(e => e());
      })), isSupported: o(e => q.Pledge(s(e))), getHash: o((e, n) => {
        const r = q(), o = "string" == typeof e ? bn(e) : e;
        if (o && o.hash) {
          let e;
          const a = o.hash.replace(/^#/, "").split(/,|;/g);
          for (let n = 0; n < a.length; n++) {
            const r = a[n].match(/([^=|:|-]+)[=|:|-](.+)/);
            if (!r || 3 != r.length || !s(r[1])) continue;
            let o = r[2];
            /^[0-9a-fA-F]+$/.exec(o) || (o = t(I(o)) || o);
            const i = r[1];
            Aa.includes(i) && (e = {type: i, value: o});
          }
          r.resolve(e || (n ? e : {type: "unsupported", value: ""}));
        } else r.resolve();
        return r.promise();
      }), check: o((e, t, r) => t && e && s(e.type) ? n[e.type](t, r).then(t => t === e.value ? q.Pledge(true) : q.Breach({type: e.type, value: t})) : q.Breach())};
      return i;
    })(), da = ua, pa = {content: "", error: void 0, forbidden: void 0, sri: void 0, determined: void 0, meta: void 0, name: void 0, blacklisted: void 0}, ha = (e, t) => ee.PREFIX.EXTERNAL + [e, t ? ut(t) : null].filter(e => e).join(":"), fa = {list: e => {
      const t = new RegExp("^" + e);
      return rt.listValues().filter(e => -1 != e.search(t));
    }, set: (e, t, n, r) => {
      const s = ha(e, t), {content: o, meta: a, name: i, forbidden: l, blacklisted: c, error: A, determined: u, sri: d} = n, p = {base: ft(o), meta: a, name: i, forbidden: l, blacklisted: c, error: A, determined: u, sri: d}, h = {ts: Date.now(), url: t, resource: p, modified: r};
      rt.setValue(s, h);
    }, get: (e, t) => {
      const n = ha(e, t), r = rt.getValue(n);
      let s;
      if (r && r.resource) {
        const {resource: e, ts: t, url: n, modified: o} = r, {base: a, meta: i, name: l, forbidden: c, blacklisted: A, error: u, determined: d, sri: p} = e;
        s = {ts: t, url: n, data: {content: mt(a), meta: i, name: l, forbidden: c, blacklisted: A, error: u, determined: d, sri: p}, modified: o};
      }
      return s;
    }, clean: (e, t) => {
      const n = ha(e, t);
      rt.deleteValue(n);
    }, cleanAll: (e, t) => {
      let n;
      const r = fa.list(ha(e));
      if (t) {
        const s = {};
        wt(t, t => {
          const n = ha(e, t);
          s[n] = true;
        }), n = [], wt(r, e => {
          s[e] || n.push(e);
        });
      } else n = r;
      n.forEach(e => {
        rt.deleteValue(e);
      });
    }}, ma = Rt(9e3), ga = (e, t, n, r) => {
      const s = q(), o = false;
      let a;
      return ((e, t) => {
        const n = q(), r = r => {
          let s, o = "";
          if (4 != r.readyState || 200 != r.status && 0 != r.status || r.error) {
            const e = {...pa, content: o, meta: s};
            n.reject(e);
          } else {
            let a, i;
            const l = qt(r.responseHeaders)["content-type"];
            l && l.match(/^\s*(image\/|text\/)([+-.a-zA-Z0-9]+)\s*$/) && (a = l.trim()), a || ((i = e.match(/.*\.(ico|jpg|jpeg)+($|\?|#).*/)) ? a = "image/x-icon" : (i = e.match(/.*\.(gif|png)+($|\?|#).*/)) ? a = "image/" + i[1] : -1 != e.search(/.*\.(js)+($|\?|#).*/) ? a = "text/javascript" : (i = e.match(/.*\.(css|html|xml)+($|\?|#).*/)) ? a = "text/" + i[1] : (e => {
              const t = "background.js";
              let n = ue.getURL(t);
              return n = n.replace(t, "") + "images/", e.length >= n.length && n == e.substr(0, n.length);
            })(e) && (a = "image/x-icon")), s = a, o = lt(r.response, t.encoding) || "";
            const c = {...pa, content: o, meta: s};
            n.resolve(c);
          }
        }, s = ({error: e}) => {
          n.reject({...pa, error: e});
        }, o = bn(e);
        if (o) if (["file:"].concat(oe.INTERNAL_PAGE_PROTOCOLS).includes(o.protocol)) if ("file:" != o.protocol || te.ALLOWS_FILE_SCHEME_ACCESS && ["externals", "all"].includes(Xr.values.script_file_access)) Ze(e, e => {
          r({readyState: 4, status: 0, response: e, statusText: "", responseHeaders: ""});
        }, e => {
          s({error: e});
        }); else {
          const t = "Access to this or all local files is forbidden!";
          l.warn("externals:", t, "Loading the following @resource failed:", e, "-> more info:", "https://www.tampermonkey.net/faq.php#Q204"), s({error: t});
        } else {
          const t = {method: "GET", url: e, retries: re.RETRIES, nocache: false, responseType: "arraybuffer"};
          t.timeout = Xr.values.require_timeout, xr.internal(t, {onload: r, onerror: e => s({error: e.responseText || e.statusText || "unknown error"}), ontimeout: () => s({error: "timed out"})});
        } else s({error: "unable to parse url"});
        return n.promise();
      })(t, {encoding: r.encoding}).done(i => {
        n && (i.sri = n);
        const l = n => {
          const r = bn(t);
          r && r.protocol && !["file:"].concat(oe.INTERNAL_PAGE_PROTOCOLS).includes(r.protocol) && fa.set(e, t, n);
        };
        n && ["supported", "given"].includes(Xr.values.require_sri_mode) ? da.check(n, i.content, r.encoding).done(() => {
          a = i, l(a), s.resolve({sync: o, resource: a});
        }).fail(e => {
          a = {...pa, forbidden: true, sri: {mode: Xr.values.require_sri_mode, type: n.type, value: "invalid"}, determined: e}, l(a), s.reject({sync: o, resource: a});
        }) : (a = i, l(a), s.resolve({sync: o, resource: a}));
      }).fail(n => {
        l.log("externals: get.failed", e, t, n), a = {...pa, error: n.error || "internal error"}, s.reject({sync: o, resource: a});
      }), s.promise();
    }, va = (e, t, n) => {
      const r = q(), s = bn(t), o = n.sync;
      let a, i;
      return t && s ? ca.getEvilnessOf(t) >= Xr.values.script_blacklist_severity ? (a = {...pa, blacklisted: true}, r.reject({sync: o, resource: a})) : da.getHash(s, "supported" == Xr.values.require_sri_mode).done(c => {
        if ("enforce" != Xr.values.require_sri_mode || c) if ("file:" !== s.protocol && (i = fa.get(e, t))) {
          const s = ha(e, t), A = Date.now();
          Xr.values.external_update_interval > 0 && A - i.ts > Xr.values.external_update_interval && (ma.is(s) || (Xr.values.external_update_interval > 1 && ma.add(s), i.modified ? l.log("externals: resource is not updated due to user modifications", t, new Date(i.ts).toISOString(), new Date(A).toISOString()) : (l.log("externals: resource needs update", t, new Date(i.ts).toISOString(), new Date(A).toISOString()), y(() => {
            ga(e, t, c, n);
          }, 3e3)))), a = i.data, a.forbidden || a.blacklisted ? r.reject({sync: o, resource: a}) : r.resolve({sync: o, resource: a});
        } else r.consume(ga(e, t, c, n)); else a = {...pa, forbidden: true, sri: {mode: Xr.values.require_sri_mode, type: "unsupported", value: ""}}, r.reject({sync: o, resource: a});
      }) : (a = {...pa, forbidden: true}, r.reject({sync: o, resource: a})), r.promise();
    }, _a = {setElement: (e, t, n, r) => fa.set(e, t, n, r), getElement: (e, t) => fa.get(e, t), cleanElement: (e, t) => fa.clean(e, t), dropAll: e => (fa.cleanAll(e), q.Pledge()), dropAllBut: (e, t) => (fa.cleanAll(e, t), q.Pledge()), loadResources: (e, t) => {
      const n = q();
      return _a.getResources(e, t).always(() => {
        n.resolve();
      }), n.promise();
    }, loadRequires: (e, t) => {
      const n = q();
      return _a.getRequires(e, t).always(() => {
        n.resolve();
      }), n.promise();
    }, getResources: (e, t) => {
      const n = q(), r = [], s = [], o = {sync: true};
      return t.forEach(t => {
        const n = t.url || t.unsafe_url && _n(t.unsafe_url, t.abs_url) || "", a = t.name;
        let i, c, A;
        const u = q();
        va(e, n, o).done(e => {
          const t = e.resource;
          i = t.content, c = t.meta || "application";
        }).fail(e => {
          if (e.resource) {
            const {forbidden: n, sri: r, blacklisted: s, error: o} = e.resource;
            n ? A = r ? `can't load @resource '${t.name}' from URL '${t.unsafe_url}' due to a SRI error` : `can't load @resource '${t.name}' from forbidden URL '${t.unsafe_url}'` : s ? A = `can't load @resource '${t.name}' from blacklisted URL '${t.unsafe_url}'` : o && (A = `can't load @resource '${t.name}' from URL '${t.unsafe_url}': ${o}`);
          }
          A || (A = `can't load @resource '${t.name}' from URL '${t.unsafe_url}'`), l.warn("externals: " + A);
        }).always(e => {
          o.sync = o.sync && (!e || e.sync), r.push({name: a, url: n, error: A, content: i, meta: c}), u.resolve();
        }), s.push(u.promise());
      }), q.when(s).always(() => {
        n.resolve({elements: r, sync: o.sync});
      }), n.promise();
    }, getRequires: (e, t) => {
      const n = [], r = q(), s = [], o = {encoding: "UTF-8", sync: true};
      return t.forEach((t, r) => {
        const a = t.url || t.unsafe_url && _n(t.unsafe_url, t.abs_url) || "";
        let i = "";
        const c = q();
        va(e, a, o).done(e => {
          i = e.resource.content || "";
        }).fail(e => {
          let n;
          if (e.resource) {
            const {forbidden: r, sri: s, blacklisted: o, error: a} = e.resource;
            r ? n = s ? `couldn't load @require from URL '${t.unsafe_url}' due to a SRI error` : `couldn't load @require from forbidden URL '${t.unsafe_url}'` : o ? n = `couldn't load @require from blacklisted URL '${t.unsafe_url}'` : a && (n = `couldn't load @require from URL '${t.unsafe_url}': ${a}`);
          }
          n || (n = `couldn't load @require from URL '${t.unsafe_url}'`), i = (e => 'console.warn("@require: " + decodeURIComponent("' + Z(e) + '"));')(n) + "\n", l.warn("externals: " + n);
        }).always(e => {
          o.sync = o.sync && (!e || e.sync), n[r] = {textContent: i}, c.resolve();
        }), s.push(c.promise());
      }), q.when(s).always(() => {
        r.resolve({elements: n.filter(e => e), sync: o.sync});
      }), r.promise();
    }}, ba = _a;
    let wa, ka;
    const ya = {}, Ra = e => e && e.includes("*"), xa = () => {
      const e = e => {
        for (let t = 0; t < Sa.length; t++) if (Sa[t].tabId === e) return Sa.splice(t, 1)[0];
        return Sa.pop();
      };
      let t;
      Mo().then(n => {
        for (; !Ea && (t = e(n.id));) t.fn();
      });
    };
    let Ea, Sa = [];
    const Ga = (e, t, n, r) => {
      const s = ((e, t) => {
        const n = e => e ? e.map(e => {
          let n = e;
          if (n.match(/^'?self'?$/)) {
            const e = bn(t.url);
            n = (null == e ? void 0 : e.hostname) || null;
          } else if ("'none'" == n) n = "none"; else {
            if (["none", "localhost", "*"].includes(n)) return n;
            if (gn(n)) return n;
            if (0 === n.indexOf(".")) return null;
            if (1 === (n.match(/\./g) || []).length && vn(n)) return null;
          }
          return n;
        }).filter(e => e) : [];
        return {connects: e.options.override.merge_connects && "paranoid" != Xr.values.connect_mode ? n(e.connects) : [], userconnects: n(e.options.override.use_connects), blockers: n(e.options.override.use_blockers)};
      })(e, t), o = (e => {
        const t = q();
        return ea(e) ? t.resolve({allowed: true}) : t.resolve({allowed: false}), t.promise();
      })(n).then(r => {
        if (true !== r.allowed) return q.Breach("URL is blacklisted");
        let o, a;
        return (o = bn(n)) && o.origin && (a = bn(t.url)) && a.origin && o.origin === a.origin ? q.Pledge({permitted: true}) : ((e, t, n) => {
          const r = q(), s = () => {
            r.resolve({permitted: true});
          }, o = e => {
            r.resolve({permitted: false, reason: e});
          }, a = () => {
            r.resolve({unknown: true});
          };
          let i, l;
          const c = e => Ra(e) ? s : null, A = (e, t) => {
            let n = null;
            const r = gn(e);
            return t.every(({a: t, blocker: a}) => {
              if (!t) return true;
              for (const i of t) if (i && (r || gn(i) ? i === e : -1 != e.search(new RegExp("(^|.+\\.)" + _t(i) + "$")))) return n = a ? o : s, false;
              return true;
            }), n;
          };
          return "off" == Xr.values.connect_mode || n.startsWith("data:") || n.startsWith("blob:") ? s() : (i = bn(n)) && i.hostname ? (l = A(i.hostname, [{a: ya[e.uuid]}])) || (l = c(ya[e.uuid])) ? l() : 0 === t.connects.length && 0 === t.userconnects.length && 0 === t.blockers.length ? "casual" == Xr.values.connect_mode ? s() : "strict" == Xr.values.connect_mode ? o("No @connects given, but strict mode enabled") : a() : t.connects.includes("none") ? o("None value found") : ("casual" == Xr.values.connect_mode && !Ra(t.blockers) && (l = c(t.connects)) || (l = c(t.userconnects)) || (l = A(i.hostname, [{a: t.blockers, blocker: true}, {a: t.connects}, {a: t.userconnects}]) || a), l()) : o("URL can not be parsed"), r.promise();
        })(e, s, n);
      }).then(o => {
        var a;
        if (false === o.permitted) return q.Breach("URL is not permitted" + (o.reason ? ": " + o.reason : ""));
        if (true === o.permitted) return q.Pledge();
        if (0 === s.connects.length || Ra(s.connects)) {
          if (["ask", "paranoid"].includes(Xr.values.connect_mode)) {
            if (Ra(s.blockers)) return q.Breach("URL was permanently blocked by the user");
            if (Ea) {
              l.log('cor: queuing access permission check from "' + e.name + '" to', n, t);
              const s = q();
              return Sa.push({tabId: null === (a = null == t ? void 0 : t.tab) || void 0 === a ? void 0 : a.id, fn: () => {
                s.consume(Ga.apply(void 0, [e, t, n, r]));
              }}), s.promise();
            }
            return ((e, t, n, r, s) => {
              const o = q(), a = () => {
                o.resolve({approved: true});
              }, i = () => {
                o.resolve({forbidden: true});
              };
              l.log('cor: "' + e.name + '" is asking for permission to access', r, t);
              const c = bn(r);
              if (c && c.hostname) {
                const o = (e => {
                  if (gn(e)) return;
                  const t = e.split(".");
                  if (t.length < 3) return e;
                  const n = vn(t.slice(-2).join(".")) ? -3 : -2;
                  return t.slice(n).join(".");
                })(c.hostname), A = t.tab ? t.tab.id : null;
                Ea = true, Mo().then(a => Kn.askForConnect({src_url: t.url, hostname: c.hostname, domain: o, all_domains: Ra(n.connects), tabid: A, active: A === a.id, timeout: s, url: r, settings_url: pe.getURL("options.html") + "#nav=" + e.uuid + "+settings", connect_url: "https://www.tampermonkey.net/documentation.php#_connect", script: {name: zn.getTranslation(e, "name"), uuid: e.uuid, icon: e.icon64 || e.icon || oo("unknown")}})).done(({message: t}) => {
                  let n;
                  if (!t) return l.log("cor: unexpected response", t), void i();
                  const r = t.whole_domain ? o : c.hostname;
                  if (!r) return l.log("cor: internal error", t, o), void i();
                  t.allow ? t.once ? (l.log('cor: allowing "' + e.name + '" to access', r, "once"), a()) : t.temporary ? (l.log('cor: allowing "' + e.name + '" to access', r, "temporarily"), void 0 === ya[e.uuid] && (ya[e.uuid] = []), ya[e.uuid].includes(r) || ya[e.uuid].push(r), a()) : (n = a, t.all_domains ? (l.log('cor: allowing "' + e.name + '" to access all domains always'), e.options.override.use_connects.push("*")) : (l.log('cor: allowing "' + e.name + '" to access', r, "always"), e.options.override.use_connects.push(r), n = a)) : t.once || t.aborted ? (l.log('cor: denying "' + e.name + '" to access', r, "once"), i()) : (e.options.override.use_blockers || (e.options.override.use_blockers = []), n = i, t.all_domains ? (l.log('cor: denying "' + e.name + '" to access any domains (additional) domain'), e.options.override.use_blockers.push("*")) : (l.log('cor: denying "' + e.name + '" to access', r, "always"), e.options.override.use_blockers.push(r))), n && wa(e.uuid, e, false).always(n);
                }).fail(i).always(() => {
                  Ea = false, Sa.length && y(xa, 1);
                });
              } else i();
              return o.promise();
            })(e, t, s, n, r).then(e => true === e.approved ? q.Pledge() : q.Breach("Request was blocked by the user"));
          }
          return q.Breach();
        }
        return q.Breach("URL is not a part of the @connect list");
      });
      return o;
    }, Ca = {getSessionConnects: e => ya[e] || [], setSessionConnects: (e, t) => {
      ya[e] = t || [];
    }, purgeAppeals: e => {
      Sa = Sa.filter(t => t.tabId !== e);
    }, exec: (e, t, n, r, s) => {
      let o, a, i, c, A, u, d, p = e.url;
      const h = [], f = Math.max(Math.min(e.timeout || 0, 6e4), 2e4), m = () => {
        let e;
        for (; !d && (e = h.shift());) e();
      }, g = (t, n) => {
        const r = 'Refused to connect to "' + (n || e.url) + '": ' + (t || "Blocked by @connect CORS check"), o = Nt(r);
        ["onerror", "ondone"].forEach(e => {
          const t = s[e];
          t && t({response: o, exception: r});
        });
      };
      if (n && n.url && n.tab && e.url && t && (a = ka(t)) && ({script: i, cond: c} = a) && i && c && !i.deleted) return Ga(i, n, e.url, f).done(() => {
        if (u) return;
        const t = {};
        for (const [e, r] of Object.entries(s)) {
          if (!r) continue;
          const s = (e, ...t) => {
            if (A) return;
            if (d) return void h.push(() => s(e, ...t));
            const a = e;
            (a && a.finalUrl && p !== a.finalUrl ? (d = true, Ga(i, n, a.finalUrl, f).fail(() => {
              u || A || (o && o.abort(), A = true, g("Request was redirected to a not whitelisted URL", a.finalUrl), l.warn("cor: request to", p, "was redirect to a not whitelisted URL", a.finalUrl));
            }).always(() => {
              p = a.finalUrl, d = false, h.length && y(m, 1);
            })) : q.Pledge()).always(() => {
              A || r({response: a});
            });
          };
          t[e] = s;
        }
        o = xr.external(e, t, r);
      }).fail(e => {
        u || (g(e), l.warn("cor: access to", p, "was denied"));
      }).always(() => {
        if (u) {
          const e = {response: Nt("aborted"), exception: "Aborted by user"};
          s.onabort && s.onabort(e), s.ondone && s.ondone(e);
        }
      }), {abort: () => {
        o ? o.abort() : u = true;
      }};
      g();
    }}, Ma = Ca, Ia = {DEFAULT: "default", OFF: "off", NATIVE: "native", CHROME: "chrome", NOT_ENABLED: "not_enabled", NOT_WHITELISTED: "not_whitelisted", NOT_PERMITTED: "not_permitted", NOT_SUPPORTED: "not_supported", NOT_SUCCEEDED: "not_succeeded"};
    let Za, Ua = Ia.OFF, Ta = [], Ba = false;
    const Oa = {};
    let Fa = false;
    const ja = g({threads: 3}), La = g({threads: 6});
    let Pa = () => {
      const e = q();
      return (t => {
        const n = "string" == typeof t ? [t] : t, r = () => {
          n.every(e => !!Cn[e]) ? (Pa = q.Pledge, e.resolve()) : En.push(r);
        };
        n.forEach(e => {
          if (void 0 === Cn[e] && void 0 === Sn[e]) {
            const t = y(() => {
              Gn[e] || (delete Sn[e], (e => {
                Gn[e] = true;
              })(e), ((e, t) => {
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
                      t || l.warn("registry: self.load " + e + " failed! "), r();
                    });
                  } catch (t) {
                    l.warn("registry: self.load " + e + " failed! ", t), r();
                  }
                }), r();
              })(ue.getURL(e + ".js"), () => {
                (e => {
                  if (!Cn[e]) {
                    let t;
                    Cn[e] = true, delete Gn[e], (t = Sn[e]) && t(), (() => {
                      const e = En;
                      En = [];
                      for (const t of e) t();
                    })();
                  }
                })(e);
              }));
            }, 0);
            Sn[e] = () => {
              x(t), delete Sn[e];
            };
          }
        }), r();
      })(["vendor/saveas/filesaver"]), e.promise();
    };
    const Da = () => void 0 !== Za ? q.Pledge(Za) : ar.has(ar.permDownloads).then(e => (Za = e, l.log("downs: permission to use downloads ->", e), Da())), Va = (e, t, n) => {
      const r = e[t];
      r && (r("function" == typeof n ? n() : n), delete e[t]);
    };
    let Na = 0;
    const za = (e, t, n) => {
      const r = q();
      let s;
      Qa();
      let {name: o, url: a, method: i, saveAs: c, data: A, headers: u, conflictAction: d} = e;
      d && !{uniquify: true, prompt: true, overwrite: true}[d] && (d = "uniquify"), s = {filename: o, url: a, method: i, saveAs: c, ...d ? {conflictAction: d} : {}, body: A}, u && (Array.isArray(u) ? l.warn("downs: invalid type of headers property", u) : s.headers = Object.entries(u).map(([e, t]) => ({name: e, value: t})));
      const p = Oa[t.download_id] = {download_id: t.download_id, callbacks: {onprogress: n.onprogress, onload: e => {
        r.resolve(), h("onload", e);
      }, onerror: e => {
        r.reject(e), h("onerror", e);
      }}, url: e.url, name: e.name}, h = (e, t) => Va(n, e, t);
      if (function (e, t) {
        try {
          ie.downloads.download(e, t);
        } catch (e) {
          t(void 0, e.message);
        }
      }(s, (e, t) => {
        if (void 0 === e) return r.reject(t), void h("onerror", {error: t});
        p.browser_download_id = e;
        const n = t => {
          !function (e, t) {
            ie.downloads.cancel(e, t);
          }(e, () => {
            s(), t && t();
          });
        }, s = () => {
          !function (e, t) {
            ie.downloads.search(e, t);
          }({id: e}, t => {
            const n = t[0];
            n ? qa(n) : l.warn("downs: unable to query download ID", e);
          });
        };
        true === p.cancel ? n() : (p.cancel = n, p.interval = R(s, 1e3));
      }), he.lastError) {
        const e = he.lastError.message;
        r.reject(e), h("onerror", {error: e});
      }
      return r.promise();
    }, qa = e => {
      var t;
      const {item: n, key: r} = (e => {
        let t, n;
        return Object.keys(Oa).every(r => {
          const s = Oa[r];
          return !s || s.browser_download_id != e || (n = r, t = s, false);
        }), {item: t, key: n};
      })(e.id);
      if (n && r) {
        const s = n.callbacks, o = (e, t) => Va(s, e, t), a = () => {
          n.interval && (E(n.interval), delete n.interval), delete Oa[r];
        }, i = (null === (t = e.state) || void 0 === t ? void 0 : t.current) || e.state, {totalBytes: c, bytesReceived: A} = e;
        e.error || "interrupted" == i ? (l.warn(`downs: download of ${n.name} (${n.url}) failed`, e.error), o("onerror", {error: Ia.NOT_SUCCEEDED, details: e.error}), a()) : e.endTime || "complete" == i ? (l.log(`downs: download of ${n.name} (${n.url}) finished`), o("onload", {}), a()) : void 0 === c && void 0 === A || o("onprogress", {loaded: A, total: c, estimatedEndTime: e.estimatedEndTime});
      }
    }, Qa = () => {
      Za && !Fa && (ie.downloads.onChanged.addListener(qa), Fa = true);
    }, Ha = e => {
      Ua = e, Ua == Ia.CHROME && Da().done(e => {
        e || ar.has(ar.permDownloads).then(e => {
          const t = q();
          return Ba || e ? t.resolve({permission: e, asked: false}) : ar.ask(ar.permDownloads, zn.getMessage("Browser_API_Downloads"), zn.getMessage("Click_here_to_allow_TM_to_start_downloads")).done(e => {
            t.resolve({permission: e, asked: true});
          }), Ba = true, t.promise();
        }).done(e => {
          e.permission && e.asked && ce();
        });
      });
    }, Xa = e => {
      Ta = xt(e);
    }, Ya = e => {
      for (const t of Ta) if (t && t.length) try {
        let n;
        if ("/" === t[0]) {
          let e = t.replace(/^\//g, "").replace(/\/$/g, "");
          "$" !== e[e.length - 1] && (l.log(`downs: patching $ into ${e}`), e += "$"), n = new RegExp(e, "i");
        } else if ("." === t[0]) {
          const e = [_t(t), "$"].join("");
          n = new RegExp(e, "i");
        } else l.warn(`downs: invalid file extension: "${t}" starts neither with "." nor with "/"`);
        if (n && -1 !== e.search(n)) return l.log(`downs: ${t} matched @${e}`), true;
      } catch (e) {
        l.warn(`downs: can't process ${t}`, e);
      }
      return false;
    }, Wa = {init: () => {
      const e = () => {
        Ha(Xr.values.downloads_mode), Xa(Xr.values.downloads_extension_whitelist);
      };
      e(), Xr.addChangeListener(["downloads_extension_whitelist", "downloads_mode"], e);
    }, start: (e, t, n) => {
      const r = n || {}, s = (++Na).toString(), o = (e, n) => Va(t, e, n);
      let a, {name: i, from: {tfd: c, url: A}} = e;
      if (l.log("downs: start", e), !r.internal) {
        if (Ua == Ia.OFF) return l.warn("downs: feature is not enabled"), void o("onerror", {error: Ia.NOT_ENABLED});
        if (!i || !Ya(i)) return l.warn("downs:", i, "is not whitelisted"), void o("onerror", {error: Ia.NOT_WHITELISTED});
        0;
      }
      if (c) {
        if (a = Bt.fromTransferableData(c), !a) return l.warn("downs: invalid transferable"), void o("onerror", {error: Ia.NOT_SUPPORTED});
        A = a.tryObjectUrl || a.tryDataUri || A;
      }
      Oa[s] = {download_id: s, url: A, name: i};
      const u = () => {
        const e = Oa[s];
        if (e && e.cancel) return o("onerror", {error: "aborted"}), q.Breach("aborted");
      }, p = i;
      let h;
      return p && (i = ((e, t, n) => {
        void 0 === n && (n = "-");
        return e.replace(/[:<>|~?*\x00-\x1F\uFDD0-\uFDEF"]/g, n);
      })(p), p != i && l.warn(`downs: changed file name from ${p} to ${i} for safety`)), q.Pledge().then(() => {
        if (r.internal || Ua == Ia.CHROME || Ua == Ia.DEFAULT) return Da().then(e => h = e).then(u);
        h = false;
      }).then(() => {
        if (a && a.tryBlob) return a.tryBlob;
        if (A) {
          const n = bn(A);
          if (n && "data:" == n.protocol) return dt(A);
          if (!h || !r.internal && Ua == Ia.DEFAULT) return ((e, t, n) => La.add(() => {
            const r = q(), s = n || {}, o = (e, t) => Va(s, e, t);
            e.responseType = "blob", e.method = e.method || "GET";
            const a = Qt(e, {onload: t => {
              if (4 != t.readyState || 200 != t.status && 0 != t.status || t.error) {
                const e = t.error || t.statusText || "xhr_failed";
                r.reject(e), o("onerror", {error: e});
              } else {
                const n = qt(t.responseHeaders)["content-type"], s = new Blob([t.response], {type: e.overrideMimeType || n || "binary/octet-stream"});
                r.resolve(s), o("onload", {});
              }
            }, onerror: e => {
              r.reject(), o("onerror", e);
            }, onabort: () => {
              r.reject(), o("onerror", {error: "aborted"});
            }, ontimeout: () => {
              r.reject(), o("ontimeout", {error: "timeout"});
            }, onprogress: s.onprogress}, {internal: t.internal}), i = {name: e.name, url: e.url, download_id: t.download_id, cancel: a ? a.abort : () => {}};
            return Oa[t.download_id] = i, r.promise();
          }))({url: A, ...e, name: i}, {internal: r.internal, download_id: s}, {onerror: t.onerror, ontimeout: t.ontimeout, onprogress: t.onprogress});
        }
      }).then(n => {
        if (n && h) {
          let r;
          return q.Pledge().then(() => {
            if (te.SHARED_OBJECT_URLS) return r = URL.createObjectURL(n);
            {
              const e = q();
              return pt(n).then(t => {
                void 0 === t ? (o("onerror", {error: "failed"}), e.reject()) : e.resolve(t);
              }), e.promise();
            }
          }).then(n => za({url: n, name: i, saveAs: e.saveAs}, {download_id: s}, {onerror: t.onerror, onload: t.onload}).always(() => {
            r && URL.revokeObjectURL(r);
          }));
        }
        return n ? Pa().then(async () => {
          const e = w.saveAs;
          if (e) return ja.add(async () => {
            e(n, i), await d(500), o("onload", {});
          });
          l.warn("Unable to load saveAs!");
        }) : A && h ? za({url: A, ...e, name: i}, {download_id: s}, t) : void (A && !r.internal && Ua == Ia.CHROME ? (l.warn("downs: download permission is missing"), o("onerror", {error: Ia.NOT_PERMITTED})) : (l.warn("downs: download failed"), o("onerror", {error: "failed"})));
      }).always(() => {
        delete Oa[s], y(() => o("ondone", {}), 1);
      }), s;
    }, cancel: e => {
      const t = Oa[e];
      return !!t && (t.cancel ? "function" == typeof t.cancel && t.cancel() : t.cancel = true, true);
    }, set_mode: Ha, set_whitelist: Xa, is_whitelisted: Ya, remove_permission: () => ar.remove(ar.permDownloads), staticVars: Ia}, Ja = Wa, Ka = {run: (e, t) => {
      let n = 1;
      const r = () => {
        0 == --n && (t && t(), ce());
      };
      if ("config" == e) {
        const e = rt.listValues();
        for (const t of e) {
          if (-1 != t.indexOf(ee.PREFIX.SCRIPT) || -1 != t.indexOf(ee.PREFIX.COND) || -1 != t.indexOf(ee.PREFIX.STORE) || -1 != t.indexOf(ee.PREFIX.META)) return;
          n++, rt.deleteValue(t).always(r);
        }
      } else "factory" == e && (n++, Ja.remove_permission().done(r), n++, rt.factoryReset().always(r));
      r();
    }, reset: e => {
      Ka.run(void 0, e);
    }, factoryReset: e => {
      Ka.run("factory", e);
    }, configReset: e => {
      Ka.run("config", e);
    }}, $a = Ka, ei = e => (e.sort((e, t) => e.position - t.position), e), ti = e => {
      let t;
      void 0 === e.ask && (e.ask = true), e.url || (e.url = ""), "" === e.force_url && delete e.force_url;
      const n = {errors: [], info: [], warnings: [], flags: {}}, r = q(), s = Date.now(), o = e.save && !e.ask && Xr.values.editor_easySave;
      let a;
      const i = zs(e.src) || void 0;
      if (!i || !i.name || null == i.version) return n.errors.push(zn.getMessage("Invalid_UserScript__Sry_") + "\n\n"), e.name && n.errors.push(zn.getMessage("Script_name_0name0", e.name) + "\n\n"), e.url && n.errors.push(zn.getMessage("Downloaded_from_0url0", e.url)), l.warn("scriptman: invalid userscript", n, i), q.Breach({messages: n});
      const {antifeatures: c, connects: A, name: u, namespace: d, textContent: p, version: h} = i;
      let f, m, g, {downloadURL: v, enabled: _, excludes: b, fileURL: w, includes: k, lastModified: y, matches: R, options: x, sync: E, position: S, uuid: G, updateURL: C, system: M} = i;
      return q.Pledge().then(() => {
        let n = e.uuid;
        if (e.replace && !n && (n = wl.getUidsByName(u, d)[0]), n) {
          const e = wl.getByUid(n);
          e.cond && e.script && (t = e.script);
        } else if (G) n = G; else {
          if (!e.replace) return l.warn("scriptman: neither UUID, @uuid nor replace option set"), q.Breach();
          n = St();
        }
        return n && "" === n.replace(/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/, "") ? (G = n, q.Pledge(G)) : (l.warn("scriptman: invalid UUID", n), q.Breach());
      }).then(() => {
        if (!e.clean && !e.defaultscript && t && t.system) return q.Breach();
      }).then(() => {
        if (e.clean && e.name && e.name != u || -1 != u.indexOf("\n")) return n.errors.push(zn.getMessage("Invalid_UserScript_name__Sry_")), q.Breach();
      }).then(() => {
        if (t) {
          if (t.name != u && (n.flags.renamed = true), e.internal || t.evilness != ca.SEVERITY_FOISTED_SCRIPT || (n.warnings.push(zn.getMessage("This_is_a_possibly_foisted_script_and_a_modification_will_enable_it_")), n.flags.forceAsk = true), t.lastModified && void 0 !== e.lastModTime && t.lastModified !== e.lastModTime) {
            let e = zn.getMessage("some_secs");
            try {
              const n = Math.max(1, Math.floor((s - t.lastModified) / 1e3));
              isNaN(n) || (e = n);
            } catch (e) {}
            n.warnings.push(zn.getMessage("CONFLICT__This_script_was_modified_0t0_seconds_ago_", e)), n.flags.forceAsk = true;
          }
          h == t.version && (e.save ? n.flags.modification = true : n.flags.reset = true), e.clean && (n.flags.factory = true), a = !e.internal;
        } else n.flags.first_install = true, a = !e.internal || e.save;
        k.length || R.length || o || e.internal || n.warnings.push(zn.getMessage("This_script_does_not_provide_any__include_information_")), c && !e.internal && Object.keys(c).forEach(e => {
          const r = c[e];
          let s;
          s = zn.getMessage("ads" == e ? "Antifeature_ads" : "miner" == e ? "Antifeature_miner" : "tracking" == e ? "Antifeature_tracking" : "Antifeature_other");
          const a = r[zn.getBestLocale(Object.keys(r)) || "default"] || r.en || zn.getMessage("Antifeature_no_details");
          let i, l;
          t && t.antifeatures && (l = t.antifeatures[e]) && (i = l[zn.getBestLocale(Object.keys(l)) || "default"] || l.en || zn.getMessage("Antifeature_no_details")), o && i && a === i || n.warnings.push(zn.getMessage("Antifeature__0name0__0description0", s, a));
        }), n.flags.sync = !!e.sync, n.flags.internal = e.internal, n.flags.ask = e.ask, n.flags.save = e.save, n.flags.whitewash = e.whitewash;
      }).then(() => {
        if (M = e.defaultscript, S = oi.determineLastPosition() + 1, y = s, e.force_meta) {
          let t;
          (t = e.force_meta.fileURL) && (w = t), (t = e.force_meta.lastModified) && (y = t);
        }
        n.flags.factory || n.flags.reset ? t && (y = t.lastModified) : (e.force_url && (C = null, v = e.force_url), t && (x.override = yt(t.options.override, {}), x.comment = t.options.comment, e.save && !e.internal && p != t.textContent ? x.check_for_updates = false : x.check_for_updates = t.options.check_for_updates)), x.override.orig_includes = k, x.override.orig_excludes = b, x.override.orig_matches = R, x.override.orig_connects = A, x.override.orig_noframes = x.noframes, x.override.orig_run_at = x.run_at || "document-idle", x.noframes = null, x.run_at = null;
      }).then(() => {
        if (t && (w = t.fileURL, t.deleted || (S = t.position), t.sync && (E = t.sync), !n.flags.factory && !n.flags.reset)) {
          _ = t.enabled, x.noframes = t.options.noframes, x.run_at = t.options.run_at;
          const {compatopts_for_requires: r, compat_wrappedjsobject: s, compat_metadata: a, compat_foreach: i, compat_powerful_this: l} = t.options;
          x = {...x, compatopts_for_requires: r, compat_wrappedjsobject: s, compat_metadata: a, compat_foreach: i, compat_powerful_this: l}, e.save && !e.force_url && (v = t.downloadURL || v);
          const c = oi.determineSourceURL(t), u = oi.determineSourceURL({fileURL: w, downloadURL: v, updateURL: C}), d = c ? Rn(c) : c || zn.getMessage("_not_set_"), p = u ? Rn(u) : u || zn.getMessage("_not_set_");
          if (d == p || o || e.internal || n.warnings.push(zn.getMessage("The_update_url_has_changed_from_0oldurl0_to__0newurl0", [d, p])), !e.save) {
            const e = t.options.override.orig_includes || t.includes, r = t.options.override.orig_matches || t.matches, s = t.options.override.orig_excludes || t.excludes;
            Et(e, k, "notinfirst").length + Et(r, R, "notinfirst").length + Et(b, s, "notinfirst").length && n.warnings.push(zn.getMessage("At_least_one_of_the_include_match_or_exclude_statements_was_changed_")), Et(t.connects || [], A || [], "notinfirst").length && n.warnings.push(zn.getMessage("At_least_one_new_connect_statement_was_added_"));
          }
        }
      }).then(() => {
        if (t && !n.flags.factory && h == t.version) {
          if (e.defaultscript) return q.Breach();
          if (e.noreinstall) return q.Breach();
        }
      }).then(() => {
        t ? (n.flags.factory || n.flags.reset ? (n.flags.reset ? (n.heading = zn.getMessage("You_are_about_to_reinstall_a_UserScript_"), n.flags.reinstall = true) : (n.heading = zn.getMessage("You_are_about_to_install_a_UserScript_"), n.flags.install = true), e.internal || n.warnings.splice(0, 0, zn.getMessage("All_script_settings_will_be_reset_"))) : n.flags.modification ? n.heading = zn.getMessage("You_are_about_to_modify_a_UserScript_") : Ns(h, t.version) == Ns.eOLDER ? (n.heading = zn.getMessage("You_are_about_to_downgrade_a_UserScript"), n.flags.downgrade = true, o || e.internal || n.warnings.splice(0, 0, zn.getMessage("The_downgraded_script_might_have_problems_to_read_its_stored_data_"))) : (n.heading = zn.getMessage("You_are_about_to_update_a_UserScript_"), n.flags.update = true), n.info.push({label: zn.getMessage("Installed_Version_"), value: "v" + t.version})) : (n.heading = zn.getMessage("You_are_about_to_install_a_UserScript_"), o || e.internal || n.info.splice(0, 0, zn.getMessage("Malicious_scripts_can_violate_your_privacy_")), n.flags.install = true), o || e.internal || ca.getWarningsFor(oi.determineSourceURL({fileURL: w, downloadURL: v, updateURL: C})).forEach(e => {
          n.warnings.splice(0, 0, e);
        }), n.flags.whitewash ? n.action = zn.getMessage("Enable") : n.flags.install ? n.action = zn.getMessage("Install") : n.flags.reinstall ? n.action = zn.getMessage("Reinstall") : n.flags.modification ? n.action = zn.getMessage("Modify") : n.flags.downgrade ? n.action = zn.getMessage("Downgrade") : n.flags.update && (n.action = zn.getMessage("Update"));
      }).then(() => {
        if (e.url && (w = e.url), e.sync && (E = e.sync), e.force_options && yt(e.force_options, x, Qs().options, true), e.force_settings) {
          const {enabled: t, position: n} = e.force_settings;
          void 0 !== t && (_ = t), void 0 !== n && (S = n);
        }
        ({options: x, includes: k, excludes: b, matches: R} = oi.mergeCludes({options: x, includes: k, excludes: b, matches: R}));
      }).then(() => {
        const e = w ? w.split("/").slice(0, -1).join("/") : void 0;
        m = i.requires.map(({url: t}) => ({unsafe_url: t, abs_url: e})), g = i.resources.map(({name: t, url: n}) => ({unsafe_url: n, abs_url: e, name: t}));
      }).then(async () => {
        var t;
        const {compatopts_for_requires: r, compat_wrappedjsobject: s, compat_metadata: o, compat_foreach: a} = x;
        (r || s || o || a) && n.info.push({label: zn.getMessage("Note"), value: zn.getMessage("A_recheck_of_the_GreaseMonkey_FF_compatibility_options_may_be_required_in_order_to_run_this_script_")});
        let c, A, u = {...i, downloadURL: v, enabled: _, excludes: b, fileURL: w, includes: k, lastModified: y, matches: R, options: x, sync: E, position: S, uuid: G, updateURL: C, system: M};
        if ((c = oi.determineOrigin(u)) && (A = null === (t = Ys[c.token]) || void 0 === t ? void 0 : t.convert)) {
          const t = await A(u);
          if (t.info && ("includes added" === t.info ? n.info.push(zn.getMessage("Automatically_added_user_includes_for_compatibility_reasons_")) : l.warn("scriptman: unknown script convert info", t.info)), t.warning) {
            let r;
            "deleted by hoster" === t.warning && (r = zn.getMessage("This_script_was_deleted_by_the_hoster_")), r ? e.internal ? n.info.push(r) : n.warnings.push(r) : l.warn("scriptman: unknown script convert warning", t.warning);
          }
          u = t.script || u;
        }
        return f = oi.getEvilness(u), {...u, uuid: G, textContent: p, evilness: f, requires: m, resources: g};
      }).done(e => {
        const s = {script: e, oldscript: t, messages: n, trigger_sync: !!a, short_info: [{label: zn.getMessage("Author"), prop: "author"}, {label: zn.getMessage("Description"), prop: "description", i18n: true}, {label: zn.getMessage("Source"), prop: "fileURL"}], hints: []};
        r.resolve(s);
      }).fail(() => {
        r.reject({messages: n});
      }), r.promise();
    }, ni = e => {
      const t = q(), n = e.messages, r = e.script, s = n.warnings.length || n.flags.ask, o = e.trigger_sync, a = () => {
        n.flags.modification || ba.dropAll(r.uuid), t.notify();
        const e = oi.doModify(r.uuid, r, o) || {};
        return n.flags.save || !n.flags.install && !n.flags.update || n.flags.factory || n.flags.reset || Ss.tS(r.name, n.flags.install ? "i" : "u", r.fileURL || ""), (n.flags.first_install || n.flags.factory) && wl.setStorageByUid(r.uuid, {ts: Date.now(), data: {}}), e;
      }, i = {uuid: r.uuid, lastModified: void 0, installed: true, renamed: n.flags.renamed};
      if (s) {
        if (pe.inIncognitoContext && "temporary" == Xr.values.incognito_mode) {
          const t = {globalhint: true, options: {id: "incognito", image: "critical", text: zn.getMessage("All_modifications_are_only_kept_until_this_incognito_session_is_closed_")}};
          e.hints.push(t);
        }
        Kn.install(e).done(({ok: e, aborted: n}) => {
          e && a(), t.resolve({installed: e, aborted: n});
        }).fail(() => {
          t.reject();
        });
      } else y(() => {
        a(), t.resolve(i);
      }, 1);
      return t.promise();
    }, ri = (e, t) => {
      const n = t || {}, r = Object.values(e).map(t => {
        let r, s, o;
        t.evilness && (t.evilness == ca.SEVERITY_FOISTED_SCRIPT ? r = zn.getMessage("The_origin_of_this_script_cant_be_determined_") : t.evilness >= Math.min(ca.SEVERITY_MAX, Xr.values.script_blacklist_severity) && (s = zn.getMessage("This_script_is_blacklisted_"))), t.evilness && (o = ca.getWarningsFor(ai.determineSourceURL(t)));
        const a = n.options_page, i = {userscript: true, foisted: r, blacklisted: s, warnings: o, icon: t.icon64 || t.icon || void 0};
        if (a) {
          const {textContent: r, requires: s, resources: o, ...a} = t, l = (e, r) => {
            const s = e.url || _n(e.unsafe_url, e.abs_url), o = ba.getElement(t.uuid, s);
            let a, i, l, c, A, u = 0, d = null, p = null;
            return o && o.data && (o.data.content && (A = o.data.content, u = A.length), p = o.data.sri, d = o.ts, a = o.modified, c = o.data.meta || "text/plain", l = r || /text\/.*|application\/(?:x-)?(?:java|ecma)script/.test(c), i = true), {display_url: e.url || e.unsafe_url, abs_url: e.abs_url, unsafe_url: e.unsafe_url, url: s, data: {length: u, content: n.externals ? A : void 0}, sri: p || void 0, ts: d, mimetype: c, editable: i, viewable: l, modified: a};
          }, c = s.map(e => l(e, true)), A = o.map(e => l(e)), u = ai.determineOrigin(t), d = ai.isContexter(t), p = Ma.getSessionConnects(t.uuid), h = wl.getStorageByUid(t.uuid), f = Object.keys(h.data).length, m = gl(t), g = t.deleted, v = t.lastUpdated, _ = t.downloadURL || t.fileURL || void 0, b = e.length;
          return {...a, ...i, requires: c, resources: A, ...n.referrer ? {referrer: n.referrer, length: r.length} : {code: r}, origin: u, contexter: d, temp_connects: p, ...n.storage ? {storage: h} : {}, storage_key_count: f, remote_url: m, deleted: g, lastUpdated: v, file_url: _, positionof: b};
        }
        {
          const e = ai.determineOrigin(t), r = n.active_urls || {}, s = n.active_counts || {}, o = n.all_time_active_counts || {};
          return {...i, name: t.name, name_i18n: t.name_i18n, uuid: t.uuid, nnew: false, system: t.system, support: !!t.supportURL || e && !!e.issue_url, abuse: void 0, active_urls: r[t.uuid], active_count: s[t.uuid], all_time_active_count: o[t.uuid], referrer: n.referrer, contexter: ai.isContexter(t), enabled: t.enabled, position: t.position, deleted: t.deleted, options: t.options};
        }
      });
      return r;
    }, si = Rt(1e3), oi = {determineSourceURL: e => {
      if (e) return [e.downloadURL, e.fileURL].filter(e => {
        var t;
        if (!e || "file:" !== (null === (t = bn(e)) || void 0 === t ? void 0 : t.protocol)) return e;
      })[0] || void 0;
    }, determineMetaURL: e => {
      if (!e) return;
      let t;
      const n = oi.determineOrigin(e);
      return n && n.meta_header ? t = e.fileURL : !e.fileURL || n && !n.meta_url || (t = e.fileURL.replace(".user.js", ".meta.js"), e.fileURL == t && (t = e.fileURL.replace(".tamper.js", ".meta.js")), e.fileURL == t && (t = null)), [e.updateURL, e.downloadURL, t].filter(e => {
        var t;
        if (!e || "file:" !== (null === (t = bn(e)) || void 0 === t ? void 0 : t.protocol)) return e;
      })[0] || void 0;
    }, mergeCludes: e => {
      let t, n;
      const r = e.options.override;
      if (["includes", "excludes", "matches"].forEach(t => {
        const n = `merge_${t}`, s = `orig_${t}`;
        e[t] = r[n] && r[s] ? r[s].slice() : [];
      }), r.use_includes) for (t = 0; t < r.use_includes.length; t++) n = e.excludes.indexOf(r.use_includes[t]), n >= 0 && e.excludes.splice(n, 1), e.includes.push(r.use_includes[t]);
      if (r.use_matches) for (t = 0; t < r.use_matches.length; t++) n = e.excludes.indexOf(r.use_matches[t]), n >= 0 && e.excludes.splice(n, 1), e.matches.push(r.use_matches[t]);
      if (r.use_excludes) for (t = 0; t < r.use_excludes.length; t++) e.excludes.push(r.use_excludes[t]);
      return e;
    }, doSave: e => ti(e).then(ni), doRemove: (e, t) => {
      if (t) wl.removeByUid(e), wl.setStorageByUid(e, void 0), ba.dropAll(e); else if (wl.softRemoveByUid(e, true), "off" == Xr.values.trash_mode) return oi.doRemove(e, true);
      return q.Pledge();
    }, doModify: (e, t, n) => (void 0 === n && (n = true), wl.setByUid(e, t, n), n ? ba.loadResources(e, t.resources).then(() => ba.loadRequires(e, t.requires)).then(() => {
      const n = [].concat(t.resources).concat(t.requires).map(e => _n(e.unsafe_url, e.abs_url)).filter(e => e);
      return ba.dropAllBut(e, n);
    }) : q.Pledge()), exportToJson: (e, t) => {
      const n = q();
      let r = oi.determineScriptsToRun();
      r = r.filter(e => !e.deleted), e && (r = r.filter(t => e[t.uuid]));
      const {storage: s, externals: o, global_settings: a} = t || {}, i = {scripts: ri(r, {options_page: true, storage: s, externals: o})};
      return a && (i.global_settings = rt.getValue(ee.STORAGE.CONFIG, {})), n.resolve(i), n.promise();
    }, importFromJson: e => {
      if (!e || !e.scripts || !e.scripts.length) return q.Breach("invalid json");
      const t = {}, n = [], r = [], s = [], o = {}, a = {};
      for (const i of e.scripts) try {
        const e = q(), c = i.uuid || St();
        if ("new-user-script" == c) continue;
        i.storage && (o[c] = i.storage);
        for (const e of ["resources", "requires"]) {
          const t = i[e];
          t && t.length && (a[c] = a[c] || {}, a[c][e] = t);
        }
        const A = i.file_url || i.update_url;
        ti({uuid: i.uuid, name: i.name, src: i.source, force_settings: {enabled: i.enabled, position: i.position}, force_options: i.options, force_meta: {lastModified: i.lastModified}, replace: true, url: A, ask: false}).done(n => {
          const o = St();
          t[o] = n, i.storage && i.storage.data && Object.keys(i.storage.data).length && r.push(o), a[c] && s.push(o), e.resolve();
        }).fail(t => {
          l.warn("import: Error @ script", i.name, t), e.resolve();
        }), n.push(e.promise());
      } catch (e) {
        l.warn("import: Error while importing script", i.name, e);
      }
      const i = (() => {
        const e = q();
        return q.when(n).always(() => {
          e.resolve();
        }), e.promise();
      })().then(() => Kn.import({scripts: t, storage_ids: r, externals_ids: s, global_settings: !!e.global_settings, hints: pe.inIncognitoContext && "temporary" == Xr.values.incognito_mode ? [{globalhint: true, options: {id: "incognito", image: "critical", text: zn.getMessage("All_modifications_are_only_kept_until_this_incognito_session_is_closed_")}}] : []})).then(({message: e, ok: n, aborted: r}) => {
        const s = q(), i = [], l = [];
        if (r) return q.Breach(zn.getMessage("Aborted_by_user"));
        if (!e) return q.Breach("invalid response");
        if (n) for (let n, r = 0; n = e.import_ids[r]; r++) (() => {
          const r = n;
          if (t[r]) {
            t[r].messages.warnings = [];
            const n = t[r].script.uuid, s = ni(t[r]).progress(() => {
              if (!e.externals_ids.includes(r)) return;
              const t = a[n];
              ["resources", "requires"].forEach(e => {
                let r;
                t && (r = t[e]) && r.length && r.forEach(e => {
                  ba.setElement(n, e.url, {content: e.content || "", meta: e.mimetype || "text/javascript"}, e.modified);
                });
              });
            }).done(() => {
              let t;
              e.storage_ids.includes(r) && o[n] && (t = wl.setStorageByUid(n, {data: o[n].data || {}, ts: Date.now()}), l.push(t));
            });
            i.push(s);
          }
        })();
        return q.when(i).always(() => {
          oi.reorderScripts(), q.when(l).always(() => {
            s.resolve(e);
          });
        }), s.promise();
      }, e => e.error).then(t => {
        if (e.global_settings && t.global_settings) {
          const t = rt.setValue(ee.STORAGE.CONFIG, e.global_settings).then(() => (i.done(() => {
            y($a.reset, 1);
          }), q.Pledge({global_settings: true})));
          return rt.setTemporary(true), t;
        }
        return q.Pledge({});
      });
      return i;
    }, installFromUrl: (e, t, n) => {
      const r = q(), s = {messages: {info: [], errors: [zn.getMessage("Unable_to_load_script_from_url_0url0", e)], warnings: [], flags: {}}};
      t = t || {};
      const o = n || {}, a = ["url", e, JSON.stringify(t)].join("_");
      if (si.is(a)) return l.debug("scriptman: de-bounced installFromUrl", e), q.Breach(s);
      si.add(a);
      const i = bn(e);
      return i && i.protocol.match(/(https?|file):/) ? ("file:" != i.protocol || te.ALLOWS_FILE_SCHEME_ACCESS || l.warn("scriptman: Access to local files is forbidden! Loading the following script for installation may fail:", e, "-> more info:", "https://www.tampermonkey.net/faq.php#Q204"), Co(e).then(n => {
        const s = {url: e, ask: true, replace: true, ...t};
        r.consume(oi.installFromSource(n, s, o));
      }).fail(e => {
        let t;
        e ? (t = s, "file:" != i.protocol || te.ALLOWS_FILE_SCHEME_ACCESS || t.messages.warnings.unshift(zn.getMessage("Tampermonkey_has_no_file_access_permission_")), t.heading = zn.getMessage("You_are_about_to_install_a_UserScript_"), o.silent_fail ? r.reject(t) : Kn.installError(t).always(e => {
          r.reject(e);
        })) : r.reject();
      }), r.promise()) : (l.warn("scriptman: can't install from ", e), q.Breach(s));
    }, installFromSource: (e, t, n) => {
      const r = q();
      t = t || {};
      const s = n || {}, o = {src: e, ask: true, replace: true, ...t};
      return oi.doSave(o).done(e => {
        r.resolve(!!e.installed);
      }).fail(e => {
        e ? (e.heading = zn.getMessage("You_are_about_to_install_a_UserScript_"), s.silent_fail ? r.reject(e) : Kn.installError(e).always(() => r.reject())) : r.reject();
      }), r.promise();
    }, determineLastPosition: () => {
      let e = 0;
      return wl.getUidList().forEach(t => {
        const n = wl.getByUid(t);
        n.script && n.cond ? n.script.position && n.script.position != Number.MAX_SAFE_INTEGER && n.script.position > e && (e = n.script.position) : l.warn("scriptman: inconsistent script entry", t);
      }), e;
    }, getEvilness: e => {
      let t = 0;
      return e.fileURL && (t = ca.getEvilnessOf(e.fileURL)) || e.downloadURL && (t = ca.getEvilnessOf(e.downloadURL)) || e.updateURL && (t = ca.getEvilnessOf(e.updateURL)) ? (l.debug("scriptman: found blacklisted script", e), t) : 0;
    }, blackCheckAll: () => {
      const e = wl.getUidList().map(e => {
        const t = wl.getByUid(e), {script: n, cond: r} = t;
        if (!n || !r) return;
        const s = oi.getEvilness(n);
        return s !== n.evilness ? (n.evilness = s, oi.doModify(e, n, false)) : void 0;
      }).filter(e => e);
      return q.when(e).then(() => {});
    }, reorderScripts: (e, t) => {
      const n = t || 0;
      let r = oi.determineScriptsToRun();
      if (e) for (let t = 0; t < r.length; t++) {
        const s = r[t];
        if (s.uuid == e) {
          const e = s.position < n ? 0.5 : -0.5;
          s.position = n + e;
        }
      }
      r = ei(r);
      let s = 1;
      const o = r.map(e => (e.deleted ? e.position = Number.MAX_SAFE_INTEGER : e.position = s++, oi.doModify(e.uuid, e, false)));
      return q.when(o).then(() => {});
    }, scriptWillRun: (e, t) => {
      if (!t || !e) return;
      let n = Oo.get(e);
      if (!n) {
        const t = rt.getValue(ee.PREFIX.COND + e, null);
        if (!t) return;
        const {match: r, inc: s, exc: o} = t;
        let a;
        switch (Xr.values.script_include_mode) {
          case "off":
            a = {match: r, exc: o};
            break;
          case "match":
            a = {match: (r || []).concat((s || []).filter(e => "/" !== e[0])), exc: o};
            break;
          case "unsafe":
          case "default":
            a = {match: r, inc: s, exc: o};
        }
        n = Uo(a, true), Oo.set(e, n);
      }
      return !!To(t, n, e);
    }, determineScriptsToRun: (e, t, n) => {
      const r = [];
      return l.log("scriptman: determineScriptsToRun @" + e), wl.getUidList().forEach(s => {
        let o = true, a = 0;
        const i = wl.getByUid(s);
        if (void 0 === n || !i.script || i.script.enabled === n) {
          if (e) {
            const t = Date.now();
            o = !!oi.scriptWillRun(s, e), a = Date.now() - t;
          }
          if (i.script && i.cond) {
            if (t && a > 1e3 && (l.warn("scriptman: checking " + i.script.name + "'s (" + s + ") includes and excludes took " + a + "ms!"), dr.all("status", {key: "slowdown", class: "warning", text: zn.getMessage("Script_0name0_is_slowing_down_some_page_loads_", zn.getTranslation(i.script, "name")), timeout: 3e5})), !o) return;
            l.verbose("scriptman: determineScriptsToRun: found script ", i), r.push(i.script);
          } else l.warn("scriptman: inconsistent script entry", s, i);
        }
      }), ei(r);
    }, isContexter: e => e.options && ("context-menu" === e.options.run_at || null === e.options.run_at && "context-menu" === e.options.override.orig_run_at), determineOrigin: e => {
      const t = e.fileURL || e.downloadURL || e.updateURL;
      return t ? Ws(t) : void 0;
    }, clean: e => {
      const t = Date.now();
      wl.getUidList().forEach(n => {
        const r = wl.getByUid(n);
        if (r.script && r.cond) {
          if (!r.script.deleted) return;
          {
            const e = "on" === Xr.values.trash_mode, s = Math.floor((r.script.deleted + Xr.values.trash_cleanup_after - t) / 1e3);
            if (e && s >= 0) return void l.log(`scriptman: script entry in trash ${n} will be cleaned in ${s}s`, r);
            l.log(`scriptman: script entry in trash ${n} will be cleaned now`, r);
          }
        } else l.warn(`scriptman: inconsistent script entry ${n} will be cleaned now`, r);
        e || oi.doRemove(n, true);
      });
    }}, ai = oi, ii = ai, li = (e, t) => (te.FPI ? void 0 !== t && (e.firstPartyDomain = e.firstPartyDomain || t) : delete e.firstPartyDomain, e);
    let ci;
    const Ai = {getAll: e => {
      const t = q();
      return Ue.getAll(li(e, null), e => t.resolve(e)), t.promise();
    }, remove: e => {
      const t = q();
      return Ue.remove(li(e), e => {
        if (e) t.resolve(); else {
          const e = he.lastError;
          t.reject(e ? e.message : "unknown error");
        }
      }), t.promise();
    }, set: e => {
      const t = q();
      return Ue.set(li(e), e => {
        if (e) t.resolve(e); else {
          const e = he.lastError;
          t.reject(e ? e.message : "unknown error");
        }
      }), t.promise();
    }, get fpi() {
      return ci;
    }};
    te.FPI && Ue.remove({url: "https://www.tampermonkey.net", name: "doesnotexist"}, () => {
      he.lastError && (ci = true);
    });
    const ui = Ai;
    let di = {};
    const pi = {init: e => {
      di = e;
    }, get: (e, t, n, r) => {
      const s = (0 == e) + "#" + (n ? "i" : "n") + (r ? "a" : "e") + "#" + t, o = Bo.get(s);
      let a = o ? JSON.parse(o) : void 0;
      if (!a) {
        const o = [], i = [], c = [], A = [], u = {};
        if (t) {
          const s = ii.determineScriptsToRun(t, true, !r || void 0);
          for (const r of s) if (!r.deleted) {
            if (l.verbose("check " + r.name + " for enabled:" + r.enabled), void 0 !== n && !(r.options.tab_types || Xr.values.default_tab_types).split("+").includes(n ? "incognito" : "normal")) continue;
            0 != e && (true === r.options.noframes || null === r.options.noframes && true === r.options.override.orig_noframes) || (r.evilness && r.evilness >= Math.min(ca.SEVERITY_MAX, Xr.values.script_blacklist_severity) ? c.push(r) : r.enabled ? (u[r.uuid] = t, ii.isContexter(r) ? A.push(r) : o.push(r)) : i.push(r));
          }
        }
        a = {contexters: A, runners: o, disabled: i, evilness: c, script_map: u}, t && Bo.set(s, JSON.stringify(a));
      }
      return a;
    }, answer: function (e, t, n, r) {
      const {runners: s, contexters: o} = e, a = [{m: "native", t: [Ja.staticVars.DEFAULT, Ja.staticVars.NATIVE]}, {m: "disabled", t: [Ja.staticVars.OFF]}, {m: "browser", t: [Ja.staticVars.CHROME]}].filter(e => {
        if (e.t.includes(Xr.values.downloads_mode)) return true;
      }).map(e => e.m)[0] || "disabled", {js: i, dom: c, raw: A} = (e => {
        let t, n, r;
        switch (e) {
          case "raw+":
            r = t = n = true;
            break;
          case "default":
          case "-js":
            r = t = true, n = false;
            break;
          case "js+":
            t = n = true, r = false;
            break;
          case "js":
            t = true, r = n = false;
            break;
          case "dom":
            n = true, t = r = false;
            break;
          case "raw":
            r = true, n = t = false;
        }
        return {js: t, dom: n, raw: r};
      })(Xr.values.sandbox_mode), u = e => {
        const t = [], n = [], r = [];
        return e.forEach(e => {
          let t, s;
          e.script ? (t = e.script.options.sandbox, s = e.script.name) : (t = e.options.sandbox, s = e.name);
          const o = "raw" === t || null === t, a = "JavaScript" === t, i = "DOM" === t, u = () => l.info(`content: script "${s}" wants to be executed inside a ${t || "raw"}-level sandbox, but this mode is currently disabled at the security settings`);
          i && c ? r.push(e) : ((a || i) && u(), A ? n.push(e) : (o && u(), c ? r.push(e) : l.warn(`content: script "${s}" can't be executed`)));
        }), {dom: r.length ? r : void 0, raw: n.length ? n : void 0, js: t.length ? t : void 0};
      }, d = !n && "off" != Xr.values.external_connect && To(t, di), p = {scripts: u(s || []), contexters: u((o || []).map(e => (e => {
        const {uuid: t, options: n, name: r, name_i18n: s, description: o, description_i18n: a} = e;
        return {uuid: t, options: n, name: r, name_i18n: s, description: o, description_i18n: a};
      })(e))), external_connect: d, injectMode: Xr.values.runtime_inject_mode, inIncognitoContext: n, isFirstPartyIsolation: ui.fpi, container: r, downloadMode: a, sandboxMode: Xr.values.sandbox_mode, enforce_strict_mode: "on" == Xr.values.runtime_strict_mode, top_level_await: ["default", "on"].includes(Xr.values.runtime_top_level_await), measure_scripts: Xr.values.debug, logLevel: Xr.values.logLevel, version: pe.manifest.version};
      return p;
    }}, hi = pi, fi = {mkCompat: (e, t, n, r) => (t && ((t.options.compat_wrappedjsobject || r) && (e = fi.unWrappedJsObjectify(e)), (t.options.compat_metadata || r) && (e = fi.unMetaDataify(e)), (t.options.compat_foreach || r) && (e = fi.unEachify(e))), n || (e = e.replace(/(['"])use strict(['"])/g, "$1use strict$2")), e), findPrototypes: e => {
      if (e.includes(".toSource(")) return true;
      const t = ["indexOf", "lastIndexOf", "filter", "forEach", "every", "map", "some", "slice"];
      for (const n in t) if (e.includes(`Array.${t[n]}(`)) return true;
      return false;
    }, unEachify: e => {
      const t = (e = e.replace(/for each[ \t]*\(/gi, "for each(")).split("for each");
      for (let e = 1; e < t.length; e++) {
        const n = t[e];
        if ("(" != n.substr(0, 1)) {
          t[e] = " each" + t[e];
          continue;
        }
        const r = gt(n, "(", ")"), s = r.split(" ");
        let o = null, a = null, i = null;
        for (const e in s) "" != s[e] && "var" != s[e] && (o ? a ? i || (i = s[e]) : a = s[e] : o = s[e]);
        if (!o || !i) {
          t[e] = " each" + t[e];
          continue;
        }
        const l = "var __kk in " + i;
        let c = "";
        c += "{\n    if (!" + i + ".hasOwnProperty(__kk)) continue;", c += " \n    var " + o + " = " + i + "[__kk];", t[e] = t[e].replace(r, l).replace("{", c);
      }
      return t.join("for");
    }, unMetaDataify: e => {
      let t = e, n = e;
      const r = "<><![CDATA[", s = "]]></>";
      let o = t.indexOf(r);
      for (; -1 != o;) {
        const e = t.substr(0, o), a = e.lastIndexOf("\n");
        let i = "";
        -1 != a && (i = e.substr(a, e.length - a)), t = t.substr(o, t.length - o);
        const l = i.indexOf("/*"), c = i.indexOf("//");
        if (-1 == l && -1 == c) {
          const e = gt(t, r, s);
          let o = e;
          o = o.replace(/\\/g, "\\\\"), o = o.replace(/"/g, '\\"').replace(/\n/g, '\\n" + \n"'), o = o.replace(/^\n/g, "").replace(/\n$/g, ""), o = o.replace(/\r/g, "");
          const a = r + e + s;
          n = n.replace(a, '(new CDATA("' + o + '"))');
        }
        t = t.substr(1, t.length - 1), o = t.indexOf(r);
      }
      return n;
    }, unWrappedJsObjectify: e => {
      const t = e.split("\n");
      for (let e = 0; e < t.length; e++) {
        const n = t[e].indexOf(".wrappedJSObject");
        if (-1 == n) continue;
        const r = t[e].indexOf("//");
        -1 != r && r < n || (t[e] = t[e].replace(/\.wrappedJSObject/g, ""));
      }
      return t.join("\n");
    }}, mi = fi, gi = {addElement: ["GM_addElement", "GM.addElement", "GM_addStyle", "GM.addStyle"], cookie: ["GM_cookie", "GM.cookie"], readValues: ["GM_listValues", "GM.listValues", "GM_getValue", "GM.getValue", "GM_addValueChangeListener", "GM.addValueChangeListener", "GM_removeValueChangeListener", "GM.removeValueChangeListener"], writeValues: ["GM_setValue", "GM.setValue", "GM_deleteValue", "GM.deleteValue"], download: ["GM_download", "GM.download"], getResource: ["GM_getResourceText", "GM.getResourceText", "GM_getResourceURL", "GM.getResourceUrl"], tabs: ["GM_getTab", "GM.getTab", "GM_getTabs", "GM.getTabs", "GM_saveTab", "GM.saveTab"], info: ["GM_info", "GM.info"], log: ["GM_log", "GM.log"], notification: ["GM_notification", "GM.notification"], openInTab: ["GM_openInTab", "GM.openInTab"], menuCommand: ["GM_registerMenuCommand", "GM.registerMenuCommand", "GM_unregisterMenuCommand", "GM.unregisterMenuCommand"], setClipboard: ["GM_setClipboard", "GM.setClipboard"], xmlHttpRequest: ["GM_xmlhttpRequest", "GM.xmlHttpRequest"], "window.close": ["window.close"], "window.focus": ["window.focus"], "window.onurlchange": ["window.onurlchange"], webRequest: ["GM_webRequest", "GM.webRequest"]}, vi = ["unsafeWindow", "GM_info", "GM.info"], _i = Object.entries(gi).reduce((e, t) => {
      const [n, r] = t;
      return r.forEach(t => e[t] = [...e[t] || vi, n]), e;
    }, {}), bi = Object.keys({GM: true, unsafeWindow: true, ..._i}).filter(e => !e.includes(".")), wi = new RegExp("[a-z0-9_$]\\s*(\\.\\s*|\\[\\s*[\"'`])(" + bi.join("\\b|") + "\\b)([\"'`]\\s*\\])?(\\s*)(?!=[^=])(\\S|$)"), ki = 131072, yi = e => (e.length > ki ? e.split("\n") : [e]).some(e => !!wi.test(e.length > ki ? e.substr(ki) : e)), Ri = {}, xi = {bundle: (e, t) => {
      let n, r = Ri[t.uuid], s = true;
      if (r) return r;
      let {includes: o, matches: a, requires: i, resources: c, excludes: A, connects: u, textContent: d, ...p} = t;
      const h = JSON.parse(JSON.stringify(t.options));
      let f, m;
      return h.run_at = h.run_at || t.options.override.orig_run_at || "document-idle", p.options = h, r = ba.getResources(p.uuid, t.resources).then(e => (s && !e.sync && (l.log("ri: uncached @external detected -> fast script start disabled"), s = e.sync), f = e.elements, ba.getRequires(p.uuid, t.requires))).then(t => {
        s && !t.sync && (l.log("ri: uncached @external detected -> fast script start disabled"), s = t.sync), m = t.elements, l.log("run script " + p.name + " @ " + e.url);
        const n = {resources: f, requires: m, ...p};
        return null === h.compat_powerful_this && (h.compat_powerful_this = yi(d) || m.some(e => yi(e.textContent))), ((e, t, n) => {
          const r = q(), s = [];
          n.forEach(t => {
            let n = t.textContent || "";
            n = mi.mkCompat(n, e.options.compatopts_for_requires ? e : void 0, "off" != Xr.values.runtime_strict_mode), s.push({textContent: n});
          });
          const o = wl.getStorageByUid(e.uuid);
          let a = mi.mkCompat(t, e, "off" != Xr.values.runtime_strict_mode);
          if (Xr.values.debug) {
            const e = a.split("\n");
            let t, n = false;
            for (let r = 0; r < e.length; r++) {
              const s = e[r];
              if (!s.match(/^\s*$|^\s*\/\/\s*|^\s*\/\*.*\*\/\s*$|^\s*["']+use strict["']+;*\s*$/)) {
                if (s.match(/^\s*\/\*/) && (n = true), !n) {
                  e[r] = "debugger;" + e[r];
                  break;
                }
                if (s.match(/\*\/\s*$/)) n = false; else if (-1 != (t = s.search(/\*\//))) {
                  e[r] = kt(e[r], t + 2, 0, "debugger;");
                  break;
                }
              }
            }
            a = e.join("\n");
          }
          const i = Z(e.name) + ".user.js";
          let l;
          l = pe.getURL("userscript.html") + "?" + xn({name: i, id: e.uuid});
          const c = {code: a, storage: o, script: {...e, requires: s}, source_url: l};
          return r.resolve(c), r.promise();
        })(n, d, m);
      }).always(() => {
        n = true, delete Ri[p.uuid];
      }), n || (Ri[p.uuid] = r), r;
    }}, Ei = xi, Si = {};
    let Gi = 1;
    const Ci = Gi++, Mi = Gi++, Ii = Gi++, Zi = Gi++, Ui = Gi++, Ti = Gi++, Bi = Gi++, Oi = () => {
      const e = {frames: {0: {frameId: 0, state: Ci, requests: {}}}, scripts: {}, urls: {}, maps: {}, contexts: {onUnload: {}}, stats: {running: 0, disabled: 0, searched: -1}, extra: {}};
      return Object.defineProperties(e.urls, {length: {value: 0, enumerable: false, writable: true, configurable: true}}), e;
    }, Fi = function (e, t, n, r) {
      let s;
      ea(n) ? s = hi.get(t, n, r) : (l.log("This URL is filtered by the security settings:", n, "-> Do nothing!"), qi.set.forbidden(e, t), s = {contexters: [], runners: [], disabled: [], evilness: [], script_map: {}}), Si[e].scripts[n] = s, s.runners.forEach(n => {
        n.webRequest && n.webRequest.length && qi.set.requests(e, t, n.uuid, n.webRequest);
      });
    }, ji = (e, t) => {
      Xr.values.userscript_search_url && "badge" == Xr.values.userscript_search_mode && Br(e).then(n => {
        let r, s;
        (r = Si[t]) && (s = r.urls[e]) && 0 == s.frameId && (r.stats.searched = n.count, Yi.setBadge(t));
      });
    }, Li = {}, Pi = {}, Di = {}, Vi = {};
    let Ni, zi;
    const qi = {getActive: () => ({windowId: Ni, tabId: zi}), getScriptHistoryForTab: e => {
      var t;
      return (null === (t = Si[e.id]) || void 0 === t ? void 0 : t.maps) || {};
    }, getUniqueScriptsForTab: e => {
      var t;
      const n = {}, r = (null === (t = Si[e.id]) || void 0 === t ? void 0 : t.urls) || {};
      for (const [t, s] of Object.entries(r)) {
        if (l.verbose(`Found at info[${e.id}] -> ${t}`), !ea(t)) continue;
        const {runners: r, contexters: o, disabled: a, evilness: i} = hi.get(s.frameId, t, Ct(e), true);
        [r, o, a, i].forEach(e => {
          e.forEach(e => {
            n[e.uuid] = e;
          });
        });
      }
      return n;
    }, listeners: {once: {whenReady: (e, t) => {
      !Si[e] || Si[e].frames[0].state < Mi ? qi.listeners.once.onReady(e, t) : t();
    }, onReady: (e, t) => {
      const n = () => {
        qi.listeners.remove.onCommited(r), qi.listeners.remove.onCompleted(s), t();
      }, r = qi.listeners.add.onCommited(t => {
        t === e && n();
      }), s = qi.listeners.add.onCompleted(t => {
        t === e && n();
      });
    }}, add: {onReset: e => {
      const t = St();
      return Li[t] = e, t;
    }, onCommited: e => {
      const t = St();
      return Pi[t] = e, t;
    }, onCompleted: e => {
      const t = St();
      return Di[t] = e, t;
    }, onRemoved: e => {
      const t = St();
      return Vi[t] = e, t;
    }}, remove: (() => {
      const e = (e, t) => {
        delete e[t];
      };
      return {onReset: t => {
        e(Li, t);
      }, onCommited: t => {
        e(Pi, t);
      }, onCompleted: t => {
        e(Di, t);
      }, onRemoved: t => {
        e(Vi, t);
      }};
    })()}, events: {active: (e, t) => {
      Ni = t, zi = e, ie.tabs.getSelected(t, t => {
        t && t.id == e && ji(t.url, e);
      });
    }, reset: (e, t) => {
      let n;
      if (te.FAST_EXEC_SUPPORT && (n = Si[e])) for (const t of Object.values(n.frames)) qi.events.clean(e, t.frameId);
      n = Si[e] = Oi(), n.frames[0].state = Ci, wt(Li, n => {
        n && n(e, t);
      });
    }, response: (e, t, n, r) => {
      if (!Xr.values.enabled) return;
      const s = Si[e] = Si[e] || Oi(), o = s.frames[t] = s.frames[t] || {frameId: t, state: 0, requests: {}}, a = o.state || Ci, i = Rn(n);
      a < Ii && (Fi(e, t, i, r), o.state = Ii);
      const l = s.scripts[i];
      return l ? l.runners.length + l.contexters.length : 0;
    }, commited: (e, t, n) => {
      if (!Xr.values.enabled || !["https:", "http:", "file:"].some(e => n.startsWith(e))) return;
      const r = Si[e] = Si[e] || Oi(), s = r.frames[t] = r.frames[t] || {};
      (s.state || Ci) <= Mi || (s.state = Mi, wt(Pi, t => {
        t && t(e);
      }));
    }, loading: (e, t, n) => {
      if (Xr.values.enabled && ["https:", "http:", "file:"].some(e => n.startsWith(e)) && 0 == t && n.startsWith("file:")) {
        const n = Si[e] = Si[e] || Oi();
        if (n.frames[t] = n.frames[t] || {}, (n.frames[t].state || Ci) >= Zi) return;
        n.frames[t].state = Zi;
      }
    }, run: (e, t, n, r, s) => {
      if (!Xr.values.enabled) return;
      const o = Si[e] = Si[e] || Oi();
      o.frames[t] = o.frames[t] || {};
      const a = Rn(n);
      let i = o.scripts[a];
      if (!i && (l.log("tv: lazy init @ events.run(" + e + ", " + t + ", " + n + ")"), Fi(e, t, a, r), i = o.scripts[a], !i)) return void l.warn("tv: no script run info for tab " + e + " @ " + a);
      const c = o.frames[t].state;
      o.frames[t].state = Ui, c != Ui && (function (e, t, n) {
        const r = t => {
          for (const [r, s] of Object.entries(n)) {
            const n = 1 === t;
            void 0 === Si[e].maps[r] && n && (Si[e].maps[r] = {count: 0, all_time: 0, urls: []}), n && (Si[e].maps[r].urls.push(s), Si[e].maps[r].all_time++), Si[e].maps[r].count += t;
          }
        };
        r(1), Si[e].contexts.onUnload[t] = Si[e].contexts.onUnload[t] || [], Si[e].contexts.onUnload[t].push(() => {
          Si[e] && r(-1);
        });
      }(e, t, i.script_map), function (e, t, n) {
        const r = r => {
          1 === r && (void 0 === Si[e].urls[n] ? Si[e].urls[n] = {frameId: t, count: 0} : 0 == t && (Si[e].urls[n].frameId = t)), Si[e].urls[n].count += r;
        };
        r(1), Si[e].contexts.onUnload[t] = Si[e].contexts.onUnload[t] || [], Si[e].contexts.onUnload[t].push(() => {
          Si[e] && r(-1);
        });
      }(e, t, a), function (e, t, n) {
        Si[e].stats.running += n, (Si[e].contexts.onUnload[t] = Si[e].contexts.onUnload[t] || []).push(() => {
          Si[e].stats.running -= n;
        });
      }(e, t, i.runners.length));
      const A = i.contexters, u = s ? r => {
        qi.events.clean(e, t, n);
        const o = r || A && A.length ? {runners: r, contexters: A} : void 0;
        s(o);
      } : void 0, d = function (e, t, n, r, s) {
        const o = [];
        for (const e of r) o.push(Ei.bundle({url: n}, e));
        let a;
        return q.when(o).then(e => e.filter(e => e)).always(e => {
          s ? s(e) : a = e;
        }), a;
      }(0, 0, a, i.runners, u);
      return d || A && A.length ? {runners: d, contexters: A} : void 0;
    }, clean: (e, t, n) => {
      if (!Xr.values.enabled) return;
      const r = Si[e];
      if (r) {
        if (n) {
          const e = Rn(n);
          delete r.scripts[e];
        }
        const s = qi.get.objurl(e, t);
        s && URL.revokeObjectURL(s);
      }
    }, complete: (e, t, n) => {
      if (Xr.values.enabled && ["https:", "http:", "file:"].some(e => n.startsWith(e))) {
        if (0 == t) {
          const r = Si[e] = Si[e] || Oi();
          r.frames[t] = r.frames[t] || {};
          const s = r.frames[t].state || Ci;
          r.frames[t].state = Ti;
          const o = qi.get.stats(e);
          if (o && o.running && s < Ui) return void l.warn("tv: no script run info!");
          zi == e && ji(n, e);
        }
        wt(Di, t => {
          t && t(e);
        });
      }
    }, unload: (e, t) => {
      te.FAST_EXEC_SUPPORT && qi.events.clean(e, t);
      const n = Si[e] = Si[e] || Oi();
      if (n.frames[t] = n.frames[t] || {}, n.frames[t].state = Bi, n.contexts.onUnload[t]) {
        for (let e = 0; e < n.contexts.onUnload[t].length; e++) n.contexts.onUnload[t][e]();
        n.contexts.onUnload[t] = [];
      }
      delete n.frames[t];
    }, remove: e => {
      const t = Si[e];
      te.FAST_EXEC_SUPPORT && t && Object.values(t.frames).forEach(t => {
        qi.events.clean(e, t.frameId);
      }), delete Si[e], wt(Vi, t => {
        t && t(e);
      });
    }}, set: {objurl: (e, t, n) => {
      const {extra: r} = Si[e] = Si[e] || Oi();
      (r.objurl = r.objurl || {})[t] = n;
    }, blocker: e => {
      const {extra: t} = Si[e] = Si[e] || Oi();
      t.blocker = true;
    }, forbidden: (e, t) => {
      if (0 == t) {
        const {extra: t} = Si[e] = Si[e] || Oi();
        t.forbidden = true;
      }
    }, requests: (e, t, n, r, s) => {
      const o = [];
      r.forEach(e => {
        const t = "string" == typeof e.selector ? {include: [e.selector]} : e.selector, n = ["include", "match", "exclude"].reduce((e, n) => {
          const r = t[n];
          return r && (e[n] = "string" == typeof r ? [r] : r), e;
        }, {}), r = e.action;
        let s;
        if ("string" == typeof r) s = "cancel" === r ? {cancel: true} : {}; else {
          const {cancel: e, redirect: t} = r;
          s = "string" == typeof t ? {redirect: {url: t}} : {cancel: e, redirect: t};
        }
        o.push({selector: n, action: s});
      }), ((e, t, n, r) => {
        const {frames: s} = Si[e] = Si[e] || Oi(), o = s[t] = s[t] || {};
        (o.requests = o.requests || {})[n] = r;
      })(e, t, n, {id: n + "@" + e + ":" + t + "#" + Date.now(), rules: o, uuid: n, callback: s});
    }}, get: {stats: (e, t) => {
      if (Si[e]) {
        const n = Si[e].stats.running, r = Si[e].stats.searched;
        let s;
        if (t) {
          let t = 0;
          Object.keys(Si[e].maps).forEach(n => {
            Si[e].maps[n].count > 0 && t++;
          }), s = t;
        }
        return {running: n, searched: r, unique: s};
      }
    }, objurl: (e, t) => {
      var n, r;
      const s = null === (r = null === (n = Si[e]) || void 0 === n ? void 0 : n.extra) || void 0 === r ? void 0 : r.objurl;
      if (!s) return;
      const o = s[t];
      return delete s[t], o;
    }, blocker: e => {
      var t, n;
      return null === (n = null === (t = Si[e]) || void 0 === t ? void 0 : t.extra) || void 0 === n ? void 0 : n.blocker;
    }, forbidden: e => {
      var t, n;
      return null === (n = null === (t = Si[e]) || void 0 === t ? void 0 : t.extra) || void 0 === n ? void 0 : n.forbidden;
    }, requests: (e, t) => {
      var n, r;
      return null === (r = null === (n = Si[e]) || void 0 === n ? void 0 : n.frames[t]) || void 0 === r ? void 0 : r.requests;
    }}}, Qi = qi, Hi = () => {
      he.lastError && he.lastError;
    }, Xi = {init: () => {
      Xi.setIcon();
      let e = Xr.values.appearance_badge_color || "#ee3131";
      var t;
      "#" !== e[0] && (e = "#" + e), function (e) {
        if (ie.browserAction.setBadgeBackgroundColor) ie.browserAction.setBadgeBackgroundColor(e);
      }({color: e}), e = Xr.values.appearance_badge_text_color || "#ffffff", "#" !== e[0] && (e = "#" + e), t = {color: e}, ie.browserAction.setBadgeTextColor && ie.browserAction.setBadgeTextColor(t);
    }, setIcon: e => {
      let t, n, r = false, s = false;
      if (void 0 !== e) {
        const t = Qi.get.blocker(e), n = Qi.get.forbidden(e);
        void 0 !== t && (r = t), void 0 !== n && (s = n);
      }
      s ? (t = "_forbidden", n = zn.getMessage("At_least_one_part_of_this_page_is_listed_at_the_forbidden_pages_setting_")) : r ? (t = "_blocker", n = zn.getMessage("Some_scripts_might_be_blocked_by_the_javascript_settings_for_this_page_or_a_script_blocker_")) : t = Xr.values.enabled && void 0 !== e ? "" : "_grey", l.debug("badge: set icon " + t);
      const o = {path: pe.getURL("images/icon" + t + ".png")}, a = {title: n || pe.manifest.name};
      void 0 !== e && (o.tabId = e, a.tabId = e);
      try {
        Se(o, Hi), Ge(a);
      } catch (e) {
        l.warn("bg: ERROR while setIcon! " + e.message);
      }
    }, setBadge: e => {
      var t, n, r;
      let s = 0;
      "off" == Xr.values.appearance_badges ? s = 0 : "running" == Xr.values.appearance_badges ? e && (s = (null === (t = Qi.get.stats(e)) || void 0 === t ? void 0 : t.running) || 0) : "running_unique" == Xr.values.appearance_badges && e && (s = (null === (n = Qi.get.stats(e, true)) || void 0 === n ? void 0 : n.unique) || 0);
      let o = s ? `${s}` : "";
      if (Xr.values.userscript_search_url && "badge" == Xr.values.userscript_search_mode) {
        const t = (null === (r = Qi.get.stats(e)) || void 0 === r ? void 0 : r.searched) || 0;
        if (t > 0) {
          let e = "";
          e = s > 999 ? "" : s > 99 || `${o}+${t}`.length > 4 ? "+" : `${s}`, o = `${o}+${e}`;
        }
      }
      l.debug("badge: set " + o), function (e) {
        if (ie.browserAction.setBadgeText) ie.browserAction.setBadgeText(e);
      }({text: o, tabId: e});
    }}, Yi = Xi, Wi = [], Ji = {}, Ki = se.LOCALSTORAGE, $i = (Ki ? parseInt(Ki.getItem("inactive_tab_done_timeout") || "") : null) || 1e3, el = (e, ...t) => {
      u.late ? Qi.events.active(e.tabId, e.windowId) : y(() => {
        el(e, ...t);
      }, 100);
    }, tl = (e, t, n) => {
      if (!u.late) return void y(() => {
        tl(e, t, n);
      }, 100);
      const r = n.pendingUrl || n.url;
      "auto" == Xr.values.scriptUrlDetection && So(r) && ii.installFromUrl(r, {}, {silent_fail: true}), r ? "loading" == t.status ? Qi.events.loading(n.id, 0, r, Ct(n)) : "complete" == t.status && Qi.events.complete(n.id, 0, r) : l.warn("tabUpdates: no tab url set! ", n), Wi.forEach(e => {
        e({reason: "updated", status: t.status}, n);
      });
    }, nl = e => {
      Ji[e] && (Ji[e].onClose(), delete Ji[e]), Qi.events.remove(e), Wi.forEach(t => {
        t({reason: "removed"}, {id: e});
      });
    }, rl = (e, t) => {
      nl(t), Yi.setIcon(e), Yi.setBadge(e), Wi.forEach(t => {
        t({reason: "replaced"}, {id: e});
      });
    }, sl = e => {
      u.late ? (Qi.events.commited(e.tabId, e.frameId, e.url), 0 === e.frameId && Wi.forEach(t => {
        t({reason: "commited"}, {url: e.url, id: e.tabId});
      })) : y(() => {
        sl(e);
      }, 100);
    }, ol = {init: () => {
      ie.tabs.onUpdated.addListener(tl), ie.tabs.onRemoved.addListener(nl), ge(rl), ie.tabs.onActivated.addListener(el), xe && function (e) {
        if (ie.webNavigation.onCommitted) ie.webNavigation.onCommitted.addListener(e);
      }(sl);
    }, openAndWatch: function (e, t) {
      let n, r;
      const s = (e, o) => {
        void 0 !== n && o.id === n && (["updated", "commited"].includes(e.reason) ? t(o) : "removed" == e.reason && (r && (x(r), r = void 0), ol.removeListener(s), t()));
      };
      return _e(e, s => {
        s ? (n = s.id, false === e.active && (r = y(() => {
          r = void 0, ie.tabs.update(s.id, {active: true}, () => null);
        }, $i)), t(s)) : l.warn("tab.create failed", e, s);
      }), ol.addListener(s), {cancel: () => {
        ol.removeListener(s), void 0 !== n && ie.tabs.remove(n, () => {
          const e = he.lastError;
          e ? l.warn("tab.close", e.message) : n = void 0;
        });
      }};
    }, addListener: e => {
      Wi.push(e);
    }, removeListener: e => {
      let t;
      Wi && (t = Wi.indexOf(e)) > -1 && Wi.splice(t, 1);
    }}, al = ol;
    let il = 0;
    const ll = {ePASTEBIN: 1, eCHROMESYNC: 2, eSYNCFS: 3, eGDRIVE: 4, eDROPBOX: 5, eWEBDAV: 6, eYANDEX: 7, eONEDRIVE: 8, eUNKNOWN: 9};
    let cl = [], Al = false;
    const ul = (() => {
      const e = e => {
        const t = e.type, n = e.id, r = ".meta.json", s = ".user.js";
        let o, a;
        const i = e => {
          let t;
          return q.Pledge().then(() => {
            if (!a) return t = true, c();
          }).then(() => {
            if (a && void 0 === a[e] && !t) return c();
          }).then(() => a ? (a[e] = a[e] || void 0, a[e]) : (l.warn("si: unable to list remote list!"), q.Breach()));
        }, c = e => o.list(e).then(e => {
          a = {};
          const t = {}, n = {};
          let r, s;
          const o = Date.now();
          return e.map(e => {
            const {name: i, modified: c} = e;
            if (!a) return;
            a[i] = e;
            const A = new RegExp(".meta.json$"), u = new RegExp(".user.js$");
            if (c > o) l.log("si: ignore future list item", o, e); else if ((r = !!i.match(A)) || (s = !!i.match(u))) {
              let o;
              if (r) {
                o = i.replace(A, "");
                const n = c, {precision: r} = e;
                t[o] = {uuid: o, options: {}, url: void 0, precision: r, lastModified: n};
              } else s && (o = i.replace(u, ""), n[o] = !!e);
            }
          }), Object.keys(t).map(e => {
            const r = t[e];
            return r && (r.sourceAvailable = n[e]), r;
          }).filter(e => e);
        });
        let A;
        const u = {init: e => (o = Jo[t]({...e, path: "sync"}), q.Pledge().then(() => (A || (A = o.changes.listen(), A.progress(e => {
          ((e, t) => {
            if (t != il) return;
            const n = e.name, r = new RegExp(".meta.json$"), s = new RegExp(".user.js$");
            l.log("si: cloud file changed", n, e), (n.match(r) || n.match(s)) && cl.forEach(e => {
              e(n);
            });
          })(e, n);
        })), true))), list: c, setSource: (e, t) => {
          const n = e + s;
          return i(n).then(e => {
            let r;
            return q.Pledge(false).then(() => {
              if (e && o.compare) return o.compare(e, t);
            }).then(s => s ? (l.log("si: remote source data matches, skip upload of", n), q.Pledge()) : (r = new Blob([t], {type: "text/plain"}), a && delete a[n], o.put(e || n, r)));
          });
        }, getSource: (e, t) => {
          const n = e + s;
          return i(n).then(r => r ? q.Pledge(false).then(() => {
            if (t && o.compare) return o.compare(r, t);
          }).then(e => e ? (l.log("si: remote source data matches, skip download of", n), q.Pledge(t)) : o.get(r).then(e => ht(e, "utf-8"))) : (l.warn("si: list cache does not contain this UUID", e), q.Breach()));
        }, getMeta: e => i(e + r).then(t => t ? o.get(t).then(e => ht(e, "utf-8")).then(n => {
          let r;
          if ((r = (e => {
            let t;
            try {
              t = JSON.parse(e);
            } catch (e) {}
            if (t && t.uuid) return t;
            l.log("si: unable to parse extended info of " + void 0);
          })(n)) && (r.uuid = e)) {
            let {options: n, url: s, precision: o, lastModified: a} = r;
            return a = t.modified || a || 0, o = t.precision || o, n = n || {}, {...r, uuid: e, url: s, options: n, precision: o, lastModified: a};
          }
        }) : q.Breach()), setMeta: (e, t) => {
          const n = new Blob([JSON.stringify(e)], {type: "text/plain"}), s = e.uuid + r;
          return i(s).then(e => o.put(e || s, n, t));
        }, remove: e => {
          const t = e.uuid + r;
          e.options.removed = Date.now();
          const n = new Blob([JSON.stringify(e)], {type: "text/plain"});
          return o.put(t, n).then(() => {
            const t = e.uuid + s;
            return i(t).then(e => {
              if (e) return a && delete a[t], o.delete(e);
            });
          });
        }, reset: () => o.list(true).then(e => e.filter(e => {
          const t = new RegExp(".meta.json$"), n = new RegExp(".user.js$");
          return e.name.match(t) || e.name.match(n);
        })).then(e => {
          const t = [];
          return e.forEach(e => {
            t.push((() => {
              const t = q();
              return o.delete(e).always(() => {
                t.resolve();
              }), t.promise();
            })());
          }), q.when(t).always(() => {
            a = void 0;
          });
        }).then(() => {}), getRemoteUrl: function (e) {
          if (o.getRemoteUrl) return o.getRemoteUrl(e.uuid + s);
        }, getRemoteDomains: function () {
          if (o.getRemoteDomains) return o.getRemoteDomains();
        }};
        return u;
      }, t = e({type: "drive", id: ll.eGDRIVE}), n = e({type: "dropbox", id: ll.eDROPBOX}), r = e({type: "onedrive", id: ll.eONEDRIVE}), s = e({type: "webdav", id: ll.eWEBDAV}), o = e({type: "yandex", id: ll.eYANDEX}), a = (() => {
        let e, t = false;
        const n = (t, n) => {
          il == ll.eCHROMESYNC && "sync" == n && q.Pledge().then(() => {
            const r = new RegExp(e + "$");
            t && Object.keys(t).forEach(e => {
              const s = t[e], a = s.newValue;
              if (l.log('si: storage key "%s" in namespace "%s" changed. Old value was "%s", new value is "%s".', e, n, s.oldValue, s.newValue), -1 != e.search(r)) for (let t = 0; t < cl.length; t++) if (c[e]) ; else {
                const n = o(a, e);
                n && cl[t](e, n);
              }
            });
          });
        }, r = e => {
          const t = q();
          let n = [];
          return e ? s().done(r => {
            n = r.filter(t => t.item.uuid == e), t.resolve(n);
          }).fail(e => {
            t.reject(e);
          }) : t.resolve(n), t.promise();
        }, s = () => pl(() => {
          const t = q(), n = new RegExp(e + "$");
          return Me.sync.get(null, e => {
            const r = [];
            e && Object.entries(e).forEach(([e, t]) => {
              if (-1 == e.search(n)) return;
              const s = o(t, e);
              s && r.push({key: e, item: s});
            }), t.resolve(r);
          }), t.promise();
        }), o = (e, t) => {
          let n;
          try {
            n = JSON.parse(e);
          } catch (e) {}
          if (n && (n.url || n.options)) return n;
          l.log("si: unable to parse extended info of " + t);
        }, a = e => e.then(e => {
          const t = {};
          if ((e = e.filter(e => {
            if (!t[e.key]) return t[e.key] = true, true;
          })).length > 1) {
            const t = q(), n = [], r = e.pop();
            return e.forEach(e => {
              n.push(A(e.key));
            }), q.when(n).done(() => {
              t.resolve(r);
            }), t.promise();
          }
          return q.Pledge(e[0]);
        });
        let i, c = {};
        const A = e => {
          const t = q();
          return Me.sync.remove(e, () => {
            const e = he.lastError;
            e ? t.reject(e) : t.resolve();
          }), t.promise();
        }, u = () => {
          const e = q();
          return Me.sync.set(c, () => {
            const t = he.lastError;
            t ? e.reject(t) : (c = {}, e.resolve());
          }), e.promise();
        }, d = () => q.Pledge().then(() => s()).then(t => {
          const n = new RegExp(e + "$"), r = [];
          return t.forEach(e => {
            const t = e.key, s = e.item, a = t.replace(n, "");
            let i;
            if (i = c[t] ? o(c[t], t) : s, !i) return;
            const l = i.options || {};
            r.push({uuid: l.removed ? a : i.uuid, lastModified: l.removed || i.lastModified, url: i.url, options: l});
          }), q.Pledge(r);
        }), p = {init: function () {
          let r = true;
          if (!t) try {
            Me.onChanged.addListener(n), t = true;
          } catch (e) {
            l.warn("si: error registering sync callback: " + e.message), r = false;
          }
          return e = "@v2", q.Pledge(r);
        }, list: d, setMeta: (t, n) => {
          const s = q();
          return a(r(t.uuid)).done(r => {
            let o;
            o = r ? r.key : t.uuid + e;
            const {uuid: a, options: l, url: A} = t, d = (null == n ? void 0 : n.lastModified) || 0, p = {...(null == r ? void 0 : r.item) || {}, url: A, options: l || {}, uuid: a, lastModified: d};
            c[o] = JSON.stringify(p), i && x(i), i = y(u, 3e3), s.resolve();
          }), s.promise();
        }, getMeta: e => d().then(t => {
          let n;
          return t.some(t => {
            if (t.uuid == e) return n = t, true;
          }), n;
        }), remove: t => {
          const n = q();
          return a(r(t.uuid)).done(r => {
            let s;
            s = r ? r.key : t.uuid + e;
            const {url: o, options: a, uuid: l, lastModified: A} = t, d = {...(null == r ? void 0 : r.item) || {}, url: o, options: a || {}, uuid: l, lastModified: A};
            d.options.removed = Date.now(), c[s] = JSON.stringify(d), i && (x(i), i = void 0), i = y(u, 3e3), n.resolve();
          }), n.promise();
        }, reset: () => pl(() => {
          const e = q();
          return Me.sync.clear(() => {
            c = {}, e.resolve();
          }), e.promise();
        })};
        return p;
      })();
      return {[ll.eCHROMESYNC]: Me.sync.supported ? a : void 0, [ll.eGDRIVE]: t, [ll.eDROPBOX]: n, [ll.eONEDRIVE]: r, [ll.eWEBDAV]: s, [ll.eYANDEX]: o};
    })();
    let dl;
    const pl = (e, t) => {
      const n = q();
      let r = void 0 !== t ? t : 3;
      const s = () => {
        if (Al) y(s, 500); else {
          Al = true;
          try {
            e().always(() => {
              Al = false;
            }).done(e => n.resolve(e)).fail(() => {
              --r > 0 ? (l.log("si: some retries left, wait for 60000 ms"), y(s, 6e4)) : (l.warn("si: no retries left, skipping this sync request!"), n.reject("no retries left"));
            });
          } catch (e) {
            l.warn(e), Al = false, n.reject(("string" == typeof e ? e : e.message) || "internal error");
          }
        }
      };
      return s(), n.promise();
    }, hl = {init: (e, t) => (cl = [], il = e, dl = ul[e], (null == dl ? void 0 : dl.init(t)) || q.Breach()), addChangeListener: e => {
      cl.push(e);
    }, getRemoteUrl: e => {
      if (dl && dl.getRemoteUrl) return dl.getRemoteUrl(e);
    }, getRemoteDomains: () => {
      if (dl && dl.getRemoteDomains) return dl.getRemoteDomains();
    }, caps: (() => {
      const e = {};
      return Object.defineProperties(e, {specialMeta: {get: function () {
        return dl && !!dl.getMeta;
      }, enumerable: true}, syncsSource: {get: function () {
        return dl && !!dl.getSource;
      }, enumerable: true}}), e;
    })(), types: ll, list: () => (null == dl ? void 0 : dl.list()) || q.Pledge([]), setMeta: (e, t) => (null == dl ? void 0 : dl.setMeta(e, t)) || q.Pledge(), getMeta: e => (null == dl ? void 0 : dl.getMeta(e)) || q.Pledge(), setSource: (e, t) => (null == dl ? void 0 : dl.setSource) ? dl.setSource(e, t) : q.Pledge(), getSource: (e, t) => (null == dl ? void 0 : dl.getSource) ? dl.getSource(e, t) : q.Pledge(), reset: () => (null == dl ? void 0 : dl.reset()) || q.Pledge(), remove: e => (null == dl ? void 0 : dl.remove(e)) || q.Pledge()}, fl = e => {
      const {uuid: t, name: n, downloadURL: r, fileURL: s, lastModified: o, options: a} = e, i = r ? r.split("#")[0] : void 0, l = s ? s.split("#")[0] : void 0, c = [l, i].filter(e => {
        const t = e ? bn(e) : void 0;
        if (!t || "file:" !== t.protocol) return e;
      })[0], {comment: A} = a;
      return {uuid: t, name: n, options: {comment: A || void 0}, durl: i, furl: l, url: c, lastModified: o || e.lastUpdated};
    }, ml = hl.getRemoteDomains, gl = hl.getRemoteUrl, vl = {ts: 0, data: {}};
    let _l = [];
    const bl = {init: () => {
      rt.addDifferentOriginChangeListener(ee.PREFIX.STORE, (e, t) => {
        const n = e.replace(ee.PREFIX.STORE, "");
        for (const [e, r] of Object.entries(t.data)) bl.notifyStorageListeners({uuid: n}, void 0, n => {
          const s = {data: {}, ts: 0};
          s.data[e] = r, s.ts = t.data.ts;
          const o = {storage: s};
          void 0 === s.data[e] && (o.removed = e), n(o);
        });
      });
    }, getUidList: () => {
      const e = new RegExp("^" + ee.PREFIX.SCRIPT_UID), t = [];
      return rt.listValues().forEach(n => {
        -1 != n.search(e) && t.push(n.replace(e, ""));
      }), t;
    }, getUidsByName: (e, t) => {
      const n = [];
      return bl.getUidList().forEach(r => {
        const s = bl.getMetaByUid(r);
        !s || s.name != e || t && t != s.namespace || n.push(r);
      }), n;
    }, getUidByName: e => bl.getUidsByName(e)[0], getStorageByUid: e => {
      const t = rt.getValue(ee.PREFIX.STORE + e, {ts: 0, data: {}});
      let {ts: n, data: r} = t || vl;
      return void 0 === n && (n = 0), void 0 === r && (r = {}), {ts: n, data: r};
    }, setStorageByUid: (e, t) => t ? rt.setValue(ee.PREFIX.STORE + e, t) : rt.deleteValue(ee.PREFIX.STORE + e), getMetaByUid: e => rt.getValue(ee.PREFIX.META + e, null), getByUid: (e, t) => {
      if (!e) return l.error("sb: no UUID set"), {};
      let n, r = rt.getValue(ee.PREFIX.META + e, null);
      if (r) {
        const {requires: s, resources: o} = r;
        let {sync: a} = r;
        r.requires = (s || []).map(e => {
          const {unsafe_url: t, abs_url: n} = e;
          return {unsafe_url: t, abs_url: n};
        }), r.resources = (o || []).map(e => {
          const {name: t, unsafe_url: n, abs_url: r} = e;
          return {name: t, unsafe_url: n, abs_url: r};
        }), r.uuid = e;
        const i = r.grant || [];
        r.grant = i.includes("none") ? ["none"] : i, r.options.override.use_connects || (r.connects = r.connects || [], r.options.override.merge_connects = true, r.options.override.use_connects = []), void 0 === r.options.check_for_updates && (r.options.check_for_updates = true), void 0 === r.options.tab_types && (r.options.tab_types = null), void 0 === r.options.compat_powerful_this && (r.options.compat_powerful_this = null), t && (r = yt(r, {})), a && !a.imported && (a = {imported: 9});
        const l = r.textContent, c = rt.getValue(ee.PREFIX.SCRIPT + e, l);
        c && (n = {...r, sync: a, textContent: c});
      }
      return {script: n, cond: rt.getValue(ee.PREFIX.COND + e, null)};
    }, setByUid: (e, t, n) => {
      if (!e) throw l.error("sb: no UUID set", t), new Error("No UUID set!");
      if ("string" != typeof t.textContent) throw new Error("No script code set!");
      const {name: r, includes: s, matches: o, excludes: a} = t, {textContent: i, ...c} = t, A = {...c, uuid: e}, u = {...A, textContent: i}, d = !!rt.getValue(ee.PREFIX.META + e), p = {};
      p[ee.PREFIX.META + e] = A, p[ee.PREFIX.SCRIPT_UID + e] = r, p[ee.PREFIX.COND + e] = {inc: s, match: o, exc: a}, p[ee.PREFIX.SCRIPT + e] = i;
      const h = rt.setValues(p);
      return d ? pr.emit("scriptEvent", {type: "changed", name: r, script: u, changed: d, sync: n}) : pr.emit("scriptEvent", {type: "added", name: r, script: u, sync: n}), Bo.removeAll(), Oo.remove(e), h;
    }, restoreByUid: (e, t) => {
      const n = bl.getByUid(e);
      if (!n.script || !n.cond) return q.Breach("invalid script");
      const {script: r, script: {name: s}} = n;
      delete r.deleted;
      const o = bl.setByUid(e, r);
      return void 0 === t && (t = true), pr.emit("scriptEvent", {type: "added", name: s, script: r, sync: t}), o;
    }, softRemoveByUid: (e, t) => {
      const n = bl.getByUid(e);
      if (!n.script || !n.cond) return q.Breach("invalid script");
      const {script: r, script: {name: s}} = n;
      r.deleted = Date.now();
      const o = bl.setByUid(e, r);
      return Bo.removeAll(), Oo.remove(e), void 0 === t && (t = true), pr.emit("scriptEvent", {type: "removed", name: s, script: r, sync: t}), o;
    }, removeByUid: e => {
      const t = bl.getByUid(e);
      if (!t) return q.Breach("not found");
      const n = q.when([rt.deleteValue(ee.PREFIX.SCRIPT_UID + e), rt.deleteValue(ee.PREFIX.COND + e), rt.deleteValue(ee.PREFIX.SCRIPT + e), rt.deleteValue(ee.PREFIX.META + e), rt.deleteValue(ee.PREFIX.STORE + e)]).then(() => {}), {script: r} = t;
      return Xr.values && r && Ss.tS(r.name, "r"), n;
    }, addStorageListener: (e, t, n, r, s) => {
      const o = {tabid: e, id: t, uuid: n, time: r, response: s};
      _l.push(o);
    }, removeStorageListeners: (e, t) => {
      void 0 === t && (t = true);
      const n = _l;
      _l = [], n.forEach(n => {
        if (void 0 !== e.tabid && e.tabid !== n.tabid || void 0 !== e.uuid && e.uuid !== n.uuid || void 0 !== e.id && e.id !== n.id) _l.push(n); else {
          l.verbose("sb: send empty response ", e);
          try {
            t && n.response({});
          } catch (t) {
            l.debug("sb: listener clear for script", e, "failed! Page reload?!");
          }
        }
      });
    }, notifyStorageListeners: (e, t, n) => {
      const r = e || {}, s = t || {};
      _l.forEach(e => {
        if (void 0 !== s.uuid && e.uuid === s.uuid || void 0 !== s.tabid && e.tabid === s.tabid || void 0 !== s.id && e.id === s.id || void 0 !== r.tabid && r.tabid !== e.tabid || void 0 !== r.uuid && r.uuid !== e.uuid || void 0 !== r.id && r.id !== e.id) ; else try {
          l.verbose("sb: notify/refresh/remove", r), n(e.response);
        } catch (e) {
          l.warn("sb: listener notification for script", r, "failed! Page reload?!");
        }
      });
    }}, wl = bl;
    let kl, yl = 0, Rl = false;
    const xl = {ts: 0}, El = {}, Sl = g({threads: 1}), Gl = {}, Cl = {comment: true}, Ml = !!w.Tests, Il = (e, t) => Sl.add(async () => {
      if (!kl.caps.syncsSource) {
        let t;
        if (!e.url || !(t = bn(e.url)) || !t.protocol.match(/https?:/)) return l.log("sync: skip export due to missing URL", e.name, e.url), false;
      }
      l.log("sync: export", e.name, e.url), pr.emit("syncProgressEvent", {type: "export", text: zn.getMessage("Export_script_0name0_0uuid0", e.name, e.uuid)});
      try {
        return kl.setSource && t && (pr.emit("syncProgressEvent", {type: "export", text: zn.getMessage("Export_script_source_of_0name0", e.name, e.uuid)}), await kl.setSource(e.uuid, t)), pr.emit("syncProgressEvent", {type: "export", text: zn.getMessage("Export_script_meta_data_of_0name0", e.name, e.uuid)}), await kl.setMeta(e, {lastModified: e.lastModified}), true;
      } catch (e) {
        return false;
      }
    }), Zl = () => {
      const e = wl.getUidList().map(e => {
        const t = wl.getByUid(e);
        if (t.script && t.cond && !t.script.deleted) {
          const e = fl(t.script);
          return e.lastModified || Ml ? t.script.evilness && t.script.evilness >= Math.min(ca.SEVERITY_MAX, Xr.values.script_blacklist_severity) ? void l.warn("sync: ignore evil script", t.script) : e : void l.warn("sync: script without updated/modified timestamps found", t.script);
        }
      }).filter(e => e);
      return e;
    }, Ul = (e, t, n) => n ? Math.floor(e / n) * n < Math.floor(t / n) * n : e < t, Tl = () => {
      Rl && (l.verbose("sync: remoteChangeCb()"), jl(500, true));
    };
    let Bl;
    const Ol = () => {
      Bl || (Bl = y(() => {
        Bl = void 0, Fl().done(() => {
          Rl && jl(3e3);
        });
      }, 3e3));
    }, Fl = () => {
      const e = q();
      return Rl = false, (() => {
        if (Xr.values.sync_enabled && Xr.values.sync_type) {
          let e = {};
          return Xr.values.sync_type == ll.eWEBDAV && (e = {url: Xr.values.cloud_url || void 0, basic_auth: at(Xr.values.cloud_user + ":" + Xr.values.cloud_pass)}), kl.init(Xr.values.sync_type, e).done(e => {
            Rl = e, Rl ? kl.addChangeListener(Tl) : l.warn("sync: init failed!");
          }).fail(() => {
            l.warn("sync: init failed!");
          });
        }
        return q.Pledge();
      })().always(() => {
        pr.on("scriptEvent", ({type: e, name: t, script: n, sync: r, changed: s}) => {
          if (!Rl || !r) return;
          l.verbose(`sync: script ${e} event for ${t} (changed: ${s}, sync: ${r})`);
          const o = fl(n);
          switch (e) {
            case "added":
              Il(o, n.textContent);
              break;
            case "changed":
              jl(6e4);
              break;
            case "removed":
              (e => {
                Sl.add(() => (pr.emit("syncProgressEvent", {type: "export", text: zn.getMessage("Remove_remote_script_0name0_0uuid0", e.name, e.uuid)}), l.log("sync: remove", e.name, e.url), kl.remove(e)));
              })(o);
          }
        }), e.resolve(Rl);
      }), e.promise();
    }, jl = (e, t) => {
      const n = Date.now();
      e = e || 500, t = xl.force || t, xl.to ? (x(xl.to), xl.ts < n + e && ((e = xl.ts - n) < 1 && (e = 1), l.verbose(`sync: re-schedule sync for run in ${e} ms`))) : l.log(`sync: schedule sync for run in ${e} ms`), xl.force = t, xl.ts = n + e, xl.to = y(() => {
        (e => {
          if (!Rl) return q.Breach();
          if (yl > 0) return e && pr.once("syncFinished", t => {
            t && jl(50, e);
          }), q.Breach();
          yl++, l.verbose("sync: start syncing = " + yl);
          let t = [], n = [], r = 0, s = 0, o = true;
          const a = e => {
            if (e) for (let t = 0; t < n.length; t++) if (n[t].uuid == e) return n[t];
            return null;
          };
          dr.all("status", {key: "sync_status", class: "information", title: zn.getMessage("Script_Sync"), text: zn.getMessage("Sync_is_running"), timeout: 9e5}), q.Pledge().then(() => (t = Zl(), (pr.emit("syncProgressEvent", {type: "lookup", text: zn.getMessage("Lookup_remote_script_list")}), kl.list()).done(e => {
            n = e;
          }).fail(() => {
            l.warn("sync: unable to get remotelist!");
          }))).then(() => {
            const e = n.map(e => {
              let n;
              const s = (e => {
                if (e) for (let n = 0; n < t.length; n++) if (t[n].uuid == e) return t[n];
              })(e.uuid);
              let o = false, a = 0;
              if (s) {
                if (!e.lastModified && Xr.values.sync_type == ll.eCHROMESYNC) for (const [t, n] of Object.entries(Cl)) if (true === n && s.options[t] != e.options[t]) {
                  l.log("sync: importable change detected!", e.uuid, "key:", t, e), o = true;
                  break;
                }
                e.lastModified && Ul(s.lastModified, e.lastModified, e.precision) && (a = e.lastModified, o = true, l.log("sync: importable change detected!", e.uuid, "local ts:", new Date(s.lastModified), "remote ts:", new Date(e.lastModified), e));
              } else (n = Gl[e.uuid]) && e.lastModified && Ul(n.lastModified, e.lastModified, e.precision) && (a = e.lastModified, o = true, l.log("sync: changed cache entry detected!", e.uuid, "local ts:", new Date(n.lastModified), "remote ts:", new Date(e.lastModified), e));
              if (!s && !n || o) return () => q.Pledge().then(() => kl.caps.specialMeta ? (pr.emit("syncProgressEvent", {type: "lookup", text: zn.getMessage("Lookup_remote_script_0uuid0", e.uuid)}), kl.getMeta(e.uuid)) : q.Pledge(e)).then(e => {
                if (!e) return;
                const {uuid: t, url: i} = e;
                if (s) {
                  if (e.options.removed) r++, pr.emit("syncProgressEvent", {type: "import", text: zn.getMessage("Remove_local_script_0name0_0uuid0", s.name, s.uuid)}), l.log(`sync: remove local script ${t}`, i), wl.softRemoveByUid(s.uuid, false); else if (o) return c = a, A = e.lastModified, ((u = e.precision) ? Math.floor(c / u) * u != Math.floor(A / u) * u : c != A) && (e.lastModified && l.warn("sync: list and meta data lastModified differ, this will cause extra traffic!", "file ts:", new Date(a), "meta ts:", new Date(e.lastModified), e), e.lastModified = a), r++, l.log(`sync: update local script ${t}`, i), pr.emit("syncProgressEvent", {type: "import", text: zn.getMessage("Update_local_script_0name0_0uuid0", s.name, s.uuid)}), q.Pledge().then(() => {
                    if (kl.caps.syncsSource && kl.getSource) {
                      const n = q();
                      return kl.getSource(t, void 0).then(e => e ? ii.doSave({uuid: t, src: e, ask: false, internal: true, save: true}) : q.Breach()).fail(() => {
                        l.warn(`sync: getting source of ${t} failed`, e);
                      }).always(() => n.resolve()), n.promise();
                    }
                  }).then(() => {
                    const {script: n} = wl.getByUid(s.uuid);
                    if (!n) return l.warn(`sync: getting entry ${t} failed`, e), q.Breach();
                    for (const [t, r] of Object.entries(Cl)) true === r && (n.options[t] = e.options[t] || null);
                    return n.lastModified = e.lastModified, ii.doModify(n.uuid, n, false);
                  });
                } else if (s || e.options.removed) !n && e.options.removed && (Gl[t] = e); else {
                  const n = q();
                  if (!(i && El[i] || t && El[t])) return (e => Sl.add(() => {
                    const {uuid: t, url: n, lastModified: r} = e;
                    pr.emit("syncProgressEvent", {type: "import", text: zn.getMessage("Import_remote_script_0uuid0", e.uuid)}), l.log("sync: import", t, n);
                    const s = {imported: Xr.values.sync_type}, o = {};
                    for (const [t, n] of Object.entries(Cl)) true === n && (o[t] = e.options[t]);
                    const a = {uuid: t, ask: false, internal: true, sync: s, force_meta: {lastModified: r, fileURL: n || void 0}, force_options: o}, i = {silent_fail: true};
                    return (kl.caps.syncsSource && kl.getSource ? kl.getSource(t).then(e => e ? ii.installFromSource(e, a, i) : (l.warn("sync: import export due to missing source", t, n), q.Breach()), () => {
                      l.warn("sync: import export due to missing source", t, n);
                    }) : n ? ii.installFromUrl(n, a, i) : (l.log("sync: skip import due to missing URL and source", t), q.Breach())).done(() => {
                      Bo.removeAll();
                    });
                  }))(e).done(n => {
                    n ? r++ : (l.warn("sync: unable to import", e), i && (El[i] = true), El[t] = true);
                  }).fail(() => {
                    l.warn("sync: unable to load", e), i && (El[i] = true), El[t] = true;
                  }).always(() => n.resolve()), n.promise();
                  l.warn("sync: skip previously failed import", e);
                }
                var c, A, u;
              });
            }).filter(e => e);
            return q.onebyone(e);
          }).then(() => (r && (ii.reorderScripts(), dr.all("status", {key: "sync", class: "information", title: zn.getMessage("Script_Sync"), text: zn.getMessage("0count0_changes_imported", r), timeout: 1e4})), t = Zl(), q.Pledge())).then(() => {
            const e = [];
            for (let n = 0; n < t.length; n++) e.push((() => {
              const e = t[n];
              let r, o;
              if (!kl.caps.syncsSource && !e.url) return q.Pledge();
              const i = a(e.uuid);
              var c, A, u;
              if (i ? i.lastModified && (c = e.lastModified, A = i.lastModified, !((u = i.precision) ? Math.floor(c / u) * u > Math.floor(A / u) * u : c > A)) || (r = true, l.log("sync: exportable change detected!", e.name, "remote ts:", new Date(i.lastModified), "local ts:", new Date(e.lastModified), e)) : l.log("sync: export because remotely missing!", e.name, "local ts:", new Date(e.lastModified), e), !i || r || kl.caps.syncsSource && !i.sourceAvailable) {
                if (kl.caps.syncsSource) {
                  const t = wl.getByUid(e.uuid);
                  t.script && t.cond && (o = t.script.textContent);
                }
                return Il(e, o).then(e => {
                  e && s++;
                });
              }
              return q.Pledge();
            })());
            return q.when(e);
          }).then(() => {
            o = true;
          }).fail(() => {
            o = false;
          }).always(() => {
            if (l.log("sync: finished"), 0 == --yl) {
              let e = zn.getMessage("Sync_finished");
              if (dr.all("status", {key: "sync_status", class: "information", title: zn.getMessage("Script_Sync"), text: e, timeout: 15e3}), s) {
                const t = zn.getMessage("0count0_changes_exported", s);
                dr.all("status", {key: "sync", class: "information", title: zn.getMessage("Script_Sync"), text: t, timeout: 5e3}), e = `${e}\n${t}`;
              }
              pr.emit("syncProgressEvent", {type: "finished", success: o, text: e}), pr.emit("syncFinished", o);
            }
          });
        })(xl.force), xl.to = xl.force = void 0;
      }, e);
    }, Ll = {get enabled() {
      return Rl;
    }, SYNCED: Cl, init: () => (kl = (e => (((e, t) => {
      zo = e => {
        let t = q();
        const n = al.openAndWatch({url: e.url, active: false}, e => {
          e ? t && t.notify(e) : t && (t.resolve(), t = void 0);
        });
        return {promise: t.promise(), close: function () {
          n.cancel();
        }};
      }, Ko = t;
    })(0, e), hl))(pe.manifest.version), Xr.addChangeListener(["sync_enabled", "sync_type", "cloud_url", "cloud_user", "cloud_pass"], Ol), Fl()), sync: jl, reset: () => Rl ? kl.reset() : q.Breach()};
    w.sycl = Ll;
    const Pl = Ll, Dl = "root", Vl = ["http://*/*", "https://*/*", "file://*/*"];
    let Nl, zl, ql, Ql = {}, Hl = {};
    const Xl = (e, t) => {
      const n = e.id;
      if (Ql[n]) {
        const t = e;
        delete t.id, Wl.update(n, t);
      } else Wl.create(e);
      Hl[n] = true, y(t, 1);
    }, Yl = () => {
      const e = q();
      return Wl.removeAll(() => {
        Nl = void 0, Ql = {}, e.resolve();
      }), e.promise();
    };
    let Wl;
    const Jl = {init: ({onclick: e}) => true === Pe.supported ? (Wl = Pe, Wl.onClicked.addListener((t, n) => {
      l.debug(t, n), n && t.menuItemId && t.parentMenuItemId && e && e({id: t.menuItemId, tab: n, frameId: t.frameId, url: t.frameUrl || t.pageUrl, isMenuCommand: t.parentMenuItemId != Dl});
    }), Yl()) : q.Pledge(), clean: e => {
      const t = q();
      return e.forEach(e => {
        Wl.remove(e, () => {
          const e = he.lastError;
          e && l.warn(e.message), t.resolve();
        });
      }), t.promise();
    }, update: ({contexters: e, commands: t}) => {
      if (zl) {
        ql && ql.deferred.reject();
        const n = q();
        return ql = {contexters: e, commands: t, deferred: n}, n.promise();
      }
      if (!e.length && !t.length) return Yl();
      const n = Object.keys(Ql);
      return Hl = {}, zl = q.Pledge().then(() => Nl || (() => {
        const e = q();
        return Yl().then(() => {
          const t = Nl = Wl.create({id: Dl, contexts: ["all"], title: "Tampermonkey", type: "normal", documentUrlPatterns: Vl}, () => {
            e.resolve(t);
          });
        }), e.promise();
      })()).then(() => {
        if (t.length) return q.when(t.map(e => ((e, t) => q.Pledge().then(() => {
          const n = q();
          return Xl({id: e, parentId: Dl, contexts: ["all"], title: `🛠 ${ t}`, type: "normal", documentUrlPatterns: Vl}, () => n.resolve()), n.promise();
        }))(e.uuid, e.scriptName)));
      }).then(() => ((e, t) => {
        const n = [];
        for (const t of e) {
          const e = q();
          Xl({id: t.uuid, contexts: ["all"], parentId: Dl, title: `🖱 ${ zn.getTranslation(t, "name")}`, type: "normal", documentUrlPatterns: Vl}, () => e.resolve()), n.push(e.promise());
        }
        for (const e of t) {
          const t = q();
          let r;
          try {
            const t = new RegExp("^" + _t(e.scriptName) + "[ -:+/]*");
            r = e.name.replace(t, "");
          } catch (e) {
            l.warn(e);
          }
          const s = {id: e.menuId, contexts: ["all"], parentId: e.uuid, title: `🔧 ${ r || e.name}`, type: "normal", documentUrlPatterns: Vl};
          Xl(s, () => t.resolve()), n.push(t.promise());
        }
        return q.when(n).then(() => {});
      })(e, t)).always(() => {
        const e = Et(Object.keys(Hl), n, "notinfirst");
        e.length && Jl.clean(e), Ql = Hl;
        const t = ql;
        zl = ql = void 0, t && Jl.update(t).then(t.deferred.resolve);
      }), zl;
    }}, Kl = Jl;
    let $l;
    const ec = 36e5, tc = {check: (e, t, n) => {
      if (!e && Xr.values.scriptUpdateCheckPeriod <= 0) return q.Breach();
      let r, s, o = ta();
      return !e && Date.now() - o.scripts < Math.max(Xr.values.scriptUpdateCheckPeriod, ec) ? q.Breach() : q.Pledge().then(() => {
        const e = () => {
          s = void 0;
          const e = zn.getMessage("Script_Update"), t = zn.getMessage("Waiting_for_sync_to_finish") + "...";
          s = fo.show(e, t, ao("tampermonkey"), {timeout: 6e4});
        };
        if (Pl.enabled) {
          const n = q();
          return pr.once("syncFinished", () => n.resolve()), Pl.sync(50, false), t && (r = y(e, 500)), n.promise();
        }
      }).then(() => {
        if (e) return;
        const t = q(), n = () => {
          ze(15, e => {
            "active" == e ? y(n, 1e3 * Math.round(7.5)) : r();
          });
        }, r = () => {
          let e;
          !function (e, t) {
            ie.windows.getAll(e, t);
          }({}, r => {
            r.forEach(t => {
              "fullscreen" === t.state && (e = true);
            }), e ? y(n, 15e3) : t.resolve();
          });
        };
        return n(), t.promise();
      }).then(() => {
        const e = q();
        return r && (x(r), r = void 0), s && s.cancel(), ((e, t) => {
          let n = 0, r = 0, s = 0;
          const o = zn.getMessage("Script_Update"), a = zn.getMessage("Check_for_userscripts_updates") + "...";
          e && fo.show(o, a, ao("tampermonkey"), {timeout: 1e4});
          const i = wl.getUidList().map(e => {
            let o, a;
            return (() => {
              const {script: r, cond: s} = wl.getByUid(e);
              if (!r || !s) return l.warn("update: inconsistent script entry", e, r, s), q.Breach();
              if (o = r, o.deleted) return q.Breach();
              const i = t && o.uuid !== t, c = !Xr.values.scriptUpdateCheckDisabled && !o.enabled && !t || !o.options.check_for_updates;
              if (i || c || !(a = ii.determineSourceURL(o))) return q.Breach();
              if (o.evilness && o.evilness >= Math.min(ca.SEVERITY_MAX, Xr.values.script_blacklist_severity)) return q.Breach();
              let A, u;
              return (A = ii.determineOrigin(o)) && (u = Ys[A.token]) && !u.updates(a) ? q.Breach() : (n++, l.info("update: check for script updates @", e), q.Pledge());
            })().then(() => {
              const e = ii.determineMetaURL(o);
              if (!e) return q.Pledge(void 0);
              if ("none" == e) return l.debug("update: ignore non-updatable script", o.name), q.Breach();
              const t = q(), n = {method: "GET", retries: re.RETRIES, timeout: 6e4, revalidate: true, headers: {Accept: "text/x-userscript-meta, */*"}, url: e};
              return xr.internal(n, {ondone: n => {
                let r;
                var s;
                4 == n.readyState && 200 == n.status && n.responseText ? (s = n.responseText, r = Ds(s)) : l.warn("update: unable to find meta data @ " + e + " req.status = " + n.status), t.resolve(r);
              }}), t.promise();
            }).then(e => e && e.version && o.version && Ns(e.version, o.version) != Ns.eNEWER ? (l.verbose("update: version of script " + o.name + " has NOT changed."), q.Breach()) : (l.verbose("update: version of script " + o.name + " has changed or doesn't exist -> running version check!"), q.Pledge())).then(() => {
              let e;
              if (a && (e = bn(a))) {
                if (e.protocol.match(/(https?|file):/)) return Co(a).fail(() => {
                  l.warn("update: failed", o.name, a);
                });
                l.warn("update: can't download URL", o.name, a);
              } else l.warn("update: can't parse URL", o.name, a);
            }).then(e => {
              if (e && ((e, t) => {
                const n = zs(t);
                if (!n || !n.name || void 0 === n.version) return Ns.eERROR;
                let r;
                if (r = wl.getMetaByUid(e)) {
                  if (r.system) return;
                  return n.version == r.version ? Ns.eEQUAL : Ns(n.version, r.version);
                }
                return Ns.eNEWER;
              })(o.uuid, e) == Ns.eNEWER) {
                r++;
                const t = {name: zn.getTranslation(o, "name"), url: a, code: e};
                return q.Pledge(t);
              }
              return q.Breach();
            }).then(e => {
              if (Xr.values.notification_silentScriptUpdate) return q.Pledge(e);
              {
                const t = zn.getMessage("There_is_an_update_for_0name0_avaiable_", e.name) + "\n" + zn.getMessage("Click_here_to_install_it_"), n = zn.getMessage("Just_another_service_provided_by_your_friendly_script_updater_") + ":", r = q();
                return fo.show(n, t, ao("tampermonkey"), {timeout: Xr.values.scriptUpdateHideNotificationAfter}, t => r.resolve(t.clicked ? e : void 0)), r.promise();
              }
            }).then(t => {
              const n = e || o.uuid;
              return t ? ii.doSave({url: t.url, uuid: n, replace: !n, src: t.code, ask: !Xr.values.notification_silentScriptUpdate}).done(e => {
                e && e.installed && s++;
              }) : q.Breach();
            });
          });
          return n && dr.all("status", {key: "script_update", class: "information", title: o, text: a, timeout: 1e4}), q.sidebyside(i).then(() => (i.length && 0 == r && (l.debug("No update found"), e && fo.show("Narf!", zn.getMessage("No_update_found__sry_"), ao("tampermonkey"), {timeout: 1e4}), dr.all("status", {key: "script_update", class: "information", text: zn.getMessage("No_update_found__sry_"), timeout: 1e4})), {found: r, installed: s}));
        })(t, n).done(t => {
          e.resolve(t.installed);
        }).fail(() => {
          e.resolve(void 0);
        }), o = ta(), o.scripts = Date.now(), na(o), e.promise();
      });
    }, init: () => {
      const e = () => {
        $l && (x($l), $l = void 0), Xr.values.scriptUpdateCheckPeriod > 0 && ($l = y(() => {
          $l = void 0, tc.check(), e();
        }, ec));
      };
      e(), Xr.addChangeListener("scriptUpdateCheckPeriod", e);
    }}, nc = tc;
    w.trup = nc;
    const rc = nc, sc = {}, oc = (e, t) => {
      const n = sc[e] = sc[e] || {};
      return n[t] = n[t] || {};
    }, ac = e => {
      const t = {};
      for (const n of Object.keys(sc).map(Number)) t[n] = sc[n][e];
      return t;
    }, ic = e => {
      delete sc[e];
    }, lc = 12096e5, cc = ["contributed", "later", "hide"];
    let Ac;
    const uc = {init: () => {
      let e;
      Ac = rt.getValue(ee.STORAGE.BEGGING);
      const t = Date.now();
      Ac ? (e = parseInt(rt.getValue(ee.STORAGE.LAST_START, "0"))) && t - e > lc && (Ac.later = {type: "after_pause", ts: t}, uc.save()) : (Ac = {first_run: {type: "from_init", ts: t}}, uc.save());
    }, save: () => {
      Ac && rt.setValue(ee.STORAGE.BEGGING, Ac);
    }, needed: () => {
      const e = Date.now(), t = !Ac.first_run || Ac.first_run.ts + lc < e, n = !Ac.hide, r = !Ac.contributed, s = !Ac.later || Ac.later.ts + lc < e;
      if (t && n && r && s) return Ac.later ? "l" : "i";
    }, clicked: (e, t, n) => {
      Ss.tG("clicked", e, t + n);
    }, dialog: {shown: e => {
      const t = Date.now();
      Ac.dialog = {ts: t, extra: e}, uc.save(), Ss.tG("dialog");
    }}, button: (() => {
      const e = {};
      for (const t of cc) e[t] = (e, n) => {
        const r = Date.now();
        Ac[t] = {ts: r, type: e, extra: n}, uc.save(), Ss.tG("button", t);
      };
      return e;
    })()}, dc = uc;
    let pc = [];
    const hc = {add: ({tabId: e, name: t, uuid: n, accessKey: r, menuId: s, scriptName: o, response: a}) => {
      pc.push({tabId: e, name: t, uuid: n, accessKey: r, menuId: s, scriptName: o, response: a});
    }, list: () => pc, listByTabId: e => {
      const t = {};
      return pc.filter(n => {
        const r = n.uuid + n.name;
        return n.tabId == e && !t[r] && (t[r] = true);
      });
    }, clearByTabId: e => {
      pc = pc.filter(t => t.tabId != e);
    }, getByTabId: e => pc.filter(t => t.tabId == e)[0], clearById: e => {
      pc = pc.filter(t => t.menuId != e);
    }, getById: e => pc.filter(t => t.menuId == e)[0], convertToMenuItems: e => {
      const t = {}, n = null == e || null == e ? hc.list() : hc.listByTabId(e);
      for (const e of n) {
        const n = {name: e.name, uuid: e.uuid, id: e.menuId, accessKey: e.accessKey, image: "menu_cmd", menucmd: true};
        (t[e.uuid] = t[e.uuid] || []).push(n);
      }
      return t;
    }}, fc = hc, mc = {}, gc = {}, vc = ("TM_" + St().substr(0, 5)).toLowerCase(), _c = ["content-security-policy", "x-content-security-policy", "x-webkit-csp"], bc = "feature-policy", wc = "x-frame-options", kc = Re.extraHeaderNeeded, yc = (e, t) => e.split(",").map(e => {
      let n, r, s, o;
      const a = [], i = [], c = e.split(";");
      let A, u;
      if (c.forEach((e, t) => {
        0 === e.search(/^\s*script-src /) ? r = t : 0 === e.search(/^\s*default-src /) ? s = t : 0 === e.search(/^\s*img-src /) ? o = t : 0 === e.search(/^\s*trusted-types /) || 0 === e.search(/^\s*require-trusted-types-for /) ? i.push(t) : 0 === e.search(/^\s*frame-ancestors /) && a.push(t);
      }), void 0 !== s && void 0 === r && (n = true, c.push(c[s].replace(/default-src /, "script-src ")), r = c.length - 1, l.verbose("webRequest: add script-src CSP", t)), void 0 !== s && void 0 === o && (n = true, c.push(c[s].replace(/default-src /, "img-src ")), o = c.length - 1, l.verbose("webRequest: add img-src CSP", t)), void 0 !== o && (u = false, A = c[o], -1 == A.search(/data:/) && (u = true, A = A.replace(/img-src /, "img-src data: ")), -1 != A.search(/'none'/) && (u = true, A = A.replace(/ 'none'/, "")), u && (l.verbose("webRequest: relaxing", c[o], " to ", A, t), c[o] = A, n = true)), void 0 !== r && (u = false, A = c[r], -1 == A.search(/ 'unsafe-eval'(\s|$)/) && (u = true, A = A.replace(/script-src /, "script-src 'unsafe-eval' ")), -1 != A.search(/ 'none'(\s|$)/) && (u = true, A = A.replace(/ 'none'/, "")), u && (l.verbose("webRequest: relaxing", c[r], A, t), c[r] = A, n = true)), void 0 !== s && (u = false, A = c[s], u && (l.verbose("webRequest: relaxing", A, t), n = true)), i.length) {
        for (const e of i) c[e] = "";
        n = true;
      }
      return n ? c.filter(e => e).join(";") : null;
    }).filter(e => e).join(",") || null, Rc = e => {
      if ((e => {
        let t;
        return J() >= 63 && (t = e.initiator), t && 0 !== (t + "/").indexOf(pe.getURL("/")) ? t : null;
      })(e)) return;
      const t = [];
      let n, r, s = e.requestHeaders || [];
      const o = {}, a = new RegExp("^" + vc);
      return s = s.filter(s => !s.name || 0 != s.name.search(a) || (r = s.name.replace(a, ""), o[r.toLowerCase()] = true, "internal" == r ? gc[e.requestId] = s.value : s.value && t.push({name: r, value: mt(s.value)}), void (n = true))), n ? {requestHeaders: s.filter(e => !e.name || !o[e.name.toLowerCase()]).concat(t)} : void 0;
    }, xc = e => {
      if (u.late) if ("main_frame" == e.type) {
        if (Qi.events.reset(e.tabId, true), e.tabId > 0 && "POST" != e.method && "auto" == Xr.values.scriptUrlDetection && So(e.url)) return l.verbose("webRequest: user script detected @ " + e.url + " -> open install page"), ii.installFromUrl(e.url, {}, {silent_fail: true}).fail(t => {
          l.info("webRequest: user script detected @ " + e.url + " was invalid", t ? t.messages : ""), ie.tabs.update(e.tabId, {url: e.url + "#bypass=true"}, () => {});
        }), {redirectUrl: "javascript:history.back()"};
      } else {
        let t, n;
        if ((t = Qi.get.requests(e.tabId, e.frameId)) && (n = ((e, t) => {
          let n = {};
          const r = e.url;
          return Object.keys(t).forEach(e => {
            const s = t[e];
            Object.entries(s.rules).some(([e, t]) => {
              let o, a, i;
              if (!(o = t.selector) || !(a = t.action)) return;
              const c = s.id + "/" + e;
              if ((i = Oo.get(c)) || (i = Uo({inc: o.include, match: o.match, exc: o.exclude}), Oo.set(c, i)), To(r, i)) {
                if (a.cancel) return l.log("webRequest: request was canceled by script " + s.uuid, r, t, s), s.callback && s.callback({type: "cancel", details: {rule: t, url: r}}), n = {cancel: true}, true;
                if (a.redirect) {
                  const {url: e, from: o, to: i} = a.redirect;
                  let c, A;
                  if (e) c = e; else if (o && i && (A = r.match(o))) {
                    A.shift();
                    let e = i;
                    A.concat(["", "", ""]).forEach((t, n) => {
                      e = e.replace("$" + (n + 1), t || "");
                    }), c = e;
                  }
                  const u = e => {
                    l.warn("webRequest: error while request redirect by script " + s.uuid, r, t, s), s.callback && s.callback({type: "redirect", message: "error", details: {description: e, rule: t, url: r, redirect_url: c}});
                  };
                  if (!c) return void u("unable to determine the redirect URL");
                  c = Rn(c), ea(c) ? ii.scriptWillRun(s.uuid, c) ? (l.log("webRequest: request was redirected by script " + s.uuid, r, c, t, s), s.callback && s.callback({type: "redirect", details: {rule: t, url: r, redirect_url: c}}), n.redirectUrl = c) : u("the redirect URL needs to be included by the scripts @include or @match tag") : u("the redirect URL is filtered by the security settings");
                }
              }
            });
          }), n;
        })(e, t))) return n;
      } else u.registerLateCallback(() => {
        xc(e);
      });
    }, Ec = (e, t) => {
      if (!u.late) return void u.registerLateCallback(() => {
        Ec(e, true);
      });
      let n, r, s, o, a, i = e.responseHeaders || [];
      if ("xmlhttprequest" == e.type) {
        let t, n;
        return gc[e.requestId] ? (re.COOKIE_PASSTHROUGH || i.forEach(e => {
          e.name && e.value && e.name.toLowerCase().includes("set-cookie") && (i.push({name: "tm-setcookie" + he.short_id.toLowerCase(), value: e.value}), n = true);
        }), (t = mc[e.requestId]) && (i.push({name: "tm-finalurl" + he.short_id.toLowerCase(), value: t}), n = true), n ? {responseHeaders: i} : void 0) : void 0;
      }
      const c = "remove" == Xr.values.webrequest_fixCSP, A = c || "yes" == Xr.values.webrequest_fixCSP, d = A && J() >= 60, p = A && false;
      if (i.some(e => {
        if (!e.name) return;
        const t = e.name.toLowerCase();
        return r = r || "location" == t, A && (s = s || _c.includes(t)), d && (o = o || t == bc), p && (a = a || t == wc), r;
      }), r) return void l.verbose("webRequest: redirect found, skip script determination", e);
      let h, f, m;
      if ("xmlhttprequest" == e.type) {
        const {runners: t, contexters: n} = hi.get(e.frameId, e.url, Ct(e));
        h = t.length + n.length;
      } else h = Qi.events.response(e.tabId, e.frameId, e.url, Ct(e));
      if (h && (s || o || a) && i.forEach((t, r) => {
        if (!t.name || !t.value) return;
        const A = t.name.toLowerCase();
        if (s && _c.includes(A)) if (c) n = true, i[r] = {name: t.name, value: void 0}; else {
          const s = yc(t.value, e);
          null === s || ("" === s ? (n = true, i[r] = {name: t.name, value: void 0}) : (n = true, i[r] = {name: t.name, value: s}));
        }
        if (o && A == bc) {
          let s;
          (s = ((e, t) => {
            let n, r;
            const s = e.split(";");
            let o, a;
            return s.forEach((e, t) => {
              0 === e.search(/^\s*sync-xhr /) && (r = t);
            }), void 0 !== r && (a = false, o = s[r], -1 != o.search(/'none'/) && (a = true, o = o.replace(/ 'none'/, " *")), a && (l.verbose("webRequest: relaxing", s[r], o, t), s[r] = o, n = true)), n ? s.join(";") : null;
          })(t.value, e)) && (n = true, i[r] = {name: t.name, value: s});
        }
        a && A == wc && (i[r] = {name: t.name, value: void 0});
      }), te.FAST_EXEC_SUPPORT && ["instant"].includes(Xr.values.runtime_inject_mode) && (f = Qi.events.run(e.tabId, e.frameId, e.url, Ct(e))) && (m = bn(e.url))) {
        const t = m.pathname + m.search, r = "TM_" + he.short_id + at(t.length + t).substr(0, 255).replace(/[#=/]/g, "_") + Date.now(), s = hi.answer(f, e.url, Ct(e), e.cookieStoreId), o = JSON.stringify(s), a = new Blob([o], {type: "binary/octet-stream"}), l = URL.createObjectURL(a);
        Qi.set.objurl(e.tabId, e.frameId, l), i.push({name: "set-cookie", value: r + "=" + Z(l) + "; max-age=15;"}), n = true;
      }
      if (h && !t && Re.filterResponseData && ["yes", "remove"].includes(Xr.values.webrequest_fixCSP) && "yes" == Xr.values.webrequest_fixContentCSP && ["main_frame", "sub_frame"].includes(e.type)) {
        let t;
        if (i.some(e => {
          if (e.name && e.value) return "content-type" == e.name.toLowerCase() && "text/html" == e.value.split(";")[0].toLowerCase().trim() ? (t = true, true) : void 0;
        }), t) {
          const t = Re.filterResponseData(e.requestId);
          t.ondata = n => {
            const r = new T("x-user-defined").decode(n.data, {stream: true}), s = new RegExp('(<head>[\\s\\S]*)(<meta[^>]+http-equiv="(?:' + _c.join("|") + ')"[^>]*>)([\\s\\S]*?<\\/head>)', "i");
            let o;
            const a = r.replace(s, (t, n, r, s) => {
              const a = new RegExp('(content=")([^">]+)(")');
              return n + r.replace(a, (t, n, r, s) => {
                const a = yc(r || "", e);
                return null !== a && (o = true), n + (a || r) + s;
              }) + s;
            });
            o ? t.write(ct(a)) : t.write(n.data), t.disconnect();
          }, t.onstop = () => {
            t && t.disconnect();
          };
        }
      }
      return n ? (i = i.filter(e => void 0 !== e.value), {responseHeaders: i}) : void 0;
    }, Sc = e => {
      const t = e.redirectUrl;
      if (t) {
        if (mc[e.requestId] = t, gc[e.requestId]) {
          const {tabId: n, frameId: r} = e;
          pr.emit("onRequestRedirect", {tabId: n, frameId: r, url: t});
        }
      } else l.warn("webRequest: onBeforeRedirect without redirectUrl", e);
    }, Gc = e => {
      u.late ? "xmlhttprequest" == e.type ? (delete gc[e.requestId], delete mc[e.requestId]) : e.fromCache && Qi.events.response(e.tabId, e.frameId, e.url, Ct(e)) : u.registerLateCallback(() => {
        Gc(e);
      });
    }, Cc = e => {
      "xmlhttprequest" == e.type ? (delete gc[e.requestId], delete mc[e.requestId]) : Qi.events.reset(e.tabId, true);
    }, Mc = e => {
      try {
        const t = ["http://*/*", "https://*/*", "ftp://*/*", "file:///*"].concat(te.WEBREQUEST_WEBSOCKET ? ["ws://*/*", "wss://*/*"] : []);
        e ? (Re.onBeforeRequest.addListener(xc, {urls: t, types: ["main_frame", "sub_frame", "script", "xmlhttprequest", ...te.WEBREQUEST_WEBSOCKET ? ["websocket"] : []]}, ["blocking"]), Re.onHeadersReceived.addListener(Ec, {urls: t, types: ["main_frame", "sub_frame", "xmlhttprequest"]}, ["blocking", "responseHeaders", ...kc ? ["extraHeaders"] : []]), te.WEBREQUEST_XHR_SUPPORT && Re.onBeforeRedirect.addListener(Sc, {urls: t, types: ["xmlhttprequest"]}, []), Re.onResponseStarted.addListener(Gc, {urls: t, types: ["main_frame", "sub_frame", "xmlhttprequest"]}, []), Re.onErrorOccurred.addListener(Cc)) : te.WEBREQUEST_XHR_SUPPORT && "no" != Xr.values.webrequest_modHeaders && Re.onBeforeSendHeaders.addListener(Rc, {urls: t, types: ["xmlhttprequest"]}, ["blocking", "requestHeaders", ...kc ? ["extraHeaders"] : []]), Re.handlerBehaviorChanged();
      } catch (e) {
        l.warn("webRequest: error initializings", e.message);
      }
    }, Ic = e => (() => {
      const t = q();
      return "activate" == e ? (ie.browserAction.openPopup && ie.browserAction.openPopup(), t.resolve()) : "toggle-enable" == e ? (Xr.values.enabled = !Xr.values.enabled, t.resolve()) : ie.tabs.getSelected(null, n => {
        if (!n) return void t.reject();
        let r;
        "open-dashboard" == e ? r = pe.getURL("options.html") + "#nav=dashboard" : "open-dashboard-with-running-scripts" == e ? r = pe.getURL("options.html") + "#nav=dashboard&filter=" + Z(n.url) : "open-new-script" == e && (r = pe.getURL("options.html") + "#url=" + at(n.url) + "&nav=new-user-script"), t.resolve(r ? {url: r, active: true, parent: n} : void 0);
      }), t.promise();
    })().then(e => {
      e && _e(e);
    }), Zc = "tm_content", Uc = {js: [{file: "page.js"}, {file: "content.js"}], matches: ["<all_urls>"], runAt: "document_start", allFrames: true};
    let Tc;
    const Bc = async () => {
      ["instant"].includes(Xr.values.runtime_inject_mode) ? await (async () => {
        await new Promise(e => {
          Tc.onPageChanged.removeRules(void 0, () => e());
        });
      })() : await (async () => {
        await new Promise(e => {
          Tc.onPageChanged.getRules([Zc], async t => {
            if (t.length) return e();
            Tc.onPageChanged.addRules([{id: Zc, conditions: [new Tc.PageStateMatcher({pageUrl: {urlContains: "://"}})], actions: [new Tc.RequestContentScript({js: Uc.js.map(e => e.file)})]}], () => e());
          });
        });
      })();
    }, Oc = {create: (e, t) => {
      const n = e || "", r = t || {}, s = e => q.onebyone(e).fail(() => {
        l.warn("tree: wait failed!");
      }).then(e => e.filter(e => e).reduce((e, t) => e.concat(t), [])), o = (e, t) => {
        const n = e.replace(/\.$/, "").split(".");
        let s = c;
        for (; n.length;) {
          const o = n.shift();
          if (void 0 === o) throw Error("invalid path segment");
          const a = s[o];
          if (!a) return l.warn("tree: unable to find", e, r), () => q.Pledge([]);
          if ("function" == typeof a) return () => a(r, !t);
          s = a, n.length || n.unshift("root");
        }
        return l.warn("tree: unable to find", e, r), () => q.Pledge([]);
      }, a = {root: e => {
        const t = q();
        return ie.tabs.getSelected(null, n => {
          n && n.id >= 0 ? r.tab = n : e && e.tabId && (r.tab = {id: e.tabId, index: -1, url: "", windowId: -1});
          const a = s([o("actions.general"), o("actions.scripts"), o("actions.commands")]);
          t.consume(a);
        }), t.promise();
      }, general: () => {
        const e = r.tab, t = e ? e.url : null, n = t && t.length > 4 && "" == t.substr(0, 4).replace(/file|http/, "") ? t : "", s = [], o = {name: "enabled", id: "enabled", sub_menu_item: true, pos: "top", items: [], tabId: null == e ? void 0 : e.id};
        let a;
        o.items.push({name: zn.getMessage("Enabled"), display: Xr.values.enabled ? void 0 : "greyed", id: "enabled", button: true, reload: true, enabler: true}), o.items = o.items.concat(dr.actionStatus().map(e => ({options: e, globalhint: true}))), s.push(o), !t || !So(t, true) || (a = So(t)) && "manual" != Xr.values.scriptUrlDetection || o.items.push({name: zn.getMessage(a ? "Install_this_script" : "Try_to_install_as_script"), image: "script_download", id: "installFromUrl", data: {url: t}, button: true, reload: true});
        const i = {name: "about", id: "about", sub_menu_item: true, pos: "bottom", items: []};
        i.items.push({name: zn.getMessage("Dashboard"), image: "utilities", url: pe.getURL("options.html") + "#" + ["url=" + at(n), "nav=dashboard"].join("&"), url_alt: (null == e ? void 0 : e.url) ? pe.getURL("options.html") + "#" + ["filter=" + Z(e.url), "url=" + at(n), "nav=dashboard"].join("&") : void 0, newtab: true});
        const l = "version=" + pe.manifest.version + "&ext=" + he.short_id;
        return i.items.push({image: "about", id: "about", urls: [{name: " " + zn.getMessage("Help"), url: "https://www.tampermonkey.net/faq.php?" + l, newtab: true}, {name: " " + zn.getMessage("Changelog"), url: "https://www.tampermonkey.net/changelog.php?" + l, newtab: true}, {social: true, newtab: true}]}), s.push(i), q.Pledge(s);
      }, scripts: {root: e => {
        const t = r.tab, n = t ? t.url : null, s = [], o = n ? bn(n) : null, a = o && ["http:", "https:", "file:"].includes(o.protocol) ? Rn(o) : "", i = {name: "scripts", id: "scripts", sub_menu_item: true, pos: "center", items: []}, l = {}, c = {}, A = {}, u = {}, d = {}, p = o ? oe.INTERNAL_PAGE_PROTOCOLS.includes(o.protocol) : null;
        if (t) {
          const e = Qi.getUniqueScriptsForTab(t);
          Object.keys(e).forEach(t => {
            const n = e[t];
            u[t] = n, d[t] = "z" + n.name.toLowerCase() + n.position;
          });
          const n = Qi.getScriptHistoryForTab(t);
          Object.keys(n).forEach(e => {
            const t = n[e];
            l[e] = t.urls, c[e] = t.count, A[e] = t.all_time;
            let r = u[e];
            if (!r) {
              const t = wl.getByUid(e);
              t.script && t.cond && !t.script.deleted ? u[e] = r = t.script : u[e] = r = {...Qs(), uuid: e, name: zn.getMessage("This_script_was_deleted"), enabled: true, deleted: Date.now(), textContent: "", resources: [], requires: []};
            }
            d[e] = "a" + r.name.toLowerCase() + r.position;
          });
        }
        let h;
        h = "position" == Xr.values.action_menu_scripts_sort ? (e, t) => e.position - t.position : "name" == Xr.values.action_menu_scripts_sort ? (e, t) => e.name.toLowerCase() < t.name.toLowerCase() ? -1 : e.name.toLowerCase() > t.name.toLowerCase() ? 1 : 0 : "enabled" == Xr.values.action_menu_scripts_sort ? (e, t) => 1e4 * (e.enabled ? 0 : 1) + e.position - (1e4 * (t.enabled ? 0 : 1) + t.position) : (e, t) => d[e.uuid].localeCompare(d[t.uuid]);
        const f = Object.values(u).sort(h);
        let m = ri(f, {active_urls: l, active_counts: c, all_time_active_counts: A});
        const g = t ? fc.convertToMenuItems(t.id) : {};
        let v;
        Xr.values.action_menu_scripts_hide_disabled && (m = m.filter(e => e.enabled || c[e.uuid])), m.forEach(e => {
          let t;
          (t = g[e.uuid]) && (e.menu_cmds = t);
        }), !Xr.values.action_menu_scripts_hide_disabled && Math.min(Xr.values.action_menu_columns, (e ? e.available_columns : null) || 99) > 2 ? (v = {name: "scripts_right", id: "scripts_right", sub_menu_item: true, pos: "right", items: []}, m.forEach(e => {
          e.enabled || c[e.uuid] ? i.items.push(e) : v.items.push(e);
        }), s.push(i), v.items.length && s.push(v)) : (v = i, i.items = i.items.concat(m), s.push(i)), Xr.values.enabled && !m.length && n && (p ? i.items.push({name: zn.getMessage("Tampermonkey_has_no_access_to_this_page"), image: "no_script", class: "disabled"}) : ea(n) ? i.items.push({name: zn.getMessage("No_script_is_running"), image: "no_script", class: "disabled"}) : i.items.push({name: zn.getMessage("This_page_is_blacklisted_at_the_security_settings"), image: "critical", class: "disabled"}));
        const _ = zn.getLocale();
        if (Xr.values.enabled) {
          let e;
          m.length ? (e = {name: "scripts_new", id: "scripts_new", sub_menu_item: true, pos: "center", items: []}, s.push(e)) : e = i;
          const t = !!Xr.values.userscript_search_url, n = Xr.values.userscript_search_mode;
          t && a && "click" == n ? e.items.push({name: zn.getMessage("Search_for_userscripts_for_this_tab"), image: "script_search", data: {url: a}, id: "script_search", button: true}) : t && a && ["action_menu", "badge"].includes(n) ? e.items.push({name: zn.getMessage("Searching_for_userscripts_for_this_tab"), image: "script_search", data: {url: a}, id: "script_search", class: "disabled", partial: true, referrer: "actions.script_search"}) : e.items.push({name: zn.getMessage("Get_new_scripts___"), image: "script_search", url: "https://www.tampermonkey.net/scripts.php" + (_ ? "?locale=" + _ : ""), newtab: true}), e.items.push({name: zn.getMessage("Add_new_script___"), image: "script_add", url: pe.getURL("options.html") + "#nav=new-user-script" + (p ? "" : "&url=" + at(a)), newtab: true});
        }
        return q.Pledge(s);
      }}, script_search: {root: async e => {
        let t;
        const n = null == e ? void 0 : e.url;
        let r, s;
        return t = n ? await Br(n) : {count: 0}, t.error || !t.url ? (r = zn.getMessage("Search_for_userscripts_for_this_tab"), s = {url: n}) : (r = t.count ? zn.getMessage("Found_0count0_available_scripts", t.count) : zn.getMessage("No_available_scripts"), s = {result_url: t.url}), [{name: r, data: s, button: true, image: "script_search", id: "script_search"}];
      }}, commands: () => {
        const e = [], t = {name: "commands", id: "commands", sub_menu_item: true, pos: "left", items: []}, n = {name: zn.getMessage("Utilities"), id: "commands", sub_menu_item: true, more_menu: true, pos: "left", items: []};
        if (n.items.push({name: zn.getMessage("Check_for_userscripts_updates"), id: "run_script_updates", button: true, image: "update"}), Xr.values.configMode >= 80 && n.items.push({name: zn.getMessage("Report_a_bug"), image: "bug", url: "https://www.tampermonkey.net/bug", newtab: true}), Xr.values.configMode >= 50) {
          let e, t, s, o;
          ["black", "black+white"].includes(Xr.values.page_filter_mode) && (e = r.tab) && (t = e.url) && (s = bn(t)) && !oe.INTERNAL_PAGE_PROTOCOLS.includes(s.protocol) && (o = s.hostname) && ea(t) && n.items.push({name: zn.getMessage("Blacklist_0domain0", o), image: "no", button: true, id: "blacklist_page", data: {domain: o}});
        }
        return t.items.push({name: zn.getMessage("Please_consider_a_contribution"), image: "contrib", button: true, id: "contrib"}), t.items.push(n), e.push(t), q.Pledge(e);
      }}, i = {root: () => s([o("options.general"), o("options.verification"), o("options.scripts"), o("options.settings"), o("options.trash")]), general: function () {
        let e, t, n = [];
        return pe.inIncognitoContext && "temporary" == Xr.values.incognito_mode ? n.push({globalhint: true, options: {id: "incognito", image: "critical", text: zn.getMessage("All_modifications_are_only_kept_until_this_incognito_session_is_closed_")}}) : (e = dr.optionsStatus().map(e => ({globalhint: true, options: e}))) && e.length ? n = n.concat(e) : (t = Eo.updateAvailable()) && n.push({globalhint: true, options: {id: "extensionupdate", image: "info", class: "information", text: zn.getMessage("0name0_0version0_is_available__Please_re_start_your_browser_to_update_", pe.manifest.name, t)}}), q.Pledge(n);
      }, verification: () => {
        const e = [];
        return no().forEach(t => {
          e.push({globalhint: true, options: {image: "critical", class: "warning", text: t.text, title: t.description, info_url: t.url}});
        }), q.Pledge(e);
      }, scripts: {root: (e, t) => {
        const n = q(), r = {name: zn.getMessage("Installed_userscripts"), main_menu_item: true, id: "dashboard"};
        return ((null == e ? void 0 : e.complete) || !t ? s(["options.scripts.userscripts", "options.scripts.new"].map(e => o(e))) : (r.referrer = "options.scripts", r.partial = true, s([o("options.scripts.new")]))).done(e => {
          r.items = e, n.resolve([r]);
        }).fail(n.reject), n.promise();
      }, new: () => {
        const e = [];
        return e.push({id: "new-script", name: zn.getMessage("New_userscript"), image: "script_add", icon: oo("unknown"), nnew: true, uuid: "new-user-script", position: -1, positionof: te.MAX_SCRIPTS, enabled: true, userscript: true}), q.Pledge(e);
      }, userscripts: {root: (e, t) => {
        const n = (null == e ? void 0 : e.complete) || !t ? void 0 : "options.scripts.userscripts", r = ii.determineScriptsToRun().filter(e => !e.deleted), s = ri(r, {options_page: true, referrer: n}), o = s.length, a = zn.getLocale();
        return s.push({id: "no-script-installed", name: zn.getMessage("No_script_is_installed"), image: "info", class: "disabled", visible: !o}), s.push({id: "get-some-scripts", name: zn.getMessage("Get_some_scripts___"), image: "edit_add", url: "https://www.tampermonkey.net/scripts.php" + (a ? "?locale=" + a : ""), newtab: true, visible: !o}), q.Pledge(s);
      }, matches: e => {
        const {filter: t, uuid: n} = e || {};
        let r;
        if (!t || !t.code) return q.Pledge([]);
        const s = /\/(.*)\/(.*)/.exec(t.code);
        if (!s) return q.Pledge([]);
        const o = new RegExp(s[1], s[2]);
        if (n) {
          const e = wl.getByUid(n);
          e.script && e.cond && (r = [e.script]);
        } else r = ii.determineScriptsToRun().filter(e => !e.deleted);
        if (r) {
          const e = r.map(e => -1 != e.textContent.search(o) ? e.uuid : null).filter(e => e);
          return q.Pledge(e);
        }
        return q.Pledge([]);
      }, source: e => {
        if (!(null == e ? void 0 : e.uuid)) return q.Pledge([]);
        const t = wl.getByUid(e.uuid);
        if (t.script && t.cond) {
          let e;
          return e = Xr.values.showFixedSrc ? mi.mkCompat(t.script.textContent, t.script, "off" != Xr.values.runtime_strict_mode) : t.script.textContent, q.Pledge([e]);
        }
        return l.warn("tree: unable to process ", t), q.Breach();
      }, storage: e => (null == e ? void 0 : e.uuid) ? q.Pledge([wl.getStorageByUid(e.uuid)]) : q.Pledge([]), external: e => {
        const {uuid: t, url: n} = e || {};
        if (!t) return q.Pledge([]);
        const r = wl.getByUid(t);
        if (r.script && r.cond) {
          let e;
          return [...r.script.requires, ...r.script.resources].some(r => {
            const s = r.url || _n(r.unsafe_url, r.abs_url);
            if (!s || s != n) return;
            const o = ba.getElement(t, s);
            return o && o.data && o.data.content ? (e = o.data.content, true) : void 0;
          }), q.Pledge([e]);
        }
        return l.warn("tree: unable to process ", r), q.Breach();
      }}}, trash: (() => {
        const e = "off" === Xr.values.trash_mode ? [] : ii.determineScriptsToRun().filter(e => e.deleted);
        return {root: (t, n) => {
          const r = q(), a = {name: zn.getMessage("Trash"), main_menu_item: true, hidden: !e.length, id: "trash", items: []};
          return (() => {
            if ((null == t ? void 0 : t.complete) || !n) {
              const e = s(["options.trash.userscripts"].map(e => o(e)));
              return e;
            }
            return a.referrer = "options.trash", a.partial = true, q.Pledge([]);
          })().done(e => {
            a.items = e, r.resolve([a]);
          }).fail(() => r.reject()), r.promise();
        }, userscripts: {root: (t, n) => {
          const r = (null == t ? void 0 : t.complete) || !n ? void 0 : "options.trash.userscripts", s = ri(e, {options_page: true, referrer: r});
          return q.Pledge(s);
        }}};
      })(), settings: (e, t) => {
        const n = q(), r = {name: zn.getMessage("Settings"), main_menu_item: true, id: "settings", selected_default: true, items: []};
        return ((null == e ? void 0 : e.complete) || !t ? q.Pledge((() => {
          const e = w.Tests, t = {id: "general", name: zn.getMessage("General"), sub_menu_item: true, items: []};
          t.items.push({name: zn.getMessage("Config_Mode"), id: "configMode", level: 0, option: true, select: [{name: zn.getMessage("Novice"), value: 0}, {name: zn.getMessage("Beginner"), value: 50}, {name: zn.getMessage("Advanced"), value: 100}], value: Xr.values.configMode, desc: zn.getMessage("Changes_the_number_of_visible_config_options")}), t.items.push({name: zn.getMessage("Language"), id: "i18n", level: 0, option: true, reload: true, warning: zn.getMessage("A_reload_is_required"), select: [{name: "Browser Default", value: null}, ...zn.supported], value: Xr.values.i18n, validation: {image: "info", opacity: 0.9, msg: zn.getMessage("Your_language_is_not_supported__Click_here_to_get_intructions_how_to_translate_TM_"), url: "https://www.tampermonkey.net/faq.php#Q500"}}), t.items.push({name: zn.getMessage("Auto_reload_on_script_enabled"), level: 20, id: "autoReload", option: true, checkbox: true, enabled: Xr.values.autoReload, desc: zn.getMessage("Auto_reload_on_script_enabled_desc")}), t.items.push({name: zn.getMessage("Anonymous_statistics"), level: 0, id: "statistics_enabled", option: true, checkbox: true, enabled: !!Xr.values.statistics_enabled, validation: {image: "info", opacity: 0.9, msg: zn.getMessage("Allow_Tampermonkey_to_collect_anonymous_statistics"), url: "https://www.tampermonkey.net/privacy.php#extension"}}), t.items.push({name: zn.getMessage("Debug_scripts"), level: 100, id: "debug", option: true, checkbox: true, enabled: Xr.values.debug, desc: ""}), t.items.push({name: zn.getMessage("Show_fixed_source"), level: 100, id: "showFixedSrc", option: true, checkbox: true, enabled: Xr.values.showFixedSrc, desc: ""}), t.items.push({name: zn.getMessage("LogLevel"), id: "logLevel", level: 0, option: true, select: [{name: zn.getMessage("Debug"), value: 80}, {name: zn.getMessage("Info"), value: 60}, {name: zn.getMessage("Warning"), value: 30}, {name: zn.getMessage("Error"), value: 0}], value: Xr.values.logLevel, desc: ""}), t.items.push({name: zn.getMessage("Trash_Mode"), id: "trash_mode", level: 50, option: true, select: [{name: zn.getMessage("Enabled"), value: "on"}, {name: zn.getMessage("Disabled"), value: "off"}, {name: zn.getMessage("Clean_after_session"), value: "session"}], value: Xr.values.trash_mode});
          const n = {id: "script_sync", name: zn.getMessage("Script_Sync"), sub_menu_item: true, level: 50, need_save: true, items: []};
          n.items.push({name: zn.getMessage("Enable_Script_Sync"), id: "sync_enabled", enabler: true, level: 50, option: true, checkbox: true, enabled: Xr.values.sync_enabled, desc: zn.getMessage("Synchronize_your_scripts_across_browsers_and_operation_systems")});
          const r = (() => {
            const e = [], t = {reset_sync: true, cloud_url: false, cloud_user: false, cloud_pass: false};
            return Me.sync.supported && e.push({name: zn.getMessage("Browser_Sync"), value: ll.eCHROMESYNC, enable: t}), e.push({name: zn.getMessage("Google_Drive"), value: ll.eGDRIVE, enable: t}), e.push({name: zn.getMessage("Dropbox"), value: ll.eDROPBOX, enable: t}), e.push({name: zn.getMessage("OneDrive"), value: ll.eONEDRIVE, enable: t}), e.push({name: zn.getMessage("Yandex_Disk"), value: ll.eYANDEX, enable: t}), e.push({name: zn.getMessage("WebDAV"), value: ll.eWEBDAV, enable: {reset_sync: true, cloud_url: true, cloud_user: true, cloud_pass: true}}), e;
          })();
          n.items.push({name: zn.getMessage("Sync_Type"), id: "sync_type", enabler: true, level: 50, option: true, select: r, value: Xr.values.sync_type}), n.items.push({name: zn.getMessage("URL"), id: "cloud_url", enabledBy: "sync_type", level: 50, option: true, text: true, width: 2, value: Xr.values.cloud_url}), n.items.push({name: zn.getMessage("Login"), id: "cloud_user", enabledBy: "sync_type", level: 50, option: true, text: true, width: 2, value: Xr.values.cloud_user}), n.items.push({name: zn.getMessage("Password"), id: "cloud_pass", enabledBy: "sync_type", level: 50, option: true, text: true, password: true, width: 2, value: Xr.values.cloud_pass}), n.items.push({name: zn.getMessage("Sync_Now"), id: "run_sync", enabledBy: "sync_enabled", level: 50, button: true}), n.items.push({name: zn.getMessage("Sync_Reset"), id: "reset_sync", enabledBy: "sync_enabled", level: 80, button: true, reload: true, warning: zn.getMessage("This_will_remove_all_remote_data_from_sync_Ok_")}), n.items.push({name: zn.getMessage("Recent_Sync_Log"), status: true, event: "syncProgressEvent", id: "sync_status"});
          const s = {id: "appearance", name: zn.getMessage("Appearance"), sub_menu_item: true, need_save: true, items: [], warning: zn.getMessage("A_reload_is_required"), reload: true};
          s.items.push({name: zn.getMessage("Layout"), id: "layout", level: 0, option: true, select: ro.map(e => {
            const {name: t, theme: n, layout: r} = e;
            return {name: t, value: n ? [r, n].join("#") : r};
          }), value: Xr.values.layout, desc: ""}), s.items.push({name: zn.getMessage("Custom_CSS"), id: "layout_user_css", level: 100, option: true, input: true, value: Xr.values.layout_user_css, desc: zn.getMessage("You_can_add_your_custom_CSS_rules_here_")}), s.items.push({name: zn.getMessage("Update_Notification"), id: "notification_showUpdate", level: 50, option: true, select: [{name: zn.getMessage("Disabled"), value: "off"}, {name: zn.getMessage("Show_notification"), value: "notification"}, {name: zn.getMessage("Open_changelog"), value: "changelog"}], value: Xr.values.notification_showUpdate, validation: "off" == Xr.values.notification_showUpdate ? {image: "critical", msg: zn.getMessage("Are_you_sure_that_you_don_t_want_to_be_notified_of_updates_")} : void 0}), s.items.push({name: zn.getMessage("Favicon_Service"), id: "favicon_service", level: 50, option: true, select: [{name: zn.getMessage("Google"), value: "google"}, {name: zn.getMessage("DuckDuckGo"), value: "duckduckgo"}, {name: zn.getMessage("Native"), value: "native", warning: zn.getMessage("Warning_unsafe_site_warnings_might_appear_")}], value: Xr.values.favicon_service});
          const o = {id: "action_menu", name: zn.getMessage("Action_Menu"), sub_menu_item: true, need_save: true, items: [], level: 50};
          o.items.push({name: zn.getMessage("Hide_disabled_scripts"), id: "action_menu_scripts_hide_disabled", level: 100, option: true, checkbox: true, enabled: Xr.values.action_menu_scripts_hide_disabled, desc: ""}), o.items.push({name: zn.getMessage("Columns"), id: "action_menu_columns", level: 50, option: true, select: [{name: zn.getMessage("1"), value: 1}, {name: zn.getMessage("2"), value: 2}, {name: zn.getMessage("3"), value: 3}], value: Xr.values.action_menu_columns}), o.items.push({name: zn.getMessage("Script_order"), id: "action_menu_scripts_sort", level: 50, option: true, select: [{name: zn.getMessage("Auto"), value: "auto"}, {name: zn.getMessage("Position_"), value: "position"}, {name: zn.getMessage("Name"), value: "name"}, {name: zn.getMessage("Enabled"), value: "enabled"}], value: Xr.values.action_menu_scripts_sort}), o.items.push({name: zn.getMessage("Icon_badge_info"), id: "appearance_badges", level: 50, option: true, select: [{name: zn.getMessage("Disabled"), value: "off"}, {name: zn.getMessage("Running_scripts"), value: "running"}, {name: zn.getMessage("Unique_running_scripts"), value: "running_unique"}], value: Xr.values.appearance_badges}), o.items.push({name: zn.getMessage("Icon_badge_color"), id: "appearance_badge_color", option: true, level: 100, color: true, value: Xr.values.appearance_badge_color});
          const a = {id: "context_menu", name: zn.getMessage("Context_Menu"), sub_menu_item: true, items: [], level: 50};
          let i;
          a.items.push({name: zn.getMessage("Enable_context_menu"), id: "context_menu_enabled", level: 50, option: true, checkbox: true, enabled: Xr.values.context_menu_enabled, desc: ""}), a.items.push({name: zn.getMessage("Scripts_activated_by_context_menu"), id: "context_menu_scripts", level: 50, option: true, checkbox: true, enabled: Xr.values.context_menu_scripts, desc: ""}), a.items.push({name: zn.getMessage("Script_menu_commands"), id: "context_menu_commands", level: 50, option: true, checkbox: true, enabled: Xr.values.context_menu_commands, desc: ""}), Xr.values.userscript_search_url && (i = {id: "userscript_search", name: zn.getMessage("Userscript_Search"), sub_menu_item: true, level: 0, items: [], reload: true}, i.items.push({name: zn.getMessage("Userscript_search_integration_mode"), id: "userscript_search_mode", level: 0, option: true, select: [{name: zn.getMessage("Disabled"), value: "off"}, {name: zn.getMessage("On_Click"), value: "click"}, {name: zn.getMessage("On_Action_Menu"), value: "action_menu"}, {name: zn.getMessage("Add_to_icon_badge_text"), value: "badge"}], value: Xr.values.userscript_search_mode, validation: {image: "info", opacity: 0.9, msg: zn.getMessage("In_order_to_search_for_userscripts__0on_action_menu0__and__0icon_badge_number0__automatically_transfer_the_tab_s_url_to_the_search_website__0on_click0_opens_the_search_page_on_click_Please_click_at_this_icon_to_open_the_privacy_policy_", zn.getMessage("Add_to_icon_badge_text"), zn.getMessage("On_Action_Menu"), zn.getMessage("On_Click")), url: Fr()}}));
          const l = {id: "editor", name: zn.getMessage("Editor"), sub_menu_item: true, level: 20, need_save: true, items: [], warning: zn.getMessage("A_reload_is_required"), reload: true};
          l.items.push({name: zn.getMessage("Enable_Editor"), id: "editor_enabled", level: 100, option: true, checkbox: true, enabled: Xr.values.editor_enabled, desc: ""}), l.items.push({name: zn.getMessage("Theme"), id: "editor_theme", level: 50, option: true, select: Object.keys(so).map(e => ({name: so[e] || e, value: e})), value: Xr.values.editor_theme}), l.items.push({name: zn.getMessage("Font_Size"), id: "editor_fontSize", level: 50, option: true, select: [{name: "50%", value: 50}, {name: "70%", value: 70}, {name: "80%", value: 80}, {name: "90%", value: 90}, {name: "100%", value: 100}, {name: "110%", value: 110}, {name: "120%", value: 120}, {name: "150%", value: 150}], value: Xr.values.editor_fontSize}), l.items.push({name: zn.getMessage("Key_Mapping"), id: "editor_keyMap", level: 50, option: true, select: [{name: zn.getMessage("Windows"), value: "windows"}, {name: zn.getMessage("Sublime"), value: "sublime"}, {name: zn.getMessage("Emacs"), value: "emacs"}, {name: zn.getMessage("Vim"), value: "vim"}], value: Xr.values.editor_keyMap}), l.items.push({name: zn.getMessage("Indentation_Width"), id: "editor_indentUnit", level: 50, option: true, select: [{name: zn.getMessage("1"), value: 1}, {name: zn.getMessage("2"), value: 2}, {name: zn.getMessage("3"), value: 3}, {name: zn.getMessage("4"), value: 4}, {name: zn.getMessage("5"), value: 5}, {name: zn.getMessage("6"), value: 6}, {name: zn.getMessage("7"), value: 7}, {name: zn.getMessage("8"), value: 8}, {name: zn.getMessage("9"), value: 9}, {name: zn.getMessage("10"), value: 10}, {name: zn.getMessage("11"), value: 11}], value: Xr.values.editor_indentUnit, desc: ""}), l.items.push({name: zn.getMessage("Tab_Size"), id: "editor_tabSize", level: 50, option: true, select: [{name: zn.getMessage("1"), value: 1}, {name: zn.getMessage("2"), value: 2}, {name: zn.getMessage("3"), value: 3}, {name: zn.getMessage("4"), value: 4}, {name: zn.getMessage("5"), value: 5}, {name: zn.getMessage("6"), value: 6}, {name: zn.getMessage("7"), value: 7}, {name: zn.getMessage("8"), value: 8}, {name: zn.getMessage("9"), value: 9}, {name: zn.getMessage("10"), value: 10}, {name: zn.getMessage("11"), value: 11}], value: Xr.values.editor_tabSize, desc: ""}), l.items.push({name: zn.getMessage("Indent_with"), id: "editor_indentWithTabs", level: 50, option: true, select: [{name: zn.getMessage("Tabs"), value: "tabs"}, {name: zn.getMessage("Spaces"), value: "spaces"}], value: Xr.values.editor_indentWithTabs, desc: ""}), l.items.push({name: zn.getMessage("TabMode"), id: "editor_tabMode", level: 50, option: true, select: [{name: zn.getMessage("Classic"), value: "classic"}, {name: zn.getMessage("Smart"), value: "smart"}, {name: zn.getMessage("Indent"), value: "indent"}], value: Xr.values.editor_tabMode, desc: ""}), l.items.push({name: zn.getMessage("Highlight_selection_matches"), id: "editor_highlightSelectionMatches", level: 50, option: true, select: [{name: zn.getMessage("Cursor"), value: "cursor"}, {name: zn.getMessage("On"), value: "on"}, {name: zn.getMessage("Off"), value: "off"}], value: Xr.values.editor_highlightSelectionMatches, desc: ""}), l.items.push({name: zn.getMessage("Line_break"), id: "editor_lineWrapping", level: 50, option: true, checkbox: true, enabled: Xr.values.editor_lineWrapping, desc: ""}), l.items.push({name: zn.getMessage("Reindent_on_typing"), id: "editor_electricChars", level: 50, option: true, checkbox: true, enabled: Xr.values.editor_electricChars, desc: ""}), l.items.push({name: zn.getMessage("Enable_autoSave"), id: "editor_autoSave", level: 20, option: true, checkbox: true, enabled: Xr.values.editor_autoSave, desc: ""}), l.items.push({name: zn.getMessage("Enable_easySave"), id: "editor_easySave", level: 20, option: true, checkbox: true, enabled: Xr.values.editor_easySave, desc: ""}), l.items.push({name: zn.getMessage("Highlight_trailing_whitespace"), id: "editor_highlightTrailingWhitespace", level: 50, option: true, checkbox: true, enabled: Xr.values.editor_highlightTrailingWhitespace, desc: ""}), l.items.push({name: zn.getMessage("Trim_trailing_whitespace_from_modified_lines"), id: "editor_trimTrailingSpacesFromModifiedLines", level: 50, option: true, checkbox: true, enabled: Xr.values.editor_trimTrailingSpacesFromModifiedLines, desc: ""}), l.items.push({name: zn.getMessage("Auto_syntax_check_on_typing"), id: "editor_autoLint", level: 50, option: true, checkbox: true, enabled: Xr.values.editor_autoLint, desc: zn.getMessage("Enable_this_option_to_automatically_check_the_code_on_typing_")}), l.items.push({name: zn.getMessage("Auto_syntax_check_max_length"), id: "editor_autoLintMaxLen", level: 50, option: true, text: true, value: Xr.values.editor_autoLintMaxLen, desc: zn.getMessage("Check_only_scripts_up_to_this_size_automatically_")}), l.items.push({name: zn.getMessage("Custom_Linter_Config"), id: "editor_linter_config", level: 100, option: true, input: true, json: true, value: Xr.values.editor_linter_config, validation: {image: "info", opacity: 0.9, msg: zn.getMessage("You_can_add_your_custom_linter_config_here_"), url: "https://eslint.org/docs/user-guide/configuring"}});
          const c = {id: "script_update", name: zn.getMessage("Script_Update"), sub_menu_item: true, level: 0, items: []};
          c.items.push({name: zn.getMessage("Check_disabled_scripts"), id: "scriptUpdateCheckDisabled", level: 0, option: true, checkbox: true, enabled: Xr.values.scriptUpdateCheckDisabled, desc: ""}), c.items.push({name: zn.getMessage("Dont_ask_me_for_simple_script_updates"), id: "notification_silentScriptUpdate", level: 80, option: true, checkbox: true, enabled: Xr.values.notification_silentScriptUpdate, desc: ""}), c.items.push({name: zn.getMessage("Check_interval"), id: "scriptUpdateCheckPeriod", level: 0, option: true, select: [{name: zn.getMessage("Never"), value: 0}, {name: zn.getMessage("Every_6_Hours"), value: 216e5}, {name: zn.getMessage("Every_12_Hour"), value: 432e5}, {name: zn.getMessage("Every_Day"), value: 864e5}, {name: zn.getMessage("Every_Week"), value: 6048e5}], value: Xr.values.scriptUpdateCheckPeriod, desc: ""}), c.items.push({name: zn.getMessage("Hide_notification_after"), id: "scriptUpdateHideNotificationAfter", level: 50, option: true, select: [{name: zn.getMessage("Never"), value: 0}, {name: zn.getMessage("15_Seconds"), value: 15e3}, {name: zn.getMessage("30_Seconds"), value: 3e4}, {name: zn.getMessage("1_Minute"), value: 6e4}, {name: zn.getMessage("5_Minutes"), value: 3e5}, {name: zn.getMessage("1_Hour"), value: 36e5}], value: Xr.values.scriptUpdateHideNotificationAfter, desc: ""});
          const A = {id: "externals", name: zn.getMessage("Externals"), sub_menu_item: true, level: 0, items: []};
          A.items.push({name: zn.getMessage("Update_interval"), id: "external_update_interval", level: 0, option: true, select: [{name: zn.getMessage("Always"), value: 1}, {name: zn.getMessage("Every_Day"), value: 864e5}, {name: zn.getMessage("Every_Week"), value: 6048e5}, {name: zn.getMessage("Every_Month"), value: 2592e6}, {name: zn.getMessage("Never"), value: 0}], value: Xr.values.external_update_interval, desc: ""});
          const u = {id: "security", name: zn.getMessage("Security"), sub_menu_item: true, need_save: true, level: 50, items: []};
          u.items.push({name: zn.getMessage("Sandbox_Mode"), id: "sandbox_mode", level: 80, option: true, select: [{name: zn.getMessage("Default"), value: "default"}, {name: zn.getMessage("All"), value: "raw+"}, {name: zn.getMessage("Force_Raw"), value: "raw"}, ...["js", "-js", "js+"].includes(Xr.values.sandbox_mode) ? [{name: zn.getMessage("Force_JavaScript"), value: "js"}, {name: zn.getMessage("Raw_and_JavaScript"), value: "-js"}, {name: zn.getMessage("JavaScript_and_DOM"), value: "js+"}] : [], {name: zn.getMessage("Force_DOM"), value: "dom"}], value: Xr.values.sandbox_mode, desc: zn.getMessage("Configures_which_sandbox_values_are_valid"), validation: ["dom", "js+", "raw+"].includes(Xr.values.sandbox_mode) ? {image: "critical", msg: zn.getMessage("DOM_mode_is_unsecure__Scripts_can_install_new_scripts_")} : void 0}), u.items.push({name: zn.getMessage("Add_TM_to_CSP"), id: "webrequest_fixCSP", level: 80, option: true, select: [{name: zn.getMessage("Remove__possibly_unsecure_"), value: "remove"}, {name: zn.getMessage("Yes"), value: "yes"}, {name: zn.getMessage("No"), value: "no"}], value: Xr.values.webrequest_fixCSP, desc: zn.getMessage("Tampermonkey_might_not_be_able_to_provide_access_to_the_unsafe_context_when_this_is_disabled")}), u.items.push({name: zn.getMessage("Allow_headers_to_be_modified_by_scripts"), id: "webrequest_modHeaders", level: 80, option: true, reload: true, select: [{name: zn.getMessage("Yes"), value: "yes"}, {name: zn.getMessage("Auto"), value: "auto"}, {name: zn.getMessage("No"), value: "no"}], value: Xr.values.webrequest_modHeaders, warning: zn.getMessage("Tampermonkey_needs_to_be_restarted_to_make_this_change_apply_Do_you_want_to_continue_"), desc: ""}), u.items.push({name: zn.getMessage("Default_tab_types_to_run_scripts_in"), id: "default_tab_types", level: 80, option: true, reload: true, select: [{name: zn.getMessage("Incognito_tabs"), value: "incognito"}, {name: zn.getMessage("Normal_tabs"), value: "normal"}, {name: zn.getMessage("All_tabs"), value: "incognito+normal"}], value: Xr.values.default_tab_types}), te.ALLOWS_FILE_SCHEME_ACCESS && u.items.push({name: zn.getMessage("Script_local_files_access"), id: "script_file_access", level: 80, option: true, select: [{name: zn.getMessage("All_local_files"), value: "all"}, {name: zn.getMessage("require_and_resource"), value: "externals"}, {name: zn.getMessage("Disabled"), value: "off"}], value: Xr.values.script_file_access}), u.items.push({name: zn.getMessage("Allow_communication_with_cooperate_pages"), id: "external_connect", level: 80, option: true, reload: true, select: [{name: zn.getMessage("Tampermonkey_and_script_version"), value: "all"}, {name: zn.getMessage("Tampermonkey_version"), value: "version"}, {name: zn.getMessage("Disabled"), value: "off"}], value: Xr.values.external_connect, desc: zn.getMessage("This_option_allows_the_Tampermonkey_homepage_and_some_script_hosting_pages_to_determine_the_Tampermonkey_version_and_whether_a_script_is_installed_")}), u.items.push({name: zn.getMessage("Subresource_Integrity"), id: "require_sri_mode", level: 80, option: true, select: [{name: zn.getMessage("Disabled"), value: "ignore"}, {name: zn.getMessage("Validate_if_supported"), value: "supported"}, {name: zn.getMessage("Validate_if_given"), value: "given"}, {name: zn.getMessage("Enforce"), value: "enforce"}], value: Xr.values.require_sri_mode, desc: zn.getMessage("Script_authors_can_secure_external_resources_by_adding_a_SRI_hash_to_the_URL_")});
          let d = [];
          (Xr.values.configMode >= 80 || ["off", "casual"].includes(Xr.values.connect_mode)) && (d = d.concat([{name: zn.getMessage("Disabled"), value: "off"}, {name: zn.getMessage("Casual"), value: "casual"}])), d = d.concat([{name: zn.getMessage("Ask_if_unknown"), value: "ask"}, {name: zn.getMessage("Strict"), value: "strict"}, {name: zn.getMessage("Always_ask"), value: "paranoid"}]), u.items.push({name: zn.getMessage("Script_Include_Mode"), id: "script_include_mode", level: 50, option: true, select: [{name: zn.getMessage("Disabled"), value: "off"}, {name: zn.getMessage("Treat_like__match"), value: "match"}, {name: zn.getMessage("Unsafe"), value: "unsafe"}, {name: zn.getMessage("Default"), value: "default"}], value: Xr.values.script_include_mode, desc: zn.getMessage("Using__include_is_potentially_unsafe_and_may_be_obsolete_soon___0off0_disables__include_completely__0match0__is_safe__but_may_not_compatible_the_script_developers_intention__0unsafe0__mostly_keeps_the_legacy_behavior_0default0__means__0used_default0", zn.getMessage("Disabled"), zn.getMessage("Treat_like__match"), zn.getMessage("Unsafe"), zn.getMessage("Default"), zn.getMessage("Unsafe"))}), u.items.push({name: zn.getMessage("connect_mode"), id: "connect_mode", level: 50, option: true, select: d, value: Xr.values.connect_mode, desc: ""}), te.INCOGNITO_MODE && !pe.inIncognitoContext && u.items.push({name: zn.getMessage("Store_data_in_incognito_mode"), id: "incognito_mode", level: 50, option: true, select: [{name: zn.getMessage("Temporary"), value: "temporary"}, {name: zn.getMessage("Permanent"), value: "permanent"}], value: Xr.values.incognito_mode, validation: "temporary" == Xr.values.incognito_mode ? void 0 : {image: "critical", msg: "Permanent mode is still a BETA feature!"}}), u.items.push({name: zn.getMessage("Page_Filter_Mode"), id: "page_filter_mode", level: 50, option: true, select: [{name: zn.getMessage("Disabled"), value: "off"}, {name: zn.getMessage("Blacklist"), value: "black"}, {name: zn.getMessage("Whitelist"), value: "white"}, {name: zn.getMessage("Both"), value: "black+white"}], value: Xr.values.page_filter_mode, desc: ""}), u.items.push({name: zn.getMessage("Whitelisted_Pages"), id: "page_whitelist", level: 50, option: true, input: true, array: true, value: Xr.values.page_whitelist, desc: ""}), u.items.push({name: zn.getMessage("Blacklisted_Pages"), id: "forbiddenPages", level: 50, option: true, input: true, array: true, value: Xr.values.forbiddenPages, desc: ""});
          const p = {id: "blackcheck", name: zn.getMessage("BlackCheck"), sub_menu_item: true, need_save: true, level: 50, items: []};
          let h;
          p.items.push({name: zn.getMessage("Script_Blacklist_Source"), id: "script_blacklist_type", level: 50, option: true, select: [{name: zn.getMessage("Disabled"), value: "off"}, {name: zn.getMessage("Server_And_Manual"), value: "server"}, {name: zn.getMessage("Only_Manual"), value: "only_manual"}], value: Xr.values.script_blacklist_type}), p.items.push({name: zn.getMessage("Blacklist_Severity"), id: "script_blacklist_severity", level: 50, option: true, select: [{name: zn.getMessage("severity_1"), value: 1}, {name: zn.getMessage("severity_2"), value: 2}, {name: zn.getMessage("severity_3"), value: 3}, {name: zn.getMessage("severity_4"), value: 4}, {name: zn.getMessage("severity_5"), value: 5}, {name: zn.getMessage("severity_6"), value: 6}, {name: zn.getMessage("severity_7"), value: 7}, {name: zn.getMessage("severity_8"), value: 8}, {name: zn.getMessage("severity_9"), value: 9}, {name: zn.getMessage("severity_10"), value: ca.SEVERITY_MAX}], value: Xr.values.script_blacklist_severity}), p.items.push({name: zn.getMessage("Manual_Script_Blacklist"), id: "require_blacklist", level: 50, option: true, input: true, array: true, value: Xr.values.require_blacklist, desc: ""});
          {
            const e = ["exe", "sh", "crx", "com", "bat", "scr"].map(e => "name." + e).some(e => Ja.is_whitelisted(e));
            h = {id: "downloads", name: zn.getMessage("Downloads") + " BETA", sub_menu_item: true, need_save: true, level: 50, items: []}, h.items.push({name: zn.getMessage("Download_Mode"), id: "downloads_mode", level: 50, option: true, select: [{name: zn.getMessage("Default"), value: Ja.staticVars.DEFAULT}, {name: zn.getMessage("Disabled"), value: Ja.staticVars.OFF}, {name: zn.getMessage("Native"), value: Ja.staticVars.NATIVE}, {name: zn.getMessage("Browser_API"), value: Ja.staticVars.CHROME}].filter(e => e.value), value: Xr.values.downloads_mode, desc: zn.getMessage("The_Browser_API_mode_requires_a_special_permission_")}), h.items.push({name: zn.getMessage("Whitelisted_File_Extensions"), id: "downloads_extension_whitelist", level: 50, option: true, input: true, array: true, value: Xr.values.downloads_extension_whitelist, desc: zn.getMessage("Only_files_with_these_extensions_can_be_saved_to_the_harddisk_Be_careful_to_not_allow_file_extensions_that_represent_executables_at_your_operating_system_"), validation: e ? {image: "critical", msg: zn.getMessage("Your_whitelist_seems_to_include_executable_files_This_means_your_userscripts_may_download_malware_or_spyware_to_your_harddisk_")} : void 0});
          }
          const f = {id: "experimental", name: zn.getMessage("Experimental"), sub_menu_item: true, level: 80, items: []};
          te.FAST_EXEC_SUPPORT && f.items.push({name: zn.getMessage("Inject_Mode"), id: "runtime_inject_mode", level: 80, option: true, select: [{name: zn.getMessage("Default"), value: "default"}, {name: zn.getMessage("Instant"), value: "instant"}, {name: zn.getMessage("Normal"), value: "normal"}], value: Xr.values.runtime_inject_mode}), f.items.push({name: zn.getMessage("strict_mode"), id: "runtime_strict_mode", level: 80, option: true, select: [{name: zn.getMessage("Default"), value: "byscript"}, {name: zn.getMessage("Always"), value: "on"}, {name: zn.getMessage("Disabled"), value: "off"}], value: Xr.values.runtime_strict_mode}), f.items.push({name: zn.getMessage("top_level_await"), id: "runtime_top_level_await", level: 80, option: true, select: [{name: zn.getMessage("Default"), value: "default"}, {name: zn.getMessage("Enabled"), value: "on"}, {name: zn.getMessage("Disabled"), value: "off"}], value: Xr.values.runtime_top_level_await}), Re.filterResponseData && f.items.push({name: zn.getMessage("Add_Tampermonkey_to_the_site_s_content_csp"), id: "webrequest_fixContentCSP", level: 80, option: true, select: [{name: zn.getMessage("Yes"), value: "yes"}, {name: zn.getMessage("No"), value: "no"}], value: Xr.values.webrequest_fixContentCSP, warning: "Warning: enabling this option is may break pages!"});
          const m = {id: "userscripts", name: zn.getMessage("Userscripts"), sub_menu_item: true, need_save: true, level: 80, items: []};
          m.items.push({name: zn.getMessage("Script_URL_detection"), id: "scriptUrlDetection", level: 80, option: true, select: [{name: zn.getMessage("Auto"), value: "auto"}, {name: zn.getMessage("Disabled"), value: "manual"}], value: Xr.values.scriptUrlDetection}), m.items.push({name: zn.getMessage("New_script_template_"), id: "script_templates", level: 80, option: true, input: true, array: true, named: true, value: Xr.values.script_templates});
          const g = {id: "reset", name: zn.getMessage("Reset_Section"), sub_menu_item: true, level: 50, items: []};
          return g.items.push({name: zn.getMessage("Restart_Tampermonkey"), id: "reset_simple", level: 50, button: true, reload: true, warning: zn.getMessage("This_will_restart_Tampermonkey_Ok_")}), g.items.push({name: zn.getMessage("Factory_Reset"), id: "reset_factory", level: 80, button: true, reload: true, warning: zn.getMessage("This_will_remove_all_scripts_and_reset_all_settings_Ok_")}), e && g.items.push({name: "Install Tests", id: "install_tests", level: 80, button: true, reload: false, ignore: true, warning: "This will install a lot of test scripts!"}), [t, s, o, a, i, c, A, n, l, u, p, h, m, f, g].filter(e => e);
        })()) : (r.referrer = "options.settings", q.Pledge([]))).done(e => {
          r.items = e, n.resolve([r]);
        }).fail(n.reject), n.promise();
      }}, c = {actions: a, options: i};
      return l.debug("tree: loading", n, r), o(n, true)();
    }, level: e => e.replace(/\.$/, "").split(".").length}, Fc = Oc, jc = {};
    let Lc;
    const Pc = ({tabId: e, frameId: t, url: n}) => {
      const r = jc[e];
      r && r.forEach(r => {
        r({tabId: e, frameId: t, url: n});
      });
    }, Dc = {addListener: (e, t) => {
      jc[e] = jc[e] || [], jc[e].push(t), !Lc && Object.keys(jc).length && (xe && Ee && Ee.addListener(Pc), Lc = true);
    }, removeListener: (e, t) => {
      let n;
      const r = jc[e];
      r && (n = r.indexOf(t)) > -1 && r.splice(n, 1), 0 === r.length && delete jc[e];
    }, removeListeners: e => {
      delete jc[e];
    }}, Vc = Dc;
    var Nc = e(2462), zc = e.n(Nc);
    const qc = (() => {
      let e, t, n = false;
      const r = () => {
        const e = q();
        return t = e, e;
      };
      return {write: () => {
        const t = q();
        return n = false, e = new (zc()), t.resolve(e), t.promise();
      }, open: s => {
        const o = r();
        return n = true, zc().loadAsync(s).then(t => {
          e = t, o.resolve(e);
        }, e => {
          t && t.reject(e), o.reject(e);
        }), o.promise();
      }, entries: () => {
        const t = r(), n = e.files, s = Object.keys(n).map(e => {
          const t = n[e];
          if (t && !t.dir) return {filename: t.name};
        }).filter(e => e);
        return t.resolve(s), t.promise();
      }, get: t => {
        const n = r(), s = e.file(t.filename);
        return s ? s.async("arraybuffer").then(e => {
          n.resolve(e);
        }) : n.resolve(), n.promise();
      }, put: (t, n, s) => {
        const o = r();
        try {
          e.file(t, n, {date: s ? new Date(s) : void 0}), o.resolve();
        } catch (e) {
          o.reject(e);
        }
        return o.promise();
      }, end: () => {
        const t = r();
        return n ? t.reject() : e.generateAsync({type: "blob", compression: "DEFLATE", comment: "Created by Tampermonkey"}).then(e => t.resolve(e), e => t.reject(e)), t.promise();
      }};
    })(), Qc = {zip: {create: function (e, t) {
      const n = q();
      return q.Pledge().then(() => qc.write()).then(() => {
        const t = q(), r = {}, s = (e, t) => {
          let n = [e, t].join(".");
          if (r[n]) {
            let o;
            do {
              o = e + " (" + r[n] + ")", n = [o, t].join("."), r[n]++;
            } while (r[n]);
            return s(o, t);
          }
          return r[n] = 1, n;
        }, o = e.length, a = () => {
          if (!e.length) return t.resolve();
          const r = e.shift();
          if (!r) return t.resolve();
          const i = r.meta.name.replace(/[\\/$*?|]/g, "-"), c = s(i, "user.js"), A = s(i, "options.json"), u = s(i, "storage.json"), d = {options: r.options, settings: r.settings, meta: r.meta}, p = JSON.stringify(d), f = r.storage ? JSON.stringify(r.storage) : null;
          n.notify("Zip: " + Math.floor((o - e.length) / o * 100) + "%"), qc.put(c, r.source, r.meta.modified).then(() => qc.put(A, p)).then(() => f ? qc.put(u, f) : q.Pledge()).then(() => {
            if (!r.resources.length && !r.requires.length) return q.Pledge();
            const e = [];
            return ["resources", "requires"].forEach(t => {
              const n = r[t];
              n && n.length && n.forEach(n => {
                if (void 0 === n.source) return;
                const r = n.meta.name.replace(/[\\/$*?|]/g, "-"), s = ut(t + n.meta.url), o = [c, s, r].join("-"), a = JSON.stringify(n.meta), i = ct(n.source, {encoding: "resources" == t ? void 0 : "UTF-8"}), l = qc.put(o, i).then(() => qc.put(o + "." + t + ".json", a));
                e.push(l);
              });
            }), q.when(e);
          }).fail(() => {
            l.log("porter: add to zip failed");
          }).always(async () => {
            await h(1e3), a();
          });
        };
        return a(), t.promise();
      }).then(() => t ? qc.put("Tampermonkey.global.json", JSON.stringify(t)) : q.Pledge()).then(() => qc.end()).done(e => {
        n.resolve(e);
      }).fail(() => {
        n.reject();
      }), n.promise();
    }, read: function (e) {
      const t = q();
      let n;
      return q.Pledge().then(() => qc.open(e)).then(() => qc.entries()).then(e => {
        const r = q(), s = {}, o = {}, a = e.length, i = () => {
          const c = e.shift();
          if (c) qc.get(c).done(e => {
            let t = c.filename.match(/((.*)\.(storage\.json)|(.*)\.(options\.json)|(.*)\.(global\.json)|(.*)\.(user\.js)|(.*)\.user\.js-[0-9a-f]+-.*\.(resources\.json)|(.*)\.user\.js-[0-9a-f]+-.*\.(requires\.json))$/);
            if (t && (t = t.slice(1).filter(e => e)), !e || !t || t.length < 3) o[c.filename] = e; else try {
              const r = t[1], o = t[2], a = lt(e, "UTF-8");
              if ("global.json" == o) n = JSON.parse(a); else {
                const e = s[r] || {resources: {}, requires: {}};
                s[r] = e, "user.js" == o ? e.source = a : "options.json" == o ? e.options = JSON.parse(a) : "resources.json" == o ? e.resources[c.filename] = {name: c.filename, data: JSON.parse(a)} : "requires.json" == o ? e.requires[c.filename] = {name: c.filename, data: JSON.parse(a)} : "storage.json" == o && (e.storage = JSON.parse(a));
              }
            } catch (e) {
              l.warn("porter: read from zip failed", e);
            }
          }).always(async () => {
            t.notify("Zip: " + Math.floor((a - e.length) / a * 100) + "%"), await h(1e3), i();
          }); else {
            const e = [];
            for (const [t, n] of Object.entries(s)) {
              const {options: r, source: s, storage: a} = n;
              if (!s) {
                l.warn(`porter: invalid script ${t}`);
                continue;
              }
              const i = {requires: [], resources: []};
              ["resources", "requires"].forEach(e => {
                for (const t of Object.values(n[e])) {
                  const n = t.name.replace("." + e + ".json", ""), r = o[n];
                  r && i[e].push({meta: t.data, source: lt(r, {encoding: "resources" == e ? void 0 : "UTF-8"}) || void 0});
                }
              });
              const c = {...i, ...r, source: s, storage: a};
              e.push(c);
            }
            r.resolve({scripts: e, global_settings: n});
          }
        };
        return i(), r.promise();
      }).done(e => {
        t.resolve(e);
      }).fail(() => {
        t.reject();
      }), t.promise();
    }}, json: {create: function (e, t) {
      const n = q(), r = {created_by: "Tampermonkey", version: "1", scripts: [], settings: t};
      return e.forEach(e => {
        const t = {name: e.meta.name, options: e.options, storage: e.storage, enabled: e.settings.enabled, position: e.settings.position, file_url: e.meta.file_url, uuid: e.meta.uuid, source: at(st(e.source))};
        ["resources", "requires"].forEach(n => {
          const r = e[n];
          if (!r || !r.length) return;
          const s = t[n] = [];
          r.forEach(e => {
            if (void 0 === e.source) return;
            const t = e.meta, n = at(st(e.source));
            s.push({meta: t, source: n});
          });
        }), r.scripts.push(t);
      }), n.resolve(JSON.stringify(r)), n.promise();
    }, read: function (e) {
      const t = q(), n = (e, r) => {
        if (e.trim()) {
          let s = null;
          try {
            s = JSON.parse(e);
            const n = e => {
              if (e && e.length) return e.map(e => ({meta: e.meta, source: e.source ? ot(it(e.source)) : e.source}));
            }, r = s.scripts.map(e => ({meta: {uuid: e.uuid, name: e.name, file_url: e.file_url}, settings: {enabled: e.enabled, position: e.position}, options: e.options, storage: e.storage, source: ot(it(e.source)), resources: n(e.resources) || [], requires: n(e.requires) || []}));
            return t.resolve({scripts: r, global_settings: s.settings});
          } catch (t) {
            if (!r) {
              const t = "<body>", r = "</body>";
              if (-1 != e.indexOf(t)) {
                const s = e.indexOf(t), o = e.lastIndexOf(r);
                if (-1 != s && -1 != o) return e = e.substr(s + t.length, o - (s + t.length)), n(e, true);
              }
            }
          }
        }
        t.reject();
      };
      return n(e), t.promise();
    }}}, Hc = Qc, Xc = se.LOCALSTORAGE, Yc = St(), Wc = (() => {
      const e = {allow: {script: "window.close"}, exec: (e, t, n) => {
        const r = t && t.tab ? t.tab.id : null;
        var s, o;
        r ? (s = {windowType: "normal"}, o = e => {
          if (e.length <= 1) {
            const e = "refused to close last tab!";
            l.warn("bg:", e), n({error: e});
          } else ie.tabs.remove(r, () => {
            const e = he.lastError;
            n({error: e ? e.message : void 0});
          });
        }, ie.tabs.query(s, o)) : n({error: "internal error"});
      }}, t = {allow: {extpage: true}, exec: (e, t, n) => {
        const {key: r} = e;
        r && (dr.removeAll(r), Xc && r === aa && Xc.removeItem(aa)), n({});
      }}, n = {allow: {extpage: true}, exec: (e, t, n) => {
        ("options" == t.extpage || "options" == e.origin ? q.Pledge(t.tab) : Mo()).then(t => {
          let r, s, o;
          if (e.uuid && (r = wl.getByUid(e.uuid)) && r.script && r.cond) {
            let n;
            s = ii.determineOrigin(r.script), "hoster" == e.to && s ? o = s : (n = r.script.supportURL || (null == s ? void 0 : s.issue_url) || (null == s ? void 0 : s.url)) && (o = {issue_url: n}), o && (Ss.tS(r.script.name, "m"), _e({url: o.abuse_url || o.issue_url, active: true, parent: t}, () => {}));
          }
          n({});
        });
      }}, r = {allow: {extpage: true}, exec: (e, t, n) => {
        if ("dialog" == e.action) dc.dialog.shown(e.extra); else if ("clicked" == e.action) {
          let t, n;
          e.extra && (t = e.extra.amount, n = e.extra.currency), dc.clicked(e.type, t || "?", n || "?");
        } else if (dc.button[e.action]) {
          const t = dc.button[e.action];
          t && t(e.type, e.extra);
        } else l.warn("bg: Warning: unknown request ", e);
        n({});
      }}, s = {allow: {extpage: true}, exec: async (e, t, n) => {
        const r = "options" == t.extpage || "options" == e.origin, s = () => {
          n({});
        };
        switch (e.name) {
          case "reset_simple":
            $a.reset(s);
            break;
          case "reset_factory":
            $a.factoryReset(s);
            break;
          case "reset_sync":
            Pl.reset().always(s);
            break;
          case "run_sync":
            pr.once("syncFinished", () => s()), Pl.sync(1, true);
            break;
          case "install_tests":
            {
              const e = "chrome", t = w.Tests.framework.prepare(ii, wl, e, J(), s);
              t && l.error(t);
              break;
            }
          case "enabled":
            {
              const {name: t} = e;
              Xr.setValue(t, !Xr.values[t]).always(s);
              break;
            }
          case "installFromUrl":
            {
              const {data: {url: t, source: o, transferable: a}} = e;
              let i;
              if (a) {
                const e = Bt.fromTransferableData(a);
                if (!e) throw new Error("Invalid Transferable");
                const n = await e.toBlob();
                if (!n) throw new Error("Invalid Transferable");
                const r = await ht(n, "utf-8");
                i = ii.installFromSource(r, {url: t});
              } else i = o ? ii.installFromSource(o, {url: t}) : ii.installFromUrl(t);
              i.done(() => {
                r ? Fc.create("options.scripts").done(e => {
                  const t = {success: true, items: e, options: Xr.snapshot};
                  n(t);
                }) : s();
              }).fail(() => s());
              break;
            }
          case "externals_delete":
            {
              const {safe_url: t, scriptuid: r} = e;
              ba.cleanElement(r, t), Fc.create("options.scripts").done(e => {
                n({items: e, options: Xr.snapshot});
              }).fail(e => {
                n({error: e || "unknown error", options: Xr.snapshot});
              });
              break;
            }
          case "focus_tab":
            {
              const {tabid: t} = e;
              Wc.focusTab.exec({}, {tab: {id: t, url: "", index: -1, windowId: -1}, url: "", frameId: 0, id: pe.manifest.id}, s);
              break;
            }
          case "run_script_updates":
            {
              const {scriptuid: t} = e;
              if (t) {
                let e;
                rc.check(true, false, t).done(t => {
                  e = t;
                }).always(() => {
                  n({scriptuid: t, updatable: e});
                });
              } else rc.check(true, true), s();
              break;
            }
          case "blacklist_page":
            {
              const {data: t} = e, n = t.domain;
              if (!n) throw new Error("Blacklisted domain is missing!");
              const r = "/" + on(`*://*.${n}/*`, true) + "/";
              Xr.setValue("forbiddenPages", Xr.values.forbiddenPages.concat([r])).always(s);
              break;
            }
          case "script_search":
            {
              const {data: t} = e, {url: n, result_url: r} = t;
              if (n) {
                const e = {url: Or(n), active: true};
                _e(e, s);
              } else {
                if (!r) throw new Error("Search URL is missing!");
                _e({url: r, active: true}, s);
              }
              break;
            }
          case "contrib":
            {
              const e = {url: pe.getURL("options.html") + "#contribute", active: true};
              _e(e, s);
              break;
            }
          default:
            l.warn("bg: Warning: unknown button " + name), s();
        }
      }}, o = {allow: {extpage: true}, exec: (e, t, n) => {
        for (const t of e.uuids) ii.doRemove(t, true);
        ii.reorderScripts(), q.onebyone([() => Fc.create("options.scripts"), () => Fc.create("options.trash")]).then(e => e.filter(e => e).reduce((e, t) => e.concat(t), [])).done(e => {
          const t = {items: e, options: Xr.snapshot};
          n(t);
        }).fail(e => {
          n({error: e || "unknown error", options: Xr.snapshot});
        });
      }}, a = {allow: {extpage: true}, exec: (e, t, n) => {
        const r = void 0 === e.reload || !!e.reload, s = "options" == t.extpage || "options" == e.origin, o = t => {
          s ? r ? q.onebyone([() => Fc.create("options.scripts"), () => Fc.create("options.trash")]).then(e => e.filter(e => e).reduce((e, t) => e.concat(t), [])).done(e => {
            const r = {...t, items: e, options: Xr.snapshot};
            n(r);
          }).fail(e => {
            n({error: e || "unknown error", options: Xr.snapshot});
          }) : n({}) : ie.tabs.getSelected(null, t => {
            Fc.create("actions").done(e => {
              n({items: e, i18n: Xr.values.i18n, options: {enabled: Xr.values.enabled}});
            }).fail(() => {
              n({items: [], i18n: Xr.values.i18n, options: {enabled: Xr.values.enabled}});
            }), !t || t.id < 0 || e.uuid && Xr.values.autoReload && ("function" == typeof {frameId: 0} && (r = {frameId: 0}, {frameId: 0} = {}), ie.tabs.sendMessage(t.id, {method: "reload"}, {frameId: 0}, r));
          });
        };
        if (e.clean) {
          const t = e.uuid;
          if (!t) return n({error: "uuid missing", options: Xr.snapshot});
          l.debug("bg: clean userscript " + t);
          const r = wl.getByUid(t), s = e => {
            Fc.create("options.scripts").done(r => {
              const s = {cleaned: e.installed, items: r, options: Xr.snapshot};
              n(s), e.installed && wl.notifyStorageListeners({uuid: t}, void 0, e => {
                e({storage: wl.getStorageByUid(t)});
              });
            }).fail(e => {
              n({error: e || "unknown error", options: Xr.snapshot});
            });
          };
          r.script && r.cond ? ii.doSave({name: e.name, uuid: t, src: r.script.textContent, clean: true, ask: false, internal: true, save: true}).always(e => {
            s(e || {installed: false});
          }) : (l.error(zn.getMessage("fatal_error") + " (" + t + ")!!!"), s({installed: false}));
        } else if (e.code) {
          let t = e.uuid;
          if (!t) return n({error: "uuid missing", options: Xr.snapshot});
          let s = e => n(e);
          r && (s = e => {
            ii.reorderScripts(), o(e);
          }), e.new_script && (t = St()), ii.doSave({name: e.name, uuid: t, force_url: e.force_url, src: e.code, ask: !Xr.values.editor_easySave, lastModTime: e.lastModTime, save: true}).always(e => {
            s(e || {installed: false});
          });
        } else if (e.auto_save) o({}); else {
          const t = e.uuids || (e.uuid ? [e.uuid] : []);
          for (const n of t) e.restore ? wl.restoreByUid(n) : ii.doRemove(n, false);
          ii.reorderScripts(), o({});
        }
      }}, i = {allow: {extpage: true}, exec: (e, t, n) => {
        Kn.onMessage(e.data).always(e => {
          const t = Xr.values.i18n, r = Xr.snapshot;
          n({i18n: t, options: r, message: e});
        });
      }}, c = {allow: {extpage: true}, exec: (e, t, n) => {
        const r = fc.getById(e.id);
        r ? (l.verbose("MC exec " + r.menuId), r.response({method: "run", menuId: r.menuId, event: e.event})) : l.warn("bg: Error: unable to find MC id " + e.id), n({});
      }}, A = {allow: {script: "cookie"}, exec: (e, t, n) => {
        var r;
        const s = ["expirationDate", "domain", "httpOnly", "secure", "name", "path", "sameSite", "value"], o = [...s, "url"], a = [...s, "session", "hostOnly"], i = e.url || t.url || void 0, l = e.details.url ? _n(e.details.url, i) || e.details.url : i, c = t.tab ? t.tab.cookieStoreId : void 0;
        let A;
        if (ui.fpi && i && (A = null === (r = bn(i)) || void 0 === r ? void 0 : r.domain), ne.SECURE || "dhdg" != he.short_id) if (l) if (ea(Rn(l))) if (ii.scriptWillRun(e.uuid, l)) if ("list" == e.action) {
          const t = e.details;
          ui.getAll({url: l, domain: t.domain, name: t.name, path: t.path, firstPartyDomain: A ? null : void 0, storeId: c}).done(e => {
            const t = e.map(e => {
              const t = a.reduce((t, n) => ({...t, [n]: e[n]}), {});
              return t;
            });
            n({data: {cookies: t}});
          });
        } else if ("delete" == e.action) {
          const t = e.details;
          ui.remove({url: l, name: t.name, firstPartyDomain: A, storeId: c}).done(() => {
            n({data: {success: true}});
          }).fail(e => {
            n({data: {error: e}});
          });
        } else if ("set" == e.action) {
          const t = {firstPartyDomain: A, storeId: c}, r = e.details;
          o.forEach(e => {
            const n = r[e];
            void 0 !== n && (t[e] = "value" === e || "name" === e ? String(n) : n);
          }), t.url = t.url || l, ui.set(t).done(() => n({data: {success: true}})).fail(e => n({data: {error: e}}));
        } else n({data: {error: "unknown action"}}); else n({data: {error: "the URL needs to be included by the scripts @include or @match tag"}}); else n({data: {error: "the URL is filtered by the security settings"}}); else n({data: {error: "invalid URL"}}); else n({data: {error: "not supported"}});
      }};
      return {ping: {allow: {insecure: true}, exec: (e, t, n) => {
        n({pong: true, instanceID: Yc, config: {layout: Xr.values.layout, dark: he.isDarkMode()}});
      }}, newTab: {allow: {extpage: true}, exec: (e, t, n) => {
        ("options" == t.extpage || "options" == e.origin ? q.Pledge(t.tab) : Mo()).then(r => {
          _e({url: e.url, parent: r}, r => {
            if (!r) return void l.warn("bg: unable to create tab", t, e);
            const s = {tabId: r.id};
            n(s);
          });
        });
      }}, tabs: {allow: {script: "tabs"}, exec: (e, t, n) => {
        "get" == e.action ? t.tab && e.uuid ? n({data: oc(t.tab.id, e.uuid)}) : (l.warn("bg: unable to process request", t, e), n({data: null})) : "list" == e.action ? e.uuid ? n({data: ac(e.uuid)}) : (l.warn("bg: unable to process request", t, e), n({data: null})) : "set" == e.action ? (t.tab && e.uuid ? ((e, t, n) => {
          const r = sc[e] = sc[e] || {}, s = {};
          n && (Object.assign(s, n), r[t] = s);
        })(t.tab.id, e.uuid, e.tab) : l.warn("bg: unable to process request", t, e), n({})) : n({error: "unknown action"});
      }}, focusTab: {allow: {script: "window.focus"}, exec: (e, t, n) => {
        const r = t && t.tab ? t.tab.id : null;
        r ? ie.tabs.update(r, {active: true}, () => {
          const e = he.lastError;
          n({error: e ? e.message : void 0});
        }) : n({error: "internal error"});
      }}, closeTab: e, setOption: {allow: {extpage: true}, exec: (e, t, n) => {
        const r = "options" == t.extpage || "options" == e.origin;
        Xr.setValue(e.name, e.value).always(() => {
          r ? Fc.create("options.settings").done(e => {
            const t = {items: e, options: Xr.snapshot};
            n(t);
          }).fail(e => {
            n({error: e || "unknown error", options: Xr.snapshot});
          }) : n({});
        });
      }}, reportAnIssue: n, clearHint: t, begEvent: r, buttonPress: s, imageUrlToTransferable: {allow: {extpage: true}, exec: async (e, t, n) => {
        const r = e.url;
        let s;
        r && (s = await Ao(r)), n({transferable: s ? await s.toTransferableData() : void 0});
      }}, loadTree: {allow: {extpage: true}, exec: (e, t, n) => {
        Fc.create(e.referrer, {complete: e.complete, url: e.url, uuid: e.uuid, filter: e.filter, tabId: e.tabId}).done(t => {
          const r = {items: t}, s = 1 == Fc.level(e.referrer) ? {i18n: Xr.values.i18n, options: Xr.snapshot, xhr: Ft, begging: dc.needed()} : {}, o = Object.assign(r, s);
          n(o);
        }).fail(e => {
          n({error: e || "unknown error", options: Xr.snapshot});
        });
      }}, modifyScriptOptions: {allow: {extpage: true}, exec: (e, t, n) => {
        if (!e.uuid) return void n({});
        const r = "options" == t.extpage || "options" == e.origin;
        let s = null == e.reload || 1 == e.reload, o = false;
        const a = wl.getByUid(e.uuid, true), i = () => {
          s ? (void 0 !== e.position && ii.reorderScripts(e.uuid, e.position), r ? Wc.loadTree.exec({referrer: "options.scripts"}, t, n) : ie.tabs.getSelected(null, t => {
            Fc.create("actions").done(e => {
              const t = {items: e, i18n: Xr.values.i18n, options: {enabled: Xr.values.enabled}};
              n(t);
            }).fail(() => {
              const e = {items: [], i18n: Xr.values.i18n, options: {enabled: Xr.values.enabled}};
              n(e);
            }), !t || t.id < 0 || e.uuid && Xr.values.autoReload && ("function" == typeof {frameId: 0} && (r = {frameId: 0}, {frameId: 0} = {}), ie.tabs.sendMessage(t.id, {method: "reload"}, {frameId: 0}, r));
          })) : n({});
        };
        if (a.script && a.cond) if (e.whitewash && a.script.evilness == ca.SEVERITY_FOISTED_SCRIPT) s = true, a.script && a.cond ? ii.doSave({uuid: e.uuid, src: a.script.textContent, force_settings: {enabled: true}, whitewash: true, save: true}).always(i) : (l.error(zn.getMessage("fatal_error") + " (" + e.uuid + ")!!!"), i()); else {
          let t = false;
          const r = Qs(), s = ["includes", "excludes", "matches"], l = ["connects", "blockers"], c = a.script.options;
          Object.keys(r.options).forEach(t => {
            const n = e[t];
            void 0 !== n && (c[t] = n, o = o || true === Pl.SYNCED[t]);
          });
          const A = c.override;
          Object.keys(r.options.override).forEach(n => {
            if (-1 == n.indexOf("merge_")) return;
            const r = e[n];
            void 0 !== r && (A[n] = r, t = true);
          }), s.forEach(n => {
            const r = e[n];
            void 0 !== r && (t = true, A["use_" + n] = r);
          }), l.forEach(t => {
            const n = e[t];
            void 0 !== n && (A["use_" + t] = n);
          }), e.add_excludes && (c.override.use_excludes = c.override.use_excludes.concat(e.add_excludes), t = true), t && (a.script = ii.mergeCludes(a.script)), e.temp_connects && Ma.setSessionConnects(a.script.uuid, e.temp_connects), void 0 !== e.enabled && (a.script.enabled = e.enabled), o && (a.script.lastModified = Date.now()), void 0 !== e.file_url && (a.script.downloadURL = e.file_url), ii.doModify(a.script.uuid, a.script, o).done(i).fail(() => {
            n({});
          });
        } else n({});
      }}, purgeScripts: o, saveScript: a, saveExternal: {allow: {extpage: true}, exec: (e, t, n) => {
        ba.setElement(e.uuid, e.url, {content: e.code || "", meta: e.mimetype || "text/javascript"}, true), Fc.create("options.scripts").done(e => {
          const t = {success: true, items: e, options: Xr.snapshot};
          n(t);
        }).fail(e => {
          const t = {error: e || "unknown error", options: Xr.snapshot};
          n(t);
        });
      }}, saveStorageKey: {allow: {extpage: true}, exec: (e, t, n) => {
        tA.saveStorageKey.exec(null, e, t, n);
      }}, download: {allow: {extpage: true}, exec: (e, t, n) => {
        tA.download.exec(null, e, t, e => {
          (e.error || e.load) && n(e);
        });
      }}, askCom: i, execMenuCmd: c, unLoad: {allow: {script: []}, exec: (e, t) => (e.topframe || (l.verbose("unload check " + e.id + " url: " + e.url), e.id && t.tab && t.frameId && Qi.events.unload(t.tab.id, t.frameId)), false)}, prepare: {allow: {script: []}, exec: (e, t, n) => {
        if (t.tab) {
          const r = void 0 !== t.frameId ? t.frameId : e.topframe ? 0 : null;
          if (null === r) return l.warn("bg: unknown frameId", t, e);
          const s = Rn(e.url);
          e.cleanup ? (Qi.events.clean(t.tab.id, r, s), Yi.setIcon(t.tab.id), Yi.setBadge(t.tab.id), n({})) : Qi.events.run(t.tab.id, r, s, Ct(t.tab), r => {
            const s = r ? hi.answer(r, e.url, Ct(t.tab), t.tab.cookieStoreId) : {fast: true};
            n(s), Yi.setIcon(t.tab.id), Yi.setBadge(t.tab.id);
          });
        } else n({});
      }}, contextmenu: {allow: {script: []}, exec: (e, t, n) => {
        const {tab: r} = t;
        if (r && Xr.values.context_menu_enabled) {
          const n = void 0 !== t.frameId ? t.frameId : e.topframe ? 0 : null;
          if (null === n) return l.warn("bg: unknown frameId", t, e);
          const s = Rn(e.url);
          let o = [], a = [];
          Xr.values.context_menu_scripts && (o = hi.get(n, s, Ct(t.tab)).contexters), Xr.values.context_menu_commands && (a = fc.listByTabId(r.id)), Kl.update({contexters: o, commands: a});
        }
        n({});
      }}, notification: {allow: {script: "notification", extpage: true}, exec: (e, t, n) => {
        const r = e.image ? e.image : ao("tampermonkey");
        (() => {
          const n = q();
          return e.highlight && t.tab ? fo.highlight(t.tab.id, () => n.resolve()) : n.resolve(), n.promise();
        })().then(() => {
          const t = q();
          return e.text ? fo.show(e.title, e.text, r, {timeout: e.timeout, silent: e.silent}, e => t.resolve(e.clicked)) : t.resolve(), t.promise();
        }).always(e => {
          n({clicked: e});
        });
      }}, clipboard: {allow: {script: "setClipboard", extpage: true}, exec: (e, t, n) => {
        Te ? Te.set({mimetype: e.mimetype, content: e.content}, () => {
          n({success: true});
        }) : n({error: "unsupported"});
      }}, determineScriptsToRun: {allow: {extpage: true}, exec: (e, t, n) => {
        n({scripts: ii.determineScriptsToRun(e.url).filter(e => !e.deleted).map(e => e.uuid)});
      }}, externalMessage: {allow: {insecure: true}, exec: (e, t, n) => eA(e.request, t, n)}, cookie: A};
    })(), Jc = e => {
      const t = he.id, n = !oe.HAS_SENDER_ID && e.tab || e.id === t;
      let r;
      const s = oe.INTERNAL_PAGE_PROTOCOLS[0], o = s ? s + "//" : null, a = he.getInternalPageRegexp(), i = e.url ? e.url : e.tab ? e.tab.url : null, l = e.origin;
      let c = n && (!i || !!o && 0 == i.indexOf(o)) && (!l || l === k);
      if (c || !o) {
        if (i) {
          const e = i.match(a);
          e && 2 == e.length && (r = e[1]);
        } else r = "*";
        !o && r && (c = true);
      }
      return {id_valid: n, url: i, page: r, extpage: c};
    }, Kc = (e, t) => {
      const {uuid: n} = e;
      if (void 0 === t) return false;
      const r = xt(t);
      if (0 === r.length) return true;
      if (!n) return false;
      const s = r.map(e => {
        const t = gi[e];
        if (t) return [...t];
      }).filter(e => void 0 !== e);
      return ((e, t) => {
        const n = xt(t), {script: r, cond: s} = wl.getByUid(e);
        if (r && s && r.grant.length) {
          const {grant: e} = r;
          return n.some(t => e.includes(t));
        }
        return false;
      })(n, [].concat(...s));
    }, $c = (e, t, n) => {
      if (!u.late) return u.registerLateCallback(() => {
        $c(e, t, n);
      }), true;
      l.verbose("mh: request ", e, " sender: ", t);
      const r = Wc[e.method];
      if (!r) return l.warn("mh: unknown method " + e.method), false;
      if (!r.allow || !r.exec) return l.warn("mh: invalid implementation of " + e.method), false;
      const s = Jc(t), o = s.extpage, a = s.page, i = s.id_valid;
      l.verbose("mh: request page:", a, "extpage:", o), o ? t.extpage = a : delete e.origin;
      const c = "options" == a, A = i && !o;
      let d = true;
      if ("background" == a || r.allow.insecure || r.allow.extpage && o || r.allow.options && c || A && Kc(e, r.allow.script)) {
        const s = r.exec(e, t, e => {
          d = false, n(e);
        });
        return false !== d && false !== s || void 0;
      }
      return false === e.topframe && (o || c) || l.warn("mh: this context doesn't have the permission to call \"" + e.method + '"'), false;
    }, eA = (e, t, n) => {
      let r, s;
      if ("off" != Xr.values.external_connect && (r = t.url) && ea(r)) {
        for (const [t, n] of Object.entries(rA)) {
          const o = Uo({match: [t]});
          if (o && To(r, o) && (n.includes("*") || n.includes(e.method))) {
            s = true;
            break;
          }
        }
        if (s) if ("getVersion" == e.method) n({version: pe.manifest.version, id: he.short_id}); else if ("openOptions" == e.method) {
          let r = e.params || "";
          r && !r.startsWith("#") && (r = `#${r}`), ie.tabs.update(t.tab.id, {url: pe.getURL("options.html") + r, active: true}, () => n({}));
        } else if ("all" != Xr.values.external_connect) l.warn("mh: calling external method " + e.method + " is not permitted to " + r + " by the user"); else if ("isInstalled" == e.method) {
          let t, r, s, o, a = false;
          const i = e.script.name, l = e.script.namespace;
          (r = wl.getUidsByName(i, l)[0]) && (t = wl.getByUid(r)) && t.script && (a = true, o = t.script.enabled, s = t.script.version), n({name: i, installed: a, enabled: o, version: s});
        } else l.warn("mh: unknown external method " + e.method); else l.warn("mh: calling external method " + e.method + " is not permitted to " + r);
      }
    }, tA = (() => {
      const e = {allow: {script: "xmlHttpRequest"}, exec: (e, t, n, r) => {
        if (!e) throw Error("invalid port");
        let s = false;
        const o = t.details.anonymous, a = n.tab ? n.tab.cookieStoreId : void 0, i = t => {
          e.disconnect();
          const n = t.response;
          n && n.responseHeaders;
        };
        t.details.partialSize = t.details.partialSize || re.PARTIAL_SIZE;
        const l = Object.assign({}, ...Object.keys(t.callbacks).map(e => {
          const n = "ondone" === e;
          if (t.callbacks[e] || n || "onload" === e) return {[e]: t => {
            const s = {data: (t = t || {}).response || {}, exception: t.exception, [e]: true};
            r(s), n && i(t);
          }};
        }));
        let c;
        l.ondone || (l.ondone = e => i(e));
        const A = t.url || n.url || void 0;
        t.details.url = _n(t.details.url, A) || t.details.url;
        const u = t.details.responseType;
        void 0 !== u && Ot.includes(u) || delete t.details.responseType, te.WEBREQUEST_XHR_SUPPORT && "no" != Xr.values.webrequest_modHeaders && (t.details.headers = t.details.headers || {}, t.details.headers.internal = t.uuid, oe.SENDS_ORIGIN && !Object.keys(t.details.headers).map(e => e.toLowerCase()).includes("origin") && (t.details.headers.origin = null)), (() => {
          const e = t.details.cookie;
          if (e && t.details.url) {
            let n;
            return n = o ? q.Pledge([]) : ui.getAll({url: t.details.url, storeId: a, firstPartyDomain: void 0}), n.then(n => {
              const r = n.map(e => e.name + "=" + Z(e.value)).concat(e ? [e] : []).join(";");
              delete t.details.cookie, t.details.headers = t.details.headers || {}, t.details.headers.cookie = r;
            });
          }
          return q.Pledge();
        })().then(() => {
          var e;
          if (s) {
            const e = {response: Nt("aborted"), exception: "aborted"};
            return l.onabort && l.onabort(e), void l.ondone(e);
          }
          let r;
          if (t.details.url && (r = null === (e = bn(t.details.url)) || void 0 === e ? void 0 : e.protocol) && ["file:"].concat(oe.INTERNAL_PAGE_PROTOCOLS).includes(r)) {
            const e = e => {
              const n = 'Refused to connect to "' + t.details.url + '": ' + e, r = Nt(n);
              ["onerror", "ondone"].forEach(e => {
                const t = l[e];
                t && t({response: r, exception: n});
              });
            };
            if ("file:" == r) {
              let n, r;
              if (te.ALLOWS_FILE_SCHEME_ACCESS && ("all" == Xr.values.script_file_access ? n = true : "externals" != Xr.values.script_file_access || (r = wl.getByUid(t.uuid)) && r.script && r.cond && [...r.script.resources, ...r.script.requires].map(e => _n(e.unsafe_url, e.abs_url)).includes(t.details.url) && (n = true)), !n) return e("Access to this local file is forbidden!");
            }
            Ze(t.details.url, e => {
              const t = lt(e), n = l.onpartial;
              if (n) {
                const e = Gt(t || "", re.PARTIAL_SIZE);
                e.forEach((t, r) => {
                  n({response: {partial: t, index: r, length: e.length}});
                });
              }
              const r = {readyState: 4, responseHeaders: "", status: 0, statusText: ""};
              ["onload", "ondone"].forEach(e => {
                const t = l[e];
                t && t({response: r});
              });
            }, e);
          } else {
            const e = {foreign_context: false, no_blob: t.no_blob};
            c = Ma.exec(t.details, t.uuid, n || {}, e, l);
          }
        });
        const d = () => {
          s || (c ? c.abort() : s = true);
        };
        return e && e.onMessage.addListener(e => {
          e.cancel && d();
        }), d;
      }}, t = {allow: {script: "webRequest"}, exec: (e, t, n, r) => {
        const s = n.tab.id, o = n.frameId;
        (void 0 !== s && void 0 !== o || !t.uuid) && Qi.set.requests(s, o, t.uuid, t.rules, e => {
          r(e);
        });
      }}, n = {allow: {script: "writeValues"}, exec: (e, t, n, r) => {
        if (n.tab) {
          if (t.uuid) {
            const e = wl.getStorageByUid(t.uuid), n = t.value, r = t.key;
            l.verbose("storage: (" + t.uuid + "): set key " + r + ' to "' + n + '"'), e.data[r] = n, e.ts = t.ts, wl.setStorageByUid(t.uuid, e), wl.notifyStorageListeners({uuid: t.uuid}, {id: t.id}, e => {
              e({storage: {data: {[r]: n}, ts: t.ts}, removed: void 0 === n ? r : void 0});
            });
          }
        } else l.warn("storage: unable to save storage due to empty tabID!");
        r({});
      }}, r = {allow: {script: "openInTab"}, exec: (e, t, n, r) => {
        if (!e) throw Error("invalid port");
        let s, o = e;
        const a = ["active"], i = {url: t.details.url};
        let c = null;
        if (s = t.details.options) {
          for (const e of a) void 0 !== s[e] && (i[e] = s[e]);
          s.incognito ? i.incognito = true : (s.insert && (i.index = n.tab.index + 1), s.setParent ? i.parent = n.tab : i.parent = {windowId: n.tab.windowId});
        }
        return _e(i, e => {
          e && (c = e.id, o && (Ji[c] = {onClose: () => {
            o && r({closed: true});
          }}, r({success: true, tabId: c})));
        }), o.onMessage.addListener(e => {
          if (null === c) return;
          const {close: t, focus: n, name: s} = e;
          if (n) ie.tabs.update(c, {active: true}, () => {
            const e = he.lastError;
            e && l.warn("tab.focus", e.message);
          }); else if (t) ie.tabs.remove(c, () => {
            const e = he.lastError;
            e ? l.warn("tab.close", e.message) : c = null;
          }); else if (void 0 !== s) {
            const e = 5;
            let t = 0;
            const n = () => {
              if (null === c) return;
              const o = c;
              Qi.listeners.once.whenReady(o, () => {
                "function" == typeof {frameId: 0} && (o => {
                  o ? r({name: s}) : t++ < e ? y(n, 100 * t) : l.warn("foreignAttr: error setting attr");
                } = {frameId: 0}, {frameId: 0} = {}), ie.tabs.sendMessage(o, {method: "setForeignAttr", attr: "name", value: s}, {frameId: 0}, o => {
                  o ? r({name: s}) : t++ < e ? y(n, 100 * t) : l.warn("foreignAttr: error setting attr");
                });
              });
            };
            n();
          }
        }), () => {
          null !== c && delete Ji[c], o = null;
        };
      }}, s = {allow: {script: "window.onurlchange"}, exec: (e, t, n, r) => {
        const s = n.frameId, o = n.tab.id, a = e => {
          e.tabId == o && e.frameId == s && r({url: e.url});
        };
        return Vc.addListener(o, a), () => {
          Vc.removeListener(o, a);
        };
      }}, o = {allow: {extpage: true}, exec: (e, t, n, r) => {
        if (!e) throw Error("invalid port");
        const s = e => r({info: e});
        return pr.on("syncProgressEvent", s), () => {
          pr.off("syncProgressEvent", s);
        };
      }}, a = {allow: {extpage: true}, exec: async (e, t, n, r) => {
        const s = void 0 === t.reload || !!t.reload;
        let o, a, i, {data: l, json: c, code: A, url: u} = t;
        if (u) try {
          null == e || e.postMessage({progress: zn.getMessage("Loading")}), i = await Go(u);
        } catch (e) {
          return void r({error: zn.getMessage("Unable_to_load_script_from_url_0url0", u)});
        }
        if (l || i) {
          if (i) {
            null == e || e.postMessage({progress: zn.getMessage("Decoding")});
            try {
              l = await At(i);
            } catch (e) {}
          }
          if (l) try {
            a = await Hc.zip.read(l).progress(t => {
              null == e || e.postMessage({progress: t});
            });
          } catch (e) {}
          if (!a) {
            if (i) try {
              c = await At(i, {encoding: "UTF-8"});
            } catch (e) {}
            c = l;
          }
        }
        if (c && !A && !a) try {
          a = await Hc.json.read(c);
        } catch (e) {
          try {
            A = ot(c);
          } catch (e) {
            A = c;
          }
        }
        if (a) {
          const e = {scripts: Object.values(a.scripts).map(e => (e => {
            const t = e.meta || {}, n = e.settings || {}, r = e => ({url: e.meta.url, sri: e.meta.sri, ts: e.meta.ts || null, mimetype: e.meta.mimetype, modified: e.meta.modified, content: e.source});
            return {source: e.source, name: t.name, uuid: t.uuid, file_url: t.file_url, options: e.options, storage: e.storage || {ts: 0, data: {}}, lastModified: t.modified, enabled: n.enabled, position: n.position, resources: e.resources ? e.resources.map(r) : [], requires: e.requires ? e.requires.map(r) : []};
          })(e)), global_settings: a.global_settings};
          o = ii.importFromJson(e).then(e => ({reload: !!e.global_settings, success: true})).fail(() => {
            r({error: zn.getMessage("Unable_to_parse_this_")});
          });
        } else {
          if (!A) return void r({error: zn.getMessage("Unable_to_parse_this_")});
          o = ii.installFromSource(A, {force_url: u}, {silent_fail: true}).fail(e => {
            var t;
            const n = ((null === (t = null == e ? void 0 : e.messages) || void 0 === t ? void 0 : t.errors) || [])[0] || zn.getMessage("Unable_to_parse_this_");
            r({error: n});
          }).then(e => ({installed: e ? 1 : 0, success: true}));
        }
        o.done(e => {
          s && !e.reload ? Fc.create("options.scripts").done(t => {
            const n = {...e, items: t};
            r(n);
          }).fail(e => {
            r({error: e || zn.getMessage("An_error_occured_during_import_")});
          }) : r(e);
        }), null == e || e.onDisconnect.addListener(() => {
          e = null;
        });
      }};
      return {xhr: e, download: {allow: {script: "download"}, exec: (e, t, n, r) => {
        let s = e, o = r;
        const a = t.details;
        let i = Ja.start(a, {onload: e => {
          o && o({load: true, data: e});
        }, onprogress: e => {
          o && o({progress: true, data: e});
        }, onerror: e => {
          o && o({error: true, data: e});
        }, ontimeout: e => {
          o && o({timeout: true, data: e});
        }, ondone: () => {
          s && s.disconnect(), s = null;
        }}, {internal: null === s});
        return s && void 0 !== i && s.onMessage.addListener(e => {
          e.cancel && void 0 !== i && (Ja.cancel(i), i = void 0);
        }), () => {
          s = null, o = null;
        };
      }}, webRequest: t, addStorageListener: {allow: {script: "readValues"}, exec: (e, t, n, r) => {
        if (n.tab) return l.verbose("storage: " + t.uuid + " " + t.id), wl.addStorageListener(n.tab.id, t.id, t.uuid, Date.now(), e => r(e)), () => {
          l.verbose("storage disconnectHandler " + t.uuid + " " + t.id), wl.removeStorageListeners({uuid: t.uuid, id: t.id}, false);
        };
        l.verbose("storage: unable to load storage due to empty tabID!", t), r({error: "missing tab id"});
      }}, saveStorageKey: n, exportToJson: {allow: {extpage: true}, exec: (e, t, n, r) => {
        ii.exportToJson(t.ids, t.options).done(e => {
          const t = JSON.stringify(e);
          Gt(t, re.PARTIAL_SIZE).forEach(e => r({partial: e})), r({done: true});
        }).fail(e => {
          r({error: e || "serialization error"});
        });
      }}, openInTab: r, registerMenuCommand: {allow: {script: "menuCommand"}, exec: (e, t, n, r) => {
        if (!e) throw Error("invalid port");
        if (n.tab) {
          l.verbose("MC add " + t.menuId);
          const {name: e, uuid: s, accessKey: o, menuId: a} = t, i = n.tab.id;
          let c;
          const A = wl.getByUid(s);
          return c = A.script && A.cond ? zn.getTranslation(A.script, "name") : zn.getMessage("This_script_was_deleted"), fc.add({tabId: i, name: e, uuid: s, accessKey: o, menuId: a, scriptName: c, response: e => r(e)}), dr.actionPage("update"), () => {
            l.verbose("MC unreg " + t.menuId), fc.clearById(t.menuId), dr.actionPage("update");
          };
        }
        l.warn("Unable to register menu cmd due to empty tabID!"), e.disconnect();
      }}, observeUrlChanges: s, tabWatch: {allow: {extpage: true}, exec: (e, t, n, r) => {
        if (!e) throw Error("invalid port");
        const {active: s, url: o} = t;
        let a;
        const i = al.openAndWatch({url: o, active: s, index: (n.tab.index || 0) + 1, parent: n.tab}, t => {
          t ? (a = a || t.id, r({tab: t})) : (l(), e.disconnect());
        }), l = () => {
          i.cancel();
        };
        return l;
      }}, syncInfo: o, importEx: a};
    })(), nA = e => {
      u.late ? e.onMessage.addListener(t => {
        void 0 !== t.method && ((e, t) => {
          const n = e.sender;
          l.verbose("mh: connect.method " + t.method + " contextId " + t.id + " tabId: " + (n.tab ? n.tab.id : "unknown!!!"));
          const r = tA[t.method];
          if (!r) return l.warn("mh: unknown method " + t.method), false;
          if (!r.allow || !r.exec) return l.warn("mh: invalid implementation of " + t.method), false;
          const s = Jc(n), o = s.extpage, a = s.page, i = "options" == a, c = s.id_valid && !o;
          if (!("background" == a || r.allow.insecure || o && r.allow.extpage || i && r.allow.options || c && Kc(t, r.allow.script))) return false === t.topframe && (o || i) || l.warn("mh: this context doesn't have the permission to call \"" + t.method + '"'), false;
          {
            const s = r.exec(e, t, n, t => {
              try {
                e.postMessage(t);
              } catch (n) {
                l.debug("bg: Error sending port (" + e.name + ") message", t, n);
              }
            });
            "function" == typeof s && e.onDisconnect.addListener(s);
          }
          l.verbose("mh: connect.method " + t.method + " end!");
        })(e, t);
      }) : u.registerLateCallback(() => {
        nA(e);
      });
    }, rA = {"*://*.tampermonkey.net/*": ["getVersion", "openOptions"], "*://*.greasyfork.org/*": ["*"], "*://*.sleazyfork.org/*": ["*"], "*://*.openuserjs.org/*": ["*"], "*://*.userstyles.org/*": ["*"], "*://*.userscript.zone/*": ["*"]}, sA = {init: () => {
      pe.onMessage.addListener($c), pe.onConnect.addListener(nA), pe.onConnectExternal.addListener(e => {
        e.disconnect();
      });
    }, externally_connectable_reg: Uo({match: Object.keys(rA)}), externally_connectable: rA};
    self.setTimeout = m;
    const oA = new Date;
    $s(), w.down = Ja, w.dast = rt, l.debug("Starting background fred @" + Yc);
    const aA = () => {
      const e = "temporary" == Xr.values.incognito_mode && pe.inIncognitoContext;
      rt.setTemporary(e), e && (Xr.values.sync_enabled = false, Xr.values.scriptUpdateCheckPeriod = 0, Xr.values.sync_type = 0, Xr.values.statistics_enabled = false);
    }, iA = () => {
      if (l.set(Xr.values.logLevel), zn.setLocale(Xr.values.i18n), Xr.values.userscript_search_url) {
        const e = () => {
          (({url: e, mode: t}) => {
            if (Zr = xr.internal, "string" == typeof e) Gr = Cr = e; else {
              const t = e.www, n = e.api || t;
              Gr = `${e.protocol}//${n ? n + "." : ""}${e.domain}`, Cr = `${e.protocol}//${t ? t + "." : ""}${e.domain}`;
            }
            Ir = t, Mr = zn.getLocale() || zn.getUiLocale();
          })({url: ["dhdg", "gcal", "fire", "iikm", "mfdh", "fcmf"].includes(he.short_id) ? Er : Xr.values.userscript_search_url, mode: Xr.values.userscript_search_mode});
        };
        Xr.addChangeListener("userscript_search_mode", e), e();
      }
      var e, t;
      e = ii.doModify, t = wl.getByUid, wa = e, ka = t, (e => {
        Ft = e;
      })({prefix: te.WEBREQUEST_XHR_SUPPORT && "no" != Xr.values.webrequest_modHeaders ? vc : void 0, mozAnon: false}), xr.init(), Ss.init("bg", !!Xr.values.statistics_enabled, {trackView: true, version: pe.manifest.version, started: oA}), Qi.listeners.add.onReset((e, t) => {
        fc.clearByTabId(e), wl.removeStorageListeners({tabid: e}, false), t || Yi.setIcon(e);
      });
      const n = e => {
        var t, n;
        e >= 0 && (t = e, n = t => {
          !he.lastError && t && (Yi.setIcon(e), Yi.setBadge(e));
        }, ie.tabs.get(t, n));
      };
      Qi.listeners.add.onCommited(n), Qi.listeners.add.onCompleted(n), Qi.listeners.add.onReset(Ma.purgeAppeals), Qi.listeners.add.onRemoved(Ma.purgeAppeals), Qi.listeners.add.onRemoved(ic), Pl.init().done(e => {
        e && Pl.sync();
      }), (() => {
        const e = () => {
          Oo.remove($o);
        };
        Xr.addChangeListener("forbiddenPages", e), Xr.addChangeListener("page_whitelist", e), Xr.addChangeListener("page_filter_mode", e);
      })(), ca.init(), wl.init(), hi.init(sA.externally_connectable_reg), Ja.init(), da.init(), Mc(), Kl.init({onclick: ({id: e, frameId: t, tab: n, url: r, isMenuCommand: s}) => {
        if (s) {
          const t = fc.getById(e);
          t ? t.response({method: "run", menuId: t.menuId, event: {keyCode: void 0, button: 0, shiftKey: false, metaKey: false, altKey: false, ctrlKey: false}}) : l.warn("bg: Error: unable to find MC id " + e);
        } else {
          const s = wl.getByUid(e);
          if (!s || !s.script) return void l.log("ctxm: unable to find script " + e);
          const o = s.script;
          if (o.deleted) return;
          Ei.bundle({url: r || "<unknown>"}, o).then(e => {
            const s = q(), o = {};
            let a;
            void 0 !== t ? t = o.frameId = t : r ? r = Rn(r) : a = true;
            const i = Ct(n), l = {method: "executeScript", url: r, frameId: t, topframe: a, info: hi.answer({contexters: [], runners: [e]}, r, i, n.cookieStoreId)};
            return "function" == typeof o && (s.resolve = o, o = {}), ie.tabs.sendMessage(n.id, l, o, s.resolve), s.promise();
          });
        }
      }}), dc.init(), rc.init();
    }, lA = w.init = async () => {
      var e;
      zn.init(), u.init(), Mc(true), al.init(), sA.init(), Be && (e = Ic, ie.commands.onCommand.addListener(e)), he.setUninstallURL(`https://www.tampermonkey.net/uninstall.php?ext=${he.short_id}`), (e => {
        Gs = e;
      })(mi), Se({path: pe.getURL("images/icon_grey.png")}), function (e) {
        if (ie.browserAction.setPopup) ie.browserAction.setPopup(e);
      }({popup: "action.html"}), Ge({title: "Tampermonkey"}), he.onUpdateAvailable.addListener(Eo.onUpdateAvailable), he.onInstalled.addListener(e => {
        l.log("bg: onInstalled", e), e || (e = {reason: "mandatory_argument_is_not_set"}), "install" == e.reason ? ne.SECURE || wl.getUidList().forEach(e => {
          const t = wl.getByUid(e);
          t.script && t.cond && t.script.evilness != ca.SEVERITY_FOISTED_SCRIPT && (l.warn("content security: found unfamiliar script", t.script.name), t.script.evilness = ca.SEVERITY_FOISTED_SCRIPT, ii.doModify(e, t.script, false));
        }) : "update" == e.reason && e.previousVersion, u.ensureLate(() => {
          "install" == e.reason ? Eo.onInstalled() : "update" == e.reason && Eo.onUpdated(e.previousVersion);
        });
      }), await rt.init(), await (() => {
        const e = q(), t = "0.0.0.0";
        let n, r;
        const s = pe.manifest.version, o = rt.getSchemaVersion();
        let a = o;
        return rt.getVersion(t).then(e => (r = e, n = Ns(s, r) == Ns.eNEWER, rt.isWiped())).then(e => {
          if (!n && e) {
            const e = ["Tampermonkey detected inconsistencies that indicate that your browser wiped the extension database!", "You can continue to use Tampermonkey normally, but your settings and scripts might be lost. Click here to get more information.", "https://www.tampermonkey.net/faq.php#Q207"];
            l.warn(e.join("\n")), to(...e);
          }
        }).always(() => {
          let i = 0;
          const c = () => {
            if (i < u.length) {
              const t = () => {
                i++, c();
              }, n = u[i].schema;
              u[i].cond(n) ? u[i].fn().done(() => {
                n && (l.info("Converted database from", a, "to", n), a = n), t();
              }).fail(() => {
                e.reject();
              }) : t();
            }
          }, A = () => {
            l.warn("Incognito mode detected. Database conversion can only be done in non-incognito mode! Stopping now..."), eo(["Tampermonkey needs to convert its database but this can't be done in incogonito mode!", "Please open a non-incognito mode window and/or restart your browser."], "paused");
          }, u = [{cond: () => n && Ns("3.6.3650", a) == Ns.eNEWER && Ns("3.5.3650", r) == Ns.eNEWER, fn: () => {
            const e = q();
            if (pe.inIncognitoContext) A(), e.reject(); else {
              a = "3.6.3650";
              const t = [];
              [{o: "TM_config", n: ee.STORAGE.CONFIG}, {o: "TM_update_check", n: ee.STORAGE.UPDATE}, {o: "TM_version"}, {o: "TM_unload_ts"}].forEach(e => {
                if (e.n) {
                  const n = rt.getValue(e.o);
                  void 0 !== n && t.push(rt.setValue(e.n, n));
                }
                t.push(rt.deleteValue(e.o));
              });
              let n = new RegExp("@re$");
              const s = [];
              rt.listValues().forEach(e => {
                if (-1 == e.search(n)) return;
                const t = e.replace(n, "");
                s.push(t);
              }), s.forEach(e => {
                const n = rt.getValue(e + "@st"), r = rt.getValue(e), s = rt.getValue(e + "@re"), o = rt.getValue(e + "@source"), a = wl.getUidByName(e) || St();
                t.push(rt.deleteValue(e + "@st")), t.push(rt.deleteValue(e)), t.push(rt.deleteValue(e + "@re")), t.push(rt.deleteValue(e + "@source")), r && s && o ? (t.push(rt.setValue(ee.PREFIX.SCRIPT_UID + a, e)), t.push(rt.setValue(ee.PREFIX.COND + a, s)), t.push(rt.setValue(ee.PREFIX.STORE + a, n)), t.push(rt.setValue(ee.PREFIX.SCRIPT + a, o)), t.push(rt.setValue(ee.PREFIX.META + a, r))) : l.warn("invalid script entry", {source: o, meta: r, cond: s});
              }), n = new RegExp("@st$"), rt.listValues().forEach(e => {
                -1 != e.search(n) && t.push(rt.deleteValue(e));
              }), q.when(t).done(() => {
                l.info("Converted database from", r, "to", a), e.resolve();
              });
            }
            return e.promise();
          }}, {schema: "3.7.0", cond: e => Ns(e, a) == Ns.eNEWER, fn: () => {
            const e = q();
            if (pe.inIncognitoContext) A(), e.reject(); else {
              const t = [], n = new RegExp("^" + ee.PREFIX.META);
              rt.listValues().forEach(e => {
                if (-1 == e.search(n)) return;
                const r = rt.getValue(e);
                if (r && r.options && r.options.override && !r.options.override.orig_run_at) {
                  r.options.override.orig_run_at = r.options.run_at || "document-idle", r.options.run_at = null;
                  const n = {...r};
                  t.push(rt.setValue(e, n));
                }
              }), q.when(t).done(() => {
                e.resolve();
              });
            }
            return e.promise();
          }}, {schema: "4526", cond: () => n && false, fn: () => {
            const e = q();
            if (pe.inIncognitoContext) A(), e.reject(); else {
              l.info("Update database...");
              const t = rt.migrate("localStorage", "chromeStorage").done(() => {
                l.info("Copied config for default usage of setting storage");
              }).fail(() => {
                e.resolve();
              });
              e.consume(t);
            }
            return e.promise();
          }}, {schema: "4871", cond: e => n && Ns(e, a) == Ns.eNEWER, fn: () => {
            const e = q();
            let t, n;
            const r = rt.getValue(ee.STORAGE.CONFIG);
            return r && r.scriptTemplate && (n = Xr.getDefaults()) && (t = n.script_templates) && t[0] && t[0].value && (t[0].value = r.scriptTemplate, delete r.scriptTemplate, rt.setValue(ee.STORAGE.CONFIG, r)), e.resolve(), e.promise();
          }}, {schema: "5465", cond: e => Ns(e, a) == Ns.eNEWER, fn: () => {
            const e = q();
            if (pe.inIncognitoContext) A(), e.reject(); else {
              const t = rt.getValue(ee.STORAGE.CONFIG);
              t && 1 == t.sync_version && (t.sync_enabled = false, rt.setValue(ee.STORAGE.CONFIG, t)), e.resolve();
            }
            return e.promise();
          }}, {cond: () => n || Ns(a, o) == Ns.eNEWER, fn: () => {
            const e = q();
            return rt.setVersion(s, a).done(() => {
              e.resolve();
            }), e.promise();
          }}, {cond: () => n, fn: () => (l.info("First run of version " + s + "!"), Eo.scheduleNotification(r, r == t), q.Pledge())}, {cond: () => true, fn: () => {
            const t = q();
            return e.resolve(), y(t.resolve, 0), t.promise();
          }}];
          c();
        }), e.promise();
      })(), await q.Pledge(), await Xr.init(), await q.when((await Xr.defaultScripts()).map(async e => {
        await h(1e3), ii.doSave({url: void 0, src: e.textContent, ask: false, replace: true, internal: true});
      })), w.cfgo = Xr, aA(), iA(), Xr.addChangeListener("logLevel", () => {
        l.set(Xr.values.logLevel);
      }), Xr.addChangeListener("i18n", () => {
        zn.setLocale(Xr.values.i18n);
      }), Xr.addChangeListener("incognito_mode", () => {
        aA();
      }), Xr.addChangeListener("statistics_enabled", () => {
        Ss.setEnabled(!!Xr.values.statistics_enabled);
      }), Xr.addChangeListener("context_menu_enabled", () => {
        Xr.values.context_menu_enabled || Kl.update({contexters: [], commands: []});
      }), Xr.addChangeListener(["require_blacklist", "script_blacklist_server", "script_blacklist_type"], ii.blackCheckAll), Xr.addChangeListener("webrequest_modHeaders", (e, t, n, r) => {
        null == r || r.done(() => y($a.reset, 1));
      }), Xr.addChangeListener(["appearance_badge_color", "appearance_badge_text_color"], Yi.init), Xr.addChangeListener("script_include_mode", () => Oo.removeAll()), Yi.init(), await (async () => {
        Ce.supported && (Tc = Ce, await Bc(), Xr.addChangeListener("runtime_inject_mode", Bc));
      })(), y(() => {
        rc.check();
      }, 1e4), ii.clean(), await q.Pledge(), l.log("bg: listeners registered!"), u.setReady();
    };
    lA();
  })();
})();

