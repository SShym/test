export interface GraphNode {
  id: string;
  data: { label: string };
  position: { x: number; y: number };
  type: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: string;
}
