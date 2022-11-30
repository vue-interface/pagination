import { defineComponent as c, openBlock as n, createElementBlock as l, createElementVNode as o, normalizeClass as h, withModifiers as g, Fragment as P, renderList as b, renderSlot as w, createCommentVNode as p } from "vue";
const x = c({
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
      const e = this.dropShadow === !0 ? "" : this.dropShadow && `-${this.dropShadow}`, a = this.shadow === !0 ? "" : this.shadow && `-${this.shadow}`;
      return {
        [`${this.dropShadowableClassPrefix}${e}`]: !!this.dropShadow,
        [`${this.shadowableClassPrefix}${a}`]: !!this.shadow
      };
    }
  }
}), _ = c({
  props: {
    componentPrefix: {
      type: String,
      default: void 0
    },
    size: {
      type: String,
      default: void 0
    },
    sizePrefix: {
      type: String,
      default: void 0
    }
  },
  computed: {
    sizeableClassPrefix() {
      return this.sizePrefix || this.componentPrefix;
    },
    hasSizeablePrefix() {
      return this.size === void 0 ? !1 : !!this.size.match(new RegExp(`^${this.sizeableClassPrefix}`));
    },
    sizeableClass() {
      return this.size ? !this.sizeableClassPrefix || this.hasSizeablePrefix ? this.size : `${this.sizeableClassPrefix}-${this.size}` : "";
    }
  }
}), y = (e, a) => {
  const s = e.__vccOpts || e;
  for (const [d, i] of a)
    s[d] = i;
  return s;
}, v = {
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
    paginate(e, a) {
      a.currentTarget.parentNode.classList.contains("disabled") || (this.currentPage = e, this.$emit("paginate", e, a));
    },
    generate() {
      const e = [], a = this.showPages % 2 ? this.showPages + 1 : this.showPages;
      let s = this.currentPage >= a ? this.currentPage - a / 2 : 1;
      const d = a + s, i = this.totalPages < d ? this.totalPages : d, r = s - i + a;
      s -= s - r > 0 ? r : 0, s > 1 && e.push({ page: 1 }), s > 2 && e.push({ divider: !0 });
      for (let t = s; t < i; t++)
        e.push({ page: t });
      return i <= this.totalPages && (this.totalPages - 1 > i && e.push({ divider: !0 }), e.push({ page: this.totalPages < 1 / 0 ? this.totalPages : "&#8734;", disabled: this.totalPages === 1 / 0 })), e;
    }
  }
}, C = /* @__PURE__ */ o("span", { "aria-hidden": "true" }, " \xAB ", -1), S = [
  C
], z = ["data-page"], k = {
  key: 0,
  class: "page-link"
}, m = ["disabled", "data-label", "onClick"], N = ["innerHTML"], L = ["innerHTML"], B = /* @__PURE__ */ o("span", { "aria-hidden": "true" }, " \xBB ", -1), M = [
  B
];
function T(e, a, s, d, i, r) {
  return n(), l("nav", null, [
    o("ul", {
      class: h(["pagination", r.classes])
    }, [
      o("li", {
        class: h(["page-item", { disabled: s.disabled || i.currentPage === 1 }])
      }, [
        o("a", {
          href: "#",
          class: "page-link",
          "aria-label": "Previous",
          onClick: a[0] || (a[0] = g((t) => r.prev(t), ["prevent"]))
        }, S)
      ], 2),
      (n(!0), l(P, null, b(r.pages, (t, u) => (n(), l("li", {
        key: u,
        "data-page": t.page,
        class: h(["page-item", { active: t.page === i.currentPage, disabled: s.disabled || !!t.divider || !!t.disabled }])
      }, [
        w(e.$slots, "default", { item: t }, () => [
          t.divider ? (n(), l("a", k, " \u2026 ")) : (n(), l("a", {
            key: 1,
            href: "#",
            class: h(["page-link", t.class]),
            disabled: s.disabled,
            "data-label": t.label,
            onClick: g((f) => r.paginate(t.page, f), ["prevent"])
          }, [
            t.label ? (n(), l("span", {
              key: 0,
              "aria-hidden": "true",
              innerHTML: t.label
            }, null, 8, N)) : p("", !0),
            t.page ? (n(), l("span", {
              key: 1,
              "aria-hidden": "true",
              innerHTML: t.page
            }, null, 8, L)) : p("", !0)
          ], 10, m))
        ])
      ], 10, z))), 128)),
      o("li", {
        class: h(["page-item", { disabled: s.disabled || i.currentPage >= s.totalPages }])
      }, [
        o("a", {
          href: "#",
          class: "page-link",
          "aria-label": "Next",
          onClick: a[1] || (a[1] = g((t) => r.next(t), ["prevent"]))
        }, M)
      ], 2)
    ], 2)
  ]);
}
const O = /* @__PURE__ */ y(v, [["render", T]]);
export {
  O as Pagination
};
