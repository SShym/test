import 'reactflow/dist/style.css';
import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/store';
import { HeroDetails } from '../hero-list/types';
import ReactFlow, { Edge, Node } from 'reactflow';
import { createHeroNode, createFilmNodes, createStarshipNodes, createFilmEdges, createStarshipEdges } from './graph-helpers';

interface Props {
  heroId: number | null;
}

const HeroGraph: React.FC<Props> = ({ heroId }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const { fetchHero } = useStore();

  useEffect(() => {
    const fetchHeroDetails = async () => {
      if (heroId) {
        const hero: HeroDetails = await fetchHero(heroId);

        const heroNode = createHeroNode(hero);
        const filmNodes = createFilmNodes(hero.films);
        const starshipNodes = createStarshipNodes(hero.starships);
        const filmEdges = createFilmEdges(hero.id, hero.films);
        const starshipEdges = createStarshipEdges(hero.films, hero.starships);

        setNodes([heroNode, ...filmNodes, ...starshipNodes]);
        setEdges([...filmEdges, ...starshipEdges]);
      }
    };

    fetchHeroDetails();
  }, [heroId]);

  return (
    <div className='absolute left-0 top-0 h-full w-full'>
      <ReactFlow fitView nodes={nodes} edges={edges} />
    </div>
  );
};

export default HeroGraph;
