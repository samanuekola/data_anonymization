from flask import Flask, render_template, request, jsonify
from faker import Faker

app = Flask(__name__)
fake = Faker()

# Helper function to generate random data
def generate_random_name():
    return fake.name()

def generate_random_address():
    return fake.address()

def anonymize_data(data):
    anonymized_data = data.copy()
    anonymized_data['Name'] = generate_random_name()
    anonymized_data['Address'] = generate_random_address()
    return anonymized_data

@app.route('/')
def index():
    return render_template('index.html')

# API route for encryption (anonymization)
@app.route('/encrypt', methods=['POST'])
def encrypt():
    data = request.json['data']
    key = request.json['key']
    
    # Anonymize the data (replace name and address with fake data)
    anonymized_data = anonymize_data(data)
    
    # Store original data, anonymized data, and the encryption key
    return jsonify({
        'anonymized_data': anonymized_data, 
        'original_data': data,
        'encrypted_key': key  # Store the user-provided key
    })

# API route for decryption
@app.route('/decrypt', methods=['POST'])
def decrypt():
    entered_key = request.json['entered_key']
    encrypted_key = request.json['encrypted_key']
    original_data = request.json['original_data']
    
    # Check if the entered key matches the stored encrypted key
    if entered_key == encrypted_key:
        # Return original data if keys match
        return jsonify({'decrypted_data': original_data, 'success': True})
    else:
        return jsonify({'message': 'Incorrect encryption key', 'success': False})

if __name__ == '__main__':
    app.run(debug=True)
