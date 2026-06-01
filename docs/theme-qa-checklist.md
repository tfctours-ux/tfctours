# TFC Tours · Theme QA Checklist

Run through this checklist for every release that touches theming,
UI components, or layout. Cover both themes (light + dark) and
both locales (en + ur) for each scenario.

## Pre-flight

- [ ] Cleared localStorage (incognito session) — site loads in LIGHT mode by default
- [ ] No theme flash on hard refresh (Cmd+Shift+R / Ctrl+F5)
- [ ] No theme flash on first paint after navigating between pages
- [ ] No hydration-mismatch warnings in DevTools console
- [ ] localStorage write succeeds and persists across reloads
- [ ] Setting localStorage in a second tab updates the first tab within one frame (storage event)
- [ ] Disabling JS still renders the page (light theme baseline)

## Theme toggle

- [ ] Toggle visible in desktop nav (right action cluster)
- [ ] Toggle visible in mobile drawer
- [ ] Sun icon shown when theme is dark; Moon icon shown when theme is light
- [ ] aria-label updates with state ("Switch to dark mode" / "Switch to light mode")
- [ ] role="switch" and aria-checked attributes correct
- [ ] Keyboard: Tab focus visible, Enter and Space both trigger toggle
- [ ] Icon swap animation smooth (no jank, no layout shift)
- [ ] mounted-skeleton briefly visible before icon paints (avoids CLS)

## Pages — verify in LIGHT and DARK and EN and UR (8 combinations per page)

For each of the following pages:
- / (homepage)
- /about
- /contact
- /services
- /services/ticket-booking
- /services/visit-visa
- /services/tour-packages
- /services/umrah-packages
- /services/hotel-booking
- /services/travel-insurance
- /services/work-visa
- /services/saudi-wakala
- /guides
- /guides/saudi-visa-guide
- /guides/visit-visa-guide
- /tours
- /umrah
- /tour-calculator
- /umrah-calculator

Per page checks:
- [ ] Page loads without console errors
- [ ] Background is white-ish in light, near-black in dark
- [ ] Body text contrast passes AA (aXe scan)
- [ ] All headings legible and not clipped
- [ ] No orphaned dark patches in light mode (residual brand.black)
- [ ] No orphaned light patches in dark mode (residual brand.light)
- [ ] Images load with correct alt text (or empty alt for decorative)
- [ ] Accent red and gold visible in both themes
- [ ] Focus rings visible in both themes (not invisible against light bg)

## Hero

- [ ] Slideshow plays every 6s in both themes
- [ ] Dot controls show aria-selected on the active dot
- [ ] Active dot is the only tabbable element (others tabIndex=-1)
- [ ] Theme-aware overlay gradient adapts (lighter scrim in light)
- [ ] H1 + subtitle have stable IDs (#home-h1 / #home-lede)

## Navbar + Footer

- [ ] Utility bar gradient red in both themes
- [ ] Utility-bar white text legible
- [ ] Mobile drawer opens, focus moves to first focusable
- [ ] Tab + Shift+Tab cycle within drawer (focus trap)
- [ ] Escape closes drawer, focus returns to hamburger
- [ ] Body scroll locked while drawer open

## Forms

- [ ] ContactForm submits successfully (test in both themes)
- [ ] Tour calculator: 4-step flow completes and email arrives
- [ ] Umrah calculator: 6-step flow completes and email arrives
- [ ] All inputs have visible borders and labels in light mode
- [ ] All placeholders meet contrast in both themes
- [ ] Chrome autofill keeps field background matching bg-input
- [ ] Success toast (green) and error toast (red) readable in both themes

## RTL (Urdu)

- [ ] All pages render right-to-left
- [ ] Hero copy aligns to the right
- [ ] Stats grid pinned to the right (md:right-6, not md:left-6)
- [ ] Drawer slides in from the left in RTL
- [ ] Wizard step indicators flow right-to-left
- [ ] No clipped or overlapping text in RTL
- [ ] Mixed-direction content (phone numbers, emails) wrapped in dir="ltr"

## Accessibility

- [ ] aXe DevTools: zero violations on /, /about, /contact, /tour-calculator
- [ ] All interactive elements have visible focus indicator
- [ ] All form fields have associated <label>
- [ ] All buttons have type="button" or "submit" explicitly
- [ ] Heading hierarchy: only one H1 per page, no skipped levels

## Reduced motion

- [ ] DevTools "Emulate prefers-reduced-motion: reduce" → animations
      are still acceptable (no required pause action — current spec
      is information-only; document any issues here for a follow-up)

## Performance smoke test

- [ ] Lighthouse mobile / homepage in light mode: Perf ≥ 90
- [ ] Lighthouse mobile / homepage in dark mode: Perf ≥ 90
- [ ] Slideshow images don't block initial paint

## Sign-off

- [ ] All boxes above checked
- [ ] No new console errors or warnings introduced
