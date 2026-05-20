import { useState } from "react";
import axios from "axios";

function LogInteraction() {

  const [doctorName, setDoctorName] = useState("");
  const [interactionType, setInteractionType] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [aiInput, setAiInput] = useState("");

  // AI Analyze Function
  const handleAIAnalyze = () => {

    // Detect Doctor Name
    let detectedDoctor = "";

    if (aiInput.includes("Dr")) {

      const words = aiInput.split(" ");

      const drIndex = words.findIndex(word =>
        word.includes("Dr")
      );

      if (drIndex !== -1 && words[drIndex + 1]) {

        detectedDoctor =
          words[drIndex] + " " + words[drIndex + 1];

      }
    }

    // Detect Interaction Type
    let detectedType = "Meeting";

    const lowerInput = aiInput.toLowerCase();

    if (lowerInput.includes("call")) {
      detectedType = "Call";
    }

    if (
      lowerInput.includes("visit") ||
      lowerInput.includes("visited")
    ) {
      detectedType = "Visit";
    }

    // Detect Follow Up
    let detectedFollowUp = "";

    if (lowerInput.includes("next week")) {
      detectedFollowUp = "Next Week";
    }
    else if (lowerInput.includes("tomorrow")) {
      detectedFollowUp = "Tomorrow";
    }
    else if (lowerInput.includes("3 days")) {
      detectedFollowUp = "After 3 Days";
    }
    else if (lowerInput.includes("next monday")) {
      detectedFollowUp = "Next Monday";
    }
    else if (lowerInput.includes("next tuesday")) {
      detectedFollowUp = "Next Tuesday";
    }
    else if (lowerInput.includes("next friday")) {
      detectedFollowUp = "Next Friday";
    }

    // Auto Fill Form
    setDoctorName(detectedDoctor);
    setInteractionType(detectedType);
    setDate(new Date().toISOString().split("T")[0]);
    setNotes(aiInput);
    setFollowUp(detectedFollowUp);
  };

  // Save Interaction
  const handleSave = async () => {

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/save-interaction",
        {
          doctor_name: doctorName,
          interaction_type: interactionType,
          date: date,
          notes: notes,
          follow_up: followUp,
        }
      );

      alert(response.data.message);

    } catch (error) {

      console.log(error);

      alert("Error saving interaction");

    }
  };

  return (

    <div className="grid grid-cols-3 gap-6">

      {/* LEFT SIDE FORM */}

      <div className="col-span-2 bg-white p-6 rounded-xl shadow">

        <h2 className="text-3xl font-bold mb-6">
          Log HCP Interaction
        </h2>

        <div className="grid grid-cols-2 gap-4">

          {/* Doctor Name */}

          <div>
            <label className="font-semibold">
              Doctor Name
            </label>

            <input
              type="text"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              className="w-full border p-3 rounded mt-2"
              placeholder="Enter Doctor Name"
            />
          </div>

          {/* Interaction Type */}

          <div>
            <label className="font-semibold">
              Interaction Type
            </label>

            <select
              value={interactionType}
              onChange={(e) => setInteractionType(e.target.value)}
              className="w-full border p-3 rounded mt-2"
            >
              <option value="">Select</option>
              <option value="Meeting">Meeting</option>
              <option value="Call">Call</option>
              <option value="Visit">Visit</option>
            </select>
          </div>

          {/* Date */}

          <div>
            <label className="font-semibold">
              Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border p-3 rounded mt-2"
            />
          </div>

          {/* Follow Up */}

          <div>
            <label className="font-semibold">
              Follow Up
            </label>

            <input
              type="text"
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
              className="w-full border p-3 rounded mt-2"
              placeholder="Follow-up details"
            />
          </div>

        </div>

        {/* Notes */}

        <div className="mt-6">

          <label className="font-semibold">
            Discussion Notes
          </label>

          <textarea
            rows="6"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border p-3 rounded mt-2"
            placeholder="Discussion details..."
          />

        </div>

        {/* Save Button */}

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-6 hover:bg-blue-700"
        >
          Save Interaction
        </button>

      </div>

      {/* RIGHT SIDE AI PANEL */}

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-4">
          AI Assistant
        </h2>

        <p className="text-gray-500 mb-4">
          Describe interaction naturally and AI will auto-fill the form.
        </p>

        <textarea
          rows="12"
          value={aiInput}
          onChange={(e) => setAiInput(e.target.value)}
          className="w-full border p-3 rounded"
          placeholder="Example:
Met Dr Sharma regarding diabetes medicine..."
        />

        <button
          onClick={handleAIAnalyze}
          className="bg-purple-600 text-white w-full py-3 rounded-lg mt-4 hover:bg-purple-700"
        >
          Analyze with AI
        </button>

      </div>

    </div>
  );
}

export default LogInteraction;