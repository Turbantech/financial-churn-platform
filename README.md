# Financial Churn Intelligence Platform

An end to end machine learning platform that predicts which bank customers are likely to churn. Built with Python, XGBoost, FastAPI, React and Supabase.

## Live Demo
- Dashboard: https://your-vercel-url.vercel.app
- API Docs: https://financial-churn-platform.onrender.com/docs

## Project Structure
- pipeline/ — ETL script that loads raw data into Supabase
- ml/ — SHAP explainability output and training notebook
- api/ — FastAPI backend that serves predictions
- dashboard/ — React frontend

## What I Built
I built a pipeline that ingests 10000 bank customer records into a Supabase data warehouse. I then ran SQL analysis to find churn patterns across different customer segments. After that I trained an XGBoost model using SMOTE to handle class imbalance and achieved 85.94% accuracy and a ROC AUC score of 0.93. The model is served through a FastAPI REST API and the results are displayed in a React dashboard where users can input customer details and get a live churn prediction.

## Key Findings
- Overall churn rate is 20.37%
- Germany has the highest churn rate at 32.44%
- Customers over 45 churn at 45.33%
- Inactive members churn at almost double the rate of active members
- Customers with 3 or 4 products have extremely high churn rates

## Tech Stack
- Data Pipeline: Python, Supabase, SQL
- Machine Learning: XGBoost, SHAP, scikit-learn, imbalanced-learn
- Backend: FastAPI, Python
- Frontend: React, Recharts
- Database: Supabase PostgreSQL
- Deployment: Render, Vercel

## Model Performance
- Accuracy: 85.94%
- ROC AUC: 0.9347
- Precision: 0.86
- Recall: 0.86
