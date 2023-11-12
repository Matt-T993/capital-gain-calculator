import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DisclaimerIcon from '@mui/icons-material/Announcement';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import ContactSupportIcon from '@mui/icons-material/PermPhoneMsg';
import FAQIcon from '@mui/icons-material/Quiz';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import useAuth from '../hooks/useAuth';

type LeftNavbarProps = {
  drawerWidth: number;
};

export default function LeftNavbar({ drawerWidth }: LeftNavbarProps) {
  const iconMapping = {
    'Home/Dashboard': <HomeIcon />,
    Dashboard: <DashboardIcon />,
    FAQ: <FAQIcon />,
    Settings: <SettingsIcon />,
    'Contact Us': <ContactSupportIcon />,
    Disclaimer: <DisclaimerIcon />,
  };

  const handleClick = (text) => {
    switch (text) {
      case 'Home':
        window.location.href = '/dashboard';
        break;
      case 'Dashboard':
        console.log('hello');
        window.location.href = '/dashboard';
        console.log(useAuth);
        break;
      case 'FAQ':
        window.location.href = '/faq';
        break;
      case 'Settings':
        window.location.href = '/settings';
        break;
      case 'Contact Us':
        window.location.href = '/contact';
        break;
      case 'Disclaimer':
        window.location.href = '/about';

      default:
        break;
    }
  };

  const handleLogOut = () => {
    window.location.href = '/login';
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
      PaperProps={{ elevation: 8 }}
    >
      <Box>
        <Box sx={{ width: '80%', margin: '2rem auto' }}>
          <AccountCircleIcon sx={{ fontSize: '4rem', marginBottom: '1rem' }} />
          <Typography variant="h6">Effi Deem</Typography>
          <Typography>effi.deem@hotmail.com</Typography>
        </Box>
      </Box>

      <Divider />
      <List>
        {['Home/Dashboard', 'Dashboard', 'Settings', 'Disclaimer'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleClick(text)}>
              <ListItemIcon>{iconMapping[text as keyof typeof iconMapping]}</ListItemIcon>
              <ListItemText primary={<Typography sx={{ fontWeight: '500' }}>{text}</Typography>} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />

      <Box>
        <Box sx={{ width: '80%', margin: '0.5rem auto' }}>
          <Typography>Resources</Typography>
        </Box>
      </Box>

      <Divider />
      <List>
        {['FAQ', 'Contact Us'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleClick(text)}>
              <ListItemIcon>{iconMapping[text as keyof typeof iconMapping]}</ListItemIcon>
              <ListItemText primary={<Typography sx={{ fontWeight: '500' }}>{text}</Typography>} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />

      <Box
        onClick={handleLogOut}
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '80%',
          margin: '2rem auto',
          marginTop: 'auto',
        }}
      >
        <LogoutIcon />
        <p
          onClick={handleLogOut}
          style={{ fontWeight: '500', marginLeft: '0.5rem', marginBottom: '0' }}
        >
          Log Out
        </p>
      </Box>
    </Drawer>
  );
}
