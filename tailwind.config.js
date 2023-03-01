const colors = require('tailwindcss/colors');

module.exports = {
    content: [
        './index.html'
    ],
    theme: {
        extend: {
            variations: {
                primary: colors.fuchsia['700']
            }
        },
    },
    plugins: [
        require('./tailwindcss')
    ],
    safelist: [
        ...require('./tailwindcss/safelist')()
    ]
};