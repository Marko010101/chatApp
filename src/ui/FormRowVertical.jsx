import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { ToggleButton } from "./Buttons/ToggleButton.jsx";
import Row from "./Row.jsx";
import ErrorDisplay from "./ErrorDisplay.jsx";

const StyledFormRow = styled(Row)`
  width: 100%;

  & label {
    font-weight: 500;
  }
`;

const Span = styled.span`
  position: relative;

  & input {
    width: 100%;
  }

  & span {
    right: 1.5rem;
  }
`;

function FormRowVertical({
  label,
  error,
  children,
  isPassword,
  onClick,
  isPasswordVisible,
}) {
  return (
    <StyledFormRow type="vertical" padding="1.2rem 0" gap="0.8rem">
      {label && <label htmlFor={children.props.id}>{label}</label>}
      <Span>
        {children}
        {isPassword && (
          <ToggleButton onClick={onClick}>
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </ToggleButton>
        )}
      </Span>
      {error && <ErrorDisplay error={error} padding="0rem" />}
    </StyledFormRow>
  );
}

export default FormRowVertical;
