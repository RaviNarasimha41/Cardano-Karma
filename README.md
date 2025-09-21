# 🌟 Cardano Karma System

**Gamified, on-chain community reputation system built on Cardano eUTXO.**  
Users earn karma tokens for helpful actions, unlock NFT badges at milestones, and participate in community voting — all fully transparent & verified on-chain.

✨ Hackathon-ready MVP with animated UI, responsive dashboards, and seamless wallet integration (Visper Wallet).

---

## 🚀 Features

### 🔹 Landing Page
- **Hero Title:** “Earn Karma. Unlock NFTs. Impact Your Community.”
- Animated gradient background + floating particles
- Wallet connect (Visper Wallet via CIP-30)
- 3D spinning karma token animation
- Smooth scroll “Learn More” button

### 🔹 User Dashboard
- Wallet address + animated karma counter
- Submit actions: Help, Donate, Participate
- Confetti animation on successful action
- Karma progress bar with glowing milestones
- **NFT Badge Gallery**
  - Displays user’s achievement NFTs (badges + external Cardano NFTs)
  - Flip + scale hover animation
  - Progress tracking towards next milestone

### 🔹 NFT Badge Gallery (Core Items Only)
**Unlocked Badges**
- 🥉 First Steps → First community action  
- 🥈 Helper → Helped 10 members  
- 💎 Generous Soul → Donated 1000 ADA  
- ⭐ Community Leader → Led 5 initiatives  
- 🔮 Karma Guardian → Consistent contributions  

**Locked Badges**
- 👑 Karma Master → 3000 karma  
- 🏆 Cardano Champion → 5000 karma  

---

### 🔹 Blockchain Integration
- **Wallet Connect:** Visper Wallet (CIP-30 API)  
- **Smart Contracts:** Aiken / OpShin (karma token minting + validation)  
- **NFTs & Tokens:** MeshJS + Aiken  
- **Voting:** Cardano Ballot (stake-based approvals)  
- **Blockchain Data:** Blockfrost API (fetch balances, NFTs, transactions)  
- **Testnet:** Preprod faucet ADA  
- **Post-Vote Transaction Message:** Confirm voting actions via MeshJS transaction messages  

---

## 🛠️ Tech Stack

| Layer              | Tools / Frameworks                             |
| ------------------ | --------------------------------------------- |
| **Frontend**       | React.js (TypeScript) + TailwindCSS + Framer Motion |
| **Backend**        | Node.js + Express                             |
| **Wallet**         | Visper Wallet (CIP-30) + Lucid               |
| **Smart Contracts**| Aiken / OpShin                                |
| **NFTs & Tokens**  | MeshJS + Aiken                                |
| **Voting**         | Cardano Ballot                                |
| **Blockchain Data**| Blockfrost API                                |
| **UI & Animation** | TailwindCSS, Framer Motion, 3D token spin, confetti, badge hover effects |

---

## 💡 Notes
- Ensure all transactions are verified on-chain for transparency.  
- Confetti and animations enhance user engagement.  
- NFT badges dynamically reflect community contributions.  
- Post-vote confirmations via MeshJS messages improve accountability.  
- Preprod ADA on Cardano testnet is sufficient for MVP testing.
