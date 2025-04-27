import React, { useEffect, useState } from "react";

const CaseWitnessList = ({ caseId }) => {
  const [witnesses, setWitnesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWitnesses = async () => {
      try {
        const response = await fetch(
          `https://b44-web-060-5yqc.onrender.com/witness/all/${caseId}`
        );
        const data = await response.json();

        if (response.ok && data.witnesses && data.witnesses.length > 0) {
          setWitnesses(data.witnesses);
        } else {
          setWitnesses([]);
        }
      } catch (err) {
        setError("Error fetching witnesses.");
      } finally {
        setLoading(false);
      }
    };

    if (caseId) {
      fetchWitnesses();
    }
  }, [caseId]);

  const containerStyle = {
    marginTop: "40px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  };

  const headingStyle = {
    marginBottom: "20px",
    fontSize: "24px",
    textAlign: "center",
  };

  const witnessCardStyle = {
    backgroundColor: "#ffffff",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "6px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
  };

  const textStyle = {
    marginBottom: "8px",
    fontSize: "16px",
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <h3>Loading witnesses...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <h3>{error}</h3>
      </div>
    );
  }

  if (witnesses.length === 0) {
    return (
      <div style={containerStyle}>
        <h3>No witnesses for this case.</h3>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Witnesses Information</h2>
      {witnesses.map((witness) => (
        <div key={witness._id} style={witnessCardStyle}>
          <p style={textStyle}>
            <strong>Name:</strong> {witness.name || "Anonymous"}
          </p>
          <p style={textStyle}>
            <strong>Contact Info:</strong> {witness.contactInfo || "N/A"}
          </p>
          <p style={textStyle}>
            <strong>Statement:</strong>{" "}
            {witness.statement || "No statement provided."}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CaseWitnessList;
