import React from 'react';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// import NewsList from './pages/NewsListPage';
import NewsList from './pages/NewListOffset';
import NewsView from './pages/NewsView';

function App() {
	return (
		<>
			<section className="header">
				<div className="headerName">NewsNet</div>
			</section>
			<div className="container">
				<main className="main">
					<BrowserRouter>
						<Routes>
							<Route path="/news" element={<NewsList />} />
							<Route
								path="/newspost/:id"
								element={<NewsView />}
							/>
							<Route
								exact
								path="/"
								element={<Navigate to="/news" />}
							/>
							<Route path="*" element={<NewsList />} />
						</Routes>
					</BrowserRouter>
				</main>
			</div>
		</>
	);
}

export default App;
