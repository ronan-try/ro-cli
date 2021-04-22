/** 字符串trimEnd, 区别于lodash.trimEnd */
export const trimOnlyEnd = (str: string, chars: string): string => {
  if (str && chars === void 0) return str;
  if (!str) return str;

  const lastIndex = str.lastIndexOf(chars);

  return str.slice(0, lastIndex);
};

// export const trimOnlyEnd = (str, chars) => {
//   if (str && chars === void 0) return str;
//   if (!str) return str;

//   const strSplit = (str + '').split(chars);

//   const result = strSplit.reduce((pre, cur, curIndex, arr) => {
//     if (arr.length === curIndex + 1) {
//       return pre;
//     }
//     if (cur === '') {
//       return pre + chars + cur;
//     }

//     return pre + cur;
//   }, '');

//   return result;
// };
