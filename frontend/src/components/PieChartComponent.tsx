import { Box, Container, Divider, Typography } from '@mui/material';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { fetchUserTotalAmount } from '../utils/apiService';
import UserAssetsDetails from './UserAssetsDetails';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChartComponent() {
  const [total, setTotal] = useState([]);
  async function getUserTotalAmount() {
    try {
      const response = await fetchUserTotalAmount();
      setTotal(response);
    } catch (error) {
      console.error('Error fetching user assets:', error);
    }
  }

  useEffect(() => {
    getUserTotalAmount();
    const interval = setInterval(getUserTotalAmount, 5000);

    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: ['Crypto', 'Stocks'],
    datasets: [
      {
        label: 'AUD',
        data: [total.crytoTotalAmount, total.stockTotalAmount],
        backgroundColor: ['#65D4F7', '#4EA1ED'],
        borderWidth: 1,
      },
    ],
  };

  const sum = data.datasets[0].data.reduce((total, value) => total + value, 0);
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  today = dd + '.' + mm + '.' + yyyy;

  return (
    <Container>
      <Box display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Typography variant="h6">Current Portfolio</Typography>
            <Typography variant="h3" fontWeight={500}>
              ${total.totalAmount}
            </Typography>
            <Typography>TOTAL VALUE (AUD) AS AT {today}</Typography>
          </Box>
          <Box>
            <UserAssetsDetails />
          </Box>
        </Box>
        <Divider />
        <Container>
          <Pie
            data={data}
            options={{
              plugins: {
                legend: {
                  position: 'right',
                },
              },
            }}
          />
        </Container>
      </Box>
    </Container>
  );
}
