import React from 'react';
import './NewsView.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function NewsView() {
	let { id } = useParams();
	const [news, setNews] = useState();
	useEffect(() => {
		async function getNews() {
			const { data } = await axios.post('http://localhost:1337/graphql', {
				query: `
      query{
        newsPost(id: ${id}) {
					data{
            id
            attributes{
          	title
          	body
          	image
          	writtenBy
          	createdAt
        	}
          }
 			 }
			}
				`,
			});
			setNews(data?.data?.newsPost?.data?.attributes);
		}
		getNews();
	}, [id]);

	async function deleteNews() {
		if (window.confirm('Do you want to delete this news?')) {
			await axios.post('http://localhost:1337/graphql', {
				query: `
      	  mutation{
  					deleteNewsPost(id: ${id}){
    					data{
      					attributes{
       	  				title
      					}
    					}
  				}
}`,
			});
			window.history.pushState(null, '', '/news');
			window.location.reload();
		}
	}

	return (
		<div className="newsview">
			<div style={{ display: 'flex' }}>
				<a className="backHome" href="/news">
					Back
				</a>
			</div>
			<div
				className="newsviewimg"
				style={{ backgroundImage: `url(${news?.image})` }}
			></div>
			<div>
				<div className="newsviewtitlesection">
					<div className="newsviewtitle">
						<h1>{news?.title}</h1>
					</div>
					<div className="newsviewdetails">
						<span style={{ flex: '1', color: 'rgb(99 98 98)' }}>
							Written By: <span>{news?.writtenBy}</span>
						</span>
						<span style={{ flex: '1', color: 'rgb(99 98 98)' }}>
							Date:{' '}
							<span>
								{new Date(news?.createdAt).toLocaleDateString(
									'en-us',
									{
										weekday: 'long',
										year: 'numeric',
										month: 'short',
										day: 'numeric',
									}
								)}
							</span>
						</span>
						<span>
							<button className="btn-danger" onClick={deleteNews}>
								Delete
							</button>
						</span>
					</div>
				</div>
				<div className="newsviewbody">{news?.body}</div>
			</div>
		</div>
	);
}
