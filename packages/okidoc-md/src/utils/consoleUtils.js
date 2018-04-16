// NOTE: https://telepathy.freedesktop.org/doc/telepathy-glib/telepathy-glib-debug-ansi.html
const Ansi = {
  RESET: `\x1b[0m`,
  FG_GREEN: `\x1b[32m`,
  FG_CYAN: `\x1b[36m`,
};

function colorFgGreen(text) {
  return `${Ansi.FG_GREEN}${text}${Ansi.RESET}`;
}

function colorFgCyan(text) {
  return `${Ansi.FG_CYAN}${text}${Ansi.RESET}`;
}

export { colorFgCyan, colorFgGreen };
