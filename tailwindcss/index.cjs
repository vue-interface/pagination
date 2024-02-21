const Color = require('color');
const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');
const variations = require('@vue-interface/variant/tailwindcss/variations');

module.exports = plugin(function({ addComponents, matchComponents, theme }) {
    addComponents({
        //
        // Base styles
        //
        '.pagination': {
            display: 'flex',
            paddingLeft: 0,
            listStyle: 'none',

            '&.justify-content-start': {
                justifyContent: 'start'
            },

            '&.justify-content-center': {
                justifyContent: 'center'
            },

            '&.justify-content-end': {
                justifyContent: 'end'
            }
        },
                
        '.page-link': {
            position: 'relative',
            display: 'block',
            color: theme('pagination.color'),
            textDecoration: 'none',
            backgroundColor: theme('pagination.backgroundColor'),
            border: `${theme('pagination.borderWidth')} solid ${theme('pagination.borderColor')}`,
            fontSize: theme('pagination.fontSize'),
            padding: theme('pagination.padding'),
          
            '&:hover': {
                zIndex: 2,
                color: theme('pagination.hover.color'),
                textDecoration: 'none',
                backgroundColor: theme('pagination.hover.backgroundColor'),
                borderColor: theme('pagination.hover.borderColor')
            },
          
            '&:focus': {
                zIndex: 3,
                outline: theme('pagination.focus.outline'),
                boxShadow: `0 0 0 ${theme('pagination.focus.width')} ${theme('pagination.focus.borderColor')}`
            },
        },
          
        '.page-item': {
            '&:not(:first-child) .page-link': {
                marginLeft: theme('pagination.marginLeft')
            },
          
            '&.active .page-link': {
                zIndex: 3,
                color: theme('pagination.active.color'),
                backgroundColor: theme('pagination.active.backgroundColor'),
                // backgroundImage: theme('pagination.enableGradients') ? theme('pagination.gradient') : undefined,
                borderColor: theme('pagination.active.borderColor')
            },
          
            '&.disabled .page-link': {
                color: theme('pagination.disabled.color'),
                pointerEvents: 'none',
                backgroundColor: theme('pagination.disabled.backgroundColor'),
                borderColor: theme('pagination.disabled.borderColor')
            },
          
            '&.disabled.active .page-link': {
                color: theme('pagination.disabled.backgroundColor'),
                pointerEvents: 'none',
                backgroundColor: theme('pagination.disabled.color'),
                borderColor: theme('pagination.disabled.color'),
            },

            '&:first-child .page-link': {
                borderTopLeftRadius: theme('pagination.borderRadius'),
                borderBottomLeftRadius: theme('pagination.borderRadius'),
            },

            '&:last-child .page-link': {
                borderTopRightRadius: theme('pagination.borderRadius'),
                borderBottomRightRadius: theme('pagination.borderRadius'),
            }
        },
    });

    matchComponents({
        pagination: ({ borderRadius, fontSize, padding }) => ({
            '.page-link': {
                fontSize,
                padding,
            },
            '.page-item:first-child .page-link': {
                borderTopLeftRadius: borderRadius,
                borderBottomLeftRadius: borderRadius,
            },
            '.page-item:last-child .page-link': {
                borderTopRightRadius: borderRadius,
                borderBottomRightRadius: borderRadius,
            }
        })
    }, {
        values: theme('pagination.sizes')
    });
}, {
    theme: {
        pagination: theme => ({
            // enableGradients: false,
            // gradient: `linear-gradient(180deg, ${Color(theme('variation.primary', variations.primary)).fade(.5)}, ${theme('variation.primary', variations.primary)})`,
            padding: '.375rem .75rem',
            marginLeft: '-1px',
            color: theme('variations.primary', variations.primary),
            backgroundColor: theme('colors.white', colors.white),
            borderWidth: '1px',
            borderRadius: '.25rem',
            borderColor: theme('colors.gray.200', colors.gray[200]),

            sizes: {
                sm: {
                    borderRadius: '.15rem',
                    fontSize: '.85rem',
                    padding: '.25rem .5rem',
                },
    
                lg: {
                    borderRadius: '.5rem',
                    fontSize: '1.25rem',
                    padding: '.75rem 1.5rem',
                },
            },

            focus: {
                width: '.25rem',
                borderColor: Color(theme('variations.primary', variations.primary)).fade(.5).hex(),
                outline: 0,
            },
            
            hover: {
                color: Color(theme('variations.primary', variations.primary)).darken(.15).hex(),
                backgroundColor: theme('colors.gray.100', colors.gray['100']),
                borderColor: theme('colors.gray.200', colors.gray['200']),
            },
            
            active: {
                color: theme('colors.white', colors.white),
                backgroundColor: theme('variations.primary', variations.primary),
                borderColor: theme('variations.primary', variations.primary),
            },
            
            disabled: {
                color: theme('colors.gray.400', colors.gray['400']),
                backgroundColor: theme('colors.white', colors.white),
                borderColor: theme('colors.gray.200', colors.gray['200']),
            }
        })
    }
});