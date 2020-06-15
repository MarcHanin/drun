/**
 * Regex for --help and -h CLI arguments
 */
export const HELP_ARGUMENT_REGEX = /^(--help|-h)$/;

/**
 * Regex for CLI arguments
 */
export const ARGUMENT_REGEX = /^--.+=.+/;

/**
 * Regex to separate argument key from value
 */
export const SPLIT_ARGUMENT_REGEX = /^--([^=]+)=([\s\S]*)$/;
