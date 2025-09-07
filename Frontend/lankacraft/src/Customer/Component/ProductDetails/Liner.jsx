import { memo } from 'react';

const Liner = () => {
  return (
    <div className="Liner">
       {/* Rating Bars */}
                <Box display="flex" alignItems="center" gap={2} mt={4}>
                  <LinearProgress
                    sx={{ bgcolor: "lightgray", borderRadius: 4, height: 7, flex: 1, width: "300px" }}
                    variant="determinate"
                    value={80}
                    color="success"
                  />
                  <p>Excellent</p>
                </Box>

                <Box display="flex" alignItems="center"mt={4} gap={2}>
                  <LinearProgress
                    sx={{ bgcolor: "lightgray", borderRadius: 4, height: 7, flex: 1 }}
                    variant="determinate"
                    value={60}
                    color="primary"
                  />
                  <p>Very Good</p>
                </Box>

                <Box display="flex" alignItems="center"mt={4} gap={2}>
                  <LinearProgress
                    sx={{ bgcolor: "lightgray", borderRadius: 4, height: 7, flex: 1 }}
                    variant="determinate"
                    value={40}
                    color="warning"
                  />
                  <p>Good</p>
                </Box>

                <Box display="flex" alignItems="center" mt={4} gap={2}>
                  <LinearProgress
                    sx={{ bgcolor: "lightgray", borderRadius: 4, height: 7, flex: 1 }}
                    variant="determinate"
                    value={15}
                    color="error"
                  />
                  <p>Poor</p>
                </Box>
    </div>
  );
};

export default memo(Liner);