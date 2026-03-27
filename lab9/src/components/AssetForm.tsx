import { useState } from 'react';
import { 
  Paper, TextField, InputAdornment, FormControl, InputLabel, 
  Select, MenuItem, Slider, Typography, Button, Box 
} from '@mui/material';

export const AssetForm = () => {
  const [category, setCategory] = useState('');

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
        Asset Registration
      </Typography>
      
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Outlined TextField */}
        <TextField 
          label="Asset Name" 
          variant="outlined" 
          fullWidth 
        />
        
        {/* Filled TextField з префіксом */}
        <TextField 
          label="Estimated Value" 
          variant="filled" 
          type="number"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          fullWidth 
        />

        {/* Випадаючий список */}
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="hardware">Hardware</MenuItem>
            <MenuItem value="software">Software</MenuItem>
            <MenuItem value="license">License</MenuItem>
          </Select>
        </FormControl>

        {/* Слайдер з позначками */}
        <Box>
          <Typography gutterBottom color="text.secondary">Priority Level (1-10)</Typography>
          <Slider
            defaultValue={5}
            step={1}
            marks
            min={1}
            max={10}
            valueLabelDisplay="auto"
          />
        </Box>

        <Button variant="contained" color="primary" size="large" sx={{ mt: 1 }}>
          Register Asset
        </Button>
      </Box>
    </Paper>
  );
};