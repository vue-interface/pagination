import { openBlock as n, createElementBlock as l, createElementVNode as o, normalizeClass as h, withModifiers as g, Fragment as f, renderList as P, createTextVNode as b, toDisplayString as w, renderSlot as _, createCommentVNode as c } from "vue";
var x = {
  props: {
    dropShadow: [Boolean, String],
    dropShadowableClassPrefix: {
      type: String,
      default: "drop-shadow"
    },
    shadow: [Boolean, String],
    shadowableClassPrefix: {
      type: String,
      default: "shadow"
    }
  },
  computed: {
    shadowableClass() {
      const e = this.dropShadow === !0 ? "" : this.dropShadow && `-${this.dropShadow}`, a = this.shadow === !0 ? "" : this.shadow && `-${this.shadow}`;
      return {
        [`${this.dropShadowableClassPrefix}${e}`]: !!this.dropShadow,
        [`${this.shadowableClassPrefix}${a}`]: !!this.shadow
      };
    }
  }
};
const C = {
  props: {
    componentPrefix: String,
    size: String,
    sizePrefix: String
  },
  computed: {
    sizeableClassPrefix() {
      return this.sizePrefix || this.componentPrefix;
    },
    hasSizeablePrefix() {
      return this.size && !!this.size.match(
        new RegExp(`^${this.sizeableClassPrefix}`)
      );
    },
    sizeableClass() {
      return this.size ? !this.sizeableClassPrefix || this.hasSizeablePrefix ? this.size : `${this.sizeableClassPrefix}-${this.size}` : "";
    }
  }
}, S = (e, a) => {
  const t = e.__vccOpts || e;
  for (const [d, i] of a)
    t[d] = i;
  return t;
}, z = {
  name: "Pagination",
  mixins: [
    x,
    C
  ],
  props: {
    align: {
      type: String,
      validate: (e) => ["start", "end", "center"].indexOf(e) !== -1
    },
    disabled: Boolean,
    page: {
      type: Number,
      default: 1
    },
    showPages: {
      type: Number,
      default: 6
    },
    totalPages: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      currentPage: this.page
    };
  },
  computed: {
    pages() {
      return this.generate();
    },
    classes() {
      return {
        [this.shadowableClass]: !!this.shadow,
        [this.sizeableClass]: !!this.sizeableClass,
        ["justify-content-" + this.align]: !!this.align
      };
    }
  },
  methods: {
    next(e) {
      this.paginate(this.currentPage >= this.totalPages ? this.currentPage : this.currentPage + 1, e);
    },
    prev(e) {
      this.paginate(this.currentPage <= 1 ? this.currentPage : this.currentPage - 1, e);
    },
    paginate(e, a) {
      a.currentTarget.parentNode.classList.contains("disabled") || (this.currentPage = e, this.$emit("paginate", e, a));
    },
    generate() {
      const e = [], a = this.showPages % 2 ? this.showPages + 1 : this.showPages;
      let t = this.currentPage >= a ? this.currentPage - a / 2 : 1;
      const d = a + t, i = this.totalPages < d ? this.totalPages : d, r = t - i + a;
      t -= t - r > 0 ? r : 0, t > 1 && e.push({ page: 1 }), t > 2 && e.push({ divider: !0 });
      for (let s = t; s < i; s++)
        e.push({ page: s });
      return i <= this.totalPages && (this.totalPages - 1 > i && e.push({ divider: !0 }), e.push({ page: this.totalPages < 1 / 0 ? this.totalPages : "&#8734;", disabled: this.totalPages === 1 / 0 })), e;
    }
  }
}, k = /* @__PURE__ */ o("span", { "aria-hidden": "true" }, " \xAB ", -1), m = [
  k
], y = ["data-page"], v = {
  key: 0,
  class: "page-link"
}, N = ["disabled", "data-label", "onClick"], L = ["innerHTML"], T = ["innerHTML"], B = /* @__PURE__ */ o("span", { "aria-hidden": "true" }, " \xBB ", -1), M = [
  B
];
function H(e, a, t, d, i, r) {
  return n(), l("nav", null, [
    o("ul", {
      class: h(["pagination", r.classes])
    }, [
      o("li", {
        class: h(["page-item", { disabled: t.disabled || i.currentPage === 1 }])
      }, [
        o("a", {
          href: "#",
          class: "page-link",
          "aria-label": "Previous",
          onClick: a[0] || (a[0] = g((s) => r.prev(s), ["prevent"]))
        }, m)
      ], 2),
      (n(!0), l(f, null, P(r.pages, (s, u) => (n(), l("li", {
        key: u,
        "data-page": s.page,
        class: h(["page-item", { active: s.page === i.currentPage, disabled: t.disabled || !!s.divider || !!s.disabled }])
      }, [
        b(w(s) + " ", 1),
        _(e.$slots, "default", { item: s }, () => [
          s.divider ? (n(), l("a", v, " \u2026 ")) : (n(), l("a", {
            key: 1,
            href: "#",
            class: h(["page-link", s.class]),
            disabled: t.disabled,
            "data-label": s.label,
            onClick: g((p) => r.paginate(s.page, p), ["prevent"])
          }, [
            s.label ? (n(), l("span", {
              key: 0,
              "aria-hidden": "true",
              innerHTML: s.label
            }, null, 8, L)) : c("", !0),
            s.page ? (n(), l("span", {
              key: 1,
              "aria-hidden": "true",
              innerHTML: s.page
            }, null, 8, T)) : c("", !0)
          ], 10, N))
        ])
      ], 10, y))), 128)),
      o("li", {
        class: h(["page-item", { disabled: t.disabled || i.currentPage >= t.totalPages }])
      }, [
        o("a", {
          href: "#",
          class: "page-link",
          "aria-label": "Next",
          onClick: a[1] || (a[1] = g((s) => r.next(s), ["prevent"]))
        }, M)
      ], 2)
    ], 2)
  ]);
}
const O = /* @__PURE__ */ S(z, [["render", H]]);
export {
  O as Pagination
};
