export function firstLetterToUpperCase(string: string) {
    const subNames = string.toLowerCase().split(' ');

    for (let currentName = 0; currentName < subNames.length; currentName++) {
        subNames[currentName] =
            subNames[currentName][0].toUpperCase() +
            subNames[currentName].substring(1);
    }

    return subNames.join(' ');
}
