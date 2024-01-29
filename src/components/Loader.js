import { CircularProgress } from '@mui/material';
import React from 'react';

const Loader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress color="secondary" />
    </div>
  );
};

export default Loader;