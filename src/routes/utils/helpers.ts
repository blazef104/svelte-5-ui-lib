import { type Component } from 'svelte';

export function removeHyphensAndCapitalize(str: string) {
  // Handle empty string or strings without '-'
  if (!str || !str.includes('-')) {
    return str;
  }

  // Capitalize the first letter (including after hyphens)
  const capitalized = str.replace(/(^|\s|-)\w/g, (match: string) => match.toUpperCase());

  // Remove hyphens and ensure spaces after words
  return capitalized.replace(/-|\s{2,}/g, ' ');
}

export function splitAndCapitalize(text: string) {
  // Split the string using '/' as the delimiter
  const parts = text.split('/');

  // If there are no parts, return an empty string
  if (!parts.length) return '';

  // Get the last element of the array and capitalize it
  return parts[parts.length - 1].charAt(0).toUpperCase() + parts[parts.length - 1].slice(1);
}

/**
 * Capitalizes the first letter of a given string.
 *
 * @param {string} str - The input string.
 * @return {string} The input string with the first letter capitalized.
 */
export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log('Text copied to clipboard');
    })
    .catch((err) => {
      console.error('Failed to copy: ', err);
      throw err; // Re-throw the error so the caller can handle it if needed
    });
}

export function toUpperSnakeCase(text: string): string {
  // replace spaces and - to _ and convert to uppercase
  return text.replace(/[\s-]/g, '_').toUpperCase();
}

export const isOverflow = (markdown: string, modules: Record<string, any>): boolean => {
  const markdownLines = modules[`./md/${markdown}`];
  const lines = markdownLines.split('\n');
  return lines.length > 7;
};

export const isGeneratedCodeOverflow = (code: string): boolean => {
  const lines = code.split('\n');
  return lines.length > 7;
};

export const isSvelteOverflow = (markdown: string, exampleModules: Record<string, any>): boolean => {
  const markdownLines = exampleModules[`./examples/${markdown}`];
  const lines = markdownLines.split('\n');
  return lines.length > 7;
};

export const isContentOverflow = (
  filename: string,
  modules: Record<string, any>,
  options: {
    lineLimit?: number;
    basePath?: string;
  } = {}
): boolean => {
  const { lineLimit = 7, basePath = './md/' } = options;

  const fullPath = `${basePath}${filename}`;
  const content = modules[fullPath];

  if (!content) {
    console.warn(`File not found: ${fullPath}`);
    return false;
  }

  const lines = content.split('\n');
  return lines.length > lineLimit;
};

import { fileList } from '../../generatedFileList';

export function getFilteredFileNames(dirName: string): string[] {
  const filteredPaths = fileList.filter((path) => path.includes(dirName));
  const fileNames = filteredPaths.map((path) => {
    const parts = path.split('/');
    const fileNameWithExtension = parts[parts.length - 1];
    const fileNameWithoutExtension = fileNameWithExtension.substring(0, fileNameWithExtension.lastIndexOf('.'));

    return fileNameWithoutExtension;
  });

  return fileNames;
}

export function replaceLibImport(componentString: string): string {
  return componentString.replace(/from '\$lib'/g, "from 'svelte-5-ui-lib'");
}

export function getExampleFileName(selectedExample: string, exampleArr: { name: string }[]): string {
  const foundExample = exampleArr.find((example) => example.name === selectedExample);

  if (!foundExample) {
    // If the selectedExample is not in the array, default to the first example
    selectedExample = exampleArr[0].name || '';
  }

  // Convert the selected example to PascalCase
  const result = selectedExample
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');

  return `${result}.svelte`;
}

// export const renderExampleComponent = (selectedExample: string, ExampleComponents: any) => {
//   const pascalCaseExample = selectedExample
//     .split(' ')
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join('');

//   return ExampleComponents[pascalCaseExample];
// };
