import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom";
import i18n from "../../../locales/i18n";
import LoginForm from "./LoginForm"

const t = i18n.getFixedT();

beforeEach(() => render(<LoginForm />));

describe('Test LoginForm', () => {

    it('Check existence of required fields in the LoginForm: identifier, password', async () => {
        const userEmailLoginInput = await screen.findByPlaceholderText(t('authLoginFormInputEmail'))

        //const passwordInput = screen.getByLabelText('password')
        const passwordInput = screen.getByPlaceholderText(t('authLoginFormInputPassword'))

        expect(userEmailLoginInput).toBeInTheDocument()
        expect(passwordInput).toBeInTheDocument()
    })

    it('Check Buttons to Register, Login', () => {
        const registerButton = screen.getByRole('button', { name: t('authLoginFormButtonRegister') })
        const loginButton = screen.getByRole('button', { name: t('authLoginFormButtonLogin') })

        expect(registerButton).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
    })

    it('testing env value', () => {
        console.log(process.env.NODE_ENV)
    })




})

