import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';

const AboutUs = () => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" paragraph fontWeight={600} fontSize={20} color="orange">
          Jai Siya Ram 
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to LostNFound! I'm Ganesh(22BDS067), a second-year student majoring in Data Science and Artificial Intelligence.
          I created this platform with a simple goal in mind - to help you and our community.
        </Typography>
        <Typography variant="body1" paragraph>
          LostNFound allows you to share your lost and found items with others. It's a place where you can connect with
          people who may have found your belongings, or help someone else find what they've lost.
        </Typography>
        <Typography variant="body1" paragraph>
          This platform is built using the MERN stack, which stands for MongoDB, Express.js, Node.js, and React.js.
          Frontend development was done with TypeScript to ensure a smooth and reliable experience for users.
        </Typography>
        <Typography variant="body1" paragraph>
          This platform is built with REST API guidelines. It follows the principles of Representational State Transfer
          to provide a structured and efficient experience.
        </Typography>
        <Typography variant="body1" paragraph>
          LostNFound is capable of performing CRUD (Create, Read, Update, Delete) operations, allowing you to create and
          manage your posts easily. You can share details of the items you've lost or found, and others can reach out to
          you.
        </Typography>
        <Typography variant="body1" paragraph>
          If you encounter any issues or have suggestions for improvement, please don't hesitate to reach out to me via
          email. Your feedback is valuable, and I'm here to make your experience better.
        </Typography>
        <Typography variant="body1">
          Thank you for using LostNFound. I hope it serves you well and helps you find or return your lost items.
        </Typography>
      </Paper>
    </Container>
  );
};

export default AboutUs;
