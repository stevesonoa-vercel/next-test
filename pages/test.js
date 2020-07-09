import Link from 'next/link';
import axios from 'axios';

export const Test = (props) => {
    return (
        <div>
            <h1>Here Are Some Star Wars Characters</h1>
            <ul>
                {props.people.map((person) => (
                    <li key={person.url}>
                        <Link href={`/people/${person.id}`}>
                            <a>{person.name}</a>
                        </Link>
                    </li>
                ))}
            </ul>

            <Link href='/'>
                <a>Go Back</a>
            </Link>
        </div>
    );
};

Test.getInitialProps = async () => {
    try {
        const people = await axios.get('https://swapi.dev/api/people');
        return {
            people: people.data.results.map((person) => ({
                ...person,
                id: person.url.split('/people/')[1].replace('/', ''),
            })),
        };
    } catch (err) {
        console.log('**************** ERROR ************************');
        console.log(err);
        return {
            people: [],
        };
    }
};

export default Test;
