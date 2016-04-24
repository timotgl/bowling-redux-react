/*
 * Clone nested array using .slice().
 */
export default function cloneArray(arr) {
  if (Array.isArray(arr)) {
    return arr.slice().map((item, index) => cloneArray(item));
  } else {
    return arr;
  }
}
