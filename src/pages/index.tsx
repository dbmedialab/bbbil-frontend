import React from 'react'
import getConfig from 'next/config'
import styled from 'styled-components'
import { fetchWithTracing } from '@aller/express-opentracing'
import { ServerResponse, IncomingMessage } from 'http'

import Wrapper from '@/src/components/layout/Wrapper'
import Counter from '@/src/components/counter/Counter'
import setCachePolicy from '@/src/utils/setCachePolicy'
import { useInitTracking } from '@/src/utils/useTracker'
import Covid from '@/src/components/covid/Covid'

const { publicRuntimeConfig } = getConfig()

const Title = styled.h1`
  color: red;
  font-size: 50px;
`

interface Props {
  anyApp: boolean
  hostname: string
}

export const getServerSideProps = async ({
  res,
  req,
}: {
  res: ServerResponse
  req: IncomingMessage
}) => {
  setCachePolicy(res)

  const vaccinationApi = publicRuntimeConfig?.covid19VaccinationApi

  const { body } = await fetchWithTracing(`${vaccinationApi}`, { json: true }, req.span)

  return {
    props: {
      vaccinations: body || {},
    },
  }
}

const Home = (props: Props) => {
  useInitTracking()
  return (
    <Wrapper {...props}>
      <Title>My page</Title>
      <Counter />
      <Covid />
    </Wrapper>
  )
}

Home.whydidyourender = true

export default Home
