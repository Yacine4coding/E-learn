function ss(arr) {
  const results = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr.lastIndexOf(arr[i]) != i) continue;
    if (arr.indexOf(arr[i]) != i) continue;
    results.push(arr[i]);
  }
  return results;
}
console.log(ss([2,4,3, 6, 4, , 3, 1]));
