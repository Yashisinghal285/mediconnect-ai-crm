import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [interactions, setInteractions] = useState([]);

  const [prompt, setPrompt] = useState("");

  const [doctorName, setDoctorName] = useState("");

  const [interactionType, setInteractionType] =
    useState("");

  const [date, setDate] = useState("");

  const [followUp, setFollowUp] = useState("");

  const [notes, setNotes] = useState("");

  // Fetch Interactions

  useEffect(() => {

    fetchInteractions();

  }, []);

  const fetchInteractions = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/interactions"
      );

      setInteractions(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  // AI Analyze

  const handleAnalyze = () => {

    setNotes(prompt);

    // Doctor Name

    if (prompt.includes("Dr Verma")) {

      setDoctorName("Dr Verma");

    } else if (prompt.includes("Dr Sharma")) {

      setDoctorName("Dr Sharma");

    } else if (prompt.includes("Dr Mehta")) {

      setDoctorName("Dr Mehta");

    }

    // Interaction Type

    setInteractionType("Visit");

    // Date

    const today = new Date();

    setDate(today.toLocaleDateString());

    // Follow Up

    if (
      prompt.toLowerCase().includes("3 days")
    ) {

      setFollowUp("After 3 Days");

    } else if (
      prompt.toLowerCase().includes("next week")
    ) {

      setFollowUp("Next Week");

    } else if (
      prompt.toLowerCase().includes("next monday")
    ) {

      setFollowUp("Next Monday");

    } else {

      setFollowUp("No Follow Up");

    }
  };

  // Save Interaction

  const handleSave = async () => {

    try {

      await axios.post(
        "http://127.0.0.1:8000/save-interaction",
        {
          doctor_name: doctorName,
          interaction_type: interactionType,
          date: date,
          notes: notes,
          follow_up: followUp,
        }
      );

      alert("Interaction Saved");

      fetchInteractions();

      // Clear Form

      setPrompt("");
      setDoctorName("");
      setInteractionType("");
      setDate("");
      setFollowUp("");
      setNotes("");

    } catch (error) {

      console.log(error);

    }
  };

  // Dashboard Counts

  const totalInteractions =
    interactions.length;

  const totalFollowUps =
    interactions.filter(
      item => item.follow_up !== ""
    ).length;

  return (

    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Heading */}

      <h1 className="text-4xl font-bold mb-8">
        MediConnect AI CRM
      </h1>

      {/* Dashboard Cards */}

      <div className="grid grid-cols-2 gap-6 mb-8">

        <div className="bg-blue-100 p-6 rounded-xl shadow">

          <h2 className="text-2xl font-bold">
            Total Interactions
          </h2>

          <p className="text-5xl font-bold mt-4">
            {totalInteractions}
          </p>

        </div>

        <div className="bg-green-100 p-6 rounded-xl shadow">

          <h2 className="text-2xl font-bold">
            Upcoming Follow-Ups
          </h2>

          <p className="text-5xl font-bold mt-4">
            {totalFollowUps}
          </p>

        </div>

      </div>

      {/* AI Input */}

      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <h2 className="text-3xl font-bold mb-4">
          AI Interaction Assistant
        </h2>

        <textarea
          rows="5"
          value={prompt}
          onChange={(e) =>
            setPrompt(e.target.value)
          }
          placeholder="Enter interaction notes..."
          className="w-full border p-4 rounded-lg"
        />

        <button
          onClick={handleAnalyze}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg mt-4 hover:bg-purple-700"
        >
          Analyze with AI
        </button>

      </div>

      {/* Form */}

      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <h2 className="text-3xl font-bold mb-6">
          Log HCP Interaction
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Doctor Name"
            value={doctorName}
            onChange={(e) =>
              setDoctorName(e.target.value)
            }
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Interaction Type"
            value={interactionType}
            onChange={(e) =>
              setInteractionType(e.target.value)
            }
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Follow Up"
            value={followUp}
            onChange={(e) =>
              setFollowUp(e.target.value)
            }
            className="w-full border p-3 rounded"
          />

          <textarea
            rows="5"
            placeholder="Discussion Notes"
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            className="w-full border p-3 rounded"
          />

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Save Interaction
          </button>

        </div>

      </div>

      {/* Recent Interactions */}

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-3xl font-bold mb-6">
          Recent Interactions
        </h2>

        <div className="space-y-4">

          {interactions.map((item) => (

            <div
              key={item.id}
              className="border p-4 rounded-lg"
            >

              <h3 className="text-xl font-bold">
                {item.doctor_name}
              </h3>

              <p className="mt-2 text-gray-600">
                {item.notes}
              </p>

              <p className="mt-2">
                <span className="font-semibold">
                  Follow Up:
                </span>{" "}
                {item.follow_up}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;