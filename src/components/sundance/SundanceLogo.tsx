type SundanceLogoProps = {
  className?: string;
};

export function SundanceLogo({ className }: SundanceLogoProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={className}
    >
      <circle cx="32" cy="32" r="30" fill="#d9a441" />
      <circle cx="32" cy="32" r="22" fill="#ebc15a" />
      <path
        fill="#2a3b30"
        d="M32 18c-1.4 0-2.6.8-3.2 2.1-.4.9.1 1.7 1 2 .4.1.7.5.7 1v3.2c-4.2.8-7.5 4.4-7.5 8.8v8.4c0 .6.4 1 1 1h2.2v4.2c0 .6.4 1 1 1h2.4c.6 0 1-.4 1-1V44h2.8v5.7c0 .6.4 1 1 1h2.4c.6 0 1-.4 1-1V44h2.2c.6 0 1-.4 1-1v-8.4c0-4.4-3.3-8-7.5-8.8V23.1c0-.5.3-.9.7-1 .9-.3 1.4-1.1 1-2C34.6 18.8 33.4 18 32 18Z"
      />
    </svg>
  );
}
