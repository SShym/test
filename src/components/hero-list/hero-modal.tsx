import React from 'react';
import SpringModal from '../ui/modal';
import HeroGraph from '../hero-graph/hero-graph';

interface HeroModalProps {
  open: boolean;
  handleClose: () => void;
  heroId: number | null;
}

const HeroModal: React.FC<HeroModalProps> = ({ open, handleClose, heroId }) => {
  return (
    <SpringModal open={open} handleClose={handleClose}>
      <HeroGraph heroId={heroId} />
    </SpringModal>
  );
};

export default HeroModal;
