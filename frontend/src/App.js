import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';


import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import LiveQuizPage from './pages/LiveQuizPage';


import DataProvider from './context/DataProvider';
import DeletePage from './pages/DeletePage';
import AnalyticsPage from './pages/AnalyticsPage';
import AnalysisPage from './pages/AnalysisPage';
import CreateQuizPage from './pages/CreateQuizPage';




const ProtectedRoute = ({ component: Component, ...rest }) => {
	const isAuthenticated = JSON.parse(localStorage.getItem('token'));

	if (isAuthenticated) {
		return (
			<>
				<Component {...rest} />
			</>
		)
	}
	else {
		return (
			<Navigate to='/' />
		)
	}
}


function App() {
	return (
		<BrowserRouter>
			<DataProvider>
				<div className="App">
					<Routes>
						<Route path='/' element={<LoginPage />} />
						<Route path='/dashboard' element={<ProtectedRoute component={DashboardPage} />} />
						<Route path='/analytics' element={<ProtectedRoute component={AnalyticsPage} />} />
						<Route path='/analysis/:quizId' element={<ProtectedRoute component={AnalysisPage} />} />
						<Route path='/delete/:quizId' element={<ProtectedRoute component={DeletePage} />} />
						<Route path='/createQuiz' element={<ProtectedRoute component={CreateQuizPage} />} />
						<Route path='/editQuiz/:quizId' element={<ProtectedRoute component={CreateQuizPage} />} />
						<Route path='/livequiz/:quizId' element={<LiveQuizPage />} />
					</Routes>
				</div>
			</DataProvider>
		</BrowserRouter>
	);
}

export default App;
