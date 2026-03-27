import { Grid, Paper, Typography, Stack } from '@mui/material';

import Group from '@mui/icons-material/Group';
import Assessment from '@mui/icons-material/Assessment';
import BugReport from '@mui/icons-material/BugReport';
import Speed from '@mui/icons-material/Speed';

export const Dashboard = () => {
  const metrics = [
    { title: 'Total Users', value: '1,240', icon: <Group fontSize="large" color="primary" /> },
    { title: 'Active Sessions', value: '382', icon: <Assessment fontSize="large" color="success" /> },
    { title: 'Open Bugs', value: '14', icon: <BugReport fontSize="large" color="error" /> },
    { title: 'Server Load', value: '42%', icon: <Speed fontSize="large" color="warning" /> },
  ];

  return (
    <div style={{ paddingBottom: '24px' }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
        System Overview
      </Typography>
      
      <Grid container spacing={3}>
        {metrics.map((metric, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Paper elevation={2} sx={{ p: 3, height: '100%', borderRadius: 2 }}>
              <Stack direction="column" alignItems="center" spacing={1}>
                {metric.icon}
                <Typography variant="body1" color="text.secondary">
                  {metric.title}
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {metric.value}
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};