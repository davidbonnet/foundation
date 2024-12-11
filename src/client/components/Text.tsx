import type { ComponentChildren } from "../dependencies/types";

export type TextProps = {
  children: ComponentChildren;
};

export function Text({ children }: TextProps) {
  return <p>{children}</p>;
}
