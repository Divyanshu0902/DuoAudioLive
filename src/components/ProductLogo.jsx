import React from 'react';

export default function ProductLogo({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={(size * 24) / 25}
      viewBox="0 0 25 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect x="0" y="7" width="4" height="10" rx="2" fill="#6371D3" />
      <rect x="7" y="0" width="4" height="24" rx="2" fill="#6573D6" />
      <rect x="14" y="4" width="4" height="16" rx="2" fill="#7885D9" />
      <rect x="21" y="9" width="4" height="6" rx="2" fill="#8C95C6" />
    </svg>
  );
}
