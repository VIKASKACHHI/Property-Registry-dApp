import React, { useState } from "react";
import { CONTRACT_ID } from "../soroban/config";

export default function RegisterProperty({ wallet }) {
  const [propertyId, setPropertyId] = useState("");
  const [metadata, setMetadata] = useState("");
  const [status, setStatus] = useState("");

  const register = async () => {
    if (!wallet) return alert("Connect wallet first");

    // Example call: register_property(property_id, owner, metadata)
    const tx = {
      contractId: CONTRACT_ID,
      method: "register_property",
      args: [propertyId, wallet, metadata],
    };

    // Call the Soroban RPC backend or your helper (simulateAndSendTx)
    try {
      setStatus("Registering...");
      // await simulateAndSendTx(wallet, CONTRACT_ID, "register_property", [propertyId, wallet, metadata])
      setStatus("✅ Property registered!");
    } catch (e) {
      setStatus("❌ Error: " + e.message);
    }
  };

  return (
    <div className="p-4 border rounded-lg mt-4">
      <h2 className="text-xl mb-2 font-bold">Register Property</h2>
      <input
        placeholder="Property ID"
        className="border p-2 w-full mb-2"
        value={propertyId}
        onChange={(e) => setPropertyId(e.target.value)}
      />
      <input
        placeholder="Metadata / IPFS CID"
        className="border p-2 w-full mb-2"
        value={metadata}
        onChange={(e) => setMetadata(e.target.value)}
      />
      <button onClick={register} className="px-4 py-2 bg-green-600 text-white rounded-lg">
        Register
      </button>
      <p className="mt-2 text-sm">{status}</p>
    </div>
  );
}
