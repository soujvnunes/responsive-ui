const KEY_DEFAULT = "DEFAULT";

type MediaDefault = typeof KEY_DEFAULT;

function generate<
  NestedObjects extends Record<string, string>,
  Objects extends Record<string, string | NestedObjects>,
  Medias extends `@media (${string}: ${string})`
>(
  factoryTheme:
    | {
        [KEY_DEFAULT]: Objects;
      }
    | Record<
        Medias,
        {
          [Key in keyof Objects]?:
            | Objects[Key]
            | {
                [NestedKey in keyof NestedObjects]?: NestedObjects[NestedKey];
              };
        }
      >,
  aliases?: {
    [key in Medias]?: string;
  }
) {
  const medias = Object.keys(factoryTheme) as (Medias | MediaDefault)[];

  return {
    theme: {
      screen: medias.reduce((screen, media) => {
        const hasAliasByMedia = media.match(/:\s?\w+/);

        if (media !== KEY_DEFAULT && hasAliasByMedia) {
          const aliasByUser = aliases?.[media];
          const aliasByMedia = hasAliasByMedia[0].replace(/:\s?/, "");

          return {
            ...screen,
            [aliasByUser || aliasByMedia]: media,
          };
        }

        return screen;
      }, {}),
    },
    customProperties: {},
  };
}

export default Object.assign(
  {},
  {
    generate,
  }
);
