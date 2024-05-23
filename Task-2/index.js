function movingShift(s, shift) {
    const encoded = encodeString(s, shift);
    return splitIntoParts(encoded, 5);
}

function encodeString(s, initialShift) {
    const n = s.length;
    let encoded = '';

    for (let i = 0; i < n; i++) {
        const shift = initialShift + i;
        encoded += shiftChar(s[i], shift);
    }

    return encoded;
}

function shiftChar(char, shift) {
    if (char >= 'a' && char <= 'z') {
        const base = 'a'.charCodeAt(0);
        return String.fromCharCode((char.charCodeAt(0) - base + shift) % 26 + base);
    } else if (char >= 'A' && char <= 'Z') {
        const base = 'A'.charCodeAt(0);
        return String.fromCharCode((char.charCodeAt(0) - base + shift) % 26 + base);
    } else {
        return char;
    }
}

function splitIntoParts(s, numParts) {
    const n = s.length;
    const baseLength = Math.ceil(n / numParts);
    const parts = Array(numParts).fill('');
    let start = 0;

    for (let i = 0; i < numParts; i++) {
        const length = i < n % numParts ? baseLength : baseLength - 1;
        parts[i] = s.substr(start, length);
        start += length;
    }

    return parts;
}

// Example usage:
const s = "I should have known that you would have a perfect answer for me!!!";
const shift = 1;
console.log(movingShift(s, shift));

// Output: ["J vltasl rlhr ", "zdfog odxr ypw", " atasl rlhr p ", "gwkzzyq zntyhv", " lvz wp!!!"]
