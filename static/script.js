document.getElementById('encryptButton').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const address = document.getElementById('address').value;
    const userKey = document.getElementById('userEncryptionKey').value; // Get user-defined encryption key

    if (!userKey) {
        alert("Please enter an encryption key!");
        return;
    }

    const patientData = {
        Name: name,
        Age: age,
        Address: address
    };

    // Send the patient data and key to the server for encryption
    fetch('/encrypt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: patientData, key: userKey })
    })
    .then(response => response.json())
    .then(result => {
        // Display the anonymized and encrypted data
        document.getElementById('anonymizationResult').style.display = 'block';
        document.getElementById('anonymizedData').textContent = JSON.stringify(result.anonymized_data, null, 2);
        document.getElementById('encryptedKey').textContent = result.encrypted_key;
        document.getElementById('originalData').textContent = JSON.stringify(result.original_data, null, 2);
    });
});

document.getElementById('decryptButton').addEventListener('click', () => {
    const enteredKey = document.getElementById('decryptionKey').value;
    const originalData = JSON.parse(document.getElementById('originalData').textContent);
    const encryptedKey = document.getElementById('encryptedKey').textContent;

    if (!enteredKey) {
        alert("Please enter the decryption key!");
        return;
    }

    // Send the encrypted data and decryption key to the server for validation
    fetch('/decrypt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            entered_key: enteredKey,
            encrypted_key: encryptedKey, 
            original_data: originalData
        })
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            // Display the decrypted original data
            document.getElementById('decryptionResult').style.display = 'block';
            document.getElementById('decryptedData').textContent = JSON.stringify(result.decrypted_data, null, 2);
        } else {
            alert(result.message);
        }
    });
});
