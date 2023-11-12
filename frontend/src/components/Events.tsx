import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useContext } from 'react';
import { TiDelete } from 'react-icons/ti';
import { AssetContext } from '../contexts/AssetContext';
import { EventContext } from '../contexts/EventContext';
import { deleteEvent } from '../utils/apiService';
import { getEventDescription } from '../utils/eventHelper';
import EditCGTButton from './EditCGTButton';

function formatDate(eventDate) {
  const date = new Date(eventDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export default function Events() {
  const assetContext = useContext(AssetContext);
  const eventContext = useContext(EventContext);

  const events = eventContext.events;

  async function handleDeleteEvent(id) {
    try {
      const response = await deleteEvent(id);
      eventContext.updateEvents();
    } catch (error) {}
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', textAlign: 'center' }}>
      <Typography variant="h6">Past CGT Events:</Typography>
      <div style={{ maxHeight: '750px', overflowY: 'auto' }}>
        <List>
          {events.length === 0 ? (
            <ListItem>
              <ListItemText>
                <Typography variant="h4" sx={{ opacity: 0.6 }}>
                  No CGT Events have been added.
                </Typography>
              </ListItemText>
            </ListItem>
          ) : (
            events.map((item) => (
              <ListItem disablePadding key={item.eventDate}>
                <ListItemButton
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}
                >
                  <ListItemText primary={getEventDescription(item, assetContext.assets)} />
                  <Typography style={{ fontSize: '12px', opacity: 0.6 }}>
                    {formatDate(item.eventDate)}
                  </Typography>
                </ListItemButton>
                <EditCGTButton eventId={item.eventId} />
                <TiDelete
                  className="text-2xl m-2 hover:text-red-500"
                  onClick={() => handleDeleteEvent(item.eventId)}
                />
              </ListItem>
            ))
          )}
        </List>
      </div>
    </Box>
  );
}
