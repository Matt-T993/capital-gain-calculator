import { Box, Typography } from '@mui/material';
import AddCGTButton from './AddCGTButton';

export default function TopNavbar() {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="h4" fontWeight={800}>
        Capital Portfolio
      </Typography>
      <AddCGTButton />
    </Box>
  );
}
