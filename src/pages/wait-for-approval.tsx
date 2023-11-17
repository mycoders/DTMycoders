import { Box, Typography, Button, Container } from "@mui/material";

const Page = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Thank You!
        </Typography>
        <Typography variant="subtitle1" component="p" gutterBottom>
          We will be approving your account soon! Please come back in 24 hours.
        </Typography>
      </Box>
    </Container>
  );
};

export default Page;
