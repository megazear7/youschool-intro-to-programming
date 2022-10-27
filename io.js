import rlp from 'readline';

const rl = rlp.createInterface({
    input: process.stdin,
    output: process.stdout
});

export function ask(msg) {
    return new Promise(resolve => {
        rl.question(msg, input => resolve(input));
    });
}

export function close() {
    rl.close();
}
