import beep from "@rollup/plugin-beep";
import buble from "@rollup/plugin-buble";
import common from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import sucrase from "@rollup/plugin-sucrase";
import autoprefixer from "autoprefixer";
import preset from "postcss-preset-env";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import vue from "rollup-plugin-vue";
import pkg from "./package.json" assert { type: "json" };
import cssnano from "cssnano";

const banner = `/*
 * ${pkg.name}
 * ${pkg.description}
 * v${pkg.version}
 * ${pkg.license} License
 */
`;

export default {
  input: "src/index.js",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      strict: true,
      banner,
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
      strict: true,
      banner,
    },
    {
      file: pkg.umd,
      format: "umd",
      exports: "named",
      strict: true,
      banner,
      name: "FloatMenu",
      globals: {
        vue: "vue",
      },
    },
  ],
  plugins: [
    vue({
      target: "browser",
      css: true,
    }),
    postcss({
      extract: "smart-tagz.css",
      plugins: [
        preset({
          stage: 0,
        }),
        autoprefixer(),
        cssnano()
      ],
    }),
    sucrase({
      exclude: ["node_modules/**"],
      transforms: ["typescript"],
    }),
    common(),
    buble(),
    beep(),
    resolve(),
    terser(),
  ],
  external: ["vue", "vue-feather-icons"],
};
