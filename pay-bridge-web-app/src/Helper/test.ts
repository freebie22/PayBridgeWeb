const myArray: Array<string> = ["aboba", "biba", "boba"];

function* arrayYield(array: Array<string>): Generator<string, void, void> {
  for (let i = 0; i < array.length; i++) {
    yield array[i];
  }
}

const resultArray = Array.from(arrayYield(myArray));
