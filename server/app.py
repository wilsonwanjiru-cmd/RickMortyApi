from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

@app.route('/api/locations', methods=['GET'])
def get_locations():
    query = request.args.get('name', '')
    url = f'https://rickandmortyapi.com/api/location/?name={query}'
    response = requests.get(url)
    data = response.json()
    return jsonify(data)

@app.route('/api/residents', methods=['GET'])
def get_resident():
    resident_url = request.args.get('residentUrl', '')
    response = requests.get(resident_url)
    data = response.json()
    return jsonify(data)

@app.route('/api/residents/<int:resident_id>', methods=['POST'])
def update_resident_notes(resident_id):
    # Dummy implementation to simulate updating notes
    notes = request.json.get('notes')
    return jsonify({'message': 'Notes updated successfully'})

if __name__ == '__main__':
    app.run(debug=True)
