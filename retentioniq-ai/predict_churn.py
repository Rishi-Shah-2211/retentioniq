import sys
import json
import joblib
import pandas as pd

# Load trained model
model = joblib.load(r"C:\Users\DELL\Documents\retentioniq-ai\churn_model.pkl")
# Read inputs from command line
price = float(sys.argv[1])
tenure_days = float(sys.argv[2])

# Prepare input for model
X = pd.DataFrame([[price, tenure_days]], columns=["price", "tenure_days"])

# Predict churn probability
probability = model.predict_proba(X)[0][1]

# Risk labeling
if probability >= 0.7:
    risk = "HIGH"
elif probability >= 0.3:
    risk = "MEDIUM"
else:
    risk = "LOW"

# Output JSON
result = {
    "churn_probability": round(probability, 4),
    "risk": risk
}

print(json.dumps(result))