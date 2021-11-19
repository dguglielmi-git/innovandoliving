import React from 'react'
import '@testing-library/jest-dom';
import { screen, render } from "@testing-library/react"
import RegisterForm from './RegisterForm';
import i18n from "../../../locales/i18n"

beforeEach(() => render(<RegisterForm />))

describe('Registration Form', () => {

    it('Check the existence of required fields: name, lastname, username, email, password', () => {
        expect(screen.getByRole('textbox', { name: 'name' })).toBeInTheDocument()
        expect(screen.getByRole('textbox', { name: 'lastname' })).toBeInTheDocument()
        expect(screen.getByRole('textbox', { name: 'username' })).toBeInTheDocument()
        expect(screen.getByRole('textbox', { name: 'email' })).toBeInTheDocument()
        expect(screen.getByLabelText('password')).toBeInTheDocument();
    })

    it('Check existence of buttons Login and Register', () => {
        expect(screen.getByRole('button', { name: i18n.t('authRegisterFormButtonLogin') })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: i18n.t('authRegisterFormButtonRegister') })).toBeInTheDocument();
    })




})