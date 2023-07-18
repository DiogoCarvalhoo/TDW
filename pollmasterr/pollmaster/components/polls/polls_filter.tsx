import React from "react";
import { FormControlLabel, Switch } from "@mui/material";

interface PollsItemProps {
  checked: boolean;
  handleChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

export default function PollsFilter({ checked, handleChange }: PollsItemProps) {
  return (
    <div
      className="p-3 bg-white shadow-sm rounded container my-1"
      style={{ border: "1px solid lightgrey" }}
    >
      <div className="row">
        <div className="col-6">
          <h4>Filtros</h4>
        </div>
        <div className="col-6">
          <FormControlLabel
            value="start"
            control={
              <Switch
                color="primary"
                checked={checked}
                onChange={handleChange}
              />
            }
            label="Polls Terminadas"
            labelPlacement="start"
          />
        </div>
      </div>
    </div>
  );
}
