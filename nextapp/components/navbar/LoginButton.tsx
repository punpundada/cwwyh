import Container from "../Container";
import { Button } from "../ui/button";
import Link from "next/link";

const LoginButton = () => {
  return (
    <Container className="justify-end w-auto mx-4">
      <Button className="text-lg hover:translate-y-1 transition-all bg-secondary-foreground hover:bg-secondary-foreground">
        <Link href={"/login"}>Login</Link>
      </Button>
    </Container>
  );
};

export default LoginButton;
