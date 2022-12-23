import { chakra, Flex, HStack } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const NavBar = () => {
  return (
    <React.Fragment>
      <chakra.header bg={"transparent"} w="full" px={{ base: 4, sm: 6 }} py={4}>
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex></Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <ConnectButton showBalance={false} />
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
};
