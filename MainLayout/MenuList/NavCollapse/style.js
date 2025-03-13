const navCollapseButtonStyle = ({
  borderRadius,
  drawerOpen,
  level,
  selectedColor,
  theme,
}) => ({
  zIndex: 1201,
  borderRadius: `${borderRadius}px`,
  mb: 0.5,
  pl: drawerOpen && level > 2 ? `${(level - 1) * 24}px` : 1.25,
  ...(drawerOpen &&
    level <= 2 &&
    theme.palette.mode !== 'dark' && {
      '&:hover': {
        background: theme.palette.secondary.light,
      },
      '&.Mui-selected': {
        background: theme.palette.secondary.light,
        color: selectedColor,
        '&:hover': {
          color: selectedColor,
          background: theme.palette.secondary.light,
        },
      },
    }),
  ...(!drawerOpen && {
    py: level < 2 ? 0 : 1,
    '&:hover': {
      bgcolor: 'transparent',
    },
    '&.Mui-selected': {
      '&:hover': {
        bgcolor: 'transparent',
      },
      bgcolor: 'transparent',
    },
  }),
});

export default navCollapseButtonStyle;
