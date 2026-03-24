from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client
from dotenv import load_dotenv
import pickle
import os
import pandas as pd

load_dotenv()

app = FastAPI(title="Financial Churn Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# Load model
import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
model = pickle.load(open(os.path.join(BASE_DIR, "ml", "model.pkl"), "rb"))

print("Model features:", model.get_booster().feature_names)
# Supabase client
supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)

class Customer(BaseModel):
    credit_score: int
    geography: int     # 0 = France, 1 = Germany, 2 = Spain
    gender: int        # 0 = Female, 1 = Male
    age: int
    tenure: int
    balance: float
    num_products: int
    has_credit_card: int
    is_active_member: int
    estimated_salary: float

@app.get("/")
def root():
    return {"message": "Churn Prediction API is running ✅"}

@app.get("/metrics")
def get_metrics():
    response = supabase.table("churn_metrics").select("*").execute()
    return {"data": response.data}


@app.post("/predict")
def predict(customer: Customer):
    balance_salary_ratio = customer.balance / (customer.estimated_salary + 1)
    age_tenure_ratio = customer.age / (customer.tenure + 1)

    features = pd.DataFrame([{
    "CreditScore": customer.credit_score,
    "Geography": customer.geography,
    "Gender": customer.gender,
    "Age": customer.age,
    "Tenure": customer.tenure,
    "Balance": customer.balance,
    "NumOfProducts": customer.num_products,
    "HasCrCard": customer.has_credit_card,
    "IsActiveMember": customer.is_active_member,
    "EstimatedSalary": customer.estimated_salary,
    "Balance_Salary_Ratio": balance_salary_ratio,
    "Age_Tenure_Ratio": age_tenure_ratio
}])

    prob = model.predict_proba(features)[0][1]
    risk = "High" if prob > 0.5 else "Low"

    return {
        "churn_probability": round(float(prob), 3),
        "churn_percentage": f"{round(float(prob) * 100, 1)}%",
        "risk_level": risk
    }