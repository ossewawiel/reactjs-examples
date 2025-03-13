import { MenuOutlined } from '@mui/icons-material';
import { Divider, Menu, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';

const LineChartMenu = ({
  anchorEl,
  menuSettings,
  handleClick,
  handleClose,
  handleMenuItemClick,
}) => (
  <>
    <MenuOutlined
      fontSize="small"
      sx={{ ml: 2, color: 'inherit', cursor: 'pointer' }}
      aria-controls="menu-popular-card"
      aria-haspopup="true"
      onClick={handleClick}
    />
    <Menu
      id="menu-popular-card"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      variant="selectedMenu"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      {menuSettings.items.map((menu, index) =>
        menu.value === 'separator' ? (
          <Divider key={index} />
        ) : (
          <MenuItem onClick={() => handleMenuItemClick(menu.value)} key={index}>
            {menu.name}
          </MenuItem>
        ),
      )}
    </Menu>
  </>
);

LineChartMenu.propTypes = {
  anchorEl: PropTypes.object,
  menuSettings: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.string,
      }),
    ).isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleMenuItemClick: PropTypes.func.isRequired,
};

export default LineChartMenu;
