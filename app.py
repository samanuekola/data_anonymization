from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

# Helper Functions
def shuffle_string(s):
    s_list = list(s)
    random.shuffle(s_list)
    return ''.join(s_list)

def shuffle_data(data):
    shuffled_data = data.copy()
    shuffled_data['Name'] = shuffle_string(data['Name'])
    shuffled_data['Address'] = shuffle_string(data['Address'])
    return shuffled_data

def encrypt_data(data):
    encrypted_data = shuffle_data(data)
    return encrypted_data

def decrypt_data(encrypted_data, original_data):
    # Since this is shuffling, decryption is technically impossible without knowing the original data.
    return original_data

@app.route('/')
def index():
    return render_template('index.html')

# API route for encryption (shuffling)
@app.route('/encrypt', methods=['POST'])
def encrypt():
    data = request.json['data']
    encrypted_data = encrypt_data(data)
    return jsonify({'encrypted_data': encrypted_data})

# API route for decryption (show original data)
@app.route('/decrypt', methods=['POST'])
def decrypt():
    original_data = request.json['original_data']
    encrypted_data = request.json['encrypted_data']
    decrypted_data = decrypt_data(encrypted_data, original_data)
    return jsonify({'decrypted_data': decrypted_data})

if __name__ == '__main__':
    app.run(debug=True)
