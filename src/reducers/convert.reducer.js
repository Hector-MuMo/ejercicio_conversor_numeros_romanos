const initialState = '';

const changeResult = (state = initialState, action) => {
    switch (action.type) {
        case 'CONVERT_TO_DECIMAL':
            //Create the Hash Table
            class HashTable {
                constructor(size) {
                    this.table = new Array(size);
                }

                hash(key) {
                    let hash = 0;
                    for (let i = 0; i < key.length; i++) {
                        hash = (hash + key.charCodeAt(i) * 2) % this.table.length;
                    }
                    return hash;
                }

                set(key, value) {
                    let index = this.hash(key);

                    if (!this.table[index]) {
                        this.table[index] = [];
                    }

                    this.table[index].push([key, value]);

                    return this.table;
                }

                get(key) {
                    let index = this.hash(key);

                    if (!this.table[index]) {
                        return null;
                    }

                    return this.table[index][0][1];
                }

                print() {
                    return this.table;
                }
            }

            //Asign the size and set the keys/values
            const romanHash = new HashTable(100);
            romanHash.set('I', 1);
            romanHash.set('V', 5);
            romanHash.set('X', 10);
            romanHash.set('L', 50);
            romanHash.set('C', 100);
            romanHash.set('D', 500);
            romanHash.set('M', 1000);

            //Transform roman to integer
            let integer = 0;

            for (let i = 0; i < action.payload.length; i++) {
                if (
                    i === 0 ||
                    romanHash.get(action.payload[i]) <=
                    romanHash.get(action.payload[i - 1])
                ) {
                    integer += romanHash.get(action.payload[i]);
                } else {
                    integer +=
                        romanHash.get(action.payload[i]) -
                        2 * romanHash.get(action.payload[i - 1]);
                }
            }

            //Return the roman number transform
            return integer;
        case 'CONVERT_TO_ROMAN':
            var roman = [
                ['', "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
                ['', "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"],
                ['', "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"],
                ['', "M", "MM", "MMM"]
            ];

            let decimal = roman[3][Math.floor(action.payload / 1000 % 10)] + roman[2][Math.floor(action.payload / 100 % 10)] + roman[1][Math.floor(action.payload / 10 % 10)] + roman[0][Math.floor(action.payload % 10)];

            return decimal;
        default:
            return state;
    }
};

export default changeResult;
