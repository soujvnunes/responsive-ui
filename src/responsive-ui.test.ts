import responsiveUI from "./responsive-ui";

const factoryTheme = {
  DEFAULT: {
    sizing: {
      md: "16px",
    },
    channel: {
      background: "255 255 255",
    },
    transition: {
      duration: "300ms",
    },
  },
  "@media (min-width: 512px)": {
    sizing: {
      md: "24px",
    },
  },
  "@media (min-width: 1024px)": {
    sizing: {
      md: "32px",
      lg: "64px",
    },
  },
  "@media (prefers-color-scheme: dark)": {
    channel: {
      background: "0 0 0",
    },
  },
  "@media (prefers-reduced-motion: reduce)": {
    transition: {
      duration: "none",
    },
  },
};
const aliases = {
  "@media (min-width: 512px)": "tablet",
  "@media (min-width: 1024px)": "desktop",
};

function generateStyledResponsive() {
  return responsiveUI.generate(factoryTheme, aliases);
}

it("generates theme", () => {
  const ui = generateStyledResponsive();

  expect(ui.theme).toMatchObject({
    channel: {
      background: "var(--channel-background)",
    },
    sizing: {
      md: "var(--sizing-md)",
      lg: "var(--sizing-lg)",
    },
    transition: {
      duration: "var(--transition-duration)",
    },
    screen: {
      tablet: "@media (min-width: 512px)",
      desktop: "@media (min-width: 1024px)",
      dark: "@media (prefers-color-scheme: dark)",
      reduce: "@media (prefers-reduced-motion: reduce)",
    },
  });
});
it.skip("generates custom properties", () => {
  const ui = generateStyledResponsive();

  expect(ui.customProperties).toMatchObject({
    "--sizing-md": "16px",
    "--channel-background": "255 255 255",
    "--transition-duration": "300ms",
    "@media (min-width: 512px)": {
      "--sizing-md": "24px",
    },
    "@media (min-width: 1024px)": {
      "--sizing-md": "32px",
      "--sizing-lg": "64px",
    },
    "@media (prefers-color-scheme: dark)": {
      "--channel-background": "0 0 0",
    },
    "@media (prefers-reduced-motion: reduce)": {
      "--transition-duration": "0s",
    },
  });
});
