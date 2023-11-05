import React from 'react'
import {Box,Typography,Stack} from '@mui/material'
import {propertyReferralsInfo} from '../../constants/index'


interface Progressbarprops{
  title:string,
  percentage:number,
  color:string
}
const Progressbar=({title,percentage,color}:Progressbarprops)=>(
     <Box width="100%">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
           <Typography fontSize={16} fontWeight={500} color="#11142d">{title}</Typography>
           <Typography fontSize={16} fontWeight={500} color="#11142d">{percentage}%</Typography>
      </Stack>
      <Box mt={2} position="relative" width="100%" height="8px" borderRadius={1} bgcolor="white">
    <Box bgcolor={color} width={`${percentage}%`} position="absolute" height="100%" borderRadius={1}/>
      </Box>
     </Box>
)

function PropertyReferal() {
  return (
    <Box 
    p={4}
    
    bgcolor="#e6e1e3"
    id="chart"
    minWidth={490}
    display="flex"
    flexDirection="column"
    borderRadius="15px"
    >
<Typography fontSize={18} fontWeight={600} color="#11142d">Proerty Referal</Typography>
<Stack my="20px" direction="column" gap={4}>
  {propertyReferralsInfo.map((e)=><Progressbar key={e.percentage} title={e.title} color={e.color} percentage={e.percentage}/>)}
</Stack>
    </Box>
  )
}

export default PropertyReferal
