import React, { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"div">;
export default function Home() {
  const cssVariables = [
    "[--fg:green] [--bg:blue]",
    "[--hover:red] [--bg:blue]",
    "[--hover:red] [--fg:green] [--bg:blue]",
  ];

  return (
    <main className="space-y-8">
      <div className="max-w-[60ch] mx-auto">
        <p>
          First row shows the CSS variables defined and the expected color in
          the background.
        </p>
        <p>
          Second row shows correct background color on hover, with pseudo-class
          selectors defined separately. See <code>.separate</code> class.
        </p>
        <p>
          Third row shows unexpected background color on hover, with
          pseudo-class selectors defined in same rule. See{" "}
          <code>.together</code> class.
        </p>
      </div>
      <div className="grid gap-2 grid-flow-col grid-rows-3 *:p-2 space-y-2">
        {cssVariables.map((it) => (
          <React.Fragment key={it}>
            <Expected className={it}>{it}</Expected>
            <Separate className={it}></Separate>
            <Together className={it}></Together>
          </React.Fragment>
        ))}
      </div>
    </main>
  );
}

const classes = (...cls: (string | undefined)[]) =>
  cls.filter(Boolean).join(" ");

const Together = ({ className, ...rest }: Props) => (
  <Item className={classes(className, "together")} {...rest}>
    together: broken
  </Item>
);

const Separate = ({ className, ...rest }: Props) => (
  <Item className={classes(className, "separate")} {...rest}>
    separate: ok
  </Item>
);

const Expected = ({ className, children, ...rest }: Props) => (
  <Item className={classes(className, "expected")} {...rest}>
    Expected: {children}
  </Item>
);

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
