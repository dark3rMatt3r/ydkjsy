function range(start: number, end?: number) {
  start = Number(start) || 0;

  if (end === undefined) {
    return function getEnd(end: number) {
      return getRange(start, end);
    };
  } else {
    end = Number(end) || 0;
    return getRange(start, end);
  }

  function getRange(start: number, end: number) {
    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  }
}

let results = []
results.push(range(3,3));
results.push(range(3,8));
results.push(range(3,0));
console.log("********regular function********");
results.forEach( (result) => {
  console.log(result);
})

var start3 = range(3);
var start4 = range(4);

results = [];
results.push(start3(3));
results.push(start3(8));
results.push(start3(0));
console.log("********closures********");
console.log("start3")
results.forEach( (result) => {
  console.log(result);
})

results = [];
results.push(start4(6));
console.log("start4");
results.forEach( (result) => {
  console.log(result);
})

