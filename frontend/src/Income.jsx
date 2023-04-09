import React, { useState } from 'react';
import { Tabs, Tab, Box, Select, MenuItem } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

//Income categories will be fetched from database to show in tabs
const Income = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [value, setValue] = useState(0);
  const [categories, setCategories] = useState(['Salary', 'Dividends', 'Bonuses', 'Rent']);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddCategory = () => {
    const newCategory = prompt('Enter the name of the new category');
    if (newCategory) {
      setCategories([...categories, newCategory]);
      setValue(categories.length);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {isMobile ? (
        <Box sx={{ mb: 2 }}>
          <Select value={value} onChange={(e) => setValue(e.target.value)}>
            {categories.map((category, index) => (
              <MenuItem key={index} value={index}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </Box>
      ) : (
        <Tabs value={value} onChange={handleChange}>
          {categories.map((category) => (
            <Tab label={category} key={category} />
          ))}
          <Box sx={{ flexGrow: 1 }} />
          <Tab label="Add Category" onClick={handleAddCategory} />
        </Tabs>
      )}
      <Box sx={{ p: 3 }}>
        {/* Render the content for the selected tab */}
      </Box>
    </Box>
  );
};

export default Income; 
