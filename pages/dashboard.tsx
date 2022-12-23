import {
  Card,
  CardBody,
  CardHeader,
  Center,
  Container,
  Heading,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import HistoryCard from "../components/HistoryCard";
import abi from "../utils/contractABI.json";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { NavBar } from "../components/NavBar";

interface historyDetails {
  from: string;
  txn: string;
  matic: string;
  message: string;
  timestamp: number;
}

export default function history() {
  const [history, setHistory] = useState<historyDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { address, isConnected } = useAccount();

  const contractAbi = abi.abi;

  const getHistory = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum as any
        );
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          "0x3B79b994F08f8e3fBDddc90FEdc49EFB07af4c71",
          contractAbi,
          signer
        );

        const history = await contract.getTransactions(address);
        setHistory(history as historyDetails[]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isConnected) {
      getHistory();
    } else {
      alert("Please connect your wallet");
    }
  }, [isConnected]);

  return (
    <>
      <NavBar />
      <Center h="100vh">
        <Container maxW={"container.md"}>
          <Card>
            <CardHeader>
              <Heading size="md">History</Heading>
            </CardHeader>

            <CardBody>
              {history.length > 0 && isConnected && (
                <HistoryCard history={history} />
              )}
            </CardBody>
          </Card>
        </Container>
      </Center>
    </>
  );
}
