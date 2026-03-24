import pandas as pd
from supabase import create_client
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Connect to Supabase
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# ── EXTRACT ──
print("Extracting data...")
df = pd.read_csv("data/raw/Churn_Modelling.csv")

# ── TRANSFORM ──
print("Transforming data...")
df = df.rename(columns={
    "RowNumber": "row_number",
    "CustomerId": "customer_id",
    "Surname": "surname",
    "CreditScore": "credit_score",
    "Geography": "geography",
    "Gender": "gender",
    "Age": "age",
    "Tenure": "tenure",
    "Balance": "balance",
    "NumOfProducts": "num_of_products",
    "HasCrCard": "has_cr_card",
    "IsActiveMember": "is_active_member",
    "EstimatedSalary": "estimated_salary",
    "Exited": "exited"
})
df = df.dropna()
df["revenue_at_risk"] = df["estimated_salary"] * 0.1 * df["exited"]

# ── LOAD ──
print("Loading data into Supabase...")
records = df.to_dict(orient="records")

# Insert in batches of 500
batch_size = 500
for i in range(0, len(records), batch_size):
    batch = records[i:i+batch_size]
    supabase.table("customers_raw").insert(batch).execute()
    print(f"Inserted rows {i} to {i+len(batch)}")

print("✅ ETL complete! All 10,000 rows loaded.")