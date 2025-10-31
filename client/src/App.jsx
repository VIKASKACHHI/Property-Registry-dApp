import { isConnected, getPublicKey } from "@stellar/freighter-api";
import { useEffect, useState } from "react";

function App() {
  const [freighterInstalled, setFreighterInstalled] = useState(false);
  const [pubKey, setPubKey] = useState(null);

  useEffect(() => {
    const checkFreighter = async () => {
      if (window.freighterApi) {
        setFreighterInstalled(true);
        const connected = await isConnected();
        if (connected) {
          const key = await getPublicKey();
          setPubKey(key);
        }
      } else {
        console.error("❌ Freighter not detected");
      }
    };

    // delay to let Freighter inject
    setTimeout(checkFreighter, 500);
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold">Property Registry dApp</h1>
      {freighterInstalled ? (
        <p className="text-green-600">✅ Freighter Detected: {pubKey || "Not connected"}</p>
      ) : (
        <p className="text-red-600">❌ Freighter not available</p>
      )}
    </div>
  );
}

export default App;
