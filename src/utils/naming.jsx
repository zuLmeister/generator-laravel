export function toPascalCase(str) {
  return str
    .replace(/(?:^|\s|_|-)(\w)/g, (_, c) => (c ? c.toUpperCase() : ""))
    .replace(/\s+/g, "");
}

export function toCamelCase(str) {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

export function pluralize(word) {
  if (word.endsWith("y")) {
    return word.slice(0, -1) + "ies";
  }
  if (word.endsWith("s")) {
    return word + "es";
  }
  return word + "s";
}
