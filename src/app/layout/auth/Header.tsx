import { Box, useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import logo from "@assets/logo.png";

const Header = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const padding = isLargeScreen ? theme.spacing(2) : theme.spacing(1);
  const imagePadding = isLargeScreen ? theme.spacing(2) : theme.spacing(1);
  const imageWidth = isLargeScreen ? "150px" : "100px";

  return (
    <Box textAlign="center" sx={{ padding: padding }}>
      <Box
        component="img"
        alt="logo"
        src={logo}
        sx={{
          padding: imagePadding,
          width: imageWidth,
        }}
      />
    </Box>
  );
};

export default Header; 