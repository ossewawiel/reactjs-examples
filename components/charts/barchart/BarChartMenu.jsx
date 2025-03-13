import { MenuOutlined } from '@mui/icons-material';
import { Divider, Menu, MenuItem } from '@mui/material';

const BarChartMenu = ({
  menuSettings,
  anchorEl,
  handleClick,
  handleClose,
  handleMenuItemClick,
}) =>
  menuSettings && (
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
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {menuSettings.items.map((menu, index) =>
          menu.value === 'separator' ? (
            <Divider key={index} />
          ) : (
            <MenuItem
              onClick={() => handleMenuItemClick(menu.value)}
              key={index}
            >
              {menu.name}
            </MenuItem>
          ),
        )}
      </Menu>
    </>
  );

export default BarChartMenu;
