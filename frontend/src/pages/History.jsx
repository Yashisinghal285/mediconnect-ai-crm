import { useEffect, useState } from "react";
import axios from "axios";

function History() {

  const [interactions, setInteractions] = useState([]);

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

  // Delete Function
  const handleDelete = async (index) => {

    try {

      await axios.delete(
        `http://127.0.0.1:8000/delete-interaction/${index}`
      );

      // Refresh history after delete
      fetchInteractions();

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-3xl font-bold mb-6">
        Interaction History
      </h2>

      <div className="space-y-4">

        {interactions.map((item, index) => (

          <div
            key={index}
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

            {/* Delete Button */}

            <button
            onClick={() => handleDelete(index)}
             className="bg-gray-700 text-white px-4 py-2 rounded-lg mt-4 hover:bg-gray-800 transition duration-300"
                >
                Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default History;