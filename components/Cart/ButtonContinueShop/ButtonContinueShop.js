import React from "react";
import { Icon } from "semantic-ui-react";
import { useRouter } from "next/router";
import {
  Button as ButtonUnstyled,
  buttonClasses as buttonUnstyledClasses,
} from "@mui/base/Button";
import { styled } from "@mui/system";

const blue = {
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
};

const ButtonBackRoot = styled("span")`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background-color: ${blue[500]};
  padding: 12px 24px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.active} {
    background-color: ${blue[700]};
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1),
      0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

function ButtonBack(props) {
  return <ButtonUnstyled {...props} component={ButtonBackRoot} />;
}

export default function ButtonContinueShop(props) {
  const { label, icon, path } = props;
  const router = useRouter();

  return (
    <div className="btn-continue-shopping">
      <ButtonBack onClick={() => router.push(path || "/")}>
        <Icon name={icon || "shopping basket"} />
        {label}
      </ButtonBack>
    </div>
  );
}
