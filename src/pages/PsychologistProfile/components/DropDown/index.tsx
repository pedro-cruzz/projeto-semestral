import React, { useState } from "react";
import { DropdownProps } from "./types";
import {
  DropdownContainer,
  Arrow,
  DropdownButton,
  DropdownItemLi,
  DropdownList,
} from "./styles";

const Dropdown: React.FC<DropdownProps> = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Função pra alternar o estado
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropdown}>
        {label}
        <Arrow isOpen={isOpen} />
      </DropdownButton>

      <DropdownList isOpen={isOpen}>
        {items?.map((item) => (
          <DropdownItemLi>{item}</DropdownItemLi>
        ))}
      </DropdownList>
    </DropdownContainer>
  );
};

export default Dropdown;
