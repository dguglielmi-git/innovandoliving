import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom";
import i18n from "../../../locales/i18n";
import LoginForm from "./LoginForm";
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const t = i18n.getFixedT();

const server = setupServer(
    rest.get('/api/route', (req, res, ctx) =>
        res(ctx.status(OK_STATUS), ctx.json({})),
    ),
);

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


beforeEach(() => render(<LoginForm />));

describe('Test LoginForm', () => {

    it('Check existence of required fields in the LoginForm: identifier, password', async () => {
        const userEmailLoginInput = await screen.findByPlaceholderText(t('authLoginFormInputEmail'))

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

    it('checking server connection', async () => {

        // declare the enpoint
        // when the form call this endpoint it will be intercepted by this
        // fake endpoint

        server.use(
            rest.get('/search/repositories', (req, res, ctx) =>
                res(
                    ctx.status(OK_STATUS),
                    ctx.json(
                        {
                        }
                    ),
                )
            )
        )

        // add code to click an element
        // read the result on the screen

    })





})

