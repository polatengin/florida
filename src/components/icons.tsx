import { FunctionComponent } from "react";

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const ChartIcon: FunctionComponent<IconProps> = (props: IconProps) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={props.style} className={props.className} onClick={props.onClick}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
  </svg>
);
export const FireIcon: FunctionComponent<IconProps> = (props: IconProps) => (
  <svg fill="#d08fff" viewBox="0 0 24 24" stroke="currentColor" style={props.style} className={props.className} onClick={props.onClick}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
  </svg>
);
