import React, { useEffect, useState } from 'react';
import { useStore } from '../../store/store';
import Box from '@mui/material/Box';
import HeroItem from './hero-item';
import HeroModal from './hero-modal';
import Pagination from '../ui/pagination';
import LinearProgress from '@mui/material/LinearProgress';

const HeroList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [heroId, setHeroId] = useState<number | null>(null);
  const { fetchHeroes, heroes, loading } = useStore();

  const selectHero = (id: number) => {
    setHeroId(id);
    setOpenModal(true);
  };

  useEffect(() => {
    fetchHeroes(page);
  }, [page]);

  return (
    <div className='flex flex-col items-center'>
      {loading && (
        <Box sx={{ width: '100%', position: 'absolute', left: '0', top: '0' }}>
          <LinearProgress />
        </Box>
      )}
      <div>
        <ul className='gap-1 justify-between flex flex-wrap max-w-[600px] m-2'>
          {heroes.map((hero) => (
            <HeroItem key={hero.id} id={hero.id} name={hero.name} onClick={selectHero} />
          ))}
        </ul>
        {heroes.length > 0 && <Pagination page={page} setPage={setPage} />}
      </div>
      <HeroModal open={openModal} handleClose={() => setOpenModal(false)} heroId={heroId} />
    </div>
  );
};

export default HeroList;
