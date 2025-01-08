from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
# Configure CORS properly
CORS(app)

# Load the individual CIBIL score prediction model
model = pickle.load(open('cibil_individual.sav', 'rb'))

@app.route('/predict_individual', methods=['POST'])
def predict_individual():
    try:
        data = request.json
        
        # Convert ConsumerLoan to numeric value if needed
        last_prod_enq2_value = 1 if data['last_prod_enq2'] == 'ConsumerLoan' else 0
        
        features = [
            float(data['NETMONTHLYINCOME']),
            float(data['enq_L3m']),
            float(data['time_since_recent_payment']),
            float(data['Time_With_Curr_Empr']),
            float(data['Age_Newest_TL']),
            float(data['Tot_Missed_Pmnt']),
            last_prod_enq2_value,
            float(data['Unsecured_TL']),
            float(data['pct_tl_open_L6M']),
            float(data['Secured_TL'])
        ]
        
        prediction = model.predict([features])[0]
        return jsonify({'prediction': int(prediction)})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=5001, debug=True)