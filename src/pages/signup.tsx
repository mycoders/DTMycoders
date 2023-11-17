import { use, useEffect, useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useAddress, useUser } from "@thirdweb-dev/react";
import { client } from "../../sanity/sanity-utils";
import { useRouter } from "next/router";
import axios from "axios";

const Signup = () => {
  const address = useAddress();
  const [walletAddress, setWalletAddress] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  useEffect(() => {
    setWalletAddress(address);
  }, [address]);
  const checkIfUserIsRegistered = async () => {
    const user = await client.fetch(
      `*[_type == "users" && walletAddress == "${address}"]`
    );
    console.log(user, "user check if user is registered");
    if (user[0]?.isApproved == false && user[0].name && user[0].email) {
      console.log("user already registered");
      router.push("/wait-for-approval");
    } else if (user[0]?.isApproved == true && user[0].name && user[0].email) {
      router.push("/dashboard");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(
      `Wallet Address: ${walletAddress}, Name: ${name}, Email: ${email}`
    );
    const document = {
      _type: "users",
      walletAddress,
      name,
      email,
      isApproved: false,
    };
    try {
      const res = await axios.post("/api/dtrust-signup", document);
      console.log(res);
      if (res.data.success) {
        // checkIfUserIsRegistered();
        router.push("/wait-for-approval");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="50vh"
    >
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" mt={5}>
          <Typography variant="h4" gutterBottom>
            SignUp
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <TextField
                label="Wallet Address"
                variant="outlined"
                margin="normal"
                value={walletAddress}
                // onChange={(event) => setWalletAddress(event.target.value)}
                required
                fullWidth // added fullWidth prop
              />
              <TextField
                label="Name"
                variant="outlined"
                margin="normal"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                fullWidth // added fullWidth prop
              />
              <TextField
                label="Email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                fullWidth // added fullWidth prop
              />
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Signup;
