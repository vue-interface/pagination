const Color = require('color');
const rgba = require('hex-to-rgba');
const plugin = require('tailwindcss/plugin');
const { colors, padding } = require('tailwindcss/defaultTheme');
const defaultVariations = require('@vue-interface/variant/tailwindcss/defaultVariations');

function darken(color, ...args) {
    return Color(color).darken(...args).hex();
}

module.exports = plugin(function({ addComponents, theme, postcss }) {
    function variant(key, paddingY, paddingX, fontSize, borderRadius) {
        const selector = key ? `.pagination-${key}` : '.pagination';

        if(key) {
            Object.assign(component[':root'], {
                [`--pagination-${key}-font-size`]: fontSize,
                [`--pagination-${key}-padding-y`]: paddingY,
                [`--pagination-${key}-padding-x`]: paddingX,
                [`--pagination-${key}-border-radius`]: borderRadius
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
                        'border-top-left-radius': borderRadius,
                        'border-bottom-left-radius': borderRadius,
                    }
                },
                '&:last-child': {
                    '.page-link': {
                        'border-top-right-radius': borderRadius,
                        'border-bottom-right-radius': borderRadius,
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
            '--pagination-padding-y': theme('pagination.paddingY'),
            '--pagination-padding-x': theme('pagination.paddingX'),
            '--pagination-margin-left': theme('pagination.marginLeft'),
            '--pagination-color': theme('pagination.color'),
            '--pagination-background-color': theme('pagination.backgroundColor'),
            '--pagination-border-width': theme('pagination.borderWidth'),
            '--pagination-border-radius': theme('pagination.borderRadius'),
            '--pagination-border-color': theme('pagination.borderColor'),
        },

        //
        // Base styles
        //
        '.pagination': {
            'display': 'flex',
            'padding-left': 0,
            'list-style': 'none', 
        },
        
        '.page-link': {
            'position': 'relative',
            'display': 'block',
            'color': theme('pagination.color'),
            'text-decoration': 'none',
            'background-color': theme('pagination.backgroundColor'),
            'border': `${theme('pagination.borderWidth')} solid ${theme('pagination.borderColor')}`,
          
            '&:hover': {
                'z-index': 2,
                'color': theme('pagination.hover.color'),
                'text-decoration': 'none',
                'background-color': theme('pagination.hover.backgroundColor'),
                'border-color': theme('pagination.hover.borderColor')
            },
          
            '&:focus': {
                'z-index': 3,
                'outline': theme('pagination.focus.outline'),
                'box-shadow': `0 0 0 ${theme('pagination.focus.width')} ${theme('pagination.focus.borderColor')}`
            }
        },
          
        '.page-item': {
            '&:not(:first-child) .page-link': {
                'margin-left': theme('pagination.marginLeft')
            },
          
            '&.active .page-link': {
                'z-index': 3,
                'color': theme('pagination.active.color'),
                'background-color': theme('pagination.active.backgroundColor'),
                'background-image': theme('pagination.enableGradients') ? theme('pagination.gradient') : undefined,
                'border-color': theme('pagination.active.borderColor')
            },
          
            '&.disabled .page-link': {
                'color': theme('pagination.disabled.color'),
                'pointer-events': 'none',
                'background-color': theme('pagination.disabled.backgroundColor'),
                'border-color': theme('pagination.disabled.borderColor')
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
            enableGradients: true,
            gradient: `linear-gradient(180deg, rgba(${theme('colors.white', colors.white)}, .15), rgba(${theme('colors.white', colors.white)}, 0))`,
            paddingY: '.375rem',
            paddingX: '.75rem',
            marginLeft: '-1px',
            color: theme('variations.primary', defaultVariations.primary),
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
                borderColor: rgba(theme('variations.primary', defaultVariations.primary), .5),
                outline: 0,
            },
            
            hover: {
                color: darken(theme('variations.primary', defaultVariations.primary), .15),
                backgroundColor: theme('colors.gray.100', colors.gray[100]),
                borderColor: theme('colors.gray.200', colors.gray[200]),
            },
            
            active: {
                color: theme('colors.white', colors.white),
                backgroundColor: theme('variations.primary', defaultVariations.primary),
                borderColor: theme('colors.white', colors.white),
            },
            
            disabled: {
                color: theme('colors.gray.500', colors.gray[500]),
                backgroundColor: theme('colors.white', colors.white),
                borderColor: theme('colors.gray.200', colors.gray[200]),
            },
        })
    }
});