from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import pandas as pd
import numpy as np

# ---------- Load model and encoders ----------
with open("carbon_model.pkl", "rb") as f:
    model = pickle.load(f)

with open("encoder.pkl", "rb") as f:
    encoder_data = pickle.load(f)

encoder = encoder_data["encoder"]
categorical_cols = encoder_data["categorical_cols"]
numerical_cols = encoder_data["numerical_cols"]

# ---------- Define input schema ----------
class CarbonInput(BaseModel):
    Body_Type: str
    Sex: str
    Diet: str
    How_Often_Shower: str
    Heating_Energy_Source: str
    Transport: str
    Vehicle_Type: str | None = None
    Social_Activity: str
    Monthly_Grocery_Bill: float
    Frequency_of_Traveling_by_Air: str
    Vehicle_Monthly_Distance_Km: float
    Waste_Bag_Size: str
    Waste_Bag_Weekly_Count: int
    How_Long_TV_PC_Daily_Hour: float
    How_Many_New_Clothes_Monthly: int
    How_Long_Internet_Daily_Hour: float
    Energy_efficiency: str
    Recycle_Plastic: int
    Recycle_Glass: int
    Recycle_Paper: int
    Recycle_Metal: int
    Cook_Oven: int
    Cook_Airfryer: int
    Cook_Grill: int
    Cook_Microwave: int
    Cook_Stove: int

# ---------- FastAPI app ----------
app = FastAPI(title="Carbon Footprint Prediction API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or ["http://localhost:5173"] for stricter control
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict")
def predict_footprint(data: CarbonInput):
    # Convert input to DataFrame
    input_df = pd.DataFrame([{
        "Body Type": data.Body_Type,
        "Sex": data.Sex,
        "Diet": data.Diet,
        "How Often Shower": data.How_Often_Shower,
        "Heating Energy Source": data.Heating_Energy_Source,
        "Transport": data.Transport,
        "Vehicle Type": data.Vehicle_Type,
        "Social Activity": data.Social_Activity,
        "Monthly Grocery Bill": data.Monthly_Grocery_Bill,
        "Frequency of Traveling by Air": data.Frequency_of_Traveling_by_Air,
        "Vehicle Monthly Distance Km": data.Vehicle_Monthly_Distance_Km,
        "Waste Bag Size": data.Waste_Bag_Size,
        "Waste Bag Weekly Count": data.Waste_Bag_Weekly_Count,
        "How Long TV PC Daily Hour": data.How_Long_TV_PC_Daily_Hour,
        "How Many New Clothes Monthly": data.How_Many_New_Clothes_Monthly,
        "How Long Internet Daily Hour": data.How_Long_Internet_Daily_Hour,
        "Energy efficiency": data.Energy_efficiency,
        "Recycle_Plastic": data.Recycle_Plastic,
        "Recycle_Glass": data.Recycle_Glass,
        "Recycle_Paper": data.Recycle_Paper,
        "Recycle_Metal": data.Recycle_Metal,
        "Cook_Oven": data.Cook_Oven,
        "Cook_Airfryer": data.Cook_Airfryer,
        "Cook_Grill": data.Cook_Grill,
        "Cook_Microwave": data.Cook_Microwave,
        "Cook_Stove": data.Cook_Stove
    }])

    # Fill missing categorical values
    input_df[categorical_cols] = input_df[categorical_cols].fillna("missing")

    # Encode categorical variables
    X_cat = encoder.transform(input_df[categorical_cols])

    # Combine categorical + numerical features
    X_final = np.hstack([X_cat, input_df[numerical_cols].values])

    # Predict
    prediction = model.predict(X_final)[0]

    return {"predicted_carbon_footprint": float(prediction)}

