import { useWallet, useWalletModal } from "@vechain/dapp-kit-react"
import { useCallback } from "react"
import { ThorClient } from "@vechain/sdk-network"
import { ABIContract, Address, Clause } from "@vechain/sdk-core"
import { CONTRACT_ADDRESS, CURRENT_NETWORK } from "./config"
import VepulseABI from "./VepulseABI.json"

const THOR_URL = CURRENT_NETWORK === "testnet"
  ? "https://testnet.vechain.org"
  : "https://mainnet.vechain.org"

export function useVepulseContract() {
  const { account, signer } = useWallet()
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
        const contractClause = Clause.callFunction(
          Address.of(CONTRACT_ADDRESS),
          ABIContract.ofAbi(VepulseABI as any).getFunction("createProject"),
          [name, description],
          0n,
          { comment: `Create project: ${name}` }
        )

        const txId = await signer?.sendTransaction({
          clauses: [
            {
              to: contractClause.to,
              value: contractClause.value.toString(),
              data: contractClause.data.toString(),
            },
          ],
          comment: `Create project: ${name}`,
        })

        return txId
      } catch (error) {
        console.error("Error creating project:", error)
        throw error
      }
    },
    [account, signer, ensureWalletConnected]
  )

  const createPoll = useCallback(
    async (title: string, description: string, duration: number, projectId: number) => {
      if (!ensureWalletConnected()) {
        throw new Error("Wallet not connected")
      }

      try {
        const contractClause = Clause.callFunction(
          Address.of(CONTRACT_ADDRESS),
          ABIContract.ofAbi(VepulseABI as any).getFunction("createPoll"),
          [title, description, duration, projectId],
          0n,
          { comment: `Create poll: ${title}` }
        )

        const txId = await signer?.sendTransaction({
          clauses: [
            {
              to: contractClause.to,
              value: contractClause.value.toString(),
              data: contractClause.data.toString(),
            },
          ],
          comment: `Create poll: ${title}`,
        })

        return txId
      } catch (error) {
        console.error("Error creating poll:", error)
        throw error
      }
    },
    [account, signer, ensureWalletConnected]
  )

  const createSurvey = useCallback(
    async (title: string, description: string, duration: number, projectId: number) => {
      if (!ensureWalletConnected()) {
        throw new Error("Wallet not connected")
      }

      try {
        const contractClause = Clause.callFunction(
          Address.of(CONTRACT_ADDRESS),
          ABIContract.ofAbi(VepulseABI as any).getFunction("createSurvey"),
          [title, description, duration, projectId],
          0n,
          { comment: `Create survey: ${title}` }
        )

        const txId = await signer?.sendTransaction({
          clauses: [
            {
              to: contractClause.to,
              value: contractClause.value.toString(),
              data: contractClause.data.toString(),
            },
          ],
          comment: `Create survey: ${title}`,
        })

        return txId
      } catch (error) {
        console.error("Error creating survey:", error)
        throw error
      }
    },
    [account, signer, ensureWalletConnected]
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
        const contractClause = Clause.callFunction(
          Address.of(CONTRACT_ADDRESS),
          ABIContract.ofAbi(VepulseABI as any).getFunction("submitResponse"),
          [itemId],
          0n,
          { comment: `Submit response to poll/survey #${itemId}` }
        )

        const txId = await signer?.sendTransaction({
          clauses: [
            {
              to: contractClause.to,
              value: contractClause.value.toString(),
              data: contractClause.data.toString(),
            },
          ],
          comment: `Submit response to poll/survey #${itemId}`,
        })

        return txId
      } catch (error) {
        console.error("Error submitting response:", error)
        throw error
      }
    },
    [account, signer, ensureWalletConnected]
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
