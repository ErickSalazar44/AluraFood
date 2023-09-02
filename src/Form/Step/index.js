import React from "react";
import { TextField, Button, Box } from "@mui/material";

const MostrarInputs = ({ data, onSubmit }) => {
    return (
        <Box
            component='form'
            autoComplete='off'
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
            }}
            onSubmit={onSubmit}
        >
            {data.map((input, i) => {
                const { label, type, value, valid, helperText, onChange } =
                    input;
                return (
                    <TextField
                        key={i}
                        label={label}
                        variant='outlined'
                        fullWidth
                        margin='dense'
                        type={type}
                        error={valid === false}
                        helperText={`${valid === false ? helperText : ""}`}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                    />
                );
            })}
            <Button variant='contained' type='submit'>
                {"Siguiente"}
            </Button>
        </Box>
    );
};

export default MostrarInputs;
