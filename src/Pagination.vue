<template>
    <nav>
        <ul class="pagination" :class="classes">
            <li class="page-item" :class="{'disabled': currentPage === 1}">
                <a href="#" class="page-link" aria-label="Previous" @click.prevent="prev($event)">
                    <span aria-hidden="true">
                        &laquo;
                    </span>
                </a>
            </li>
            <li v-for="(item, i) in pages" :key="i" :data-page="item.page" class="page-item" :class="{'active': item.page === currentPage, 'disabled': !!item.divider}">
                <slot :item="item">
                    <a v-if="item.divider" class="page-link">
                        &hellip;
                    </a>
                    <a
                        v-else
                        href="#"
                        class="page-link"
                        :class="item.class"
                        :data-label="item.label"
                        @click.prevent="paginate(item.page, $event)">
                        <span v-if="item.label" aria-hidden="true">{{ item.label }}</span>
                        <span v-if="item.page" aria-hidden="true">{{ item.page }}</span>
                    </a>
                </slot>
            </li>
            <li class="page-item" :class="{'disabled': currentPage >= totalPages}">
                <a href="#" class="page-link" aria-label="Next" @click.prevent="next($event)">
                    <span aria-hidden="true">
                        &raquo;
                    </span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
import Sizeable from '@vue-interface/sizeable';

export default {

    name: 'Pagination',

    mixins: [
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
         * The total number of pages in the paginator.
         *
         * @prop String
         */
        totalPages: {
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
                [this.sizeableClass]: !!this.sizeableClass,
                ['justify-content-' + this.align]: !!this.align
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

                pages.push({ page: this.totalPages < Infinity ? this.totalPages : '&#8734;' });
            }

            return pages;
        }

    }

};
</script>