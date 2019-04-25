import React from 'react';

const Detail = ({courseid}) => {
	return(
		<div>
			<h2>{`${courseid}`}</h2>
			<p>Genome Informatics Workshop</p>
			<p>Prerequisite: null</p>
			<p>Description: Engineering software systems for managing and analysing large datasets derived from genomics experiments is a key application of bioinformatics. This course revolves around a guided team project for the design and implementation of a complex system bringing together a variety of tools and methods for analysing genomic data. Methodologies for requirement gathering, system design, project management and documentation will be applied. The project work will be complemented by lectures on algorithms for biological sequence analysis that form the basis of the project work</p>
		</div>
		);
}

export default Detail;

