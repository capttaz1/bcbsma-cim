import moment from 'moment';

const dateHandler = {};

// validate column is a date column
function isValidDate(x) {
	var d = moment(x, 'YYYY-MM-DDTHH:mm:ss.000Z', true);
	if (d == null || !d.isValid()) return false;

	return true;
}

// cleanup date
dateHandler.simpleDate = (x) => {
	if (isValidDate(x)) {
		return moment(x).format('M/D/YYYY');
	} else {
		return x;
	}
};

export default dateHandler;
