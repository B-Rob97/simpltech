export const NIGHT_SIGNAL_COVERS = [
  {
    id: "brettos",
    src: "/themes/night-signal-windows.webp",
    position: "center",
  },
  {
    id: "revolution-drilling",
    src: "/themes/night-signal-skyline.webp",
    position: "78% 60%",
  },
  {
    id: "evolving-prowess",
    src: "/themes/night-signal-street.webp",
    position: "center 40%",
  },
  {
    id: "prism",
    src: "/themes/night-signal-tower.webp",
    position: "center 15%",
  },
  {
    id: "wp-mls-ab",
    src: "/themes/night-signal-windows.webp",
    position: "80% 30%",
  },
  {
    id: "deep-set",
    src: "/themes/night-signal-skyline.webp",
    position: "20% 70%",
  },
  {
    id: "network-travel",
    src: "/themes/night-signal-street.webp",
    position: "70% 50%",
  },
  {
    id: "corn-crush",
    src: "/themes/night-signal-tower.webp",
    position: "center 40%",
  },
] as const;

export function nightSignalCover(projectId: string) {
  return (
    NIGHT_SIGNAL_COVERS.find((cover) => cover.id === projectId) ??
    NIGHT_SIGNAL_COVERS[0]
  );
}
