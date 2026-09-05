const paths: Record<string, React.ReactNode> = {
  sword: (
    <>
      <path d="M5 19L15.5 8.5M15.5 8.5L19 5l-3.5 1L14 8.5l1.5 1.5z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 19l-1.5 2.5M5 19l2.5-1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 11l2 2" strokeLinecap="round" />
    </>
  ),
  axe: (
    <>
      <path d="M14 4c3 0 5.5 2.2 5.5 5.2 0 2.4-1.7 4-3.8 4.7L14 15" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 4c-2.6.3-4.6 1.9-5 4.4-.2 1.4.2 2.6 1 3.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.5 12.5L5 20" strokeLinecap="round" />
    </>
  ),
  heart: (
    <path
      d="M12 20s-7-4.4-9.3-8.8C1.3 8 2.7 5 6 5c2 0 3.3 1.1 4 2.4C10.7 6.1 12 5 14 5c3.3 0 4.7 3 3.3 6.2C15 15.6 12 20 12 20z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  potion: (
    <>
      <path d="M10 3h4M11 3v4.2L7.5 13c-1 1.7-.3 4 2 4h5c2.3 0 3-2.3 2-4L13 7.2V3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="15.5" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  portal: (
    <>
      <rect x="5" y="4" width="14" height="16" rx="1.5" strokeLinejoin="round" />
      <ellipse cx="12" cy="12" rx="4" ry="6" />
    </>
  ),
  grass: (
    <>
      <path d="M5 20V14c0-2 1.5-3.5 3-4" strokeLinecap="round" />
      <path d="M9.5 20v-8c0-2 1.5-3.5 3-4.5" strokeLinecap="round" />
      <path d="M14 20v-6c0-2.2 1.6-3.8 3.5-4.6" strokeLinecap="round" />
      <path d="M18 20v-4" strokeLinecap="round" />
    </>
  ),
  diamond: <path d="M6 9l6-5 6 5-6 11-6-11z" strokeLinejoin="round" />,
  creeper: (
    <>
      <rect x="5" y="4" width="14" height="16" rx="1.5" strokeLinejoin="round" />
      <rect x="8" y="8" width="3" height="3" fill="currentColor" stroke="none" />
      <rect x="13" y="8" width="3" height="3" fill="currentColor" stroke="none" />
      <path d="M9 15h6v3l-2 2h-2l-2-2z" fill="currentColor" stroke="none" />
    </>
  ),
  mace: (
    <>
      <path d="M12 2.5l2 2-2 2-2-2z" fill="currentColor" stroke="none" />
      <rect x="8.5" y="6" width="7" height="6.5" rx="1.5" strokeLinejoin="round" />
      <path d="M10.5 9h3M12 7.5v3.5" strokeLinecap="round" />
      <path d="M12 12.5V20" strokeLinecap="round" />
      <path d="M9 20h6" strokeLinecap="round" />
    </>
  ),
  crystal: (
    <>
      <path d="M12 3l5 4.2-2.1 10L12 21l-2.9-3.8L7 7.2z" strokeLinejoin="round" />
      <path d="M12 3v18M7 7.2h10M9.1 17.2h5.8" strokeLinecap="round" />
    </>
  ),
  spearmace: (
    <>
      <path d="M4.5 19.5L15.5 8.5" strokeLinecap="round" />
      <path d="M15.5 8.5l1.8-1.8 1.8 1.8-1.8 1.8z" strokeLinejoin="round" />
      <path d="M5.5 18.5l-1.7 1.7" strokeLinecap="round" />
    </>
  ),
  trophy: (
    <>
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 14v3M9 20h6M10 17h4v3h-4z" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

export default function GamemodeIcon({
  icon,
  className = "w-4 h-4",
}: {
  icon: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className={className}
    >
      {paths[icon] ?? paths.sword}
    </svg>
  );
}
