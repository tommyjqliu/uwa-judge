const net = require('net');

function checkPort(port, callback) {
    const client = new net.Socket();

    client.once('error', function () {
        callback(false);
    });

    client.once('connect', function () {
        client.end();
        callback(true);
    });

    client.connect(port, 'localhost');
}

const startPort = 1;
const endPort = 65535;

for (let port = startPort; port <= endPort; port++) {
    checkPort(port, (isOpen) => {
        if (isOpen) {
            console.log(`Port ${port} is open`);
        }
    });
}
