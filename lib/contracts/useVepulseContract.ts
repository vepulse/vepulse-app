import { useWallet, useWalletModal } from "@vechain/dapp-kit-react"
import { useCallback } from "react"
import { ThorClient, type TransactionClause } from "@vechain/sdk-network"
import { CONTRACT_ADDRESS, CURRENT_NETWORK } from "./config"
import VepulseABI from "./VepulseABI.json"

const nodeUrl = CURRENT_NETWORK === "testnet"
  ? "https://testnet.vechain.org"
  : "https://mainnet.vechain.org"

export function useVepulseContract() {
  const { account, source } = useWallet()
  const { open: openWalletModal } = useWalletModal()

  const ensureWalletConnected = useCallback(() => {
    if (!account) {
      openWalletModal()
      return false
    }
    return true
  }, [account, openWalletModal])

  const createProject = useCallback(
    async (name: string, description: string) => {
      if (!ensureWalletConnected()) {
        throw new Error("Wallet not connected")
      }

      try {
        // Find the createProject function in ABI
        const createProjectABI = VepulseABI.find(
          (item: any) => item.type === "function" && item.name === "createProject"
        )

        if (!createProjectABI) {
          throw new Error("createProject function not found in ABI")
        }

        // Encode the function call
        const clause: TransactionClause = {
          to: CONTRACT_ADDRESS,
          value: "0x0",
          data: encodeFunction("createProject", [name, description]),
        }

        // Send transaction through the connected wallet
        const result = await source?.request({
          method: "thor_sendTransaction",
          params: [{
            clauses: [clause],
            comment: `Create project: ${name}`,
          }],
        })

        return result
      } catch (error) {
        console.error("Error creating project:", error)
        throw error
      }
    },
    [account, source, ensureWalletConnected]
  )

  const createPoll = useCallback(
    async (title: string, description: string, duration: number, projectId: number) => {
      if (!ensureWalletConnected()) {
        throw new Error("Wallet not connected")
      }

      try {
        const clause: TransactionClause = {
          to: CONTRACT_ADDRESS,
          value: "0x0",
          data: encodeFunction("createPoll", [title, description, duration, projectId]),
        }

        const result = await source?.request({
          method: "thor_sendTransaction",
          params: [{
            clauses: [clause],
            comment: `Create poll: ${title}`,
          }],
        })

        return result
      } catch (error) {
        console.error("Error creating poll:", error)
        throw error
      }
    },
    [account, source, ensureWalletConnected]
  )

  const createSurvey = useCallback(
    async (title: string, description: string, duration: number, projectId: number) => {
      if (!ensureWalletConnected()) {
        throw new Error("Wallet not connected")
      }

      try {
        const clause: TransactionClause = {
          to: CONTRACT_ADDRESS,
          value: "0x0",
          data: encodeFunction("createSurvey", [title, description, duration, projectId]),
        }

        const result = await source?.request({
          method: "thor_sendTransaction",
          params: [{
            clauses: [clause],
            comment: `Create survey: ${title}`,
          }],
        })

        return result
      } catch (error) {
        console.error("Error creating survey:", error)
        throw error
      }
    },
    [account, source, ensureWalletConnected]
  )

  const getProject = useCallback(
    async (projectId: number) => {
      try {
        const thor = new ThorClient(new URL(nodeUrl))

        const result = await thor.contracts.executeCall(
          CONTRACT_ADDRESS,
          encodeFunction("getProject", [projectId])
        )

        return result
      } catch (error) {
        console.error("Error getting project:", error)
        throw error
      }
    },
    []
  )

  return {
    account,
    isConnected: !!account,
    openWalletModal,
    createProject,
    createPoll,
    createSurvey,
    getProject,
  }
}

// Helper function to encode function calls
function encodeFunction(functionName: string, params: any[]): string {
  const func = VepulseABI.find(
    (item: any) => item.type === "function" && item.name === functionName
  )

  if (!func) {
    throw new Error(`Function ${functionName} not found in ABI`)
  }

  // This is a simplified encoding. In production, you'd use ethers.js or web3.js utils
  // For now, we'll use a basic approach with the VeChain SDK
  const { abi } = require("@vechain/sdk-core")
  const iface = new abi.Interface([func])
  return iface.encodeFunctionData(functionName, params)
}
