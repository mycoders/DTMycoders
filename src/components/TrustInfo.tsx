import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
type Props = {
  settlor: string;
  trustees: string[];
  beneficiaries: string[];
};

const TrustInfo = ({ settlor, trustees, beneficiaries }: Props) => {
  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold text-gray-900 ">
        dtrust Users
      </h2>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Settlor</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={1}>
            <Item>{settlor}</Item>
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Trustees</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={1}>
            {trustees &&
              trustees.map((trustee, index) => (
                <Item key={index}>{trustee}</Item>
              ))}
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Beneficiaries</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {beneficiaries &&
            beneficiaries.map((trustee, inx) => (
              <Item key={inx}>{trustee}</Item>
            ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default TrustInfo;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
