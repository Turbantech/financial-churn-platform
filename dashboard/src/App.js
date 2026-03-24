import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const API_URL = "https://financial-churn-platform.onrender.com";

export default function App() {
  const [metrics, setMetrics] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    credit_score: 650,
    geography: 0,
    gender: 1,
    age: 35,
    tenure: 3,
    balance: 50000,
    num_products: 2,
    has_credit_card: 1,
    is_active_member: 1,
    estimated_salary: 80000,
  });

  useEffect(() => {
    fetch(`${API_URL}/metrics`)
      .then((res) => res.json())
      .then(({ data }) => setMetrics(data || []));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: parseFloat(e.target.value) });
  };

  const predict = async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setPrediction(data);
    setLoading(false);
  };

  const getColor = (rate) => {
    if (rate > 30) return "#ef4444";
    if (rate > 20) return "#f97316";
    return "#22c55e";
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: 32, maxWidth: 1000, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 4 }}>
        💰 Financial Churn Intelligence Platform
      </h1>
      <p style={{ color: "#6b7280", marginBottom: 32 }}>
        Real-time churn analysis powered by XGBoost + Supabase
      </p>

      {/* METRICS CHART */}
      <div style={{ background: "#f9fafb", borderRadius: 12, padding: 24, marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, marginBottom: 16 }}>📊 Churn Rate by Segment</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={metrics}>
            <XAxis dataKey="segment" />
            <YAxis unit="%" />
            <Tooltip formatter={(val) => `${val}%`} />
            <Bar dataKey="churn_rate" radius={[6, 6, 0, 0]}>
              {metrics.map((entry, index) => (
                <Cell key={index} fill={getColor(entry.churn_rate)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* PREDICTOR */}
      <div style={{ background: "#f9fafb", borderRadius: 12, padding: 24 }}>
        <h2 style={{ fontSize: 20, marginBottom: 16 }}>🤖 Live Churn Predictor</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>

          <div>
            <label style={{ fontSize: 13, color: "#6b7280", display: "block", marginBottom: 4 }}>CREDIT SCORE</label>
            <input type="number" name="credit_score" value={form.credit_score} onChange={handleChange}
              style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14 }} />
          </div>

          <div>
            <label style={{ fontSize: 13, color: "#6b7280", display: "block", marginBottom: 4 }}>GEOGRAPHY</label>
            <select name="geography" value={form.geography} onChange={handleChange}
              style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14 }}>
              <option value={0}>France</option>
              <option value={1}>Germany</option>
              <option value={2}>Spain</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: 13, color: "#6b7280", display: "block", marginBottom: 4 }}>GENDER</label>
            <select name="gender" value={form.gender} onChange={handleChange}
              style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14 }}>
              <option value={0}>Female</option>
              <option value={1}>Male</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: 13, color: "#6b7280", display: "block", marginBottom: 4 }}>AGE</label>
            <input type="number" name="age" value={form.age} onChange={handleChange}
              style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14 }} />
          </div>

          <div>
            <label style={{ fontSize: 13, color: "#6b7280", display: "block", marginBottom: 4 }}>TENURE (years)</label>
            <input type="number" name="tenure" value={form.tenure} onChange={handleChange}
              style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14 }} />
          </div>

          <div>
            <label style={{ fontSize: 13, color: "#6b7280", display: "block", marginBottom: 4 }}>BALANCE</label>
            <input type="number" name="balance" value={form.balance} onChange={handleChange}
              style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14 }} />
          </div>

          <div>
            <label style={{ fontSize: 13, color: "#6b7280", display: "block", marginBottom: 4 }}>NUM PRODUCTS</label>
            <select name="num_products" value={form.num_products} onChange={handleChange}
              style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14 }}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: 13, color: "#6b7280", display: "block", marginBottom: 4 }}>HAS CREDIT CARD</label>
            <select name="has_credit_card" value={form.has_credit_card} onChange={handleChange}
              style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14 }}>
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: 13, color: "#6b7280", display: "block", marginBottom: 4 }}>IS ACTIVE MEMBER</label>
            <select name="is_active_member" value={form.is_active_member} onChange={handleChange}
              style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14 }}>
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: 13, color: "#6b7280", display: "block", marginBottom: 4 }}>ESTIMATED SALARY</label>
            <input type="number" name="estimated_salary" value={form.estimated_salary} onChange={handleChange}
              style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14 }} />
          </div>

        </div>

        <button onClick={predict}
          style={{
            marginTop: 24, padding: "12px 32px", background: "#6366f1", color: "white",
            border: "none", borderRadius: 8, fontSize: 16, cursor: "pointer", fontWeight: "bold"
          }}>
          {loading ? "Predicting..." : "Predict Churn"}
        </button>

        {prediction && (
          <div style={{
            marginTop: 24, padding: 20, borderRadius: 12,
            background: prediction.risk_level === "High" ? "#fee2e2" : "#dcfce7"
          }}>
            <h3 style={{ fontSize: 18, marginBottom: 8 }}>
              {prediction.risk_level === "High" ? "🔴" : "🟢"} Risk Level: {prediction.risk_level}
            </h3>
            <p style={{ fontSize: 32, fontWeight: "bold", margin: 0 }}>{prediction.churn_percentage}</p>
            <p style={{ color: "#6b7280", marginTop: 4 }}>Churn Probability</p>
          </div>
        )}
      </div>
    </div>
  );
}