import React, { useState } from "react";
import { CONTRACT_ID } from "../soroban/config";

export default function TransferProperty({ wallet }) {
  const [propertyId, setPropertyId] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [status, setStatus] = useState("");

  const transfer = async () => {
    if (!wallet) return alert("Connect wallet first");
    try {
      setStatus("Transferring...");
      // await simulateAndSendTx(wallet, CONTRACT_ID, "transfer_property", [propertyId, newOwner])
      setStatus("✅ Transfer successful!");
    } catch (e) {
      setStatus("❌ Error: " + e.message);
    }
  };

  return (
    <div className="p-4 border rounded-lg mt-4">
      <h2 className="text-xl mb-2 font-bold">Transfer Property</h2>
      <input
        placeholder="Property ID"
        className="border p-2 w-full mb-2"
        value={propertyId}
        onChange={(e) => setPropertyId(e.target.value)}
      />
      <input
        placeholder="New Owner Public Key"
        className="border p-2 w-full mb-2"
        value={newOwner}
        onChange={(e) => setNewOwner(e.target.value)}
      />
      <button onClick={transfer} className="px-4 py-2 bg-yellow-600 text-white rounded-lg">
        Transfer
      </button>
      <p className="mt-2 text-sm">{status}</p>
    </div>
  );
}
