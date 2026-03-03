import joblib
import pandas as pd
from sklearn.linear_model import LogisticRegression

# -------------------------------
# Sanity check: confirm file
# -------------------------------
print("RUNNING FILE:", __file__)

# -------------------------------
# Load data
# -------------------------------
data = pd.read_csv("churn_data.csv")

print("\nRaw data:")
print(data.head())

# -------------------------------
# Force numeric types (VERY IMPORTANT)
# -------------------------------
data["price"] = pd.to_numeric(data["price"], errors="coerce")
data["tenure_days"] = pd.to_numeric(data["tenure_days"], errors="coerce")
data["churn"] = pd.to_numeric(data["churn"], errors="coerce")

# Drop any bad rows (safety)
data = data.dropna()

print("\nData after type cleaning:")
print(data)

# -------------------------------
# Features & label
# -------------------------------
X = data[["price", "tenure_days"]]
y = data["churn"]

# -------------------------------
# Train model
# -------------------------------
model = LogisticRegression()
model.fit(X, y)
joblib.dump(model, "churn_model.pkl")
print("Model saved as churn_model.pkl")

# -------------------------------
# Predict probabilities (CORRECT)
# -------------------------------
probabilities = model.predict_proba(X)

print("\nRAW predict_proba output:")
print(probabilities)

print("\nMin probability:", probabilities.min())
print("Max probability:", probabilities.max())

# -------------------------------
# Attach churn probability
# -------------------------------
data["churn_probability"] = probabilities[:, 1]

def get_risk_label(prob):
    if prob >= 0.7:
        return "HIGH"
    elif prob >= 0.3:
        return "MEDIUM"
    else:
        return "LOW"

data["risk_label"] = data["churn_probability"].apply(get_risk_label)

print("\nFINAL OUTPUT WITH RISK LABELS:")
print(data[["price", "tenure_days", "churn", "churn_probability", "risk_label"]])