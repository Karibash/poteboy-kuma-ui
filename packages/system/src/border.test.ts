import { border, BorderProps } from "./border";
import { describe, expect, test, beforeEach } from "@jest/globals";

describe("border utility function", () => {
  // Arrange
  const testCases: Array<[BorderProps, string, string]> = [
    [{ borderRadius: 1 }, "border-radius: 1px;", ""],
    [{ borderWidth: "20px" }, "border-width: 20px;", ""],
  ];

  test.each(testCases)(
    "should return the correct CSS styles for the given BorderProps",
    (props, expectedStyles, expectedMediaStyle) => {
      // Act
      const styles = border(props);
      const mediaString = Object.entries(styles.media)
        .map(
          ([breakpoint, css]) => `@media (min-width: ${breakpoint}) {${css}}`
        )
        .join("");
      // Asert
      expect(styles.base.replace(/\s/g, "")).toBe(
        expectedStyles.replace(/\s/g, "")
      );
      expect(mediaString.replace(/\s/g, "")).toBe(expectedMediaStyle);
    }
  );

  test("should only generate styles for valid BorderKeys", () => {
    // Arrange
    const invalidProps = {
      invalid: 8,
      invalid2: "8px",
    };

    // Act
    const style = border(invalidProps as any);
    expect(style.base.replace(/\s/g, "")).toBe("".replace(/\s/g, ""));
  });
});
