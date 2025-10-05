import { useWallet, useWalletModal, useConnex } from "@vechain/dapp-kit-react"
import { useCallback } from "react"
import { ThorClient } from "@vechain/sdk-network"
import { ABIContract } from "@vechain/sdk-core"
import { CONTRACT_ADDRESS, CURRENT_NETWORK } from "./config"
import VepulseABI from "./VepulseABI.json"

const THOR_URL = CURRENT_NETWORK === "testnet"
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
        const abiContract = ABIContract.ofAbi(VepulseABI as any)
        const encodedData = abiContract.encodeFunctionInput("createProject", [name, description])

        const clause = {
          to: CONTRACT_ADDRESS,
          value: "0x0",
          data: encodedData.toString()
        }

        const result = await vendor
          .sign("tx", [clause])
          .comment(`Create project: ${name}`)
          .request()

        return result.txid
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
        const abiContract = ABIContract.ofAbi(VepulseABI as any)
        const encodedData = abiContract.encodeFunctionInput("createPoll", [title, description, duration, projectId])

        const clause = {
          to: CONTRACT_ADDRESS,
          value: "0x0",
          data: encodedData.toString()
        }

        const result = await vendor
          .sign("tx", [clause])
          .comment(`Create poll: ${title}`)
          .request()

        return result.txid
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
        const abiContract = ABIContract.ofAbi(VepulseABI as any)
        const encodedData = abiContract.encodeFunctionInput("createSurvey", [title, description, duration, projectId])

        const clause = {
          to: CONTRACT_ADDRESS,
          value: "0x0",
          data: encodedData.toString()
        }

        const result = await vendor
          .sign("tx", [clause])
          .comment(`Create survey: ${title}`)
          .request()

        return result.txid
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
        const thorClient = ThorClient.at(THOR_URL)
        const contract = thorClient.contracts.load(CONTRACT_ADDRESS, VepulseABI as any)

        const result = await contract.read.getProject(projectId)
        return result[0]
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
        const thorClient = ThorClient.at(THOR_URL)
        const contract = thorClient.contracts.load(CONTRACT_ADDRESS, VepulseABI as any)

        const result = await contract.read.getUserProjects(userAddress)
        return result[0] as bigint[]
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
        const thorClient = ThorClient.at(THOR_URL)
        const contract = thorClient.contracts.load(CONTRACT_ADDRESS, VepulseABI as any)

        const result = await contract.read.getUserPollsSurveys(userAddress)
        return result[0] as bigint[]
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
        const thorClient = ThorClient.at(THOR_URL)
        const contract = thorClient.contracts.load(CONTRACT_ADDRESS, VepulseABI as any)

        const result = await contract.read.getPollSurvey(itemId)
        const decoded = result[0]

        return {
          id: decoded.id,
          itemType: decoded.itemType,
          title: decoded.title,
          description: decoded.description,
          creator: decoded.creator,
          projectId: decoded.projectId,
          createdAt: decoded.createdAt,
          endTime: decoded.endTime,
          status: decoded.status,
          fundingPool: decoded.fundingPool,
          totalResponses: decoded.totalResponses,
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
        const abiContract = ABIContract.ofAbi(VepulseABI as any)
        const encodedData = abiContract.encodeFunctionInput("submitResponse", [itemId])

        const clause = {
          to: CONTRACT_ADDRESS,
          value: "0x0",
          data: encodedData.toString()
        }

        const result = await vendor
          .sign("tx", [clause])
          .comment(`Submit response to poll/survey #${itemId}`)
          .request()

        return result.txid
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
        const thorClient = ThorClient.at(THOR_URL)
        const contract = thorClient.contracts.load(CONTRACT_ADDRESS, VepulseABI as any)

        const result = await contract.read.hasResponded(itemId, address)
        return result[0] as boolean
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
        const thorClient = ThorClient.at(THOR_URL)
        const contract = thorClient.contracts.load(CONTRACT_ADDRESS, VepulseABI as any)

        const result = await contract.read.getPotentialReward(itemId)
        return result[0] as bigint
      } catch (error) {
        console.error("Error getting potential reward:", error)
        return BigInt(0)
      }
    },
    []
  )

  const getAllPolls = useCallback(
    async (limit: number = 100) => {
      try {
        const polls = []

        // Try to fetch polls from ID 1 to limit
        for (let i = 1; i <= limit; i++) {
          try {
            const pollData = await getPollSurvey(i)

            // Only include if it exists (id > 0)
            if (pollData.id && Number(pollData.id) > 0) {
              polls.push({
                id: Number(pollData.id),
                itemType: Number(pollData.itemType),
                title: pollData.title,
                description: pollData.description,
                creator: pollData.creator,
                projectId: Number(pollData.projectId),
                createdAt: new Date(Number(pollData.createdAt) * 1000),
                endTime: new Date(Number(pollData.endTime) * 1000),
                status: Number(pollData.status),
                fundingPool: pollData.fundingPool,
                totalResponses: Number(pollData.totalResponses),
              })
            }
          } catch (error) {
            // Poll doesn't exist, continue to next
            continue
          }
        }

        return polls
      } catch (error) {
        console.error("Error getting all polls:", error)
        return []
      }
    },
    [getPollSurvey]
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
    getAllPolls,
  }
}
