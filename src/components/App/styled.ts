import { chakra, Box as ChaBox  } from "@chakra-ui/react";

export const Box = chakra(ChaBox, { baseStyle: {
    w: "100%",
    maxW: "500",
    p: "20px",
    flexDirection: "column",
    gap: "3",
    alignItems: "center",
    display: "flex",
} });