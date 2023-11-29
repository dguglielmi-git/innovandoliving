import { render, screen } from '@testing-library/react'
import * as nextRouter from 'next/router'
import MainPage from '../index'

describe('Testing Main page', () => {
  test('Testing 1', () => {
    nextRouter.useRouter = jest.fn()
    nextRouter.useRouter.mockImplementation(() => ({ route: '/', query: { query: ""} }))
    render(<MainPage />)
  })
})
