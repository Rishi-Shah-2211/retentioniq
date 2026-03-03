import pandas as pd
import psycopg2
import joblib
from datetime import date
import uuid

# -------- LOAD MODEL --------
model = joblib.load("ml/churn_model.pkl")

# -------- DB CONNECTION --------
conn = psycopg2.connect(
    dbname="retentioniq",
    user="postgres",
    password="Rishishah@123",   # same as before
    host="localhost",
    port="5432"
)

# -------- LOAD ACTIVE USERS DATA --------
query = """
SELECT
  u.id AS user_id,
  pu.logins,
  pu.features_used,
  pu.avg_session_minutes,
  pu.support_tickets,
  u.plan
FROM product_usage pu
JOIN users u ON u.id = pu.user_id
"""

df = pd.read_sql(query, conn)

# -------- FEATURE ENGINEERING --------
df["plan"] = df["plan"].map({
    "basic": 0,
    "pro": 1,
    "enterprise": 2
})

X = df.drop("user_id", axis=1)

# -------- PREDICT --------
df["churn_probability"] = model.predict_proba(X)[:, 1]

def risk_level(p):
    if p < 0.3:
        return "low"
    elif p < 0.65:
        return "medium"
    return "high"

df["risk_level"] = df["churn_probability"].apply(risk_level)

# -------- INSERT INTO DB --------
cursor = conn.cursor()

for _, row in df.iterrows():
    cursor.execute(
        """
        INSERT INTO churn_predictions
        (id, user_id, prediction_date, churn_probability, risk_level, model_version)
        VALUES (%s, %s, %s, %s, %s, %s)
        """,
        (
            str(uuid.uuid4()),
            row["user_id"],
            date.today(),
            float(row["churn_probability"]),
            row["risk_level"],
            "logistic_v1"
        )
    )

conn.commit()
cursor.close()
conn.close()

print("✅ Predictions generated and stored in DB")