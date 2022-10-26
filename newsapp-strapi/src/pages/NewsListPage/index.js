import React from 'react';
import './NewsList.css';
import NewsCard from '../../components/NewsCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddNewsDialog from '../../components/AddNewsDialog';

export default function NewsList() {
	const [newsList, setNewsList] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [start, setStart] = useState(0);
	const [pageSize] = useState(2);
	const [pageDetails, setPageDetails] = useState();
	const [page, setPage] = useState(1); //Creating the page argument

	useEffect(() => {
		async function fetchData() {
			const { data } = await axios.post('http://localhost:1337/graphql', {
				query: `
			query GetNewsPost{
  			newsPosts(pagination: {page: ${page}, pageSize: ${pageSize}}){
    		data{
      		id
      		attributes{      
    				title
        		writtenBy
        		image
        		createdAt
        		body
      		}
    		}
    		meta{
      		pagination{
        		total
        		pageCount
      		}
    		}
  		}
		}				
				`,
			});
			setPageDetails(data?.data?.newsPosts?.meta?.pagination);
			setNewsList(data?.data?.newsPosts?.data);
		}
		fetchData();
	}, [start]);
	function nextPage() {
		setStart(pageSize + start);
		setPage(page + 1);
	}

	function prevPage() {
		setStart(start - pageSize);
		setPage(page - 1);
	}

	function showAddNewsDialog() {
		setShowModal(!showModal);
	}

	return (
		<div className="newslist">
			<div className="newslistbreadcrumb">
				<div className="newslisttitle">
					<h3>World News</h3>
				</div>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<div style={{ marginRight: '4px' }}>
						<button onClick={showAddNewsDialog}>Add News</button>
					</div>
				</div>
			</div>
			<div>
				{newsList?.map((newsItem, i) => (
					<NewsCard newsItem={newsItem} key={i} />
				))}
			</div>
			{showModal ? (
				<AddNewsDialog closeModal={showAddNewsDialog} />
			) : null}
			<div>
				<span>
					<button disabled={pageSize > start} onClick={prevPage}>
						Prev
					</button>
				</span>
				<span>
					<button
						disabled={
							pageDetails &&
							start + pageSize >= pageDetails?.total
						}
						onClick={nextPage}
					>
						Next
					</button>
				</span>
			</div>
		</div>
	);
}
