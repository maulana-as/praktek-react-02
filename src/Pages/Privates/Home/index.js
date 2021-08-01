import React from "react";
import { Button } from "@material-ui/core";
import { useFirebase } from "../../../Components/FirebaseProvider";

const Home = () => {
    const { auth } = useFirebase()
   return (
    <>
      <h1>Halaman Home</h1>
      <Button onClick={() => auth.signOut() }>Sign Out</Button>
    </>
  );
};
export default Home;
