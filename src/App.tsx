import React from 'react';
import Router from './routes/Router';
import AppwriteProvider from './appwrite/appwriteContext';
const App = () => {
  return (
    <AppwriteProvider>
      <Router />
    </AppwriteProvider>
  );
};

export default App;
