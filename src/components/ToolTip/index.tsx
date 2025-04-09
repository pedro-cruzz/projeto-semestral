import Tooltip from '@mui/material/Tooltip';
import { TooltipItem } from './types';
import { ToolTipContainer, ToolTipText } from './styles';

const tooltipItems: TooltipItem[] = [
  { title: '🧠 Auto conhecimento: Conhecer a si mesmo é o primeiro passo para qualquer mudança verdadeira. Entender suas emoções, motivações e limites te ajuda a tomar decisões mais conscientes e a lidar melhor com os desafios da vida.', label: 'Auto conhecimento' },
  { title: '⚖️ Equilíbrio emocional: Manter o equilíbrio emocional é essencial para o bem-estar. Isso significa saber reconhecer suas emoções, sem deixar que elas controlem suas ações, e cultivar serenidade mesmo em momentos difíceis.', label: 'Equilibrio emocional' },
  { title: '💚 Saúde mental: Cuidar da mente é tão importante quanto cuidar do corpo. Saúde mental envolve sentir-se bem consigo mesmo, lidar com o estresse do dia a dia, ter boas relações e buscar ajuda quando necessário.', label: 'Saúde mental' },
  { title: '🤝 Relacionamentos saudáveis: Relacionamentos saudáveis são baseados em respeito, empatia e comunicação. Ter pessoas ao nosso lado que nos apoiam e nos fazem bem é fundamental para uma vida equilibrada e feliz.', label: 'Relacionamentos saudáveis' },
  { title: '🤗 Apoio à vida: Ninguém precisa enfrentar seus desafios sozinho. O apoio à vida é sobre oferecer e buscar suporte nos momentos difíceis, promovendo acolhimento, escuta ativa e empatia.', label: 'Apoio a vida' },
  { title: '🌟 Felicidade: A felicidade vai além de momentos de alegria — ela está na construção de uma vida com propósito, gratidão, afeto e equilíbrio. É sobre encontrar sentido nas pequenas coisas do dia a dia.', label: 'Felicidade' },
];

export function ToolTip() {
  return (
    <ToolTipContainer>
      {tooltipItems.map((item, index) => (
        <Tooltip key={index} title={item.title}>
          <ToolTipText>{item.label}</ToolTipText>
        </Tooltip>
      ))}
    </ToolTipContainer>
  );
}

export default ToolTip;