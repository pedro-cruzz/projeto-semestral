// types.ts
import { ReactNode } from "react";

export interface CarouselProps {
  /** Lista de elementos a serem renderizados no carousel */
  items: ReactNode[];
  /** Número de itens visíveis ao mesmo tempo. Padrão: 3 */
  itemsPerView?: number;
  /** Número máximo de itens permitidos em um carousel (quando ultrapassado, cria outro abaixo). Padrão: 15 */
  maxCarouselItems?: number;
  /** Espaçamento vertical (em px) entre múltiplos carousels (quando necessário). Padrão: 20 */
  gapBetweenCarousels?: number;
}
