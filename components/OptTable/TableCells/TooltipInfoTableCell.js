import { useTheme } from '@mui/material/styles';
import { TableCell, Tooltip, Typography } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';

export const TooltipInfoTableCell = ({ columnProperties, rowData }) => {
  const theme = useTheme();
  const { id } = columnProperties;

  const val = rowData[id] ? rowData[id] : 'No Information';
  const icon = rowData[id] ? (
    <InfoOutlined sx={{ color: theme.palette.info.main }} size="small" />
  ) : (
    ''
  );
  return (
    <Tooltip
      title={val}
      slotProps={{
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, -40],
              },
            },
          ],
        },
      }}
    >
      <TableCell key={id}>{icon}</TableCell>
    </Tooltip>
  );
};
