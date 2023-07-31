import './Styling/listitem.css';
import { ImCross } from "react-icons/im";

export default function ListItem({ name, date }) {

    function getDateDifference(old) {

        const diff = old.getTime() - new Date().getTime();
        let mins = (diff / 60000);

        if (mins < 60) {
            if (mins < 1)
                return `${Math.floor(mins * 60)} seconds ago`

            if (mins >= 1 && mins < 2)
                return `${Math.floor(mins)} minute ago`

            return `${Math.floor(mins)} minutes ago`
        } else if (mins >= 60 && mins < 1440) {
            let hours = Math.floor(mins / 60);
            if (hours <= 1)
                return `${hours} hour ago`

            return `${hours} hours ago`
        } else if (mins >= 1440) {
            let days = Math.floor(mins / 1440);
            if (days <= 1)
                return `${days} day ago`

            if (days >= 7)
                return this.formatDate(old);

            return `${days} days ago`;
        }
    }

    return (
        <div className="listitem-container">
            <h3 className='list-name'>{name}</h3>
            <h3 className='date-text'>{getDateDifference(date)}</h3>
            <h4><ImCross color='red' /></h4>
        </div>
    )
}