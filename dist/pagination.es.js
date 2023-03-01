import { defineComponent as p, openBlock as n, createElementBlock as l, createElementVNode as o, normalizeClass as h, withModifiers as g, Fragment as P, renderList as b, renderSlot as w, createCommentVNode as c } from "vue";
const x = p({
  props: {
    dropShadow: {
      type: [Boolean, String],
      default: void 0
    },
    dropShadowableClassPrefix: {
      type: String,
      default: "drop-shadow"
    },
    shadow: {
      type: [Boolean, String],
      default: void 0
    },
    shadowableClassPrefix: {
      type: String,
      default: "shadow"
    }
  },
  computed: {
    shadowableClass() {
      const e = this.dropShadow === !0 ? "" : this.dropShadow && `-${this.dropShadow}`, t = this.shadow === !0 ? "" : this.shadow && `-${this.shadow}`;
      return {
        [`${this.dropShadowableClassPrefix}${e}`]: !!this.dropShadow,
        [`${this.shadowableClassPrefix}${t}`]: !!this.shadow
      };
    }
  }
}), _ = p({
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
      return this.size === void 0 ? !1 : !!this.size.match(
        new RegExp(`^${this.sizeableClassPrefix}`)
      );
    },
    sizeableClass() {
      return this.size ? !this.sizeableClassPrefix || this.hasSizeablePrefix ? this.size : `${this.sizeableClassPrefix}-${this.size}` : "";
    }
  }
}), C = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [d, i] of t)
    a[d] = i;
  return a;
}, S = {
  name: "Pagination",
  mixins: [
    x,
    _
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
    },
    componentPrefix: {
      type: String,
      default: "pagination"
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
      return Object.assign({
        [this.sizeableClass]: !!this.sizeableClass,
        [`justify-content-${this.align}`]: !!this.align
      }, this.shadowableClass);
    }
  },
  methods: {
    next(e) {
      this.paginate(this.currentPage >= this.totalPages ? this.currentPage : this.currentPage + 1, e);
    },
    prev(e) {
      this.paginate(this.currentPage <= 1 ? this.currentPage : this.currentPage - 1, e);
    },
    paginate(e, t) {
      t.currentTarget.parentNode.classList.contains("disabled") || (this.currentPage = e, this.$emit("paginate", e, t));
    },
    generate() {
      const e = [], t = this.showPages % 2 ? this.showPages + 1 : this.showPages;
      let a = this.currentPage >= t ? this.currentPage - t / 2 : 1;
      const d = t + a, i = this.totalPages < d ? this.totalPages : d, r = a - i + t;
      a -= a - r > 0 ? r : 0, a > 1 && e.push({ page: 1 }), a > 2 && e.push({ divider: !0 });
      for (let s = a; s < i; s++)
        e.push({ page: s });
      return i <= this.totalPages && (this.totalPages - 1 > i && e.push({ divider: !0 }), e.push({ page: this.totalPages < 1 / 0 ? this.totalPages : "&#8734;", disabled: this.totalPages === 1 / 0 })), e;
    }
  }
}, y = /* @__PURE__ */ o("span", { "aria-hidden": "true" }, " \xAB ", -1), z = [
  y
], v = ["data-page"], k = {
  key: 0,
  class: "page-link"
}, m = ["disabled", "data-label", "onClick"], N = ["innerHTML"], L = ["innerHTML"], B = /* @__PURE__ */ o("span", { "aria-hidden": "true" }, " \xBB ", -1), M = [
  B
];
function T(e, t, a, d, i, r) {
  return n(), l("nav", null, [
    o("ul", {
      class: h(["pagination", r.classes])
    }, [
      o("li", {
        class: h(["page-item", { disabled: a.disabled || i.currentPage === 1 }])
      }, [
        o("a", {
          href: "#",
          class: "page-link",
          "aria-label": "Previous",
          onClick: t[0] || (t[0] = g((s) => r.prev(s), ["prevent"]))
        }, z)
      ], 2),
      (n(!0), l(P, null, b(r.pages, (s, u) => (n(), l("li", {
        key: u,
        "data-page": s.page,
        class: h(["page-item", { active: s.page === i.currentPage, disabled: a.disabled || !!s.divider || !!s.disabled }])
      }, [
        w(e.$slots, "default", { item: s }, () => [
          s.divider ? (n(), l("a", k, " \u2026 ")) : (n(), l("a", {
            key: 1,
            href: "#",
            class: h(["page-link", s.class]),
            disabled: a.disabled,
            "data-label": s.label,
            onClick: g((f) => r.paginate(s.page, f), ["prevent"])
          }, [
            s.label ? (n(), l("span", {
              key: 0,
              "aria-hidden": "true",
              innerHTML: s.label
            }, null, 8, N)) : c("", !0),
            s.page ? (n(), l("span", {
              key: 1,
              "aria-hidden": "true",
              innerHTML: s.page
            }, null, 8, L)) : c("", !0)
          ], 10, m))
        ])
      ], 10, v))), 128)),
      o("li", {
        class: h(["page-item", { disabled: a.disabled || i.currentPage >= a.totalPages }])
      }, [
        o("a", {
          href: "#",
          class: "page-link",
          "aria-label": "Next",
          onClick: t[1] || (t[1] = g((s) => r.next(s), ["prevent"]))
        }, M)
      ], 2)
    ], 2)
  ]);
}
const O = /* @__PURE__ */ C(S, [["render", T]]);
export {
  O as Pagination
};
