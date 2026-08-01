# 🛒 CVS ExtraCare Auto-Coupon Clipper

A lightweight JavaScript bookmarklet that automatically scrolls through your CVS ExtraCare deals page and clips every available **"Send to card"** coupon with one click.

---

## 🚀 Quick Install (Bookmarklet)

1. Show your Chrome Bookmarks Bar (`Ctrl + Shift + B` or `Cmd + Shift + B`).
2. Right-click the Bookmarks Bar → **Add Page...**
3. Set **Name** to: `Clip CVS Coupons`
4. Set **URL** to the snippet below:

```javascript
javascript:(async()=>{let lastHeight=0;while(document.body.scrollHeight>lastHeight){lastHeight=document.body.scrollHeight;window.scrollTo(0,document.body.scrollHeight);await new Promise(r=>setTimeout(r,1000));}window.scrollTo(0,0);await new Promise(r=>setTimeout(r,500));const targets=Array.from(document.querySelectorAll('[aria-label*="Send to card"], button, [role="button"]')).filter(el=>{const label=el.getAttribute('aria-label')||'';const text=el.innerText||'';return label.toLowerCase().includes('send to card')||text.toLowerCase().includes('send to card');});const uniqueButtons=[...new Set(targets)];for(let i=0;i<uniqueButtons.length;i++){uniqueButtons[i].click();await new Promise(r=>setTimeout(r,500));}console.log('Done clipping!');})();
```

---

## 📖 How to Use

1. Log in to your CVS account and navigate to the **[Deals & Rewards](https://www.cvs.com/extracare/home/alloffer)** page.
2. Click **Clip CVS Coupons** in your bookmarks bar.
3. Watch it auto-scroll to load all deals and clip them automatically!

---

## 🛠️ How It Works

- **Lazy-Load Handler:** CVS uses infinite/lazy scrolling. The script scrolls down the page in 1-second intervals until all dynamic elements land in the DOM.
- **Selector Precision:** Targets accessibility labels (`aria-label`) and button states rather than fragile CSS classes to survive site updates.
- **Throttling:** Implements a 500ms delay between clicks to ensure backend API requests settle cleanly.
