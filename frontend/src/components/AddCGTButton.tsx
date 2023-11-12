import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useContext, useState } from 'react';
import { AssetContext } from '../contexts/AssetContext';
import { EventContext } from '../contexts/EventContext';
import useForm from '../hooks/useForm';
import api from '../utils/axiosService';
import { addEventValidator } from '../utils/validationHelper';

export default function AddCGTButton() {
  const [open, setOpen] = useState(false);
  const assetContext = useContext(AssetContext);
  const eventContext = useContext(EventContext);
  const assets = assetContext.assets;
  const ready = assetContext.ready;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createEventError, setCreateEventError] = useState('');
  const { formData, formValidation, handleInputFieldChange, handleBlur, handleSubmit } = useForm({
    initialFormData: {
      assetType: '',
      assetId: '',
      pricePerUnit: 0,
      quantity: 0,
      eventType: '',
      eventDate: '',
    },
    validator: addEventValidator,
  });

  const handleClickOpen = () => {
    setIsSubmitting(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    //TODO: reset form (might need to change useForm?)
  };

  const handleCreateEvent = () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    api
      .post('/event/', formData)
      .then((response) => {
        setOpen(false);
      })
      .catch((error) => {
        setCreateEventError(`${error.message}: ${error.error}`);
      })
      .finally(() => {
        setIsSubmitting(false);
        eventContext.updateEvents();
      });
  };

  return (
    <div>
      <Button
        variant="outlined"
        disabled={!ready}
        onClick={handleClickOpen}
        style={{
          borderRadius: '2rem',
          backgroundColor: ready ? '#2196F3' : '#63D1F3',
          color: 'white',
          padding: '0.7rem 2rem',
        }}
      >
        + Add CGT Event
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Container sx={{ textAlign: 'center' }} component="main" maxWidth="xs">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {createEventError == '' || (
                <p className="mb-4 font-bold text-center text-red-700 md:text-left">
                  {createEventError}
                </p>
              )}

              <FormControl fullWidth error={!formValidation.validAssetType}>
                <InputLabel id="asset-type-label">Type of Asset</InputLabel>
                <Select
                  labelId="asset-type-label"
                  id="assetType"
                  name="assetType"
                  label="Type of Asset"
                  value={formData.assetType}
                  onChange={(e) => {
                    formData.assetId = '';
                    handleInputFieldChange(e);
                  }}
                  onBlur={handleBlur}
                >
                  <MenuItem value="STOCK">Stock</MenuItem>
                  <MenuItem value="CRYPTO">Cryptocurrency</MenuItem>
                </Select>
                {formValidation.validAssetType || (
                  <FormHelperText>Select Asset Type</FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth error={!formValidation.validAssetId}>
                <InputLabel id="asset-label">Asset</InputLabel>
                <Select
                  labelId="asset-label"
                  id="assetId"
                  name="assetId"
                  label="Asset"
                  value={formData.assetId}
                  onChange={handleInputFieldChange}
                  onBlur={handleBlur}
                >
                  {assets
                    .filter((asset) => asset.assetType == formData.assetType)
                    .map((asset) => (
                      <MenuItem key={asset.assetId} value={asset.assetId}>
                        {asset.assetName}
                      </MenuItem>
                    ))}
                </Select>
                {formValidation.validAssetId || <FormHelperText>Select Asset</FormHelperText>}
              </FormControl>

              <TextField
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                label="Price per unit"
                type="number"
                name="pricePerUnit"
                onChange={handleInputFieldChange}
                onBlur={handleBlur}
                value={formData.pricePerUnit}
              />

              <TextField
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                label="Quantity"
                type="number"
                name="quantity"
                onChange={handleInputFieldChange}
                onBlur={handleBlur}
                value={formData.quantity}
              />

              <FormControl fullWidth error={!formValidation.validEventType}>
                <InputLabel id="event-type-label">Buy / Sell</InputLabel>
                <Select
                  labelId="event-type-label"
                  id="eventType"
                  name="eventType"
                  label="Buy / Sell"
                  value={formData.eventType}
                  onChange={handleInputFieldChange}
                  onBlur={handleBlur}
                >
                  <MenuItem value="BUY">Buy</MenuItem>
                  <MenuItem value="SELL">Sell</MenuItem>
                </Select>
                {formValidation.validEventType || (
                  <FormHelperText>Select Asset Type</FormHelperText>
                )}
              </FormControl>

              <TextField
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                label="Date"
                type="datetime-local"
                name="eventDate"
                onChange={handleInputFieldChange}
                onBlur={handleBlur}
                value={formData.eventDate}
              />
            </Box>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={isSubmitting} onClick={(e) => handleSubmit(e, handleCreateEvent)}>
            Create Event
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
