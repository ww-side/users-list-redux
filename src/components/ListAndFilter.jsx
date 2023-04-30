import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { removeUserAction } from '../store/userReducer';

const ListAndFilter = () => {
  const [filterValue, setFilterValue] = useState('');
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  const handleFilterChange = event => {
    setFilterValue(event.target.value);
  };

  const removeUser = user => {
    dispatch(removeUserAction(user.id));
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <React.Fragment>
      <TextField
        id='standard-basic'
        label='Filter users'
        variant='standard'
        value={filterValue}
        onChange={handleFilterChange}
      />
      {filteredUsers.length > 0 ? (
        <Box>
          {filteredUsers.map(user => (
            <Box
              display='flex'
              justifyContent='flex-end'
              gap={2}
              marginBottom={2}
              key={user.id}
              fontSize={23}
            >
              <Box>{user.name}</Box>
              <Button
                variant='outlined'
                color='error'
                onClick={() => removeUser(user)}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Box>
      ) : (
        <Box fontSize={23}>No users</Box>
      )}
    </React.Fragment>
  );
};

export default ListAndFilter;
