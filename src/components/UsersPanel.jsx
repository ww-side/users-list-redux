import React from 'react';
import { Box } from '@mui/material';
import AddForm from './AddForm';
import ListAndFilter from './ListAndFilter';

const UsersPanel = () => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      gap={2}
    >
      <AddForm />
      <ListAndFilter />
    </Box>
  );
};

export default UsersPanel;
