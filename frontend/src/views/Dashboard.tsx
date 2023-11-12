import { Box, Container, CssBaseline } from '@mui/material';
import LeftNavbar from '../components/LeftNavbar';

import Main from '../components/Main';
import TopNavbar from '../components/TopNavbar';
import { useState, useEffect } from 'react';

import { AssetContext } from '../contexts/AssetContext';
import { EventContext } from '../contexts/EventContext';
import api from '../utils/axiosService';

const drawerWidth = 300;

function Dashboard() {

  const [ready, setReady] = useState(false);
  const [assets, setAssets] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get('/asset/').then(response => {
      setAssets(response.data);
      setReady(true);
    });
    api.get('/event/').then(response => {
      setEvents(response.data);
    });
  }, []);

  return (
    <AssetContext.Provider value={{"assets":assets,"ready":ready}}>
    <EventContext.Provider value={{"events":events,"updateEvents":() => {
      api.get('/event/').then(response => {
        setEvents(response.data);
      });
    }}}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <LeftNavbar drawerWidth={drawerWidth} />
        <Container sx={{ marginTop: '2rem' }} maxWidth="lg">
          <TopNavbar />
          <Main />
        </Container>
      </Box>
    </EventContext.Provider>
    </AssetContext.Provider>
  );
}

export default Dashboard;
