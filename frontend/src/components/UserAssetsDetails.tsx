import {
  Dialog,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { fetchUserAssets } from '../utils/apiService';

export default function UserAssetsDetails() {
  const [assets, setAssets] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function getAssets() {
      try {
        const response = await fetchUserAssets(); // Replace with your actual API call to fetch user assets
        setAssets(response);
      } catch (error) {
        console.error('Error fetching user assets:', error);
      }
    }

    getAssets();
  }, []);

  const handleInfoIconClick = async () => {
    setOpen(true);
    try {
      const response = await fetchUserAssets(); // Refresh the data
      setAssets(response);
    } catch (error) {
      console.error('Error refreshing user assets:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <HiOutlineInformationCircle
        onClick={handleInfoIconClick}
        className="text-2xl m-2 hover:text-blue-500"
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <img src="/CGCLogo.png" alt="CGC Logo" className="mt-10" />
          <Typography variant="h6">Detail Current Holdings</Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Asset Name</TableCell>
                <TableCell>Units</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.name}>
                  <TableCell>{asset.assetIdentifier}</TableCell>
                  <TableCell>{asset.quantity}</TableCell>
                  <TableCell>${asset.totalAmount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </div>
  );
}
