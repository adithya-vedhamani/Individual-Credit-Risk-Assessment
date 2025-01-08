import React, { useState } from "react";
import "./CreditRiskForm.css";

const PredictionForm1 = () => {
  const [formData, setFormData] = useState({
    NETMONTHLYINCOME: "",
    enq_L3m: "",
    time_since_recent_payment: "",
    Time_With_Curr_Empr: "",
    Age_Newest_TL: "",
    Tot_Missed_Pmnt: "",
    last_prod_enq2: "ConsumerLoan",
    Unsecured_TL: "",
    pct_tl_open_L6M: "",
    Secured_TL: ""
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
      const response = await fetch("http://127.0.0.1:5001/predict_individual", {
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
    <div className="credit-form-container">
      <div className="credit-form-card">
        <h2 className="credit-form-title">Individual Credit Risk Assessment</h2>
        
        <form onSubmit={handleSubmit} className="credit-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Net Monthly Income</label>
              <input
                type="number"
                name="NETMONTHLYINCOME"
                value={formData.NETMONTHLYINCOME}
                onChange={handleChange}
                required
                placeholder="Enter amount"
              />
            </div>

            <div className="form-group">
              <label>Enquiries in Last 3 Months</label>
              <input
                type="number"
                name="enq_L3m"
                value={formData.enq_L3m}
                onChange={handleChange}
                required
                placeholder="Enter number"
              />
            </div>

            <div className="form-group">
              <label>Time Since Recent Payment</label>
              <input
                type="number"
                name="time_since_recent_payment"
                value={formData.time_since_recent_payment}
                onChange={handleChange}
                required
                placeholder="Months"
              />
            </div>

            <div className="form-group">
              <label>Time With Current Employer</label>
              <input
                type="number"
                name="Time_With_Curr_Empr"
                value={formData.Time_With_Curr_Empr}
                onChange={handleChange}
                required
                placeholder="Months"
              />
            </div>

            <div className="form-group">
              <label>Age of Newest Trade Line</label>
              <input
                type="number"
                name="Age_Newest_TL"
                value={formData.Age_Newest_TL}
                onChange={handleChange}
                required
                placeholder="Months"
              />
            </div>

            <div className="form-group">
              <label>Total Missed Payments</label>
              <input
                type="number"
                name="Tot_Missed_Pmnt"
                value={formData.Tot_Missed_Pmnt}
                onChange={handleChange}
                required
                placeholder="Enter number"
              />
            </div>

            <div className="form-group">
              <label>Last Product Enquiry</label>
              <select
                name="last_prod_enq2"
                value={formData.last_prod_enq2}
                onChange={handleChange}
                required
              >
                <option value="ConsumerLoan">Consumer Loan</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Number of Unsecured Trade Lines</label>
              <input
                type="number"
                name="Unsecured_TL"
                value={formData.Unsecured_TL}
                onChange={handleChange}
                required
                placeholder="Enter number"
              />
            </div>

            <div className="form-group">
              <label>% Trade Lines Opened (Last 6M)</label>
              <input
                type="number"
                step="0.001"
                name="pct_tl_open_L6M"
                value={formData.pct_tl_open_L6M}
                onChange={handleChange}
                required
                placeholder="Enter percentage"
              />
            </div>

            <div className="form-group">
              <label>Number of Secured Trade Lines</label>
              <input
                type="number"
                name="Secured_TL"
                value={formData.Secured_TL}
                onChange={handleChange}
                required
                placeholder="Enter number"
              />
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className={`submit-button ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? "Processing..." : "Get Credit Assessment"}
            </button>
          </div>

          {prediction !== null && (
            <div className={`prediction-result ${prediction === 1 ? 'success' : 'warning'}`}>
              <h3>
                Credit Assessment Result: 
                <span className="prediction-text">
                  {prediction === 1 ? "Good Credit Score" : "Poor Credit Score"}
                </span>
              </h3>
            </div>
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

export default PredictionForm1;