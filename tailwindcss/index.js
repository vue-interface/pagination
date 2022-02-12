const Color = require('color');
const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');
const variations = require('@vue-interface/variant/tailwindcss/variations');

module.exports = plugin(function({ addComponents, theme, postcss }) {
    function variant(key, paddingY, paddingX, fontSize, borderRadius) {
        const selector = key ? `.pagination-${key}` : '.pagination';

        if(key) {
            Object.assign(component[':root'], {
                // [`--pagination-${key}-font-size`]: fontSize,
                // [`--pagination-${key}-padding-y`]: paddingY,
                // [`--pagination-${key}-padding-x`]: paddingX,
                // [`--pagination-${key}-border-radius`]: borderRadius
            });
        }

        if(!component[selector]) {
            component[selector] = {};
        }

        Object.assign(component[selector], {
            '.page-link': {
                fontSize,
                padding: `${paddingY} ${paddingX}`
            }
        });

        if(!component[selector]['.page-item']) {
            component[selector]['.page-item'] = {};
        }        

        if(theme('pagination.marginLeft') === `-${theme('pagination.borderWidth')}`) {
            Object.assign(component[selector]['.page-item'], {
                '&:first-child': {
                    '.page-link': {
                        borderTopLeftRadius: borderRadius,
                        borderBottomLeftRadius: borderRadius,
                    }
                },
                '&:last-child': {
                    '.page-link': {
                        borderTopRightRadius: borderRadius,
                        borderBottomRightRadius: borderRadius,
                    }
                }
            });
        }
        else {
            Object.assign(component[selector], {
                ['.page-item']: {
                    borderRadius
                }
            });
        }
    }

    const component = {
        ':root': {
            // '--pagination-padding-y': theme('pagination.paddingY'),
            // '--pagination-padding-x': theme('pagination.paddingX'),
            // '--pagination-margin-left': theme('pagination.marginLeft'),
            // '--pagination-color': theme('pagination.color'),
            // '--pagination-background-color': theme('pagination.backgroundColor'),
            // '--pagination-border-width': theme('pagination.borderWidth'),
            // '--pagination-border-radius': theme('pagination.borderRadius'),
            // '--pagination-border-color': theme('pagination.borderColor'),
        },

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
            }
        },
          
        '.page-item': {
            '&:not(:first-child) .page-link': {
                'margin-left': theme('pagination.marginLeft')
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
            }
        },          
    };

    variant(null, theme('pagination.paddingY'), theme('pagination.paddingX'), theme('pagination.fontSize'), theme('pagination.borderRadius'));
    variant('lg', theme('pagination.lg.paddingY'), theme('pagination.lg.paddingX'), theme('pagination.lg.fontSize'), theme('pagination.lg.borderRadius'));
    variant('sm', theme('pagination.sm.paddingY'), theme('pagination.sm.paddingX'), theme('pagination.sm.fontSize'), theme('pagination.sm.borderRadius'));
    
    addComponents(component);
}, {
    theme: {
        pagination: theme => ({
            // enableGradients: false,
            // gradient: `linear-gradient(180deg, ${Color(theme('variation.primary', variations.primary)).fade(.5)}, ${theme('variation.primary', variations.primary)})`,
            paddingY: '.375rem',
            paddingX: '.75rem',
            marginLeft: '-1px',
            color: theme('variations.primary', variations.primary),
            backgroundColor: theme('colors.white', colors.white),
            borderWidth: '1px',
            borderRadius: '.25rem',
            borderColor: theme('colors.gray.200', colors.gray[200]),

            sm: {
                paddingY: '.25rem',
                paddingX: '.5rem',
            },

            lg: {
                paddingY: '.75rem',
                paddingX: '1.5rem',
            },

            focus: {
                width: '.25rem',
                borderColor: Color(theme('variations.primary', variations.primary)).fade(.5),
                outline: 0,
            },
            
            hover: {
                color: Color(theme('variations.primary', variations.primary)).darken(.15),
                backgroundColor: theme('colors.gray.100', colors.gray[100]),
                borderColor: theme('colors.gray.200', colors.gray[200]),
            },
            
            active: {
                color: theme('colors.white', colors.white),
                backgroundColor: theme('variations.primary', variations.primary),
                borderColor: theme('variations.primary', variations.primary),
            },
            
            disabled: {
                color: theme('colors.gray.400', colors.gray[400]),
                backgroundColor: theme('colors.white', colors.white),
                borderColor: theme('colors.gray.200', colors.gray[200]),
            }
        })
    }
});