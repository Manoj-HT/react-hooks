export const notRequired = (value: string) => true

export const minLength = (minLength : number) => (value: string) => value.length >= minLength

export const maxLength = (maxLength : number) => (value: string) => value.length >= maxLength

export const pattern = (pattern : string | RegExp) => (value : string) => new RegExp(pattern).test(value)

export function emailValidation(value: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

export function passwordValidation(
  minLength: number,
  maxLength: number,
  specialChars: string,
  requireUppercase: boolean
) {
  let specialCharsPattern = specialChars
    .split("")
    .map((char) => `\\${char}`)
    .join("");
  let uppercasePattern = requireUppercase ? "(?=.*[A-Z])" : "";
  let specialCharsPatternPart = specialChars
    ? `(?=.*[${specialCharsPattern}])`
    : "";
  const regexPattern = `^${uppercasePattern}${specialCharsPatternPart}.{${minLength},${maxLength}}$`;
  return (value: string) => new RegExp(regexPattern).test(value);
}
