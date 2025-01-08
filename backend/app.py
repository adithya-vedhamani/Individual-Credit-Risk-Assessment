from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
# Configure CORS properly
CORS(app)

# Load the model
model = pickle.load(open('cibil_temp.sav', 'rb'))

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        features = [
            float(data['no_of_dependents']),
            float(data['education']),
            float(data['self_employed']),
            float(data['income_annum']),
            float(data['loan_amount']),
            float(data['loan_term']),
            float(data['cibil_score']),
            float(data['residential_assets_value']),
            float(data['commercial_assets_value']),
            float(data['luxury_assets_value']),
            float(data['bank_asset_value'])
        ]
        
        prediction = model.predict([features])[0]
        return jsonify({'prediction': int(prediction)})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)