# responsive-ui

Give it an factory theme and receive a flexible one with all CSS custom properties to be injected in the DOM the way you want.

## Example

### [React JS](https://beta.reactjs.org/) & [styled components](https://styled-components.com/)

Generate the app theme.

```tsx
import responsiveUI from "responsive-ui";

const ui = responsiveUI.generate(
  {
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
  },
  {
    "@media (min-width: 512px)": "tablet",
    "@media (min-width: 1024px)": "desktop",
  }
);

export default ui;
```

Create a [declarations file](https://styled-components.com/docs/api#create-a-declarations-file) extending the default styled components theme with the responsive UI one.

```tsx
import "styled-components";
import ui from "./ui";

type Theme = typeof ui.theme;

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
```

Import it on the top level component on your App through theme provider.

```tsx
import { 
  ThemeProvider, 
  createGlobalStyle,
  css
} from "styled-components";
import type { DefaultTheme } from "styled-components";
import ui from "./ui";

const GlobalStyle = createGlobalStyle`
  :root {
    ${css(ui.customProperties)}
  }
  body {
    margin: 0px;
    background-color: rgb(${(props) => props.theme.channel.background});
  }
`;
const Button = styled.a`
  padding-right: ${(props) => props.theme.sizing.md};
  padding-left: ${(props) => props.theme.sizing.md};
`;

export default function App() {
  return (
    <ThemeProvider theme={ui.theme}>
      <Button>Hello world</Button>
    </ThemeProvider>
  );
}
```

## [React JS](https://beta.reactjs.org/)

_soon_
