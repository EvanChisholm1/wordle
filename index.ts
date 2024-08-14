const words = (await Bun.file("words.txt").text()).split("\n");
const hiddenWord = words[Math.floor(Math.random() * words.length)];
const correctChars = hiddenWord.split("");
const tries: string[] = [];

const keepGoing = () =>
    tries.length >= 5 || tries.at(-1) === hiddenWord ? false : true;

const red = (text: string) => `\x1b[31m${text}\x1b[0m`;
const yellow = (text: string) => `\x1b[33m${text}\x1b[0m`;
const green = (text: string) => `\x1b[32m${text}\x1b[0m`;

const printValidity = (guess: string) =>
    guess
        .split("")
        .map((x, i) =>
            x === correctChars[i]
                ? green(x)
                : correctChars.includes(x)
                ? yellow(x)
                : x
        )
        .join(" ");

while (keepGoing()) {
    console.log("guesses left:", 5 - tries.length);
    const guess = prompt("enter a five letter word you would like to guess:")!;

    if (guess.length !== 5 || !words.includes(guess)) {
        console.log("you did not input a valid word try again");
        continue;
    }

    tries.push(guess);
    console.log(printValidity(guess));
}

console.log(
    tries.at(-1) === hiddenWord
        ? `congrats you win, the correct word is ${green(hiddenWord)}`
        : `sorry you lost the correct word is ${red(hiddenWord)}`
);
