import { HeroDetails } from '../hero-list/types';
import { GraphNode, GraphEdge } from './types';

export const createHeroNode = (hero: HeroDetails): GraphNode => ({
  id: `hero-${hero.id}`,
  data: { label: hero.name },
  position: { x: 10, y: 10 },
  type: 'default',
});

export const createFilmNodes = (filmIds: number[]): GraphNode[] => 
  filmIds.map((filmId, index) => ({
    id: `film-${filmId}`,
    data: { label: `Film ${filmId}` },
    position: { x: 160 * (index + 1), y: 120 },
    type: 'default',
  }));

export const createStarshipNodes = (starshipIds: number[]): GraphNode[] => 
  starshipIds.map((starshipId, index) => ({
    id: `starship-${starshipId}`,
    data: { label: `Starship ${starshipId}` },
    position: { x: 160 * (index + 1), y: 360 },
    type: 'default',
  }));

export const createFilmEdges = (heroId: number, filmIds: number[]): GraphEdge[] =>
  filmIds.map((filmId) => ({
    id: `hero-film-${filmId}`,
    source: `hero-${heroId}`,
    target: `film-${filmId}`,
    type: 'smoothstep',
  }));

export const createStarshipEdges = (filmIds: number[], starshipIds: number[]): GraphEdge[] => 
  filmIds.flatMap((filmId) =>
    starshipIds.map((starshipId) => ({
      id: `film-starship-${filmId}-${starshipId}`,
      source: `film-${filmId}`,
      target: `starship-${starshipId}`,
      type: 'smoothstep',
    }))
  );
