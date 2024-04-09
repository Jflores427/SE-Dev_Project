import {
  DialogContent,
  DialogTitle,
  Dialog,
  Container,
  Typography,
  Button,
  Box,
  Grid,
  createTheme,
  ThemeProvider,
  Slide,
  Link,
  useMediaQuery,
} from "@mui/material";
import { useState, useEffect } from "react";

import CustomPaletteOptions from "../UI/CustomPaletteOptions";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Club {
  id: number;
  name: string;
  member_count: number;
  image: string | null;
}

interface MyClubsProps {
  myClubsOpen: boolean;
  handleMyClubsOpen: () => void;
  handleMyClubsClose: () => void;
  clubs: Club[] | null;
  setClubs: (club: Club[] | null) => void;
  followedClubs: Map<number, number>;
  setFollowedClubs: (club: Map<number, number>) => void;
}

const slideTransition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const MyClubs = (props: MyClubsProps) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#7108d8",
      },
      secondary: {
        main: "#8B139C",
      },
      back: {
        main: "#ced4da",
        light: "#fff",
        dark: "#000",
        contrastText: "purple",
      },
    } as CustomPaletteOptions,
  });

  const navigate = useNavigate();

  const {
    myClubsOpen,
    handleMyClubsOpen,
    handleMyClubsClose,
    clubs,
    setClubs,
    followedClubs,
    setFollowedClubs,
  } = props;

  const fetchFollowedClubs: () => Promise<void> = async () => {
    let response = await fetch(`api/clubs/fetch/GetFollowedClubs`, {
      method: "GET",
    });

    if (response.ok) {
      response.json().then((value) => {
        console.log("FollowedClubs: " + value.clubs_id);
        for (let clubID of value.clubs_id) {
          setFollowedClubs(new Map(followedClubs.set(clubID, 1)));
        }
        setClubs(value.clubs_data);
        console.log(value.clubs_data);
      });
    } else {
      console.log("No Clubs Found");
      setClubs([]);
      setFollowedClubs(new Map());
    }
  };

  const ToggleFollow: (
    clubName: string,
    clubID: number
  ) => Promise<void> = async (clubName, clubID) => {
    const response = await fetch(
      `api/clubs/GetFollowStatus/${clubName}/${clubID}`,
      {
        method: "GET",
      }
    );

    if (response.ok) {
      response.json().then(async (value) => {
        if (value.follow_status && followedClubs.has(clubID)) {
          const followResponse = await fetch(
            `api/clubs/unfollow/${clubName}/${clubID}`,
            {
              method: "GET",
            }
          );

          if (followResponse.ok) {
            followedClubs.delete(clubID);
            setFollowedClubs(new Map(followedClubs));
          } else {
            console.log("Follow Status: true - " + response.status);
          }
        } else {
          const followResponse = await fetch(
            `api/clubs/follow/${clubName}/${clubID}`,
            {
              method: "GET",
            }
          );

          if (followResponse.ok) {
            setFollowedClubs(new Map(followedClubs.set(clubID, 1)));
          } else {
            console.log("Follow Status: false - " + response.status);
          }
        }
      });
    }
  };

  useEffect(() => {
    fetchFollowedClubs();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={myClubsOpen}
        onClose={handleMyClubsClose}
        TransitionComponent={slideTransition}
        fullWidth
        maxWidth={"sm"}
        PaperProps={{
          sx: {
            height: "100%",
            border: "2px #000 solid",
            borderRadius: "20px",
          },
        }}
      >
        <DialogTitle
          sx={{
            background:
              "linear-gradient(90deg, rgba(78,26,157,1) 0%, rgba(126,2,237,1) 99%)",
            color: "back.light",
            border: "2px #000 solid",
            borderRadius: "15px",
          }}
        >
          <Container
            component="div"
            sx={{
              display: "flex",
              columnGap: 5,
              justifyContent: "center",
            }}
          >
            <Typography
              component="h2"
              variant="h2"
              fontFamily="RampartOne"
              sx={{ color: "back.light" }}
            >
              My Clubs
            </Typography>
          </Container>
        </DialogTitle>

        <DialogContent
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Box
            sx={{
              mt: "3%",
              backgroundColor: "primary.main",
              borderRadius: "20px",
              minHeight: "95%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {clubs && clubs.length > 0 ? (
                <Grid
                  container
                  spacing={0}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  {clubs.map((club) => (
                    <Grid
                      item
                      xs={12}
                      sx={{
                        padding: 2,
                        margin: 2,
                        display: "flex",
                        backgroundColor: "back.main",
                        border: "2px back.dark solid",
                        borderRadius: "20px",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        component="img"
                        alt="Club Logo"
                        src={"../../../../media/" + club.image}
                        sx={{
                          width: "50px",
                          height: "50px",
                          border: "2px solid black",
                          borderRadius: "10px",
                          display: { xs: "none", sm: "block", md: "block" },
                        }}
                      ></Box>
                      <Box
                        sx={{ display: "flex", flexFlow: "column wrap", px: 2 }}
                      >
                        <Box
                          sx={{
                            border: "0px black solid",
                            width: "13.5vw",
                            maxWidth: "20vw",
                          }}
                        >
                          <Link
                            variant="h5"
                            onClick={() =>
                              navigate(`/club/${club.name}/${club.id}`)
                            }
                            sx={{
                              wordBreak: "break-word",
                              color: "back.dark",
                              cursor: "pointer",
                              "&:hover": { color: "primary.main" },
                            }}
                            underline="always"
                            color="primary.main"
                          >
                            {club.name}
                          </Link>
                        </Box>
                        <Box>
                          {/* <Typography
                            component="span"
                            color="secondary.dark"
                            sx={{ height:"20", fontStyle :"italic", wordBreak:"break-word"}}
                          >
                            {club.description}
                          </Typography> */}
                          <Typography
                            component="span"
                            sx={{
                              color: "primary.main",
                              fontSize: "1rem",
                              fontWeight: "700",
                              fontStyle: "italic",
                            }}
                          >
                            Members: {club.member_count}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexFlow: "column wrap",
                          justifyContent: "center",
                          minWidth: "30%",
                        }}
                      >
                        <Button
                          key={club.id}
                          sx={{
                            backgroundColor: "primary.main",
                            color: "back.light",
                            border: "2px solid #000",
                            borderRadius: "20px",
                            "&:hover": { backgroundColor: "secondary.main" },
                          }}
                          onClick={() => ToggleFollow(club.name, club.id)}
                        >
                          {followedClubs.has(club.id) ? "Unfollow" : "Follow"}
                        </Button>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexFlow: "column nowrap",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    component="h2"
                    variant="h2"
                    sx={{
                      color: "back.light",
                      fontFamily: "RampartOne",
                      fontSize: "2rem",
                    }}
                  >
                    No Clubs To Show...
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default MyClubs;
