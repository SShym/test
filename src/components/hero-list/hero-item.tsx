import React from 'react';
import Avatar from '@mui/material/Avatar';

interface HeroItemProps {
  id: number;
  name: string;
  onClick: (id: number) => void;
}

const HeroItem: React.FC<HeroItemProps> = ({ id, name, onClick }) => {
  return (
    <li onClick={() => onClick(id)} key={id} className='hover:bg-slate-200 flex flex-grow cursor-pointer items-center gap-3 bg-slate-100 rounded-md px-5 py-2'>
      <Avatar src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}>
        {name[0]}
      </Avatar>
      <div className='select-none'>{name}</div>
    </li>
  );
};

export default HeroItem;
