import * as graphql from 'prettier/parser-graphql';
import * as prettier from 'prettier/standalone';

interface PrettierOptions {
  printWidth: number;
  tabWidth: number;
  useTabs: boolean;
}

export function prettify(query: string, options: PrettierOptions) {
  return prettier.format(query, {
    ...options,
    parser: 'graphql',
    plugins: [graphql],
  });
}
