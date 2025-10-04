"use client"

import { DAppKitProvider } from "@vechain/dapp-kit-react"
import type { ReactNode } from "react"
import { CURRENT_NETWORK } from "./contracts/config"

const nodeUrl = CURRENT_NETWORK === "testnet"
  ? "https://testnet.vechain.org"
  : "https://mainnet.vechain.org"

export function VeChainProvider({ children }: { children: ReactNode }) {
  return (
    <DAppKitProvider
      nodeUrl={nodeUrl}
      genesis={CURRENT_NETWORK === "testnet" ? "test" : "main"}
      usePersistence
      requireCertificate={false}
    >
      {children}
    </DAppKitProvider>
  )
}
