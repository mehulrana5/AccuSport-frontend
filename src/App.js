import React from 'react';
import './App.css';

import HomePage from './components/HomePage';
import TournamentsPage from './pages/TournamentsPage';
import TournamentCards from './components/TournamentCards';
import NavBar from './components/NavBar';
import TeamsPage from './pages/TeamsPage';
import TeamDetails from './components/TeamDetails';
import MatchesPage from './pages/MatchesPage';
import PlayersPage from './pages/PlayersPage';

// eslint-disable-next-line
import { Routes, Route, HashRouter } from 'react-router-dom';

// i am not sure but i am using the hashRouter cause it will not make server request for each route like localhost:3000/#/matches in this case the localhost:3000 will be given at the backend but not the /matches it will be the responsibility of the client side routing currently i am using the auth 0 for authorization but ig in fiture i will try to add my own authentication technique

//in case u wanna add the browser router then add the basename /AccuSport in <Routes> as the github repo name is AccuSport 

//the main issue was with the use of basename and auth 0 idk exactly but there is a issue with the path so thats y i am using hashrouter 

import { AppProvider } from './Context';
import Login from './components/Login';
import Signup from './components/Signup';
import CreatePlayer from './components/CreatePlayer';
import CreateTeam from './components/CreateTeam';
import CreateTournamentPage from './components/CreateTournamentPage';
import MyTournamentsPage from './pages/MyTournamentsPage';
import CreateMatchPage from './components/CreateMatchPage';
import MyTeams from './components/MyTeams';
import MyMatches from './components/MyMatches';

const App = () => {

  return (
    <AppProvider>
      <HashRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          <Route path="/players" element={<PlayersPage />}>
            <Route path=':operation/:playerId' element={<CreatePlayer />} />
          </Route>

          <Route path="/player/:operation/:playerId" element={<CreatePlayer />} />

          <Route path="/createPlayer" element={<CreatePlayer />} />

          <Route path="/teams" exact element={<TeamsPage />}>
            <Route path=":operation1/:teamId" exact element={<TeamDetails />}>
              <Route path=':operation/:playerId' element={<CreatePlayer />} />
            </Route>
            <Route path="createTeam" exact element={<CreateTeam />} />
            <Route path="myTeams" exact element={<MyTeams />} />
          </Route>
          <Route path="/team-info/:teamId" exact element={<TeamDetails />} />
          

          {/* <Route path="/match-info/:matchId" element={<MatchDetails />} /> */}

          <Route path="/matches" element={<MatchesPage />}>
            <Route path=':operation/:matchId' element={<CreateMatchPage />} />
            <Route path="createMatch" element={<CreateMatchPage />} />
            <Route path="myMatches" element={<MyMatches />} />
          </Route>

          <Route path="/tournaments/" element={<TournamentsPage />}>
            <Route path=":status" element={<TournamentCards />} />
            <Route path="createTournament" element={<CreateTournamentPage />} />
            <Route path="myTournaments" element={<MyTournamentsPage />} />
            <Route path=":operation/:tournamentId" element={<CreateTournamentPage />} />
          </Route>

        </Routes>
      </HashRouter>
    </AppProvider>
  );
};

export default App; 
