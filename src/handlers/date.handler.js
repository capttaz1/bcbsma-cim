import moment from 'moment';
import Container from 'typedi';

/**
 * Centralized class for Date Handling
 */
export default class DateHandler {
    /**
     * Date Handler constructor
     * @constructor
     */
    constructor() {
        this.logger = Container.get('logger');
    }

    /**
     * Produces a simple, localized date
     *
     * @param {string} value - A string representation of a date
     * @return {string} value - A localized string of a formatted date
     */
    simpleDate(value) {
        try {
            let valid = true;
            const newDate = moment(value, 'YYYY-MM-DDTHH:mm:ss.000Z', true);
            if (newDate == null || !newDate.isValid()) {
                valid = false;
            }

            if (valid) {
                return moment(value).format('M/D/YYYY');
            } else {
                return value;
            }
        } catch (error) {
            this.logger.error('An error occurred in the date handler: %o', error);
            throw error;
        }
    }
}
