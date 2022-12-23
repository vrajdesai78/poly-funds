import React, { useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { NavBar } from "../components/NavBar";
import { ethers, utils } from "ethers";
import {
  chakra,
  Box,
  Flex,
  Input,
  SimpleGrid,
  Button,
  InputGroup,
  InputRightElement,
  Image,
} from "@chakra-ui/react";
import { useAccount, useEnsName } from "wagmi";
import abi from "../utils/contractABI.json";

const App = () => {
  const { address, isConnected } = useAccount();

  const [domain, setDomain] = useState("");

  const contractAbi = abi.abi;

  const mintDomain = async () => {
    if (!isConnected) {
      alert("Please connect your wallet");
      return;
    }

    if (!domain) {
      alert("Please enter a domain");
      return;
    }

    const price =
      domain.length === 3 ? "0.05" : domain.length === 4 ? "0.02" : "0.01";

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

        let txn = await contract.register(domain, {
          value: utils.parseEther(price),
        });
        txn.wait().then(() => {
          console.log(txn.hash);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        bg="gray.300"
        spacing={0}
        padding={5}
      >
        <Flex
          direction="column"
          alignItems="start"
          justifyContent="center"
          px={{ base: 4, lg: 20 }}
          py={24}
        >
          <chakra.h1
            mb={6}
            fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            color="brand.600"
            lineHeight="shorter"
          >
            Get your own .eth domain.
          </chakra.h1>
          <chakra.form w="full" mb={6}>
            <InputGroup
              size="lg"
              w="full"
              display={{ base: "none", lg: "flex" }}
            >
              <Input
                size="lg"
                color="brand.900"
                type="email"
                placeholder="Enter your .eth domain"
                bg="white"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDomain(e.target.value)
                }
              />
              <InputRightElement w="auto">
                <Button
                  color="gray.200"
                  bg={"gray.800"}
                  variant="solid"
                  colorScheme="brand"
                  size="lg"
                  onClick={mintDomain}
                  roundedLeft={0}
                >
                  Mint Now
                </Button>
              </InputRightElement>
            </InputGroup>
          </chakra.form>
          <chakra.p
            pr={{ base: 0, lg: 16 }}
            mb={4}
            fontSize="sm"
            color="brand.600"
            _dark={{ color: "gray.400" }}
            letterSpacing="wider"
          >
            Get your own .eth domain with minimal fees. No more long and ugly
            Ethereum addresses.
          </chakra.p>
        </Flex>
        <Box>
          <Image
            src="https://images.unsplash.com/photo-1531548731165-c6ae86ff6491?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
            alt="3 women looking at a laptop"
            fit="cover"
            w="full"
            h={{ base: 64, md: "full" }}
            bg="gray.100"
            loading="lazy"
          />
        </Box>
      </SimpleGrid>
    </>
  );
};

export default App;
