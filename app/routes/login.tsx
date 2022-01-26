import {
  ActionFunction,
  Form,
  json,
  Links,
  LoaderFunction,
  Meta,
  redirect,
  Scripts,
  useActionData,
  useCatch,
  useTransition,
} from "remix";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { authenticator, supabaseStrategy } from "~/services/auth.server";
import { useEffect } from "react";
import { AuthorizationError } from "remix-auth";

export const loader: LoaderFunction = async ({ request }) =>
  supabaseStrategy.checkSession(request, { successRedirect: "/cooks" });

export const action: ActionFunction = async ({ request }) => {
  return authenticator
    .authenticate("sb", request, {
      successRedirect: "/cooks",
    })
    .catch((error) => {
      return error;
    });
};

export default function LoginPage() {
  const data = useActionData();
  const isSubmitting = useTransition();
  const toast = useToast();

  useEffect(() => {
    if (!data || !data?.message?.startsWith("Invalid")) return;
    toast({
      description: data.message,
      status: "error",
      position: "bottom-right",
      isClosable: true,
    });
  }, [data]);

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Sign in to your account</Heading>
          <Text fontSize="lg" color="gray.600">
            to enjoy all of our cool <Link color="blue.400">features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue("white", "gray.700")}
          boxShadow="lg"
          p={8}
        >
          <Form method="post">
            <Stack spacing={4}>
              <FormControl
                id="email"
                isInvalid={data?.message?.startsWith("Email")}
              >
                <FormLabel>Email address</FormLabel>
                <Input type="email" name="email" />
                <FormErrorMessage>{data?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                id="password"
                isInvalid={data?.message?.startsWith("Password")}
              >
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password" />
                <FormErrorMessage>{data?.message}</FormErrorMessage>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align="start"
                  justify="space-between"
                >
                  <Link color="blue.400">Forgot password?</Link>
                </Stack>
                <Button
                  bg="blue.400"
                  color="white"
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                  disabled={isSubmitting.state === "submitting"}
                  isLoading={isSubmitting.state === "submitting"}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Form>
        </Box>
      </Stack>
    </Flex>
  );
}
