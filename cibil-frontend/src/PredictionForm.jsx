import React, { useState } from "react";
import "./PredictionForm.css";  // We'll create this CSS file next

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    no_of_dependents: "",
    education: "",
    self_employed: "",
    income_annum: "",
    loan_amount: "",
    loan_term: "",
    cibil_score: "",
    residential_assets_value: "",
    commercial_assets_value: "",
    luxury_assets_value: "",
    bank_asset_value: ""
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        setPrediction(result.prediction);
      } else {
        throw new Error("Error with prediction");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">Loan Approval Assessment</h2>
        
        <form onSubmit={handleSubmit} className="prediction-form">
          <div className="form-grid">
            {/* Personal Information Section */}
            <div className="form-section">
              <h3 className="section-title">Personal Information</h3>
              
              <div className="form-group">
                <label>No. of Dependents</label>
                <input
                  type="number"
                  name="no_of_dependents"
                  value={formData.no_of_dependents}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Education Level</label>
                <input
                  type="number"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Self Employed</label>
                <input
                  type="number"
                  name="self_employed"
                  value={formData.self_employed}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Annual Income</label>
                <input
                  type="number"
                  name="income_annum"
                  value={formData.income_annum}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Loan Details Section */}
            <div className="form-section">
              <h3 className="section-title">Loan Details</h3>
              
              <div className="form-group">
                <label>Loan Amount</label>
                <input
                  type="number"
                  name="loan_amount"
                  value={formData.loan_amount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Loan Term</label>
                <input
                  type="number"
                  name="loan_term"
                  value={formData.loan_term}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>CIBIL Score</label>
                <input
                  type="number"
                  name="cibil_score"
                  value={formData.cibil_score}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Asset Information Section */}
          <div className="asset-section">
            <h3 className="section-title">Asset Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Residential Assets Value</label>
                <input
                  type="number"
                  name="residential_assets_value"
                  value={formData.residential_assets_value}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Commercial Assets Value</label>
                <input
                  type="number"
                  name="commercial_assets_value"
                  value={formData.commercial_assets_value}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Luxury Assets Value</label>
                <input
                  type="number"
                  name="luxury_assets_value"
                  value={formData.luxury_assets_value}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Bank Asset Value</label>
                <input
                  type="number"
                  name="bank_asset_value"
                  value={formData.bank_asset_value}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className={`submit-button ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? "Processing..." : "Get Prediction"}
            </button>
          </div>

          {prediction !== null && (
            <div className="prediction-result success">
              <h3>Prediction: {prediction}</h3>
            </div>
          )}
          {prediction !== null && (
            <button className="submit-button" onClick={() => {
              if (parseInt(prediction.toString()) === 1) {
                window.open("http://localhost:5173/output.pdf");
              } else {
                window.open("http://localhost:5173/output_rejected.pdf");
              }
            }}>
              Show Generated Report
            </button>
          )}
          
          {error && (
            <div className="prediction-result error">
              <h3>{error}</h3>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PredictionForm;