import { useWallet, useWalletModal, useConnex } from "@vechain/dapp-kit-react"
import { useCallback } from "react"
import { ThorClient } from "@vechain/sdk-network"
import { CONTRACT_ADDRESS, CURRENT_NETWORK } from "./config"
import VepulseABI from "./VepulseABI.json"
import { ethers } from "ethers"

const nodeUrl = CURRENT_NETWORK === "testnet"
  ? "https://testnet.vechain.org"
  : "https://mainnet.vechain.org"

export function useVepulseContract() {
  const { account } = useWallet()
  const { open: openWalletModal } = useWalletModal()
  const { vendor } = useConnex()

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
        // Encode the function call
        const data = encodeFunction("createProject", [name, description])

        // Create the transaction clause
        const clause = {
          to: CONTRACT_ADDRESS,
          value: "0x0",
          data,
        }

        // Send transaction through Connex vendor
        const txResponse = await vendor
          .sign("tx", [clause])
          .comment(`Create project: ${name}`)
          .request()

        return txResponse
      } catch (error) {
        console.error("Error creating project:", error)
        throw error
      }
    },
    [account, vendor, ensureWalletConnected]
  )

  const createPoll = useCallback(
    async (title: string, description: string, duration: number, projectId: number) => {
      if (!ensureWalletConnected()) {
        throw new Error("Wallet not connected")
      }

      try {
        const data = encodeFunction("createPoll", [title, description, duration, projectId])

        const clause = {
          to: CONTRACT_ADDRESS,
          value: "0x0",
          data,
        }

        const txResponse = await vendor
          .sign("tx", [clause])
          .comment(`Create poll: ${title}`)
          .request()

        return txResponse
      } catch (error) {
        console.error("Error creating poll:", error)
        throw error
      }
    },
    [account, vendor, ensureWalletConnected]
  )

  const createSurvey = useCallback(
    async (title: string, description: string, duration: number, projectId: number) => {
      if (!ensureWalletConnected()) {
        throw new Error("Wallet not connected")
      }

      try {
        const data = encodeFunction("createSurvey", [title, description, duration, projectId])

        const clause = {
          to: CONTRACT_ADDRESS,
          value: "0x0",
          data,
        }

        const txResponse = await vendor
          .sign("tx", [clause])
          .comment(`Create survey: ${title}`)
          .request()

        return txResponse
      } catch (error) {
        console.error("Error creating survey:", error)
        throw error
      }
    },
    [account, vendor, ensureWalletConnected]
  )

  const getProject = useCallback(
    async (projectId: number) => {
      try {
        const thor = new ThorClient(new URL(nodeUrl))
        const data = encodeFunction("getProject", [projectId])

        const result = await thor.contracts.executeCall(CONTRACT_ADDRESS, data)

        return result
      } catch (error) {
        console.error("Error getting project:", error)
        throw error
      }
    },
    []
  )

  const getUserProjects = useCallback(
    async (userAddress: string) => {
      try {
        const thor = new ThorClient(new URL(nodeUrl))
        const data = encodeFunction("getUserProjects", [userAddress])

        const result = await thor.contracts.executeCall(CONTRACT_ADDRESS, data)

        // Decode the result to get project IDs
        const iface = new ethers.Interface(VepulseABI as any)
        const decoded = iface.decodeFunctionResult("getUserProjects", result.data)

        return decoded[0] as bigint[]
      } catch (error) {
        console.error("Error getting user projects:", error)
        return []
      }
    },
    []
  )

  const getUserPollsSurveys = useCallback(
    async (userAddress: string) => {
      try {
        const thor = new ThorClient(new URL(nodeUrl))
        const data = encodeFunction("getUserPollsSurveys", [userAddress])

        const result = await thor.contracts.executeCall(CONTRACT_ADDRESS, data)

        // Decode the result to get poll/survey IDs
        const iface = new ethers.Interface(VepulseABI as any)
        const decoded = iface.decodeFunctionResult("getUserPollsSurveys", result.data)

        return decoded[0] as bigint[]
      } catch (error) {
        console.error("Error getting user polls/surveys:", error)
        return []
      }
    },
    []
  )

  const getPollSurvey = useCallback(
    async (itemId: number) => {
      try {
        const thor = new ThorClient(new URL(nodeUrl))
        const data = encodeFunction("getPollSurvey", [itemId])

        const result = await thor.contracts.executeCall(CONTRACT_ADDRESS, data)

        // Decode the result
        const iface = new ethers.Interface(VepulseABI as any)
        const decoded = iface.decodeFunctionResult("getPollSurvey", result.data)

        return {
          id: decoded[0],
          itemType: decoded[1],
          title: decoded[2],
          description: decoded[3],
          creator: decoded[4],
          projectId: decoded[5],
          createdAt: decoded[6],
          endTime: decoded[7],
          status: decoded[8],
          fundingPool: decoded[9],
          totalResponses: decoded[10],
        }
      } catch (error) {
        console.error("Error getting poll/survey:", error)
        throw error
      }
    },
    []
  )

  const submitResponse = useCallback(
    async (itemId: number) => {
      if (!ensureWalletConnected()) {
        throw new Error("Wallet not connected")
      }

      try {
        const data = encodeFunction("submitResponse", [itemId])

        const clause = {
          to: CONTRACT_ADDRESS,
          value: "0x0",
          data,
        }

        const txResponse = await vendor
          .sign("tx", [clause])
          .comment(`Submit response to poll/survey #${itemId}`)
          .request()

        return txResponse
      } catch (error) {
        console.error("Error submitting response:", error)
        throw error
      }
    },
    [account, vendor, ensureWalletConnected]
  )

  const hasResponded = useCallback(
    async (itemId: number, address: string) => {
      try {
        const thor = new ThorClient(new URL(nodeUrl))
        const data = encodeFunction("hasResponded", [itemId, address])

        const result = await thor.contracts.executeCall(CONTRACT_ADDRESS, data)

        // Decode the result
        const iface = new ethers.Interface(VepulseABI as any)
        const decoded = iface.decodeFunctionResult("hasResponded", result.data)

        return decoded[0] as boolean
      } catch (error) {
        console.error("Error checking if responded:", error)
        return false
      }
    },
    []
  )

  const getPotentialReward = useCallback(
    async (itemId: number) => {
      try {
        const thor = new ThorClient(new URL(nodeUrl))
        const data = encodeFunction("getPotentialReward", [itemId])

        const result = await thor.contracts.executeCall(CONTRACT_ADDRESS, data)

        // Decode the result
        const iface = new ethers.Interface(VepulseABI as any)
        const decoded = iface.decodeFunctionResult("getPotentialReward", result.data)

        return decoded[0] as bigint
      } catch (error) {
        console.error("Error getting potential reward:", error)
        return BigInt(0)
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
    getUserProjects,
    getUserPollsSurveys,
    getPollSurvey,
    submitResponse,
    hasResponded,
    getPotentialReward,
  }
}

// Helper function to encode function calls
function encodeFunction(functionName: string, params: any[]): string {
  try {
    // Create an interface from the ABI
    const iface = new ethers.Interface(VepulseABI as any)

    // Encode the function call
    const data = iface.encodeFunctionData(functionName, params)

    return data
  } catch (error) {
    console.error(`Error encoding function ${functionName}:`, error)
    throw new Error(`Failed to encode function ${functionName}: ${error}`)
  }
}
