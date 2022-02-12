var Shadowable = {
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
      const dropShadowClassName = this.dropShadow === true ? "" : this.dropShadow && `-${this.dropShadow}`;
      const shadowClassName = this.shadow === true ? "" : this.shadow && `-${this.shadow}`;
      return {
        [`${this.dropShadowableClassPrefix}${dropShadowClassName}`]: !!this.dropShadow,
        [`${this.shadowableClassPrefix}${shadowClassName}`]: !!this.shadow
      };
    }
  }
};
var Sizeable = {
  props: {
    size: String,
    sizePrefix: {
      type: String,
      default() {
        return this.$options.name && this.$options.name.toLowerCase();
      }
    }
  },
  computed: {
    sizeableClassPrefix() {
      return this.sizePrefix;
    },
    sizeableClass() {
      if (!this.size || !this.sizeableClassPrefix) {
        return "";
      }
      return `${this.sizeableClassPrefix}-${this.size}`;
    }
  }
};
var render = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("nav", [_c("ul", { staticClass: "pagination", class: _vm.classes }, [_c("li", { staticClass: "page-item", class: { "disabled": _vm.disabled || _vm.currentPage === 1 } }, [_c("a", { staticClass: "page-link", attrs: { "href": "#", "aria-label": "Previous" }, on: { "click": function($event) {
    $event.preventDefault();
    return _vm.prev($event);
  } } }, [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v(" \xAB ")])])]), _vm._l(_vm.pages, function(item, i) {
    return _c("li", { key: i, staticClass: "page-item", class: { "active": item.page === _vm.currentPage, "disabled": _vm.disabled || !!item.divider || !!item.disabled }, attrs: { "data-page": item.page } }, [_vm._t("default", function() {
      return [item.divider ? _c("a", { staticClass: "page-link" }, [_vm._v(" \u2026 ")]) : _c("a", { staticClass: "page-link", class: item.class, attrs: { "href": "#", "disabled": _vm.disabled, "data-label": item.label }, on: { "click": function($event) {
        $event.preventDefault();
        return _vm.paginate(item.page, $event);
      } } }, [item.label ? _c("span", { attrs: { "aria-hidden": "true" }, domProps: { "innerHTML": _vm._s(item.label) } }) : _vm._e(), item.page ? _c("span", { attrs: { "aria-hidden": "true" }, domProps: { "innerHTML": _vm._s(item.page) } }) : _vm._e()])];
    }, { "item": item })], 2);
  }), _c("li", { staticClass: "page-item", class: { "disabled": _vm.disabled || _vm.currentPage >= _vm.totalPages } }, [_c("a", { staticClass: "page-link", attrs: { "href": "#", "aria-label": "Next" }, on: { "click": function($event) {
    $event.preventDefault();
    return _vm.next($event);
  } } }, [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v(" \xBB ")])])])], 2)]);
};
var staticRenderFns = [];
function normalizeComponent(scriptExports, render2, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
  var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
  if (render2) {
    options.render = render2;
    options.staticRenderFns = staticRenderFns2;
    options._compiled = true;
  }
  if (functionalTemplate) {
    options.functional = true;
  }
  if (scopeId) {
    options._scopeId = "data-v-" + scopeId;
  }
  var hook;
  if (moduleIdentifier) {
    hook = function(context) {
      context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
      if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
        context = __VUE_SSR_CONTEXT__;
      }
      if (injectStyles) {
        injectStyles.call(this, context);
      }
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    };
    options._ssrRegister = hook;
  } else if (injectStyles) {
    hook = shadowMode ? function() {
      injectStyles.call(this, (options.functional ? this.parent : this).$root.$options.shadowRoot);
    } : injectStyles;
  }
  if (hook) {
    if (options.functional) {
      options._injectStyles = hook;
      var originalRender = options.render;
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }
  return {
    exports: scriptExports,
    options
  };
}
const __vue2_script = {
  name: "Pagination",
  mixins: [
    Shadowable,
    Sizeable
  ],
  props: {
    align: {
      type: String,
      validate: (value) => {
        return ["start", "end", "center"].indexOf(value) !== -1;
      }
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
    next(event) {
      this.paginate(this.currentPage >= this.totalPages ? this.currentPage : this.currentPage + 1, event);
    },
    prev(event) {
      this.paginate(this.currentPage <= 1 ? this.currentPage : this.currentPage - 1, event);
    },
    paginate(page, event) {
      if (event.currentTarget.parentNode.classList.contains("disabled")) {
        return;
      }
      this.currentPage = page;
      this.$emit("paginate", page, event);
    },
    generate() {
      const pages = [];
      const showPages = this.showPages % 2 ? this.showPages + 1 : this.showPages;
      let startPage = this.currentPage >= showPages ? this.currentPage - showPages / 2 : 1;
      const startOffset = showPages + startPage;
      const endPage = this.totalPages < startOffset ? this.totalPages : startOffset;
      const diff = startPage - endPage + showPages;
      startPage -= startPage - diff > 0 ? diff : 0;
      if (startPage > 1) {
        pages.push({ page: 1 });
      }
      if (startPage > 2) {
        pages.push({ divider: true });
      }
      for (let i = startPage; i < endPage; i++) {
        pages.push({ page: i });
      }
      if (endPage <= this.totalPages) {
        if (this.totalPages - 1 > endPage) {
          pages.push({ divider: true });
        }
        pages.push({ page: this.totalPages < Infinity ? this.totalPages : "&#8734;", disabled: this.totalPages === Infinity });
      }
      return pages;
    }
  }
};
const __cssModules = {};
var __component__ = /* @__PURE__ */ normalizeComponent(__vue2_script, render, staticRenderFns, false, __vue2_injectStyles, null, null, null);
function __vue2_injectStyles(context) {
  for (let o in __cssModules) {
    this[o] = __cssModules[o];
  }
}
var Pagination = /* @__PURE__ */ function() {
  return __component__.exports;
}();
export { Pagination };
