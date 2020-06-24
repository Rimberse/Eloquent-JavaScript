const log = string => console.log(string);

// Creating a Regular Expression
const re1 = new RegExp('eighteen\\+');
const re2 = /eighteen\+/;


// Testing for Matches
log(re1.test('seighteen+--'));           // true
log(re2.test('eighteen+-+'));            // true
log(/eighteen\+/.test('18+'));           // false


// Sets of Characters
/*
    \d  - Any digit character
    \w  - An alphanumeric character ("word character")
    \s  - Any whitespace character (space, tab, newline and similar)
    \D  - A character that is NOT a digit
    \W  - A NONalphanumeric character
    .   - ANY character except for newline
    ^   - Invert set of characters
    +   - Repeats more than once
    *   - Similar to '+', but also allows to match zero times
    ?   - Makes a part of a pattern optional, may occur zero on one time
    {4} - Should occur precise numbers of times (4 in this case). {2,4} - at least twice, at most four times. {5,} - five or more times.
    ()  - Grouping
    /i  - Makes regex case insensitive
    ^   - Matches the start of the input string
    $   - Matches the end of the input string
    \b  - Matches a word boundary from the start to end
    |   - Pipe character. Chooses from one of the regular expressions
    /g   - All matches
*/

const dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/;
log(dateTime.test('01-30-2003 15:20'));     // true
log(dateTime.test('30-jan-2003 15:20'));    // false

const notBinary = /[^01]/;
log(notBinary.test('1100100010100110'));    // false
log(notBinary.test('1100100010200110'));    // true


// Repeating Parts of a Pattern
log(/'\d+'/.test("'123'"));                 // true
log(/'\d+'/.test("''"));                    // false
log(/'\d*'/.test("'123'"));                 // true
log(/'\d*'/.test("''"));                    // true

const neighbor = /neighbou?r/;
log(neighbor.test('neighbour'));            // true
log(neighbor.test('neighbor'));             // true

const dateTime2 = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
log(dateTime2.test('1-30-2003 8:45'));      // true


// Grouping Subexpressions
const cartoonCrying = /boo+(hoo+)+/i;
log(cartoonCrying.test('Boohoooohoohoo'));  // true


// Matches and Groups
const match = /\d+/.exec('one two 100');
log(match);
log(match.index);

// String method, behaves similarly as above
console.log('one two 100'.match(/\d+/));

const quotedText = /'([^']*)'/;
log(quotedText.exec("she said 'hello'"));

log(/bad(ly)?/.exec('bad'));
log(/(\d)+/.exec('123'));


// The Date Class
log(new Date());
log(new Date(2009, 11, 9));
log(new Date(2009, 11, 9, 12, 59, 59, 999));
log(new Date(2013, 11, 19).getTime());
log(new Date(1387407600000));

const getDate = string => {
    const [_, month, day, year] = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
    return new Date(year, month - 1, day);
};

log(getDate('1-30-2003'));


// Word and String Boundaries
log(/cat/.test('concatenate'));         // true
log(/\bcat\b/.test('concatenate'));     // false


// Choice Patterns
const animalCount = /\b\d+ (pig|cow|chicken)s\b/;
log(animalCount.test('15 pigs'));           // true
log(animalCount.test('15 pigchickens'));    // false
log(animalCount.test('37 pigpigs'));        // false


// The replace method
log('papa'.replace('p', 'm'));
log('Borobudur'.replace(/[ou]/, 'a'));
log('Borobudur'.replace(/[ou]/g, 'a'));

log('Liskov, Barbara\nMcCarthy, John\nWadler, Philip'.replace(/(\w+), (\w+)/g, '$2 $1'));

const s = 'the cia and fbi';
log(s.replace(/\b(fbi|cia)\b/g, str => str.toUpperCase()));

const stock = '1 lemon, 2 cabbages, and 101 eggs';

const minusOne = (match, amount, unit) => {
    amount = Number(amount) - 1;

    if (amount == 1) {
        unit = unit.slice(0, unit.length - 1);
    } else if (amount == 0) {
        amount = 'no';
    }

    return amount + ' ' + unit;
};

console.log(stock.replace(/(\d+) (\w+)/g, minusOne));


// Greed
const stripComments = code => code.replace(/\/\/.*|\/\*[^]*\*\//g, '');

log(stripComments('1 + /* 2 */3'));             // 1 + 3
log(stripComments('x = 10;// ten!'));           // x = 10
log(stripComments('1 /* a */+/* b */ 1'));      // 1 1

const stripCommentsV2 = code => code.replace(/\/\/.|\/\*[^]*?\*\//g, '');

log(stripCommentsV2('1 /* a */+/* b */ 1'));    // 1 + 1


// Dynamically Creating RegExp Objects
const name = 'harry';
const text = 'Harry is a suspicious character.';
const regexp = new RegExp('\\b(' + name + ')\\b', 'gi');
log(text.replace(regexp, '_$1_'));

const name2 = 'dea+hl[]rd';
const text2 = 'This dea+hl[]rd guy is super annoying.';
const escaped = name2.replace(/[\\[.+*?(){|^$]/g, '\\$&');
const regexp2 = new RegExp('\\b' + escaped + '\\b', 'gi');
log(text2.replace(regexp2, '_$&_'));


// The search method
log('  word'.search(/\S/));
log('    '.search(/\S/));


// The lastIndex property
const pattern = /y/g;
pattern.lastIndex = 3;
const match2 = pattern.exec('xyzzy');
log(match2.index);                      // 4
log(pattern.lastIndex);                 // 5

const global = /abc/g;
log(global.exec('xyz abc'));            // ['abc']
const sticky = /abc/y;
log(sticky.exec('xyz abc'));            // null

const digit = /\d/g;
log(digit.exec('here it is: 1'));       // ['1']
log(digit.exec('and now: 1'));          // null

log('Banana'.match(/an/g));             // ['an', 'an']


// Looping over matches
const input = 'A string with 3 numbers in it... 42 and 88.';
const number = /\b\d+\b/g;
let match3;

while(match3 = number.exec(input)) log('Found ' + match3[0] + ' at ' + match3.index);


// Parsing an INI File
const parseINI = string => {
    // Start with an object to hold the top-level fields
    let result = {};
    let section = result;

    string.split(/\r?\n/).forEach(line => {
        let match;

        if (match = line.match(/^(\w+)=(.*)$/)) {
            section[match[1]] = match[2];
        } else if (match = line.match(/^\[(.*)\]$/)) {
            section = result[match[1]] = {};
        } else if (!/^\s*(;.*)?$/.test(line)) {
            throw new Error('Line "' + line + '" is not valid.');
        }
    });

    return result;
};

log(parseINI(`
name=Vasilis
[address]
city=Tessaloniki`));