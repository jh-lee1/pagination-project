export function isNumber(variable: any): variable is number {
  return typeof variable === 'number' && !isNaN(variable);
}

export function isString(variable: any): variable is string {
  return typeof variable === 'string';
}
