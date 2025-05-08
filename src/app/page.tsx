import React, { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"div">;

export default function Home() {
  const cssVariables = [
    "[--fg:green] [--bg:blue]",
    "[--hover:red] [--bg:blue]",
    "[--hover:red] [--fg:green] [--bg:blue]",
  ];

  return (
    <main className="space-y-16">
      <section>
        <Text>
          <p>
            First row shows the CSS variables defined and the expected color in
            the background.
          </p>
          <p>
            Second row shows correct background color on hover, with
            pseudo-class selectors defined separately. See{" "}
            <code>.separate</code> class.
          </p>
          <p>
            Third row shows unexpected background color on hover, with
            pseudo-class selectors defined in same rule. See{" "}
            <code>.together</code> class.
          </p>
        </Text>

        <Grid className="grid-flow-col grid-rows-3 grid-cols-[repeat(3,minmax(0,1fr))]">
          {cssVariables.map((it) => (
            <React.Fragment key={it}>
              <Item className={classes(it, "expected")}>Expected: {it}</Item>
              <Item className={classes(it, "separate")}>separate: ok</Item>
              <Item className={classes(it, "together")}>together: broken</Item>
            </React.Fragment>
          ))}
        </Grid>
      </section>

      <section>
        <Text>
          <p>
            Defining a rule with both <code>::before</code> and{" "}
            <code>::after</code> also breaks it, even without pseudo-classes:
          </p>
        </Text>

        <Grid className="grid-cols-3">
          <Item className="[--hover:red] [--bg:blue] before-and-after col-start-2">
            <code>::before, ::after {}</code>: also broken
          </Item>
        </Grid>
      </section>
    </main>
  );
}

const classes = (...cls: (string | undefined)[]) =>
  cls.filter(Boolean).join(" ");

const Item = ({ className, children, ...rest }: Props) => (
  <div
    className={classes(className, "size-full border-1")}
    tabIndex={0}
    {...rest}
  >
    <div className="text-sm bg-black/50 text-white p-1 size-fit">
      {children}
    </div>
  </div>
);

const Text = ({ className, ...rest }: Props) => (
  <div className={classes(className, "max-w-[60ch] mx-auto")} {...rest} />
);

const Grid = ({ className, ...rest }: Props) => (
  <div className={classes(className, "grid gap-2 *:p-2 space-y-2")} {...rest} />
);
