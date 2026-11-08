export const clamp01 = (value) => Math.min(1, Math.max(0, value));
const ramp = (t, start, length) => clamp01((t - start) / length);

// Use the measured sticky height: mobile browser chrome can change innerHeight.
export const scrollProgress = (top, sectionHeight, stickyHeight) => {
  const range = sectionHeight - stickyHeight;
  return range > 0 ? clamp01(-top / range) : 0;
};

export const entranceState = (progress, { danceDone = false, reduced = false } = {}) => {
  const t = clamp01(progress);
  const showInvite = reduced || t >= 0.94 || (danceDone && t >= 0.37);
  return {
    headingAlpha: reduced ? 1 : 1 - ramp(t, 0.015, 0.1),
    doorOpen: reduced ? 1 : ramp(t, 0.05, 0.24),
    lightAlpha: reduced ? 1 : ramp(t, 0.06, 0.18),
    visualAlpha: reduced ? 1 : 1 - ramp(t, 0.29, 0.08),
    visualScale: reduced ? 1 : 1 + ramp(t, 0.22, 0.15) * 1.8,
    danceAlpha: showInvite ? 0 : ramp(t, 0.32, 0.05),
    danceOn: !reduced && !showInvite && t >= 0.37,
    showInvite,
    resetDance: t < 0.08
  };
};
