import { Box, Avatar, Typography, Grid, Divider } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { blue, grey } from "@mui/material/colors";

const Profile = () => {
  // Static data
  const name = "John Doe";
  const email = "johndoe@example.com";
  const bio =
    "Software engineer with 5 years of experience. Passionate about building efficient and user-friendly applications.";
  const birthdate = "1990-01-01";
  const gender = "Male";
  const profilePic = "https://via.placeholder.com/150";
  const verified = true;

  return (
    <Grid
      sx={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          boxShadow: 3,
          p: 4,
          borderRadius: 2,
          maxWidth: 600,
        }}
      >
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={12} sm={4}>
            <Avatar
              src={profilePic}
              alt={name}
              sx={{ width: 150, height: 150, mx: "auto" }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box display="flex" alignItems="center" mb={2}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: blue[700] }}
              >
                {name}
              </Typography>
              {verified && (
                <VerifiedUserIcon
                  sx={{ color: blue[500], fontSize: "1.5rem", ml: 1 }}
                />
              )}
            </Box>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ color: grey[700] }}
            >
              {email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {bio}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Birthdate: {birthdate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Gender: {gender}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default Profile;
