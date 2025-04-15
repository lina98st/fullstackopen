const Persons = ({ persons }) => (
    <div>
        {persons.map((person, index) => (
            <p key={index}>{person.name} {person.number}</p>
        ))}
    </div>
)

export default Persons
