/* eslint-disable react-hooks/rules-of-hooks */
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
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  useDisclosure,
  Heading,
  ButtonGroup,
  Stack,
  HStack,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { useAccount, useEnsName } from "wagmi";
import abi from "../utils/contractABI.json";
import polygonLogo from "../assets/Polygon_blockchain_logo.png";

const App = () => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });

  const [domain, setDomain] = useState("");
  const imageUrl =
    "https://imgs.search.brave.com/nUj9LhRXAOuYHg3MNRbqx2PUG-DMhQCOgAN2hd1KFiY/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9pbWFn/ZXMud2FsbHBhcGVy/c2Rlbi5jb20vaW1h/Z2UvZG93bmxvYWQv/ZXRoZXJldW1fYkd0/cWJXV1VtWnFhcmFX/a3BKUm1ibWRsclda/blpXVS5qcGc";

  const ensDetails =
    "ENS (Ethereum Name Service) is a decentralized, open-source system that allows users to register, update, and manage human-readable names on the Ethereum blockchain. These names can be used as unique identifiers for smart contracts, cryptocurrency addresses, and other resources on the Ethereum network.";
  const contractAbi = abi.abi;
  const doNothing = async () => {};

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
    <Box
      bgGradient="radial-gradient(circle at 20% 20%, #c888fdda, rgba(76, 0, 255, 0), rgba(76, 0, 255, 0), #c888fdda, rgba(76, 0, 255, 0))"
      opacity={1}
      className="blurBg"
    >
      {" "}
      <NavBar />
      <SimpleGrid columns={{ base: 1, md: 1 }} spacing={0} padding={1}>
        <Flex
          direction="column"
          alignItems="start"
          justifyContent="center"
          px={{ base: 2, lg: 10 }}
          py={24}
        >
          <chakra.h1
            mb={6}
            fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            color="black"
            lineHeight="shorter"
          >
            What is domain?
          </chakra.h1>
          <chakra.form w="full" mb={6}></chakra.form>
          <chakra.p
            pr={{ base: 0, lg: 16 }}
            mb={6}
            fontSize="xl"
            color="black"
            _dark={{ color: "gray.400" }}
            letterSpacing="wider"
          >
            ENS (Ethereum Name Service) is a decentralized, open-source system
            that allows users to register, update, and manage human-readable
            names on the Ethereum blockchain. These names can be used as unique
            identifiers for smart contracts, cryptocurrency addresses, and other
            resources on the Ethereum network.
          </chakra.p>
        </Flex>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={0} padding={5}>
        <Flex
          direction="column"
          alignItems="start"
          justifyContent="center"
          px={{ base: 2, lg: 10 }}
          py={20}
        >
          <chakra.h1
            mb={6}
            fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            color="black"
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
                color="black"
                type="email"
                placeholder="Enter your .eth User Name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDomain(e.target.value)
                }
              />
              <InputRightElement w="auto">
                <Button
                  color="black"
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
            fontSize="xl"
            color="black"
            _dark={{ color: "gray.400" }}
            letterSpacing="wider"
          >
            Decentralised naming for wallets, websites, & more.
          </chakra.p>
        </Flex>
        <Box ml={30}>
          <Image
            src="https://cdn3d.iconscout.com/3d/premium/thumb/polygon-coin-6400031-5272781.png"
            fit="cover"
            w="60%"
            h="full"
            loading="lazy"
          />
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default App;
