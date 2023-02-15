import { atom } from 'jotai'

/**
 * @example How to initialize an atom
 *
 * To initialise an atom, we use the imported function 'atom' and pass to it an initial value.
 */
export const countAtom = atom(0)

/**
 * When you want to read the atom's state, you need to pass the name of the atom you want to read to the 'useAtom' hook.
 * It will return its state and a function to update its value. Just like React's 'useState'.
 * @see {Counter}
 */
