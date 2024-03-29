<script>
import { Shadowable } from '@vue-interface/shadowable';
import { Sizeable } from '@vue-interface/sizeable';

export default {

    name: 'Pagination',

    mixins: [
        Shadowable,
        Sizeable
    ],

    props: {
        /**
         * The alignment of the pagination component.
         *
         * @prop String
         */
        align: {
            type: String,
            validate: value => {
                return ['start', 'end', 'center'].indexOf(value) !== -1;
            }
        },

        disabled: Boolean,

        /**
         * The page on which the paginator should start.
         *
         * @prop String
         */
        page: {
            type: Number,
            default: 1
        },

        /**
         * The number of pages to show when the total number of pages is
         * greater than the number of pages that should be shown.
         *
         * @prop String
         */
        showPages: {
            type: Number,
            default: 6
        },

        /**
         * The total number of pages in the paginator.
         *
         * @prop String
         */
        totalPages: {
            type: Number,
            default: 1
        },

        /**
         * The component prefix.
         */
        componentPrefix: {
            type: String,
            default: 'pagination'
        },

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

        next(event) {
            this.paginate(this.currentPage >= this.totalPages ? this.currentPage : this.currentPage + 1, event);
        },

        prev(event) {
            this.paginate(this.currentPage <= 1 ? this.currentPage : this.currentPage - 1, event);
        },

        paginate(page, event) {
            if(event.currentTarget.parentNode.classList.contains('disabled')) {
                return;
            }

            this.currentPage = page;
            this.$emit('paginate', page, event);
        },

        generate() {
            const pages = [];
            const showPages = this.showPages % 2 ? this.showPages + 1 : this.showPages;

            let startPage = (this.currentPage >= showPages) ? this.currentPage - (showPages / 2) : 1;

            const startOffset = showPages + startPage;
            const endPage = (this.totalPages < startOffset) ? this.totalPages : startOffset;
            const diff = startPage - endPage + showPages;

            startPage -= (startPage - diff > 0) ? diff : 0;

            if(startPage > 1) {
                pages.push({ page: 1 });
            }

            if(startPage > 2) {
                pages.push({ divider: true });
            }

            for(let i = startPage; i < endPage; i++) {
                pages.push({ page: i });
            }

            if(endPage <= this.totalPages) {
                if(this.totalPages - 1 > endPage) {
                    pages.push({ divider: true });
                }

                pages.push({ page: this.totalPages < Infinity ? this.totalPages : '&#8734;', disabled: this.totalPages === Infinity });
            }

            return pages;
        }

    }

};
</script>

<template>
    <nav>
        <ul
            class="pagination"
            :class="classes">
            <li
                class="page-item"
                :class="{'disabled': disabled || currentPage === 1}">
                <a
                    href="#"
                    class="page-link"
                    aria-label="Previous"
                    @click.prevent="prev($event)">
                    <span aria-hidden="true">
                        &laquo;
                    </span>
                </a>
            </li>
            <li
                v-for="(item, i) in pages"
                :key="i"
                :data-page="item.page"
                class="page-item"
                :class="{'active': item.page === currentPage, 'disabled': disabled || !!item.divider || !!item.disabled}">
                <slot :item="item">
                    <a
                        v-if="item.divider"
                        class="page-link">
                        &hellip;
                    </a>
                    <a
                        v-else
                        href="#"
                        class="page-link"
                        :class="item.class"
                        :disabled="disabled"
                        :data-label="item.label"
                        @click.prevent="paginate(item.page, $event)">
                        <span
                            v-if="item.label"
                            aria-hidden="true"
                            v-html="item.label" />
                        <span
                            v-if="item.page"
                            aria-hidden="true"
                            v-html="item.page" />
                    </a>
                </slot>
            </li>
            <li
                class="page-item"
                :class="{'disabled': disabled || currentPage >= totalPages}">
                <a
                    href="#"
                    class="page-link"
                    aria-label="Next"
                    @click.prevent="next($event)">
                    <span aria-hidden="true">
                        &raquo;
                    </span>
                </a>
            </li>
        </ul>
    </nav>
</template>