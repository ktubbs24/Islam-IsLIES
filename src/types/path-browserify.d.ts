
/**
 * Type definitions for path-browserify
 * This file provides TypeScript type declarations for the path-browserify module
 */

declare module 'path-browserify' {
  /**
   * Provides all the Node.js 'path' module functionality for browsers
   */
  export function normalize(p: string): string;
  export function join(...paths: string[]): string;
  export function resolve(...pathSegments: string[]): string;
  export function isAbsolute(p: string): boolean;
  export function relative(from: string, to: string): string;
  export function dirname(p: string): string;
  export function basename(p: string, ext?: string): string;
  export function extname(p: string): string;
  export const sep: string;
  export const delimiter: string;
  export function parse(p: string): {
    root: string;
    dir: string;
    base: string;
    ext: string;
    name: string;
  };
  export function format(pathObject: {
    root?: string;
    dir?: string;
    base?: string;
    ext?: string;
    name?: string;
  }): string;

  const path: {
    normalize: typeof normalize;
    join: typeof join;
    resolve: typeof resolve;
    isAbsolute: typeof isAbsolute;
    relative: typeof relative;
    dirname: typeof dirname;
    basename: typeof basename;
    extname: typeof extname;
    sep: typeof sep;
    delimiter: typeof delimiter;
    parse: typeof parse;
    format: typeof format;
  };

  export default path;
}
