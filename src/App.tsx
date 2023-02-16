import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import Container3D from './Container3D';

function App() {
  return (
<Suspense>
  <Container3D/>
</Suspense>
    );
}

export default App;
