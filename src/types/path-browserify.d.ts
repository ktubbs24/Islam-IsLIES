/**
 * Type definitions for path-browserify
 * This file provides TypeScript type declarations for the path-browserify module.
 * It mimics the Node.js 'path' module functionality for use in browser environments.
 */

declare module 'path-browserify' {
  /**
   * Normalize a string path, resolving '..' and '.' segments.
   * @param p - The path to normalize.
   * @returns The normalized path.
   */
  export function normalize(p: string): string;

  /**
   * Join all given path segments together using the platform-specific separator.
   * @param paths - The path segments to join.
   * @returns The joined path.
   */
  export function join(...paths: string[]): string;

  /**
   * Resolve a sequence of paths or path segments into an absolute path.
   * @param pathSegments - The path segments to resolve.
   * @returns The resolved absolute path.
   */
  export function resolve(...pathSegments: string[]): string;

  /**
   * Determine if a path is absolute.
   * @param p - The path to check.
   * @returns True if the path is absolute, false otherwise.
   */
  export function isAbsolute(p: string): boolean;

  /**
   * Solve the relative path from one path to another.
   * @param from - The starting path.
   * @param to - The target path.
   * @returns The relative path.
   */
  export function relative(from: string, to: string): string;

  /**
   * Return the directory name of a path.
   * @param p - The path to evaluate.
   * @returns The directory name.
   */
  export function dirname(p: string): string;

  /**
   * Return the last portion of a path.
   * @param p - The path to evaluate.
   * @param ext - An optional file extension to remove.
   * @returns The base name of the path.
   */
  export function basename(p: string, ext?: string): string;

  /**
   * Return the extension of the path.
   * @param p - The path to evaluate.
   * @returns The file extension.
   */
  export function extname(p: string): string;

  /**
   * The platform-specific path segment separator.
   * ('/' on POSIX and '\\' on Windows)
   */
  export const sep: string;

  /**
   * The platform-specific path delimiter.
   * (':' on POSIX and ';' on Windows)
   */
  export const delimiter: string;

  /**
   * Parse a path into an object.
   * @param p - The path to parse.
   * @returns An object with root, dir, base, ext, and name properties.
   */
  export function parse(p: string): {
    root: string;
    dir: string;
    base: string;
    ext: string;
    name: string;
  };

  /**
   * Format a path object into a path string.
   * @param pathObject - An object with root, dir, base, ext, and name properties.
   * @returns The formatted path string.
   */
  export function format(pathObject: {
    root?: string;
    dir?: string;
    base?: string;
    ext?: string;
    name?: string;
  }): string;

  /**
   * The default export, providing all path functions and constants.
   */
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