from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Fake database list
interactions = []

# Request model
class Interaction(BaseModel):
    doctor_name: str
    interaction_type: str
    date: str
    notes: str
    follow_up: str

# Home route
@app.get("/")
def home():
    return {
        "message": "Backend Running"
    }

# Save interaction
@app.post("/save-interaction")
def save_interaction(data: Interaction):

    interactions.append(data.dict())

    return {
        "message": "Interaction Saved Successfully",
        "data": data
    }

# Get all interactions
@app.get("/interactions")
def get_interactions():
    return interactions

    # Delete interaction
@app.delete("/delete-interaction/{index}")
def delete_interaction(index: int):

    if index < len(interactions):

        interactions.pop(index)

        return {
            "message": "Interaction Deleted"
        }

    return {
        "message": "Invalid Index"
    }