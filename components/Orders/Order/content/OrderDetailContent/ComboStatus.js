import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { buildDataComboStructure } from "../../../../../utils/util";

export default function ComboStatus(props) {
    const { handleChange, options, statusValue } = props;
    const [statusList, setStatusList] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        const formattedList = buildDataComboStructure(options);
        setStatusList(formattedList);
    }, []);

    return (
        <div className="order-combo-status">
            <Dropdown
                selection
                value={ statusValue }
                options={ statusList }
                onChange={ handleChange }
                placeholder={ t('comboStatusPlaceholder') }
            />
        </div>
    )
}