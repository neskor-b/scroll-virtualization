import { chakra, Box as ChaBox  } from "@chakra-ui/react";

export const Box = chakra(ChaBox, { baseStyle: {
    w: "100%",
    maxWidth: "700px",
    p: "20px 55px",
    flexDirection: "column",
    gap: "3",
    alignItems: "center",
    display: "flex",
    position: "relative",
} });