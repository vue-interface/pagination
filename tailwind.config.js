module.exports = {
    content: [
        "./index.html"
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('@vue-interface/variant/tailwindcss'),
        require('./tailwindcss')
    ],
    safelist: [
        ...require('./tailwindcss/safelist')()
    ]
};