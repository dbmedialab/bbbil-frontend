import React, { FC } from 'react'
import { render } from '@testing-library/react'

const ExampleComponent: FC<{ name: string }> = ({ name }) => {
  return <div>{name} slim shady</div>
}

describe('example test', () => {
  it('the inserted props should have rendered correctly', async () => {
    const { getByText } = render(<ExampleComponent name="MyNameIs" />)

    expect(getByText('MyNameIs slim shady')).toBeInTheDocument()
  })
})
