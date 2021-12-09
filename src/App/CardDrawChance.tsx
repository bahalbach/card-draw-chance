import * as React from "react";
import Box from "@mui/material/Box";
import NumberInput from "./NumberInput";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import hypergeometricCDF from "./hypergeometric";

export default function CardDrawChance() {
  const [deckSize, setDeckSize] = React.useState("60");
  const handleDeckSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeckSize(event.target.value);
  };
  const [drawSize, setDrawSize] = React.useState("7");
  const handleDrawSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDrawSize(event.target.value);
  };
  const [lookFor, setLookFor] = React.useState("4");
  const handleLookForChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLookFor(event.target.value);
  };
  const [chances, setChances] = React.useState([1]);

  const validateNumbers = (deck: number, draw: number, target: number) => {
    if (
      !Number.isInteger(deck) ||
      !Number.isInteger(draw) ||
      !Number.isInteger(target)
    ) {
      return false;
    }
    if (target < 0 || draw < 0 || deck < draw) {
      return false;
    }
    return true;
  };

  const calculateChances = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const deck = Number(deckSize);
    const draw = Number(drawSize);
    const target = Number(lookFor);
    if (!validateNumbers(deck, draw, target)) {
      return;
    }
    const chances = [];
    let lastChance = 0;
    for (let i = 0; i <= Math.min(target, draw); i++) {
      // calculate the chance to see <= i of target type
      const chance = hypergeometricCDF(i, draw, target, deck);
      chances.push(chance - lastChance);
      lastChance = chance;
    }
    setChances(chances);
  };

  const rows = chances.map((chance: number, index: number) => {
    return (
      <TableRow key={index}>
        <TableCell component="th" scope="row">
          {index}
        </TableCell>
        <TableCell align="right">{Math.round(chance * 100)}%</TableCell>
      </TableRow>
    );
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        my: 2,
      }}
    >
      <Box component="form" onSubmit={calculateChances} sx={{ mt: 0 }}>
        <NumberInput
          label="# of Cards in Deck"
          value={deckSize}
          onChange={handleDeckSizeChange}
        />
        <NumberInput
          label="# of Cards to Draw"
          value={drawSize}
          onChange={handleDrawSizeChange}
        />
        <NumberInput
          label="# of Cards to Look For"
          value={lookFor}
          onChange={handleLookForChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
        >
          Calculate Chance
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell># Drawn</TableCell>
            <TableCell align="right">Chance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{rows}</TableBody>
      </Table>
    </Box>
  );
}
