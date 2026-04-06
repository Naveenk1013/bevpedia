Performance Analysis Report: Bevpedia.in

This report provides a detailed analysis of the current performance metrics for Bevpedia based on the provided Lighthouse data. The current performance score is 28/100, which indicates significant room for optimization, particularly regarding interactivity and load speeds.

📊 Core Web Vitals Summary
Metric	Value	Status	Impact
Performance Score	28	🔴 Poor	Overall user experience is degraded.
First Contentful Paint (FCP)	4.7s	🔴 Poor	Initial render is slow.
Largest Contentful Paint (LCP)	7.6s	🔴 Poor	Main content takes too long to appear.
Total Blocking Time (TBT)	24,040ms	🔴 Critical	The page is unresponsive for a very long time during load.
Speed Index (SI)	11.1s	🔴 Poor	Visual progress of the page is slow.
Cumulative Layout Shift (CLS)	0	🟢 Good	The page layout is stable (No shifting).
🔍 Critical Issues Identified
1. Excessive Main-Thread Work (TBT: 24s)
The most critical issue is the Total Blocking Time, which is exceptionally high at 24 seconds.

Cause: The main thread is tied up for 39.5s, mostly by "Other" processes and "Script Evaluation".
Source: HomePage-CINvQ8bi.js and vendor-ixlOJRZh.js are responsible for multiple long tasks (some >280ms).
Impact: Users cannot interact with the page (click, scroll, type) during the loading phase.
2. Unoptimized Image Delivery
The newly added contributor section and other assets are significantly bloating the page size.

File Formats: Many images are in PNG/JPG format. Converting these to WebP or AVIF could save over 500 KB.
Scaling: Images like Chanchreek_sharma.png are being loaded at 226x228 but displayed at 105x111. This "oversizing" wastes bandwidth.
Lazy Loading: While loading="lazy" is present, the sheer number of simultaneous requests for these images at once (in a marquee) might be impacting performance.
3. Render-Blocking Resources
External Assets: The main CSS (index.css) and Google Fonts are blocking the initial render.
Chained Requests: The browser has to fetch the HTML, then the CSS/Fonts, then the actual font files, creating a "chain" that delays the first paint.
4. Unused JavaScript
Significant portions of graphics-CJHaBxMm.js and vendor-ixlOJRZh.js are not being used on the initial page load.
This suggests that the "heavy" graphics/animations might be bundled together or loaded prematurely.

🚀 Recommended Optimization Strategies

🛠 Phase 1: Quick Wins (High Impact, Low Effort)
Image Optimization:
Convert all contributor PNGs to WebP.
Resize images to their actual display dimensions (e.g., max 150px width for thumbnails).
Font Optimization:
Host fonts locally or use font-display: swap to prevent text being invisible during load.
Use preconnect for font origins (partially implemented, but needs refinement).

🏗 Phase 2: Architectural Improvements
Code Splitting:
Use React.lazy() for components that aren't immediately visible (like the Contributor Marquee or lower sections).
Break down the large graphics bundle into smaller, on-demand modules.
Optimize Heavy Components:
The ShinyText and LightPillar components appear to be heavy. Consider simplifying them or ensuring they don't block the main thread.
Third-Party Scripts:
Audit the impact of Google AdSense and GTM. Consider "lazy-loading" ads so they only initialize after the main content has rendered.

🧪 Phase 3: Advanced Optimization
Resource Hints: Implement preload for critical JS/CSS assets.
Inlining Critical CSS: Manually inline the CSS required for the "above-the-fold" content directly into the <head> of index.html.

IMPORTANT

The 24-second Total Blocking Time is the primary bottleneck. If we fix images and fonts but don't address the JavaScript execution time, the site will still feel "frozen" to users during load. Improving this should be the top priority.

Extra : Non conanical pages in xml sitemap