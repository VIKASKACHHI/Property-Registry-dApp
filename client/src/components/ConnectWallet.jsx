import React, { useState } from "react";

export default function ConnectWallet({ setWallet }) {
  const [address, setAddress] = useState(null);

  const connect = async () => {
    if (!window.freighterApi) {
      alert("Please install Freighter wallet extension.");
      return;
    }
    const pk = await window.freighterApi.getPublicKey();
    setAddress(pk);
    setWallet(pk);
  };

  return (
    <div className="p-4 text-center">
      {address ? (
        <p className="text-green-500">Connected: {address}</p>
      ) : (
        <button onClick={connect} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          Connect Freighter
        </button>
      )}
    </div>
  );
}
