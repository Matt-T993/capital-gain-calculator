import { Box, Button, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { generateTaxPayable } from '../utils/apiService';
import Calendar from './Calendar';
import CurrentHoldings from './CurrentHoldings';
import Events from './Events';
import PieChartComponent from './PieChartComponent';

export default function Main() {
  const [taxPayable, setTaxPayable] = useState();

  async function handleClick() {
    const response = await generateTaxPayable();
    setTaxPayable(response);
  }

  return (
    <Box display="flex" flexDirection="row">
      <Box>
        <Paper elevation={2} sx={{ flex: '1', margin: '2rem' }}>
          <PieChartComponent />
        </Paper>

        <Paper elevation={2} sx={{ flex: '1', margin: '2rem' }}>
          <Calendar />
        </Paper>
      </Box>

      <Box display="flex" marginTop="2rem">
        <Box display="flex" sx={{ flex: '1', marginRight: '2rem' }}>
          <Paper elevation={2}>
            <Events />
          </Paper>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" marginTop="2rem">
        <Box display="flex" sx={{ flex: '1' }}>
          <Paper elevation={2} sx={{ marginBottom: '1rem' }}>
            <CurrentHoldings />
          </Paper>
        </Box>
        <Paper elevation={2} sx={{ width: '100%' }}>
          <Box
            textAlign="center"
            sx={{
              backgroundColor: '#4EA1ED',
              borderRadius: '5px 5px 0px 0px',
            }}
          >
            <Typography variant="h4">${taxPayable}</Typography>
          </Box>
          <Box textAlign="center">Est. tax payable</Box>
          <Box sx={{ textAlign: 'center', mt: '1rem', pb: '1rem' }}>
            <Button variant="contained" onClick={handleClick}>
              generate tax payable
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
