
export function add(a, b) {
  return a + b;
}

export function sub(a, b) {
  return a - b;
}

export function mul(a, b) {
  return a * b;
}

export function div(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}

export function sqrt(a) {
  return Math.sqrt(a);
}

export function pow(a, b) {
  return Math.pow(a, b);
}

export function sin(a) {
  return Math.sin(a);
}

export function cos(a) {
  return Math.cos(a);
}

export function tan(a) {
  return Math.tan(a);
}

export function abs(a) {
  return Math.abs(a);
}
