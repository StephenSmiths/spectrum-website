/** Reliably scroll to a homepage section after SPA mount / layout settle. */
export function scrollToId(
  id: string,
  opts: { behavior?: ScrollBehavior; maxAttempts?: number } = {},
): () => void {
  const behavior = opts.behavior ?? "smooth";
  const maxAttempts = opts.maxAttempts ?? 40;
  let attempts = 0;
  let timer = 0;

  const tryScroll = () => {
    const el = document.getElementById(id);
    if (!el) return false;
    el.scrollIntoView({ behavior, block: "start" });
    return true;
  };

  // Immediate + rAF covers already-mounted targets
  if (tryScroll()) return () => {};

  timer = window.setInterval(() => {
    attempts += 1;
    if (tryScroll() || attempts >= maxAttempts) {
      window.clearInterval(timer);
    }
  }, 50);

  return () => window.clearInterval(timer);
}
