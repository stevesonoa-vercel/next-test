import Link from 'next/link';
import axios from 'axios';

const Character = (props) => {
    const {
        birth_year,
        eye_color,
        gender,
        hair_color,
        height,
        name,
    } = props.person;
    return (
        <div>
            <h2>{name}</h2>
            <ul>
                <li>{gender}</li>
                <li>Born in {birth_year}</li>
                <li>{eye_color} eyes</li>
                <li>{hair_color} hair</li>
                <li>{height} inches tall</li>
            </ul>

            <Link href='/test'>
                <a>Go Back</a>
            </Link>

            <style jsx>{`
                li {
                    text-transform: capitalize;
                }
            `}</style>
        </div>
    );
};

Character.getInitialProps = async (context) => {
    const id = context.query.slug[1] || '1';
    try {
        const person = await axios.get(`https://swapi.dev/api/people/${id}`);
        return {person: person.data};
    } catch (err) {
        console.log('*********************** ERROR **********************');
        console.log(err);
        return {
            person: {},
        };
    }
};

export default Character;
