# Tailwind PostCSS bug

Since `@tailwindcss/postcss@4.1.2` (most likely commit [`60b0da9`](https://github.com/tailwindlabs/tailwindcss/commit/60b0da90cee9e71a2d3117053cc4cc2d6e9196fe)), the CSS function `color-mix` resolves unexpectedly when multiple pseudo-classes with `before` or `after` pseudo-elements are defined in a single selector.

For example:

```css

/* Excerpt: see src/app/globals.css for full definitions */

@utility -bg-color {
  background-color: color-mix(in srgb, var(--hover, var(--fg)) 50%, var(--bg));
}

.together {
  &:focus-visible::before,
  &:hover::before {
    /* Unexpectedly resolves to: var(--hover,var(--fg)) */
    @apply -bg-color;
  }
}

.separate {
  /* Both resolve correctly: color-mix(in srgb,var(--hover,var(--fg))50%,var(--bg)) */
  &:focus-visible::before {
    @apply -bg-color;
  }
  &:hover::before {
    @apply -bg-color;
  }
}
```

- This only seems to happen during production builds: `npm run build && npm run start`.
- It only affects `@tailwindcss/postcss@4.1.2` and later - doing the same thing on `4.1.1` works as expected.
