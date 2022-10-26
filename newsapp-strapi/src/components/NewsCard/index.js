import { Link } from 'react-router-dom';
import './NewsCard.css';

export default function NewsCard({ newsItem }) {
	const { title, body, image } = newsItem.attributes;
	const id = newsItem.id;
	const synopsis = body.slice(0, 150);
	return (
		<Link to={'/newspost/' + id}>
			<div className="newscard">
				<div
					className="newscardimg"
					style={{ backgroundImage: `url(${image})` }}
				></div>
				<div style={{ flex: '1 1 203%' }}>
					<div className="newscardtitle">
						<h1>{title}</h1>
					</div>
					<div>
						<span>{synopsis}</span>
					</div>
					<div></div>
				</div>
			</div>
		</Link>
	);
}
