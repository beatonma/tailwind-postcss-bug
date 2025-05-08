Since `@tailwindcss/postcss@4.1.2` (most likely commit [`60b0da9`](https://github.com/tailwindlabs/tailwindcss/commit/60b0da90cee9e71a2d3117053cc4cc2d6e9196fe)), the CSS function `color-mix` resolves unexpectedly when:

- multiple pseudo-element selectors are defined in a single rule: `&::before, &::after {}`, or
- a single pseudo element on multiple pseudo classes: `&:hover::before, &:focus-visible::before {}`

For example (excerpt from [src/app/globals.css](https://github.com/beatonma/tailwind-postcss-bug/blob/main/src/app/globals.css)):

```css

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
  /* The same thing with separate rules, both resolve correctly: color-mix(in srgb,var(--hover,var(--fg))50%,var(--bg)) */
  &:focus-visible::before {
    @apply -bg-color;
  }
  &:hover::before {
    @apply -bg-color;
  }
}
```

Other notes:
- Multiple pseudo classes on their own work fine: `&:focus-visible, &:hover {}`
- It only affects `@tailwindcss/postcss@4.1.2` and later - doing the same thing on `4.1.1` works as expected.
- This only seems to happen during production builds: `npm run build && npm run start` - at least on Next.js.
- The output of the Tailwind CLI works fine: `npx @tailwindcss/cli -i ./src/app/globals.css -o ./output.css` - it only seems to happen when postcss is applied.
