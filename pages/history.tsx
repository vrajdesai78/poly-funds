import { Card, CardBody, CardHeader, Center, Container, Heading } from '@chakra-ui/react'
import React from 'react'
import HistoryCard from '../components/HistoryCard'

export default function history() {
    return (
        <Center h='100vh'>
            <Container maxW={'container.md'}>
                <Card>
                    <CardHeader>
                        <Heading size='md'>History</Heading>
                    </CardHeader>

                    <CardBody>
                        <HistoryCard />
                    </CardBody>
                </Card>
            </Container>
        </Center>
    )
}
