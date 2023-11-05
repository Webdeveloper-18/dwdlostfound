import React from 'react'
import {Place,Phone,AccessTimeFilled}from '@mui/icons-material'
import { Link } from 'react-router-dom'
import {Typography,Box,Card,CardMedia,CardContent,Stack} from'@mui/material'
import { PropertyCardProps } from 'interfaces/property'
import { Badge } from '@mui/material'
function formatCreatedAt(createdAt: Date) {
  const date = new Date(createdAt);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  return `${hours}:${minutes} ${day}th ${month}`;
}

function PropertyCard({id,title,location,photo,phone,createdAt,foundlost}:PropertyCardProps) {
  
  return (
    <Badge badgeContent={foundlost} color={`${foundlost==='lost'?'warning':'success'}`} >
    <Card
    component={Link}
    to={`/belonging/show/${id}`}
    sx={{
      maxWidth:"330px",
      padding:'10px',
      '&:hover':{
        boxShadow:'0 22px 45px 2px rgba(176,176,176,0.1)'
      },
      cursor:'pointer',
      background:"#e6e1e3",
      textDecoration:'none'

    }}
    
    elevation={0}
    >
      {/* for the image */}
     <CardMedia 
     component='img'
     width="100%"
     height={210}
     image={photo}
     alt='card'
     sx={{borderRadius:'10px'}}
     />
{/* for the further details  */}
<CardContent sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',gap:'10px',paddingX:'5px'}} >
<Stack direction="column" gap={1} color="black">
  <Typography fontSize={16} fontWeight={500}>{title}</Typography>
  <Stack direction="row" gap={0.5} alignItems="flex-start">
    <Place sx={{fontSize:18,color:'black',marginTop:0.5}}/>
    <Typography fontSize={14} color="#808191">Room No. {location}</Typography>
  </Stack>
</Stack>
<Stack direction="column" gap={1} color="black">
  <Stack direction="row" gap={0.5} alignItems="flex-start">
  <AccessTimeFilled sx={{fontSize:18,color:'black',marginTop:0.5}}/>
  <Typography fontSize={14} >{formatCreatedAt(createdAt)}</Typography>
  </Stack>
 
  <Stack direction="row" gap={0.5} alignItems="flex-start">
    <Phone sx={{fontSize:18,color:'black',marginTop:0.5}}/>
    <Typography fontSize={14} color="#808191">{phone}</Typography>
  </Stack>
</Stack>
</CardContent>
    </Card></Badge>
  )
}

export default PropertyCard
