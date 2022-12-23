import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, Stack, StackDivider, Text } from '@chakra-ui/react'
import React from 'react'

export default function HistoryCard() {
    return (
        <Stack divider={<StackDivider />} spacing='4'>
            <Box>
                <Flex alignItems={'center'}>
                    <Avatar
                        src={
                            'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
                        }
                        name={'Avatar'}
                    />
                    <Box ml={2}>
                        <Heading size='sm'>
                            Vraj Desai
                        </Heading>
                        <Text fontSize={'xs'}>0xFa92cE12b5E93710668E28042d8f5d18B801FdeA</Text>
                    </Box>
                </Flex>
                <Text pt='2' fontSize='md'>
                    View a summary of all your clients over the last month.
                </Text>
            </Box>
        </Stack>
    )
}
