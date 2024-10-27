import React from 'react';
import HeroList from './components/hero-list/hero-list';

const App: React.FC = () => {
  return (
    <div className='flex flex-column justify-center items-center h-screen w-screen'>
      <HeroList />
    </div>
  );
};

export default App;
