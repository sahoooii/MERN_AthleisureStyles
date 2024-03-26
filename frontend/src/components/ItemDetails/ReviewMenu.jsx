import React from 'react';
import {
	MoodBad,
	SentimentVeryDissatisfied,
	SentimentNeutral,
	SentimentSatisfiedAlt,
	SentimentVerySatisfied,
} from '@mui/icons-material';

const ReviewMenu = [
	{
		value: 1,
		icon: <MoodBad sx={{ marginRight: '5px' }} />,
		title: "1 -- Nop I don't like it",
	},
	{
		value: 2,
		icon: <SentimentVeryDissatisfied sx={{ marginRight: '5px' }} />,
		title: '2 -- Maybe I give it to my sister',
	},
	{
		value: 3,
		icon: <SentimentNeutral sx={{ marginRight: '5px' }} />,
		title: '3 -- So far, So Good',
	},
	{
		value: 4,
		icon: <SentimentSatisfiedAlt sx={{ marginRight: '5px' }} />,
		title: '4 -- Like it!',
	},
	{
		value: 5,
		icon: <SentimentVerySatisfied sx={{ marginRight: '5px' }} />,
		title: '5 -- Yes!! Love it!',
	},
];

export default ReviewMenu;
