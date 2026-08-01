/**
 * CVS ExtraCare Auto-Clipper
 * Automatically scrolls the CVS deals page to trigger lazy loading,
 * then systematically clicks all "Send to card" buttons.
 */

(async () => {
  console.log('[CVS Clipper] Starting scroll sequence to load all coupons...');

  // 1. Smoothly scroll down until page stops expanding
  let lastHeight = 0;
  while (document.body.scrollHeight > lastHeight) {
    lastHeight = document.body.scrollHeight;
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // 2. Scroll back to top
  window.scrollTo(0, 0);
  await new Promise(resolve => setTimeout(resolve, 500));

  // 3. Find target buttons using aria-labels and element text
  const targets = Array.from(
    document.querySelectorAll('[aria-label*="Send to card"], button, [role="button"]')
  ).filter(el => {
    const label = el.getAttribute('aria-label') || '';
    const text = el.innerText || '';
    return label.toLowerCase().includes('send to card') || text.toLowerCase().includes('send to card');
  });

  const uniqueButtons = [...new Set(targets)];
  console.log(`[CVS Clipper] Found ${uniqueButtons.length} coupons to clip.`);

  // 4. Click buttons with a small delay to prevent rate limits
  for (let i = 0; i < uniqueButtons.length; i++) {
    uniqueButtons[i].click();
    console.log(`[CVS Clipper] Clipped ${i + 1} of ${uniqueButtons.length}`);
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('[CVS Clipper] Finished clipping all coupons!');
})();
