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

export const CircleIcon: FunctionComponent<IconProps> = (props: IconProps) => (
  <svg fill="#fff" viewBox="0 0 24 24" stroke="currentColor" style={props.style} className={props.className} onClick={props.onClick}>
    <circle cx="12" cy="12" r="11" />
  </svg>
);

export const InformationIcon: FunctionComponent<IconProps> = (props: IconProps) => (
  <svg fill="#fff" viewBox="0 0 24 24" stroke="currentColor" style={props.style} className={props.className} onClick={props.onClick}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
  </svg>
);

export const QuestionIcon: FunctionComponent<IconProps> = (props: IconProps) => (
  <svg fill="#fff" viewBox="0 0 24 24" stroke="currentColor" style={props.style} className={props.className} onClick={props.onClick}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
  </svg>
);

export const CheckIcon: FunctionComponent<IconProps> = (props: IconProps) => (
  <svg fill="#fff" viewBox="0 0 24 24" stroke="currentColor" style={props.style} className={props.className} onClick={props.onClick}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const OctagonIcon: FunctionComponent<IconProps> = (props: IconProps) => (
  <svg fill="#fff" viewBox="0 0 24 24" stroke="currentColor" style={props.style} className={props.className} onClick={props.onClick}>
    <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
  </svg>
);

export const Priority1Icon: FunctionComponent<IconProps> = (props: IconProps) => (
  <svg fill="#fff" viewBox="0 0 256 256" stroke="currentColor" style={props.style} className={props.className} onClick={props.onClick}>
    <circle cx="128" cy="128" r="106" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" />
    <polyline fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" points="108 99.993 132 84 132 176" />
  </svg>
);

export const Priority2Icon: FunctionComponent<IconProps> = (props: IconProps) => (
  <svg fill="#fff" viewBox="0 0 256 256" stroke="currentColor" style={props.style} className={props.className} onClick={props.onClick}>
    <circle cx="128" cy="128" r="106" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" />
    <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" d="M105.886,94.65812a24.00387,24.00387,0,1,1,42.01514,22.7605v0L104,176v-.00575h48" />
  </svg>
);

export const Priority3Icon: FunctionComponent<IconProps> = (props: IconProps) => (
  <svg fill="#fff" viewBox="0 0 256 256" stroke="currentColor" style={props.style} className={props.className} onClick={props.onClick}>
    <circle cx="128" cy="128" r="106" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" />
    <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" d="M103.99683,83.99216h48L124.00317,124a28,28,0,1,1-19.799,47.799" />
  </svg>
);


export const Priority4Icon: FunctionComponent<IconProps> = (props: IconProps) => (
  <svg fill="#fff" viewBox="0 0 256 256" stroke="currentColor" style={props.style} className={props.className} onClick={props.onClick}>
    <circle cx="128" cy="128" r="106" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" />
    <polyline fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" points="123.998 76 100 144 148 144" />
    <line x1="148" x2="148" y1="112" y2="176" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" />
  </svg>
);

export const Priority5Icon: FunctionComponent<IconProps> = (props: IconProps) => (
  <svg fill="#fff" viewBox="0 0 256 256" stroke="currentColor" style={props.style} className={props.className} onClick={props.onClick}>
    <circle cx="128" cy="128" r="106" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" />
    <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" d="M152,80H111.83477L104,128.20232a27.99935,27.99935,0,1,1,0,39.5969" />
  </svg>
);

export const Priority6Icon: FunctionComponent<IconProps> = (props: IconProps) => (
  <svg fill="#fff" viewBox="0 0 256 256" stroke="currentColor" style={props.style} className={props.className} onClick={props.onClick}>
    <circle cx="128" cy="128" r="106" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" />
    <line x1="103.751" x2="136" y1="129.99" y2="76" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" />
    <circle cx="128" cy="144" r="28" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" />
  </svg>
);

export const Priority7Icon: FunctionComponent<IconProps> = (props: IconProps) => (
  <svg fill="#fff" viewBox="0 0 256 256" stroke="currentColor" style={props.style} className={props.className} onClick={props.onClick}>
    <circle cx="128" cy="128" r="106" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" />
    <polyline fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" points="104 84 152 84 120 180" />
  </svg>
);
