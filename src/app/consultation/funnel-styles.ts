/**
 * Shared type tweaks for the /consultation funnel.
 *
 * `SectionHeader`'s `md` size is `clamp(2.25rem, 5vw, 4.5rem)`. That
 * 2.25rem (36px) floor is tuned for the marketing site's wider columns;
 * on a 375px phone it renders three-line headings that break badly, and
 * the funnel takes most of its traffic from phones.
 *
 * Lowering ONLY the floor leaves desktop untouched: above roughly a
 * 720px viewport, 5vw already exceeds the old floor, so nothing above
 * that width changes at all. Scoped to this page via a child selector
 * rather than edited in the shared component, because the rest of the
 * site has not been visually re-checked at these sizes.
 *
 * `text-balance` is the other half of the fix. Without it a heading that
 * wraps drops a single orphan word onto the last line, which is the
 * "gone to a second line and looks bad" complaint more often than the
 * font size is.
 */
export const FUNNEL_HEADING =
  "[&_h2]:text-[clamp(1.6rem,5vw,4.5rem)] [&_h2]:text-balance [&_h2]:leading-[1.08]";
