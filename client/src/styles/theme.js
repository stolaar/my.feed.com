import createTheme from "@material-ui/core/styles/createTheme";
import {alpha} from "@material-ui/core";

export const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#fff'
        }
    }
});

theme.overrides = {
    MuiSwitch: {
        colorSecondary: {
            '&$checked': {
                color: theme.palette.secondary.main,
                '&:hover': {
                    backgroundColor: alpha(theme.palette.secondary.main, theme.palette.action.hoverOpacity),
                    '@media (hover: none)': {
                        backgroundColor: 'transparent',
                    },
                },
            },
            '&$disabled': {
                color: theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[800],
            },
            '&$checked + $track': {
                backgroundColor: theme.palette.secondary.main,
            },
            '&$disabled + $track': {
                backgroundColor:
                    theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white,
            },
        },
    }
}
