import { Typography, Box } from "@mui/material";
import { getFormattedVersion } from "@config/constants";

const Footer = () => {
  const versionInfo = getFormattedVersion();

  return (
    <Box 
      sx={{ 
        textAlign: 'center', 
        padding: 2,
        mt: 1
      }}
    >
      <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>
        {versionInfo}
      </Typography>
    </Box>
  );
};

export default Footer; 