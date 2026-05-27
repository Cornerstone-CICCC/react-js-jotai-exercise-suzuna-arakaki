import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  userAtom,
  // firstnameAtom,
  // lastnameAtom,
  // ageAtom,
  // hobbiesAtom,
  HOBBIES_LIST,
  type Hobby,
} from "../atoms/user.atom";
import { useState, type SubmitEvent } from "react";

const User = () => {
  const setUsers = useSetAtom(userAtom);
  const [firstnameInput, setFirstnameInput] = useState<string>("");
  const [lastnameInput, setLastnameInput] = useState<string>("");
  const [ageInput, setAgeInput] = useState<string>("");
  const [hobbiesInput, setHobbiesInput] = useState<Hobby[]>([]);

  // const [firstnameInput, setFirstnameInput] = useAtom(firstnameAtom);
  // const [lastnameInput, setLastnameInput] = useAtom(lastnameAtom);
  // const [ageInput, setAgeInput] = useAtom(ageAtom);
  // const [hobbiesInput, setHobbiesInput] = useAtom(hobbiesAtom);
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

  return (
    <div>
      <h2>User</h2>
      <div>
        <div>
          {firstnameInput} {lastnameInput}
        </div>
        <div>({ageInput})</div>
        <div>{hobbiesInput.join(", ")}</div>
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
