import { useState } from 'react';
import { 
  AppBar, Toolbar, IconButton, Typography, Drawer, List, 
  ListItemButton, ListItemIcon, ListItemText, Collapse, Box, CssBaseline 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Person from '@mui/icons-material/Person';
import Security from '@mui/icons-material/Security';

import { Dashboard } from './components/Dashboard';
import { AssetForm } from './components/AssetForm';

const drawerWidth = 240;

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Відкриття/закриття бокового меню на мобільних пристроях
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Розгортання вкладеного списку налаштувань
  const handleSettingsClick = () => {
    setSettingsOpen(!settingsOpen);
  };

  // Вміст бокового меню
  const drawerContent = (
    <div>
      <Toolbar />
      <List>
        <ListItemButton>
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        
        <ListItemButton onClick={handleSettingsClick}>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary="Settings" />
          {settingsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        
        {/* Вкладений список (Collapse) */}
        <Collapse in={settingsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon><Person /></ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon><Security /></ListItemIcon>
              <ListItemText primary="Account" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <CssBaseline />
      
      {/* Верхня панель */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            MUI Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Бокове меню */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
        >
          {drawerContent}
        </Drawer>
        
        <Drawer
          variant="permanent"
          sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Основний контент сторінки */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Dashboard />
        <AssetForm />
      </Box>
    </Box>
  );
}

export default App;