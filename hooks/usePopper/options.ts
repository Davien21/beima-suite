import { OptionsGeneric } from "@popperjs/core";

type IOptions = Partial<
  OptionsGeneric<{ name: string; options: { offset: number[] } }>
>;

export const PopperOptions = {
  bottom: {
    placement: "bottom",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 4],
        },
      },
    ],
  } as IOptions,
  top: {
    placement: "top",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 4],
        },
      },
    ],
  } as IOptions,
  "right-start": {
    placement: "right-start",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 5],
        },
      },
    ],
  } as IOptions,
};
