import Tooltip from "@mui/material/Tooltip";
import { ToolTipContainer, ToolTipText } from "./styles";
import { tooltipItems } from "../../consts/tooltipItems";

export function ToolTip() {
  return (
    <ToolTipContainer>
      {tooltipItems.map((item, index) => (
        <Tooltip
          key={index}
          title={item.title}
          arrow
          slotProps={{
            tooltip: {
              sx: {
                fontSize: "1.1rem",
                backgroundColor: "#2E7D32",
                color: "white",
                padding: "20px 16px",
                borderRadius: "10px",
                maxWidth: "300px",
                boxShadow: "0px 4px 16px rgba(0,0,0,0.2)",
              },
            },
            arrow: {
              sx: {
                color: "#2E7D32",
              },
            },
          }}
        >
          <ToolTipText>{item.label}</ToolTipText>
        </Tooltip>
      ))}
    </ToolTipContainer>
  );
}

export default ToolTip;
