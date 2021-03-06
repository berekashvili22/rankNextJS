import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./country.module.css";

const getCountry = async (id) => {
    const res = await fetch(
        `https://restcountries.eu/rest/v2/alpha/${id}`
    );

    const country = await res.json();

    return country;
}

const Country = ({ country }) => {
    // console.log(country)
    const [borders, setBorders] = useState([]);

    const getBorders = async () => {
        const borders = await Promise.all(
            country.borders.map(border => getCountry(border))
        );
        setBorders(borders);
    }

    useEffect(() => {
        getBorders();
    }, []);

    return (
        <Layout title={country.name}>
            <div className={styles.container}>
                <div className={styles.container_left}>
                    <div className={styles.overview_panel}>
                        <img src={country.flag} alt={country.name}></img>
                        <h1 className={styles.overview_name}>{country.name}</h1>
                        <div className={styles.overview_region}>{country.region}</div>
                        <div className={styles.overview_info}>
                            <div className={styles.overview_population}>
                                <div className={styles.overview_value}>{country.population}</div>
                                <div className={styles.overview_label}>population</div>
                            </div>
                            <div className={styles.overview_area}>
                                <div className={styles.overview_value}>{country.area}</div>
                                <div className={styles.overview_label}>area</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.container_right}>
                    <div className={styles.details_panel}>
                        <h4 className={styles.details_panel_heading}>Details</h4>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Capital</div>
                            <div className={styles.details_panel_value}>{country.capital}</div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Subregion</div>
                            <div className={styles.details_panel_value}>{country.subregion}</div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>languages</div>
                            <div className={styles.details_panel_value}>
                                {country.languages.map(({ name }) => name).join(", ")}
                            </div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>currencies</div>
                            <div className={styles.details_panel_value}>
                                {country.currencies.map(({ name }) => name).join(", ")}

                            </div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>native name</div>
                            <div className={styles.details_panel_value}>{country.nativeName}</div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>gini</div>
                            <div className={styles.details_panel_value}>{country.gini} %</div>
                        </div>
                        <div className={styles.details_panel_borders}>
                            <div className={styles.details_panel_borders_label}>Neighbouring Countries</div>
                            <div className={styles.details_panel_borders_container}>
                                {borders.map(({ flag, name }) => (
                                    <div key={name} className={styles.details_panel_borders_country}>
                                        <img src={flag} alt={name} ></img>
                                        <div className={styles.details_panel_borders_name}>{name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </Layout>
    );

};

export default Country;

export const getServerSideProps = async ({ params }) => {
    const country = await getCountry(params.id);

    return {
        props: {
            country,
        },
    }
}