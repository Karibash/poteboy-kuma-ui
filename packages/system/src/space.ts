import { toCssUnit } from "./toCSS";
import { SpaceKeys } from "./keys";
import { applyResponsiveStyles } from "./responsive";
import { CSSValue, ResponsiveStyle } from "./types";

export type SpaceProps = Partial<{
  m: CSSValue<"margin", true>;
  mt: CSSValue<"marginTop", true>;
  mr: CSSValue<"marginRight", true>;
  mb: CSSValue<"marginBottom", true>;
  ml: CSSValue<"marginLeft", true>;
  mx: CSSValue<"marginLeft" | "marginRight", true>;
  my: CSSValue<"marginTop" | "marginBottom", true>;
  p: CSSValue<"padding", true>;
  pt: CSSValue<"paddingTop", true>;
  pr: CSSValue<"paddingRight", true>;
  pb: CSSValue<"paddingBottom", true>;
  pl: CSSValue<"paddingLeft", true>;
  px: CSSValue<"paddingLeft" | "paddingRight", true>;
  py: CSSValue<"paddingTop" | "paddingBottom", true>;
}>;

const spaceMappings: Record<SpaceKeys, string> = {
  m: "margin",
  mt: "margin-top",
  mr: "margin-right",
  mb: "margin-bottom",
  ml: "margin-left",
  mx: "margin-left,margin-right",
  my: "margin-top,margin-bottom",
  p: "padding",
  pt: "padding-top",
  pr: "padding-right",
  pb: "padding-bottom",
  pl: "padding-left",
  px: "padding-left,padding-right",
  py: "padding-top,padding-bottom",
};

export const space = (props: SpaceProps): ResponsiveStyle => {
  let baseStyles = "";
  const mediaStyles: { [breakpoint: string]: string } = {};

  for (const key in spaceMappings) {
    const cssValue = props[key as SpaceKeys];
    if (cssValue) {
      const properties = spaceMappings[key as SpaceKeys].split(",");
      for (const property of properties) {
        const responsiveStyles = applyResponsiveStyles(
          property,
          cssValue,
          toCssUnit
        );
        baseStyles += responsiveStyles.base;
        for (const [breakpoint, css] of Object.entries(
          responsiveStyles.media
        )) {
          if (mediaStyles[breakpoint]) {
            mediaStyles[breakpoint] += css;
          } else {
            mediaStyles[breakpoint] = css;
          }
        }
      }
    }
  }
  return {
    base: baseStyles,
    media: mediaStyles,
  };
};
