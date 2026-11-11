export function SocialIcon({
  name,
}: {
  name: "Gmail" | "Instagram" | "Threads" | "LinkedIn";
}) {
  if (name === "Threads")
    return (
      <img
        src="/icons/threads.svg"
        alt=""
        width="20"
        height="20"
        aria-hidden="true"
      />
    );
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {name === "Gmail" ? (
        <>
          <path fill="#4285f4" d="M2 5h4v15H2z" />
          <path fill="#34a853" d="M18 5h4v15h-4z" />
          <path fill="#ea4335" d="m2 4 10 8L22 4v5l-10 8L2 9z" />
          <path fill="#fbbc04" d="m18 7 4-3v5l-4 3z" />
        </>
      ) : name === "Instagram" ? (
        <>
          <defs>
            <linearGradient id="instagram-colors" x2="1" y2="1">
              <stop stopColor="#f9ce34" />
              <stop offset=".5" stopColor="#ee2a7b" />
              <stop offset="1" stopColor="#6228d7" />
            </linearGradient>
          </defs>
          <rect
            x="1"
            y="1"
            width="22"
            height="22"
            rx="6"
            fill="url(#instagram-colors)"
          />
          <rect
            x="5"
            y="5"
            width="14"
            height="14"
            rx="4"
            fill="none"
            stroke="white"
            strokeWidth="1.8"
          />
          <circle
            cx="12"
            cy="12"
            r="3.5"
            fill="none"
            stroke="white"
            strokeWidth="1.8"
          />
          <circle cx="17" cy="7" r="1" fill="white" />
        </>
      ) : (
        <>
          <rect x="1" y="1" width="22" height="22" rx="2" fill="#0a66c2" />
          <circle cx="6.5" cy="6.5" r="1.5" fill="white" />
          <path
            fill="white"
            d="M5 10h3v9H5zm5 0h3v1c1-2 6-2 6 3v5h-3v-5c0-2-3-2-3 0v5h-3z"
          />
        </>
      )}
    </svg>
  );
}
