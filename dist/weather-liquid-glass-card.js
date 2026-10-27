/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2 = globalThis, e$2 = t$2.ShadowRoot && (void 0 === t$2.ShadyCSS || t$2.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$3 = Symbol(), o$4 = /* @__PURE__ */ new WeakMap();
let n$4 = class n {
  constructor(t2, e2, o2) {
    if (this._$cssResult$ = true, o2 !== s$3) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s2 = this.t;
    if (e$2 && void 0 === t2) {
      const e2 = void 0 !== s2 && 1 === s2.length;
      e2 && (t2 = o$4.get(s2)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && o$4.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const r$4 = (t2) => new n$4("string" == typeof t2 ? t2 : t2 + "", void 0, s$3), i$3 = (t2, ...e2) => {
  const o2 = 1 === t2.length ? t2[0] : e2.reduce((e3, s2, o3) => e3 + ((t3) => {
    if (true === t3._$cssResult$) return t3.cssText;
    if ("number" == typeof t3) return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s2) + t2[o3 + 1], t2[0]);
  return new n$4(o2, t2, s$3);
}, S$1 = (s2, o2) => {
  if (e$2) s2.adoptedStyleSheets = o2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet);
  else for (const e2 of o2) {
    const o3 = document.createElement("style"), n3 = t$2.litNonce;
    void 0 !== n3 && o3.setAttribute("nonce", n3), o3.textContent = e2.cssText, s2.appendChild(o3);
  }
}, c$2 = e$2 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules) e2 += s2.cssText;
  return r$4(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: i$2, defineProperty: e$1, getOwnPropertyDescriptor: h$1, getOwnPropertyNames: r$3, getOwnPropertySymbols: o$3, getPrototypeOf: n$3 } = Object, a$1 = globalThis, c$1 = a$1.trustedTypes, l$2 = c$1 ? c$1.emptyScript : "", p$1 = a$1.reactiveElementPolyfillSupport, d$1 = (t2, s2) => t2, u$1 = { toAttribute(t2, s2) {
  switch (s2) {
    case Boolean:
      t2 = t2 ? l$2 : null;
      break;
    case Object:
    case Array:
      t2 = null == t2 ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, s2) {
  let i2 = t2;
  switch (s2) {
    case Boolean:
      i2 = null !== t2;
      break;
    case Number:
      i2 = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        i2 = JSON.parse(t2);
      } catch (t3) {
        i2 = null;
      }
  }
  return i2;
} }, f$1 = (t2, s2) => !i$2(t2, s2), b$1 = { attribute: true, type: String, converter: u$1, reflect: false, useDefault: false, hasChanged: f$1 };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), a$1.litPropertyMetadata ?? (a$1.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let y$1 = class y extends HTMLElement {
  static addInitializer(t2) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t2);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t2, s2 = b$1) {
    if (s2.state && (s2.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t2) && ((s2 = Object.create(s2)).wrapped = true), this.elementProperties.set(t2, s2), !s2.noAccessor) {
      const i2 = Symbol(), h2 = this.getPropertyDescriptor(t2, i2, s2);
      void 0 !== h2 && e$1(this.prototype, t2, h2);
    }
  }
  static getPropertyDescriptor(t2, s2, i2) {
    const { get: e2, set: r2 } = h$1(this.prototype, t2) ?? { get() {
      return this[s2];
    }, set(t3) {
      this[s2] = t3;
    } };
    return { get: e2, set(s3) {
      const h2 = e2?.call(this);
      r2?.call(this, s3), this.requestUpdate(t2, h2, i2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) ?? b$1;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d$1("elementProperties"))) return;
    const t2 = n$3(this);
    t2.finalize(), void 0 !== t2.l && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d$1("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d$1("properties"))) {
      const t3 = this.properties, s2 = [...r$3(t3), ...o$3(t3)];
      for (const i2 of s2) this.createProperty(i2, t3[i2]);
    }
    const t2 = this[Symbol.metadata];
    if (null !== t2) {
      const s2 = litPropertyMetadata.get(t2);
      if (void 0 !== s2) for (const [t3, i2] of s2) this.elementProperties.set(t3, i2);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t3, s2] of this.elementProperties) {
      const i2 = this._$Eu(t3, s2);
      void 0 !== i2 && this._$Eh.set(i2, t3);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s2) {
    const i2 = [];
    if (Array.isArray(s2)) {
      const e2 = new Set(s2.flat(1 / 0).reverse());
      for (const s3 of e2) i2.unshift(c$2(s3));
    } else void 0 !== s2 && i2.push(c$2(s2));
    return i2;
  }
  static _$Eu(t2, s2) {
    const i2 = s2.attribute;
    return false === i2 ? void 0 : "string" == typeof i2 ? i2 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t2) => this.enableUpdating = t2), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t2) => t2(this));
  }
  addController(t2) {
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t2), void 0 !== this.renderRoot && this.isConnected && t2.hostConnected?.();
  }
  removeController(t2) {
    this._$EO?.delete(t2);
  }
  _$E_() {
    const t2 = /* @__PURE__ */ new Map(), s2 = this.constructor.elementProperties;
    for (const i2 of s2.keys()) this.hasOwnProperty(i2) && (t2.set(i2, this[i2]), delete this[i2]);
    t2.size > 0 && (this._$Ep = t2);
  }
  createRenderRoot() {
    const t2 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S$1(t2, this.constructor.elementStyles), t2;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), this._$EO?.forEach((t2) => t2.hostConnected?.());
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t2) => t2.hostDisconnected?.());
  }
  attributeChangedCallback(t2, s2, i2) {
    this._$AK(t2, i2);
  }
  _$ET(t2, s2) {
    const i2 = this.constructor.elementProperties.get(t2), e2 = this.constructor._$Eu(t2, i2);
    if (void 0 !== e2 && true === i2.reflect) {
      const h2 = (void 0 !== i2.converter?.toAttribute ? i2.converter : u$1).toAttribute(s2, i2.type);
      this._$Em = t2, null == h2 ? this.removeAttribute(e2) : this.setAttribute(e2, h2), this._$Em = null;
    }
  }
  _$AK(t2, s2) {
    const i2 = this.constructor, e2 = i2._$Eh.get(t2);
    if (void 0 !== e2 && this._$Em !== e2) {
      const t3 = i2.getPropertyOptions(e2), h2 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== t3.converter?.fromAttribute ? t3.converter : u$1;
      this._$Em = e2;
      const r2 = h2.fromAttribute(s2, t3.type);
      this[e2] = r2 ?? this._$Ej?.get(e2) ?? r2, this._$Em = null;
    }
  }
  requestUpdate(t2, s2, i2, e2 = false, h2) {
    if (void 0 !== t2) {
      const r2 = this.constructor;
      if (false === e2 && (h2 = this[t2]), i2 ?? (i2 = r2.getPropertyOptions(t2)), !((i2.hasChanged ?? f$1)(h2, s2) || i2.useDefault && i2.reflect && h2 === this._$Ej?.get(t2) && !this.hasAttribute(r2._$Eu(t2, i2)))) return;
      this.C(t2, s2, i2);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t2, s2, { useDefault: i2, reflect: e2, wrapped: h2 }, r2) {
    i2 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t2) && (this._$Ej.set(t2, r2 ?? s2 ?? this[t2]), true !== h2 || void 0 !== r2) || (this._$AL.has(t2) || (this.hasUpdated || i2 || (s2 = void 0), this._$AL.set(t2, s2)), true === e2 && this._$Em !== t2 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t2));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [t4, s3] of this._$Ep) this[t4] = s3;
        this._$Ep = void 0;
      }
      const t3 = this.constructor.elementProperties;
      if (t3.size > 0) for (const [s3, i2] of t3) {
        const { wrapped: t4 } = i2, e2 = this[s3];
        true !== t4 || this._$AL.has(s3) || void 0 === e2 || this.C(s3, void 0, i2, e2);
      }
    }
    let t2 = false;
    const s2 = this._$AL;
    try {
      t2 = this.shouldUpdate(s2), t2 ? (this.willUpdate(s2), this._$EO?.forEach((t3) => t3.hostUpdate?.()), this.update(s2)) : this._$EM();
    } catch (s3) {
      throw t2 = false, this._$EM(), s3;
    }
    t2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    this._$EO?.forEach((t3) => t3.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t3) => this._$ET(t3, this[t3]))), this._$EM();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
};
y$1.elementStyles = [], y$1.shadowRootOptions = { mode: "open" }, y$1[d$1("elementProperties")] = /* @__PURE__ */ new Map(), y$1[d$1("finalized")] = /* @__PURE__ */ new Map(), p$1?.({ ReactiveElement: y$1 }), (a$1.reactiveElementVersions ?? (a$1.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1 = globalThis, i$1 = (t2) => t2, s$2 = t$1.trustedTypes, e = s$2 ? s$2.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, h = "$lit$", o$2 = `lit$${Math.random().toFixed(9).slice(2)}$`, n$2 = "?" + o$2, r$2 = `<${n$2}>`, l$1 = document, c = () => l$1.createComment(""), a = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, u = Array.isArray, d = (t2) => u(t2) || "function" == typeof t2?.[Symbol.iterator], f = "[ 	\n\f\r]", v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _ = /-->/g, m = />/g, p = RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), g = /'/g, $ = /"/g, y2 = /^(?:script|style|textarea|title)$/i, x = (t2) => (i2, ...s2) => ({ _$litType$: t2, strings: i2, values: s2 }), b = x(1), E = Symbol.for("lit-noChange"), A = Symbol.for("lit-nothing"), C = /* @__PURE__ */ new WeakMap(), P = l$1.createTreeWalker(l$1, 129);
function V(t2, i2) {
  if (!u(t2) || !t2.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e ? e.createHTML(i2) : i2;
}
const N = (t2, i2) => {
  const s2 = t2.length - 1, e2 = [];
  let n3, l2 = 2 === i2 ? "<svg>" : 3 === i2 ? "<math>" : "", c2 = v;
  for (let i3 = 0; i3 < s2; i3++) {
    const s3 = t2[i3];
    let a2, u2, d2 = -1, f2 = 0;
    for (; f2 < s3.length && (c2.lastIndex = f2, u2 = c2.exec(s3), null !== u2); ) f2 = c2.lastIndex, c2 === v ? "!--" === u2[1] ? c2 = _ : void 0 !== u2[1] ? c2 = m : void 0 !== u2[2] ? (y2.test(u2[2]) && (n3 = RegExp("</" + u2[2], "g")), c2 = p) : void 0 !== u2[3] && (c2 = p) : c2 === p ? ">" === u2[0] ? (c2 = n3 ?? v, d2 = -1) : void 0 === u2[1] ? d2 = -2 : (d2 = c2.lastIndex - u2[2].length, a2 = u2[1], c2 = void 0 === u2[3] ? p : '"' === u2[3] ? $ : g) : c2 === $ || c2 === g ? c2 = p : c2 === _ || c2 === m ? c2 = v : (c2 = p, n3 = void 0);
    const x2 = c2 === p && t2[i3 + 1].startsWith("/>") ? " " : "";
    l2 += c2 === v ? s3 + r$2 : d2 >= 0 ? (e2.push(a2), s3.slice(0, d2) + h + s3.slice(d2) + o$2 + x2) : s3 + o$2 + (-2 === d2 ? i3 : x2);
  }
  return [V(t2, l2 + (t2[s2] || "<?>") + (2 === i2 ? "</svg>" : 3 === i2 ? "</math>" : "")), e2];
};
class S {
  constructor({ strings: t2, _$litType$: i2 }, e2) {
    let r2;
    this.parts = [];
    let l2 = 0, a2 = 0;
    const u2 = t2.length - 1, d2 = this.parts, [f2, v2] = N(t2, i2);
    if (this.el = S.createElement(f2, e2), P.currentNode = this.el.content, 2 === i2 || 3 === i2) {
      const t3 = this.el.content.firstChild;
      t3.replaceWith(...t3.childNodes);
    }
    for (; null !== (r2 = P.nextNode()) && d2.length < u2; ) {
      if (1 === r2.nodeType) {
        if (r2.hasAttributes()) for (const t3 of r2.getAttributeNames()) if (t3.endsWith(h)) {
          const i3 = v2[a2++], s2 = r2.getAttribute(t3).split(o$2), e3 = /([.?@])?(.*)/.exec(i3);
          d2.push({ type: 1, index: l2, name: e3[2], strings: s2, ctor: "." === e3[1] ? I : "?" === e3[1] ? L : "@" === e3[1] ? z : H }), r2.removeAttribute(t3);
        } else t3.startsWith(o$2) && (d2.push({ type: 6, index: l2 }), r2.removeAttribute(t3));
        if (y2.test(r2.tagName)) {
          const t3 = r2.textContent.split(o$2), i3 = t3.length - 1;
          if (i3 > 0) {
            r2.textContent = s$2 ? s$2.emptyScript : "";
            for (let s2 = 0; s2 < i3; s2++) r2.append(t3[s2], c()), P.nextNode(), d2.push({ type: 2, index: ++l2 });
            r2.append(t3[i3], c());
          }
        }
      } else if (8 === r2.nodeType) if (r2.data === n$2) d2.push({ type: 2, index: l2 });
      else {
        let t3 = -1;
        for (; -1 !== (t3 = r2.data.indexOf(o$2, t3 + 1)); ) d2.push({ type: 7, index: l2 }), t3 += o$2.length - 1;
      }
      l2++;
    }
  }
  static createElement(t2, i2) {
    const s2 = l$1.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function M(t2, i2, s2 = t2, e2) {
  if (i2 === E) return i2;
  let h2 = void 0 !== e2 ? s2._$Co?.[e2] : s2._$Cl;
  const o2 = a(i2) ? void 0 : i2._$litDirective$;
  return h2?.constructor !== o2 && (h2?._$AO?.(false), void 0 === o2 ? h2 = void 0 : (h2 = new o2(t2), h2._$AT(t2, s2, e2)), void 0 !== e2 ? (s2._$Co ?? (s2._$Co = []))[e2] = h2 : s2._$Cl = h2), void 0 !== h2 && (i2 = M(t2, h2._$AS(t2, i2.values), h2, e2)), i2;
}
class R {
  constructor(t2, i2) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    const { el: { content: i2 }, parts: s2 } = this._$AD, e2 = (t2?.creationScope ?? l$1).importNode(i2, true);
    P.currentNode = e2;
    let h2 = P.nextNode(), o2 = 0, n3 = 0, r2 = s2[0];
    for (; void 0 !== r2; ) {
      if (o2 === r2.index) {
        let i3;
        2 === r2.type ? i3 = new k(h2, h2.nextSibling, this, t2) : 1 === r2.type ? i3 = new r2.ctor(h2, r2.name, r2.strings, this, t2) : 6 === r2.type && (i3 = new Z(h2, this, t2)), this._$AV.push(i3), r2 = s2[++n3];
      }
      o2 !== r2?.index && (h2 = P.nextNode(), o2++);
    }
    return P.currentNode = l$1, e2;
  }
  p(t2) {
    let i2 = 0;
    for (const s2 of this._$AV) void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
  }
}
class k {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t2, i2, s2, e2) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cv = e2?.isConnected ?? true;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return void 0 !== i2 && 11 === t2?.nodeType && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = M(this, t2, i2), a(t2) ? t2 === A || null == t2 || "" === t2 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t2 !== this._$AH && t2 !== E && this._(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.T(t2) : d(t2) ? this.k(t2) : this._(t2);
  }
  O(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.O(t2));
  }
  _(t2) {
    this._$AH !== A && a(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(l$1.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    const { values: i2, _$litType$: s2 } = t2, e2 = "number" == typeof s2 ? this._$AC(t2) : (void 0 === s2.el && (s2.el = S.createElement(V(s2.h, s2.h[0]), this.options)), s2);
    if (this._$AH?._$AD === e2) this._$AH.p(i2);
    else {
      const t3 = new R(e2, this), s3 = t3.u(this.options);
      t3.p(i2), this.T(s3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = C.get(t2.strings);
    return void 0 === i2 && C.set(t2.strings, i2 = new S(t2)), i2;
  }
  k(t2) {
    u(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const h2 of t2) e2 === i2.length ? i2.push(s2 = new k(this.O(c()), this.O(c()), this, this.options)) : s2 = i2[e2], s2._$AI(h2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, s2) {
    for (this._$AP?.(false, true, s2); t2 !== this._$AB; ) {
      const s3 = i$1(t2).nextSibling;
      i$1(t2).remove(), t2 = s3;
    }
  }
  setConnected(t2) {
    void 0 === this._$AM && (this._$Cv = t2, this._$AP?.(t2));
  }
}
class H {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, i2, s2, e2, h2) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = h2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = A;
  }
  _$AI(t2, i2 = this, s2, e2) {
    const h2 = this.strings;
    let o2 = false;
    if (void 0 === h2) t2 = M(this, t2, i2, 0), o2 = !a(t2) || t2 !== this._$AH && t2 !== E, o2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let n3, r2;
      for (t2 = h2[0], n3 = 0; n3 < h2.length - 1; n3++) r2 = M(this, e3[s2 + n3], i2, n3), r2 === E && (r2 = this._$AH[n3]), o2 || (o2 = !a(r2) || r2 !== this._$AH[n3]), r2 === A ? t2 = A : t2 !== A && (t2 += (r2 ?? "") + h2[n3 + 1]), this._$AH[n3] = r2;
    }
    o2 && !e2 && this.j(t2);
  }
  j(t2) {
    t2 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
  }
}
class I extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === A ? void 0 : t2;
  }
}
class L extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== A);
  }
}
class z extends H {
  constructor(t2, i2, s2, e2, h2) {
    super(t2, i2, s2, e2, h2), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    if ((t2 = M(this, t2, i2, 0) ?? A) === E) return;
    const s2 = this._$AH, e2 = t2 === A && s2 !== A || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, h2 = t2 !== A && (s2 === A || e2);
    e2 && this.element.removeEventListener(this.name, this, s2), h2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class Z {
  constructor(t2, i2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    M(this, t2);
  }
}
const B = t$1.litHtmlPolyfillSupport;
B?.(S, k), (t$1.litHtmlVersions ?? (t$1.litHtmlVersions = [])).push("3.3.3");
const D = (t2, i2, s2) => {
  const e2 = s2?.renderBefore ?? i2;
  let h2 = e2._$litPart$;
  if (void 0 === h2) {
    const t3 = s2?.renderBefore ?? null;
    e2._$litPart$ = h2 = new k(i2.insertBefore(c(), t3), t3, void 0, s2 ?? {});
  }
  return h2._$AI(t2), h2;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const s$1 = globalThis;
class i extends y$1 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var _a;
    const t2 = super.createRenderRoot();
    return (_a = this.renderOptions).renderBefore ?? (_a.renderBefore = t2.firstChild), t2;
  }
  update(t2) {
    const r2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = D(r2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(false);
  }
  render() {
    return E;
  }
}
i._$litElement$ = true, i["finalized"] = true, s$1.litElementHydrateSupport?.({ LitElement: i });
const o$1 = s$1.litElementPolyfillSupport;
o$1?.({ LitElement: i });
(s$1.litElementVersions ?? (s$1.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = (t2) => (e2, o2) => {
  void 0 !== o2 ? o2.addInitializer(() => {
    customElements.define(t2, e2);
  }) : customElements.define(t2, e2);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o = { attribute: true, type: String, converter: u$1, reflect: false, hasChanged: f$1 }, r$1 = (t2 = o, e2, r2) => {
  const { kind: n3, metadata: i2 } = r2;
  let s2 = globalThis.litPropertyMetadata.get(i2);
  if (void 0 === s2 && globalThis.litPropertyMetadata.set(i2, s2 = /* @__PURE__ */ new Map()), "setter" === n3 && ((t2 = Object.create(t2)).wrapped = true), s2.set(r2.name, t2), "accessor" === n3) {
    const { name: o2 } = r2;
    return { set(r3) {
      const n4 = e2.get.call(this);
      e2.set.call(this, r3), this.requestUpdate(o2, n4, t2, true, r3);
    }, init(e3) {
      return void 0 !== e3 && this.C(o2, void 0, t2, e3), e3;
    } };
  }
  if ("setter" === n3) {
    const { name: o2 } = r2;
    return function(r3) {
      const n4 = this[o2];
      e2.call(this, r3), this.requestUpdate(o2, n4, t2, true, r3);
    };
  }
  throw Error("Unsupported decorator location: " + n3);
};
function n$1(t2) {
  return (e2, o2) => "object" == typeof o2 ? r$1(t2, e2, o2) : ((t3, e3, o3) => {
    const r2 = e3.hasOwnProperty(o3);
    return e3.constructor.createProperty(o3, t3), r2 ? Object.getOwnPropertyDescriptor(e3, o3) : void 0;
  })(t2, e2, o2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function r(r2) {
  return n$1({ ...r2, state: true, attribute: false });
}
class LuxonError extends Error {
}
class InvalidDateTimeError extends LuxonError {
  constructor(reason) {
    super(`Invalid DateTime: ${reason.toMessage()}`);
  }
}
class InvalidIntervalError extends LuxonError {
  constructor(reason) {
    super(`Invalid Interval: ${reason.toMessage()}`);
  }
}
class InvalidDurationError extends LuxonError {
  constructor(reason) {
    super(`Invalid Duration: ${reason.toMessage()}`);
  }
}
class ConflictingSpecificationError extends LuxonError {
}
class InvalidUnitError extends LuxonError {
  constructor(unit) {
    super(`Invalid unit ${unit}`);
  }
}
class InvalidArgumentError extends LuxonError {
}
class ZoneIsAbstractError extends LuxonError {
  constructor() {
    super("Zone is an abstract class");
  }
}
const n2 = "numeric", s = "short", l = "long";
const DATE_SHORT = {
  year: n2,
  month: n2,
  day: n2
};
const DATE_MED = {
  year: n2,
  month: s,
  day: n2
};
const DATE_MED_WITH_WEEKDAY = {
  year: n2,
  month: s,
  day: n2,
  weekday: s
};
const DATE_FULL = {
  year: n2,
  month: l,
  day: n2
};
const DATE_HUGE = {
  year: n2,
  month: l,
  day: n2,
  weekday: l
};
const TIME_SIMPLE = {
  hour: n2,
  minute: n2
};
const TIME_WITH_SECONDS = {
  hour: n2,
  minute: n2,
  second: n2
};
const TIME_WITH_SHORT_OFFSET = {
  hour: n2,
  minute: n2,
  second: n2,
  timeZoneName: s
};
const TIME_WITH_LONG_OFFSET = {
  hour: n2,
  minute: n2,
  second: n2,
  timeZoneName: l
};
const TIME_24_SIMPLE = {
  hour: n2,
  minute: n2,
  hourCycle: "h23"
};
const TIME_24_WITH_SECONDS = {
  hour: n2,
  minute: n2,
  second: n2,
  hourCycle: "h23"
};
const TIME_24_WITH_SHORT_OFFSET = {
  hour: n2,
  minute: n2,
  second: n2,
  hourCycle: "h23",
  timeZoneName: s
};
const TIME_24_WITH_LONG_OFFSET = {
  hour: n2,
  minute: n2,
  second: n2,
  hourCycle: "h23",
  timeZoneName: l
};
const DATETIME_SHORT = {
  year: n2,
  month: n2,
  day: n2,
  hour: n2,
  minute: n2
};
const DATETIME_SHORT_WITH_SECONDS = {
  year: n2,
  month: n2,
  day: n2,
  hour: n2,
  minute: n2,
  second: n2
};
const DATETIME_MED = {
  year: n2,
  month: s,
  day: n2,
  hour: n2,
  minute: n2
};
const DATETIME_MED_WITH_SECONDS = {
  year: n2,
  month: s,
  day: n2,
  hour: n2,
  minute: n2,
  second: n2
};
const DATETIME_MED_WITH_WEEKDAY = {
  year: n2,
  month: s,
  day: n2,
  weekday: s,
  hour: n2,
  minute: n2
};
const DATETIME_FULL = {
  year: n2,
  month: l,
  day: n2,
  hour: n2,
  minute: n2,
  timeZoneName: s
};
const DATETIME_FULL_WITH_SECONDS = {
  year: n2,
  month: l,
  day: n2,
  hour: n2,
  minute: n2,
  second: n2,
  timeZoneName: s
};
const DATETIME_HUGE = {
  year: n2,
  month: l,
  day: n2,
  weekday: l,
  hour: n2,
  minute: n2,
  timeZoneName: l
};
const DATETIME_HUGE_WITH_SECONDS = {
  year: n2,
  month: l,
  day: n2,
  weekday: l,
  hour: n2,
  minute: n2,
  second: n2,
  timeZoneName: l
};
class Zone {
  /**
   * The type of zone
   * @abstract
   * @type {string}
   */
  get type() {
    throw new ZoneIsAbstractError();
  }
  /**
   * The name of this zone.
   * @abstract
   * @type {string}
   */
  get name() {
    throw new ZoneIsAbstractError();
  }
  /**
   * The IANA name of this zone.
   * Defaults to `name` if not overwritten by a subclass.
   * @abstract
   * @type {string}
   */
  get ianaName() {
    return this.name;
  }
  /**
   * Returns whether the offset is known to be fixed for the whole year.
   * @abstract
   * @type {boolean}
   */
  get isUniversal() {
    throw new ZoneIsAbstractError();
  }
  /**
   * Returns the offset's common name (such as EST) at the specified timestamp
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the name
   * @param {Object} opts - Options to affect the format
   * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
   * @param {string} opts.locale - What locale to return the offset name in.
   * @return {string}
   */
  offsetName(ts, opts) {
    throw new ZoneIsAbstractError();
  }
  /**
   * Returns the offset's value as a string
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  formatOffset(ts, format) {
    throw new ZoneIsAbstractError();
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  offset(ts) {
    throw new ZoneIsAbstractError();
  }
  /**
   * Return whether this Zone is equal to another zone
   * @abstract
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(otherZone) {
    throw new ZoneIsAbstractError();
  }
  /**
   * Return whether this Zone is valid.
   * @abstract
   * @type {boolean}
   */
  get isValid() {
    throw new ZoneIsAbstractError();
  }
}
let singleton$1 = null;
class SystemZone extends Zone {
  /**
   * Get a singleton instance of the local zone
   * @return {SystemZone}
   */
  static get instance() {
    if (singleton$1 === null) {
      singleton$1 = new SystemZone();
    }
    return singleton$1;
  }
  /** @override **/
  get type() {
    return "system";
  }
  /** @override **/
  get name() {
    return new Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  /** @override **/
  get isUniversal() {
    return false;
  }
  /** @override **/
  offsetName(ts, { format, locale }) {
    return parseZoneInfo(ts, format, locale);
  }
  /** @override **/
  formatOffset(ts, format) {
    return formatOffset(this.offset(ts), format);
  }
  /** @override **/
  offset(ts) {
    return -new Date(ts).getTimezoneOffset();
  }
  /** @override **/
  equals(otherZone) {
    return otherZone.type === "system";
  }
  /** @override **/
  get isValid() {
    return true;
  }
}
const dtfCache = /* @__PURE__ */ new Map();
function makeDTF(zoneName) {
  let dtf = dtfCache.get(zoneName);
  if (dtf === void 0) {
    dtf = new Intl.DateTimeFormat("en-US", {
      hour12: false,
      timeZone: zoneName,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      era: "short"
    });
    dtfCache.set(zoneName, dtf);
  }
  return dtf;
}
const typeToPos = {
  year: 0,
  month: 1,
  day: 2,
  era: 3,
  hour: 4,
  minute: 5,
  second: 6
};
function hackyOffset(dtf, date) {
  const formatted = dtf.format(date).replace(/\u200E/g, ""), parsed = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(formatted), [, fMonth, fDay, fYear, fadOrBc, fHour, fMinute, fSecond] = parsed;
  return [fYear, fMonth, fDay, fadOrBc, fHour, fMinute, fSecond];
}
function partsOffset(dtf, date) {
  const formatted = dtf.formatToParts(date);
  const filled = [];
  for (let i2 = 0; i2 < formatted.length; i2++) {
    const { type, value } = formatted[i2];
    const pos = typeToPos[type];
    if (type === "era") {
      filled[pos] = value;
    } else if (!isUndefined(pos)) {
      filled[pos] = parseInt(value, 10);
    }
  }
  return filled;
}
const ianaZoneCache = /* @__PURE__ */ new Map();
class IANAZone extends Zone {
  /**
   * @param {string} name - Zone name
   * @return {IANAZone}
   */
  static create(name) {
    let zone = ianaZoneCache.get(name);
    if (zone === void 0) {
      ianaZoneCache.set(name, zone = new IANAZone(name));
    }
    return zone;
  }
  /**
   * Reset local caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCache() {
    ianaZoneCache.clear();
    dtfCache.clear();
  }
  /**
   * Returns whether the provided string is a valid specifier. This only checks the string's format, not that the specifier identifies a known zone; see isValidZone for that.
   * @param {string} s - The string to check validity on
   * @example IANAZone.isValidSpecifier("America/New_York") //=> true
   * @example IANAZone.isValidSpecifier("Sport~~blorp") //=> false
   * @deprecated For backward compatibility, this forwards to isValidZone, better use `isValidZone()` directly instead.
   * @return {boolean}
   */
  static isValidSpecifier(s2) {
    return this.isValidZone(s2);
  }
  /**
   * Returns whether the provided string identifies a real zone
   * @param {string} zone - The string to check
   * @example IANAZone.isValidZone("America/New_York") //=> true
   * @example IANAZone.isValidZone("Fantasia/Castle") //=> false
   * @example IANAZone.isValidZone("Sport~~blorp") //=> false
   * @return {boolean}
   */
  static isValidZone(zone) {
    if (!zone) {
      return false;
    }
    try {
      new Intl.DateTimeFormat("en-US", { timeZone: zone }).format();
      return true;
    } catch (e2) {
      return false;
    }
  }
  constructor(name) {
    super();
    this.zoneName = name;
    this.valid = IANAZone.isValidZone(name);
  }
  /**
   * The type of zone. `iana` for all instances of `IANAZone`.
   * @override
   * @type {string}
   */
  get type() {
    return "iana";
  }
  /**
   * The name of this zone (i.e. the IANA zone name).
   * @override
   * @type {string}
   */
  get name() {
    return this.zoneName;
  }
  /**
   * Returns whether the offset is known to be fixed for the whole year:
   * Always returns false for all IANA zones.
   * @override
   * @type {boolean}
   */
  get isUniversal() {
    return false;
  }
  /**
   * Returns the offset's common name (such as EST) at the specified timestamp
   * @override
   * @param {number} ts - Epoch milliseconds for which to get the name
   * @param {Object} opts - Options to affect the format
   * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
   * @param {string} opts.locale - What locale to return the offset name in.
   * @return {string}
   */
  offsetName(ts, { format, locale }) {
    return parseZoneInfo(ts, format, locale, this.name);
  }
  /**
   * Returns the offset's value as a string
   * @override
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  formatOffset(ts, format) {
    return formatOffset(this.offset(ts), format);
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @override
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  offset(ts) {
    if (!this.valid) return NaN;
    const date = new Date(ts);
    if (isNaN(date)) return NaN;
    const dtf = makeDTF(this.name);
    let [year, month, day, adOrBc, hour, minute, second] = dtf.formatToParts ? partsOffset(dtf, date) : hackyOffset(dtf, date);
    if (adOrBc === "BC") {
      year = -Math.abs(year) + 1;
    }
    const adjustedHour = hour === 24 ? 0 : hour;
    const asUTC = objToLocalTS({
      year,
      month,
      day,
      hour: adjustedHour,
      minute,
      second,
      millisecond: 0
    });
    let asTS = +date;
    const over = asTS % 1e3;
    asTS -= over >= 0 ? over : 1e3 + over;
    return (asUTC - asTS) / (60 * 1e3);
  }
  /**
   * Return whether this Zone is equal to another zone
   * @override
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(otherZone) {
    return otherZone.type === "iana" && otherZone.name === this.name;
  }
  /**
   * Return whether this Zone is valid.
   * @override
   * @type {boolean}
   */
  get isValid() {
    return this.valid;
  }
}
let intlLFCache = {};
function getCachedLF(locString, opts = {}) {
  const key = JSON.stringify([locString, opts]);
  let dtf = intlLFCache[key];
  if (!dtf) {
    dtf = new Intl.ListFormat(locString, opts);
    intlLFCache[key] = dtf;
  }
  return dtf;
}
const intlDTCache = /* @__PURE__ */ new Map();
function getCachedDTF(locString, opts = {}) {
  const key = JSON.stringify([locString, opts]);
  let dtf = intlDTCache.get(key);
  if (dtf === void 0) {
    dtf = new Intl.DateTimeFormat(locString, opts);
    intlDTCache.set(key, dtf);
  }
  return dtf;
}
const intlNumCache = /* @__PURE__ */ new Map();
function getCachedINF(locString, opts = {}) {
  const key = JSON.stringify([locString, opts]);
  let inf = intlNumCache.get(key);
  if (inf === void 0) {
    inf = new Intl.NumberFormat(locString, opts);
    intlNumCache.set(key, inf);
  }
  return inf;
}
const intlRelCache = /* @__PURE__ */ new Map();
function getCachedRTF(locString, opts = {}) {
  const { base, ...cacheKeyOpts } = opts;
  const key = JSON.stringify([locString, cacheKeyOpts]);
  let inf = intlRelCache.get(key);
  if (inf === void 0) {
    inf = new Intl.RelativeTimeFormat(locString, opts);
    intlRelCache.set(key, inf);
  }
  return inf;
}
let sysLocaleCache = null;
function systemLocale() {
  if (sysLocaleCache) {
    return sysLocaleCache;
  } else {
    sysLocaleCache = new Intl.DateTimeFormat().resolvedOptions().locale;
    return sysLocaleCache;
  }
}
const intlResolvedOptionsCache = /* @__PURE__ */ new Map();
function getCachedIntResolvedOptions(locString) {
  let opts = intlResolvedOptionsCache.get(locString);
  if (opts === void 0) {
    opts = new Intl.DateTimeFormat(locString).resolvedOptions();
    intlResolvedOptionsCache.set(locString, opts);
  }
  return opts;
}
const weekInfoCache = /* @__PURE__ */ new Map();
function getCachedWeekInfo(locString) {
  let data = weekInfoCache.get(locString);
  if (!data) {
    const locale = new Intl.Locale(locString);
    data = "getWeekInfo" in locale ? locale.getWeekInfo() : locale.weekInfo;
    if (!("minimalDays" in data)) {
      data = { ...fallbackWeekSettings, ...data };
    }
    weekInfoCache.set(locString, data);
  }
  return data;
}
function parseLocaleString(localeStr) {
  const xIndex = localeStr.indexOf("-x-");
  if (xIndex !== -1) {
    localeStr = localeStr.substring(0, xIndex);
  }
  const uIndex = localeStr.indexOf("-u-");
  if (uIndex === -1) {
    return [localeStr];
  } else {
    let options;
    let selectedStr;
    try {
      options = getCachedDTF(localeStr).resolvedOptions();
      selectedStr = localeStr;
    } catch (e2) {
      const smaller = localeStr.substring(0, uIndex);
      options = getCachedDTF(smaller).resolvedOptions();
      selectedStr = smaller;
    }
    const { numberingSystem, calendar } = options;
    return [selectedStr, numberingSystem, calendar];
  }
}
function intlConfigString(localeStr, numberingSystem, outputCalendar) {
  if (outputCalendar || numberingSystem) {
    if (!localeStr.includes("-u-")) {
      localeStr += "-u";
    }
    if (outputCalendar) {
      localeStr += `-ca-${outputCalendar}`;
    }
    if (numberingSystem) {
      localeStr += `-nu-${numberingSystem}`;
    }
    return localeStr;
  } else {
    return localeStr;
  }
}
function mapMonths(f2) {
  const ms = [];
  for (let i2 = 1; i2 <= 12; i2++) {
    const dt = DateTime.utc(2009, i2, 1);
    ms.push(f2(dt));
  }
  return ms;
}
function mapWeekdays(f2) {
  const ms = [];
  for (let i2 = 1; i2 <= 7; i2++) {
    const dt = DateTime.utc(2016, 11, 13 + i2);
    ms.push(f2(dt));
  }
  return ms;
}
function listStuff(loc, length, englishFn, intlFn) {
  const mode = loc.listingMode();
  if (mode === "error") {
    return null;
  } else if (mode === "en") {
    return englishFn(length);
  } else {
    return intlFn(length);
  }
}
function supportsFastNumbers(loc) {
  if (loc.numberingSystem && loc.numberingSystem !== "latn") {
    return false;
  } else {
    return loc.numberingSystem === "latn" || !loc.locale || loc.locale.startsWith("en") || getCachedIntResolvedOptions(loc.locale).numberingSystem === "latn";
  }
}
class PolyNumberFormatter {
  constructor(intl, forceSimple, opts) {
    this.padTo = opts.padTo || 0;
    this.floor = opts.floor || false;
    const { padTo, floor, ...otherOpts } = opts;
    if (!forceSimple || Object.keys(otherOpts).length > 0) {
      const intlOpts = { useGrouping: false, ...opts };
      if (opts.padTo > 0) intlOpts.minimumIntegerDigits = opts.padTo;
      this.inf = getCachedINF(intl, intlOpts);
    }
  }
  format(i2) {
    if (this.inf) {
      const fixed = this.floor ? Math.floor(i2) : i2;
      return this.inf.format(fixed);
    } else {
      const fixed = this.floor ? Math.floor(i2) : roundTo(i2, 3);
      return padStart(fixed, this.padTo);
    }
  }
}
class PolyDateFormatter {
  constructor(dt, intl, opts) {
    this.opts = opts;
    this.originalZone = void 0;
    let z2 = void 0;
    if (this.opts.timeZone) {
      this.dt = dt;
    } else if (dt.zone.type === "fixed") {
      const gmtOffset = -1 * (dt.offset / 60);
      const offsetZ = gmtOffset >= 0 ? `Etc/GMT+${gmtOffset}` : `Etc/GMT${gmtOffset}`;
      if (dt.offset !== 0 && IANAZone.create(offsetZ).valid) {
        z2 = offsetZ;
        this.dt = dt;
      } else {
        z2 = "UTC";
        this.dt = dt.offset === 0 ? dt : dt.setZone("UTC").plus({ minutes: dt.offset });
        this.originalZone = dt.zone;
      }
    } else if (dt.zone.type === "system") {
      this.dt = dt;
    } else if (dt.zone.type === "iana") {
      this.dt = dt;
      z2 = dt.zone.name;
    } else {
      z2 = "UTC";
      this.dt = dt.setZone("UTC").plus({ minutes: dt.offset });
      this.originalZone = dt.zone;
    }
    const intlOpts = { ...this.opts };
    intlOpts.timeZone = intlOpts.timeZone || z2;
    this.dtf = getCachedDTF(intl, intlOpts);
  }
  format() {
    if (this.originalZone) {
      return this.formatToParts().map(({ value }) => value).join("");
    }
    return this.dtf.format(this.dt.toJSDate());
  }
  formatToParts() {
    const parts = this.dtf.formatToParts(this.dt.toJSDate());
    if (this.originalZone) {
      return parts.map((part) => {
        if (part.type === "timeZoneName") {
          const offsetName = this.originalZone.offsetName(this.dt.ts, {
            locale: this.dt.locale,
            format: this.opts.timeZoneName
          });
          return {
            ...part,
            value: offsetName
          };
        } else {
          return part;
        }
      });
    }
    return parts;
  }
  resolvedOptions() {
    return this.dtf.resolvedOptions();
  }
}
class PolyRelFormatter {
  constructor(intl, isEnglish, opts) {
    this.opts = { style: "long", ...opts };
    if (!isEnglish && hasRelative()) {
      this.rtf = getCachedRTF(intl, opts);
    }
  }
  format(count, unit) {
    if (this.rtf) {
      return this.rtf.format(count, unit);
    } else {
      return formatRelativeTime(unit, count, this.opts.numeric, this.opts.style !== "long");
    }
  }
  formatToParts(count, unit) {
    if (this.rtf) {
      return this.rtf.formatToParts(count, unit);
    } else {
      return [];
    }
  }
}
const fallbackWeekSettings = {
  firstDay: 1,
  minimalDays: 4,
  weekend: [6, 7]
};
class Locale {
  static fromOpts(opts) {
    return Locale.create(
      opts.locale,
      opts.numberingSystem,
      opts.outputCalendar,
      opts.weekSettings,
      opts.defaultToEN
    );
  }
  static create(locale, numberingSystem, outputCalendar, weekSettings, defaultToEN = false) {
    const specifiedLocale = locale || Settings.defaultLocale;
    const localeR = specifiedLocale || (defaultToEN ? "en-US" : systemLocale());
    const numberingSystemR = numberingSystem || Settings.defaultNumberingSystem;
    const outputCalendarR = outputCalendar || Settings.defaultOutputCalendar;
    const weekSettingsR = validateWeekSettings(weekSettings) || Settings.defaultWeekSettings;
    return new Locale(localeR, numberingSystemR, outputCalendarR, weekSettingsR, specifiedLocale);
  }
  static resetCache() {
    sysLocaleCache = null;
    intlDTCache.clear();
    intlNumCache.clear();
    intlRelCache.clear();
    intlResolvedOptionsCache.clear();
    weekInfoCache.clear();
  }
  static fromObject({ locale, numberingSystem, outputCalendar, weekSettings } = {}) {
    return Locale.create(locale, numberingSystem, outputCalendar, weekSettings);
  }
  constructor(locale, numbering, outputCalendar, weekSettings, specifiedLocale) {
    const [parsedLocale, parsedNumberingSystem, parsedOutputCalendar] = parseLocaleString(locale);
    this.locale = parsedLocale;
    this.numberingSystem = numbering || parsedNumberingSystem || null;
    this.outputCalendar = outputCalendar || parsedOutputCalendar || null;
    this.weekSettings = weekSettings;
    this.intl = intlConfigString(this.locale, this.numberingSystem, this.outputCalendar);
    this.weekdaysCache = { format: {}, standalone: {} };
    this.monthsCache = { format: {}, standalone: {} };
    this.meridiemCache = null;
    this.eraCache = {};
    this.specifiedLocale = specifiedLocale;
    this.fastNumbersCached = null;
  }
  get fastNumbers() {
    if (this.fastNumbersCached == null) {
      this.fastNumbersCached = supportsFastNumbers(this);
    }
    return this.fastNumbersCached;
  }
  listingMode() {
    const isActuallyEn = this.isEnglish();
    const hasNoWeirdness = (this.numberingSystem === null || this.numberingSystem === "latn") && (this.outputCalendar === null || this.outputCalendar === "gregory");
    return isActuallyEn && hasNoWeirdness ? "en" : "intl";
  }
  clone(alts) {
    if (!alts || Object.getOwnPropertyNames(alts).length === 0) {
      return this;
    } else {
      return Locale.create(
        alts.locale || this.specifiedLocale,
        alts.numberingSystem || this.numberingSystem,
        alts.outputCalendar || this.outputCalendar,
        validateWeekSettings(alts.weekSettings) || this.weekSettings,
        alts.defaultToEN || false
      );
    }
  }
  redefaultToEN(alts = {}) {
    return this.clone({ ...alts, defaultToEN: true });
  }
  redefaultToSystem(alts = {}) {
    return this.clone({ ...alts, defaultToEN: false });
  }
  months(length, format = false) {
    return listStuff(this, length, months, () => {
      const monthSpecialCase = this.intl === "ja" || this.intl.startsWith("ja-");
      format &= !monthSpecialCase;
      const intl = format ? { month: length, day: "numeric" } : { month: length }, formatStr = format ? "format" : "standalone";
      if (!this.monthsCache[formatStr][length]) {
        const mapper = !monthSpecialCase ? (dt) => this.extract(dt, intl, "month") : (dt) => this.dtFormatter(dt, intl).format();
        this.monthsCache[formatStr][length] = mapMonths(mapper);
      }
      return this.monthsCache[formatStr][length];
    });
  }
  weekdays(length, format = false) {
    return listStuff(this, length, weekdays, () => {
      const intl = format ? { weekday: length, year: "numeric", month: "long", day: "numeric" } : { weekday: length }, formatStr = format ? "format" : "standalone";
      if (!this.weekdaysCache[formatStr][length]) {
        this.weekdaysCache[formatStr][length] = mapWeekdays(
          (dt) => this.extract(dt, intl, "weekday")
        );
      }
      return this.weekdaysCache[formatStr][length];
    });
  }
  meridiems() {
    return listStuff(
      this,
      void 0,
      () => meridiems,
      () => {
        if (!this.meridiemCache) {
          const intl = { hour: "numeric", hourCycle: "h12" };
          this.meridiemCache = [DateTime.utc(2016, 11, 13, 9), DateTime.utc(2016, 11, 13, 19)].map(
            (dt) => this.extract(dt, intl, "dayperiod")
          );
        }
        return this.meridiemCache;
      }
    );
  }
  eras(length) {
    return listStuff(this, length, eras, () => {
      const intl = { era: length };
      if (!this.eraCache[length]) {
        this.eraCache[length] = [DateTime.utc(-40, 1, 1), DateTime.utc(2017, 1, 1)].map(
          (dt) => this.extract(dt, intl, "era")
        );
      }
      return this.eraCache[length];
    });
  }
  extract(dt, intlOpts, field) {
    const df = this.dtFormatter(dt, intlOpts), results = df.formatToParts(), matching = results.find((m2) => m2.type.toLowerCase() === field);
    return matching ? matching.value : null;
  }
  numberFormatter(opts = {}) {
    return new PolyNumberFormatter(this.intl, opts.forceSimple || this.fastNumbers, opts);
  }
  dtFormatter(dt, intlOpts = {}) {
    return new PolyDateFormatter(dt, this.intl, intlOpts);
  }
  relFormatter(opts = {}) {
    return new PolyRelFormatter(this.intl, this.isEnglish(), opts);
  }
  listFormatter(opts = {}) {
    return getCachedLF(this.intl, opts);
  }
  isEnglish() {
    return this.locale === "en" || this.locale.toLowerCase() === "en-us" || getCachedIntResolvedOptions(this.intl).locale.startsWith("en-us");
  }
  getWeekSettings() {
    if (this.weekSettings) {
      return this.weekSettings;
    } else if (!hasLocaleWeekInfo()) {
      return fallbackWeekSettings;
    } else {
      return getCachedWeekInfo(this.locale);
    }
  }
  getStartOfWeek() {
    return this.getWeekSettings().firstDay;
  }
  getMinDaysInFirstWeek() {
    return this.getWeekSettings().minimalDays;
  }
  getWeekendDays() {
    return this.getWeekSettings().weekend;
  }
  equals(other) {
    return this.locale === other.locale && this.numberingSystem === other.numberingSystem && this.outputCalendar === other.outputCalendar;
  }
  toString() {
    return `Locale(${this.locale}, ${this.numberingSystem}, ${this.outputCalendar})`;
  }
}
let singleton = null;
class FixedOffsetZone extends Zone {
  /**
   * Get a singleton instance of UTC
   * @return {FixedOffsetZone}
   */
  static get utcInstance() {
    if (singleton === null) {
      singleton = new FixedOffsetZone(0);
    }
    return singleton;
  }
  /**
   * Get an instance with a specified offset
   * @param {number} offset - The offset in minutes
   * @return {FixedOffsetZone}
   */
  static instance(offset2) {
    return offset2 === 0 ? FixedOffsetZone.utcInstance : new FixedOffsetZone(offset2);
  }
  /**
   * Get an instance of FixedOffsetZone from a UTC offset string, like "UTC+6"
   * @param {string} s - The offset string to parse
   * @example FixedOffsetZone.parseSpecifier("UTC+6")
   * @example FixedOffsetZone.parseSpecifier("UTC+06")
   * @example FixedOffsetZone.parseSpecifier("UTC-6:00")
   * @return {FixedOffsetZone}
   */
  static parseSpecifier(s2) {
    if (s2) {
      const r2 = s2.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
      if (r2) {
        return new FixedOffsetZone(signedOffset(r2[1], r2[2]));
      }
    }
    return null;
  }
  constructor(offset2) {
    super();
    this.fixed = offset2;
  }
  /**
   * The type of zone. `fixed` for all instances of `FixedOffsetZone`.
   * @override
   * @type {string}
   */
  get type() {
    return "fixed";
  }
  /**
   * The name of this zone.
   * All fixed zones' names always start with "UTC" (plus optional offset)
   * @override
   * @type {string}
   */
  get name() {
    return this.fixed === 0 ? "UTC" : `UTC${formatOffset(this.fixed, "narrow")}`;
  }
  /**
   * The IANA name of this zone, i.e. `Etc/UTC` or `Etc/GMT+/-nn`
   *
   * @override
   * @type {string}
   */
  get ianaName() {
    if (this.fixed === 0) {
      return "Etc/UTC";
    } else {
      return `Etc/GMT${formatOffset(-this.fixed, "narrow")}`;
    }
  }
  /**
   * Returns the offset's common name at the specified timestamp.
   *
   * For fixed offset zones this equals to the zone name.
   * @override
   */
  offsetName() {
    return this.name;
  }
  /**
   * Returns the offset's value as a string
   * @override
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  formatOffset(ts, format) {
    return formatOffset(this.fixed, format);
  }
  /**
   * Returns whether the offset is known to be fixed for the whole year:
   * Always returns true for all fixed offset zones.
   * @override
   * @type {boolean}
   */
  get isUniversal() {
    return true;
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   *
   * For fixed offset zones, this is constant and does not depend on a timestamp.
   * @override
   * @return {number}
   */
  offset() {
    return this.fixed;
  }
  /**
   * Return whether this Zone is equal to another zone (i.e. also fixed and same offset)
   * @override
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(otherZone) {
    return otherZone.type === "fixed" && otherZone.fixed === this.fixed;
  }
  /**
   * Return whether this Zone is valid:
   * All fixed offset zones are valid.
   * @override
   * @type {boolean}
   */
  get isValid() {
    return true;
  }
}
class InvalidZone extends Zone {
  constructor(zoneName) {
    super();
    this.zoneName = zoneName;
  }
  /** @override **/
  get type() {
    return "invalid";
  }
  /** @override **/
  get name() {
    return this.zoneName;
  }
  /** @override **/
  get isUniversal() {
    return false;
  }
  /** @override **/
  offsetName() {
    return null;
  }
  /** @override **/
  formatOffset() {
    return "";
  }
  /** @override **/
  offset() {
    return NaN;
  }
  /** @override **/
  equals() {
    return false;
  }
  /** @override **/
  get isValid() {
    return false;
  }
}
function normalizeZone(input, defaultZone2) {
  if (isUndefined(input) || input === null) {
    return defaultZone2;
  } else if (input instanceof Zone) {
    return input;
  } else if (isString(input)) {
    const lowered = input.toLowerCase();
    if (lowered === "default") return defaultZone2;
    else if (lowered === "local" || lowered === "system") return SystemZone.instance;
    else if (lowered === "utc" || lowered === "gmt") return FixedOffsetZone.utcInstance;
    else return FixedOffsetZone.parseSpecifier(lowered) || IANAZone.create(input);
  } else if (isNumber(input)) {
    return FixedOffsetZone.instance(input);
  } else if (typeof input === "object" && "offset" in input && typeof input.offset === "function") {
    return input;
  } else {
    return new InvalidZone(input);
  }
}
const numberingSystems = {
  arab: "[٠-٩]",
  arabext: "[۰-۹]",
  bali: "[᭐-᭙]",
  beng: "[০-৯]",
  deva: "[०-९]",
  fullwide: "[０-９]",
  gujr: "[૦-૯]",
  hanidec: "[〇|一|二|三|四|五|六|七|八|九]",
  khmr: "[០-៩]",
  knda: "[೦-೯]",
  laoo: "[໐-໙]",
  limb: "[᥆-᥏]",
  mlym: "[൦-൯]",
  mong: "[᠐-᠙]",
  mymr: "[၀-၉]",
  orya: "[୦-୯]",
  tamldec: "[௦-௯]",
  telu: "[౦-౯]",
  thai: "[๐-๙]",
  tibt: "[༠-༩]",
  latn: "\\d"
};
const numberingSystemsUTF16 = {
  arab: [1632, 1641],
  arabext: [1776, 1785],
  bali: [6992, 7001],
  beng: [2534, 2543],
  deva: [2406, 2415],
  fullwide: [65296, 65303],
  gujr: [2790, 2799],
  khmr: [6112, 6121],
  knda: [3302, 3311],
  laoo: [3792, 3801],
  limb: [6470, 6479],
  mlym: [3430, 3439],
  mong: [6160, 6169],
  mymr: [4160, 4169],
  orya: [2918, 2927],
  tamldec: [3046, 3055],
  telu: [3174, 3183],
  thai: [3664, 3673],
  tibt: [3872, 3881]
};
const hanidecChars = numberingSystems.hanidec.replace(/[\[|\]]/g, "").split("");
function parseDigits(str) {
  let value = parseInt(str, 10);
  if (isNaN(value)) {
    value = "";
    for (let i2 = 0; i2 < str.length; i2++) {
      const code = str.charCodeAt(i2);
      if (str[i2].search(numberingSystems.hanidec) !== -1) {
        value += hanidecChars.indexOf(str[i2]);
      } else {
        for (const key in numberingSystemsUTF16) {
          const [min, max] = numberingSystemsUTF16[key];
          if (code >= min && code <= max) {
            value += code - min;
          }
        }
      }
    }
    return parseInt(value, 10);
  } else {
    return value;
  }
}
const digitRegexCache = /* @__PURE__ */ new Map();
function resetDigitRegexCache() {
  digitRegexCache.clear();
}
function digitRegex({ numberingSystem }, append = "") {
  const ns = numberingSystem || "latn";
  let appendCache = digitRegexCache.get(ns);
  if (appendCache === void 0) {
    appendCache = /* @__PURE__ */ new Map();
    digitRegexCache.set(ns, appendCache);
  }
  let regex = appendCache.get(append);
  if (regex === void 0) {
    regex = new RegExp(`${numberingSystems[ns]}${append}`);
    appendCache.set(append, regex);
  }
  return regex;
}
let now = () => Date.now(), defaultZone = "system", defaultLocale = null, defaultNumberingSystem = null, defaultOutputCalendar = null, twoDigitCutoffYear = 60, throwOnInvalid, defaultWeekSettings = null;
class Settings {
  /**
   * Get the callback for returning the current timestamp.
   * @type {function}
   */
  static get now() {
    return now;
  }
  /**
   * Set the callback for returning the current timestamp.
   * The function should return a number, which will be interpreted as an Epoch millisecond count
   * @type {function}
   * @example Settings.now = () => Date.now() + 3000 // pretend it is 3 seconds in the future
   * @example Settings.now = () => 0 // always pretend it's Jan 1, 1970 at midnight in UTC time
   */
  static set now(n3) {
    now = n3;
  }
  /**
   * Set the default time zone to create DateTimes in. Does not affect existing instances.
   * Use the value "system" to reset this value to the system's time zone.
   * @type {string}
   */
  static set defaultZone(zone) {
    defaultZone = zone;
  }
  /**
   * Get the default time zone object currently used to create DateTimes. Does not affect existing instances.
   * The default value is the system's time zone (the one set on the machine that runs this code).
   * @type {Zone}
   */
  static get defaultZone() {
    return normalizeZone(defaultZone, SystemZone.instance);
  }
  /**
   * Get the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultLocale() {
    return defaultLocale;
  }
  /**
   * Set the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultLocale(locale) {
    defaultLocale = locale;
  }
  /**
   * Get the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultNumberingSystem() {
    return defaultNumberingSystem;
  }
  /**
   * Set the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultNumberingSystem(numberingSystem) {
    defaultNumberingSystem = numberingSystem;
  }
  /**
   * Get the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultOutputCalendar() {
    return defaultOutputCalendar;
  }
  /**
   * Set the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultOutputCalendar(outputCalendar) {
    defaultOutputCalendar = outputCalendar;
  }
  /**
   * @typedef {Object} WeekSettings
   * @property {number} firstDay
   * @property {number} minimalDays
   * @property {number[]} weekend
   */
  /**
   * @return {WeekSettings|null}
   */
  static get defaultWeekSettings() {
    return defaultWeekSettings;
  }
  /**
   * Allows overriding the default locale week settings, i.e. the start of the week, the weekend and
   * how many days are required in the first week of a year.
   * Does not affect existing instances.
   *
   * @param {WeekSettings|null} weekSettings
   */
  static set defaultWeekSettings(weekSettings) {
    defaultWeekSettings = validateWeekSettings(weekSettings);
  }
  /**
   * Get the cutoff year for whether a 2-digit year string is interpreted in the current or previous century. Numbers higher than the cutoff will be considered to mean 19xx and numbers lower or equal to the cutoff will be considered 20xx.
   * @type {number}
   */
  static get twoDigitCutoffYear() {
    return twoDigitCutoffYear;
  }
  /**
   * Set the cutoff year for whether a 2-digit year string is interpreted in the current or previous century. Numbers higher than the cutoff will be considered to mean 19xx and numbers lower or equal to the cutoff will be considered 20xx.
   * @type {number}
   * @example Settings.twoDigitCutoffYear = 0 // all 'yy' are interpreted as 20th century
   * @example Settings.twoDigitCutoffYear = 99 // all 'yy' are interpreted as 21st century
   * @example Settings.twoDigitCutoffYear = 50 // '49' -> 2049; '50' -> 1950
   * @example Settings.twoDigitCutoffYear = 1950 // interpreted as 50
   * @example Settings.twoDigitCutoffYear = 2050 // ALSO interpreted as 50
   */
  static set twoDigitCutoffYear(cutoffYear) {
    twoDigitCutoffYear = cutoffYear % 100;
  }
  /**
   * Get whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static get throwOnInvalid() {
    return throwOnInvalid;
  }
  /**
   * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static set throwOnInvalid(t2) {
    throwOnInvalid = t2;
  }
  /**
   * Reset Luxon's global caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCaches() {
    Locale.resetCache();
    IANAZone.resetCache();
    DateTime.resetCache();
    resetDigitRegexCache();
  }
}
class Invalid {
  constructor(reason, explanation) {
    this.reason = reason;
    this.explanation = explanation;
  }
  toMessage() {
    if (this.explanation) {
      return `${this.reason}: ${this.explanation}`;
    } else {
      return this.reason;
    }
  }
}
const nonLeapLadder = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], leapLadder = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
function unitOutOfRange(unit, value) {
  return new Invalid(
    "unit out of range",
    `you specified ${value} (of type ${typeof value}) as a ${unit}, which is invalid`
  );
}
function dayOfWeek(year, month, day) {
  const d2 = new Date(Date.UTC(year, month - 1, day));
  if (year < 100 && year >= 0) {
    d2.setUTCFullYear(d2.getUTCFullYear() - 1900);
  }
  const js = d2.getUTCDay();
  return js === 0 ? 7 : js;
}
function computeOrdinal(year, month, day) {
  return day + (isLeapYear(year) ? leapLadder : nonLeapLadder)[month - 1];
}
function uncomputeOrdinal(year, ordinal) {
  const table = isLeapYear(year) ? leapLadder : nonLeapLadder, month0 = table.findIndex((i2) => i2 < ordinal), day = ordinal - table[month0];
  return { month: month0 + 1, day };
}
function isoWeekdayToLocal(isoWeekday, startOfWeek) {
  return (isoWeekday - startOfWeek + 7) % 7 + 1;
}
function gregorianToWeek(gregObj, minDaysInFirstWeek = 4, startOfWeek = 1) {
  const { year, month, day } = gregObj, ordinal = computeOrdinal(year, month, day), weekday = isoWeekdayToLocal(dayOfWeek(year, month, day), startOfWeek);
  let weekNumber = Math.floor((ordinal - weekday + 14 - minDaysInFirstWeek) / 7), weekYear;
  if (weekNumber < 1) {
    weekYear = year - 1;
    weekNumber = weeksInWeekYear(weekYear, minDaysInFirstWeek, startOfWeek);
  } else if (weekNumber > weeksInWeekYear(year, minDaysInFirstWeek, startOfWeek)) {
    weekYear = year + 1;
    weekNumber = 1;
  } else {
    weekYear = year;
  }
  return { weekYear, weekNumber, weekday, ...timeObject(gregObj) };
}
function weekToGregorian(weekData, minDaysInFirstWeek = 4, startOfWeek = 1) {
  const { weekYear, weekNumber, weekday } = weekData, weekdayOfJan4 = isoWeekdayToLocal(dayOfWeek(weekYear, 1, minDaysInFirstWeek), startOfWeek), yearInDays = daysInYear(weekYear);
  let ordinal = weekNumber * 7 + weekday - weekdayOfJan4 - 7 + minDaysInFirstWeek, year;
  if (ordinal < 1) {
    year = weekYear - 1;
    ordinal += daysInYear(year);
  } else if (ordinal > yearInDays) {
    year = weekYear + 1;
    ordinal -= daysInYear(weekYear);
  } else {
    year = weekYear;
  }
  const { month, day } = uncomputeOrdinal(year, ordinal);
  return { year, month, day, ...timeObject(weekData) };
}
function gregorianToOrdinal(gregData) {
  const { year, month, day } = gregData;
  const ordinal = computeOrdinal(year, month, day);
  return { year, ordinal, ...timeObject(gregData) };
}
function ordinalToGregorian(ordinalData) {
  const { year, ordinal } = ordinalData;
  const { month, day } = uncomputeOrdinal(year, ordinal);
  return { year, month, day, ...timeObject(ordinalData) };
}
function usesLocalWeekValues(obj, loc) {
  const hasLocaleWeekData = !isUndefined(obj.localWeekday) || !isUndefined(obj.localWeekNumber) || !isUndefined(obj.localWeekYear);
  if (hasLocaleWeekData) {
    const hasIsoWeekData = !isUndefined(obj.weekday) || !isUndefined(obj.weekNumber) || !isUndefined(obj.weekYear);
    if (hasIsoWeekData) {
      throw new ConflictingSpecificationError(
        "Cannot mix locale-based week fields with ISO-based week fields"
      );
    }
    if (!isUndefined(obj.localWeekday)) obj.weekday = obj.localWeekday;
    if (!isUndefined(obj.localWeekNumber)) obj.weekNumber = obj.localWeekNumber;
    if (!isUndefined(obj.localWeekYear)) obj.weekYear = obj.localWeekYear;
    delete obj.localWeekday;
    delete obj.localWeekNumber;
    delete obj.localWeekYear;
    return {
      minDaysInFirstWeek: loc.getMinDaysInFirstWeek(),
      startOfWeek: loc.getStartOfWeek()
    };
  } else {
    return { minDaysInFirstWeek: 4, startOfWeek: 1 };
  }
}
function hasInvalidWeekData(obj, minDaysInFirstWeek = 4, startOfWeek = 1) {
  const validYear = isInteger(obj.weekYear), validWeek = integerBetween(
    obj.weekNumber,
    1,
    weeksInWeekYear(obj.weekYear, minDaysInFirstWeek, startOfWeek)
  ), validWeekday = integerBetween(obj.weekday, 1, 7);
  if (!validYear) {
    return unitOutOfRange("weekYear", obj.weekYear);
  } else if (!validWeek) {
    return unitOutOfRange("week", obj.weekNumber);
  } else if (!validWeekday) {
    return unitOutOfRange("weekday", obj.weekday);
  } else return false;
}
function hasInvalidOrdinalData(obj) {
  const validYear = isInteger(obj.year), validOrdinal = integerBetween(obj.ordinal, 1, daysInYear(obj.year));
  if (!validYear) {
    return unitOutOfRange("year", obj.year);
  } else if (!validOrdinal) {
    return unitOutOfRange("ordinal", obj.ordinal);
  } else return false;
}
function hasInvalidGregorianData(obj) {
  const validYear = isInteger(obj.year), validMonth = integerBetween(obj.month, 1, 12), validDay = integerBetween(obj.day, 1, daysInMonth(obj.year, obj.month));
  if (!validYear) {
    return unitOutOfRange("year", obj.year);
  } else if (!validMonth) {
    return unitOutOfRange("month", obj.month);
  } else if (!validDay) {
    return unitOutOfRange("day", obj.day);
  } else return false;
}
function hasInvalidTimeData(obj) {
  const { hour, minute, second, millisecond } = obj;
  const validHour = integerBetween(hour, 0, 23) || hour === 24 && minute === 0 && second === 0 && millisecond === 0, validMinute = integerBetween(minute, 0, 59), validSecond = integerBetween(second, 0, 59), validMillisecond = integerBetween(millisecond, 0, 999);
  if (!validHour) {
    return unitOutOfRange("hour", hour);
  } else if (!validMinute) {
    return unitOutOfRange("minute", minute);
  } else if (!validSecond) {
    return unitOutOfRange("second", second);
  } else if (!validMillisecond) {
    return unitOutOfRange("millisecond", millisecond);
  } else return false;
}
function isUndefined(o2) {
  return typeof o2 === "undefined";
}
function isNumber(o2) {
  return typeof o2 === "number";
}
function isInteger(o2) {
  return typeof o2 === "number" && o2 % 1 === 0;
}
function isString(o2) {
  return typeof o2 === "string";
}
function isDate(o2) {
  return Object.prototype.toString.call(o2) === "[object Date]";
}
function hasRelative() {
  try {
    return typeof Intl !== "undefined" && !!Intl.RelativeTimeFormat;
  } catch (e2) {
    return false;
  }
}
function hasLocaleWeekInfo() {
  try {
    return typeof Intl !== "undefined" && !!Intl.Locale && ("weekInfo" in Intl.Locale.prototype || "getWeekInfo" in Intl.Locale.prototype);
  } catch (e2) {
    return false;
  }
}
function maybeArray(thing) {
  return Array.isArray(thing) ? thing : [thing];
}
function bestBy(arr, by, compare) {
  if (arr.length === 0) {
    return void 0;
  }
  return arr.reduce((best, next) => {
    const pair = [by(next), next];
    if (!best) {
      return pair;
    } else if (compare(best[0], pair[0]) === best[0]) {
      return best;
    } else {
      return pair;
    }
  }, null)[1];
}
function pick(obj, keys) {
  return keys.reduce((a2, k2) => {
    a2[k2] = obj[k2];
    return a2;
  }, {});
}
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
function validateWeekSettings(settings) {
  if (settings == null) {
    return null;
  } else if (typeof settings !== "object") {
    throw new InvalidArgumentError("Week settings must be an object");
  } else {
    if (!integerBetween(settings.firstDay, 1, 7) || !integerBetween(settings.minimalDays, 1, 7) || !Array.isArray(settings.weekend) || settings.weekend.some((v2) => !integerBetween(v2, 1, 7))) {
      throw new InvalidArgumentError("Invalid week settings");
    }
    return {
      firstDay: settings.firstDay,
      minimalDays: settings.minimalDays,
      weekend: Array.from(settings.weekend)
    };
  }
}
function integerBetween(thing, bottom, top) {
  return isInteger(thing) && thing >= bottom && thing <= top;
}
function floorMod(x2, n3) {
  return x2 - n3 * Math.floor(x2 / n3);
}
function padStart(input, n3 = 2) {
  const isNeg = input < 0;
  let padded;
  if (isNeg) {
    padded = "-" + ("" + -input).padStart(n3, "0");
  } else {
    padded = ("" + input).padStart(n3, "0");
  }
  return padded;
}
function parseInteger(string) {
  if (isUndefined(string) || string === null || string === "") {
    return void 0;
  } else {
    return parseInt(string, 10);
  }
}
function parseFloating(string) {
  if (isUndefined(string) || string === null || string === "") {
    return void 0;
  } else {
    return parseFloat(string);
  }
}
function parseMillis(fraction) {
  if (isUndefined(fraction) || fraction === null || fraction === "") {
    return void 0;
  } else {
    const f2 = parseFloat("0." + fraction) * 1e3;
    return Math.floor(f2);
  }
}
function roundTo(number, digits, rounding = "round") {
  const factor = 10 ** digits;
  switch (rounding) {
    case "expand":
      return number > 0 ? Math.ceil(number * factor) / factor : Math.floor(number * factor) / factor;
    case "trunc":
      return Math.trunc(number * factor) / factor;
    case "round":
      return Math.round(number * factor) / factor;
    case "floor":
      return Math.floor(number * factor) / factor;
    case "ceil":
      return Math.ceil(number * factor) / factor;
    default:
      throw new RangeError(`Value rounding ${rounding} is out of range`);
  }
}
function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
function daysInYear(year) {
  return isLeapYear(year) ? 366 : 365;
}
function daysInMonth(year, month) {
  const modMonth = floorMod(month - 1, 12) + 1, modYear = year + (month - modMonth) / 12;
  if (modMonth === 2) {
    return isLeapYear(modYear) ? 29 : 28;
  } else {
    return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][modMonth - 1];
  }
}
function objToLocalTS(obj) {
  let d2 = Date.UTC(
    obj.year,
    obj.month - 1,
    obj.day,
    obj.hour,
    obj.minute,
    obj.second,
    obj.millisecond
  );
  if (obj.year < 100 && obj.year >= 0) {
    d2 = new Date(d2);
    d2.setUTCFullYear(obj.year, obj.month - 1, obj.day);
  }
  return +d2;
}
function firstWeekOffset(year, minDaysInFirstWeek, startOfWeek) {
  const fwdlw = isoWeekdayToLocal(dayOfWeek(year, 1, minDaysInFirstWeek), startOfWeek);
  return -fwdlw + minDaysInFirstWeek - 1;
}
function weeksInWeekYear(weekYear, minDaysInFirstWeek = 4, startOfWeek = 1) {
  const weekOffset = firstWeekOffset(weekYear, minDaysInFirstWeek, startOfWeek);
  const weekOffsetNext = firstWeekOffset(weekYear + 1, minDaysInFirstWeek, startOfWeek);
  return (daysInYear(weekYear) - weekOffset + weekOffsetNext) / 7;
}
function untruncateYear(year) {
  if (year > 99) {
    return year;
  } else return year > Settings.twoDigitCutoffYear ? 1900 + year : 2e3 + year;
}
function parseZoneInfo(ts, offsetFormat, locale, timeZone = null) {
  const date = new Date(ts), intlOpts = {
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  };
  if (timeZone) {
    intlOpts.timeZone = timeZone;
  }
  const modified = { timeZoneName: offsetFormat, ...intlOpts };
  const parsed = new Intl.DateTimeFormat(locale, modified).formatToParts(date).find((m2) => m2.type.toLowerCase() === "timezonename");
  return parsed ? parsed.value : null;
}
function signedOffset(offHourStr, offMinuteStr) {
  let offHour = parseInt(offHourStr, 10);
  if (Number.isNaN(offHour)) {
    offHour = 0;
  }
  const offMin = parseInt(offMinuteStr, 10) || 0, offMinSigned = offHour < 0 || Object.is(offHour, -0) ? -offMin : offMin;
  return offHour * 60 + offMinSigned;
}
function asNumber(value) {
  const numericValue = Number(value);
  if (typeof value === "boolean" || value === "" || !Number.isFinite(numericValue))
    throw new InvalidArgumentError(`Invalid unit value ${value}`);
  return numericValue;
}
function normalizeObject(obj, normalizer) {
  const normalized = {};
  for (const u2 in obj) {
    if (hasOwnProperty(obj, u2)) {
      const v2 = obj[u2];
      if (v2 === void 0 || v2 === null) continue;
      normalized[normalizer(u2)] = asNumber(v2);
    }
  }
  return normalized;
}
function formatOffset(offset2, format) {
  const hours = Math.trunc(Math.abs(offset2 / 60)), minutes = Math.trunc(Math.abs(offset2 % 60)), sign = offset2 >= 0 ? "+" : "-";
  switch (format) {
    case "short":
      return `${sign}${padStart(hours, 2)}:${padStart(minutes, 2)}`;
    case "narrow":
      return `${sign}${hours}${minutes > 0 ? `:${minutes}` : ""}`;
    case "techie":
      return `${sign}${padStart(hours, 2)}${padStart(minutes, 2)}`;
    default:
      throw new RangeError(`Value format ${format} is out of range for property format`);
  }
}
function timeObject(obj) {
  return pick(obj, ["hour", "minute", "second", "millisecond"]);
}
const monthsLong = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const monthsShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
const monthsNarrow = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
function months(length) {
  switch (length) {
    case "narrow":
      return [...monthsNarrow];
    case "short":
      return [...monthsShort];
    case "long":
      return [...monthsLong];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    case "2-digit":
      return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    default:
      return null;
  }
}
const weekdaysLong = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
const weekdaysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const weekdaysNarrow = ["M", "T", "W", "T", "F", "S", "S"];
function weekdays(length) {
  switch (length) {
    case "narrow":
      return [...weekdaysNarrow];
    case "short":
      return [...weekdaysShort];
    case "long":
      return [...weekdaysLong];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7"];
    default:
      return null;
  }
}
const meridiems = ["AM", "PM"];
const erasLong = ["Before Christ", "Anno Domini"];
const erasShort = ["BC", "AD"];
const erasNarrow = ["B", "A"];
function eras(length) {
  switch (length) {
    case "narrow":
      return [...erasNarrow];
    case "short":
      return [...erasShort];
    case "long":
      return [...erasLong];
    default:
      return null;
  }
}
function meridiemForDateTime(dt) {
  return meridiems[dt.hour < 12 ? 0 : 1];
}
function weekdayForDateTime(dt, length) {
  return weekdays(length)[dt.weekday - 1];
}
function monthForDateTime(dt, length) {
  return months(length)[dt.month - 1];
}
function eraForDateTime(dt, length) {
  return eras(length)[dt.year < 0 ? 0 : 1];
}
function formatRelativeTime(unit, count, numeric = "always", narrow = false) {
  const units = {
    years: ["year", "yr."],
    quarters: ["quarter", "qtr."],
    months: ["month", "mo."],
    weeks: ["week", "wk."],
    days: ["day", "day", "days"],
    hours: ["hour", "hr."],
    minutes: ["minute", "min."],
    seconds: ["second", "sec."]
  };
  const lastable = ["hours", "minutes", "seconds"].indexOf(unit) === -1;
  if (numeric === "auto" && lastable) {
    const isDay = unit === "days";
    switch (count) {
      case 1:
        return isDay ? "tomorrow" : `next ${units[unit][0]}`;
      case -1:
        return isDay ? "yesterday" : `last ${units[unit][0]}`;
      case 0:
        return isDay ? "today" : `this ${units[unit][0]}`;
    }
  }
  const isInPast = Object.is(count, -0) || count < 0, fmtValue = Math.abs(count), singular = fmtValue === 1, lilUnits = units[unit], fmtUnit = narrow ? singular ? lilUnits[1] : lilUnits[2] || lilUnits[1] : singular ? units[unit][0] : unit;
  return isInPast ? `${fmtValue} ${fmtUnit} ago` : `in ${fmtValue} ${fmtUnit}`;
}
function stringifyTokens(splits, tokenToString) {
  let s2 = "";
  for (const token of splits) {
    if (token.literal) {
      s2 += token.val;
    } else {
      s2 += tokenToString(token.val);
    }
  }
  return s2;
}
const macroTokenToFormatOpts = {
  D: DATE_SHORT,
  DD: DATE_MED,
  DDD: DATE_FULL,
  DDDD: DATE_HUGE,
  t: TIME_SIMPLE,
  tt: TIME_WITH_SECONDS,
  ttt: TIME_WITH_SHORT_OFFSET,
  tttt: TIME_WITH_LONG_OFFSET,
  T: TIME_24_SIMPLE,
  TT: TIME_24_WITH_SECONDS,
  TTT: TIME_24_WITH_SHORT_OFFSET,
  TTTT: TIME_24_WITH_LONG_OFFSET,
  f: DATETIME_SHORT,
  ff: DATETIME_MED,
  fff: DATETIME_FULL,
  ffff: DATETIME_HUGE,
  F: DATETIME_SHORT_WITH_SECONDS,
  FF: DATETIME_MED_WITH_SECONDS,
  FFF: DATETIME_FULL_WITH_SECONDS,
  FFFF: DATETIME_HUGE_WITH_SECONDS
};
class Formatter {
  static create(locale, opts = {}) {
    return new Formatter(locale, opts);
  }
  static parseFormat(fmt) {
    let current = null, currentFull = "", bracketed = false;
    const splits = [];
    for (let i2 = 0; i2 < fmt.length; i2++) {
      const c2 = fmt.charAt(i2);
      if (c2 === "'") {
        if (currentFull.length > 0 || bracketed) {
          splits.push({
            literal: bracketed || /^\s+$/.test(currentFull),
            val: currentFull === "" ? "'" : currentFull
          });
        }
        current = null;
        currentFull = "";
        bracketed = !bracketed;
      } else if (bracketed) {
        currentFull += c2;
      } else if (c2 === current) {
        currentFull += c2;
      } else {
        if (currentFull.length > 0) {
          splits.push({ literal: /^\s+$/.test(currentFull), val: currentFull });
        }
        currentFull = c2;
        current = c2;
      }
    }
    if (currentFull.length > 0) {
      splits.push({ literal: bracketed || /^\s+$/.test(currentFull), val: currentFull });
    }
    return splits;
  }
  static macroTokenToFormatOpts(token) {
    return macroTokenToFormatOpts[token];
  }
  constructor(locale, formatOpts) {
    this.opts = formatOpts;
    this.loc = locale;
    this.systemLoc = null;
  }
  formatWithSystemDefault(dt, opts) {
    if (this.systemLoc === null) {
      this.systemLoc = this.loc.redefaultToSystem();
    }
    const df = this.systemLoc.dtFormatter(dt, { ...this.opts, ...opts });
    return df.format();
  }
  dtFormatter(dt, opts = {}) {
    return this.loc.dtFormatter(dt, { ...this.opts, ...opts });
  }
  formatDateTime(dt, opts) {
    return this.dtFormatter(dt, opts).format();
  }
  formatDateTimeParts(dt, opts) {
    return this.dtFormatter(dt, opts).formatToParts();
  }
  formatInterval(interval, opts) {
    const df = this.dtFormatter(interval.start, opts);
    return df.dtf.formatRange(interval.start.toJSDate(), interval.end.toJSDate());
  }
  resolvedOptions(dt, opts) {
    return this.dtFormatter(dt, opts).resolvedOptions();
  }
  num(n3, p2 = 0, signDisplay = void 0) {
    if (this.opts.forceSimple) {
      return padStart(n3, p2);
    }
    const opts = { ...this.opts };
    if (p2 > 0) {
      opts.padTo = p2;
    }
    if (signDisplay) {
      opts.signDisplay = signDisplay;
    }
    return this.loc.numberFormatter(opts).format(n3);
  }
  formatDateTimeFromString(dt, fmt) {
    const knownEnglish = this.loc.listingMode() === "en", useDateTimeFormatter = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory", string = (opts, extract) => this.loc.extract(dt, opts, extract), formatOffset2 = (opts) => {
      if (dt.isOffsetFixed && dt.offset === 0 && opts.allowZ) {
        return "Z";
      }
      return dt.isValid ? dt.zone.formatOffset(dt.ts, opts.format) : "";
    }, meridiem = () => knownEnglish ? meridiemForDateTime(dt) : string({ hour: "numeric", hourCycle: "h12" }, "dayperiod"), month = (length, standalone) => knownEnglish ? monthForDateTime(dt, length) : string(standalone ? { month: length } : { month: length, day: "numeric" }, "month"), weekday = (length, standalone) => knownEnglish ? weekdayForDateTime(dt, length) : string(
      standalone ? { weekday: length } : { weekday: length, month: "long", day: "numeric" },
      "weekday"
    ), maybeMacro = (token) => {
      const formatOpts = Formatter.macroTokenToFormatOpts(token);
      if (formatOpts) {
        return this.formatWithSystemDefault(dt, formatOpts);
      } else {
        return token;
      }
    }, era = (length) => knownEnglish ? eraForDateTime(dt, length) : string({ era: length }, "era"), tokenToString = (token) => {
      switch (token) {
        // ms
        case "S":
          return this.num(dt.millisecond);
        case "u":
        // falls through
        case "SSS":
          return this.num(dt.millisecond, 3);
        // seconds
        case "s":
          return this.num(dt.second);
        case "ss":
          return this.num(dt.second, 2);
        // fractional seconds
        case "uu":
          return this.num(Math.floor(dt.millisecond / 10), 2);
        case "uuu":
          return this.num(Math.floor(dt.millisecond / 100));
        // minutes
        case "m":
          return this.num(dt.minute);
        case "mm":
          return this.num(dt.minute, 2);
        // hours
        case "h":
          return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12);
        case "hh":
          return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12, 2);
        case "H":
          return this.num(dt.hour);
        case "HH":
          return this.num(dt.hour, 2);
        // offset
        case "Z":
          return formatOffset2({ format: "narrow", allowZ: this.opts.allowZ });
        case "ZZ":
          return formatOffset2({ format: "short", allowZ: this.opts.allowZ });
        case "ZZZ":
          return formatOffset2({ format: "techie", allowZ: this.opts.allowZ });
        case "ZZZZ":
          return dt.zone.offsetName(dt.ts, { format: "short", locale: this.loc.locale });
        case "ZZZZZ":
          return dt.zone.offsetName(dt.ts, { format: "long", locale: this.loc.locale });
        // zone
        case "z":
          return dt.zoneName;
        // meridiems
        case "a":
          return meridiem();
        // dates
        case "d":
          return useDateTimeFormatter ? string({ day: "numeric" }, "day") : this.num(dt.day);
        case "dd":
          return useDateTimeFormatter ? string({ day: "2-digit" }, "day") : this.num(dt.day, 2);
        // weekdays - standalone
        case "c":
          return this.num(dt.weekday);
        case "ccc":
          return weekday("short", true);
        case "cccc":
          return weekday("long", true);
        case "ccccc":
          return weekday("narrow", true);
        // weekdays - format
        case "E":
          return this.num(dt.weekday);
        case "EEE":
          return weekday("short", false);
        case "EEEE":
          return weekday("long", false);
        case "EEEEE":
          return weekday("narrow", false);
        // months - standalone
        case "L":
          return useDateTimeFormatter ? string({ month: "numeric", day: "numeric" }, "month") : this.num(dt.month);
        case "LL":
          return useDateTimeFormatter ? string({ month: "2-digit", day: "numeric" }, "month") : this.num(dt.month, 2);
        case "LLL":
          return month("short", true);
        case "LLLL":
          return month("long", true);
        case "LLLLL":
          return month("narrow", true);
        // months - format
        case "M":
          return useDateTimeFormatter ? string({ month: "numeric" }, "month") : this.num(dt.month);
        case "MM":
          return useDateTimeFormatter ? string({ month: "2-digit" }, "month") : this.num(dt.month, 2);
        case "MMM":
          return month("short", false);
        case "MMMM":
          return month("long", false);
        case "MMMMM":
          return month("narrow", false);
        // years
        case "y":
          return useDateTimeFormatter ? string({ year: "numeric" }, "year") : this.num(dt.year);
        case "yy":
          return useDateTimeFormatter ? string({ year: "2-digit" }, "year") : this.num(dt.year.toString().slice(-2), 2);
        case "yyyy":
          return useDateTimeFormatter ? string({ year: "numeric" }, "year") : this.num(dt.year, 4);
        case "yyyyyy":
          return useDateTimeFormatter ? string({ year: "numeric" }, "year") : this.num(dt.year, 6);
        // eras
        case "G":
          return era("short");
        case "GG":
          return era("long");
        case "GGGGG":
          return era("narrow");
        case "kk":
          return this.num(dt.weekYear.toString().slice(-2), 2);
        case "kkkk":
          return this.num(dt.weekYear, 4);
        case "W":
          return this.num(dt.weekNumber);
        case "WW":
          return this.num(dt.weekNumber, 2);
        case "n":
          return this.num(dt.localWeekNumber);
        case "nn":
          return this.num(dt.localWeekNumber, 2);
        case "ii":
          return this.num(dt.localWeekYear.toString().slice(-2), 2);
        case "iiii":
          return this.num(dt.localWeekYear, 4);
        case "o":
          return this.num(dt.ordinal);
        case "ooo":
          return this.num(dt.ordinal, 3);
        case "q":
          return this.num(dt.quarter);
        case "qq":
          return this.num(dt.quarter, 2);
        case "X":
          return this.num(Math.floor(dt.ts / 1e3));
        case "x":
          return this.num(dt.ts);
        default:
          return maybeMacro(token);
      }
    };
    return stringifyTokens(Formatter.parseFormat(fmt), tokenToString);
  }
  formatDurationFromString(dur, fmt) {
    const invertLargest = this.opts.signMode === "negativeLargestOnly" ? -1 : 1;
    const tokenToField = (token) => {
      switch (token[0]) {
        case "S":
          return "milliseconds";
        case "s":
          return "seconds";
        case "m":
          return "minutes";
        case "h":
          return "hours";
        case "d":
          return "days";
        case "w":
          return "weeks";
        case "M":
          return "months";
        case "y":
          return "years";
        default:
          return null;
      }
    }, tokenToString = (lildur, info) => (token) => {
      const mapped = tokenToField(token);
      if (mapped) {
        const inversionFactor = info.isNegativeDuration && mapped !== info.largestUnit ? invertLargest : 1;
        let signDisplay;
        if (this.opts.signMode === "negativeLargestOnly" && mapped !== info.largestUnit) {
          signDisplay = "never";
        } else if (this.opts.signMode === "all") {
          signDisplay = "always";
        } else {
          signDisplay = "auto";
        }
        return this.num(lildur.get(mapped) * inversionFactor, token.length, signDisplay);
      } else {
        return token;
      }
    }, tokens = Formatter.parseFormat(fmt), realTokens = tokens.reduce(
      (found, { literal, val }) => literal ? found : found.concat(val),
      []
    ), collapsed = dur.shiftTo(...realTokens.map(tokenToField).filter((t2) => t2)), durationInfo = {
      isNegativeDuration: collapsed < 0,
      // this relies on "collapsed" being based on "shiftTo", which builds up the object
      // in order
      largestUnit: Object.keys(collapsed.values)[0]
    };
    return stringifyTokens(tokens, tokenToString(collapsed, durationInfo));
  }
}
const ianaRegex = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
function combineRegexes(...regexes) {
  const full = regexes.reduce((f2, r2) => f2 + r2.source, "");
  return RegExp(`^${full}$`);
}
function combineExtractors(...extractors) {
  return (m2) => extractors.reduce(
    ([mergedVals, mergedZone, cursor], ex) => {
      const [val, zone, next] = ex(m2, cursor);
      return [{ ...mergedVals, ...val }, zone || mergedZone, next];
    },
    [{}, null, 1]
  ).slice(0, 2);
}
function parse(s2, ...patterns) {
  if (s2 == null) {
    return [null, null];
  }
  for (const [regex, extractor] of patterns) {
    const m2 = regex.exec(s2);
    if (m2) {
      return extractor(m2);
    }
  }
  return [null, null];
}
function simpleParse(...keys) {
  return (match2, cursor) => {
    const ret = {};
    let i2;
    for (i2 = 0; i2 < keys.length; i2++) {
      ret[keys[i2]] = parseInteger(match2[cursor + i2]);
    }
    return [ret, null, cursor + i2];
  };
}
const offsetRegex = /(?:([Zz])|([+-]\d\d)(?::?(\d\d))?)/;
const isoExtendedZone = `(?:${offsetRegex.source}?(?:\\[(${ianaRegex.source})\\])?)?`;
const isoTimeBaseRegex = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/;
const isoTimeRegex = RegExp(`${isoTimeBaseRegex.source}${isoExtendedZone}`);
const isoTimeExtensionRegex = RegExp(`(?:[Tt]${isoTimeRegex.source})?`);
const isoYmdRegex = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/;
const isoWeekRegex = /(\d{4})-?W(\d\d)(?:-?(\d))?/;
const isoOrdinalRegex = /(\d{4})-?(\d{3})/;
const extractISOWeekData = simpleParse("weekYear", "weekNumber", "weekDay");
const extractISOOrdinalData = simpleParse("year", "ordinal");
const sqlYmdRegex = /(\d{4})-(\d\d)-(\d\d)/;
const sqlTimeRegex = RegExp(
  `${isoTimeBaseRegex.source} ?(?:${offsetRegex.source}|(${ianaRegex.source}))?`
);
const sqlTimeExtensionRegex = RegExp(`(?: ${sqlTimeRegex.source})?`);
function int(match2, pos, fallback) {
  const m2 = match2[pos];
  return isUndefined(m2) ? fallback : parseInteger(m2);
}
function extractISOYmd(match2, cursor) {
  const item = {
    year: int(match2, cursor),
    month: int(match2, cursor + 1, 1),
    day: int(match2, cursor + 2, 1)
  };
  return [item, null, cursor + 3];
}
function extractISOTime(match2, cursor) {
  const item = {
    hours: int(match2, cursor, 0),
    minutes: int(match2, cursor + 1, 0),
    seconds: int(match2, cursor + 2, 0),
    milliseconds: parseMillis(match2[cursor + 3])
  };
  return [item, null, cursor + 4];
}
function extractISOOffset(match2, cursor) {
  const local = !match2[cursor] && !match2[cursor + 1], fullOffset = signedOffset(match2[cursor + 1], match2[cursor + 2]), zone = local ? null : FixedOffsetZone.instance(fullOffset);
  return [{}, zone, cursor + 3];
}
function extractIANAZone(match2, cursor) {
  const zone = match2[cursor] ? IANAZone.create(match2[cursor]) : null;
  return [{}, zone, cursor + 1];
}
const isoTimeOnly = RegExp(`^T?${isoTimeBaseRegex.source}$`);
const isoDuration = /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
function extractISODuration(match2) {
  const [s2, yearStr, monthStr, weekStr, dayStr, hourStr, minuteStr, secondStr, millisecondsStr] = match2;
  const hasNegativePrefix = s2[0] === "-";
  const negativeSeconds = secondStr && secondStr[0] === "-";
  const maybeNegate = (num, force = false) => num !== void 0 && (force || num && hasNegativePrefix) ? -num : num;
  return [
    {
      years: maybeNegate(parseFloating(yearStr)),
      months: maybeNegate(parseFloating(monthStr)),
      weeks: maybeNegate(parseFloating(weekStr)),
      days: maybeNegate(parseFloating(dayStr)),
      hours: maybeNegate(parseFloating(hourStr)),
      minutes: maybeNegate(parseFloating(minuteStr)),
      seconds: maybeNegate(parseFloating(secondStr), secondStr === "-0"),
      milliseconds: maybeNegate(parseMillis(millisecondsStr), negativeSeconds)
    }
  ];
}
const obsOffsets = {
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};
function fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
  const result = {
    year: yearStr.length === 2 ? untruncateYear(parseInteger(yearStr)) : parseInteger(yearStr),
    month: monthsShort.indexOf(monthStr) + 1,
    day: parseInteger(dayStr),
    hour: parseInteger(hourStr),
    minute: parseInteger(minuteStr)
  };
  if (secondStr) result.second = parseInteger(secondStr);
  if (weekdayStr) {
    result.weekday = weekdayStr.length > 3 ? weekdaysLong.indexOf(weekdayStr) + 1 : weekdaysShort.indexOf(weekdayStr) + 1;
  }
  return result;
}
const rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
function extractRFC2822(match2) {
  const [
    ,
    weekdayStr,
    dayStr,
    monthStr,
    yearStr,
    hourStr,
    minuteStr,
    secondStr,
    obsOffset,
    milOffset,
    offHourStr,
    offMinuteStr
  ] = match2, result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
  let offset2;
  if (obsOffset) {
    offset2 = obsOffsets[obsOffset];
  } else if (milOffset) {
    offset2 = 0;
  } else {
    offset2 = signedOffset(offHourStr, offMinuteStr);
  }
  return [result, new FixedOffsetZone(offset2)];
}
function preprocessRFC2822(s2) {
  return s2.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
}
const rfc1123 = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/, rfc850 = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/, ascii = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
function extractRFC1123Or850(match2) {
  const [, weekdayStr, dayStr, monthStr, yearStr, hourStr, minuteStr, secondStr] = match2, result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
  return [result, FixedOffsetZone.utcInstance];
}
function extractASCII(match2) {
  const [, weekdayStr, monthStr, dayStr, hourStr, minuteStr, secondStr, yearStr] = match2, result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
  return [result, FixedOffsetZone.utcInstance];
}
const isoYmdWithTimeExtensionRegex = combineRegexes(isoYmdRegex, isoTimeExtensionRegex);
const isoWeekWithTimeExtensionRegex = combineRegexes(isoWeekRegex, isoTimeExtensionRegex);
const isoOrdinalWithTimeExtensionRegex = combineRegexes(isoOrdinalRegex, isoTimeExtensionRegex);
const isoTimeCombinedRegex = combineRegexes(isoTimeRegex);
const extractISOYmdTimeAndOffset = combineExtractors(
  extractISOYmd,
  extractISOTime,
  extractISOOffset,
  extractIANAZone
);
const extractISOWeekTimeAndOffset = combineExtractors(
  extractISOWeekData,
  extractISOTime,
  extractISOOffset,
  extractIANAZone
);
const extractISOOrdinalDateAndTime = combineExtractors(
  extractISOOrdinalData,
  extractISOTime,
  extractISOOffset,
  extractIANAZone
);
const extractISOTimeAndOffset = combineExtractors(
  extractISOTime,
  extractISOOffset,
  extractIANAZone
);
function parseISODate(s2) {
  return parse(
    s2,
    [isoYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset],
    [isoWeekWithTimeExtensionRegex, extractISOWeekTimeAndOffset],
    [isoOrdinalWithTimeExtensionRegex, extractISOOrdinalDateAndTime],
    [isoTimeCombinedRegex, extractISOTimeAndOffset]
  );
}
function parseRFC2822Date(s2) {
  return parse(preprocessRFC2822(s2), [rfc2822, extractRFC2822]);
}
function parseHTTPDate(s2) {
  return parse(
    s2,
    [rfc1123, extractRFC1123Or850],
    [rfc850, extractRFC1123Or850],
    [ascii, extractASCII]
  );
}
function parseISODuration(s2) {
  return parse(s2, [isoDuration, extractISODuration]);
}
const extractISOTimeOnly = combineExtractors(extractISOTime);
function parseISOTimeOnly(s2) {
  return parse(s2, [isoTimeOnly, extractISOTimeOnly]);
}
const sqlYmdWithTimeExtensionRegex = combineRegexes(sqlYmdRegex, sqlTimeExtensionRegex);
const sqlTimeCombinedRegex = combineRegexes(sqlTimeRegex);
const extractISOTimeOffsetAndIANAZone = combineExtractors(
  extractISOTime,
  extractISOOffset,
  extractIANAZone
);
function parseSQL(s2) {
  return parse(
    s2,
    [sqlYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset],
    [sqlTimeCombinedRegex, extractISOTimeOffsetAndIANAZone]
  );
}
const INVALID$2 = "Invalid Duration";
const lowOrderMatrix = {
  weeks: {
    days: 7,
    hours: 7 * 24,
    minutes: 7 * 24 * 60,
    seconds: 7 * 24 * 60 * 60,
    milliseconds: 7 * 24 * 60 * 60 * 1e3
  },
  days: {
    hours: 24,
    minutes: 24 * 60,
    seconds: 24 * 60 * 60,
    milliseconds: 24 * 60 * 60 * 1e3
  },
  hours: { minutes: 60, seconds: 60 * 60, milliseconds: 60 * 60 * 1e3 },
  minutes: { seconds: 60, milliseconds: 60 * 1e3 },
  seconds: { milliseconds: 1e3 }
}, casualMatrix = {
  years: {
    quarters: 4,
    months: 12,
    weeks: 52,
    days: 365,
    hours: 365 * 24,
    minutes: 365 * 24 * 60,
    seconds: 365 * 24 * 60 * 60,
    milliseconds: 365 * 24 * 60 * 60 * 1e3
  },
  quarters: {
    months: 3,
    weeks: 13,
    days: 91,
    hours: 91 * 24,
    minutes: 91 * 24 * 60,
    seconds: 91 * 24 * 60 * 60,
    milliseconds: 91 * 24 * 60 * 60 * 1e3
  },
  months: {
    weeks: 4,
    days: 30,
    hours: 30 * 24,
    minutes: 30 * 24 * 60,
    seconds: 30 * 24 * 60 * 60,
    milliseconds: 30 * 24 * 60 * 60 * 1e3
  },
  ...lowOrderMatrix
}, daysInYearAccurate = 146097 / 400, daysInMonthAccurate = 146097 / 4800, accurateMatrix = {
  years: {
    quarters: 4,
    months: 12,
    weeks: daysInYearAccurate / 7,
    days: daysInYearAccurate,
    hours: daysInYearAccurate * 24,
    minutes: daysInYearAccurate * 24 * 60,
    seconds: daysInYearAccurate * 24 * 60 * 60,
    milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1e3
  },
  quarters: {
    months: 3,
    weeks: daysInYearAccurate / 28,
    days: daysInYearAccurate / 4,
    hours: daysInYearAccurate * 24 / 4,
    minutes: daysInYearAccurate * 24 * 60 / 4,
    seconds: daysInYearAccurate * 24 * 60 * 60 / 4,
    milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1e3 / 4
  },
  months: {
    weeks: daysInMonthAccurate / 7,
    days: daysInMonthAccurate,
    hours: daysInMonthAccurate * 24,
    minutes: daysInMonthAccurate * 24 * 60,
    seconds: daysInMonthAccurate * 24 * 60 * 60,
    milliseconds: daysInMonthAccurate * 24 * 60 * 60 * 1e3
  },
  ...lowOrderMatrix
};
const orderedUnits$1 = [
  "years",
  "quarters",
  "months",
  "weeks",
  "days",
  "hours",
  "minutes",
  "seconds",
  "milliseconds"
];
const reverseUnits = orderedUnits$1.slice(0).reverse();
function clone$1(dur, alts, clear = false) {
  const conf = {
    values: clear ? alts.values : { ...dur.values, ...alts.values || {} },
    loc: dur.loc.clone(alts.loc),
    conversionAccuracy: alts.conversionAccuracy || dur.conversionAccuracy,
    matrix: alts.matrix || dur.matrix
  };
  return new Duration(conf);
}
function durationToMillis(matrix, vals) {
  let sum = vals.milliseconds ?? 0;
  for (const unit of reverseUnits.slice(1)) {
    if (vals[unit]) {
      sum += vals[unit] * matrix[unit]["milliseconds"];
    }
  }
  return sum;
}
function normalizeValues(matrix, vals) {
  const factor = durationToMillis(matrix, vals) < 0 ? -1 : 1;
  orderedUnits$1.reduceRight((previous, current) => {
    if (!isUndefined(vals[current])) {
      if (previous) {
        const previousVal = vals[previous] * factor;
        const conv = matrix[current][previous];
        const rollUp = Math.floor(previousVal / conv);
        vals[current] += rollUp * factor;
        vals[previous] -= rollUp * conv * factor;
      }
      return current;
    } else {
      return previous;
    }
  }, null);
  orderedUnits$1.reduce((previous, current) => {
    if (!isUndefined(vals[current])) {
      if (previous) {
        const fraction = vals[previous] % 1;
        vals[previous] -= fraction;
        vals[current] += fraction * matrix[previous][current];
      }
      return current;
    } else {
      return previous;
    }
  }, null);
}
function removeZeroes(vals) {
  const newVals = {};
  for (const [key, value] of Object.entries(vals)) {
    if (value !== 0) {
      newVals[key] = value;
    }
  }
  return newVals;
}
class Duration {
  /**
   * @private
   */
  constructor(config) {
    const accurate = config.conversionAccuracy === "longterm" || false;
    let matrix = accurate ? accurateMatrix : casualMatrix;
    if (config.matrix) {
      matrix = config.matrix;
    }
    this.values = config.values;
    this.loc = config.loc || Locale.create();
    this.conversionAccuracy = accurate ? "longterm" : "casual";
    this.invalid = config.invalid || null;
    this.matrix = matrix;
    this.isLuxonDuration = true;
  }
  /**
   * Create Duration from a number of milliseconds.
   * @param {number} count of milliseconds
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  static fromMillis(count, opts) {
    return Duration.fromObject({ milliseconds: count }, opts);
  }
  /**
   * Create a Duration from a JavaScript object with keys like 'years' and 'hours'.
   * If this object is empty then a zero milliseconds duration is returned.
   * @param {Object} obj - the object to create the DateTime from
   * @param {number} obj.years
   * @param {number} obj.quarters
   * @param {number} obj.months
   * @param {number} obj.weeks
   * @param {number} obj.days
   * @param {number} obj.hours
   * @param {number} obj.minutes
   * @param {number} obj.seconds
   * @param {number} obj.milliseconds
   * @param {Object} [opts=[]] - options for creating this Duration
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
   * @param {string} [opts.matrix=Object] - the custom conversion system to use
   * @return {Duration}
   */
  static fromObject(obj, opts = {}) {
    if (obj == null || typeof obj !== "object") {
      throw new InvalidArgumentError(
        `Duration.fromObject: argument expected to be an object, got ${obj === null ? "null" : typeof obj}`
      );
    }
    return new Duration({
      values: normalizeObject(obj, Duration.normalizeUnit),
      loc: Locale.fromObject(opts),
      conversionAccuracy: opts.conversionAccuracy,
      matrix: opts.matrix
    });
  }
  /**
   * Create a Duration from DurationLike.
   *
   * @param {Object | number | Duration} durationLike
   * One of:
   * - object with keys like 'years' and 'hours'.
   * - number representing milliseconds
   * - Duration instance
   * @return {Duration}
   */
  static fromDurationLike(durationLike) {
    if (isNumber(durationLike)) {
      return Duration.fromMillis(durationLike);
    } else if (Duration.isDuration(durationLike)) {
      return durationLike;
    } else if (typeof durationLike === "object") {
      return Duration.fromObject(durationLike);
    } else {
      throw new InvalidArgumentError(
        `Unknown duration argument ${durationLike} of type ${typeof durationLike}`
      );
    }
  }
  /**
   * Create a Duration from an ISO 8601 duration string.
   * @param {string} text - text to parse
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
   * @param {string} [opts.matrix=Object] - the preset conversion system to use
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @example Duration.fromISO('P3Y6M1W4DT12H30M5S').toObject() //=> { years: 3, months: 6, weeks: 1, days: 4, hours: 12, minutes: 30, seconds: 5 }
   * @example Duration.fromISO('PT23H').toObject() //=> { hours: 23 }
   * @example Duration.fromISO('P5Y3M').toObject() //=> { years: 5, months: 3 }
   * @return {Duration}
   */
  static fromISO(text, opts) {
    const [parsed] = parseISODuration(text);
    if (parsed) {
      return Duration.fromObject(parsed, opts);
    } else {
      return Duration.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
    }
  }
  /**
   * Create a Duration from an ISO 8601 time string.
   * @param {string} text - text to parse
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
   * @param {string} [opts.matrix=Object] - the conversion system to use
   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
   * @example Duration.fromISOTime('11:22:33.444').toObject() //=> { hours: 11, minutes: 22, seconds: 33, milliseconds: 444 }
   * @example Duration.fromISOTime('11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('T11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('T1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @return {Duration}
   */
  static fromISOTime(text, opts) {
    const [parsed] = parseISOTimeOnly(text);
    if (parsed) {
      return Duration.fromObject(parsed, opts);
    } else {
      return Duration.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
    }
  }
  /**
   * Create an invalid Duration.
   * @param {string} reason - simple string of why this datetime is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Duration}
   */
  static invalid(reason, explanation = null) {
    if (!reason) {
      throw new InvalidArgumentError("need to specify a reason the Duration is invalid");
    }
    const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
    if (Settings.throwOnInvalid) {
      throw new InvalidDurationError(invalid);
    } else {
      return new Duration({ invalid });
    }
  }
  /**
   * @private
   */
  static normalizeUnit(unit) {
    const normalized = {
      year: "years",
      years: "years",
      quarter: "quarters",
      quarters: "quarters",
      month: "months",
      months: "months",
      week: "weeks",
      weeks: "weeks",
      day: "days",
      days: "days",
      hour: "hours",
      hours: "hours",
      minute: "minutes",
      minutes: "minutes",
      second: "seconds",
      seconds: "seconds",
      millisecond: "milliseconds",
      milliseconds: "milliseconds"
    }[unit ? unit.toLowerCase() : unit];
    if (!normalized) throw new InvalidUnitError(unit);
    return normalized;
  }
  /**
   * Check if an object is a Duration. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isDuration(o2) {
    return o2 && o2.isLuxonDuration || false;
  }
  /**
   * Get  the locale of a Duration, such 'en-GB'
   * @type {string}
   */
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }
  /**
   * Get the numbering system of a Duration, such 'beng'. The numbering system is used when formatting the Duration
   *
   * @type {string}
   */
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }
  /**
   * Returns a string representation of this Duration formatted according to the specified format string. You may use these tokens:
   * * `S` for milliseconds
   * * `s` for seconds
   * * `m` for minutes
   * * `h` for hours
   * * `d` for days
   * * `w` for weeks
   * * `M` for months
   * * `y` for years
   * Notes:
   * * Add padding by repeating the token, e.g. "yy" pads the years to two digits, "hhhh" pads the hours out to four digits
   * * Tokens can be escaped by wrapping with single quotes.
   * * The duration will be converted to the set of units in the format string using {@link Duration#shiftTo} and the Durations's conversion accuracy setting.
   * @param {string} fmt - the format string
   * @param {Object} opts - options
   * @param {boolean} [opts.floor=true] - floor numerical values
   * @param {'negative'|'all'|'negativeLargestOnly'} [opts.signMode=negative] - How to handle signs
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("y d s") //=> "1 6 2"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("yy dd sss") //=> "01 06 002"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("M S") //=> "12 518402000"
   * @example Duration.fromObject({ days: 6, seconds: 2 }).toFormat("d s", { signMode: "all" }) //=> "+6 +2"
   * @example Duration.fromObject({ days: -6, seconds: -2 }).toFormat("d s", { signMode: "all" }) //=> "-6 -2"
   * @example Duration.fromObject({ days: -6, seconds: -2 }).toFormat("d s", { signMode: "negativeLargestOnly" }) //=> "-6 2"
   * @return {string}
   */
  toFormat(fmt, opts = {}) {
    const fmtOpts = {
      ...opts,
      floor: opts.round !== false && opts.floor !== false
    };
    return this.isValid ? Formatter.create(this.loc, fmtOpts).formatDurationFromString(this, fmt) : INVALID$2;
  }
  /**
   * Returns a string representation of a Duration with all units included.
   * To modify its behavior, use `listStyle` and any Intl.NumberFormat option, though `unitDisplay` is especially relevant.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options
   * @param {Object} opts - Formatting options. Accepts the same keys as the options parameter of the native `Intl.NumberFormat` constructor, as well as `listStyle`.
   * @param {string} [opts.listStyle='narrow'] - How to format the merged list. Corresponds to the `style` property of the options parameter of the native `Intl.ListFormat` constructor.
   * @param {boolean} [opts.showZeros=true] - Show all units previously used by the duration even if they are zero
   * @example
   * ```js
   * var dur = Duration.fromObject({ months: 1, weeks: 0, hours: 5, minutes: 6 })
   * dur.toHuman() //=> '1 month, 0 weeks, 5 hours, 6 minutes'
   * dur.toHuman({ listStyle: "long" }) //=> '1 month, 0 weeks, 5 hours, and 6 minutes'
   * dur.toHuman({ unitDisplay: "short" }) //=> '1 mth, 0 wks, 5 hr, 6 min'
   * dur.toHuman({ showZeros: false }) //=> '1 month, 5 hours, 6 minutes'
   * ```
   */
  toHuman(opts = {}) {
    if (!this.isValid) return INVALID$2;
    const showZeros = opts.showZeros !== false;
    const l2 = orderedUnits$1.map((unit) => {
      const val = this.values[unit];
      if (isUndefined(val) || val === 0 && !showZeros) {
        return null;
      }
      return this.loc.numberFormatter({ style: "unit", unitDisplay: "long", ...opts, unit: unit.slice(0, -1) }).format(val);
    }).filter((n3) => n3);
    return this.loc.listFormatter({ type: "conjunction", style: opts.listStyle || "narrow", ...opts }).format(l2);
  }
  /**
   * Returns a JavaScript object with this Duration's values.
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toObject() //=> { years: 1, days: 6, seconds: 2 }
   * @return {Object}
   */
  toObject() {
    if (!this.isValid) return {};
    return { ...this.values };
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Duration.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @example Duration.fromObject({ years: 3, seconds: 45 }).toISO() //=> 'P3YT45S'
   * @example Duration.fromObject({ months: 4, seconds: 45 }).toISO() //=> 'P4MT45S'
   * @example Duration.fromObject({ months: 5 }).toISO() //=> 'P5M'
   * @example Duration.fromObject({ minutes: 5 }).toISO() //=> 'PT5M'
   * @example Duration.fromObject({ milliseconds: 6 }).toISO() //=> 'PT0.006S'
   * @return {string}
   */
  toISO() {
    if (!this.isValid) return null;
    let s2 = "P";
    if (this.years !== 0) s2 += this.years + "Y";
    if (this.months !== 0 || this.quarters !== 0) s2 += this.months + this.quarters * 3 + "M";
    if (this.weeks !== 0) s2 += this.weeks + "W";
    if (this.days !== 0) s2 += this.days + "D";
    if (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0)
      s2 += "T";
    if (this.hours !== 0) s2 += this.hours + "H";
    if (this.minutes !== 0) s2 += this.minutes + "M";
    if (this.seconds !== 0 || this.milliseconds !== 0)
      s2 += roundTo(this.seconds + this.milliseconds / 1e3, 3) + "S";
    if (s2 === "P") s2 += "T0S";
    return s2;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Duration, formatted as a time of day.
   * Note that this will return null if the duration is invalid, negative, or equal to or greater than 24 hours.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example Duration.fromObject({ hours: 11 }).toISOTime() //=> '11:00:00.000'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressMilliseconds: true }) //=> '11:00:00'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressSeconds: true }) //=> '11:00'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ includePrefix: true }) //=> 'T11:00:00.000'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ format: 'basic' }) //=> '110000.000'
   * @return {string}
   */
  toISOTime(opts = {}) {
    if (!this.isValid) return null;
    const millis = this.toMillis();
    if (millis < 0 || millis >= 864e5) return null;
    opts = {
      suppressMilliseconds: false,
      suppressSeconds: false,
      includePrefix: false,
      format: "extended",
      ...opts,
      includeOffset: false
    };
    const dateTime = DateTime.fromMillis(millis, { zone: "UTC" });
    return dateTime.toISOTime(opts);
  }
  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use in JSON.
   * @return {string}
   */
  toJSON() {
    return this.toISO();
  }
  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use in debugging.
   * @return {string}
   */
  toString() {
    return this.toISO();
  }
  /**
   * Returns a string representation of this Duration appropriate for the REPL.
   * @return {string}
   */
  [Symbol.for("nodejs.util.inspect.custom")]() {
    if (this.isValid) {
      return `Duration { values: ${JSON.stringify(this.values)} }`;
    } else {
      return `Duration { Invalid, reason: ${this.invalidReason} }`;
    }
  }
  /**
   * Returns an milliseconds value of this Duration.
   * @return {number}
   */
  toMillis() {
    if (!this.isValid) return NaN;
    return durationToMillis(this.matrix, this.values);
  }
  /**
   * Returns an milliseconds value of this Duration. Alias of {@link toMillis}
   * @return {number}
   */
  valueOf() {
    return this.toMillis();
  }
  /**
   * Make this Duration longer by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  plus(duration) {
    if (!this.isValid) return this;
    const dur = Duration.fromDurationLike(duration), result = {};
    for (const k2 of orderedUnits$1) {
      if (hasOwnProperty(dur.values, k2) || hasOwnProperty(this.values, k2)) {
        result[k2] = dur.get(k2) + this.get(k2);
      }
    }
    return clone$1(this, { values: result }, true);
  }
  /**
   * Make this Duration shorter by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  minus(duration) {
    if (!this.isValid) return this;
    const dur = Duration.fromDurationLike(duration);
    return this.plus(dur.negate());
  }
  /**
   * Scale this Duration by the specified amount. Return a newly-constructed Duration.
   * @param {function} fn - The function to apply to each unit. Arity is 1 or 2: the value of the unit and, optionally, the unit name. Must return a number.
   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits(x => x * 2) //=> { hours: 2, minutes: 60 }
   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits((x, u) => u === "hours" ? x * 2 : x) //=> { hours: 2, minutes: 30 }
   * @return {Duration}
   */
  mapUnits(fn) {
    if (!this.isValid) return this;
    const result = {};
    for (const k2 of Object.keys(this.values)) {
      result[k2] = asNumber(fn(this.values[k2], k2));
    }
    return clone$1(this, { values: result }, true);
  }
  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example Duration.fromObject({years: 2, days: 3}).get('years') //=> 2
   * @example Duration.fromObject({years: 2, days: 3}).get('months') //=> 0
   * @example Duration.fromObject({years: 2, days: 3}).get('days') //=> 3
   * @return {number}
   */
  get(unit) {
    return this[Duration.normalizeUnit(unit)];
  }
  /**
   * "Set" the values of specified units. Return a newly-constructed Duration.
   * @param {Object} values - a mapping of units to numbers
   * @example dur.set({ years: 2017 })
   * @example dur.set({ hours: 8, minutes: 30 })
   * @return {Duration}
   */
  set(values) {
    if (!this.isValid) return this;
    const mixed = { ...this.values, ...normalizeObject(values, Duration.normalizeUnit) };
    return clone$1(this, { values: mixed });
  }
  /**
   * "Set" the locale and/or numberingSystem.  Returns a newly-constructed Duration.
   * @example dur.reconfigure({ locale: 'en-GB' })
   * @return {Duration}
   */
  reconfigure({ locale, numberingSystem, conversionAccuracy, matrix } = {}) {
    const loc = this.loc.clone({ locale, numberingSystem });
    const opts = { loc, matrix, conversionAccuracy };
    return clone$1(this, opts);
  }
  /**
   * Return the length of the duration in the specified unit.
   * @param {string} unit - a unit such as 'minutes' or 'days'
   * @example Duration.fromObject({years: 1}).as('days') //=> 365
   * @example Duration.fromObject({years: 1}).as('months') //=> 12
   * @example Duration.fromObject({hours: 60}).as('days') //=> 2.5
   * @return {number}
   */
  as(unit) {
    return this.isValid ? this.shiftTo(unit).get(unit) : NaN;
  }
  /**
   * Reduce this Duration to its canonical representation in its current units.
   * Assuming the overall value of the Duration is positive, this means:
   * - excessive values for lower-order units are converted to higher-order units (if possible, see first and second example)
   * - negative lower-order units are converted to higher order units (there must be such a higher order unit, otherwise
   *   the overall value would be negative, see third example)
   * - fractional values for higher-order units are converted to lower-order units (if possible, see fourth example)
   *
   * If the overall value is negative, the result of this method is equivalent to `this.negate().normalize().negate()`.
   * @example Duration.fromObject({ years: 2, days: 5000 }).normalize().toObject() //=> { years: 15, days: 255 }
   * @example Duration.fromObject({ days: 5000 }).normalize().toObject() //=> { days: 5000 }
   * @example Duration.fromObject({ hours: 12, minutes: -45 }).normalize().toObject() //=> { hours: 11, minutes: 15 }
   * @example Duration.fromObject({ years: 2.5, days: 0, hours: 0 }).normalize().toObject() //=> { years: 2, days: 182, hours: 12 }
   * @return {Duration}
   */
  normalize() {
    if (!this.isValid) return this;
    const vals = this.toObject();
    normalizeValues(this.matrix, vals);
    return clone$1(this, { values: vals }, true);
  }
  /**
   * Rescale units to its largest representation
   * @example Duration.fromObject({ milliseconds: 90000 }).rescale().toObject() //=> { minutes: 1, seconds: 30 }
   * @return {Duration}
   */
  rescale() {
    if (!this.isValid) return this;
    const vals = removeZeroes(this.normalize().shiftToAll().toObject());
    return clone$1(this, { values: vals }, true);
  }
  /**
   * Convert this Duration into its representation in a different set of units.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).shiftTo('minutes', 'milliseconds').toObject() //=> { minutes: 60, milliseconds: 30000 }
   * @return {Duration}
   */
  shiftTo(...units) {
    if (!this.isValid) return this;
    if (units.length === 0) {
      return this;
    }
    units = units.map((u2) => Duration.normalizeUnit(u2));
    const built = {}, accumulated = {}, vals = this.toObject();
    let lastUnit;
    for (const k2 of orderedUnits$1) {
      if (units.indexOf(k2) >= 0) {
        lastUnit = k2;
        let own = 0;
        for (const ak in accumulated) {
          own += this.matrix[ak][k2] * accumulated[ak];
          accumulated[ak] = 0;
        }
        if (isNumber(vals[k2])) {
          own += vals[k2];
        }
        const i2 = Math.trunc(own);
        built[k2] = i2;
        accumulated[k2] = (own * 1e3 - i2 * 1e3) / 1e3;
      } else if (isNumber(vals[k2])) {
        accumulated[k2] = vals[k2];
      }
    }
    for (const key in accumulated) {
      if (accumulated[key] !== 0) {
        built[lastUnit] += key === lastUnit ? accumulated[key] : accumulated[key] / this.matrix[lastUnit][key];
      }
    }
    normalizeValues(this.matrix, built);
    return clone$1(this, { values: built }, true);
  }
  /**
   * Shift this Duration to all available units.
   * Same as shiftTo("years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds")
   * @return {Duration}
   */
  shiftToAll() {
    if (!this.isValid) return this;
    return this.shiftTo(
      "years",
      "months",
      "weeks",
      "days",
      "hours",
      "minutes",
      "seconds",
      "milliseconds"
    );
  }
  /**
   * Return the negative of this Duration.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).negate().toObject() //=> { hours: -1, seconds: -30 }
   * @return {Duration}
   */
  negate() {
    if (!this.isValid) return this;
    const negated = {};
    for (const k2 of Object.keys(this.values)) {
      negated[k2] = this.values[k2] === 0 ? 0 : -this.values[k2];
    }
    return clone$1(this, { values: negated }, true);
  }
  /**
   * Removes all units with values equal to 0 from this Duration.
   * @example Duration.fromObject({ years: 2, days: 0, hours: 0, minutes: 0 }).removeZeros().toObject() //=> { years: 2 }
   * @return {Duration}
   */
  removeZeros() {
    if (!this.isValid) return this;
    const vals = removeZeroes(this.values);
    return clone$1(this, { values: vals }, true);
  }
  /**
   * Get the years.
   * @type {number}
   */
  get years() {
    return this.isValid ? this.values.years || 0 : NaN;
  }
  /**
   * Get the quarters.
   * @type {number}
   */
  get quarters() {
    return this.isValid ? this.values.quarters || 0 : NaN;
  }
  /**
   * Get the months.
   * @type {number}
   */
  get months() {
    return this.isValid ? this.values.months || 0 : NaN;
  }
  /**
   * Get the weeks
   * @type {number}
   */
  get weeks() {
    return this.isValid ? this.values.weeks || 0 : NaN;
  }
  /**
   * Get the days.
   * @type {number}
   */
  get days() {
    return this.isValid ? this.values.days || 0 : NaN;
  }
  /**
   * Get the hours.
   * @type {number}
   */
  get hours() {
    return this.isValid ? this.values.hours || 0 : NaN;
  }
  /**
   * Get the minutes.
   * @type {number}
   */
  get minutes() {
    return this.isValid ? this.values.minutes || 0 : NaN;
  }
  /**
   * Get the seconds.
   * @return {number}
   */
  get seconds() {
    return this.isValid ? this.values.seconds || 0 : NaN;
  }
  /**
   * Get the milliseconds.
   * @return {number}
   */
  get milliseconds() {
    return this.isValid ? this.values.milliseconds || 0 : NaN;
  }
  /**
   * Returns whether the Duration is invalid. Invalid durations are returned by diff operations
   * on invalid DateTimes or Intervals.
   * @return {boolean}
   */
  get isValid() {
    return this.invalid === null;
  }
  /**
   * Returns an error code if this Duration became invalid, or null if the Duration is valid
   * @return {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  /**
   * Returns an explanation of why this Duration became invalid, or null if the Duration is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  /**
   * Equality check
   * Two Durations are equal iff they have the same units and the same values for each unit.
   * @param {Duration} other
   * @return {boolean}
   */
  equals(other) {
    if (!this.isValid || !other.isValid) {
      return false;
    }
    if (!this.loc.equals(other.loc)) {
      return false;
    }
    function eq(v1, v2) {
      if (v1 === void 0 || v1 === 0) return v2 === void 0 || v2 === 0;
      return v1 === v2;
    }
    for (const u2 of orderedUnits$1) {
      if (!eq(this.values[u2], other.values[u2])) {
        return false;
      }
    }
    return true;
  }
}
const INVALID$1 = "Invalid Interval";
function validateStartEnd(start, end) {
  if (!start || !start.isValid) {
    return Interval.invalid("missing or invalid start");
  } else if (!end || !end.isValid) {
    return Interval.invalid("missing or invalid end");
  } else if (end < start) {
    return Interval.invalid(
      "end before start",
      `The end of an interval must be after its start, but you had start=${start.toISO()} and end=${end.toISO()}`
    );
  } else {
    return null;
  }
}
class Interval {
  /**
   * @private
   */
  constructor(config) {
    this.s = config.start;
    this.e = config.end;
    this.invalid = config.invalid || null;
    this.isLuxonInterval = true;
  }
  /**
   * Create an invalid Interval.
   * @param {string} reason - simple string of why this Interval is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Interval}
   */
  static invalid(reason, explanation = null) {
    if (!reason) {
      throw new InvalidArgumentError("need to specify a reason the Interval is invalid");
    }
    const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
    if (Settings.throwOnInvalid) {
      throw new InvalidIntervalError(invalid);
    } else {
      return new Interval({ invalid });
    }
  }
  /**
   * Create an Interval from a start DateTime and an end DateTime. Inclusive of the start but not the end.
   * @param {DateTime|Date|Object} start
   * @param {DateTime|Date|Object} end
   * @return {Interval}
   */
  static fromDateTimes(start, end) {
    const builtStart = friendlyDateTime(start), builtEnd = friendlyDateTime(end);
    const validateError = validateStartEnd(builtStart, builtEnd);
    if (validateError == null) {
      return new Interval({
        start: builtStart,
        end: builtEnd
      });
    } else {
      return validateError;
    }
  }
  /**
   * Create an Interval from a start DateTime and a Duration to extend to.
   * @param {DateTime|Date|Object} start
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  static after(start, duration) {
    const dur = Duration.fromDurationLike(duration), dt = friendlyDateTime(start);
    return Interval.fromDateTimes(dt, dt.plus(dur));
  }
  /**
   * Create an Interval from an end DateTime and a Duration to extend backwards to.
   * @param {DateTime|Date|Object} end
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  static before(end, duration) {
    const dur = Duration.fromDurationLike(duration), dt = friendlyDateTime(end);
    return Interval.fromDateTimes(dt.minus(dur), dt);
  }
  /**
   * Create an Interval from an ISO 8601 string.
   * Accepts `<start>/<end>`, `<start>/<duration>`, and `<duration>/<end>` formats.
   * @param {string} text - the ISO string to parse
   * @param {Object} [opts] - options to pass {@link DateTime#fromISO} and optionally {@link Duration#fromISO}
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {Interval}
   */
  static fromISO(text, opts) {
    const [s2, e2] = (text || "").split("/", 2);
    if (s2 && e2) {
      let start, startIsValid;
      try {
        start = DateTime.fromISO(s2, opts);
        startIsValid = start.isValid;
      } catch (e3) {
        startIsValid = false;
      }
      let end, endIsValid;
      try {
        end = DateTime.fromISO(e2, opts);
        endIsValid = end.isValid;
      } catch (e3) {
        endIsValid = false;
      }
      if (startIsValid && endIsValid) {
        return Interval.fromDateTimes(start, end);
      }
      if (startIsValid) {
        const dur = Duration.fromISO(e2, opts);
        if (dur.isValid) {
          return Interval.after(start, dur);
        }
      } else if (endIsValid) {
        const dur = Duration.fromISO(s2, opts);
        if (dur.isValid) {
          return Interval.before(end, dur);
        }
      }
    }
    return Interval.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
  }
  /**
   * Check if an object is an Interval. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isInterval(o2) {
    return o2 && o2.isLuxonInterval || false;
  }
  /**
   * Returns the start of the Interval
   * @type {DateTime}
   */
  get start() {
    return this.isValid ? this.s : null;
  }
  /**
   * Returns the end of the Interval. This is the first instant which is not part of the interval
   * (Interval is half-open).
   * @type {DateTime}
   */
  get end() {
    return this.isValid ? this.e : null;
  }
  /**
   * Returns the last DateTime included in the interval (since end is not part of the interval)
   * @type {DateTime}
   */
  get lastDateTime() {
    return this.isValid ? this.e ? this.e.minus(1) : null : null;
  }
  /**
   * Returns whether this Interval's end is at least its start, meaning that the Interval isn't 'backwards'.
   * @type {boolean}
   */
  get isValid() {
    return this.invalidReason === null;
  }
  /**
   * Returns an error code if this Interval is invalid, or null if the Interval is valid
   * @type {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  /**
   * Returns an explanation of why this Interval became invalid, or null if the Interval is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  /**
   * Returns the length of the Interval in the specified unit.
   * @param {string} unit - the unit (such as 'hours' or 'days') to return the length in.
   * @return {number}
   */
  length(unit = "milliseconds") {
    return this.isValid ? this.toDuration(...[unit]).get(unit) : NaN;
  }
  /**
   * Returns the count of minutes, hours, days, months, or years included in the Interval, even in part.
   * Unlike {@link Interval#length} this counts sections of the calendar, not periods of time, e.g. specifying 'day'
   * asks 'what dates are included in this interval?', not 'how many days long is this interval?'
   * @param {string} [unit='milliseconds'] - the unit of time to count.
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week; this operation will always use the locale of the start DateTime
   * @return {number}
   */
  count(unit = "milliseconds", opts) {
    if (!this.isValid) return NaN;
    const start = this.start.startOf(unit, opts);
    let end;
    if (opts?.useLocaleWeeks) {
      end = this.end.reconfigure({ locale: start.locale });
    } else {
      end = this.end;
    }
    end = end.startOf(unit, opts);
    return Math.floor(end.diff(start, unit).get(unit)) + (end.valueOf() !== this.end.valueOf());
  }
  /**
   * Returns whether this Interval's start and end are both in the same unit of time
   * @param {string} unit - the unit of time to check sameness on
   * @return {boolean}
   */
  hasSame(unit) {
    return this.isValid ? this.isEmpty() || this.e.minus(1).hasSame(this.s, unit) : false;
  }
  /**
   * Return whether this Interval has the same start and end DateTimes.
   * @return {boolean}
   */
  isEmpty() {
    return this.s.valueOf() === this.e.valueOf();
  }
  /**
   * Return whether this Interval's start is after the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  isAfter(dateTime) {
    if (!this.isValid) return false;
    return this.s > dateTime;
  }
  /**
   * Return whether this Interval's end is before the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  isBefore(dateTime) {
    if (!this.isValid) return false;
    return this.e <= dateTime;
  }
  /**
   * Return whether this Interval contains the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  contains(dateTime) {
    if (!this.isValid) return false;
    return this.s <= dateTime && this.e > dateTime;
  }
  /**
   * "Sets" the start and/or end dates. Returns a newly-constructed Interval.
   * @param {Object} values - the values to set
   * @param {DateTime} values.start - the starting DateTime
   * @param {DateTime} values.end - the ending DateTime
   * @return {Interval}
   */
  set({ start, end } = {}) {
    if (!this.isValid) return this;
    return Interval.fromDateTimes(start || this.s, end || this.e);
  }
  /**
   * Split this Interval at each of the specified DateTimes
   * @param {...DateTime} dateTimes - the unit of time to count.
   * @return {Array}
   */
  splitAt(...dateTimes) {
    if (!this.isValid) return [];
    const sorted = dateTimes.map(friendlyDateTime).filter((d2) => this.contains(d2)).sort((a2, b2) => a2.toMillis() - b2.toMillis()), results = [];
    let { s: s2 } = this, i2 = 0;
    while (s2 < this.e) {
      const added = sorted[i2] || this.e, next = +added > +this.e ? this.e : added;
      results.push(Interval.fromDateTimes(s2, next));
      s2 = next;
      i2 += 1;
    }
    return results;
  }
  /**
   * Split this Interval into smaller Intervals, each of the specified length.
   * Left over time is grouped into a smaller interval
   * @param {Duration|Object|number} duration - The length of each resulting interval.
   * @return {Array}
   */
  splitBy(duration) {
    const dur = Duration.fromDurationLike(duration);
    if (!this.isValid || !dur.isValid || dur.as("milliseconds") === 0) {
      return [];
    }
    let { s: s2 } = this, idx = 1, next;
    const results = [];
    while (s2 < this.e) {
      const added = this.start.plus(dur.mapUnits((x2) => x2 * idx));
      next = +added > +this.e ? this.e : added;
      results.push(Interval.fromDateTimes(s2, next));
      s2 = next;
      idx += 1;
    }
    return results;
  }
  /**
   * Split this Interval into the specified number of smaller intervals.
   * @param {number} numberOfParts - The number of Intervals to divide the Interval into.
   * @return {Array}
   */
  divideEqually(numberOfParts) {
    if (!this.isValid) return [];
    return this.splitBy(this.length() / numberOfParts).slice(0, numberOfParts);
  }
  /**
   * Return whether this Interval overlaps with the specified Interval
   * @param {Interval} other
   * @return {boolean}
   */
  overlaps(other) {
    return this.e > other.s && this.s < other.e;
  }
  /**
   * Return whether this Interval's end is adjacent to the specified Interval's start.
   * @param {Interval} other
   * @return {boolean}
   */
  abutsStart(other) {
    if (!this.isValid) return false;
    return +this.e === +other.s;
  }
  /**
   * Return whether this Interval's start is adjacent to the specified Interval's end.
   * @param {Interval} other
   * @return {boolean}
   */
  abutsEnd(other) {
    if (!this.isValid) return false;
    return +other.e === +this.s;
  }
  /**
   * Returns true if this Interval fully contains the specified Interval, specifically if the intersect (of this Interval and the other Interval) is equal to the other Interval; false otherwise.
   * @param {Interval} other
   * @return {boolean}
   */
  engulfs(other) {
    if (!this.isValid) return false;
    return this.s <= other.s && this.e >= other.e;
  }
  /**
   * Return whether this Interval has the same start and end as the specified Interval.
   * @param {Interval} other
   * @return {boolean}
   */
  equals(other) {
    if (!this.isValid || !other.isValid) {
      return false;
    }
    return this.s.equals(other.s) && this.e.equals(other.e);
  }
  /**
   * Return an Interval representing the intersection of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the maximum start time and the minimum end time of the two Intervals.
   * Returns null if the intersection is empty, meaning, the intervals don't intersect.
   * @param {Interval} other
   * @return {Interval}
   */
  intersection(other) {
    if (!this.isValid) return this;
    const s2 = this.s > other.s ? this.s : other.s, e2 = this.e < other.e ? this.e : other.e;
    if (s2 >= e2) {
      return null;
    } else {
      return Interval.fromDateTimes(s2, e2);
    }
  }
  /**
   * Return an Interval representing the union of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the minimum start time and the maximum end time of the two Intervals.
   * @param {Interval} other
   * @return {Interval}
   */
  union(other) {
    if (!this.isValid) return this;
    const s2 = this.s < other.s ? this.s : other.s, e2 = this.e > other.e ? this.e : other.e;
    return Interval.fromDateTimes(s2, e2);
  }
  /**
   * Merge an array of Intervals into an equivalent minimal set of Intervals.
   * Combines overlapping and adjacent Intervals.
   * The resulting array will contain the Intervals in ascending order, that is, starting with the earliest Interval
   * and ending with the latest.
   *
   * @param {Array} intervals
   * @return {Array}
   */
  static merge(intervals) {
    const [found, final] = intervals.sort((a2, b2) => a2.s - b2.s).reduce(
      ([sofar, current], item) => {
        if (!current) {
          return [sofar, item];
        } else if (current.overlaps(item) || current.abutsStart(item)) {
          return [sofar, current.union(item)];
        } else {
          return [sofar.concat([current]), item];
        }
      },
      [[], null]
    );
    if (final) {
      found.push(final);
    }
    return found;
  }
  /**
   * Return an array of Intervals representing the spans of time that only appear in one of the specified Intervals.
   * @param {Array} intervals
   * @return {Array}
   */
  static xor(intervals) {
    let start = null, currentCount = 0;
    const results = [], ends = intervals.map((i2) => [
      { time: i2.s, type: "s" },
      { time: i2.e, type: "e" }
    ]), flattened = Array.prototype.concat(...ends), arr = flattened.sort((a2, b2) => a2.time - b2.time);
    for (const i2 of arr) {
      currentCount += i2.type === "s" ? 1 : -1;
      if (currentCount === 1) {
        start = i2.time;
      } else {
        if (start && +start !== +i2.time) {
          results.push(Interval.fromDateTimes(start, i2.time));
        }
        start = null;
      }
    }
    return Interval.merge(results);
  }
  /**
   * Return an Interval representing the span of time in this Interval that doesn't overlap with any of the specified Intervals.
   * @param {...Interval} intervals
   * @return {Array}
   */
  difference(...intervals) {
    return Interval.xor([this].concat(intervals)).map((i2) => this.intersection(i2)).filter((i2) => i2 && !i2.isEmpty());
  }
  /**
   * Returns a string representation of this Interval appropriate for debugging.
   * @return {string}
   */
  toString() {
    if (!this.isValid) return INVALID$1;
    return `[${this.s.toISO()} – ${this.e.toISO()})`;
  }
  /**
   * Returns a string representation of this Interval appropriate for the REPL.
   * @return {string}
   */
  [Symbol.for("nodejs.util.inspect.custom")]() {
    if (this.isValid) {
      return `Interval { start: ${this.s.toISO()}, end: ${this.e.toISO()} }`;
    } else {
      return `Interval { Invalid, reason: ${this.invalidReason} }`;
    }
  }
  /**
   * Returns a localized string representing this Interval. Accepts the same options as the
   * Intl.DateTimeFormat constructor and any presets defined by Luxon, such as
   * {@link DateTime.DATE_FULL} or {@link DateTime.TIME_SIMPLE}. The exact behavior of this method
   * is browser-specific, but in general it will return an appropriate representation of the
   * Interval in the assigned locale. Defaults to the system's locale if no locale has been
   * specified.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {Object} [formatOpts=DateTime.DATE_SHORT] - Either a DateTime preset or
   * Intl.DateTimeFormat constructor options.
   * @param {Object} opts - Options to override the configuration of the start DateTime.
   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(); //=> 11/7/2022 – 11/8/2022
   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(DateTime.DATE_FULL); //=> November 7 – 8, 2022
   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(DateTime.DATE_FULL, { locale: 'fr-FR' }); //=> 7–8 novembre 2022
   * @example Interval.fromISO('2022-11-07T17:00Z/2022-11-07T19:00Z').toLocaleString(DateTime.TIME_SIMPLE); //=> 6:00 – 8:00 PM
   * @example Interval.fromISO('2022-11-07T17:00Z/2022-11-07T19:00Z').toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> Mon, Nov 07, 6:00 – 8:00 p
   * @return {string}
   */
  toLocaleString(formatOpts = DATE_SHORT, opts = {}) {
    return this.isValid ? Formatter.create(this.s.loc.clone(opts), formatOpts).formatInterval(this) : INVALID$1;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Interval.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISO(opts) {
    if (!this.isValid) return INVALID$1;
    return `${this.s.toISO(opts)}/${this.e.toISO(opts)}`;
  }
  /**
   * Returns an ISO 8601-compliant string representation of date of this Interval.
   * The time components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {string}
   */
  toISODate() {
    if (!this.isValid) return INVALID$1;
    return `${this.s.toISODate()}/${this.e.toISODate()}`;
  }
  /**
   * Returns an ISO 8601-compliant string representation of time of this Interval.
   * The date components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISOTime(opts) {
    if (!this.isValid) return INVALID$1;
    return `${this.s.toISOTime(opts)}/${this.e.toISOTime(opts)}`;
  }
  /**
   * Returns a string representation of this Interval formatted according to the specified format
   * string. **You may not want this.** See {@link Interval#toLocaleString} for a more flexible
   * formatting tool.
   * @param {string} dateFormat - The format string. This string formats the start and end time.
   * See {@link DateTime#toFormat} for details.
   * @param {Object} opts - Options.
   * @param {string} [opts.separator =  ' – '] - A separator to place between the start and end
   * representations.
   * @return {string}
   */
  toFormat(dateFormat, { separator = " – " } = {}) {
    if (!this.isValid) return INVALID$1;
    return `${this.s.toFormat(dateFormat)}${separator}${this.e.toFormat(dateFormat)}`;
  }
  /**
   * Return a Duration representing the time spanned by this interval.
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units (such as 'hours' or 'days') to include in the duration.
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @example Interval.fromDateTimes(dt1, dt2).toDuration().toObject() //=> { milliseconds: 88489257 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration('days').toObject() //=> { days: 1.0241812152777778 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes']).toObject() //=> { hours: 24, minutes: 34.82095 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes', 'seconds']).toObject() //=> { hours: 24, minutes: 34, seconds: 49.257 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration('seconds').toObject() //=> { seconds: 88489.257 }
   * @return {Duration}
   */
  toDuration(unit, opts) {
    if (!this.isValid) {
      return Duration.invalid(this.invalidReason);
    }
    return this.e.diff(this.s, unit, opts);
  }
  /**
   * Run mapFn on the interval start and end, returning a new Interval from the resulting DateTimes
   * @param {function} mapFn
   * @return {Interval}
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.toUTC())
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.plus({ hours: 2 }))
   */
  mapEndpoints(mapFn) {
    return Interval.fromDateTimes(mapFn(this.s), mapFn(this.e));
  }
}
class Info {
  /**
   * Return whether the specified zone contains a DST.
   * @param {string|Zone} [zone='local'] - Zone to check. Defaults to the environment's local zone.
   * @return {boolean}
   */
  static hasDST(zone = Settings.defaultZone) {
    const proto = DateTime.now().setZone(zone).set({ month: 12 });
    return !zone.isUniversal && proto.offset !== proto.set({ month: 6 }).offset;
  }
  /**
   * Return whether the specified zone is a valid IANA specifier.
   * @param {string} zone - Zone to check
   * @return {boolean}
   */
  static isValidIANAZone(zone) {
    return IANAZone.isValidZone(zone);
  }
  /**
   * Converts the input into a {@link Zone} instance.
   *
   * * If `input` is already a Zone instance, it is returned unchanged.
   * * If `input` is a string containing a valid time zone name, a Zone instance
   *   with that name is returned.
   * * If `input` is a string that doesn't refer to a known time zone, a Zone
   *   instance with {@link Zone#isValid} == false is returned.
   * * If `input is a number, a Zone instance with the specified fixed offset
   *   in minutes is returned.
   * * If `input` is `null` or `undefined`, the default zone is returned.
   * @param {string|Zone|number} [input] - the value to be converted
   * @return {Zone}
   */
  static normalizeZone(input) {
    return normalizeZone(input, Settings.defaultZone);
  }
  /**
   * Get the weekday on which the week starts according to the given locale.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number} the start of the week, 1 for Monday through 7 for Sunday
   */
  static getStartOfWeek({ locale = null, locObj = null } = {}) {
    return (locObj || Locale.create(locale)).getStartOfWeek();
  }
  /**
   * Get the minimum number of days necessary in a week before it is considered part of the next year according
   * to the given locale.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number}
   */
  static getMinimumDaysInFirstWeek({ locale = null, locObj = null } = {}) {
    return (locObj || Locale.create(locale)).getMinDaysInFirstWeek();
  }
  /**
   * Get the weekdays, which are considered the weekend according to the given locale
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number[]} an array of weekdays, 1 for Monday through 7 for Sunday
   */
  static getWeekendWeekdays({ locale = null, locObj = null } = {}) {
    return (locObj || Locale.create(locale)).getWeekendDays().slice();
  }
  /**
   * Return an array of standalone month names.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @param {string} [opts.outputCalendar='gregory'] - the calendar
   * @example Info.months()[0] //=> 'January'
   * @example Info.months('short')[0] //=> 'Jan'
   * @example Info.months('numeric')[0] //=> '1'
   * @example Info.months('short', { locale: 'fr-CA' } )[0] //=> 'janv.'
   * @example Info.months('numeric', { locale: 'ar' })[0] //=> '١'
   * @example Info.months('long', { outputCalendar: 'islamic' })[0] //=> 'Rabiʻ I'
   * @return {Array}
   */
  static months(length = "long", { locale = null, numberingSystem = null, locObj = null, outputCalendar = "gregory" } = {}) {
    return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length);
  }
  /**
   * Return an array of format month names.
   * Format months differ from standalone months in that they're meant to appear next to the day of the month. In some languages, that
   * changes the string.
   * See {@link Info#months}
   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @param {string} [opts.outputCalendar='gregory'] - the calendar
   * @return {Array}
   */
  static monthsFormat(length = "long", { locale = null, numberingSystem = null, locObj = null, outputCalendar = "gregory" } = {}) {
    return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length, true);
  }
  /**
   * Return an array of standalone week names.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {string} [length='long'] - the length of the weekday representation, such as "narrow", "short", "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @example Info.weekdays()[0] //=> 'Monday'
   * @example Info.weekdays('short')[0] //=> 'Mon'
   * @example Info.weekdays('short', { locale: 'fr-CA' })[0] //=> 'lun.'
   * @example Info.weekdays('short', { locale: 'ar' })[0] //=> 'الاثنين'
   * @return {Array}
   */
  static weekdays(length = "long", { locale = null, numberingSystem = null, locObj = null } = {}) {
    return (locObj || Locale.create(locale, numberingSystem, null)).weekdays(length);
  }
  /**
   * Return an array of format week names.
   * Format weekdays differ from standalone weekdays in that they're meant to appear next to more date information. In some languages, that
   * changes the string.
   * See {@link Info#weekdays}
   * @param {string} [length='long'] - the length of the month representation, such as "narrow", "short", "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale=null] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @return {Array}
   */
  static weekdaysFormat(length = "long", { locale = null, numberingSystem = null, locObj = null } = {}) {
    return (locObj || Locale.create(locale, numberingSystem, null)).weekdays(length, true);
  }
  /**
   * Return an array of meridiems.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @example Info.meridiems() //=> [ 'AM', 'PM' ]
   * @example Info.meridiems({ locale: 'my' }) //=> [ 'နံနက်', 'ညနေ' ]
   * @return {Array}
   */
  static meridiems({ locale = null } = {}) {
    return Locale.create(locale).meridiems();
  }
  /**
   * Return an array of eras, such as ['BC', 'AD']. The locale can be specified, but the calendar system is always Gregorian.
   * @param {string} [length='short'] - the length of the era representation, such as "short" or "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @example Info.eras() //=> [ 'BC', 'AD' ]
   * @example Info.eras('long') //=> [ 'Before Christ', 'Anno Domini' ]
   * @example Info.eras('long', { locale: 'fr' }) //=> [ 'avant Jésus-Christ', 'après Jésus-Christ' ]
   * @return {Array}
   */
  static eras(length = "short", { locale = null } = {}) {
    return Locale.create(locale, null, "gregory").eras(length);
  }
  /**
   * Return the set of available features in this environment.
   * Some features of Luxon are not available in all environments. For example, on older browsers, relative time formatting support is not available. Use this function to figure out if that's the case.
   * Keys:
   * * `relative`: whether this environment supports relative time formatting
   * * `localeWeek`: whether this environment supports different weekdays for the start of the week based on the locale
   * @example Info.features() //=> { relative: false, localeWeek: true }
   * @return {Object}
   */
  static features() {
    return { relative: hasRelative(), localeWeek: hasLocaleWeekInfo() };
  }
}
function dayDiff(earlier, later) {
  const utcDayStart = (dt) => dt.toUTC(0, { keepLocalTime: true }).startOf("day").valueOf(), ms = utcDayStart(later) - utcDayStart(earlier);
  return Math.floor(Duration.fromMillis(ms).as("days"));
}
function highOrderDiffs(cursor, later, units) {
  const differs = [
    ["years", (a2, b2) => b2.year - a2.year],
    ["quarters", (a2, b2) => b2.quarter - a2.quarter + (b2.year - a2.year) * 4],
    ["months", (a2, b2) => b2.month - a2.month + (b2.year - a2.year) * 12],
    [
      "weeks",
      (a2, b2) => {
        const days = dayDiff(a2, b2);
        return (days - days % 7) / 7;
      }
    ],
    ["days", dayDiff]
  ];
  const results = {};
  const earlier = cursor;
  let lowestOrder, highWater;
  for (const [unit, differ] of differs) {
    if (units.indexOf(unit) >= 0) {
      lowestOrder = unit;
      results[unit] = differ(cursor, later);
      highWater = earlier.plus(results);
      if (highWater > later) {
        results[unit]--;
        cursor = earlier.plus(results);
        if (cursor > later) {
          highWater = cursor;
          results[unit]--;
          cursor = earlier.plus(results);
        }
      } else {
        cursor = highWater;
      }
    }
  }
  return [cursor, results, highWater, lowestOrder];
}
function diff(earlier, later, units, opts) {
  let [cursor, results, highWater, lowestOrder] = highOrderDiffs(earlier, later, units);
  const remainingMillis = later - cursor;
  const lowerOrderUnits = units.filter(
    (u2) => ["hours", "minutes", "seconds", "milliseconds"].indexOf(u2) >= 0
  );
  if (lowerOrderUnits.length === 0) {
    if (highWater < later) {
      highWater = cursor.plus({ [lowestOrder]: 1 });
    }
    if (highWater !== cursor) {
      results[lowestOrder] = (results[lowestOrder] || 0) + remainingMillis / (highWater - cursor);
    }
  }
  const duration = Duration.fromObject(results, opts);
  if (lowerOrderUnits.length > 0) {
    return Duration.fromMillis(remainingMillis, opts).shiftTo(...lowerOrderUnits).plus(duration);
  } else {
    return duration;
  }
}
const MISSING_FTP = "missing Intl.DateTimeFormat.formatToParts support";
function intUnit(regex, post = (i2) => i2) {
  return { regex, deser: ([s2]) => post(parseDigits(s2)) };
}
const NBSP = String.fromCharCode(160);
const spaceOrNBSP = `[ ${NBSP}]`;
const spaceOrNBSPRegExp = new RegExp(spaceOrNBSP, "g");
function fixListRegex(s2) {
  return s2.replace(/\./g, "\\.?").replace(spaceOrNBSPRegExp, spaceOrNBSP);
}
function stripInsensitivities(s2) {
  return s2.replace(/\./g, "").replace(spaceOrNBSPRegExp, " ").toLowerCase();
}
function oneOf(strings, startIndex) {
  if (strings === null) {
    return null;
  } else {
    return {
      regex: RegExp(strings.map(fixListRegex).join("|")),
      deser: ([s2]) => strings.findIndex((i2) => stripInsensitivities(s2) === stripInsensitivities(i2)) + startIndex
    };
  }
}
function offset(regex, groups) {
  return { regex, deser: ([, h2, m2]) => signedOffset(h2, m2), groups };
}
function simple(regex) {
  return { regex, deser: ([s2]) => s2 };
}
function escapeToken(value) {
  return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}
function unitForToken(token, loc) {
  const one = digitRegex(loc), two = digitRegex(loc, "{2}"), three = digitRegex(loc, "{3}"), four = digitRegex(loc, "{4}"), six = digitRegex(loc, "{6}"), oneOrTwo = digitRegex(loc, "{1,2}"), oneToThree = digitRegex(loc, "{1,3}"), oneToSix = digitRegex(loc, "{1,6}"), oneToNine = digitRegex(loc, "{1,9}"), twoToFour = digitRegex(loc, "{2,4}"), fourToSix = digitRegex(loc, "{4,6}"), literal = (t2) => ({ regex: RegExp(escapeToken(t2.val)), deser: ([s2]) => s2, literal: true }), unitate = (t2) => {
    if (token.literal) {
      return literal(t2);
    }
    switch (t2.val) {
      // era
      case "G":
        return oneOf(loc.eras("short"), 0);
      case "GG":
        return oneOf(loc.eras("long"), 0);
      // years
      case "y":
        return intUnit(oneToSix);
      case "yy":
        return intUnit(twoToFour, untruncateYear);
      case "yyyy":
        return intUnit(four);
      case "yyyyy":
        return intUnit(fourToSix);
      case "yyyyyy":
        return intUnit(six);
      // months
      case "M":
        return intUnit(oneOrTwo);
      case "MM":
        return intUnit(two);
      case "MMM":
        return oneOf(loc.months("short", true), 1);
      case "MMMM":
        return oneOf(loc.months("long", true), 1);
      case "L":
        return intUnit(oneOrTwo);
      case "LL":
        return intUnit(two);
      case "LLL":
        return oneOf(loc.months("short", false), 1);
      case "LLLL":
        return oneOf(loc.months("long", false), 1);
      // dates
      case "d":
        return intUnit(oneOrTwo);
      case "dd":
        return intUnit(two);
      // ordinals
      case "o":
        return intUnit(oneToThree);
      case "ooo":
        return intUnit(three);
      // time
      case "HH":
        return intUnit(two);
      case "H":
        return intUnit(oneOrTwo);
      case "hh":
        return intUnit(two);
      case "h":
        return intUnit(oneOrTwo);
      case "mm":
        return intUnit(two);
      case "m":
        return intUnit(oneOrTwo);
      case "q":
        return intUnit(oneOrTwo);
      case "qq":
        return intUnit(two);
      case "s":
        return intUnit(oneOrTwo);
      case "ss":
        return intUnit(two);
      case "S":
        return intUnit(oneToThree);
      case "SSS":
        return intUnit(three);
      case "u":
        return simple(oneToNine);
      case "uu":
        return simple(oneOrTwo);
      case "uuu":
        return intUnit(one);
      // meridiem
      case "a":
        return oneOf(loc.meridiems(), 0);
      // weekYear (k)
      case "kkkk":
        return intUnit(four);
      case "kk":
        return intUnit(twoToFour, untruncateYear);
      // weekNumber (W)
      case "W":
        return intUnit(oneOrTwo);
      case "WW":
        return intUnit(two);
      // weekdays
      case "E":
      case "c":
        return intUnit(one);
      case "EEE":
        return oneOf(loc.weekdays("short", false), 1);
      case "EEEE":
        return oneOf(loc.weekdays("long", false), 1);
      case "ccc":
        return oneOf(loc.weekdays("short", true), 1);
      case "cccc":
        return oneOf(loc.weekdays("long", true), 1);
      // offset/zone
      case "Z":
      case "ZZ":
        return offset(new RegExp(`([+-]${oneOrTwo.source})(?::(${two.source}))?`), 2);
      case "ZZZ":
        return offset(new RegExp(`([+-]${oneOrTwo.source})(${two.source})?`), 2);
      // we don't support ZZZZ (PST) or ZZZZZ (Pacific Standard Time) in parsing
      // because we don't have any way to figure out what they are
      case "z":
        return simple(/[a-z_+-/]{1,256}?/i);
      // this special-case "token" represents a place where a macro-token expanded into a white-space literal
      // in this case we accept any non-newline white-space
      case " ":
        return simple(/[^\S\n\r]/);
      default:
        return literal(t2);
    }
  };
  const unit = unitate(token) || {
    invalidReason: MISSING_FTP
  };
  unit.token = token;
  return unit;
}
const partTypeStyleToTokenVal = {
  year: {
    "2-digit": "yy",
    numeric: "yyyyy"
  },
  month: {
    numeric: "M",
    "2-digit": "MM",
    short: "MMM",
    long: "MMMM"
  },
  day: {
    numeric: "d",
    "2-digit": "dd"
  },
  weekday: {
    short: "EEE",
    long: "EEEE"
  },
  dayperiod: "a",
  dayPeriod: "a",
  hour12: {
    numeric: "h",
    "2-digit": "hh"
  },
  hour24: {
    numeric: "H",
    "2-digit": "HH"
  },
  minute: {
    numeric: "m",
    "2-digit": "mm"
  },
  second: {
    numeric: "s",
    "2-digit": "ss"
  },
  timeZoneName: {
    long: "ZZZZZ",
    short: "ZZZ"
  }
};
function tokenForPart(part, formatOpts, resolvedOpts) {
  const { type, value } = part;
  if (type === "literal") {
    const isSpace = /^\s+$/.test(value);
    return {
      literal: !isSpace,
      val: isSpace ? " " : value
    };
  }
  const style = formatOpts[type];
  let actualType = type;
  if (type === "hour") {
    if (formatOpts.hour12 != null) {
      actualType = formatOpts.hour12 ? "hour12" : "hour24";
    } else if (formatOpts.hourCycle != null) {
      if (formatOpts.hourCycle === "h11" || formatOpts.hourCycle === "h12") {
        actualType = "hour12";
      } else {
        actualType = "hour24";
      }
    } else {
      actualType = resolvedOpts.hour12 ? "hour12" : "hour24";
    }
  }
  let val = partTypeStyleToTokenVal[actualType];
  if (typeof val === "object") {
    val = val[style];
  }
  if (val) {
    return {
      literal: false,
      val
    };
  }
  return void 0;
}
function buildRegex(units) {
  const re = units.map((u2) => u2.regex).reduce((f2, r2) => `${f2}(${r2.source})`, "");
  return [`^${re}$`, units];
}
function match(input, regex, handlers) {
  const matches = input.match(regex);
  if (matches) {
    const all = {};
    let matchIndex = 1;
    for (const i2 in handlers) {
      if (hasOwnProperty(handlers, i2)) {
        const h2 = handlers[i2], groups = h2.groups ? h2.groups + 1 : 1;
        if (!h2.literal && h2.token) {
          all[h2.token.val[0]] = h2.deser(matches.slice(matchIndex, matchIndex + groups));
        }
        matchIndex += groups;
      }
    }
    return [matches, all];
  } else {
    return [matches, {}];
  }
}
function dateTimeFromMatches(matches) {
  const toField = (token) => {
    switch (token) {
      case "S":
        return "millisecond";
      case "s":
        return "second";
      case "m":
        return "minute";
      case "h":
      case "H":
        return "hour";
      case "d":
        return "day";
      case "o":
        return "ordinal";
      case "L":
      case "M":
        return "month";
      case "y":
        return "year";
      case "E":
      case "c":
        return "weekday";
      case "W":
        return "weekNumber";
      case "k":
        return "weekYear";
      case "q":
        return "quarter";
      default:
        return null;
    }
  };
  let zone = null;
  let specificOffset;
  if (!isUndefined(matches.z)) {
    zone = IANAZone.create(matches.z);
  }
  if (!isUndefined(matches.Z)) {
    if (!zone) {
      zone = new FixedOffsetZone(matches.Z);
    }
    specificOffset = matches.Z;
  }
  if (!isUndefined(matches.q)) {
    matches.M = (matches.q - 1) * 3 + 1;
  }
  if (!isUndefined(matches.h)) {
    if (matches.h < 12 && matches.a === 1) {
      matches.h += 12;
    } else if (matches.h === 12 && matches.a === 0) {
      matches.h = 0;
    }
  }
  if (matches.G === 0 && matches.y) {
    matches.y = -matches.y;
  }
  if (!isUndefined(matches.u)) {
    matches.S = parseMillis(matches.u);
  }
  const vals = Object.keys(matches).reduce((r2, k2) => {
    const f2 = toField(k2);
    if (f2) {
      r2[f2] = matches[k2];
    }
    return r2;
  }, {});
  return [vals, zone, specificOffset];
}
let dummyDateTimeCache = null;
function getDummyDateTime() {
  if (!dummyDateTimeCache) {
    dummyDateTimeCache = DateTime.fromMillis(1555555555555);
  }
  return dummyDateTimeCache;
}
function maybeExpandMacroToken(token, locale) {
  if (token.literal) {
    return token;
  }
  const formatOpts = Formatter.macroTokenToFormatOpts(token.val);
  const tokens = formatOptsToTokens(formatOpts, locale);
  if (tokens == null || tokens.includes(void 0)) {
    return token;
  }
  return tokens;
}
function expandMacroTokens(tokens, locale) {
  return Array.prototype.concat(...tokens.map((t2) => maybeExpandMacroToken(t2, locale)));
}
class TokenParser {
  constructor(locale, format) {
    this.locale = locale;
    this.format = format;
    this.tokens = expandMacroTokens(Formatter.parseFormat(format), locale);
    this.units = this.tokens.map((t2) => unitForToken(t2, locale));
    this.disqualifyingUnit = this.units.find((t2) => t2.invalidReason);
    if (!this.disqualifyingUnit) {
      const [regexString, handlers] = buildRegex(this.units);
      this.regex = RegExp(regexString, "i");
      this.handlers = handlers;
    }
  }
  explainFromTokens(input) {
    if (!this.isValid) {
      return { input, tokens: this.tokens, invalidReason: this.invalidReason };
    } else {
      const [rawMatches, matches] = match(input, this.regex, this.handlers), [result, zone, specificOffset] = matches ? dateTimeFromMatches(matches) : [null, null, void 0];
      if (hasOwnProperty(matches, "a") && hasOwnProperty(matches, "H")) {
        throw new ConflictingSpecificationError(
          "Can't include meridiem when specifying 24-hour format"
        );
      }
      return {
        input,
        tokens: this.tokens,
        regex: this.regex,
        rawMatches,
        matches,
        result,
        zone,
        specificOffset
      };
    }
  }
  get isValid() {
    return !this.disqualifyingUnit;
  }
  get invalidReason() {
    return this.disqualifyingUnit ? this.disqualifyingUnit.invalidReason : null;
  }
}
function explainFromTokens(locale, input, format) {
  const parser = new TokenParser(locale, format);
  return parser.explainFromTokens(input);
}
function parseFromTokens(locale, input, format) {
  const { result, zone, specificOffset, invalidReason } = explainFromTokens(locale, input, format);
  return [result, zone, specificOffset, invalidReason];
}
function formatOptsToTokens(formatOpts, locale) {
  if (!formatOpts) {
    return null;
  }
  const formatter = Formatter.create(locale, formatOpts);
  const df = formatter.dtFormatter(getDummyDateTime());
  const parts = df.formatToParts();
  const resolvedOpts = df.resolvedOptions();
  return parts.map((p2) => tokenForPart(p2, formatOpts, resolvedOpts));
}
const INVALID = "Invalid DateTime";
const MAX_DATE = 864e13;
function unsupportedZone(zone) {
  return new Invalid("unsupported zone", `the zone "${zone.name}" is not supported`);
}
function possiblyCachedWeekData(dt) {
  if (dt.weekData === null) {
    dt.weekData = gregorianToWeek(dt.c);
  }
  return dt.weekData;
}
function possiblyCachedLocalWeekData(dt) {
  if (dt.localWeekData === null) {
    dt.localWeekData = gregorianToWeek(
      dt.c,
      dt.loc.getMinDaysInFirstWeek(),
      dt.loc.getStartOfWeek()
    );
  }
  return dt.localWeekData;
}
function clone(inst, alts) {
  const current = {
    ts: inst.ts,
    zone: inst.zone,
    c: inst.c,
    o: inst.o,
    loc: inst.loc,
    invalid: inst.invalid
  };
  return new DateTime({ ...current, ...alts, old: current });
}
function fixOffset(localTS, o2, tz) {
  let utcGuess = localTS - o2 * 60 * 1e3;
  const o22 = tz.offset(utcGuess);
  if (o2 === o22) {
    return [utcGuess, o2];
  }
  utcGuess -= (o22 - o2) * 60 * 1e3;
  const o3 = tz.offset(utcGuess);
  if (o22 === o3) {
    return [utcGuess, o22];
  }
  return [localTS - Math.min(o22, o3) * 60 * 1e3, Math.max(o22, o3)];
}
function tsToObj(ts, offset2) {
  ts += offset2 * 60 * 1e3;
  const d2 = new Date(ts);
  return {
    year: d2.getUTCFullYear(),
    month: d2.getUTCMonth() + 1,
    day: d2.getUTCDate(),
    hour: d2.getUTCHours(),
    minute: d2.getUTCMinutes(),
    second: d2.getUTCSeconds(),
    millisecond: d2.getUTCMilliseconds()
  };
}
function objToTS(obj, offset2, zone) {
  return fixOffset(objToLocalTS(obj), offset2, zone);
}
function adjustTime(inst, dur) {
  const oPre = inst.o, year = inst.c.year + Math.trunc(dur.years), month = inst.c.month + Math.trunc(dur.months) + Math.trunc(dur.quarters) * 3, c2 = {
    ...inst.c,
    year,
    month,
    day: Math.min(inst.c.day, daysInMonth(year, month)) + Math.trunc(dur.days) + Math.trunc(dur.weeks) * 7
  }, millisToAdd = Duration.fromObject({
    years: dur.years - Math.trunc(dur.years),
    quarters: dur.quarters - Math.trunc(dur.quarters),
    months: dur.months - Math.trunc(dur.months),
    weeks: dur.weeks - Math.trunc(dur.weeks),
    days: dur.days - Math.trunc(dur.days),
    hours: dur.hours,
    minutes: dur.minutes,
    seconds: dur.seconds,
    milliseconds: dur.milliseconds
  }).as("milliseconds"), localTS = objToLocalTS(c2);
  let [ts, o2] = fixOffset(localTS, oPre, inst.zone);
  if (millisToAdd !== 0) {
    ts += millisToAdd;
    o2 = inst.zone.offset(ts);
  }
  return { ts, o: o2 };
}
function parseDataToDateTime(parsed, parsedZone, opts, format, text, specificOffset) {
  const { setZone, zone } = opts;
  if (parsed && Object.keys(parsed).length !== 0 || parsedZone) {
    const interpretationZone = parsedZone || zone, inst = DateTime.fromObject(parsed, {
      ...opts,
      zone: interpretationZone,
      specificOffset
    });
    return setZone ? inst : inst.setZone(zone);
  } else {
    return DateTime.invalid(
      new Invalid("unparsable", `the input "${text}" can't be parsed as ${format}`)
    );
  }
}
function toTechFormat(dt, format, allowZ = true) {
  return dt.isValid ? Formatter.create(Locale.create("en-US"), {
    allowZ,
    forceSimple: true
  }).formatDateTimeFromString(dt, format) : null;
}
function toISODate(o2, extended, precision) {
  const longFormat = o2.c.year > 9999 || o2.c.year < 0;
  let c2 = "";
  if (longFormat && o2.c.year >= 0) c2 += "+";
  c2 += padStart(o2.c.year, longFormat ? 6 : 4);
  if (precision === "year") return c2;
  if (extended) {
    c2 += "-";
    c2 += padStart(o2.c.month);
    if (precision === "month") return c2;
    c2 += "-";
  } else {
    c2 += padStart(o2.c.month);
    if (precision === "month") return c2;
  }
  c2 += padStart(o2.c.day);
  return c2;
}
function toISOTime(o2, extended, suppressSeconds, suppressMilliseconds, includeOffset, extendedZone, precision) {
  let showSeconds = !suppressSeconds || o2.c.millisecond !== 0 || o2.c.second !== 0, c2 = "";
  switch (precision) {
    case "day":
    case "month":
    case "year":
      break;
    default:
      c2 += padStart(o2.c.hour);
      if (precision === "hour") break;
      if (extended) {
        c2 += ":";
        c2 += padStart(o2.c.minute);
        if (precision === "minute") break;
        if (showSeconds) {
          c2 += ":";
          c2 += padStart(o2.c.second);
        }
      } else {
        c2 += padStart(o2.c.minute);
        if (precision === "minute") break;
        if (showSeconds) {
          c2 += padStart(o2.c.second);
        }
      }
      if (precision === "second") break;
      if (showSeconds && (!suppressMilliseconds || o2.c.millisecond !== 0)) {
        c2 += ".";
        c2 += padStart(o2.c.millisecond, 3);
      }
  }
  if (includeOffset) {
    if (o2.isOffsetFixed && o2.offset === 0 && !extendedZone) {
      c2 += "Z";
    } else if (o2.o < 0) {
      c2 += "-";
      c2 += padStart(Math.trunc(-o2.o / 60));
      c2 += ":";
      c2 += padStart(Math.trunc(-o2.o % 60));
    } else {
      c2 += "+";
      c2 += padStart(Math.trunc(o2.o / 60));
      c2 += ":";
      c2 += padStart(Math.trunc(o2.o % 60));
    }
  }
  if (extendedZone) {
    c2 += "[" + o2.zone.ianaName + "]";
  }
  return c2;
}
const defaultUnitValues = {
  month: 1,
  day: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, defaultWeekUnitValues = {
  weekNumber: 1,
  weekday: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, defaultOrdinalUnitValues = {
  ordinal: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
};
const orderedUnits = ["year", "month", "day", "hour", "minute", "second", "millisecond"], orderedWeekUnits = [
  "weekYear",
  "weekNumber",
  "weekday",
  "hour",
  "minute",
  "second",
  "millisecond"
], orderedOrdinalUnits = ["year", "ordinal", "hour", "minute", "second", "millisecond"];
function normalizeUnit(unit) {
  const normalized = {
    year: "year",
    years: "year",
    month: "month",
    months: "month",
    day: "day",
    days: "day",
    hour: "hour",
    hours: "hour",
    minute: "minute",
    minutes: "minute",
    quarter: "quarter",
    quarters: "quarter",
    second: "second",
    seconds: "second",
    millisecond: "millisecond",
    milliseconds: "millisecond",
    weekday: "weekday",
    weekdays: "weekday",
    weeknumber: "weekNumber",
    weeksnumber: "weekNumber",
    weeknumbers: "weekNumber",
    weekyear: "weekYear",
    weekyears: "weekYear",
    ordinal: "ordinal"
  }[unit.toLowerCase()];
  if (!normalized) throw new InvalidUnitError(unit);
  return normalized;
}
function normalizeUnitWithLocalWeeks(unit) {
  switch (unit.toLowerCase()) {
    case "localweekday":
    case "localweekdays":
      return "localWeekday";
    case "localweeknumber":
    case "localweeknumbers":
      return "localWeekNumber";
    case "localweekyear":
    case "localweekyears":
      return "localWeekYear";
    default:
      return normalizeUnit(unit);
  }
}
function guessOffsetForZone(zone) {
  if (zoneOffsetTs === void 0) {
    zoneOffsetTs = Settings.now();
  }
  if (zone.type !== "iana") {
    return zone.offset(zoneOffsetTs);
  }
  const zoneName = zone.name;
  let offsetGuess = zoneOffsetGuessCache.get(zoneName);
  if (offsetGuess === void 0) {
    offsetGuess = zone.offset(zoneOffsetTs);
    zoneOffsetGuessCache.set(zoneName, offsetGuess);
  }
  return offsetGuess;
}
function quickDT(obj, opts) {
  const zone = normalizeZone(opts.zone, Settings.defaultZone);
  if (!zone.isValid) {
    return DateTime.invalid(unsupportedZone(zone));
  }
  const loc = Locale.fromObject(opts);
  let ts, o2;
  if (!isUndefined(obj.year)) {
    for (const u2 of orderedUnits) {
      if (isUndefined(obj[u2])) {
        obj[u2] = defaultUnitValues[u2];
      }
    }
    const invalid = hasInvalidGregorianData(obj) || hasInvalidTimeData(obj);
    if (invalid) {
      return DateTime.invalid(invalid);
    }
    const offsetProvis = guessOffsetForZone(zone);
    [ts, o2] = objToTS(obj, offsetProvis, zone);
  } else {
    ts = Settings.now();
  }
  return new DateTime({ ts, zone, loc, o: o2 });
}
function diffRelative(start, end, opts) {
  const round = isUndefined(opts.round) ? true : opts.round, rounding = isUndefined(opts.rounding) ? "trunc" : opts.rounding, format = (c2, unit) => {
    c2 = roundTo(c2, round || opts.calendary ? 0 : 2, opts.calendary ? "round" : rounding);
    const formatter = end.loc.clone(opts).relFormatter(opts);
    return formatter.format(c2, unit);
  }, differ = (unit) => {
    if (opts.calendary) {
      if (!end.hasSame(start, unit)) {
        return end.startOf(unit).diff(start.startOf(unit), unit).get(unit);
      } else return 0;
    } else {
      return end.diff(start, unit).get(unit);
    }
  };
  if (opts.unit) {
    return format(differ(opts.unit), opts.unit);
  }
  for (const unit of opts.units) {
    const count = differ(unit);
    if (Math.abs(count) >= 1) {
      return format(count, unit);
    }
  }
  return format(start > end ? -0 : 0, opts.units[opts.units.length - 1]);
}
function lastOpts(argList) {
  let opts = {}, args;
  if (argList.length > 0 && typeof argList[argList.length - 1] === "object") {
    opts = argList[argList.length - 1];
    args = Array.from(argList).slice(0, argList.length - 1);
  } else {
    args = Array.from(argList);
  }
  return [opts, args];
}
let zoneOffsetTs;
const zoneOffsetGuessCache = /* @__PURE__ */ new Map();
class DateTime {
  /**
   * @access private
   */
  constructor(config) {
    const zone = config.zone || Settings.defaultZone;
    let invalid = config.invalid || (Number.isNaN(config.ts) ? new Invalid("invalid input") : null) || (!zone.isValid ? unsupportedZone(zone) : null);
    this.ts = isUndefined(config.ts) ? Settings.now() : config.ts;
    let c2 = null, o2 = null;
    if (!invalid) {
      const unchanged = config.old && config.old.ts === this.ts && config.old.zone.equals(zone);
      if (unchanged) {
        [c2, o2] = [config.old.c, config.old.o];
      } else {
        const ot = isNumber(config.o) && !config.old ? config.o : zone.offset(this.ts);
        c2 = tsToObj(this.ts, ot);
        invalid = Number.isNaN(c2.year) ? new Invalid("invalid input") : null;
        c2 = invalid ? null : c2;
        o2 = invalid ? null : ot;
      }
    }
    this._zone = zone;
    this.loc = config.loc || Locale.create();
    this.invalid = invalid;
    this.weekData = null;
    this.localWeekData = null;
    this.c = c2;
    this.o = o2;
    this.isLuxonDateTime = true;
  }
  // CONSTRUCT
  /**
   * Create a DateTime for the current instant, in the system's time zone.
   *
   * Use Settings to override these default values if needed.
   * @example DateTime.now().toISO() //~> now in the ISO format
   * @return {DateTime}
   */
  static now() {
    return new DateTime({});
  }
  /**
   * Create a local DateTime
   * @param {number} [year] - The calendar year. If omitted (as in, call `local()` with no arguments), the current time will be used
   * @param {number} [month=1] - The month, 1-indexed
   * @param {number} [day=1] - The day of the month, 1-indexed
   * @param {number} [hour=0] - The hour of the day, in 24-hour time
   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
   * @example DateTime.local()                                  //~> now
   * @example DateTime.local({ zone: "America/New_York" })      //~> now, in US east coast time
   * @example DateTime.local(2017)                              //~> 2017-01-01T00:00:00
   * @example DateTime.local(2017, 3)                           //~> 2017-03-01T00:00:00
   * @example DateTime.local(2017, 3, 12, { locale: "fr" })     //~> 2017-03-12T00:00:00, with a French locale
   * @example DateTime.local(2017, 3, 12, 5)                    //~> 2017-03-12T05:00:00
   * @example DateTime.local(2017, 3, 12, 5, { zone: "utc" })   //~> 2017-03-12T05:00:00, in UTC
   * @example DateTime.local(2017, 3, 12, 5, 45)                //~> 2017-03-12T05:45:00
   * @example DateTime.local(2017, 3, 12, 5, 45, 10)            //~> 2017-03-12T05:45:10
   * @example DateTime.local(2017, 3, 12, 5, 45, 10, 765)       //~> 2017-03-12T05:45:10.765
   * @return {DateTime}
   */
  static local() {
    const [opts, args] = lastOpts(arguments), [year, month, day, hour, minute, second, millisecond] = args;
    return quickDT({ year, month, day, hour, minute, second, millisecond }, opts);
  }
  /**
   * Create a DateTime in UTC
   * @param {number} [year] - The calendar year. If omitted (as in, call `utc()` with no arguments), the current time will be used
   * @param {number} [month=1] - The month, 1-indexed
   * @param {number} [day=1] - The day of the month
   * @param {number} [hour=0] - The hour of the day, in 24-hour time
   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
   * @param {Object} options - configuration options for the DateTime
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} [options.outputCalendar] - the output calendar to set on the resulting DateTime instance
   * @param {string} [options.numberingSystem] - the numbering system to set on the resulting DateTime instance
   * @param {string} [options.weekSettings] - the week settings to set on the resulting DateTime instance
   * @example DateTime.utc()                                              //~> now
   * @example DateTime.utc(2017)                                          //~> 2017-01-01T00:00:00Z
   * @example DateTime.utc(2017, 3)                                       //~> 2017-03-01T00:00:00Z
   * @example DateTime.utc(2017, 3, 12)                                   //~> 2017-03-12T00:00:00Z
   * @example DateTime.utc(2017, 3, 12, 5)                                //~> 2017-03-12T05:00:00Z
   * @example DateTime.utc(2017, 3, 12, 5, 45)                            //~> 2017-03-12T05:45:00Z
   * @example DateTime.utc(2017, 3, 12, 5, 45, { locale: "fr" })          //~> 2017-03-12T05:45:00Z with a French locale
   * @example DateTime.utc(2017, 3, 12, 5, 45, 10)                        //~> 2017-03-12T05:45:10Z
   * @example DateTime.utc(2017, 3, 12, 5, 45, 10, 765, { locale: "fr" }) //~> 2017-03-12T05:45:10.765Z with a French locale
   * @return {DateTime}
   */
  static utc() {
    const [opts, args] = lastOpts(arguments), [year, month, day, hour, minute, second, millisecond] = args;
    opts.zone = FixedOffsetZone.utcInstance;
    return quickDT({ year, month, day, hour, minute, second, millisecond }, opts);
  }
  /**
   * Create a DateTime from a JavaScript Date object. Uses the default zone.
   * @param {Date} date - a JavaScript Date object
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @return {DateTime}
   */
  static fromJSDate(date, options = {}) {
    const ts = isDate(date) ? date.valueOf() : NaN;
    if (Number.isNaN(ts)) {
      return DateTime.invalid("invalid input");
    }
    const zoneToUse = normalizeZone(options.zone, Settings.defaultZone);
    if (!zoneToUse.isValid) {
      return DateTime.invalid(unsupportedZone(zoneToUse));
    }
    return new DateTime({
      ts,
      zone: zoneToUse,
      loc: Locale.fromObject(options)
    });
  }
  /**
   * Create a DateTime from a number of milliseconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
   * @param {number} milliseconds - a number of milliseconds since 1970 UTC
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @param {string} options.weekSettings - the week settings to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromMillis(milliseconds, options = {}) {
    if (!isNumber(milliseconds)) {
      throw new InvalidArgumentError(
        `fromMillis requires a numerical input, but received a ${typeof milliseconds} with value ${milliseconds}`
      );
    } else if (milliseconds < -MAX_DATE || milliseconds > MAX_DATE) {
      return DateTime.invalid("Timestamp out of range");
    } else {
      return new DateTime({
        ts: milliseconds,
        zone: normalizeZone(options.zone, Settings.defaultZone),
        loc: Locale.fromObject(options)
      });
    }
  }
  /**
   * Create a DateTime from a number of seconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
   * @param {number} seconds - a number of seconds since 1970 UTC
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @param {string} options.weekSettings - the week settings to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromSeconds(seconds, options = {}) {
    if (!isNumber(seconds)) {
      throw new InvalidArgumentError("fromSeconds requires a numerical input");
    } else {
      return new DateTime({
        ts: seconds * 1e3,
        zone: normalizeZone(options.zone, Settings.defaultZone),
        loc: Locale.fromObject(options)
      });
    }
  }
  /**
   * Create a DateTime from a JavaScript object with keys like 'year' and 'hour' with reasonable defaults.
   * @param {Object} obj - the object to create the DateTime from
   * @param {number} obj.year - a year, such as 1987
   * @param {number} obj.month - a month, 1-12
   * @param {number} obj.day - a day of the month, 1-31, depending on the month
   * @param {number} obj.ordinal - day of the year, 1-365 or 366
   * @param {number} obj.weekYear - an ISO week year
   * @param {number} obj.weekNumber - an ISO week number, between 1 and 52 or 53, depending on the year
   * @param {number} obj.weekday - an ISO weekday, 1-7, where 1 is Monday and 7 is Sunday
   * @param {number} obj.localWeekYear - a week year, according to the locale
   * @param {number} obj.localWeekNumber - a week number, between 1 and 52 or 53, depending on the year, according to the locale
   * @param {number} obj.localWeekday - a weekday, 1-7, where 1 is the first and 7 is the last day of the week, according to the locale
   * @param {number} obj.hour - hour of the day, 0-23
   * @param {number} obj.minute - minute of the hour, 0-59
   * @param {number} obj.second - second of the minute, 0-59
   * @param {number} obj.millisecond - millisecond of the second, 0-999
   * @param {Object} opts - options for creating this DateTime
   * @param {string|Zone} [opts.zone='local'] - interpret the numbers in the context of a particular zone. Can take any value taken as the first argument to setZone()
   * @param {string} [opts.locale='system\'s locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
   * @example DateTime.fromObject({ year: 1982, month: 5, day: 25}).toISODate() //=> '1982-05-25'
   * @example DateTime.fromObject({ year: 1982 }).toISODate() //=> '1982-01-01'
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }) //~> today at 10:26:06
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'utc' }),
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'local' })
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'America/New_York' })
   * @example DateTime.fromObject({ weekYear: 2016, weekNumber: 2, weekday: 3 }).toISODate() //=> '2016-01-13'
   * @example DateTime.fromObject({ localWeekYear: 2022, localWeekNumber: 1, localWeekday: 1 }, { locale: "en-US" }).toISODate() //=> '2021-12-26'
   * @return {DateTime}
   */
  static fromObject(obj, opts = {}) {
    obj = obj || {};
    const zoneToUse = normalizeZone(opts.zone, Settings.defaultZone);
    if (!zoneToUse.isValid) {
      return DateTime.invalid(unsupportedZone(zoneToUse));
    }
    const loc = Locale.fromObject(opts);
    const normalized = normalizeObject(obj, normalizeUnitWithLocalWeeks);
    const { minDaysInFirstWeek, startOfWeek } = usesLocalWeekValues(normalized, loc);
    const tsNow = Settings.now(), offsetProvis = !isUndefined(opts.specificOffset) ? opts.specificOffset : zoneToUse.offset(tsNow), containsOrdinal = !isUndefined(normalized.ordinal), containsGregorYear = !isUndefined(normalized.year), containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day), containsGregor = containsGregorYear || containsGregorMD, definiteWeekDef = normalized.weekYear || normalized.weekNumber;
    if ((containsGregor || containsOrdinal) && definiteWeekDef) {
      throw new ConflictingSpecificationError(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      );
    }
    if (containsGregorMD && containsOrdinal) {
      throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
    }
    const useWeekData = definiteWeekDef || normalized.weekday && !containsGregor;
    let units, defaultValues, objNow = tsToObj(tsNow, offsetProvis);
    if (useWeekData) {
      units = orderedWeekUnits;
      defaultValues = defaultWeekUnitValues;
      objNow = gregorianToWeek(objNow, minDaysInFirstWeek, startOfWeek);
    } else if (containsOrdinal) {
      units = orderedOrdinalUnits;
      defaultValues = defaultOrdinalUnitValues;
      objNow = gregorianToOrdinal(objNow);
    } else {
      units = orderedUnits;
      defaultValues = defaultUnitValues;
    }
    let foundFirst = false;
    for (const u2 of units) {
      const v2 = normalized[u2];
      if (!isUndefined(v2)) {
        foundFirst = true;
      } else if (foundFirst) {
        normalized[u2] = defaultValues[u2];
      } else {
        normalized[u2] = objNow[u2];
      }
    }
    const higherOrderInvalid = useWeekData ? hasInvalidWeekData(normalized, minDaysInFirstWeek, startOfWeek) : containsOrdinal ? hasInvalidOrdinalData(normalized) : hasInvalidGregorianData(normalized), invalid = higherOrderInvalid || hasInvalidTimeData(normalized);
    if (invalid) {
      return DateTime.invalid(invalid);
    }
    const gregorian = useWeekData ? weekToGregorian(normalized, minDaysInFirstWeek, startOfWeek) : containsOrdinal ? ordinalToGregorian(normalized) : normalized, [tsFinal, offsetFinal] = objToTS(gregorian, offsetProvis, zoneToUse), inst = new DateTime({
      ts: tsFinal,
      zone: zoneToUse,
      o: offsetFinal,
      loc
    });
    if (normalized.weekday && containsGregor && obj.weekday !== inst.weekday) {
      return DateTime.invalid(
        "mismatched weekday",
        `you can't specify both a weekday of ${normalized.weekday} and a date of ${inst.toISO()}`
      );
    }
    if (!inst.isValid) {
      return DateTime.invalid(inst.invalid);
    }
    return inst;
  }
  /**
   * Create a DateTime from an ISO 8601 string
   * @param {string} text - the ISO string
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the time to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} [opts.outputCalendar] - the output calendar to set on the resulting DateTime instance
   * @param {string} [opts.numberingSystem] - the numbering system to set on the resulting DateTime instance
   * @param {string} [opts.weekSettings] - the week settings to set on the resulting DateTime instance
   * @example DateTime.fromISO('2016-05-25T09:08:34.123')
   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00')
   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00', {setZone: true})
   * @example DateTime.fromISO('2016-05-25T09:08:34.123', {zone: 'utc'})
   * @example DateTime.fromISO('2016-W05-4')
   * @return {DateTime}
   */
  static fromISO(text, opts = {}) {
    const [vals, parsedZone] = parseISODate(text);
    return parseDataToDateTime(vals, parsedZone, opts, "ISO 8601", text);
  }
  /**
   * Create a DateTime from an RFC 2822 string
   * @param {string} text - the RFC 2822 string
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since the offset is always specified in the string itself, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
   * @example DateTime.fromRFC2822('25 Nov 2016 13:23:12 GMT')
   * @example DateTime.fromRFC2822('Fri, 25 Nov 2016 13:23:12 +0600')
   * @example DateTime.fromRFC2822('25 Nov 2016 13:23 Z')
   * @return {DateTime}
   */
  static fromRFC2822(text, opts = {}) {
    const [vals, parsedZone] = parseRFC2822Date(text);
    return parseDataToDateTime(vals, parsedZone, opts, "RFC 2822", text);
  }
  /**
   * Create a DateTime from an HTTP header date
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
   * @param {string} text - the HTTP header date
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since HTTP dates are always in UTC, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
   * @param {boolean} [opts.setZone=false] - override the zone with the fixed-offset zone specified in the string. For HTTP dates, this is always UTC, so this option is equivalent to setting the `zone` option to 'utc', but this option is included for consistency with similar methods.
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
   * @example DateTime.fromHTTP('Sun, 06 Nov 1994 08:49:37 GMT')
   * @example DateTime.fromHTTP('Sunday, 06-Nov-94 08:49:37 GMT')
   * @example DateTime.fromHTTP('Sun Nov  6 08:49:37 1994')
   * @return {DateTime}
   */
  static fromHTTP(text, opts = {}) {
    const [vals, parsedZone] = parseHTTPDate(text);
    return parseDataToDateTime(vals, parsedZone, opts, "HTTP", opts);
  }
  /**
   * Create a DateTime from an input string and format string.
   * Defaults to en-US if no locale has been specified, regardless of the system's locale. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/parsing?id=table-of-tokens).
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see the link below for the formats)
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromFormat(text, fmt, opts = {}) {
    if (isUndefined(text) || isUndefined(fmt)) {
      throw new InvalidArgumentError("fromFormat requires an input string and a format");
    }
    const { locale = null, numberingSystem = null } = opts, localeToUse = Locale.fromOpts({
      locale,
      numberingSystem,
      defaultToEN: true
    }), [vals, parsedZone, specificOffset, invalid] = parseFromTokens(localeToUse, text, fmt);
    if (invalid) {
      return DateTime.invalid(invalid);
    } else {
      return parseDataToDateTime(vals, parsedZone, opts, `format ${fmt}`, text, specificOffset);
    }
  }
  /**
   * @deprecated use fromFormat instead
   */
  static fromString(text, fmt, opts = {}) {
    return DateTime.fromFormat(text, fmt, opts);
  }
  /**
   * Create a DateTime from a SQL date, time, or datetime
   * Defaults to en-US if no locale has been specified, regardless of the system's locale
   * @param {string} text - the string to parse
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @example DateTime.fromSQL('2017-05-15')
   * @example DateTime.fromSQL('2017-05-15 09:12:34')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342+06:00')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles', { setZone: true })
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342', { zone: 'America/Los_Angeles' })
   * @example DateTime.fromSQL('09:12:34.342')
   * @return {DateTime}
   */
  static fromSQL(text, opts = {}) {
    const [vals, parsedZone] = parseSQL(text);
    return parseDataToDateTime(vals, parsedZone, opts, "SQL", text);
  }
  /**
   * Create an invalid DateTime.
   * @param {string} reason - simple string of why this DateTime is invalid. Should not contain parameters or anything else data-dependent.
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {DateTime}
   */
  static invalid(reason, explanation = null) {
    if (!reason) {
      throw new InvalidArgumentError("need to specify a reason the DateTime is invalid");
    }
    const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
    if (Settings.throwOnInvalid) {
      throw new InvalidDateTimeError(invalid);
    } else {
      return new DateTime({ invalid });
    }
  }
  /**
   * Check if an object is an instance of DateTime. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isDateTime(o2) {
    return o2 && o2.isLuxonDateTime || false;
  }
  /**
   * Produce the format string for a set of options
   * @param formatOpts
   * @param localeOpts
   * @returns {string}
   */
  static parseFormatForOpts(formatOpts, localeOpts = {}) {
    const tokenList = formatOptsToTokens(formatOpts, Locale.fromObject(localeOpts));
    return !tokenList ? null : tokenList.map((t2) => t2 ? t2.val : null).join("");
  }
  /**
   * Produce the the fully expanded format token for the locale
   * Does NOT quote characters, so quoted tokens will not round trip correctly
   * @param fmt
   * @param localeOpts
   * @returns {string}
   */
  static expandFormat(fmt, localeOpts = {}) {
    const expanded = expandMacroTokens(Formatter.parseFormat(fmt), Locale.fromObject(localeOpts));
    return expanded.map((t2) => t2.val).join("");
  }
  static resetCache() {
    zoneOffsetTs = void 0;
    zoneOffsetGuessCache.clear();
  }
  // INFO
  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example DateTime.local(2017, 7, 4).get('month'); //=> 7
   * @example DateTime.local(2017, 7, 4).get('day'); //=> 4
   * @return {number}
   */
  get(unit) {
    return this[unit];
  }
  /**
   * Returns whether the DateTime is valid. Invalid DateTimes occur when:
   * * The DateTime was created from invalid calendar information, such as the 13th month or February 30
   * * The DateTime was created by an operation on another invalid date
   * @type {boolean}
   */
  get isValid() {
    return this.invalid === null;
  }
  /**
   * Returns an error code if this DateTime is invalid, or null if the DateTime is valid
   * @type {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  /**
   * Returns an explanation of why this DateTime became invalid, or null if the DateTime is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  /**
   * Get the locale of a DateTime, such 'en-GB'. The locale is used when formatting the DateTime
   *
   * @type {string}
   */
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }
  /**
   * Get the numbering system of a DateTime, such 'beng'. The numbering system is used when formatting the DateTime
   *
   * @type {string}
   */
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }
  /**
   * Get the output calendar of a DateTime, such 'islamic'. The output calendar is used when formatting the DateTime
   *
   * @type {string}
   */
  get outputCalendar() {
    return this.isValid ? this.loc.outputCalendar : null;
  }
  /**
   * Get the time zone associated with this DateTime.
   * @type {Zone}
   */
  get zone() {
    return this._zone;
  }
  /**
   * Get the name of the time zone.
   * @type {string}
   */
  get zoneName() {
    return this.isValid ? this.zone.name : null;
  }
  /**
   * Get the year
   * @example DateTime.local(2017, 5, 25).year //=> 2017
   * @type {number}
   */
  get year() {
    return this.isValid ? this.c.year : NaN;
  }
  /**
   * Get the quarter
   * @example DateTime.local(2017, 5, 25).quarter //=> 2
   * @type {number}
   */
  get quarter() {
    return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
  }
  /**
   * Get the month (1-12).
   * @example DateTime.local(2017, 5, 25).month //=> 5
   * @type {number}
   */
  get month() {
    return this.isValid ? this.c.month : NaN;
  }
  /**
   * Get the day of the month (1-30ish).
   * @example DateTime.local(2017, 5, 25).day //=> 25
   * @type {number}
   */
  get day() {
    return this.isValid ? this.c.day : NaN;
  }
  /**
   * Get the hour of the day (0-23).
   * @example DateTime.local(2017, 5, 25, 9).hour //=> 9
   * @type {number}
   */
  get hour() {
    return this.isValid ? this.c.hour : NaN;
  }
  /**
   * Get the minute of the hour (0-59).
   * @example DateTime.local(2017, 5, 25, 9, 30).minute //=> 30
   * @type {number}
   */
  get minute() {
    return this.isValid ? this.c.minute : NaN;
  }
  /**
   * Get the second of the minute (0-59).
   * @example DateTime.local(2017, 5, 25, 9, 30, 52).second //=> 52
   * @type {number}
   */
  get second() {
    return this.isValid ? this.c.second : NaN;
  }
  /**
   * Get the millisecond of the second (0-999).
   * @example DateTime.local(2017, 5, 25, 9, 30, 52, 654).millisecond //=> 654
   * @type {number}
   */
  get millisecond() {
    return this.isValid ? this.c.millisecond : NaN;
  }
  /**
   * Get the week year
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2014, 12, 31).weekYear //=> 2015
   * @type {number}
   */
  get weekYear() {
    return this.isValid ? possiblyCachedWeekData(this).weekYear : NaN;
  }
  /**
   * Get the week number of the week year (1-52ish).
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2017, 5, 25).weekNumber //=> 21
   * @type {number}
   */
  get weekNumber() {
    return this.isValid ? possiblyCachedWeekData(this).weekNumber : NaN;
  }
  /**
   * Get the day of the week.
   * 1 is Monday and 7 is Sunday
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2014, 11, 31).weekday //=> 4
   * @type {number}
   */
  get weekday() {
    return this.isValid ? possiblyCachedWeekData(this).weekday : NaN;
  }
  /**
   * Returns true if this date is on a weekend according to the locale, false otherwise
   * @returns {boolean}
   */
  get isWeekend() {
    return this.isValid && this.loc.getWeekendDays().includes(this.weekday);
  }
  /**
   * Get the day of the week according to the locale.
   * 1 is the first day of the week and 7 is the last day of the week.
   * If the locale assigns Sunday as the first day of the week, then a date which is a Sunday will return 1,
   * @returns {number}
   */
  get localWeekday() {
    return this.isValid ? possiblyCachedLocalWeekData(this).weekday : NaN;
  }
  /**
   * Get the week number of the week year according to the locale. Different locales assign week numbers differently,
   * because the week can start on different days of the week (see localWeekday) and because a different number of days
   * is required for a week to count as the first week of a year.
   * @returns {number}
   */
  get localWeekNumber() {
    return this.isValid ? possiblyCachedLocalWeekData(this).weekNumber : NaN;
  }
  /**
   * Get the week year according to the locale. Different locales assign week numbers (and therefor week years)
   * differently, see localWeekNumber.
   * @returns {number}
   */
  get localWeekYear() {
    return this.isValid ? possiblyCachedLocalWeekData(this).weekYear : NaN;
  }
  /**
   * Get the ordinal (meaning the day of the year)
   * @example DateTime.local(2017, 5, 25).ordinal //=> 145
   * @type {number|DateTime}
   */
  get ordinal() {
    return this.isValid ? gregorianToOrdinal(this.c).ordinal : NaN;
  }
  /**
   * Get the human readable short month name, such as 'Oct'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthShort //=> Oct
   * @type {string}
   */
  get monthShort() {
    return this.isValid ? Info.months("short", { locObj: this.loc })[this.month - 1] : null;
  }
  /**
   * Get the human readable long month name, such as 'October'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthLong //=> October
   * @type {string}
   */
  get monthLong() {
    return this.isValid ? Info.months("long", { locObj: this.loc })[this.month - 1] : null;
  }
  /**
   * Get the human readable short weekday, such as 'Mon'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).weekdayShort //=> Mon
   * @type {string}
   */
  get weekdayShort() {
    return this.isValid ? Info.weekdays("short", { locObj: this.loc })[this.weekday - 1] : null;
  }
  /**
   * Get the human readable long weekday, such as 'Monday'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).weekdayLong //=> Monday
   * @type {string}
   */
  get weekdayLong() {
    return this.isValid ? Info.weekdays("long", { locObj: this.loc })[this.weekday - 1] : null;
  }
  /**
   * Get the UTC offset of this DateTime in minutes
   * @example DateTime.now().offset //=> -240
   * @example DateTime.utc().offset //=> 0
   * @type {number}
   */
  get offset() {
    return this.isValid ? +this.o : NaN;
  }
  /**
   * Get the short human name for the zone's current offset, for example "EST" or "EDT".
   * Defaults to the system's locale if no locale has been specified
   * @type {string}
   */
  get offsetNameShort() {
    if (this.isValid) {
      return this.zone.offsetName(this.ts, {
        format: "short",
        locale: this.locale
      });
    } else {
      return null;
    }
  }
  /**
   * Get the long human name for the zone's current offset, for example "Eastern Standard Time" or "Eastern Daylight Time".
   * Defaults to the system's locale if no locale has been specified
   * @type {string}
   */
  get offsetNameLong() {
    if (this.isValid) {
      return this.zone.offsetName(this.ts, {
        format: "long",
        locale: this.locale
      });
    } else {
      return null;
    }
  }
  /**
   * Get whether this zone's offset ever changes, as in a DST.
   * @type {boolean}
   */
  get isOffsetFixed() {
    return this.isValid ? this.zone.isUniversal : null;
  }
  /**
   * Get whether the DateTime is in a DST.
   * @type {boolean}
   */
  get isInDST() {
    if (this.isOffsetFixed) {
      return false;
    } else {
      return this.offset > this.set({ month: 1, day: 1 }).offset || this.offset > this.set({ month: 5 }).offset;
    }
  }
  /**
   * Get those DateTimes which have the same local time as this DateTime, but a different offset from UTC
   * in this DateTime's zone. During DST changes local time can be ambiguous, for example
   * `2023-10-29T02:30:00` in `Europe/Berlin` can have offset `+01:00` or `+02:00`.
   * This method will return both possible DateTimes if this DateTime's local time is ambiguous.
   * @returns {DateTime[]}
   */
  getPossibleOffsets() {
    if (!this.isValid || this.isOffsetFixed) {
      return [this];
    }
    const dayMs = 864e5;
    const minuteMs = 6e4;
    const localTS = objToLocalTS(this.c);
    const oEarlier = this.zone.offset(localTS - dayMs);
    const oLater = this.zone.offset(localTS + dayMs);
    const o1 = this.zone.offset(localTS - oEarlier * minuteMs);
    const o2 = this.zone.offset(localTS - oLater * minuteMs);
    if (o1 === o2) {
      return [this];
    }
    const ts1 = localTS - o1 * minuteMs;
    const ts2 = localTS - o2 * minuteMs;
    const c1 = tsToObj(ts1, o1);
    const c2 = tsToObj(ts2, o2);
    if (c1.hour === c2.hour && c1.minute === c2.minute && c1.second === c2.second && c1.millisecond === c2.millisecond) {
      return [clone(this, { ts: ts1 }), clone(this, { ts: ts2 })];
    }
    return [this];
  }
  /**
   * Returns true if this DateTime is in a leap year, false otherwise
   * @example DateTime.local(2016).isInLeapYear //=> true
   * @example DateTime.local(2013).isInLeapYear //=> false
   * @type {boolean}
   */
  get isInLeapYear() {
    return isLeapYear(this.year);
  }
  /**
   * Returns the number of days in this DateTime's month
   * @example DateTime.local(2016, 2).daysInMonth //=> 29
   * @example DateTime.local(2016, 3).daysInMonth //=> 31
   * @type {number}
   */
  get daysInMonth() {
    return daysInMonth(this.year, this.month);
  }
  /**
   * Returns the number of days in this DateTime's year
   * @example DateTime.local(2016).daysInYear //=> 366
   * @example DateTime.local(2013).daysInYear //=> 365
   * @type {number}
   */
  get daysInYear() {
    return this.isValid ? daysInYear(this.year) : NaN;
  }
  /**
   * Returns the number of weeks in this DateTime's year
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2004).weeksInWeekYear //=> 53
   * @example DateTime.local(2013).weeksInWeekYear //=> 52
   * @type {number}
   */
  get weeksInWeekYear() {
    return this.isValid ? weeksInWeekYear(this.weekYear) : NaN;
  }
  /**
   * Returns the number of weeks in this DateTime's local week year
   * @example DateTime.local(2020, 6, {locale: 'en-US'}).weeksInLocalWeekYear //=> 52
   * @example DateTime.local(2020, 6, {locale: 'de-DE'}).weeksInLocalWeekYear //=> 53
   * @type {number}
   */
  get weeksInLocalWeekYear() {
    return this.isValid ? weeksInWeekYear(
      this.localWeekYear,
      this.loc.getMinDaysInFirstWeek(),
      this.loc.getStartOfWeek()
    ) : NaN;
  }
  /**
   * Returns the resolved Intl options for this DateTime.
   * This is useful in understanding the behavior of formatting methods
   * @param {Object} opts - the same options as toLocaleString
   * @return {Object}
   */
  resolvedLocaleOptions(opts = {}) {
    const { locale, numberingSystem, calendar } = Formatter.create(
      this.loc.clone(opts),
      opts
    ).resolvedOptions(this);
    return { locale, numberingSystem, outputCalendar: calendar };
  }
  // TRANSFORM
  /**
   * "Set" the DateTime's zone to UTC. Returns a newly-constructed DateTime.
   *
   * Equivalent to {@link DateTime#setZone}('utc')
   * @param {number} [offset=0] - optionally, an offset from UTC in minutes
   * @param {Object} [opts={}] - options to pass to `setZone()`
   * @return {DateTime}
   */
  toUTC(offset2 = 0, opts = {}) {
    return this.setZone(FixedOffsetZone.instance(offset2), opts);
  }
  /**
   * "Set" the DateTime's zone to the host's local zone. Returns a newly-constructed DateTime.
   *
   * Equivalent to `setZone('local')`
   * @return {DateTime}
   */
  toLocal() {
    return this.setZone(Settings.defaultZone);
  }
  /**
   * "Set" the DateTime's zone to specified zone. Returns a newly-constructed DateTime.
   *
   * By default, the setter keeps the underlying time the same (as in, the same timestamp), but the new instance will report different local times and consider DSTs when making computations, as with {@link DateTime#plus}. You may wish to use {@link DateTime#toLocal} and {@link DateTime#toUTC} which provide simple convenience wrappers for commonly used zones.
   * @param {string|Zone} [zone='local'] - a zone identifier. As a string, that can be any IANA zone supported by the host environment, or a fixed-offset name of the form 'UTC+3', or the strings 'local' or 'utc'. You may also supply an instance of a {@link DateTime#Zone} class.
   * @param {Object} opts - options
   * @param {boolean} [opts.keepLocalTime=false] - If true, adjust the underlying time so that the local time stays the same, but in the target zone. You should rarely need this.
   * @return {DateTime}
   */
  setZone(zone, { keepLocalTime = false, keepCalendarTime = false } = {}) {
    zone = normalizeZone(zone, Settings.defaultZone);
    if (zone.equals(this.zone)) {
      return this;
    } else if (!zone.isValid) {
      return DateTime.invalid(unsupportedZone(zone));
    } else {
      let newTS = this.ts;
      if (keepLocalTime || keepCalendarTime) {
        const offsetGuess = zone.offset(this.ts);
        const asObj = this.toObject();
        [newTS] = objToTS(asObj, offsetGuess, zone);
      }
      return clone(this, { ts: newTS, zone });
    }
  }
  /**
   * "Set" the locale, numberingSystem, or outputCalendar. Returns a newly-constructed DateTime.
   * @param {Object} properties - the properties to set
   * @example DateTime.local(2017, 5, 25).reconfigure({ locale: 'en-GB' })
   * @return {DateTime}
   */
  reconfigure({ locale, numberingSystem, outputCalendar } = {}) {
    const loc = this.loc.clone({ locale, numberingSystem, outputCalendar });
    return clone(this, { loc });
  }
  /**
   * "Set" the locale. Returns a newly-constructed DateTime.
   * Just a convenient alias for reconfigure({ locale })
   * @example DateTime.local(2017, 5, 25).setLocale('en-GB')
   * @return {DateTime}
   */
  setLocale(locale) {
    return this.reconfigure({ locale });
  }
  /**
   * "Set" the values of specified units. Returns a newly-constructed DateTime.
   * You can only set units with this method; for "setting" metadata, see {@link DateTime#reconfigure} and {@link DateTime#setZone}.
   *
   * This method also supports setting locale-based week units, i.e. `localWeekday`, `localWeekNumber` and `localWeekYear`.
   * They cannot be mixed with ISO-week units like `weekday`.
   * @param {Object} values - a mapping of units to numbers
   * @example dt.set({ year: 2017 })
   * @example dt.set({ hour: 8, minute: 30 })
   * @example dt.set({ weekday: 5 })
   * @example dt.set({ year: 2005, ordinal: 234 })
   * @return {DateTime}
   */
  set(values) {
    if (!this.isValid) return this;
    const normalized = normalizeObject(values, normalizeUnitWithLocalWeeks);
    const { minDaysInFirstWeek, startOfWeek } = usesLocalWeekValues(normalized, this.loc);
    const settingWeekStuff = !isUndefined(normalized.weekYear) || !isUndefined(normalized.weekNumber) || !isUndefined(normalized.weekday), containsOrdinal = !isUndefined(normalized.ordinal), containsGregorYear = !isUndefined(normalized.year), containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day), containsGregor = containsGregorYear || containsGregorMD, definiteWeekDef = normalized.weekYear || normalized.weekNumber;
    if ((containsGregor || containsOrdinal) && definiteWeekDef) {
      throw new ConflictingSpecificationError(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      );
    }
    if (containsGregorMD && containsOrdinal) {
      throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
    }
    let mixed;
    if (settingWeekStuff) {
      mixed = weekToGregorian(
        { ...gregorianToWeek(this.c, minDaysInFirstWeek, startOfWeek), ...normalized },
        minDaysInFirstWeek,
        startOfWeek
      );
    } else if (!isUndefined(normalized.ordinal)) {
      mixed = ordinalToGregorian({ ...gregorianToOrdinal(this.c), ...normalized });
    } else {
      mixed = { ...this.toObject(), ...normalized };
      if (isUndefined(normalized.day)) {
        mixed.day = Math.min(daysInMonth(mixed.year, mixed.month), mixed.day);
      }
    }
    const [ts, o2] = objToTS(mixed, this.o, this.zone);
    return clone(this, { ts, o: o2 });
  }
  /**
   * Add a period of time to this DateTime and return the resulting DateTime
   *
   * Adding hours, minutes, seconds, or milliseconds increases the timestamp by the right number of milliseconds. Adding days, months, or years shifts the calendar, accounting for DSTs and leap years along the way. Thus, `dt.plus({ hours: 24 })` may result in a different time than `dt.plus({ days: 1 })` if there's a DST shift in between.
   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @example DateTime.now().plus(123) //~> in 123 milliseconds
   * @example DateTime.now().plus({ minutes: 15 }) //~> in 15 minutes
   * @example DateTime.now().plus({ days: 1 }) //~> this time tomorrow
   * @example DateTime.now().plus({ days: -1 }) //~> this time yesterday
   * @example DateTime.now().plus({ hours: 3, minutes: 13 }) //~> in 3 hr, 13 min
   * @example DateTime.now().plus(Duration.fromObject({ hours: 3, minutes: 13 })) //~> in 3 hr, 13 min
   * @return {DateTime}
   */
  plus(duration) {
    if (!this.isValid) return this;
    const dur = Duration.fromDurationLike(duration);
    return clone(this, adjustTime(this, dur));
  }
  /**
   * Subtract a period of time to this DateTime and return the resulting DateTime
   * See {@link DateTime#plus}
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   @return {DateTime}
   */
  minus(duration) {
    if (!this.isValid) return this;
    const dur = Duration.fromDurationLike(duration).negate();
    return clone(this, adjustTime(this, dur));
  }
  /**
   * "Set" this DateTime to the beginning of a unit of time.
   * @param {string} unit - The unit to go to the beginning of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week
   * @example DateTime.local(2014, 3, 3).startOf('month').toISODate(); //=> '2014-03-01'
   * @example DateTime.local(2014, 3, 3).startOf('year').toISODate(); //=> '2014-01-01'
   * @example DateTime.local(2014, 3, 3).startOf('week').toISODate(); //=> '2014-03-03', weeks always start on Mondays
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('day').toISOTime(); //=> '00:00.000-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('hour').toISOTime(); //=> '05:00:00.000-05:00'
   * @return {DateTime}
   */
  startOf(unit, { useLocaleWeeks = false } = {}) {
    if (!this.isValid) return this;
    const o2 = {}, normalizedUnit = Duration.normalizeUnit(unit);
    switch (normalizedUnit) {
      case "years":
        o2.month = 1;
      // falls through
      case "quarters":
      case "months":
        o2.day = 1;
      // falls through
      case "weeks":
      case "days":
        o2.hour = 0;
      // falls through
      case "hours":
        o2.minute = 0;
      // falls through
      case "minutes":
        o2.second = 0;
      // falls through
      case "seconds":
        o2.millisecond = 0;
        break;
    }
    if (normalizedUnit === "weeks") {
      if (useLocaleWeeks) {
        const startOfWeek = this.loc.getStartOfWeek();
        const { weekday } = this;
        if (weekday < startOfWeek) {
          o2.weekNumber = this.weekNumber - 1;
        }
        o2.weekday = startOfWeek;
      } else {
        o2.weekday = 1;
      }
    }
    if (normalizedUnit === "quarters") {
      const q = Math.ceil(this.month / 3);
      o2.month = (q - 1) * 3 + 1;
    }
    return this.set(o2);
  }
  /**
   * "Set" this DateTime to the end (meaning the last millisecond) of a unit of time
   * @param {string} unit - The unit to go to the end of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week
   * @example DateTime.local(2014, 3, 3).endOf('month').toISO(); //=> '2014-03-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3).endOf('year').toISO(); //=> '2014-12-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3).endOf('week').toISO(); // => '2014-03-09T23:59:59.999-05:00', weeks start on Mondays
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('day').toISO(); //=> '2014-03-03T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('hour').toISO(); //=> '2014-03-03T05:59:59.999-05:00'
   * @return {DateTime}
   */
  endOf(unit, opts) {
    return this.isValid ? this.plus({ [unit]: 1 }).startOf(unit, opts).minus(1) : this;
  }
  // OUTPUT
  /**
   * Returns a string representation of this DateTime formatted according to the specified format string.
   * **You may not want this.** See {@link DateTime#toLocaleString} for a more flexible formatting tool. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/formatting?id=table-of-tokens).
   * Defaults to en-US if no locale has been specified, regardless of the system's locale.
   * @param {string} fmt - the format string
   * @param {Object} opts - opts to override the configuration options on this DateTime
   * @example DateTime.now().toFormat('yyyy LLL dd') //=> '2017 Apr 22'
   * @example DateTime.now().setLocale('fr').toFormat('yyyy LLL dd') //=> '2017 avr. 22'
   * @example DateTime.now().toFormat('yyyy LLL dd', { locale: "fr" }) //=> '2017 avr. 22'
   * @example DateTime.now().toFormat("HH 'hours and' mm 'minutes'") //=> '20 hours and 55 minutes'
   * @return {string}
   */
  toFormat(fmt, opts = {}) {
    return this.isValid ? Formatter.create(this.loc.redefaultToEN(opts)).formatDateTimeFromString(this, fmt) : INVALID;
  }
  /**
   * Returns a localized string representing this date. Accepts the same options as the Intl.DateTimeFormat constructor and any presets defined by Luxon, such as `DateTime.DATE_FULL` or `DateTime.TIME_SIMPLE`.
   * The exact behavior of this method is browser-specific, but in general it will return an appropriate representation
   * of the DateTime in the assigned locale.
   * Defaults to the system's locale if no locale has been specified
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param formatOpts {Object} - Intl.DateTimeFormat constructor options and configuration options
   * @param {Object} opts - opts to override the configuration options on this DateTime
   * @example DateTime.now().toLocaleString(); //=> 4/20/2017
   * @example DateTime.now().setLocale('en-gb').toLocaleString(); //=> '20/04/2017'
   * @example DateTime.now().toLocaleString(DateTime.DATE_FULL); //=> 'April 20, 2017'
   * @example DateTime.now().toLocaleString(DateTime.DATE_FULL, { locale: 'fr' }); //=> '28 août 2022'
   * @example DateTime.now().toLocaleString(DateTime.TIME_SIMPLE); //=> '11:32 AM'
   * @example DateTime.now().toLocaleString(DateTime.DATETIME_SHORT); //=> '4/20/2017, 11:32 AM'
   * @example DateTime.now().toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' }); //=> 'Thursday, April 20'
   * @example DateTime.now().toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> 'Thu, Apr 20, 11:27 AM'
   * @example DateTime.now().toLocaleString({ hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }); //=> '11:32'
   * @return {string}
   */
  toLocaleString(formatOpts = DATE_SHORT, opts = {}) {
    return this.isValid ? Formatter.create(this.loc.clone(opts), formatOpts).formatDateTime(this) : INVALID;
  }
  /**
   * Returns an array of format "parts", meaning individual tokens along with metadata. This is allows callers to post-process individual sections of the formatted output.
   * Defaults to the system's locale if no locale has been specified
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatToParts
   * @param opts {Object} - Intl.DateTimeFormat constructor options, same as `toLocaleString`.
   * @example DateTime.now().toLocaleParts(); //=> [
   *                                   //=>   { type: 'day', value: '25' },
   *                                   //=>   { type: 'literal', value: '/' },
   *                                   //=>   { type: 'month', value: '05' },
   *                                   //=>   { type: 'literal', value: '/' },
   *                                   //=>   { type: 'year', value: '1982' }
   *                                   //=> ]
   */
  toLocaleParts(opts = {}) {
    return this.isValid ? Formatter.create(this.loc.clone(opts), opts).formatDateTimeParts(this) : [];
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.extendedZone=false] - add the time zone format extension
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @param {string} [opts.precision='milliseconds'] - truncate output to desired presicion: 'years', 'months', 'days', 'hours', 'minutes', 'seconds' or 'milliseconds'. When precision and suppressSeconds or suppressMilliseconds are used together, precision sets the maximum unit shown in the output, however seconds or milliseconds will still be suppressed if they are 0.
   * @example DateTime.utc(1983, 5, 25).toISO() //=> '1982-05-25T00:00:00.000Z'
   * @example DateTime.now().toISO() //=> '2017-04-22T20:47:05.335-04:00'
   * @example DateTime.now().toISO({ includeOffset: false }) //=> '2017-04-22T20:47:05.335'
   * @example DateTime.now().toISO({ format: 'basic' }) //=> '20170422T204705.335-0400'
   * @example DateTime.now().toISO({ precision: 'day' }) //=> '2017-04-22Z'
   * @example DateTime.now().toISO({ precision: 'minute' }) //=> '2017-04-22T20:47Z'
   * @return {string|null}
   */
  toISO({
    format = "extended",
    suppressSeconds = false,
    suppressMilliseconds = false,
    includeOffset = true,
    extendedZone = false,
    precision = "milliseconds"
  } = {}) {
    if (!this.isValid) {
      return null;
    }
    precision = normalizeUnit(precision);
    const ext = format === "extended";
    let c2 = toISODate(this, ext, precision);
    if (orderedUnits.indexOf(precision) >= 3) c2 += "T";
    c2 += toISOTime(
      this,
      ext,
      suppressSeconds,
      suppressMilliseconds,
      includeOffset,
      extendedZone,
      precision
    );
    return c2;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's date component
   * @param {Object} opts - options
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @param {string} [opts.precision='day'] - truncate output to desired precision: 'years', 'months', or 'days'.
   * @example DateTime.utc(1982, 5, 25).toISODate() //=> '1982-05-25'
   * @example DateTime.utc(1982, 5, 25).toISODate({ format: 'basic' }) //=> '19820525'
   * @example DateTime.utc(1982, 5, 25).toISODate({ precision: 'month' }) //=> '1982-05'
   * @return {string|null}
   */
  toISODate({ format = "extended", precision = "day" } = {}) {
    if (!this.isValid) {
      return null;
    }
    return toISODate(this, format === "extended", normalizeUnit(precision));
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's week date
   * @example DateTime.utc(1982, 5, 25).toISOWeekDate() //=> '1982-W21-2'
   * @return {string}
   */
  toISOWeekDate() {
    return toTechFormat(this, "kkkk-'W'WW-c");
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's time component
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.extendedZone=true] - add the time zone format extension
   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @param {string} [opts.precision='milliseconds'] - truncate output to desired presicion: 'hours', 'minutes', 'seconds' or 'milliseconds'. When precision and suppressSeconds or suppressMilliseconds are used together, precision sets the maximum unit shown in the output, however seconds or milliseconds will still be suppressed if they are 0.
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime() //=> '07:34:19.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34, seconds: 0, milliseconds: 0 }).toISOTime({ suppressSeconds: true }) //=> '07:34Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ format: 'basic' }) //=> '073419.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ includePrefix: true }) //=> 'T07:34:19.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34, second: 56 }).toISOTime({ precision: 'minute' }) //=> '07:34Z'
   * @return {string}
   */
  toISOTime({
    suppressMilliseconds = false,
    suppressSeconds = false,
    includeOffset = true,
    includePrefix = false,
    extendedZone = false,
    format = "extended",
    precision = "milliseconds"
  } = {}) {
    if (!this.isValid) {
      return null;
    }
    precision = normalizeUnit(precision);
    let c2 = includePrefix && orderedUnits.indexOf(precision) >= 3 ? "T" : "";
    return c2 + toISOTime(
      this,
      format === "extended",
      suppressSeconds,
      suppressMilliseconds,
      includeOffset,
      extendedZone,
      precision
    );
  }
  /**
   * Returns an RFC 2822-compatible string representation of this DateTime
   * @example DateTime.utc(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 +0000'
   * @example DateTime.local(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 -0400'
   * @return {string}
   */
  toRFC2822() {
    return toTechFormat(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", false);
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in HTTP headers. The output is always expressed in GMT.
   * Specifically, the string conforms to RFC 1123.
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
   * @example DateTime.utc(2014, 7, 13).toHTTP() //=> 'Sun, 13 Jul 2014 00:00:00 GMT'
   * @example DateTime.utc(2014, 7, 13, 19).toHTTP() //=> 'Sun, 13 Jul 2014 19:00:00 GMT'
   * @return {string}
   */
  toHTTP() {
    return toTechFormat(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Date
   * @example DateTime.utc(2014, 7, 13).toSQLDate() //=> '2014-07-13'
   * @return {string|null}
   */
  toSQLDate() {
    if (!this.isValid) {
      return null;
    }
    return toISODate(this, true);
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Time
   * @param {Object} opts - options
   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
   * @example DateTime.utc().toSQL() //=> '05:15:16.345'
   * @example DateTime.now().toSQL() //=> '05:15:16.345 -04:00'
   * @example DateTime.now().toSQL({ includeOffset: false }) //=> '05:15:16.345'
   * @example DateTime.now().toSQL({ includeZone: false }) //=> '05:15:16.345 America/New_York'
   * @return {string}
   */
  toSQLTime({ includeOffset = true, includeZone = false, includeOffsetSpace = true } = {}) {
    let fmt = "HH:mm:ss.SSS";
    if (includeZone || includeOffset) {
      if (includeOffsetSpace) {
        fmt += " ";
      }
      if (includeZone) {
        fmt += "z";
      } else if (includeOffset) {
        fmt += "ZZ";
      }
    }
    return toTechFormat(this, fmt, true);
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL DateTime
   * @param {Object} opts - options
   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
   * @example DateTime.utc(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 Z'
   * @example DateTime.local(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 -04:00'
   * @example DateTime.local(2014, 7, 13).toSQL({ includeOffset: false }) //=> '2014-07-13 00:00:00.000'
   * @example DateTime.local(2014, 7, 13).toSQL({ includeZone: true }) //=> '2014-07-13 00:00:00.000 America/New_York'
   * @return {string}
   */
  toSQL(opts = {}) {
    if (!this.isValid) {
      return null;
    }
    return `${this.toSQLDate()} ${this.toSQLTime(opts)}`;
  }
  /**
   * Returns a string representation of this DateTime appropriate for debugging
   * @return {string}
   */
  toString() {
    return this.isValid ? this.toISO() : INVALID;
  }
  /**
   * Returns a string representation of this DateTime appropriate for the REPL.
   * @return {string}
   */
  [Symbol.for("nodejs.util.inspect.custom")]() {
    if (this.isValid) {
      return `DateTime { ts: ${this.toISO()}, zone: ${this.zone.name}, locale: ${this.locale} }`;
    } else {
      return `DateTime { Invalid, reason: ${this.invalidReason} }`;
    }
  }
  /**
   * Returns the epoch milliseconds of this DateTime. Alias of {@link DateTime#toMillis}
   * @return {number}
   */
  valueOf() {
    return this.toMillis();
  }
  /**
   * Returns the epoch milliseconds of this DateTime.
   * @return {number}
   */
  toMillis() {
    return this.isValid ? this.ts : NaN;
  }
  /**
   * Returns the epoch seconds (including milliseconds in the fractional part) of this DateTime.
   * @return {number}
   */
  toSeconds() {
    return this.isValid ? this.ts / 1e3 : NaN;
  }
  /**
   * Returns the epoch seconds (as a whole number) of this DateTime.
   * @return {number}
   */
  toUnixInteger() {
    return this.isValid ? Math.floor(this.ts / 1e3) : NaN;
  }
  /**
   * Returns an ISO 8601 representation of this DateTime appropriate for use in JSON.
   * @return {string}
   */
  toJSON() {
    return this.toISO();
  }
  /**
   * Returns a BSON serializable equivalent to this DateTime.
   * @return {Date}
   */
  toBSON() {
    return this.toJSDate();
  }
  /**
   * Returns a JavaScript object with this DateTime's year, month, day, and so on.
   * @param opts - options for generating the object
   * @param {boolean} [opts.includeConfig=false] - include configuration attributes in the output
   * @example DateTime.now().toObject() //=> { year: 2017, month: 4, day: 22, hour: 20, minute: 49, second: 42, millisecond: 268 }
   * @return {Object}
   */
  toObject(opts = {}) {
    if (!this.isValid) return {};
    const base = { ...this.c };
    if (opts.includeConfig) {
      base.outputCalendar = this.outputCalendar;
      base.numberingSystem = this.loc.numberingSystem;
      base.locale = this.loc.locale;
    }
    return base;
  }
  /**
   * Returns a JavaScript Date equivalent to this DateTime.
   * @return {Date}
   */
  toJSDate() {
    return new Date(this.isValid ? this.ts : NaN);
  }
  // COMPARE
  /**
   * Return the difference between two DateTimes as a Duration.
   * @param {DateTime} otherDateTime - the DateTime to compare this one to
   * @param {string|string[]} [unit=['milliseconds']] - the unit or array of units (such as 'hours' or 'days') to include in the duration.
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @example
   * var i1 = DateTime.fromISO('1982-05-25T09:45'),
   *     i2 = DateTime.fromISO('1983-10-14T10:30');
   * i2.diff(i1).toObject() //=> { milliseconds: 43807500000 }
   * i2.diff(i1, 'hours').toObject() //=> { hours: 12168.75 }
   * i2.diff(i1, ['months', 'days']).toObject() //=> { months: 16, days: 19.03125 }
   * i2.diff(i1, ['months', 'days', 'hours']).toObject() //=> { months: 16, days: 19, hours: 0.75 }
   * @return {Duration}
   */
  diff(otherDateTime, unit = "milliseconds", opts = {}) {
    if (!this.isValid || !otherDateTime.isValid) {
      return Duration.invalid("created by diffing an invalid DateTime");
    }
    const durOpts = { locale: this.locale, numberingSystem: this.numberingSystem, ...opts };
    const units = maybeArray(unit).map(Duration.normalizeUnit), otherIsLater = otherDateTime.valueOf() > this.valueOf(), earlier = otherIsLater ? this : otherDateTime, later = otherIsLater ? otherDateTime : this, diffed = diff(earlier, later, units, durOpts);
    return otherIsLater ? diffed.negate() : diffed;
  }
  /**
   * Return the difference between this DateTime and right now.
   * See {@link DateTime#diff}
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units units (such as 'hours' or 'days') to include in the duration
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  diffNow(unit = "milliseconds", opts = {}) {
    return this.diff(DateTime.now(), unit, opts);
  }
  /**
   * Return an Interval spanning between this DateTime and another DateTime
   * @param {DateTime} otherDateTime - the other end point of the Interval
   * @return {Interval|DateTime}
   */
  until(otherDateTime) {
    return this.isValid ? Interval.fromDateTimes(this, otherDateTime) : this;
  }
  /**
   * Return whether this DateTime is in the same unit of time as another DateTime.
   * Higher-order units must also be identical for this function to return `true`.
   * Note that time zones are **ignored** in this comparison, which compares the **local** calendar time. Use {@link DateTime#setZone} to convert one of the dates if needed.
   * @param {DateTime} otherDateTime - the other DateTime
   * @param {string} unit - the unit of time to check sameness on
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week; only the locale of this DateTime is used
   * @example DateTime.now().hasSame(otherDT, 'day'); //~> true if otherDT is in the same current calendar day
   * @return {boolean}
   */
  hasSame(otherDateTime, unit, opts) {
    if (!this.isValid) return false;
    const inputMs = otherDateTime.valueOf();
    const adjustedToZone = this.setZone(otherDateTime.zone, { keepLocalTime: true });
    return adjustedToZone.startOf(unit, opts) <= inputMs && inputMs <= adjustedToZone.endOf(unit, opts);
  }
  /**
   * Equality check
   * Two DateTimes are equal if and only if they represent the same millisecond, have the same zone and location, and are both valid.
   * To compare just the millisecond values, use `+dt1 === +dt2`.
   * @param {DateTime} other - the other DateTime
   * @return {boolean}
   */
  equals(other) {
    return this.isValid && other.isValid && this.valueOf() === other.valueOf() && this.zone.equals(other.zone) && this.loc.equals(other.loc);
  }
  /**
   * Returns a string representation of a this time relative to now, such as "in two days". Can only internationalize if your
   * platform supports Intl.RelativeTimeFormat. Rounds towards zero by default.
   * @param {Object} options - options that affect the output
   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
   * @param {string} [options.style="long"] - the style of units, must be "long", "short", or "narrow"
   * @param {string|string[]} options.unit - use a specific unit or array of units; if omitted, or an array, the method will pick the best unit. Use an array or one of "years", "quarters", "months", "weeks", "days", "hours", "minutes", or "seconds"
   * @param {boolean} [options.round=true] - whether to round the numbers in the output.
   * @param {string} [options.rounding="trunc"] - rounding method to use when rounding the numbers in the output. Can be "trunc" (toward zero), "expand" (away from zero), "round", "floor", or "ceil".
   * @param {number} [options.padding=0] - padding in milliseconds. This allows you to round up the result if it fits inside the threshold. Don't use in combination with {round: false} because the decimal output will include the padding.
   * @param {string} options.locale - override the locale of this DateTime
   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
   * @example DateTime.now().plus({ days: 1 }).toRelative() //=> "in 1 day"
   * @example DateTime.now().setLocale("es").toRelative({ days: 1 }) //=> "dentro de 1 día"
   * @example DateTime.now().plus({ days: 1 }).toRelative({ locale: "fr" }) //=> "dans 23 heures"
   * @example DateTime.now().minus({ days: 2 }).toRelative() //=> "2 days ago"
   * @example DateTime.now().minus({ days: 2 }).toRelative({ unit: "hours" }) //=> "48 hours ago"
   * @example DateTime.now().minus({ hours: 36 }).toRelative({ round: false }) //=> "1.5 days ago"
   */
  toRelative(options = {}) {
    if (!this.isValid) return null;
    const base = options.base || DateTime.fromObject({}, { zone: this.zone }), padding = options.padding ? this < base ? -options.padding : options.padding : 0;
    let units = ["years", "months", "days", "hours", "minutes", "seconds"];
    let unit = options.unit;
    if (Array.isArray(options.unit)) {
      units = options.unit;
      unit = void 0;
    }
    return diffRelative(base, this.plus(padding), {
      ...options,
      numeric: "always",
      units,
      unit
    });
  }
  /**
   * Returns a string representation of this date relative to today, such as "yesterday" or "next month".
   * Only internationalizes on platforms that supports Intl.RelativeTimeFormat.
   * @param {Object} options - options that affect the output
   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
   * @param {string} options.locale - override the locale of this DateTime
   * @param {string} options.unit - use a specific unit; if omitted, the method will pick the unit. Use one of "years", "quarters", "months", "weeks", or "days"
   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar() //=> "tomorrow"
   * @example DateTime.now().setLocale("es").plus({ days: 1 }).toRelative() //=> ""mañana"
   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar({ locale: "fr" }) //=> "demain"
   * @example DateTime.now().minus({ days: 2 }).toRelativeCalendar() //=> "2 days ago"
   */
  toRelativeCalendar(options = {}) {
    if (!this.isValid) return null;
    return diffRelative(options.base || DateTime.fromObject({}, { zone: this.zone }), this, {
      ...options,
      numeric: "auto",
      units: ["years", "months", "days"],
      calendary: true
    });
  }
  /**
   * Return the min of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the minimum
   * @return {DateTime} the min DateTime, or undefined if called with no argument
   */
  static min(...dateTimes) {
    if (!dateTimes.every(DateTime.isDateTime)) {
      throw new InvalidArgumentError("min requires all arguments be DateTimes");
    }
    return bestBy(dateTimes, (i2) => i2.valueOf(), Math.min);
  }
  /**
   * Return the max of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the maximum
   * @return {DateTime} the max DateTime, or undefined if called with no argument
   */
  static max(...dateTimes) {
    if (!dateTimes.every(DateTime.isDateTime)) {
      throw new InvalidArgumentError("max requires all arguments be DateTimes");
    }
    return bestBy(dateTimes, (i2) => i2.valueOf(), Math.max);
  }
  // MISC
  /**
   * Explain how a string would be parsed by fromFormat()
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see description)
   * @param {Object} options - options taken by fromFormat()
   * @return {Object}
   */
  static fromFormatExplain(text, fmt, options = {}) {
    const { locale = null, numberingSystem = null } = options, localeToUse = Locale.fromOpts({
      locale,
      numberingSystem,
      defaultToEN: true
    });
    return explainFromTokens(localeToUse, text, fmt);
  }
  /**
   * @deprecated use fromFormatExplain instead
   */
  static fromStringExplain(text, fmt, options = {}) {
    return DateTime.fromFormatExplain(text, fmt, options);
  }
  /**
   * Build a parser for `fmt` using the given locale. This parser can be passed
   * to {@link DateTime.fromFormatParser} to a parse a date in this format. This
   * can be used to optimize cases where many dates need to be parsed in a
   * specific format.
   *
   * @param {String} fmt - the format the string is expected to be in (see
   * description)
   * @param {Object} options - options used to set locale and numberingSystem
   * for parser
   * @returns {TokenParser} - opaque object to be used
   */
  static buildFormatParser(fmt, options = {}) {
    const { locale = null, numberingSystem = null } = options, localeToUse = Locale.fromOpts({
      locale,
      numberingSystem,
      defaultToEN: true
    });
    return new TokenParser(localeToUse, fmt);
  }
  /**
   * Create a DateTime from an input string and format parser.
   *
   * The format parser must have been created with the same locale as this call.
   *
   * @param {String} text - the string to parse
   * @param {TokenParser} formatParser - parser from {@link DateTime.buildFormatParser}
   * @param {Object} opts - options taken by fromFormat()
   * @returns {DateTime}
   */
  static fromFormatParser(text, formatParser, opts = {}) {
    if (isUndefined(text) || isUndefined(formatParser)) {
      throw new InvalidArgumentError(
        "fromFormatParser requires an input string and a format parser"
      );
    }
    const { locale = null, numberingSystem = null } = opts, localeToUse = Locale.fromOpts({
      locale,
      numberingSystem,
      defaultToEN: true
    });
    if (!localeToUse.equals(formatParser.locale)) {
      throw new InvalidArgumentError(
        `fromFormatParser called with a locale of ${localeToUse}, but the format parser was created for ${formatParser.locale}`
      );
    }
    const { result, zone, specificOffset, invalidReason } = formatParser.explainFromTokens(text);
    if (invalidReason) {
      return DateTime.invalid(invalidReason);
    } else {
      return parseDataToDateTime(
        result,
        zone,
        opts,
        `format ${formatParser.format}`,
        text,
        specificOffset
      );
    }
  }
  // FORMAT PRESETS
  /**
   * {@link DateTime#toLocaleString} format like 10/14/1983
   * @type {Object}
   */
  static get DATE_SHORT() {
    return DATE_SHORT;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED() {
    return DATE_MED;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Fri, Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED_WITH_WEEKDAY() {
    return DATE_MED_WITH_WEEKDAY;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983'
   * @type {Object}
   */
  static get DATE_FULL() {
    return DATE_FULL;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Tuesday, October 14, 1983'
   * @type {Object}
   */
  static get DATE_HUGE() {
    return DATE_HUGE;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_SIMPLE() {
    return TIME_SIMPLE;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SECONDS() {
    return TIME_WITH_SECONDS;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SHORT_OFFSET() {
    return TIME_WITH_SHORT_OFFSET;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_LONG_OFFSET() {
    return TIME_WITH_LONG_OFFSET;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_SIMPLE() {
    return TIME_24_SIMPLE;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SECONDS() {
    return TIME_24_WITH_SECONDS;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 EDT', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SHORT_OFFSET() {
    return TIME_24_WITH_SHORT_OFFSET;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 Eastern Daylight Time', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_LONG_OFFSET() {
    return TIME_24_WITH_LONG_OFFSET;
  }
  /**
   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT() {
    return DATETIME_SHORT;
  }
  /**
   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT_WITH_SECONDS() {
    return DATETIME_SHORT_WITH_SECONDS;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED() {
    return DATETIME_MED;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_SECONDS() {
    return DATETIME_MED_WITH_SECONDS;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Fri, 14 Oct 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_WEEKDAY() {
    return DATETIME_MED_WITH_WEEKDAY;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL() {
    return DATETIME_FULL;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30:33 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL_WITH_SECONDS() {
    return DATETIME_FULL_WITH_SECONDS;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE() {
    return DATETIME_HUGE;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE_WITH_SECONDS() {
    return DATETIME_HUGE_WITH_SECONDS;
  }
}
function friendlyDateTime(dateTimeish) {
  if (DateTime.isDateTime(dateTimeish)) {
    return dateTimeish;
  } else if (dateTimeish && dateTimeish.valueOf && isNumber(dateTimeish.valueOf())) {
    return DateTime.fromJSDate(dateTimeish);
  } else if (dateTimeish && typeof dateTimeish === "object") {
    return DateTime.fromObject(dateTimeish);
  } else {
    throw new InvalidArgumentError(
      `Unknown datetime argument: ${dateTimeish}, of type ${typeof dateTimeish}`
    );
  }
}
const cardStyles = i$3`
  :host {
    --ios-font: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
    --ios-glass-bg: rgba(255, 255, 255, 0.16);
    --ios-glass-bg-hover: rgba(255, 255, 255, 0.22);
    --ios-glass-border: rgba(255, 255, 255, 0.22);
    --ios-glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.18), inset 0 1px 1px 0 rgba(255, 255, 255, 0.28);
    --ios-text-primary: #ffffff;
    --ios-text-secondary: rgba(255, 255, 255, 0.72);
    --ios-text-tertiary: rgba(255, 255, 255, 0.5);
    --ios-blue-accent: #38bdf8;
    --ios-cyan-wind: #22d3ee;
    --ios-pill-active: rgba(255, 255, 255, 0.32);
    --ios-divider: rgba(255, 255, 255, 0.14);
    display: block;
    font-family: var(--ios-font);
    color: var(--ios-text-primary);
    box-sizing: border-box;
    user-select: none;
    -webkit-user-select: none;
  }

  * {
    box-sizing: border-box;
  }

  .ios27-container {
    position: relative;
    border-radius: 28px;
    padding: 24px 18px 20px 18px;
    overflow: hidden;
    min-height: 440px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
    transition: background 0.8s ease;
  }

  .ios27-container.transparent-bg {
    background: transparent !important;
    box-shadow: none !important;
    padding: 12px 6px;
  }

  /* Internal Scroll Wrapper for Scrollable layouts */
  .ios27-scroll-wrapper {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px 18px 20px 18px;
    width: 100%;
    box-sizing: border-box;
  }

  /* ----------------------------------------------------
     LAYOUT: SQUARE SCROLLABLE & SQUARE FIT (Strict 1:1 Aspect Ratio)
     ---------------------------------------------------- */
  .ios27-container.layout-square-scroll,
  .ios27-container.layout-square,
  .ios27-container.layout-square-fit {
    aspect-ratio: 1 / 1 !important;
    min-height: 0 !important;
    height: auto !important;
    max-height: none !important;
    padding: 0 !important;
  }

  .ios27-container.is-scrollable:not(.layout-square-scroll):not(.layout-square):not(.layout-square-fit) {
    padding: 0 !important;
  }

  .ios27-container.layout-square-scroll .ios27-scroll-wrapper,
  .ios27-container.layout-square .ios27-scroll-wrapper,
  .ios27-container.is-scrollable .ios27-scroll-wrapper {
    height: 100%;
    max-height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.28) transparent;
  }

  .ios27-container.layout-square-scroll .ios27-scroll-wrapper,
  .ios27-container.layout-square .ios27-scroll-wrapper {
    padding: 14px 14px 20px 14px !important;
    gap: 12px !important;
    scrollbar-width: none; /* Hide default scrollbar bar for clean iOS look */
  }

  .ios27-container.layout-square-scroll .ios27-scroll-wrapper::-webkit-scrollbar,
  .ios27-container.layout-square .ios27-scroll-wrapper::-webkit-scrollbar {
    display: none;
  }

  /* Compact Refined Hero Header inside Square Layout */
  .ios27-container.layout-square-scroll .ios-header,
  .ios27-container.layout-square .ios-header {
    padding: 4px 0 2px 0;
    gap: 2px;
  }

  .ios27-container.layout-square-scroll .ios-header-location-row,
  .ios27-container.layout-square .ios-header-location-row {
    margin-bottom: 2px;
    gap: 5px;
  }

  .ios27-container.layout-square-scroll .ios-location-name,
  .ios27-container.layout-square .ios-location-name {
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.3px;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.35);
  }

  .ios27-container.layout-square-scroll .ios-nav-arrow,
  .ios27-container.layout-square .ios-nav-arrow {
    width: 13px;
    height: 13px;
  }

  .ios27-container.layout-square-scroll .ios-current-temp,
  .ios27-container.layout-square .ios-current-temp {
    font-size: 60px;
    font-weight: 200;
    letter-spacing: -2px;
    margin: 2px 0 2px 0;
    padding-left: 0;
    line-height: 1;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(0, 0, 0, 0.25);
  }

  /* Condition & High/Low unified on ONE sleek horizontal row */
  .ios27-container.layout-square-scroll .ios-condition-row,
  .ios27-container.layout-square .ios-condition-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 7px;
    margin: 2px 0 0 0;
  }

  .ios27-container.layout-square-scroll .ios-condition-text,
  .ios27-container.layout-square .ios-condition-text {
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.98);
    margin: 0;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  }

  .ios27-container.layout-square-scroll .ios-high-low,
  .ios27-container.layout-square .ios-high-low {
    font-size: 13.5px;
    font-weight: 500;
    opacity: 0.95;
    margin: 0;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  }

  .ios27-container.layout-square-scroll .ios-high-low::before,
  .ios27-container.layout-square .ios-high-low::before {
    content: "· ";
    opacity: 0.7;
    font-weight: bold;
    margin-right: 2px;
  }

  .ios27-container.layout-square-scroll .ios-condition-summary,
  .ios27-container.layout-square .ios-condition-summary {
    font-size: 11px;
    margin-top: 2px;
    line-height: 1.25;
    max-width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(255, 255, 255, 0.92);
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  }

  /* Compact Highlights Card inside Square Layout (if visible) */
  .ios27-container.layout-square-scroll .ios-highlights-card,
  .ios27-container.layout-square .ios-highlights-card {
    padding: 6px 12px;
    gap: 3px;
    border-radius: 14px;
    background: rgba(15, 23, 42, 0.22);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.28);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.16), inset 0 1px 1px rgba(255, 255, 255, 0.25);
  }

  .ios27-container.layout-square-scroll .ios-highlights-header,
  .ios27-container.layout-square .ios-highlights-header {
    font-size: 9.5px;
    color: rgba(255, 255, 255, 0.92);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  }

  .ios27-container.layout-square-scroll .ios-highlights-body,
  .ios27-container.layout-square .ios-highlights-body {
    font-size: 11px;
    line-height: 1.25;
    color: #ffffff;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
  }

  /* Compact Glass Forecast Card inside Square Layout */
  /* Compact Glass Forecast Card inside Square Layout */
  .ios27-container.layout-square-scroll .ios-glass-card,
  .ios27-container.layout-square .ios-glass-card {
    padding: 12px 14px 14px 14px;
    gap: 10px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.22);
    box-shadow: 0 4px 22px rgba(0, 0, 0, 0.18);
  }

  .ios27-container.layout-square-scroll .ios-forecast-card-header,
  .ios27-container.layout-square .ios-forecast-card-header {
    padding: 0 2px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2px;
  }

  .ios27-container.layout-square-scroll .ios-forecast-title,
  .ios27-container.layout-square .ios-forecast-title {
    font-size: 13.5px;
    font-weight: 600;
    letter-spacing: 0.4px;
  }

  .ios27-container.layout-square-scroll .ios-forecast-subtitle,
  .ios27-container.layout-square .ios-forecast-subtitle {
    display: none !important;
  }

  .ios27-container.layout-square-scroll .ios-segmented-control,
  .ios27-container.layout-square .ios-segmented-control {
    padding: 2.5px;
    gap: 3px;
    border-radius: 16px;
    background: rgba(0, 0, 0, 0.24);
    border: 1px solid rgba(255, 255, 255, 0.16);
  }

  .ios27-container.layout-square-scroll .ios-segment-button,
  .ios27-container.layout-square .ios-segment-button {
    width: 32px;
    height: 24px;
    border-radius: 12px;
  }

  .ios27-container.layout-square-scroll .ios-segment-button svg,
  .ios27-container.layout-square .ios-segment-button svg {
    width: 13px;
    height: 13px;
  }

  .ios27-container.layout-square-scroll .ios-divider,
  .ios27-container.layout-square .ios-divider {
    margin: 2px 0;
  }

  .ios27-container.layout-square-scroll .ios-hourly-strip,
  .ios27-container.layout-square .ios-hourly-strip {
    padding: 4px 0 2px 0;
    gap: 8px;
    min-height: 76px;
  }

  .ios27-container.layout-square-scroll .ios-hourly-col,
  .ios27-container.layout-square .ios-hourly-col {
    min-width: 42px;
    gap: 3px;
  }

  .ios27-container.layout-square-scroll .ios-hourly-time,
  .ios27-container.layout-square .ios-hourly-time {
    font-size: 11px;
    font-weight: 500;
  }

  .ios27-container.layout-square-scroll .ios-hourly-icon,
  .ios27-container.layout-square .ios-hourly-icon {
    width: 24px;
    height: 24px;
  }

  .ios27-container.layout-square-scroll .ios-hourly-temp,
  .ios27-container.layout-square .ios-hourly-temp {
    font-size: 13px;
    font-weight: 600;
  }

  .ios27-container.layout-square-scroll .ios-hourly-pop,
  .ios27-container.layout-square .ios-hourly-pop {
    font-size: 10px;
    font-weight: 600;
    line-height: 1;
  }

  .ios27-container.layout-square-scroll .ios-rain-gauge-col,
  .ios27-container.layout-square .ios-rain-gauge-col {
    min-width: 42px;
    height: 78px;
    padding: 1px 0;
  }

  .ios27-container.layout-square-scroll .ios-rain-intensity-bar,
  .ios27-container.layout-square .ios-rain-intensity-bar {
    width: 20px;
    height: 42px;
    border-radius: 10px;
    padding: 1.5px;
  }

  .ios27-container.layout-square-scroll .ios-rain-liquid-fill,
  .ios27-container.layout-square .ios-rain-liquid-fill {
    border-radius: 7px;
  }

  .ios27-container.layout-square-scroll .ios-rain-percent-label,
  .ios27-container.layout-square .ios-rain-percent-label {
    font-size: 10.5px;
  }

  /* Compact 10-Day Daily Forecast inside Square Layout */
  .ios27-container.layout-square-scroll .ios-daily-list,
  .ios27-container.layout-square .ios-daily-list {
    gap: 4px;
    padding: 3px 0;
  }

  .ios27-container.layout-square-scroll .ios-daily-row,
  .ios27-container.layout-square .ios-daily-row {
    font-size: 13px;
    grid-template-columns: 50px 24px 1fr;
    gap: 8px;
    padding: 4.5px 0;
  }

  .ios27-container.layout-square-scroll .ios-day-label,
  .ios27-container.layout-square .ios-day-label {
    font-size: 13px;
    font-weight: 600;
  }

  .ios27-container.layout-square-scroll .ios-daily-icon,
  .ios27-container.layout-square .ios-daily-icon {
    width: 22px;
    height: 22px;
  }

  .ios27-container.layout-square-scroll .ios-daily-icon svg,
  .ios27-container.layout-square .ios-daily-icon svg {
    width: 19px;
    height: 19px;
  }

  .ios27-container.layout-square-scroll .ios-temp-low,
  .ios27-container.layout-square .ios-temp-low {
    font-size: 12.5px;
    min-width: 24px;
  }

  .ios27-container.layout-square-scroll .ios-temp-high,
  .ios27-container.layout-square .ios-temp-high {
    font-size: 13px;
    min-width: 24px;
  }

  .ios27-container.layout-square-scroll .ios-temp-bar-track,
  .ios27-container.layout-square .ios-temp-bar-track {
    height: 5px;
    border-radius: 3px;
  }

  .ios27-container.layout-square-scroll .ios-daily-row--precip,
  .ios27-container.layout-square .ios-daily-row--precip {
    display: flex !important;
    align-items: center;
    gap: 6px;
    width: 100%;
    min-height: 28px !important;
    padding: 4.5px 0;
    box-sizing: border-box;
  }

  .ios27-container.layout-square-scroll .ios-daily-row--precip .ios-day-label,
  .ios27-container.layout-square .ios-daily-row--precip .ios-day-label {
    width: 50px;
    flex: 0 0 50px;
    font-size: 13px;
  }

  .ios27-container.layout-square-scroll .ios-daily-row--wind,
  .ios27-container.layout-square .ios-daily-row--wind {
    display: grid !important;
    grid-template-columns: 50px 1fr !important;
    align-items: center;
    gap: 8px;
    width: 100%;
    min-height: 28px !important;
    padding: 4.5px 0;
    box-sizing: border-box;
  }

  /* Compact Detail Grid inside Square Layout */
  .ios27-container.layout-square-scroll .ios-detail-grid,
  .ios27-container.layout-square .ios-detail-grid {
    gap: 8px;
    margin-top: 0;
    margin-bottom: 4px;
  }

  .ios27-container.layout-square-scroll .ios-detail-tile,
  .ios27-container.layout-square .ios-detail-tile {
    min-height: 115px;
    padding: 9px 10px 8px 10px;
    border-radius: 16px;
  }

  .ios27-container.layout-square-scroll .ios-stat-value,
  .ios27-container.layout-square .ios-stat-value {
    font-size: 20px;
  }

  .ios27-container.layout-square-scroll .ios-tile-header,
  .ios27-container.layout-square .ios-tile-header {
    font-size: 9.5px;
    margin-bottom: 3px;
    letter-spacing: 0.4px;
  }

  .ios27-container.layout-square-scroll .ios-tile-footer,
  .ios27-container.layout-square .ios-tile-footer {
    font-size: 9.5px;
  }

  .ios27-container.layout-square-scroll .ios-compass-dial,
  .ios27-container.layout-square .ios-compass-dial {
    width: 72px;
    height: 72px;
  }

  .ios27-container.layout-square-scroll .ios-moon-container,
  .ios27-container.layout-square .ios-moon-container {
    width: 68px;
    height: 68px;
  }



  /* ----------------------------------------------------
     LAYOUT: SQUARE FIT (1:1 Widget, Perfectly Fitted, Zero Scroll)
     ---------------------------------------------------- */
  .ios27-container.layout-square-fit {
    aspect-ratio: 1 / 1;
    min-height: auto;
    max-height: 420px;
    padding: 16px 18px !important;
    justify-content: space-between;
    gap: 10px;
  }

  .ios-square-fit-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    z-index: 2;
  }

  .ios-square-fit-loc-group {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .ios-square-fit-loc {
    font-size: 20px;
    font-weight: 600;
    color: var(--ios-text-primary);
    letter-spacing: -0.3px;
  }

  .ios-square-fit-highlow {
    font-size: 13px;
    font-weight: 500;
    color: var(--ios-text-secondary);
    background: rgba(0, 0, 0, 0.22);
    padding: 3px 9px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.14);
  }

  .ios-square-fit-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    z-index: 2;
    padding: 2px 0;
  }

  .ios-square-fit-temp-col {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .ios-square-fit-temp {
    font-size: 58px;
    font-weight: 200;
    line-height: 1;
    letter-spacing: -2px;
    color: var(--ios-text-primary);
  }

  .ios-square-fit-condition {
    font-size: 15px;
    font-weight: 500;
    color: var(--ios-text-primary);
    opacity: 0.95;
  }

  .ios-square-fit-icon-col {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 6px;
  }

  .ios-square-fit-forecast-box {
    background: var(--ios-glass-bg);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    border: 1px solid var(--ios-glass-border);
    border-radius: 20px;
    padding: 10px 8px;
    box-shadow: var(--ios-glass-shadow);
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .ios-square-fit-hourly-row {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
  }

  .ios-square-fit-hour-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    text-align: center;
    flex: 1;
  }

  .ios-square-fit-hour-time {
    font-size: 11px;
    font-weight: 500;
    color: var(--ios-text-secondary);
  }

  .ios-square-fit-hour-temp {
    font-size: 13px;
    font-weight: 600;
    color: var(--ios-text-primary);
  }

  .ios-square-fit-hour-pop {
    font-size: 10px;
    font-weight: 600;
    color: var(--ios-blue-accent);
  }

  /* ----------------------------------------------------
     LAYOUT: COMPACT (Rectangle Horizontal Card)
     ---------------------------------------------------- */
  .ios27-container.layout-compact {
    min-height: auto;
    padding: 16px 18px 14px 18px !important;
    gap: 12px;
  }

  .ios27-container.layout-compact .ios-header {
    display: grid !important;
    grid-template-columns: auto 1fr auto !important;
    grid-template-areas:
      "loc loc temp"
      "cond hl temp" !important;
    align-items: center !important;
    text-align: left !important;
    padding: 0 4px !important;
    margin-bottom: 2px !important;
    column-gap: 8px !important;
    row-gap: 3px !important;
  }

  .ios27-container.layout-compact .ios-header-location-row {
    grid-area: loc !important;
    display: flex !important;
    align-items: center !important;
    justify-content: flex-start !important;
    margin: 0 !important;
  }

  .ios27-container.layout-compact .ios-location-name {
    font-size: 22px !important;
    font-weight: 600 !important;
    color: var(--ios-text-primary) !important;
    letter-spacing: -0.3px !important;
  }

  .ios27-container.layout-compact .ios-condition-text {
    grid-area: cond !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    color: var(--ios-text-primary) !important;
    opacity: 0.92 !important;
    margin: 0 !important;
    white-space: nowrap !important;
  }

  .ios27-container.layout-compact .ios-high-low {
    grid-area: hl !important;
    font-size: 13px !important;
    font-weight: 500 !important;
    color: var(--ios-text-secondary) !important;
    margin: 0 !important;
    white-space: nowrap !important;
  }

  .ios27-container.layout-compact .ios-current-temp {
    grid-area: temp !important;
    font-size: 52px !important;
    font-weight: 200 !important;
    line-height: 1 !important;
    letter-spacing: -2px !important;
    margin: 0 !important;
    padding: 0 0 0 12px !important;
    text-align: right !important;
  }

  .ios27-container.layout-compact .ios-condition-summary {
    display: none !important;
  }

  .ios27-container.layout-compact .ios-daily-list,
  .ios27-container.layout-compact .ios-bottom-bar,
  .ios27-container.layout-compact .ios-highlights-card {
    display: none !important;
  }

  .ios27-container.layout-compact .ios-glass-card {
    padding: 12px 14px;
    gap: 10px;
  }

  /* ----------------------------------------------------
     LAYOUT: MINI (Minimalist Widget, ~130px)
     ---------------------------------------------------- */
  .ios27-container.layout-mini {
    min-height: auto;
    padding: 16px 20px !important;
    border-radius: 22px;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
  }

  .ios-mini-content {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .ios-mini-left {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .ios-mini-loc {
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.3px;
    color: var(--ios-text-primary);
  }

  .ios-mini-condition {
    font-size: 14px;
    font-weight: 500;
    color: var(--ios-text-primary);
    opacity: 0.95;
  }

  .ios-mini-meta-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 2px;
  }

  .ios-mini-highlow {
    font-size: 13px;
    font-weight: 500;
    color: var(--ios-text-secondary);
  }

  .ios-mini-pill {
    font-size: 11px;
    font-weight: 600;
    color: var(--ios-blue-accent);
    background: rgba(56, 189, 248, 0.15);
    border: 1px solid rgba(56, 189, 248, 0.3);
    padding: 2px 7px;
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    gap: 3px;
  }

  .ios-mini-right {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .ios-mini-temp {
    font-size: 52px;
    font-weight: 200;
    line-height: 1;
    letter-spacing: -2px;
    color: var(--ios-text-primary);
  }

  /* Centered Apple Header */
  .ios-header {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 10px 0 8px 0;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
  }

  .ios-header-location-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-bottom: 2px;
  }

  .ios-location-name {
    font-size: 28px;
    font-weight: 500;
    letter-spacing: -0.4px;
    color: var(--ios-text-primary);
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.35);
  }

  .ios-nav-arrow {
    width: 14px;
    height: 14px;
    fill: currentColor;
    opacity: 0.85;
  }

  .ios-current-temp {
    font-size: 78px;
    font-weight: 200;
    line-height: 1;
    letter-spacing: -2px;
    margin: 4px 0 6px 0;
    padding-left: 12px;
    color: var(--ios-text-primary);
    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.4), 0 4px 18px rgba(0, 0, 0, 0.3);
  }

  .ios-condition-row {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  .ios-condition-text {
    font-size: 19px;
    font-weight: 500;
    color: var(--ios-text-primary);
    opacity: 0.98;
    margin-bottom: 4px;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  }

  .ios-high-low {
    font-size: 16px;
    font-weight: 500;
    color: var(--ios-text-primary);
    opacity: 0.95;
    letter-spacing: 0.3px;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  }

  .ios-condition-summary {
    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.92);
    margin-top: 6px;
    max-width: 320px;
    line-height: 1.35;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  }

  /* Highlights Card */
  .ios-highlights-card {
    position: relative;
    z-index: 2;
    background: rgba(15, 23, 42, 0.22);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.28);
    border-radius: 20px;
    padding: 12px 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18), inset 0 1px 1px rgba(255, 255, 255, 0.25);
    display: flex;
    flex-direction: column;
    gap: 6px;
    animation: fadeIn 0.4s ease;
  }

  .ios-highlights-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.92);
    text-transform: uppercase;
    letter-spacing: 0.4px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  }

  .ios-highlights-title-left {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .ios-highlights-body {
    font-size: 14px;
    line-height: 1.38;
    color: #ffffff;
    font-weight: 400;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
  }

  /* Main Weather Glass Card (Holds switcher, hourly strip, 10-day forecast) */
  .ios-glass-card {
    position: relative;
    z-index: 2;
    background: var(--ios-glass-bg);
    backdrop-filter: blur(28px) saturate(180%);
    -webkit-backdrop-filter: blur(28px) saturate(180%);
    border: 1px solid var(--ios-glass-border);
    border-radius: 24px;
    padding: 16px;
    box-shadow: var(--ios-glass-shadow);
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  /* Forecast Card Header with Segmented Switcher */
  .ios-forecast-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4px;
  }

  .ios-forecast-meta {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .ios-forecast-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--ios-text-primary);
    letter-spacing: -0.2px;
  }

  .ios-forecast-subtitle {
    font-size: 12px;
    color: var(--ios-text-secondary);
    font-weight: 400;
  }

  /* Segmented Pill Switcher */
  .ios-segmented-control {
    display: inline-flex;
    align-items: center;
    background: rgba(0, 0, 0, 0.28);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 30px;
    padding: 3px;
    gap: 2px;
  }

  .ios-segment-button {
    background: transparent;
    border: none;
    border-radius: 20px;
    width: 38px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.7);
    transition: all 0.25s cubic-bezier(0.25, 1, 0.5, 1);
    outline: none;
    padding: 0;
  }

  .ios-segment-button:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.12);
  }

  .ios-segment-button.active {
    background: rgba(255, 255, 255, 0.35);
    color: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  }

  .ios-segment-button svg {
    width: 17px;
    height: 17px;
    fill: currentColor;
  }

  /* Divider */
  .ios-divider {
    height: 1px;
    background: var(--ios-divider);
    width: 100%;
    margin: 2px 0;
  }

  /* Hourly Strip */
  .ios-hourly-strip {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    gap: 14px;
    padding: 6px 4px 8px 4px;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE */
    cursor: grab;
    -webkit-overflow-scrolling: touch;
    touch-action: pan-x pan-y;
    user-select: none;
  }

  .ios-hourly-strip:active {
    cursor: grabbing;
  }

  .ios-hourly-strip::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }

  .ios-hourly-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 48px;
    flex: 0 0 auto;
    text-align: center;
    gap: 8px;
  }

  .ios-hourly-time {
    font-size: 13px;
    font-weight: 500;
    color: var(--ios-text-secondary);
  }

  .ios-hourly-icon {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ios-hourly-temp {
    font-size: 15px;
    font-weight: 600;
    color: var(--ios-text-primary);
  }

  .ios-hourly-pop {
    font-size: 11px;
    font-weight: 600;
    color: var(--ios-blue-accent);
    display: flex;
    align-items: center;
    gap: 2px;
  }

  /* Precipitation Hourly View - Apple iOS Capsule Tube */
  .ios-rain-gauge-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-width: 48px;
    height: 94px;
    flex: 0 0 auto;
    padding: 2px 0;
    box-sizing: border-box;
  }

  .ios-rain-intensity-bar {
    width: 22px;
    height: 50px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 11px;
    border: 1px solid rgba(255, 255, 255, 0.22);
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column-reverse;
    padding: 2px;
    box-sizing: border-box;
  }

  .ios-rain-liquid-fill {
    width: 100%;
    background: linear-gradient(180deg, #38bdf8 0%, #0284c7 100%);
    box-shadow: 0 0 8px rgba(56, 189, 248, 0.7);
    border-radius: 8px;
    transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .ios-rain-gauge-ticks {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    pointer-events: none;
    padding: 4px 2px;
  }

  .ios-tick-line {
    width: 100%;
    height: 1px;
    background: rgba(255, 255, 255, 0.12);
  }

  .ios-rain-percent-label {
    font-size: 12px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    border-top: none;
    padding-top: 0;
  }

  .ios-rain-percent-label.has-rain {
    color: #38bdf8;
    font-weight: 600;
    text-shadow: 0 0 8px rgba(56, 189, 248, 0.7);
  }

  /* Wind Hourly View */
  .ios-wind-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 48px;
    flex: 0 0 auto;
    gap: 4px;
  }

  .ios-wind-speed-val {
    font-size: 16px;
    font-weight: 600;
    color: var(--ios-text-primary);
  }

  .ios-wind-speed-unit {
    font-size: 11px;
    color: var(--ios-text-secondary);
    margin-top: -2px;
  }

  .ios-wind-wave-container {
    width: 100%;
    height: 40px;
    position: relative;
    margin-top: 6px;
  }

  /* Daily Forecast List Rows */
  .ios-daily-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .ios-daily-row {
    display: grid;
    grid-template-columns: 56px 28px 1fr;
    align-items: center;
    gap: 10px;
    font-size: 15px;
    font-weight: 500;
    min-height: 30px;
    box-sizing: border-box;
  }

  .ios-daily-row--precip {
    display: flex !important;
    align-items: center;
    gap: 8px;
    width: 100%;
    min-height: 30px !important;
    box-sizing: border-box;
  }

  .ios-daily-row--precip .ios-day-label {
    width: 56px;
    flex: 0 0 56px;
  }

  .ios-daily-row--wind {
    display: grid !important;
    grid-template-columns: 56px 1fr !important;
    align-items: center;
    gap: 10px;
    width: 100%;
    min-height: 30px !important;
    box-sizing: border-box;
  }

  .ios-day-label {
    color: var(--ios-text-primary);
    font-weight: 600;
  }

  .ios-daily-icon {
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Mode 1: Daily Temperature Bar */
  .ios-daily-temp-bar-container {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .ios-temp-low {
    font-size: 14px;
    color: var(--ios-text-secondary);
    min-width: 28px;
    text-align: right;
  }

  .ios-temp-high {
    font-size: 14px;
    color: var(--ios-text-primary);
    min-width: 28px;
    text-align: left;
  }

  .ios-temp-bar-track {
    flex: 1;
    height: 5px;
    background: rgba(0, 0, 0, 0.28);
    border-radius: 4px;
    position: relative;
    overflow: hidden;
  }

  .ios-temp-bar-fill {
    position: absolute;
    top: 0;
    bottom: 0;
    border-radius: 4px;
    background: linear-gradient(90deg, #38bdf8 0%, #34d399 25%, #fbbf24 60%, #f97316 85%, #ef4444 100%);
  }

  .ios-temp-current-indicator {
    position: absolute;
    top: 50%;
    width: 7px;
    height: 7px;
    background: #ffffff;
    border: 1.5px solid rgba(0, 0, 0, 0.4);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.9);
    z-index: 2;
  }

  /* Mode 2: Daily Precipitation List Row - High Contrast 24h Timeline */
  .ios-daily-rain-container {
    display: flex;
    align-items: center;
    flex: 1 1 auto;
    min-width: 0;
    gap: 8px;
  }

  .ios-daily-rain-gauge {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1 1 auto;
    min-width: 0;
    height: 20px;
    background: transparent;
    border-radius: 0;
    padding: 0;
    gap: 2px;
  }

  .ios-daily-rain-tick {
    flex: 1 1 0;
    min-width: 0;
    height: 16px;
    background: rgba(255, 255, 255, 0.16);
    border-radius: 2px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: flex-end;
  }

  .ios-daily-rain-fill {
    width: 100%;
    background: linear-gradient(180deg, #38bdf8 0%, #0284c7 100%);
    box-shadow: 0 0 3px rgba(56, 189, 248, 0.7);
    border-radius: 1px;
    transition: height 0.3s ease;
  }

  .ios-daily-rain-tick.current-hour {
    border: 1.5px solid #ffffff !important;
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.95), inset 0 0 2px rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.22);
    height: 20px;
    z-index: 2;
    border-radius: 3px;
    overflow: visible;
  }

  .ios-rain-amount {
    font-size: 14px;
    font-weight: 500;
    color: #ffffff;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    text-align: right;
    white-space: nowrap;
    min-width: 48px;
    flex: 0 0 48px;
  }

  .ios-rain-prob {
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.65);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 3px;
    white-space: nowrap;
    min-width: 54px;
    flex: 0 0 54px;
  }

  .ios-rain-prob.has-rain {
    color: #38bdf8;
    font-weight: 600;
    text-shadow: 0 0 6px rgba(56, 189, 248, 0.7);
  }

  /* Mode 3: Daily Wind List Row */
  .ios-daily-wind-container {
    display: grid;
    grid-template-columns: 1fr 78px;
    align-items: center;
    gap: 8px;
  }

  .ios-daily-wind-wave {
    height: 20px;
    position: relative;
    display: flex;
    align-items: center;
  }

  .ios-daily-wind-range {
    font-size: 14px;
    font-weight: 500;
    color: var(--ios-text-primary);
    text-align: right;
  }

  /* Bottom Navigation Bar (iOS Weather Style) */
  .ios-bottom-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 4px 2px 4px;
    margin-top: -4px;
  }

  .ios-bottom-btn {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: var(--ios-glass-bg);
    border: 1px solid var(--ios-glass-border);
    backdrop-filter: blur(16px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--ios-text-primary);
    cursor: pointer;
    transition: transform 0.2s, background 0.2s;
  }

  .ios-bottom-btn:hover {
    background: var(--ios-glass-bg-hover);
    transform: scale(1.05);
  }

  .ios-bottom-btn svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
  }

  .ios-pager-pill {
    display: flex;
    align-items: center;
    background: rgba(0, 0, 0, 0.28);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 20px;
    padding: 6px 14px;
    gap: 8px;
    user-select: none;
  }

  .ios-pager-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    transition: transform 0.2s, background 0.2s;
  }

  .ios-pager-dot:hover {
    transform: scale(1.3);
    background: rgba(255, 255, 255, 0.7);
  }

  .ios-pager-dot.active {
    background: #ffffff;
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.85);
    transform: scale(1.15);
  }

  .ios-pager-arrow {
    width: 10px;
    height: 10px;
    fill: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    transition: transform 0.2s, fill 0.2s;
  }

  .ios-pager-arrow:hover {
    transform: scale(1.2);
    fill: rgba(255, 255, 255, 0.75);
  }

  .ios-pager-arrow.active {
    fill: #ffffff;
    filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.85));
    transform: scale(1.15);
  }

  /* Location Drawer (Apple Weather Style City List Modal) */
  .ios-location-drawer {
    position: absolute;
    inset: 0;
    z-index: 50;
    background: rgba(15, 23, 42, 0.88);
    backdrop-filter: blur(28px);
    -webkit-backdrop-filter: blur(28px);
    border-radius: 28px;
    padding: 20px 16px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    overflow-y: auto;
    animation: fadeIn 0.2s ease-out;
  }

  .ios-drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 6px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  }

  .ios-drawer-title {
    font-size: 18px;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.3px;
  }

  .ios-drawer-close-btn {
    padding: 6px 14px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #ffffff;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }

  .ios-drawer-close-btn:hover {
    background: rgba(255, 255, 255, 0.25);
  }

  .ios-city-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .ios-city-card {
    position: relative;
    padding: 14px 16px;
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%);
    border: 1px solid rgba(255, 255, 255, 0.16);
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: transform 0.2s, background 0.2s, border-color 0.2s;
  }

  .ios-city-card:hover {
    transform: scale(1.015);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.09) 100%);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .ios-city-card.active {
    border-color: #38bdf8;
    box-shadow: 0 0 16px rgba(56, 189, 248, 0.4), inset 0 0 12px rgba(56, 189, 248, 0.15);
  }

  .ios-city-left {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .ios-city-name {
    font-size: 16px;
    font-weight: 700;
    color: #ffffff;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .ios-city-condition {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.7);
  }

  .ios-city-right {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .ios-city-temp {
    font-size: 24px;
    font-weight: 300;
    color: #ffffff;
  }

  .ios-city-delete-btn {
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    padding: 6px;
    border-radius: 50%;
    transition: color 0.2s, background 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ios-city-delete-btn:hover {
    color: #ef4444;
    background: rgba(239, 68, 68, 0.2);
  }

  .ios-add-city-section {
    margin-top: 6px;
    padding: 12px 14px;
    border-radius: 16px;
    background: rgba(0, 0, 0, 0.25);
    border: 1px dashed rgba(255, 255, 255, 0.2);
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .ios-add-city-select {
    flex: 1;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #ffffff;
    border-radius: 12px;
    padding: 8px 10px;
    font-size: 13px;
    outline: none;
  }

  .ios-add-city-select option {
    background: #0f172a;
    color: #ffffff;
  }

  .ios-add-city-btn {
    padding: 8px 14px;
    border-radius: 12px;
    background: #0284c7;
    border: none;
    color: #ffffff;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    white-space: nowrap;
  }

  .ios-add-city-btn:hover {
    background: #0369a1;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* ----------------------------------------------------
     APPLE WEATHER DETAIL TILES (2-Column Grid)
     ---------------------------------------------------- */
  .ios-detail-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    width: 100%;
    margin-top: 2px;
    margin-bottom: 8px;
  }

  @media (max-width: 280px) {
    .ios-detail-grid {
      grid-template-columns: 1fr;
    }
  }

  .ios-detail-tile {
    background: var(--ios-glass-bg);
    border: 1px solid var(--ios-glass-border);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-radius: 20px;
    padding: 13px 13px 11px 13px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 140px;
    box-shadow: var(--ios-glass-shadow);
    transition: transform 0.2s ease, background 0.2s ease;
    box-sizing: border-box;
  }

  /* Handle odd last tile (e.g. tile #9 - Pressure) so it stretches gracefully across full width */
  .ios-detail-tile:last-child:nth-child(odd) {
    grid-column: 1 / -1;
  }

  .ios-detail-tile:last-child:nth-child(odd) .ios-tile-footer {
    text-align: center;
  }

  .ios-detail-tile:hover {
    background: var(--ios-glass-bg-hover);
  }

  .ios-tile-header {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--ios-text-secondary);
    letter-spacing: 0.5px;
    margin-bottom: 6px;
  }

  .ios-tile-icon {
    width: 13px;
    height: 13px;
    fill: currentColor;
    opacity: 0.85;
    flex-shrink: 0;
  }

  .ios-tile-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .ios-tile-body {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
  }

  .ios-tile-body.center-content {
    align-items: center;
    justify-content: center;
  }

  .ios-stat-value {
    font-size: 26px;
    font-weight: 300;
    letter-spacing: -0.5px;
    line-height: 1.1;
    color: #ffffff;
  }

  .ios-stat-sub {
    font-size: 12.5px;
    font-weight: 500;
    color: var(--ios-text-secondary);
    margin-top: 2px;
  }

  /* Feels Like Gauge */
  .ios-diff-bar-container {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
  }

  .ios-diff-track {
    flex: 1;
    height: 4px;
    background: rgba(255, 255, 255, 0.18);
    border-radius: 2px;
    position: relative;
    overflow: hidden;
  }

  .ios-diff-fill {
    position: absolute;
    top: 0;
    height: 100%;
    border-radius: 2px;
  }

  .ios-diff-fill.cooler {
    background: #38bdf8;
  }

  .ios-diff-fill.warmer {
    background: #fb923c;
  }

  .ios-diff-fill.neutral {
    background: rgba(255, 255, 255, 0.6);
  }

  .ios-diff-badge {
    font-size: 10px;
    font-weight: 700;
    padding: 1px 6px;
    border-radius: 8px;
    white-space: nowrap;
  }

  .ios-diff-badge.cooler {
    background: rgba(56, 189, 248, 0.25);
    color: #7dd3fc;
    border: 1px solid rgba(56, 189, 248, 0.4);
  }

  .ios-diff-badge.warmer {
    background: rgba(249, 115, 22, 0.25);
    color: #fdba74;
    border: 1px solid rgba(249, 115, 22, 0.4);
  }

  .ios-diff-badge.neutral {
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
  }

  /* Wind Compass Dial */
  .ios-compass-dial {
    width: 86px;
    height: 86px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ios-compass-svg {
    width: 100%;
    height: 100%;
  }

  .ios-cardinal {
    font-size: 9px;
    font-weight: 700;
    fill: rgba(255, 255, 255, 0.85);
  }

  .ios-compass-speed {
    font-size: 17px;
    font-weight: 600;
    letter-spacing: -0.5px;
    fill: #ffffff;
  }

  .ios-compass-unit {
    font-size: 9px;
    font-weight: 500;
    fill: var(--ios-text-secondary);
  }

  /* Moon Phase Sphere */
  .ios-moon-container {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ios-moon-svg {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4));
  }

  /* Sun Arc Curve */
  .ios-sun-arc-box {
    width: 100%;
    height: 48px;
    margin-top: 4px;
  }

  .ios-sun-arc-svg {
    width: 100%;
    height: 100%;
  }

  /* UV Gradient Bar */
  .ios-uv-bar-wrapper {
    margin-top: 8px;
  }

  .ios-uv-bar {
    height: 5px;
    border-radius: 3px;
    background: linear-gradient(90deg, #22c55e 0%, #eab308 25%, #f97316 50%, #ef4444 75%, #a855f7 100%);
    position: relative;
  }

  .ios-uv-marker {
    position: absolute;
    top: -2.5px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ffffff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    transform: translateX(-50%);
  }

  /* Pressure Barometer Dial */
  .ios-pressure-gauge {
    width: 90px;
    height: 76px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ios-pressure-svg {
    width: 100%;
    height: 100%;
  }

  .ios-pressure-symbol {
    font-size: 11px;
    fill: rgba(255, 255, 255, 0.7);
  }

  .ios-pressure-val {
    font-size: 13px;
    font-weight: 600;
    fill: #ffffff;
  }

  .ios-pressure-unit {
    font-size: 9px;
    font-weight: 500;
    fill: var(--ios-text-secondary);
  }

  .ios-pressure-arrow {
    font-size: 12px;
    fill: rgba(255, 255, 255, 0.6);
  }

  /* Tile Footer Note */
  .ios-tile-footer {
    font-size: 11.5px;
    line-height: 1.3;
    color: var(--ios-text-secondary);
    margin-top: 6px;
    padding-top: 4px;
    white-space: normal;
  }
`;
function getWeatherBackground(condition, isNight) {
  const cond = condition.toLowerCase();
  if (isNight) {
    if (cond.includes("thunder") || cond.includes("lightning")) {
      return "linear-gradient(180deg, #101221 0%, #1c1d33 50%, #282845 100%)";
    }
    if (cond.includes("rain") || cond.includes("pouring")) {
      return "linear-gradient(180deg, #131b29 0%, #1e2a3d 50%, #29374d 100%)";
    }
    if (cond.includes("cloud")) {
      return "linear-gradient(180deg, #0f1828 0%, #1a263d 50%, #273854 100%)";
    }
    if (cond.includes("snow")) {
      return "linear-gradient(180deg, #1a2232 0%, #293448 50%, #3a4860 100%)";
    }
    return "linear-gradient(180deg, #0a1122 0%, #121f3b 50%, #1c2e54 100%)";
  }
  switch (cond) {
    case "sunny":
    case "clear":
    case "clear-day":
      return "linear-gradient(180deg, #1d5cb6 0%, #2974d6 45%, #4295f5 100%)";
    case "partlycloudy":
    case "partly-cloudy":
    case "partly-cloudy-day":
      return "linear-gradient(180deg, #1b4d88 0%, #2767b0 45%, #3d87d4 100%)";
    case "cloudy":
    case "overcast":
      return "linear-gradient(180deg, #374151 0%, #2e3745 45%, #1f2631 100%)";
    case "rainy":
    case "pouring":
    case "rain":
    case "extreme-rain":
      return "linear-gradient(180deg, #1e293b 0%, #273549 45%, #16202c 100%)";
    case "lightning":
    case "lightning-rainy":
    case "thunderstorm":
      return "linear-gradient(180deg, #0f172a 0%, #1e1b4b 45%, #16162a 100%)";
    case "snowy":
    case "snow":
    case "snowy-rainy":
    case "sleet":
    case "hail":
      return "linear-gradient(180deg, #334155 0%, #475569 45%, #64748b 100%)";
    case "fog":
    case "windy":
    case "windy-variant":
      return "linear-gradient(180deg, #374151 0%, #475569 45%, #64748b 100%)";
    default:
      return "linear-gradient(180deg, #2563eb 0%, #3b82f6 45%, #60a5fa 100%)";
  }
}
const en = {
  now: "Now",
  today: "Today",
  highlights: "Highlights",
  hourly_forecast: "Hourly Forecast",
  overview_24h: "Overview · Next 24 Hours",
  precipitation: "Precipitation",
  rain_subtitle: "Intensity · Chance of Rain",
  wind: "Wind",
  wind_subtitle: "Speed · Gusts",
  ten_day_forecast: "10-Day Forecast",
  sunrise: "Sunrise",
  sunset: "Sunset",
  format_high_low: (high, low) => `H:${high} L:${low}`,
  format_percent: (val) => `${val}%`,
  conditions: {
    "clear": "Clear",
    "clear-day": "Clear",
    "clear-night": "Clear Night",
    "sunny": "Sunny",
    "partlycloudy": "Partly Cloudy",
    "partly-cloudy": "Partly Cloudy",
    "partly-cloudy-day": "Partly Cloudy",
    "partly-cloudy-night": "Partly Cloudy",
    "cloudy": "Cloudy",
    "overcast": "Overcast",
    "fog": "Foggy",
    "hail": "Hail",
    "lightning": "Thunderstorm",
    "lightning-rainy": "Thunderstorms & Rain",
    "pouring": "Heavy Rain",
    "rainy": "Rain",
    "snowy": "Snow",
    "snowy-rainy": "Sleet",
    "windy": "Windy",
    "windy-variant": "Windy",
    "exceptional": "Alert"
  },
  summaries: {
    rain_expected: (time) => `Rainy conditions expected around ${time}.`,
    cloudy_evening: "Cloudy skies expected to continue into the evening.",
    showers_taper: "Showers expected to taper off later.",
    clear_comfortable: "Clear skies with comfortable conditions ahead.",
    wind_gusts: (speed, unit) => `Gusty winds up to ${speed} ${unit} expected within the next 24 hours.`,
    temp_above_normal: "The high temperatures will be above normal over the coming days.",
    temp_cooler: "Cooler temperatures expected through the upcoming week.",
    temp_steady: "Temperatures will remain steady with typical seasonal patterns."
  },
  details: {
    feels_like: "Feels Like",
    actual: "Actual",
    feels_wind_cooler: "Wind is making it feel cooler.",
    feels_humidity_warmer: "Humidity is making it feel warmer.",
    feels_similar: "Similar to the actual temperature.",
    wind: "Wind",
    cardinal_n: "N",
    cardinal_e: "E",
    cardinal_s: "S",
    cardinal_w: "W",
    gusts: (speed, unit) => `Gusts up to ${speed} ${unit}`,
    calm_wind: "Calm wind",
    strong_wind: "Strong wind",
    sunset: "Sunset",
    sunrise: "Sunrise",
    moon_phase: "Moon Phase",
    illumination: (pct) => `Illumination: ${pct}%`,
    moon_phases: {
      new_moon: "New Moon",
      waxing_crescent: "Waxing Crescent",
      first_quarter: "First Quarter",
      waxing_gibbous: "Waxing Gibbous",
      full_moon: "Full Moon",
      waning_gibbous: "Waning Gibbous",
      last_quarter: "Last Quarter",
      waning_crescent: "Waning Crescent"
    },
    uv_index: "UV Index",
    uv_levels: {
      low: "Low",
      moderate: "Moderate",
      high: "High",
      very_high: "Very High",
      extreme: "Extreme"
    },
    uv_advice_low: "Low for the rest of the day.",
    uv_advice_mod: "Stay in shade near midday.",
    uv_advice_high: "Use sun protection.",
    uv_advice_extreme: "Take extra protection precautions.",
    precipitation: "Precipitation",
    precip_in_24h: "in last 24 hours",
    precip_expected_24h: (amount, unit) => `${amount} ${unit} expected in next 24 hours.`,
    no_precip_expected: "No precipitation expected in next 24 hours.",
    visibility: "Visibility",
    vis_fog: "Fog is significantly affecting visibility.",
    vis_haze: "Haze is affecting visibility.",
    vis_good: "Good visibility.",
    vis_perfect: "Perfectly clear visibility.",
    humidity: "Humidity",
    dew_point: (temp) => `The dew point is ${temp}° right now.`,
    pressure: "Pressure",
    pressure_stable: "Pressure is steady.",
    pressure_rising: "Pressure is rising.",
    pressure_falling: "Pressure is falling."
  }
};
const tr = {
  now: "Şu An",
  today: "Bugün",
  highlights: "Öne Çıkanlar",
  hourly_forecast: "Saatlik Tahmin",
  overview_24h: "Genel Bakış · Gelecek 24 Saat",
  precipitation: "Yağış",
  rain_subtitle: "Yoğunluk · Yağmur Olasılığı",
  wind: "Rüzgar",
  wind_subtitle: "Hız · Rüzgar Hamlesi",
  ten_day_forecast: "10 Günlük Tahmin",
  sunrise: "Gün Doğumu",
  sunset: "Gün Batımı",
  format_high_low: (high, low) => `D:${low} Y:${high}`,
  format_percent: (val) => `%${val}`,
  conditions: {
    "clear": "Açık",
    "clear-day": "Açık",
    "clear-night": "Açık Gece",
    "sunny": "Güneşli",
    "partlycloudy": "Parçalı Bulutlu",
    "partly-cloudy": "Parçalı Bulutlu",
    "partly-cloudy-day": "Parçalı Bulutlu",
    "partly-cloudy-night": "Parçalı Bulutlu",
    "cloudy": "Bulutlu",
    "overcast": "Kapalı",
    "fog": "Sisli",
    "hail": "Dolu",
    "lightning": "Gök Gürültülü Fırtına",
    "lightning-rainy": "Fırtına ve Yağış",
    "pouring": "Şiddetli Yağmur",
    "rainy": "Yağmurlu",
    "snowy": "Karlı",
    "snowy-rainy": "Karla Karışık Yağmur",
    "windy": "Rüzgarlı",
    "windy-variant": "Rüzgarlı",
    "exceptional": "Hava Uyarısı"
  },
  summaries: {
    rain_expected: (time) => `Saat ${time} civarında yağış bekleniyor.`,
    cloudy_evening: "Bulutlu havanın akşama kadar sürmesi bekleniyor.",
    showers_taper: "Yağışların ilerleyen saatlerde azalması bekleniyor.",
    clear_comfortable: "Açık ve konforlu bir hava bekleniyor.",
    wind_gusts: (speed, unit) => `Gelecek 24 saat içinde ${speed} ${unit} değerine varan rüzgar bekleniyor.`,
    temp_above_normal: "Önümüzdeki günlerde sıcaklıklar mevsim normallerinin üzerinde seyredecek.",
    temp_cooler: "Gelecek hafta boyunca daha serin sıcaklıklar bekleniyor.",
    temp_steady: "Sıcaklıklar tipik mevsim normallerinde seyredecek."
  },
  details: {
    feels_like: "Hissedilen",
    actual: "Gerçek",
    feels_wind_cooler: "Rüzgâr, daha serin hissettiriyor.",
    feels_humidity_warmer: "Nem, daha sıcak hissettiriyor.",
    feels_similar: "Gerçek sıcaklığa benzer.",
    wind: "Rüzgâr",
    cardinal_n: "K",
    cardinal_e: "D",
    cardinal_s: "G",
    cardinal_w: "B",
    gusts: (speed, unit) => `Ani rüzgârlar: ${speed} ${unit}`,
    calm_wind: "Sakin rüzgâr",
    strong_wind: "Kuvvetli rüzgâr",
    sunset: "Gün Batımı",
    sunrise: "Gün Doğumu",
    moon_phase: "Ay Evresi",
    illumination: (pct) => `Aydınlanma: %${pct}`,
    moon_phases: {
      new_moon: "Yeni Ay",
      waxing_crescent: "Hilal",
      first_quarter: "İlk Dördün",
      waxing_gibbous: "Büyüyen Şişkin Ay",
      full_moon: "Dolunay",
      waning_gibbous: "Küçülen Şişkin Ay",
      last_quarter: "Son Dördün",
      waning_crescent: "Hilal"
    },
    uv_index: "UV İndeksi",
    uv_levels: {
      low: "Düşük",
      moderate: "Orta",
      high: "Yüksek",
      very_high: "Çok Yüksek",
      extreme: "Aşırı"
    },
    uv_advice_low: "Tüm gün düşük düzeyde.",
    uv_advice_mod: "Öğle saatlerinde gölgede kalın.",
    uv_advice_high: "Güneş koruyucu kullanın.",
    uv_advice_extreme: "Ekstra koruma önlemleri alın.",
    precipitation: "Yağış",
    precip_in_24h: "son 24 saat içinde",
    precip_expected_24h: (amount, unit) => `24 saat içinde ${amount} ${unit} bekleniyor.`,
    no_precip_expected: "Gelecek 24 saatte yağış beklenmiyor.",
    visibility: "Görüş Mesafesi",
    vis_fog: "Yoğun sis görüş mesafesini kısıtlıyor.",
    vis_haze: "Pus, görüş mesafesini etkiliyor.",
    vis_good: "Görüş mesafesi iyi durumda.",
    vis_perfect: "Görüş mesafesi tamamen berrak.",
    humidity: "Nem Oranı",
    dew_point: (temp) => `Çiy noktası şu anda ${temp}°.`,
    pressure: "Basınç",
    pressure_stable: "Basınç dengeli ve stabil.",
    pressure_rising: "Basınç yükseliyor.",
    pressure_falling: "Basınç düşüyor."
  }
};
const de = {
  now: "Jetzt",
  today: "Heute",
  highlights: "Highlights",
  hourly_forecast: "Stündliche Vorhersage",
  overview_24h: "Übersicht · Nächste 24 Stunden",
  precipitation: "Niederschlag",
  rain_subtitle: "Intensität · Regenwahrscheinlichkeit",
  wind: "Wind",
  wind_subtitle: "Geschwindigkeit · Böen",
  ten_day_forecast: "10-Tage-Vorhersage",
  sunrise: "Sonnenaufgang",
  sunset: "Sonnenuntergang",
  format_high_low: (high, low) => `T:${low} H:${high}`,
  format_percent: (val) => `${val}%`,
  conditions: {
    "clear": "Klar",
    "clear-day": "Klar",
    "clear-night": "Klare Nacht",
    "sunny": "Sonnig",
    "partlycloudy": "Teilweise bewölkt",
    "partly-cloudy": "Teilweise bewölkt",
    "partly-cloudy-day": "Teilweise bewölkt",
    "partly-cloudy-night": "Teilweise bewölkt",
    "cloudy": "Bewölkt",
    "overcast": "Bedeckt",
    "fog": "Neblig",
    "hail": "Hagel",
    "lightning": "Gewitter",
    "lightning-rainy": "Gewitter mit Regen",
    "pouring": "Starker Regen",
    "rainy": "Regnerisch",
    "snowy": "Schneefall",
    "snowy-rainy": "Schneeregen",
    "windy": "Windig",
    "windy-variant": "Windig",
    "exceptional": "Wetterwarnung"
  },
  summaries: {
    rain_expected: (time) => `Regen erwartet gegen ${time}.`,
    cloudy_evening: "Bewölkter Himmel hält bis zum Abend an.",
    showers_taper: "Schauer lassen später nach.",
    clear_comfortable: "Klarer Himmel und angenehmes Wetter voraus.",
    wind_gusts: (speed, unit) => `Böen bis zu ${speed} ${unit} in den nächsten 24 Stunden erwartet.`,
    temp_above_normal: "Die Höchsttemperaturen werden in den kommenden Tagen über dem Durchschnitt liegen.",
    temp_cooler: "Kühlere Temperaturen für die kommende Woche erwartet.",
    temp_steady: "Die Temperaturen bleiben im saisonüblichen Bereich."
  },
  details: {
    feels_like: "Gefühlt",
    actual: "Tatsächlich",
    feels_wind_cooler: "Wind lässt es kühler wirken.",
    feels_humidity_warmer: "Luftfeuchtigkeit lässt es wärmer wirken.",
    feels_similar: "Ähnlich wie die tatsächliche Temperatur.",
    wind: "Wind",
    cardinal_n: "N",
    cardinal_e: "O",
    cardinal_s: "S",
    cardinal_w: "W",
    gusts: (speed, unit) => `Böen bis zu ${speed} ${unit}`,
    calm_wind: "Ruhiger Wind",
    strong_wind: "Starker Wind",
    sunset: "Sonnenuntergang",
    sunrise: "Sonnenaufgang",
    moon_phase: "Mondphase",
    illumination: (pct) => `Beleuchtung: ${pct}%`,
    moon_phases: {
      new_moon: "Neumond",
      waxing_crescent: "Zunehmende Sichel",
      first_quarter: "Erstes Viertel",
      waxing_gibbous: "Zunehmender Mond",
      full_moon: "Vollmond",
      waning_gibbous: "Abnehmender Mond",
      last_quarter: "Letztes Viertel",
      waning_crescent: "Abnehmende Sichel"
    },
    uv_index: "UV-Index",
    uv_levels: {
      low: "Niedrig",
      moderate: "Mäßig",
      high: "Hoch",
      very_high: "Sehr hoch",
      extreme: "Extrem"
    },
    uv_advice_low: "Den restlichen Tag niedrig.",
    uv_advice_mod: "Mittags Schatten aufsuchen.",
    uv_advice_high: "Sonnenschutz verwenden.",
    uv_advice_extreme: "Besondere Schutzmaßnahmen erforderlich.",
    precipitation: "Niederschlag",
    precip_in_24h: "in den letzten 24 Std.",
    precip_expected_24h: (amount, unit) => `${amount} ${unit} in den nächsten 24 Stunden erwartet.`,
    no_precip_expected: "In den nächsten 24 Std. kein Niederschlag erwartet.",
    visibility: "Sichtweite",
    vis_fog: "Dichter Nebel schränkt die Sicht stark ein.",
    vis_haze: "Dunst beeinträchtigt die Sicht.",
    vis_good: "Gute Sichtverhältnisse.",
    vis_perfect: "Hervorragende, klare Sicht.",
    humidity: "Luftfeuchtigkeit",
    dew_point: (temp) => `Der Taupunkt liegt derzeit bei ${temp}°.`,
    pressure: "Luftdruck",
    pressure_stable: "Luftdruck ist stabil.",
    pressure_rising: "Luftdruck steigt.",
    pressure_falling: "Luftdruck fällt."
  }
};
const es = {
  now: "Ahora",
  today: "Hoy",
  highlights: "Destacados",
  hourly_forecast: "Pronóstico por horas",
  overview_24h: "Resumen · Próximas 24 horas",
  precipitation: "Precipitación",
  rain_subtitle: "Intensidad · Probabilidad de lluvia",
  wind: "Viento",
  wind_subtitle: "Velocidad · Rachas",
  ten_day_forecast: "Pronóstico de 10 días",
  sunrise: "Amanecer",
  sunset: "Atardecer",
  format_high_low: (high, low) => `Mín:${low} Máx:${high}`,
  format_percent: (val) => `${val}%`,
  conditions: {
    "clear": "Despejado",
    "clear-day": "Despejado",
    "clear-night": "Noche despejada",
    "sunny": "Soleado",
    "partlycloudy": "Parcialmente nublado",
    "partly-cloudy": "Parcialmente nublado",
    "partly-cloudy-day": "Parcialmente nublado",
    "partly-cloudy-night": "Parcialmente nublado",
    "cloudy": "Nublado",
    "overcast": "Cubierto",
    "fog": "Niebla",
    "hail": "Granizo",
    "lightning": "Tormenta eléctrica",
    "lightning-rainy": "Tormenta con lluvia",
    "pouring": "Lluvia fuerte",
    "rainy": "Lluvioso",
    "snowy": "Nieve",
    "snowy-rainy": "Aguanieve",
    "windy": "Ventoso",
    "windy-variant": "Ventoso",
    "exceptional": "Aviso meteorológico"
  },
  summaries: {
    rain_expected: (time) => `Se esperan lluvias hacia las ${time}.`,
    cloudy_evening: "Se espera cielo nublado hasta la noche.",
    showers_taper: "Se espera que las lluvias disminuyan más tarde.",
    clear_comfortable: "Cielo despejado con condiciones agradables.",
    wind_gusts: (speed, unit) => `Rachas de hasta ${speed} ${unit} esperadas en las próximas 24 horas.`,
    temp_above_normal: "Las temperaturas máximas estarán por encima de lo normal en los próximos días.",
    temp_cooler: "Se esperan temperaturas más frescas durante la próxima semana.",
    temp_steady: "Las temperaturas se mantendrán estables dentro de los patrones habituales."
  },
  details: {
    feels_like: "Sensación térmica",
    actual: "Real",
    feels_wind_cooler: "El viento hace que se sienta más fresco.",
    feels_humidity_warmer: "La humedad hace que se sienta más cálido.",
    feels_similar: "Similar a la temperatura real.",
    wind: "Viento",
    cardinal_n: "N",
    cardinal_e: "E",
    cardinal_s: "S",
    cardinal_w: "O",
    gusts: (speed, unit) => `Rachas de hasta ${speed} ${unit}`,
    calm_wind: "Viento en calma",
    strong_wind: "Viento fuerte",
    sunset: "Atardecer",
    sunrise: "Amanecer",
    moon_phase: "Fase lunar",
    illumination: (pct) => `Iluminación: ${pct}%`,
    moon_phases: {
      new_moon: "Luna nueva",
      waxing_crescent: "Luna creciente",
      first_quarter: "Cuarto creciente",
      waxing_gibbous: "Gibosa creciente",
      full_moon: "Luna llena",
      waning_gibbous: "Gibosa menguante",
      last_quarter: "Cuarto menguante",
      waning_crescent: "Luna menguante"
    },
    uv_index: "Índice UV",
    uv_levels: {
      low: "Bajo",
      moderate: "Moderado",
      high: "Alto",
      very_high: "Muy alto",
      extreme: "Extremo"
    },
    uv_advice_low: "Bajo durante el resto del día.",
    uv_advice_mod: "Permanezca a la sombra en las horas centrales.",
    uv_advice_high: "Use protección solar.",
    uv_advice_extreme: "Tome precauciones de protección adicionales.",
    precipitation: "Precipitación",
    precip_in_24h: "en las últimas 24 h",
    precip_expected_24h: (amount, unit) => `${amount} ${unit} esperados en las próximas 24 horas.`,
    no_precip_expected: "No se esperan precipitaciones en las próximas 24 horas.",
    visibility: "Visibilidad",
    vis_fog: "La niebla densa reduce considerablemente la visibilidad.",
    vis_haze: "La calina afecta la visibilidad.",
    vis_good: "Buena visibilidad.",
    vis_perfect: "Visibilidad perfectamente despejada.",
    humidity: "Humedad",
    dew_point: (temp) => `El punto de rocío es ${temp}° ahora.`,
    pressure: "Presión",
    pressure_stable: "Presión atmosférica estable.",
    pressure_rising: "La presión está subiendo.",
    pressure_falling: "La presión está bajando."
  }
};
const fr = {
  now: "Maintenant",
  today: "Aujourd'hui",
  highlights: "Points forts",
  hourly_forecast: "Prévisions horaires",
  overview_24h: "Aperçu · Prochaines 24 heures",
  precipitation: "Précipitations",
  rain_subtitle: "Intensité · Risque de pluie",
  wind: "Vent",
  wind_subtitle: "Vitesse · Rafales",
  ten_day_forecast: "Prévisions sur 10 jours",
  sunrise: "Lever du soleil",
  sunset: "Coucher du soleil",
  format_high_low: (high, low) => `Min:${low} Max:${high}`,
  format_percent: (val) => `${val}%`,
  conditions: {
    "clear": "Dégagé",
    "clear-day": "Dégagé",
    "clear-night": "Nuit claire",
    "sunny": "Ensoleillé",
    "partlycloudy": "Partiellement nuageux",
    "partly-cloudy": "Partiellement nuageux",
    "partly-cloudy-day": "Partiellement nuageux",
    "partly-cloudy-night": "Partiellement nuageux",
    "cloudy": "Nuageux",
    "overcast": "Couvert",
    "fog": "Brouillard",
    "hail": "Grêle",
    "lightning": "Orage",
    "lightning-rainy": "Orage et pluie",
    "pouring": "Forte pluie",
    "rainy": "Pluvieux",
    "snowy": "Neige",
    "snowy-rainy": "Pluie et neige",
    "windy": "Venteux",
    "windy-variant": "Venteux",
    "exceptional": "Alerte météo"
  },
  summaries: {
    rain_expected: (time) => `Pluie attendue vers ${time}.`,
    cloudy_evening: "Ciel nuageux prévu jusqu'en soirée.",
    showers_taper: "Les averses devraient s'estomper plus tard.",
    clear_comfortable: "Ciel dégagé et conditions agréables prévues.",
    wind_gusts: (speed, unit) => `Rafales jusqu'à ${speed} ${unit} prévues dans les 24 prochaines heures.`,
    temp_above_normal: "Les températures maximales seront supérieures aux normales ces prochains jours.",
    temp_cooler: "Des températures plus fraîches sont attendues pour la semaine à venir.",
    temp_steady: "Les températures resteront conformes aux normales saisonnières."
  },
  details: {
    feels_like: "Ressenti",
    actual: "Réelle",
    feels_wind_cooler: "Le vent accentue la sensation de fraîcheur.",
    feels_humidity_warmer: "L'humidité accentue la sensation de chaleur.",
    feels_similar: "Semblable à la température réelle.",
    wind: "Vent",
    cardinal_n: "N",
    cardinal_e: "E",
    cardinal_s: "S",
    cardinal_w: "O",
    gusts: (speed, unit) => `Rafales jusqu'à ${speed} ${unit}`,
    calm_wind: "Vent calme",
    strong_wind: "Vent fort",
    sunset: "Coucher du soleil",
    sunrise: "Lever du soleil",
    moon_phase: "Phase de la lune",
    illumination: (pct) => `Éclairée à ${pct}%`,
    moon_phases: {
      new_moon: "Nouvelle lune",
      waxing_crescent: "Premier croissant",
      first_quarter: "Premier quartier",
      waxing_gibbous: "Gibbeuse croissante",
      full_moon: "Pleine lune",
      waning_gibbous: "Gibbeuse décroissante",
      last_quarter: "Dernier quartier",
      waning_crescent: "Dernier croissant"
    },
    uv_index: "Indice UV",
    uv_levels: {
      low: "Faible",
      moderate: "Modéré",
      high: "Élevé",
      very_high: "Très élevé",
      extreme: "Extrême"
    },
    uv_advice_low: "Faible pour le reste de la journée.",
    uv_advice_mod: "Recherchez de lombre vers midi.",
    uv_advice_high: "Appliquez une protection solaire.",
    uv_advice_extreme: "Précautions de protection maximales requises.",
    precipitation: "Précipitations",
    precip_in_24h: "ces dernières 24h",
    precip_expected_24h: (amount, unit) => `${amount} ${unit} attendus dans les prochaines 24h.`,
    no_precip_expected: "Aucune précipitation attendue ces prochaines 24h.",
    visibility: "Visibilité",
    vis_fog: "Brouillard dense réduisant la visibilité.",
    vis_haze: "Brume affectant la visibilité.",
    vis_good: "Bonne visibilité.",
    vis_perfect: "Visibilité parfaitement dégagée.",
    humidity: "Humidité",
    dew_point: (temp) => `Point de rosée actuel : ${temp}°.`,
    pressure: "Pression",
    pressure_stable: "Pression atmosphérique stable.",
    pressure_rising: "La pression monte.",
    pressure_falling: "La pression baisse."
  }
};
const translations = {
  en,
  tr,
  de,
  es,
  fr
};
class TranslationService {
  getLocale(localeStr) {
    if (!localeStr) return "en";
    const clean = localeStr.toLowerCase().split(/[-_]/)[0];
    return translations[clean] ? clean : "en";
  }
  get(localeStr) {
    const lang = this.getLocale(localeStr);
    return translations[lang] || en;
  }
  translateCondition(condition, localeStr) {
    const t2 = this.get(localeStr);
    const key = (condition || "").toLowerCase().replace(/_/g, "-");
    return t2.conditions[key] || (condition ? condition.charAt(0).toUpperCase() + condition.slice(1) : "Fair");
  }
}
const translationService = new TranslationService();
class HassService {
  isNight(hass, sunEntityId) {
    const sunId = sunEntityId || "sun.sun";
    const sun = hass.states[sunId];
    if (sun) {
      return sun.state === "below_horizon";
    }
    const hour = (/* @__PURE__ */ new Date()).getHours();
    return hour < 6 || hour >= 20;
  }
  getSunTimes(hass, sunEntityId) {
    const sunId = sunEntityId || "sun.sun";
    const sun = hass.states[sunId];
    if (!sun || !sun.attributes) return {};
    return {
      nextRising: sun.attributes.next_rising,
      nextSetting: sun.attributes.next_setting
    };
  }
  getFriendlyCondition(condition, locale) {
    return translationService.translateCondition(condition, locale);
  }
  getTemperatureUnit(hass, entityState) {
    if (entityState?.attributes?.temperature_unit) {
      return entityState.attributes.temperature_unit;
    }
    return hass?.config?.unit_system?.temperature || "°C";
  }
  getWindSpeedUnit(hass, entityState) {
    if (entityState?.attributes?.wind_speed_unit) {
      return entityState.attributes.wind_speed_unit;
    }
    const isImperial = hass?.config?.unit_system?.length === "mi";
    return isImperial ? "mph" : "km/h";
  }
  getPrecipitationUnit(hass, entityState) {
    if (entityState?.attributes?.precipitation_unit) {
      return entityState.attributes.precipitation_unit;
    }
    const isImperial = hass?.config?.unit_system?.length === "mi";
    return isImperial ? "in" : "mm";
  }
  formatTemperature(temp, round = true) {
    if (temp === void 0 || temp === null || isNaN(temp)) return "--";
    return round ? `${Math.round(temp)}°` : `${temp.toFixed(1)}°`;
  }
}
const hassService = new HassService();
class ForecastService {
  constructor() {
    this.hourlyUnsubscribe = null;
    this.dailyUnsubscribe = null;
    this.currentEntityId = null;
  }
  async subscribeForecasts(hass, entityId, onHourlyUpdate, onDailyUpdate) {
    this.unsubscribeAll();
    this.currentEntityId = entityId;
    const entity = hass.states[entityId];
    if (!entity) return () => {
    };
    try {
      if (hass.connection && typeof hass.connection.subscribeMessage === "function") {
        const unsubHourly = await hass.connection.subscribeMessage(
          (event) => {
            if (event?.forecast) {
              onHourlyUpdate(event.forecast);
            }
          },
          {
            type: "weather/subscribe_forecast",
            forecast_type: "hourly",
            entity_id: entityId
          }
        );
        this.hourlyUnsubscribe = unsubHourly;
      }
    } catch (e2) {
      this.fetchForecastFallback(hass, entityId, "hourly", onHourlyUpdate);
    }
    try {
      if (hass.connection && typeof hass.connection.subscribeMessage === "function") {
        const unsubDaily = await hass.connection.subscribeMessage(
          (event) => {
            if (event?.forecast) {
              onDailyUpdate(event.forecast);
            }
          },
          {
            type: "weather/subscribe_forecast",
            forecast_type: "daily",
            entity_id: entityId
          }
        );
        this.dailyUnsubscribe = unsubDaily;
      }
    } catch (e2) {
      this.fetchForecastFallback(hass, entityId, "daily", onDailyUpdate);
    }
    if (entity.attributes?.forecast && Array.isArray(entity.attributes.forecast)) {
      onDailyUpdate(entity.attributes.forecast);
    }
    return () => this.unsubscribeAll();
  }
  async fetchForecastFallback(hass, entityId, forecastType, callback) {
    try {
      const response = await hass.callWS({
        type: "weather/get_forecasts",
        entity_ids: [entityId],
        forecast_type: forecastType
      });
      if (response && response[entityId]?.forecast) {
        callback(response[entityId].forecast);
      }
    } catch {
      const entity = hass.states[entityId];
      if (entity?.attributes?.forecast) {
        callback(entity.attributes.forecast);
      }
    }
  }
  unsubscribeAll() {
    if (this.hourlyUnsubscribe) {
      try {
        this.hourlyUnsubscribe();
      } catch {
      }
      this.hourlyUnsubscribe = null;
    }
    if (this.dailyUnsubscribe) {
      try {
        this.dailyUnsubscribe();
      } catch {
      }
      this.dailyUnsubscribe = null;
    }
  }
}
const forecastService = new ForecastService();
class LocationService {
  constructor() {
    this._cachedLocation = null;
    this._fetchPromise = null;
  }
  /**
   * Automatically resolves the district, city, or town name from Home Assistant's
   * coordinates (reverse geocoding) or geocoded companion app sensors.
   */
  async resolveLocationName(hass, locale = "tr") {
    if (this._cachedLocation) {
      return this._cachedLocation;
    }
    const geocodedSensors = Object.keys(hass.states).filter(
      (id) => id.startsWith("sensor.") && (id.includes("geocoded_location") || id.includes("geo_location"))
    );
    for (const sensorId of geocodedSensors) {
      const stateObj = hass.states[sensorId];
      if (stateObj?.attributes) {
        const locality = stateObj.attributes.Locality || stateObj.attributes.locality || stateObj.attributes.City || stateObj.attributes.city;
        if (locality && typeof locality === "string" && locality.trim()) {
          this._cachedLocation = locality.trim();
          return this._cachedLocation;
        }
      }
      if (stateObj?.state && stateObj.state !== "unknown" && stateObj.state !== "unavailable") {
        const parts = stateObj.state.split(",");
        if (parts.length > 0 && parts[0].trim().length > 1) {
          this._cachedLocation = parts[0].trim();
          return this._cachedLocation;
        }
      }
    }
    const lat = hass.config?.latitude ?? hass.states["zone.home"]?.attributes?.latitude;
    const lon = hass.config?.longitude ?? hass.states["zone.home"]?.attributes?.longitude;
    if (!lat || !lon) {
      return null;
    }
    const cacheKey = `ios27_geo_${lat.toFixed(3)}_${lon.toFixed(3)}_${locale}`;
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached && cached.trim()) {
        this._cachedLocation = cached.trim();
        return this._cachedLocation;
      }
    } catch {
    }
    if (this._fetchPromise) {
      return this._fetchPromise;
    }
    this._fetchPromise = (async () => {
      try {
        const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=${locale}`;
        const resp = await fetch(url);
        if (resp.ok) {
          const data = await resp.json();
          const place = data.city || data.locality || data.principalSubdivision;
          if (place && typeof place === "string") {
            const cleanPlace = place.trim();
            this._cachedLocation = cleanPlace;
            try {
              localStorage.setItem(cacheKey, cleanPlace);
            } catch {
            }
            return cleanPlace;
          }
        }
      } catch (err) {
        console.warn("iOS 27 Weather: Reverse geocoding failed", err);
      } finally {
        this._fetchPromise = null;
      }
      return null;
    })();
    return this._fetchPromise;
  }
  /**
   * Synchronous check if location is already cached
   */
  getCachedLocation() {
    return this._cachedLocation;
  }
}
const locationService = new LocationService();
function generateWeatherSummary(hourly, daily, currentCondition, currentTemp, locale = "en", windUnit = "km/h") {
  const t2 = translationService.get(locale);
  const upcomingRain = hourly.slice(0, 12).find((h2) => {
    const pop = h2.precipitation_probability ?? 0;
    const precip = h2.precipitation ?? 0;
    const cond = (h2.condition || "").toLowerCase();
    return pop >= 30 || precip > 0.2 || cond.includes("rain") || cond.includes("pouring");
  });
  let conditionNote = "";
  if (upcomingRain) {
    const dt = DateTime.fromISO(upcomingRain.datetime).setLocale(locale);
    const is24 = locale === "tr" || locale === "de" || locale === "fr";
    const hourLabel = dt.isValid ? is24 ? dt.toFormat("HH:mm") : dt.toFormat("h a") : "soon";
    conditionNote = t2.summaries.rain_expected(hourLabel);
  } else if (currentCondition.toLowerCase().includes("cloud")) {
    conditionNote = t2.summaries.cloudy_evening;
  } else if (currentCondition.toLowerCase().includes("rain")) {
    conditionNote = t2.summaries.showers_taper;
  } else {
    conditionNote = t2.summaries.clear_comfortable;
  }
  let highlightsTitle = t2.highlights;
  let highlightsText = t2.summaries.temp_steady;
  const highWind = hourly.slice(0, 24).find((h2) => (h2.wind_gust_speed ?? h2.wind_speed ?? 0) > 28);
  if (highWind) {
    const gustVal = Math.round(highWind.wind_gust_speed ?? highWind.wind_speed ?? 0);
    highlightsText = t2.summaries.wind_gusts(gustVal, windUnit);
  } else if (daily.length >= 4) {
    const temps = daily.slice(0, 4).map((d2) => d2.temperature).filter((temp) => typeof temp === "number");
    if (temps.length >= 3) {
      const avgTemp = temps.reduce((a2, b2) => a2 + b2, 0) / temps.length;
      if (currentTemp !== null && avgTemp > currentTemp + 2) {
        highlightsText = t2.summaries.temp_above_normal;
      } else if (currentTemp !== null && avgTemp < currentTemp - 2) {
        highlightsText = t2.summaries.temp_cooler;
      } else {
        highlightsText = t2.summaries.temp_steady;
      }
    }
  }
  return {
    conditionNote,
    highlightsTitle,
    highlightsText
  };
}
var __defProp$a = Object.defineProperty;
var __getOwnPropDesc$a = Object.getOwnPropertyDescriptor;
var __decorateClass$a = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$a(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$a(target, key, result);
  return result;
};
let Ios27Header = class extends i {
  constructor() {
    super(...arguments);
    this.locationName = "";
    this.currentTemp = null;
    this.condition = "Sunny";
    this.highTemp = null;
    this.lowTemp = null;
    this.conditionNote = "";
    this.locale = "en";
  }
  createRenderRoot() {
    return this;
  }
  render() {
    const t2 = translationService.get(this.locale);
    const formattedCurrent = hassService.formatTemperature(this.currentTemp);
    const formattedHigh = hassService.formatTemperature(this.highTemp);
    const formattedLow = hassService.formatTemperature(this.lowTemp);
    const friendlyCondition = hassService.getFriendlyCondition(this.condition, this.locale);
    let highLowText = "";
    if (this.highTemp !== null && this.lowTemp !== null) {
      highLowText = t2.format_high_low(formattedHigh, formattedLow);
    } else if (this.highTemp !== null) {
      highLowText = `H:${formattedHigh}`;
    }
    const displayName = this.locationName?.trim() && this.locationName.toLowerCase() !== "cupertino" ? this.locationName : this.locale === "tr" ? "Hava Durumu" : "Weather";
    return b`
      <div class="ios-header">
        <div class="ios-header-location-row">
          <span class="ios-location-name">${displayName}</span>
        </div>

        <div class="ios-current-temp">${formattedCurrent}</div>
        <div class="ios-condition-row">
          <span class="ios-condition-text">${friendlyCondition}</span>
          ${highLowText ? b`<span class="ios-high-low">${highLowText}</span>` : ""}
        </div>

        ${this.conditionNote ? b`<div class="ios-condition-summary">${this.conditionNote}</div>` : ""}
      </div>
    `;
  }
};
__decorateClass$a([
  n$1()
], Ios27Header.prototype, "locationName", 2);
__decorateClass$a([
  n$1({ type: Number })
], Ios27Header.prototype, "currentTemp", 2);
__decorateClass$a([
  n$1()
], Ios27Header.prototype, "condition", 2);
__decorateClass$a([
  n$1({ type: Number })
], Ios27Header.prototype, "highTemp", 2);
__decorateClass$a([
  n$1({ type: Number })
], Ios27Header.prototype, "lowTemp", 2);
__decorateClass$a([
  n$1()
], Ios27Header.prototype, "conditionNote", 2);
__decorateClass$a([
  n$1()
], Ios27Header.prototype, "locale", 2);
Ios27Header = __decorateClass$a([
  t("ios27-header")
], Ios27Header);
var __defProp$9 = Object.defineProperty;
var __getOwnPropDesc$9 = Object.getOwnPropertyDescriptor;
var __decorateClass$9 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$9(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$9(target, key, result);
  return result;
};
let Ios27Highlights = class extends i {
  constructor() {
    super(...arguments);
    this.title = "Highlights";
    this.message = "";
  }
  createRenderRoot() {
    return this;
  }
  render() {
    if (!this.message) return b``;
    return b`
      <div class="ios-highlights-card">
        <div class="ios-highlights-header">
          <div class="ios-highlights-title-left">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15 13V5a3 3 0 0 0-6 0v8a5 5 0 1 0 6 0zm-3-10a1 1 0 0 1 1 1v4h-2V4a1 1 0 0 1 1-1z" />
            </svg>
            <span>${this.title}</span>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" opacity="0.8">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
        </div>
        <div class="ios-highlights-body">
          ${this.message}
        </div>
      </div>
    `;
  }
};
__decorateClass$9([
  n$1()
], Ios27Highlights.prototype, "title", 2);
__decorateClass$9([
  n$1()
], Ios27Highlights.prototype, "message", 2);
Ios27Highlights = __decorateClass$9([
  t("ios27-highlights")
], Ios27Highlights);
var __defProp$8 = Object.defineProperty;
var __getOwnPropDesc$8 = Object.getOwnPropertyDescriptor;
var __decorateClass$8 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$8(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$8(target, key, result);
  return result;
};
let Ios27WeatherIcon = class extends i {
  constructor() {
    super(...arguments);
    this.condition = "sunny";
    this.isNight = false;
    this.size = 28;
  }
  createRenderRoot() {
    return this;
  }
  render() {
    const s2 = (this.condition || "").toLowerCase().replace(/_/g, "-");
    const isNight = this.isNight;
    const w = this.size;
    const h2 = this.size;
    return b`
      <div style="width: ${w}px; height: ${h2}px; display: inline-flex; align-items: center; justify-content: center;">
        ${this.renderIconSvg(s2, isNight, w, h2)}
      </div>
    `;
  }
  renderIconSvg(s2, isNight, w, h2) {
    if (s2 === "sunny" || s2 === "clear" || s2 === "clear-day") {
      if (isNight) {
        return this.svgMoon(w, h2);
      }
      return this.svgSun(w, h2);
    }
    if (s2 === "clear-night") {
      return this.svgMoon(w, h2);
    }
    if (s2 === "partlycloudy" || s2 === "partly-cloudy" || s2 === "partly-cloudy-day") {
      return isNight ? this.svgPartlyCloudyNight(w, h2) : this.svgPartlyCloudyDay(w, h2);
    }
    if (s2 === "partly-cloudy-night") {
      return this.svgPartlyCloudyNight(w, h2);
    }
    if (s2 === "cloudy" || s2 === "overcast") {
      return this.svgCloudy(w, h2);
    }
    if (s2 === "rainy" || s2 === "rain" || s2 === "light-rain") {
      return this.svgRain(w, h2);
    }
    if (s2 === "pouring" || s2 === "heavy-rain" || s2 === "extreme-rain") {
      return this.svgPouring(w, h2);
    }
    if (s2 === "lightning" || s2 === "lightning-rainy" || s2 === "thunderstorm") {
      return this.svgThunderstorm(w, h2);
    }
    if (s2 === "snowy" || s2 === "snow") {
      return this.svgSnow(w, h2);
    }
    if (s2 === "snowy-rainy" || s2 === "sleet" || s2 === "hail") {
      return this.svgSleet(w, h2);
    }
    if (s2 === "fog" || s2 === "mist") {
      return this.svgFog(w, h2);
    }
    if (s2 === "windy" || s2 === "windy-variant") {
      return this.svgWind(w, h2);
    }
    return isNight ? this.svgMoon(w, h2) : this.svgSun(w, h2);
  }
  svgSun(w, h2) {
    return b`
      <svg width="${w}" height="${h2}" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="7" fill="url(#sun-grad)" />
        <g stroke="#ffca28" stroke-width="2" stroke-linecap="round">
          <line x1="16" y1="2" x2="16" y2="5" />
          <line x1="16" y1="27" x2="16" y2="30" />
          <line x1="2" y1="16" x2="5" y2="16" />
          <line x1="27" y1="16" x2="30" y2="16" />
          <line x1="6.1" y1="6.1" x2="8.2" y2="8.2" />
          <line x1="23.8" y1="23.8" x2="25.9" y2="25.9" />
          <line x1="6.1" y1="25.9" x2="8.2" y2="23.8" />
          <line x1="23.8" y1="8.2" x2="25.9" y2="6.1" />
        </g>
        <defs>
          <radialGradient id="sun-grad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#fff176" />
            <stop offset="100%" stop-color="#f57f17" />
          </radialGradient>
        </defs>
      </svg>
    `;
  }
  svgMoon(w, h2) {
    return b`
      <svg width="${w}" height="${h2}" viewBox="0 0 32 32" fill="none">
        <path d="M24 18.5C23.5 24 19 28 13.5 28C7.5 28 3 23.5 3 17.5C3 11.5 7.5 6.8 13.2 6.5C12.5 8.2 12.2 10.2 12.5 12.2C13.2 16.5 16.8 19.8 21.2 20.2C22.1 20.2 23.1 20 24 18.5Z" fill="url(#moon-grad)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"/>
        <circle cx="23" cy="8" r="1" fill="#ffffff" opacity="0.9" />
        <circle cx="27" cy="13" r="0.75" fill="#ffffff" opacity="0.7" />
        <defs>
          <linearGradient id="moon-grad" x1="4" y1="6" x2="24" y2="28" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FFF9C4" />
            <stop offset="1" stop-color="#FFD54F" />
          </linearGradient>
        </defs>
      </svg>
    `;
  }
  svgPartlyCloudyDay(w, h2) {
    return b`
      <svg width="${w}" height="${h2}" viewBox="0 0 32 32" fill="none">
        <!-- Sun in background -->
        <circle cx="21" cy="11" r="5.5" fill="#FFA000" />
        <g stroke="#FFB300" stroke-width="1.8" stroke-linecap="round">
          <line x1="21" y1="2" x2="21" y2="4" />
          <line x1="28" y1="11" x2="30" y2="11" />
          <line x1="26" y1="6" x2="27.5" y2="4.5" />
          <line x1="26" y1="16" x2="27.5" y2="17.5" />
        </g>
        <!-- Cloud in foreground -->
        <path d="M8.5 25C6 25 4 23 4 20.5C4 18.2 5.6 16.3 7.8 16.1C8.6 12.6 11.8 10 15.5 10C19.8 10 23.3 13.2 23.5 17.5C25.5 17.8 27 19.5 27 21.5C27 23.8 25.2 25 23 25L8.5 25Z" fill="url(#pcloud-grad)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"/>
        <defs>
          <linearGradient id="pcloud-grad" x1="4" y1="10" x2="27" y2="25" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FFFFFF" />
            <stop offset="1" stop-color="#CFD8DC" />
          </linearGradient>
        </defs>
      </svg>
    `;
  }
  svgPartlyCloudyNight(w, h2) {
    return b`
      <svg width="${w}" height="${h2}" viewBox="0 0 32 32" fill="none">
        <!-- Moon behind -->
        <path d="M23 14C22.6 17.5 19.5 20.2 16 20.2C14.8 20.2 13.6 19.8 12.6 19.2C13.2 17.2 14.5 15.4 16.5 14.4C18.2 13.6 20 13.4 21.6 13.8C22.2 13.3 22.8 13.6 23 14Z" fill="#FFE082" />
        <circle cx="21" cy="7" r="4.5" fill="#FFE082" />
        <!-- Cloud in front -->
        <path d="M8.5 25C6 25 4 23 4 20.5C4 18.2 5.6 16.3 7.8 16.1C8.6 12.6 11.8 10 15.5 10C19.8 10 23.3 13.2 23.5 17.5C25.5 17.8 27 19.5 27 21.5C27 23.8 25.2 25 23 25L8.5 25Z" fill="url(#pcloud-night)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"/>
        <defs>
          <linearGradient id="pcloud-night" x1="4" y1="10" x2="27" y2="25" gradientUnits="userSpaceOnUse">
            <stop stop-color="#ECEFF1" />
            <stop offset="1" stop-color="#90A4AE" />
          </linearGradient>
        </defs>
      </svg>
    `;
  }
  svgCloudy(w, h2) {
    return b`
      <svg width="${w}" height="${h2}" viewBox="0 0 32 32" fill="none">
        <path d="M19 19C17.5 19 16.2 18.2 15.5 17C14.5 17.6 13.3 18 12 18C8.7 18 6 15.3 6 12C6 8.7 8.7 6 12 6C14.7 6 17 7.8 17.7 10.3C18.4 10.1 19.2 10 20 10C23.3 10 26 12.7 26 16C26 17.7 25.3 19 24.2 19.8C23.6 19.9 23 20 22.5 20L19 19Z" fill="#B0BEC5" opacity="0.6"/>
        <path d="M8.5 26C6 26 4 24 4 21.5C4 19.2 5.6 17.3 7.8 17.1C8.6 13.6 11.8 11 15.5 11C19.8 11 23.3 14.2 23.5 18.5C25.5 18.8 27 20.5 27 22.5C27 24.8 25.2 26 23 26L8.5 26Z" fill="url(#cloud-main)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"/>
        <defs>
          <linearGradient id="cloud-main" x1="4" y1="11" x2="27" y2="26" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FFFFFF" />
            <stop offset="1" stop-color="#CFD8DC" />
          </linearGradient>
        </defs>
      </svg>
    `;
  }
  svgRain(w, h2) {
    return b`
      <svg width="${w}" height="${h2}" viewBox="0 0 32 32" fill="none">
        <path d="M8.5 21C6 21 4 19 4 16.5C4 14.2 5.6 12.3 7.8 12.1C8.6 8.6 11.8 6 15.5 6C19.8 6 23.3 9.2 23.5 13.5C25.5 13.8 27 15.5 27 17.5C27 19.8 25.2 21 23 21L8.5 21Z" fill="url(#cloud-rain)" />
        <!-- Rain Drops -->
        <line x1="10" y1="23" x2="8" y2="27" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
        <line x1="16" y1="23" x2="14" y2="27" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
        <line x1="22" y1="23" x2="20" y2="27" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
        <defs>
          <linearGradient id="cloud-rain" x1="4" y1="6" x2="27" y2="21" gradientUnits="userSpaceOnUse">
            <stop stop-color="#ECEFF1" />
            <stop offset="1" stop-color="#90A4AE" />
          </linearGradient>
        </defs>
      </svg>
    `;
  }
  svgPouring(w, h2) {
    return b`
      <svg width="${w}" height="${h2}" viewBox="0 0 32 32" fill="none">
        <path d="M8.5 20C6 20 4 18 4 15.5C4 13.2 5.6 11.3 7.8 11.1C8.6 7.6 11.8 5 15.5 5C19.8 5 23.3 8.2 23.5 12.5C25.5 12.8 27 14.5 27 16.5C27 18.8 25.2 20 23 20L8.5 20Z" fill="url(#cloud-dark)" />
        <!-- Heavy Rain Streaks -->
        <line x1="9" y1="22" x2="6" y2="28" stroke="#0284c7" stroke-width="2" stroke-linecap="round" />
        <line x1="14" y1="22" x2="11" y2="28" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
        <line x1="19" y1="22" x2="16" y2="28" stroke="#0284c7" stroke-width="2" stroke-linecap="round" />
        <line x1="24" y1="22" x2="21" y2="28" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
        <defs>
          <linearGradient id="cloud-dark" x1="4" y1="5" x2="27" y2="20" gradientUnits="userSpaceOnUse">
            <stop stop-color="#B0BEC5" />
            <stop offset="1" stop-color="#607D8B" />
          </linearGradient>
        </defs>
      </svg>
    `;
  }
  svgThunderstorm(w, h2) {
    return b`
      <svg width="${w}" height="${h2}" viewBox="0 0 32 32" fill="none">
        <path d="M8.5 19C6 19 4 17 4 14.5C4 12.2 5.6 10.3 7.8 10.1C8.6 6.6 11.8 4 15.5 4C19.8 4 23.3 7.2 23.5 11.5C25.5 11.8 27 13.5 27 15.5C27 17.8 25.2 19 23 19L8.5 19Z" fill="url(#cloud-storm)" />
        <!-- Lightning bolt -->
        <polygon points="17,17 12,24 16,24 14,29 20,22 16,22" fill="#FFD600" stroke="#FFAB00" stroke-width="0.5" filter="drop-shadow(0 0 3px rgba(255,214,0,0.8))"/>
        <!-- Rain Drops -->
        <line x1="9" y1="22" x2="7" y2="26" stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round" />
        <line x1="23" y1="22" x2="21" y2="26" stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round" />
        <defs>
          <linearGradient id="cloud-storm" x1="4" y1="4" x2="27" y2="19" gradientUnits="userSpaceOnUse">
            <stop stop-color="#90A4AE" />
            <stop offset="1" stop-color="#455A64" />
          </linearGradient>
        </defs>
      </svg>
    `;
  }
  svgSnow(w, h2) {
    return b`
      <svg width="${w}" height="${h2}" viewBox="0 0 32 32" fill="none">
        <path d="M8.5 20C6 20 4 18 4 15.5C4 13.2 5.6 11.3 7.8 11.1C8.6 7.6 11.8 5 15.5 5C19.8 5 23.3 8.2 23.5 12.5C25.5 12.8 27 14.5 27 16.5C27 18.8 25.2 20 23 20L8.5 20Z" fill="url(#cloud-snow)" />
        <circle cx="10" cy="24" r="1.5" fill="#FFFFFF" filter="drop-shadow(0 0 2px #fff)" />
        <circle cx="16" cy="26" r="1.5" fill="#FFFFFF" filter="drop-shadow(0 0 2px #fff)" />
        <circle cx="22" cy="24" r="1.5" fill="#FFFFFF" filter="drop-shadow(0 0 2px #fff)" />
        <defs>
          <linearGradient id="cloud-snow" x1="4" y1="5" x2="27" y2="20" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FFFFFF" />
            <stop offset="1" stop-color="#CFD8DC" />
          </linearGradient>
        </defs>
      </svg>
    `;
  }
  svgSleet(w, h2) {
    return b`
      <svg width="${w}" height="${h2}" viewBox="0 0 32 32" fill="none">
        <path d="M8.5 20C6 20 4 18 4 15.5C4 13.2 5.6 11.3 7.8 11.1C8.6 7.6 11.8 5 15.5 5C19.8 5 23.3 8.2 23.5 12.5C25.5 12.8 27 14.5 27 16.5C27 18.8 25.2 20 23 20L8.5 20Z" fill="url(#cloud-sleet)" />
        <line x1="10" y1="22" x2="8" y2="26" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
        <circle cx="16" cy="24" r="1.5" fill="#FFFFFF" />
        <line x1="22" y1="22" x2="20" y2="26" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
        <defs>
          <linearGradient id="cloud-sleet" x1="4" y1="5" x2="27" y2="20" gradientUnits="userSpaceOnUse">
            <stop stop-color="#ECEFF1" />
            <stop offset="1" stop-color="#90A4AE" />
          </linearGradient>
        </defs>
      </svg>
    `;
  }
  svgFog(w, h2) {
    return b`
      <svg width="${w}" height="${h2}" viewBox="0 0 32 32" fill="none">
        <rect x="5" y="10" width="22" height="2.5" rx="1.25" fill="#ECEFF1" opacity="0.9" />
        <rect x="3" y="15" width="26" height="2.5" rx="1.25" fill="#CFD8DC" opacity="0.9" />
        <rect x="6" y="20" width="20" height="2.5" rx="1.25" fill="#B0BEC5" opacity="0.9" />
      </svg>
    `;
  }
  svgWind(w, h2) {
    return b`
      <svg width="${w}" height="${h2}" viewBox="0 0 32 32" fill="none">
        <path d="M4 12H18C20.2 12 22 10.2 22 8C22 5.8 20.2 4 18 4C15.8 4 14 5.8 14 8" stroke="#81D4FA" stroke-width="2" stroke-linecap="round"/>
        <path d="M2 17H23C25.2 17 27 18.8 27 21C27 23.2 25.2 25 23 25C20.8 25 19 23.2 19 21" stroke="#4FC3F7" stroke-width="2" stroke-linecap="round"/>
        <path d="M6 22H14C15.1 22 16 22.9 16 24C16 25.1 15.1 26 14 26C12.9 26 12 25.1 12 24" stroke="#B3E5FC" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;
  }
};
__decorateClass$8([
  n$1()
], Ios27WeatherIcon.prototype, "condition", 2);
__decorateClass$8([
  n$1({ type: Boolean })
], Ios27WeatherIcon.prototype, "isNight", 2);
__decorateClass$8([
  n$1({ type: Number })
], Ios27WeatherIcon.prototype, "size", 2);
Ios27WeatherIcon = __decorateClass$8([
  t("ios27-weather-icon")
], Ios27WeatherIcon);
var __defProp$7 = Object.defineProperty;
var __getOwnPropDesc$7 = Object.getOwnPropertyDescriptor;
var __decorateClass$7 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$7(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$7(target, key, result);
  return result;
};
let Ios27HourlyStrip = class extends i {
  constructor() {
    super(...arguments);
    this.mode = "condition";
    this.forecasts = [];
    this.currentTemp = null;
    this.currentCondition = "sunny";
    this.isNight = false;
    this.windUnit = "km/h";
    this.precipUnit = "mm";
    this.timeFormat = "auto";
    this.locale = "en";
    this.hourlyCount = 24;
  }
  createRenderRoot() {
    return this;
  }
  updated() {
    const strips = this.querySelectorAll(".ios-hourly-strip");
    strips.forEach((strip) => this._attachScrollListeners(strip));
  }
  _attachScrollListeners(el) {
    if (el._hasDragScroll) return;
    el._hasDragScroll = true;
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    const onMouseDown = (e2) => {
      if (e2.button !== 0) return;
      isDown = true;
      startX = e2.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      el.style.cursor = "grabbing";
      el.style.userSelect = "none";
    };
    const onMouseMove = (e2) => {
      if (!isDown) return;
      e2.preventDefault();
      const x2 = e2.pageX - el.offsetLeft;
      const walk = (x2 - startX) * 1.5;
      el.scrollLeft = scrollLeft - walk;
    };
    const onMouseUp = () => {
      if (!isDown) return;
      isDown = false;
      el.style.cursor = "grab";
      el.style.removeProperty("user-select");
    };
    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    el.addEventListener(
      "wheel",
      (e2) => {
        const delta = e2.deltaY !== 0 ? e2.deltaY : e2.deltaX;
        if (delta === 0) return;
        let distance = delta;
        if (e2.deltaMode === 1) {
          distance *= 35;
        } else if (e2.deltaMode === 2) {
          distance *= 300;
        }
        e2.preventDefault();
        e2.stopPropagation();
        el.scrollLeft += distance;
      },
      { passive: false }
    );
  }
  render() {
    const list = this.prepareHourlyList();
    if (list.length === 0) {
      return b`<div class="ios-hourly-strip" style="color: rgba(255,255,255,0.6); font-size: 13px; padding: 10px;">Loading hourly forecast...</div>`;
    }
    if (this.mode === "precipitation") {
      return this.renderPrecipitationStrip(list);
    }
    if (this.mode === "wind") {
      return this.renderWindStrip(list);
    }
    return this.renderConditionStrip(list);
  }
  prepareHourlyList() {
    if (!this.forecasts || this.forecasts.length === 0) return [];
    const t2 = translationService.get(this.locale);
    const now2 = DateTime.now().setLocale(this.locale);
    const result = [];
    result.push({
      label: t2.now,
      forecast: {
        datetime: now2.toISO() || "",
        condition: this.currentCondition,
        temperature: this.currentTemp ?? this.forecasts[0]?.temperature,
        precipitation: this.forecasts[0]?.precipitation ?? 0,
        precipitation_probability: this.forecasts[0]?.precipitation_probability ?? 0,
        wind_speed: this.forecasts[0]?.wind_speed ?? 0,
        wind_gust_speed: this.forecasts[0]?.wind_gust_speed ?? 0
      },
      isCurrent: true,
      isNight: this.isNight,
      epoch: now2.toMillis()
    });
    const is24 = this.timeFormat === "24" || this.timeFormat === "auto" && ["tr", "de", "fr", "es"].includes(this.locale);
    const targetCount = Math.max(12, this.hourlyCount || 24);
    for (const f2 of this.forecasts) {
      const dt = DateTime.fromISO(f2.datetime);
      if (!dt.isValid) continue;
      if (dt <= now2.minus({ minutes: 30 })) continue;
      const timeLabel = is24 ? dt.toFormat("H") : dt.toFormat("ha");
      const hour = dt.hour;
      const isNightHour = hour < 6 || hour >= 21;
      result.push({
        label: timeLabel,
        forecast: f2,
        isCurrent: false,
        isNight: isNightHour,
        epoch: dt.toMillis()
      });
      if (result.length >= targetCount + 1) {
        break;
      }
    }
    const maxEpoch = result[result.length - 1]?.epoch ?? now2.plus({ hours: 24 }).toMillis();
    if (this.sunTimes?.nextSetting) {
      const setDt = DateTime.fromISO(this.sunTimes.nextSetting);
      if (setDt.isValid && setDt > now2 && setDt.toMillis() <= maxEpoch) {
        const setLabel = is24 ? setDt.toFormat("HH:mm") : setDt.toFormat("h:mma");
        result.push({
          label: setLabel,
          forecast: {
            datetime: setDt.toISO() || "",
            condition: "sunset",
            temperature: void 0,
            precipitation: 0,
            precipitation_probability: 0,
            wind_speed: 0
          },
          isCurrent: false,
          isNight: false,
          isSunEvent: true,
          sunType: "sunset",
          sunTitle: t2.sunset,
          epoch: setDt.toMillis()
        });
      }
    }
    if (this.sunTimes?.nextRising) {
      const riseDt = DateTime.fromISO(this.sunTimes.nextRising);
      if (riseDt.isValid && riseDt > now2 && riseDt.toMillis() <= maxEpoch) {
        const riseLabel = is24 ? riseDt.toFormat("HH:mm") : riseDt.toFormat("h:mma");
        result.push({
          label: riseLabel,
          forecast: {
            datetime: riseDt.toISO() || "",
            condition: "sunrise",
            temperature: void 0,
            precipitation: 0,
            precipitation_probability: 0,
            wind_speed: 0
          },
          isCurrent: false,
          isNight: true,
          isSunEvent: true,
          sunType: "sunrise",
          sunTitle: t2.sunrise,
          epoch: riseDt.toMillis()
        });
      }
    }
    const first = result[0];
    const rest = result.slice(1).sort((a2, b2) => a2.epoch - b2.epoch);
    return [first, ...rest].slice(0, targetCount + 3);
  }
  /* Mode 1: Conditions & Temperature */
  renderConditionStrip(list) {
    const t2 = translationService.get(this.locale);
    return b`
      <div class="ios-hourly-strip">
        ${list.map((item) => {
      if (item.isSunEvent) {
        return b`
              <div class="ios-hourly-col ios-sun-event-col" style="min-width: 60px;">
                <span class="ios-hourly-time">${item.label}</span>
                <div class="ios-hourly-icon" style="display: flex; align-items: center; justify-content: center; height: 32px;">
                  ${this.renderSunEventIcon(item.sunType || "sunset")}
                </div>
                <span class="ios-hourly-temp" style="font-size: 11px; font-weight: 500; color: rgba(255, 255, 255, 0.85); white-space: nowrap;">
                  ${item.sunTitle}
                </span>
              </div>
            `;
      }
      const temp = hassService.formatTemperature(item.forecast.temperature);
      const rawPop = item.forecast.precipitation_probability;
      const precip = item.forecast.precipitation ?? 0;
      let pop = 0;
      if (rawPop !== void 0 && rawPop !== null && rawPop > 0) {
        pop = Math.round(rawPop);
      } else if (precip > 0) {
        if (precip >= 2) pop = 95;
        else if (precip >= 1) pop = 85;
        else if (precip >= 0.4) pop = 70;
        else pop = 50;
      } else if ((item.forecast.condition || "").includes("rain") || (item.forecast.condition || "").includes("pouring") || (item.forecast.condition || "").includes("snow")) {
        pop = 60;
      }
      return b`
            <div class="ios-hourly-col">
              <span class="ios-hourly-time">${item.label}</span>
              <div class="ios-hourly-icon">
                <ios27-weather-icon
                  .condition=${item.forecast.condition || this.currentCondition}
                  .isNight=${item.isNight}
                  .size=${26}
                ></ios27-weather-icon>
              </div>
              <span class="ios-hourly-temp">${temp}</span>
              ${pop > 0 ? b`
                <span class="ios-hourly-pop">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                  </svg>
                  ${t2.format_percent ? t2.format_percent(pop) : `${pop}%`}
                </span>
              ` : ""}
            </div>
          `;
    })}
      </div>
    `;
  }
  /* Mode 2: Precipitation Intensity & Rain Chance */
  renderPrecipitationStrip(list) {
    const t2 = translationService.get(this.locale);
    return b`
      <div class="ios-hourly-strip">
        ${list.map((item) => {
      if (item.isSunEvent) {
        return b`
              <div class="ios-rain-gauge-col ios-sun-event-col" style="min-width: 50px; justify-content: space-between;">
                <span class="ios-hourly-time">${item.label}</span>
                <div style="display: flex; align-items: center; justify-content: center; height: 50px;">
                  ${this.renderSunEventIcon(item.sunType || "sunset")}
                </div>
                <span class="ios-rain-percent-label" style="font-size: 11px; font-weight: 500; color: rgba(255, 255, 255, 0.85); white-space: nowrap;">
                  ${item.sunTitle}
                </span>
              </div>
            `;
      }
      const rawPop = item.forecast.precipitation_probability;
      const precip = item.forecast.precipitation ?? 0;
      let pop = 0;
      if (rawPop !== void 0 && rawPop !== null && rawPop > 0) {
        pop = Math.round(rawPop);
      } else if (precip > 0) {
        if (precip >= 2) pop = 95;
        else if (precip >= 1) pop = 85;
        else if (precip >= 0.4) pop = 70;
        else pop = 50;
      }
      const hasRain = pop > 0 || precip > 0;
      const fillRatio = Math.min(Math.max(precip / 3, pop / 100), 1);
      const fillPercent = Math.round(fillRatio * 100);
      const formattedPercent = t2.format_percent ? t2.format_percent(pop) : `${pop}%`;
      return b`
            <div class="ios-rain-gauge-col">
              <span class="ios-hourly-time">${item.label}</span>
              <div class="ios-rain-intensity-bar">
                <div
                  class="ios-rain-liquid-fill"
                  style="height: ${hasRain ? Math.max(14, fillPercent) : 0}%;"
                ></div>
                <div class="ios-rain-gauge-ticks">
                  <span class="ios-tick-line"></span>
                  <span class="ios-tick-line"></span>
                  <span class="ios-tick-line"></span>
                </div>
              </div>
              <span class="ios-rain-percent-label ${hasRain ? "has-rain" : ""}">
                ${formattedPercent}
              </span>
            </div>
          `;
    })}
      </div>
    `;
  }
  /* Mode 3: Wind Speed & Fluid Wave Curve */
  renderWindStrip(list) {
    const windItems = list.filter((item) => !item.isSunEvent);
    const speeds = windItems.map((item) => Math.round(item.forecast.wind_speed ?? 0));
    const minSpeed = Math.min(...speeds, 0);
    const maxSpeed = Math.max(...speeds, 12);
    const range = Math.max(maxSpeed - minSpeed, 1);
    const colWidth = 56;
    const totalWidth = list.length * colWidth;
    const height = 36;
    const paddingY = 6;
    const points = list.map((item, idx) => {
      const x2 = idx * colWidth + colWidth / 2;
      const speed = item.isSunEvent ? 0 : Math.round(item.forecast.wind_speed ?? 0);
      const normalized = (speed - minSpeed) / range;
      const y3 = height - paddingY - normalized * (height - 2 * paddingY);
      return { x: x2, y: y3, isSun: item.isSunEvent };
    });
    let pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i2 = 0; i2 < points.length - 1; i2++) {
      const p0 = points[i2];
      const p1 = points[i2 + 1];
      const cp1x = p0.x + (p1.x - p0.x) / 2;
      const cp1y = p0.y;
      const cp2x = p0.x + (p1.x - p0.x) / 2;
      const cp2y = p1.y;
      pathD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
    }
    const fillD = `${pathD} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;
    return b`
      <div class="ios-hourly-strip ios-wind-strip-wrapper" style="overflow-x: auto;">
        <div style="display: flex; flex-direction: column; width: ${totalWidth}px; min-width: ${totalWidth}px;">
          <div style="display: flex; gap: 0;">
            ${list.map((item, idx) => {
      if (item.isSunEvent) {
        return b`
                  <div
                    class="ios-wind-col ios-sun-event-col"
                    style="width: ${colWidth}px; min-width: ${colWidth}px; ${idx < list.length - 1 ? "border-right: 1px dashed rgba(255, 255, 255, 0.16);" : ""}"
                  >
                    <span class="ios-hourly-time">${item.label}</span>
                    <div style="display: flex; align-items: center; justify-content: center; height: 26px;">
                      ${this.renderSunEventIcon(item.sunType || "sunset")}
                    </div>
                    <span style="font-size: 11px; font-weight: 500; color: rgba(255, 255, 255, 0.85);">${item.sunTitle}</span>
                  </div>
                `;
      }
      const speed = Math.round(item.forecast.wind_speed ?? 0);
      return b`
                <div
                  class="ios-wind-col"
                  style="width: ${colWidth}px; min-width: ${colWidth}px; ${idx < list.length - 1 ? "border-right: 1px dashed rgba(255, 255, 255, 0.16);" : ""}"
                >
                  <span class="ios-hourly-time">${item.label}</span>
                  <span class="ios-wind-speed-val">${speed}</span>
                  <span class="ios-wind-speed-unit">${this.windUnit}</span>
                </div>
              `;
    })}
          </div>

          <div class="ios-wind-wave-container" style="overflow: hidden; width: ${totalWidth}px;">
            <svg width="${totalWidth}" height="${height}" style="display: block;">
              <defs>
                <linearGradient id="wind-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.4" />
                  <stop offset="100%" stop-color="#22d3ee" stop-opacity="0.0" />
                </linearGradient>
              </defs>
              <path d="${fillD}" fill="url(#wind-gradient)" />
              <path d="${pathD}" fill="none" stroke="#22d3ee" stroke-width="2.5" stroke-linecap="round" />
              ${points[0] ? b`
                <circle cx="${points[0].x}" cy="${points[0].y}" r="4" fill="#ffffff" stroke="#0891b2" stroke-width="2" />
              ` : ""}
            </svg>
          </div>
        </div>
      </div>
    `;
  }
  /* Exact Apple Weather Sunset and Sunrise SVG Icons */
  renderSunEventIcon(type) {
    if (type === "sunset") {
      return b`
        <svg width="34" height="34" viewBox="0 0 32 32" fill="none" style="display: block;">
          <path d="M16 4v7m0 0l-2.5-2.5M16 11l2.5 2.5" stroke="#f59e0b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="7" y1="20" x2="4.5" y2="20" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
          <line x1="25" y1="20" x2="27.5" y2="20" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
          <line x1="9.5" y1="15" x2="7.5" y2="13" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
          <line x1="22.5" y1="15" x2="24.5" y2="13" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
          <path d="M10 21a6 6 0 0 1 12 0" fill="#f59e0b" stroke="#facc15" stroke-width="1.8"/>
          <line x1="4" y1="22" x2="28" y2="22" stroke="rgba(255, 255, 255, 0.85)" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `;
    }
    return b`
      <svg width="34" height="34" viewBox="0 0 32 32" fill="none" style="display: block;">
        <path d="M16 11V4m0 0l-2.5 2.5M16 4l2.5 2.5" stroke="#f59e0b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="7" y1="20" x2="4.5" y2="20" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
        <line x1="25" y1="20" x2="27.5" y2="20" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
        <line x1="9.5" y1="15" x2="7.5" y2="13" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
        <line x1="22.5" y1="15" x2="24.5" y2="13" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
        <path d="M10 21a6 6 0 0 1 12 0" fill="#f59e0b" stroke="#facc15" stroke-width="1.8"/>
        <line x1="4" y1="22" x2="28" y2="22" stroke="rgba(255, 255, 255, 0.85)" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;
  }
};
__decorateClass$7([
  n$1()
], Ios27HourlyStrip.prototype, "mode", 2);
__decorateClass$7([
  n$1({ type: Array })
], Ios27HourlyStrip.prototype, "forecasts", 2);
__decorateClass$7([
  n$1({ type: Number })
], Ios27HourlyStrip.prototype, "currentTemp", 2);
__decorateClass$7([
  n$1()
], Ios27HourlyStrip.prototype, "currentCondition", 2);
__decorateClass$7([
  n$1({ type: Boolean })
], Ios27HourlyStrip.prototype, "isNight", 2);
__decorateClass$7([
  n$1({ type: Object })
], Ios27HourlyStrip.prototype, "sunTimes", 2);
__decorateClass$7([
  n$1()
], Ios27HourlyStrip.prototype, "windUnit", 2);
__decorateClass$7([
  n$1()
], Ios27HourlyStrip.prototype, "precipUnit", 2);
__decorateClass$7([
  n$1()
], Ios27HourlyStrip.prototype, "timeFormat", 2);
__decorateClass$7([
  n$1()
], Ios27HourlyStrip.prototype, "locale", 2);
__decorateClass$7([
  n$1({ type: Number })
], Ios27HourlyStrip.prototype, "hourlyCount", 2);
Ios27HourlyStrip = __decorateClass$7([
  t("ios27-hourly-strip")
], Ios27HourlyStrip);
var __defProp$6 = Object.defineProperty;
var __getOwnPropDesc$6 = Object.getOwnPropertyDescriptor;
var __decorateClass$6 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$6(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$6(target, key, result);
  return result;
};
let Ios27DailyList = class extends i {
  constructor() {
    super(...arguments);
    this.mode = "condition";
    this.forecasts = [];
    this.hourlyForecasts = [];
    this.currentTemp = null;
    this.currentCondition = "sunny";
    this.windUnit = "km/h";
    this.precipUnit = "mm";
    this.locale = "en";
  }
  createRenderRoot() {
    return this;
  }
  render() {
    const list = this.prepareDailyList();
    if (list.length === 0) {
      return b`<div style="color: rgba(255,255,255,0.6); font-size: 13px; padding: 10px;">Loading 10-day forecast...</div>`;
    }
    return b`
      <div class="ios-daily-list">
        ${list.map((dayItem) => this.renderDayRow(dayItem, list))}
      </div>
    `;
  }
  prepareDailyList() {
    if (!this.forecasts || this.forecasts.length === 0) return [];
    const t2 = translationService.get(this.locale);
    const now2 = DateTime.now().setLocale(this.locale);
    return this.forecasts.slice(0, 10).map((f2, i2) => {
      const dt = DateTime.fromISO(f2.datetime).setLocale(this.locale);
      const isToday = i2 === 0 || dt.isValid && dt.hasSame(now2, "day");
      const dayLabel = isToday ? t2.today : dt.isValid ? dt.toFormat("ccc") : `Day ${i2 + 1}`;
      const high = f2.temperature ?? (f2.templow ? f2.templow + 5 : 20);
      const low = f2.templow ?? (f2.temperature ? f2.temperature - 5 : 12);
      return {
        dayLabel,
        forecast: f2,
        isToday,
        low: Math.min(low, high),
        high: Math.max(low, high)
      };
    });
  }
  renderDayRow(dayItem, allDays) {
    const { dayLabel, forecast, isToday, low, high } = dayItem;
    if (this.mode === "precipitation") {
      return b`
        <div class="ios-daily-row ios-daily-row--precip">
          <span class="ios-day-label">${dayLabel}</span>
          ${this.renderPrecipitationRow(forecast, isToday)}
        </div>
      `;
    }
    if (this.mode === "wind") {
      return b`
        <div class="ios-daily-row ios-daily-row--wind">
          <span class="ios-day-label">${dayLabel}</span>
          ${this.renderWindRow(forecast)}
        </div>
      `;
    }
    return b`
      <div class="ios-daily-row">
        <!-- Day Name -->
        <span class="ios-day-label">${dayLabel}</span>

        <!-- Condition Icon -->
        <div class="ios-daily-icon">
          <ios27-weather-icon
            .condition=${forecast.condition || this.currentCondition}
            .isNight=${false}
            .size=${24}
          ></ios27-weather-icon>
        </div>

        <!-- Temperature Bar -->
        ${this.renderConditionRow(low, high, isToday, allDays)}
      </div>
    `;
  }
  /* Mode 1: Temperature Bar (Apple Weather iOS Gradient) */
  renderConditionRow(low, high, isToday, allDays) {
    const globalMin = Math.min(...allDays.map((d2) => d2.low));
    const globalMax = Math.max(...allDays.map((d2) => d2.high));
    const range = Math.max(globalMax - globalMin, 1);
    const leftPercent = Math.max(0, Math.min(100, (low - globalMin) / range * 100));
    const widthPercent = Math.max(8, Math.min(100 - leftPercent, (high - low) / range * 100));
    let currentIndicatorPercent = 0;
    if (isToday && this.currentTemp !== null) {
      currentIndicatorPercent = Math.max(0, Math.min(100, (this.currentTemp - globalMin) / range * 100));
    }
    return b`
      <div class="ios-daily-temp-bar-container">
        <span class="ios-temp-low">${hassService.formatTemperature(low)}</span>

        <div class="ios-temp-bar-track">
          <div
            class="ios-temp-bar-fill"
            style="left: ${leftPercent}%; width: ${widthPercent}%;"
          ></div>
          ${isToday && this.currentTemp !== null ? b`
            <div
              class="ios-temp-current-indicator"
              style="left: ${currentIndicatorPercent}%;"
            ></div>
          ` : ""}
        </div>

        <span class="ios-temp-high">${hassService.formatTemperature(high)}</span>
      </div>
    `;
  }
  /* Mode 2: Precipitation Timeline / Rain Bar & Prob (24 Hours) */
  renderPrecipitationRow(forecast, isToday = false) {
    const t2 = translationService.get(this.locale);
    const rawPop = forecast.precipitation_probability;
    const precip = forecast.precipitation ?? 0;
    let pop = 0;
    if (rawPop !== void 0 && rawPop !== null && rawPop > 0) {
      pop = Math.round(rawPop);
    } else if (precip > 0) {
      if (precip >= 15) pop = 100;
      else if (precip >= 10) pop = 95;
      else if (precip >= 5) pop = 90;
      else if (precip >= 2) pop = 85;
      else if (precip >= 1) pop = 75;
      else if (precip >= 0.5) pop = 65;
      else pop = 50;
    } else {
      const cond = (forecast.condition || "").toLowerCase();
      if (cond.includes("rain") || cond.includes("pouring") || cond.includes("storm")) {
        pop = 70;
      }
    }
    const hasRain = pop > 0 || precip > 0;
    const ticks = this.getHourlyFillsForDay(forecast, isToday, precip, pop);
    let formattedAmount = "--";
    if (precip > 0) {
      if (this.precipUnit === "in") {
        formattedAmount = `.${Math.round(precip * 100)}"`;
      } else {
        const rounded = Math.round(precip);
        formattedAmount = `${Math.abs(precip - rounded) < 0.05 ? rounded : precip.toFixed(1)} ${this.precipUnit}`;
      }
    } else {
      formattedAmount = this.precipUnit === "in" ? '.0"' : `0 ${this.precipUnit}`;
    }
    const formattedPercent = t2.format_percent ? t2.format_percent(pop) : `${pop}%`;
    return b`
      <div class="ios-daily-rain-container">
        <!-- 24-Hour Segmented Rain Timeline -->
        <div class="ios-daily-rain-gauge">
          ${ticks.map((tick) => b`
            <div class="ios-daily-rain-tick ${tick.isCurrent ? "current-hour" : ""}">
              ${tick.fillPct > 0 ? b`
                <div class="ios-daily-rain-fill" style="height: ${tick.fillPct}%;"></div>
              ` : ""}
            </div>
          `)}
        </div>

        <!-- Precipitation Amount (e.g. 3 mm) -->
        <span class="ios-rain-amount">${formattedAmount}</span>

        <!-- Probability (e.g. 💧 %60) -->
        <span class="ios-rain-prob ${hasRain ? "has-rain" : ""}">
          ${hasRain ? b`
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
          ` : ""}
          ${formattedPercent}
        </span>
      </div>
    `;
  }
  /* Compute 24 hourly fill levels (0-100%) for a given day */
  getHourlyFillsForDay(forecast, isToday, precip, pop) {
    const currentHour = (/* @__PURE__ */ new Date()).getHours();
    const dt = DateTime.fromISO(forecast.datetime);
    const dayStr = dt.isValid ? dt.toISODate() : null;
    const hourMap = /* @__PURE__ */ new Map();
    if (this.hourlyForecasts && this.hourlyForecasts.length > 0 && dayStr) {
      for (const hf of this.hourlyForecasts) {
        const hdt = DateTime.fromISO(hf.datetime);
        if (hdt.isValid && hdt.toISODate() === dayStr) {
          hourMap.set(hdt.hour, hf);
        }
      }
    }
    const ticks = [];
    if (precip === 0 && pop === 0) {
      for (let h2 = 0; h2 < 24; h2++) {
        ticks.push({ fillPct: 0, isCurrent: isToday && h2 === currentHour });
      }
      return ticks;
    }
    const dayNum = dt.isValid ? dt.day : 1;
    const peakHour = dayNum % 3 === 0 ? 14 : dayNum % 3 === 1 ? 8 : 17;
    const spread = precip >= 15 ? 8 : precip >= 10 ? 6 : precip >= 5 ? 4 : precip >= 2 ? 3 : 2;
    for (let h2 = 0; h2 < 24; h2++) {
      const isCurrent = isToday && h2 === currentHour;
      let fillPct = 0;
      if (hourMap.has(h2)) {
        const hf = hourMap.get(h2);
        const hPop = hf.precipitation_probability ?? 0;
        const hPrecip = hf.precipitation ?? 0;
        if (hPrecip >= 2 || hPop >= 85) fillPct = 100;
        else if (hPrecip >= 1 || hPop >= 65) fillPct = 75;
        else if (hPrecip >= 0.3 || hPop >= 40) fillPct = 50;
        else if (hPrecip > 0 || hPop > 0) fillPct = 25;
      } else {
        const dist = Math.abs(h2 - peakHour);
        if (dist <= spread) {
          const factor = Math.cos(dist / (spread + 0.5) * (Math.PI / 2));
          if (precip >= 15) {
            fillPct = Math.round(55 + 45 * factor);
          } else if (precip >= 10) {
            fillPct = Math.round(45 + 50 * factor);
          } else if (precip >= 5) {
            fillPct = Math.round(35 + 45 * factor);
          } else if (precip >= 2) {
            fillPct = Math.round(25 + 40 * factor);
          } else {
            fillPct = Math.round(20 + 25 * factor);
          }
        }
      }
      ticks.push({
        fillPct: Math.max(0, Math.min(100, fillPct)),
        isCurrent
      });
    }
    return ticks;
  }
  /* Mode 3: Wind Curve & Speed Range */
  renderWindRow(forecast) {
    const avgSpeed = Math.round(forecast.wind_speed ?? 5);
    const gustSpeed = Math.round(forecast.wind_gust_speed ?? avgSpeed + Math.max(3, Math.round(avgSpeed * 0.4)));
    const minRange = Math.max(1, Math.round(avgSpeed * 0.6));
    const maxRange = Math.max(gustSpeed, avgSpeed);
    return b`
      <div class="ios-daily-wind-container">
        <!-- Mini Wind Curve -->
        <div class="ios-daily-wind-wave">
          <svg width="100%" height="20" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path
              d="M 0 12 Q 30 4, 60 11 T 100 9"
              fill="none"
              stroke="#22d3ee"
              stroke-width="2.5"
              stroke-linecap="round"
              opacity="0.85"
            />
            <circle cx="60" cy="11" r="3.5" fill="#ffffff" stroke="#0891b2" stroke-width="1.5" />
          </svg>
        </div>

        <!-- Speed Range -->
        <span class="ios-daily-wind-range">
          ${minRange} - ${maxRange} ${this.windUnit}
        </span>
      </div>
    `;
  }
};
__decorateClass$6([
  n$1()
], Ios27DailyList.prototype, "mode", 2);
__decorateClass$6([
  n$1({ type: Array })
], Ios27DailyList.prototype, "forecasts", 2);
__decorateClass$6([
  n$1({ type: Array })
], Ios27DailyList.prototype, "hourlyForecasts", 2);
__decorateClass$6([
  n$1({ type: Number })
], Ios27DailyList.prototype, "currentTemp", 2);
__decorateClass$6([
  n$1()
], Ios27DailyList.prototype, "currentCondition", 2);
__decorateClass$6([
  n$1()
], Ios27DailyList.prototype, "windUnit", 2);
__decorateClass$6([
  n$1()
], Ios27DailyList.prototype, "precipUnit", 2);
__decorateClass$6([
  n$1()
], Ios27DailyList.prototype, "locale", 2);
Ios27DailyList = __decorateClass$6([
  t("ios27-daily-list")
], Ios27DailyList);
var __defProp$5 = Object.defineProperty;
var __getOwnPropDesc$5 = Object.getOwnPropertyDescriptor;
var __decorateClass$5 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$5(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$5(target, key, result);
  return result;
};
let Ios27ForecastCard = class extends i {
  constructor() {
    super(...arguments);
    this.activeMode = "condition";
    this.hourlyForecasts = [];
    this.dailyForecasts = [];
    this.currentTemp = null;
    this.currentCondition = "sunny";
    this.isNight = false;
    this.windUnit = "km/h";
    this.precipUnit = "mm";
    this.timeFormat = "auto";
    this.locale = "en";
    this.hourlyCount = 24;
  }
  createRenderRoot() {
    return this;
  }
  render() {
    const t2 = translationService.get(this.locale);
    let title = t2.hourly_forecast;
    let subtitle = t2.overview_24h;
    if (this.activeMode === "precipitation") {
      title = t2.precipitation;
      subtitle = t2.rain_subtitle;
    } else if (this.activeMode === "wind") {
      title = t2.wind;
      subtitle = `${t2.wind_subtitle} (${this.windUnit})`;
    }
    return b`
      <div class="ios-glass-card">
        <!-- Header with Interactive Segmented Switcher -->
        <div class="ios-forecast-card-header">
          <div class="ios-forecast-meta">
            <span class="ios-forecast-title">${title}</span>
            <span class="ios-forecast-subtitle">${subtitle}</span>
          </div>

          <!-- 3-Segment Switcher (Cloud / Rain / Wind) -->
          <div class="ios-segmented-control" role="tablist">
            <!-- Cloud / Conditions Button -->
            <button
              class="ios-segment-button ${this.activeMode === "condition" ? "active" : ""}"
              title="Weather Conditions & Temperature"
              role="tab"
              aria-selected="${this.activeMode === "condition"}"
              @click=${() => this.setMode("condition")}
            >
              <svg viewBox="0 0 24 24">
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
              </svg>
            </button>

            <!-- Rain / Precipitation Button -->
            <button
              class="ios-segment-button ${this.activeMode === "precipitation" ? "active" : ""}"
              title="Precipitation Intensity & Rain Chance"
              role="tab"
              aria-selected="${this.activeMode === "precipitation"}"
              @click=${() => this.setMode("precipitation")}
            >
              <svg viewBox="0 0 24 24">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
            </button>

            <!-- Wind Button -->
            <button
              class="ios-segment-button ${this.activeMode === "wind" ? "active" : ""}"
              title="Wind Speed & Wave"
              role="tab"
              aria-selected="${this.activeMode === "wind"}"
              @click=${() => this.setMode("wind")}
            >
              <svg viewBox="0 0 24 24">
                <path d="M14.5 17c0 1.66-1.34 3-3 3s-3-1.34-3-3h2c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1H2v-2h9.5c1.66 0 3 1.34 3 3zm4.5-6c0-1.66-1.34-3-3-3s-3 1.34-3 3h2c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1H2v2h14c1.66 0 3-1.34 3-3zm-1-6c-.55 0-1 .45-1 1h-2c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3H2v-2h15c.55 0 1-.45 1-1z" />
              </svg>
            </button>
          </div>
        </div>

        <div class="ios-divider"></div>

        <!-- Hourly Strip -->
        <ios27-hourly-strip
          .mode=${this.activeMode}
          .forecasts=${this.hourlyForecasts}
          .hourlyCount=${this.hourlyCount}
          .currentTemp=${this.currentTemp}
          .currentCondition=${this.currentCondition}
          .isNight=${this.isNight}
          .sunTimes=${this.sunTimes}
          .windUnit=${this.windUnit}
          .precipUnit=${this.precipUnit}
          .timeFormat=${this.timeFormat}
          .locale=${this.locale}
        ></ios27-hourly-strip>

        <div class="ios-divider"></div>

        <!-- 10-Day Forecast Section Header -->
        <div style="font-size: 13px; font-weight: 600; color: rgba(255, 255, 255, 0.7); text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"/>
          </svg>
          <span>${t2.ten_day_forecast}</span>
        </div>

        <!-- 10-Day Daily List -->
        <ios27-daily-list
          .mode=${this.activeMode}
          .forecasts=${this.dailyForecasts}
          .hourlyForecasts=${this.hourlyForecasts}
          .currentTemp=${this.currentTemp}
          .currentCondition=${this.currentCondition}
          .windUnit=${this.windUnit}
          .precipUnit=${this.precipUnit}
          .locale=${this.locale}
        ></ios27-daily-list>
      </div>
    `;
  }
  setMode(mode) {
    this.activeMode = mode;
    this.dispatchEvent(new CustomEvent("mode-changed", {
      detail: { mode },
      bubbles: true,
      composed: true
    }));
    this.requestUpdate();
  }
};
__decorateClass$5([
  n$1()
], Ios27ForecastCard.prototype, "activeMode", 2);
__decorateClass$5([
  n$1({ type: Array })
], Ios27ForecastCard.prototype, "hourlyForecasts", 2);
__decorateClass$5([
  n$1({ type: Array })
], Ios27ForecastCard.prototype, "dailyForecasts", 2);
__decorateClass$5([
  n$1({ type: Number })
], Ios27ForecastCard.prototype, "currentTemp", 2);
__decorateClass$5([
  n$1()
], Ios27ForecastCard.prototype, "currentCondition", 2);
__decorateClass$5([
  n$1({ type: Boolean })
], Ios27ForecastCard.prototype, "isNight", 2);
__decorateClass$5([
  n$1({ type: Object })
], Ios27ForecastCard.prototype, "sunTimes", 2);
__decorateClass$5([
  n$1()
], Ios27ForecastCard.prototype, "windUnit", 2);
__decorateClass$5([
  n$1()
], Ios27ForecastCard.prototype, "precipUnit", 2);
__decorateClass$5([
  n$1()
], Ios27ForecastCard.prototype, "timeFormat", 2);
__decorateClass$5([
  n$1()
], Ios27ForecastCard.prototype, "locale", 2);
__decorateClass$5([
  n$1({ type: Number })
], Ios27ForecastCard.prototype, "hourlyCount", 2);
Ios27ForecastCard = __decorateClass$5([
  t("ios27-forecast-card")
], Ios27ForecastCard);
var __defProp$4 = Object.defineProperty;
var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
var __decorateClass$4 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$4(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$4(target, key, result);
  return result;
};
let Ios27DetailTiles = class extends i {
  constructor() {
    super(...arguments);
    this.currentTemp = null;
    this.hourlyForecasts = [];
    this.windUnit = "km/h";
    this.precipUnit = "mm";
    this.locale = "tr";
    this.timeFormat = "auto";
  }
  createRenderRoot() {
    return this;
  }
  // Helper to extract a number from an entity attribute or sensor override
  _getSensorOrAttr(sensorId, attrName) {
    if (sensorId && this.hass?.states[sensorId]) {
      const val = parseFloat(this.hass.states[sensorId].state);
      if (!isNaN(val)) return val;
    }
    if (attrName && this.entityState?.attributes?.[attrName] !== void 0) {
      const val = parseFloat(this.entityState.attributes[attrName]);
      if (!isNaN(val)) return val;
    }
    return null;
  }
  // Calculate Apparent (Feels Like) temperature via Australian Steadman formula
  _getApparentTemp(actualTemp, humidity, windSpeedKmH) {
    const attrVal = this._getSensorOrAttr(this.config?.sensor_apparent_temp, "apparent_temperature");
    if (attrVal !== null) return Math.round(attrVal);
    const e2 = humidity / 100 * 6.105 * Math.exp(17.27 * actualTemp / (237.7 + actualTemp));
    const w = (windSpeedKmH || 0) / 3.6;
    const at = actualTemp + 0.33 * e2 - 0.7 * w - 4;
    return Math.round(at);
  }
  // Dew point formula (Magnus-Tetens)
  _getDewPoint(temp, humidity) {
    const attrVal = this._getSensorOrAttr(void 0, "dew_point");
    if (attrVal !== null) return Math.round(attrVal);
    const a2 = 17.27;
    const b2 = 237.7;
    const alpha = a2 * temp / (b2 + temp) + Math.log(Math.max(1, humidity) / 100);
    return Math.round(b2 * alpha / (a2 - alpha));
  }
  // Parse wind bearing to degrees
  _parseBearing(bearing) {
    if (typeof bearing === "number") return bearing;
    if (!bearing) return 0;
    const map = {
      n: 0,
      nne: 22.5,
      ne: 45,
      ene: 67.5,
      e: 90,
      ese: 112.5,
      se: 135,
      sse: 157.5,
      s: 180,
      ssw: 202.5,
      sw: 225,
      wsw: 247.5,
      w: 270,
      wnw: 292.5,
      nw: 315,
      nnw: 337.5,
      k: 0,
      kd: 45,
      d: 90,
      gd: 135,
      g: 180,
      gb: 225,
      b: 270,
      kb: 315
    };
    return map[String(bearing).toLowerCase()] ?? 0;
  }
  // Astronomical Moon Phase calculation (synodic month = 29.53058867 days)
  _getMoonData() {
    const now2 = /* @__PURE__ */ new Date();
    const knownNewMoon = 170497422e4;
    const synodicMonth = 29.53058867 * 864e5;
    const diff2 = now2.getTime() - knownNewMoon;
    const phase = (diff2 % synodicMonth + synodicMonth) % synodicMonth / synodicMonth;
    const illumination = Math.round((1 - Math.cos(phase * 2 * Math.PI)) / 2 * 100);
    let phaseKey = "new_moon";
    if (phase < 0.03 || phase >= 0.97) phaseKey = "new_moon";
    else if (phase < 0.22) phaseKey = "waxing_crescent";
    else if (phase < 0.28) phaseKey = "first_quarter";
    else if (phase < 0.47) phaseKey = "waxing_gibbous";
    else if (phase < 0.53) phaseKey = "full_moon";
    else if (phase < 0.72) phaseKey = "waning_gibbous";
    else if (phase < 0.78) phaseKey = "last_quarter";
    else phaseKey = "waning_crescent";
    return { phase, illumination, phaseKey };
  }
  // Calculate sun progress along daylight curve
  _getSunProgress() {
    const now2 = /* @__PURE__ */ new Date();
    const nextRising = this.sunTimes?.nextRising;
    const nextSetting = this.sunTimes?.nextSetting;
    let rise = nextRising ? new Date(nextRising) : new Date(now2.getFullYear(), now2.getMonth(), now2.getDate(), 6, 30);
    let set = nextSetting ? new Date(nextSetting) : new Date(now2.getFullYear(), now2.getMonth(), now2.getDate(), 19, 45);
    const pad = (n3) => n3.toString().padStart(2, "0");
    const riseTimeStr = `${pad(rise.getHours())}:${pad(rise.getMinutes())}`;
    const setTimeStr = `${pad(set.getHours())}:${pad(set.getMinutes())}`;
    const nowMs = now2.getTime();
    const riseMs = rise.getTime();
    const setMs = set.getTime();
    const isDay = setMs > riseMs ? nowMs >= riseMs && nowMs <= setMs : nowMs < riseMs && nowMs > setMs;
    let progress = 0.5;
    if (setMs > riseMs) {
      if (nowMs >= riseMs && nowMs <= setMs) {
        progress = (nowMs - riseMs) / (setMs - riseMs);
      } else {
        progress = 0.5;
      }
    }
    return { isDay, progress: Math.min(1, Math.max(0, progress)), riseTimeStr, setTimeStr };
  }
  render() {
    const t2 = translationService.get(this.locale);
    const d2 = t2.details;
    const actualTemp = this.currentTemp !== null ? Math.round(this.currentTemp) : 10;
    const humidity = this._getSensorOrAttr(this.config?.sensor_humidity, "humidity") ?? 65;
    const windSpeed = this._getSensorOrAttr(this.config?.sensor_wind_speed, "wind_speed") ?? 12;
    const windBearingRaw = this.config?.sensor_wind_bearing && this.hass?.states[this.config.sensor_wind_bearing] ? this.hass.states[this.config.sensor_wind_bearing].state : this.entityState?.attributes?.wind_bearing;
    const windBearing = this._parseBearing(windBearingRaw);
    const windGust = this._getSensorOrAttr(this.config?.sensor_wind_gust, "wind_gust_speed");
    const apparentTemp = this._getApparentTemp(actualTemp, humidity, windSpeed);
    const dewPoint = this._getDewPoint(actualTemp, humidity);
    const pressure = this._getSensorOrAttr(this.config?.sensor_pressure, "pressure") ?? 1015;
    const pressureUnit = this.entityState?.attributes?.pressure_unit || "hPa";
    const uvIndex = this._getSensorOrAttr(this.config?.sensor_uv, "uv_index") ?? 0;
    const visibility = this._getSensorOrAttr(this.config?.sensor_visibility, "visibility") ?? 10;
    const visUnit = this.entityState?.attributes?.visibility_unit || (this.hass?.config?.unit_system?.length === "mi" ? "mi" : "km");
    const precipVal = this._getSensorOrAttr(this.config?.sensor_precipitation, "precipitation") ?? this.dailyForecast?.precipitation ?? 0;
    return b`
      <div class="ios-detail-grid">
        <!-- 1. HİSSEDİLEN (Feels Like) -->
        ${this._renderFeelsLikeTile(d2, actualTemp, apparentTemp)}

        <!-- 2. RÜZGÂR (Wind Compass) -->
        ${this._renderWindTile(d2, windSpeed, windBearing, windGust)}

        <!-- 3. AY EVRESİ (Moon Phase) -->
        ${this._renderMoonTile(d2)}

        <!-- 4. GÜN BATIMI / GÜN DOĞUMU (Sunrise / Sunset Curve) -->
        ${this._renderSunTile(d2)}

        <!-- 5. UV İNDEKSİ (UV Index Gauge) -->
        ${this._renderUvTile(d2, uvIndex)}

        <!-- 6. YAĞIŞ (Precipitation) -->
        ${this._renderPrecipTile(d2, precipVal)}

        <!-- 7. GÖRÜŞ MESAFESİ (Visibility) -->
        ${this._renderVisibilityTile(d2, visibility, visUnit)}

        <!-- 8. NEM ORANI & ÇİY NOKTASI (Humidity & Dew Point) -->
        ${this._renderHumidityTile(d2, humidity, dewPoint)}

        <!-- 9. BASINÇ (Pressure Barometer Dial) -->
        ${this._renderPressureTile(d2, pressure, pressureUnit)}
      </div>
    `;
  }
  // 1. FEELS LIKE TILE
  _renderFeelsLikeTile(d2, actual, apparent) {
    const diff2 = apparent - actual;
    let badgeText = `${diff2 > 0 ? "+" : ""}${diff2}°`;
    let badgeClass = "neutral";
    let footerNote = d2.feels_similar;
    if (diff2 <= -2) {
      badgeText = `↓${Math.abs(diff2)}°`;
      badgeClass = "cooler";
      footerNote = d2.feels_wind_cooler;
    } else if (diff2 >= 2) {
      badgeText = `↑${diff2}°`;
      badgeClass = "warmer";
      footerNote = d2.feels_humidity_warmer;
    }
    const minRange = Math.min(actual, apparent) - 4;
    const maxRange = Math.max(actual, apparent) + 4;
    const rangeSpan = Math.max(1, maxRange - minRange);
    const actualPct = Math.round((actual - minRange) / rangeSpan * 100);
    const appPct = Math.round((apparent - minRange) / rangeSpan * 100);
    const leftPct = Math.min(actualPct, appPct);
    const widthPct = Math.max(10, Math.abs(appPct - actualPct));
    return b`
      <div class="ios-detail-tile">
        <div class="ios-tile-header">
          <svg class="ios-tile-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15 13V5a3 3 0 0 0-6 0v8a5 5 0 1 0 6 0zm-3-10a1 1 0 0 1 1 1v4h-2V4a1 1 0 0 1 1-1z" />
          </svg>
          <span class="ios-tile-title">${d2.feels_like}</span>
        </div>

        <div class="ios-tile-body">
          <div class="ios-stat-value">${apparent}°</div>
          <div class="ios-stat-sub">${d2.actual}: ${actual}°</div>

          <div class="ios-diff-bar-container">
            <div class="ios-diff-track">
              <div
                class="ios-diff-fill ${badgeClass}"
                style="left: ${leftPct}%; width: ${widthPct}%;"
              ></div>
            </div>
            <span class="ios-diff-badge ${badgeClass}">${badgeText}</span>
          </div>
        </div>

        <div class="ios-tile-footer">${footerNote}</div>
      </div>
    `;
  }
  // 2. WIND COMPASS TILE
  _renderWindTile(d2, speed, bearing, gust) {
    const north = d2.cardinal_n || "K";
    const east = d2.cardinal_e || "D";
    const south = d2.cardinal_s || "G";
    const west = d2.cardinal_w || "B";
    let footer = gust && gust > speed ? d2.gusts(Math.round(gust), this.windUnit) : speed > 25 ? d2.strong_wind : d2.calm_wind;
    return b`
      <div class="ios-detail-tile">
        <div class="ios-tile-header">
          <svg class="ios-tile-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.5 17c0 1.66-1.34 3-3 3s-3-1.34-3-3h2c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1H2v-2h9.5c1.66 0 3 1.34 3 3zm4.5-6c0-1.66-1.34-3-3-3s-3 1.34-3 3h2c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1H2v2h14c1.66 0 3-1.34 3-3zm-1-6c-.55 0-1 .45-1 1h-2c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3H2v-2h15c.55 0 1-.45 1-1z" />
          </svg>
          <span class="ios-tile-title">${d2.wind}</span>
        </div>

        <div class="ios-tile-body center-content">
          <div class="ios-compass-dial">
            <svg viewBox="0 0 100 100" class="ios-compass-svg">
              <!-- Radial outer ticks -->
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="rgba(255, 255, 255, 0.2)"
                stroke-width="1.5"
                stroke-dasharray="2 5.3"
              />

              <!-- Cardinal Letters -->
              <text x="50" y="15" class="ios-cardinal" text-anchor="middle">${north}</text>
              <text x="88" y="54" class="ios-cardinal" text-anchor="middle">${east}</text>
              <text x="50" y="93" class="ios-cardinal" text-anchor="middle">${south}</text>
              <text x="12" y="54" class="ios-cardinal" text-anchor="middle">${west}</text>

              <!-- Rotating Arrow & Indicator Pip -->
              <g transform="rotate(${bearing}, 50, 50)">
                <!-- Compass outer dot -->
                <circle cx="50" cy="11" r="3.5" fill="#ffffff" filter="drop-shadow(0 0 4px rgba(255,255,255,0.8))"/>
                <!-- Direction Arrow -->
                <polygon points="50,19 54,29 50,26 46,29" fill="#ffffff" />
              </g>

              <!-- Center Speed & Unit -->
              <text x="50" y="49" class="ios-compass-speed" text-anchor="middle">${Math.round(speed)}</text>
              <text x="50" y="63" class="ios-compass-unit" text-anchor="middle">${this.windUnit}</text>
            </svg>
          </div>
        </div>

        <div class="ios-tile-footer">${footer}</div>
      </div>
    `;
  }
  // 3. MOON PHASE TILE
  _renderMoonTile(d2) {
    const { phase, illumination, phaseKey } = this._getMoonData();
    const phaseTitle = d2.moon_phases[phaseKey] || d2.moon_phase;
    const theta = phase * 2 * Math.PI;
    const cosVal = Math.cos(theta);
    const rX = Math.abs(cosVal) * 32;
    let pathD = "";
    if (phase < 0.5) {
      const sweep = cosVal <= 0 ? 0 : 1;
      pathD = `M 40 8 A 32 32 0 0 1 40 72 A ${rX} 32 0 0 ${sweep} 40 8 Z`;
    } else {
      const sweep = cosVal <= 0 ? 1 : 0;
      pathD = `M 40 8 A 32 32 0 0 0 40 72 A ${rX} 32 0 0 ${sweep} 40 8 Z`;
    }
    return b`
      <div class="ios-detail-tile">
        <div class="ios-tile-header">
          <svg class="ios-tile-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8z" />
          </svg>
          <span class="ios-tile-title">${phaseTitle}</span>
        </div>

        <div class="ios-tile-body center-content">
          <div class="ios-moon-container">
            <svg viewBox="0 0 80 80" class="ios-moon-svg">
              <defs>
                <radialGradient id="darkSide" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#2a303c" />
                  <stop offset="100%" stop-color="#12161f" />
                </radialGradient>
                <radialGradient id="litSide" cx="45%" cy="40%" r="55%">
                  <stop offset="0%" stop-color="#ffffff" />
                  <stop offset="65%" stop-color="#e2e8f0" />
                  <stop offset="100%" stop-color="#94a3b8" />
                </radialGradient>
                <filter id="moonGlow">
                  <feGaussianBlur stdDeviation="1.5" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <!-- Dark lunar sphere base -->
              <circle cx="40" cy="40" r="32" fill="url(#darkSide)" />

              <!-- Subtle crater details on dark sphere -->
              <circle cx="34" cy="30" r="5" fill="rgba(0,0,0,0.25)" />
              <circle cx="48" cy="46" r="6" fill="rgba(0,0,0,0.22)" />
              <circle cx="30" cy="52" r="4" fill="rgba(0,0,0,0.18)" />

              <!-- Illuminated Phase Segment -->
              <path d="${pathD}" fill="url(#litSide)" filter="url(#moonGlow)" />

              <!-- Outer subtle limb ring -->
              <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255, 255, 255, 0.25)" stroke-width="0.8" />
            </svg>
          </div>
        </div>

        <div class="ios-tile-footer">${d2.illumination(illumination)}</div>
      </div>
    `;
  }
  // 4. SUNSET / SUNRISE TILE
  _renderSunTile(d2) {
    const { isDay, progress, riseTimeStr, setTimeStr } = this._getSunProgress();
    const title = isDay ? d2.sunset : d2.sunrise;
    const mainTime = isDay ? setTimeStr : riseTimeStr;
    const subTime = isDay ? `${d2.sunrise}: ${riseTimeStr}` : `${d2.sunset}: ${setTimeStr}`;
    const dotX = 10 + 110 * progress;
    const dotY = 38 - 30 * Math.sin(Math.PI * progress);
    return b`
      <div class="ios-detail-tile">
        <div class="ios-tile-header">
          <svg class="ios-tile-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3zm0-10a1 1 0 0 1 1-1h.01a1 1 0 0 1 0 2H13a1 1 0 0 1-1-1zm-7 7a1 1 0 0 1-1-1V11a1 1 0 0 1 2 0v.01a1 1 0 0 1-1 1zm14 0a1 1 0 0 1-1-1v-.01a1 1 0 0 1 2 0V11a1 1 0 0 1-1 1zm-3-13a1 1 0 0 1 1.41 0l.01.01a1 1 0 0 1 0 1.41l-.01.01a1 1 0 0 1-1.41-1.43zm-10.82 0a1 1 0 0 1 0 1.41l-.01.01a1 1 0 0 1-1.41 0l-.01-.01a1 1 0 0 1 0-1.41l.01-.01a1 1 0 0 1 1.42 0z"/>
          </svg>
          <span class="ios-tile-title">${title}</span>
        </div>

        <div class="ios-tile-body">
          <div class="ios-stat-value">${mainTime}</div>

          <div class="ios-sun-arc-box">
            <svg viewBox="0 0 130 50" class="ios-sun-arc-svg">
              <defs>
                <filter id="sunGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <!-- Horizon dashed line -->
              <line x1="5" y1="38" x2="125" y2="38" stroke="rgba(255,255,255,0.2)" stroke-width="1.2" stroke-dasharray="3 3"/>

              <!-- Sun arc curve -->
              <path d="M 10 38 Q 65 2 120 38" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>

              <!-- Sun glowing dot positioned at current time progress -->
              <circle cx="${dotX}" cy="${dotY}" r="4.5" fill="#ffffff" filter="url(#sunGlow)"/>
            </svg>
          </div>
        </div>

        <div class="ios-tile-footer">${subTime}</div>
      </div>
    `;
  }
  // 5. UV INDEX TILE
  _renderUvTile(d2, uv) {
    let uvCategory = d2.uv_levels.low;
    let advice = d2.uv_advice_low;
    if (uv >= 11) {
      uvCategory = d2.uv_levels.extreme;
      advice = d2.uv_advice_extreme;
    } else if (uv >= 8) {
      uvCategory = d2.uv_levels.very_high;
      advice = d2.uv_advice_high;
    } else if (uv >= 6) {
      uvCategory = d2.uv_levels.high;
      advice = d2.uv_advice_high;
    } else if (uv >= 3) {
      uvCategory = d2.uv_levels.moderate;
      advice = d2.uv_advice_mod;
    }
    const pct = Math.min(100, Math.max(0, Math.round(uv / 11 * 100)));
    return b`
      <div class="ios-detail-tile">
        <div class="ios-tile-header">
          <svg class="ios-tile-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/>
          </svg>
          <span class="ios-tile-title">${d2.uv_index}</span>
        </div>

        <div class="ios-tile-body">
          <div class="ios-stat-value">${Math.round(uv)}</div>
          <div class="ios-stat-sub">${uvCategory}</div>

          <div class="ios-uv-bar-wrapper">
            <div class="ios-uv-bar">
              <div class="ios-uv-marker" style="left: ${pct}%;"></div>
            </div>
          </div>
        </div>

        <div class="ios-tile-footer">${advice}</div>
      </div>
    `;
  }
  // 6. PRECIPITATION TILE
  _renderPrecipTile(d2, precip) {
    const formattedPrecip = precip > 0 ? precip >= 10 ? Math.round(precip) : precip.toFixed(1) : 0;
    const footer = precip > 0 ? d2.precip_expected_24h(formattedPrecip, this.precipUnit) : d2.no_precip_expected;
    return b`
      <div class="ios-detail-tile">
        <div class="ios-tile-header">
          <svg class="ios-tile-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
          <span class="ios-tile-title">${d2.precipitation}</span>
        </div>

        <div class="ios-tile-body">
          <div class="ios-stat-value">${formattedPrecip} ${this.precipUnit}</div>
          <div class="ios-stat-sub">${d2.precip_in_24h}</div>
        </div>

        <div class="ios-tile-footer">${footer}</div>
      </div>
    `;
  }
  // 7. VISIBILITY TILE
  _renderVisibilityTile(d2, visibility, unit) {
    let footer = d2.vis_perfect;
    if (visibility < 2) {
      footer = d2.vis_fog;
    } else if (visibility < 5) {
      footer = d2.vis_haze;
    } else if (visibility < 10) {
      footer = d2.vis_good;
    }
    return b`
      <div class="ios-detail-tile">
        <div class="ios-tile-header">
          <svg class="ios-tile-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
          </svg>
          <span class="ios-tile-title">${d2.visibility}</span>
        </div>

        <div class="ios-tile-body">
          <div class="ios-stat-value">${Math.round(visibility)} ${unit}</div>
        </div>

        <div class="ios-tile-footer">${footer}</div>
      </div>
    `;
  }
  // 8. HUMIDITY & DEW POINT TILE
  _renderHumidityTile(d2, humidity, dewPoint) {
    return b`
      <div class="ios-detail-tile">
        <div class="ios-tile-header">
          <svg class="ios-tile-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2c-5.33 6.67-8 10-8 13.5a8 8 0 1 0 16 0c0-3.5-2.67-6.83-8-13.5zm0 19a5.5 5.5 0 0 1-5.5-5.5c0-2.45 1.76-4.97 5.5-9.64 3.74 4.67 5.5 7.19 5.5 9.64 0 3.04-2.46 5.5-5.5 5.5z"/>
          </svg>
          <span class="ios-tile-title">${d2.humidity}</span>
        </div>

        <div class="ios-tile-body">
          <div class="ios-stat-value">%${Math.round(humidity)}</div>
        </div>

        <div class="ios-tile-footer">${d2.dew_point(dewPoint)}</div>
      </div>
    `;
  }
  // 9. PRESSURE TILE
  _renderPressureTile(d2, pressure, unit) {
    const pVal = Math.round(pressure);
    const pNorm = Math.min(1060, Math.max(960, pVal));
    const needleDeg = 140 + (pNorm - 960) / 100 * 260;
    const displayP = pVal >= 1e3 ? `${(pVal / 1e3).toFixed(3).replace(".", ".")}` : String(pVal);
    return b`
      <div class="ios-detail-tile">
        <div class="ios-tile-header">
          <svg class="ios-tile-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v5l4.25 2.52.77-1.28-3.02-1.79V7z"/>
          </svg>
          <span class="ios-tile-title">${d2.pressure}</span>
        </div>

        <div class="ios-tile-body center-content">
          <div class="ios-pressure-gauge">
            <svg viewBox="0 0 100 80" class="ios-pressure-svg">
              <!-- Radial dashed arc ticks -->
              <circle
                cx="50"
                cy="46"
                r="36"
                fill="none"
                stroke="rgba(255, 255, 255, 0.28)"
                stroke-width="2.5"
                stroke-dasharray="2 6"
              />

              <!-- Needle pointing to pressure -->
              <g transform="rotate(${needleDeg}, 50, 46)">
                <line x1="50" y1="46" x2="50" y2="12" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
                <circle cx="50" cy="46" r="3" fill="#ffffff"/>
              </g>

              <!-- Center readout -->
              <text x="50" y="44" class="ios-pressure-symbol" text-anchor="middle">=</text>
              <text x="50" y="56" class="ios-pressure-val" text-anchor="middle">${displayP}</text>
              <text x="50" y="67" class="ios-pressure-unit" text-anchor="middle">${unit}</text>

              <!-- Trend arrows -->
              <text x="24" y="74" class="ios-pressure-arrow" text-anchor="middle">↓</text>
              <text x="76" y="74" class="ios-pressure-arrow" text-anchor="middle">↑</text>
            </svg>
          </div>
        </div>

        <div class="ios-tile-footer">${d2.pressure_stable}</div>
      </div>
    `;
  }
};
__decorateClass$4([
  n$1({ attribute: false })
], Ios27DetailTiles.prototype, "hass", 2);
__decorateClass$4([
  n$1({ attribute: false })
], Ios27DetailTiles.prototype, "entityState", 2);
__decorateClass$4([
  n$1({ type: Number })
], Ios27DetailTiles.prototype, "currentTemp", 2);
__decorateClass$4([
  n$1({ type: Object })
], Ios27DetailTiles.prototype, "dailyForecast", 2);
__decorateClass$4([
  n$1({ type: Array })
], Ios27DetailTiles.prototype, "hourlyForecasts", 2);
__decorateClass$4([
  n$1({ type: Object })
], Ios27DetailTiles.prototype, "sunTimes", 2);
__decorateClass$4([
  n$1()
], Ios27DetailTiles.prototype, "windUnit", 2);
__decorateClass$4([
  n$1()
], Ios27DetailTiles.prototype, "precipUnit", 2);
__decorateClass$4([
  n$1()
], Ios27DetailTiles.prototype, "locale", 2);
__decorateClass$4([
  n$1()
], Ios27DetailTiles.prototype, "timeFormat", 2);
__decorateClass$4([
  n$1({ type: Object })
], Ios27DetailTiles.prototype, "config", 2);
Ios27DetailTiles = __decorateClass$4([
  t("ios27-detail-tiles")
], Ios27DetailTiles);
var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$3(target, key, result);
  return result;
};
let Ios27BottomBar = class extends i {
  constructor() {
    super(...arguments);
    this.totalLocations = 1;
    this.activeIndex = 0;
  }
  createRenderRoot() {
    return this;
  }
  render() {
    const total = this.totalLocations;
    if (total <= 1) {
      return b``;
    }
    const active = Math.min(Math.max(0, this.activeIndex), total - 1);
    return b`
      <div class="ios-bottom-bar">
        <!-- Map button -->
        <button
          class="ios-bottom-btn"
          title="Open Weather Map"
          @click=${this.onMapClick}
        >
          <svg viewBox="0 0 24 24">
            <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" />
          </svg>
        </button>

        <!-- Pager Dots Pill (Interactive Multi-Location Switcher) -->
        <div class="ios-pager-pill" title="Konum Değiştir / Sağa-Sola Kaydır">
          <!-- Primary Location: Location Arrow -->
          <svg
            class="ios-pager-arrow ${active === 0 ? "active" : ""}"
            viewBox="0 0 24 24"
            title="Konum 1 (Ana Konum)"
            @click=${(e2) => this.onDotClick(e2, 0)}
          >
            <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
          </svg>

          <!-- Extra Locations: Dots -->
          ${Array.from({ length: total - 1 }).map((_2, i2) => {
      const locIdx = i2 + 1;
      return b`
              <div
                class="ios-pager-dot ${active === locIdx ? "active" : ""}"
                title="Konum ${locIdx + 1}"
                @click=${(e2) => this.onDotClick(e2, locIdx)}
              ></div>
            `;
    })}
        </div>

        <!-- Menu / List button -->
        <button
          class="ios-bottom-btn"
          title="Şehirler ve Konumlar Listesi"
          @click=${this.onListClick}
        >
          <svg viewBox="0 0 24 24">
            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
          </svg>
        </button>
      </div>
    `;
  }
  onDotClick(e2, index) {
    e2.stopPropagation();
    this.dispatchEvent(
      new CustomEvent("location-select", {
        bubbles: true,
        composed: true,
        detail: { index }
      })
    );
  }
  onMapClick(e2) {
    e2.stopPropagation();
    this.dispatchEvent(new CustomEvent("map-click", { bubbles: true, composed: true }));
  }
  onListClick(e2) {
    e2.stopPropagation();
    this.dispatchEvent(new CustomEvent("list-click", { bubbles: true, composed: true }));
  }
};
__decorateClass$3([
  n$1({ type: Number })
], Ios27BottomBar.prototype, "totalLocations", 2);
__decorateClass$3([
  n$1({ type: Number })
], Ios27BottomBar.prototype, "activeIndex", 2);
Ios27BottomBar = __decorateClass$3([
  t("ios27-bottom-bar")
], Ios27BottomBar);
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$2(target, key, result);
  return result;
};
let Ios27SkyAnimation = class extends i {
  constructor() {
    super(...arguments);
    this.condition = "sunny";
    this.isNight = false;
    this.layer = "all";
  }
  render() {
    const s2 = (this.condition || "").toLowerCase().replace(/_/g, "-");
    const isNight = this.isNight;
    const isRain = s2.includes("rain") || s2.includes("pouring") || s2.includes("drizzle") || s2.includes("thunder") || s2.includes("lightning");
    const isSnow = s2.includes("snow") || s2.includes("sleet") || s2.includes("hail");
    if (s2.includes("thunder") || s2.includes("lightning")) {
      return this.renderThunderstorm(isNight);
    }
    if (isRain) {
      return this.renderRain(isNight);
    }
    if (isSnow) {
      return this.renderSnow(isNight);
    }
    if (isNight) {
      return this.renderNight(s2);
    }
    if (s2.includes("partly")) {
      return this.renderPartlyCloudy();
    }
    if (s2.includes("cloud") || s2 === "overcast" || s2.includes("fog")) {
      return this.renderCloudy();
    }
    return this.renderSunny();
  }
  /* Rain Animation (Storm Clouds in Background + Top Rain Streaks behind Location) */
  renderRain(isNight = false) {
    return b`
      <div class="sky-stage">
        ${isNight ? b`<div class="moon-glow" style="opacity: 0.35;"></div>` : this.renderCloudsContent()}
        ${this.renderTopRain()}
      </div>
    `;
  }
  /* Thunderstorm Animation: Clouds + Lightning Sheet Flash + Top Rain */
  renderThunderstorm(isNight = false) {
    return b`
      <div class="sky-stage">
        ${isNight ? b`<div class="moon-glow" style="opacity: 0.35;"></div>` : this.renderCloudsContent()}
        <div class="lightning-flash"></div>
        ${this.renderTopRain()}
      </div>
    `;
  }
  /* Snow Animation: Clouds + Gentle Drifting Snow in Top Sky */
  renderSnow(isNight = false) {
    return b`
      <div class="sky-stage">
        ${isNight ? b`<div class="moon-glow" style="opacity: 0.35;"></div>` : this.renderCloudsContent()}
        ${this.renderTopSnow()}
      </div>
    `;
  }
  /* Rain Streaks in the Top Sky Area (Subtle, fine authentic Apple Weather rain) */
  renderTopRain() {
    const streaks = [
      { left: "2%", height: "32px", delay: "-0.12s", duration: "0.72s", width: "1px", opacity: "0.45" },
      { left: "4%", height: "24px", delay: "-0.45s", duration: "0.80s", width: "0.8px", opacity: "0.35" },
      { left: "7%", height: "42px", delay: "-0.28s", duration: "0.68s", width: "1.1px", opacity: "0.6" },
      { left: "9%", height: "28px", delay: "-0.65s", duration: "0.75s", width: "0.9px", opacity: "0.4" },
      { left: "12%", height: "36px", delay: "-0.18s", duration: "0.70s", width: "1px", opacity: "0.5" },
      { left: "14%", height: "22px", delay: "-0.52s", duration: "0.82s", width: "0.8px", opacity: "0.35" },
      { left: "17%", height: "44px", delay: "-0.05s", duration: "0.66s", width: "1.1px", opacity: "0.55" },
      { left: "19%", height: "30px", delay: "-0.38s", duration: "0.74s", width: "1px", opacity: "0.45" },
      { left: "22%", height: "26px", delay: "-0.72s", duration: "0.78s", width: "0.8px", opacity: "0.35" },
      { left: "25%", height: "40px", delay: "-0.22s", duration: "0.69s", width: "1px", opacity: "0.5" },
      { left: "27%", height: "34px", delay: "-0.58s", duration: "0.73s", width: "0.9px", opacity: "0.4" },
      { left: "30%", height: "46px", delay: "-0.14s", duration: "0.67s", width: "1.2px", opacity: "0.6" },
      { left: "32%", height: "25px", delay: "-0.48s", duration: "0.81s", width: "0.8px", opacity: "0.35" },
      { left: "35%", height: "38px", delay: "-0.31s", duration: "0.71s", width: "1px", opacity: "0.5" },
      { left: "38%", height: "28px", delay: "-0.62s", duration: "0.76s", width: "0.9px", opacity: "0.4" },
      { left: "40%", height: "44px", delay: "-0.08s", duration: "0.68s", width: "1.1px", opacity: "0.55" },
      { left: "43%", height: "32px", delay: "-0.42s", duration: "0.74s", width: "1px", opacity: "0.45" },
      { left: "45%", height: "22px", delay: "-0.75s", duration: "0.83s", width: "0.8px", opacity: "0.35" },
      { left: "48%", height: "42px", delay: "-0.25s", duration: "0.70s", width: "1.1px", opacity: "0.55" },
      { left: "51%", height: "35px", delay: "-0.55s", duration: "0.72s", width: "1px", opacity: "0.45" },
      { left: "53%", height: "27px", delay: "-0.16s", duration: "0.79s", width: "0.8px", opacity: "0.35" },
      { left: "56%", height: "45px", delay: "-0.35s", duration: "0.67s", width: "1.2px", opacity: "0.6" },
      { left: "58%", height: "30px", delay: "-0.68s", duration: "0.75s", width: "0.9px", opacity: "0.4" },
      { left: "61%", height: "36px", delay: "-0.04s", duration: "0.71s", width: "1px", opacity: "0.5" },
      { left: "64%", height: "24px", delay: "-0.46s", duration: "0.80s", width: "0.8px", opacity: "0.35" },
      { left: "66%", height: "43px", delay: "-0.29s", duration: "0.69s", width: "1.1px", opacity: "0.55" },
      { left: "69%", height: "31px", delay: "-0.61s", duration: "0.73s", width: "1px", opacity: "0.45" },
      { left: "72%", height: "26px", delay: "-0.19s", duration: "0.78s", width: "0.8px", opacity: "0.35" },
      { left: "74%", height: "40px", delay: "-0.51s", duration: "0.70s", width: "1px", opacity: "0.5" },
      { left: "77%", height: "33px", delay: "-0.11s", duration: "0.72s", width: "0.9px", opacity: "0.4" },
      { left: "80%", height: "45px", delay: "-0.41s", duration: "0.66s", width: "1.1px", opacity: "0.6" },
      { left: "82%", height: "25px", delay: "-0.74s", duration: "0.81s", width: "0.8px", opacity: "0.35" },
      { left: "85%", height: "37px", delay: "-0.21s", duration: "0.71s", width: "1px", opacity: "0.5" },
      { left: "87%", height: "29px", delay: "-0.57s", duration: "0.76s", width: "0.9px", opacity: "0.4" },
      { left: "90%", height: "42px", delay: "-0.07s", duration: "0.68s", width: "1.1px", opacity: "0.55" },
      { left: "93%", height: "31px", delay: "-0.39s", duration: "0.74s", width: "1px", opacity: "0.45" },
      { left: "95%", height: "23px", delay: "-0.71s", duration: "0.82s", width: "0.8px", opacity: "0.35" },
      { left: "97%", height: "38px", delay: "-0.24s", duration: "0.70s", width: "1px", opacity: "0.5" }
    ];
    return b`
      <div class="rain-top-stage">
        ${streaks.map((st) => b`
          <div
            class="rain-streak"
            style="left: ${st.left}; height: ${st.height}; width: ${st.width}; animation-delay: ${st.delay}; animation-duration: ${st.duration}; opacity: ${st.opacity};"
          ></div>
        `)}
      </div>
    `;
  }
  /* Snow in Top Sky Area */
  renderTopSnow() {
    const flakes = [
      { left: "4%", size: "5px", duration: "4.5s", delay: "-0.5s", opacity: "0.9" },
      { left: "9%", size: "7px", duration: "6.2s", delay: "-2.1s", opacity: "0.95" },
      { left: "15%", size: "4px", duration: "4.8s", delay: "-3.7s", opacity: "0.85" },
      { left: "22%", size: "6px", duration: "5.5s", delay: "-1.4s", opacity: "0.9" },
      { left: "29%", size: "5px", duration: "6.8s", delay: "-4.2s", opacity: "0.9" },
      { left: "36%", size: "8px", duration: "5.1s", delay: "-0.9s", opacity: "0.95" },
      { left: "43%", size: "4px", duration: "4.9s", delay: "-3.1s", opacity: "0.85" },
      { left: "50%", size: "6px", duration: "6.5s", delay: "-2.6s", opacity: "0.9" },
      { left: "57%", size: "5px", duration: "5.2s", delay: "-1.8s", opacity: "0.9" },
      { left: "64%", size: "7px", duration: "6.0s", delay: "-3.4s", opacity: "0.95" },
      { left: "71%", size: "4px", duration: "4.6s", delay: "-0.7s", opacity: "0.85" },
      { left: "78%", size: "6px", duration: "5.8s", delay: "-2.9s", opacity: "0.9" },
      { left: "85%", size: "5px", duration: "6.4s", delay: "-1.2s", opacity: "0.9" },
      { left: "92%", size: "7px", duration: "5.4s", delay: "-3.8s", opacity: "0.95" }
    ];
    return b`
      <div class="snow-top-stage">
        ${flakes.map((fl) => b`
          <div
            class="snowflake"
            style="left: ${fl.left}; width: ${fl.size}; height: ${fl.size}; animation-duration: ${fl.duration}; animation-delay: ${fl.delay}; opacity: ${fl.opacity};"
          ></div>
        `)}
      </div>
    `;
  }
  /* Shared Cloud Canvas Layers */
  renderCloudsContent() {
    const darkCloudSvg = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 300' fill='%2364748b'><ellipse cx='120' cy='220' rx='160' ry='110'/><ellipse cx='320' cy='180' rx='190' ry='130'/><ellipse cx='520' cy='200' rx='170' ry='120'/><ellipse cx='720' cy='160' rx='200' ry='140'/><ellipse cx='920' cy='210' rx='160' ry='110'/><ellipse cx='1120' cy='190' rx='180' ry='120'/></svg>")`;
    const lightCloudSvg = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 300' fill='%2394a3b8'><ellipse cx='160' cy='240' rx='140' ry='90'/><ellipse cx='380' cy='210' rx='160' ry='110'/><ellipse cx='600' cy='230' rx='150' ry='100'/><ellipse cx='820' cy='200' rx='170' ry='120'/><ellipse cx='1040' cy='220' rx='150' ry='100'/></svg>")`;
    return b`
      <div class="cloud-canvas cloud-back" style="background-image: ${darkCloudSvg};"></div>
      <div class="cloud-canvas cloud-mid" style="background-image: ${lightCloudSvg};"></div>
      <div class="cloud-canvas cloud-front" style="background-image: ${darkCloudSvg};"></div>
    `;
  }
  /* Background Cloudy Sky */
  renderCloudy() {
    return b`
      <div class="sky-stage">
        ${this.renderCloudsContent()}
      </div>
    `;
  }
  /* Partly Cloudy Background */
  renderPartlyCloudy() {
    const softCloudSvg = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 260' fill='rgba(255,255,255,0.7)'><circle cx='140' cy='180' r='90'/><circle cx='280' cy='140' r='110'/><circle cx='460' cy='160' r='100'/><circle cx='640' cy='130' r='120'/><circle cx='800' cy='170' r='90'/><circle cx='980' cy='150' r='110'/></svg>")`;
    return b`
      <div class="sky-stage">
        <div class="sky-vignette"></div>
        <div class="sun-halo" style="opacity: 0.4; top: -85px;"></div>
        <div class="cloud-canvas cloud-back" style="background-image: ${softCloudSvg}; opacity: 0.18; top: 15px;"></div>
        <div class="cloud-canvas cloud-front" style="background-image: ${softCloudSvg}; opacity: 0.24; top: 30px;"></div>
      </div>
    `;
  }
  /* Sunny / Clear Background */
  renderSunny() {
    return b`
      <div class="sky-stage">
        <div class="sky-vignette"></div>
        <div class="sun-halo"></div>
        <div class="sun-flare"></div>
      </div>
    `;
  }
  /* Night Sky with Twinkling Stars Background */
  renderNight(condition) {
    const stars = [
      { top: "8%", left: "12%", size: "2px", delay: "0s" },
      { top: "15%", left: "32%", size: "3px", delay: "1.2s" },
      { top: "22%", left: "78%", size: "1.5px", delay: "0.4s" },
      { top: "28%", left: "48%", size: "2.5px", delay: "2.1s" },
      { top: "35%", left: "88%", size: "3px", delay: "0.8s" },
      { top: "42%", left: "18%", size: "2px", delay: "1.5s" },
      { top: "55%", left: "62%", size: "2.5px", delay: "2.7s" },
      { top: "65%", left: "28%", size: "1.5px", delay: "0.9s" },
      { top: "75%", left: "82%", size: "3px", delay: "1.8s" },
      { top: "85%", left: "15%", size: "2px", delay: "2.4s" }
    ];
    return b`
      <div class="sky-stage">
        <div class="moon-glow"></div>
        ${stars.map((st) => b`
          <div
            class="star"
            style="top: ${st.top}; left: ${st.left}; width: ${st.size}; height: ${st.size}; animation-delay: ${st.delay};"
          ></div>
        `)}
        ${condition.includes("cloud") ? this.renderCloudsContent() : ""}
      </div>
    `;
  }
};
Ios27SkyAnimation.styles = i$3`
    :host {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      pointer-events: none;
      z-index: 1;
    }

    .sky-stage {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
    }

    /* =========================================
       CLOUDY / OVERCAST REALISTIC ANIMATION
       ========================================= */
    .cloud-canvas {
      position: absolute;
      top: -30px;
      left: 0;
      width: 200%;
      height: 240px;
      pointer-events: none;
    }

    /* Cloud layer 1: Slow background heavy cloud mass */
    .cloud-back {
      animation: driftClouds 65s linear infinite;
      opacity: 0.35;
      filter: blur(14px);
    }

    /* Cloud layer 2: Mid-ground billowy cloud formation */
    .cloud-mid {
      top: -10px;
      animation: driftClouds 42s linear infinite reverse;
      opacity: 0.45;
      filter: blur(8px);
    }

    /* Cloud layer 3: Foreground softer drifting mists */
    .cloud-front {
      top: 10px;
      animation: driftClouds 28s linear infinite;
      opacity: 0.3;
      filter: blur(5px);
    }

    @keyframes driftClouds {
      0% {
        transform: translate3d(0, 0, 0);
      }
      100% {
        transform: translate3d(-50%, 0, 0);
      }
    }

    /* =========================================
       RAIN ANIMATION (SUBTLE APPLE WEATHER TOP SKY BEHIND LOCATION)
       ========================================= */
    .rain-top-stage {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 240px;
      overflow: hidden;
      pointer-events: none;
      -webkit-mask-image: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%);
      mask-image: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%);
    }

    .rain-streak {
      position: absolute;
      top: -50px;
      width: 1px;
      border-radius: 1px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.25) 30%, rgba(255, 255, 255, 0.75) 100%);
      animation: rainFallTop linear infinite;
      pointer-events: none;
    }

    @keyframes rainFallTop {
      0% {
        transform: translateY(0) translateX(0) rotate(8deg);
      }
      100% {
        transform: translateY(300px) translateX(-42px) rotate(8deg);
      }
    }

    /* =========================================
       SNOW ANIMATION (ATMOSPHERIC TOP SKY BEHIND LOCATION)
       ========================================= */
    .snow-top-stage {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 250px;
      overflow: hidden;
      pointer-events: none;
      -webkit-mask-image: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 55%, rgba(0, 0, 0, 0) 100%);
      mask-image: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 55%, rgba(0, 0, 0, 0) 100%);
    }

    .snowflake {
      position: absolute;
      top: -30px;
      background: #ffffff;
      border-radius: 50%;
      filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.85));
      animation: snowDriftTop linear infinite;
      pointer-events: none;
    }

    @keyframes snowDriftTop {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 0.95;
      }
      50% {
        transform: translateY(140px) translateX(15px);
        opacity: 0.9;
      }
      100% {
        transform: translateY(300px) translateX(-10px);
        opacity: 0.2;
      }
    }

    /* Subtle top vignette for crystal-clear text contrast on light/sunny skies */
    .sky-vignette {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 240px;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.28) 0%, rgba(0, 0, 0, 0.12) 50%, rgba(0, 0, 0, 0) 100%);
      pointer-events: none;
      z-index: 2;
    }

    /* =========================================
       SUNNY / SUN HALO ANIMATION
       ========================================= */
    .sun-halo {
      position: absolute;
      top: -80px;
      left: 50%;
      transform: translateX(-50%);
      width: 320px;
      height: 320px;
      background: radial-gradient(circle, rgba(255, 230, 140, 0.26) 0%, rgba(255, 190, 40, 0.12) 45%, rgba(255, 255, 255, 0) 75%);
      border-radius: 50%;
      animation: sunPulse 7s ease-in-out infinite alternate;
      filter: blur(16px);
    }

    .sun-flare {
      position: absolute;
      top: -30px;
      left: 50%;
      transform: translateX(-50%);
      width: 170px;
      height: 170px;
      background: radial-gradient(circle, rgba(255, 250, 220, 0.32) 0%, rgba(255, 255, 255, 0) 65%);
      border-radius: 50%;
      filter: blur(12px);
    }

    @keyframes sunPulse {
      0% {
        transform: translateX(-50%) scale(0.95);
        opacity: 0.75;
      }
      100% {
        transform: translateX(-50%) scale(1.15);
        opacity: 1;
      }
    }

    /* =========================================
       NIGHT & STARS ANIMATION
       ========================================= */
    .star {
      position: absolute;
      background: #ffffff;
      border-radius: 50%;
      animation: starTwinkle 3.5s ease-in-out infinite alternate;
    }

    @keyframes starTwinkle {
      0%, 100% {
        opacity: 0.2;
        transform: scale(0.8);
      }
      50% {
        opacity: 0.95;
        transform: scale(1.2);
        box-shadow: 0 0 4px #ffffff;
      }
    }

    .moon-glow {
      position: absolute;
      top: -30px;
      right: 15%;
      width: 220px;
      height: 220px;
      background: radial-gradient(circle, rgba(224, 242, 254, 0.25) 0%, rgba(186, 230, 253, 0.08) 50%, transparent 75%);
      border-radius: 50%;
      filter: blur(12px);
    }

    /* =========================================
       THUNDERSTORM LIGHTNING FLASH
       ========================================= */
    .lightning-flash {
      position: absolute;
      inset: 0;
      background: rgba(255, 255, 255, 0.6);
      opacity: 0;
      animation: lightning 8s ease-in-out infinite;
      pointer-events: none;
    }

    @keyframes lightning {
      0%, 94%, 98%, 100% {
        opacity: 0;
      }
      95% {
        opacity: 0.7;
      }
      96% {
        opacity: 0.1;
      }
      97% {
        opacity: 0.9;
      }
    }
  `;
__decorateClass$2([
  n$1()
], Ios27SkyAnimation.prototype, "condition", 2);
__decorateClass$2([
  n$1({ type: Boolean })
], Ios27SkyAnimation.prototype, "isNight", 2);
__decorateClass$2([
  n$1({ reflect: true })
], Ios27SkyAnimation.prototype, "layer", 2);
Ios27SkyAnimation = __decorateClass$2([
  t("ios27-sky-animation")
], Ios27SkyAnimation);
const editorTranslations = {
  tr: {
    weather_entity: "Hava Durumu Varlığı (Entity) *",
    select_weather_entity: "Hava durumu varlığı seçin...",
    custom_location_name: "Özel Şehir / Konum Adı (İsteğe bağlı)",
    location_placeholder: "Örn. Kırklareli",
    additional_locations_title: "🌍 Diğer Konumlar / Şehirler (Çoklu Konum)",
    additional_locations_desc: "Kart üzerinde sağa/sola kaydırarak veya alt noktalarla geçiş yapılabilecek diğer hava durumu konumları.",
    add_location_placeholder: "+ Yeni Konum / Şehir Ekle...",
    remove: "Kaldır",
    add_city_help: "💡 Farklı şehirler eklemek için: Home Assistant'ta Ayarlar > Cihazlar ve Hizmetler > Entegrasyon Ekle bölümünden Met.no veya Open-Meteo ile istediğiniz şehri ekleyin. Oluşturulan yeni weather.sehir varlığı burada otomatik listelenecektir.",
    card_layout_shape: "Kart Düzeni (Format)",
    layout_square_scroll: "🔄 Kare - Kaydırılabilir (1:1 İçten Kaydırmalı Zengin Görünüm)",
    layout_square_fit: "⏹ Kare - Tam Sığan (1:1 Sıfır Kaydırmalı Kompakt Widget)",
    layout_default: "📱 Varsayılan (Orijinal Dikey iPhone Boyutu)",
    layout_compact: "▭ Kompakt (Yatay Dikdörtgen)",
    layout_mini: "🏷 Mini (Minimalist Hızlı Bakış Widget'ı)",
    language: "Kart Dili",
    language_auto: "Otomatik (Home Assistant Dili)",
    default_view_mode: "Varsayılan Görünüm Modu",
    view_condition: "⛅ Hava Koşulları ve Sıcaklık",
    view_precipitation: "💧 Yağış ve Yağmur İhtimali",
    view_wind: "💨 Rüzgar Hızı ve Dalga Grafiği",
    time_format: "Saat Formatı",
    time_auto: "Otomatik (Bölgeye göre)",
    time_12: "12 Saat (12AM, 1PM)",
    time_24: "24 Saat (13:00, 14:00)",
    temp_sensor_override: "Harici Sıcaklık Sensörü (İsteğe bağlı)",
    custom_highlights_text: "Özel Öne Çıkanlar Metni (İsteğe bağlı)",
    custom_highlights_placeholder: "Özel duyuru veya akıllı hava özeti",
    custom_card_height: "Özel Kart Yüksekliği (İsteğe bağlı, örn. 400px)",
    enable_scroll: "Dahili Kaydırmayı Etkinleştir (Akıcı Kaydırma)",
    show_highlights: "Öne Çıkanlar Kartını Göster (Smart Highlights)",
    show_details: "Detay Kutularını Göster (Apple Weather Rüzgar, Nem, Basınç, Hissedilen vb.)",
    map_url: "Harita / Radar Bağlantısı veya Yolu (İsteğe bağlı)",
    map_url_placeholder: "Örn. /map veya https://embed.windy.com",
    show_bottom_bar: "iOS Alt Menü Çubuğunu Göster (Sadece 2+ konumda görünür)",
    animated_background: "Dinamik Atmosferik Gökyüzü Arka Planı (Yağmur, Kar, Şimşek, Güneş Işıltısı)",
    transparent_background: "Şeffaf Arka Plan (Home Assistant panosuyla harmanla)"
  },
  en: {
    weather_entity: "Weather Entity *",
    select_weather_entity: "Select weather entity...",
    custom_location_name: "Custom Location Name (Optional)",
    location_placeholder: "e.g. Kırklareli",
    additional_locations_title: "🌍 Additional Locations (Multi-Location)",
    additional_locations_desc: "Additional weather locations switchable by swiping left/right or tapping bottom dots.",
    add_location_placeholder: "+ Add New Location / City...",
    remove: "Remove",
    add_city_help: "💡 To add different cities: In Home Assistant, go to Settings > Devices & Services > Add Integration and add Met.no or Open-Meteo for your desired cities. The created weather.city entities will appear here automatically.",
    card_layout_shape: "Card Layout Shape",
    layout_square_scroll: "🔄 Square - Scrollable (1:1 with Internal Scroll)",
    layout_square_fit: "⏹ Square - Fitted (1:1 Zero-scroll Widget)",
    layout_default: "📱 Default (Full Vertical Phone Style)",
    layout_compact: "▭ Compact (Horizontal Rectangle)",
    layout_mini: "🏷 Mini (Minimalist Glanceable Widget)",
    language: "Card Language",
    language_auto: "Auto (Home Assistant Language)",
    default_view_mode: "Default View Mode",
    view_condition: "⛅ Conditions & Temperature",
    view_precipitation: "💧 Precipitation & Chance of Rain",
    view_wind: "💨 Wind Speed & Waves",
    time_format: "Time Format",
    time_auto: "Auto (from locale)",
    time_12: "12-hour (12AM, 1PM)",
    time_24: "24-hour (13:00, 14:00)",
    temp_sensor_override: "Temperature Sensor Override (Optional)",
    custom_highlights_text: "Custom Highlights Text (Optional)",
    custom_highlights_placeholder: "Custom announcement or smart summary",
    custom_card_height: "Custom Card Height (Optional, e.g. 400px)",
    enable_scroll: "Enable Internal Scrolling (Smooth Scroll)",
    show_highlights: "Show Highlights Card (Smart Highlights)",
    show_details: "Show Detail Tiles (Apple Weather Wind, Humidity, Pressure, Feels Like, etc.)",
    map_url: "Map / Radar URL or Path (Optional)",
    map_url_placeholder: "e.g. /map or https://embed.windy.com",
    show_bottom_bar: "Show iOS Bottom Bar (Visible only when 2+ locations configured)",
    animated_background: "Dynamic Weather Sky Background (Rain, Snow, Thunder, Sunlight)",
    transparent_background: "Transparent Background (Blend with HA theme)"
  },
  de: {
    weather_entity: "Wetter-Entität *",
    select_weather_entity: "Wetter-Entität auswählen...",
    custom_location_name: "Benutzerdefinierter Standortname (Optional)",
    location_placeholder: "z. B. Berlin",
    additional_locations_title: "🌍 Weitere Standorte (Multi-Standort)",
    additional_locations_desc: "Weitere Standorte, zwischen denen durch Wischen oder Tippen auf die unteren Punkte gewechselt werden kann.",
    add_location_placeholder: "+ Neuen Standort hinzufügen...",
    remove: "Entfernen",
    add_city_help: "💡 Um weitere Städte hinzuzufügen: Fügen Sie in Home Assistant unter Einstellungen > Geräte & Dienste > Integration hinzufügen Met.no oder Open-Meteo hinzu.",
    card_layout_shape: "Kartenlayout-Format",
    layout_square_scroll: "🔄 Quadrat - Scrollbar (1:1 mit internem Scrollen)",
    layout_square_fit: "⏹ Quadrat - Angepasst (1:1 Widget ohne Scrollen)",
    layout_default: "📱 Standard (Vollständige vertikale Ansicht)",
    layout_compact: "▭ Kompakt (Horizontales Rechteck)",
    layout_mini: "🏷 Mini (Minimalistisches Schnellansicht-Widget)",
    language: "Kartensprache",
    language_auto: "Automatisch (Home Assistant-Sprache)",
    default_view_mode: "Standardansichtsmodus",
    view_condition: "⛅ Bedingungen & Temperatur",
    view_precipitation: "💧 Niederschlag & Regenwahrscheinlichkeit",
    view_wind: "💨 Windgeschwindigkeit & Wellen",
    time_format: "Zeitformat",
    time_auto: "Automatisch (nach Sprache)",
    time_12: "12-Stunden (12AM, 1PM)",
    time_24: "24-Stunden (13:00, 14:00)",
    temp_sensor_override: "Temperatursensor überschreiben (Optional)",
    custom_highlights_text: "Benutzerdefinierter Highlight-Text (Optional)",
    custom_highlights_placeholder: "Eigene Ankündigung oder smarte Wetterzusammenfassung",
    custom_card_height: "Benutzerdefinierte Kartenhöhe (Optional, z. B. 400px)",
    enable_scroll: "Internes Scrollen aktivieren (Flüssiges Scrollen)",
    show_highlights: "Highlight-Karte anzeigen",
    show_details: "Detailkacheln anzeigen (Apple Weather Wind, Feuchtigkeit, Druck usw.)",
    map_url: "Karten- / Radar-URL oder Pfad (Optional)",
    map_url_placeholder: "z. B. /map oder https://embed.windy.com",
    show_bottom_bar: "iOS-Untenleiste anzeigen (Nur sichtbar bei 2+ Standorten)",
    animated_background: "Dynamischer Himmelshintergrund (Regen, Schnee, Gewitter)",
    transparent_background: "Transparenter Hintergrund (Mit HA-Dashboard verschmelzen)"
  },
  es: {
    weather_entity: "Entidad meteorológica *",
    select_weather_entity: "Seleccionar entidad meteorológica...",
    custom_location_name: "Nombre de ubicación personalizado (Opcional)",
    location_placeholder: "ej. Madrid",
    additional_locations_title: "🌍 Ubicaciones adicionales (Multi-ubicación)",
    additional_locations_desc: "Ubicaciones adicionales intercambiables deslizando o tocando los puntos inferiores.",
    add_location_placeholder: "+ Añadir nueva ubicación...",
    remove: "Eliminar",
    add_city_help: "💡 Para añadir diferentes ciudades: En Home Assistant vaya a Ajustes > Dispositivos y Servicios > Añadir integración y configure Met.no u Open-Meteo.",
    card_layout_shape: "Diseño de la tarjeta",
    layout_square_scroll: "🔄 Cuadrado - Con scroll (1:1 con desplazamiento interno)",
    layout_square_fit: "⏹ Cuadrado - Ajustado (1:1 Widget sin desplazamiento)",
    layout_default: "📱 Predeterminado (Estilo vertical teléfono completo)",
    layout_compact: "▭ Compacto (Rectángulo horizontal)",
    layout_mini: "🏷 Mini (Widget minimalista de vistazo rápido)",
    language: "Idioma de la tarjeta",
    language_auto: "Automático (Idioma de Home Assistant)",
    default_view_mode: "Modo de vista predeterminado",
    view_condition: "⛅ Condiciones y Temperatura",
    view_precipitation: "💧 Precipitación y Probabilidad de lluvia",
    view_wind: "💨 Velocidad del viento y Ondas",
    time_format: "Formato de hora",
    time_auto: "Automático (según región)",
    time_12: "12 horas (12AM, 1PM)",
    time_24: "24 horas (13:00, 14:00)",
    temp_sensor_override: "Anulación de sensor de temperatura (Opcional)",
    custom_highlights_text: "Texto personalizado de destacados (Opcional)",
    custom_highlights_placeholder: "Anuncio personalizado o resumen inteligente",
    custom_card_height: "Altura personalizada de tarjeta (Opcional, ej. 400px)",
    enable_scroll: "Habilitar desplazamiento interno (Scroll fluido)",
    show_highlights: "Mostrar tarjeta de destacados",
    show_details: "Mostrar fichas de detalles (Apple Weather Viento, Humedad, Presión, etc.)",
    map_url: "URL o ruta de Mapa / Radar (Opcional)",
    map_url_placeholder: "ej. /map o https://embed.windy.com",
    show_bottom_bar: "Mostrar barra inferior de iOS (Visible solo con 2+ ubicaciones)",
    animated_background: "Fondo de cielo dinámico (Lluvia, Nieve, Tormenta)",
    transparent_background: "Fondo transparente (Combinar con el tema de HA)"
  },
  fr: {
    weather_entity: "Entité météo *",
    select_weather_entity: "Sélectionner une entité météo...",
    custom_location_name: "Nom de localisation personnalisé (Optionnel)",
    location_placeholder: "ex. Paris",
    additional_locations_title: "🌍 Emplacements supplémentaires (Multi-emplacement)",
    additional_locations_desc: "Emplacements météo supplémentaires accessibles par balayage ou via les points inférieurs.",
    add_location_placeholder: "+ Ajouter un nouvel emplacement...",
    remove: "Supprimer",
    add_city_help: "💡 Pour ajouter d'autres villes: Dans Home Assistant, allez dans Paramètres > Appareils et services > Ajouter une intégration et ajoutez Met.no ou Open-Meteo.",
    card_layout_shape: "Disposition de la carte",
    layout_square_scroll: "🔄 Carré - Avec défilement (1:1 avec défilement interne)",
    layout_square_fit: "⏹ Carré - Ajusté (1:1 Widget sans défilement)",
    layout_default: "📱 Défaut (Style vertical complet type iPhone)",
    layout_compact: "▭ Compact (Rectangle horizontal)",
    layout_mini: "🏷 Mini (Widget minimaliste d'aperçu rapide)",
    language: "Langue de la carte",
    language_auto: "Automatique (Langue de Home Assistant)",
    default_view_mode: "Mode d'affichage par défaut",
    view_condition: "⛅ Conditions et Température",
    view_precipitation: "💧 Précipitations et Probabilité de pluie",
    view_wind: "💨 Vitesse du vent et Ondes",
    time_format: "Format de l'heure",
    time_auto: "Automatique (selon la région)",
    time_12: "12 heures (12AM, 1PM)",
    time_24: "24 heures (13:00, 14:00)",
    temp_sensor_override: "Remplacement du capteur de température (Optionnel)",
    custom_highlights_text: "Texte personnalisé des points forts (Optionnel)",
    custom_highlights_placeholder: "Annonce personnalisée ou résumé météo intelligent",
    custom_card_height: "Hauteur personnalisée de carte (Optionnel, ex. 400px)",
    enable_scroll: "Activer le défilement interne (Défilement fluide)",
    show_highlights: "Afficher la carte des points forts",
    show_details: "Afficher les tuiles de détail (Apple Weather Vent, Humidité, Pression, etc.)",
    map_url: "URL ou chemin Carte / Radar (Optionnel)",
    map_url_placeholder: "ex. /map ou https://embed.windy.com",
    show_bottom_bar: "Afficher la barre inférieure iOS (Visible uniquement avec 2+ emplacements)",
    animated_background: "Arrière-plan céleste dynamique (Pluie, Neige, Orage)",
    transparent_background: "Arrière-plan transparent (Fusionner avec le thème HA)"
  }
};
function getEditorTranslation(lang) {
  const clean = lang.toLowerCase().split(/[-_]/)[0];
  return editorTranslations[clean] || editorTranslations.en;
}
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$1(target, key, result);
  return result;
};
let Ios27WeatherCardEditor = class extends i {
  connectedCallback() {
    super.connectedCallback();
    if (this.hass) {
      locationService.resolveLocationName(this.hass).then(() => this.requestUpdate());
    }
  }
  setConfig(config) {
    const cleanConfig = { ...config };
    const generic = ["cupertino", "forecast home", "home", "ev"];
    if (cleanConfig.name && generic.includes(cleanConfig.name.trim().toLowerCase())) {
      delete cleanConfig.name;
    }
    if (!cleanConfig.card_layout) {
      cleanConfig.card_layout = "square-scroll";
    }
    if (cleanConfig.scrollable === void 0) {
      cleanConfig.scrollable = true;
    }
    if (cleanConfig.show_details === void 0) {
      cleanConfig.show_details = true;
    }
    this._config = cleanConfig;
  }
  render() {
    if (!this.hass || !this._config) return b``;
    const effectiveLocale = this._config.locale || this.hass.locale?.language || this.hass.language || "en";
    const t2 = getEditorTranslation(effectiveLocale);
    const weatherEntities = Object.keys(this.hass.states).filter((id) => id.startsWith("weather."));
    const currentLayout = this._config.card_layout || "square-scroll";
    return b`
      <div class="card-config">
        <!-- Weather Entity -->
        <div class="form-row">
          <label class="form-label">${t2.weather_entity}</label>
          <select
            class="form-input"
            .value=${this._config.entity || ""}
            @change=${(e2) => this._valueChanged("entity", e2.target.value)}
          >
            <option value="" disabled ?selected=${!this._config.entity}>${t2.select_weather_entity}</option>
            ${weatherEntities.map((id) => b`
              <option value="${id}" ?selected=${this._config?.entity === id}>
                ${this.hass.states[id]?.attributes?.friendly_name || id} (${id})
              </option>
            `)}
          </select>
        </div>

        <!-- Custom Location Name -->
        <div class="form-row">
          <label class="form-label">${t2.custom_location_name}</label>
          <input
            type="text"
            class="form-input"
            .placeholder=${locationService.getCachedLocation() || t2.location_placeholder}
            .value=${this._config.name && !["cupertino", "forecast home", "home", "ev"].includes(this._config.name.toLowerCase()) ? this._config.name : ""}
            @input=${(e2) => this._valueChanged("name", e2.target.value)}
          />
        </div>

        <!-- Additional Locations / Multi-Location -->
        <div class="form-row">
          <label class="section-title">${t2.additional_locations_title}</label>
          <div style="font-size: 12px; opacity: 0.7; margin-bottom: 6px;">
            ${t2.additional_locations_desc}
          </div>
          ${(this._config.locations || []).map((loc, idx) => {
      const entityId = typeof loc === "string" ? loc : loc.entity;
      const customName = typeof loc === "object" ? loc.name : "";
      const friendly = this.hass.states[entityId]?.attributes?.friendly_name || entityId;
      return b`
              <div class="location-item" style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; background: rgba(255,255,255,0.06); padding: 6px 10px; border-radius: 8px;">
                <span class="location-name" style="font-weight: 500;">${customName || friendly} <small style="opacity: 0.6;">(${entityId})</small></span>
                <button type="button" class="btn-remove" style="background: rgba(239,68,68,0.2); color: #ef4444; border: none; padding: 4px 8px; border-radius: 6px; cursor: pointer;" @click=${() => this._removeLocation(idx)}>${t2.remove}</button>
              </div>
            `;
    })}

          <select
            class="form-input"
            @change=${(e2) => {
      const target = e2.target;
      if (target.value) {
        this._addLocation(target.value);
        target.value = "";
      }
    }}
          >
            <option value="">${t2.add_location_placeholder}</option>
            ${weatherEntities.filter((id) => id !== this._config?.entity && !(this._config?.locations || []).some((l2) => (typeof l2 === "string" ? l2 : l2.entity) === id)).map((id) => b`
                <option value="${id}">${this.hass.states[id]?.attributes?.friendly_name || id} (${id})</option>
              `)}
          </select>

          ${weatherEntities.filter((id) => id !== this._config?.entity && !(this._config?.locations || []).some((l2) => (typeof l2 === "string" ? l2 : l2.entity) === id)).length === 0 ? b`
            <div style="font-size: 11px; opacity: 0.8; margin-top: 6px; line-height: 1.45; background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.2); padding: 8px 10px; border-radius: 8px;">
              ${t2.add_city_help}
            </div>
          ` : ""}
        </div>

        <!-- Card Layout Shape -->
        <div class="form-row">
          <label class="form-label">${t2.card_layout_shape}</label>
          <select
            class="form-input"
            .value=${currentLayout}
            @change=${(e2) => this._valueChanged("card_layout", e2.target.value)}
          >
            <option value="square-scroll" ?selected=${currentLayout === "square-scroll"}>${t2.layout_square_scroll}</option>
            <option value="square-fit" ?selected=${currentLayout === "square-fit"}>${t2.layout_square_fit}</option>
            <option value="default" ?selected=${currentLayout === "default"}>${t2.layout_default}</option>
            <option value="compact" ?selected=${currentLayout === "compact"}>${t2.layout_compact}</option>
            <option value="mini" ?selected=${currentLayout === "mini"}>${t2.layout_mini}</option>
          </select>
        </div>

        <!-- Language / Locale -->
        <div class="form-row">
          <label class="form-label">${t2.language}</label>
          <select
            class="form-input"
            .value=${this._config.locale || ""}
            @change=${(e2) => this._valueChanged("locale", e2.target.value)}
          >
            <option value="">${t2.language_auto}</option>
            <option value="tr">Türkçe</option>
            <option value="en">English</option>
            <option value="de">Deutsch</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>

        <!-- Default View -->
        <div class="form-row">
          <label class="form-label">${t2.default_view_mode}</label>
          <select
            class="form-input"
            .value=${this._config.default_view || "condition"}
            @change=${(e2) => this._valueChanged("default_view", e2.target.value)}
          >
            <option value="condition">${t2.view_condition}</option>
            <option value="precipitation">${t2.view_precipitation}</option>
            <option value="wind">${t2.view_wind}</option>
          </select>
        </div>

        <!-- Time Format -->
        <div class="form-row">
          <label class="form-label">${t2.time_format}</label>
          <select
            class="form-input"
            .value=${this._config.time_format || "auto"}
            @change=${(e2) => this._valueChanged("time_format", e2.target.value)}
          >
            <option value="auto">${t2.time_auto}</option>
            <option value="24">${t2.time_24}</option>
            <option value="12">${t2.time_12}</option>
          </select>
        </div>

        <!-- Temperature Sensor Override -->
        <div class="form-row">
          <label class="form-label">${t2.temp_sensor_override}</label>
          <input
            type="text"
            class="form-input"
            placeholder="sensor.outdoor_temperature"
            .value=${this._config.temp_sensor || ""}
            @input=${(e2) => this._valueChanged("temp_sensor", e2.target.value)}
          />
        </div>

        <!-- Highlights Message Override -->
        <div class="form-row">
          <label class="form-label">${t2.custom_highlights_text}</label>
          <input
            type="text"
            class="form-input"
            .placeholder=${t2.custom_highlights_placeholder}
            .value=${this._config.highlights_text || ""}
            @input=${(e2) => this._valueChanged("highlights_text", e2.target.value)}
          />
        </div>

        <!-- Custom Height & Scrollable Options -->
        <div class="form-row">
          <label class="form-label">${t2.custom_card_height}</label>
          <input
            type="text"
            class="form-input"
            placeholder="e.g. 400px"
            .value=${this._config.card_height || ""}
            @input=${(e2) => this._valueChanged("card_height", e2.target.value)}
          />
        </div>

        <!-- Toggles -->
        <div class="checkbox-row">
          <input
            type="checkbox"
            id="scrollable"
            ?checked=${this._config.scrollable !== false}
            @change=${(e2) => this._valueChanged("scrollable", e2.target.checked)}
          />
          <label for="scrollable" class="form-label">${t2.enable_scroll}</label>
        </div>

        <div class="checkbox-row">
          <input
            type="checkbox"
            id="show_highlights"
            ?checked=${this._config.show_highlights !== false}
            @change=${(e2) => this._valueChanged("show_highlights", e2.target.checked)}
          />
          <label for="show_highlights" class="form-label">${t2.show_highlights}</label>
        </div>

        <div class="checkbox-row">
          <input
            type="checkbox"
            id="show_details"
            ?checked=${this._config.show_details !== false}
            @change=${(e2) => this._valueChanged("show_details", e2.target.checked)}
          />
          <label for="show_details" class="form-label">${t2.show_details}</label>
        </div>

        <!-- Map / Radar URL or Path -->
        <div class="form-row">
          <label class="form-label">${t2.map_url}</label>
          <input
            type="text"
            class="form-input"
            .placeholder=${t2.map_url_placeholder}
            .value=${this._config.map_url || ""}
            @input=${(e2) => this._valueChanged("map_url", e2.target.value)}
          />
        </div>

        <div class="checkbox-row">
          <input
            type="checkbox"
            id="show_bottom_bar"
            ?checked=${this._config.show_bottom_bar !== false}
            @change=${(e2) => this._valueChanged("show_bottom_bar", e2.target.checked)}
          />
          <label for="show_bottom_bar" class="form-label">${t2.show_bottom_bar}</label>
        </div>

        <div class="checkbox-row">
          <input
            type="checkbox"
            id="animated_background"
            ?checked=${this._config.animated_background !== false}
            @change=${(e2) => this._valueChanged("animated_background", e2.target.checked)}
          />
          <label for="animated_background" class="form-label">${t2.animated_background}</label>
        </div>

        <div class="checkbox-row">
          <input
            type="checkbox"
            id="transparent_background"
            ?checked=${this._config.transparent_background === true}
            @change=${(e2) => this._valueChanged("transparent_background", e2.target.checked)}
          />
          <label for="transparent_background" class="form-label">${t2.transparent_background}</label>
        </div>
      </div>
    `;
  }
  _valueChanged(key, value) {
    if (!this._config) return;
    const newConfig = { ...this._config };
    const generic = ["cupertino", "forecast home", "home", "ev"];
    if (value === "" || value === void 0 || key === "name" && typeof value === "string" && generic.includes(value.trim().toLowerCase())) {
      delete newConfig[key];
    } else {
      newConfig[key] = value;
    }
    this._config = newConfig;
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: newConfig },
      bubbles: true,
      composed: true
    }));
  }
  _addLocation(entity) {
    if (!this._config) return;
    const locations = [...this._config.locations || []];
    const friendlyName = this.hass.states[entity]?.attributes?.friendly_name;
    locations.push(friendlyName ? { entity, name: friendlyName } : { entity });
    this._valueChanged("locations", locations);
  }
  _removeLocation(index) {
    if (!this._config || !this._config.locations) return;
    const locations = this._config.locations.filter((_2, i2) => i2 !== index);
    this._valueChanged("locations", locations);
  }
};
Ios27WeatherCardEditor.styles = i$3`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 12px 0;
      font-family: var(--paper-font-body1_-_font-family, sans-serif);
    }
    .form-row {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .form-label {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color, #212121);
    }
    .form-input, select {
      padding: 10px 12px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #ffffff);
      color: var(--primary-text-color, #212121);
      font-size: 14px;
      outline: none;
    }
    .form-input:focus, select:focus {
      border-color: var(--primary-color, #03a9f4);
    }
    .checkbox-row {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
    }
    .checkbox-row input {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
    .section-title {
      font-size: 14px;
      font-weight: 600;
      margin-top: 8px;
      padding-bottom: 4px;
      border-bottom: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
      color: var(--primary-text-color, #212121);
    }
    .location-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      border-radius: 8px;
      background: var(--secondary-background-color, rgba(125, 125, 125, 0.08));
      gap: 8px;
    }
    .location-name {
      font-size: 13px;
      font-weight: 500;
      flex: 1;
    }
    .btn-remove {
      background: none;
      border: none;
      color: #ff453a;
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      padding: 4px 8px;
      border-radius: 6px;
    }
    .btn-remove:hover {
      background: rgba(255, 69, 58, 0.1);
    }
  `;
__decorateClass$1([
  n$1({ attribute: false })
], Ios27WeatherCardEditor.prototype, "hass", 2);
__decorateClass$1([
  r()
], Ios27WeatherCardEditor.prototype, "_config", 2);
Ios27WeatherCardEditor = __decorateClass$1([
  t("weather-liquid-glass-card-editor")
], Ios27WeatherCardEditor);
try {
  if (!customElements.get("ios27-weather-card-editor")) {
    customElements.define("ios27-weather-card-editor", class extends Ios27WeatherCardEditor {
    });
  }
} catch (_2) {
}
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
window.customCards = window.customCards || [];
if (!window.customCards.some((card) => card.type === "weather-liquid-glass-card")) {
  window.customCards.push({
    type: "weather-liquid-glass-card",
    name: "Weather Card (Liquid Glass)",
    description: "Ultra-modern frosted Liquid Glass weather card with dynamic sky animations, hourly forecasts, and 10-day overview.",
    preview: true,
    documentationURL: "https://github.com/alte-dev/ha-weather-liquid-glass"
  });
}
console.info(
  "%c  LIQUID GLASS WEATHER CARD  \n%c Version: 1.0.0 · Apple iOS Design ",
  "color: #38bdf8; font-weight: bold; background: #0f172a; padding: 4px 8px; border-radius: 4px 4px 0 0;",
  "color: #ffffff; font-weight: normal; background: #1e293b; padding: 4px 8px; border-radius: 0 0 4px 4px;"
);
let Ios27WeatherCard = class extends i {
  constructor() {
    super(...arguments);
    this._activeMode = "condition";
    this._hourlyForecasts = [];
    this._dailyForecasts = [];
    this._autoLocationName = "";
    this._currentLocationIndex = 0;
    this._showLocationDrawer = false;
    this._selectedNewEntityToAdd = "";
    this._touchStartX = 0;
    this._touchStartY = 0;
    this._touchStartTime = 0;
  }
  static async getConfigElement() {
    return document.createElement("weather-liquid-glass-card-editor");
  }
  static getStubConfig(hass) {
    const weatherEntity = hass?.states ? Object.keys(hass.states).find((id) => id.startsWith("weather.")) : void 0;
    return {
      type: "custom:weather-liquid-glass-card",
      entity: weatherEntity || "weather.forecast_home",
      card_layout: "square-scroll",
      scrollable: true,
      show_details: true,
      default_view: "condition",
      show_highlights: true,
      show_bottom_bar: true,
      animated_background: true
    };
  }
  setConfig(config) {
    if (!config.entity) {
      throw new Error("Please specify a weather entity in the card configuration.");
    }
    const cleanConfig = { ...config };
    if (cleanConfig.name && cleanConfig.name.trim().toLowerCase() === "cupertino") {
      delete cleanConfig.name;
    }
    this._config = {
      card_layout: "square-scroll",
      scrollable: true,
      show_details: true,
      default_view: "condition",
      show_highlights: true,
      show_bottom_bar: true,
      animated_background: true,
      time_format: "auto",
      ...cleanConfig
    };
    if (this._config.default_view) {
      this._activeMode = this._config.default_view;
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this._setupSubscription();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._unsubscribeForecast) {
      this._unsubscribeForecast();
      this._unsubscribeForecast = void 0;
    }
  }
  updated(changedProps) {
    super.updated(changedProps);
    if (changedProps.has("hass") || changedProps.has("_config")) {
      this._setupSubscription();
      this._resolveLocation();
    }
  }
  _getLocations() {
    const list = [];
    if (this._config?.entity) {
      list.push({
        entity: this._config.entity,
        name: this._config.name,
        temp_sensor: this._config.temp_sensor
      });
    }
    const extras = this._config?.locations || this._config?.entities || [];
    for (const item of extras) {
      const loc = typeof item === "string" ? { entity: item } : item;
      if (loc && loc.entity && !list.some((l2) => l2.entity === loc.entity)) {
        list.push(loc);
      }
    }
    return list;
  }
  _switchLocation(newIndex) {
    const locations = this._getLocations();
    if (newIndex < 0 || newIndex >= locations.length) return;
    if (this._currentLocationIndex === newIndex) return;
    this._currentLocationIndex = newIndex;
    this._hourlyForecasts = [];
    this._dailyForecasts = [];
    if (this._unsubscribeForecast) {
      this._unsubscribeForecast();
      this._unsubscribeForecast = void 0;
    }
    this._setupSubscription();
    this.requestUpdate();
  }
  async _resolveLocation() {
    if (!this.hass) return;
    const locale = this._config?.locale || this.hass.locale?.language || this.hass.language || "tr";
    const loc = await locationService.resolveLocationName(this.hass, locale);
    if (loc && loc !== this._autoLocationName) {
      this._autoLocationName = loc;
      this.requestUpdate();
    }
  }
  _setupSubscription() {
    if (!this.hass) return;
    const locations = this._getLocations();
    const activeLoc = locations[this._currentLocationIndex] || locations[0];
    if (!activeLoc?.entity) return;
    if (this._unsubscribeForecast) {
      this._unsubscribeForecast();
      this._unsubscribeForecast = void 0;
    }
    forecastService.subscribeForecasts(
      this.hass,
      activeLoc.entity,
      (hourly) => {
        this._hourlyForecasts = hourly;
        this.requestUpdate();
      },
      (daily) => {
        this._dailyForecasts = daily;
        this.requestUpdate();
      }
    ).then((unsub) => {
      this._unsubscribeForecast = unsub;
    });
  }
  // Touch swipe handling to switch locations left/right
  _handleTouchStart(e2) {
    if (e2.touches.length !== 1) return;
    const target = e2.target;
    if (target.closest(".ios-hourly-strip") || target.closest(".ios-bottom-btn") || target.closest(".ios-location-drawer") || target.closest(".ios-add-city-section")) {
      return;
    }
    this._touchStartX = e2.touches[0].clientX;
    this._touchStartY = e2.touches[0].clientY;
    this._touchStartTime = Date.now();
  }
  _handleTouchEnd(e2) {
    if (!this._touchStartX) return;
    const deltaX = e2.changedTouches[0].clientX - this._touchStartX;
    const deltaY = e2.changedTouches[0].clientY - this._touchStartY;
    const elapsed = Date.now() - this._touchStartTime;
    this._touchStartX = 0;
    if (elapsed < 600 && Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.35) {
      const locations = this._getLocations();
      if (locations.length <= 1) return;
      if (deltaX < 0) {
        if (this._currentLocationIndex < locations.length - 1) {
          this._switchLocation(this._currentLocationIndex + 1);
        }
      } else {
        if (this._currentLocationIndex > 0) {
          this._switchLocation(this._currentLocationIndex - 1);
        }
      }
    }
  }
  render() {
    if (!this.hass || !this._config) {
      return b``;
    }
    const locations = this._getLocations();
    const activeIndex = Math.min(this._currentLocationIndex, Math.max(0, locations.length - 1));
    const activeLoc = locations[activeIndex] || locations[0];
    const activeEntityId = activeLoc?.entity || this._config.entity;
    const entityState = this.hass.states[activeEntityId];
    if (!entityState) {
      return b`
        <ha-card style="padding: 16px; color: #ef4444; background: rgba(0,0,0,0.4); border-radius: 20px;">
          Entity not found: <strong>${activeEntityId}</strong>
        </ha-card>
      `;
    }
    const isNight = hassService.isNight(this.hass, this._config.sun_entity);
    const condition = entityState.state || "sunny";
    const genericNames = [
      "forecast home",
      "weather",
      "home",
      "ev",
      "cupertino",
      "default",
      "hava durumu",
      "weather forecast",
      "forecast"
    ];
    let friendlyName = activeLoc?.name?.trim();
    if (!friendlyName || genericNames.includes(friendlyName.toLowerCase())) {
      if (activeIndex === 0 && this._autoLocationName) {
        friendlyName = this._autoLocationName;
      } else {
        const cached = activeIndex === 0 ? locationService.getCachedLocation() : null;
        if (cached) {
          friendlyName = cached;
        } else {
          const entityName = entityState.attributes?.friendly_name?.trim();
          if (entityName && !genericNames.includes(entityName.toLowerCase())) {
            friendlyName = entityName;
          } else {
            const haLocation = this.hass.config?.location_name?.trim();
            if (haLocation && !genericNames.includes(haLocation.toLowerCase())) {
              friendlyName = haLocation;
            } else {
              friendlyName = activeIndex === 0 ? "Kırklareli" : activeEntityId.replace("weather.", "");
            }
          }
        }
      }
    }
    let currentTemp = entityState.attributes?.temperature ?? null;
    const activeTempSensor = activeLoc?.temp_sensor || (activeIndex === 0 ? this._config.temp_sensor : void 0);
    if (activeTempSensor && this.hass.states[activeTempSensor]) {
      const sensorVal = parseFloat(this.hass.states[activeTempSensor].state);
      if (!isNaN(sensorVal)) {
        currentTemp = sensorVal;
      }
    }
    const highTemp = this._dailyForecasts[0]?.temperature ?? entityState.attributes?.temperature ?? null;
    const lowTemp = this._dailyForecasts[0]?.templow ?? (currentTemp !== null ? currentTemp - 5 : null);
    const windUnit = this._config.wind_unit || hassService.getWindSpeedUnit(this.hass, entityState);
    const precipUnit = this._config.precip_unit || hassService.getPrecipitationUnit(this.hass, entityState);
    const locale = this._config.locale || this.hass.locale?.language || this.hass.language || "tr";
    const { conditionNote, highlightsTitle, highlightsText } = generateWeatherSummary(
      this._hourlyForecasts,
      this._dailyForecasts,
      condition,
      currentTemp,
      locale,
      windUnit
    );
    const dynamicBg = this._config.transparent_background ? "transparent" : getWeatherBackground(condition, isNight);
    const rawLayout = this._config.card_layout || "square-scroll";
    const layout = rawLayout === "square" ? "square-scroll" : rawLayout;
    const isScrollable = layout === "square-scroll" || this._config.scrollable !== false || Boolean(this._config.card_height);
    const heightStyle = this._config.card_height ? `height: ${this._config.card_height}; max-height: ${this._config.card_height};` : "";
    const sunTimes = hassService.getSunTimes(this.hass, this._config.sun_entity);
    return b`
      <div
        class="ios27-container layout-${layout} ${this._config.transparent_background ? "transparent-bg" : ""} ${isScrollable ? "is-scrollable" : ""}"
        style="background: ${dynamicBg}; ${heightStyle}; position: relative;"
        @touchstart=${this._handleTouchStart}
        @touchend=${this._handleTouchEnd}
      >
        <!-- Atmospheric Animated Sky Background (Clouds, Sun Glow, Moon, Stars, Rain) -->
        ${this._config.animated_background !== false && !this._config.transparent_background ? b`
          <ios27-sky-animation
            .condition=${condition}
            .isNight=${isNight}
          ></ios27-sky-animation>
        ` : ""}

        ${layout === "square-fit" ? this._renderSquareFit(friendlyName, currentTemp, condition, highTemp, lowTemp, isNight, locale, windUnit) : layout === "mini" ? this._renderMini(friendlyName, currentTemp, condition, highTemp, lowTemp, isNight, locale) : b`
            <div class="ios27-scroll-wrapper">
              <!-- Centered / Compact iOS Header -->
              <ios27-header
                .locationName=${friendlyName}
                .currentTemp=${currentTemp}
                .condition=${condition}
                .highTemp=${highTemp}
                .lowTemp=${lowTemp}
                .conditionNote=${conditionNote}
                .locale=${locale}
              ></ios27-header>

              <!-- Highlights Card (Optional) -->
              ${layout !== "compact" && this._config.show_highlights !== false ? b`
                <ios27-highlights
                  .title=${highlightsTitle}
                  .message=${this._config.highlights_text || highlightsText}
                ></ios27-highlights>
              ` : ""}

              <!-- Main Forecast Glass Card with 3-Way Segmented Switcher -->
              <ios27-forecast-card
                .activeMode=${this._activeMode}
                .hourlyForecasts=${this._hourlyForecasts}
                .dailyForecasts=${this._dailyForecasts}
                .hourlyCount=${this._config.hourly_count || 24}
                .currentTemp=${currentTemp}
                .currentCondition=${condition}
                .isNight=${isNight}
                .sunTimes=${sunTimes}
                .windUnit=${windUnit}
                .precipUnit=${precipUnit}
                .timeFormat=${this._config.time_format || "auto"}
                .locale=${locale}
                @mode-changed=${(e2) => {
      this._activeMode = e2.detail.mode;
    }}
              ></ios27-forecast-card>

              <!-- Apple Weather Detail Tiles Grid (Scroll down to view) -->
              ${this._config.show_details !== false ? b`
                <ios27-detail-tiles
                  .hass=${this.hass}
                  .entityState=${entityState}
                  .currentTemp=${currentTemp}
                  .dailyForecast=${this._dailyForecasts[0]}
                  .hourlyForecasts=${this._hourlyForecasts}
                  .sunTimes=${sunTimes}
                  .windUnit=${windUnit}
                  .precipUnit=${precipUnit}
                  .locale=${locale}
                  .timeFormat=${this._config.time_format || "auto"}
                  .config=${this._config}
                ></ios27-detail-tiles>
              ` : ""}

              <!-- iOS Bottom Bar (Multi-location pager dots & list button - only shown when > 1 locations exist) -->
              ${layout !== "compact" && this._config.show_bottom_bar !== false && locations.length > 1 ? b`
                <ios27-bottom-bar
                  .totalLocations=${locations.length}
                  .activeIndex=${activeIndex}
                  @location-select=${(e2) => this._switchLocation(e2.detail.index)}
                  @map-click=${this._handleMapClick}
                  @list-click=${() => {
      this._showLocationDrawer = true;
    }}
                ></ios27-bottom-bar>
              ` : ""}
            </div>
          `}

        <!-- Apple Weather Location Drawer / Modal -->
        ${this._showLocationDrawer ? this._renderLocationDrawer(locations, activeIndex) : ""}
      </div>
    `;
  }
  _renderLocationDrawer(locations, activeIndex) {
    const allWeatherEntities = Object.keys(this.hass.states).filter((id) => id.startsWith("weather.") && !locations.some((l2) => l2.entity === id));
    return b`
      <div class="ios-location-drawer" @click=${(e2) => e2.stopPropagation()}>
        <div class="ios-drawer-header">
          <div class="ios-drawer-title">Hava Durumu · Şehirler</div>
          <button class="ios-drawer-close-btn" @click=${() => {
      this._showLocationDrawer = false;
    }}>
            Bitti
          </button>
        </div>

        <div class="ios-city-list">
          ${locations.map((loc, idx) => {
      const st = this.hass.states[loc.entity];
      const cond = st?.state || "sunny";
      const temp = st?.attributes?.temperature ?? "--";
      const name = loc.name || st?.attributes?.friendly_name || (idx === 0 ? "Ana Konum" : loc.entity.replace("weather.", ""));
      const isCurrent = idx === activeIndex;
      return b`
              <div
                class="ios-city-card ${isCurrent ? "active" : ""}"
                @click=${() => {
        this._switchLocation(idx);
        this._showLocationDrawer = false;
      }}
              >
                <div class="ios-city-left">
                  <div class="ios-city-name">
                    ${idx === 0 ? b`
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#38bdf8" style="vertical-align: middle;">
                        <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                      </svg>
                    ` : ""}
                    <span>${name}</span>
                  </div>
                  <div class="ios-city-condition">
                    ${hassService.getFriendlyCondition(cond, this._config?.locale || "tr")}
                  </div>
                </div>

                <div class="ios-city-right">
                  <ios27-weather-icon .condition=${cond} .isNight=${false} size="30"></ios27-weather-icon>
                  <span class="ios-city-temp">${temp !== "--" ? Math.round(Number(temp)) + "°" : "--"}</span>
                  ${idx > 0 ? b`
                    <button
                      class="ios-city-delete-btn"
                      title="Bu konumu kaldır"
                      @click=${(e2) => {
        e2.stopPropagation();
        this._removeLocation(idx);
      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                      </svg>
                    </button>
                  ` : ""}
                </div>
              </div>
            `;
    })}
        </div>

        <!-- Add new location dropdown -->
        ${allWeatherEntities.length > 0 ? b`
          <div class="ios-add-city-section">
            <select
              class="ios-add-city-select"
              .value=${this._selectedNewEntityToAdd}
              @change=${(e2) => {
      this._selectedNewEntityToAdd = e2.target.value;
    }}
            >
              <option value="">+ Başka bir şehir / hava durumu seçin...</option>
              ${allWeatherEntities.map((id) => b`
                <option value="${id}">
                  ${this.hass.states[id]?.attributes?.friendly_name || id}
                </option>
              `)}
            </select>
            <button
              class="ios-add-city-btn"
              @click=${this._handleAddSelectedCity}
            >
              Ekle
            </button>
          </div>
        ` : ""}
      </div>
    `;
  }
  _handleAddSelectedCity() {
    if (!this._selectedNewEntityToAdd) return;
    const newEntity = this._selectedNewEntityToAdd;
    this._selectedNewEntityToAdd = "";
    const currentLocations = this._getLocations();
    const newName = this.hass.states[newEntity]?.attributes?.friendly_name || newEntity.replace("weather.", "");
    const updated = [
      ...currentLocations.slice(1),
      { entity: newEntity, name: newName }
    ];
    const newConfig = {
      ...this._config,
      locations: updated
    };
    this.setConfig(newConfig);
    this.dispatchEvent(new CustomEvent("config-changed", {
      bubbles: true,
      composed: true,
      detail: { config: newConfig }
    }));
    this._switchLocation(currentLocations.length);
  }
  _removeLocation(indexToRemove) {
    const currentLocations = this._getLocations();
    if (indexToRemove <= 0 || indexToRemove >= currentLocations.length) return;
    const updated = currentLocations.slice(1).filter((_2, i2) => i2 + 1 !== indexToRemove);
    const newConfig = {
      ...this._config,
      locations: updated
    };
    this.setConfig(newConfig);
    this.dispatchEvent(new CustomEvent("config-changed", {
      bubbles: true,
      composed: true,
      detail: { config: newConfig }
    }));
    if (this._currentLocationIndex >= indexToRemove) {
      this._switchLocation(Math.max(0, this._currentLocationIndex - 1));
    }
  }
  _renderSquareFit(friendlyName, currentTemp, condition, highTemp, lowTemp, isNight, locale, windUnit) {
    const t2 = translationService.get(locale);
    const formattedCurrent = hassService.formatTemperature(currentTemp);
    const formattedHigh = hassService.formatTemperature(highTemp);
    const formattedLow = hassService.formatTemperature(lowTemp);
    let highLowText = "";
    if (highTemp !== null && lowTemp !== null) {
      highLowText = t2.format_high_low(formattedHigh, formattedLow);
    } else if (highTemp !== null) {
      highLowText = `H:${formattedHigh}`;
    }
    const hourlyItems = this._hourlyForecasts.slice(0, 5);
    return b`
      <!-- Header Row: Location & High/Low -->
      <div class="ios-square-fit-header">
        <div class="ios-square-fit-loc-group">
          <span class="ios-square-fit-loc">${friendlyName}</span>
          <svg class="ios-nav-arrow" viewBox="0 0 24 24" style="width: 13px; height: 13px; opacity: 0.85; fill: currentColor;">
            <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
          </svg>
        </div>
        ${highLowText ? b`<div class="ios-square-fit-highlow">${highLowText}</div>` : ""}
      </div>

      <!-- Current Temperature & Weather Icon -->
      <div class="ios-square-fit-main">
        <div class="ios-square-fit-temp">${formattedCurrent}</div>
        <ios27-weather-icon .condition=${condition} .isNight=${isNight} size="46"></ios27-weather-icon>
      </div>

      <!-- Mini Hourly Row (5 columns) -->
      ${hourlyItems.length > 0 ? b`
        <div class="ios-square-fit-forecast-box">
          <div class="ios-square-fit-hourly-row">
            ${hourlyItems.map((item) => {
      const dt = DateTime.fromISO(item.datetime);
      const hourLabel = dt.isValid ? dt.toFormat("H") : "--";
      const temp = hassService.formatTemperature(item.temperature);
      return b`
                <div class="ios-square-fit-hour-col">
                  <span class="ios-square-fit-time">${hourLabel}</span>
                  <ios27-weather-icon .condition=${item.condition || condition} .isNight=${isNight} size="18"></ios27-weather-icon>
                  <span class="ios-square-fit-hour-temp">${temp}</span>
                </div>
              `;
    })}
          </div>
        </div>
      ` : ""}
    `;
  }
  _renderMini(friendlyName, currentTemp, condition, highTemp, lowTemp, isNight, locale) {
    const t2 = translationService.get(locale);
    const formattedCurrent = hassService.formatTemperature(currentTemp);
    const formattedHigh = hassService.formatTemperature(highTemp);
    const formattedLow = hassService.formatTemperature(lowTemp);
    const friendlyCondition = hassService.getFriendlyCondition(condition, locale);
    let highLowText = "";
    if (highTemp !== null && lowTemp !== null) {
      highLowText = t2.format_high_low(formattedHigh, formattedLow);
    }
    return b`
      <div class="ios-mini-container">
        <div class="ios-mini-left">
          <div class="ios-mini-location">
            <span>${friendlyName}</span>
            <svg class="ios-nav-arrow" viewBox="0 0 24 24" style="width: 12px; height: 12px; opacity: 0.8; fill: currentColor;">
              <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
            </svg>
          </div>
          <div class="ios-mini-condition">${friendlyCondition}</div>
          <div class="ios-mini-highlow">
            ${highLowText ? b`
              <span class="ios-highlow">${highLowText}</span>
            ` : ""}
          </div>
        </div>

        <div class="ios-mini-right">
          <div class="ios-mini-temp">${formattedCurrent}</div>
          <ios27-weather-icon .condition=${condition} .isNight=${isNight} size="42"></ios27-weather-icon>
        </div>
      </div>
    `;
  }
  _handleMapClick(e2) {
    e2.stopPropagation();
    if (this._config?.map_url) {
      const url = this._config.map_url;
      if (url.startsWith("http://") || url.startsWith("https://")) {
        window.open(url, "_blank");
        return;
      }
      if (url.startsWith("/")) {
        window.history.pushState(null, "", url);
        window.dispatchEvent(new CustomEvent("location-changed", { bubbles: true }));
        return;
      }
    }
    this._fireHassMoreInfo();
  }
  _fireHassMoreInfo() {
    const locations = this._getLocations();
    const activeLoc = locations[this._currentLocationIndex] || locations[0];
    const entityId = activeLoc?.entity || this._config?.entity;
    if (!entityId) return;
    const event = new CustomEvent("hass-more-info", {
      bubbles: true,
      composed: true,
      detail: { entityId }
    });
    this.dispatchEvent(event);
  }
  getCardSize() {
    return 7;
  }
};
Ios27WeatherCard.styles = cardStyles;
__decorateClass([
  n$1({ attribute: false })
], Ios27WeatherCard.prototype, "hass", 2);
__decorateClass([
  r()
], Ios27WeatherCard.prototype, "_config", 2);
__decorateClass([
  r()
], Ios27WeatherCard.prototype, "_activeMode", 2);
__decorateClass([
  r()
], Ios27WeatherCard.prototype, "_hourlyForecasts", 2);
__decorateClass([
  r()
], Ios27WeatherCard.prototype, "_dailyForecasts", 2);
__decorateClass([
  r()
], Ios27WeatherCard.prototype, "_unsubscribeForecast", 2);
__decorateClass([
  r()
], Ios27WeatherCard.prototype, "_autoLocationName", 2);
__decorateClass([
  r()
], Ios27WeatherCard.prototype, "_currentLocationIndex", 2);
__decorateClass([
  r()
], Ios27WeatherCard.prototype, "_showLocationDrawer", 2);
__decorateClass([
  r()
], Ios27WeatherCard.prototype, "_selectedNewEntityToAdd", 2);
Ios27WeatherCard = __decorateClass([
  t("weather-liquid-glass-card")
], Ios27WeatherCard);
try {
  if (!customElements.get("ios27-weather-card")) {
    customElements.define("ios27-weather-card", class extends Ios27WeatherCard {
    });
  }
  if (!customElements.get("ha-weather-liquid-glass")) {
    customElements.define("ha-weather-liquid-glass", class extends Ios27WeatherCard {
    });
  }
} catch (_2) {
}
window.dispatchEvent(new CustomEvent("ll-rebuild", { composed: true, bubbles: true }));
setTimeout(() => {
  window.dispatchEvent(new CustomEvent("ll-rebuild", { composed: true, bubbles: true }));
}, 200);
export {
  Ios27WeatherCard
};
