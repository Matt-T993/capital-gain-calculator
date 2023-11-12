import InboxIcon from '@mui/icons-material/Inbox';
import { Box, Container, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useEffect, useState } from 'react';
import { fetchUserAssets } from '../utils/apiService';

export default function CurrentHoldings() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    async function getAssets() {
      try {
        const response = await fetchUserAssets();
        setAssets(response);
      } catch (error) {
        console.error('Error fetching user assets:', error);
      }
    }

    // Fetch assets initially and then every 5 seconds (adjust the interval as needed)
    getAssets();
    const intervalId = setInterval(getAssets, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <Container sx={{ paddingTop: '1.5rem' }}>
        <Typography variant="h6">Current Portfolio Holdings</Typography>
        <nav aria-label="main mailbox folders" style={{ maxHeight: '600px', overflowY: 'auto' }}>
          <List>
            {assets.map((item) => (
              <ListItem disablePadding key={item.assetName}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemButton
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}
                >
                  <Typography fontWeight={500}>{item.assetName}</Typography>
                  <Typography style={{ fontSize: '12px', opacity: 0.6 }}>
                    {item.quantity} {item.assetIdentifier}
                  </Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </nav>
      </Container>
    </Box>
  );
}
