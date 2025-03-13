import { styled } from '@mui/material/styles';
import { Popper } from '@mui/material';

const PopperStyled = styled(Popper)(({ theme }) => ({
  overflow: 'visible',
  zIndex: 1202,
  minWidth: 180,
  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 34,
    left: -5,
    width: 12,
    height: 12,
    transform: 'translateY(-50%) rotate(45deg)',
    zIndex: 120,
    borderWidth: '6px',
    borderStyle: 'solid',
    borderColor: `transparent transparent ${theme.palette.background.paper}  ${theme.palette.background.paper}`,
  },
  '&[data-popper-placement="left-start"]:before': {
    left: 'auto',
    right: -5,
    borderColor: `${theme.palette.background.paper}  ${theme.palette.background.paper} transparent transparent`,
  },
  '&[data-popper-placement="left-end"]:before': {
    top: 'auto',
    bottom: 15,
    left: 'auto',
    right: -5,
    borderColor: `${theme.palette.background.paper}  ${theme.palette.background.paper} transparent transparent`,
  },
  '&[data-popper-placement="right-end"]:before': {
    top: 'auto',
    bottom: 15,
  },
}));

export default PopperStyled;
