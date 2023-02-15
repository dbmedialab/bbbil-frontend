import React from 'react'
import { useAtom } from 'jotai'

import { covidAtom } from '@/src/store/covid'

function Covid() {
  const [covid] = useAtom(covidAtom)
  return (
    <>
      <h1>Covid</h1>
      <div>
        <h3>Vaccinated population</h3>
        {covid ? (
          <>
            <p>First dose: {covid.country.firstDosePercentage} %</p>
            <p>Second dose: {covid.country.secondDosePercentage} %</p>
            <p>Third dose: {covid.country.thirdDosePercentage} %</p>
          </>
        ) : (
          <p>No data fetched</p>
        )}
      </div>
    </>
  )
}

export default Covid
