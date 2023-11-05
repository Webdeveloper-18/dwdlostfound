import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

function Home() {
  return (
    <Box display="flex" justifyContent="center">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h3" gutterBottom>
          Welcome to LostNFound!
        </Typography>
        <Typography variant="body1" paragraph>
          LostNFound is a platform designed to help you find lost items or return found items to their owners.
        </Typography>
        <Typography variant="body1" paragraph>
          Here's how you can use this website:
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>1. Explore Lost and Found Items:</strong>
          <br />
          Click on the three arrows button to open the sidebar and navigate to the "LostNFound!" page. You'll find all the posts shared by the community.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>2. View Post Details:</strong>
          <br />
          To see the details of a post, click on it in the "LostNFound!" page.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>3. Create a Post:</strong>
          <br />
          If you have lost an item or found something that belongs to someone else, click on the "Add Belonging" button in the "Found & Lost" page to create a new post.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>4. Explore User Profiles:</strong>
          <br />
          To learn more about the users of the app, click on "Users" in the sidebar.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>5. About the Creator:</strong>
          <br />
          Find out more about the creator and the platform click on the "About Us" page.
        </Typography>
      </Paper>
    </Box>
  );
}

export default Home;
