import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { Alert, Box, Button, TextField } from '@mui/material';
import { addUserAction, removeUserAction } from '../store/userReducer';

const UsersPanel = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const [inputValue, setInputValue] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = event => {
    setInputValue(event.target.value);
  };

  const handleFilterChange = event => {
    setFilterValue(event.target.value);
  };

  const addUser = name => {
    if (name === '') {
      setShowAlert(true);
    } else {
      const user = {
        name,
        id: v4()
      };

      dispatch(addUserAction(user));
      setInputValue('');
      setShowAlert(false);
    }
  };

  const removeUser = user => {
    dispatch(removeUserAction(user.id));
  };

  const handleKeyDown = (e, name) => {
    if (e.key === 'Enter') addUser(name);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      gap={2}
    >
      {showAlert && <Alert severity='warning'>Fill in the input</Alert>}
      <Box
        display='flex'
        flexDirection='column'
        gap={2}
        sx={{ paddingTop: '20px' }}
      >
        <TextField
          id='outlined-basic'
          label='Enter a name'
          variant='outlined'
          type='text'
          value={inputValue}
          onChange={handleChange}
          onKeyDown={e => handleKeyDown(e, inputValue)}
        />
        <Button variant='contained' onClick={() => addUser(inputValue)}>
          Add new user
        </Button>
      </Box>
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
    </Box>
  );
};

export default UsersPanel;
