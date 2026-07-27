export const escapeCsvCell = (value) => {
  let text = String(value ?? "");
  if (/^[\u0000-\u0020]*[=+\-@]/u.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
};

