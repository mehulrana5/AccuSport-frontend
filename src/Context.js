import React, { createContext, useEffect, useState } from 'react';
// Create a new context
const AppContext = createContext();

// Create a provider component to wrap the app with
export const AppProvider = ({ children }) => {

  const baseUrl = process.env.REACT_APP_BASE_URL || "https://accusport-backend.onrender.com";
  // console.log(baseUrl);  
  const [authToken, setAuthToken] = useState("");
  const [userInfo, setUserInfo] = useState({
    _id: "",
    email: "",
    roles: []
  });

  const [playerInfo, setPlayerInfo] = useState({
    user_id: "", // Assign the user ID to the player's user_id field
    player_name: "",
    player_dob: "",
    team_ids: [],
    _id: ""
  });

  // ------------------functions--------------------------
  const login = async (user_email, user_pwd) => {
    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user_email,
          password: user_pwd,
        }),
      });
      const data = await response.json();
      if (response.status !== 200) return alert(data.error)
      setAuthToken(data.jwtToken);
      localStorage.setItem('auth-token', data.jwtToken);
    } catch (error) {
      console.error('Error during login:', error);
    }
  }
  const fetchUserData = async () => {
    try {
      const response = await fetch(`${baseUrl}/fetchUserData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken
        }
      });
      const data = await response.json();
      setUserInfo(data.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      alert("Login again")
      localStorage.removeItem("auth-token")
      throw error;
    }
  }
  const register = async (cred) => {
    try {
      const response = await fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: cred.email,
          password: cred.password,
        }),
      });

      const data = await response.json();
      if (response.status === 200) {
        setAuthToken(data.authToken);
      }
      else {
        alert(data.error)
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  function logout() {
    setAuthToken("")
    setUserInfo({
      user_id: "",
      email: "",
      roles: []
    })
    setPlayerInfo({
      user_id: "", // Assign the user ID to the player's user_id field
      player_name: "",
      player_dob: "",
      team_ids: [],
      _id: ""
    })
    localStorage.removeItem('auth-token')
    window.location.reload();
  }
  // 
  //  Player
  // 
  const fetchPlayers = async (query, fetchBy) => {
    try {
      const response = await fetch(`${baseUrl}/fetchPlayers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: query,
          fetchBy: fetchBy
        })
      });

      const data = await response.json();

      return data;

    } catch (error) {
      console.error(error);
    }
  };
  const createPlayer = async (cred) => {
    try {
      const response = await fetch(`${baseUrl}/registerPlayer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken
        },
        body: JSON.stringify(cred)
      });

      const data = await response.json();
      if (response.status !== 400) {
        setPlayerInfo(data);
        fetchUserData();
      }
      alert(data.error)
    } catch (error) {
      console.error('Error:', error);
    }
  };
  // 
  //  Team
  // 
  const createTeam = async (team) => {
    try {
      const response = await fetch(`${baseUrl}/createTeam`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken
        },
        body: JSON.stringify(team)
      });
      const data = await response.json();
      if (response.ok) {
        await fetchTeam(userInfo._id, "user");
      }
      else {
        alert(data.error)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const deleteTeam = async (tid) => {
    try {
      const response = await fetch(`${baseUrl}/deleteTeam`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken
        },
        body: JSON.stringify({
          team_id: tid
        })
      })
      const data = await response.json();
      return data;
      // await fetchTeam(userInfo._id, "user");
    } catch (error) {
      console.log(error);
    }
  };
  const updateTeamPlayers = async (leader, players, teamId) => {
    try {
      const response = await fetch(`${baseUrl}/updateTeamPlayers`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken
        },
        body: JSON.stringify({
          team_leader: leader,
          players: players,
          teamId: teamId
        })
      })
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  const fetchTeam = async (query, fetchBy) => {
    try {
      const response = await fetch(`${baseUrl}/fetchTeam`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: query,
          fetchBy: fetchBy
        })
      })
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  // 
  //  Torunament
  // 
  const createTournament = async (data) => {
    try {
      if (!data.match_admins.includes(playerInfo._id)) {
        data.match_admins.push(playerInfo._id);
      }
      const response = await fetch(`${baseUrl}/createTournament`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken
        },
        body: JSON.stringify(data)
      })
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  }
  const fetchTournament = async (query, fetchBy) => {
    try {
      const response = await fetch(`${baseUrl}/fetchTournament`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, fetchBy }),
      });

      if (!response.ok) {
        throw new Error(`Fetch request failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.log(error);
    }
  };
  const updateTournament = async (data) => {
    try {
      console.log(data.start_date_time);
      const response = await fetch(`${baseUrl}/updateTournament/${data._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken
        },
        body: JSON.stringify({
          tournament_status: data.tournament_status,
          start_date_time: data.start_date_time,
          description: data.description,
          match_admins: data.match_admins
        })
      })
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  }
  const deleteTournament = async (pid) => {
    try {
      const response = await fetch(`${baseUrl}/deleteTournament`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken
        },
        body: JSON.stringify({ tournamentId: pid })
      })
      const data = await response.json();
      return data

    } catch (error) {
      console.log(error);
    }
  }
  // 
  //  Match
  // 
  const createMatch = async (data) => {
    try {
      const response = await fetch(`${baseUrl}/createMatch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken
        },
        body: JSON.stringify({
          tournament_id: data.tournamentId,
          match_start_date_time: data.matchStartDateTime,
          match_end_date_time: data.matchEndDateTime,
          description: data.matchDescription,
          teams: [data.team1, data.team2],
          OLC: data.locationId,
        })
      });

      const json = await response.json();
      return { data: json, status: response.status };
    } catch (error) {
      console.log(error);
    }
  };
  const updateMatch = async (data) => {
    try {
      const response = await fetch(`${baseUrl}/updateMatch`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken
        },
        body: JSON.stringify(data)
      });

      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  }
  const fetchMatches = async (query, fetchBy) => {
    try {
      const response = await fetch(`${baseUrl}/fetchMatches`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: query,
          fetchBy: fetchBy
        })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  // 
  //  Data points
  // 
  const createDataPoints = async (data) => {
    try {
      const response = await fetch(`${baseUrl}/createDataPoints`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken
        },
        body: JSON.stringify(data)
      })
      const json = await response.json();
      return json
    } catch (error) {
      console.log(error);
    }
  }
  const fetchDataPoints = async (tournament_id) => {
    try {
      const response = await fetch(`${baseUrl}/fetchDataPoints`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ tournament_id }) // Wrap tournament_id in an object
      });
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('Error in fetchDataPoints:', error);
    }
  }
  const updateDataPoints = async (data) => {
    try {
      const response = await fetch(`${baseUrl}/updateDataPoints`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken
        },
        body: JSON.stringify(data)
      })
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  }
  // 
  //  Performance records
  // 
  const createPerformanceRecord = async (data) => {
    try {
      const response = await fetch(`${baseUrl}/createPerformanceRecord`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken
        },
        body: JSON.stringify(data)
      })
      const json = await response.json();
      return json
    } catch (error) {
      console.log(error);
    }
  }
  const fetchPerformanceRecord = async (data) => {
    try {
      const response = await fetch(`${baseUrl}/fetchPerformanceRecord`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      const json = await response.json();
      return json
    } catch (error) {
      console.log(error);
    }
  }
  //   
  // Venues  
  // 
  const getVenues = async () => {
    try {
      const response = await fetch(`${baseUrl}/getVenues`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching venues:", error.message);
      return null;
    }
  };

  async function autocomplete(query,category) {
    var data = []
    try {
      const responce = await fetch(`${baseUrl}/getTextSearch`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          text:query,
          category:category
        }),
      })
      data=await responce.json()
    }
    catch (error) {
      console.log(error);
    }
    return data
  }

  // ------------------Use Effects--------------------------
  useEffect(() => {
    if (authToken) {
      console.log(authToken);
      fetchUserData()
    }
    // eslint-disable-next-line
  }, [authToken])

  useEffect(() => {
    if (authToken && userInfo.roles.includes("player")) {
      fetchPlayers(userInfo._id, "user").then((data) => { setPlayerInfo(data[0]) })
    }
    // eslint-disable-next-line
  }, [userInfo])

  useEffect(() => {
    // console.log(playerInfo);
  }, [playerInfo])

  useEffect(() => {
    setAuthToken(localStorage.getItem('auth-token'));
  }, []);
  // Define the state and functions you want to provide
  const [active, setActive] = useState(0);

  return (
    <AppContext.Provider
      value={{
        active,
        setActive,
        authToken,
        setAuthToken,
        userInfo,
        setUserInfo,
        playerInfo,
        setPlayerInfo,
        login,
        logout,
        register,
        createPlayer,
        createTeam,
        deleteTeam,
        fetchTeam,
        fetchPlayers,
        createTournament,
        fetchTournament,
        updateTournament,
        deleteTournament,
        createMatch,
        updateMatch,
        fetchMatches,
        updateTeamPlayers,
        createDataPoints,
        fetchDataPoints,
        updateDataPoints,
        createPerformanceRecord,
        fetchPerformanceRecord,
        getVenues,
        autocomplete
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
