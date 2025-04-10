export interface ContentContainerProps {
  $align?:
    | "normal"
    | "stretch"
    | "baseline"
    | "center"
    | "flex-start"
    | "flex-end";
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
}
