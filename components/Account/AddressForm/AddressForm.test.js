import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import i18n from "../../../locales/i18n";
import AddressForm from "./AddressForm";

beforeEach(() => render(<AddressForm />))

describe('Check structure of AddressForm', () => {

    it('Check existence of required fields: title, name, address, city, state, zipCode, phone', () => {
        const titleAddress = screen.getByRole('textbox', { name: 'title' })
        const nameAddress = screen.getByRole('textbox', { name: 'name' })
        const addressAddress = screen.getByRole('textbox', { name: 'address' })
        const cityAddress = screen.getByRole('textbox', { name: 'city' })
        const stateAddress = screen.getByRole('textbox', { name: 'state' })
        const zipCodeAddress = screen.getByRole('textbox', { name: 'zipCode' })
        const phoneAddress = screen.getByRole('textbox', { name: 'phone' })


        expect(titleAddress).toBeInTheDocument()
        expect(nameAddress).toBeInTheDocument();
        expect(addressAddress).toBeInTheDocument();
        expect(cityAddress).toBeInTheDocument();
        expect(stateAddress).toBeInTheDocument();
        expect(zipCodeAddress).toBeInTheDocument();
        expect(phoneAddress).toBeInTheDocument();
    })
})