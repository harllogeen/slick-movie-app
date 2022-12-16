import { useState, useEffect } from "react";
import { extendTheme } from "@chakra-ui/react";
import {
  Center,
  ChakraProvider,
  Flex,
  FormControl,
  FormLabel,
  Stack,
} from "@chakra-ui/react";
import { Box, Text, Image, Input, HStack } from "@chakra-ui/react";
import Logo from "./assets/Logo.svg";
import HeadImage from "./assets/HeadImage2.jpg";
import PhoneImg from "./assets/phoneImg.png";
function App() {
  const [searchValue, setSearchValue] = useState("Harry Potter");
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);

  // function to get movies
  async function getMovies(search = "Avengers") {
    const url = `http://www.omdbapi.com/?s=${search}&apikey=ddd1d67b`;
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson;
  }

  // function to handle search submission
  function handleSubmit(e) {
    e.preventDefault();
    const value = e.target.children[1].value;
    setSearchValue(value);
  }

  // on load
  useEffect(() => {
    getMovies().then((response) => {
      setMovies(response.Search);
    });
  }, []);

  // on search
  useEffect(() => {
    getMovies(searchValue).then((response) => {
      setSearchedMovies(response.Search);
    });
  }, [searchValue]);

  // custom breakpoints
 const breakpoints ={
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
}

  const theme = extendTheme({ breakpoints });

  return (
    <ChakraProvider theme={theme}>
      <Box width="100%" backgroundColor="#e5e5e5">
        {/* Navbar */}
        <Box
          pl={{
            sm: "0px",
            md: "0px",
            lg: "77px",
          }}
          width="100%"
          height={{
            sm: "67px",
            md: "140px",
            lg: "140px",
          }}
          backgroundColor="#292929"
          display="flex"
          alignItems="center"
          justifyContent={{
            sm: "center",
            md: "center",
            lg: "flex-start",
          }}
        >
          <Image boxSize="193px" src={Logo} alt="Logo" />
        </Box>

        {/* Header */}
        <Box
          width="100%"
          height={{
            sm: "257px",
            md: "550px",
            lg: "550px",
          }}
          backgroundImage={HeadImage}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          display="flex"
          alignItems="center"
          justifyContent={{
            sm: "center",
            md: "center",
            lg: "flex-start",
          }}
          pl={{
            sm: "0px",
            md: "0px",
            lg: "77px",
          }}
        >
          <Box width="490px">
            <Text
              fontSize={{
                sm: "28px",
                md: "72px",
                lg: "72px",
              }}
              color="#fff"
              lineHeight="93.74px"
              fontWeight={700}
              textAlign={{
                sm: "center",
                md: "center",
                lg: "left",
              }}
            >
              Watch Something Incredible.
            </Text>
          </Box>
        </Box>

        {/* Search component */}
        <Box pl={{
            sm: "28px",
            md: "28px",
            lg: "77px",
        }} width="100%" pr="57px">
          <form onSubmit={handleSubmit}>
            <FormLabel>
              <Text mt="63px" mb="4px" fontSize="24px" color="#000">
                Search
              </Text>
            </FormLabel>
            <Input
              variant="outline"
              borderColor="#000"
              borderRadius="none"
              height="54px"
            />
          </form>
        </Box>

        {/* Movie category component */}
        <Box py="48px" width="100%" pl={{
            sm: "28px",
            md: "28px",
            lg: "77px",
        }}>
          <Text fontSize="24px" color="#000">
            {searchValue}
          </Text>
          <Text color="#000" mb="18px">
            SHIFT + Wheel - To Scroll sideways.
          </Text>
          <Box
            scrollBehavior="inside"
            overflowX="auto"
            maxWidth="100%"
            display="flex"
            css={{
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-track": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                borderRadius: "24px",
              },
            }}
          >
            {searchedMovies?.map((movie) => (
              <Box
                key={movie.imdbID}
                minWidth="300px"
                height="300px"
                p="10px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                backgroundColor="#000"
                borderRadius="12px"
                mr="13px"
                backgroundImage={`url(${movie.Poster})`}
              >
                <Center>
                  <Text fontSize="24px" color="#fff">
                    {movie.Title}
                  </Text>
                </Center>
              </Box>
            ))}
          </Box>
        </Box>

        {/* second category */}
        <Box pb="48px" width="100%" pl={{
            sm: "28px",
            md: "28px",
            lg: "77px",
        }}>
          <Text fontSize="24px" color="#000">
            Action
          </Text>
          <Text color="#000" mb="18px">
            SHIFT + Wheel - To Scroll sideways.
          </Text>
          <Box
            scrollBehavior="inside"
            overflowX="auto"
            maxWidth="100%"
            display="flex"
            css={{
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-track": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                borderRadius: "24px",
              },
            }}
          >
            {movies?.map((movie) => (
              <Box
                key={movie.imdbID}
                minWidth="300px"
                height="300px"
                p="10px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                backgroundColor="#000"
                borderRadius="12px"
                mr="13px"
                backgroundImage={`url(${movie.Poster})`}
              >
                <Center>
                  <Text fontSize="24px" color="#fff">
                    {movie.Title}
                  </Text>
                </Center>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
