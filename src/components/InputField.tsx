import { useState } from "react";
import { TextField, Checkbox } from "@mui/material";

interface InputFieldProps {
  label: string;
  placeholder: string;
  error: boolean;
  value: string;
  handleCanRevokeChange: Function;
  handleChange: Function;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  error,
  handleChange,
  label,
  placeholder,
  handleCanRevokeChange,
}) => {
  const [canRevokeAddresses, setCanRevokeAddresses] = useState([]);
  const ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/;

  return (
    <div className="flex items-center w-full">
      <TextField
        label={label}
        required
        placeholder={placeholder}
        error={error}
        fullWidth
        sx={{ mb: 0 }}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
      <div className="flex flex-col items-center justify-center min-w-[137px]">
        <label className="text-xs">Can Revoke</label>
        <Checkbox
          disabled={value.match(ethereumAddressRegex) == null}
          color="primary"
          sx={{ mb: 0 }}
          onChange={(e) => handleCanRevokeChange(e.target.checked)}
        />
      </div>
    </div>
  );
};

export default InputField;
