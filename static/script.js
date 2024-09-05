document.getElementById('encryptButton').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const address = document.getElementById('address').value;

    const patientData = {
        Name: name,
        Age: age,
        Address: address
    };

    // Send data to the server for shuffling
    fetch('/encrypt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: patientData })
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById('encryptionResult').style.display = 'block';
        document.getElementById('encryptedData').textContent = JSON.stringify(result.encrypted_data, null, 2);
        document.getElementById('originalData').textContent = JSON.stringify(patientData, null, 2);
    });
});

document.getElementById('decryptButton').addEventListener('click', () => {
    const originalData = JSON.parse(document.getElementById('originalData').textContent);
    const encryptedData = JSON.parse(document.getElementById('encryptedData').textContent);

    // Send the encrypted and original data back to the server for "decryption"
    fetch('/decrypt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ encrypted_data: encryptedData, original_data: originalData })
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById('decryptionResult').style.display = 'block';
        document.getElementById('decryptedData').textContent = JSON.stringify(result.decrypted_data, null, 2);
    });
});
