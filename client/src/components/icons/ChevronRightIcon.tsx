import React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export default function ChevronRightIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.5 0.75L16.22 11.47C16.2897 11.5396 16.3449 11.6222 16.3826 11.7131C16.4203 11.8041 16.4398 11.9016 16.4398 12C16.4398 12.0984 16.4203 12.1959 16.3826 12.2869C16.3449 12.3778 16.2897 12.4604 16.22 12.53L5.5 23.25"
          stroke="currentColor"
          fill="none"
          strokeOpacity="1"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}
