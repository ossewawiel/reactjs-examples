import { Grid, MenuItem, TextField } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

const BarChartDropdowns = ({ isLoading, dropdownSettings }) => (
  <Grid container spacing={1}>
    {isLoading
      ? [1, 2, 3].map((_, index) => (
          <Grid item key={index}>
            <Skeleton variant="rectangular" width={120} height={40} />
          </Grid>
        ))
      : dropdownSettings?.map((item, index) => (
          <Grid item key={index}>
            <TextField
              id={item.name}
              label={item.name}
              size="small"
              select
              value={item.selectedValue}
              onChange={(e) => item.onSelect(e.target.value)}
            >
              {item.data?.map((option) => (
                <MenuItem
                  key={option[item.codeField]}
                  value={option[item.codeField]}
                >
                  {option[item.nameField]}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        ))}
  </Grid>
);

export default BarChartDropdowns;
