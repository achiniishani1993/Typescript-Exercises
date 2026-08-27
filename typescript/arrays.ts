// Skill 2: Arrays & Array Methods ( map / filter )

// Doubling Ages

let ages: number[] =[ 1, 2, 3, 4, 5 ];

let agesInFiveYears: number [] = ages.map(a => a + 5);

console.log(ages);
console.log(agesInFiveYears);

// Filtering Names
let names: string[] = ["Achini", "Pramod", "Kevin", "Aryan", "Skyl", "Karl"];

let shortNames: string [] = names.filter(n => n.length <= 4);

console.log(shortNames);

// Challenge (optional) Combined Transformation

let scores: number[] = [ 20, 59, 48, 60, 78, 65, 75, 90 ];

let passScore: string [] = scores.filter(s => s >= 50).map(s => {
    if (s >= 85 ) return "A";
    if (s >= 75) return "B";
    if (s >= 65) return "C";
    if (s >= 55) return "D";
    return "E";
});

// Log the final array of letter grades
console.log(passScore);

let failedStudents : number = scores.filter(f => f <= 50).length;

console.log(failedStudents);