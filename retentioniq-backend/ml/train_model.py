import pandas as pd
import psycopg2
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import joblib

# -------- DB CONNECTION --------
conn = psycopg2.connect(
    dbname="retentioniq",
    user="postgres",        # 👈 change ONLY if your username is different
    password="Rishishah@123",
    host="localhost",
    port="5432"
)

# -------- LOAD DATA --------
query = """
SELECT
  pu.logins,
  pu.features_used,
  pu.avg_session_minutes,
  pu.support_tickets,
  u.plan,
  cl.churned
FROM product_usage pu
JOIN users u ON u.id = pu.user_id
JOIN churn_labels cl ON cl.user_id = u.id
"""

df = pd.read_sql(query, conn)

# -------- FEATURE ENGINEERING --------
df["plan"] = df["plan"].map({
    "basic": 0,
    "pro": 1,
    "enterprise": 2
})

X = df.drop("churned", axis=1)
y = df["churned"]

# -------- TRAIN / TEST SPLIT --------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# -------- TRAIN MODEL --------
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)

# -------- EVALUATE --------
preds = model.predict(X_test)
print(classification_report(y_test, preds))

# -------- SAVE MODEL --------
from datetime import datetime

version = datetime.now().strftime("%Y%m%d_%H%M")

model_path = f"ml/models/churn_model_{version}.pkl"
joblib.dump(model, model_path)

# also save "latest"
joblib.dump(model, "ml/models/churn_model_latest.pkl")

print(f"✅ Model trained and saved as {model_path}")