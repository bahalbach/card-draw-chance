import * as React from "react";
import TextField from "@mui/material/TextField";

type PropsType = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export default function NumberInput({ label, value, onChange }: PropsType) {
  return (
    <TextField
      margin="normal"
      fullWidth
      label={label}
      value={value}
      onChange={onChange}
      type="number"
      inputProps={{ inputMode: "numeric", pattern: "[0-9]*", min: 0 }}
    />
  );
}
