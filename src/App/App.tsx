import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import ProTip from "./ProTip";
import Header from "./Header";
import CardDrawChance from "./CardDrawChance";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.benhalbach.com/">
        Ben Halbach
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function App() {
  return (
    <React.Fragment>
      <Header />
      <Container maxWidth="sm">
        <Box sx={{ my: 2 }}>
          <CardDrawChance />
          <Copyright />
        </Box>
      </Container>
    </React.Fragment>
  );
}
