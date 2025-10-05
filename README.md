# VePulse

A decentralized polling and survey platform built on VeChain blockchain. VePulse enables creators to launch polls and surveys while rewarding participants with cryptocurrency incentives.

## Features

- **Project Management**: Create and organize polls/surveys into projects
- **Poll Creation**: Launch time-bound polls with custom duration
- **Survey Creation**: Create detailed surveys for community feedback
- **Wallet Integration**: Connect with VeWorld, Sync2, and other VeChain wallets via DApp Kit
- **Rewards System**: Participants earn rewards for completing polls/surveys
- **Real-time Data**: View live poll/survey statistics and responses
- **Dark Mode**: Full dark/light theme support

## Tech Stack

- **Framework**: Next.js 15.2 (React 19)
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Blockchain**: VeChain Thor
- **Smart Contract Interaction**:
  - @vechain/dapp-kit-react v1.0.10
  - @vechain/sdk-core v1.0.0
  - @vechain/sdk-network v1.0.0
- **TypeScript**: Type-safe development
- **State Management**: React Hooks + Connex

## Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm** or **yarn**: Latest version
- **VeChain Wallet**: VeWorld or Sync2 browser extension
- **VET Tokens**: Testnet VET for testing (get from [VeChain Faucet](https://faucet.vecha.in/))

## Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd vepulse-app
```

2. **Install dependencies**

```bash
npm install
```

Note: If you encounter peer dependency issues, use:

```bash
npm install --legacy-peer-deps
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# VeChain Network Configuration
NEXT_PUBLIC_NETWORK=testnet

# Contract Address (automatically set based on network)
# Testnet: 0xf4cadfb4e6ba6b00b11cdaae22d5ebc792a85fb2
```

## Smart Contract

The smart contract for VePulse is located in the `../vepulse-contract` directory.

### Contract Addresses

- **Testnet**: `0xf4cadfb4e6ba6b00b11cdaae22d5ebc792a85fb2`
- **Mainnet**: TBD (deploy when ready)

### Key Contract Functions

- `createProject(name, description)` - Create a new project
- `createPoll(title, description, duration, projectId)` - Create a poll
- `createSurvey(title, description, duration, projectId)` - Create a survey
- `submitResponse(itemId)` - Submit response to poll/survey
- `getPollSurvey(itemId)` - Get poll/survey details
- `getUserProjects(address)` - Get user's projects
- `getUserPollsSurveys(address)` - Get user's polls/surveys

## Running the Application

### Development Mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Project Structure

```
vepulse-app/
├── app/                      # Next.js app directory
│   ├── creator/             # Creator dashboard & forms
│   ├── participant/         # Participant views
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   └── header.tsx           # Navigation header
├── lib/                     # Utility libraries
│   ├── contracts/           # Smart contract interactions
│   │   ├── config.ts        # Network & contract config
│   │   ├── useVepulseContract.ts  # Contract hooks
│   │   └── VepulseABI.json  # Contract ABI
│   └── vechain-provider.tsx # VeChain DApp Kit provider
├── public/                  # Static assets
└── .env.local              # Environment variables
```

## Connecting Your Wallet

1. Install [VeWorld](https://www.veworld.net/) or [Sync2](https://sync.vecha.in/) browser extension
2. Switch to VeChain Testnet in your wallet
3. Get testnet VET from the [VeChain Faucet](https://faucet.vecha.in/)
4. Click "Connect Wallet" in the app
5. Approve the connection in your wallet

## Development Workflow

### Creating a Project

1. Navigate to Creator Dashboard
2. Click "Create Project"
3. Fill in project name and description
4. Submit and approve transaction in wallet

### Creating a Poll/Survey

1. Navigate to "Create Poll" or "Create Survey"
2. Fill in required fields (title, description, duration)
3. Select a project to associate with
4. Submit and approve transaction

### Participating

1. Browse available polls/surveys
2. Click on a poll/survey to view details
3. Submit your response
4. Receive rewards automatically

## Troubleshooting

### Transaction Errors

If you encounter `Cannot read properties of undefined (reading 'isFinite')`:
- Ensure you're using the latest version of the code
- Check that your wallet is connected
- Verify you have sufficient VET for gas fees

### Wallet Connection Issues

- Clear browser cache and reconnect wallet
- Ensure you're on the correct network (testnet/mainnet)
- Try disconnecting and reconnecting your wallet

### Build Errors

If you get peer dependency warnings:
```bash
npm install --legacy-peer-deps
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Related Projects

- [vepulse-contract](../vepulse-contract) - Smart contract implementation

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Open an issue on GitHub
- Join our community on Discord
- Check VeChain documentation at [docs.vechain.org](https://docs.vechain.org)

## Acknowledgments

- VeChain Foundation for the blockchain infrastructure
- shadcn/ui for the beautiful component library
- The VeChain developer community
