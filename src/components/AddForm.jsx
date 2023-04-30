import React, { useState } from 'react';
import { Alert, Box, Button, TextField } from '@mui/material';
import { v4 } from 'uuid';
import { addUserAction } from '../store/userReducer';
import { useDispatch } from 'react-redux';

const AddForm = () => {
  const [inputValue, setInputValue] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();

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

  const handleKeyDown = (e, name) => {
    if (e.key === 'Enter') addUser(name);
  };

  const handleChange = event => {
    setInputValue(event.target.value);
  };

  return (
    <React.Fragment>
      {showAlert && (
        <Alert sx={{ width: '100%' }} textAlign='center' severity='warning'>
          <strong>Fill in the input</strong>
        </Alert>
      )}
      <Box display='flex' flexDirection='column' gap={2} marginTop={2}>
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
    </React.Fragment>
  );
};

export default AddForm;
