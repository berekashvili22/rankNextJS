import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import { useState } from 'react';
import styles from './CountriesTable.module.css';
import Link from 'next/Link';

// create ordered list based on parameters
const orderBy = (countries, value, direction) => {
    if (direction === 'asc') {
        // if it returns a negative value, the value in a will be ordered before b.
        // if it returns 0, the ordering of a and b won’t change.
        // if it returns a positive value, the value in b will be ordered before a.
        return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
    }

    if (direction === 'desc') {
        return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
    }

    return countries;
}

const SortArrow = ({ direction }) => {
    if (!direction) {
        return <></>;
    }

    if (direction === 'desc') {
        return (
            <div className={styles.heading_arrow}>
                <KeyboardArrowDown color="inherit" />
            </div>
        );
    } else {
        return (
            <div className={styles.heading_arrow}>
                <KeyboardArrowUp color="inherit" />
            </div>
        );
    }
};

const CountriesTable = ({ countries }) => {

    const [direction, setDirection] = useState();
    const [value, setValue] = useState();


    const orderedCountries = orderBy(countries, value, direction);

    const switchDirection = () => {
        if (!direction) {
            setDirection('desc');
        } else if (direction === 'desc') {
            setDirection('asc');
        } else {
            setDirection(null);
        }
        console.log(direction)
    }

    const setValueAndDirection = (value) => {
        switchDirection();
        setValue(value);
    }

    return (
        <div>
            <div className={styles.heading}>
                <div className={styles.heading_flag}></div>

                <button className={styles.heading_name} onClick={() => setValueAndDirection('name')}>
                    <div>Name</div>
                    <SortArrow direction={direction} />
                </button>

                <button className={styles.heading_population} onClick={() => setValueAndDirection('population')}>
                    <div>Population</div>
                    <SortArrow direction={direction} />
                </button>

                <button className={styles.heading_area} onClick={() => setValueAndDirection('area')}>
                    <div>Area (km <sup style={{ fontSize: '0.5rem' }}>2</sup>)</div>
                    <SortArrow direction={direction} />
                </button>

                <button className={styles.heading_gini} onClick={() => setValueAndDirection('gini')}>
                    <div>Gini</div>
                    <SortArrow direction={direction} />
                </button>
            </div>

            {orderedCountries.map((country) => (
                <Link href={`/country/${country.alpha3Code}`} key={country.numericCode}>
                    <div className={styles.row}>
                        <div className={styles.flag}>
                            <img src={country.flag} alt={country.name}></img>
                        </div>
                        <div className={styles.name} >{country.name}</div>
                        <div className={styles.population}> {new Intl.NumberFormat().format(country.population)} </div>
                        <div className={styles.area} >{country.area || 0}</div>
                        <div className={styles.gini} >{country.gini || 0} %</div>
                    </div>
                </Link>
            ))}
        </div>
    );
};


export default CountriesTable;