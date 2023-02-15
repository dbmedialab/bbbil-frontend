import { atom } from 'jotai'

type CovidDetails = {
  firstDoseCount: number
  firstDosePercentage: number
  lastUpdated: string
  secondDoseCount: number
  secondDosePercentage: number
  thirdDoseCount: number
  thirdDosePercentage: number
}

type CovidDetailsWithCountyName = CovidDetails & { countyName: string }

export type CovidData = {
  counties: Record<string, CovidDetailsWithCountyName>[]
  country: CovidDetails
}

/**
 * @example How to initialize an atom
 *
 * To initialise an atom, we use the imported function 'atom' and pass to it an initial value.
 * This is a particular atom. It is initialised with a null value because is gonna be hydrated server side by the hook 'useHydrateAtoms'.
 * @see {useHydrateAtoms}
 */
export const covidAtom = atom<CovidData | null>(null)

/**
 * When you want to read the atom's state, you need to pass the name of the atom you want to read to the 'useAtom' hook.
 * It will return its state and a function to update its value. Just like React's 'useState'.
 * @see {Covid}
 */
