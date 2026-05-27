import { useAtom } from "jotai";
import {
  usersAtom,
  firstnameAtom,
  lastnameAtom,
  ageAtom,
  hobbiesAtom,
  HOBBIES_LIST,
  type Hobby,
} from "../atoms/user.atom";
import { type SubmitEvent } from "react";

const User = () => {
  const [users, setUsers] = useAtom(usersAtom);
  // const [firstnameInput, setFirstnameInput] = useState<string>("");
  // const [lastnameInput, setLastnameInput] = useState<string>("");
  // const [ageInput, setAgeInput] = useState<string>("");
  // const [hobbiesInput, setHobbiesInput] = useState<Hobby[]>([]);
  // const firstname = useAtomValue(firstnameAtom);

  const [firstnameInput, setFirstnameInput] = useAtom(firstnameAtom);
  const [lastnameInput, setLastnameInput] = useAtom(lastnameAtom);
  const [ageInput, setAgeInput] = useAtom(ageAtom);
  const [hobbiesInput, setHobbiesInput] = useAtom(hobbiesAtom);
  // const hobbies = useAtomValue(HOBBIES_LIST);

  const handleCheckbox = (hobby: Hobby) => {
    setHobbiesInput((prevState) =>
      prevState.includes(hobby)
        ? prevState.filter((h) => h !== hobby)
        : [...prevState, hobby],
    );
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsers((prev) => [
      {
        firstname: firstnameInput,
        lastname: lastnameInput,
        age: Number(ageInput),
        hobbies: hobbiesInput,
      },
      ...prev,
    ]);

    setFirstnameInput("");
    setLastnameInput("");
    setAgeInput("");
    setHobbiesInput([]);
  };

  const handleDelete = (indexDelete: number) => {
    setUsers((prev) => prev.filter((_, index) => index !== indexDelete));
  };

  return (
    <div>
      <h2>User List</h2>
      <div>
        {users.map((user, index) => (
          <div key={index}>
            <div>Firstname: {user.firstname}</div>
            <div>Lastname: {user.lastname}</div>
            <div>Age: {user.age}</div>
            <div>Hobbies: {user.hobbies.join(", ")}</div>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={firstnameInput}
          onChange={(e) => setFirstnameInput(e.target.value)}
          placeholder="Enter your firstname"
        />
        <input
          type="text"
          value={lastnameInput}
          onChange={(e) => setLastnameInput(e.target.value)}
          placeholder="Enter your lastname"
        />
        <input
          type="number"
          value={ageInput}
          onChange={(e) => setAgeInput(e.target.value)}
          placeholder="Enter your age"
        />
        <div>
          {HOBBIES_LIST.map((hobby) => (
            <label key={hobby}>
              <input
                type="checkbox"
                checked={hobbiesInput.includes(hobby)}
                onChange={() => handleCheckbox(hobby)}
              />
              {hobby}
            </label>
          ))}
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default User;
