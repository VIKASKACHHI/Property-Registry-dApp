# 🏠 Property Registry DApp (Stellar + Freighter)

A decentralized web application built on the **Stellar Soroban** blockchain to manage **land/property ownership registry** with secure **ownership transfers**.  
This project uses the **Freighter Wallet** for blockchain interactions and a **React + Vite + TailwindCSS** frontend.

---

## 🚀 Features

- 🔐 **Connect Freighter Wallet**
- 🧾 **Register new property ownership** on Stellar
- 🔄 **Transfer property ownership** securely on-chain
- 🌐 **View registered properties** linked to user wallet
- ⚡ **Built with Soroban SDK** and **Freighter API**
- 🎨 **Modern React UI** with TailwindCSS

---

## 🧩 Tech Stack

| Component | Technology |
|------------|-------------|
| Blockchain | Stellar Soroban |
| Wallet | Freighter (Browser Extension) |
| Frontend | React (Vite) |
| Styling | TailwindCSS |
| API Calls | Axios |
| Smart Contract | Pre-deployed Soroban Contract |

---

### Folder structure 

``` bash 
Property_registry_dApp/
│
├── client/
│   ├── src/
│   │   ├── App.jsx          # Main React component
│   │   ├── stellar-config.js # Freighter + Soroban setup
│   │   ├── components/       # UI components
│   │   └── pages/            # Page-level components
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 📦 Installation & Setup

### 1️⃣ Clone this repository
```bash
git clone https://github.com/your-username/property-registry-dapp.git
cd property-registry-dapp
cd client
npm install
npm install @stellar/soroban-client-v2 @stellar/freighter-api axios tailwindcss
### start the server
npm run dev
```

🔑 Wallet Setup (Freighter)

Install Freighter Wallet extension
👉 https://www.freighter.app/

Create or import a wallet on Testnet

Fund it using Stellar Friendbot
👉 https://laboratory.stellar.org/#account-creator

In Chrome:

Go to chrome://extensions
Click Details on Freighter
Set Site Access → On all sites
Enable “Allow access to file URLs”
Reload your DApp tab and ensure window.freighterApi appears in DevTools.

⚙️ Environment Setup

Create a .env file inside /client with the following variables:
``` bash
VITE_STELLAR_NETWORK=testnet
VITE_CONTRACT_ID=<YOUR_DEPLOYED_CONTRACT_ID>
```


Replace <YOUR_DEPLOYED_CONTRACT_ID> with your real contract hash (e.g., CB5JZL...EJ3H).
Add Your Contract_ID in config.js under the src/soroban folder